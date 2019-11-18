"use strict"

class MovableEntity extends Drawable {
	margin = 5
	fillStyle = '#fdfd96'
	
	constructor(x, y, w, h) {
		super(x, y, w, h, true)
		this.clickable = new Clickable(x, y, w, h)
		this.clickable.onClick = () => { this.move = !this.move } /*this is pointing to Movable*/
		this.move = false
	}
	
	_updateClickableRect() {
		this.clickable.x = this.x
		this.clickable.y = this.y
		this.clickable.width = this.width
		this.clickable.height = this.height
	}
	
	_updatePosition() {
		if (!this.move)
			return
		
		this.x = Ramu.mousePosition.X
		this.y = Ramu.mousePosition.Y	
	}
	
	update() {
		this._updateClickableRect()
		this._updatePosition()
	}
	
	get topAnchor() {
		return { x: this.x + this.width / 2, y: this.y - this.margin }
	}
	
	get leftAnchor() {
		return { x: this.x - this.margin, y: this.y + this.height / 2 }
	}
	
	get rightAnchor() {
		return { x: this.x + this.width + this.margin, y: this.y + this.height / 2 }
	}
	
	get bottomAnchor() {
		return { x: this.x + this.width / 2, y: this.y + this.height + this.margin }
	}
	
	draw() {
		if (Ramu.debugMode) {		
			Ramu.ctx.strokeRect(this.x, this.y, this.width, this.height)
			
			Ramu.ctx.fillStyle = 'blue'
			Ramu.ctx.fillRect(this.topAnchor.x, this.topAnchor.y, 2, 2)
			Ramu.ctx.fillRect(this.bottomAnchor.x, this.bottomAnchor.y, 2, 2)
			Ramu.ctx.fillRect(this.leftAnchor.x, this.leftAnchor.y, 2, 2)
			Ramu.ctx.fillRect(this.rightAnchor.x, this.rightAnchor.y, 2, 2)
			Ramu.ctx.fillStyle = 'black'
		}
	}
}
