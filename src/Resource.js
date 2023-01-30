global.Stack = require('./Stack.js');
global.Material = require('./Material.js');

class Resource {
	
	static list = {};
	
	constructor(name, images, recipe, stackSize) {
		if (!name) {
			return;
		}
		
		this.name = name;
		this.recipe = recipe;
		this.stackSize = stackSize || 64;
		Resource.list[this.name] = this;
		if (recipe && recipe.length) {
			this.depth = Math.max(...recipe.map(r => Resource.list[r.name].depth)) + 1;
		} else {
			this.depth = 0;
		}
		this.canBeBlock = true;
		if (typeof images == 'string') {
			images = {unit : images};
			this.canBeBlock = false;
		}
		this.images = images;
		//console.log(Resource.list);
	}
	
	/*getStacks(amount) {
		const formats = {};
		let stacks = Math.floor(amount / this.stackSize);
		if (stacks) {
			formats.units = {stacks}
		}
	}*/
	
	get image() {
		return isNaN(this.images.unit) ? this.images.unit || '🔴' : `<:e:${this.images.unit}>`;
	}
	
	get imageBlock() {
		return isNaN(this.images.block) ? this.images.block || '🔴' : `<:e:${this.images.block}>`;
	}
}

new Resource('Lingot de Fer', {unit : '1069425315862036520', block : '1069425197586849833'});
new Resource('Lingot d\'Or', {unit : '1069425296480141414', block : '1069425181136785428'});
new Resource('Lingot de Cuivre', {unit : '1069425231539736716', block : '1069425123981021234'});
new Resource('Émeraude', {unit : '1069425277043736659', block : '1069425164607033466'});
new Resource('Diamant', {unit : '1069425257653469275', block : '1069425146978381844'});
new Resource('Fragment de Netherite', '1069425350989336576');
new Resource('Lingot de Netherite', {unit : '1069425333201281117', block : '1069425213328076930'}, [ new Material('Fragment de Netherite', 4), new Material('Lingot d\'Or', 4), ]);
new Resource('Obsidienne', '1069425477040742521');
new Resource('Étoile du Nether', '1069443372785344603');

new Resource('Point d\'Expérience', '🟢', undefined, 1);
new Resource('Sun', '🟡', undefined, 1);

new Resource('Lingot de Bronze', '1069447514685710366', [
	new Material('Lingot de Fer', 2),
	new Material('Lingot de Cuivre', 4),
	new Material('Sun', 10),
	new Material('Point d\'Expérience', 7),
]);
new Resource('Lingot d\'Acier', '1069447392698568815', [
	new Material('Lingot de Bronze', 4),
	new Material('Lingot de Fer', 16),
	new Material('Lingot d\'Or', 8),
	new Material('Obsidienne', 4),
	new Material('Sun', 20),
	new Material('Point d\'Expérience', 16),
]);
new Resource('Lingot d\'Invar', '1069447360104632430', [
	new Material('Lingot de Bronze', 4),
	new Material('Lingot d\'Acier', 2),
	new Material('Diamant', 4),
	new Material('Émeraude', 12),
	new Material('Lingot d\'Or', 16),
	new Material('Sun', 30),
	new Material('Point d\'Expérience', 27),
]);
new Resource('Lingot de Titane', '1069447417096835152', [
	new Material('Lingot d\'Acier', 4),
	new Material('Lingot d\'Invar', 4),
	new Material('Fragment de Netherite', 2),
	new Material('Diamant', 8),
	new Material('Émeraude', 16),
	new Material('Sun', 50),
	new Material('Point d\'Expérience', 55),
]);
new Resource('Lingot de Virenium', '1069447440371040256', [
	new Material('Lingot de Titane', 8),
	new Material('Étoile du Nether', 3),
	new Material('Lingot de Netherite', 2),
	new Material('Diamant', 16),
	new Material('Sun', 300),
	new Material('Point d\'Expérience', 1395),
]);
new Resource('Virenium infusé', '1069447457156632627', [
	new Material('Lingot de Titane', 4),
	new Material('Étoile du Nether', 4),
	new Material('Lingot de Virenium', 1),
]);

module.exports = Resource;