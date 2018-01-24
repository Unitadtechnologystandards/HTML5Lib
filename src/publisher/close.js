/* to be placed on the main frame before rendering the ad */
var ovk = window.ovk || {};
ovk.listenMessage = function(msg){
    if (msg.data && msg.data.match(':;:')) {
        var call = msg.data.split(':;:');
        ovk[call[0]](call[1]);
    }
};

ovk.closeAd = function(a) {
    /* if you need to, use the iframe id to search for your container, otherwise use the following script to get rid of the iframe itself. */
    document.getElementById(a).style.width = '0px';
    document.getElementById(a).style.height = '0px';
    document.getElementById(a).style.display = 'none';
    document.getElementById(a).src = '';
};
(window.attachEvent) ? window.attachEvent('onmessage', ovk.listenMessage) : window.addEventListener('message', ovk.listenMessage, false);