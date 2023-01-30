global.Resource = require('./Resource.js');

class Order {
	static orderNumber = Math.floor(Date.now() / 100)
	static list = {};
	
	static getOrderNumber() {
		return Order.orderNumber++;
	}
	
	constructor(owner) {
		this.number = Order.getOrderNumber();
		Order.list[this.number] = this;
		this.owner = owner;
		this.resourceName = null;
		this.amount = 1;
		this.bundle = null;
	}
	
	setAmount(amount) {
		this.amount = amount;
	}
	
	changeAmount(offset) {
		this.amount += offset;
	}
	
	setResource(name) {
		this.resourceName = name;
	}
	
	isOwner(user) {
		return user == this.owner;
	}
	
	generateBundle() {
		if (!this.ready)
			return;
		this.bundle = {};
		this.addToBundle(this.resourceName, this.amount);
		return this.bundle;
	}
	
	addToBundle(resourceName, quantity) {
		Resource.list[resourceName].recipe?.forEach(m => this.addToBundle(m.name, m.amount * quantity))
		this.bundle[resourceName] = (this.bundle[resourceName] || 0) + quantity;
	}
	
	get ready() {
		return !!this.resourceName && !this.bundle;
	}
}

module.exports = Order;