## Example code to ask the mainFrame to close the iframe

the mainframe has to include the [ovkLib](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/ovkvmf.js)
but at least the part for expand taken out of [here](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/close.js)
This can only work when the iframe is a child of the mainframe. Otherwise the mainFrame may not have access to the frame the adframe is inside.

Method to get clickURL and other params from iFrame src to get own identifier
```
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
```
Remove Ad from DOM


please change function name 'closeAd' to whatever your close-method get called by the creative or 
  let the ad call this function 'as is' when closing the ad
```
/* the ad get's removed from the dom */
closeAd = function() {
    window.top.postMessage('closeAd:;:' + getUriParams.frameId ,'*');
};
```
To hide the ad (again)

please change function name 'hideAd' to whatever your close-method get called by the creative or 
  let the ad call this function 'as is' when closing the ad
```
/* the ad is hidden by display: none */
hideAd = function() {
    window.top.postMessage('hideAd:;:' + getUriParams.frameId ,'*');
};
```
To show the ad (again)
```
/* the ad will be hidden by display: none */
showAd = function() {
    window.top.postMessage('showAd:;:' + getUriParams.frameId ,'*');
};
```

You will find an example [here](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/close/exampleAds/close.zip)