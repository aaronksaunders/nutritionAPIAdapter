exports.definition = {
	config: {

		adapter: {
			type: "nutritionSync", // <-- name of custom adapter
			collection_name: "NutritionData"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};