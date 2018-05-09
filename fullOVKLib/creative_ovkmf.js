  /**
  * @description: This is a framework-object to be used on the agency-side
  * providing helping functions programming mobile ads
  * this is connecting to the corresponding framework-file on the publisher-side
  * @author: OVK (circle of online marketers in germany)
  * @version: 0.0.1
  */

  //#TODO: orientation and adOffset
  ovkmf = prototype = {

    //current version
    ovkmfv: "0.0.1",
    //default ad name
    adName: 'ovkmf_'+(new Date().getTime()),
    //adId, to be set by publisher-framework
    adId:   '',
    //current window-size of parent-page
    parWinSize: {width:0,height:0},
    //current scrolling-position of parent-page
    parWinScroll: {top:0,left:0},
    //current page-size of parent-page
    parPageSize: {width:0,height:0},
    //callback-function for parent-window resize event
    cd_parResize: null,
    //callback-function for parent-page scroll event
    cd_parScroll: null,
    //callback-function for parent-page resize event
    cd_parPage: null,
    //callback-function for custom commands (via localConnection)
    cd_cc: null,

    /**
    * listener for postMessages sent by any ad, using this framework or the framework (publisher-side) itself
    * @param: string msg defined message sent (elements divided by :;:)
    * @return: void
    */
    listenOVKVAdMessage: function(msg) {
      if(msg.data) {
        var calls = msg.data.split(":;:");
        if(calls[0] == "registerAs") {
          ovkmf.adId = calls[1];
          window.parent.postMessage('registerAd:;:'+calls[1]+":;:"+ovkmf.adName, "*");
        }
        if(calls[0] == "windowSize") {
          ovkmf.parWinSize.width = calls[1];
          ovkmf.parWinSize.height = calls[2];
          if(typeof(ovkmf.cd_parResize) == "function") {
            ovkmf.cd_parResize({width: calls[1], height: calls[2]});
          }
        }
        if(calls[0] == "windowScroll") {
          ovkmf.parWinScroll.top = calls[1];
          ovkmf.parWinScroll.left = calls[2];
          if(typeof(ovkmf.cd_parScroll) == "function") {
            ovkmf.cd_parScroll({top: calls[1], left: calls[2]});
          }
        }
        if(calls[0] == "pageSize") {
          ovkmf.parPageSize.width = calls[1];
          ovkmf.parPageSize.height = calls[2];
          if(typeof(ovkmf.cd_parPage) == "function") {
            ovkmf.cd_parPage({width: calls[1], height: calls[2]});
          }
        }
        if(calls[0] == "cc") {
          if(typeof(ovkmf.cd_cc) == "function") {
            ovkmf.cd_cc(calls[1]);
          }
        }
      }
    },

    /**
    * sets the adName and defines neccessary listeners
    * @param: string name (optional)
    * @return: void
    */
    init: function(name) { 
      if((name != undefined) && (name != null) && (name != "")) {
        this.adName = name+'_'+(new Date().getTime())
      }
      if(window.addEventListener) {
        window.addEventListener("message", this.listenOVKVAdMessage, false);
      } else {
        window.attachEvent("onmessage", this.listenOVKVAdMessage);
      }
    },

    /**
    * expands this ad (or another via localConnection),
    * not giving a name results in expanding the ad itself
    * @param: string name of the ad to expand (optional)
    * @return: void
    */
    expandAd: function(name) {
      adName = this.adName;
      if((name != undefined) && (name != null) && (name != "")) {
        adName = name;
      } else {
        var t = adName.split("_");
        adName = t[0];
      }
      window.parent.postMessage('expandAd:;:'+adName, "*");
    },    

    /**
    * contracts this ad (or another via localConnection),
    * not giving a name results in contracting the ad itself
    * @param: string name of the ad to contract (optional)
    * @return: void
    */
    contractAd: function(name) {
      adName = this.adName;
      if((name != undefined) && (name != null) && (name != "")) {
        adName = name;
      } else {
        var t = adName.split("_");
        adName = t[0];
      }
      window.parent.postMessage('contractAd:;:'+adName, "*");
    },    

    /**
    * closes this ad (or another via localConnection),
    * not giving a name results in closing the ad itself
    * @param: string name of the ad to close (optional)
    * @return: void
    */
    closeAd: function(name) {
      adName = this.adName;
      if((name != undefined) && (name != null) && (name != "")) {
        adName = name;
      } else {
        var t = adName.split("_");
        adName = t[0];
      }
      window.parent.postMessage('closeAd:;:'+adName, "*");
    },    

    /**
    * show a debug message on the parent window
    * @param: string msg message to display
    * @return: void
    */
    debugMsg: function(msg) {
      var t = this.adName.split("_");
      adName = t[0];
      window.parent.postMessage('debug:;:'+adName+":;:"+msg, "*");
    },

    /**
    * get current version of this object
    * @return: string version-string
    */
    getVersion: function() {
      return ovkmf;
    },

    /**
    * get name of the ad itself (as unique string)
    * @return: string name of this ad
    */
    getAdName: function() {
      return this.adName;
    },

    /**
    * helper object for browser-detection
    * @return: void
    */
    BrowserDetect:  {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
          || this.searchVersion(navigator.appVersion)
          || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
      },
      //helper to find the identifier-strings for each browser
      searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) != -1)
              return data[i].identity;
          }
          else if (dataProp)
            return data[i].identity;
        }
      },
      //helper to find the identifier-strings for each browser-version
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
      },
      //object containing the identifier-data for browser/-version detection
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        },
        { 	
          string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
        },
        {
          string: navigator.vendor,
          subString: "Apple",
          identity: "Safari",
          versionSearch: "Version"
        },
        {
          prop: window.opera,
          identity: "Opera"
        },
        {
          string: navigator.vendor,
          subString: "iCab",
          identity: "iCab"
        },
        {
          string: navigator.vendor,
          subString: "KDE",
          identity: "Konqueror"
        },
        {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
        },
        {
          string: navigator.vendor,
          subString: "Camino",
          identity: "Camino"
        },
        {	
          string: navigator.userAgent,
          subString: "Netscape",
          identity: "Netscape"
        },
        {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Explorer",
          versionSearch: "MSIE"
        },
        {
          string: navigator.userAgent,
          subString: "Gecko",
          identity: "Mozilla",
          versionSearch: "rv"
        },
        { 		
          string: navigator.userAgent,
          subString: "Mozilla",
          identity: "Netscape",
          versionSearch: "Mozilla"
        }
      ],
      dataOS : [
        {
          string: navigator.platform,
          subString: "Win",
          identity: "Windows"
        },
        {
          string: navigator.platform,
          subString: "Mac",
          identity: "Mac"
        },
        {
          string: navigator.userAgent,
          subString: "iPhone",
          identity: "iPhone/iPod"
          },
        {
          string: navigator.platform,
          subString: "Linux",
          identity: "Linux"
        }
      ]
		},

    /**
    * returns the resolution of the current device
    * @return: object size (width and height) 
    */
    getResolution: function() {
      return {width: screen.width, height: screen.height};
    },

    /**
    * sets events and callbacks for a given set:
    * <ul>
    *  <li>orientationChange: orientationChange of current device </li>
    *  <li>scroll: scrolling in this ad</li>
    *  <li>parentScroll: scrolling in parent page</li>
    *  <li>parentResize: parent-window is resized</li>
    *  <li>adResize: ad was resized</li>
    *  <li>pageResize: parent-page was resized</li>
    *  <li>localConnection: a custom command was sent to this ad</li>
    * </ul>
    * @param: string event of the given list
    * @param: function to call, when given event is raised
    * @return: void
    */
    addSpecialEvent: function(event, callback) {
      if(event == "orientationChange") {
        $( window ).on( "orientationchange", function( event ) {
          var orientation = window.orientation;
          if(orientation == undefined) { orientation = 90; }
          var format = "landscape";
          if($(window).width() < $(window).height()) { format = "portrait"; }
          callback(event);
        });
      }
      if(event == "scroll") {
        $( window ).scroll(function(event) {
          callback([$(document).scrollTop(), $(document).scrollLeft()]);
        });
      }
      if(event == "parentScroll") {
        this.cd_parScroll = callback;
      }

      if(event == "parentResize") {
        this.cd_parResize = callback;
      }
      if(event == "adResize") {
        $(document).resize(function() {
          callback({width: $(document).width(), height: $(document).height()});
        });
      }
      if(event == "pageResize") {
        this.cd_parPage = callback;
      }
      if(event == "localConnection") {
        this.cd_cc = callback;
      }
    },
    
    /**
    * returns the current size of the ad
    * @return object size (width and height)
    */
    getMyWindowSize: function() {
      return {width: $(window).width(), height: $(window).height()};
    },

    /**
    * returns the current size of the parent window
    * @return object size (width and height)
    */
    getParentWindowSize: function() {
      return this.parWinSize;
    },

    /**
    * alias for getParentWindowSize
    */
    getWindowSize: function() {
      return this.getParentWindowSize();
    },

    /** 
    * does the browser support canvas objects
    * return: bool browser support for canvas objects
    */
    hasCanvas: function() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    },

    /** 
    * returns the current operating system
    * return: string operating system
    */
    getOS: function() {
      var OSName = "unknown";
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))    OSName = "iOS"; 
      else if (navigator.userAgent.indexOf("Android") != -1)  OSName = "Android";
      else if (navigator.appVersion.indexOf("Win") != -1)     OSName = "Windows";
      else if (navigator.appVersion.indexOf("Mac") != -1)     OSName = "MacOS";
      else if (navigator.appVersion.indexOf("X11") != -1)     OSName = "UNIX";
      else if (navigator.appVersion.indexOf("Linux") != -1)   OSName = "Linux";
      return OSName;
    },

    /** 
    * returns the current browser (not version)
    * return: string current browser (not version)
    */
    getBrowser: function() {
      this.BrowserDetect.init();
      var bb = this.BrowserDetect.browser;
      var ua = window.navigator.userAgent;
      var simp = ua.indexOf("rv:11");
      if(simp > 0) { bb = "Explorer"; }
      return bb;
    },

    /** 
    * returns the current browserVersion (not the browser)
    * return: string current browserVersion (not the browser)
    */
    getBrowserVersion: function() {
      this.BrowserDetect.init();
      return this.BrowserDetect.version;
    },

    /** 
    * returns the scroll-position of parent window
    * return: object (top and left)
    */
    getScrollPosition: function() {
      return ({top: ovkmf.parWinScroll.top, left: ovkmf.parWinScroll.left});
    },

    /** 
    * returns the page height of the parent window
    * return: int height
    */
    getPageHeight: function() {
      return ovkmf.parWinSize.height;
    },

    /** 
    * returns the page width of the parent window
    * return: int width
    */
    getPageWidth: function() {
      return ovkmf.parWinSize.width
    },

    /** 
    * returns the page-size of the parent window
    * return: object (width and height)
    */
    getPageSize: function() {
      return ({width: ovkmf.parWinSize.width, height: ovkmf.parWinSize.height});
    }

  }
