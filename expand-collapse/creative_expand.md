## Example code to ask the mainFrame to expand/collapse the iframe

To expand/collapse our ad we will need the mainframe to assist so we have to tell him
and the mainframe has to include the [ovkLib](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/ovkvmf.js)
but at least the part for expand taken out of [here](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/expand.js)
This can only work when the iframe is a child of the mainframe. Otherwise the mainFrame may not have access to the frame the adframe is inside. 

Method to get clickURL and other params from iFrame src to get own identifier
```
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
```
The tell the parent what he should do you can use these methods;
```
/* please change 'expandAd' and 'contractAd' to whatever your methods get called by the creative or let the ad call this functions 'as they are' */
expandAd = function() {
    window.top.postMessage('expandAd:;:' + getUriParams.frameId + ':;:' + expandedWidth + ':;:'  + expandedHeight,'*');
};
collapseAd = function() {
    window.top.postMessage('contractAd:;:' + getUriParams.frameId + ':;:' + expandedWidth + ':;:'  + expandedHeight + ':;:' + expandedDirection + ':;:'  + clipValue,'*');
};
```

You will find an example [here](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/src/creative/exampleAds/close.zip)