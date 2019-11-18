"use strict"

const type = { 
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

// ---------- ---------- ---------- //
// ---------- Ramu logic ---------- //
// ---------- ---------- ---------- //

const a = new Activity("emitir nota", 300, 200, 75, 50)
const g1 = new Actor(100,100, 40,40, 'user')
const g2 = new Actor(300, 300, 40, 40, 'adm')
const li = new Line(new Link(g1, a))
const li2 = new Line(new Link(g2, a))

Ramu.init()
// Ramu.debugMode = true

// como retirar o link entre dois atores? tem que remover a linha. Talvez percorrer nas linhas
// até achar aquela que tem os dois objs com a tag dos atores/atividades
