/* init method to get URI params, where 'clicktag', 'target' and 'frameId' will be passed */
var getUriParams = function() {
	var query_string = {}
	var query = window.location.search.substring(1);
	var parmsArray = query.split('&');
	if(parmsArray.length <= 0) return query_string;
	for(var i = 0; i < parmsArray.length; i++) {
		var pair = parmsArray[i].split('=');
		var val = decodeURIComponent(pair[1]);
		if (val != '' && pair[0] != '') query_string[pair[0]] = val;
	}
	return query_string;
}();

/* one way of using the clicktag is to set the URI from SRC as href and also the target of an a-tag */
document.getElementById('clicktag').setAttribute('href', getUriParams.clicktag).setAttribute('target', getUriParams.target);

/* another way of using the clicktag by using the URI as well as the link-target as window.open param */
function openLandingPage() {
	window.open(getUriParams.clicktag, getUriParams.target);
}

/* to use more than one click tag you have to go on like this: */
document.getElementById('clicktag2').setAttribute('href', getUriParams.clicktag2).setAttribute('target', getUriParams.target2);
/* or */
function openLandingPage() {
	window.open(getUriParams.clicktag2, getUriParams.target2);
}
