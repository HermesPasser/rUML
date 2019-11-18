"use strict"
/*
	---------------
	Ramu Extensions
	---------------
*/

/* 
	Do not confuse with "lineHeight" that is basically the padding between the lines.
	This is a aproximation of the one letter height to mensure purposes.
	If is a multiline text then multiply it by the number of lines probably can do
	
	This use the Vic Fanberg solution on https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas and there's better solutions within the page. A properly solution will be provided based on these solutions when this is implemented in ramu 0.8 (the ZachB probably will do)
*/
Ramu.Text.prototype.getTextHeight = function() {
	const oldFont = Ramu.ctx.font
	Ramu.ctx.font = this.font
	const aproximation = Ramu.ctx.measureText('M').width
	Ramu.ctx.font = oldFont
	return aproximation
}

	