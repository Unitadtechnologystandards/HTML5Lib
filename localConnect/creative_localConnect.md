## Beispielcode für eine LocalConnect

Folgendes Script muss zunächst in jedem Werbeelement integriert werden:
 
```
'use strict';
function Connector(conf) {
	this.name = conf.connectionName;
	this.windowName = conf.windowName;
	this.windowCount = conf.windowCount;
	this.windows = {};
	this.windowSearch = {};
}
Connector.prototype.finalize = function () {
	Object.keys(this.windowSearch).forEach(function (wn) {
		this.windowSearch[wn][this.name].windows = this.windowSearch;
		window[this.name] = this.windowSearch;
		this.windowSearch[wn].dispatchEvent(this.windowSearch[wn][this.name].connectionStart);
	}, this);
};
Connector.prototype.walkFrames = function (w) {
	var i,
		framesLength,
		frameAccessElem,
		currentFrame;
	if (!w) {
		w = top;
	}
	framesLength = w.frames.length;
	for (i = 0; i < framesLength; i++) {
		frameAccessElem = "";
		currentFrame = w.frames[i];
		try {
			frameAccessElem = currentFrame.document.domain;
		} catch (e) {}
		if (frameAccessElem && currentFrame[this.name]) {
			this.windowSearch[currentFrame[this.name].windowName] = currentFrame;
			if (Object.keys(this.windowSearch).length === this.windowCount) {
				this.finalize();
			}
		}
		if (currentFrame.frames.length > 0) {
			this.walkFrames(currentFrame);
		}
	}
};
Connector.prototype.init = function () {
	this.connectionStart = document.createEvent('Event');
	this.connectionStart.initEvent('frameconnectorstart', true, true);
	this.walkFrames();
};

window.addEventListener('frameconnectorstart', function () {
    window.localConnectStart && localConnectStart();
});
```

Jetzt konfiguriert man das LocalConnect auf die Kampagne.
Hierzu bitte dieses Script einfügen und anpassen:

```
'use strict';
window.addEventListener('DOMContentLoaded', function () {
    window.myLocalConnect = new Connector({
        connectionName: 'myLocalConnect',
        windowName: 'firstElement',
        windowCount: 3
    });
    window.myLocalConnect.init();
});
```
Bitte wie folgt anpassen:

| Property | Definition |
| --- | --- |
| connectionName | muss für das Set an ADS identisch sein |
| windowName | name innerhalb des LocalConnects |
| windowCount | Anzahl der zugehörigen Werbeelemente |

Das letzte Werbeelement informiert alle Elemente, dass das LocalConnect vollständig geladen und aufgebaut wurde.
Dabei wird in jedem AdFrame folgender Aufruf erzeugt, wenn die Methode/Funktion vorhanden ist:

```
localConnectStart();
```

Die einzelnen Werbeelemente stehen nun allen Frames zur Verfügung. Hierbei werden Informationen aus der Konfiguration genutzt und in folgendem Schema erfasst:
```
%%connectionName%%.windows.%%windowName%%
```
 
Sie können nun angesprochen werden über:

```
myLocalConnect.windows.firstElement
```

bzw. auch über den Namen direkt

```
firstElement
```

