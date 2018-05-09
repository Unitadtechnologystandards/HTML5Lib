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
        ovk[call[0]](call);
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

ovk.expandAd = function(call) {
    // here the publisher/marketer has to set their own methods to expand e.g.:
    this.windowSearch[call[1]].style.width = call[2] + "px";
    this.windowSearch[call[1]].style.height = call[3] + "px";

    // but you can also redirect to your own method as this:
    myExpandMethod(call);

    // TODO: do we need to => if !window.top call postMessage to next parent :)
};

ovk.collapseAd = function(a, w, h, ori, cut) {
    // here the publisher/marketer has to set their own methods to collapse

    this.windowSearch[call[1]].style.width = call[2] + "px";
    this.windowSearch[call[1]].style.height = call[3] + "px";

    // but you can also redirect to your own method as this:
    myCollapseMethod(call);
    // TODO: do we need to => if !window.top call postMessage to next parent :)
};

(window.attachEvent) ? window.attachEvent('onmessage', ovk.listenMessage) : window.addEventListener('message', ovk.listenMessage, false);
