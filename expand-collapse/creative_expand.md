## Example code to ask the mainFrame to expand/collapse the iframe

Die Trägerseite die den Befehl ausführen soll mussen entweder die [ovkLib](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/ovkvmf.js)
oder zumindest das Snippet des dort extrahierten Befehls [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/expand.js)
integrieren. Das Snippet kann auch über das AD mit ausgespielt werden.

#### Jedes AD benötigt einen einzigartigen Bezeichner, eine UniqueId, als Namen, um die Befehle entsprechend zuordnen zu können:
```
var adname = "myAD"; // bitte den Namen passend zum AD selbst setzen
```

Nun kann die Trägerseite informiert werden, dass das Creative die Größe verändert, als Beispiel kann das verwendet werden:

```
/* Die Methoden 'expandAd' and 'contractAd' können benutzt werden wie sie sind oder umbenannt und erweitert werden, solange die PostMessage beibehalten wird. */
expandAd = function() {
    window.top.postMessage('expandAd:;:' + adname + ':;:' + expandedWidth + ':;:'  + expandedHeight,'*');
};
collapseAd = function() {
    window.top.postMessage('contractAd:;:' + adname + ':;:' + expandedWidth + ':;:'  + expandedHeight + ':;:' + expandedDirection + ':;:'  + clipValue,'*');
};
```

Ein Beispiel findet sich [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/expand-collapse/exampleAds/expand.zip)