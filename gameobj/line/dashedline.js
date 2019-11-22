"use strict"

class DashedLine extends Line {
	text = ''
	constructor(link) {
		super(link)
		this.label = new Ramu.Text('', 10, 10, 100, 15)		
	}

	toJSON() {
		let data = super.toJSON()
		data.text = this.text
		return data
	}
	
	update() {
		let x = (this.originX + this.targetX) / 2
		let y = (this.originY + this.targetY) / 2
		super.update()
		this.label.text = this.text
		this.label.x = x
		this.label.y = y
	}

	draw() {
		arrow(this.originX, this.originY, this.targetX, this.targetY)
	}

	destroy() {
		super.destroy()
		this.label.destroy()
	}
}
