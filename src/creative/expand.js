/* to be placed in the ad at the end*/
/* init method to get URI params, where 'frameId' will be passed, should already be included from clicktag.js */
var getUriParams = function() {
	var query_string = {}
	var query = window.location.search.substring(1);
	var parmsArray = query.split('&');
	if(parmsArray.length <= 0) return query_string;
	for(var i = 0; i < parmsArray.length; i++) {
		var pair = parmsArray[i].split('=');
		var val = decodeURIComponent(pair[1]);
		if (val !== '' && pair[0] !== '') query_string[pair[0]] = val;
	}
	return query_string;
}();

/* please change 'expandAd' and 'contractAd' to whatever your methods get called by the creative or let the ad call this functions 'as they are' */
expandAd = function() {
    window.top.postMessage('expandAd:;:' + getUriParams.frameId + ':;:' + expandedWidth + ':;:'  + expandedHeight,'*');
};
collapseAd = function() {
    window.top.postMessage('contractAd:;:' + getUriParams.frameId + ':;:' + expandedWidth + ':;:'  + expandedHeight + ':;:' + expandedDirection + ':;:'  + clipValue,'*');
};