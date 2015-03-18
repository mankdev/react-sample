var NumericStepper = React.createClass({
	displayName: "NumericStepper",


	model: null,

	increment: function() {
		this.model.increment();
	},

	decrement: function() {
		this.model.decrement();
	},

	isValid: function(value) {
		var lastSymbol = value[value.length - 1];

		return (lastSymbol === '.' || lastSymbol === ',');
	},

	updateModel: function(e) {
		var value = e.target.value;

		if (this.isValid(value)) {
			this.setState({val: e.target.value});
		} else {
			this.model.setValue(this.uglify(e.target.value));
		}
	},

	uglify: function(value) {
		return value.toString().replace(',', '.');
	},

	pretify: function(value) {
		return value.toString().replace('.', ',');
	},

	componentDidUpdate: function() {
		this.props.onUpdate(this.state.val);
	},

	getDefaultProps: function() {
		return {
			val: 0,
			step: 1,
			onUpdate: function() {}
		}
	},

	getInitialState: function() {
		return {
			val: 0
		}
	},

	componentDidMount: function() {
		var that = this;

		this.model = new NumericStepperModel(this.props.val, this.props.step);
		this.setState({val: this.props.val});

		this.model.on(function(newValue) {
			that.setState({val: newValue});
		})
	},

	render: function() {
		return (
			<span className="control control-numericStepper numericStepper">
				<input className="numericStepper--input" onChange={this.updateModel} value={this.pretify(this.state.val)}/>
				<button className="numericStepper--button numericStepper--button-up" onClick={this.increment}>+</button>
				<button className="numericStepper--button numericStepper--button-up" onClick={this.decrement}>-</button>
			</span>
		)
	}
});