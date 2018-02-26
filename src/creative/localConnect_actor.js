/* init ovk object for separate namespace this is the same for each index.html */
var ovk = window.ovk || {};
ovk.lc = {
	setIdent: 'lcDemo', // has to be the same for a linked set
	creativeCount: 2, // change to sum of number of connected elements, 2 means there is e.g. one banner and one layer connected
	maxRepeat: 10, // changeable if necessary
	tries: 0,
	companions: {},
	companionsLength: 0,
	findOthers: function(target) {
		/* check if there are frames in this document */
		var scanWindowFrames = target.frames || '';
		if (scanWindowFrames.length === 0) return;
		for (i=0; i < scanWindowFrames.length; i++) {
			/* then let's try to access them */
			try {
				scanWindowFrames[i].document;
				var aktFrame = scanWindowFrames[i].window;
				/* ok we have access, is it a companion? */
				if (aktFrame.ovk && aktFrame.ovk.companionId) {
					var key = aktFrame.ovk.companionId;
					/* it is, so we check if it fits to the setIdent and we didn't recognise it already */
					if (!this.companions[key] && aktFrame.ovk.companionId.match(this.setIdent)) {
						this.companions[key] = aktFrame;
						this.companionsLength++;
					}
				} else {
					/* if not, check if there are any other frames inside */
					this.findOthers(aktFrame);
				}
			} catch(e) {
                this.findOthers(aktFrame);
			}
		}
		/* let's see if we're finished and found every companion */
		if (this.companionsLength < this.creativeCount-1 && this.tries < this.maxRepeat) {
			/* no, so let's repeat this in 200 ms */
			this.tries++;
			setTimeout('ovk.lc.findOthers(window.top)', 200);
		} else if (this.maxRepeat === this.tries) {
			/* no, but now it's enough we don't expect the companions to be loaded anymore, let's call failed() to inform the ad */
			this.failed && this.failed();
		} else {
			/* yes, we're fine, so let's call done() to inform the ad */
			this.done && this.done();
		}
	},
	init: function() {
		this.findOthers(window.top);
	}
};

/* these can be or has to be changed for each index.html */
/* optional callback function, will be fired when defined */
ovk.lc.failed = function() {
    window.console && console.log("tried to find all " + this.creativeCount + " compagnions " + this.tries + " times but failed, aborting...");
	/* space for custom functions on failure */
	return false;
};

/* optional callback function, will be fired when defined */
ovk.lc.done = function() {
    window.console && console.log("all compagnions found and loaded, put your script or reference here.");
	/* space for custom functions on success like ad.init() */
	return false;
};

/* !!Mandatory!! set ID to something you can recognise later on to find the ad when you need it */
ovk.companionId = ovk.lc.setIdent + "_layer";

ovk.lc.init();
/* end localconnect integartion */