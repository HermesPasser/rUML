/*
	The json format must be:
	{
		'entities': [
			objects
		],
		
		'relations': [
			objects
		]
	}
*/

function serialize() {
	let obj = { 'entities': [], 'relations':[] }
	
	for (const o of Ramu.gameObjs){
		if (o instanceof MovableEntity)
			obj.entities.push(o)
		
		if (o instanceof Line)
			obj.relations.push(o)
	}
	return JSON.stringify(obj, null, '\t')
}

function deserialize(text) {
	const data = JSON.parse(text)
	const entities = Object.values(data.entities)
	const relations = Object.values(data.relations)
	
	for (const en of entities)
		// TODO: check if there is duplicates or two itens in the same position
		Entities[en.id] = getClass(en.type).fromJson(en)
	
	for (const re of relations)
		// TODO: check if there is other relation between two objs before add a new one
		getClass(re.type).fromJson(re)
}

function loadJson() {
	const input = document.getElementById('input-upload')
	const text = prompt('type the json content here')
	
	if (text == null)
		return
	
	if (text === void(0) || text.trim() === '') {
		alert('Cannot load from an empty text')	
		return
	}
	
	try {
		deserialize(text)
	} catch(e) {
		alert('Cannot load a bad formatted json')
	}	
}

function saveJson(name) {
	const link = document.getElementById('down-json')
	const text = serialize()
	const file = new Blob([text], {type: 'text/plain'})
	
	link.setAttribute('download', 'uml.json')
	link.setAttribute('href', URL.createObjectURL(file))	
}
