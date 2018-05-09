## Example code for a local connection

Folgendes Script muss zunächst in jedem AdElement integriert werden:
 
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
		currentFrame = w.frames[i];
		try {
			frameAccessElem = currentFrame.document;
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

'use strict';
window.addEventListener('frameconnectorstart', function () {
    window.localConnectStart && localConnectStart();
});
```

Jetzt konfiguriert man die LocalConnection auf die Kampagne.
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
| windowCount | Anzahl der zugehörigen AdElemente |

Das letzte AdElement informiert alle Elemente, dass die LocalConnection vollständig geladen und aufgebaut wurde.
Dabei wird in jedem AdFrame folgender Aufruf erzeugt, wenn die Methode/Funktion vorhanden ist:

```
localConnectStart();
```
