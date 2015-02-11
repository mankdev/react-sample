var NumericStepperModel = (function() {

	return function(initialValue, step) {
		var updateCallback = function() {},
			value = parseFloat(initialValue) || 0;

		step = parseFloat(step) || 1;

		function increment() {
			setValue(value + step);
		}

		function decrement() {
			setValue(value - step);
		}

		function setValue(newValue) {
			var number = parseFloat(newValue);

			value = isNaN(number) ? '' : number;

			updateCallback(value);
		}

		function on(fn) {
			updateCallback = fn;
		}

		this.setValue = setValue;
		this.increment = increment;
		this.decrement = decrement;
		this.on = on;
	}
})();