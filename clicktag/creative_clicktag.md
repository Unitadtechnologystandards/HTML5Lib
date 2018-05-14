## Beispielcode zur Integration clicktracking

### Method to get clickURL and other params from iFrame src
```
/* init method to get URI params, where 'clicktag', 'target' and 'frameId' will be passed */
var getUriParams = function () {
	var p, params = {};
	if (location.search) {
		location.search.substr(1).split('&').forEach(function (e) {
			p = e.split('=');
			params[p[0]] = decodeURIComponent(p[1]);
		});
	}
	return params;
}();
```

Nun können alle Parameter der URL ausgelesen werden, zum Beispiel:
```
getUriParams.clicktag
getUriParams.target
```

one way of using the clicktag is to set the URI from SRC as href and also the target of an a-tag
```
document.getElementById('clicktag').setAttribute('href', getUriParams.clicktag);
document.getElementById('clicktag').setAttribute('target', getUriParams.target);
```

another way of using the clicktag by using the URI as well as the link-target as window.open param
```
function openLandingPage() {
	window.open(getUriParams.clicktag, getUriParams.target);
}
```
to use more than one click tag you have to go on like this:
```
document.getElementById('clicktag2').setAttribute('href', getUriParams.clicktag2);
document.getElementById('clicktag2').setAttribute('target', getUriParams.target2);
```
or you also can do something like this
```
function openLandingPageByParams(uri, target) {
    uri = uri || getUriParams.clicktag;
    target = target || getUriParams.target;
	window.open(uri, target);
}
```
You will find an example [here](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/clicktag/exampleAds/clicktag.zip)
