var Product = React.createClass({
	displayName: 'ProductComponent',

	_handleQuantityChange: function(value) {
		this.props.handleQuantityChange(value);
	},

	getDefaultProps: function() {
		return {
			handleQuantityChange: function() {}
		}
	},

	render: function() {
		var productData = this.props.data;

		return (
			<tr>
				<td>{productData.name}</td>
				<td>{productData.price}</td>
				<td><NumericStepper onUpdate={this._handleQuantityChange} val={productData.quantity}/></td>
				<td>{productData.price * productData.quantity}</td>
			</tr>
		)
	}
});

var Cart = React.createClass({
	displayName: 'cartComponent',

	handleProductUpdate: function(product, value) {
		this.props.cart.update(product.name, value);
	},

	getInitialState: function() {
		return {
			products: []
		}
	},

	componentDidMount: function() {
		this.setState({
			products: this.props.cart.getList()
		})
	},

	render: function() {
		var self = this;

		return (
			<div className="cart">
				<table>

					<thead>
						<th>name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
					</thead>

					<tbody>
						{this.state.products.map(function(item) {
							return (
								<Product handleQuantityChange={self.handleProductUpdate.bind(self, item)} data={item} key={item.name} />
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
});