var ovk = window.ovk || {};
ovk.listenMessage = function(msg){
    if (msg.data && msg.data.match(':;:')) {
        var call = msg.data.split(':;:');
        ovk[call[0]](msg);
    }
}

ovk.expandAd = function(a) {
    // how to handle?
    // shall we use clip: rect() - maybe the best option
    // shall we resize and reposition the iframe
    // shall we get the new dimensions and expand direction by call or set it initially on page
    // or work with two different creatives and hide/show them (critical for counting)

    // clip example
    var call = msg.data.split(':;:');
    document.getElementById(call[1]).style.clip = 'rect(0px " + call[2] + "px " + call[2] + "px 0px)';
}

ovk.collapseAd = function(a, w, h, ori, cut) {
    var call = msg.data.split(':;:');
    var cut = call[4];
    var a1 = "0", b1 = call[2], c1 = call[2], d1 = "0";
    switch (call[3];) {
        case "down": c1 = h - cut; break;
        case "left": d1 = cut; break;
        case "right": b1 = w - cut;	break;
        case "top":	a1 = cut; break;
    }
    document.getElementById(call[1]).style.clip = 'rect(" + a1 + "px " + b1 + "px " + c1 + "px " + d1 + "px)'
}

(window.attachEvent) ? window.attachEvent('onmessage', ovk.listenMessage) : window.addEventListener('message', ovk.listenMessage, false);