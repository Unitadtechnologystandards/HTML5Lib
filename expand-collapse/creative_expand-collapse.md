## Beispielcode zur Integration Expand/Collapse

Die Trägerseite die den Befehl ausführen soll muss das Snippet integrieren. Das Snippet kann auch über das Creative mit ausgespielt werden.

#### Jedes Ad benötigt einen einzigartigen Bezeichner, eine UniqueId, als Namen, um die Befehle entsprechend zuordnen zu können:
```
var adname = "myAD"; // bitte den Namen passend zum Ad selbst setzen
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
