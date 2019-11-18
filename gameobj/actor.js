"use strict"

class Actor extends MovableEntity {
	constructor(x, y, w, h, txt) {
		super(x, y, w , h)
		this.label = new Ramu.Text(txt, x, y, 100, 5)
		this.tag = 'actor_' + txt
		this.label.tag = `$Text-of({this.tag})`
	}
	
	update() {
		super.update()
		this.label.x = this.x + this.width / 2 - this.label.textWidth / 2
		this.label.y = this.y + this.height + 5
	}
	
	draw() {
		super.draw()
		const percent = (per, val) => (per * val)  / 100
		const halfWidth = this.width / 2
		const halfHeigh = this.height / 2
		const centerX = this.x + halfWidth
		const radius = percent(15, this.width)
		const bodyY = this.y + (2 * radius)
		const bodyHeight = this.height - (2 * radius)
		const halfBodyHeight = bodyHeight / 2
		const c = Ramu.ctx
		const oldFill = c.fillStyle
		
		// head
		c.fillStyle = this.fillStyle
		c.beginPath()
		c.arc(centerX, this.y + radius, radius, 0, 2 * Math.PI)
		c.fill()
		c.stroke()
		c.fillStyle = oldFill
		
		// body
		c.beginPath()
		c.moveTo(centerX, bodyY)
		c.lineTo(centerX, bodyY + bodyHeight/2)
		c.stroke()
		
		// right arm
		c.beginPath()
		c.moveTo(centerX, bodyY)
		c.lineTo(centerX + halfWidth, this.y + halfHeigh)
		c.stroke()
		
		// left arm
		c.beginPath()
		c.moveTo(centerX, bodyY)
		c.lineTo(centerX - halfWidth, this.y + halfHeigh)
		c.stroke()
		
		// right leg
		c.beginPath()
		c.moveTo(centerX, bodyY + halfBodyHeight)
		c.lineTo(centerX + halfWidth, bodyY + bodyHeight)
		c.stroke()
				
		// left leg
		c.beginPath()
		c.moveTo(centerX, bodyY + halfBodyHeight)
		c.lineTo(centerX - halfWidth, bodyY + bodyHeight)
		c.stroke()
	}
}
