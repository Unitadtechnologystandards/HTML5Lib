## Beispielcode für einen CloseAd Aufruf

Die Trägerseite, welche den Befehl ausführen soll muss das Snippet integrieren. Das Snippet kann aber auch über das Ad mit ausgespielt werden.

#### Jedes Ad benötigt einen einzigartigen Bezeichner, eine UniqueId, als Namen, um die Befehle entsprechend zuordnen zu können:
```
var adname = "myAD"; // bitte den Namen passend zum AD selbst setzen
```
#### Ad vom DOM entfernen
```
/* das Ad wird vollständig aus dem DOM entfernt */
closeAd = function() {
    window.top.postMessage('closeAd:;:' + adname ,'*');
};
```
#### Das Ad (wieder) verstecken (nicht entfernen, nur ausblenden):

```
/* das Ad wird mit display: none ausgeblendet */
hideAd = function() {
    window.top.postMessage('hideAd:;:' + adname ,'*');
};
```
#### Das Ad (wieder) einblenden:
```
/* das Ad wird wieder eingeblendet indem display: none (wieder) entfernt wird. */
showAd = function() {
    window.top.postMessage('showAd:;:' + adname ,'*');
};
```

