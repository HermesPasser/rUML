"use strict"

// TODO: make maxWidth break the line when the text trespass the activity boundaries in the Ramu.Text
// AND make the activity size increse if the number of lines of text
// surpass the size of the activity baloon
class Activity extends MovableEntity {
	constructor(x, y, w, h, txt) {
		super(x, y, w , h, txt)
		this.tag = 'activity_' + txt
	}
	
	update() {
		super.update()
		let lineHeight = this.label.getTextHeight() / 2
		if (this.label.lineCount > 1)
			lineHeight -= this.label.lineHeight / 2
		this.label.x = this.x + this.width / 2 - this.label.largestLineWidth / 2
		this.label.y = this.y + this.height / 2 + (lineHeight)
	}
	
	drawEntity() {
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
