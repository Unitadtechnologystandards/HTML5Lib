  /**
  * @description: This is a framework-object to be used on the publisher-side
  * providing helping functions to agencies programming mobile ads
  * @author: OVK (circle of online marketers in germany)
  * @version: 0.0.1
  */
  
  ovkvmf = prototype = {

    //current version
    ovkvmfv: "0.0.1",
    //Ads on the current page to handle
    ads2Handle: new Array(),
    //expandable Ads on the current page to handle
    expHandle: new Array(),

    /** 
    * constructor
    * @return object instance of this object
    */
    constructor: function() { return this },

    /** 
    * returns current version 
    * @return string current version of this framework
    */
    getVersion: function() {
      return ovkvmf;
    },

    /**
    * sets unique ids for any iFrame on the current page
    * sends a postMessage to any iFrame to set iFrame-id and retrieve name of ad (for localConnections)
    * also sends the initial current statuses (as window-size and scroll-position) to each ad
    * @return void
    */
    loaded: function () {
      var fr = document.getElementsByTagName("iframe");
      for(var i = 0; i < fr.length; i++) {
        if((fr[i].id == undefined) || (fr[i].id == null) || (fr[i].id == "")) {
          fr[i].id = 'ovkmfAd_'+(new Date().getTime());
        }
        try {
          fr[i].contentWindow.postMessage("registerAs:;:"+fr[i].id);
        } catch(e) {
          jQuery('#'+fr[i].id).bind('load', function(e) { 
            document.getElementById(e.currentTarget.id).contentWindow.postMessage("registerAs:;:"+e.currentTarget.id, '*');
          });
        }
      }
      if(window.addEventListener) {
        window.addEventListener("message", this.listenOVKAdMessage, false);
      } else {
        window.attachEvent("onmessage", this.listenOVKAdMessage);
      }
      $( window ).scroll(function(event) {
        ovkvmf.propagateWinScroll();
      });

      $(window).resize(function() {
        ovkvmf.propagateWinResize();
      });
    },

    /**
    * waits until all iFrames are loaded and calls the internal function 'loaded'
    * @return: void
    */
    init: function() {
      $( document ).ready(function() {
        ovkvmf.loaded();
      });
    },

    /**
    * listener for postMessages sent by any ad, using this framework
    * @param: string msg defined message sent (elements divided by :;:)
    * @return: void
    */
    listenOVKAdMessage: function(msg) {
      if(msg.data) {
        var calls = msg.data.split(":;:");
        //initial call from any ad, bringing together iFrame-id and name of ad (given by itself)
        if(calls[0] == "registerAd") {
          var adId    = calls[1];
          var adName  = calls[2];
          ovkvmf.ads2Handle.push({name: adName, id: adId, exp: null, cont: null});
          ovkvmf.sendWinResize(adId);
          ovkvmf.sendPageSize(adId);
        }
        //call, when an ad sends a customCommand (via localConnection) to another
        if(calls[0] == "sendAd") {
          var toAdId    = calls[1];
          var adMessage = calls[2];
          for(var i = 0; i < ovkvmf.ads2Handle.length; i++) {
            var names = ovkvmf.ads2Handle[i].name.split("_");
            if(names[0] == toAdId) {
              document.getElementById(ovkvmf.ads2Handle[i].id).contentWindow.postMessage("cc:;:"+adMessage, '*');
            }
          }
        }
        //expand an ad (can be called by itself or another ad)
        if(calls[0] == "expandAd") {
          var toAdId    = calls[1];
          for(var i = 0; i < ovkvmf.ads2Handle.length; i++) {
            var names = ovkvmf.ads2Handle[i].name.split("_");
            if(names[0] == toAdId) {
              ovkvmf.doExpand(ovkvmf.ads2Handle[i].id);
            }
          }
        }
        //contract an ad (can be called by itself or another ad)
        if(calls[0] == "contractAd") {
          var toAdId    = calls[1];
          for(var i = 0; i < ovkvmf.ads2Handle.length; i++) {
            var names = ovkvmf.ads2Handle[i].name.split("_");
            if(names[0] == toAdId) {
              ovkvmf.doContract(ovkvmf.ads2Handle[i].id);
            }
          }
        }
        //close an ad (can be called by itself or another ad)
        if(calls[0] == "closeAd") {
          var toAdId    = calls[1];
          for(var i = 0; i < ovkvmf.ads2Handle.length; i++) {
            var names = ovkvmf.ads2Handle[i].name.split("_");
            if(names[0] == toAdId) {
              ovkvmf.doClose(ovkvmf.ads2Handle[i].id);
            }
          }
        }
        //open debug div and show given message
        if(calls[0] == "debug") {
          var fromAdId    = calls[1];
          for(var i = 0; i < ovkvmf.ads2Handle.length; i++) {
            var names = ovkvmf.ads2Handle[i].name.split("_");
            if(names[0] == fromAdId) {
              ovkvmf.doDebug(names[0], calls[2]);
            }
          }
        }
      }
    },

    /**
    * creates a div (if not existing)
    * and shows the given message, prefixed by name of sending ad
    * @param string fromAd name of the sending ad
    * @param string msg message to display
    * @return void
    */
    doDebug: function(fromAd, msg) {
      var deb = document.getElementById("ovkvmfdbg");
      if((deb == undefined) || (deb == null)) {
        $("body").append( "<div id='ovkvmfdbg'></div>" );
        $("#ovkvmfdbg").css("position", 'fixed');
        $("#ovkvmfdbg").css("top", '0');
        $("#ovkvmfdbg").css("left", '0');
        $("#ovkvmfdbg").css("width", '200');
        $("#ovkvmfdbg").css("height", '400');
        $("#ovkvmfdbg").css("overflow", 'scroll');
        $("#ovkvmfdbg").css("backgroundColor", '#003869');
        $("#ovkvmfdbg").css("color", 'white');
        deb = document.getElementById("ovkvmfdbg");
      }
      deb.innerHTML = fromAd+":"+msg+"<br />"+deb.innerHTML;
    },

    /**
    * defines an ad as expandable 
    * @param id id of the iFrame
    * @param exp object containing width and height of the expanded status
    * @param cont object containing width and height of the contracted status
    * @return void
    */
    setExpandable: function(id, exp, cont) {
      this.expHandle.push({id: id, exp: exp, cont: cont});      
    },

    /**
    * expands the given ad to the expand-size, given by setExpandable
    * @param id id of the iFrame (ad) to expand
    * @return void
    */
    doExpand: function(id) {
      for(var i = 0; i < ovkvmf.expHandle.length; i++) {
        if(ovkvmf.expHandle[i].id == id) {
          document.getElementById(ovkvmf.expHandle[i].id).style.height = ovkvmf.expHandle[i].exp.height+"px";
          document.getElementById(ovkvmf.expHandle[i].id).style.width  = ovkvmf.expHandle[i].exp.width+"px";
        }
      }
    },

    /**
    * contract the given ad to the contract-size, given by setExpandable
    * @param id id of the iFrame (ad) to contract
    * @return void
    */
    doContract: function(id) {
      for(var i = 0; i < ovkvmf.expHandle.length; i++) {
        if(ovkvmf.expHandle[i].id == id) {
          document.getElementById(ovkvmf.expHandle[i].id).style.height = ovkvmf.expHandle[i].cont.height+"px";
          document.getElementById(ovkvmf.expHandle[i].id).style.width  = ovkvmf.expHandle[i].cont.width+"px";
        }
      }
    },

    /**
    * closes the ad, i.e.:
    * sets width and height to 0px, display=none and removes the content of the src-attribute
    * @param id id of the iFrame (ad) to close
    * @return void
    */
    doClose: function(id) {
      for(var i = 0; i < ovkvmf.expHandle.length; i++) {
        if(ovkvmf.expHandle[i].id == id) {
          document.getElementById(ovkvmf.expHandle[i].id).style.width = "0px";
          document.getElementById(ovkvmf.expHandle[i].id).style.height = "0px";
          document.getElementById(ovkvmf.expHandle[i].id).style.display = "none";
          document.getElementById(ovkvmf.expHandle[i].id).src = "";
        }
      }
    },

    /**
    * sends the current page-size (document-width and -height) to the given ad
    * @param id id of the iFrame (ad)
    * @return void
    */
    sendPageSize: function(id) {
      document.getElementById(id).contentWindow.postMessage("pageSize:;:"+$(document).width()+":;:"+$(document).height(), '*');
    },

    /**
    * sends the current window-size (window-width and -height) to the given ad
    * @param id id of the iFrame (ad)
    * @return void
    */
    sendWinResize: function(id) {
      document.getElementById(id).contentWindow.postMessage("windowSize:;:"+$(window).width()+":;:"+$(window).height(), '*');
    },

    /**
    * sends the current scroll-position (top and left) to the given ad
    * @param id id of the iFrame (ad)
    * @return void
    */
    sendWinScroll: function(id) {
      document.getElementById(id).contentWindow.postMessage("windowScroll:;:"+$(document).scrollTop()+":;:"+$(document).scrollLeft(), '*');
    },

    /**
    * sends the current window-size (window-width and -height) to all ads
    * @return void
    */
    propagateWinResize: function () {
      for(var i = 0; i < this.ads2Handle.length; i++) {
        this.sendWinResize(this.ads2Handle[i].id);
      }
    },

    /**
    * sends the current scroll-position (top and left) to all ads
    * @return void
    */
    propagateWinScroll: function () {
      for(var i = 0; i < this.ads2Handle.length; i++) {
        this.sendWinScroll(this.ads2Handle[i].id);
      }
    }


  }

  ovkvmf.init();