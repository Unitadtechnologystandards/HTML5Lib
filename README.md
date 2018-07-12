## HTML5 Snippets by OVK - eine Kollektion kurzer Skripte zur Verwendung in Creatives und/oder der AdServing Seite

HTML5-Werbemittel haben sich mittlerweile am Markt etabliert. Dennoch bereiten in der Praxis einige Funktionalitäten, abhängig von der umgebenden Webseite, noch immer Probleme.
Die dabei wohl größte Herausforderung stellt [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) dar.
Der früher verwendete Object-Tag, um Flashbanner auszuliefern war Teil der Haupt-Website. Das in Flash integrierte ActionScript konnte daher problemlos auf alle nöttigen Informationen auf der Website
zugreifen und Javascript-Funktionen und Methoden aufrufen, die dort registriert sind.

Ein HTML5 AD ist ein HTML Dokument, genau wie die Website selbst, über einen iFrame in Letzterem integriert.
Ein iFrame ist also ein Dokument in einem Dokument. CORS erlaubt nun den Zugriff von einem Dokument ins Andere nur,
wenn beide Dokumente demselben Ursprung angehören.
Folglich ist es einem Javascript innerhalb eines HTML5 AD Dokuments nicht gestattet, auf das Dokument der Website zuzugreifen,
oder Elemente auf dieser zu ändern, bzw. zu manipulieren wie Flash es mit ActionScript konnte.

Das aber bedeutet nicht, dass diese Optionen nun wegfallen, HTML5 selbst bietet eine Lösung,
eine Möglichkeit Informationen zwischen den Dokumenten auszutauschen, genannt ["postMessage"](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
Damit ist es möglich Informationen aus dem Ad an die Website oder umgekehrt zu senden.

### Use Cases ohne postMessage

Einige Funktionalitäten können ohen Kommunikation mit der Website umgesetzt werden, darunter folgende:

```
* clicktag
* localConnect
```

### Use Cases mit postMessage

Diese Funktionalitäten hingegen erfordern eine Kommunikation und damit Code auf beiden Seiten:

```
* Expand/Collapse
* Hide/Show/Close
```

### Support/Kontakt

Dieses Repository wird von Mitgliedern des OVK betreut und gepflegt.

Bei Fragen oder Anregungen erstellen sie gerne eine Anfrage als [Github-Issue](https://github.com/Unitadtechnologystandards/HTML5Lib/issues)
oder senden Sie uns eine Mail an [info@bvdw.org](mailto:info@bvdw.org) mit dem Betreff **HTML5 Snipptes**
