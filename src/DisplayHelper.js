const displayHelper = {};

displayHelper.generateBundleEmbed = function(order, bundle) {
	const embed = {title : `Ressources pour ${order.resourceName} × ${order.amount}`};
	const rawMaterial = Object.keys(bundle).filter(m => !Resource.list[m].depth).sort((a, b) => bundle[b] - bundle[a]);
	if (!rawMaterial.length) {
		embed.description = 'Aucune fabrication n\'est requise pour cette commande.';
		return embed;
	}
	embed.fields = [];
	const rawField = { name : '___Tous les matériaux Nécessaires___', inline : false };
	rawField.value = rawMaterial.map(m => displayHelper.generateMaterialDisplay(m, bundle[m])).join('\n');
	embed.fields.push(rawField);
	
	const steps = {};
	const upgradedMaterial = Object.keys(bundle).filter(m => Resource.list[m].depth).forEach(function(m) {
		const r = Resource.list[m];
		if (!steps[r.depth]) {
			steps[r.depth] = [];
		}
		steps[r.depth].push(m);
	});
	Object.keys(steps).sort((a, b) => a - b).forEach(function(step) {
		const stepField = { name : `___Étape ${step}___`, inline : false };
		stepField.value = steps[step].map(function(m) {
			let str = `__**Fabrication** : ${m} × ${bundle[m]}__\n`
			str += Resource.list[m].recipe.map(mm => displayHelper.generateMaterialDisplay(mm.name, mm.amount * bundle[m])).join('\n');
			return str;
		}).join('\n');
		embed.fields.push(stepField);
	});
	
	return embed;
}

displayHelper.generateMaterialDisplay = function(resource, quantity) {
	const r = Resource.list[resource];
	let res = `${r.name} : `;
	if (r.stackSize != 1) {
		const unitStack = new Stack(quantity);
		res += `${r.image} ${displayHelper.generateStackDisplay(unitStack)}`;
		if (r.canBeBlock) {
			const blockStack = new Stack(quantity, 9);
			res += `, ${r.imageBlock} ${displayHelper.generateStackDisplay(blockStack)}`;
		}
	} else {
		res += `${r.image} ${quantity}`;
	}
	return res;
}

displayHelper.generateStackDisplay = function(stack) {
	let res = '';
	if (stack.stacks) {
		res += `64 × ${stack.stacks}`;
	}
	if (stack.units) {
		res += `${stack.stacks ? ' + ' : ''}${stack.units}`;
	}
	return res;
}

module.exports = displayHelper;