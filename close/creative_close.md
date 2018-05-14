## Beispielcode für einen CloseAd Aufruf

Die Trägerseite die den Befehl ausführen soll mussen entweder die [ovkLib](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/ovkvmf.js)
oder zumindest das Snippet des dort extrahierten Befehls [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/blob/master/src/publisher/close.js)
integrieren. Das Snippet kann auch über das AD mit ausgespielt werden.

#### Jedes AD benötigt einen inzigartigen Bezeichner, eine UniqueId, als Namen, um die Befehle entsprechend zuordnen zu können:
```
var adname = "myAD"; // bitte den Namen passend zum AD selbst setzen
```
#### Ad vom DOM entfernen
```
/* das AD wird vollständig aus dem DOM entfernt */
closeAd = function() {
    window.top.postMessage('closeAd:;:' + adname ,'*');
};
```
#### Das AD (wieder) verstecken (nicht entfernen nur ausblenden):

```
/* das ad wird mit display: none ausgeblendet */
hideAd = function() {
    window.top.postMessage('hideAd:;:' + adname ,'*');
};
```
#### Das AD (wieder) einblenden:
```
/* das AD wird wieder eingeblendet indem display: none (wieder) entfernt wird. */
showAd = function() {
    window.top.postMessage('showAd:;:' + adname ,'*');
};
```

##### Ein Beispiel findet sich [hier](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/close/exampleAds/close.zip)