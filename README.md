## HTML5Lib - a collection of scripts to use within HTML5 AdCreation and AdServing  

The main challenge by serving HTML5 Ads is [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
The former used object tag to serve the flash plugin has been part of the main page, therefore actionScript could easily access all informations
form the mainpage and invoke functions if they have been there.

HTML5 are HTML documents, the same like each other website on the world, included within an iFrame pointing to a foreign domain.
CORS concludes to never let a frame access another frame of a different origin.
That means that a script within an HTML5 AD is not allowed to resize it's own iFrame or manipulate any other element on the main page by his owm like flash could via actionScript

To make this work HTML5 itself offers a communicator called ["postMessage"](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
This allows us to send information to any frame even if do may not access it directly.

### without postMessage Use Cases

Some features do not need communication with the mainpage while working, these are

```
* clicktag
* localConnect

```

### postMessage Use Cases

These action will need to have a postMessage support:

```

* Expand/Collapse
* Hide/Show/Close

```

### full library

The repository also offers the former library state April 2015.
However, the snippets are written to work either the full lib is already integrated or not

### Support or Contact

This repository is meant to be reviewed and updated by each member of OVK.

If you have questions please submit an [issue](https://github.com/Unitadtechnologystandards/HTML5Lib/issues) or send a mail to ![info@bvdw.org](mailto:info@bvdw.org) subject **HTML5Lib**
