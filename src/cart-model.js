var CartModel = (function() {
	return function CartModel() {
		var storage = {};

		function add(name, price, quantity) {
			quantity = quantity || 1;

			storage[name] = {
				price: price,
				quantity: quantity
			}
		}

		function remove(name) {
			storage[name] = null;
		}

		function update(name, newQuantity) {
			storage[name].quantity = newQuantity;
		}

		function getSubtotalByItem(name) {
			var item = storage[name],
				result = 0;

			if (item) {
				result = item.price * item.quantity;
			}

			return result;
		}

		function getSubtotal() {
			return Object.keys(storage).reduce(function(sum, itemName) {
				var item = storage[itemName],
					result = sum;


				if (item) {
					result = sum + (item.quantity * item.price);
				}

				return result;
			}, 0);
		}

		function getList() {
			return Object.keys(storage).map(function(itemName) {
				var item = storage[itemName],
					result = null;

				result = {
					name: itemName,
					price: item.price,
					quantity: item.quantity
				};

				return result;
			}).filter(function(item) {return item});
		}

		this.add = add;
		this.remove = remove;
		this.update = update;
		this.getSubtotalByItem = getSubtotalByItem;
		this.getSubtotal = getSubtotal;
		this.getList = getList;
	}
})();