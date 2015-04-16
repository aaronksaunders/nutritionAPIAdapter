var sampleTableData = [];

/**
 * called when user clicks on listView. The _event will provide
 * the index of the item clicked in the listView
 *
 * @param {Object} _event
 */
 function listItemClicked(_event) {
	// display to console log the _event object for debugging
	Ti.API.info(JSON.stringify(_event, null, 2));

	// get data using index provided, the items are in the section
	// so we use the index against the section, not the listView
	var currentItem = $.listSection.getItemAt(_event.itemIndex);
	
	// we save the data as a property so that is how we access
	// the data, we do not need the data array in this case
	var userInfo = currentItem.properties.data;
	
	// now display the data
	alert("clicked on " + userInfo.user.name.first + " " + userInfo.user.name.last);
}

// get nutrition models from the backbone collection we created
// see models/collections/sync in the backbone documentation
// - http://backbonejs.org/#Collection-fetch
// Appcelerator Models/Collection Documentation
// - http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Collection_and_Model_Objects
function getDataFromSyncAdapter() {

	// create a collection of nutritionInformation
	var nutritionCollection = Alloy.createCollection('NutritionData'); // <- use model name

	nutritionCollection.fetch({
		term : "Chicken",
		// handle if we get data...
		success: function(_collection, _response) {
			// use underscore map function to loop thru data
			// but the collection has a property called models
			// that is the array we will use for this example
			var items = _.map(_collection.models, function(element) {
				// a backbone model has a field called attributes
				// that is a JSON representation of the model's
				// properties
				
				var modelAttributes = element.attributes;
				
				return {
					properties : {
						data : modelAttributes // save all attributes
					},
					// bind the labels using the bindId
					name : {
						text : modelAttributes.fields.brand_name + " " + modelAttributes.fields.item_name
					},
					nutritionInfo : {
						text : "Calories: " + modelAttributes.fields.nf_calories + ", Fat: " + modelAttributes.fields.nf_total_fat
					}
				};
			});
			// add the items to the section in the ListView
			$.listSection.setItems(items);		
		},
		// handle if we get error
		error :  function(_response) {
			Ti.API.error('ERROR: ' + JSON.stringify(_response,null,_response));
		}
	});	
}


function getDataFromService() {
	// lets get some real data!!

	// new service we will create to get the data based
	// on nutritionService API integration
	var nutritionService = require('nutritionService');

	// call the service to get the data
	nutritionService.getNutritionInformation("Fried Chicken",function(_response) {

		// if success then load the table with the data
		// from the nutritionService
		if (_response.success) {
			var responseData = _response.data.hits;

			// log data for testing before we add it to the UI
			console.log(_response.data.hits[0]);

			// save data in global variable
			sampleTableData = _response.data.hits;

			// use underscore map function to loop thru data
			var items = _.map(_response.data.hits, function(element) {
				return {
					properties : {
						data : element // save the whole object in list
					},
					// bind the labels using the bindId
					name : {
						text : element.fields.brand_name + " " + element.fields.item_name
					},
					nutritionInfo : {
						text : "Calories: " + element.fields.nf_calories + ", Fat: " + element.fields.nf_total_fat
					}
				};
			});
			// add the items to the section in the ListView
			$.listSection.setItems(items);

		} else {
			alert(_response.error);
		}
	});
}

getDataFromSyncAdapter();

// open the view
$.index.open();
