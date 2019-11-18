"use strict"

class Line extends Drawable {
	to = null
	from = null
	originX = 0
	originY = 0
	targetX = 0
	targetY = 0
	
	constructor(link) {
		super(0, 0, 0, 0, true)
		this.from = link.from
		this.to = link.to
	}
	
	update() {  
		if (this.from.x  < this.to.x) {		
			if (this.from.y  < this.to.y) {
				const ob = this.from.bottomAnchor,
					  tt = this.to.topAnchor
				this.originX = ob.x;
				this.originY = ob.y 
				this.targetX = tt.x; this.targetY = tt.y
			} else {
				const or = this.from.rightAnchor,
					  tl = this.to.leftAnchor
				this.originX = or.x; this.originY = or.y
				this.targetX = tl.x; this.targetY = tl.y	
			}	
		} else {		
			if (this.from.y < this.to.y) {
				const ol = this.from.leftAnchor,
					  tr = this.to.rightAnchor
				this.originX = ol.x; this.originY = ol.y
				this.targetX = tr.x; this.targetY = tr.y 
			} else {
				const ot = this.from.topAnchor, 
					  tb = this.to.bottomAnchor
				this.originX = ot.x; this.originY = ot.y	
				this.targetX = tb.x; this.targetY = tb.y
			}
		}	
	}
	
	draw() {
		if (Ramu.debugMode) // draw the origin (from) side 
			Ramu.ctx.fillRect(this.originX, this.originY, 2, 2)
		
		Ramu.ctx.beginPath()
		Ramu.ctx.lineTo(this.originX, this.originY)
		Ramu.ctx.lineTo(this.targetX, this.targetY)
		Ramu.ctx.stroke()
	}
}
