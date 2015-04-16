//
// This is the new commonjs library that will query the random user service
// We separate out our code for better structure and maintainability

// export one function, getPeople

var appId = "8abbcd8e";
var appKey = "36e8d264537037ee7e832a41902ffe57";
/**
 *
 * @param {String} _term - food to search for
 * @param {Object} _callback - returns results from query
 */
exports.getNutritionInformation = function(_term, _callback) {
	// lets use appcelerator httpClient

	console.log(_term);

	// url from nutrition API
	var url = "https://api.nutritionix.com/v1_1/search/"+_term+"?appId="+appId+"&appKey="+appKey+"&fields=brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat&results=0:50";
	
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			// this function is called when data is returned from the server and available for use
			// this.responseText holds the raw text return of
			// the message (used for text/JSON)

			//when we get the data return with success, need
			// to convert the responseText into an object
			_callback({
				success : true,
				data : JSON.parse(this.responseText)
			});
		},
		onerror : function(e) {
			// this function is called when an error occurs, 
			// including a timeout
			Ti.API.error(e.error);
			// send failure back and the error information
			_callback({
				success: false,
				error : e
			});
		},
		timeout : 5000 /* in milliseconds */
	});
	xhr.open("GET", url);
	
	xhr.send();
	// request is actually sent with this statement

};
