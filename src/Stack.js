class Stack {
	
	constructor(amount, divider, size) {
		size = size || 64;
		divider = divider || 1;
		amount = Math.ceil(amount / divider);
		this.stacks = Math.floor(amount / size);
		this.units = amount % size;
	}
}

module.exports = Stack;