"use strict"
/*
	---------------
	Ramu Extensions
	---------------
*/

/*
	Draws a dashed line
	adapted from de Titus Cieslewski on https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
*/
function arrow(fromx, fromy, tox, toy) {
	const headlen = 10; // length of head in pixels
	const dx = tox - fromx;
	const dy = toy - fromy;
	const angle = Math.atan2(dy, dx);
	
	Ramu.ctx.beginPath()
	Ramu.ctx.setLineDash([2, 5])

	Ramu.ctx.moveTo(fromx, fromy);
	Ramu.ctx.lineTo(tox, toy);
	Ramu.ctx.stroke()
	Ramu.ctx.setLineDash([])

	Ramu.ctx.beginPath()
	Ramu.ctx.moveTo(tox, toy);
	
	Ramu.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
	Ramu.ctx.moveTo(tox, toy);
	
	Ramu.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	
	Ramu.ctx.stroke()
}

/*
	Overriding the Ramu.Text
*/
Ramu.Text = class extends Drawable {
	#largestLine = ''
	lineCount = 1 // não to usando mas posso acabar usando
	align = 'start'
	
	constructor(text, x, y, maxWidth, lineHeight = 25){
		super(x, y, 1, 1, true);
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.text = text;
		this.maxWidth = maxWidth; // this don't break the line in the middle of a word
		this.lineHeight = lineHeight;
		
		this.font = Ramu.ctx.font;
		this.fillStyle = Ramu.ctx.fillStyle;
		
		this.drawOutOfCanvas = true;
	}
	
	/* 
	Do not confuse with "lineHeight" that is basically the padding between the lines.
	This is a aproximation of the one letter height to mensure purposes.
	If is a multiline text then multiply it by the number of lines probably can do
	
	This use the Vic Fanberg solution on https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas and there's better solutions within the page. A properly solution will be provided based on these solutions when this is implemented in ramu 0.8 (the ZachB probably will do)
	*/
	getTextHeight = function() {
		return Ramu.ctx.measureText('M').width
	}

	get textWidth() {
		return Ramu.ctx.measureText(this.text).width;
	}
	
	/* 
		Get the width of the largest line
		The line being a natural line that starts with \n or a 
		unnatural line break caused by the line width being higher than the Ramu.Text.maxWidth
	*/
	get largestLineWidth() {
		return Ramu.ctx.measureText(this.#largestLine).width
	}
	
	start(){
		// this._addLineBreak();
	}

	// Adapted from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial
	draw(){
		let y = this.y, testWidth = 0;
		let line = '', testLine = '', metrics = null;
		
		let largestSize = 0
		let largestLine
		this.lineCount = 1
		
		let oldFont = Ramu.ctx.font;
		let oldStyle = Ramu.ctx.fillStyle;
		
		Ramu.ctx.font = this.font;
		Ramu.ctx.fillStyle = this.fillStyle;
		Ramu.ctx.textAlign = this.align
		
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
			
		for(var n = 0, len = this._words.length; n < len; ++n) {
			testLine = line + this._words[n] + ' ';
			metrics = Ramu.ctx.measureText(testLine);			
			testWidth = metrics.width;
			
			if (this._words[n] == "\\n"){
				Ramu.ctx.fillText(line, this.x, y);
				line = '';
				y += this.lineHeight;
				this.lineCount++
			}
			else if (testWidth > this.maxWidth && n > 0) {
				Ramu.ctx.fillText(line, this.x, y);
				line = this._words[n] + ' ';
				y += this.lineHeight;
				this.lineCount++
			}
			else {
				line = testLine;
			}
			
			if (line.length > largestSize) {
				largestSize = line.length
				this.#largestLine = line
			}
		}
				
		Ramu.ctx.fillText(line, this.x, y);
		Ramu.ctx.font = oldFont;
		Ramu.ctx.fillStyle = oldStyle;
		Ramu.ctx.textAlign = 'start'
	}
	
	_addLineBreak(){ // throwin exception in apathy cloud
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
	}
}
