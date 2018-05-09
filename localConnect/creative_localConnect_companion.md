## Example code for a local connection
#### !! also see localConnect_actor.md !!  
 

To have ads know each other and trigger methods or functions inside you first have to find them in DOM.
Therefore you do not need access to the mainframe the ads can do this on their own when hostet on the same domain.

As for the companions we only have to add this code to our ads:
```
var ovk = window.ovk || {};
ovk.lc = ovk.lc || {
	setIdent: 'lcDemo'
};
ovk.companionId = ovk.lc.setIdent + '_banner';
```
Please make sure `setIdent` is set to the same value as the actor is set to and beware that `ovk.companionId` has to be unique.

You will find an example [here](https://github.com/Unitadtechnologystandards/HTML5Lib/raw/master/src/creative/exampleAds/lc_companion.zip)