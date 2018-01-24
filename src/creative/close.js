/* to be placed in the ad at the end*/
/* init method to get URI params, where 'frameId' will be passed, should already be included from clicktag.js */
var getUriParams = function() {
	var query_string = {};
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

/* please change function name 'closeAd' to whatever your close-method get called by the creative or let the ad call this function 'as is' when closing the ad */
/* the ad get's removed from the dom */
closeAd = function() {
    window.top.postMessage('closeAd:;:' + getUriParams.frameId ,'*');
};

/* please change function name 'hideAd' to whatever your close-method get called by the creative or let the ad call this function 'as is' when closing the ad */
/* the ad is hidden by display: none */
hideAd = function() {
    window.top.postMessage('hideAd:;:' + getUriParams.frameId ,'*');
};

/* the ad is hidden by display: none */
showAd = function() {
    window.top.postMessage('showAd:;:' + getUriParams.frameId ,'*');
};