"use strict"

class Activity extends MovableEntity {
	constructor(txt, x, y, w, h) {
		super(x, y, w , h)
		// TODO: make maxWidth break the line when the text trespass the activity boundaries
		this.label = new Ramu.Text(txt, x, y, 100, 5)
		this.tag = 'activity_' + txt
		this.label.tag = `$Text-of({this.tag})`
	}
	
	update() {
		super.update()
		const lineHeight = this.label.getTextHeight();
		this.label.x = this.x + this.width / 2 - this.label.textWidth / 2
		this.label.y = this.y + this.height / 2 + lineHeight / 2
	}
	
	draw() {
		super.draw()
		const percent = (per, val) => (per * val)  / 100
		const centerX = this.x + this.width / 2
		const centerY = this.y + this.height / 2
		const radiousX = percent(50, this.width)
		const radiousY = percent(50, this.height)
		const c = Ramu.ctx
		const oldFillStyle = c.fillStyle
		
		if (Ramu.debugMode)
			c.strokeRect(this.x, this.y, this.width, this.height)
		
		c.fillStyle = this.fillStyle
		c.beginPath()
		c.ellipse(centerX, centerY, radiousX, radiousY, 0, 0, 2 * Math.PI)
		c.fill()
		c.stroke()
		c.fillStyle = oldFillStyle
	}
}
