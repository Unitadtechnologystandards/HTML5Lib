## Beispielcode zur Integration clicktracking

### Folgende Methode kann so wie sie ist benutzt werden um Parameter eines iFrames auszulesen
```
/* initiale Methode um URL Parameter auszulesen, unter Anderem 'clicktag' und 'target' */
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
Eine Art "clicktag" zu nutzen wäre die URL als href Attribut eine a-Tags zu nutzen:
```
document.getElementById('clicktag').setAttribute('href', getUriParams.clicktag);
document.getElementById('clicktag').setAttribute('target', getUriParams.target);
```
Ein anderer Weg ist die Nutzung unter Verwendung von window.open:
```
function openLandingPage() {
	window.open(getUriParams.clicktag, getUriParams.target);
}
```
Wenn mehr als ein Clicktag genutzt werden soll:
```
document.getElementById('clicktag2').setAttribute('href', getUriParams.clicktag2);
document.getElementById('clicktag2').setAttribute('target', getUriParams.target2);
```
Es kann natürlich auch jeder andere eigene Ansatz genutzt werden:
```
function openLandingPageByParams(uri, target) {
    uri = uri || getUriParams.clicktag;
    target = target || getUriParams.target;
	window.open(uri, target);
}
```
Ein Beispiel findet sich [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/clicktag/exampleAds/clicktag.zip)
