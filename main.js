"use strict"

var Entities = {}

const type = { 
	// talvez esse 'type' e o 'link' class não sejam necessarias after all
	ACTOR_TO_ACTIVITY: 1, ACTIVITY_TO_ACTIVITY: 2, INCLUDE: 3, EXTENDS: 4
}

class Link {
	to = null // GameObj
	from = null // GameObj
	type = type.ACTOR_TO_ACTIVITY 
	
	constructor(from, to, type) {
		this.to = to
		this.from = from
		this.type = type
	}
}

const getClass = (name) => { return (eval(name)) }


function saveImage(name) {
	const link = document.getElementById('down-img')
	let img = Ramu.canvas.toDataURL('image/png')
	img = img.replace("image/png", "image/octet-stream")
		
	link.setAttribute('download', 'usecase.png')
	link.setAttribute('href', img)
}

function resetRUML() {
	Ramu.gameObjs = []
	Ramu.objsToDraw = []
	Entities = []
}



// TODO: verificar se a entidade existe antes de adc
// para isso terá que ser checado se o texto de ambos são iguais
// não a tag pois eu trocarei para que cada tag seja unica e gerada baseado só na
// 1 palavra do texto
function interpret(txt) {
	// convém comando para ler (em audio) o conteudo de uma entidade
	
	const words = txt.split(' ')
	const name = words.slice(2).join(" ")
	switch(words[0]) {
		case 'add':
			switch(words[1]) {
					// TODO: create way to prevent two cases of be instatied in the same place
					case 'actor':
					
						addEntityToProps(new Actor(20, 20, 40, 40, name))
						break;
						
					case 'activity':
						addEntityToProps(new Activity(name, 20, 20, 75, 50))
						break;
						
					case 'relation':
						// get entities by tag
						new Line()
						break
				}
			break;
	}
}

function addEntityToProps(entity) {
	const props = document.getElementById('select-props')
	const option = document.createElement('option')
	option.text = entity.tag
	
	for(let el of props.options)
		if (el.value == entity.tag)
			return
		
	props.add(option)
}

// ---------- ---------- ---------- //
// ---------- Ramu logic ---------- //
// ---------- ---------- ---------- //

window.onload = () => {
	const cmd = document.getElementById('command-input')
	new GameObj().update = function() {
		if (Ramu.onKeyDown('ctrl')) {
			cmd.focus();
		}
		
		if (Ramu.onKeyDown('enter') && document.activeElement == cmd) {
			interpret(cmd.value)
			cmd.value = ''
		}
	}
	
	const divCanvas = document.getElementsByClassName('div-canvas')[0]
	Ramu.init(divCanvas.clientWidth, 400, divCanvas)
	
}

// Ramu.debugMode = true
