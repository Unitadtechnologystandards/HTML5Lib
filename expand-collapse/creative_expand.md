## Example code to ask the mainFrame to expand/collapse the iframe

Die Trägerseite die den Befehl ausführen soll mussen entweder die [ovkLib](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/ovkvmf.js)
oder zumindest das Snippet des dort extrahierten Befehls [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/expand.js)
integrieren. Das Snippet kann auch über das AD mit ausgespielt werden.

This can only work when the iframe is a child of the mainframe. Otherwise the mainFrame may not have access to the frame the adframe is inside. 
#### Jedes AD benötigt einen inzigartigen Bezeichner, eine UniqueId, als Namen, um die Befehle entsprechend zuordnen zu können:
```
var adname = "myAD"; // bitte den Namen passend zum AD selbst setzen
```

The tell the parent what he should do you can use these methods;

```
/* please change 'expandAd' and 'contractAd' to whatever your methods get called by the creative or let the ad call this functions 'as they are' */
expandAd = function() {
    window.top.postMessage('expandAd:;:' + adname + ':;:' + expandedWidth + ':;:'  + expandedHeight,'*');
};
collapseAd = function() {
    window.top.postMessage('contractAd:;:' + adname + ':;:' + expandedWidth + ':;:'  + expandedHeight + ':;:' + expandedDirection + ':;:'  + clipValue,'*');
};
```

Ein Beispiel findet sich [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/expand-collapse/exampleAds/close.zip)