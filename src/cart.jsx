var Cart = React.createClass({
	displayName: 'cartComponent',



	render: function() {
		var cart = this.props.cart,
			that = this;



		function quantityChanged(item, newQuantity) {
			cart.update(item.name, newQuantity);
			this.forceUpdate();
		}

		return (
			<div className="cart">
				<table>
					<tr>
						<th>name</th>
						<th>price</th>
						<th>quantity</th>
						<th>subtotal</th>
					</tr>

				{this.props.cart.getList().map(function (item) {
					return (
						<tr>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td><NumericStepper onUpdate={quantityChanged.bind(that, item)} val={item.quantity} /></td>
							<td>{cart.getSubtotalByItem(item.name)}</td>
						</tr>
					)
				})}
				</table>
				<span>total: </span><strong>{cart.getSubtotal()}</strong>
			</div>
		)
	}
});