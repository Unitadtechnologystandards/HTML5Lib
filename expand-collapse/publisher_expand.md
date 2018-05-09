##Support collapse/expand for OVK HTML5 Ads

Um Creatives zu unterstützen die Expand/Collapse nach OVK nutzen nuss folgendes JS auf der Seite vorhanden sein oder mit dem Ad zusammen ausgespielt werden.
Bitte folgende Codezeilen kopieren:

```
window.top.ovk = window.top.ovk || {
    windowSearch: {}
};
var ovk = window.top.ovk;

ovk.listenMessage = function(msg){
    if (msg.data && msg.data.match(':;:')) {
        var call = msg.data.split(':;:');
        if (!ovk.windowSearch[call[1]]) {
            ovk.walkFrames(call[1], window.top, msg);
        }
        ovk[call[0]](msg);
    }
};

ovk.walkFrames = function(adName, w, event) {
    /* check the document for the given adframe */
    var i,
        frameAccessElem,
        currentFrame;
    for (i = 0; i < w.frames.length; i++) {
        currentFrame = w.frames[i];
        if (event.source.window === currentFrame) {
            this.windowSearch[adName] = w.document.getElementsByTagName("iframe")[i];
        }
        if (currentFrame.frames.length > 0) {
            this.walkFrames(currentFrame);
        }
    }
};

ovk.expandAd = function(msg) {
};

ovk.collapseAd = function(msg) {
};

(window.attachEvent) ? window.attachEvent('onmessage', ovk.listenMessage) : window.addEventListener('message', ovk.listenMessage, false);
```

## Beispiele:

#### rudimentäres expandieren eines adframes
```
ovk.expandAd = function(msg) {
    var call = msg.data.split(':;:');
    this.windowSearch[call[1]].style.width = call[2] + "px";
    this.windowSearch[call[1]].style.height = call[3] + "px";
    myExpandMethod(msg);
};
```

#### Weiterleitung des Expandbefehls an eine eigene Methode
```
ovk.expandAd = function(msg) {
    myExpandMethod(msg);
};
```