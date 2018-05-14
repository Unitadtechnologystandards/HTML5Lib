## Unterstützung von closeAd für OVK HTML5 Ads

Um Creatives zu unterstützen die einen Closeaufruf nach OVK Richtlinie nutzen,
muss folgendes JS auf der Seite vorhanden sein oder mit dem Ad zusammen ausgespielt werden.
Bitte folgende Codezeilen kopieren und vor dem AD/Redirect laden/einfügen:

```
window.top.ovk = window.top.ovk || {
    ads2Handle: {}
};
var ovk = window.top.ovk;

ovk.listenMessage = function(msg){
    if (msg.data && msg.data.match(':;:')) {
        var call = msg.data.split(':;:');
        if (!ovk.ads2Handle[call[1]]) {
            ovk.walkFrames(call[1], window.top, msg);
        }
        ovk[call[0]](msg);
    }
};

ovk.walkFrames = function(adName, w, event) {
    /* hiermit werden frames die wir noch nicht kennen gesucht und registriert */
    var i,
        frameAccessElem,
        currentFrame;
    for (i = 0; i < w.frames.length; i++) {
        currentFrame = w.frames[i];
        if (event.source.window === currentFrame) {
            try {
                this.ads2Handle[adName] = w.document.getElementsByTagName("iframe")[i];
            }catch(e) {}
        }
        if (currentFrame.frames.length > 0) {
            this.walkFrames(currentFrame);
        }
    }
};

ovk.closeAd = function(msg) {
    /* if you need to, use the iframe id to search for your container, otherwise use the following script to get rid of the iframe itself. */
    var call = msg.data.split(':;:');
    this.ads2Handle[call[1]].style.width = '0px';
    this.ads2Handle[call[1]].style.height = '0px';
    this.ads2Handle[call[1]].style.display = 'none';
    this.ads2Handle[call[1]].style.visibility = 'hidden';
    this.ads2Handle[call[1]].src = '';
};
(window.attachEvent) ? window.attachEvent('onmessage', ovk.listenMessage) : window.addEventListener('message', ovk.listenMessage, false);
```