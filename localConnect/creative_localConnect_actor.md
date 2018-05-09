## Example code for a local connection
#### !! also see localConnect_companion.md !!  
 

To have ads know each other and trigger methods or functions inside you first have to find them in DOM.
Therefore you do not need access to the mainframe the ads can do this on their own when hostet on the same domain.

First we will have to have a method to find the other ads to the ad that will take the lead of the connection
```
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
        for (var i=0; i < scanWindowFrames.length; i++) {
            /* then let's try to access them */
            var aktFrame = scanWindowFrames[i].window;
            try {
                scanWindowFrames[i].document;
                /* ok we have access, is it a companion? */
                if (aktFrame.ovk && aktFrame.ovk.companionId) {
                    var key = aktFrame.ovk.companionId;
                    /* it is, so we check if it fits to the setIdent and we didn't recognize it already */
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
    },
    init: function() {
        this.findOthers(window.top);
        /* let's see if we're finished and found every companion */
        if (this.companionsLength < this.creativeCount && this.tries < this.maxRepeat) {
            /* no, so let's repeat this in 200 ms */
            this.tries++;
            setTimeout('ovk.lc.init()', 200);
        } else if (this.maxRepeat === this.tries) {
            /* no, but now it's enough we don't expect the companions to be loaded anymore, let's call failed() to inform the ad */
            this.failed && this.failed();
        } else {
            /* yes, we're fine, so let's call done() to inform the ad */
            this.done && this.done();
        }
    }
};
```
Inside the ovk.lc object you wil have this properties:

| Property | definition |
| --- | --- |
| setIdent | gives the set a name to avoid colliding with other LCs on page |
| creativeCount | has to bet set to the number of ads being connected |
| maxRepeat | adjustable - to repeat searching but give up after x times |
| tries | internal counter for maxRepeat |
| companions | here you will find the connected ads and can access them like `ovk.lc['lcDemo_layer']` |
| companionsLength | internal counter - don't change |
| findOthers | method to search the dom |
| init | starts the search - can be invoked multiple times if neccassary but has to be invoked once |

After adding the ovk.lc object you now should add callbacks that will be processed after the search has finished.
For this example we added these two callbacks:
``` 
ovk.lc.done
ovk.lc.failed
``` 
You can register them like this but make sure you change the functions to something the ad should do:
``` 
/* these can be or has to be changed for each index.html */

/* optional callback function, will be fired when defined */
ovk.lc.done = function() {
    window.console && console.log("all companions found and loaded, put your script or reference here.");
    for (var comp in ovk.lc.companions) {
        if (ovk.lc.companions.hasOwnProperty(comp)) {
            window.console && console.log(comp + ":");
            window.console && console.log(ovk.lc.companions[comp]);
        }
    }
    /* space for custom functions on success like ad.init() */
    return false;
};

/* optional callback function, will be fired when defined */
ovk.lc.failed = function() {
    window.console && console.log("tried to find all " + this.creativeCount + " companions " + this.tries + " times but failed, aborting...");
    /* space for custom functions on failure */
    return false;
};
``` 
Now we'll give this ad a name for inside of the connection - we can access it after search by this name, e.g. `ovk.lc['lcDemo_layer']`
``` 
/* !!Mandatory!! set ID to something you can recognize later on to find the ad when you need it */
ovk.companionId = ovk.lc.setIdent + "_layer";
``` 
Last but not least we start the search by init()
``` 
ovk.lc.init();
/* end local-connect integration */
``` 

You will find an example [here](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/src/creative/exampleAds/lc_actor.zip)