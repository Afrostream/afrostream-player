(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":4}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":24}],3:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],5:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":1,"trim":7}],6:[function(require,module,exports){
(function (global){
/**
 * streamroot-dashjs-p2p-wrapper
 * v1.4.5
 * 2016-08-12
 * streamroot-p2p@4.2.7
 * 
 * Copyright © 2016
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.DashjsWrapper=e()}}(function(){var e;return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[o]={exports:{}};t[o][0].call(c.exports,function(e){var n=t[o][1][e];return i(n?n:e)},c,c.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){function e(e,t,n){if(!e)throw new Error("event type cannot be null or undefined");if(!t||"function"!=typeof t)throw new Error("listener must be a function: "+t);if(!(i(e,t,n)>=0)){var r={callback:t,scope:n};o[e]=o[e]||[],o[e].push(r)}}function t(e,t,n){if(e&&t&&o[e]){var r=i(e,t,n);r<0||o[e].splice(r,1)}}function n(e,t){if(e&&o[e]){if(t=t||{},t.hasOwnProperty("type"))throw new Error("'type' is a reserved word for event dispatching");t.type=e,o[e].forEach(function(e){e.callback.call(e.scope,t)})}}function r(){o={}}function i(e,t,n){var r=o[e],i=-1;if(!r||0===r.length)return i;for(var a=0;a<r.length;a++)if(r[a].callback===t&&(!n||n===r[a].scope))return a;return i}var a=void 0,o={};return a={on:e,off:t,trigger:n,reset:r}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./FactoryMaker.js"),o=r(a);i.__dashjs_factory_name="EventBus",n.default=o.default.getSingletonFactory(i),t.exports=n.default},{"./FactoryMaker.js":2}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t,n,r){var i=o(r);!i[e]&&t&&(i[e]={instance:t,override:n})}function t(e,t){for(var n in l){var r=l[n];if(r.context===e&&r.name===t)return r.instance}return null}function n(e,t,n){for(var r in l){var i=l[r];if(i.context===e&&i.name===t)return void(l[r].instance=n)}l.push({name:t,context:e,instance:n})}function r(e){return function(t){return void 0===t&&(t={}),{create:function(){return a(e.__dashjs_factory_name,e.apply({context:t},arguments),t,arguments)}}}}function i(e){return function(n){var r=void 0;return void 0===n&&(n={}),{getInstance:function(){return r||(r=t(n,e.__dashjs_factory_name)),r||(r=a(e.__dashjs_factory_name,e.apply({context:n},arguments),n,arguments),l.push({name:e.__dashjs_factory_name,context:n,instance:r})),r}}}}function a(e,t,n,r){var i=o(n),a=i[e];if(a){var u=a.instance;if(!a.override)return u.apply({context:n,factory:s},r);u=u.apply({context:n,factory:s,parent:t},r);for(var l in u)t.hasOwnProperty(l)&&(t[l]=u[l])}return t}function o(e){var t=void 0;return u.forEach(function(n){n===e&&(t=n)}),t||(t=u.push(e)),t}var s=void 0,u=[],l=[];return s={extend:e,getSingletonInstance:t,setSingletonInstance:n,getSingletonFactory:i,getClassFactory:r}}();n.default=r,t.exports=n.default},{}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("./EventsBase.js"),l=r(u),c=function(e){function t(){i(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.AST_IN_FUTURE="astinfuture",e.BUFFERING_COMPLETED="bufferingCompleted",e.BUFFER_CLEARED="bufferCleared",e.BUFFER_LEVEL_UPDATED="bufferLevelUpdated",e.BYTES_APPENDED="bytesAppended",e.CHECK_FOR_EXISTENCE_COMPLETED="checkForExistenceCompleted",e.CHUNK_APPENDED="chunkAppended",e.CURRENT_TRACK_CHANGED="currenttrackchanged",e.DATA_UPDATE_COMPLETED="dataUpdateCompleted",e.DATA_UPDATE_STARTED="dataUpdateStarted",e.FRAGMENT_LOADING_COMPLETED="fragmentLoadingCompleted",e.FRAGMENT_LOADING_STARTED="fragmentLoadingStarted",e.INITIALIZATION_LOADED="initializationLoaded",e.INIT_FRAGMENT_LOADED="initFragmentLoaded",e.INIT_REQUESTED="initRequested",e.INTERNAL_MANIFEST_LOADED="internalManifestLoaded",e.LIVE_EDGE_SEARCH_COMPLETED="liveEdgeSearchCompleted",e.LOADING_COMPLETED="loadingCompleted",e.LOADING_PROGRESS="loadingProgress",e.MANIFEST_UPDATED="manifestUpdated",e.MEDIA_FRAGMENT_LOADED="mediaFragmentLoaded",e.QUALITY_CHANGED="qualityChanged",e.QUOTA_EXCEEDED="quotaExceeded",e.REPRESENTATION_UPDATED="representationUpdated",e.SEGMENTS_LOADED="segmentsLoaded",e.SERVICE_LOCATION_BLACKLIST_CHANGED="serviceLocationBlacklistChanged",e.SOURCEBUFFER_APPEND_COMPLETED="sourceBufferAppendCompleted",e.SOURCEBUFFER_REMOVE_COMPLETED="sourceBufferRemoveCompleted",e.STREAMS_COMPOSED="streamsComposed",e.STREAM_BUFFERING_COMPLETED="streamBufferingCompleted",e.STREAM_COMPLETED="streamCompleted",e.STREAM_INITIALIZED="streaminitialized",e.STREAM_TEARDOWN_COMPLETE="streamTeardownComplete",e.TIMED_TEXT_REQUESTED="timedTextRequested",e.TIME_SYNCHRONIZATION_COMPLETED="timeSynchronizationComplete",e.URL_RESOLUTION_FAILED="urlResolutionFailed",e.WALLCLOCK_TIME_UPDATED="wallclockTimeUpdated",e.XLINK_ALL_ELEMENTS_LOADED="xlinkAllElementsLoaded",e.XLINK_ELEMENT_LOADED="xlinkElementLoaded",e.XLINK_READY="xlinkReady",e}return o(t,e),t}(l.default);n.default=c,t.exports=n.default},{"./EventsBase.js":5}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("./CoreEvents.js"),l=r(u),c=function(e){function t(){return i(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),t}(l.default),f=new c;n.default=f,t.exports=n.default},{"./CoreEvents.js":3}],5:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e)}return i(e,[{key:"extend",value:function(e,t){if(e){var n=!!t&&t.override,r=!!t&&t.publicOnly;for(var i in e)!e.hasOwnProperty(i)||this[i]&&!n||r&&e[i].indexOf("public_")===-1||(this[i]=e[i])}}}]),e}();n.default=a,t.exports=n.default},{}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){function n(e,n,i,a){var o,u,l,c,f,d,h,p=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentList,m=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].BaseURL,_=p.SegmentURL_asArray.length,v=[];for(h=e.startNumber,c=(0,s.decideSegmentListRangeForTemplate)(r,t,e,n,i,a),f=Math.max(c.start,0),d=Math.min(c.end,p.SegmentURL_asArray.length-1),o=f;o<=d;o++)l=p.SegmentURL_asArray[o],u=(0,s.getIndexBasedSegment)(r,t,e,o),u.replacementTime=(h+o-1)*e.segmentDuration,u.media=l.media?l.media:m,u.mediaRange=l.mediaRange,u.index=l.index,u.indexRange=l.indexRange,v.push(u),u=null;return e.availableSegmentsNumber=_,v}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/FactoryMaker.js"),o=r(a),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="ListSegmentsGetter";var u=o.default.getClassFactory(i);n.default=u,t.exports=n.default},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],7:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){function n(){s=(0,u.default)(a).create(e,t),l=(0,c.default)(a).create(e,t),f=(0,d.default)(a).create(e,t)}function r(e,t,n,r,a){var o,u=e.segmentInfoType;return"SegmentBase"!==u&&"BaseURL"!==u&&i(e,n)?("SegmentTimeline"===u?o=s.getSegments(e,t,n,a):"SegmentTemplate"===u?o=l.getSegments(e,t,n,a):"SegmentList"===u&&(o=f.getSegments(e,t,n,a)),r&&r(e,o)):o=e.segments,o}function i(e,t){var n,r,i=e.segments,a=!1;return i&&0!==i.length?(r=i[0].availabilityIdx,n=i[i.length-1].availabilityIdx,a=t<r||t>n):a=!0,a}var a=this.context,o=void 0,s=void 0,l=void 0,f=void 0;return o={getSegments:r},n(),o}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/FactoryMaker.js"),o=r(a),s=e("./TimelineSegmentsGetter.js"),u=r(s),l=e("./TemplateSegmentsGetter.js"),c=r(l),f=e("./ListSegmentsGetter.js"),d=r(f);i.__dashjs_factory_name="SegmentsGetter";var h=o.default.getClassFactory(i);n.default=h,t.exports=n.default},{"../../core/FactoryMaker.js":2,"./ListSegmentsGetter.js":6,"./TemplateSegmentsGetter.js":9,"./TimelineSegmentsGetter.js":10}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){for(;e.length<t;)e="0"+e;return e}function a(e,t){return e.representation.startNumber+t}function o(e,t,n){for(var r,a,o,s,u,l,c="%0",f=t.length,d=c.length;;){if(r=e.indexOf("$"+t),r<0)return e;if(a=e.indexOf("$",r+f),a<0)return e;if(o=e.indexOf(c,r+f),o>r&&o<a)switch(s=e.charAt(a-1),u=parseInt(e.substring(o+d,a-1),10),s){case"d":case"i":case"u":l=i(n.toString(),u);break;case"x":l=i(n.toString(16),u);break;case"X":l=i(n.toString(16),u).toUpperCase();break;case"o":l=i(n.toString(8),u);break;default:return e}else l=n;e=e.substring(0,r)+l+e.substring(a+1)}}function s(e,t,n,r){var i,o,s,u;return o=n.segmentDuration,isNaN(o)&&(o=n.adaptation.period.duration),s=n.adaptation.period.start+r*o,u=s+o,i=new h.default,i.representation=n,i.duration=o,i.presentationStartTime=s,i.mediaStartTime=e.calcMediaTimeFromPresentationTime(i.presentationStartTime,n),i.availabilityStartTime=e.calcAvailabilityStartTimeFromPresentationTime(i.presentationStartTime,n.adaptation.period.mpd,t),i.availabilityEndTime=e.calcAvailabilityEndTimeFromPresentationTime(u,n.adaptation.period.mpd,t),i.wallStartTime=e.calcWallTimeForSegment(i,t),i.replacementNumber=a(i,r),i.availabilityIdx=r,i}function u(e,t,n,r,i,s,u,l,c){var f,d,p,m=r/s,_=Math.min(i/s,n.adaptation.period.mpd.maxSegmentDuration);return f=e.calcPresentationTimeFromMediaTime(m,n),d=f+_,p=new h.default,p.representation=n,p.duration=_,p.mediaStartTime=m,p.presentationStartTime=f,p.availabilityStartTime=n.adaptation.period.mpd.manifest.loadedTime,p.availabilityEndTime=e.calcAvailabilityEndTimeFromPresentationTime(d,n.adaptation.period.mpd,t),p.wallStartTime=e.calcWallTimeForSegment(p,t),p.replacementTime=r,p.replacementNumber=a(p,c),u=o(u,"Number",p.replacementNumber),u=o(u,"Time",p.replacementTime),p.media=u,p.mediaRange=l,p.availabilityIdx=c,p}function l(e,t){if(!t||!t.segments)return null;var n,r,i=t.segments.length;if(e<i&&(n=t.segments[e],n&&n.availabilityIdx===e))return n;for(r=0;r<i;r++)if(n=t.segments[r],n&&n.availabilityIdx===e)return n;return null}function c(e,t,n,r,i){var a,o,s,u=2,l=i||10,c=0,f=Number.POSITIVE_INFINITY;return t&&!e.isTimeSyncCompleted()?s={start:c,end:f}:!t&&n||r<0?null:(a=Math.max(r-u,c),o=Math.min(r+l,f),s={start:a,end:o})}function f(e,t,n,r,i,a){var o,s,u,c=n.segmentDuration,f=n.adaptation.period.mpd.manifest.minBufferTime,d=n.segmentAvailabilityRange,h={start:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,d.start),end:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,d.end)},p=n.segments,m=2*c,_=a||Math.max(2*f,10*c),v=NaN,g=null;return h.start=Math.max(h.start,0),t&&!e.isTimeSyncCompleted()?(o=Math.floor(h.start/c),s=Math.floor(h.end/c),u={start:o,end:s}):(p&&p.length>0?(g=l(i,n),v=g?e.calcPeriodRelativeTimeFromMpdRelativeTime(n,g.presentationStartTime):i>0?i*c:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,r)):v=i>0?i*c:t?h.end:h.start,o=Math.floor(Math.max(v-m,h.start)/c),s=Math.floor(Math.min(o+_/c,h.end/c)),u={start:o,end:s})}Object.defineProperty(n,"__esModule",{value:!0}),n.replaceTokenForTemplate=o,n.getIndexBasedSegment=s,n.getTimeBasedSegment=u,n.getSegmentByIndex=l,n.decideSegmentListRangeForTimeline=c,n.decideSegmentListRangeForTemplate=f;var d=e("./../vo/Segment.js"),h=r(d)},{"./../vo/Segment.js":11}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){function n(e,n,i,a){var o,u,l,c,f,d=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentTemplate,h=e.segmentDuration,p=e.segmentAvailabilityRange,m=[],_=null,v=null;for(f=e.startNumber,o=isNaN(h)&&!t?{start:f,end:f}:(0,s.decideSegmentListRangeForTemplate)(r,t,e,n,i,a),l=o.start,c=o.end,u=l;u<=c;u++)v=(0,s.getIndexBasedSegment)(r,t,e,u),v.replacementTime=(f+u-1)*e.segmentDuration,_=d.media,_=(0,s.replaceTokenForTemplate)(_,"Number",v.replacementNumber),_=(0,s.replaceTokenForTemplate)(_,"Time",v.replacementTime),v.media=_,m.push(v),v=null;return isNaN(h)?e.availableSegmentsNumber=1:e.availableSegmentsNumber=Math.ceil((p.end-p.start)/h),m}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/FactoryMaker.js"),o=r(a),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="TemplateSegmentsGetter";var u=o.default.getClassFactory(i);n.default=u,t.exports=n.default},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],10:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){function n(e,n,i,a){var o,u,l,c,f,d,h,p,m,_,v,g,b,y,C=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentTemplate,w=C.SegmentTimeline,S=e.availableSegmentsNumber>0,E=10,k=0,T=0,D=-1,P=[],I=!1,j=function(n){return(0,s.getTimeBasedSegment)(r,t,e,k,n.d,y,C.media,n.mediaRange,D)};for(y=e.timescale,o=w.S_asArray,m=(0,s.decideSegmentListRangeForTimeline)(r,t,n,i,a),m?(g=m.start,b=m.end):v=r.calcMediaTimeFromPresentationTime(n||0,e),l=0,c=o.length;l<c;l++){if(u=o[l],d=0,u.hasOwnProperty("r")&&(d=u.r),u.hasOwnProperty("t")&&(k=u.t,T=k/y),d<0){if(p=o[l+1],p&&p.hasOwnProperty("t"))h=p.t/y;else{var M=e.segmentAvailabilityRange?e.segmentAvailabilityRange.end:r.calcSegmentAvailabilityRange(e,t).end;h=r.calcMediaTimeFromPresentationTime(M,e),e.segmentDuration=u.d/y}d=Math.ceil((h-T)/(u.d/y))-1}if(_){if(S)break;D+=d+1}else for(f=0;f<=d;f++){if(D++,m){if(D>b){if(_=!0,S)break;continue}D>=g&&P.push(j(u))}else{if(P.length>E){if(_=!0,S)break;continue}I?P.push(j(u)):T>=v-u.d/y*1.5&&(I=!0,P.push(j(u)))}k+=u.d,T=k/y}}return S||(e.availableSegmentsNumber=D+1),P}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/FactoryMaker.js"),o=r(a),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="TimelineSegmentsGetter";var u=o.default.getClassFactory(i);n.default=u,t.exports=n.default},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],11:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function e(){r(this,e),this.indexRange=null,this.index=null,this.mediaRange=null,this.media=null,this.duration=NaN,this.replacementTime=null,this.replacementNumber=NaN,this.mediaStartTime=NaN,this.presentationStartTime=NaN,this.availabilityStartTime=NaN,this.availabilityEndTime=NaN,this.availabilityIdx=NaN,this.wallStartTime=NaN,this.representation=null};n.default=i,t.exports=n.default},{}],12:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("../core/events/EventsBase.js"),l=r(u),c=function(e){function t(){i(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.BUFFER_EMPTY="bufferstalled",e.BUFFER_LOADED="bufferloaded",e.BUFFER_LEVEL_STATE_CHANGED="bufferStateChanged",e.ERROR="error",e.LOG="log",e.MANIFEST_LOADED="manifestloaded",e.METRICS_CHANGED="metricschanged",e.METRIC_CHANGED="metricchanged",e.METRIC_ADDED="metricadded",e.METRIC_UPDATED="metricupdated",e.PERIOD_SWITCH_COMPLETED="streamswitchcompleted",e.PERIOD_SWITCH_STARTED="streamswitchstarted",e.STREAM_INITIALIZED="streaminitialized",e.TEXT_TRACKS_ADDED="alltexttracksadded",e.TEXT_TRACK_ADDED="texttrackadded",e.CAN_PLAY="canPlay",e.PLAYBACK_ENDED="playbackEnded",e.PLAYBACK_ERROR="playbackError",e.PLAYBACK_METADATA_LOADED="playbackMetaDataLoaded",e.PLAYBACK_PAUSED="playbackPaused",e.PLAYBACK_PLAYING="playbackPlaying",e.PLAYBACK_PROGRESS="playbackProgress",e.PLAYBACK_RATE_CHANGED="playbackRateChanged",e.PLAYBACK_SEEKED="playbackSeeked",e.PLAYBACK_SEEKING="playbackSeeking",e.PLAYBACK_STARTED="playbackStarted",e.PLAYBACK_TIME_UPDATED="playbackTimeUpdated",e}return o(t,e),t}(l.default),f=new c;n.default=f,t.exports=n.default},{"../core/events/EventsBase.js":5}],13:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(){function e(){var e,t;ge=[],ve=!1,_e=!0,Ce=!0,Ne=!1,Ee={enabled:!0,ttl:d},ke={enabled:!0,ttl:h},be=f,ye=void 0,we=_,Se=v,Te=g,De=b,Pe=y,Ie=C,je=w,Me=p,Ae=m,xe=I,e={},i(e,l.default.MPD_TYPE,k),i(e,l.default.XLINK_EXPANSION_TYPE,D),i(e,l.default.MEDIA_SEGMENT_TYPE,S),i(e,l.default.INIT_SEGMENT_TYPE,S),i(e,l.default.BITSTREAM_SWITCHING_SEGMENT_TYPE,S),i(e,l.default.INDEX_SEGMENT_TYPE,S),i(e,l.default.OTHER_TYPE,S),Re=e,t={},i(t,l.default.MPD_TYPE,T),i(t,l.default.XLINK_EXPANSION_TYPE,P),i(t,l.default.MEDIA_SEGMENT_TYPE,E),i(t,l.default.INIT_SEGMENT_TYPE,E),i(t,l.default.BITSTREAM_SWITCHING_SEGMENT_TYPE,E),i(t,l.default.INDEX_SEGMENT_TYPE,E),i(t,l.default.OTHER_TYPE,E),Oe=t}function t(e){Ne=e}function n(){return Ne}function r(e){Me=e}function a(){return Me}function o(e){Ae=e}function s(){return Ae}function u(e){Te=e}function c(){return Te}function j(e){De=e}function M(){return De}function A(e){Pe=e}function R(){return Pe}function O(e){Ie=e}function x(){return Ie}function N(e){je=e}function L(){return je}function U(e){we=e}function $(){return we}function F(e,t){Ee.enabled=e,void 0===t||isNaN(t)||"number"!=typeof t||(Ee.ttl=t)}function H(){return Ee}function B(e,t){ke.enabled=e,void 0===t||isNaN(t)||"number"!=typeof t||(ke.ttl=t)}function q(){return ke}function G(e){Se=e}function V(){return Se}function K(e){Re[l.default.MEDIA_SEGMENT_TYPE]=e}function Y(e,t){Re[e]=t}function W(){return Re[l.default.MEDIA_SEGMENT_TYPE]}function z(e){return Re[e]}function X(e){Oe[l.default.MEDIA_SEGMENT_TYPE]=e}function Q(e,t){Oe[e]=t}function Z(){return Oe[l.default.MEDIA_SEGMENT_TYPE]}function J(e){return Oe[e]}function ee(e){xe=e}function te(){return xe}function ne(e){Ce=e}function re(){return Ce}function ie(e){be=e}function ae(e){ye=e}function oe(){return be}function se(){return ye}function ue(e){_e=e}function le(){return _e}function ce(e){ve=e}function fe(){return ve}function de(e){ge=e}function he(){return ge}function pe(){}var me=void 0,_e=void 0,ve=void 0,ge=void 0,be=void 0,ye=void 0,Ce=void 0,we=void 0,Se=void 0,Ee=void 0,ke=void 0,Te=void 0,De=void 0,Pe=void 0,Ie=void 0,je=void 0,Me=void 0,Ae=void 0,Re=void 0,Oe=void 0,xe=void 0,Ne=void 0;return me={setBufferOccupancyABREnabled:t,getBufferOccupancyABREnabled:n,setBandwidthSafetyFactor:r,getBandwidthSafetyFactor:a,setAbandonLoadTimeout:o,getAbandonLoadTimeout:s,setLastBitrateCachingInfo:F,getLastBitrateCachingInfo:H,setLastMediaSettingsCachingInfo:B,getLastMediaSettingsCachingInfo:q,setStableBufferTime:u,getStableBufferTime:c,setBufferTimeAtTopQuality:j,getBufferTimeAtTopQuality:M,setBufferTimeAtTopQualityLongForm:A,getBufferTimeAtTopQualityLongForm:R,setLongFormContentDurationThreshold:O,getLongFormContentDurationThreshold:x,setRichBufferThreshold:N,getRichBufferThreshold:L,setBufferToKeep:U,getBufferToKeep:$,setBufferPruningInterval:G,getBufferPruningInterval:V,setFragmentRetryAttempts:K,getFragmentRetryAttempts:W,setRetryAttemptsForType:Y,getRetryAttemptsForType:z,setFragmentRetryInterval:X,getFragmentRetryInterval:Z,setRetryIntervalForType:Q,getRetryIntervalForType:J,setWallclockTimeUpdateInterval:ee,getWallclockTimeUpdateInterval:te,setScheduleWhilePaused:ne,getScheduleWhilePaused:re,getUseSuggestedPresentationDelay:fe,setUseSuggestedPresentationDelay:ce,setLiveDelayFragmentCount:ie,getLiveDelayFragmentCount:oe,getLiveDelay:se,setLiveDelay:ae,setUseManifestDateHeaderTimeSource:ue,getUseManifestDateHeaderTimeSource:le,setUTCTimingSources:de,getUTCTimingSources:he,reset:pe},e(),me}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/FactoryMaker.js"),s=r(o),u=e("../vo/metrics/HTTPRequest.js"),l=r(u),c={scheme:"urn:mpeg:dash:utc:http-xsdate:2014",value:"http://time.akamai.com/?iso"},f=4,d=36e4,h=36e4,p=.9,m=1e4,_=30,v=30,g=12,b=30,y=60,C=600,w=20,S=3,E=1e3,k=3,T=500,D=1,P=500,I=50;a.__dashjs_factory_name="MediaPlayerModel";var j=s.default.getSingletonFactory(a);j.DEFAULT_UTC_TIMING_SOURCE=c,n.default=j,t.exports=n.default},{"../../core/FactoryMaker.js":2,"../vo/metrics/HTTPRequest.js":15}],14:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){function e(e){f.trigger(u.default.ERROR,{error:"capability",event:e})}function t(e,t,n){f.trigger(u.default.ERROR,{error:"download",event:{id:e,url:t,request:n}})}function n(e,t,n){f.trigger(u.default.ERROR,{error:"manifestError",event:{message:e,id:t,manifest:n}})}function r(e,t,n){f.trigger(u.default.ERROR,{error:"cc",event:{message:e,id:t,cc:n}})}function i(e){f.trigger(u.default.ERROR,{error:"mediasource",event:e})}function a(e){f.trigger(u.default.ERROR,{error:"key_session",event:e})}function s(e){f.trigger(u.default.ERROR,{error:"key_message",event:e})}var l=void 0,c=this.context,f=(0,o.default)(c).getInstance();return l={capabilityError:e,downloadError:t,manifestError:n,timedTextError:r,mediaSourceError:i,mediaKeySessionError:a,mediaKeyMessageError:s}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/EventBus.js"),o=r(a),s=e("../../core/events/Events.js"),u=r(s),l=e("../../core/FactoryMaker.js"),c=r(l),f="mediasource",d="mediakeys",h="manifest",p="SIDX",m="content",_="initialization",v="xlink",g="codec",b="parse",y="nostreams",C="parse";i.__dashjs_factory_name="ErrorHandler";var w=c.default.getSingletonFactory(i);w.CAPABILITY_ERROR_MEDIASOURCE=f,w.CAPABILITY_ERROR_MEDIAKEYS=d,w.DOWNLOAD_ERROR_ID_MANIFEST=h,w.DOWNLOAD_ERROR_ID_SIDX=p,w.DOWNLOAD_ERROR_ID_CONTENT=m,w.DOWNLOAD_ERROR_ID_INITIALIZATION=_,w.DOWNLOAD_ERROR_ID_XLINK=v,w.MANIFEST_ERROR_ID_CODEC=g,w.MANIFEST_ERROR_ID_PARSE=b,w.MANIFEST_ERROR_ID_NOSTREAMS=y,w.TIMED_TEXT_ERROR_ID_PARSE=C,n.default=w,t.exports=n.default},{"../../core/EventBus.js":1,"../../core/FactoryMaker.js":2,"../../core/events/Events.js":4}],15:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function e(){r(this,e),this.tcpid=null,this.type=null,this.url=null,this.actualurl=null,this.range=null,this.trequest=null,this.tresponse=null,this.responsecode=null,this.interval=null,this.trace=[],this._stream=null,this._tfinish=null,this._mediaduration=null,this._responseHeaders=null,this._serviceLocation=null};i.Trace=function(){function e(){r(this,e),this.s=null,this.d=null,this.b=[]}return e}(),i.MPD_TYPE="MPD",i.XLINK_EXPANSION_TYPE="XLinkExpansion",i.INIT_SEGMENT_TYPE="InitializationSegment",i.INDEX_SEGMENT_TYPE="IndexSegment",i.MEDIA_SEGMENT_TYPE="MediaSegment",i.BITSTREAM_SWITCHING_SEGMENT_TYPE="BitstreamSwitchingSegment",i.OTHER_TYPE="other",n.default=i,t.exports=n.default},{}],16:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function e(t){function n(e){var t=this.factory,n=this.context;i=function(){return e},a=function(){return n},o=function(){return t.getSingletonInstance(n,"DashManifestModel")},s=function(){return e.timelineConverter}}r(this,e);var i=void 0,a=void 0,o=void 0,s=void 0;this.getDashManifestModel=function(){return o?o():void 0},this.getTimelineConverter=function(){return s?s():void 0},this.getConfig=function(){return i()},this.getContext=function(){return a()},t.extend("Stream",n,!0)};n.default=i,t.exports=n.default},{}],17:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./DashjsWrapperPrivate"),o=r(a),s=function e(t,n,r){i(this,e),new o.default(t,n,r)};n.default=s,t.exports=n.default},{"./DashjsWrapperPrivate":18}],18:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=e("./ManifestHelper"),s=r(o),u=e("./MediaMap"),l=r(u),c=e("./PlayerInterface"),f=r(c),d=e("./SegmentView"),h=r(d),p=e("./FragmentLoaderClassProvider"),m=r(p),_=e("streamroot-p2p"),v=r(_),g=e("../dashjs/src/streaming/MediaPlayerEvents"),b=r(g),y=e("./DashjsInternals"),C=r(y),w="v1",S=v.default,E=function(){function e(t,n,r){i(this,e),this._p2pConfig=n,this._player=t,this._liveDelay=r,this._player.setLiveDelay(r),this._dashjsInternals=new C.default(t),this._player.extend("FragmentLoader",new m.default(this).SRFragmentLoader,!0),this._player.on(b.default.MANIFEST_LOADED,this._onManifestLoaded,this)}return a(e,null,[{key:"StreamrootPeerAgentModule",set:function(e){S=e},get:function(){return S}}]),a(e,[{key:"initialize",value:function(t){this.updateManifest(t);var n=new s.default(this,this._dashjsInternals);this._playerInterface=new f.default(this._player,n,this._liveDelay),this._peerAgentModule=new e.StreamrootPeerAgentModule(this._playerInterface,this._manifest.url,new l.default(n),this._p2pConfig,h.default,e.StreamrootPeerAgentModule.StreamTypes.DASH,w);try{var r=this._player.getVideoElement();this._peerAgentModule.setMediaElement(r)}catch(e){}}},{key:"dispose",value:function(){this._peerAgentModule&&this._peerAgentModule.dispose(),this._playerInterface&&this._playerInterface.dispose(),this._manifest=null}},{key:"updateManifest",value:function(e){this._manifest=e}},{key:"_onManifestLoaded",value:function(e){var t=e.data;return t?this._manifest?void(t.url!==this._manifest.url?(this.dispose(),this.initialize(t)):this.updateManifest(t)):void this.initialize(t):void this.dispose()}},{key:"peerAgent",get:function(){return this._peerAgentModule}},{key:"manifest",get:function(){return this._manifest}},{key:"player",get:function(){return this._player}}]),e}();n.default=E,t.exports=n.default},{"../dashjs/src/streaming/MediaPlayerEvents":12,"./DashjsInternals":16,"./FragmentLoaderClassProvider":19,"./ManifestHelper":20,"./MediaMap":21,"./PlayerInterface":22,"./SegmentView":23,"streamroot-p2p":26}],19:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){var t=1,n=2,r="request is null";this.SRFragmentLoader=function(a){function o(){var t;I=e.peerAgent,M=[],t={},i(t,h.default.MPD_TYPE,f.default.DOWNLOAD_ERROR_ID_MANIFEST),i(t,h.default.XLINK_EXPANSION_TYPE,f.default.DOWNLOAD_ERROR_ID_XLINK),i(t,h.default.INIT_SEGMENT_TYPE,f.default.DOWNLOAD_ERROR_ID_INITIALIZATION),i(t,h.default.MEDIA_SEGMENT_TYPE,f.default.DOWNLOAD_ERROR_ID_CONTENT),i(t,h.default.INDEX_SEGMENT_TYPE,f.default.DOWNLOAD_ERROR_ID_CONTENT),i(t,h.default.BITSTREAM_SWITCHING_SEGMENT_TYPE,f.default.DOWNLOAD_ERROR_ID_CONTENT),i(t,h.default.OTHER_TYPE,f.default.DOWNLOAD_ERROR_ID_CONTENT),A=t}function u(e){if("InitializationSegment"!==e.type){var t=new v.default({periodId:e.mediaInfo.streamInfo.index,adaptationSetId:e.mediaInfo.index,representationId:e.quality});return new m.default({trackView:t,timeStamp:e.startTime})}return null}function c(e){var t={};return e.range&&(t.Range="bytes="+e.range),t}function d(e,t){return{url:T.modifyRequestURL(e.url),headers:t}}function p(e){if(!e)return void w.trigger(s.default.LOADING_COMPLETED,{request:void 0,error:new Error(n,r)});var i=c(e),a=u(e),o=d(e,i),l=new Date,f=l,h=!0,m=[],_=0,v=E.getRetryAttemptsForType(e.type),g=function(t,n){e.requestStartDate=l,e.firstByteDate=e.firstByteDate||l,e.requestEndDate=new Date,D.addHttpRequest(e.mediaType,null,e.type,e.url,null,e.serviceLocation||null,e.range||null,e.requestStartDate,e.firstByteDate,e.requestEndDate,n,e.duration,null,t?m:null)},b=function(t){g(!0,200),w.trigger(s.default.LOADING_COMPLETED,{request:e,response:t,sender:C})},y=function(t){var n=new Date;h&&(h=!1,e.firstByteDate=n);var r=0;t.cdnDownloaded&&(r+=t.cdnDownloaded),t.p2pDownloaded&&(r+=t.p2pDownloaded),m.push({s:f,d:n.getTime()-f.getTime(),b:[r?r-_:0]}),f=n,_=r,w.trigger(s.default.LOADING_PROGRESS,{request:e})},T=function(n){g(!1,n.target.status),v>0?(S("Failed loading fragment: "+e.mediaType+":"+e.type+":"+e.startTime+", retry in "+E.getRetryIntervalForType(e.type)+"ms attempts: "+v),v--,M.push(setTimeout(function(){p(e,v)},E.getRetryIntervalForType(e.type)))):(S("Failed loading fragment: "+e.mediaType+":"+e.type+":"+e.startTime+" no retry attempts left"),
k.downloadError(A[e.type],e.url,e),w.trigger(s.default.LOADING_COMPLETED,{request:void 0,error:new Error(t,"failed loading fragment")}))};j=I.getSegment(o,{onSuccess:b,onProgress:y,onError:T},a)}function _(){M.forEach(function(e){return clearTimeout(e)}),M=[],j&&j.abort(),j=null}function g(){_()}var b=this.context,y=this.factory,C=this.parent,w=y.getSingletonInstance(b,"EventBus"),S=y.getSingletonInstance(b,"Debug").log,E=(0,l.default)(b).getInstance(),k=a.errHandler,T=a.requestModifier,D=a.metricsModel,P=void 0,I=void 0,j=void 0,M=void 0,A=void 0;return P={load:p,abort:_,reset:g},o(),P}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../dashjs/src/core/events/Events.js"),s=r(o),u=e("../dashjs/src/streaming/models/MediaPlayerModel.js"),l=r(u),c=e("../dashjs/src/streaming/utils/ErrorHandler.js"),f=r(c),d=e("../dashjs/src/streaming/vo/metrics/HTTPRequest"),h=r(d),p=e("./SegmentView"),m=r(p),_=e("./TrackView"),v=r(_);n.default=a,t.exports=n.default},{"../dashjs/src/core/events/Events.js":4,"../dashjs/src/streaming/models/MediaPlayerModel.js":13,"../dashjs/src/streaming/utils/ErrorHandler.js":14,"../dashjs/src/streaming/vo/metrics/HTTPRequest":15,"./SegmentView":23,"./TrackView":25}],20:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=e("./TrackView"),s=r(o),u=e("../dashjs/src/dash/utils/SegmentsGetter"),l=r(u),c=e("./SegmentsCache"),f=r(c),d=function(){function e(t,n){i(this,e),this._wrapper=t,this._dashjsInternals=n,this._segmentsCache=new f.default(this._player)}return a(e,[{key:"_getSegmentsGetter",value:function(){if(!this._segmentsGetter){var e=this._dashjsInternals.getContext(),t=this._dashjsInternals.getConfig();this._segmentsGetter=(0,l.default)(e).create(t,this.isLive())}return this._segmentsGetter}},{key:"getSegmentList",value:function(e,t,n){if(this._segmentsCache.hasSegments(e))return this._segmentsCache.getSegments(e);var r=this._dashjsInternals.getDashManifestModel(),i=this._dashjsInternals.getTimelineConverter();if(!r||!i)throw new Error("Tried to get representation before we could have access to dash.js manifest internals");var a=r.getMpd(this._manifest),o=r.getRegularPeriods(this._manifest,a)[e.periodId],s=r.getAdaptationsForPeriod(this._manifest,o)[e.adaptationSetId],u=r.getRepresentationsForAdaptation(this._manifest,s)[e.representationId],l=this.isLive(),c=0;u.segmentAvailabilityRange=i.calcSegmentAvailabilityRange(u,l);var f=this._getSegmentsGetter().getSegments(u,t,c,void 0,n);return f}},{key:"isLive",value:function(){var e=this._dashjsInternals.getDashManifestModel();if(!e)throw new Error("Tried to get representation before we could have access to dash.js manifest internals");return e.getIsDynamic(this._manifest)}},{key:"getCurrentTracks",value:function(){for(var e={},t=["audio","video"],n=0;n<t.length;n++){var r=t[n],i=this._player.getTracksFor(r);if(i&&i.length>0){var a=this._player.getCurrentTrackFor(r),o=this._player.getQualityFor(r);e[r]=new s.default({periodId:a.streamInfo.index,adaptationSetId:a.index,representationId:o})}}return e}},{key:"getAllTracks",value:function(){var e={},t=this._player.getStreamsFromManifest(this._manifest);if(t){var n=!0,r=!1,i=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done);n=!0)for(var u=a.value,l=["audio","video"],c=0;c<l.length;c++){var f=l[c];e[f]=[];var d=this._player.getTracksForTypeFromManifest(f,this._manifest,u);if(d){var h=!0,p=!1,m=void 0;try{for(var _,v=d[Symbol.iterator]();!(h=(_=v.next()).done);h=!0)for(var g=_.value,b=0;b<g.representationCount;b++)e[f].push(new s.default({periodId:u.index,adaptationSetId:g.index,representationId:b}))}catch(e){p=!0,m=e}finally{try{!h&&v.return&&v.return()}finally{if(p)throw m}}}}}catch(e){r=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}}return e}},{key:"_player",get:function(){return this._wrapper.player}},{key:"_manifest",get:function(){return this._wrapper.manifest}}]),e}();n.default=d,t.exports=n.default},{"../dashjs/src/dash/utils/SegmentsGetter":7,"./SegmentsCache":24,"./TrackView":25}],21:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("./SegmentView"),u=r(s),l=function(){function e(t){a(this,e),this._manifestHelper=t}return o(e,[{key:"isLive",value:function(){return this._manifestHelper.isLive()}},{key:"getSegmentTime",value:function(e){return e.timeStamp}},{key:"getSegmentList",value:function(e,t,n){var r=[],i=void 0,a=this._manifestHelper.getSegmentList(e,t,n);if(void 0!==a){var o=!0,s=!1,l=void 0;try{for(var c,f=a[Symbol.iterator]();!(o=(c=f.next()).done);o=!0){var d=c.value,h=d.mediaStartTime||d.startTime;d.timescale&&(h/=d.timescale),t<=h&&h<=t+n&&(i=new u.default({trackView:e,timeStamp:h}),r.push(i))}}catch(e){s=!0,l=e}finally{try{!o&&f.return&&f.return()}finally{if(s)throw l}}}return r}},{key:"getNextSegmentView",value:function(e){var t=this.getSegmentTime(e)+.2,n=this.getSegmentList(e.trackView,t,30);return n.length?n[0]:null}},{key:"getTrackList",value:function(){for(var e=this._manifestHelper.getAllTracks(),t=[],n=["audio","video"],r=0;r<n.length;r++){var a=n[r];e[a]&&t.push.apply(t,i(e[a]))}return t}}]),e}();n.default=l,t.exports=n.default},{"./SegmentView":23}],22:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=e("./TrackView"),s=r(o),u=function(){function e(t,n,r){i(this,e),this._player=t,this._manifestHelper=n,this._liveDelay=r,this.MIN_BUFFER_LEVEL=10,this._bufferLevelMax=Math.max(0,this._liveDelay-this.MIN_BUFFER_LEVEL),this._listeners=new Map,this._onStreamInitialized=this._dispatchInitialOnTrackChange.bind(this),this._player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED,this._onStreamInitialized)}return a(e,[{key:"dispose",value:function(){this._player.off(dashjs.MediaPlayer.events.STREAM_INITIALIZED,this._onStreamInitialized)}},{key:"isLive",value:function(){return this._manifestHelper.isLive()}},{key:"getBufferLevelMax",value:function(){return this._bufferLevelMax}},{key:"setBufferMarginLive",value:function(e){var t=e;t>this._bufferLevelMax&&(t=this._bufferLevelMax),this._dashjsBufferTime=this.MIN_BUFFER_LEVEL+t,this._player.setStableBufferTime(this._dashjsBufferTime),this._player.setBufferTimeAtTopQuality(this._dashjsBufferTime),this._player.setBufferTimeAtTopQualityLongForm(this._dashjsBufferTime)}},{key:"addEventListener",value:function(e,t){if("onTrackChange"===e){var n=this._createOnTrackChangeListener(t);this._listeners.set(t,n),this._player.on("qualityChanged",n)}}},{key:"removeEventListener",value:function(e,t){if("onTrackChange"===e){var n=this._listeners.get(t);this._player.off("qualityChanged",n),this._listeners.delete(t)}}},{key:"_createOnTrackChangeListener",value:function(e){var t=this._player;return function(n){var r=n.mediaType,i=n.streamInfo,a=n.newQuality,o={};o[r]=new s.default({periodId:i.index,adaptationSetId:t.getCurrentTrackFor(r).index,representationId:Number(a)}),e(o)}}},{key:"_dispatchInitialOnTrackChange",value:function(){var e=this._manifestHelper.getCurrentTracks(),t=!0,n=!1,r=void 0;try{for(var i,a=this._listeners.keys()[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var o=i.value;o(e)}}catch(e){n=!0,r=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw r}}}}]),e}();n.default=u,t.exports=n.default},{"./TrackView":25}],23:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("./TrackView"),u=r(s),l=function(){function e(t){i(this,e),this.timeStamp=t.timeStamp,this.trackView=new u.default(t.trackView)}return o(e,null,[{key:"fromArrayBuffer",value:function(t){var n=new Uint8Array(t),r=n.slice(0,12).buffer,i=new Uint32Array(r),o=a(i,3),s=o[0],u=o[1],l=o[2],c=n.slice(12).buffer,f=new Float64Array(c),d=f[0],h={periodId:s,adaptationSetId:u,representationId:l};return new e({timeStamp:d,trackView:h})}}]),o(e,[{key:"isEqual",value:function(e){if(!e)return!1;var t=e.timeStamp,n=e.trackView;return this.timeStamp===t&&this.trackView.isEqual(n)}},{key:"isInTrack",value:function(e){return this.trackView.isEqual(e)}},{key:"viewToString",value:function(){return this.trackView.viewToString()+"S"+this.timeStamp}},{key:"toArrayBuffer",value:function(){var e=new Uint32Array([this.trackView.periodId,this.trackView.adaptationSetId,this.trackView.representationId]),t=new Float64Array([this.timeStamp]),n=new Uint8Array(e.byteLength+t.byteLength);return n.set(new Uint8Array(e.buffer),0),n.set(new Uint8Array(t.buffer),12),n.buffer}},{key:"getId",value:function(){return this.timeStamp}}]),e}();n.default=l,t.exports=n.default},{"./TrackView":25}],24:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=e("./TrackView"),s=r(o),u=function(){function e(t){i(this,e),this._player=t,this._player.on("segmentsLoaded",this._onSegmentsLoaded,this),this._cache={}}return a(e,[{key:"_onSegmentsLoaded",value:function(e){var t=e.segments,n=s.default.makeIDString(e.representation.adaptation.period.index,e.representation.adaptation.index,e.representation.index);this._cache[n]=t}},{key:"hasSegments",value:function(e){return void 0!==this._cache[e.viewToString()]}},{key:"getSegments",value:function(e){return this._cache[e.viewToString()]}}]),e}();n.default=u,t.exports=n.default},{"./TrackView":25}],25:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(t){r(this,e),this.periodId=t.periodId,this.adaptationSetId=t.adaptationSetId,this.representationId=t.representationId}return i(e,[{key:"viewToString",value:function(){return e.makeIDString(this.periodId,this.adaptationSetId,this.representationId)}},{key:"isEqual",value:function(e){return!!e&&this.periodId===e.periodId&&this.adaptationSetId===e.adaptationSetId&&this.representationId===e.representationId}}],[{key:"makeIDString",value:function(e,t,n){return"P"+e+"A"+t+"R"+n}}]),e}();n.default=a,t.exports=n.default},{}],26:[function(t,n,r){(function(i){!function(t){if("object"==typeof r&&"undefined"!=typeof n)n.exports=t();else if("function"==typeof e&&e.amd)e([],t);else{var a;a="undefined"!=typeof window?window:"undefined"!=typeof i?i:"undefined"!=typeof self?self:this,(a.Streamroot||(a.Streamroot={})).Downloader=t()}}(function(){var e;return function e(n,r,i){function a(s,u){if(!r[s]){if(!n[s]){var l="function"==typeof t&&t;if(!u&&l)return l(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=r[s]={exports:{}};n[s][0].call(f.exports,function(e){var t=n[s][1][e];return a(t?t:e)},f,f.exports,e,n,r,i)}return r[s].exports}for(var o="function"==typeof t&&t,s=0;s<i.length;s++)a(i[s]);return a}({1:[function(e,t,n){"use strict";function r(e){for(var t=e.from,n=e.to,r=e.step,i=[],a=t;a<n;a+=r)i.push(a);return i.push(n),i}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./js/utils/ObjectHelper"),a={SIGNALING_URL:"wss://sig.streamroot.io/websocket/",ABTEST_DATA_URL:"//files.streamroot.io/p2p/static/tracker-split.json",TRACKER_URL:"https://tracker-beta.streamroot.io",CLIENT_TRACKER_PROTOCOL_VERSION:"3.0.0",P2P_PROTOCOL_VERSION:"3.0.0",CHUNK_SIZE:15360,P2P_CACHE_MAX_SIZE:136314880,GETSEGMENTTIME_CACHE_MAX_SIZE:1e3,MAX_DL_REQUEST_SPEED:1e3,TIME_BETWEEN_CHUNK_DL:50,NB_CHUNK_DL_GROUP:10,MAX_CHUNK_BY_SEEDER:300,NB_SEGMENT_P2P_PREBUFFER:6,MAX_SEGMENT_REQUEST_STORE:6,NB_SEGMENT_P2P_SKIP:2,MAX_BUFFER_DURATION:300,MAX_UP_SPEED:600,CHUNK_UP_RETRY_DELAY:10,PEER_CONNECTION_TIMEOUT:5e4,PEER_UP_TIMEOUT:5e3,SEND_HEARTBEAT_INTERVAL:5e3,CHECK_HEARTBEAT_INTERVAL:1e4,MAX_USELESS_COUNT:100,MIN_USEFUL_SPEED:5,MIN_NUMBER_OF_PEERS:8,MAX_NUMBER_OF_PEERS:13,MAX_NUMBER_OF_PEERS_ASKED_BY_GET_PEERS_MESSAGE:10,ASK_PEERS_INTERVAL:6e4,SEND_TRACKS_INTERVAL:6e4,CHECK_USELESS_INTERVAL:6e4,SPEED_MONITOR_INTERVAL:1e3,MEAN_SPEED_CALCULATION_INTERVAL:500,CHUNK_TIMEOUT:2500,CHUNK_UP_TIMEOUT:1900,ICECANDIDATES_TIMEOUT:1e3,UP_MAX_BUFFERED_AMOUNT:10,OFFER_DECLINED_TIMEOUT:6e4,PEER_REMOVED_TIMEOUT:9e5,PEER_CONNEXION_ATTEMPT_TIMEOUT:9e5,GEOLOCATION_REQUEST_TIMEOUT:3e3,GEOLOCATION_REQUEST_MAX_RETRY:1,MAX_P2P_PREBUFFERING_TIME:720,RETRY_P2P_START_DL_SEGMENT_DELAY:5e3,ANALYTICS:{KLARA_URL:"https://klara.streamroot.io",RETRY_NUMBER:3,RETRY_DELAY:1e4,TRAFFIC_INTERVAL_ARRAY:r({from:5e3,to:12e4,step:1e4}),STATS_INTERVAL:12e4,CONTROL_INTERVAL:6e5},ERRORS:{API_KEY:"d04c6fa616c255ac55dec6b068ad7172",HANDLER:"xhr",STAGES:["staging","qa","production"]},RY_TRACK:!0,RY_TRACKER:"srTracker",ABR_DEL_T:30,LIVE:{P2P_CACHE_MAX_SIZE:62914560},ENABLE_TURN:!1,STUNSERVERS:[{urls:"stun:stun.l.google.com:19302"}],TURNSERVERS:[{urls:"turn:23.97.160.254:3478?transport=udp",credential:"streamroot",username:"streamroot"}],ALLOW_P2P:!0,RANGE_REQUEST_ALLOWED:!0,DISPLAY_ERROR:!1,PEER_INSTANT_SPEED_CALCULATION_INTERVAL:100,PEER_INSTANT_SPEED_CALCULATION_WINDOW:1e4,PEER_COMPUTE_RTT_INTERVAL:5e3,USE_SIGNALING_SERVER:!0,SIGNALING_DELAY_STEP:2e3,SIGNALING_DELAY_MAX:3e5,TRACKER_DELAY_MAX:3e5,TRACKER_DELAY_INIT:2e3,LOCKED_RETRY_INTERVAL:30,LOCKED_RETRY_TIMEOUT:500,TIMEOUT_GET_FULL_SEGMENT:500,RETURN_COPY_SEGMENT:!0,DEBUG:!1,DEVICE_INFO:"",ID_CLIENT:"",MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH:300};(0,i.deepFreeze)(a),n.default=a,t.exports=n.default},{"./js/utils/ObjectHelper":89}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("./MetricSender"),f=r(c),d=e("../utils/url"),h=Math.random().toString().substring(2),p=Math.random().toString().substring(2),m=Math.random().toString().substring(2);window.Streamroot=window.Streamroot||{},window.Streamroot.klaraToken=window.Streamroot.klaraToken||h+p+m;var _=function(){function e(t,n,r,i,a){(0,s.default)(this,e),this._serverURL=(0,d.formatUrl)(t),this._clientID=n,this._namespace=i,this._content=r,this._conf=a}return(0,l.default)(e,[{key:"send",value:function(e,t){e.customer=this._clientID,e.content=this._content,e.peerAgentVersion="4.2.7",e.token=window.Streamroot.klaraToken;var n=(0,a.default)(e),r=""+this._serverURL+this._namespace;t&&(r+="/"+t);var i=new f.default(r,n,this._conf);i.send(n)}}]),e}();n.default=_,t.exports=n.default},{"../utils/url":101,"./MetricSender":5,"babel-runtime/core-js/json/stringify":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=function e(){(0,a.default)(this,e),this.open=0,this.match=0,this.offer=0,this.active=0,this.transfer=0,this.denied=0,this.dropped=0,this.timeout=0,this.disconnected=0,this.p2p=0,this.cdn=0};n.default=o,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("./TrafficAnalytics"),l=r(u),c=e("./StatsAnalytics"),f=r(c),d=e("../utils/Timers"),h=r(d),p=function(){function e(t,n,r){var i=this;(0,a.default)(this,e),this._playerInterface=t,this._trafficIntervalCounter=0,this._conf=r.conf,this._timers=new h.default,this._trafficAnalytics=new l.default(this._playerInterface,r),this._statsAnalytics=new f.default(this._playerInterface,n,r),this._scheduleTrafficReport(),this._scheduleStatReport(),this._scheduleControlReport(),window.onbeforeunload=function(){i._trafficAnalytics.sendUsage(!0)}}return(0,s.default)(e,[{key:"dispose",value:function(){this._timers.clearAll(),this._statsAnalytics.dispose()}},{key:"_scheduleTrafficReport",value:function(){var e=this;if(this._trafficIntervalCounter<this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY.length-1)this._timers.setTimeout(function(){e._trafficAnalytics.sendUsage(),e._scheduleTrafficReport()},this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY[this._trafficIntervalCounter]),this._trafficIntervalCounter++;else{var t=this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY[this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY.length-1],n=this._trafficAnalytics.sendUsage.bind(this._trafficAnalytics,!1);this._timers.setInterval(n,t)}}},{key:"_scheduleStatReport",value:function(){this._timers.setInterval(this._statsAnalytics.sendStats.bind(this._statsAnalytics),this._conf.ANALYTICS.STATS_INTERVAL)}},{key:"_scheduleControlReport",value:function(){this._timers.setInterval(this._statsAnalytics.sendControl.bind(this._statsAnalytics),this._conf.ANALYTICS.CONTROL_INTERVAL)}}]),e}();n.default=p,t.exports=n.default},{"../utils/Timers":95,"./StatsAnalytics":7,"./TrafficAnalytics":8,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],5:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(t,n,r){(0,a.default)(this,e),this._serverURL=t,this._payload=n,this._conf=r,this._retryCount=0}return(0,s.default)(e,[{key:"_retry",value:function(){this._retryCount<this._conf.ANALYTICS.RETRY_NUMBER&&setTimeout(this.send.bind(this),this._conf.ANALYTICS.RETRY_DELAY)}},{key:"_onLoad",value:function(e){e.target.status>=500&&e.target.status<600&&this._retry()}},{key:"_onError",value:function(){this._retry()}},{key:"send",value:function(){var e=new XMLHttpRequest;e.open("POST",this._serverURL),e.setRequestHeader("Content-Type","application/json;charset=UTF-8"),e.onload=this._onLoad.bind(this),e.onerror=this._onError.bind(this),e.send(this._payload),this._retryCount++}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){return e===1/0||e===-(1/0)?-1:e}Object.defineProperty(n,"__esModule",{value:!0});var a=e("babel-runtime/core-js/get-iterator"),o=r(a),s=e("babel-runtime/core-js/map"),u=r(s),l=e("babel-runtime/helpers/classCallCheck"),c=r(l),f=e("babel-runtime/helpers/createClass"),d=r(f),h=e("../utils/StaircaseFunctionIntegral"),p=r(h),m=e("../utils/Number"),_=function(){function e(t){(0,c.default)(this,e),this._bufferLevels=new u.default,this._destroyedPeerIds=[],this._peerCountStaircaseFunctionIntegral=new p.default,t.eventBus.on("info",this._onPeerInfo,this),t.eventBus.on("peerOpen",this._onPeerOpen,this),t.eventBus.on("peerDestroyed",this._onPeerDestroyed,this)}return(0,d.default)(e,[{key:"_onPeerInfo",value:function(e){var t=e.remotePeer;this._bufferLevels.set(t.getId(),t.getBufferLevel())}},{key:"_onPeerOpen",value:function(e){var t=e.peerCount;this._peerCountStaircaseFunctionIntegral.updateMetric(t)}},{key:"_onPeerDestroyed",value:function(e){var t=e.remotePeer,n=e.peerCount;this._destroyedPeerIds.push(t.getId()),this._peerCountStaircaseFunctionIntegral.updateMetric(n)}},{key:"_calculateBufferLevelStats",value:function(e){var t=1/0,n=-(1/0),r=-(1/0),a=1/0,s=0,u=0,l=0,c=!0,f=!1,d=void 0;try{for(var h,p=(0,o.default)(this._bufferLevels.values());!(c=(h=p.next()).done);c=!0){var m=h.value;t=Math.min(t,m),n=Math.max(n,m),m<e?(r=Math.max(r,m),s++):m>e?(a=Math.min(a,m),l++):u++}}catch(e){f=!0,d=e}finally{try{!c&&p.return&&p.return()}finally{if(f)throw d}}t=i(t),n=i(n),r=i(r),a=i(a);var _={minLevel:t,maxLevel:n,closestLowerLevel:r,closestHigherLevel:a,lowerLevelCount:s,sameLevelCount:u,higherLevelCount:l};return _}},{key:"_removedDestroyedPeers",value:function(){var e=!0,t=!1,n=void 0;try{for(var r,i=(0,o.default)(this._destroyedPeerIds);!(e=(r=i.next()).done);e=!0){var a=r.value;this._bufferLevels.delete(a)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}this._destroyedPeerIds=[]}},{key:"getAndFlushBufferLevels",value:function(e){var t=this._calculateBufferLevelStats(e);return this._removedDestroyedPeers(),t}},{key:"getAveragePeerCount",value:function(){return(0,m.toDecimal)(this._peerCountStaircaseFunctionIntegral.getAverage(),2)}}]),e}();n.default=_,t.exports=n.default},{"../utils/Number":88,"../utils/StaircaseFunctionIntegral":91,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],7:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("./AnalyticsClient"),l=r(u),c=e("./UploadQueueObserver"),f=r(c),d=e("./PeerPoolObserver"),h=r(d),p=e("../utils/Delta"),m=e("./qos/QoSAnalyticsHandler"),_=r(m),v=function(){function e(t,n,r){(0,a.default)(this,e);var i=r.conf,o=r.moduleState,s=r.status;this._conf=i,this._status=s,this._playerInterface=t,this._analyticsClient=new l.default(i.ANALYTICS.KLARA_URL,i.ID_CLIENT,o.content,"stats",i),this._analyticsData=r.analyticsData,this._p2pUseful=new p.Delta,this._cdnDownloaded=new p.Delta,this._p2pConsumed=new p.Delta,this._cdnConsumed=new p.Delta,this._rawP2PDownloaded=new p.Delta,this._p2pUploaded=new p.Delta,this._PP=new p.Delta,this._PC=new p.Delta,this._CP=new p.Delta,this._CC=new p.Delta,this._HP=new p.Delta,this._HD=new p.Delta,this._M=new p.Delta,this._total=new p.Delta,this._uploadQueueObserver=new f.default(r),this._peerPoolObserver=new h.default(r),this._receivedChunkRequest=new p.Delta,this._hitReceivedChunkRequest=new p.Delta,this._sentChunkRequest=new p.Delta,this._timeoutSentChunkRequest=new p.Delta,this._attemptToSendChunkCount=new p.Delta,this._sentChunkCount=new p.Delta,this._expiredChunksToUpload=new p.Delta,this._addedChunksToUpload=new p.Delta,this._open=new p.Delta,this._match=new p.Delta,this._offer=new p.Delta,this._active=new p.Delta,this._transfer=new p.Delta,this._denied=new p.Delta,this._dropped=new p.Delta,this._timeout=new p.Delta,this._disconnected=new p.Delta,this._counterMain=0,this._missedIceCandidate=new p.Delta,this._newPeerConnectionCount=new p.Delta,this._p2pSgtCheckSuccess=new p.Delta,this._p2pSgtCheckFail=new p.Delta,this._hybridSgtCheckSuccess=new p.Delta,this._hybridSgtCheckFail=new p.Delta,this._checkHeartbeatFailed=new p.Delta,this._counterControl=0,this._qosAnalyticsHandler=new _.default(n,r)}return(0,s.default)(e,[{key:"_getPeerStats",value:function(){return{count:this._peerPoolObserver.getAveragePeerCount(),open:this._open.calcDelta(this._analyticsData.open),match:this._match.calcDelta(this._analyticsData.match),offer:this._offer.calcDelta(this._analyticsData.offer),active:this._active.calcDelta(this._analyticsData.active),transfer:this._transfer.calcDelta(this._analyticsData.transfer),denied:this._denied.calcDelta(this._analyticsData.denied),dropped:this._dropped.calcDelta(this._analyticsData.dropped),timeout:this._timeout.calcDelta(this._analyticsData.timeout),disconnected:this._disconnected.calcDelta(this._analyticsData.disconnected)}}},{key:"_calculateStatsPayload",value:function(){var e=this._status.getConnectedToSignalingServer(),t=this._status.getConnected(),n=this._status.getUpgraded(),r=this._status.getTrackerVersion(),i=this._status.getTrackerId(),a={PP:this._status.getDataDownloadedTwice_PP(),PC:this._status.getDataDownloadedTwice_PC(),CP:this._status.getDataDownloadedTwice_CP(),CC:this._status.getDataDownloadedTwice_CC(),HP:this._status.getDataDownloadedTwice_HP(),HD:this._status.getDataDownloadedTwice_HD(),M:this._status.getDataDownloadedTwice_M()},o=a.PP+a.PC+a.CP+a.CC+a.HP+a.HD+a.M,s=this._cdnDownloaded.calcDelta(this._status.getCDNDownloaded()),u=s,l=this._p2pUseful.calcDelta(this._status.getP2PDownloaded()),c=this._p2pConsumed.calcDelta(this._analyticsData.p2p),f=this._cdnConsumed.calcDelta(this._analyticsData.cdn),d=this._rawP2PDownloaded.calcDelta(this._status.getP2PDownloadedUncorrected()),h=this._p2pUploaded.calcDelta(this._status.getP2PUploaded()),p={rawP2PDownloaded:d,cdnDownloaded:s,p2pUseful:l,cdnUseful:u,p2pConsumed:c,cdnConsumed:f,p2pUploaded:h,multipleDl:{PP:this._PP.calcDelta(a.PP),PC:this._PC.calcDelta(a.PC),CP:this._CP.calcDelta(a.CP),CC:this._CC.calcDelta(a.CC),HP:this._HP.calcDelta(a.HP),HD:this._HD.calcDelta(a.HD),M:this._M.calcDelta(a.M),total:this._total.calcDelta(o)}},m=this._receivedChunkRequest.calcDelta(this._status.getReceivedChunkRequestCount()),_=this._hitReceivedChunkRequest.calcDelta(this._status.getHitReceivedChunkRequestCount()),v=this._timeoutSentChunkRequest.calcDelta(this._status.getTimeoutSentChunkRequestCount()),g=this._sentChunkRequest.calcDelta(this._status.getSentChunkRequestCount()),b=this._attemptToSendChunkCount.calcDelta(this._status.getAttemptToSendChunkCount()),y=this._sentChunkCount.calcDelta(this._status.getSentChunkCount()),C=this._expiredChunksToUpload.calcDelta(this._status.getExpiredChunksToUpload()),w=this._addedChunksToUpload.calcDelta(this._status.getAddedChunksToUpload()),S={receivedChunkRequestsMissedRatio:m>0?1-_/m:0,sentChunkRequestsTimeoutRatio:g>0?v/g:0,uploadSaturationRatio:b>0?1-y/b:0,uploadSaturationFrequency:(b-y)/(this._conf.ANALYTICS.STATS_INTERVAL/6e4),averageUploadLimitation:this._uploadQueueObserver.getAverageUploadLimitation(),uploadQueueExpirationRatio:w?C/w:0},E=void 0;this._qosAnalyticsHandler.initialized&&(E=this._qosAnalyticsHandler.getQoSAnalytics());var k={transfers:p,efficiency:S,qos:E,live:this._playerInterface.isLive(),signalingServerConnected:e,trackerConnected:t,trackerUpgraded:n,trackerVersion:r,peers:this._getPeerStats(),counter:this._counterMain,trackerId:i};if(this._playerInterface.isLive()){var T=this._calculateBufferLevelStats();k.bufferLevel=T}return this._counterMain++,k}},{key:"_calculateBufferLevelStats",value:function(){var e=this._status.getMyBufferLevel(),t=this._peerPoolObserver.getAndFlushBufferLevels(e),n=t.minLevel,r=t.maxLevel,i=t.closestLowerLevel,a=t.closestHigherLevel,o=t.lowerLevelCount,s=t.sameLevelCount,u=t.higherLevelCount,l={currentLevel:e,minLevel:n,maxLevel:r,closestLowerLevel:i,closestHigherLevel:a,lowerLevelCount:o,sameLevelCount:s,higherLevelCount:u};return l}},{key:"_calculateControlPayload",value:function(){var e=this._missedIceCandidate.calcDelta(this._status.getMissedIceCandidateCount()),t=this._newPeerConnectionCount.calcDelta(this._status.getNewPeerConnectionCount()),n=t>0?e/t:0,r=this._p2pSgtCheckSuccess.calcDelta(this._status.getNbRightHashP2P()),i=this._p2pSgtCheckFail.calcDelta(this._status.getNbWrongHashP2P()),a=this._hybridSgtCheckSuccess.calcDelta(this._status.getNbRightHashDLM()),o=this._hybridSgtCheckFail.calcDelta(this._status.getNbWrongHashDLM()),s=this._checkHeartbeatFailed.calcDelta(this._status.getCheckHeartbeatFailed()),u={live:this._playerInterface.isLive(),meanMissedIceCandidate:n,p2pSgtCheckSuccess:r,p2pSgtCheckFail:i,hybridSgtCheckSuccess:a,hybridSgtCheckFail:o,checkHeartbeatFailed:s,counter:this._counterControl};return this._counterControl++,u}},{key:"sendStats",value:function(){var e=this._calculateStatsPayload();this._analyticsClient.send(e)}},{key:"sendControl",value:function(){var e=this._calculateControlPayload();this._analyticsClient.send(e,"control")}},{key:"dispose",value:function(){this._qosAnalyticsHandler.dispose()}}]),e}();n.default=v,t.exports=n.default},{"../utils/Delta":85,"./AnalyticsClient":2,"./PeerPoolObserver":6,"./UploadQueueObserver":9,"./qos/QoSAnalyticsHandler":12,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("./AnalyticsClient"),l=r(u),c=e("../utils/Delta"),f=function(){function e(t,n){(0,a.default)(this,e);var r=n.conf,i=n.analyticsData,o=n.status,s=n.moduleState;this._analyticsClient=new l.default(r.ANALYTICS.KLARA_URL,r.ID_CLIENT,s.content,"traffic",r),this._playerInterface=t,this._analyticsData=i,this._status=o,this._p2p=new c.Delta,this._cdn=new c.Delta,this._upload=new c.Delta,this._timespan=new c.Delta,this._timespan.calcDelta(Date.now())}return(0,s.default)(e,[{key:"_calculateUsagePayload",value:function(){var e=this._p2p.calcDelta(this._status.getP2PDownloaded()),t=this._cdn.calcDelta(this._status.getCDNDownloaded()),n=this._upload.calcDelta(this._status.getP2PUploaded()),r=this._timespan.calcDelta(Date.now()),i={live:this._playerInterface.isLive(),cdn:t,p2p:e,upload:n,timespan:r};return i}},{key:"sendUsage",value:function(e){var t=this._calculateUsagePayload();e&&(t.unload=!0),this._analyticsClient.send(t,"usage")}}]),e}();n.default=f,t.exports=n.default},{"../utils/Delta":85,"./AnalyticsClient":2,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../utils/StaircaseFunctionIntegral"),l=r(u),c=function(){function e(t){
(0,a.default)(this,e);var n=t.eventBus;this._staircaseFunctionIntegral=new l.default,n.on("uploadLimitationChange",this._staircaseFunctionIntegral.updateMetric,this._staircaseFunctionIntegral)}return(0,s.default)(e,[{key:"getAverageUploadLimitation",value:function(){return this._staircaseFunctionIntegral.getAverage()}}]),e}();n.default=c,t.exports=n.default},{"../utils/StaircaseFunctionIntegral":91,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],10:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e),this._mediaElement=null}return(0,s.default)(e,[{key:"mediaElement",get:function(){return this._mediaElement},set:function(e){this._mediaElement=e}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],11:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../../utils/Delta"),l=e("../../utils/Number"),c=function(){function e(){(0,a.default)(this,e),this._timeSpentPlayingDelta=new u.Delta,this._timeSpentRebufferingDelta=new u.Delta,this._timeSpentSeekingDelta=new u.Delta,this._rebufferingCountDelta=new u.Delta,this._lastTimeDelta=new u.Delta(Date.now()),this._droppedFrameCountDelta=new u.Delta,this._trackSwitchCountDelta=new u.Delta}return(0,s.default)(e,[{key:"_normalizePerMinute",value:function(e,t,n){var r=this._lastTimeDelta.calcDelta(Date.now()),i=this._rebufferingCountDelta.calcDelta(e),a=i/(r/6e4),o=this._droppedFrameCountDelta.calcDelta(t),s=o/(r/6e4),u=this._trackSwitchCountDelta.calcDelta(n),c=u/(r/6e4);return{rebufferingCPM:(0,l.toDecimal)(a,2),droppedFrameCPM:(0,l.toDecimal)(s,2),trackSwitchCPM:(0,l.toDecimal)(c,2)}}},{key:"format",value:function(e,t){var n=this._normalizePerMinute(e.rebufferingCount,e.droppedFrameCount,t),r=n.rebufferingCPM,i=n.droppedFrameCPM,a=n.trackSwitchCPM;return{rebufferingCPM:r,droppedFrameCPM:i,trackSwitchCPM:a,timeSpentPlaying:(0,l.toDecimal)(this._timeSpentPlayingDelta.calcDelta(e.timeSpentPlaying),2),timeSpentRebuffering:(0,l.toDecimal)(this._timeSpentRebufferingDelta.calcDelta(e.timeSpentRebuffering),2),timeSpentSeeking:(0,l.toDecimal)(this._timeSpentSeekingDelta.calcDelta(e.timeSpentSeeking),2),startupTime:e.startupTime,endedOnce:e.endedOnce}}}]),e}();n.default=c,t.exports=n.default},{"../../utils/Delta":85,"../../utils/Number":88,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],12:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("streamroot-qos-analytics"),l=r(u),c=e("./QoSAnalyticsFormatter"),f=r(c),d=e("../../utils/EventEnum"),h=r(d),p=function(){function e(t,n){(0,a.default)(this,e),this._trackSwitchCount=-1,n.eventBus.on(h.default.Metrics.TRACK_SWITCH,this._onTrackSwitch.bind(this)),null!==t.mediaElement&&(this._initialized=!0,this._qosAnalytics=new l.default(t.mediaElement),this._qoSAnalyticsFormatter=new f.default)}return(0,s.default)(e,[{key:"_onTrackSwitch",value:function(){this._trackSwitchCount++}},{key:"getQoSAnalytics",value:function(){if(!this._initialized)throw new Error("getQoSAnalytics was called on non-initialized QoSAnalyticsHandler");var e=this._qosAnalytics.getQoSAnalytics();return this._qoSAnalyticsFormatter.format(e,this._trackSwitchCount)}},{key:"dispose",value:function(){this._qosAnalytics&&this._qosAnalytics.dispose()}},{key:"initialized",get:function(){return this._initialized}}]),e}();n.default=p,t.exports=n.default},{"../../utils/EventEnum":86,"./QoSAnalyticsFormatter":11,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"streamroot-qos-analytics":224}],13:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/assign"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("./bugsnag"),f=r(c),d=e("../../defaultConf"),h=r(d),p=function(){function e(){(0,s.default)(this,e),this._metadata={},this._scriptOrigin=null,f.default.apiKey=h.default.ERRORS.API_KEY,f.default.notifyHandler=h.default.ERRORS.HANDLER,f.default.notifyReleaseStages=h.default.ERRORS.STAGES,f.default.disableLog=!0,f.default.releaseStage="production",f.default.autoNotify=!1,f.default.appVersion=this._getAppVersion(),f.default.beforeNotify=this._beforeNotify()}return(0,l.default)(e,[{key:"notify",value:function(e,t,n){var r="warning";!n||"error"!==n&&"info"!==n||(r=n),f.default.notify(e,t,this._metadata,r)}},{key:"notifyError",value:function(e){f.default.notifyException(e,{groupingHash:e.message})}},{key:"resetRateLimit",value:function(){f.default.refresh()}},{key:"_beforeNotify",value:function(){var e=this;return function(t){return!(!t.file||t.file!==e._scriptOrigin)}}},{key:"_getAppVersion",value:function(){var e="4.2.7";return e.split("-")[0]}},{key:"setMetadata",value:function(e){(0,a.default)(this._metadata,e),f.default.metaData=this._metadata}},{key:"setCustomer",value:function(e){f.default.userId=e}},{key:"setScriptOrigin",value:function(e){this._scriptOrigin=e}}]),e}();n.default=new p,t.exports=n.default},{"../../defaultConf":1,"./bugsnag":14,"babel-runtime/core-js/object/assign":110,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],14:[function(t,n,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=t("babel-runtime/helpers/typeof"),o=i(a);!function(t,r){function i(){D=!1}function a(){var e=document.currentScript||C;if(!e&&D){var t=document.scripts||document.getElementsByTagName("script");e=t[t.length-1]}return e}function s(e){var t=a();t&&(e.script={src:t.src,content:h("inlineScript",!0)?t.innerHTML:""})}function u(e){var n=h("disableLog"),r=t.console;void 0===r||void 0===r.log||n||r.log("[Bugsnag] "+e)}function l(e,n,r){var i=h("maxDepth",T);if(r>=i)return encodeURIComponent(n)+"=[RECURSIVE]";r=r+1||1;try{if(t.Node&&e instanceof t.Node)return encodeURIComponent(n)+"="+encodeURIComponent(b(e));var a=[];for(var s in e)if(e.hasOwnProperty(s)&&null!=s&&null!=e[s]){var u=n?n+"["+s+"]":s,c=e[s];a.push("object"===("undefined"==typeof c?"undefined":(0,o.default)(c))?l(c,u,r):encodeURIComponent(u)+"="+encodeURIComponent(c))}return a.join("&")}catch(e){return encodeURIComponent(n)+"="+encodeURIComponent(""+e)}}function c(e,t,n){if(null==t)return e;if(n>=h("maxDepth",T))return"[RECURSIVE]";e=e||{};for(var r in t)if(t.hasOwnProperty(r))try{t[r].constructor===Object?e[r]=c(e[r],t[r],n+1||1):e[r]=t[r]}catch(n){e[r]=t[r]}return e}function f(e,t){if(e+="?"+l(t)+"&ct=img&cb="+(new Date).getTime(),"undefined"!=typeof BUGSNAG_TESTING&&S.testRequest)S.testRequest(e,t);else{var n=h("notifyHandler");if("xhr"===n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.send()}else{var i=new Image;i.src=e}}}function d(e){var t={},n=/^data\-([\w\-]+)$/;if(e)for(var r=e.attributes,i=0;i<r.length;i++){var a=r[i];if(n.test(a.nodeName)){var o=a.nodeName.match(n)[1];t[o]=a.value||a.nodeValue}}return t}function h(e,t){P=P||d(x);var n=void 0!==S[e]?S[e]:P[e.toLowerCase()];return"false"===n&&(n=!1),void 0!==n?n:t}function p(e){return!(!e||!e.match(I))||(u("Invalid API key '"+e+"'"),!1)}function m(e,n){var r=h("apiKey");if(p(r)&&k){k-=1;var i=h("releaseStage","production"),a=h("notifyReleaseStages");if(a){for(var o=!1,s=0;s<a.length;s++)if(i===a[s]){o=!0;break}if(!o)return}var l=[e.name,e.message,e.stacktrace].join("|");if(l!==w){w=l,y&&(n=n||{},n["Last Event"]=g(y));var d={notifierVersion:R,apiKey:r,projectRoot:h("projectRoot")||t.location.protocol+"//"+t.location.host,context:h("context")||t.location.pathname,userId:h("userId"),user:h("user"),metaData:c(c({},h("metaData")),n),releaseStage:i,appVersion:h("appVersion"),url:t.location.href,userAgent:navigator.userAgent,language:navigator.language||navigator.userLanguage,severity:e.severity,name:e.name,message:e.message,stacktrace:e.stacktrace,file:e.file,lineNumber:e.lineNumber,columnNumber:e.columnNumber,payloadVersion:"2"},m=S.beforeNotify;if("function"==typeof m){var _=m(d,d.metaData);if(_===!1)return}return 0===d.lineNumber&&/Script error\.?/.test(d.message)?u("Ignoring cross-domain script error. See https://bugsnag.com/docs/notifiers/js/cors"):void f(h("endpoint")||A,d)}}}function _(){var e,t,n=10,r="[anonymous]";try{throw new Error("")}catch(n){e="<generated>\n",t=v(n)}if(!t){e="<generated-ie>\n";var i=[];try{for(var a=arguments.callee.caller.caller;a&&i.length<n;){var o=j.test(a.toString())?RegExp.$1||r:r;i.push(o),a=a.caller}}catch(e){u(e)}t=i.join("\n")}return e+t}function v(e){return e.stack||e.backtrace||e.stacktrace}function g(e){var t={millisecondsAgo:new Date-e.timeStamp,type:e.type,which:e.which,target:b(e.target)};return t}function b(e){if(e){var t=e.attributes;if(t){for(var n="<"+e.nodeName.toLowerCase(),r=0;r<t.length;r++)t[r].value&&"null"!==t[r].value.toString()&&(n+=" "+t[r].name+'="'+t[r].value+'"');return n+">"}return e.nodeName}}var y,C,w,S={},E=!0,k=10,T=5;S.noConflict=function(){return t.Bugsnag=r,"undefined"==typeof r&&delete t.Bugsnag,S},S.refresh=function(){k=10},S.notifyException=function(e,t,n,r){e&&(t&&"string"!=typeof t&&(n=t,t=void 0),n||(n={}),s(n),m({name:t||e.name,message:e.message||e.description,stacktrace:v(e)||_(),file:e.fileName||e.sourceURL,lineNumber:e.lineNumber||e.line,columnNumber:e.columnNumber?e.columnNumber+1:void 0,severity:r||"warning"},n))},S.notify=function(e,n,r,i){m({name:e,message:n,stacktrace:_(),file:t.location.toString(),lineNumber:1,severity:i||"warning"},r)};var D="complete"!==document.readyState;document.addEventListener?(document.addEventListener("DOMContentLoaded",i,!0),t.addEventListener("load",i,!0)):t.attachEvent("onload",i);var P,I=/^[0-9a-f]{32}$/i,j=/function\s*([\w\-$]+)?\s*\(/i,M="https://notify.bugsnag.com/",A=M+"js",R="2.5.0",O=document.getElementsByTagName("script"),x=O[O.length-1];if(t.atob){if(t.ErrorEvent)try{0===new t.ErrorEvent("test").colno&&(E=!1)}catch(e){}}else E=!1;t.Bugsnag=S,"function"==typeof e&&e.amd?e([],function(){return S}):"object"===("undefined"==typeof n?"undefined":(0,o.default)(n))&&"object"===(0,o.default)(n.exports)&&(n.exports=S)}(window,window.Bugsnag)},{"babel-runtime/helpers/typeof":129}],15:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./TimedValue"),a=r(i),o=function(e){var t=[],n=e,r=function(){for(var e=-1,r=Date.now(),i=0;i<t.length&&r-t[i].timestamp()>n;i++)e=i;return e},i=function(){var e=r();e>-1&&t.splice(0,e+1)},o=function(e){if(0!==e){i();var n=new a.default(e);t.push(n)}},s=function(){if(i(),!t.length)return 0;for(var e=0,n=0;n<t.length;n++)e+=t[n].value();return e/t.length};this.addPoint=o,this.compute=s};n.default=o,t.exports=n.default},{"./TimedValue":16}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=e,n=Date.now();this.timestamp=function(){return n},this.value=function(){return t}};n.default=r,t.exports=n.default},{}],17:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/typeof"),a=r(i),o=e("babel-runtime/core-js/get-iterator"),s=r(o),u=e("../utils/Timers"),l=r(u),c=(e("../utils/nativeTimers"),function(e,t,n){function r(){var e=p.getSegmentListToDownload().slice(0,d.NB_SEGMENT_P2P_PREBUFFER);if(o()+d.NB_CHUNK_DL_GROUP*d.CHUNK_SIZE/1024<d.MAX_DL_REQUEST_SPEED)for(var t=0;t<d.NB_CHUNK_DL_GROUP;t++)i(e)}function i(e){var t=!0,n=!1,r=void 0;try{for(var i,o=function(){var e=i.value,t=m.getOrCreateSegmentHandler(e),n=t.seeders.getNextSeeder(t.chunkManager.chunkNumber);if(n){var r=function(){var r=t.chunkManager.getNextChunk();if(r>=0)return n.requestChunk(e,r),c(),h.setTimeout(function(){t.chunkManager.timeOut(r),n.getHeuristic().incrementNbChunkTimeOut()},d.CHUNK_TIMEOUT),{v:{v:void 0}}}();if("object"===("undefined"==typeof r?"undefined":(0,a.default)(r)))return r.v}},u=(0,s.default)(e);!(t=(i=u.next()).done);t=!0){var l=o();if("object"===("undefined"==typeof l?"undefined":(0,a.default)(l)))return l.v}}catch(e){n=!0,r=e}finally{try{!t&&u.return&&u.return()}finally{if(n)throw r}}}function o(){var e=u();return e===!1?_=[]:e>0&&_.splice(0,e),_.length*d.CHUNK_SIZE/1024}function u(){for(var e=Date.now(),t=0;t<_.length;t++)if(e-_[t]<=1e3)return t;return!1}function c(){var e=Date.now();_.push(e)}function f(){h.clearAll()}var d=n.conf,h=new l.default,p=t,m=e,_=[];h.setInterval(r,d.TIME_BETWEEN_CHUNK_DL),this.dispose=f});n.default=c,t.exports=n.default},{"../utils/Timers":95,"../utils/nativeTimers":99,"babel-runtime/core-js/get-iterator":106,"babel-runtime/helpers/typeof":129}],18:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("./PartialSegment/PartialSegmentP2P"),l=r(u),c=e("eventemitter3"),f=r(c),d=e("./binaryAbstraction/Segment"),h=r(d),p=function(){function e(t,n,r,i,o){(0,a.default)(this,e),this._sharedState=o,this._conf=o.conf,this._status=o.status,this._workerHelper=o.workerHelper,this.p2pCache=n,this.dataLocked=!1,this._isEmpty=!0,this._partialSegmentRequested=!1,this._segmentCoord=t,this.downloadStatus=[],this._peerPool=r,this._segmentInfoMap=i;var s=new f.default;this.getEE=function(){return s}}return(0,s.default)(e,[{key:"setSegmentSize",value:function(e){if(!this.size){this.size=e,this.chunkNumber=Math.ceil(this.size/this._conf.CHUNK_SIZE);for(var t=0;t<this.chunkNumber;t++)this.downloadStatus.push("pending");this.segment=new h.default(e)}}},{key:"getChunk",value:function(e,t){if(this.dataLocked||"downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])this.dataLocked,t(null);else{var n=this._conf.CHUNK_SIZE,r=e*this._conf.CHUNK_SIZE;r+n>this.size&&(n=this.size-r),this.segment.getBinaryData(r,n,t)}}},{key:"getNextChunk",value:function(){var e=this.downloadStatus.indexOf("failed");return e<0&&(e=this.downloadStatus.indexOf("pending")),e>=0&&(this.downloadStatus[e]="downloading"),e}},{key:"chunkDownloaded",value:function(e,t){if(this._isEmpty=!1,"downloaded"===this.downloadStatus[t])this._status.correctP2PDownloaded(e.byteLength,"PP");else if("CDNdownloaded"===this.downloadStatus[t]||this._writeLock)this._status.correctP2PDownloaded(e.byteLength,"CP");else if(this.downloadStatus[t]="downloaded",this._status.setp2pDownloadedNewAnalytics(this._status.getp2pDownloadedNewAnalytics()+e.byteLength),this.segment.setBinaryData(e,t*this._conf.CHUNK_SIZE),this.isSegmentDownloaded()){var n=this.segment,r=this.p2pCache.getSegmentHandler(this._segmentCoord);r.seeders.cleanAfterDownloaded(),this.lockSegmentData(),this._checkHashP2P(n)}}},{key:"timeOut",value:function(e){"downloading"===this.downloadStatus[e]&&(this.downloadStatus[e]="failed",this._status.incrementTimeoutSentChunkRequestCount()),this._status.incrementSentChunkRequestCount()}},{key:"isSegmentDownloaded",value:function(){if(this.size){for(var e=this.downloadStatus.length-1;e>=0;e--)if("downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])return!1;return!0}return!1}},{key:"shouldDownloadSegment",value:function(){return!this.isSegmentDownloaded()&&!this.partialSegment&&!this._partialSegmentRequested}},{key:"getPartialSegment",value:function(){var e=this,t=function(){e.partialSegment||e.dataLocked||(e.partialSegment=new l.default(e._segmentCoord,e.p2pCache,e.segment,e.downloadStatus,e.size,e,e.isSegmentDownloaded(),e._segmentInfoMap,e._sharedState))};return this._partialSegmentRequested=!0,!(this._isEmpty||!this.size)&&(t(),this.dataLocked||(this._writeLock=!0),this.partialSegment)}},{key:"getIndexLastChunkInARow",value:function(){for(var e=0;e<this.downloadStatus.length;e++)if("downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])return e-1;return this.downloadStatus.length-1}},{key:"storeSegment",value:function(e){this._isEmpty=!1,this.size||this.setSegmentSize(e.byteLength),this.segment=e,this._updateDownloadStatus()}},{key:"_updateDownloadStatus",value:function(){var e;e={start:0,end:this.chunkNumber},this.partialSegment&&this.partialSegment.getCDNIndexRange()&&(e=this.partialSegment.getCDNIndexRange());for(var t=e.start;t<e.end;t++){if("downloaded"===this.downloadStatus[t]||"CDNdownloaded"===this.downloadStatus[t]){var n=this._conf.CHUNK_SIZE;t===this.chunkNumber-1&&(n=this.size-(this.chunkNumber-1)*this._conf.CHUNK_SIZE),"downloaded"===this.downloadStatus[t]?this._status.correctP2PDownloaded(n,"PC"):"CDNdownloaded"===this.downloadStatus[t]&&this._status.correctP2PDownloaded(n,"CC")}this.downloadStatus[t]="CDNdownloaded"}}},{key:"getP2PDownload_CDNDownload",value:function(){var e=0,t=0;if(this.size){for(var n=0,r=this.downloadStatus.length-1;n<r;n++)"downloaded"===this.downloadStatus[n]?e+=this._conf.CHUNK_SIZE:"CDNdownloaded"===this.downloadStatus[n]&&(t+=this._conf.CHUNK_SIZE);var i=this.size-(this.chunkNumber-1)*this._conf.CHUNK_SIZE;"downloaded"===this.downloadStatus[this.chunkNumber-1]?e+=i:"CDNdownloaded"===this.downloadStatus[this.chunkNumber-1]&&(t+=i)}return{p2pDownloaded:e,cdnDownloaded:t}}},{key:"lockSegmentData",value:function(){this.dataLocked=!0}},{key:"unlockSegmentData",value:function(){this.dataLocked=!1}},{key:"removePartialSegment",value:function(){delete this.partialSegment}},{key:"_checkHashP2P",value:function(e){var t=this,n=this._segmentInfoMap.getSegmentInfo(this._segmentCoord),r=function(e,r){n.hash===r?(t._status.setNbRightHashP2P(t._status.getNbRightHashP2P()+1),t.segment=new h.default(e),t.unlockSegmentData(),t._peerPool.broadcastSegmentInfo(n.segmentCoord)):(t._status.setNbWrongHashP2P(t._status.getNbWrongHashP2P()+1),t.p2pCache.removeSegmentHandler(n.segmentCoord),t._status.correctP2PDownloaded(t.size,"HP"))};e.getBinaryData(0,e.byteLength,function(e){t._workerHelper.callHashWorker(e,r)})}}]),e}();n.default=p,t.exports=n.default},{"./PartialSegment/PartialSegmentP2P":33,"./binaryAbstraction/Segment":47,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:219}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t){function n(e,t,n,a){var o=r.getSegmentHandler(t).chunkManager;o?o.chunkDownloaded(a,n):i.correctP2PDownloaded(a.byteLength,"M"),e.getHeuristic().incrementNbChunkDownloaded()}var r=e,i=t.status;t.eventBus.on("chunkReceived",n)};n.default=r,t.exports=n.default},{}],20:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./UploadQueue"),a=r(i),o=function(e,t){function n(e,t,n){i.incrementReceivedChunkRequestCount();var a=Date.now(),s=r.getSegmentHandler(t).chunkManager;s&&s.getChunk(n,function(r){r&&(i.incrementHitReceivedChunkRequestCount(),o.add(e,t,n,r,a))})}var r=e,i=t.status,o=new a.default(t);t.eventBus.on("chunkRequested",n)};n.default=o,t.exports=n.default},{"./UploadQueue":46}],21:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/slicedToArray"),a=r(i),o=e("babel-runtime/core-js/get-iterator"),s=r(o),u=e("babel-runtime/core-js/map"),l=r(u),c=e("babel-runtime/helpers/classCallCheck"),f=r(c),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("../utils/Options"),m=e("../../defaultConf"),_=(r(m),function(){function e(t,n){var r=this;(0,f.default)(this,e),this._segmentListMap=new l.default,this._conf=n.conf;var i=t.getTrackList();i.forEach(function(e){r._segmentListMap.set(e,[])})}return(0,h.default)(e,[{key:"insert",value:function(e){var t=this._getMatchingTrack(e),n=(0,p.unwrap)(this._segmentListMap.get(t));if(0===n.length)n.push(e);else if(n[0].getId()>e.getId())n.unshift(e);else for(var r=n.length;r>0;r--)if(e.getId()>n[r-1].getId()){n.splice(r,0,e);break}var i=n.length;if(i>this._conf.MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH){var a=n.slice(i-this._conf.MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH);this._segmentListMap.set(t,a)}}},{key:"getSegmentListAfter",value:function(e){var t=this._getMatchingTrack(e),n=(0,p.unwrap)(this._segmentListMap.get(t)),r=n.filter(function(t){return t.getId()>e.getId()});return this._segmentListMap.set(t,r),r}},{key:"_getMatchingTrack",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,o=(0,s.default)(this._segmentListMap);!(t=(i=o.next()).done);t=!0){var u=(0,a.default)(i.value,1),l=u[0];if(e.isInTrack(l))return l}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}throw new Error("The segment "+e.viewToString()+" belongs to no track")}}]),e}());n.default=_,t.exports=n.default},{"../../defaultConf":1,"../utils/Options":90,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/slicedToArray":127}],22:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../utils/Timers"),l=r(u),c=function(){function e(t){(0,a.default)(this,e),this._exclusionArray=[],this._timers=new l.default,this._retentionTime=t}return(0,s.default)(e,[{key:"add",value:function(e){var t=this;this._exclusionArray.push(e),this._timers.setTimeout(function(){t._exclusionArray.splice(0,1)},this._retentionTime)}},{key:"getExclusionList",value:function(){return this._exclusionArray}},{key:"dispose",value:function(){this._timers.clearAll()}}]),e}();n.default=c,t.exports=n.default},{"../utils/Timers":95,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],23:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=e,n={},r=[],i=[],a=function(e,n){r.push({eventName:e,fn:n}),t.addEventListener(e,n)},o=function(e,t){i.push({eventName:e,fn:t}),window.addEventListener(e,t)},s=function(){for(var e=0;e<r.length;e++){var n=r[e].eventName,i=r[e].fn;t.removeEventListener(n,i)}r=[]},u=function(){for(var e=0;e<i.length;e++){var t=i[e].eventName,n=i[e].fn;window.removeEventListener(t,n)}i=[]},l=function(){s(),u()},c=function(e){function t(){n[e].arguments=arguments}return n[e]={arguments:void 0,handler:t},t},f=function(e){t.addEventListener(e,c(e))},d=function(e,r){if(!n[e])throw new Error("You are trying to trigger an event that have not been cached before");t.removeEventListener(e,n[e].handler),n[e].arguments&&r.apply(void 0,n[e].arguments)};this.addMediaEventListener=a,this.addWindowEventListener=o,this.removeAllExternalEventListener=l,this.cacheMediaEvent=f,this.triggerCachedEvent=d};n.default=r,t.exports=n.default},{}],24:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("../utils/Timers"),a=r(i),o=function(){var e=.3,t=0,n=4e3,r=0,i=0,o=0,s=.5,u=0,l=new a.default,c=function(){r++},f=function(){i++},d=function(){o++},h=function(){var e,n=i/r;return e=isNaN(n)?t:Math.min(n,1),u=e,e},p=function(){var t;return 0!==r&&(t=(1-e)*s+e*h(),s=t),s},m=function(){r=0,i=0,o=0},_=function(){p(),m()},v=function(){l.setInterval(_,n)},g=function(){l.clearAll()};this.incrementNbChunkRequested=function(){return c()},this.incrementNbChunkDownloaded=function(){return f()},this.incrementNbChunkTimeOut=function(){return d()},this.heurisInst=function(){return h()},this.mean=function(){return p()},this.getNbChunkRequested=function(){return r},this.getHeuristicScore=function(){return s},this.getLastHeuristInst=function(){return u},this.dispose=function(){g()},v()};n.default=o,t.exports=n.default},{"../utils/Timers":95}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n,r){this.city=e,this.country=t,this.latitude=n,this.longitude=r};n.default=r,t.exports=n.default},{}],26:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/map"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("../../defaultConf"),f=(r(c),e("../utils/Options")),d=function(){function e(t,n){(0,s.default)(this,e),this._mediaMap=t,this._conf=n.conf,this._cachedSegmentList=new a.default,this._cachedSegmentTime=new a.default}return(0,l.default)(e,[{key:"getSegmentList",value:function(e,t,n){var r=this._cachedSegmentList.get(e.viewToString());if(r&&r.beginTime===t&&r.duration===n)return r.cachedSegmentList;var i=this._mediaMap.getSegmentList(e,t,n);return this._cachedSegmentList.set(e.viewToString(),{beginTime:t,cachedSegmentList:i,duration:n}),i}},{key:"getSegmentTime",value:function(e){var t=this._cachedSegmentTime.get(e.viewToString());if(void 0!==t)return t;var n=this._mediaMap.getSegmentTime(e);if(this._cachedSegmentTime.set(e.viewToString(),n),this._cachedSegmentTime.size>this._conf.GETSEGMENTTIME_CACHE_MAX_SIZE){var r=this._cachedSegmentTime.keys(),i=r.next().value,a=(0,f.unwrap)(i);this._cachedSegmentTime.delete(a)}return n}}]),e}();n.default=d,t.exports=n.default},{"../../defaultConf":1,"../utils/Options":90,"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],27:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"updateCurrentTracks",value:function(e){var t=e.video;t&&(this._currentVideoTrack=t)}},{key:"getVideoTrackHash",value:function(){return this._currentVideoTrack?this._currentVideoTrack.viewToString():"defaultTrackHash"}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],28:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/slicedToArray"),a=r(i),o=e("babel-runtime/helpers/toConsumableArray"),s=r(o),u=e("babel-runtime/core-js/get-iterator"),l=r(u),c=e("babel-runtime/core-js/map"),f=r(c),d=e("./structures/SegmentHandler"),h=r(d),p=e("../utils/Timers"),m=r(p),_=e("./binaryAbstraction/Segment"),v=r(_),g=function(e,t,n,r){function i(e){var t=E.get(e.viewToString());return!!t&&t}function o(e){var t=!0,n=!1,r=void 0;try{for(var i,a=(0,l.default)(E.values());!(t=(i=a.next()).done);t=!0){var o=i.value;o.seeders.removeSeeder(e)}}catch(e){n=!0,r=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw r}}}function u(e){var t=i(e);return t===!1&&(t=new h.default(e,this,D,T,r),E.set(t.segmentCoord.viewToString(),t),D.requestHasSegment(e),c()),t}function c(){var e,t=0,n=k()?S.LIVE.P2P_CACHE_MAX_SIZE:S.P2P_CACHE_MAX_SIZE,r=0,i=!0,a=!1,o=void 0;try{for(var s,u=(0,l.default)(E.values());!(i=(s=u.next()).done);i=!0){var c=s.value;if(c.chunkManager.size&&(t+=c.chunkManager.size),t>n){e=E.size-r;break}r++}}catch(e){a=!0,o=e}finally{try{!i&&u.return&&u.return()}finally{if(a)throw o}}if(e){var f=E.keys(),d=!0,h=!1,p=void 0;try{for(var m,_=(0,l.default)(f);!(d=(m=_.next()).done);d=!0){var v=m.value;if(0===e)break;var g=E.get(v);E.delete(v),T.removeSegmentInfo(g.segmentCoord),e--}}catch(e){h=!0,p=e}finally{try{!d&&_.return&&_.return()}finally{if(h)throw p}}}}function d(e){E.delete(e.viewToString())}function p(){var e=0,t=0,n=!0,r=!1,i=void 0;try{for(var a,o=(0,l.default)(E.values());!(n=(a=o.next()).done);n=!0){var s=a.value,u=s.chunkManager.getP2PDownload_CDNDownload();e+=u.p2pDownloaded,t+=u.cdnDownloaded}}catch(e){r=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}return{p2pDownloaded:e,cdnDownloaded:t}}function _(e,t){var n=u(e),r=n.chunkManager,i=new v.default(t);r.storeSegment(i),D.broadcastSegmentInfo(e)}function g(e){var t=i(e).chunkManager;return!!t&&t.getPartialSegment()}function b(e){return[].concat((0,s.default)(E)).filter(function(t){var n=(0,a.default)(t,2),r=(n[0],n[1]);return r.segmentCoord.isInTrack(e)&&!r.chunkManager.shouldDownloadSegment()}).map(function(e){var t=(0,a.default)(e,2),n=(t[0],t[1]);return n.segmentCoord})}function y(){return[].concat((0,s.default)(E)).map(function(e){var t=(0,a.default)(e,2),n=(t[0],t[1]);return{segmentcoord:n.segmentCoord,downloadStatusList:n.chunkManager.downloadStatus,seederCount:n.seeders.getLength()}})}function C(e){return[].concat((0,s.default)(E)).filter(function(t){var n=(0,a.default)(t,2),r=(n[0],n[1]);return r.segmentCoord.isInTrack(e)&&r.chunkManager.isSegmentDownloaded()}).map(function(e){var t=(0,a.default)(e,2),n=(t[0],t[1]);return n.segmentCoord})}function w(){P.clearAll(),E=new f.default}var S=r.conf,E=new f.default,k=e,T=n,D=t,P=new m.default;p(),P.setInterval(p,1e4),this.dispose=w,this.getOrCreateSegmentHandler=u,this.removeSegmentHandler=d,this.doubleCheckP2PDownload_CDNDownload=p,this.fillSegment=_,this.getSegmentHandler=i,this.getPartialSegment=g,this.removePeer=o,this.listSegmentsToSkipForTrack=b,this.listSegmentsDownloadStatus=y,this.listDownloadedSegmentsForTrack=C};n.default=g,t.exports=n.default},{"../utils/Timers":95,"./binaryAbstraction/Segment":47,"./structures/SegmentHandler":73,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/slicedToArray":127,"babel-runtime/helpers/toConsumableArray":128}],29:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(t,n,r,i){(0,a.default)(this,e),this._scheduler=t,this._p2pCache=n,this._segmentInfoMap=r,this._distributedSegmentList=i}return(0,s.default)(e,[{key:"_onHasSegment",value:function(e,t,n){var r=n.pushed;if(this._segmentInfoMap.addSegmentInfo(t),r&&this._distributedSegmentList.insert(t.segmentCoord),this._scheduler.isSegmentRequested(t.segmentCoord)){var i=this._p2pCache.getOrCreateSegmentHandler(t.segmentCoord);i.chunkManager.setSegmentSize(t.size),i.seeders.insertSeeder(e)}}},{key:"_onPeerDestroyed",value:function(e){var t=e.remotePeer;this._p2pCache.removePeer(t)}}],[{key:"listenEvents",value:function(t,n,r,i,a){var o=new e(t,n,r,i);a.eventBus.on("hasSegment",o._onHasSegment.bind(o)),a.eventBus.on("peerDestroyed",o._onPeerDestroyed.bind(o))}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],30:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./PartialSegmentInterface"),m=r(p),_=function(e){function t(e){(0,s.default)(this,t);var n=(0,f.default)(this,(0,a.default)(t).call(this));return n._segmentCoord=e,n}return(0,h.default)(t,e),(0,l.default)(t,[{key:"getUpdatedRange",value:function(e){return e}},{key:"getFullSegment",value:function(e,t){
t(e,this._segmentCoord)}},{key:"isComplete",value:function(){return!1}},{key:"isLocked",value:function(){return!1}},{key:"p2pSpeed",get:function(){return 0}},{key:"p2pAmount",get:function(){return 0}}]),t}(m.default);n.default=_,t.exports=n.default},{"./PartialSegmentInterface":31,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],31:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u="Method not implemented",l=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"getUpdatedRange",value:function(e){throw new Error(u)}},{key:"getFullSegment",value:function(e,t,n){throw new Error(u)}},{key:"isComplete",value:function(){throw new Error(u)}},{key:"isLocked",value:function(){throw new Error(u)}},{key:"p2pSpeed",get:function(){throw new Error(u)}},{key:"p2pAmount",get:function(){throw new Error(u)}}]),e}();n.default=l,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],32:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./PartialSegmentInterface"),m=r(p),_=e("../structures/SegmentInfo"),v=r(_),g=function(e){function t(e,n,r,i){function o(e,t){function i(i,a){e.response=i;var o=new v.default(h,i.byteLength,a);r.addSegmentInfo(o),n.fillSegment(h,e.response),l.emit("piece_downloaded_prtl",h),t(e,h)}c.callHashWorker(e.response,i)}(0,s.default)(this,t);var u=i.status,l=i.eventBus,c=i.workerHelper,d=(0,f.default)(this,(0,a.default)(t).call(this)),h=e;return d.getFullSegment=function(e,t){l.emit("CDNSegmentDownloaded",h);var n=e.response;u.increaseCDNDownloadedBy(n.byteLength),o(e,t)},d}return(0,h.default)(t,e),(0,l.default)(t,[{key:"isComplete",value:function(){return!1}},{key:"isLocked",value:function(){return!1}},{key:"getUpdatedRange",value:function(e){return e}},{key:"p2pSpeed",get:function(){return 0}},{key:"p2pAmount",get:function(){return 0}}]),t}(m.default);n.default=g,t.exports=n.default},{"../structures/SegmentInfo":74,"./PartialSegmentInterface":31,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],33:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/define-properties"),a=r(i),o=e("babel-runtime/core-js/object/get-prototype-of"),s=r(o),u=e("babel-runtime/helpers/classCallCheck"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../../errors/ErrorFunnel"),m=r(p),_=e("./PartialSegmentInterface"),v=r(_),g=function(e){function t(e,n,r,i,o,u,c,d,h){function p(e,t,r,i){function a(a,o){t.hash===o?(M.setNbRightHashDLM(M.getNbRightHashDLM()+1),e.response=a,_(e),r(e,x)):(M.setNbWrongHashDLM(M.getNbWrongHashDLM()+1),M.increaseCdnDataDiscardedBy(L),n.removeSegmentHandler(x),M.correctP2PDownloaded(k,"HD"),i(e,x))}R.callHashWorker(e.response,a)}function _(e){P=e.response,n.fillSegment(x,e.response),A.emit("piece_downloaded_prtl",x),u.unlockSegmentData(),u.removePartialSegment()}function v(){k=0;for(var e=0;e<I.length;e++)"downloaded"===I[e]&&(k+=e<I.length-1?j.CHUNK_SIZE:o-(I.length-1)*j.CHUNK_SIZE)}function g(){for(var e=0;e<I.length;e++)if("downloaded"!==I[e]&&"CDNdownloaded"!==I[e])return e}function b(){for(var e=I.length-1;e>=0;e--)if("downloaded"!==I[e]&&"CDNdownloaded"!==I[e])return e+1}function y(e){if(!j.RANGE_REQUEST_ALLOWED)return e;var t,n,r=g(),i=b();return void 0!==r&&void 0!==i?(t=e?e.start+r*j.CHUNK_SIZE:r*j.CHUNK_SIZE,i===I.length&&e?n=e.end:i<I.length&&(n=e?e.start+i*j.CHUNK_SIZE-1:i*j.CHUNK_SIZE-1),E={start:r,end:i},{start:t,end:n}):e?e:void 0}function C(){P=r,I=i.slice(),v(),T=M.getMeanInstantSpeed(),D=c}function w(e){if(void 0===E)throw new Error("assertion: _cdnIndexRange is not defined");if(void 0===P)throw new Error("assertion: _segmentData is not defined");try{P.setBinaryData(e,E.start*j.CHUNK_SIZE)}catch(e){throw m.default.notifyError(e),new Error("Invalid configuration: The current stream has no range request enabled and the p2p configuration has range request set to true.")}return P}function S(e){M.increaseCDNDownloadedBy(e.byteLength)}(0,l.default)(this,t);var E,k,T,D,P,I,j=h.conf,M=h.status,A=h.eventBus,R=h.workerHelper,O=(0,f.default)(this,(0,s.default)(t).call(this)),x=e,N=d,L=0;return O.getFullSegment=function(e,t,n){if(this.isComplete())P.getBinaryData(0,P.byteLength,function(n){e.response=n,u.removePartialSegment(),t(e,null)});else{A.emit("CDNSegmentDownloaded",x);var r=e.response;S(r),L=r.byteLength,w(r).getBinaryData(0,P.byteLength,function(r){if(e.response=r,0!==k){u.lockSegmentData();var i=N.getSegmentInfo(x);p(e,i,t,n)}else _(e),t(e,x)})}},O.getUpdatedRange=y,O.getCDNIndexRange=function(){return E},O.isComplete=function(){return D},O.isLocked=function(){return u.dataLocked},C(),(0,a.default)(O,{p2pSpeed:{get:function(){return T},set:void 0},p2pAmount:{get:function(){return k},set:void 0}}),O}return(0,h.default)(t,e),t}(v.default);n.default=g,t.exports=n.default},{"../../errors/ErrorFunnel":13,"./PartialSegmentInterface":31,"babel-runtime/core-js/object/define-properties":112,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],34:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./Heuristic"),a=r(i),o=e("../utils/Timers"),s=r(o),u=e("../utils/Cartography"),l=r(u),c=e("../metrics/MovingAverage"),f=r(c),d=e("./structures/SegmentInfo"),h=r(d),p=function(e,t,n,r){var i,o,u,c,d,p=r.conf,m=r.status,_=r.analyticsData,v=0,g=0,b=0,y=0,C=Date.now(),w=0,S=0,E=Date.now(),k=r.eventBus,T=e,D=!1,P=_,I=0,j=0,M=new a.default,A=this,R=new s.default,O=0,x=new f.default(p.PEER_INSTANT_SPEED_CALCULATION_WINDOW),N=function(){return l.default.getDistanceFromLatitudeLongitude(u,m.getMyLocation().latitude,c,m.getMyLocation().longitude)},L=function(){var e=Date.now(),t=e-C;I=b/1024/(t/1e3),j=y/1024/(t/1e3),b=0,y=0,C=e},U=function(){x.addPoint(v-O),O=v},$=function(){return x.compute()/(p.PEER_INSTANT_SPEED_CALCULATION_INTERVAL/1e3)},F=function(){var e=Date.now(),t=(e-E)/1e3,n=v+g-(w+S);n<p.MIN_USEFUL_SPEED*t&&(k.emit("remove_peer",A,!1),K()),w=v,S=g,E=e},H=function e(){m.getMyLocation().city?n.sendMessage("info",{bufferLevel:m.getMyBufferLevel(),city:m.getMyLocation().city,country:m.getMyLocation().country,latitude:m.getMyLocation().latitude,longitude:m.getMyLocation().longitude}):m.getEE().once("location_updated",e)},B=function(e){n.sendMessage("requestHasSegment",e)},q=function(e,t){var r=t.pushed;n.sendMessage("hasSegment",{segmentInfo:e,pushed:r})},G=function(e,t){n.sendMessage("requestChunk",{segmentCoord:e,id_chunk:t}),M.incrementNbChunkRequested()},V=function(){return M.getNbChunkRequested()<p.MAX_CHUNK_BY_SEEDER},K=function(){R.clearAll(),M.dispose(),n.close()},Y=function(){R.clearAll(),M.dispose(),n.destroy()},W=function(){R.setInterval(L,1e3),R.setInterval(F,p.CHECK_USELESS_INTERVAL),R.setInterval(U,p.PEER_INSTANT_SPEED_CALCULATION_INTERVAL),H(),m.incrementNewPeerConnectionCount(),n.once("disconnected",function(){P.disconnected++,k.emit("remove_peer",A,!1),Y()}),n.on("binarydata_received",X),n.on("message_received",z)},z=function(e,n){switch(e){case"info":i=n.city,o=n.country,u=n.latitude,c=n.longitude,d=n.bufferLevel,P.active++,k.emit("info",{remotePeer:A});break;case"requestHasSegment":k.emit("segmentRequested",A,new t(n));break;case"hasSegment":var r=new t(n.segmentInfo.segmentCoord),a=new h.default(r,n.segmentInfo.size,n.segmentInfo.hash),s=!!n.pushed;k.emit("hasSegment",A,a,{pushed:s});break;case"requestChunk":k.emit("chunkRequested",A,new t(n.segmentCoord),n.id_chunk);break;default:throw new Error("wrong message sent by peerConnection")}},X=function(e,t,n){b+=e.byteLength,v+=e.byteLength,m.increaseP2PDownloadedUncorrectedBy(e.byteLength),m.setP2PDownloaded(m.getP2PDownloaded()+e.byteLength),k.emit("chunkReceived",A,n,t,e),Z()},Q=function(e,t,r){var i=r.byteLength,a=n.sendBinaryData(r,t,e);return!!a&&(y+=i,g+=i,m.increaseP2PUploadedBy(i),void Z())},Z=function(){D||(P.transfer++,D=!0)};A.getRtt=n.getRtt.bind(n),A.getDistance=N,A.requestHasSegment=B,A.answerHasSegment=q,A.requestChunk=G,A.sendChunk=Q,A.canBeAskedChunk=V,A.close=K,A.getDataDownloaded=function(){return v},A.getDataUploaded=function(){return g},A.getBufferLevel=function(){return d},A.getId=function(){return T},A.getDlSpeed=function(){return I},A.getUpSpeed=function(){return j},A.getBufferedAmount=n.getBufferedAmount.bind(n),A.getHeuristic=function(){return M},A.getDebugInfos=function(){return{country:o,city:i,bufferLevel:d,dlSpeed:I,upSpeed:j,dataDownloaded:v,dataUploaded:g,rtt:n.getRtt(),distance:N()}},A.getMeanInstantSpeed=$,W()};n.default=p,t.exports=n.default},{"../metrics/MovingAverage":15,"../utils/Cartography":82,"../utils/Timers":95,"./Heuristic":24,"./structures/SegmentInfo":74}],35:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/get-iterator"),a=r(i),o=e("underscore"),s=r(o),u=e("../utils/Timers"),l=r(u),c=e("./Peer"),f=r(c),d=e("./communication/PeerConnector"),h=r(d),p=e("./ExclusionCollection"),m=r(p),_=function(e,t,n,r){var i,o=r.conf,u=r.status,c=r.analyticsData,d=e,p=n,_=!1,v=[],g=this,b=r.eventBus,y=new m.default(o.OFFER_DECLINED_TIMEOUT),C=new m.default(o.PEER_REMOVED_TIMEOUT),w=new m.default(o.PEER_CONNEXION_ATTEMPT_TIMEOUT),S=null,E=new l.default,k=function(){E.setInterval(T,o.SPEED_MONITOR_INTERVAL),b.on("remove_peer",M),E.setInterval(P,o.MEAN_SPEED_CALCULATION_INTERVAL),d.getEE().on("tracker_ready",I,g),d.getEE().on("tracker_disconnected",j,g)},T=function(){var e=0,t=0;s.default.forEach(v,function(n){e+=n.getDlSpeed(),t+=n.getUpSpeed()}),u.setDlSpeed(e),u.setUpSpeed(t),u.computeMaxAndAvgSpeed()},D=function(){var e=0;s.default.forEach(v,function(t){e+=t.getMeanInstantSpeed()});var t=Math.max(0,u.getp2pDownloadedNewAnalytics()),n=u.getP2PDownloadedUncorrected();return n&&(e*=t/n),e},P=function(){var e=D();u.setMeanInstantSpeed(e)},I=function(){null!==S&&S.dispose(),S=new h.default(u.getMyPeerId(),this,t,r),i||(i=E.setInterval(A,o.ASK_PEERS_INTERVAL)),_||A(),_=!0},j=function(){i&&(E.clearInterval(i),i=void 0)},M=function(e){C.add(e.getId()),c.dropped++,v=s.default.without(v,e),b.emit("peerDestroyed",{remotePeer:e,peerCount:v.length})},A=function(){if(v.length<o.MIN_NUMBER_OF_PEERS){var e=R();u.onPeerUpdateRequest();var t=Date.now();d.askPeers(e,function(e,n){if(null===e){var r=Date.now()-t;u.onPeerUpdateResponse(r);var i=0;n.forEach(function(e){e.peers.forEach(function(e){v.length+i<o.MIN_NUMBER_OF_PEERS&&(S.createPeerConnection(e),i++,c.match++)})})}})}},R=function(){var e,t=[];for(e=0;e<v.length;e++)t.push(v[e].getId());return t=t.concat(C.getExclusionList(),y.getExclusionList(),w.getExclusionList())},O=function(){return v.length>=o.MAX_NUMBER_OF_PEERS},x=function(e){v.forEach(function(t){t.requestHasSegment(e)})},N=function(){v.forEach(function(e,t){e.close(),b.emit("peerDestroyed",{remotePeer:e,peerCount:v.length-t-1})}),v=[]},L=function(e,n){if(O())n.destroy();else{var i=new f.default(e,t,n,r);v.push(i),c.open++,b.emit("peerOpen",{remotePeer:i,peerCount:v.length})}},U=function(e){y.add(e),c.denied++},$=function(e){w.add(e),c.timeout++},F=function(e){var t=p.getSegmentInfo(e),n=!0,r=!1,i=void 0;try{for(var o,s=(0,a.default)(v);!(n=(o=s.next()).done);n=!0){var u=o.value;u.answerHasSegment(t,{pushed:!0})}}catch(e){r=!0,i=e}finally{try{!n&&s.return&&s.return()}finally{if(r)throw i}}},H=function(){d.dispose(),null!==S&&S.dispose(),E.clearAll(),N(),y.dispose(),C.dispose(),w.dispose()};g.getPeerArray=function(){return v},g.getPendingConnectionDebugInfos=function(){return S?S.getPendingConnectionDebugInfos():[]},g.requestHasSegment=x,g.isFull=O,g.addPeerConnection=L,this.offerDeclined=U,this.connectionAttemptTimeout=$,g.broadcastSegmentInfo=F,g.dispose=H,k()};n.default=_,t.exports=n.default},{"../utils/Timers":95,"./ExclusionCollection":22,"./Peer":34,"./communication/PeerConnector":55,"babel-runtime/core-js/get-iterator":106,underscore:226}],36:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=function e(t,n){(0,a.default)(this,e),this.cdn=n.getCDNDownloaded(),this.p2p=n.getP2PDownloaded(),this.upload=n.getP2PUploaded(),t?this.peers=t.getPeerArray().length:this.peers=0};n.default=o,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123}],37:[function(e,t,n){(function(r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(){var e=window.RTCPeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection;return!(!e||ae.default.isMobile())}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./structures/CurrentTracks"),s=e("./P2PDownloader"),u=i(s),l=e("./ChunkDownloader"),c=i(l),f=e("./ExternalEventManager"),d=i(f),h=e("./PartialSegment/PartialSegmentNoP2P"),p=i(h),m=e("./PartialSegment/PartialSegmentDisableP2P"),_=i(m),v=e("./display/DisplayInterface"),g=i(v),b=e("./TrackerManager"),y=i(b),C=e("../analytics/AnalyticsReporter"),w=i(C),S=e("./PeerPool"),E=i(S),k=e("./P2PCache"),T=i(k),D=e("./SegmentUploader"),P=i(D),I=e("./ChunkUploader"),j=i(I),M=e("./ChunkReceivedObserver"),A=i(M),R=e("./schedulers/factory"),O=e("./SegmentInfoMap"),x=i(O),N=e("./DistributedSegmentList"),L=i(N),U=e("../utils/Timers"),$=i(U),F=e("./SRModuleInterface"),H=i(F),B=e("../../../graphs/private/BufferDisplay"),q=(i(B),e("../../../graphs/private/chunkDisplay")),G=(i(q),e("./expectedInterfaces/SegmentCoordInterface")),V=i(G),K=e("./expectedInterfaces/MapInterface"),Y=i(K),W=e("./expectedInterfaces/TrackCoordInterface"),z=i(W),X=e("../utils/Interface"),Q=e("./SharedState"),Z=i(Q),J=e("../utils/StreamTypes"),ee=e("./PublicStatsAPI"),te=i(ee),ne=e("../errors/ErrorFunnel"),re=i(ne),ie=e("../utils/uaHelper"),ae=i(ie),oe=e("../analytics/qos/MediaElementPlaceholder"),se=i(oe),ue=e("../utils/EventEnum"),le=i(ue);re.default.setScriptOrigin(window.document.currentScript&&window.document.currentScript.src?window.document.currentScript.src:null);var ce=function(e,t,n,r,i,s,l){if("string"!=typeof l||""===l||l.length>10)throw new Error("Unvalid argument in PeerAgent constructor: integration version must be a non-empty string of less than 10 characters");var f=new Z.default(r,t,l);re.default.setCustomer(f.conf.ID_CLIENT),re.default.setMetadata({stream:f.moduleState.content}),(0,X.checkInterface)(Y.default,n),(0,X.checkInterface)(V.default,i.prototype),(0,J.assertStreamType)(s);var h,m,v,b,C,S,k,D,I,M,O,N,U,F,B=new $.default,q=!1,G=s,K=new se.default,W=function(e){var t=e.audio,n=e.video;t&&(0,X.checkInterface)(z.default,t),n&&(0,X.checkInterface)(z.default,n),f.eventBus.emit(le.default.Metrics.TRACK_SWITCH),F.updateCurrentTracks({audio:t,video:n}),f.moduleState.updateCurrentTracks({video:n})},Q=function(){var e=new o.CurrentTracks;F=(0,R.createScheduler)(n,b,C,G,e,f)},ee=function(){I&&(M=new x.default,m=new y.default(e,f),v=new E.default(m,i,M,f),b=new T.default(e.isLive.bind(e),v,M,f),S=new A.default(b,f),k=new P.default(M,b,f),D=new j.default(b,f),C=new L.default(n,f),Q(),h=new c.default(b,F,f),N=new w.default(e,K,f),U.addMediaEventListener("onTrackChange",W),U.triggerCachedEvent("onTrackChange",W),u.default.listenEvents(F,b,M,C,f),ne()),q=!0},ne=function t(){!e.areBuffersInitialized||e.areBuffersInitialized()?f.conf.DEBUG&&(O=new g.default(v,e.isLive.bind(e),f)):B.setTimeout(t,300)},ie=function(){I=a()&&f.conf.ALLOW_P2P,I&&(U=new d.default(e),U.cacheMediaEvent("onTrackChange"))},ae=function(e){if(!I)throw new Error("P2P is not activated, getP2PData can't be called");var t;return q?t=I?b.getPartialSegment(e)||new p.default(e,b,M,f):new _.default(e):(ee(),t=new _.default(e)),F.updateTrackEdge(e),t},oe=function(e,t,n){return null!==n&&(0,X.checkInterface)(V.default,n),H.default.getSegment(this,e,t,n,f)},ue=function(){I&&(q&&(U.removeAllExternalEventListener(),N.dispose(),h.dispose(),b.dispose(),B.clearAll(),v.dispose(),O&&O.dispose()),f.dispose())};ie(),this.getSegment=oe,this.getP2PData=ae,this.dispose=ue,this.setMediaElement=function(e){K.mediaElement=e},Object.defineProperty(this,"stats",{get:function(){return new te.default(v,f.status)}})};Object.defineProperty(ce,"StreamTypes",{get:function(){return J.StreamTypes}}),n.default=ce,r.Streamroot=r.Streamroot||{},r.Streamroot.uaHelper=ae.default,Object.defineProperty(r.Streamroot,"p2pAvailable",{get:function(){return a()}}),t.exports=n.default}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../../graphs/private/BufferDisplay":102,"../../../graphs/private/chunkDisplay":104,"../analytics/AnalyticsReporter":4,"../analytics/qos/MediaElementPlaceholder":10,"../errors/ErrorFunnel":13,"../utils/EventEnum":86,"../utils/Interface":87,"../utils/StreamTypes":92,"../utils/Timers":95,"../utils/uaHelper":100,"./ChunkDownloader":17,"./ChunkReceivedObserver":19,"./ChunkUploader":20,"./DistributedSegmentList":21,"./ExternalEventManager":23,"./P2PCache":28,"./P2PDownloader":29,"./PartialSegment/PartialSegmentDisableP2P":30,"./PartialSegment/PartialSegmentNoP2P":32,"./PeerPool":35,"./PublicStatsAPI":36,"./SRModuleInterface":38,"./SegmentInfoMap":40,"./SegmentUploader":41,"./SharedState":42,"./TrackerManager":45,"./display/DisplayInterface":60,"./expectedInterfaces/MapInterface":61,"./expectedInterfaces/SegmentCoordInterface":62,"./expectedInterfaces/TrackCoordInterface":63,"./schedulers/factory":71,"./structures/CurrentTracks":72}],38:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=e("babel-runtime/core-js/object/keys"),a=r(i),o=e("babel-runtime/core-js/object/assign"),s=r(o),u=e("babel-runtime/helpers/classCallCheck"),l=r(u),c=e("babel-runtime/helpers/createClass"),f=r(c),d=e("../errors/ErrorFunnel"),h=r(d),p=e("./httpRequestAbstraction/HttpRequest"),m=r(p),_=e("../utils/nativeCalls"),v=function(){},g=function(){function e(t,n,r,i,a){var o=r.onProgress,s=void 0===o?v:o,u=r.onError,c=void 0===u?v:u,f=r.onSuccess,d=void 0===f?v:f,h=this;(0,l.default)(this,e),this._request=n,this._handlers={onProgress:s,onError:c,onSuccess:d},this._srModule=t,this._analyticsData=a.analyticsData,this._conf=a.conf,this._conf.RETURN_COPY_SEGMENT&&!function(){var e=h._handlers.onSuccess;h._handlers.onSuccess=function(t,n,r){h._analyticsData.p2p+=n.p2pDownloaded,h._analyticsData.cdn+=t.byteLength-n.p2pDownloaded;var i=t.slice(0);e(i,n,r)}}(),this._stats={cdnDownloaded:0,cdnDuration:0},this._segmentCoord=i}return(0,f.default)(e,[{key:"getSegment",value:function(){try{null===this._segmentCoord?this._getFullSegmentFromCDN():(this._partialSegment=this._srModule.getP2PData(this._segmentCoord),this._setP2PStats(),this._handlers.onProgress(this._stats,this._request),this._partialSegment.isComplete()?this._getFullP2PSegment():this._getRemainingRangeFromCDN())}catch(e){h.default.notifyError(e),(0,_.nativeError)(e),this._getFullSegmentFromCDN()}return{abort:this._abort.bind(this)}}},{key:"_abort",value:function(){this._httpRequest&&this._httpRequest.abort(),this._handlers.onSuccess=v}},{key:"_getFullP2PSegment",value:function(){var e=this;this._waitSegmentUnlocked(function(t){t?e._fillSegment(void 0):e._getFullSegmentFromCDN()})}},{key:"_getRemainingRangeFromCDN",value:function(){var e=this,t=this._getRangeFromRequest();this._fallbackRange=t,this._rangeToDownload=this._partialSegment.getUpdatedRange(t),this._downloadFromCDN(this._rangeToDownload,function(t,n){return t?void e._handlers.onError(t,e._request):void e._fillSegment(n)})}},{key:"_downloadFromCDN",value:function(e,t){this._httpRequest=new m.default("GET",this._request.url),this._httpRequest.validStatusCodeRange={start:200,end:206},this._setHttpRequestHandlers(t),this._setHttpRequestHeaders(e),this._httpRequest.setWithCredentials(!!this._request.withCredentials),this._httpRequest.send(),this._startDownloadCdn=new Date}},{key:"_setHttpRequestHandlers",value:function(e){var t=this;this._httpRequest.onresponse=function(n,r){return n?void e(n,null):(t._stats.cdnDownloaded=r.byteLength||0,t._stats.cdnDuration=new Date-t._startDownloadCdn,void e(null,r))},this._httpRequest.onprogress=function(e){t._stats.cdnDownloaded=e,t._stats.cdnDuration=new Date-t._startDownloadCdn,t._handlers.onProgress(t._stats,t._request)}}},{key:"_setHttpRequestHeaders",value:function(e){var t={},n=this._request.headers;if(n&&void 0!==n.length)throw new Error("Custom headers object should not have a `length` attribute (you might use the previous API format)");n&&((0,s.default)(t,n),this._rangeToDownload&&delete t.Range),void 0===t.Range&&e&&(t.Range=this._rangeValue(e)),(0,a.default)(t).length>0&&this._httpRequest.setHeaders(t)}},{key:"_rangeValue",value:function(e){var t=e.start,n=e.end||"";return"bytes="+t+"-"+n}},{key:"_fillSegment",value:function(e){var t=this,n=!1,r=function(e){return function(r,i){n||(n=!0,e.call(t,r,i))}};try{this._partialSegment.getFullSegment({response:e},r(this._onSuccessAsynchronous),r(this._getFullSegmentFromCDN))}catch(e){return h.default.notifyError(e),(0,_.nativeError)(e),void this._getFullSegmentFromCDN()}setTimeout(function(){n||(n=!0,t._getFullSegmentFromCDN())},this._conf.TIMEOUT_GET_FULL_SEGMENT)}},{key:"_waitSegmentUnlocked",value:function(e){var t=this;if(!this._partialSegment.isLocked())return void e(!0);var n=0,r=setInterval(function(){return t._partialSegment=t._srModule.getP2PData(t._segmentCoord),t._partialSegment.isLocked()?(n+=t._conf.LOCKED_RETRY_INTERVAL,void(n>t._conf.LOCKED_RETRY_TIMEOUT&&(clearInterval(r),e(!1)))):(clearInterval(r),void e(!0))},this._conf.LOCKED_RETRY_INTERVAL)}},{key:"_getRangeFromRequest",value:function(){var e=this._request.headers;if(e&&void 0!==e.Range){var t=e.Range.split("="),n=t[1].split("-");return{start:parseInt(n[0],10),end:parseInt(n[1],10)}}}},{key:"_getFullSegmentFromCDN",value:function(){var e=this;this._stats={p2pDownloaded:0,p2pDuration:0},this._downloadFromCDN(this._fallbackRange,function(t,n){return t?void e._handlers.onError(t,e._request):void e._handlers.onSuccess(n,e._stats,e._request)})}},{key:"_setP2PStats",value:function(){this._stats.p2pDownloaded=this._partialSegment.p2pAmount,this._stats.p2pDuration=0===this._partialSegment.p2pSpeed?0:Math.round(this._partialSegment.p2pAmount/this._partialSegment.p2pSpeed*1e3)}},{key:"_onSuccessAsynchronous",value:function(e){var t=this;setTimeout(function(){t._handlers.onSuccess(e.response,t._stats,t._request)},0)}}]),e}();t.exports={getSegment:function(e,t,n,r,i){var a=new g(e,t,n,r,i);return a.getSegment()}}},{"../errors/ErrorFunnel":13,"../utils/nativeCalls":98,"./httpRequestAbstraction/HttpRequest":64,"babel-runtime/core-js/object/assign":110,"babel-runtime/core-js/object/keys":118,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],39:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("underscore"),a=r(i),o=function(){var e=[],t=0,n=function(t){for(var n=e.length,r=0;r<n;r++)if(e[r]===t){e.splice(r,1);break}n=e.length;for(var i=0;i<n;i++){var a=e[i].getHeuristic().getHeuristicScore(),o=t.getHeuristic().getHeuristicScore();if(a<=o)return void e.splice(i,0,t)}e.push(t)},r=function(t){e=a.default.reject(e,function(e){return e===t})},i=function(){for(var t=0,n=0;n<e.length;n++)t+=e[n].getHeuristic().getHeuristicScore();return t},o=function(n){var r,a=Math.floor(Math.random()*e.length);switch(t){case 0:if(0!==e.length){r=e[a];for(var o=0;o<e.length;o++)if(e[o].getHeuristic().getNbChunkRequested()/e[o].getHeuristic().getHeuristicScore()<=e[e.length-1].getHeuristic().getNbChunkRequested()/e[e.length-1].getHeuristic().getHeuristicScore()&&e[o].canBeAskedChunk()){r=e[o];break}}break;case 1:if(0!==e.length){r=e[a];for(var s=0;s<e.length;s++)if(Math.random()<=e[s].getHeuristic().getHeuristicScore()&&e[s].canBeAskedChunk()){r=e[s];break}}break;case 2:if(0!==e.length){r=e[a];for(var u=0;u<e.length;u++)if(e[u].getHeuristic().getNbChunkRequested()<=Math.floor(e[u].getHeuristic().getHeuristicScore()/i()*n+1)&&e[u].canBeAskedChunk()){r=e[u];break}}break;case 3:if(0!==e.length){r=e[a];for(var l=0;l<e.length;l++)if(e[l].getHeuristic().getNbChunkRequested()/e[l].getHeuristic().getHeuristicScore()<=e[l+1].getHeuristic().getNbChunkRequested()/e[l+1].getHeuristic().getHeuristicScore()&&e[l].canBeAskedChunk()){r=e[l];break}}break;default:r=!1}return r},s=function(){e=[]};this.getNextSeeder=function(e){return o(e)},this.insertSeeder=function(e){n(e)},this.removeSeeder=function(e){r(e)},this.cleanAfterDownloaded=function(){s()},this.getLength=function(){return e.length}};n.default=o,t.exports=n.default},{underscore:226}],40:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/map"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=function(){function e(){(0,s.default)(this,e),this._map=new a.default}return(0,l.default)(e,[{key:"addSegmentInfo",value:function(e){var t=e.segmentCoord.viewToString();this._map.set(t,e)}},{key:"getSegmentInfo",value:function(e){var t=e.viewToString(),n=this._map.get(t);if(!n)throw new Error("segmentInfo not found in the map");return n}},{key:"removeSegmentInfo",value:function(e){var t=e.viewToString();this._map.delete(t)}}]),e}();n.default=c,t.exports=n.default},{"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],41:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){function r(e,t){var n=a.getSegmentHandler(t).chunkManager;if(n){var r=n.getIndexLastChunkInARow();if(r>-1){var o=i.getSegmentInfo(t);return void e.answerHasSegment(o,{pushed:!1})}}}var i=e,a=t;n.eventBus.on("segmentRequested",r)};n.default=r,t.exports=n.default},{}],42:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("./Status"),f=r(c),d=e("../../defaultConf"),h=r(d),p=e("./ModuleState"),m=r(p),_=e("eventemitter3"),v=r(_),g=e("../analytics/AnalyticsData"),b=r(g),y=e("../security/WorkerHelper"),C=r(y),w=e("../utils/confHelper"),S=r(w),E=e("../utils/ContentId"),k=function(){function e(t,n,r){(0,s.default)(this,e),this.analyticsData=new b.default;var i=JSON.parse((0,a.default)(h.default));(0,S.default)(i,t,r),this.conf=i,this.status=new f.default;var o=(0,E.formatContentId)({contentId:t.contentId,contentUrl:n});this.moduleState=new m.default,this.moduleState.content=o,this.eventBus=new v.default,this.workerHelper=new C.default}return(0,l.default)(e,[{key:"dispose",value:function(){this.workerHelper.dispose()}}]),e}();n.default=k,t.exports=n.default},{"../../defaultConf":1,"../analytics/AnalyticsData":3,"../security/WorkerHelper":76,"../utils/ContentId":84,"../utils/confHelper":97,"./ModuleState":27,"./Status":44,"babel-runtime/core-js/json/stringify":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:219}],43:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../../defaultConf"),l=(r(u),function(){function e(t){(0,a.default)(this,e),this.transferedChunks=[],this._conf=t}return(0,s.default)(e,[{key:"calculateSpeed",value:function(){var e=this._getIndexTransferOneSecondAgo();return null===e?this.transferedChunks=[]:e>0&&this.transferedChunks.splice(0,e),this.transferedChunks.length*this._conf.CHUNK_SIZE/1024}},{key:"_getIndexTransferOneSecondAgo",value:function(){for(var e=Date.now(),t=0;t<this.transferedChunks.length;t++)if(e-this.transferedChunks[t]<=1e3)return t;return null}},{key:"addChunkTransfer",value:function(){var e=Date.now();this.transferedChunks.push(e)}}]),e}());n.default=l,t.exports=n.default},{"../../defaultConf":1,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],44:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("eventemitter3"),a=r(i),o=function(){var e=!1,t={city:null,country:null,latitude:null,longitude:null},n=void 0,r=0,i=0,o=0,s=0,u=0,l=0,c=0,f=0,d=0,h=0,p=0,m=0,_=0,v=0,g=0,b=0,y=0,C=0,w=0,S=0,E=0,k=0,T=0,D=0,P=0,I=0,j=0,M="",A=0,R=0,O=0,x=0,N=!0,L=0,U=0,$=[],F=!1,H="",B=0,q=0,G=0,V=0,K=0,Y=0,W=0,z=0,X=0,Q=0,Z=0,J=this,ee=void 0,te=void 0,ne=new a.default,re=void 0,ie=function(){var e,t,n,a;r&&(r>o&&(o=r),e=i?(i*ee+r)/(ee+1):r,t=ee?ee+1:1,ee=t,i=e),s&&(s>l&&(l=s),n=u?(u*te+s)/(te+1):s,a=te?te+1:1,te=a,u=n)},ae=function(){L++},oe=function(){return L},se=function(e){U++,$.push(e)},ue=function(){return U},le=function(){var e=0,t=0;if($.length>0){for(var n=0;n<$.length;n++)e+=$[n];t=e/$.length}return $=[],t};J.getMyPeerId=function(){return n},J.setMyPeerId=function(e){n!==e&&(n=e)},J.getMyLocation=function(){return t},J.setMyLocation=function(e){t=e,ne.emit("location_updated",e)},J.correctP2PDownloaded=function(e,t){isNaN(e)||("PP"===t?(b+=e,f-=e):"PC"===t?(y+=e,f-=e,f=d-e):"CP"===t?(C+=e,f-=e):"CC"===t?w+=e:"HP"===t?(S+=e,f-=e):"HD"===t?(E+=e,f-=e):"M"===t&&(k+=e,f-=e))},J.getDlSpeed=function(){return r},J.setDlSpeed=function(e){r=e},J.getAvgDlSpeed=function(){return i},J.getMaxDlSpeed=function(){return o},J.getUpSpeed=function(){return s},J.setUpSpeed=function(e){s=e},J.getAvgUpSpeed=function(){return u},J.getMaxUpSpeed=function(){return l},J.getP2PDownloaded=function(){return f},J.setP2PDownloaded=function(e){"number"!=typeof e||isNaN(e)||(f=e)},J.getp2pDownloadedNewAnalytics=function(){return d},J.setp2pDownloadedNewAnalytics=function(e){"number"!=typeof e||isNaN(e)||(d=e)},J.getP2PDownloadedUncorrected=function(){return h},J.increaseP2PDownloadedUncorrectedBy=function(e){h+=e},J.getP2PUploaded=function(){return p},J.increaseP2PUploadedBy=function(e){p+=e},J.getRawDataDownloaded=function(){return m},J.increaseRawDataDownloadedBy=function(e){m+=e},J.getRawDataUploaded=function(){return _},J.increaseRawDataUploadedBy=function(e){_+=e},J.getCDNDownloaded=function(){return v},J.increaseCDNDownloadedBy=function(e){v+=e},J.getCdnCancelled=function(){return g},J.increaseCdnCancelledBy=function(e){g+=e},J.getDataDownloadedTwice_PP=function(){return b},J.getDataDownloadedTwice_PC=function(){return y},J.getDataDownloadedTwice_CP=function(){return C},J.getDataDownloadedTwice_CC=function(){return w},J.getDataDownloadedTwice_HP=function(){return S},J.getDataDownloadedTwice_HD=function(){return E},J.getDataDownloadedTwice_M=function(){return k},J.getCdnDataDiscarded=function(){
return T},J.increaseCdnDataDiscardedBy=function(e){T+=e},J.getNbRightHashP2P=function(){return D},J.setNbRightHashP2P=function(e){D=e},J.getNbWrongHashP2P=function(){return P},J.setNbWrongHashP2P=function(e){P=e},J.getNbRightHashDLM=function(){return I},J.setNbRightHashDLM=function(e){I=e},J.getNbWrongHashDLM=function(){return j},J.setNbWrongHashDLM=function(e){j=e},J.getTrackerConnectionCount=function(){return A},J.incrementTrackerConnectionCount=function(){A++},J.getTrackerReconnectionCount=function(){return O},J.incrementTrackerReconnectionCount=function(){O++},J.getTrackerDeconnectionCount=function(){return R},J.incrementTrackerDeconnectionCount=function(){R++},J.incrementNewPeerConnectionCount=function(){q++},J.getNewPeerConnectionCount=function(){return q},J.incrementReceivedChunkRequestCount=function(){G++},J.getReceivedChunkRequestCount=function(){return G},J.incrementHitReceivedChunkRequestCount=function(){V++},J.getHitReceivedChunkRequestCount=function(){return V},J.incrementSentChunkRequestCount=function(){K++},J.getSentChunkRequestCount=function(){return K},J.incrementTimeoutSentChunkRequestCount=function(){Y++},J.getTimeoutSentChunkRequestCount=function(){return Y},J.getConnected=function(){return e},J.getUpgraded=function(){return F},J.setTrackerConnectionTime=function(e){x=e},J.getTrackerConnectionTime=function(){return x},J.setTrackerVersion=function(e){M=e},J.getTrackerVersion=function(){return M},J.setTrackerId=function(e){H=e},J.getTrackerId=function(){return H},J.incrementMissedIceCandidateCount=function(){B++},J.getMissedIceCandidateCount=function(){return B},J.setConnected=function(t){t!==e&&(e=t,ne.emit("change:connected"),t===!0&&ne.emit("tracker_ready"))},J.setUpgraded=function(){F=!0},J.getEE=function(){return ne},J.setConnectedToSignalingServer=function(){N=!0},J.setDisconnectedToSignalingServer=function(){N=!1},J.getConnectedToSignalingServer=function(){return N},J.computeMaxAndAvgSpeed=ie,J.setMeanInstantSpeed=function(e){c=e},J.getMeanInstantSpeed=function(){return c},J.setMyBufferLevel=function(e){re=e},J.getMyBufferLevel=function(){return re},J.onPeerUpdateRequest=ae,J.getPeerUpdateRequestCount=oe,J.onPeerUpdateResponse=se,J.getPeerUpdateResponseCount=ue,J.getPeerUpdateAvgResponseTime=le,J.getAttemptToSendChunkCount=function(){return W},J.incrementAttemptToSendChunkCount=function(){W++},J.getSentChunkCount=function(){return z},J.incrementSentChunkCount=function(){z++},J.getExpiredChunksToUpload=function(){return X},J.incrementExpiredChunksToUpload=function(){X++},J.getAddedChunksToUpload=function(){return Q},J.incrementAddedChunksToUploadQueue=function(){Q++},J.incrementCheckHeartbeatFailed=function(){Z++},J.getCheckHeartbeatFailed=function(){return Z}};n.default=o,t.exports=n.default},{eventemitter3:219}],45:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?n(null,JSON.parse(r.responseText)):204===r.status?n(null,null):r.status>0&&n(new Error(r.status+": "+r.responseText),null))},r.onerror=function(){n(new Error("connection error"),null)},void 0!==t?(r.open("POST",e,!0),r.send((0,o.default)(t))):(r.open("GET",e,!0),r.send(null))}Object.defineProperty(n,"__esModule",{value:!0});var a=e("babel-runtime/core-js/json/stringify"),o=r(a),s=e("babel-runtime/helpers/classCallCheck"),u=r(s),l=e("babel-runtime/helpers/createClass"),c=r(l),f=e("eventemitter3"),d=r(f),h=e("./Location"),p=r(h),m=e("../utils/Timers"),_=r(m),v=e("../utils/Options"),g=e("../utils/url"),b=e("../../defaultConf"),y=(r(b),function(){function e(t,n){(0,u.default)(this,e),this._conf=n.conf,this._status=n.status,this._moduleState=n.moduleState;var r=new d.default;this._p2pProtocolVersion=this._conf.P2P_PROTOCOL_VERSION,this._trackerProtocolVersion=this._conf.CLIENT_TRACKER_PROTOCOL_VERSION,this._playerInterface=t,this._connected=!1,this._delayReconnection=this._conf.TRACKER_DELAY_INIT,this._trackerURL=(0,g.formatUrl)(this._conf.TRACKER_URL),this._timers=new _.default,this._callQueue=[],this._pending=!1,this.getEE=function(){return r},this._init()}return(0,c.default)(e,[{key:"askPeers",value:function(e,t){var n=function(e,n){t(e,[n])},r={tracks:[this._moduleState.getVideoTrackHash()],exclusions:e,peer_number:this._conf.MAX_NUMBER_OF_PEERS_ASKED_BY_GET_PEERS_MESSAGE,current_position:this._moduleState.videoCurrentTime,id:(0,v.unwrap)(this._peerID)};this._sendRequest("peers",r,n,!0)}},{key:"dispose",value:function(){this._disconnect(),this._timers.clearAll()}},{key:"_init",value:function(){var e=(0,v.unwrap)(this._moduleState.content),t=this._p2pProtocolVersion,n=this._conf.ID_CLIENT,r=this._playerInterface.isLive(),i=this._status.getTrackerId(),a=void 0;if(r){var o=this._playerInterface.getBufferLevelMax();a={content:e,p2p_protocol:t,customer_id:n,is_live:r,buffer_level_max:o,tracker_id:i}}else a={content:e,p2p_protocol:t,customer_id:n,is_live:r,tracker_id:i};this._initStartTime=Date.now(),this._sendRequest("init",a,this._onTrackerReady.bind(this),!0)}},{key:"_onTrackerReady",value:function(e,t){if(!e){var n=Date.now()-this._initStartTime;if(this._status.incrementTrackerConnectionCount(),this._status.setTrackerConnectionTime(n),this._status.setConnected(!0),this._status.setTrackerId(t.tracker_id),this._connected=!0,this._playerInterface.isLive()){var r=(0,v.unwrap)(t.buffer_level);this._status.setMyBufferLevel(r),this._playerInterface.setBufferMarginLive(r)}this._peerID=t.peer_id,this._status.setMyPeerId(this._peerID),this._askGeolocation(this._conf.GEOLOCATION_REQUEST_MAX_RETRY),this._timers.setNamedInterval("tracks",this._publishTracks.bind(this),this._conf.SEND_TRACKS_INTERVAL),this.getEE().emit("tracker_ready")}}},{key:"_publishTracks",value:function(){var e={tracks:[this._moduleState.getVideoTrackHash()],id:(0,v.unwrap)(this._peerID),current_position:this._moduleState.videoCurrentTime};this._sendRequest("tracks",e,function(){},!0)}},{key:"_askGeolocation",value:function(e){var t=this;this._timers.setNamedTimeout("geoloc",function(){t._sendRequest("geo",void 0,t._makeGeolocationAnswerHandler(e),!1)},this._conf.GEOLOCATION_REQUEST_TIMEOUT)}},{key:"_makeGeolocationAnswerHandler",value:function(e){var t=this;return function(n,r){if(n)0!==e&&t._askGeolocation(e-1);else{var i=new p.default(r.city,r.country,r.latitude,r.longitude);t._status.setMyLocation(i)}}}},{key:"_sendRequest",value:function(e,t,n,r){var a=this,o=function(e,t){if(e&&r)return a._disconnect(),a._schedulReconnect(),void n(e,t);var o=a._callQueue.shift();void 0===o?a._pending=!1:i(o.url,o.data,o.callback),n(e,t)},s=this._trackerURL+e;this._pending?this._callQueue.push({url:s,data:t,callback:o}):(this._pending=!0,i(s,t,o))}},{key:"_disconnect",value:function(){this._timers.clearNamedInterval("tracks"),this._timers.clearNamedTimeout("geoloc"),this._timers.clearNamedTimeout("reconnect"),this._pending=!1,this._callQueue=[],this._connected===!0&&(this._delayReconnection=this._conf.TRACKER_DELAY_INIT,this._status.setConnected(!1),this._connected=!1,i(this._trackerURL+"bye",{id:(0,v.unwrap)(this._peerID)},function(){}),this.getEE().emit("tracker_disconnected"))}},{key:"_schedulReconnect",value:function(){this._timers.setNamedTimeout("reconnect",this._init.bind(this),this._delayReconnection),this._delayReconnection=Math.min(2*this._delayReconnection,this._conf.TRACKER_DELAY_MAX)}}]),e}());n.default=y,t.exports=n.default},{"../../defaultConf":1,"../utils/Options":90,"../utils/Timers":95,"../utils/url":101,"./Location":25,"babel-runtime/core-js/json/stringify":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:219}],46:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("underscore"),l=r(u),c=e("./SpeedCalculator"),f=r(c),d=e("../utils/Timers"),h=r(d),p=e("../utils/Delta"),m=e("../errors/ErrorFunnel"),_=r(m),v=function(){function e(t){(0,a.default)(this,e),this._status=t.status,this._conf=t.conf,this._globalEventBus=t.eventBus,this.queue=[],this.peerTimeouts={},this.saturated=!1,this.uploadSpeedCalculator=new f.default(this._conf),this.uploadLimitation=0,this._increaseUploadLimitation(this._conf.MAX_UP_SPEED),this._timers=new h.default}return(0,s.default)(e,[{key:"add",value:function(e,t,n,r,i){this.queue.push({peer:e,segmentCoord:t,id_chunk:n,chunk:r,timeStamp:i}),this._status.incrementAddedChunksToUploadQueue(),this._resetPeerTimeout(e),this._sendChunk()}},{key:"_removeFirstChunk",value:function(){this.queue.splice(0,1)}},{key:"_getChunkToSend",value:function(){for(var e=Date.now();this.queue.length>0;){if(e-this.queue[0].timeStamp<this._conf.CHUNK_UP_TIMEOUT)return this.queue[0];this._removeFirstChunk(),this._status.incrementExpiredChunksToUpload(),this._globalEventBus.emit("uploadSaturated")}}},{key:"_increaseUploadLimitation",value:function(e){this.uploadLimitation+=e,this._globalEventBus.emit("uploadLimitationChange",this.uploadLimitation)}},{key:"_sendChunk",value:function(e){this._status.incrementAttemptToSendChunkCount();var t=this.uploadSpeedCalculator.calculateSpeed();if(t<this.uploadLimitation&&(!this.saturated||e)){var n=this._getChunkToSend();if(!n)return void this._unsetSaturated();var r=n.peer.getBufferedAmount();if((0,p.isNumeric)(r)&&r<this._conf.UP_MAX_BUFFERED_AMOUNT){this.uploadSpeedCalculator.addChunkTransfer();try{return n.peer.sendChunk(n.segmentCoord,n.id_chunk,n.chunk),this._status.incrementSentChunkCount(),this._removeFirstChunk(),this._resetPeerTimeout(n.peer),this._unsetSaturated(),void this._increaseUploadLimitation(5)}catch(e){_.default.notifyError(e),this.uploadLimitation>this._conf.MAX_UP_SPEED&&this._increaseUploadLimitation(this._conf.MAX_UP_SPEED-this.uploadLimitation),this.uploadLimitation>400?this._increaseUploadLimitation(-200):this.uploadLimitation>100?this._increaseUploadLimitation(-50):this._increaseUploadLimitation(-Math.floor(this.uploadLimitation/2)),this._setSaturated()}this._checkPeerTimeout(n.peer)}else this.uploadLimitation>30&&(this._increaseUploadLimitation(-20),this._setSaturated())}this._setSaturated()}},{key:"_checkPeerTimeout",value:function(e){var t=Date.now();this.peerTimeouts[e.getId()]?t-this.peerTimeouts[e.getId()]>this._conf.PEER_UP_TIMEOUT&&this._clearChunksForPeer(e.getId()):this.peerTimeouts[e.getId()]=t}},{key:"_resetPeerTimeout",value:function(e){delete this.peerTimeouts[e.getId()]}},{key:"_clearChunksForPeer",value:function(e){this.queue=l.default.reject(this.queue,function(t){return t.peer.getId()===e})}},{key:"_setSaturated",value:function(){if(!this.saturated){this.saturated=!0;var e=this._conf.CHUNK_SIZE/1024/(this._conf.MAX_UP_SPEED/1e3);void 0===this.sendInterval&&(this.sendInterval=this._timers.setInterval(function(){this._sendChunk(!0)}.bind(this),e))}}},{key:"_unsetSaturated",value:function(){this.saturated===!0,this.saturated=!1,this.queue.length||(this._timers.clearInterval(this.sendInterval),this.sendInterval=void 0)}},{key:"dispose",value:function(){this._timers.clearAll()}}]),e}();n.default=v,t.exports=n.default},{"../errors/ErrorFunnel":13,"../utils/Delta":85,"../utils/Timers":95,"./SpeedCalculator":43,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:226}],47:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){return new o.default(e)}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./browser/Segment"),o=r(a),s=e("./mobile/Segment");r(s);n.default=i,t.exports=n.default},{"./browser/Segment":50,"./mobile/Segment":52}],48:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"getBinaryData",value:function(e,t,n){throw new Error("must be implemented")}},{key:"setBinaryData",value:function(e,t){throw new Error("must be implemented")}},{key:"destroy",value:function(){}},{key:"byteLength",get:function(){return this._byteLength},set:function(e){this._byteLength=e}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],49:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=ArrayBuffer,t.exports=n.default},{}],50:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../SegmentInterface"),m=r(p),_=e("./BinaryData"),v=r(_),g=function(e){function t(e){(0,s.default)(this,t);var n=(0,f.default)(this,(0,a.default)(t).call(this));if("number"==typeof e){var r=e;n._binData=new Uint8Array(r)}else{if(!(e instanceof v.default))throw new TypeError("Wrong parameter in Segment Constructor");var i=e;n._binData=new Uint8Array(i)}return n}return(0,h.default)(t,e),(0,l.default)(t,[{key:"getBinaryData",value:function(e,t,n){n(new Uint8Array(this._binData.buffer.slice(e,e+t)).buffer)}},{key:"setBinaryData",value:function(e,t){this._binData.set(new Uint8Array(e),t)}},{key:"byteLength",get:function(){return this._binData.byteLength},set:function(e){throw new TypeError("Should not manually set the byteLength")}}]),t}(m.default);n.default=g,t.exports=n.default},{"../SegmentInterface":48,"./BinaryData":49,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],51:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=function e(t,n){if((0,a.default)(this,e),!(t instanceof String||"number"==typeof n))throw new TypeError("Wrong parameter");this.id=t,this.byteLength=n};n.default=o,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123}],52:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){return e+"-"+t}Object.defineProperty(n,"__esModule",{value:!0});var a=e("babel-runtime/core-js/object/get-prototype-of"),o=r(a),s=e("babel-runtime/helpers/classCallCheck"),u=r(s),l=e("babel-runtime/helpers/createClass"),c=r(l),f=e("babel-runtime/helpers/possibleConstructorReturn"),d=r(f),h=e("babel-runtime/helpers/inherits"),p=r(h),m=e("../SegmentInterface"),_=r(m),v=e("./BinaryData"),g=r(v),b=e("uuid"),y=r(b),C=e("../../../utils/nativeCalls"),w={},S=function(e){function t(e){(0,u.default)(this,t);var n=(0,d.default)(this,(0,o.default)(t).call(this));if(n.id=n._generateId(),"number"==typeof e)n.byteLength=e,(0,C.nativeCall)("segment_created",{id:n.id,size:e});else{if(!(e instanceof g.default))throw new TypeError("Wrong parameter in Segment Constructor");n.byteLength=e.byteLength,(0,C.nativeCall)("segment_created",{id:n.id,binaryDataId:e.id})}return n.callbacks={},n}return(0,p.default)(t,e),(0,c.default)(t,[{key:"_generateId",value:function(){return y.default.v4()}},{key:"getBinaryData",value:function(e,t,n){var r=i(e,t);w[r]=n;var a={segmentId:this.id,offset:e,size:t};(0,C.nativeCall)("get_binary_data",a)}},{key:"setBinaryData",value:function(e,t){if(!(e instanceof g.default||"number"==typeof t))throw new TypeError("Wrong parameter");var n={segmentId:this.id,offset:t,binaryDataId:e.id};(0,C.nativeCall)("set_binary_data",n)}},{key:"destroy",value:function(){var e={segmentId:this.id};(0,C.nativeCall)("destroy_segment",e)}}],[{key:"getBinaryDataCallback",value:function(e,t,n,r){var a=i(t,r),o=w[a],s=new g.default(n,parseInt(r,10));o(s)}}]),t}(_.default);n.default=S,t.exports=n.default},{"../../../utils/nativeCalls":98,"../SegmentInterface":48,"./BinaryData":51,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,uuid:230}],53:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"sendMessage",value:function(){throw new Error("One should not call sendMessage on a PeerConnection that has already been destroyed")}},{key:"sendBinaryData",value:function(){throw new Error("One should not call sendBinaryData on a PeerConnection that has already been destroyed")}},{key:"getRtt",value:function(){throw new Error("One should not call getRtt on a PeerConnection that has already been destroyed")}},{key:"getBufferedAmount",value:function(){throw new Error("One should not call getBufferedAmount on a PeerConnection that has already been destroyed")}},{key:"destroy",value:function(){throw new Error("One should not call destroy on a PeerConnection that has already been destroyed")}},{key:"close",value:function(){throw new Error("One should not call close on a PeerConnection that has already been destroyed")}},{key:"on",value:function(){throw new Error("One should not call on on a PeerConnection that has already been destroyed")}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],54:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r){function i(){t.onclose=function(){P()},t.onerror=function(e){P()},t.onmessage=E,e.oniceconnectionstatechange=function(){switch(e.iceConnectionState){case"failed":case"closed":e.oniceconnectionstatechange=function(){},I(),P();break;case"disconnected":}},D(),O.setInterval(h,A.PEER_COMPUTE_RTT_INTERVAL)}function a(e,n){if("open"===t.readyState){var r=(0,c.default)({type:e,args:n});return M.increaseRawDataUploadedBy(r.length),t.send(r),!0}return l("sendMessage failed: DataChannel readyState is not open but "+t.readyState),!1}function s(e,n,r){var i=(0,v.encodeMetaData)(r,n,e);return"open"===t.readyState?(t.send(i),!0):(l("sendBinaryData failed: DataChannel readyState is not open but "+t.readyState),!1)}function l(e){var t=new Error(e);C.default.notifyError(t),P()}function f(){return L}function h(){b.default.getPeerConnectionRTT(e,function(e){L=e},function(e){})}function m(){return t.bufferedAmount}function g(){I(),j.destroy()}function y(){O.clearAll(),(0,u.default)(j,new _.default)}function w(e,t){R.on(e,t)}function S(e,t){R.once(e,t)}function E(e){switch(x=!0,(0,o.default)(e.data)){case"string":k(e.data);break;default:T(e.data)}}function k(e){M.increaseRawDataDownloadedBy(e.length);var t=JSON.parse(e);switch(t.type){case"heartbeat":break;default:R.emit("message_received",t.type,t.args)}}function T(e){M.increaseRawDataDownloadedBy(e.byteLength);var t=(0,v.parseMetaData)(e,n.fromArrayBuffer);R.emit("binarydata_received",t.data,t.id_chunk,t.segmentCoord)}function D(){O.setInterval(function(){x||(M.incrementCheckHeartbeatFailed(),I(),P()),x=!1},A.CHECK_HEARTBEAT_INTERVAL),O.setInterval(function(){return a("heartbeat")},A.SEND_HEARTBEAT_INTERVAL)}function P(){return N?(N=!1,void R.emit("disconnected")):void C.default.notifyError(new Error("Guarded attempt to trigger 'disconnected' event on PeerConnection more than once"))}function I(){"closing"!==t.readyState&&"closed"!==t.readyState&&t.close(),"closed"!==e.signalingState&&e.close()}var j=this,M=r.status,A=r.conf,R=new d.default,O=new p.default,x=!0,N=!0,L=-1;this.sendMessage=a,this.sendBinaryData=s,this.getRtt=f,this.getBufferedAmount=m,this.destroy=y,this.close=g,this.on=w,this.once=S,i()}Object.defineProperty(n,"__esModule",{value:!0});var a=e("babel-runtime/helpers/typeof"),o=r(a),s=e("babel-runtime/core-js/object/assign"),u=r(s),l=e("babel-runtime/core-js/json/stringify"),c=r(l),f=e("eventemitter3"),d=r(f),h=e("../../utils/Timers"),p=r(h),m=e("./DestroyedPeerConnection"),_=r(m),v=e("../../utils/ChunkMetadata"),g=e("../../utils/WebRTC"),b=r(g),y=e("../../errors/ErrorFunnel"),C=r(y);n.default=i,t.exports=n.default},{"../../errors/ErrorFunnel":13,"../../utils/ChunkMetadata":83,"../../utils/Timers":95,"../../utils/WebRTC":96,"./DestroyedPeerConnection":53,"babel-runtime/core-js/json/stringify":108,"babel-runtime/core-js/object/assign":110,"babel-runtime/helpers/typeof":129,eventemitter3:219}],55:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r){return new s.default(e,t,n,r)}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./mobile/PeerConnector"),o=(r(a),e("./browser/PeerConnector")),s=r(o);n.default=i,t.exports=n.default},{"./browser/PeerConnector":57,"./mobile/PeerConnector":59}],56:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("underscore"),f=r(c),d=function(){function e(t){(0,s.default)(this,e),this._conf=t.conf,this._status=t.status,this._init()}return(0,l.default)(e,[{key:"connect",value:function(e,t){this._url=e,this._id=t,this._createConnection()}},{key:"send",value:function(e){if(this._connection&&this._connection.readyState===WebSocket.OPEN){var t=e.receiver_id+","+(0,a.default)(f.default.omit(e,"receiver_id"));this._connection.send(t)}else this._msgBuffer.push(e)}},{key:"on",value:function(e,t){this._handlers[e]=t}},{key:"close",value:function(){this._disposing=!0,this._status.setDisconnectedToSignalingServer(),this._stopReconnectionLoop(),this._connection&&this._connection.close(),void 0!==this._connectionTimeout&&(clearTimeout(this._connectionTimeout),delete this._connectionTimeout),void 0!==this._nextReconnectAttempt&&(clearTimeout(this._nextReconnectAttempt),delete this._nextReconnectAttempt),this._init()}},{key:"_createConnection",value:function(){!this._connection||this._connection.readyState!==WebSocket.CONNECTING&&this._connection.readyState!==WebSocket.OPEN||this.close();var e="4.2.7";this._connection=new WebSocket(this._url+"?id="+this._id+"&p2pVersion="+e+"&client_id="+this._conf.ID_CLIENT);var t=this._connection;this._connectionTimeout=setTimeout(function(){t.close()},1e4),this._handleConnectionSuccess(),this._handleErrorAndClose(),this._handleMessages()}},{key:"_handleErrorAndClose",value:function(){var e=this,t=this._connection,n=function(){t===e._connection&&(e._status.setDisconnectedToSignalingServer(),e._tryReconnect())};this._connection.onerror=n,this._connection.onclose=n}},{key:"_tryReconnect",value:function(){var e=this,t=function(){delete e._nextReconnectAttempt,e._createConnection(),e._updateDelay()};void 0!==this._nextReconnectAttempt||this._disposing||(this._nextReconnectAttempt=setTimeout(t,this._delayReconnection))}},{key:"_updateDelay",value:function(){this._delayReconnection=Math.min(this._delayReconnection+this._conf.SIGNALING_DELAY_STEP,this._conf.SIGNALING_DELAY_MAX)}},{key:"_handleConnectionSuccess",value:function(){var e=this;this._connection.onopen=function(){e._status.setConnectedToSignalingServer(),clearTimeout(e._connectionTimeout),delete e._connectionTimeout,e._stopReconnectionLoop(),e._sendMessagesInBuffer()}}},{key:"_handleMessages",value:function(){var e=this;this._connection.onmessage=function(t){var n=JSON.parse(t.data);if(e._handlers[n.type]){var r=f.default.omit(n,"type");e._handlers[n.type](r)}}}},{key:"_init",value:function(){this._handlers={},this._delayReconnection=0,this._msgBuffer=[]}},{key:"_stopReconnectionLoop",value:function(){this._delayReconnection=0}},{key:"_sendMessagesInBuffer",value:function(){this._msgBuffer.forEach(this.send.bind(this)),this._msgBuffer=[]}}]),e}();n.default=d,t.exports=n.default},{"babel-runtime/core-js/json/stringify":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:226}],57:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){}Object.defineProperty(n,"__esModule",{value:!0});var a=e("babel-runtime/core-js/get-iterator"),o=r(a),s=e("babel-runtime/core-js/map"),u=r(s),l=e("babel-runtime/helpers/classCallCheck"),c=r(l),f=e("babel-runtime/helpers/createClass"),d=r(f),h=e("../SignalingClient"),p=r(h),m=e("../PeerConnection"),_=r(m),v=e("../../../errors/ErrorFunnel"),g=r(v),b=e("../../../utils/WebRTC"),y=r(b),C=e("../../../utils/Bucket"),w=r(C),S=e("../../../utils/Timers"),E=r(S),k=function(){function e(t,n,r,i){(0,c.default)(this,e),this._sharedState=i,this._conf=i.conf,this._status=i.status,this._signalingClient=new p.default(i),this._myPeerId=t,this._peerPool=n,this._analyticsData=i.analyticsData,this._signalingClient.connect(this._conf.SIGNALING_URL,t),this._signalingClient.on("webrtc_offer",this._onOffer.bind(this)),this._signalingClient.on("webrtc_answer",this._onAnswer.bind(this)),this._signalingClient.on("webrtc_icecandidate",this._onIceCandidate.bind(this)),this._peerConnectionCollection=new u.default,this.SegmentCoord=r,this._timers=new E.default}return(0,d.default)(e,[{key:"createPeerConnection",value:function(e){var t=this,n=Math.random().toString().substr(2),r=y.default.createPeerConnection(this._conf),a=r.createDataChannel("comm",{ordered:!1,maxPacketLifeTime:1e3});a.binaryType="arraybuffer";var o=this._timers.setTimeout(function(){t._onConnexionTimeout(e,n)},this._conf.PEER_CONNECTION_TIMEOUT),s=this._createOpenDataChannelHandler(r,a,o,e,n);a.onopen=s,this._peerConnectionCollection.set(n,{rtcPeerConnection:r,connectionTimeout:o,rtcDataChannel:a}),r.createOffer(function(a){r.setLocalDescription(a,function(){var r=y.default.transformOutgoingSdp(a.sdp),i={type:"webrtc_offer",connexion_id:n,sender_id:t._myPeerId,receiver_id:e,sdp:r};t._signalingClient.send(i)},i)},i),this._manageIceCandidate(r,e,n)}},{key:"_manageIceCandidate",value:function(e,t,n){var r=this._createIceCandidateBucket(this._myPeerId,t,n);e.onicecandidate=function(e){e.candidate&&r.addElement(e.candidate)}}},{key:"_onConnexionRefused",value:function(e,t){var n=this._peerConnectionCollection.get(t),r=n.rtcPeerConnection;r.close(),this._peerConnectionCollection.delete(t),this._peerPool.offerDeclined(e)}},{key:"_onConnexionTimeout",value:function(e,t){var n=this._peerConnectionCollection.get(t),r=n.rtcPeerConnection;r.close(),this._peerConnectionCollection.delete(t),this._peerPool.connectionAttemptTimeout(e)}},{key:"_onOffer",value:function(e){var t=this;this._analyticsData.offer++;var n=e.sender_id,r=e.connexion_id;if(this._peerPool.isFull()){var a={type:"webrtc_answer",connexion_id:r,sender_id:this._myPeerId,receiver_id:n,accepted:!1};return void this._signalingClient.send(a)}var o=y.default.createPeerConnection(this._conf);this._peerConnectionCollection.set(r,{rtcPeerConnection:o}),this._manageIceCandidate(o,n,r);var s={sdp:e.sdp,type:"offer"},u=new y.default.SessionDescription(s);o.setRemoteDescription(u,function(){o.createAnswer(function(e){o.setLocalDescription(e,function(){e.sdp=y.default.transformOutgoingSdp(e.sdp);var i={type:"webrtc_answer",connexion_id:r,sender_id:t._myPeerId,receiver_id:n,accepted:!0,sdp:e.sdp};t._signalingClient.send(i)},i)},i)},i);var l=this._timers.setTimeout(function(){t._onConnexionTimeout(n,r)},this._conf.PEER_CONNECTION_TIMEOUT);o.ondatachannel=function(e){var a=e.channel||e;a.binaryType="arraybuffer";var s=t._createOpenDataChannelHandler(o,a,l,n,r);"connecting"===a.readyState?a.onopen=s:s(),a.onerror=i}}},{key:"_createOpenDataChannelHandler",value:function(e,t,n,r,i){var a=this;return function(){if(a._peerConnectionCollection.get(i)){a._peerConnectionCollection.delete(i),a._timers.clearTimeout(n);var o=new _.default(e,t,a.SegmentCoord,a._sharedState);a._peerPool.addPeerConnection(r,o)}}}},{key:"_onAnswer",value:function(e){var t=e.sender_id,n=e.connexion_id;if(this._peerConnectionCollection.get(n)){var r=this._peerConnectionCollection.get(n),a=r.rtcPeerConnection,o=r.connectionTimeout;if(a)if(e.accepted){var s={sdp:e.sdp,type:"answer"},u=new y.default.SessionDescription(s);a.setRemoteDescription(u,function(){},i)}else this._timers.clearTimeout(o),this._onConnexionRefused(t,n)}}},{key:"_onIceCandidate",value:function(e){var t=this,n=e.connexion_id;if(this._peerConnectionCollection.get(n)){var r=this._peerConnectionCollection.get(n),i=r.rtcPeerConnection;e.icecandidate_array.forEach(function(e){t._addIceCandidate(i,e)})}}},{key:"_addIceCandidate",value:function(e,t){try{e.addIceCandidate(new y.default.IceCandidate(t))}catch(e){g.default.notifyError(e)}}},{key:"_createIceCandidateBucket",value:function(e,t,n){var r=this,i=function(i){var a={type:"webrtc_icecandidate",connexion_id:n,sender_id:e,receiver_id:t,icecandidate_array:i};r._signalingClient.send(a)},a=new w.default(i,this._status.incrementMissedIceCandidateCount,this._conf.ICECANDIDATES_TIMEOUT);return a}},{key:"dispose",value:function(){this._signalingClient.close(),this._timers.clearAll();var e=!0,t=!1,n=void 0;try{for(var r,i=(0,o.default)(this._peerConnectionCollection.values());!(e=(r=i.next()).done);e=!0){var a=r.value.rtcPeerConnection;a.close()}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}}},{key:"getPendingConnectionDebugInfos",value:function(){var e=[],t=!0,n=!1,r=void 0;try{for(var i,a=(0,o.default)(this._peerConnectionCollection.values());!(t=(i=a.next()).done);t=!0){var s=i.value,u=s.rtcPeerConnection,l=u.iceGatheringState,c=u.signalingState,f=u.iceConnectionState,d=s.rtcDataChannel?s.rtcDataChannel.readyState:null;e.push({iceGatheringState:l,signalingState:c,iceConnectionState:f,readyState:d})}}catch(e){n=!0,r=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw r}}return e}}]),e}();n.default=k,t.exports=n.default},{"../../../errors/ErrorFunnel":13,"../../../utils/Bucket":80,"../../../utils/Timers":95,"../../../utils/WebRTC":96,"../PeerConnection":54,"../SignalingClient":56,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],58:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),a=r(i),o=e("babel-runtime/core-js/object/get-prototype-of"),s=r(o),u=e("babel-runtime/helpers/classCallCheck"),l=r(u),c=e("babel-runtime/helpers/createClass"),f=r(c),d=e("babel-runtime/helpers/possibleConstructorReturn"),h=r(d),p=e("babel-runtime/helpers/inherits"),m=r(p),_=e("eventemitter3"),v=r(_),g=e("../../../utils/nativeCalls"),b=e("../../../utils/Timers"),y=r(b),C=e("../../binaryAbstraction/mobile/BinaryData"),w=r(C),S={},E=function(e){function t(e,n){(0,l.default)(this,t);var r=(0,h.default)(this,(0,s.default)(t).call(this));return r._conf=n,S[e]=r,r.connectionId=e,r._timers=new y.default,r._manageHeartbeat(),r._isCommunicating=!0,r}return(0,m.default)(t,e),(0,f.default)(t,[{key:"sendMessage",value:function(e,t){var n=(0,a.default)({type:e,args:t}),r={connection_id:this.connectionId,message:n};(0,g.nativeCall)("peer_connection_send_message",r)}},{key:"sendBinaryData",value:function(e,t,n){var r={connection_id:this.connectionId,binary_data_id:e.id,chunk_id:t,segment_coord:n};return(0,g.nativeCall)("peer_connection_send_data",r),!0}},{key:"getRtt",value:function(){return-1}},{key:"getBufferedAmount",value:function(){return 0}},{key:"destroy",value:function(){delete S[this.connectionId],this._timers.clearAll();
}},{key:"close",value:function(){(0,g.nativeCall)("peer_connection_close",{connectionId:this.connectionId}),this.destroy()}},{key:"_manageHeartbeat",value:function(){var e=this;this._timers.setInterval(function(){e._isCommunicating===!0?e._isCommunicating=!1:(e.emit("disconnected"),(0,g.nativeCall)("peer_connection_close",{connection_id:e.connectionId}))},this._conf.CHECK_HEARTBEAT_INTERVAL),this._timers.setInterval(function(){return e.sendMessage("heartbeat")},this._conf.SEND_HEARTBEAT_INTERVAL)}}],[{key:"receivedMessage",value:function(e,t){var n=JSON.parse(t);switch(n.type){case"heartbeat":break;default:var r=S[e];r._isCommunicating=!0,r.emit("message_received",n.type,n.args)}}},{key:"receivedData",value:function(e,t,n,r,i){var a=new w.default(t,parseInt(n,10)),o=S[e];o._isCommunicating=!0,o.emit("binarydata_received",a,r,i)}},{key:"onDisconnect",value:function(e){var t=S[e];t&&t.emit("disconnected")}}]),t}(v.default);n.default=E,t.exports=n.default},{"../../../utils/Timers":95,"../../../utils/nativeCalls":98,"../../binaryAbstraction/mobile/BinaryData":51,"babel-runtime/core-js/json/stringify":108,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,eventemitter3:219}],59:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../../../utils/nativeCalls"),l=e("./PeerConnection"),c=r(l),f=void 0,d=function(){function e(t,n,r){(0,a.default)(this,e),this._conf=r,this.myPeerId=t,f=n}return(0,s.default)(e,[{key:"createPeerConnection",value:function(e){var t={peerId:this.myPeerId,remotePeerId:e};(0,u.nativeCall)("signaling_create_peer_connection",t)}}],[{key:"peerConnectionCallback",value:function(e,t,n){switch(e){case"success":var r=new c.default(t,this._conf);f.addPeerConnection(n,r);break;case"timeout":f.connectionAttemptTimeout(n);break;case"declined":f.offerDeclined(n);break;default:(0,u.nativeError)("[SIGNALING] bad status")}}}]),e}();n.default=d,t.exports=n.default},{"../../../utils/nativeCalls":98,"./PeerConnection":58,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],60:[function(e,t,n){(function(e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(t,n,r){var i=r.status,a=function(){var e,r={download:{p2pDownloaded:i.getP2PDownloaded(),p2pDownloadedNewAnalytics:i.getp2pDownloadedNewAnalytics(),p2pUploaded:i.getP2PUploaded(),cdnDownloaded:i.getCDNDownloaded(),dlSpeed:i.getDlSpeed(),upSpeed:i.getUpSpeed()},peers:{count:0},bufferLevel:i.getMyBufferLevel(),tracker:{connected:i.getConnected()},trackerConnected:i.getConnected(),sigConnected:i.getConnectedToSignalingServer(),isLive:n()},a=[];for(e=0;e<t.getPeerArray().length;e++){var o=t.getPeerArray()[e];o.getId()&&r.peers.count++,a.push(o.getDebugInfos())}return r.peerList=a,r},o=function(){e.SR_DISPLAY_INTERFACE={getStats:a}};o(),this.dispose=function(){delete window.SR_DISPLAY_INTERFACE}};n.default=r,t.exports=n.default}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],61:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"getSegmentTime",value:function(e){}},{key:"getSegmentList",value:function(e,t,n){}},{key:"getTrackList",value:function(){}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],62:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"isEqual",value:function(e){return!0}},{key:"viewToString",value:function(){return""}},{key:"toArrayBuffer",value:function(){return new ArrayBuffer(0)}},{key:"isInTrack",value:function(e){return!1}},{key:"getId",value:function(){return 0}}],[{key:"fromArrayBuffer",value:function(t){return new e}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],63:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"viewToString",value:function(){return""}},{key:"isEqual",value:function(e){return!0}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],64:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){return new o.default(e,t)}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./browser/HttpRequest"),o=r(a),s=e("./mobile/HttpRequest");r(s);i.progress=function(e,t,n){},i.response=function(e,t,n,r){},n.default=i,t.exports=n.default},{"./browser/HttpRequest":66,"./mobile/HttpRequest":67}],65:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(){(0,a.default)(this,e)}return(0,s.default)(e,[{key:"setHeaders",value:function(e){throw new Error("must be implemented")}},{key:"setWithCredentials",value:function(e){throw new Error("must be implemented")}},{key:"send",value:function(){throw arguments.length<=0||void 0===arguments[0]?null:arguments[0],new Error("must be implemented")}},{key:"abort",value:function(){throw new Error("must be implemented")}},{key:"validStatusCodeRange",get:function(){return this._statusCodeRange},set:function(e){this._statusCodeRange=e}},{key:"onresponse",set:function(e){throw new Error("must be implemented")},get:function(){throw new Error("must be implemented")}},{key:"onprogress",set:function(e){throw new Error("must be implemented")},get:function(){throw new Error("must be implemented")}}]),e}();n.default=u,t.exports=n.default},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],66:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/keys"),a=r(i),o=e("babel-runtime/core-js/get-iterator"),s=r(o),u=e("babel-runtime/core-js/object/get-prototype-of"),l=r(u),c=e("babel-runtime/helpers/classCallCheck"),f=r(c),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("babel-runtime/helpers/possibleConstructorReturn"),m=r(p),_=e("babel-runtime/helpers/inherits"),v=r(_),g=e("../HttpRequestInterface"),b=r(g),y=function(e){function t(e,n){(0,f.default)(this,t);var r=(0,m.default)(this,(0,l.default)(t).call(this));return r._xhr=new XMLHttpRequest,r._xhr.open(e,n,!0),r._xhr.responseType="arraybuffer",r}return(0,v.default)(t,e),(0,h.default)(t,[{key:"setHeaders",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,o=(0,s.default)((0,a.default)(e));!(t=(i=o.next()).done);t=!0){var u=i.value;this._xhr.setRequestHeader(u,e[u])}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}}},{key:"setWithCredentials",value:function(e){this._xhr.withCredentials=e}},{key:"send",value:function(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0];this._xhr.send(e)}},{key:"abort",value:function(){this._xhr.abort()}},{key:"onresponse",set:function(e){var t=this;this._onreponseCallback=e,this._xhr.onloadend=function(e){var n=t._xhr.status,r=n>=t.validStatusCodeRange.start&&n<=t.validStatusCodeRange.end;r?t._onreponseCallback(null,t._xhr.response):t._onreponseCallback(e,null)},this._xhr.onerror=function(e){t._onreponseCallback(e,null)}},get:function(){return this._onreponseCallback}},{key:"onprogress",set:function(e){var t=this;this._onprogressCallback=e,this._xhr.onprogress=function(e){t._onprogressCallback(e.loaded,e.total)}},get:function(){return this._onprogressCallback}}]),t}(b.default);n.default=y,t.exports=n.default},{"../HttpRequestInterface":65,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/core-js/object/keys":118,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],67:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../HttpRequestInterface"),m=r(p),_=e("uuid"),v=r(_),g=e("../../binaryAbstraction/mobile/BinaryData"),b=r(g),y=e("../../../utils/nativeCalls"),C={},w=function(e){function t(e,n){(0,s.default)(this,t);var r=(0,f.default)(this,(0,a.default)(t).call(this));return r.id=v.default.v4(),r._method=e,r._url=n,r._withCredentials=!1,r._headers=[],r}return(0,h.default)(t,e),(0,l.default)(t,[{key:"setHeaders",value:function(e){this._headers=e}},{key:"setWithCredentials",value:function(e){this._withCredentials=e}},{key:"send",value:function(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0];C[this.id]=this;var t={id:this.id,method:this._method,url:this._url,headers:this._headers,with_credentials:this._withCredentials,valid_status_code_range:this.validStatusCodeRange};null!==e&&(t.body=e),(0,y.nativeCall)("send_http_request",t)}},{key:"abort",value:function(){}},{key:"onresponse",set:function(e){this._onreponseCallback=e},get:function(){return this._onreponseCallback}},{key:"onprogress",set:function(e){this._onprogressCallback=e},get:function(){return this._onprogressCallback}}],[{key:"progress",value:function(e,t,n){C[e].onprogress(t,n)}},{key:"response",value:function(e,t,n,r){var i=new b.default(t,parseInt(n,10));C[e].onresponse(r,i)}}]),t}(m.default);n.default=w,t.exports=n.default},{"../../../utils/nativeCalls":98,"../../binaryAbstraction/mobile/BinaryData":51,"../HttpRequestInterface":65,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,uuid:230}],68:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/array/from"),a=r(i),o=e("babel-runtime/core-js/map"),s=r(o),u=e("babel-runtime/core-js/get-iterator"),l=r(u),c=e("babel-runtime/helpers/classCallCheck"),f=r(c),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("underscore"),m=r(p),_=e("../structures/TrackEdges"),v=r(_),g=e("../MediaMapCache"),b=r(g),y=e("../../../defaultConf"),C=(r(y),function(){function e(t,n,r,i,a){(0,f.default)(this,e),this._conf=a.conf,this._p2pCache=n,this._distributedSegmentList=r,this._currentTracks=i,this._mediaMapCache=new b.default(t,a),this._edges=new v.default(this._mediaMapCache,a)}return(0,h.default)(e,[{key:"updateCurrentTracks",value:function(e){this._currentTracks.update(e)}},{key:"_getSegmentsToDownloadByTrack",value:function(e,t){var n=[],r=void 0;if(r="audio"===t?this._edges.audio:this._edges.video){var i=this._mediaMapCache.getSegmentTime(r),a=this._mediaMapCache.getSegmentList(e,i,this._conf.MAX_BUFFER_DURATION),o=this._distributedSegmentList.getSegmentListAfter(r),s=this._mergeDedupe(a,o),u=this._p2pCache.listSegmentsToSkipForTrack(e);n=this._getDifference(s,u)}return n}},{key:"isSegmentRequested",value:function(e){var t=this.getSegmentListToDownload(),n=!0,r=!1,i=void 0;try{for(var a,o=(0,l.default)(t);!(n=(a=o.next()).done);n=!0){var s=a.value;if(e.isEqual(s))return!0}}catch(e){r=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}return!1}},{key:"_getDifference",value:function(e,t){return m.default.reject(e,function(e){return void 0!==m.default.find(t,function(t){return e.isEqual(t)})})}},{key:"_mergeDedupe",value:function(e,t){var n=new s.default,r=!0,i=!1,o=void 0;try{for(var u,c=(0,l.default)(e);!(r=(u=c.next()).done);r=!0){var f=u.value;n.set(f.viewToString(),f)}}catch(e){i=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(i)throw o}}var d=!0,h=!1,p=void 0;try{for(var m,_=(0,l.default)(t);!(d=(m=_.next()).done);d=!0){var v=m.value;n.set(v.viewToString(),v)}}catch(e){h=!0,p=e}finally{try{!d&&_.return&&_.return()}finally{if(h)throw p}}return(0,a.default)(n.values())}},{key:"getSegmentListToDownload",value:function(){throw new Error("Cannot call abstract method")}},{key:"updateTrackEdge",value:function(e){throw new Error("Cannot call abstract method")}}]),e}());n.default=C,t.exports=n.default},{"../../../defaultConf":1,"../MediaMapCache":26,"../structures/TrackEdges":75,"babel-runtime/core-js/array/from":105,"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:226}],69:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./AbstractScheduler"),m=r(p),_=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(0,a.default)(t).apply(this,arguments))}return(0,h.default)(t,e),(0,l.default)(t,[{key:"getSegmentListToDownload",value:function(){var e=[],t=this._currentTracks.audio;t&&(e=this._getSegmentsToDownloadByTrack(t,"audio"));var n=this._currentTracks.video;return n&&(e=e.concat(this._getSegmentsToDownloadByTrack(n,"video"))),e.sort(function(e,t){return e.getId()-t.getId()})}},{key:"updateTrackEdge",value:function(e){var t=this._findTrack(e);"audio"===t?this._edges.update({audio:e,video:null}):"video"===t&&this._edges.update({audio:null,video:e})}},{key:"_findTrack",value:function(e){var t=this._currentTracks.video;if(t&&e.isInTrack(t))return"video";var n=this._currentTracks.audio;return n&&e.isInTrack(n)?"audio":void 0}}]),t}(m.default);n.default=_,t.exports=n.default},{"./AbstractScheduler":68,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],70:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(c),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./AbstractScheduler"),m=r(p),_=function(e){function t(){return(0,s.default)(this,t),(0,f.default)(this,(0,a.default)(t).apply(this,arguments))}return(0,h.default)(t,e),(0,l.default)(t,[{key:"getSegmentListToDownload",value:function(){var e=[],t=this._currentTracks.video;return t&&(e=this._getSegmentsToDownloadByTrack(t,"video")),e.sort(function(e,t){return e.getId()-t.getId()})}},{key:"updateTrackEdge",value:function(e){this._currentTracks.video&&e.isInTrack(this._currentTracks.video)&&this._edges.update({video:e,audio:null})}}]),t}(m.default);n.default=_,t.exports=n.default},{"./AbstractScheduler":68,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],71:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,i,a){return"hls"===r?new o.default(e,t,n,i,a):new u.default(e,t,n,i,a)}Object.defineProperty(n,"__esModule",{value:!0}),n.createScheduler=i;var a=e("./HlsScheduler"),o=r(a),s=e("./GenericScheduler"),u=r(s)},{"./GenericScheduler":69,"./HlsScheduler":70}],72:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.CurrentTracks=void 0;var i=e("babel-runtime/core-js/object/seal"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u);n.CurrentTracks=function(){function e(){(0,s.default)(this,e),this.audio=void 0,this.video=void 0,(0,a.default)(this)}return(0,l.default)(e,[{key:"update",value:function(e){var t=e.audio,n=e.video;if(!t&&!n)throw new Error("There must be at least one updated track");this.audio=t||this.audio,this.video=n||this.video}}]),e}()},{"babel-runtime/core-js/object/seal":119,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],73:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/freeze"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("../ChunkManager"),l=r(u),c=e("../Seeders"),f=r(c),d=e("../expectedInterfaces/SegmentCoordInterface"),h=r(d),p=e("../../utils/Interface"),m=function e(t,n,r,i,o){(0,s.default)(this,e),(0,p.checkInterface)(h.default,t),this.segmentCoord=t,this.chunkManager=new l.default(t,n,r,i,o),this.seeders=new f.default,(0,a.default)(this)};n.default=m,t.exports=n.default},{"../../utils/Interface":87,"../ChunkManager":18,"../Seeders":39,"../expectedInterfaces/SegmentCoordInterface":62,"babel-runtime/core-js/object/freeze":114,"babel-runtime/helpers/classCallCheck":123}],74:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/freeze"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("../../utils/Delta"),l=e("../expectedInterfaces/SegmentCoordInterface"),c=r(l),f=e("../../utils/Interface"),d=function e(t,n,r){if((0,s.default)(this,e),(0,f.checkInterface)(c.default,t),!(0,u.isNumeric)(n))throw new Error("Invalid value for size");if(!r)throw new Error("No hash");this.segmentCoord=t,this.size=n,this.hash=r,(0,a.default)(this)};n.default=d,t.exports=n.default},{"../../utils/Delta":85,"../../utils/Interface":87,"../expectedInterfaces/SegmentCoordInterface":62,"babel-runtime/core-js/object/freeze":114,"babel-runtime/helpers/classCallCheck":123}],75:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/seal"),a=r(i),o=e("babel-runtime/helpers/classCallCheck"),s=r(o),u=e("babel-runtime/helpers/createClass"),l=r(u),c=function(){function e(t,n){(0,s.default)(this,e),this.audio=void 0,this.video=void 0,this._mediaMapCache=t,this._moduleState=n.moduleState,(0,a.default)(this)}return(0,l.default)(e,[{key:"update",value:function(e){var t=e.audio,n=e.video;if(void 0===t&&void 0===n)throw new Error("There must be at least one updated track edge");t&&(this.audio=t),n&&(this.video=n,this._moduleState.videoCurrentTime=this._mediaMapCache.getSegmentTime(n))}}]),e}();n.default=c,t.exports=n.default},{"babel-runtime/core-js/object/seal":119,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],76:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("./browser/callHashWorker"),l=r(u),c=(e("./mobile/callHashWorker"),function(){function e(){(0,a.default)(this,e),this._disposed=!1}return(0,s.default)(e,[{key:"callHashWorker",value:function(e,t){var n=this,r=function(){n._disposed||t.apply(void 0,arguments)};return(0,l.default)(e,r)}},{key:"dispose",value:function(){this._disposed=!0}}]),e}());n.default=c,t.exports=n.default},{"./browser/callHashWorker":78,"./mobile/callHashWorker":79,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],77:[function(e,t,n){"use strict";function r(){var e={mul32:function(e,t){var n=65535&t,r=t-n;return(r*e|0)+(n*e|0)|0},hashBytes:function(e,t,n){for(var r=3432918353,i=461845907,a=n,o=t&-4,s=0;s<o;s+=4){var u=255&e[s]|(255&e[s+1])<<8|(255&e[s+2])<<16|(255&e[s+3])<<24;u=this.mul32(u,r),u=(131071&u)<<15|u>>>17,u=this.mul32(u,i),a^=u,a=(524287&a)<<13|a>>>19,a=5*a+3864292196|0}switch(u=0,t%4){case 3:u=(255&e[o+2])<<16;case 2:u|=(255&e[o+1])<<8;case 1:u|=255&e[o],u=this.mul32(u,r),u=(131071&u)<<15|u>>>17,u=this.mul32(u,i),a^=u}return a^=t,a^=a>>>16,a=this.mul32(a,2246822507),a^=a>>>13,a=this.mul32(a,3266489909),a^=a>>>16}};self.onmessage=function(t){var n=new Uint8Array(t.data.segmentData),r=e.hashBytes(n,n.length,0).toString();self.postMessage({segmentData:t.data.segmentData,jobIndex:t.data.jobIndex,hash:r},[t.data.segmentData])}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=r,t.exports=n.default},{}],78:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){var e=URL.createObjectURL(new Blob(["("+u.default.toString()+")()"],{type:"application/javascript"})),t=new Worker(e);return URL.revokeObjectURL(e),t}function a(e){var t=e.data,n=t.jobIndex,r=t.segmentData,i=t.hash,a=l[n];delete l[n],a(r,i)}function o(e,t){var n=l.push(t)-1;c.postMessage({segmentData:e,jobIndex:n},[e])}Object.defineProperty(n,"__esModule",{value:!0});var s=e("./HashWorker"),u=r(s),l=[],c=i();c.onmessage=a,n.default=o,t.exports=n.default},{"./HashWorker":77}],79:[function(e,t,n){"use strict";function r(e,t){a[e.id]=t,o[e.id]=e,window.webkit.messageHandlers.call_hash_worker.postMessage({binaryDataId:e.id})}function i(e,t){var n=o[e],r=a[e];r(n,t),delete a[e]}Object.defineProperty(n,"__esModule",{value:!0});var a={},o={};n.callHashWorkerMobile=r,n.hasherCallback=i},{}],80:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./Timers"),a=r(i),o=function(e,t,n){var r=[],i=!1,o=new a.default,s=function(e){i?t(e):r.push(e)},u=function(){o.setTimeout(function(){i=!0,e(r),r=[]},n)};u(),this.addElement=s};n.default=o,t.exports=n.default},{"./Timers":95}],81:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=Math.floor(e/256),n=e%256;return new Uint8Array([n,t])},i=function(e){var t=r(Math.floor(e/65536)),n=r(e%65536);return new Uint8Array([n[0],n[1],t[0],t[1]])};n.uint16ToUint8Array2=r,n.numToUint8Array4=i},{}],82:[function(e,t,n){"use strict";var r=function(e,t,n,r){var i=6371,a=(e-t)*Math.PI/180,o=(n-r)*Math.PI/180,s=e*Math.PI/180,u=t*Math.PI/180,l=Math.sin(a/2)*Math.sin(a/2)+Math.sin(o/2)*Math.sin(o/2)*Math.cos(s)*Math.cos(u),c=2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),f=i*c;return f};t.exports={getDistanceFromLatitudeLongitude:r}},{}],83:[function(e,t,n){"use strict";function r(e,t,n){var r=e.toArrayBuffer(),i=(0,a.numToUint8Array4)(t),o=n.byteLength,s=(0,a.uint16ToUint8Array2)(o),u=new Uint8Array(i.byteLength+s.byteLength+o+r.byteLength);return u.set(i,0),u.set(s,4),u.set(new Uint8Array(n),6),u.set(new Uint8Array(r),6+o),u.buffer}function i(e,t){var n=e.slice(0,4),r=e.slice(4,6),i=new Uint16Array(r)[0],a=e.slice(6,6+i),o=e.slice(6+i),s=new Uint32Array(n)[0],u=t(o);return{segmentCoord:u,id_chunk:s,data:a}}Object.defineProperty(n,"__esModule",{value:!0}),n.parseMetaData=n.encodeMetaData=void 0;var a=e("./Bytes");n.encodeMetaData=r,n.parseMetaData=i},{"./Bytes":81}],84:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if("string"!=typeof e||!e.length)throw new TypeError(t)}function a(e){var t=e.contentUrl,n=e.contentId;if(null!==n&&void 0!==n)return i(n,"Unvalid p2pConfig property: contentId needs to be a non-empty string"),n;i(t,"Unvalid PeerAgent constructor argument: contentUrl needs to be a non-empty string");var r=s.default.parse(t,!0,!0);return r.host+r.pathname}Object.defineProperty(n,"__esModule",{value:!0}),n.formatContentId=void 0;var o=e("url"),s=r(o);n.formatContentId=a},{url:227}],85:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){return"number"==typeof e&&!isNaN(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.isNumeric=n.Delta=void 0;var a=e("babel-runtime/helpers/classCallCheck"),o=r(a),s=e("babel-runtime/helpers/createClass"),u=r(s),l=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];(0,o.default)(this,e),this._lastDeltaValue=t}return(0,u.default)(e,[{key:"calcDelta",value:function(e){var t=e-this._lastDeltaValue;return this._lastDeltaValue=e,t}}]),e}();n.Delta=l,n.isNumeric=i},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],86:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="trackSwitch",i={Metrics:{TRACK_SWITCH:r}};n.default=i,t.exports=n.default},{}],87:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.prototype,r=!0,i=!1,o=void 0;try{for(var s,u=(0,h.default)(a(n));!(r=(s=u.next()).done);r=!0){var l=s.value;if((0,f.default)(t[l])!==(0,f.default)(n[l])){var c=t.constructor.name;throw new Error("The method "+l+" of "+e.name+" is not defined in "+c)}}}catch(e){i=!0,o=e}finally{try{!r&&u.return&&u.return()}finally{if(i)throw o}}}function a(e){var t=(0,l.default)(e).filter(function(e){return"constructor"!==e}),n=Object.prototype;if((0,s.default)(e)===n)return t;var r=(0,s.default)(e);return t.concat(a(r))}Object.defineProperty(n,"__esModule",{value:!0}),n._getEveryPropertyNames=n.checkInterface=void 0;var o=e("babel-runtime/core-js/object/get-prototype-of"),s=r(o),u=e("babel-runtime/core-js/object/get-own-property-names"),l=r(u),c=e("babel-runtime/helpers/typeof"),f=r(c),d=e("babel-runtime/core-js/get-iterator"),h=r(d);n.checkInterface=i,n._getEveryPropertyNames=a},{"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/object/get-own-property-names":115,"babel-runtime/core-js/object/get-prototype-of":116,"babel-runtime/helpers/typeof":129}],88:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t){return parseFloat(e.toFixed(t))};n.toDecimal=r},{}],89:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){(0,d.default)(e),(0,c.default)(e).forEach(function(t){var n=e[t];null===n||"object"!==("undefined"==typeof n?"undefined":(0,u.default)(n))||(0,o.default)(n)||i(n)})}Object.defineProperty(n,"__esModule",{value:!0}),n.deepFreeze=void 0;var a=e("babel-runtime/core-js/object/is-frozen"),o=r(a),s=e("babel-runtime/helpers/typeof"),u=r(s),l=e("babel-runtime/core-js/object/get-own-property-names"),c=r(l),f=e("babel-runtime/core-js/object/freeze"),d=r(f);n.deepFreeze=i},{"babel-runtime/core-js/object/freeze":114,"babel-runtime/core-js/object/get-own-property-names":115,"babel-runtime/core-js/object/is-frozen":117,"babel-runtime/helpers/typeof":129}],90:[function(e,t,n){"use strict";function r(e){if(null===e)throw new Error("Panic! Attempted to unwrap null");if(void 0===e)throw new Error("Panic! Attempted to unwrap undefined");return e}Object.defineProperty(n,"__esModule",{value:!0}),n.unwrap=r},{}],91:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("../utils/Delta"),l=function(){function e(){(0,a.default)(this,e);var t=Date.now();this._metricSum=0,this._latestValue=0,this._integralTimestampDelta=new u.Delta(t),this._getterTimestampDelta=new u.Delta(t)}return(0,s.default)(e,[{key:"getAverage",value:function(){var e=Date.now(),t=this._integralTimestampDelta.calcDelta(e),n=this._getterTimestampDelta.calcDelta(e);this._metricSum+=this._latestValue*t;var r=n?this._metricSum/n:this._metricSum;return this._metricSum=0,r}},{key:"updateMetric",value:function(e){var t=Date.now(),n=this._integralTimestampDelta.calcDelta(t);this._metricSum+=this._latestValue*n,this._latestValue=e}}]),e}();n.default=l,t.exports=n.default},{"../utils/Delta":85,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],92:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.assertStreamType=n.StreamTypes=void 0;var i=e("babel-runtime/core-js/object/values"),a=r(i),o=e("babel-runtime/core-js/object/freeze"),s=r(o),u={HLS:"hls",DASH:"dash",SMOOTH:"smooth"};(0,s.default)(u);var l=function(e){if((0,a.default)(u).indexOf(e)===-1)throw new TypeError('"'+e+'" is not a valid value for stream type.')};n.StreamTypes=u,n.assertStreamType=l},{"babel-runtime/core-js/object/freeze":114,"babel-runtime/core-js/object/values":121}],93:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){var e=URL.createObjectURL(new Blob(["("+h.default.toString()+")()"],{type:"application/javascript"})),t=new Worker(e);return URL.revokeObjectURL(e),t}function a(e){var t=e.data,n=t.id,r=t.type,i=p[n];"setTimeout"===r&&delete p[n],i&&i()}function o(e,t,n){return _++,p[_]=t,m.postMessage({time:n,id:_,type:e}),_}function s(e,t){delete p[t],m.postMessage({id:t,type:e})}function u(e,t){return o("setTimeout",e,t)}function l(e,t){return o("setInterval",e,t)}function c(e){s("clearTimeout",e)}function f(e){s("clearInterval",e)}Object.defineProperty(n,"__esModule",{value:!0}),n.reliableSetTimeout=u,n.reliableSetInterval=l,n.reliableClearTimeout=c,n.reliableClearInterval=f;var d=e("./TimerWorker"),h=r(d),p={},m=void 0;m=i(),m.onmessage=a;var _=0},{"./TimerWorker":94}],94:[function(e,t,n){"use strict";function r(){function e(e,t){return function(){return self.postMessage({id:e,type:t})}}self.onmessage=function(t){var n=t.data,r=n.type,i=n.id;switch(r){case"setTimeout":var a=n.time;setTimeout(e(i,r),a);break;case"setInterval":var o=n.time;setInterval(e(i,r),o);break;case"clearTimeout":clearTimeout(i);break;case"clearInterval":clearInterval(i)}}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=r,t.exports=n.default},{}],95:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=e("babel-runtime/core-js/map"),a=r(i),o=e("./TimerAbstraction"),s=function(){var e=this,t=[],n=[],r=new a.default,i=new a.default,s=function(e,n){var r=(0,o.reliableSetTimeout)(function(){u(r),e()},n);return t.push(r),r},u=function(e){for(var n in t)if(t[n]===e){(0,o.reliableClearTimeout)(e),t.splice(n,1);break}},l=function(e,t){var r=(0,o.reliableSetInterval)(e,t);return n.push(r),r},c=function(e){for(var t in n)if(n[t]===e){(0,o.reliableClearInterval)(e),n.splice(t,1);break}},f=function(e,t,n){if(!r.get(e)){var i=(0,o.reliableSetTimeout)(function(){d(e),t()},n);return r.set(e,i),i}return!1},d=function(e){var t=r.get(e);t&&((0,o.reliableClearTimeout)(t),r.delete(e))},h=function(e,t,n){if(!i.get(e)){var r=(0,o.reliableSetInterval)(t,n);return i.set(e,r),r}return!1},p=function(e){var t=i.get(e);t&&((0,
o.reliableClearInterval)(t),i.delete(e))},m=function(){t.forEach(function(e){(0,o.reliableClearTimeout)(e)}),t=[],n.forEach(function(e){(0,o.reliableClearInterval)(e)}),n=[],i.forEach(function(e){(0,o.reliableClearInterval)(e)}),i.clear(),r.forEach(function(e){(0,o.reliableClearTimeout)(e)}),r.clear()};e.setTimeout=s,e.clearTimeout=u,e.setInterval=l,e.clearInterval=c,e.clearAll=m,e.setNamedTimeout=f,e.clearNamedTimeout=d,e.setNamedInterval=h,e.clearNamedInterval=p,e._getTimeoutArray=function(){return t},e._getIntervalArray=function(){return n},e._getNamedTimeoutMap=function(){return r},e._getNamedIntervalMap=function(){return i}};t.exports=s},{"./TimerAbstraction":93,"babel-runtime/core-js/map":109}],96:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("../../defaultConf"),a=(r(i),window.RTCPeerConnection||window.webkitRTCPeerConnection),o=window.RTCIceCandidate,s=window.RTCSessionDescription,u=function(e){return e=e.replace(/b=AS([^\r\n]+\r\n)/g,""),e=e.replace(/a=mid:audio\r\n/g,"a=mid:audio\r\nb=AS:50\r\n"),e=e.replace(/a=mid:video\r\n/g,"a=mid:video\r\nb=AS:256\r\n"),e=e.replace(/a=mid:data\r\n/g,"a=mid:data\r\nb=AS:1638400\r\n")},l=function(e){return new a(c(e),{optional:[{DtlsSrtpKeyAgreement:!0}]})},c=function(e){var t=e.ENABLE_TURN;return t?{iceServers:e.TURNSERVERS.concat(e.STUNSERVERS)}:{iceServers:e.STUNSERVERS}},f=function(e,t,n){e||n("RTCPeerConnection is not defined or null");var r=function(){e.getStats(null,function(e){for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];if(void 0!==i.mozRtt){t(i.mozRtt);break}}n("Could not find RTT value in stats")},function(){})},i=function(){var r=void 0;e.getStats(function(e){var i,a,o=e.result();for(a=0;a<o.length;a++)if(i=o[a],""!==i.stat("googRtt")){r=i.stat("googRtt"),t(parseFloat(r));break}n("Could not find RTT value in stats")})};navigator.mozGetUserMedia?r():i()};n.default={transformOutgoingSdp:u,createPeerConnection:l,getPeerConnectionRTT:f,IceCandidate:o,SessionDescription:s},t.exports=n.default},{"../../defaultConf":1}],97:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){if(t.cacheSize&&(e.P2P_CACHE_MAX_SIZE=1024*t.cacheSize*1024,e.LIVE.P2P_CACHE_MAX_SIZE=e.P2P_CACHE_MAX_SIZE),void 0!==t.activateP2P&&(e.ALLOW_P2P=!!t.activateP2P),void 0!==t.debug&&(e.DEBUG=!!t.debug),t.signalingUrl&&(e.SIGNALING_URL=t.signalingUrl),t.trackerUrl&&(e.TRACKER_URL=t.trackerUrl),t.analyticsUrl&&(e.ANALYTICS.KLARA_URL=t.analyticsUrl),t.deviceInfo&&(e.DEVICE_INFO=t.deviceInfo),void 0!==t.rangeRequestEnabled&&(e.RANGE_REQUEST_ALLOWED=!!t.rangeRequestEnabled),!t.streamrootKey)throw new Error("There must be a streamrootKey in the P2PConfig object");e.ID_CLIENT=t.streamrootKey,e.P2P_PROTOCOL_VERSION+="-"+n}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../defaultConf");r(a);n.default=i,t.exports=n.default},{"../../defaultConf":1}],98:[function(e,t,n){"use strict";function r(e,t){}function i(e){r("log",e)}function a(e){}Object.defineProperty(n,"__esModule",{value:!0}),n.nativeCall=r,n.nativeLog=i,n.nativeError=a},{}],99:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){var r=u.default.v4();return c[r]=e,(0,l.nativeCall)("set_timer",{timer_id:r,interval:t,repeats:n}),r}function a(e){(0,l.nativeCall)("clear_timer",{timer_id:e})}function o(e){c[e]()}Object.defineProperty(n,"__esModule",{value:!0}),n.clearTimer=n.setTimer=n.timersCallback=void 0;var s=e("uuid"),u=r(s),l=e("./nativeCalls"),c={};n.timersCallback=o,n.setTimer=i,n.clearTimer=a},{"./nativeCalls":98,uuid:230}],100:[function(e,t,n){"use strict";var r=e("ua-parser-js"),i=new r;i.setUA(window.navigator.userAgent);var a=i.getResult();t.exports.isMobile=function(){var e="mobile"===a.device.type||"tablet"===a.device.type||"console"===a.device.type||"Android"===a.os.name||"iOS"===a.os.name;return e},t.exports.uaObject=a},{"ua-parser-js":225}],101:[function(e,t,n){"use strict";function r(){String.prototype.endsWith=function(e){var t=this.toString();return t.lastIndexOf(e)===t.length-1}}function i(e){return e.endsWith("/")?e:e+"/"}Object.defineProperty(n,"__esModule",{value:!0}),n.polyfillEndsWith=r,n.formatUrl=i,String.prototype.endsWith||r()},{}],102:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){var r=document.getElementsByTagName("video");if(1!==r.length)throw new Error("BufferDisplay debug tool requiresa page with a single video");var i=r[0],o=document.createElement("canvas");o.width=i.clientWidth||w;var s=document.getElementById("bufferDisplay");s||(s=document.createElement("div"),document.getElementsByTagName("body")[0].appendChild(s)),s.appendChild(o);var u=a.bind(null,o,i,e,t,n),l=setInterval(u,30),c=function(){clearInterval(l),s.removeChild(o)};return{dispose:c}}function a(e,t,n,r,i){var a=o(n,r);s(e,{video:t,cacheState:a,currentTracks:i})}function o(e,t){var n=t.getTrackList(),r=[],i=!0,a=!1,o=void 0;try{for(var s,u=(0,h.default)(n);!(i=(s=u.next()).done);i=!0){var l=s.value,c=new m.default(t),f=e.listDownloadedSegmentsForTrack(l),d=!0,p=!1,_=void 0;try{for(var v,g=(0,h.default)(f);!(d=(v=g.next()).done);d=!0){var b=v.value;c.addSegmentCoord(b)}}catch(e){p=!0,_=e}finally{try{!d&&g.return&&g.return()}finally{if(p)throw _}}r.push({vbm:c,coord:l})}}catch(e){a=!0,o=e}finally{try{!i&&u.return&&u.return()}finally{if(a)throw o}}return r}function s(e,t){var n=t.video,r=t.cacheState,i=t.currentTracks,a=n.buffered,o=n.currentTime,s=e.getContext("2d");e.height=(_+g)*r.length;var d=1/0,p=0,m=!0,w=!1,S=void 0;try{for(var E,k=(0,h.default)(r);!(m=(E=k.next()).done);m=!0){var T=E.value.vbm;if(T.length){var D=T.start(0),P=T.end(T.length-1);D<d&&(d=D),P>p&&(p=P)}}}catch(e){w=!0,S=e}finally{try{!m&&k.return&&k.return()}finally{if(w)throw S}}if(a.length){var I=a.start(0),j=a.end(a.length-1);I<d&&(d=I),j>p&&(p=j)}for(var M={min:d,max:p,canvasWidth:e.width},A=0;A<r.length;A++){var R=r[A],T=R.vbm,O=R.coord,x=(_+g)*A,N={scale:M,height:_,yPosition:x,color:b};c(s,N,T);var L=x+_/2;if(l(s,O.viewToString(),L),u(O,i)){var U={scale:M,height:v,yPosition:x+(_-v),color:y};c(s,U,a)}}var $={height:e.height,color:C,scale:M};f(s,$,o)}function u(e,t){return e.isEqual(t.video)||e.isEqual(t.audio)}function l(e,t,n){e.fillStyle="green",e.font=E,e.fillText(t,0,n)}function c(e,t,n){for(var r=t.scale,i=t.height,a=t.yPosition,o=t.color,s=0;s<n.length;s++){var u=k(r,n.start(s)),l=k(r,n.end(s)),c=l-u>1?l-u:1;e.fillStyle=o,e.fillRect(u,a,c,i)}}function f(e,t,n){var r=t.color,i=t.scale,a=t.height,o=k(i,n);e.fillStyle=r,e.fillRect(o,0,1,a),e.fillStyle=r,e.font=E,e.fillText(n.toFixed(3),0,a)}Object.defineProperty(n,"__esModule",{value:!0});var d=e("babel-runtime/core-js/get-iterator"),h=r(d),p=e("./VirtualBufferedManager"),m=r(p),_=30,v=10,g=3,b="#97b9e2",y="#202429",C="#bf0101",w=460,S=60,E="12px Arial",k=function(e,t){var n=e.min,r=e.max,i=e.canvasWidth,a=i-S,o=Math.max(r-n,180);return S+(t-n)*a/o};n.default=i,t.exports=n.default},{"./VirtualBufferedManager":103,"babel-runtime/core-js/get-iterator":106}],103:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=function(){function e(t){(0,a.default)(this,e),this._buffered=[],this._mapManager=t}return(0,s.default)(e,[{key:"start",value:function(e){return e in this._buffered?this._buffered[e].start:0}},{key:"end",value:function(e){return e in this._buffered?this._buffered[e].end:0}},{key:"addSegmentCoord",value:function(e){var t=void 0,n=void 0;try{t=this._mapManager.getSegmentTime(e),n=t+this._mapManager.getSegmentDuration(e)}catch(e){return}if(!this._buffered.length)return void this._buffered.push({start:t,end:n});for(var r=void 0,i=void 0,a=0;a<this._buffered.length;a++){var o=this._buffered[a],s=this._buffered[a+1]||{start:1/0,end:1/0};if(o.end===t&&n===s.start){o.end=s.end,r=a+1;break}if(o.end===t&&n!==s.start){o.end=n;break}if(o.end!==t&&n===s.start){s.start=t;break}if(o.end<=t&&n<=s.start){i=a+1;break}}void 0!==r&&this._buffered.splice(r,1),void 0!==i&&this._buffered.splice(i,0,{start:t,end:n})}},{key:"length",get:function(){return this._buffered.length}}]),e}();t.exports=u},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],104:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){var r=document.getElementsByTagName("video");if(1!==r.length)throw new Error("BufferDisplay debug tool requiresa page with a single video");var i=r[0],o=document.createElement("canvas"),s=document.getElementById("chunkDisplay");s||(s=document.createElement("div"),document.getElementsByTagName("body")[0].appendChild(s)),s.appendChild(o);var u=a.bind(null,o,e,t,i,n),l=setInterval(u,30),c=function(){clearInterval(l),s.removeChild(o)};return{dispose:c}}function a(e,t,n,r,i){for(var a=n.getTrackList(),s=new v.default,u=0;u<a.length;u++){var l=a[u];s.set(l,[])}for(var c=t.listSegmentsDownloadStatus(),d=i.getSegmentListToDownload(),h=0;h<c.length;h++)for(var p=c[h],_=p.segmentcoord,g=p.downloadStatusList,b=p.seederCount,y=0;y<a.length;y++){var C=a[y];if(_.isInTrack(C)){var w=f(g);try{for(var S=n.getSegmentTime(_),E=!1,k=0;k<d.length;k++)if(d[k].isEqual(_)){d.splice(k,1),E=!0;break}s.get(C).push({segmentAreas:w,id:_.viewToString(),time:S,length:g.length,seederCount:b,inSchedulerList:E})}catch(e){}}}var T=!0,D=!1,P=void 0;try{for(var I,j=(0,m.default)(d);!(T=(I=j.next()).done);T=!0){var M=I.value,A=!0,R=!1,O=void 0;try{for(var x,N=(0,m.default)(a);!(A=(x=N.next()).done);A=!0){var L=x.value;if(M.isInTrack(L)){var U=n.getSegmentTime(M);s.get(L).push({id:M.viewToString(),time:U,seederCount:0,inSchedulerList:!0})}}}catch(e){R=!0,O=e}finally{try{!A&&N.return&&N.return()}finally{if(R)throw O}}}}catch(e){D=!0,P=e}finally{try{!T&&j.return&&j.return()}finally{if(D)throw P}}o(e,s,r.currentTime)}function o(e,t,n){e.height=1e3,e.width=P*t.size;var r=void 0,i=e.getContext("2d"),a=0,o=!0,c=!1,f=void 0;try{for(var d,p=(0,m.default)(t);!(o=(d=p.next()).done);o=!0){var _=(0,h.default)(d.value,2),v=_[0],g=_[1];r=S,s(i,v,r,a);var b=!0,C=!1,w=void 0;try{for(var E,k=(0,m.default)(g);!(b=(E=k.next()).done);b=!0){var I=E.value,j=I.id,M=I.time,A=I.segmentAreas,R=I.length,O=I.seederCount,x=I.inSchedulerList;M>n-D&&(r+=T,A&&l(i,A,R,r,a),u(i,{id:j,time:M,seederCount:O,inSchedulerList:x},r,a),r+=y)}}catch(e){C=!0,w=e}finally{try{!b&&k.return&&k.return()}finally{if(C)throw w}}a++}}catch(e){c=!0,f=e}finally{try{!o&&p.return&&p.return()}finally{if(c)throw f}}}function s(e,t,n,r){var i=P*r;e.fillStyle=C,e.font=E,e.fillText(t.viewToString(),i,n)}function u(e,t,n,r){var i=t.id,a=t.time,o=t.seederCount,s=t.inSchedulerList,u=P*r;e.fillStyle=w,e.font=s?k:E,e.fillText(i+"  --  "+a.toFixed(1)+" -- "+o,u,n+y)}function l(e,t,n,r,i){var a=P*i,o=0,s=!0,u=!1,l=void 0;try{for(var f,d=(0,m.default)(t);!(s=(f=d.next()).done);s=!0){var h=f.value,p=(h.end-h.start)*b/n;e.fillStyle=c(h.status),e.fillRect(a+g+o,r,p,y),o+=p}}catch(e){u=!0,l=e}finally{try{!s&&d.return&&d.return()}finally{if(u)throw l}}t.length||(e.fillStyle="#D490D4",e.fillRect(a+g,r,b,y))}function c(e){switch(e){case"pending":return"gray";case"downloading":return"blue";case"downloaded":return"green";case"CDNdownloaded":return"orange";case"failed":return"red"}}function f(e){for(var t=void 0,n=[],r=0;r<e.length;r++){var i=e[r];if(t===i)n[n.length-1].end++;else{var a={start:r,end:r+1,status:i};t=i,n.push(a)}}return n}Object.defineProperty(n,"__esModule",{value:!0});var d=e("babel-runtime/helpers/slicedToArray"),h=r(d),p=e("babel-runtime/core-js/get-iterator"),m=r(p),_=e("babel-runtime/core-js/map"),v=r(_),g=100,b=100,y=15,C="red",w="black",S=15,E=S+"px Arial",k="bold "+E,T=5,D=10,P=g+b+20;n.default=i,t.exports=n.default},{"babel-runtime/core-js/get-iterator":106,"babel-runtime/core-js/map":109,"babel-runtime/helpers/slicedToArray":127}],105:[function(e,t,n){t.exports={default:e("core-js/library/fn/array/from"),__esModule:!0}},{"core-js/library/fn/array/from":130}],106:[function(e,t,n){t.exports={default:e("core-js/library/fn/get-iterator"),__esModule:!0}},{"core-js/library/fn/get-iterator":131}],107:[function(e,t,n){t.exports={default:e("core-js/library/fn/is-iterable"),__esModule:!0}},{"core-js/library/fn/is-iterable":132}],108:[function(e,t,n){t.exports={default:e("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":133}],109:[function(e,t,n){t.exports={default:e("core-js/library/fn/map"),__esModule:!0}},{"core-js/library/fn/map":134}],110:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/assign"),__esModule:!0}},{"core-js/library/fn/object/assign":135}],111:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/create"),__esModule:!0}},{"core-js/library/fn/object/create":136}],112:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/define-properties"),__esModule:!0}},{"core-js/library/fn/object/define-properties":137}],113:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":138}],114:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/freeze"),__esModule:!0}},{"core-js/library/fn/object/freeze":139}],115:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/get-own-property-names"),__esModule:!0}},{"core-js/library/fn/object/get-own-property-names":140}],116:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/get-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/get-prototype-of":141}],117:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/is-frozen"),__esModule:!0}},{"core-js/library/fn/object/is-frozen":142}],118:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/keys"),__esModule:!0}},{"core-js/library/fn/object/keys":143}],119:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/seal"),__esModule:!0}},{"core-js/library/fn/object/seal":144}],120:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/set-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/set-prototype-of":145}],121:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/values"),__esModule:!0}},{"core-js/library/fn/object/values":146}],122:[function(e,t,n){t.exports={default:e("core-js/library/fn/symbol"),__esModule:!0}},{"core-js/library/fn/symbol":147}],123:[function(e,t,n){"use strict";n.__esModule=!0,n.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],124:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var i=e("../core-js/object/define-property"),a=r(i);n.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,a.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},{"../core-js/object/define-property":113}],125:[function(e,t,n){"use strict";var r=e("babel-runtime/core-js/object/create").default,i=e("babel-runtime/core-js/object/set-prototype-of").default;n.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=r(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(i?i(e,t):e.__proto__=t)},n.__esModule=!0},{"babel-runtime/core-js/object/create":111,"babel-runtime/core-js/object/set-prototype-of":120}],126:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var i=e("../helpers/typeof"),a=r(i);n.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,a.default)(t))&&"function"!=typeof t?e:t}},{"../helpers/typeof":129}],127:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var i=e("../core-js/is-iterable"),a=r(i),o=e("../core-js/get-iterator"),s=r(o);n.default=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var o,u=(0,s.default)(e);!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if((0,a.default)(Object(t)))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},{"../core-js/get-iterator":106,"../core-js/is-iterable":107}],128:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var i=e("../core-js/array/from"),a=r(i);n.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,a.default)(e)}},{"../core-js/array/from":105}],129:[function(e,t,n){"use strict";var r=e("babel-runtime/core-js/symbol").default;n.default=function(e){return e&&e.constructor===r?"symbol":typeof e},n.__esModule=!0},{"babel-runtime/core-js/symbol":122}],130:[function(e,t,n){e("../../modules/es6.string.iterator"),e("../../modules/es6.array.from"),t.exports=e("../../modules/$.core").Array.from},{"../../modules/$.core":156,"../../modules/es6.array.from":202,"../../modules/es6.string.iterator":214}],131:[function(e,t,n){e("../modules/web.dom.iterable"),e("../modules/es6.string.iterator"),t.exports=e("../modules/core.get-iterator")},{"../modules/core.get-iterator":200,"../modules/es6.string.iterator":214,"../modules/web.dom.iterable":218}],132:[function(e,t,n){e("../modules/web.dom.iterable"),e("../modules/es6.string.iterator"),t.exports=e("../modules/core.is-iterable")},{"../modules/core.is-iterable":201,"../modules/es6.string.iterator":214,"../modules/web.dom.iterable":218}],133:[function(e,t,n){var r=e("../../modules/$.core");t.exports=function(e){return(r.JSON&&r.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},{"../../modules/$.core":156}],134:[function(e,t,n){e("../modules/es6.object.to-string"),e("../modules/es6.string.iterator"),e("../modules/web.dom.iterable"),e("../modules/es6.map"),e("../modules/es7.map.to-json"),t.exports=e("../modules/$.core").Map},{"../modules/$.core":156,"../modules/es6.map":204,"../modules/es6.object.to-string":213,"../modules/es6.string.iterator":214,"../modules/es7.map.to-json":216,"../modules/web.dom.iterable":218}],135:[function(e,t,n){e("../../modules/es6.object.assign"),t.exports=e("../../modules/$.core").Object.assign},{"../../modules/$.core":156,"../../modules/es6.object.assign":205}],136:[function(e,t,n){var r=e("../../modules/$");t.exports=function(e,t){return r.create(e,t)}},{"../../modules/$":178}],137:[function(e,t,n){var r=e("../../modules/$");t.exports=function(e,t){return r.setDescs(e,t)}},{"../../modules/$":178}],138:[function(e,t,n){var r=e("../../modules/$");t.exports=function(e,t,n){return r.setDesc(e,t,n)}},{"../../modules/$":178}],139:[function(e,t,n){e("../../modules/es6.object.freeze"),t.exports=e("../../modules/$.core").Object.freeze},{"../../modules/$.core":156,"../../modules/es6.object.freeze":206}],140:[function(e,t,n){var r=e("../../modules/$");e("../../modules/es6.object.get-own-property-names"),t.exports=function(e){return r.getNames(e)}},{"../../modules/$":178,"../../modules/es6.object.get-own-property-names":207}],141:[function(e,t,n){e("../../modules/es6.object.get-prototype-of"),t.exports=e("../../modules/$.core").Object.getPrototypeOf},{"../../modules/$.core":156,"../../modules/es6.object.get-prototype-of":208}],142:[function(e,t,n){e("../../modules/es6.object.is-frozen"),t.exports=e("../../modules/$.core").Object.isFrozen},{"../../modules/$.core":156,"../../modules/es6.object.is-frozen":209}],143:[function(e,t,n){e("../../modules/es6.object.keys"),t.exports=e("../../modules/$.core").Object.keys},{"../../modules/$.core":156,"../../modules/es6.object.keys":210}],144:[function(e,t,n){e("../../modules/es6.object.seal"),t.exports=e("../../modules/$.core").Object.seal},{"../../modules/$.core":156,"../../modules/es6.object.seal":211}],145:[function(e,t,n){e("../../modules/es6.object.set-prototype-of"),t.exports=e("../../modules/$.core").Object.setPrototypeOf},{"../../modules/$.core":156,"../../modules/es6.object.set-prototype-of":212}],146:[function(e,t,n){e("../../modules/es7.object.values"),t.exports=e("../../modules/$.core").Object.values},{"../../modules/$.core":156,"../../modules/es7.object.values":217}],147:[function(e,t,n){e("../../modules/es6.symbol"),e("../../modules/es6.object.to-string"),t.exports=e("../../modules/$.core").Symbol},{"../../modules/$.core":156,"../../modules/es6.object.to-string":213,"../../modules/es6.symbol":215}],148:[function(e,t,n){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],149:[function(e,t,n){t.exports=function(){}},{}],150:[function(e,t,n){var r=e("./$.is-object");t.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},{"./$.is-object":171}],151:[function(e,t,n){var r=e("./$.cof"),i=e("./$.wks")("toStringTag"),a="Arguments"==r(function(){return arguments}());t.exports=function(e){var t,n,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=(t=Object(e))[i])?n:a?r(t):"Object"==(o=r(t))&&"function"==typeof t.callee?"Arguments":o}},{"./$.cof":152,"./$.wks":198}],152:[function(e,t,n){var r={}.toString;t.exports=function(e){return r.call(e).slice(8,-1)}},{}],153:[function(e,t,n){"use strict";var r=e("./$"),i=e("./$.hide"),a=e("./$.redefine-all"),o=e("./$.ctx"),s=e("./$.strict-new"),u=e("./$.defined"),l=e("./$.for-of"),c=e("./$.iter-define"),f=e("./$.iter-step"),d=e("./$.uid")("id"),h=e("./$.has"),p=e("./$.is-object"),m=e("./$.set-species"),_=e("./$.descriptors"),v=Object.isExtensible||p,g=_?"_s":"size",b=0,y=function(e,t){if(!p(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!h(e,d)){if(!v(e))return"F";if(!t)return"E";i(e,d,++b)}return"O"+e[d]},C=function(e,t){var n,r=y(t);if("F"!==r)return e._i[r];for(n=e._f;n;n=n.n)if(n.k==t)return n};t.exports={getConstructor:function(e,t,n,i){var c=e(function(e,a){s(e,c,t),e._i=r.create(null),e._f=void 0,e._l=void 0,e[g]=0,void 0!=a&&l(a,n,e[i],e)});return a(c.prototype,{clear:function(){for(var e=this,t=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete t[n.i];e._f=e._l=void 0,e[g]=0},delete:function(e){var t=this,n=C(t,e);if(n){var r=n.n,i=n.p;delete t._i[n.i],n.r=!0,i&&(i.n=r),r&&(r.p=i),t._f==n&&(t._f=r),t._l==n&&(t._l=i),t[g]--}return!!n},forEach:function(e){for(var t,n=o(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.n:this._f;)for(n(t.v,t.k,this);t&&t.r;)t=t.p},has:function(e){return!!C(this,e)}}),_&&r.setDesc(c.prototype,"size",{get:function(){return u(this[g])}}),c},def:function(e,t,n){var r,i,a=C(e,t);return a?a.v=n:(e._l=a={i:i=y(t,!0),k:t,v:n,p:r=e._l,n:void 0,r:!1},e._f||(e._f=a),r&&(r.n=a),e[g]++,"F"!==i&&(e._i[i]=a)),e},getEntry:C,setStrong:function(e,t,n){c(e,t,function(e,t){this._t=e,this._k=t,this._l=void 0},function(){for(var e=this,t=e._k,n=e._l;n&&n.r;)n=n.p;return e._t&&(e._l=n=n?n.n:e._t._f)?"keys"==t?f(0,n.k):"values"==t?f(0,n.v):f(0,[n.k,n.v]):(e._t=void 0,f(1))},n?"entries":"values",!n,!0),m(t)}}},{"./$":178,"./$.ctx":157,"./$.defined":158,"./$.descriptors":159,"./$.for-of":163,"./$.has":166,"./$.hide":167,"./$.is-object":171,"./$.iter-define":174,"./$.iter-step":176,"./$.redefine-all":185,"./$.set-species":188,"./$.strict-new":191,"./$.uid":197}],154:[function(e,t,n){var r=e("./$.for-of"),i=e("./$.classof");t.exports=function(e){return function(){if(i(this)!=e)throw TypeError(e+"#toJSON isn't generic");var t=[];return r(this,!1,t.push,t),t}}},{"./$.classof":151,"./$.for-of":163}],155:[function(e,t,n){"use strict";var r=e("./$"),i=e("./$.global"),a=e("./$.export"),o=e("./$.fails"),s=e("./$.hide"),u=e("./$.redefine-all"),l=e("./$.for-of"),c=e("./$.strict-new"),f=e("./$.is-object"),d=e("./$.set-to-string-tag"),h=e("./$.descriptors");t.exports=function(e,t,n,p,m,_){var v=i[e],g=v,b=m?"set":"add",y=g&&g.prototype,C={};return h&&"function"==typeof g&&(_||y.forEach&&!o(function(){(new g).entries().next()}))?(g=t(function(t,n){c(t,g,e),t._c=new v,void 0!=n&&l(n,m,t[b],t)}),r.each.call("add,clear,delete,forEach,get,has,set,keys,values,entries".split(","),function(e){var t="add"==e||"set"==e;e in y&&(!_||"clear"!=e)&&s(g.prototype,e,function(n,r){if(!t&&_&&!f(n))return"get"==e&&void 0;var i=this._c[e](0===n?0:n,r);return t?this:i})}),"size"in y&&r.setDesc(g.prototype,"size",{get:function(){return this._c.size}})):(g=p.getConstructor(t,e,m,b),u(g.prototype,n)),d(g,e),C[e]=g,a(a.G+a.W+a.F,C),_||p.setStrong(g,e,m),g}},{"./$":178,"./$.descriptors":159,"./$.export":161,"./$.fails":162,"./$.for-of":163,"./$.global":165,"./$.hide":167,"./$.is-object":171,"./$.redefine-all":185,"./$.set-to-string-tag":189,"./$.strict-new":191}],156:[function(e,t,n){var r=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=r)},{}],157:[function(e,t,n){var r=e("./$.a-function");t.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},{"./$.a-function":148}],158:[function(e,t,n){t.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},{}],159:[function(e,t,n){t.exports=!e("./$.fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./$.fails":162}],160:[function(e,t,n){var r=e("./$");t.exports=function(e){var t=r.getKeys(e),n=r.getSymbols;if(n)for(var i,a=n(e),o=r.isEnum,s=0;a.length>s;)o.call(e,i=a[s++])&&t.push(i);return t}},{"./$":178}],161:[function(e,t,n){var r=e("./$.global"),i=e("./$.core"),a=e("./$.ctx"),o="prototype",s=function(e,t,n){var u,l,c,f=e&s.F,d=e&s.G,h=e&s.S,p=e&s.P,m=e&s.B,_=e&s.W,v=d?i:i[t]||(i[t]={}),g=d?r:h?r[t]:(r[t]||{})[o];d&&(n=t);for(u in n)l=!f&&g&&u in g,l&&u in v||(c=l?g[u]:n[u],v[u]=d&&"function"!=typeof g[u]?n[u]:m&&l?a(c,r):_&&g[u]==c?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t[o]=e[o],t}(c):p&&"function"==typeof c?a(Function.call,c):c,p&&((v[o]||(v[o]={}))[u]=c))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},{"./$.core":156,"./$.ctx":157,"./$.global":165}],162:[function(e,t,n){t.exports=function(e){try{return!!e()}catch(e){return!0}}},{}],163:[function(e,t,n){var r=e("./$.ctx"),i=e("./$.iter-call"),a=e("./$.is-array-iter"),o=e("./$.an-object"),s=e("./$.to-length"),u=e("./core.get-iterator-method");t.exports=function(e,t,n,l){var c,f,d,h=u(e),p=r(n,l,t?2:1),m=0;if("function"!=typeof h)throw TypeError(e+" is not iterable!");if(a(h))for(c=s(e.length);c>m;m++)t?p(o(f=e[m])[0],f[1]):p(e[m]);else for(d=h.call(e);!(f=d.next()).done;)i(d,p,f.value,t)}},{"./$.an-object":150,"./$.ctx":157,"./$.is-array-iter":169,"./$.iter-call":172,"./$.to-length":195,"./core.get-iterator-method":199}],164:[function(e,t,n){var r=e("./$.to-iobject"),i=e("./$").getNames,a={}.toString,o="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return o.slice()}};t.exports.get=function(e){return o&&"[object Window]"==a.call(e)?s(e):i(r(e))}},{"./$":178,"./$.to-iobject":194}],165:[function(e,t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},{}],166:[function(e,t,n){var r={}.hasOwnProperty;t.exports=function(e,t){return r.call(e,t)}},{}],167:[function(e,t,n){var r=e("./$"),i=e("./$.property-desc");t.exports=e("./$.descriptors")?function(e,t,n){return r.setDesc(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},{"./$":178,"./$.descriptors":159,"./$.property-desc":184}],168:[function(e,t,n){var r=e("./$.cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},{"./$.cof":152}],169:[function(e,t,n){var r=e("./$.iterators"),i=e("./$.wks")("iterator"),a=Array.prototype;t.exports=function(e){return void 0!==e&&(r.Array===e||a[i]===e)}},{"./$.iterators":177,"./$.wks":198}],170:[function(e,t,n){var r=e("./$.cof");t.exports=Array.isArray||function(e){return"Array"==r(e)}},{"./$.cof":152}],171:[function(e,t,n){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],172:[function(e,t,n){var r=e("./$.an-object");t.exports=function(e,t,n,i){try{return i?t(r(n)[0],n[1]):t(n)}catch(t){var a=e.return;throw void 0!==a&&r(a.call(e)),t}}},{"./$.an-object":150}],173:[function(e,t,n){"use strict";var r=e("./$"),i=e("./$.property-desc"),a=e("./$.set-to-string-tag"),o={};e("./$.hide")(o,e("./$.wks")("iterator"),function(){return this}),t.exports=function(e,t,n){e.prototype=r.create(o,{next:i(1,n)}),a(e,t+" Iterator")}},{"./$":178,"./$.hide":167,"./$.property-desc":184,"./$.set-to-string-tag":189,"./$.wks":198}],174:[function(e,t,n){"use strict";var r=e("./$.library"),i=e("./$.export"),a=e("./$.redefine"),o=e("./$.hide"),s=e("./$.has"),u=e("./$.iterators"),l=e("./$.iter-create"),c=e("./$.set-to-string-tag"),f=e("./$").getProto,d=e("./$.wks")("iterator"),h=!([].keys&&"next"in[].keys()),p="@@iterator",m="keys",_="values",v=function(){return this};t.exports=function(e,t,n,g,b,y,C){l(n,t,g);var w,S,E=function(e){if(!h&&e in P)return P[e];switch(e){case m:return function(){return new n(this,e)};case _:return function(){return new n(this,e)}}return function(){return new n(this,e)}},k=t+" Iterator",T=b==_,D=!1,P=e.prototype,I=P[d]||P[p]||b&&P[b],j=I||E(b);if(I){var M=f(j.call(new e));c(M,k,!0),!r&&s(P,p)&&o(M,d,v),T&&I.name!==_&&(D=!0,j=function(){return I.call(this)})}if(r&&!C||!h&&!D&&P[d]||o(P,d,j),u[t]=j,u[k]=v,b)if(w={values:T?j:E(_),keys:y?j:E(m),entries:T?E("entries"):j},C)for(S in w)S in P||a(P,S,w[S]);else i(i.P+i.F*(h||D),t,w);return w}},{"./$":178,"./$.export":161,"./$.has":166,"./$.hide":167,"./$.iter-create":173,"./$.iterators":177,"./$.library":180,"./$.redefine":186,"./$.set-to-string-tag":189,"./$.wks":198}],175:[function(e,t,n){var r=e("./$.wks")("iterator"),i=!1;try{var a=[7][r]();a.return=function(){i=!0},Array.from(a,function(){throw 2})}catch(e){}t.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var a=[7],o=a[r]();o.next=function(){return{done:n=!0}},a[r]=function(){return o},e(a)}catch(e){}return n}},{"./$.wks":198}],176:[function(e,t,n){t.exports=function(e,t){return{value:t,done:!!e}}},{}],177:[function(e,t,n){t.exports={}},{}],178:[function(e,t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},{}],179:[function(e,t,n){var r=e("./$"),i=e("./$.to-iobject");t.exports=function(e,t){for(var n,a=i(e),o=r.getKeys(a),s=o.length,u=0;s>u;)if(a[n=o[u++]]===t)return n}},{"./$":178,"./$.to-iobject":194}],180:[function(e,t,n){t.exports=!0},{}],181:[function(e,t,n){var r=e("./$"),i=e("./$.to-object"),a=e("./$.iobject");t.exports=e("./$.fails")(function(){var e=Object.assign,t={},n={},r=Symbol(),i="abcdefghijklmnopqrst";return t[r]=7,i.split("").forEach(function(e){n[e]=e}),7!=e({},t)[r]||Object.keys(e({},n)).join("")!=i})?function(e,t){for(var n=i(e),o=arguments,s=o.length,u=1,l=r.getKeys,c=r.getSymbols,f=r.isEnum;s>u;)for(var d,h=a(o[u++]),p=c?l(h).concat(c(h)):l(h),m=p.length,_=0;m>_;)f.call(h,d=p[_++])&&(n[d]=h[d]);return n}:Object.assign},{"./$":178,"./$.fails":162,"./$.iobject":168,"./$.to-object":196}],182:[function(e,t,n){var r=e("./$.export"),i=e("./$.core"),a=e("./$.fails");t.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],o={};o[e]=t(n),r(r.S+r.F*a(function(){n(1)}),"Object",o)}},{"./$.core":156,
"./$.export":161,"./$.fails":162}],183:[function(e,t,n){var r=e("./$"),i=e("./$.to-iobject"),a=r.isEnum;t.exports=function(e){return function(t){for(var n,o=i(t),s=r.getKeys(o),u=s.length,l=0,c=[];u>l;)a.call(o,n=s[l++])&&c.push(e?[n,o[n]]:o[n]);return c}}},{"./$":178,"./$.to-iobject":194}],184:[function(e,t,n){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],185:[function(e,t,n){var r=e("./$.redefine");t.exports=function(e,t){for(var n in t)r(e,n,t[n]);return e}},{"./$.redefine":186}],186:[function(e,t,n){t.exports=e("./$.hide")},{"./$.hide":167}],187:[function(e,t,n){var r=e("./$").getDesc,i=e("./$.is-object"),a=e("./$.an-object"),o=function(e,t){if(a(e),!i(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,i){try{i=e("./$.ctx")(Function.call,r(Object.prototype,"__proto__").set,2),i(t,[]),n=!(t instanceof Array)}catch(e){n=!0}return function(e,t){return o(e,t),n?e.__proto__=t:i(e,t),e}}({},!1):void 0),check:o}},{"./$":178,"./$.an-object":150,"./$.ctx":157,"./$.is-object":171}],188:[function(e,t,n){"use strict";var r=e("./$.core"),i=e("./$"),a=e("./$.descriptors"),o=e("./$.wks")("species");t.exports=function(e){var t=r[e];a&&t&&!t[o]&&i.setDesc(t,o,{configurable:!0,get:function(){return this}})}},{"./$":178,"./$.core":156,"./$.descriptors":159,"./$.wks":198}],189:[function(e,t,n){var r=e("./$").setDesc,i=e("./$.has"),a=e("./$.wks")("toStringTag");t.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},{"./$":178,"./$.has":166,"./$.wks":198}],190:[function(e,t,n){var r=e("./$.global"),i="__core-js_shared__",a=r[i]||(r[i]={});t.exports=function(e){return a[e]||(a[e]={})}},{"./$.global":165}],191:[function(e,t,n){t.exports=function(e,t,n){if(!(e instanceof t))throw TypeError(n+": use the 'new' operator!");return e}},{}],192:[function(e,t,n){var r=e("./$.to-integer"),i=e("./$.defined");t.exports=function(e){return function(t,n){var a,o,s=String(i(t)),u=r(n),l=s.length;return u<0||u>=l?e?"":void 0:(a=s.charCodeAt(u),a<55296||a>56319||u+1===l||(o=s.charCodeAt(u+1))<56320||o>57343?e?s.charAt(u):a:e?s.slice(u,u+2):(a-55296<<10)+(o-56320)+65536)}}},{"./$.defined":158,"./$.to-integer":193}],193:[function(e,t,n){var r=Math.ceil,i=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?i:r)(e)}},{}],194:[function(e,t,n){var r=e("./$.iobject"),i=e("./$.defined");t.exports=function(e){return r(i(e))}},{"./$.defined":158,"./$.iobject":168}],195:[function(e,t,n){var r=e("./$.to-integer"),i=Math.min;t.exports=function(e){return e>0?i(r(e),9007199254740991):0}},{"./$.to-integer":193}],196:[function(e,t,n){var r=e("./$.defined");t.exports=function(e){return Object(r(e))}},{"./$.defined":158}],197:[function(e,t,n){var r=0,i=Math.random();t.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++r+i).toString(36))}},{}],198:[function(e,t,n){var r=e("./$.shared")("wks"),i=e("./$.uid"),a=e("./$.global").Symbol;t.exports=function(e){return r[e]||(r[e]=a&&a[e]||(a||i)("Symbol."+e))}},{"./$.global":165,"./$.shared":190,"./$.uid":197}],199:[function(e,t,n){var r=e("./$.classof"),i=e("./$.wks")("iterator"),a=e("./$.iterators");t.exports=e("./$.core").getIteratorMethod=function(e){if(void 0!=e)return e[i]||e["@@iterator"]||a[r(e)]}},{"./$.classof":151,"./$.core":156,"./$.iterators":177,"./$.wks":198}],200:[function(e,t,n){var r=e("./$.an-object"),i=e("./core.get-iterator-method");t.exports=e("./$.core").getIterator=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},{"./$.an-object":150,"./$.core":156,"./core.get-iterator-method":199}],201:[function(e,t,n){var r=e("./$.classof"),i=e("./$.wks")("iterator"),a=e("./$.iterators");t.exports=e("./$.core").isIterable=function(e){var t=Object(e);return void 0!==t[i]||"@@iterator"in t||a.hasOwnProperty(r(t))}},{"./$.classof":151,"./$.core":156,"./$.iterators":177,"./$.wks":198}],202:[function(e,t,n){"use strict";var r=e("./$.ctx"),i=e("./$.export"),a=e("./$.to-object"),o=e("./$.iter-call"),s=e("./$.is-array-iter"),u=e("./$.to-length"),l=e("./core.get-iterator-method");i(i.S+i.F*!e("./$.iter-detect")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,i,c,f=a(e),d="function"==typeof this?this:Array,h=arguments,p=h.length,m=p>1?h[1]:void 0,_=void 0!==m,v=0,g=l(f);if(_&&(m=r(m,p>2?h[2]:void 0,2)),void 0==g||d==Array&&s(g))for(t=u(f.length),n=new d(t);t>v;v++)n[v]=_?m(f[v],v):f[v];else for(c=g.call(f),n=new d;!(i=c.next()).done;v++)n[v]=_?o(c,m,[i.value,v],!0):i.value;return n.length=v,n}})},{"./$.ctx":157,"./$.export":161,"./$.is-array-iter":169,"./$.iter-call":172,"./$.iter-detect":175,"./$.to-length":195,"./$.to-object":196,"./core.get-iterator-method":199}],203:[function(e,t,n){"use strict";var r=e("./$.add-to-unscopables"),i=e("./$.iter-step"),a=e("./$.iterators"),o=e("./$.to-iobject");t.exports=e("./$.iter-define")(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),a.Arguments=a.Array,r("keys"),r("values"),r("entries")},{"./$.add-to-unscopables":149,"./$.iter-define":174,"./$.iter-step":176,"./$.iterators":177,"./$.to-iobject":194}],204:[function(e,t,n){"use strict";var r=e("./$.collection-strong");e("./$.collection")("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=r.getEntry(this,e);return t&&t.v},set:function(e,t){return r.def(this,0===e?0:e,t)}},r,!0)},{"./$.collection":155,"./$.collection-strong":153}],205:[function(e,t,n){var r=e("./$.export");r(r.S+r.F,"Object",{assign:e("./$.object-assign")})},{"./$.export":161,"./$.object-assign":181}],206:[function(e,t,n){var r=e("./$.is-object");e("./$.object-sap")("freeze",function(e){return function(t){return e&&r(t)?e(t):t}})},{"./$.is-object":171,"./$.object-sap":182}],207:[function(e,t,n){e("./$.object-sap")("getOwnPropertyNames",function(){return e("./$.get-names").get})},{"./$.get-names":164,"./$.object-sap":182}],208:[function(e,t,n){var r=e("./$.to-object");e("./$.object-sap")("getPrototypeOf",function(e){return function(t){return e(r(t))}})},{"./$.object-sap":182,"./$.to-object":196}],209:[function(e,t,n){var r=e("./$.is-object");e("./$.object-sap")("isFrozen",function(e){return function(t){return!r(t)||!!e&&e(t)}})},{"./$.is-object":171,"./$.object-sap":182}],210:[function(e,t,n){var r=e("./$.to-object");e("./$.object-sap")("keys",function(e){return function(t){return e(r(t))}})},{"./$.object-sap":182,"./$.to-object":196}],211:[function(e,t,n){var r=e("./$.is-object");e("./$.object-sap")("seal",function(e){return function(t){return e&&r(t)?e(t):t}})},{"./$.is-object":171,"./$.object-sap":182}],212:[function(e,t,n){var r=e("./$.export");r(r.S,"Object",{setPrototypeOf:e("./$.set-proto").set})},{"./$.export":161,"./$.set-proto":187}],213:[function(e,t,n){},{}],214:[function(e,t,n){"use strict";var r=e("./$.string-at")(!0);e("./$.iter-define")(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},{"./$.iter-define":174,"./$.string-at":192}],215:[function(e,t,n){"use strict";var r=e("./$"),i=e("./$.global"),a=e("./$.has"),o=e("./$.descriptors"),s=e("./$.export"),u=e("./$.redefine"),l=e("./$.fails"),c=e("./$.shared"),f=e("./$.set-to-string-tag"),d=e("./$.uid"),h=e("./$.wks"),p=e("./$.keyof"),m=e("./$.get-names"),_=e("./$.enum-keys"),v=e("./$.is-array"),g=e("./$.an-object"),b=e("./$.to-iobject"),y=e("./$.property-desc"),C=r.getDesc,w=r.setDesc,S=r.create,E=m.get,k=i.Symbol,T=i.JSON,D=T&&T.stringify,P=!1,I=h("_hidden"),j=r.isEnum,M=c("symbol-registry"),A=c("symbols"),R="function"==typeof k,O=Object.prototype,x=o&&l(function(){return 7!=S(w({},"a",{get:function(){return w(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=C(O,t);r&&delete O[t],w(e,t,n),r&&e!==O&&w(O,t,r)}:w,N=function(e){var t=A[e]=S(k.prototype);return t._k=e,o&&P&&x(O,e,{configurable:!0,set:function(t){a(this,I)&&a(this[I],e)&&(this[I][e]=!1),x(this,e,y(1,t))}}),t},L=function(e){return"symbol"==typeof e},U=function(e,t,n){return n&&a(A,t)?(n.enumerable?(a(e,I)&&e[I][t]&&(e[I][t]=!1),n=S(n,{enumerable:y(0,!1)})):(a(e,I)||w(e,I,y(1,{})),e[I][t]=!0),x(e,t,n)):w(e,t,n)},$=function(e,t){g(e);for(var n,r=_(t=b(t)),i=0,a=r.length;a>i;)U(e,n=r[i++],t[n]);return e},F=function(e,t){return void 0===t?S(e):$(S(e),t)},H=function(e){var t=j.call(this,e);return!(t||!a(this,e)||!a(A,e)||a(this,I)&&this[I][e])||t},B=function(e,t){var n=C(e=b(e),t);return!n||!a(A,t)||a(e,I)&&e[I][t]||(n.enumerable=!0),n},q=function(e){for(var t,n=E(b(e)),r=[],i=0;n.length>i;)a(A,t=n[i++])||t==I||r.push(t);return r},G=function(e){for(var t,n=E(b(e)),r=[],i=0;n.length>i;)a(A,t=n[i++])&&r.push(A[t]);return r},V=function(e){if(void 0!==e&&!L(e)){for(var t,n,r=[e],i=1,a=arguments;a.length>i;)r.push(a[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!L(t))return t}),r[1]=t,D.apply(T,r)}},K=l(function(){var e=k();return"[null]"!=D([e])||"{}"!=D({a:e})||"{}"!=D(Object(e))});R||(k=function(){if(L(this))throw TypeError("Symbol is not a constructor");return N(d(arguments.length>0?arguments[0]:void 0))},u(k.prototype,"toString",function(){return this._k}),L=function(e){return e instanceof k},r.create=F,r.isEnum=H,r.getDesc=B,r.setDesc=U,r.setDescs=$,r.getNames=m.get=q,r.getSymbols=G,o&&!e("./$.library")&&u(O,"propertyIsEnumerable",H,!0));var Y={for:function(e){return a(M,e+="")?M[e]:M[e]=k(e)},keyFor:function(e){return p(M,e)},useSetter:function(){P=!0},useSimple:function(){P=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(e){var t=h(e);Y[e]=R?t:N(t)}),P=!0,s(s.G+s.W,{Symbol:k}),s(s.S,"Symbol",Y),s(s.S+s.F*!R,"Object",{create:F,defineProperty:U,defineProperties:$,getOwnPropertyDescriptor:B,getOwnPropertyNames:q,getOwnPropertySymbols:G}),T&&s(s.S+s.F*(!R||K),"JSON",{stringify:V}),f(k,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},{"./$":178,"./$.an-object":150,"./$.descriptors":159,"./$.enum-keys":160,"./$.export":161,"./$.fails":162,"./$.get-names":164,"./$.global":165,"./$.has":166,"./$.is-array":170,"./$.keyof":179,"./$.library":180,"./$.property-desc":184,"./$.redefine":186,"./$.set-to-string-tag":189,"./$.shared":190,"./$.to-iobject":194,"./$.uid":197,"./$.wks":198}],216:[function(e,t,n){var r=e("./$.export");r(r.P,"Map",{toJSON:e("./$.collection-to-json")("Map")})},{"./$.collection-to-json":154,"./$.export":161}],217:[function(e,t,n){var r=e("./$.export"),i=e("./$.object-to-array")(!1);r(r.S,"Object",{values:function(e){return i(e)}})},{"./$.export":161,"./$.object-to-array":183}],218:[function(e,t,n){e("./es6.array.iterator");var r=e("./$.iterators");r.NodeList=r.HTMLCollection=r.Array},{"./$.iterators":177,"./es6.array.iterator":203}],219:[function(e,t,n){"use strict";function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(){}var a=Object.prototype.hasOwnProperty,o="function"!=typeof Object.create&&"~";i.prototype._events=void 0,i.prototype.eventNames=function(){var e,t=this._events,n=[];if(!t)return n;for(e in t)a.call(t,e)&&n.push(o?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},i.prototype.listeners=function(e,t){var n=o?o+e:e,r=this._events&&this._events[n];if(t)return!!r;if(!r)return[];if(r.fn)return[r.fn];for(var i=0,a=r.length,s=new Array(a);i<a;i++)s[i]=r[i].fn;return s},i.prototype.emit=function(e,t,n,r,i,a){var s=o?o+e:e;if(!this._events||!this._events[s])return!1;var u,l,c=this._events[s],f=arguments.length;if("function"==typeof c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,r),!0;case 5:return c.fn.call(c.context,t,n,r,i),!0;case 6:return c.fn.call(c.context,t,n,r,i,a),!0}for(l=1,u=new Array(f-1);l<f;l++)u[l-1]=arguments[l];c.fn.apply(c.context,u)}else{var d,h=c.length;for(l=0;l<h;l++)switch(c[l].once&&this.removeListener(e,c[l].fn,void 0,!0),f){case 1:c[l].fn.call(c[l].context);break;case 2:c[l].fn.call(c[l].context,t);break;case 3:c[l].fn.call(c[l].context,t,n);break;default:if(!u)for(d=1,u=new Array(f-1);d<f;d++)u[d-1]=arguments[d];c[l].fn.apply(c[l].context,u)}}return!0},i.prototype.on=function(e,t,n){var i=new r(t,n||this),a=o?o+e:e;return this._events||(this._events=o?{}:Object.create(null)),this._events[a]?this._events[a].fn?this._events[a]=[this._events[a],i]:this._events[a].push(i):this._events[a]=i,this},i.prototype.once=function(e,t,n){var i=new r(t,n||this,(!0)),a=o?o+e:e;return this._events||(this._events=o?{}:Object.create(null)),this._events[a]?this._events[a].fn?this._events[a]=[this._events[a],i]:this._events[a].push(i):this._events[a]=i,this},i.prototype.removeListener=function(e,t,n,r){var i=o?o+e:e;if(!this._events||!this._events[i])return this;var a=this._events[i],s=[];if(t)if(a.fn)(a.fn!==t||r&&!a.once||n&&a.context!==n)&&s.push(a);else for(var u=0,l=a.length;u<l;u++)(a[u].fn!==t||r&&!a[u].once||n&&a[u].context!==n)&&s.push(a[u]);return s.length?this._events[i]=1===s.length?s[0]:s:delete this._events[i],this},i.prototype.removeAllListeners=function(e){return this._events?(e?delete this._events[o?o+e:e]:this._events=o?{}:Object.create(null),this):this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prototype.setMaxListeners=function(){return this},i.prefixed=o,"undefined"!=typeof t&&(t.exports=i)},{}],220:[function(t,n,r){(function(t){!function(i){function a(e){throw RangeError(O[e])}function o(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function s(e,t){var n=e.split("@"),r="";n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(R,".");var i=e.split("."),a=o(i,t).join(".");return r+a}function u(e){for(var t,n,r=[],i=0,a=e.length;i<a;)t=e.charCodeAt(i++),t>=55296&&t<=56319&&i<a?(n=e.charCodeAt(i++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),i--)):r.push(t);return r}function l(e){return o(e,function(e){var t="";return e>65535&&(e-=65536,t+=L(e>>>10&1023|55296),e=56320|1023&e),t+=L(e)}).join("")}function c(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:S}function f(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function d(e,t,n){var r=0;for(e=n?N(e/D):e>>1,e+=N(e/t);e>x*k>>1;r+=S)e=N(e/x);return N(r+(x+1)*e/(e+T))}function h(e){var t,n,r,i,o,s,u,f,h,p,m=[],_=e.length,v=0,g=I,b=P;for(n=e.lastIndexOf(j),n<0&&(n=0),r=0;r<n;++r)e.charCodeAt(r)>=128&&a("not-basic"),m.push(e.charCodeAt(r));for(i=n>0?n+1:0;i<_;){for(o=v,s=1,u=S;i>=_&&a("invalid-input"),f=c(e.charCodeAt(i++)),(f>=S||f>N((w-v)/s))&&a("overflow"),v+=f*s,h=u<=b?E:u>=b+k?k:u-b,!(f<h);u+=S)p=S-h,s>N(w/p)&&a("overflow"),s*=p;t=m.length+1,b=d(v-o,t,0==o),N(v/t)>w-g&&a("overflow"),g+=N(v/t),v%=t,m.splice(v++,0,g)}return l(m)}function p(e){var t,n,r,i,o,s,l,c,h,p,m,_,v,g,b,y=[];for(e=u(e),_=e.length,t=I,n=0,o=P,s=0;s<_;++s)m=e[s],m<128&&y.push(L(m));for(r=i=y.length,i&&y.push(j);r<_;){for(l=w,s=0;s<_;++s)m=e[s],m>=t&&m<l&&(l=m);for(v=r+1,l-t>N((w-n)/v)&&a("overflow"),n+=(l-t)*v,t=l,s=0;s<_;++s)if(m=e[s],m<t&&++n>w&&a("overflow"),m==t){for(c=n,h=S;p=h<=o?E:h>=o+k?k:h-o,!(c<p);h+=S)b=c-p,g=S-p,y.push(L(f(p+b%g,0))),c=N(b/g);y.push(L(f(c,0))),o=d(n,v,r==i),n=0,++r}++n,++t}return y.join("")}function m(e){return s(e,function(e){return M.test(e)?h(e.slice(4).toLowerCase()):e})}function _(e){return s(e,function(e){return A.test(e)?"xn--"+p(e):e})}var v="object"==typeof r&&r&&!r.nodeType&&r,g="object"==typeof n&&n&&!n.nodeType&&n,b="object"==typeof t&&t;b.global!==b&&b.window!==b&&b.self!==b||(i=b);var y,C,w=2147483647,S=36,E=1,k=26,T=38,D=700,P=72,I=128,j="-",M=/^xn--/,A=/[^\x20-\x7E]/,R=/[\x2E\u3002\uFF0E\uFF61]/g,O={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},x=S-E,N=Math.floor,L=String.fromCharCode;if(y={version:"1.3.2",ucs2:{decode:u,encode:l},decode:h,encode:p,toASCII:_,toUnicode:m},"function"==typeof e&&"object"==typeof e.amd&&e.amd)e("punycode",function(){return y});else if(v&&g)if(n.exports==v)g.exports=y;else for(C in y)y.hasOwnProperty(C)&&(v[C]=y[C]);else i.punycode=y}(this)}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],221:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,a){t=t||"&",n=n||"=";var o={};if("string"!=typeof e||0===e.length)return o;var s=/\+/g;e=e.split(t);var u=1e3;a&&"number"==typeof a.maxKeys&&(u=a.maxKeys);var l=e.length;u>0&&l>u&&(l=u);for(var c=0;c<l;++c){var f,d,h,p,m=e[c].replace(s,"%20"),_=m.indexOf(n);_>=0?(f=m.substr(0,_),d=m.substr(_+1)):(f=m,d=""),h=decodeURIComponent(f),p=decodeURIComponent(d),r(o,h)?i(o[h])?o[h].push(p):o[h]=[o[h],p]:o[h]=p}return o};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],222:[function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var i=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,s){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(o(e),function(o){var s=encodeURIComponent(i(o))+n;return a(e[o])?r(e[o],function(e){return s+encodeURIComponent(i(e))}).join(t):s+encodeURIComponent(i(e[o]))}).join(t):s?encodeURIComponent(i(s))+n+encodeURIComponent(i(e)):""};var a=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},o=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],223:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":221,"./encode":222}],224:[function(t,n,r){(function(i){!function(t){if("object"==typeof r&&"undefined"!=typeof n)n.exports=t();else if("function"==typeof e&&e.amd)e([],t);else{var a;a="undefined"!=typeof window?window:"undefined"!=typeof i?i:"undefined"!=typeof self?self:this,a.QoSAnalytics=t()}}(function(){return function e(n,r,i){function a(s,u){if(!r[s]){if(!n[s]){var l="function"==typeof t&&t;if(!u&&l)return l(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=r[s]={exports:{}};n[s][0].call(f.exports,function(e){var t=n[s][1][e];return a(t?t:e)},f,f.exports,e,n,r,i)}return r[s].exports}for(var o="function"==typeof t&&t,s=0;s<i.length;s++)a(i[s]);return a}({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("./utils/VideoEventHandlers"),s=r(o),u=e("streamroot-utils-client").Timers,l=function e(t,n){function r(){te===J&&(ne>=re?(ne=0,te=ee):ne++);var e=Date.now();te===Z||A.paused||(V+=(e-H)/1e3),H=e}function i(){var e=Date.now();te!==ee||A.paused||(Y+=(e-q)/1e3),q=e}function o(){var e=Date.now();te!==ee||A.paused||(K+=(e-B)/1e3),B=e}function l(){d(),f(),H||(H=Date.now())}function c(){H&&(O.clearInterval(z),r(),H=void 0)}function f(){B&&(O.clearInterval(W),o(),B=void 0)}function d(){q&&(O.clearInterval(X),i(),q=void 0)}function h(e){U=F?e-F:e-$}function p(){d(),B||(B=Date.now(),x=!0,c(),d(),W=O.setInterval(o,Q))}function m(){x=!1}function _(){var e=Date.now();void 0===U&&h(e),H||(l(),z=O.setInterval(r,Q))}function v(){x?x=!1:(f(),!q&&U&&(q=Date.now(),te===ee&&G++,X=O.setInterval(i,Q))),c()}function g(){F||(F=Date.now()),N=!1}function b(){F||(d(),f())}function y(){te===ee&&(f(),d(),c(),N=!0,L=!0,C())}function C(){H=0,B=0,q=0,G=0,V=0,K=0,Y=0,W=0,z=0,X=0}function w(){R.addEvent("seeking",p),R.addEvent("seeked",m),R.addEvent("play",g),R.addEvent("canplay",b),R.addEvent("ended",y)}function S(){return!!H}function E(){return!!q}function k(){return!!B}function T(){return N}function D(){var e=A.webkitDroppedFrameCount||A.droppedFrameCount;return void 0!==e?e:0}function P(){return{startupTime:U,rebufferingCount:G,timeSpentRebuffering:Y,timeSpentPlaying:V,timeSpentSeeking:K,droppedFrameCount:D(),endedOnce:L}}function I(){ne=0,te=J}function j(){te=Z}function M(){R.removeEvent("seeking"),R.removeEvent("seeked"),R.removeEvent("play"),R.removeEvent("canplay"),R.removeEvent("ended"),O.clearAll()}(0,a.default)(this,e);var A=t,R=new s.default(A),O=new u,x=!1,N=!1,L=!1,U=void 0,$=n,F=0,H=0,B=0,q=0,G=0,V=0,K=0,Y=0,W=0,z=0,X=0,Q=100,Z="detached",J="attaching",ee="attached",te=ee;w();var ne=0,re=1e3/Q;this.onPlaying=_,this.onWaiting=v,this.onEnded=y,this.isPlaying=S,this.isRebuffering=E,this.isSeeking=k,this.isEnded=T,this.stopBufferingTimestamp=d,this.stopSeekingTimestamp=f,this.getVideoStats=P,this.attach=I,this.detach=j,this.dispose=M,this._incrementBufferingTime=i,this._incrementPlayingTime=r,this._incrementSeekingTime=o};n.default=l,t.exports=n.default},{"./utils/VideoEventHandlers":3,"babel-runtime/helpers/classCallCheck":7,"streamroot-utils-client":65}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("./workaround"),s=function e(t){(0,a.default)(this,e);var n=Date.now(),r=new o.QoSAnalyticsWithWorkaround(t,n);window.StreamRoot=window.StreamRoot||{},window.StreamRoot.getQoSAnalytics=r.getVideoStats.bind(r),this.getQoSAnalytics=r.getVideoStats.bind(r),this.attach=function(){r.attach()},this.detach=function(){r.detach()},this.dispose=function(){r.dispose()}};n.default=s,t.exports=n.default},{"./workaround":4,"babel-runtime/helpers/classCallCheck":7}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("babel-runtime/helpers/createClass"),s=r(o),u=e("babel-runtime/core-js/symbol"),l=r(u),c=(0,l.default)(),f=(0,l.default)(),d=function(){function e(t){(0,a.default)(this,e),this[f]=t,this[c]=[]}return(0,s.default)(e,[{key:"addEvent",value:function(e,t){if(this[c][e])throw new Error("this event has already been registered");this[c][e]=t,this[f].addEventListener(e,t)}},{key:"removeEvent",value:function(e){this[f].removeEventListener(e,this[c][e])}}]),e}();n.default=d,t.exports=n.default},{"babel-runtime/core-js/symbol":6,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.UIStatusEnum=n.videoStatusEnum=n.QoSAnalyticsWithWorkaround=void 0;var i=e("babel-runtime/helpers/classCallCheck"),a=r(i),o=e("./analyticsCalculator"),s=r(o),u=e("./utils/VideoEventHandlers"),l=r(u),c=e("streamroot-utils-client").Timers,f={ENDED:0,PLAYING:1,REBUFFERING:3,SEEKING:4},d={PLAY:0,PAUSE:1},h=function e(t,n){function r(e){clearTimeout(g),v=e}function i(){var e=b.currentTime;w<e?_===f.PLAYING||C.isPlaying()||(C.onPlaying(),_=f.PLAYING):v!==d.PAUSE&&(_===f.REBUFFERING||_===f.SEEKING||C.isRebuffering()||C.isSeeking()||(_=f.REBUFFERING,C.onWaiting())),v===d.PAUSE&&!C.isEnded()&&b.currentTime+.5>=b.duration&&C.onEnded(),w=e}function o(){w=b.currentTime,_=f.SEEKING}function u(){g=setTimeout(function(){r(d.PLAY)},100)}function h(){r(d.PAUSE)}function p(){y.addEvent("seeking",o),y.addEvent("play",u),y.addEvent("pause",h)}(0,a.default)(this,e);var m=new c,_=f.ENDED,v=d.PAUSE,g=void 0,b=t,y=new l.default(b),C=new s.default(b,n),w=b.currentTime;p(),m.setInterval(i,100),this.getVideoStats=function(){return C.getVideoStats()},this.attach=function(){C.attach()},this.detach=function(){C.detach()},this.dispose=function(){y.removeEvent("seeking"),y.removeEvent("play"),y.removeEvent("pause"),C.dispose()},this._analyticsCalculator=C,this._onPlay=u,this._onPause=h,this._onSeeking=o,this._getInterfaceState=function(){return v},this._getVideoState=function(){return _}};n.QoSAnalyticsWithWorkaround=h,n.videoStatusEnum=f,n.UIStatusEnum=d},{"./analyticsCalculator":1,"./utils/VideoEventHandlers":3,"babel-runtime/helpers/classCallCheck":7,"streamroot-utils-client":65}],5:[function(e,t,n){t.exports={default:e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":9}],6:[function(e,t,n){t.exports={default:e("core-js/library/fn/symbol"),__esModule:!0}},{"core-js/library/fn/symbol":10}],7:[function(e,t,n){"use strict";n.__esModule=!0,n.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var i=e("../core-js/object/define-property"),a=r(i);n.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,a.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},{"../core-js/object/define-property":5}],9:[function(e,t,n){e("../../modules/es6.object.define-property");var r=e("../../modules/_core").Object;t.exports=function(e,t,n){return r.defineProperty(e,t,n)}},{"../../modules/_core":15,"../../modules/es6.object.define-property":59}],10:[function(e,t,n){e("../../modules/es6.symbol"),e("../../modules/es6.object.to-string"),e("../../modules/es7.symbol.async-iterator"),e("../../modules/es7.symbol.observable"),t.exports=e("../../modules/_core").Symbol},{"../../modules/_core":15,"../../modules/es6.object.to-string":60,"../../modules/es6.symbol":61,"../../modules/es7.symbol.async-iterator":62,"../../modules/es7.symbol.observable":63}],11:[function(e,t,n){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],12:[function(e,t,n){var r=e("./_is-object");t.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":31}],13:[function(e,t,n){var r=e("./_to-iobject"),i=e("./_to-length"),a=e("./_to-index");t.exports=function(e){return function(t,n,o){var s,u=r(t),l=i(u.length),c=a(o,l);if(e&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((e||c in u)&&u[c]===n)return e||c||0;return!e&&-1}}},{"./_to-index":50,"./_to-iobject":52,"./_to-length":53}],14:[function(e,t,n){var r={}.toString;t.exports=function(e){return r.call(e).slice(8,-1)}},{}],15:[function(e,t,n){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},{}],16:[function(e,t,n){var r=e("./_a-function");t.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":11}],17:[function(e,t,n){t.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},{}],18:[function(e,t,n){t.exports=!e("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":23}],19:[function(e,t,n){var r=e("./_is-object"),i=e("./_global").document,a=r(i)&&r(i.createElement);t.exports=function(e){return a?i.createElement(e):{}}},{"./_global":24,"./_is-object":31}],20:[function(e,t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],21:[function(e,t,n){var r=e("./_object-keys"),i=e("./_object-gops"),a=e("./_object-pie");t.exports=function(e){var t=r(e),n=i.f;if(n)for(var o,s=n(e),u=a.f,l=0;s.length>l;)u.call(e,o=s[l++])&&t.push(o);return t}},{"./_object-gops":41,"./_object-keys":43,"./_object-pie":44}],22:[function(e,t,n){var r=e("./_global"),i=e("./_core"),a=e("./_ctx"),o=e("./_hide"),s="prototype",u=function(e,t,n){var l,c,f,d=e&u.F,h=e&u.G,p=e&u.S,m=e&u.P,_=e&u.B,v=e&u.W,g=h?i:i[t]||(i[t]={}),b=g[s],y=h?r:p?r[t]:(r[t]||{})[s];h&&(n=t);for(l in n)c=!d&&y&&void 0!==y[l],c&&l in g||(f=c?y[l]:n[l],g[l]=h&&"function"!=typeof y[l]?n[l]:_&&c?a(f,r):v&&y[l]==f?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(f):m&&"function"==typeof f?a(Function.call,f):f,m&&((g.virtual||(g.virtual={}))[l]=f,e&u.R&&b&&!b[l]&&o(b,l,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},{"./_core":15,"./_ctx":16,"./_global":24,"./_hide":26}],23:[function(e,t,n){t.exports=function(e){try{return!!e()}catch(e){return!0}}},{}],24:[function(e,t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},{}],25:[function(e,t,n){var r={}.hasOwnProperty;t.exports=function(e,t){return r.call(e,t)}},{}],26:[function(e,t,n){var r=e("./_object-dp"),i=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},{"./_descriptors":18,"./_object-dp":36,"./_property-desc":45}],27:[function(e,t,n){t.exports=e("./_global").document&&document.documentElement},{"./_global":24}],28:[function(e,t,n){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return 7!=Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":18,"./_dom-create":19,"./_fails":23}],29:[function(e,t,n){var r=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},{"./_cof":14}],30:[function(e,t,n){var r=e("./_cof");t.exports=Array.isArray||function(e){return"Array"==r(e)}},{"./_cof":14}],31:[function(e,t,n){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],32:[function(e,t,n){var r=e("./_object-keys"),i=e("./_to-iobject");t.exports=function(e,t){for(var n,a=i(e),o=r(a),s=o.length,u=0;s>u;)if(a[n=o[u++]]===t)return n}},{"./_object-keys":43,"./_to-iobject":52}],33:[function(e,t,n){t.exports=!0},{}],34:[function(e,t,n){var r=e("./_uid")("meta"),i=e("./_is-object"),a=e("./_has"),o=e("./_object-dp").f,s=0,u=Object.isExtensible||function(){return!0},l=!e("./_fails")(function(){return u(Object.preventExtensions({}))}),c=function(e){o(e,r,{value:{i:"O"+ ++s,w:{}}})},f=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!u(e))return"F";if(!t)return"E";c(e)}return e[r].i},d=function(e,t){if(!a(e,r)){if(!u(e))return!0;if(!t)return!1;c(e)}return e[r].w},h=function(e){return l&&p.NEED&&u(e)&&!a(e,r)&&c(e),e},p=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:h}},{"./_fails":23,"./_has":25,"./_is-object":31,"./_object-dp":36,"./_uid":55}],35:[function(e,t,n){var r=e("./_an-object"),i=e("./_object-dps"),a=e("./_enum-bug-keys"),o=e("./_shared-key")("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,n=e("./_dom-create")("iframe"),r=a.length,i="<",o=">";for(n.style.display="none",e("./_html").appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write(i+"script"+o+"document.F=Object"+i+"/script"+o),t.close(),l=t.F;r--;)delete l[u][a[r]];return l()};t.exports=Object.create||function(e,t){var n;return null!==e?(s[u]=r(e),n=new s,s[u]=null,n[o]=e):n=l(),void 0===t?n:i(n,t)}},{"./_an-object":12,"./_dom-create":19,"./_enum-bug-keys":20,"./_html":27,"./_object-dps":37,"./_shared-key":48}],36:[function(e,t,n){var r=e("./_an-object"),i=e("./_ie8-dom-define"),a=e("./_to-primitive"),o=Object.defineProperty;n.f=e("./_descriptors")?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),i)try{return o(e,t,n);
}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},{"./_an-object":12,"./_descriptors":18,"./_ie8-dom-define":28,"./_to-primitive":54}],37:[function(e,t,n){var r=e("./_object-dp"),i=e("./_an-object"),a=e("./_object-keys");t.exports=e("./_descriptors")?Object.defineProperties:function(e,t){i(e);for(var n,o=a(t),s=o.length,u=0;s>u;)r.f(e,n=o[u++],t[n]);return e}},{"./_an-object":12,"./_descriptors":18,"./_object-dp":36,"./_object-keys":43}],38:[function(e,t,n){var r=e("./_object-pie"),i=e("./_property-desc"),a=e("./_to-iobject"),o=e("./_to-primitive"),s=e("./_has"),u=e("./_ie8-dom-define"),l=Object.getOwnPropertyDescriptor;n.f=e("./_descriptors")?l:function(e,t){if(e=a(e),t=o(t,!0),u)try{return l(e,t)}catch(e){}if(s(e,t))return i(!r.f.call(e,t),e[t])}},{"./_descriptors":18,"./_has":25,"./_ie8-dom-define":28,"./_object-pie":44,"./_property-desc":45,"./_to-iobject":52,"./_to-primitive":54}],39:[function(e,t,n){var r=e("./_to-iobject"),i=e("./_object-gopn").f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return o.slice()}};t.exports.f=function(e){return o&&"[object Window]"==a.call(e)?s(e):i(r(e))}},{"./_object-gopn":40,"./_to-iobject":52}],40:[function(e,t,n){var r=e("./_object-keys-internal"),i=e("./_enum-bug-keys").concat("length","prototype");n.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},{"./_enum-bug-keys":20,"./_object-keys-internal":42}],41:[function(e,t,n){n.f=Object.getOwnPropertySymbols},{}],42:[function(e,t,n){var r=e("./_has"),i=e("./_to-iobject"),a=e("./_array-includes")(!1),o=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var n,s=i(e),u=0,l=[];for(n in s)n!=o&&r(s,n)&&l.push(n);for(;t.length>u;)r(s,n=t[u++])&&(~a(l,n)||l.push(n));return l}},{"./_array-includes":13,"./_has":25,"./_shared-key":48,"./_to-iobject":52}],43:[function(e,t,n){var r=e("./_object-keys-internal"),i=e("./_enum-bug-keys");t.exports=Object.keys||function(e){return r(e,i)}},{"./_enum-bug-keys":20,"./_object-keys-internal":42}],44:[function(e,t,n){n.f={}.propertyIsEnumerable},{}],45:[function(e,t,n){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],46:[function(e,t,n){t.exports=e("./_hide")},{"./_hide":26}],47:[function(e,t,n){var r=e("./_object-dp").f,i=e("./_has"),a=e("./_wks")("toStringTag");t.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},{"./_has":25,"./_object-dp":36,"./_wks":58}],48:[function(e,t,n){var r=e("./_shared")("keys"),i=e("./_uid");t.exports=function(e){return r[e]||(r[e]=i(e))}},{"./_shared":49,"./_uid":55}],49:[function(e,t,n){var r=e("./_global"),i="__core-js_shared__",a=r[i]||(r[i]={});t.exports=function(e){return a[e]||(a[e]={})}},{"./_global":24}],50:[function(e,t,n){var r=e("./_to-integer"),i=Math.max,a=Math.min;t.exports=function(e,t){return e=r(e),e<0?i(e+t,0):a(e,t)}},{"./_to-integer":51}],51:[function(e,t,n){var r=Math.ceil,i=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?i:r)(e)}},{}],52:[function(e,t,n){var r=e("./_iobject"),i=e("./_defined");t.exports=function(e){return r(i(e))}},{"./_defined":17,"./_iobject":29}],53:[function(e,t,n){var r=e("./_to-integer"),i=Math.min;t.exports=function(e){return e>0?i(r(e),9007199254740991):0}},{"./_to-integer":51}],54:[function(e,t,n){var r=e("./_is-object");t.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":31}],55:[function(e,t,n){var r=0,i=Math.random();t.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++r+i).toString(36))}},{}],56:[function(e,t,n){var r=e("./_global"),i=e("./_core"),a=e("./_library"),o=e("./_wks-ext"),s=e("./_object-dp").f;t.exports=function(e){var t=i.Symbol||(i.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},{"./_core":15,"./_global":24,"./_library":33,"./_object-dp":36,"./_wks-ext":57}],57:[function(e,t,n){n.f=e("./_wks")},{"./_wks":58}],58:[function(e,t,n){var r=e("./_shared")("wks"),i=e("./_uid"),a=e("./_global").Symbol,o="function"==typeof a,s=t.exports=function(e){return r[e]||(r[e]=o&&a[e]||(o?a:i)("Symbol."+e))};s.store=r},{"./_global":24,"./_shared":49,"./_uid":55}],59:[function(e,t,n){var r=e("./_export");r(r.S+r.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":18,"./_export":22,"./_object-dp":36}],60:[function(e,t,n){},{}],61:[function(e,t,n){"use strict";var r=e("./_global"),i=e("./_has"),a=e("./_descriptors"),o=e("./_export"),s=e("./_redefine"),u=e("./_meta").KEY,l=e("./_fails"),c=e("./_shared"),f=e("./_set-to-string-tag"),d=e("./_uid"),h=e("./_wks"),p=e("./_wks-ext"),m=e("./_wks-define"),_=e("./_keyof"),v=e("./_enum-keys"),g=e("./_is-array"),b=e("./_an-object"),y=e("./_to-iobject"),C=e("./_to-primitive"),w=e("./_property-desc"),S=e("./_object-create"),E=e("./_object-gopn-ext"),k=e("./_object-gopd"),T=e("./_object-dp"),D=e("./_object-keys"),P=k.f,I=T.f,j=E.f,M=r.Symbol,A=r.JSON,R=A&&A.stringify,O="prototype",x=h("_hidden"),N=h("toPrimitive"),L={}.propertyIsEnumerable,U=c("symbol-registry"),$=c("symbols"),F=c("op-symbols"),H=Object[O],B="function"==typeof M,q=r.QObject,G=!q||!q[O]||!q[O].findChild,V=a&&l(function(){return 7!=S(I({},"a",{get:function(){return I(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=P(H,t);r&&delete H[t],I(e,t,n),r&&e!==H&&I(H,t,r)}:I,K=function(e){var t=$[e]=S(M[O]);return t._k=e,t},Y=B&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},W=function(e,t,n){return e===H&&W(F,t,n),b(e),t=C(t,!0),b(n),i($,t)?(n.enumerable?(i(e,x)&&e[x][t]&&(e[x][t]=!1),n=S(n,{enumerable:w(0,!1)})):(i(e,x)||I(e,x,w(1,{})),e[x][t]=!0),V(e,t,n)):I(e,t,n)},z=function(e,t){b(e);for(var n,r=v(t=y(t)),i=0,a=r.length;a>i;)W(e,n=r[i++],t[n]);return e},X=function(e,t){return void 0===t?S(e):z(S(e),t)},Q=function(e){var t=L.call(this,e=C(e,!0));return!(this===H&&i($,e)&&!i(F,e))&&(!(t||!i(this,e)||!i($,e)||i(this,x)&&this[x][e])||t)},Z=function(e,t){if(e=y(e),t=C(t,!0),e!==H||!i($,t)||i(F,t)){var n=P(e,t);return!n||!i($,t)||i(e,x)&&e[x][t]||(n.enumerable=!0),n}},J=function(e){for(var t,n=j(y(e)),r=[],a=0;n.length>a;)i($,t=n[a++])||t==x||t==u||r.push(t);return r},ee=function(e){for(var t,n=e===H,r=j(n?F:y(e)),a=[],o=0;r.length>o;)!i($,t=r[o++])||n&&!i(H,t)||a.push($[t]);return a};B||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(n){this===H&&t.call(F,n),i(this,x)&&i(this[x],e)&&(this[x][e]=!1),V(this,e,w(1,n))};return a&&G&&V(H,e,{configurable:!0,set:t}),K(e)},s(M[O],"toString",function(){return this._k}),k.f=Z,T.f=W,e("./_object-gopn").f=E.f=J,e("./_object-pie").f=Q,e("./_object-gops").f=ee,a&&!e("./_library")&&s(H,"propertyIsEnumerable",Q,!0),p.f=function(e){return K(h(e))}),o(o.G+o.W+o.F*!B,{Symbol:M});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)h(te[ne++]);for(var te=D(h.store),ne=0;te.length>ne;)m(te[ne++]);o(o.S+o.F*!B,"Symbol",{for:function(e){return i(U,e+="")?U[e]:U[e]=M(e)},keyFor:function(e){if(Y(e))return _(U,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){G=!0},useSimple:function(){G=!1}}),o(o.S+o.F*!B,"Object",{create:X,defineProperty:W,defineProperties:z,getOwnPropertyDescriptor:Z,getOwnPropertyNames:J,getOwnPropertySymbols:ee}),A&&o(o.S+o.F*(!B||l(function(){var e=M();return"[null]"!=R([e])||"{}"!=R({a:e})||"{}"!=R(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!Y(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&g(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!Y(t))return t}),r[1]=t,R.apply(A,r)}}}),M[O][N]||e("./_hide")(M[O],N,M[O].valueOf),f(M,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},{"./_an-object":12,"./_descriptors":18,"./_enum-keys":21,"./_export":22,"./_fails":23,"./_global":24,"./_has":25,"./_hide":26,"./_is-array":30,"./_keyof":32,"./_library":33,"./_meta":34,"./_object-create":35,"./_object-dp":36,"./_object-gopd":38,"./_object-gopn":40,"./_object-gopn-ext":39,"./_object-gops":41,"./_object-keys":43,"./_object-pie":44,"./_property-desc":45,"./_redefine":46,"./_set-to-string-tag":47,"./_shared":49,"./_to-iobject":52,"./_to-primitive":54,"./_uid":55,"./_wks":58,"./_wks-define":56,"./_wks-ext":57}],62:[function(e,t,n){e("./_wks-define")("asyncIterator")},{"./_wks-define":56}],63:[function(e,t,n){e("./_wks-define")("observable")},{"./_wks-define":56}],64:[function(e,t,n){var r=function(){var e=this,t=[],n=[],r=function(e,n){var r=setTimeout(function(){i(r),e()},n);return t.push(r),r},i=function(e){for(var n in t)if(t[n]===e){clearTimeout(e),t.slice(n,1);break}},a=function(e,t){var r=setInterval(e,t);return n.push(r),r},o=function(e){for(var t in n)if(n[t]===e){clearInterval(e),n.slice(t,1);break}},s=function(){t.forEach(function(e){clearTimeout(e)}),t=[],n.forEach(function(e){clearInterval(e)}),n=[]};e.setTimeout=r,e.clearTimeout=i,e.setInterval=a,e.clearInterval=o,e.clearAll=s};t.exports=r},{}],65:[function(e,t,n){t.exports.Timers=e("./app/Timers")},{"./app/Timers":64}]},{},[2])(2)})}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],225:[function(t,n,r){!function(t,i){"use strict";var a="0.7.10",o="",s="?",u="function",l="undefined",c="object",f="string",d="major",h="model",p="name",m="type",_="vendor",v="version",g="architecture",b="console",y="mobile",C="tablet",w="smarttv",S="wearable",E="embedded",k={extend:function(e,t){for(var n in t)"browser cpu device engine os".indexOf(n)!==-1&&t[n].length%2===0&&(e[n]=t[n].concat(e[n]));return e},has:function(e,t){return"string"==typeof e&&t.toLowerCase().indexOf(e.toLowerCase())!==-1},lowerize:function(e){return e.toLowerCase()},major:function(e){return typeof e===f?e.split(".")[0]:i}},T={rgx:function(){for(var e,t,n,r,a,o,s,f=0,d=arguments;f<d.length&&!o;){var h=d[f],p=d[f+1];if(typeof e===l){e={};for(r in p)p.hasOwnProperty(r)&&(a=p[r],typeof a===c?e[a[0]]=i:e[a]=i)}for(t=n=0;t<h.length&&!o;)if(o=h[t++].exec(this.getUA()))for(r=0;r<p.length;r++)s=o[++n],a=p[r],typeof a===c&&a.length>0?2==a.length?typeof a[1]==u?e[a[0]]=a[1].call(this,s):e[a[0]]=a[1]:3==a.length?typeof a[1]!==u||a[1].exec&&a[1].test?e[a[0]]=s?s.replace(a[1],a[2]):i:e[a[0]]=s?a[1].call(this,s,a[2]):i:4==a.length&&(e[a[0]]=s?a[3].call(this,s.replace(a[1],a[2])):i):e[a]=s?s:i;f+=2}return e},str:function(e,t){for(var n in t)if(typeof t[n]===c&&t[n].length>0){for(var r=0;r<t[n].length;r++)if(k.has(t[n][r],e))return n===s?i:n}else if(k.has(t[n],e))return n===s?i:n;return e}},D={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},P={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[p,v],[/\s(opr)\/([\w\.]+)/i],[[p,"Opera"],v],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],[p,v],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[p,"IE"],v],[/(edge)\/((\d+)?[\w\.]+)/i],[p,v],[/(yabrowser)\/([\w\.]+)/i],[[p,"Yandex"],v],[/(comodo_dragon)\/([\w\.]+)/i],[[p,/_/g," "],v],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(qqbrowser)[\/\s]?([\w\.]+)/i],[p,v],[/(uc\s?browser)[\/\s]?([\w\.]+)/i,/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,/JUC.+(ucweb)[\/\s]?([\w\.]+)/i],[[p,"UCBrowser"],v],[/(dolfin)\/([\w\.]+)/i],[[p,"Dolphin"],v],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[p,"Chrome"],v],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[v,[p,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[v,[p,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[v,[p,"Facebook"]],[/fxios\/([\w\.-]+)/i],[v,[p,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[v,[p,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[v,p],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[p,[v,T.str,D.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[p,v],[/(navigator|netscape)\/([\w\.-]+)/i],[[p,"Netscape"],v],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[p,v]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,k.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[g,/ower/,"",k.lowerize]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[g,k.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[h,_,[m,C]],[/applecoremedia\/[\w\.]+ \((ipad)/],[h,[_,"Apple"],[m,C]],[/(apple\s{0,1}tv)/i],[[h,"Apple TV"],[_,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[_,h,[m,C]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[h,[_,"Amazon"],[m,C]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[h,T.str,D.device.amazon.model],[_,"Amazon"],[m,y]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[h,_,[m,y]],[/\((ip[honed|\s\w*]+);/i],[h,[_,"Apple"],[m,y]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[_,h,[m,y]],[/\(bb10;\s(\w+)/i],[h,[_,"BlackBerry"],[m,y]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[h,[_,"Asus"],[m,C]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[_,"Sony"],[h,"Xperia Tablet"],[m,C]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[[_,"Sony"],[h,"Xperia Phone"],[m,y]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[_,h,[m,b]],[/android.+;\s(shield)\sbuild/i],[h,[_,"Nvidia"],[m,b]],[/(playstation\s[34portablevi]+)/i],[h,[_,"Sony"],[m,b]],[/(sprint\s(\w+))/i],[[_,T.str,D.device.sprint.vendor],[h,T.str,D.device.sprint.model],[m,y]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[_,h,[m,C]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[_,[h,/_/g," "],[m,y]],[/(nexus\s9)/i],[h,[_,"HTC"],[m,C]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[h,[_,"Microsoft"],[m,b]],[/(kin\.[onetw]{3})/i],[[h,/\./g," "],[_,"Microsoft"],[m,y]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i,/(nexus\s[6])/i],[h,[_,"Motorola"],[m,y]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[h,[_,"Motorola"],[m,C]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[_,"Samsung"],h,[m,C]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[_,"Samsung"],h,[m,y]],[/(samsung);smarttv/i],[_,h,[m,w]],[/\(dtv[\);].+(aquos)/i],[h,[_,"Sharp"],[m,w]],[/sie-(\w+)*/i],[h,[_,"Siemens"],[m,y]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[_,"Nokia"],h,[m,y]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[h,[_,"Acer"],[m,C]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[_,"LG"],h,[m,C]],[/(lg) netcast\.tv/i],[_,h,[m,w]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[h,[_,"LG"],[m,y]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[h,[_,"Lenovo"],[m,C]],[/linux;.+((jolla));/i],[_,h,[m,y]],[/((pebble))app\/[\d\.]+\s/i],[_,h,[m,S]],[/android.+;\s(glass)\s\d/i],[h,[_,"Google"],[m,S]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],[[h,/_/g," "],[_,"Xiaomi"],[m,y]],[/\s(tablet)[;\/\s]/i,/\s(mobile)[;\/\s]/i],[[m,k.lowerize],_,h]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[v,[p,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[p,v],[/rv\:([\w\.]+).*(gecko)/i],[v,p]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[p,v],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[p,[v,T.str,D.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[p,"Windows"],[v,T.str,D.os.windows.version]],[/\((bb)(10);/i],[[p,"BlackBerry"],v],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[p,v],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[p,"Symbian"],v],[/\((series40);/i],[p],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[p,"Firefox OS"],v],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[p,v],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[p,"Chromium OS"],v],[/(sunos)\s?([\w\.]+\d)*/i],[[p,"Solaris"],v],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[p,v],[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],[[p,"iOS"],[v,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[p,"Mac OS"],[v,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[p,v]]},I=function(e,n){if(!(this instanceof I))return new I(e,n).getResult();var r=e||(t&&t.navigator&&t.navigator.userAgent?t.navigator.userAgent:o),i=n?k.extend(P,n):P;return this.getBrowser=function(){var e=T.rgx.apply(this,i.browser);return e.major=k.major(e.version),e},this.getCPU=function(){return T.rgx.apply(this,i.cpu)},this.getDevice=function(){return T.rgx.apply(this,i.device)},this.getEngine=function(){return T.rgx.apply(this,i.engine)},this.getOS=function(){return T.rgx.apply(this,i.os)},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return r},this.setUA=function(e){return r=e,this},this.setUA(r),this};I.VERSION=a,I.BROWSER={NAME:p,MAJOR:d,VERSION:v},I.CPU={ARCHITECTURE:g},I.DEVICE={MODEL:h,VENDOR:_,TYPE:m,CONSOLE:b,MOBILE:y,SMARTTV:w,TABLET:C,WEARABLE:S,EMBEDDED:E},I.ENGINE={NAME:p,VERSION:v},I.OS={NAME:p,VERSION:v},typeof r!==l?(typeof n!==l&&n.exports&&(r=n.exports=I),r.UAParser=I):typeof e===u&&e.amd?e(function(){return I}):t.UAParser=I;var j=t.jQuery||t.Zepto;if(typeof j!==l){var M=new I;j.ua=M.getResult(),j.ua.get=function(){return M.getUA()},j.ua.set=function(e){M.setUA(e);var t=M.getResult();for(var n in t)j.ua[n]=t[n]}}}("object"==typeof window?window:this)},{}],226:[function(t,n,r){(function(){function t(e){function t(t,n,r,i,a,o){for(;a>=0&&a<o;a+=e){var s=i?i[a]:a;r=n(r,t[s],s,t)}return r}return function(n,r,i,a){r=w(r,a,4);var o=!I(n)&&C.keys(n),s=(o||n).length,u=e>0?0:s-1;return arguments.length<3&&(i=n[o?o[u]:u],u+=e),t(n,r,i,o,u,s)}}function i(e){return function(t,n,r){n=S(n,r);for(var i=P(t),a=e>0?0:i-1;a>=0&&a<i;a+=e)if(n(t[a],a,t))return a;return-1}}function a(e,t,n){return function(r,i,a){var o=0,s=P(r);if("number"==typeof a)e>0?o=a>=0?a:Math.max(a+s,o):s=a>=0?Math.min(a+1,s):a+s+1;else if(n&&a&&s)return a=n(r,i),r[a]===i?a:-1;if(i!==i)return a=t(h.call(r,o,s),C.isNaN),a>=0?a+o:-1;for(a=e>0?o:s-1;a>=0&&a<s;a+=e)if(r[a]===i)return a;return-1}}function o(e,t){var n=O.length,r=e.constructor,i=C.isFunction(r)&&r.prototype||c,a="constructor";for(C.has(e,a)&&!C.contains(t,a)&&t.push(a);n--;)a=O[n],a in e&&e[a]!==i[a]&&!C.contains(t,a)&&t.push(a)}var s=this,u=s._,l=Array.prototype,c=Object.prototype,f=Function.prototype,d=l.push,h=l.slice,p=c.toString,m=c.hasOwnProperty,_=Array.isArray,v=Object.keys,g=f.bind,b=Object.create,y=function(){},C=function(e){return e instanceof C?e:this instanceof C?void(this._wrapped=e):new C(e)};"undefined"!=typeof r?("undefined"!=typeof n&&n.exports&&(r=n.exports=C),r._=C):s._=C,C.VERSION="1.8.3";var w=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,a){return e.call(t,n,r,i,a)}}return function(){return e.apply(t,arguments)}},S=function(e,t,n){return null==e?C.identity:C.isFunction(e)?w(e,t,n):C.isObject(e)?C.matcher(e):C.property(e)};C.iteratee=function(e,t){return S(e,t,1/0)};var E=function(e,t){return function(n){var r=arguments.length;if(r<2||null==n)return n;for(var i=1;i<r;i++)for(var a=arguments[i],o=e(a),s=o.length,u=0;u<s;u++){var l=o[u];t&&void 0!==n[l]||(n[l]=a[l])}return n}},k=function(e){if(!C.isObject(e))return{};if(b)return b(e);y.prototype=e;var t=new y;return y.prototype=null,t},T=function(e){return function(t){return null==t?void 0:t[e]}},D=Math.pow(2,53)-1,P=T("length"),I=function(e){var t=P(e);return"number"==typeof t&&t>=0&&t<=D};C.each=C.forEach=function(e,t,n){t=w(t,n);var r,i;if(I(e))for(r=0,i=e.length;r<i;r++)t(e[r],r,e);else{var a=C.keys(e);for(r=0,i=a.length;r<i;r++)t(e[a[r]],a[r],e)}return e},C.map=C.collect=function(e,t,n){t=S(t,n);for(var r=!I(e)&&C.keys(e),i=(r||e).length,a=Array(i),o=0;o<i;o++){var s=r?r[o]:o;a[o]=t(e[s],s,e)}return a},C.reduce=C.foldl=C.inject=t(1),C.reduceRight=C.foldr=t(-1),C.find=C.detect=function(e,t,n){var r;if(r=I(e)?C.findIndex(e,t,n):C.findKey(e,t,n),void 0!==r&&r!==-1)return e[r]},C.filter=C.select=function(e,t,n){var r=[];return t=S(t,n),C.each(e,function(e,n,i){t(e,n,i)&&r.push(e)}),r},C.reject=function(e,t,n){return C.filter(e,C.negate(S(t)),n)},C.every=C.all=function(e,t,n){t=S(t,n);for(var r=!I(e)&&C.keys(e),i=(r||e).length,a=0;a<i;a++){var o=r?r[a]:a;if(!t(e[o],o,e))return!1}return!0},C.some=C.any=function(e,t,n){t=S(t,n);for(var r=!I(e)&&C.keys(e),i=(r||e).length,a=0;a<i;a++){var o=r?r[a]:a;if(t(e[o],o,e))return!0}return!1},C.contains=C.includes=C.include=function(e,t,n,r){return I(e)||(e=C.values(e)),("number"!=typeof n||r)&&(n=0),C.indexOf(e,t,n)>=0},C.invoke=function(e,t){var n=h.call(arguments,2),r=C.isFunction(t);return C.map(e,function(e){var i=r?t:e[t];return null==i?i:i.apply(e,n)})},C.pluck=function(e,t){return C.map(e,C.property(t))},C.where=function(e,t){return C.filter(e,C.matcher(t))},C.findWhere=function(e,t){return C.find(e,C.matcher(t))},C.max=function(e,t,n){var r,i,a=-(1/0),o=-(1/0);if(null==t&&null!=e){e=I(e)?e:C.values(e);for(var s=0,u=e.length;s<u;s++)r=e[s],r>a&&(a=r)}else t=S(t,n),C.each(e,function(e,n,r){i=t(e,n,r),(i>o||i===-(1/0)&&a===-(1/0))&&(a=e,o=i)});return a},C.min=function(e,t,n){var r,i,a=1/0,o=1/0;if(null==t&&null!=e){e=I(e)?e:C.values(e);for(var s=0,u=e.length;s<u;s++)r=e[s],r<a&&(a=r)}else t=S(t,n),C.each(e,function(e,n,r){i=t(e,n,r),(i<o||i===1/0&&a===1/0)&&(a=e,o=i)});return a},C.shuffle=function(e){for(var t,n=I(e)?e:C.values(e),r=n.length,i=Array(r),a=0;a<r;a++)t=C.random(0,a),t!==a&&(i[a]=i[t]),i[t]=n[a];return i},C.sample=function(e,t,n){return null==t||n?(I(e)||(e=C.values(e)),e[C.random(e.length-1)]):C.shuffle(e).slice(0,Math.max(0,t))},C.sortBy=function(e,t,n){return t=S(t,n),C.pluck(C.map(e,function(e,n,r){return{value:e,index:n,criteria:t(e,n,r)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};var j=function(e){return function(t,n,r){var i={};return n=S(n,r),C.each(t,function(r,a){var o=n(r,a,t);e(i,r,o)}),i}};C.groupBy=j(function(e,t,n){C.has(e,n)?e[n].push(t):e[n]=[t]}),C.indexBy=j(function(e,t,n){e[n]=t}),C.countBy=j(function(e,t,n){C.has(e,n)?e[n]++:e[n]=1}),C.toArray=function(e){return e?C.isArray(e)?h.call(e):I(e)?C.map(e,C.identity):C.values(e):[]},C.size=function(e){return null==e?0:I(e)?e.length:C.keys(e).length},C.partition=function(e,t,n){t=S(t,n);var r=[],i=[];return C.each(e,function(e,n,a){(t(e,n,a)?r:i).push(e)}),[r,i]},C.first=C.head=C.take=function(e,t,n){if(null!=e)return null==t||n?e[0]:C.initial(e,e.length-t)},C.initial=function(e,t,n){return h.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},C.last=function(e,t,n){if(null!=e)return null==t||n?e[e.length-1]:C.rest(e,Math.max(0,e.length-t))},C.rest=C.tail=C.drop=function(e,t,n){return h.call(e,null==t||n?1:t)},C.compact=function(e){return C.filter(e,C.identity)};var M=function(e,t,n,r){for(var i=[],a=0,o=r||0,s=P(e);o<s;o++){var u=e[o];if(I(u)&&(C.isArray(u)||C.isArguments(u))){t||(u=M(u,t,n));var l=0,c=u.length;for(i.length+=c;l<c;)i[a++]=u[l++]}else n||(i[a++]=u)}return i};C.flatten=function(e,t){return M(e,t,!1)},C.without=function(e){return C.difference(e,h.call(arguments,1))},C.uniq=C.unique=function(e,t,n,r){C.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=S(n,r));for(var i=[],a=[],o=0,s=P(e);o<s;o++){var u=e[o],l=n?n(u,o,e):u;t?(o&&a===l||i.push(u),a=l):n?C.contains(a,l)||(a.push(l),i.push(u)):C.contains(i,u)||i.push(u)}return i},C.union=function(){return C.uniq(M(arguments,!0,!0))},C.intersection=function(e){for(var t=[],n=arguments.length,r=0,i=P(e);r<i;r++){var a=e[r];if(!C.contains(t,a)){for(var o=1;o<n&&C.contains(arguments[o],a);o++);o===n&&t.push(a)}}return t},C.difference=function(e){var t=M(arguments,!0,!0,1);return C.filter(e,function(e){return!C.contains(t,e)})},C.zip=function(){return C.unzip(arguments)},C.unzip=function(e){for(var t=e&&C.max(e,P).length||0,n=Array(t),r=0;r<t;r++)n[r]=C.pluck(e,r);return n},C.object=function(e,t){for(var n={},r=0,i=P(e);r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},C.findIndex=i(1),C.findLastIndex=i(-1),C.sortedIndex=function(e,t,n,r){n=S(n,r,1);for(var i=n(t),a=0,o=P(e);a<o;){var s=Math.floor((a+o)/2);n(e[s])<i?a=s+1:o=s}return a},C.indexOf=a(1,C.findIndex,C.sortedIndex),C.lastIndexOf=a(-1,C.findLastIndex),C.range=function(e,t,n){null==t&&(t=e||0,e=0),n=n||1;for(var r=Math.max(Math.ceil((t-e)/n),0),i=Array(r),a=0;a<r;a++,e+=n)i[a]=e;return i};var A=function(e,t,n,r,i){if(!(r instanceof t))return e.apply(n,i);var a=k(e.prototype),o=e.apply(a,i);return C.isObject(o)?o:a};C.bind=function(e,t){if(g&&e.bind===g)return g.apply(e,h.call(arguments,1));if(!C.isFunction(e))throw new TypeError("Bind must be called on a function");var n=h.call(arguments,2),r=function(){return A(e,r,t,this,n.concat(h.call(arguments)))};return r},C.partial=function(e){var t=h.call(arguments,1),n=function(){for(var r=0,i=t.length,a=Array(i),o=0;o<i;o++)a[o]=t[o]===C?arguments[r++]:t[o];for(;r<arguments.length;)a.push(arguments[r++]);return A(e,n,this,this,a)};return n},C.bindAll=function(e){var t,n,r=arguments.length;if(r<=1)throw new Error("bindAll must be passed function names");for(t=1;t<r;t++)n=arguments[t],e[n]=C.bind(e[n],e);return e},C.memoize=function(e,t){var n=function(r){var i=n.cache,a=""+(t?t.apply(this,arguments):r);return C.has(i,a)||(i[a]=e.apply(this,arguments)),i[a]};return n.cache={},n},C.delay=function(e,t){var n=h.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},C.defer=C.partial(C.delay,C,1),C.throttle=function(e,t,n){var r,i,a,o=null,s=0;n||(n={});var u=function(){s=n.leading===!1?0:C.now(),o=null,a=e.apply(r,i),o||(r=i=null)};return function(){var l=C.now();s||n.leading!==!1||(s=l);var c=t-(l-s);return r=this,i=arguments,c<=0||c>t?(o&&(clearTimeout(o),o=null),s=l,a=e.apply(r,i),o||(r=i=null)):o||n.trailing===!1||(o=setTimeout(u,c)),a}},C.debounce=function(e,t,n){var r,i,a,o,s,u=function(){var l=C.now()-o;l<t&&l>=0?r=setTimeout(u,t-l):(r=null,n||(s=e.apply(a,i),r||(a=i=null)))};return function(){a=this,i=arguments,o=C.now();var l=n&&!r;return r||(r=setTimeout(u,t)),l&&(s=e.apply(a,i),a=i=null),s}},C.wrap=function(e,t){return C.partial(t,e)},C.negate=function(e){return function(){return!e.apply(this,arguments)}},C.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},C.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},C.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},C.once=C.partial(C.before,2);var R=!{toString:null}.propertyIsEnumerable("toString"),O=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];C.keys=function(e){if(!C.isObject(e))return[];if(v)return v(e);var t=[];for(var n in e)C.has(e,n)&&t.push(n);return R&&o(e,t),t},C.allKeys=function(e){if(!C.isObject(e))return[];var t=[];for(var n in e)t.push(n);return R&&o(e,t),t},C.values=function(e){for(var t=C.keys(e),n=t.length,r=Array(n),i=0;i<n;i++)r[i]=e[t[i]];return r},C.mapObject=function(e,t,n){t=S(t,n);for(var r,i=C.keys(e),a=i.length,o={},s=0;s<a;s++)r=i[s],o[r]=t(e[r],r,e);return o},C.pairs=function(e){for(var t=C.keys(e),n=t.length,r=Array(n),i=0;i<n;i++)r[i]=[t[i],e[t[i]]];return r},C.invert=function(e){for(var t={},n=C.keys(e),r=0,i=n.length;r<i;r++)t[e[n[r]]]=n[r];return t},C.functions=C.methods=function(e){var t=[];for(var n in e)C.isFunction(e[n])&&t.push(n);return t.sort()},C.extend=E(C.allKeys),C.extendOwn=C.assign=E(C.keys),C.findKey=function(e,t,n){t=S(t,n);for(var r,i=C.keys(e),a=0,o=i.length;a<o;a++)if(r=i[a],t(e[r],r,e))return r},C.pick=function(e,t,n){var r,i,a={},o=e;if(null==o)return a;C.isFunction(t)?(i=C.allKeys(o),r=w(t,n)):(i=M(arguments,!1,!1,1),r=function(e,t,n){return t in n},o=Object(o));for(var s=0,u=i.length;s<u;s++){var l=i[s],c=o[l];r(c,l,o)&&(a[l]=c)}return a},C.omit=function(e,t,n){if(C.isFunction(t))t=C.negate(t);else{var r=C.map(M(arguments,!1,!1,1),String);t=function(e,t){return!C.contains(r,t)}}return C.pick(e,t,n)},C.defaults=E(C.allKeys,!0),C.create=function(e,t){var n=k(e);return t&&C.extendOwn(n,t),n},C.clone=function(e){return C.isObject(e)?C.isArray(e)?e.slice():C.extend({},e):e},C.tap=function(e,t){return t(e),e},C.isMatch=function(e,t){var n=C.keys(t),r=n.length;if(null==e)return!r;for(var i=Object(e),a=0;a<r;a++){var o=n[a];if(t[o]!==i[o]||!(o in i))return!1}return!0};var x=function(e,t,n,r){if(e===t)return 0!==e||1/e===1/t;if(null==e||null==t)return e===t;e instanceof C&&(e=e._wrapped),t instanceof C&&(t=t._wrapped);var i=p.call(e);if(i!==p.call(t))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!==+e?+t!==+t:0===+e?1/+e===1/t:+e===+t;case"[object Date]":case"[object Boolean]":return+e===+t}var a="[object Array]"===i;if(!a){if("object"!=typeof e||"object"!=typeof t)return!1;var o=e.constructor,s=t.constructor;if(o!==s&&!(C.isFunction(o)&&o instanceof o&&C.isFunction(s)&&s instanceof s)&&"constructor"in e&&"constructor"in t)return!1}n=n||[],r=r||[];
for(var u=n.length;u--;)if(n[u]===e)return r[u]===t;if(n.push(e),r.push(t),a){if(u=e.length,u!==t.length)return!1;for(;u--;)if(!x(e[u],t[u],n,r))return!1}else{var l,c=C.keys(e);if(u=c.length,C.keys(t).length!==u)return!1;for(;u--;)if(l=c[u],!C.has(t,l)||!x(e[l],t[l],n,r))return!1}return n.pop(),r.pop(),!0};C.isEqual=function(e,t){return x(e,t)},C.isEmpty=function(e){return null==e||(I(e)&&(C.isArray(e)||C.isString(e)||C.isArguments(e))?0===e.length:0===C.keys(e).length)},C.isElement=function(e){return!(!e||1!==e.nodeType)},C.isArray=_||function(e){return"[object Array]"===p.call(e)},C.isObject=function(e){var t=typeof e;return"function"===t||"object"===t&&!!e},C.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(e){C["is"+e]=function(t){return p.call(t)==="[object "+e+"]"}}),C.isArguments(arguments)||(C.isArguments=function(e){return C.has(e,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(C.isFunction=function(e){return"function"==typeof e||!1}),C.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},C.isNaN=function(e){return C.isNumber(e)&&e!==+e},C.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"===p.call(e)},C.isNull=function(e){return null===e},C.isUndefined=function(e){return void 0===e},C.has=function(e,t){return null!=e&&m.call(e,t)},C.noConflict=function(){return s._=u,this},C.identity=function(e){return e},C.constant=function(e){return function(){return e}},C.noop=function(){},C.property=T,C.propertyOf=function(e){return null==e?function(){}:function(t){return e[t]}},C.matcher=C.matches=function(e){return e=C.extendOwn({},e),function(t){return C.isMatch(t,e)}},C.times=function(e,t,n){var r=Array(Math.max(0,e));t=w(t,n,1);for(var i=0;i<e;i++)r[i]=t(i);return r},C.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},C.now=Date.now||function(){return(new Date).getTime()};var N={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},L=C.invert(N),U=function(e){var t=function(t){return e[t]},n="(?:"+C.keys(e).join("|")+")",r=RegExp(n),i=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(i,t):e}};C.escape=U(N),C.unescape=U(L),C.result=function(e,t,n){var r=null==e?void 0:e[t];return void 0===r&&(r=n),C.isFunction(r)?r.call(e):r};var $=0;C.uniqueId=function(e){var t=++$+"";return e?e+t:t},C.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var F=/(.)^/,H={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\u2028|\u2029/g,q=function(e){return"\\"+H[e]};C.template=function(e,t,n){!t&&n&&(t=n),t=C.defaults({},t,C.templateSettings);var r=RegExp([(t.escape||F).source,(t.interpolate||F).source,(t.evaluate||F).source].join("|")+"|$","g"),i=0,a="__p+='";e.replace(r,function(t,n,r,o,s){return a+=e.slice(i,s).replace(B,q),i=s+t.length,n?a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?a+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(a+="';\n"+o+"\n__p+='"),t}),a+="';\n",t.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{var o=new Function(t.variable||"obj","_",a)}catch(e){throw e.source=a,e}var s=function(e){return o.call(this,e,C)},u=t.variable||"obj";return s.source="function("+u+"){\n"+a+"}",s},C.chain=function(e){var t=C(e);return t._chain=!0,t};var G=function(e,t){return e._chain?C(t).chain():t};C.mixin=function(e){C.each(C.functions(e),function(t){var n=C[t]=e[t];C.prototype[t]=function(){var e=[this._wrapped];return d.apply(e,arguments),G(this,n.apply(C,e))}})},C.mixin(C),C.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=l[e];C.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],G(this,n)}}),C.each(["concat","join","slice"],function(e){var t=l[e];C.prototype[e]=function(){return G(this,t.apply(this._wrapped,arguments))}}),C.prototype.value=function(){return this._wrapped},C.prototype.valueOf=C.prototype.toJSON=C.prototype.value,C.prototype.toString=function(){return""+this._wrapped},"function"==typeof e&&e.amd&&e("underscore",[],function(){return C})}).call(this)},{}],227:[function(e,t,n){"use strict";function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(e,t,n){if(e&&l.isObject(e)&&e instanceof r)return e;var i=new r;return i.parse(e,t,n),i}function a(e){return l.isString(e)&&(e=i(e)),e instanceof r?e.format():r.prototype.format.call(e)}function o(e,t){return i(e,!1,!0).resolve(t)}function s(e,t){return e?i(e,!1,!0).resolveObject(t):t}var u=e("punycode"),l=e("./util");n.parse=i,n.resolve=o,n.resolveObject=s,n.format=a,n.Url=r;var c=/^([a-z0-9.+-]+:)/i,f=/:[0-9]*$/,d=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,h=["<",">",'"',"`"," ","\r","\n","\t"],p=["{","}","|","\\","^","`"].concat(h),m=["'"].concat(p),_=["%","/","?",";","#"].concat(m),v=["/","?","#"],g=255,b=/^[+a-z0-9A-Z_-]{0,63}$/,y=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,C={javascript:!0,"javascript:":!0},w={javascript:!0,"javascript:":!0},S={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},E=e("querystring");r.prototype.parse=function(e,t,n){if(!l.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var r=e.indexOf("?"),i=r!==-1&&r<e.indexOf("#")?"?":"#",a=e.split(i),o=/\\/g;a[0]=a[0].replace(o,"/"),e=a.join(i);var s=e;if(s=s.trim(),!n&&1===e.split("#").length){var f=d.exec(s);if(f)return this.path=s,this.href=s,this.pathname=f[1],f[2]?(this.search=f[2],t?this.query=E.parse(this.search.substr(1)):this.query=this.search.substr(1)):t&&(this.search="",this.query={}),this}var h=c.exec(s);if(h){h=h[0];var p=h.toLowerCase();this.protocol=p,s=s.substr(h.length)}if(n||h||s.match(/^\/\/[^@\/]+@[^@\/]+/)){var k="//"===s.substr(0,2);!k||h&&w[h]||(s=s.substr(2),this.slashes=!0)}if(!w[h]&&(k||h&&!S[h])){for(var T=-1,D=0;D<v.length;D++){var P=s.indexOf(v[D]);P!==-1&&(T===-1||P<T)&&(T=P)}var I,j;j=T===-1?s.lastIndexOf("@"):s.lastIndexOf("@",T),j!==-1&&(I=s.slice(0,j),s=s.slice(j+1),this.auth=decodeURIComponent(I)),T=-1;for(var D=0;D<_.length;D++){var P=s.indexOf(_[D]);P!==-1&&(T===-1||P<T)&&(T=P)}T===-1&&(T=s.length),this.host=s.slice(0,T),s=s.slice(T),this.parseHost(),this.hostname=this.hostname||"";var M="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!M)for(var A=this.hostname.split(/\./),D=0,R=A.length;D<R;D++){var O=A[D];if(O&&!O.match(b)){for(var x="",N=0,L=O.length;N<L;N++)x+=O.charCodeAt(N)>127?"x":O[N];if(!x.match(b)){var U=A.slice(0,D),$=A.slice(D+1),F=O.match(y);F&&(U.push(F[1]),$.unshift(F[2])),$.length&&(s="/"+$.join(".")+s),this.hostname=U.join(".");break}}}this.hostname.length>g?this.hostname="":this.hostname=this.hostname.toLowerCase(),M||(this.hostname=u.toASCII(this.hostname));var H=this.port?":"+this.port:"",B=this.hostname||"";this.host=B+H,this.href+=this.host,M&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==s[0]&&(s="/"+s))}if(!C[p])for(var D=0,R=m.length;D<R;D++){var q=m[D];if(s.indexOf(q)!==-1){var G=encodeURIComponent(q);G===q&&(G=escape(q)),s=s.split(q).join(G)}}var V=s.indexOf("#");V!==-1&&(this.hash=s.substr(V),s=s.slice(0,V));var K=s.indexOf("?");if(K!==-1?(this.search=s.substr(K),this.query=s.substr(K+1),t&&(this.query=E.parse(this.query)),s=s.slice(0,K)):t&&(this.search="",this.query={}),s&&(this.pathname=s),S[p]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var H=this.pathname||"",Y=this.search||"";this.path=H+Y}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,a="";this.host?i=e+this.host:this.hostname&&(i=e+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&l.isObject(this.query)&&Object.keys(this.query).length&&(a=E.stringify(this.query));var o=this.search||a&&"?"+a||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||S[t])&&i!==!1?(i="//"+(i||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),o&&"?"!==o.charAt(0)&&(o="?"+o),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),o=o.replace("#","%23"),t+i+n+o+r},r.prototype.resolve=function(e){return this.resolveObject(i(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(l.isString(e)){var t=new r;t.parse(e,!1,!0),e=t}for(var n=new r,i=Object.keys(this),a=0;a<i.length;a++){var o=i[a];n[o]=this[o]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var s=Object.keys(e),u=0;u<s.length;u++){var c=s[u];"protocol"!==c&&(n[c]=e[c])}return S[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!S[e.protocol]){for(var f=Object.keys(e),d=0;d<f.length;d++){var h=f[d];n[h]=e[h]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||w[e.protocol])n.pathname=e.pathname;else{for(var p=(e.pathname||"").split("/");p.length&&!(e.host=p.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),n.pathname=p.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var m=n.pathname||"",_=n.search||"";n.path=m+_}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var v=n.pathname&&"/"===n.pathname.charAt(0),g=e.host||e.pathname&&"/"===e.pathname.charAt(0),b=g||v||n.host&&e.pathname,y=b,C=n.pathname&&n.pathname.split("/")||[],p=e.pathname&&e.pathname.split("/")||[],E=n.protocol&&!S[n.protocol];if(E&&(n.hostname="",n.port=null,n.host&&(""===C[0]?C[0]=n.host:C.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===p[0]?p[0]=e.host:p.unshift(e.host)),e.host=null),b=b&&(""===p[0]||""===C[0])),g)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,C=p;else if(p.length)C||(C=[]),C.pop(),C=C.concat(p),n.search=e.search,n.query=e.query;else if(!l.isNullOrUndefined(e.search)){if(E){n.hostname=n.host=C.shift();var k=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");k&&(n.auth=k.shift(),n.host=n.hostname=k.shift())}return n.search=e.search,n.query=e.query,l.isNull(n.pathname)&&l.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!C.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var T=C.slice(-1)[0],D=(n.host||e.host||C.length>1)&&("."===T||".."===T)||""===T,P=0,I=C.length;I>=0;I--)T=C[I],"."===T?C.splice(I,1):".."===T?(C.splice(I,1),P++):P&&(C.splice(I,1),P--);if(!b&&!y)for(;P--;P)C.unshift("..");!b||""===C[0]||C[0]&&"/"===C[0].charAt(0)||C.unshift(""),D&&"/"!==C.join("/").substr(-1)&&C.push("");var j=""===C[0]||C[0]&&"/"===C[0].charAt(0);if(E){n.hostname=n.host=j?"":C.length?C.shift():"";var k=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");k&&(n.auth=k.shift(),n.host=n.hostname=k.shift())}return b=b||n.host&&C.length,b&&!j&&C.unshift(""),C.length?n.pathname=C.join("/"):(n.pathname=null,n.path=null),l.isNull(n.pathname)&&l.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=f.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{"./util":228,punycode:220,querystring:223}],228:[function(e,t,n){"use strict";t.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}},{}],229:[function(e,t,n){(function(e){var n;if(e.crypto&&crypto.getRandomValues){var r=new Uint8Array(16);n=function(){return crypto.getRandomValues(r),r}}if(!n){var i=new Array(16);n=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}t.exports=n}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],230:[function(e,t,n){function r(e,t,n){var r=t&&n||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){i<16&&(t[r+i++]=l[e])});i<16;)t[r+i++]=0;return t}function i(e,t){var n=t||0,r=u;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}function a(e,t,n){var r=t&&n||0,a=t||[];e=e||{};var o=void 0!==e.clockseq?e.clockseq:h,s=void 0!==e.msecs?e.msecs:(new Date).getTime(),u=void 0!==e.nsecs?e.nsecs:m+1,l=s-p+(u-m)/1e4;if(l<0&&void 0===e.clockseq&&(o=o+1&16383),(l<0||s>p)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");p=s,m=u,h=o,s+=122192928e5;var c=(1e4*(268435455&s)+u)%4294967296;a[r++]=c>>>24&255,a[r++]=c>>>16&255,a[r++]=c>>>8&255,a[r++]=255&c;var f=s/4294967296*1e4&268435455;a[r++]=f>>>8&255,a[r++]=255&f,a[r++]=f>>>24&15|16,a[r++]=f>>>16&255,a[r++]=o>>>8|128,a[r++]=255&o;for(var _=e.node||d,v=0;v<6;v++)a[r+v]=_[v];return t?t:i(a)}function o(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var a=e.random||(e.rng||s)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var o=0;o<16;o++)t[r+o]=a[o];return t||i(a)}for(var s=e("./rng"),u=[],l={},c=0;c<256;c++)u[c]=(c+256).toString(16).substr(1),l[u[c]]=c;var f=s(),d=[1|f[0],f[1],f[2],f[3],f[4],f[5]],h=16383&(f[6]<<8|f[7]),p=0,m=0,_=o;_.v1=a,_.v4=o,_.parse=r,_.unparse=i,t.exports=_},{"./rng":229}]},{},[37])(37)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[17])(17)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],8:[function(require,module,exports){
(function (global){
/**
 * @file chromecast-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var ControlBar = _videoJs2['default'].getComponent('ControlBar');
var Button = _videoJs2['default'].getComponent('Button');

/**
 * The base class for buttons that toggle chromecast video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class ChromeCastButton
 */

var ChromeCastButton = (function (_Button) {
    _inherits(ChromeCastButton, _Button);

    function ChromeCastButton(player, options) {
        _classCallCheck(this, ChromeCastButton);

        _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'constructor', this).call(this, player, options);
        this.hide();
        this.initializeApi();
        player.chromecast = this;
    }

    /**
     * Init chromecast sdk api
     *
     * @method initializeApi
     */

    _createClass(ChromeCastButton, [{
        key: 'initializeApi',
        value: function initializeApi() {
            var apiConfig = undefined;
            var appId = undefined;
            var sessionRequest = undefined;

            if (!_videoJs2['default'].browser.IS_CHROME || _videoJs2['default'].browser.IS_EDGE) {
                return;
            }
            if (!chrome.cast || !chrome.cast.isAvailable) {
                _videoJs2['default'].log('Cast APIs not available');
                if (this.tryingReconnect < 10) {
                    this.setTimeout(this.initializeApi, 1000);
                    ++this.tryingReconnect;
                }
                _videoJs2['default'].log('Cast APIs not available. Max reconnect attempt');
                return;
            }

            _videoJs2['default'].log('Cast APIs are available');
            appId = this.options_.appId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
            sessionRequest = new chrome.cast.SessionRequest(appId);
            apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener.bind(this), this.receiverListener.bind(this));
            return chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.castError.bind(this));
        }
    }, {
        key: 'castError',
        value: function castError(_castError) {

            var error = {
                code: _castError.code,
                message: _castError.description
            };

            switch (_castError.code) {
                case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
                case chrome.cast.ErrorCode.EXTENSION_MISSING:
                case chrome.cast.ErrorCode.EXTENSION_NOT_COMPATIBLE:
                case chrome.cast.ErrorCode.INVALID_PARAMETER:
                case chrome.cast.ErrorCode.LOAD_MEDIA_FAILED:
                case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
                case chrome.cast.ErrorCode.SESSION_ERROR:
                case chrome.cast.ErrorCode.CHANNEL_ERROR:
                case chrome.cast.ErrorCode.TIMEOUT:
                    this.addClass('error');
                    break;
                case chrome.cast.ErrorCode.CANCEL:
                    break;
                default:
                    this.player_.error(error);
                    break;
            }
            return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(_castError));
        }
    }, {
        key: 'onInitSuccess',
        value: function onInitSuccess() {
            return this.apiInitialized = true;
        }
    }, {
        key: 'sessionJoinedListener',
        value: function sessionJoinedListener(session) {
            if (session.media.length) {
                this.apiSession = session;
                this.onMediaDiscovered(session.media[0]);
            }
            return console.log('Session joined');
        }
    }, {
        key: 'receiverListener',
        value: function receiverListener(availability) {
            if (availability === 'available') {
                return this.show();
            }
        }
    }, {
        key: 'doLaunch',
        value: function doLaunch() {
            _videoJs2['default'].log('Cast video: ' + this.player_.cache_.src);
            if (this.apiInitialized) {
                return chrome.cast.requestSession(this.onSessionSuccess.bind(this), this.castError.bind(this));
            } else {
                return _videoJs2['default'].log('Session not initialized');
            }
        }
    }, {
        key: 'onSessionSuccess',
        value: function onSessionSuccess(session) {
            var image = undefined;
            var key = undefined;
            var loadRequest = undefined;
            var mediaInfo = undefined;
            var ref = undefined;
            var value = undefined;

            this.apiSession = session;
            var source = this.player_.cache_.src;
            var type = this.player_.currentType();

            _videoJs2['default'].log('Session initialized: ' + session.sessionId + ' source : ' + source + ' type : ' + type);

            mediaInfo = new chrome.cast.media.MediaInfo(source, type);
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            if (this.options_.metadata) {
                ref = this.options_.metadata;
                for (key in ref) {
                    value = ref[key];
                    mediaInfo.metadata[key] = value;
                }
            }
            //Add poster image on player
            var poster = this.player().poster();
            if (poster) {
                image = new chrome.cast.Image(poster);
                mediaInfo.metadata.images = [image];
            }

            // Load/Add caption tracks
            var plTracks = this.player().textTracks();
            var remotePlTracks = this.player().remoteTextTrackEls();
            var tracks = [];
            var i = 0;
            var remotePlTrack = undefined;
            var plTrack = undefined;
            var trackId = 0;
            var track = undefined;
            if (plTracks) {
                for (i = 0; i < plTracks.length; i++) {
                    plTrack = plTracks.tracks_[i];
                    remotePlTrack = remotePlTracks && remotePlTracks.trackElements_ && remotePlTracks.trackElements_[i];
                    trackId++;
                    track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
                    track.trackContentId = remotePlTrack ? remotePlTrack.src : 'caption_' + plTrack.language;
                    track.subtype = chrome.cast.media.TextTrackType.CAPTIONS;
                    track.name = plTrack.label;
                    track.language = plTrack.language;
                    track.customData = null;
                    tracks.push(track);
                }
                mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
                mediaInfo.textTrackStyle.foregroundColor = '#FFFFFF';
                mediaInfo.textTrackStyle.backgroundColor = '#00000060';
                mediaInfo.textTrackStyle.edgeType = chrome.cast.media.TextTrackEdgeType.DROP_SHADOW;
                mediaInfo.textTrackStyle.windowType = chrome.cast.media.TextTrackWindowType.ROUNDED_CORNERS;
            }
            // Load/Add audio tracks

            try {
                plTracks = this.player().audioTracks();
                if (plTracks) {
                    for (i = 0; i < plTracks.length; i++) {
                        plTrack = plTracks.tracks_[i];
                        trackId++;
                        track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.AUDIO);
                        track.subtype = null;
                        track.name = plTrack.label;
                        track.language = plTrack.language;
                        track.customData = null;
                        tracks.push(track);
                    }
                }
            } catch (e) {
                _videoJs2['default'].log('get player audioTracks fail' + e);
            }

            if (tracks.length) {
                mediaInfo.tracks = tracks;
            }

            // Request load media source
            loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

            loadRequest.autoplay = true;
            loadRequest.currentTime = this.player_.currentTime();

            this.apiSession.loadMedia(loadRequest, this.onMediaDiscovered.bind(this), this.castError.bind(this));
            this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
        }
    }, {
        key: 'onMediaDiscovered',
        value: function onMediaDiscovered(media) {
            this.player_.loadTech_('Chromecast', {
                type: 'cast',
                apiMedia: media,
                apiSession: this.apiSession
            });

            this.casting = true;
            this.inactivityTimeout = this.player_.options_.inactivityTimeout;
            this.player_.options_.inactivityTimeout = 0;
            this.player_.userActive(true);
            this.addClass('connected');
            this.removeClass('error');
        }
    }, {
        key: 'onSessionUpdate',
        value: function onSessionUpdate(isAlive) {
            if (!this.player_.apiMedia) {
                return;
            }
            if (!isAlive) {
                return this.onStopAppSuccess();
            }
        }
    }, {
        key: 'stopCasting',
        value: function stopCasting() {
            return this.apiSession.stop(this.onStopAppSuccess.bind(this), this.castError.bind(this));
        }
    }, {
        key: 'onStopAppSuccess',
        value: function onStopAppSuccess() {
            this.casting = false;
            var time = this.player_.currentTime();
            this.removeClass('connected');
            this.player_.src(this.player_.options_['sources']);
            if (!this.player_.paused()) {
                this.player_.one('seeked', function () {
                    return this.player_.play();
                });
            }
            this.player_.currentTime(time);
            this.player_.options_.inactivityTimeout = this.inactivityTimeout;
            return this.apiSession = null;
        }

        /**
         * Allow sub components to stack CSS class names
         *
         * @return {String} The constructed class name
         * @method buildCSSClass
         */
    }, {
        key: 'buildCSSClass',
        value: function buildCSSClass() {
            return 'vjs-chromecast-button ' + _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'buildCSSClass', this).call(this);
        }

        /**
         * Handle click on mute
         * @method handleClick
         */
    }, {
        key: 'handleClick',
        value: function handleClick() {
            _get(Object.getPrototypeOf(ChromeCastButton.prototype), 'handleClick', this).call(this);
            if (this.casting) {
                return this.stopCasting();
            } else {
                return this.doLaunch();
            }
        }
    }]);

    return ChromeCastButton;
})(Button);

ChromeCastButton.prototype.tryingReconnect = 0;

ChromeCastButton.prototype.inactivityTimeout = 2000;

ChromeCastButton.prototype.controlText_ = 'Chromecast';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'chromeCastButton');

Component.registerComponent('ChromeCastButton', ChromeCastButton);
exports['default'] = ChromeCastButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videojsChromecast = require('./videojs-chromecast');

var _videojsChromecast2 = _interopRequireDefault(_videojsChromecast);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _videojsChromecast2['default'])(this, options);
};

_videoJs2['default'].plugin('chromecast', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./videojs-chromecast":11}],10:[function(require,module,exports){
(function (global){
/**
 * @file chromecast.js
 * Chromecast Media Controller - Wrapper for HTML5 Media API
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');

/**
 * Chromecast Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Chromecast
 */

var Chromecast = (function (_Tech) {
    _inherits(Chromecast, _Tech);

    function Chromecast(options, ready) {
        var _this = this;

        _classCallCheck(this, Chromecast);

        _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, options, ready);
        this.apiMedia = this.options_.source.apiMedia;
        this.apiSession = this.options_.source.apiSession;
        this.receiver = this.apiSession.receiver.friendlyName;

        this.apiMedia.addUpdateListener(this.onMediaStatusUpdate.bind(this));
        this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
        var tracks = this.textTracks();
        if (tracks) {
            (function () {
                var changeHandler = _this.handleTextTracksChange.bind(_this);

                tracks.addEventListener('change', changeHandler);
                _this.on('dispose', function () {
                    tracks.removeEventListener('change', changeHandler);
                });

                _this.handleTextTracksChange();
            })();
        }

        try {
            tracks = this.audioTracks();
            if (tracks) {
                (function () {
                    var changeHandler = _this.handleAudioTracksChange.bind(_this);

                    tracks.addEventListener('change', changeHandler);
                    _this.on('dispose', function () {
                        tracks.removeEventListener('change', changeHandler);
                    });
                })();
            }
        } catch (e) {
            _videoJs2['default'].log('get player audioTracks fail' + e);
        }

        try {
            tracks = this.videoTracks();
            if (tracks) {
                (function () {
                    var changeHandler = _this.handleVideoTracksChange.bind(_this);

                    tracks.addEventListener('change', changeHandler);
                    _this.on('dispose', function () {
                        tracks.removeEventListener('change', changeHandler);
                    });
                })();
            }
        } catch (e) {
            _videoJs2['default'].log('get player videoTracks fail' + e);
        }

        this.update();
        this.triggerReady();
    }

    _createClass(Chromecast, [{
        key: 'createEl',
        value: function createEl() {
            var el = _videoJs2['default'].createEl('div', {
                id: this.options_.techId,
                className: 'vjs-tech vjs-tech-chromecast'
            });
            return el;
        }
    }, {
        key: 'update',
        value: function update() {
            this.el_.innerHTML = '<div class="casting-image" style="background-image: url(\'' + this.options_.poster + '\')"></div><div class="casting-overlay"><div class="casting-information"><div class="casting-icon"></div><div class="casting-description"><small>' + this.localize('CASTING TO') + '</small><br>' + this.receiver + '</div></div></div>';
        }
    }, {
        key: 'onSessionUpdate',
        value: function onSessionUpdate(isAlive) {
            if (!this.apiMedia) {
                return;
            }
            if (!isAlive) {
                return this.onStopAppSuccess();
            }
        }
    }, {
        key: 'onStopAppSuccess',
        value: function onStopAppSuccess() {
            this.stopTrackingCurrentTime();
            this.apiMedia = null;
        }
    }, {
        key: 'onMediaStatusUpdate',
        value: function onMediaStatusUpdate() {
            if (!this.apiMedia) {
                return;
            }
            switch (this.apiMedia.playerState) {
                case chrome.cast.media.PlayerState.BUFFERING:
                    this.trigger('waiting');
                    break;
                case chrome.cast.media.PlayerState.IDLE:
                    this.trigger('timeupdate');
                    break;
                case chrome.cast.media.PlayerState.PAUSED:
                    this.trigger('pause');
                    this.paused_ = true;
                    break;
                case chrome.cast.media.PlayerState.PLAYING:
                    this.trigger('playing');
                    this.trigger('play');
                    this.paused_ = false;
                    break;
            }
        }

        /**
         * Set video
         *
         * @param {Object=} src Source object
         * @method setSrc
         */
    }, {
        key: 'src',
        value: function src(_src) {
            //do nothing
        }
    }, {
        key: 'currentSrc',
        value: function currentSrc() {
            if (!this.apiMedia) {
                return;
            }
            return this.apiMedia.media.contentId;
        }
    }, {
        key: 'handleAudioTracksChange',
        value: function handleAudioTracksChange() {
            var trackInfo = [];
            var tTracks = this.textTracks();
            var tracks = this.audioTracks();

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track['enabled']) {
                    //set id of cuurentTrack audio
                    trackInfo.push(i + 1 + tTracks.length);
                }
            }

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'handleVideoTracksChange',
        value: function handleVideoTracksChange() {}
    }, {
        key: 'handleTextTracksChange',
        value: function handleTextTracksChange() {
            var trackInfo = [];
            var tracks = this.textTracks();

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track['mode'] === 'showing') {
                    trackInfo.push(i + 1);
                }
            }

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'onTrackSuccess',
        value: function onTrackSuccess() {
            return _videoJs2['default'].log('track added');
        }
    }, {
        key: 'onTrackError',
        value: function onTrackError(e) {
            return _videoJs2['default'].log('Cast track Error: ' + JSON.stringify(e));
        }
    }, {
        key: 'castError',
        value: function castError(e) {
            return _videoJs2['default'].log('Cast Error: ' + JSON.stringify(e));
        }
    }, {
        key: 'play',
        value: function play() {
            if (!this.apiMedia) {
                return;
            }
            if (this.paused_) {
                this.apiMedia.play(null, this.mediaCommandSuccessCallback.bind(this, 'Playing: ' + this.apiMedia.sessionId), this.castError.bind(this));
            }
            return this.paused_ = false;
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.apiMedia) {
                return;
            }
            if (!this.paused_) {
                this.apiMedia.pause(null, this.mediaCommandSuccessCallback.bind(this, 'Paused: ' + this.apiMedia.sessionId), this.castError.bind(this));
                return this.paused_ = true;
            }
        }
    }, {
        key: 'paused',
        value: function paused() {
            return this.paused_;
        }
    }, {
        key: 'currentTime',
        value: function currentTime() {
            if (!this.apiMedia) {
                return 0;
            }
            return this.apiMedia.getEstimatedTime();
        }
    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(position) {

            if (!this.apiMedia) {
                return 0;
            }
            var request = undefined;
            request = new chrome.cast.media.SeekRequest();
            request.currentTime = position;
            //if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
            //  request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
            //}
            return this.apiMedia.seek(request, this.onSeekSuccess.bind(this, position), this.castError.bind(this));
        }
    }, {
        key: 'onSeekSuccess',
        value: function onSeekSuccess(position) {
            _videoJs2['default'].log('seek success' + position);
        }
    }, {
        key: 'volume',
        value: function volume() {
            return this.volume_;
        }
    }, {
        key: 'duration',
        value: function duration() {
            if (!this.apiMedia) {
                return 0;
            }
            return this.apiMedia.media.duration || Infinity;
        }
    }, {
        key: 'controls',
        value: function controls() {
            return false;
        }
    }, {
        key: 'setVolume',
        value: function setVolume(level) {
            var mute = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var request = undefined;
            var volume = undefined;
            if (!this.apiMedia) {
                return;
            }
            volume = new chrome.cast.Volume();
            volume.level = level;
            volume.muted = mute;
            this.volume_ = volume.level;
            this.muted_ = mute;
            request = new chrome.cast.media.VolumeRequest();
            request.volume = volume;
            this.apiMedia.setVolume(request, this.mediaCommandSuccessCallback.bind(this, 'Volume changed'), this.castError.bind(this));
            return this.trigger('volumechange');
        }
    }, {
        key: 'mediaCommandSuccessCallback',
        value: function mediaCommandSuccessCallback(information) {
            _videoJs2['default'].log(information);
        }
    }, {
        key: 'muted',
        value: function muted() {
            return this.muted_;
        }
    }, {
        key: 'setMuted',
        value: function setMuted(muted) {
            return this.setVolume(this.volume_, muted);
        }
    }, {
        key: 'supportsFullScreen',
        value: function supportsFullScreen() {
            return false;
        }
    }, {
        key: 'resetSrc_',
        value: function resetSrc_(callback) {
            callback();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.resetSrc_(Function.prototype);
            _get(Object.getPrototypeOf(Chromecast.prototype), 'dispose', this).call(this, this);
        }
    }]);

    return Chromecast;
})(Tech);

Chromecast.prototype.paused_ = false;

Chromecast.prototype.options_ = {};

Chromecast.prototype.timerStep = 1000;

/* Chromecast Support Testing -------------------------------------------------------- */

Chromecast.isSupported = function () {
    return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Chromecast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Chromecast.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Chromecast.nativeSourceHandler.canPlayType = function (source) {

    var dashTypeRE = /^application\/(?:dash\+xml|(x-|vnd\.apple\.)mpegurl)/i;
    var dashExtRE = /^video\/(mpd|mp4|webm|m3u8)/i;

    if (dashTypeRE.test(source)) {
        return 'probably';
    } else if (dashExtRE.test(source)) {
        return 'maybe';
    } else {
        return '';
    }
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Chromecast.nativeSourceHandler.canHandleSource = function (source) {

    // If a type was provided we should rely on that
    if (source.type) {
        return Chromecast.nativeSourceHandler.canPlayType(source.type);
    } else if (source.src) {
        return Chromecast.nativeSourceHandler.canPlayType(source.src);
    }

    return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Chromecast.nativeSourceHandler.handleSource = function (source, tech) {
    tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Chromecast.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Chromecast.registerSourceHandler(Chromecast.nativeSourceHandler);

/*
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresVolumeControl'] = true;

/*
 * Set the tech's playbackRate support status
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresPlaybackRate'] = false;

/*
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 *
 * @type {Boolean}
 */
Chromecast.prototype['movingMediaElementInDOM'] = false;

/*
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Chromecast.prototype['featuresFullscreenResize'] = false;

/*
 * Set the tech's timeupdate event support status
 * (this disables the manual timeupdate events of the Tech)
 */
Chromecast.prototype['featuresTimeupdateEvents'] = false;

/*
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Chromecast.prototype['featuresProgressEvents'] = false;

/*
 * Sets the tech's status on native text track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeTextTracks'] = true;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeAudioTracks'] = true;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Chromecast.prototype['featuresNativeVideoTracks'] = false;

_videoJs2['default'].options.chromecast = {};

Component.registerComponent('Chromecast', Chromecast);
Tech.registerTech('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
/**
 * ! videojs-chromecast - v1.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-chromecast.js
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _componentControlBarChromecastButton = require('./component/control-bar/chromecast-button');

var _componentControlBarChromecastButton2 = _interopRequireDefault(_componentControlBarChromecastButton);

var _techChromecast = require('./tech/chromecast');

var _techChromecast2 = _interopRequireDefault(_techChromecast);

var Component = _videoJs2['default'].getComponent('Component');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Chromecast = (function (_Component) {
  _inherits(Chromecast, _Component);

  function Chromecast(player, options) {
    _classCallCheck(this, Chromecast);

    _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, player, options);
  }

  return Chromecast;
})(Component);

Chromecast.prototype.options_ = {};

// register the plugin
_videoJs2['default'].options.children.chromecast = {};

_videoJs2['default'].addLanguage('en', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('de', {
  'CASTING TO': 'WIEDERGABE AUF'
});

_videoJs2['default'].addLanguage('it', {
  'CASTING TO': 'PLAYBACK SU'
});

_videoJs2['default'].addLanguage('fr', {
  'CASTING TO': 'CAST EN COURS SUR'
});

var USER_AGENT = window.navigator.userAgent;

_videoJs2['default'].browser.IS_EDGE = /Edge/i.test(USER_AGENT);

Component.registerComponent('Chromecast', Chromecast);
exports['default'] = Chromecast;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/chromecast-button":8,"./tech/chromecast":10}],12:[function(require,module,exports){
(function (global){
/**
 * @file koment-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _utilsToTitleCase = require('../../../utils/to-title-case');

var _utilsToTitleCase2 = _interopRequireDefault(_utilsToTitleCase);

var _utilsDom = require('../../../utils/dom');

var Dom = _interopRequireWildcard(_utilsDom);

var TextTrackButton = _videoJs2['default'].getComponent('TextTrackButton');
var Component = _videoJs2['default'].getComponent('Component');
var TextTrackMenuItem = _videoJs2['default'].getComponent('TextTrackMenuItem');
var ChaptersTrackMenuItem = _videoJs2['default'].getComponent('ChaptersTrackMenuItem');
var Menu = _videoJs2['default'].getComponent('Menu');

/**
 * The button component for toggling and selecting koment
 * Chapters act much differently than other text tracks
 * Cues are navigation vs. other tracks of alternative languages
 *
 * @param {Object} player  Player object
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready    Ready callback function
 * @extends TextTrackButton
 * @class KomentButton
 */

var KomentButton = (function (_TextTrackButton) {
    _inherits(KomentButton, _TextTrackButton);

    function KomentButton(player, options, ready) {
        _classCallCheck(this, KomentButton);

        _get(Object.getPrototypeOf(KomentButton.prototype), 'constructor', this).call(this, player, options, ready);
        this.el_.setAttribute('aria-label', 'Koment Menu');
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */

    _createClass(KomentButton, [{
        key: 'buildCSSClass',
        value: function buildCSSClass() {
            return 'vjs-koment-button ' + _get(Object.getPrototypeOf(KomentButton.prototype), 'buildCSSClass', this).call(this);
        }

        /**
         * Create a menu item for each text track
         *
         * @return {Array} Array of menu items
         * @method createItems
         */
    }, {
        key: 'createItems',
        value: function createItems() {
            var items = [];
            var tracks = this.player_.textTracks();

            if (!tracks) {
                return items;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];

                if (track.kind === this.kind_) {
                    items.push(new TextTrackMenuItem(this.player_, { track: track }));
                }
            }

            return items;
        }

        /**
         * Handle click on text track
         *
         * @method handleClick
         */
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var tracks = this.player_.textTracks();
            _get(Object.getPrototypeOf(KomentButton.prototype), 'handleClick', this).call(this, event);

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];

                if (track.kind !== this.kind_) {
                    continue;
                }
                track.mode = this.buttonPressed_ ? 'showing' : 'hidden';
            }
        }

        /**
         * Create menu from chapter buttons
         *
         * @return {Menu} Menu of chapter buttons
         * @method createMenu
         */
    }, {
        key: 'createMenu',
        value: function createMenu() {
            var _this = this;

            var tracks = this.player_.textTracks() || [];
            var komentTrack = undefined;
            var items = this.items || [];

            for (var i = tracks.length - 1; i >= 0; i--) {

                // We will always choose the last track as our komentTrack
                var track = tracks[i];

                if (track.kind === this.kind_) {
                    komentTrack = track;

                    break;
                }
            }

            var menu = this.menu;

            if (menu === undefined) {
                menu = new Menu(this.player_);

                var title = _videoJs2['default'].createEl('li', {
                    className: 'vjs-menu-title',
                    innerHTML: (0, _utilsToTitleCase2['default'])(this.controlText_),
                    tabIndex: -1
                });
                menu.children_.unshift(title);
                Dom.insertElFirst(title, menu.contentEl());
            } else {
                // We will empty out the menu children each time because we want a
                // fresh new menu child list each time
                items.forEach(function (item) {
                    return menu.removeChild(item);
                });
                // Empty out the KomentButton menu items because we no longer need them
                items = [];
            }

            if (komentTrack && (komentTrack.cues === null || komentTrack.cues === undefined)) {
                komentTrack.mode = 'hidden';

                var remoteTextTrackEl = this.player_.remoteTextTrackEls().getTrackElementByTrack_(komentTrack);

                if (remoteTextTrackEl) {
                    remoteTextTrackEl.addEventListener('load', function (event) {
                        return _this.update();
                    });
                }
            }

            if (komentTrack && komentTrack.cues && komentTrack.cues.length > 0) {
                var cues = komentTrack.cues;

                for (var i = 0, l = cues.length; i < l; i++) {
                    var cue = cues[i];
                    var mi = new ChaptersTrackMenuItem(this.player_, {
                        cue: cue,
                        track: komentTrack
                    });

                    items.push(mi);

                    //menu.addChild(mi)
                }
            }

            if (items.length > 0) {
                this.show();
            }
            // Assigning the value of items back to this.items for next iteration
            this.items = items;
            return menu;
        }
    }]);

    return KomentButton;
})(TextTrackButton);

KomentButton.prototype.kind_ = 'metadata';
KomentButton.prototype.controlText_ = 'Koment';

Component.registerComponent('KomentButton', KomentButton);
exports['default'] = KomentButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../utils/dom":16,"../../../utils/to-title-case":17}],13:[function(require,module,exports){
(function (global){
/**
 * @file koment-new-button.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Button = _videoJs2['default'].getComponent('Button');
var Component = _videoJs2['default'].getComponent('Component');

/**
 * The button component for toggling and selecting koment
 * Chapters act much differently than other text tracks
 * Cues are navigation vs. other tracks of alternative languages
 *
 * @param {Object} player  Player object
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready    Ready callback function
 * @extends TextTrackButton
 * @class KomentNewButton
 */

var KomentNewButton = (function (_Button) {
  _inherits(KomentNewButton, _Button);

  function KomentNewButton(player, options, ready) {
    _classCallCheck(this, KomentNewButton);

    _get(Object.getPrototypeOf(KomentNewButton.prototype), 'constructor', this).call(this, player, options, ready);
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */

  _createClass(KomentNewButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-koment-button vjs-koment-new-button ' + _get(Object.getPrototypeOf(KomentNewButton.prototype), 'buildCSSClass', this).call(this);
    }
  }]);

  return KomentNewButton;
})(Button);

KomentNewButton.prototype.controlText_ = 'Koment New';

Component.registerComponent('KomentNewButton', KomentNewButton);
exports['default'] = KomentNewButton;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videojsKoment = require('./videojs-koment');

var _videojsKoment2 = _interopRequireDefault(_videojsKoment);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _videojsKoment2['default'])(this, options);
};

_videoJs2['default'].plugin('koment', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./videojs-koment":18}],15:[function(require,module,exports){
(function (global){
/**
 * @file koment-track-display.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var Component = _videoJs2['default'].getComponent('Component');

var darkGray = '#222';
var lightGray = '#ccc';
var fontMap = {
    monospace: 'monospace',
    sansSerif: 'sans-serif',
    serif: 'serif',
    monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
    monospaceSerif: '"Courier New", monospace',
    proportionalSansSerif: 'sans-serif',
    proportionalSerif: 'serif',
    casual: '"Comic Sans MS", Impact, fantasy',
    script: '"Monotype Corsiva", cursive',
    smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
};

/**
 * Add cue HTML to display
 *
 * @param {Number} color Hex number for color, like #f0e
 * @param {Number} opacity Value for opacity,0.0 - 1.0
 * @return {RGBAColor} In the form 'rgba(255, 0, 0, 0.3)'
 * @method constructColor
 */
function constructColor(color, opacity) {
    return 'rgba(' +
    // color looks like "#f0e"
    parseInt(color[1] + color[1], 16) + ',' + parseInt(color[2] + color[2], 16) + ',' + parseInt(color[3] + color[3], 16) + ',' + opacity + ')';
}

/**
 * Try to update style
 * Some style changes will throw an error, particularly in IE8. Those should be noops.
 *
 * @param {Element} el The element to be styles
 * @param {CSSProperty} style The CSS property to be styled
 * @param {CSSStyle} rule The actual style to be applied to the property
 * @method tryUpdateStyle
 */
function tryUpdateStyle(el, style, rule) {
    try {
        el.style[style] = rule;
    } catch (e) {

        // Satisfies linter.
        return;
    }
}

/**
 * The component for displaying text track cues
 *
 * @param {Object} player  Main Player
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready    Ready callback function
 * @extends Component
 * @class KomentTrackDisplay
 */

var KomentTrackDisplay = (function (_Component) {
    _inherits(KomentTrackDisplay, _Component);

    function KomentTrackDisplay(player, options, ready) {
        var _this = this;

        _classCallCheck(this, KomentTrackDisplay);

        _get(Object.getPrototypeOf(KomentTrackDisplay.prototype), 'constructor', this).call(this, player, options, ready);

        player.on('loadstart', _videoJs2['default'].bind(this, this.toggleDisplay));
        player.on('texttrackchange', _videoJs2['default'].bind(this, this.updateDisplay));

        var tracks = player.textTracks();

        if (tracks) {
            (function () {
                var changeHandler = _videoJs2['default'].bind(_this, _this.handleTracksChange);

                tracks.addEventListener('change', changeHandler);

                _this.on('dispose', function () {
                    tracks.removeEventListener('change', changeHandler);
                });
            })();
        }

        player.ready(_videoJs2['default'].bind(this, function () {

            player.on('fullscreenchange', _videoJs2['default'].bind(this, this.updateDisplay));

            var trackList = this.player_.textTracks();
            var firstKoment = undefined;

            if (trackList) {
                for (var i = 0; i < trackList.length; i++) {
                    var track = trackList[i];

                    if (track['default']) {
                        if (track.kind === this.kind_ && !firstKoment) {
                            firstKoment = track;
                        }
                    }
                }
                // We want to show the first default track but captions and subtitles
                // take precedence over descriptions.
                // So, display the first default captions or subtitles track
                // and otherwise the first default descriptions track.
                if (firstKoment) {
                    firstKoment.mode = 'showing';
                }
            }
        }));
    }

    /**
     * Toggle display texttracks
     *
     * @method toggleDisplay
     */

    _createClass(KomentTrackDisplay, [{
        key: 'toggleDisplay',
        value: function toggleDisplay() {
            this.show();
        }

        /**
         * Create the component's DOM element
         *
         * @return {Element}
         * @method createEl
         */
    }, {
        key: 'createEl',
        value: function createEl() {
            return _get(Object.getPrototypeOf(KomentTrackDisplay.prototype), 'createEl', this).call(this, 'div', {
                className: 'vjs-koment-track-display'
            }, {
                'aria-live': 'assertive',
                'aria-atomic': 'true'
            });
        }

        /**
         * Clear display texttracks
         *
         * @method clearDisplay
         */
    }, {
        key: 'clearDisplay',
        value: function clearDisplay() {}

        /**
         * Handle text track change
         *
         * @method handleTracksChange
         */
    }, {
        key: 'handleTracksChange',
        value: function handleTracksChange() {
            var tracks = this.player().textTracks();
            var disabled = true;

            // Check whether a track of a different kind is showing
            for (var i = 0, l = tracks.length; i < l; i++) {
                var track = tracks[i];

                if (track.kind === this.kind_ && track.mode === 'showing') {
                    disabled = false;
                    break;
                }
            }

            // If another track is showing, disable this menu button
            if (disabled) {
                this.hide();
            } else {
                this.show();
            }

            this.updateDisplay();
        }

        /**
         * Update display texttracks
         *
         * @method updateDisplay
         */
    }, {
        key: 'updateDisplay',
        value: function updateDisplay() {
            var tracks = this.player_.textTracks();

            this.clearDisplay();

            if (!tracks) {
                return;
            }

            // Track display prioritization model: if multiple tracks are 'showing',
            //  display the first 'subtitles' or 'captions' track which is 'showing',
            //  otherwise display the first 'descriptions' track which is 'showing'

            var komentTrack = null;

            var i = tracks.length;

            var changeHandler = _videoJs2['default'].bind(this, this.handleTracksChange);

            while (i--) {
                var track = tracks[i];

                track.removeEventListener('cuechange', changeHandler);
                if (track.mode === 'showing') {
                    if (track.kind === this.kind_) {
                        track.addEventListener('cuechange', changeHandler);
                        komentTrack = track;
                    }
                }
            }

            if (komentTrack) {
                this.updateForTrack(komentTrack);
            }
        }

        /**
         * Add texttrack to texttrack list
         *
         * @param {TextTrackObject} track Texttrack object to be added to list
         * @method updateForTrack
         */
    }, {
        key: 'updateForTrack',
        value: function updateForTrack(track) {

            if (typeof _globalWindow2['default'].WebVTT !== 'function' || !track.activeCues) {
                return;
            }

            var overrides = this.player_.textTrackSettings.getValues();
            var cues = [];

            for (var _i = 0; _i < track.activeCues.length; _i++) {
                cues.push(track.activeCues[_i]);
            }

            _globalWindow2['default'].WebVTT.processCues(_globalWindow2['default'], cues, this.el_);

            var i = cues.length;
            while (i--) {
                var cue = cues[i];

                if (!cue) {
                    continue;
                }

                var cueDiv = cue.displayState;
                if (overrides.color) {
                    cueDiv.firstChild.style.color = overrides.color;
                }
                if (overrides.textOpacity) {
                    tryUpdateStyle(cueDiv.firstChild, 'color', constructColor(overrides.color || '#fff', overrides.textOpacity));
                }
                if (overrides.backgroundColor) {
                    cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
                }
                if (overrides.backgroundOpacity) {
                    tryUpdateStyle(cueDiv.firstChild, 'backgroundColor', constructColor(overrides.backgroundColor || '#000', overrides.backgroundOpacity));
                }
                if (overrides.windowColor) {
                    if (overrides.windowOpacity) {
                        tryUpdateStyle(cueDiv, 'backgroundColor', constructColor(overrides.windowColor, overrides.windowOpacity));
                    } else {
                        cueDiv.style.backgroundColor = overrides.windowColor;
                    }
                }
                if (overrides.edgeStyle) {
                    if (overrides.edgeStyle === 'dropshadow') {
                        cueDiv.firstChild.style.textShadow = '2px 2px 3px ' + darkGray + ', 2px 2px 4px ' + darkGray + ', 2px 2px 5px ' + darkGray;
                    } else if (overrides.edgeStyle === 'raised') {
                        cueDiv.firstChild.style.textShadow = '1px 1px ' + darkGray + ', 2px 2px ' + darkGray + ', 3px 3px ' + darkGray;
                    } else if (overrides.edgeStyle === 'depressed') {
                        cueDiv.firstChild.style.textShadow = '1px 1px ' + lightGray + ', 0 1px ' + lightGray + ', -1px -1px ' + darkGray + ', 0 -1px ' + darkGray;
                    } else if (overrides.edgeStyle === 'uniform') {
                        cueDiv.firstChild.style.textShadow = '0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray;
                    }
                }
                if (overrides.fontPercent && overrides.fontPercent !== 1) {
                    var fontSize = _globalWindow2['default'].parseFloat(cueDiv.style.fontSize);

                    cueDiv.style.fontSize = fontSize * overrides.fontPercent + 'px';
                    cueDiv.style.height = 'auto';
                    cueDiv.style.top = 'auto';
                    cueDiv.style.bottom = '2px';
                }
                if (overrides.fontFamily && overrides.fontFamily !== 'default') {
                    if (overrides.fontFamily === 'small-caps') {
                        cueDiv.firstChild.style.fontVariant = 'small-caps';
                    } else {
                        cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
                    }
                }
            }
        }
    }]);

    return KomentTrackDisplay;
})(Component);

KomentTrackDisplay.prototype.kind_ = 'metadata';

Component.registerComponent('KomentTrackDisplay', KomentTrackDisplay);
exports['default'] = KomentTrackDisplay;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":3}],16:[function(require,module,exports){
/**
 * Insert an element as the first child node of another
 *
 * @param  {Element} child   Element to insert
 * @param  {Element} parent Element to insert child into
 * @private
 * @function insertElFirst
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertElFirst = insertElFirst;

function insertElFirst(child, parent) {
    if (parent.firstChild) {
        parent.insertBefore(child, parent.firstChild);
    } else {
        parent.appendChild(child);
    }
}
},{}],17:[function(require,module,exports){
/**
 * @file to-title-case.js
 *
 * Uppercase the first letter of a string
 *
 * @param  {String} string String to be uppercased
 * @return {String}
 * @private
 * @method toTitleCase
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function toTitleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports["default"] = toTitleCase;
module.exports = exports["default"];
},{}],18:[function(require,module,exports){
(function (global){
/**
 * ! videojs-koment - v1.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-koment.js
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _componentControlBarTrackControlsKomentButton = require('./component/control-bar/track-controls/koment-button');

var _componentControlBarTrackControlsKomentButton2 = _interopRequireDefault(_componentControlBarTrackControlsKomentButton);

var _componentControlBarTrackControlsKomentNewButton = require('./component/control-bar/track-controls/koment-new-button');

var _componentControlBarTrackControlsKomentNewButton2 = _interopRequireDefault(_componentControlBarTrackControlsKomentNewButton);

var _tracksKomentTrackDisplay = require('./tracks/koment-track-display');

var _tracksKomentTrackDisplay2 = _interopRequireDefault(_tracksKomentTrackDisplay);

var Component = _videoJs2['default'].getComponent('Component');

var TRACK_ID = 'koment_track';
exports.TRACK_ID = TRACK_ID;
var COMMENT_SHOW_TIME = 5;
exports.COMMENT_SHOW_TIME = COMMENT_SHOW_TIME;
/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Koment = (function (_Component) {
    _inherits(Koment, _Component);

    function Koment(player, options) {
        var _this = this;

        _classCallCheck(this, Koment);

        _get(Object.getPrototypeOf(Koment.prototype), 'constructor', this).call(this, player, options);

        var defaults = {
            label: 'Koment',
            language: 'fr'
        };

        this.text_track = _videoJs2['default'].mergeOptions(defaults, options, {
            'default': true,
            kind: this.kind_,
            id: TRACK_ID,
            cues: [],
            mode: 'showing'
        });

        var data = {
            json: true,
            uri: this.options_.url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        (0, _xhr2['default'])(data, function (err, res) {
            if (err) {
                throw new Error(err.message);
            }
            //const addedTrack = player.addRemoteTextTrack(this.text_track).track
            var addedTrack = player.addTextTrack(_this.text_track.kind, _this.text_track.label, _this.text_track.language);
            addedTrack['default'] = true;

            var listCues = res.body || [];
            listCues.forEach(function (cue) {
                addedTrack.addCue(new VTTCue(cue.timecode, cue.timecode + COMMENT_SHOW_TIME, cue.text));
            });
        });
    }

    /**
     * Create the component's DOM element
     *
     * @return {Element}
     * @method createEl
     */

    _createClass(Koment, [{
        key: 'createEl',
        value: function createEl() {
            return _get(Object.getPrototypeOf(Koment.prototype), 'createEl', this).call(this, 'div', {
                className: 'vjs-koment-bar',
                dir: 'ltr'
            }, {
                // The control bar is a group, so it can contain menuitems
                role: 'group'
            });
        }
    }]);

    return Koment;
})(Component);

Koment.prototype.kind_ = 'metadata';
Koment.prototype.options_ = {
    url: 'https://afr-api-v1-staging.herokuapp.com/api/videos/c1ee3b32-0bf8-4873-b173-09dc055b7bfe/comments',
    children: {
        'komentButton': {}
    }
};

// register the plugin
//'komentNewButton': {}
_videoJs2['default'].options.children = _videoJs2['default'].options.children.concat(['koment', 'komentTrackDisplay']);

Component.registerComponent('Koment', Koment);

exports['default'] = Koment;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/track-controls/koment-button":12,"./component/control-bar/track-controls/koment-new-button":13,"./tracks/koment-track-display":15,"xhr":19}],19:[function(require,module,exports){
"use strict";
var window = require("global/window")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

},{"global/window":3,"is-function":4,"parse-headers":5,"xtend":32}],20:[function(require,module,exports){
(function (global){
/**
 * ! videojs-metrics - v0.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
 **/
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _utilsJs = require('./utils.js');

var browser = _interopRequireWildcard(_utilsJs);

var Component = _videoJs2['default'].getComponent('Component');
var Flash = _videoJs2['default'].getComponent('Flash');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Metrics = (function (_Component) {
	_inherits(Metrics, _Component);

	function Metrics(player, options) {
		_classCallCheck(this, Metrics);

		_get(Object.getPrototypeOf(Metrics.prototype), 'constructor', this).call(this, player, options);
		var source = this.player().manifestUrl || this.player().currentSrc();

		this.browserInfo = browser.getBrowser();
		this.pathUrl = source.match(Metrics.URL_MATCH) || ['undefined', 'undefined'];
		this.setupTriggers();
	}

	_createClass(Metrics, [{
		key: 'dispose',
		value: function dispose() {
			this.clearInterval(this.intervalPing);
			this.setupTriggers('off');
		}
	}, {
		key: 'eventHandler',
		value: function eventHandler(evt) {
			var data = {
				type: evt.type
			};

			var skipped = false;

			switch (data.type) {
				case 'error':
					var error = this.player().error();

					error = error || {
						code: -1,
						message: 'cant get error message'
					};
					data.number = error.code;
					data.message = error.message;
					break;
				case 'dispose':
				case 'ended':
					if (data.type === this.oldType) {
						skipped = true;
					}
					data.type = 'stop';
					break;
				case 'loadstart':
					skipped = true;
					break;
				case 'firstplay':
					data.type = 'start';
					this.intervalPing = this.setInterval(this.onPing, Metrics.INTERVAL_PING);
					break;
				case 'waiting':
					data.type = 'buffering';
					break;
				case 'bandwidthIncrease':
				case 'bandwidthDecrease':
					break;
				default:
					break;
			}

			this.oldType = data.type;

			if (skipped) {
				return;
			}

			this.notify(data);
		}
	}, {
		key: 'onPing',
		value: function onPing() {
			this.player().trigger('ping');
		}
	}, {
		key: 'setupTriggers',
		value: function setupTriggers(off) {
			var addOrRemove = off || 'on';

			var events = this.options_.trackEvents;

			var player = this.player();

			var i = events.length - 1;

			for (i; i >= 0; i--) {
				// just call event start only one time
				var firstCall = addOrRemove;

				if (events[i] === 'firstplay' && addOrRemove === 'on') {
					firstCall = 'one';
				}
				player[firstCall](events[i], _videoJs2['default'].bind(this, this.eventHandler));
			}
		}
	}, {
		key: 'pick',
		value: function pick(obj, list, context) {
			var result = {};

			if (typeof list === 'string') {
				list = [list];
			}

			Object.keys(obj).forEach(function (key) {
				if (list.indexOf(key) > -1) {
					result[key] = obj[key];
				}
			}, context);

			return result;
		}
	}, {
		key: 'getRequiredKeys',
		value: function getRequiredKeys(type) {
			return Metrics.BASE_KEYS.concat(Metrics.REQUIRED_KEY[type] || []);
		}
	}, {
		key: 'notify',
		value: function notify(evt) {
			var player = this.player();

			var width = _globalWindow2['default'].innerWidth || _globalDocument2['default'].documentElement.clientWidth || _globalDocument2['default'].body.clientWidth;

			var height = _globalWindow2['default'].innerHeight || _globalDocument2['default'].documentElement.clientHeight || _globalDocument2['default'].body.clientHeight;

			// Merge with default options
			evt['user_id'] = this.options_.user_id;
			evt['fqdn'] = this.pathUrl[1];
			evt['os'] = this.browserInfo.os;
			evt['os_version'] = this.browserInfo.osVersion.toString();
			evt['web_browser'] = this.browserInfo.browser.toString();
			evt['web_browser_version'] = this.browserInfo.version ? this.browserInfo.version.toString() : '';
			evt['resolution_size'] = width + 'x' + height;
			evt['flash_version'] = Flash.version().join(',');
			evt['html5_video'] = player.techName_ ? player.techName_ !== 'FLash' || player.techName_ !== 'DashAs' : 'undefined';
			evt['relative_url'] = this.pathUrl[2];
			evt['timeout'] = false;
			evt['frames_dropped'] = 0;
			try {
				var metrics = player.techGet_('getPlaybackStatistics');

				this.metrics_ = _videoJs2['default'].mergeOptions(this.metrics_, metrics);
				evt['video_bitrate'] = this.metrics_.video.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.video.bandwidth)) : -1;
				evt['audio_bitrate'] = this.metrics_.audio.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.audio.bandwidth)) : -1;
				evt['chunks_from_cdn'] = this.metrics_.p2pweb.chunksFromCDN;
				evt['chunks_from_p2p'] = this.metrics_.p2pweb.chunksFromP2P;
				evt['startup_time'] = this.metrics_.p2pweb.startupTime;

				var pickedData = this.pick(evt, this.getRequiredKeys(evt.type));

				var data = {
					json: pickedData,
					uri: this.options_.url,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				};

				Metrics.xhr(data, function (err) {
					if (err) {
						throw new Error(err.message);
					}
				});
			} catch (e) {
				_videoJs2['default'].log(e);
			}
		}
	}]);

	return Metrics;
})(Component);

Metrics.REQUIRED_KEY = {
	'bandwidthIncrease': ['video_bitrate', 'audio_bitrate'],
	'bandwidthDecrease': ['video_bitrate', 'audio_bitrate'],
	'ping': ['chunks_from_cdn', 'chunks_from_p2p'],
	'buffering': [],
	'error': ['number', 'message'],
	'start': ['video_bitrate', 'audio_bitrate', 'os', 'os_version', 'web_browser', 'web_browser_version', 'resolution_size', 'flash_version', 'html5_video', 'relative_url'],
	'stop': ['timeout', 'frames_dropped']
};

Metrics.URL_MATCH = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/;

Metrics.prototype.pathUrl = '';
Metrics.prototype.oldType = null;
Metrics.prototype.intervalPing = 0;
Metrics.prototype.browserInfo = {};

Metrics.prototype.options_ = {
	'option': true,
	'user_id': 666,
	'method': 'POST',
	'responseType': 'json',
	'timeout': 1000,
	'url': '//stats.afrostream.tv/api/v1/events',
	'trackEvents': ['loadstart', 'ping', 'firstplay', 'ended', 'dispose', 'waiting', 'error', 'bandwidthIncrease', 'bandwidthDecrease']
};

Metrics.INTERVAL_PING = 60000;

Metrics.BASE_KEYS = ['user_id', 'type', 'fqdn'];

Metrics.METRICS_DATA = {
	bandwidth: -1,
	bitrateIndex: 0,
	pendingIndex: '',
	numBitrates: 0,
	bufferLength: 0,
	droppedFrames: 0,
	movingLatency: 0,
	movingDownload: 0,
	movingRatio: 0,
	requestsQueue: 0
};

Metrics.prototype.metrics_ = {
	video: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA),
	audio: _videoJs2['default'].mergeOptions({}, Metrics.METRICS_DATA)
};

Metrics.xhr = _xhr2['default'];

Component.registerComponent('Metrics', Metrics);

// register the plugin
_videoJs2['default'].options.children.metrics = {};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils.js":22,"global/document":2,"global/window":3,"xhr":25}],21:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _metrics = require('./metrics');

var _metrics2 = _interopRequireDefault(_metrics);

/**
 * The video.js playlist plugin. Invokes the playlist-maker to create a
 * playlist function on the specific player.
 *
 * @param {Array} list
 */
var plugin = function plugin(options) {
  (0, _metrics2['default'])(this, options);
};

_videoJs2['default'].plugin('metrics', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./metrics":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getBrowser = getBrowser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

function getBrowser() {
	var data = {};

	var browser = '';

	var version = '';

	var os = '';

	var osVersion = '';

	var parseUserAgent = undefined;

	var prepareData = undefined;

	var renameOsx = undefined;

	var cutSafariVersion = undefined;

	parseUserAgent = function () {
		var userAgent = navigator.userAgent.toLowerCase();

		var browserParts = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

		var osParts = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent);

		if (!userAgent.match(/trident\/7\./)) {
			browser = 'ie';
			version = 11;
		} else if (browserParts && browserParts.length > 2) {
			browser = browserParts[1];
			version = browserParts[2];
		}

		if (osParts && osParts.length > 1) {
			os = osParts[1];
		}

		osVersion = navigator.oscpu || navigator.appName;
	};

	prepareData = function () {
		data.browser = browser;
		data.version = parseInt(version, 10) || '';
		data.os = os;
		data.osVersion = osVersion;
	};

	renameOsx = function () {
		if (os === 'mac') {
			os = 'osx';
		}
	};

	cutSafariVersion = function () {
		if (os === 'safari') {
			version = version.substring(0, 1);
		}
	};

	parseUserAgent();

	// exception rules
	renameOsx();
	cutSafariVersion();

	prepareData();

	return data;
}
},{"global/document":2,"global/window":3}],23:[function(require,module,exports){
(function (global){
/**
 * @file Youtube.js
 * Youtube Media Controller - Wrapper for HTML5 Media API
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var Tech = _videoJs2['default'].getComponent('Tech');

/**
 * Youtube Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Youtube
 */

var Youtube = (function (_Tech) {
  _inherits(Youtube, _Tech);

  function Youtube(options, ready) {
    _classCallCheck(this, Youtube);

    _get(Object.getPrototypeOf(Youtube.prototype), 'constructor', this).call(this, options, ready);

    this.setPoster(options.poster);
    this.setSrc(this.options_.source, true);
    // Set the vjs-youtube class to the player
    // Parent is not set yet so we have to wait a tick
    setTimeout((function () {
      this.el_.parentNode.className += ' vjs-youtube';

      if (_isOnMobile) {
        this.el_.parentNode.className += ' vjs-youtube-mobile';
      }

      if (Youtube.isApiReady) {
        this.initYTPlayer();
      } else {
        Youtube.apiReadyQueue.push(this);
      }
    }).bind(this));
  }

  _createClass(Youtube, [{
    key: 'dispose',
    value: function dispose() {
      this.el_.parentNode.className = this.el_.parentNode.className.replace(' vjs-youtube', '').replace(' vjs-youtube-mobile', '');
      _get(Object.getPrototypeOf(Youtube.prototype), 'dispose', this).call(this, this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {

      var div = _videoJs2['default'].createEl('div', {
        id: this.options_.techId,
        style: 'width:100%;height:100%;top:0;left:0;position:absolute'
      });

      var divWrapper = _videoJs2['default'].createEl('div');
      divWrapper.appendChild(div);

      if (!_isOnMobile && !this.options_.ytControls) {
        var divBlocker = _videoJs2['default'].createEl('div', {
          className: 'vjs-iframe-blocker',
          style: 'position:absolute;top:0;left:0;width:100%;height:100%'
        });

        // In case the blocker is still there and we want to pause
        divBlocker.onclick = this.pause.bind(this);

        divWrapper.appendChild(divBlocker);
      }

      return divWrapper;
    }
  }, {
    key: 'initYTPlayer',
    value: function initYTPlayer() {
      var playerVars = {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: this.options_.loop ? 1 : 0
      };

      // Let the user set any YouTube parameter
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters
      // To use YouTube controls, you must use ytControls instead
      // To use the loop or autoplay, use the video.js settings

      if (typeof this.options_.autohide !== 'undefined') {
        playerVars.autohide = this.options_.autohide;
      }

      if (typeof this.options_['cc_load_policy'] !== 'undefined') {
        playerVars['cc_load_policy'] = this.options_['cc_load_policy'];
      }

      if (typeof this.options_.ytControls !== 'undefined') {
        playerVars.controls = this.options_.ytControls;
      }

      if (typeof this.options_.disablekb !== 'undefined') {
        playerVars.disablekb = this.options_.disablekb;
      }

      if (typeof this.options_.end !== 'undefined') {
        playerVars.end = this.options_.end;
      }

      if (typeof this.options_.color !== 'undefined') {
        playerVars.color = this.options_.color;
      }

      if (!playerVars.controls) {
        // Let video.js handle the fullscreen unless it is the YouTube native controls
        playerVars.fs = 0;
      } else if (typeof this.options_.fs !== 'undefined') {
        playerVars.fs = this.options_.fs;
      }

      if (typeof this.options_.end !== 'undefined') {
        playerVars.end = this.options_.end;
      }

      if (typeof this.options_.hl !== 'undefined') {
        playerVars.hl = this.options_.hl;
      } else if (typeof this.options_.language !== 'undefined') {
        // Set the YouTube player on the same language than video.js
        playerVars.hl = this.options_.language.substr(0, 2);
      }

      if (typeof this.options_['iv_load_policy'] !== 'undefined') {
        playerVars['iv_load_policy'] = this.options_['iv_load_policy'];
      }

      if (typeof this.options_.list !== 'undefined') {
        playerVars.list = this.options_.list;
      } else if (this.url && typeof this.url.listId !== 'undefined') {
        playerVars.list = this.url.listId;
      }

      if (typeof this.options_.listType !== 'undefined') {
        playerVars.listType = this.options_.listType;
      }

      if (typeof this.options_.modestbranding !== 'undefined') {
        playerVars.modestbranding = this.options_.modestbranding;
      }

      if (typeof this.options_.playlist !== 'undefined') {
        playerVars.playlist = this.options_.playlist;
      }

      if (typeof this.options_.playsinline !== 'undefined') {
        playerVars.playsinline = this.options_.playsinline;
      }

      if (typeof this.options_.rel !== 'undefined') {
        playerVars.rel = this.options_.rel;
      }

      if (typeof this.options_.showinfo !== 'undefined') {
        playerVars.showinfo = this.options_.showinfo;
      }

      if (typeof this.options_.start !== 'undefined') {
        playerVars.start = this.options_.start;
      }

      if (typeof this.options_.theme !== 'undefined') {
        playerVars.theme = this.options_.theme;
      }

      this.activeVideoId = this.url ? this.url.videoId : null;
      this.activeList = playerVars.list;

      this.ytPlayer = new YT.Player(this.options_.techId, {
        videoId: this.activeVideoId,
        playerVars: playerVars,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onPlaybackQualityChange: this.onPlayerPlaybackQualityChange.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onPlayerError.bind(this)
        }
      });
    }
  }, {
    key: 'onPlayerReady',
    value: function onPlayerReady() {
      this.playerReady_ = true;
      this.triggerReady();

      if (this.playOnReady) {
        this.play();
      }
    }
  }, {
    key: 'onPlayerPlaybackQualityChange',
    value: function onPlayerPlaybackQualityChange() {}
  }, {
    key: 'onPlayerStateChange',
    value: function onPlayerStateChange(e) {
      var state = e.data;

      if (state === this.lastState || this.errorNumber) {
        return;
      }

      switch (state) {
        case -1:
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          break;

        case YT.PlayerState.ENDED:
          this.trigger('ended');
          break;

        case YT.PlayerState.PLAYING:
          this.trigger('timeupdate');
          this.trigger('durationchange');
          this.trigger('playing');
          this.trigger('play');

          if (this.isSeeking) {
            this.onSeeked();
          }
          break;

        case YT.PlayerState.PAUSED:
          this.trigger('canplay');
          if (this.isSeeking) {
            this.onSeeked();
          } else {
            this.trigger('pause');
          }
          break;

        case YT.PlayerState.BUFFERING:
          this.player_.trigger('timeupdate');
          this.player_.trigger('waiting');
          break;
      }

      this.lastState = state;
    }
  }, {
    key: 'onPlayerError',
    value: function onPlayerError(e) {
      this.errorNumber = e.data;
      this.trigger('error');

      this.ytPlayer.stopVideo();
      this.ytPlayer.destroy();
      this.ytPlayer = null;
    }
  }, {
    key: 'error',
    value: function error() {
      switch (this.errorNumber) {
        case 5:
          return { code: 'Error while trying to play the video' };

        case 2:
        case 100:
        case 150:
          return { code: 'Unable to find the video' };
        case 101:
          return { code: 'Playback on other Websites has been disabled by the video owner.' };
      }

      return { code: 'YouTube unknown error (' + this.errorNumber + ')' };
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (_src) {
        this.setSrc({ src: _src });

        if (this.options_.autoplay && !_isOnMobile) {
          this.play();
        }
      }

      return this.source;
    }
  }, {
    key: 'poster',
    value: function poster() {
      // You can't start programmaticlly a video with a mobile
      // through the iframe so we hide the poster and the play button (with CSS)
      if (_isOnMobile) {
        return null;
      }

      return this.poster_;
    }
  }, {
    key: 'setPoster',
    value: function setPoster(poster) {
      this.poster_ = poster;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(source) {
      if (!source || !source.src) {
        return;
      }

      delete this.errorNumber;
      this.source = source;
      this.url = Youtube.parseUrl(source.src);

      if (!this.options_.poster) {
        if (this.url.videoId) {
          // Set the low resolution first
          this.poster_ = 'https://img.youtube.com/vi/' + this.url.videoId + '/0.jpg';

          // Check if their is a high res
          this.checkHighResPoster();
        }
      }

      if (this.options_.autoplay && !_isOnMobile) {
        if (this.isReady_) {
          this.play();
        } else {
          this.playOnReady = true;
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.url || !this.url.videoId) {
        return;
      }

      this.wasPausedBeforeSeek = false;

      if (this.isReady_) {
        if (this.url.listId) {
          if (this.activeList === this.url.listId) {
            this.ytPlayer.playVideo();
          } else {
            this.ytPlayer.loadPlaylist(this.url.listId);
            this.activeList = this.url.listId;
          }
        }

        if (this.activeVideoId === this.url.videoId) {
          this.ytPlayer.playVideo();
        } else {
          this.ytPlayer.loadVideoById(this.url.videoId);
          this.activeVideoId = this.url.videoId;
        }
      } else {
        this.trigger('waiting');
        this.playOnReady = true;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.ytPlayer) {
        this.ytPlayer.pauseVideo();
      }
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.ytPlayer ? this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING : true;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.ytPlayer ? this.ytPlayer.getCurrentTime() : 0;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.lastState === YT.PlayerState.PAUSED) {
        this.timeBeforeSeek = this.currentTime();
      }

      if (!this.isSeeking) {
        this.wasPausedBeforeSeek = this.paused();
      }

      this.ytPlayer.seekTo(seconds, true);
      this.trigger('timeupdate');
      this.trigger('seeking');
      this.isSeeking = true;

      // A seek event during pause does not return an event to trigger a seeked event,
      // so run an interval timer to look for the currentTime to change
      if (this.lastState === YT.PlayerState.PAUSED && this.timeBeforeSeek !== seconds) {
        this.clearInterval(this.checkSeekedInPauseInterval);
        this.checkSeekedInPauseInterval = this.setInterval((function () {
          if (this.lastState !== YT.PlayerState.PAUSED || !this.isSeeking) {
            // If something changed while we were waiting for the currentTime to change,
            //  clear the interval timer
            this.clearInterval(this.checkSeekedInPauseInterval);
          } else if (this.currentTime() !== this.timeBeforeSeek) {
            this.trigger('timeupdate');
            this.onSeeked();
          }
        }).bind(this), 250);
      }
    }
  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      this.clearInterval(this.checkSeekedInPauseInterval);
      this.isSeeking = false;

      if (this.wasPausedBeforeSeek) {
        this.pause();
      }

      this.trigger('seeked');
    }
  }, {
    key: 'playbackRate',
    value: function playbackRate() {
      return this.ytPlayer ? this.ytPlayer.getPlaybackRate() : 1;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(suggestedRate) {
      if (!this.ytPlayer) {
        return;
      }

      this.ytPlayer.setPlaybackRate(suggestedRate);
      this.trigger('ratechange');
    }
  }, {
    key: 'duration',
    value: function duration() {
      return this.ytPlayer ? this.ytPlayer.getDuration() : 0;
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.source;
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.ytPlayer ? this.lastState === YT.PlayerState.ENDED : false;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.ytPlayer ? this.ytPlayer.getVolume() / 100.0 : 1;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      if (!this.ytPlayer) {
        return;
      }

      this.ytPlayer.setVolume(percentAsDecimal * 100.0);
      this.setTimeout(function () {
        this.trigger('volumechange');
      }, 50);
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.ytPlayer ? this.ytPlayer.isMuted() : false;
    }
  }, {
    key: 'setMuted',
    value: function setMuted(mute) {
      if (!this.ytPlayer) {
        return;
      } else {
        this.muted(true);
      }

      if (mute) {
        this.ytPlayer.mute();
      } else {
        this.ytPlayer.unMute();
      }
      this.setTimeout(function () {
        this.trigger('volumechange');
      }, 50);
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      if (!this.ytPlayer || !this.ytPlayer.getVideoLoadedFraction) {
        return {
          length: 0,
          start: function start() {
            throw new Error('This TimeRanges object is empty');
          },
          end: function end() {
            throw new Error('This TimeRanges object is empty');
          }
        };
      }

      var _end = this.ytPlayer.getVideoLoadedFraction() * this.ytPlayer.getDuration();

      return {
        length: this.ytPlayer.getDuration(),
        start: function start() {
          return 0;
        },
        end: function end() {
          return _end;
        }
      };
    }

    // TODO: Can we really do something with this on YouTUbe?
  }, {
    key: 'load',
    value: function load() {}
  }, {
    key: 'resetction',
    value: function resetction() {}
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return true;
    }

    // Tries to get the highest resolution thumbnail available for the video
  }, {
    key: 'checkHighResPoster',
    value: function checkHighResPoster() {
      var _this = this;

      var uri = 'https://img.youtube.com/vi/' + this.url.videoId + '/maxresdefault.jpg';

      try {
        (function () {
          var image = new Image();
          image.onload = (function () {
            // Onload may still be called if YouTube returns the 120x90 error thumbnail
            if ('naturalHeight' in image) {
              if (image.naturalHeight <= 90 || image.naturalWidth <= 120) {
                return;
              }
            } else if (image.height <= 90 || image.width <= 120) {
              return;
            }

            this.poster_ = uri;
            this.trigger('posterchange');
          }).bind(_this);
          image.onerror = function () {};
          image.src = uri;
        })();
      } catch (e) {}
    }
  }]);

  return Youtube;
})(Tech);

Youtube.prototype.options_ = {};

Youtube.apiReadyQueue = [];

/* Youtube Support Testing -------------------------------------------------------- */

Youtube.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Youtube);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Youtube.nativeSourceHandler = {};

var _isOnMobile = /(iPad|iPhone|iPod|Android)/g.test(navigator.userAgent);

Youtube.parseUrl = function (url) {
  var result = {
    videoId: null
  };

  var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regex);

  if (match && match[2].length === 11) {
    result.videoId = match[2];
  }

  var regPlaylist = /[?&]list=([^#\&\?]+)/;
  match = url.match(regPlaylist);

  if (match && match[1]) {
    result.listId = match[1];
  }

  return result;
};

var loadApi = function loadApi() {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

var injectCss = function injectCss() {
  var css = // iframe blocker to catch mouse events
  '.vjs-youtube .vjs-iframe-blocker { display: none; }' + '.vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }' + '.vjs-youtube .vjs-poster { background-size: cover; }' + '.vjs-youtube-mobile .vjs-big-play-button { display: none; }';

  var head = document.head || document.getElementsByTagName('head')[0];

  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canPlayType = function (source) {
  return source === 'video/youtube';
};

/*
 * Check Youtube can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Youtube.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Youtube.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Youtube.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Youtube.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Youtube.registerSourceHandler(Youtube.nativeSourceHandler);

window.onYouTubeIframeAPIReady = function () {
  Youtube.isApiReady = true;

  for (var i = 0; i < Youtube.apiReadyQueue.length; ++i) {
    Youtube.apiReadyQueue[i].initYTPlayer();
  }
};

loadApi();
injectCss();

Component.registerComponent('Youtube', Youtube);

Tech.registerTech('Youtube', Youtube);

exports['default'] = Youtube;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){

},{}],25:[function(require,module,exports){
"use strict";
var window = require("global/window")
var once = require("once")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    var callback = options.callback
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)

    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function noop() {}

},{"global/window":3,"is-function":26,"once":27,"parse-headers":30,"xtend":31}],26:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],27:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],28:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1,"is-function":26}],29:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"for-each":28,"trim":29}],31:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],32:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],33:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

require('./tech/media');

require('./tech/dash');

require('./tech/dashas');

require('./tech/easy-broadcast');

require('./tech/streamroot');

require('./component/control-bar/');

require('videojs-metrics');

require('videojs-chromecast');

require('videojs-youtube');

require('videojs-koment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ! afrostrream-player - v2.0.0 - 2016-02-15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 benjipott
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache-2.0 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file afrostream.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Afrostream = function (_Component) {
  _inherits(Afrostream, _Component);

  function Afrostream(player, options, ready) {
    _classCallCheck(this, Afrostream);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Afrostream).call(this, player, options, ready));

    player.one('loadstart', _this.onLoadStart.bind(_this));
    player.one('firstplay', _this.onFirstPlay.bind(_this));
    player.getPlaybackStatistics = _this.getPlaybackStatistics.bind(_this);
    player.one('fullscreenchange', _this.onFullScreenChange.bind(_this));
    return _this;
  }

  _createClass(Afrostream, [{
    key: 'getPrefix',
    value: function getPrefix() {
      return (screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation) && 'orientation' in screen;
    }
  }, {
    key: 'onFullScreenChange',
    value: function onFullScreenChange() {
      var prefix = this.getPrefix();

      if (!prefix) {
        return;
      }
      try {

        if (this.player_.isFullscreen()) {
          screen.orientation.lock('landscape');
        } else {
          screen.orientation.unlock();
        }
      } catch (e) {
        _video2.default.log(e);
      }
    }
  }, {
    key: 'onLoadStart',
    value: function onLoadStart() {
      this.addMediaPlayerHandlers();
    }
  }, {
    key: 'onFirstPlay',
    value: function onFirstPlay() {
      if (this.player_.options_.starttime) {
        this.player_.currentTime(this.player_.options_.starttime);
      }
    }
  }, {
    key: 'addMediaPlayerHandlers',
    value: function addMediaPlayerHandlers() {
      this.player_.tech_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.player_.tech_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
        return;
      }
      var metrics = this.getCribbedMetricsFor(e.mediaType);
      if (metrics) {
        switch (e.mediaType) {
          case 'video':
            /*jshint sub:true*/
            if (metrics.bandwidth !== this.oldBandwidth) {
              this.player_.trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease');
              this.oldBandwidth = metrics.bandwidth;
            }
            break;
          case 'p2pweb':
            /*jshint sub:true*/
            if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
              this.player_.trigger('chunksfromp2p');
              this.oldChunksFromP2P = metrics.chunksFromP2P;
            }
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(manifest, err) {
      if (err) {
        this.player_.error(err);
      }
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      return this.player_.tech_ && this.player_.tech_.getPlaybackStatistics();
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      return this.player_.tech_ && this.player_.tech_.getCribbedMetricsFor(type);
    }
  }]);

  return Afrostream;
}(Component);

Afrostream.prototype.options_ = {};

Afrostream.prototype.oldBandwidth = 0;

Afrostream.prototype.oldChunksFromP2P = 0;

Afrostream.prototype.streamInfo = null;

Afrostream.prototype.tech_ = null;

var USER_AGENT = window.navigator.userAgent;

_video2.default.browser.IS_SAFARI = /safari/i.test(USER_AGENT);
/**
 * add afrostream to videojs childs
 * @type {{}}
 */
_video2.default.options.children.push('afrostream');

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0]);

Component.registerComponent('Afrostream', Afrostream);
exports.default = Afrostream;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/":34,"./tech/dash":45,"./tech/dashas":46,"./tech/easy-broadcast":47,"./tech/media":48,"./tech/streamroot":49,"videojs-chromecast":9,"videojs-koment":14,"videojs-metrics":21,"videojs-youtube":23}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _captionTrackButton = require('./track-controls/caption-track-button');

Object.defineProperty(exports, 'CaptionTrackButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_captionTrackButton).default;
  }
});

var _videoTrackButton = require('./track-controls/video-track-button');

Object.defineProperty(exports, 'VideoTrackButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_videoTrackButton).default;
  }
});

var _nextVideoButton = require('./next/next-video-button');

Object.defineProperty(exports, 'NextVideoButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nextVideoButton).default;
  }
});

var _loadProgressSpinner = require('./progress-control/load-progress-spinner');

Object.defineProperty(exports, 'LoadProgressSpinner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadProgressSpinner).default;
  }
});

var _mouseThumbnailDisplay = require('./progress-control/mouse-thumbnail-display');

Object.defineProperty(exports, 'MouseThumbnailDisplay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseThumbnailDisplay).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./next/next-video-button":35,"./progress-control/load-progress-spinner":37,"./progress-control/mouse-thumbnail-display":38,"./track-controls/caption-track-button":39,"./track-controls/video-track-button":43}],35:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _nextVideoItem = require('./next-video-item');

var _nextVideoItem2 = _interopRequireDefault(_nextVideoItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file next-video-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var MenuButton = _video2.default.getComponent('MenuButton');
/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class NextVideoButton
 */

var NextVideoButton = function (_MenuButton) {
  _inherits(NextVideoButton, _MenuButton);

  function NextVideoButton(player) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, NextVideoButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NextVideoButton).call(this, player, options));
  }

  /**
   * Create the list of menu items. Specific to each subclass.
   *
   * @method createItems
   */


  _createClass(NextVideoButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      if (!this.options_.poster) {
        this.hide();
        return items;
      }

      var item = new _nextVideoItem2.default(this.player_, {
        label: 'Next',
        selectable: false,
        poster: this.options_.poster
      });
      items.push(item);

      return items;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */

  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-next-video-button ' + _get(Object.getPrototypeOf(NextVideoButton.prototype), 'buildCSSClass', this).call(this);
    }

    /**
     * Handle click on mute
     * @method handleClick
     */

  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoButton.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoButton;
}(MenuButton);

NextVideoButton.prototype.controlText_ = 'Next video';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'nextVideoButton');

Component.registerComponent('NextVideoButton', NextVideoButton);
exports.default = NextVideoButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./next-video-item":36}],36:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file next-video-item.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuItem
 * @class NextVideoItem
 */

var NextVideoItem = function (_MenuItem) {
  _inherits(NextVideoItem, _MenuItem);

  function NextVideoItem(player, options) {
    _classCallCheck(this, NextVideoItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NextVideoItem).call(this, player, options));

    _this.setSrc(options.poster);
    return _this;
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Desc
   * @param {Object=} props Desc
   * @return {Element}
   * @method createEl
   */


  _createClass(NextVideoItem, [{
    key: 'createEl',
    value: function createEl(type, props, attrs) {
      var el = _get(Object.getPrototypeOf(NextVideoItem.prototype), 'createEl', this).call(this, type, props, attrs);

      this.fallbackImg_ = _video2.default.createEl(_video2.default.browser.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
        className: 'thumb-tile_thumb'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(url) {
      var backgroundImage = void 0;

      if (!_video2.default.browser.BACKGROUND_SIZE_SUPPORTED) {
        this.fallbackImg_.src = url;
      } else {
        backgroundImage = '';
        if (url) {
          backgroundImage = 'url("' + url + '")';
        }

        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }
    }

    /**
     * Handle click on mute
     * @method handleClick
     */

  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoItem.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoItem;
}(MenuItem);

Component.registerComponent('NextVideoItem', NextVideoItem);
exports.default = NextVideoItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],37:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file load-progress-spinner.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var LoadProgressBar = _video2.default.getComponent('LoadProgressBar');

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LoadProgressSpinner
 */

var LoadProgressSpinner = function (_LoadProgressBar) {
  _inherits(LoadProgressSpinner, _LoadProgressBar);

  function LoadProgressSpinner(player, options) {
    _classCallCheck(this, LoadProgressSpinner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoadProgressSpinner).call(this, player, options));
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */


  _createClass(LoadProgressSpinner, [{
    key: 'createEl',
    value: function createEl() {
      var el = _video2.default.createEl('div', {
        className: 'vjs-load-progress-spinner',
        innerHTML: '<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg>'
      });

      this.circle = _video2.default.createEl('svg', {
        className: 'circular',
        innerHTML: '<circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/>'
      }, {
        viewBox: '25 25 50 50'
      });

      //el.appendChild(this.circle);
      return el;
    }

    /**
     * Update progress bar
     *
     * @method update
     */

  }, {
    key: 'update',
    value: function update() {
      var buffered = this.player_.buffered();

      // get the percent width of a time compared to the total end
      //let percentify = function (time, end) {
      //  let percent = (time / end) || 0; // no NaN
      //  percent = ((percent >= 1 ? 1 : percent) * 100);
      //
      //  let c = Math.PI * (rayon * 2);
      //  let pct = ((100 - percent) / 200) * c;
      //  return pct;
      //};

      // get the percent width of a time compared to the total end
      var percentify = function percentify(time, end) {
        var percent = time / end || 0; // no NaN
        return (percent >= 1 ? 1 : percent) * 125;
      };

      // update the width of the progress bar
      var svg = this.getFirstChild(this.el_);
      if (svg) {
        var i = buffered.length - 1;
        var start = buffered.start(i);
        var end = buffered.end(i);
        var percent = percentify(end - start, 30);
        var firstSvgChild = this.getFirstChild(svg);
        if (firstSvgChild) {
          var stroke = this.getFirstChild(firstSvgChild);
          if (stroke) {
            stroke.style.strokeDasharray = [percent, 125];
          }
        }
      }

      //for (let i = 0; i < buffered.length; i++) {
      //  let start = buffered.start(i);
      //  let end = buffered.end(i);
      //
      //  // set the percent based on the width of the progress bar (bufferedEnd)
      //  part.style.left = percentify(start, bufferedEnd);
      //  part.style.width = percentify(end - start, bufferedEnd);
      //}
      //
      //// remove unused buffered range elements
      //for (let i = children.length; i > buffered.length; i--) {
      //  this.el_.removeChild(children[i - 1]);
      //}
    }
  }, {
    key: 'getFirstChild',
    value: function getFirstChild(el) {
      var firstChild = el.firstChild;
      while (firstChild != null && firstChild.nodeType == 3) {
        // skip TextNodes
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    }
  }]);

  return LoadProgressSpinner;
}(LoadProgressBar);

LoadProgressSpinner.prototype.options_ = {
  rayon: 20
};

Component.registerComponent('LoadProgressSpinner', LoadProgressSpinner);

//Replace videojs CaptionButton child with this one
_video2.default.options.children.splice(3, 1, 'loadProgressSpinner');

exports.default = LoadProgressSpinner;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],38:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file mouse-thumbnail-display.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var MouseTimeDisplay = _video2.default.getComponent('MouseTimeDisplay');
var SeekBar = _video2.default.getComponent('SeekBar');

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseThumbnailDisplay
 */

var MouseThumbnailDisplay = function (_MouseTimeDisplay) {
  _inherits(MouseThumbnailDisplay, _MouseTimeDisplay);

  function MouseThumbnailDisplay(player, options) {
    _classCallCheck(this, MouseThumbnailDisplay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MouseThumbnailDisplay).call(this, player, options));
  }

  _createClass(MouseThumbnailDisplay, [{
    key: 'createLoader',
    value: function createLoader(src) {
      this.destroyLoader();

      this.img = new Image();
      this.img.onload = this.handleComplete.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = src;
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      this.destroyLoader();
      if (_video2.default.hasClass(this.fallbackImg_, 'vjs-hidden')) {
        _video2.default.removeClass(this.fallbackImg_, 'vjs-hidden');
      }
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var url = this.destroyLoader();
      _video2.default.log('thumbnails : next error ' + url);
      if (this.itemIndex = 1) {
        this.error = true;
      }
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      var imgSrouce = '';
      if (this.img) {
        imgSrouce = this.img.src;
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
      return imgSrouce;
    }
  }, {
    key: 'extractAssetUri',
    value: function extractAssetUri() {
      var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var currentSrc = this.player_.currentSrc();
      var urlInfo = _video2.default.parseUrl(currentSrc);
      var pathname = urlInfo.pathname.replace(/\/([a-z0-9\/\._-]{16}\.[is]sml?)+\/([a-z0-9\/\._-]*\.(mpd|m3u8)?)$/gi, '');
      var host = this.options_.host || urlInfo.host;
      var fullPah = urlInfo.protocol + '//' + host + pathname + '/frames/map-{index}.jpg';
      var current = fullPah.replace('{index}', this.itemIndex);
      var next = fullPah.replace('{index}', this.itemIndex + 1);
      if (this.itemIndex === 1) {
        this.createLoader(current);
      }
      if (this.itemIndex < max) {
        this.createLoader(next);
      }

      return current;
    }

    /**
     * Create the component's DOM element
     *
     * @return {Element}
     * @method createEl
     */

  }, {
    key: 'createEl',
    value: function createEl() {
      var el = _video2.default.createEl('div', {
        className: 'vjs-thumbnail-display'
      });

      this.fallbackImg_ = _video2.default.createEl('div', {
        className: 'vjs-thumbnail-display_thumb vjs-hidden'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'update',
    value: function update(newTime, position) {
      _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'update', this).call(this, newTime, position);
      if (this.error) {
        return;
      }
      var timeInterval = 60;
      var spriteSize = {
        w: 600,
        h: 330
      };
      var spritesPerRow = 5;
      var spritesPerCol = 5;

      var sheetWidth = spriteSize.w / spritesPerRow;
      var sheetHeight = spriteSize.h / spritesPerCol;

      if (this.player_.isFullscreen()) {
        sheetWidth = 200;
        sheetHeight = 112;
      }

      var spritesPerSheet = spritesPerRow * spritesPerCol;
      var secondsPerSheet = timeInterval * spritesPerSheet;

      var index = Math.max(1, Math.ceil(newTime / secondsPerSheet));
      var duration = this.player_.duration();
      var maxItem = 1;
      if (duration) {
        maxItem = Math.ceil(duration / secondsPerSheet);
      }
      var stripedTime = newTime - (index - 1) * secondsPerSheet;
      var sheetIndex = Math.floor(stripedTime / timeInterval);
      var x = Math.floor(sheetIndex % 5 * sheetWidth);
      var y = Math.floor(sheetIndex / spritesPerCol) * sheetHeight;
      if (this.itemIndex !== index) {
        this.itemIndex = index;
        var url = this.extractAssetUri(maxItem);
        var backgroundImage = 'url("' + url + '")';
        this.fallbackImg_.style.backgroundImage = backgroundImage;
      }

      this.fallbackImg_.style.backgroundPositionX = -x + 'px';
      this.fallbackImg_.style.backgroundPositionY = -y + 'px';
    }
  }]);

  return MouseThumbnailDisplay;
}(MouseTimeDisplay);

MouseThumbnailDisplay.prototype.error = false;
MouseThumbnailDisplay.prototype.itemIndex = 0;
MouseThumbnailDisplay.prototype.options_ = {
  host: null
};
//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.splice(1, 1, 'mouseThumbnailDisplay');
Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
exports.default = MouseThumbnailDisplay;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],39:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var _offCaptionTrackMenuItem = require('./off-caption-track-menu-item');

var _offCaptionTrackMenuItem2 = _interopRequireDefault(_offCaptionTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var CaptionsButton = _video2.default.getComponent('CaptionsButton');

var CaptionTrackButton = function (_CaptionsButton) {
  _inherits(CaptionTrackButton, _CaptionsButton);

  function CaptionTrackButton(options, ready) {
    _classCallCheck(this, CaptionTrackButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CaptionTrackButton).call(this, options, ready));
  }

  // Create a menu item for each text track


  _createClass(CaptionTrackButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new _offCaptionTrackMenuItem2.default(this.player_, { 'kind': this.kind_, 'mode': 'hidden' }));

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === this.kind_) {
          items.push(new _captionTrackMenuItem2.default(this.player_, {
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }

    /**
     * Allow sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     * @method buildCSSClass
     */

  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-captions-extended-button ' + _get(Object.getPrototypeOf(CaptionTrackButton.prototype), 'buildCSSClass', this).call(this);
    }
  }]);

  return CaptionTrackButton;
}(CaptionsButton);

CaptionTrackButton.prototype.kind_ = 'captions';
CaptionTrackButton.prototype.controlText_ = 'Captions';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(13, 1, 'captionTrackButton');

Component.registerComponent('CaptionTrackButton', CaptionTrackButton);
exports.default = CaptionTrackButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":40,"./off-caption-track-menu-item":41}],40:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

var CaptionTrackMenuItem = function (_MenuItem) {
  _inherits(CaptionTrackMenuItem, _MenuItem);

  function CaptionTrackMenuItem(player, options) {
    _classCallCheck(this, CaptionTrackMenuItem);

    var track = options['track'];
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['mode'] === 'showing';

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CaptionTrackMenuItem).call(this, player, options));

    _this.track = track;

    if (tracks) {
      tracks.addEventListener('change', _this.handleTracksChange.bind(_this));
      _this.on('dispose', function () {
        tracks.removeEventListener('change', this.handleTracksChange.bind(this));
      });
    }

    // iOS7 doesn't dispatch change events to TextTrackLists when an
    // associated track's mode changes. Without something like
    // Object.observe() (also not present on iOS7), it's not
    // possible to detect changes to the mode attribute and polyfill
    // the change event. As a poor substitute, we manually dispatch
    // change events whenever the controls modify the mode.
    if (tracks && tracks.onchange === undefined) {
      (function () {
        var event = void 0;

        _this.on(['tap', 'click'], function () {
          if (_typeof(window.Event) !== 'object') {
            // Android 2.3 throws an Illegal Constructor error for window.Event
            try {
              event = new window.Event('change');
            } catch (err) {}
          }

          if (!event) {
            event = document.createEvent('Event');
            event.initEvent('change', true, true);
          }

          tracks.dispatchEvent(event);
        });
      })();
    }
    return _this;
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */


  _createClass(CaptionTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track['kind'];
      var tracks = this.player_.textTracks();

      _get(Object.getPrototypeOf(CaptionTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        if (track['kind'] !== kind) {
          continue;
        }

        if (track === this.track) {
          track['mode'] = 'showing';
        } else {
          track['mode'] = 'hidden';
        }
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */

  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['mode'] === 'showing');
    }
  }]);

  return CaptionTrackMenuItem;
}(MenuItem);

Component.registerComponent('CaptionTrackMenuItem', CaptionTrackMenuItem);
exports.default = CaptionTrackMenuItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],41:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file caption-track-button-off.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
/**
 * A special menu item for turning of a specific type of text track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends TextTrackMenuItem
 * @class OffTextTrackMenuItem
 */

var OffCaptionTrackMenuItem = function (_CaptionTrackMenuItem) {
  _inherits(OffCaptionTrackMenuItem, _CaptionTrackMenuItem);

  function OffCaptionTrackMenuItem(player, options) {
    _classCallCheck(this, OffCaptionTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'mode': 'hidden'
    };

    // MenuItem is selectable
    options['selectable'] = true;

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffCaptionTrackMenuItem).call(this, player, options));
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */


  _createClass(OffCaptionTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().textTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track['kind'] === this.track['kind'] && track['mode'] === 'showing') {
          selected = false;
          break;
        }
      }

      this.selected(selected);
    }
  }]);

  return OffCaptionTrackMenuItem;
}(_captionTrackMenuItem2.default);

Component.registerComponent('OffCaptionTrackMenuItem', OffCaptionTrackMenuItem);
exports.default = OffCaptionTrackMenuItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":40}],42:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file off-video-track-menu-item.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');

/**
 * A special menu item for turning of a specific type of video track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends VideoTrackMenuItem
 * @class OffVideoTrackMenuItem
 */

var OffVideoTrackMenuItem = function (_VideoTrackMenuItem) {
  _inherits(OffVideoTrackMenuItem, _VideoTrackMenuItem);

  function OffVideoTrackMenuItem(player, options) {
    _classCallCheck(this, OffVideoTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'],
      'default': false,
      'selected': true
    };

    // MenuItem is selectable
    options['selectable'] = true;

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffVideoTrackMenuItem).call(this, player, options));
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */


  _createClass(OffVideoTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().videoTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track['kind'] === 'main' && track['selected']) {
          selected = false;
          break;
        }
      }
      this.selected(selected);
    }
  }]);

  return OffVideoTrackMenuItem;
}(_videoTrackMenuItem2.default);

Component.registerComponent('OffVideoTrackMenuItem', OffVideoTrackMenuItem);
exports.default = OffVideoTrackMenuItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./video-track-menu-item":44}],43:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

var _offVideoTrackMenuItem = require('./off-video-track-menu-item');

var _offVideoTrackMenuItem2 = _interopRequireDefault(_offVideoTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file video-track-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var MenuButton = _video2.default.getComponent('MenuButton');
var MenuItem = _video2.default.getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific video track types (e.g. commentary)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class VideoTrackButton
 */

var VideoTrackButton = function (_MenuButton) {
  _inherits(VideoTrackButton, _MenuButton);

  function VideoTrackButton(player, options) {
    _classCallCheck(this, VideoTrackButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoTrackButton).call(this, player, options));

    var tracks = _this.player_.videoTracks();

    if (!tracks) {
      return _possibleConstructorReturn(_this);
    }

    var updateHandler = _this.update.bind(_this);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    _this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
    return _this;
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */


  _createClass(VideoTrackButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-video-button ' + _get(Object.getPrototypeOf(VideoTrackButton.prototype), 'buildCSSClass', this).call(this);
    }

    // Create a menu item for each text track

  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new MenuItem(this.player_, {
        'label': 'Quality',
        selectable: false
      }));
      // Add an OFF menu item to turn all tracks off
      items.push(new _offVideoTrackMenuItem2.default(this.player_, {
        'kind': 'Auto'
      }));

      var tracks = this.player_.videoTracks();

      if (!tracks) {
        return items;
      }

      if (tracks.length < 2) {
        return [];
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === 'main') {
          items.push(new _videoTrackMenuItem2.default(this.player_, {
            // MenuItem is selectable
            'selectable': true,
            'track': track
          }));
        }
      }

      return items;
    }
  }]);

  return VideoTrackButton;
}(MenuButton);

VideoTrackButton.prototype.kind_ = 'video';
VideoTrackButton.prototype.controlText_ = 'Quality Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
exports.default = VideoTrackButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./off-video-track-menu-item":42,"./video-track-menu-item":44}],44:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

var VideoTrackMenuItem = function (_MenuItem) {
  _inherits(VideoTrackMenuItem, _MenuItem);

  /**
   * LABELS
   *
   * @static
   */

  function VideoTrackMenuItem(player, options) {
    _classCallCheck(this, VideoTrackMenuItem);

    var track = options['track'];
    var tracks = player.videoTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['selected'] === true;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoTrackMenuItem).call(this, player, options));

    _this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = _this.handleTracksChange.bind(_this);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }
    return _this;
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */


  _createClass(VideoTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var tracks = this.player_.videoTracks();

      _get(Object.getPrototypeOf(VideoTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) return;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track['selected'] = track === this.track;
      }
    }

    /**
     * Handle text track change
     *
     * @method handleTracksChange
     */

  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      this.selected(this.track['selected']);
    }
  }]);

  return VideoTrackMenuItem;
}(MenuItem);

Component.registerComponent('VideoTrackMenuItem', VideoTrackMenuItem);
exports.default = VideoTrackMenuItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],45:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dash.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Html5 = _video2.default.getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dash = function (_Html) {
  _inherits(Dash, _Html);

  function Dash(options, ready) {
    _classCallCheck(this, Dash);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dash).call(this, options, ready));

    var tTracks = _this.textTracks();

    if (tTracks) {
      (function () {
        var tTracksChangeHandler = _this.handleTracksChange.bind(_this);

        tTracks.addEventListener('change', tTracksChangeHandler);
        _this.on('dispose', function () {
          tTracks.removeEventListener('change', tTracksChangeHandler);
        });
      })();
    }

    var aTracks = _this.audioTracks();

    if (aTracks) {
      (function () {
        var aTracksChangeHandler = _this.handleAudioTracksChange.bind(_this);

        aTracks.addEventListener('change', aTracksChangeHandler);
        _this.on('dispose', function () {
          aTracks.removeEventListener('change', aTracksChangeHandler);
        });
      })();
    }

    var vTracks = _this.videoTracks();

    if (vTracks) {
      (function () {
        var vTracksChangeHandler = _this.handleVideoTracksChange.bind(_this);

        vTracks.addEventListener('change', vTracksChangeHandler);
        _this.on('dispose', function () {
          vTracks.removeEventListener('change', vTracksChangeHandler);
        });
      })();
    }

    return _this;
  }

  /**
   * Detect if source is Live
   * @returns {boolean}
   */


  _createClass(Dash, [{
    key: 'isDynamic',
    value: function isDynamic(dynamic) {
      if (dynamic !== undefined) {
        return this.isDynamic_ = dynamic;
      }
      return this.isDynamic_;
    }
  }, {
    key: 'duration',
    value: function duration() {
      var duration = _get(Object.getPrototypeOf(Dash.prototype), 'duration', this).call(this);
      //FIXME WTF for detect live we should get duration to Infinity
      return this.isDynamic() ? Infinity : duration;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.playbackInitialized && this.mediaPlayer_) {
        // this.mediaPlayer_.enableBufferOccupancyABR(false)
        this.mediaPlayer_.setQualityFor('video', 0);
        // this.one('seeked', ()=> {
        //   this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled)
        // })
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'setCurrentTime', this).call(this, seconds);
    }

    /**
     * Set video
     *
     * @param {Object=} src Source object
     * @method setSrc
     */

  }, {
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.el_.src;
      }
      this.trigger('loadstart');

      this.featuresNativeTextTracks = Dash.supportsNativeTextTracks();
      this.featuresNativeAudioTracks = Dash.supportsNativeAudioTracks();
      this.featuresNativeVideoTracks = Dash.supportsNativeVideoTracks();
      this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);
      // Save the context after the first initialization for subsequent instances
      this.context_ = this.context_ || {};
      // reuse MediaPlayer if it already exists
      if (!this.mediaPlayer_) {
        // But make a fresh MediaPlayer each time the sourceHandler is used
        this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();

        // Must run controller before these two lines or else there is no
        // element to bind to.
        this.mediaPlayer_.initialize();
      }

      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, this.onTextTracksAdded.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, this.onProgress.bind(this));
      // Dash.js autoplays by default
      if (!this.player_.options().autoplay) {
        this.mediaPlayer_.setAutoPlay(false);
      }

      this.mediaPlayer_.setInitialMediaSettingsFor('audio', this.options_.inititalMediaSettings.audio);
      this.mediaPlayer_.setInitialMediaSettingsFor('video', this.options_.inititalMediaSettings.video);
      this.mediaPlayer_.setTrackSwitchModeFor('audio', this.options_.trackSwitchMode); //alwaysReplace
      this.mediaPlayer_.setTrackSwitchModeFor('video', this.options_.trackSwitchMode); //alwaysReplace

      this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
      this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
      this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

      this.mediaPlayer_.setLiveDelayFragmentCount(this.options_.liveFragmentCount);
      this.mediaPlayer_.setInitialBitrateFor('video', this.options_.initialBitrate);
      // this.mediaPlayer_.setSelectionModeForInitialTrack(this.options_.initialSelectionMode)
      this.mediaPlayer_.setBufferToKeep(this.options_.buffer.bufferToKeep);
      this.mediaPlayer_.setBufferPruningInterval(this.options_.buffer.bufferPruningInterval);
      this.mediaPlayer_.setStableBufferTime(this.options_.buffer.minBufferTime);
      this.mediaPlayer_.setBufferTimeAtTopQuality(this.options_.buffer.bufferTimeAtTopQuality);
      this.mediaPlayer_.setBufferTimeAtTopQualityLongForm(this.options_.buffer.bufferTimeAtTopQualityLongForm);
      this.mediaPlayer_.setLongFormContentDurationThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setRichBufferThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setBandwidthSafetyFactor(this.options_.buffer.bandwidthSafetyFactor);
      this.mediaPlayer_.setAbandonLoadTimeout(this.options_.buffer.abandonLoadTimeout);
      this.mediaPlayer_.setFragmentLoaderRetryAttempts(this.options_.buffer.fragmentLoaderRetryAttempts);
      this.mediaPlayer_.setFragmentLoaderRetryInterval(this.options_.buffer.fragmentLoaderRetryInterval);
      // ReplaceMediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
      // ReplaceMediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
      //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video})

      this.mediaPlayer_.attachView(this.el_);
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(_src);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(_ref, err) {
      var _ref$streamInfo$manif = _ref.streamInfo.manifestInfo.isDynamic;
      var isDynamic = _ref$streamInfo$manif === undefined ? false : _ref$streamInfo$manif;

      if (this.playbackInitialized) {
        return;
      }
      this.playbackInitialized = true;

      if (err) {
        this.player_.error(err);
      }
      // this.streamInfo = streamInfo
      this.isDynamic(isDynamic);
      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);
      //let bitrates = this.mediaPlayer_.getBitrateInfoListFor('video')
      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
      var videoDashTracks = this.mediaPlayer_.getTracksFor('video');
      var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

      var defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
      //let defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video')
      var initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

      var i = void 0;

      for (i = 0; i < audioDashTracks.length; i++) {
        var track = audioDashTracks[i];
        track.label = track.label || track.lang;
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === (defaultAudio && defaultAudio.lang.indexOf(this.options_.inititalMediaSettings.audio.lang) && defaultAudio.lang || this.options_.inititalMediaSettings.audio.lang);
      }

      for (i = 0; i < videoDashTracks.length; i++) {
        var _track = videoDashTracks[i];
        var bitrateList = _track.bitrateList;
        for (var j = 0; j < bitrateList.length; j++) {
          var bitRateInfo = bitrateList[j] / 1000;
          var label = Dash.qualityLabels[j] || bitRateInfo;
          var bitRateTrack = this.addVideoTrack('main', label, bitRateInfo);
          bitRateTrack.selected = !autoSwitch && initialVideoBitrate === bitRateInfo;
        }
      }
    }
  }, {
    key: 'onProgress',
    value: function onProgress() {
      this.trigger('progress');
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      // get current buffered ranges of video element and keep them up to date
      if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
        return;
      }
      var metrics = this.getCribbedMetricsFor(e.mediaType);
      if (metrics) {
        this.metrics_[e.mediaType] = _video2.default.mergeOptions(this.metrics_[e.mediaType], metrics);
        this.trigger(e);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      var metrics = this.mediaPlayer_.getMetricsFor(type),
          dashMetrics = this.mediaPlayer_.getDashMetrics(),
          repSwitch = void 0,
          bufferLevel = void 0,
          httpRequests = void 0,
          droppedFramesMetrics = void 0,
          bitrateIndexValue = void 0,
          bandwidthValue = void 0,
          pendingValue = void 0,
          numBitratesValue = void 0,
          bufferLengthValue = 0,
          movingLatency = {},
          movingDownload = {},
          movingRatio = {},
          droppedFramesValue = 0,
          requestsQueue = void 0,
          fillmoving = function fillmoving(type, Requests) {
        var requestWindow, downloadTimes, latencyTimes, durationTimes;

        requestWindow = Requests.slice(-20).filter(function (req) {
          return req.responsecode >= 200 && req.responsecode < 300 && !!req._mediaduration && req.type === "MediaSegment" && req._stream === type;
        }).slice(-4);
        if (requestWindow.length > 0) {

          latencyTimes = requestWindow.map(function (req) {
            return Math.abs(req.tresponse.getTime() - req.trequest.getTime()) / 1000;
          });

          movingLatency[type] = {
            average: latencyTimes.reduce(function (l, r) {
              return l + r;
            }) / latencyTimes.length,
            high: latencyTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: latencyTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: latencyTimes.length
          };

          downloadTimes = requestWindow.map(function (req) {
            return Math.abs(req._tfinish.getTime() - req.tresponse.getTime()) / 1000;
          });

          movingDownload[type] = {
            average: downloadTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length,
            high: downloadTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: downloadTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: downloadTimes.length
          };

          durationTimes = requestWindow.map(function (req) {
            return req._mediaduration;
          });

          movingRatio[type] = {
            average: durationTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length / movingDownload[type].average,
            high: durationTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }) / movingDownload[type].low,
            low: durationTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }) / movingDownload[type].high,
            count: durationTimes.length
          };
        }
      };

      if (metrics && dashMetrics) {
        repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
        bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
        httpRequests = dashMetrics.getHttpRequests(metrics);
        droppedFramesMetrics = dashMetrics.getCurrentDroppedFrames(metrics);
        requestsQueue = dashMetrics.getRequestsQueue(metrics);

        fillmoving('video', httpRequests);
        fillmoving('audio', httpRequests);

        var streamIdx = this.streamInfo ? this.streamInfo.index : 0;

        if (repSwitch !== null) {
          bitrateIndexValue = dashMetrics.getIndexForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = dashMetrics.getBandwidthForRepresentation(repSwitch.to, streamIdx);
          bandwidthValue = bandwidthValue / 1000;
          bandwidthValue = Math.round(bandwidthValue);
        }

        numBitratesValue = dashMetrics.getMaxIndexForBufferType(type, streamIdx);

        if (bufferLevel !== null) {
          bufferLengthValue = bufferLevel.toPrecision(5);
        }

        if (droppedFramesMetrics !== null) {
          droppedFramesValue = droppedFramesMetrics.droppedFrames;
        }

        if (isNaN(bandwidthValue) || bandwidthValue === undefined) {
          bandwidthValue = 0;
        }

        if (isNaN(bitrateIndexValue) || bitrateIndexValue === undefined) {
          bitrateIndexValue = 0;
        }

        if (isNaN(numBitratesValue) || numBitratesValue === undefined) {
          numBitratesValue = 0;
        }

        if (isNaN(bufferLengthValue) || bufferLengthValue === undefined) {
          bufferLengthValue = 0;
        }

        pendingValue = this.mediaPlayer_.getQualityFor(type);

        return {
          bandwidth: bandwidthValue,
          bitrateIndex: bitrateIndexValue + 1,
          pendingIndex: pendingValue !== bitrateIndexValue ? "(-> " + (pendingValue + 1) + ")" : "",
          numBitrates: numBitratesValue,
          bufferLength: bufferLengthValue,
          droppedFrames: droppedFramesValue,
          movingLatency: movingLatency,
          movingDownload: movingDownload,
          movingRatio: movingRatio,
          requestsQueue: requestsQueue
        };
      } else {
        return null;
      }
    }
  }, {
    key: 'buildDashJSProtData',
    value: function buildDashJSProtData(keySystemOptions) {
      var output = {};

      if (!keySystemOptions) {
        return output;
      }

      Object.keys(keySystemOptions).forEach(function (key, data) {
        if (data.licenseUrl) {
          data.laURL = data.licenseUrl;
          delete data.licenseUrl;
        }
      });

      return keySystemOptions;
    }
  }, {
    key: 'onTextTracksAdded',
    value: function onTextTracksAdded(e) {
      var tracks = e.tracks;

      if (tracks) {
        var plTracks = this.textTracks();
        var l = tracks.length,
            track,
            plTrack;
        for (var i = 0; i < l; i++) {
          track = tracks[i];
          if (track.kind !== 'captions') {
            continue;
          }
          track.label = track.label || track.lang;
          plTrack = plTracks[i];
          track.defaultTrack = track.lang === this.options_.inititalMediaSettings.text.lang;
          if (track.defaultTrack) {
            this.mediaPlayer_.setTextTrack(i);
            if (plTrack) {
              plTrack.mode = 'showing';
            }
          }
        }
      }
    }

    /**
     * Update display texttracks
     *
     * @method updateDisplay
     */

  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange() {
      var tracks = this.textTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }
      var selected = void 0;

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track.kind === 'captions' && track['mode'] === 'showing') {
          selected = true;
          this.mediaPlayer_.setTextTrack(i);
        }
      }
      if (!selected) {
        this.mediaPlayer_.setTextTrack(-1);
      }
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks || !this.playbackInitialized) {
        return;
      }

      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          var audioDashTrack = audioDashTracks[i];
          if (track['language'] == audioDashTrack['lang']) {
            try {
              this.mediaPlayer_.setCurrentTrack(audioDashTrack);
            } catch (err) {
              _video2.default.log(err);
            }
          }
        }
      }
    }
  }, {
    key: 'handleVideoTracksChange',
    value: function handleVideoTracksChange() {
      var tracks = this.videoTracks();

      if (!tracks || !this.playbackInitialized || !this.options_.autoSwitch) {
        return;
      }
      var isInt = tracks.selectedIndex !== null && !isNaN(tracks.selectedIndex) && tracks.selectedIndex % 1 === 0;
      this.mediaPlayer_.setAutoSwitchQuality(!isInt);
      if (isInt) {
        this.mediaPlayer_.setQualityFor('video', tracks.selectedIndex);
      }
    }
  }, {
    key: 'afterMediaKeysReset',
    value: function afterMediaKeysReset(manifest) {
      this.showErrors();

      // Attach the source with any protection data
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(manifest);

      this.triggerReady();
    }
  }, {
    key: 'showErrors',
    value: function showErrors() {
      var _this2 = this;

      // The video element's src is set asynchronously so we have to wait a while
      // before we unhide any errors
      // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
      // in my testing
      this.setTimeout(function () {
        _this2.player_.removeClass('vjs-dashjs-hide-errors');
      }, 250);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.mediaPlayer_) {
        this.mediaPlayer_.reset();
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Dash;
}(Html5);

Dash.prototype.isDynamic_ = false;

Dash.prototype.options_ = {
  inititalMediaSettings: {
    text: {
      lang: 'fra'
    },
    audio: {
      lang: 'fra'
    },
    video: {
      lang: 'fra'
    }
  },
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  /*This method sets the current track switch mode. Available options are:
   * MediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
   * (used to forbid clearing the buffered data (prior to current playback position) after track switch. Default for video)
   * MediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
   * (used to clear the buffered data (prior to current playback position) after track switch. Default for audio)*/
  trackSwitchMode: 'neverReplace', //alwaysReplace
  //Enabling buffer-occupancy ABR will switch to the *experimental* implementation of BOLA
  bolaEnabled: true,
  //Set to true if you would like dash.js to keep downloading fragments in the background
  scheduleWhilePaused: false,
  //A value of the initial bitrate, kbps
  initialBitrate: 400,
  //This method sets the selection mode for the initial track. This mode defines how the initial track will be selected
  // initialSelectionMode: 'highestBitrate',//widestRange,highestBitrate
  //Represents how many segment durations to delay the live stream.
  liveFragmentCount: 4,
  //This value influences the buffer pruning logic.
  //https://github.com/Dash-Industry-Forum/dash.js/blob/master/src/streaming/MediaPlayer.js
  buffer: {
    //Allows you to modify the buffer that is kept in source buffer in seconds.
    bufferToKeep: 30,
    //When the time is set higher than the default you will have to wait longer
    minBufferTime: 12,
    //Allows you to modify the interval of pruning buffer in seconds.
    bufferPruningInterval: 30,
    //A percentage between 0.0 and 1 to reduce the measured throughput calculations
    bandwidthSafetyFactor: 0.9,
    //The time that the internal buffer target will be set to once playing the top quality.
    bufferTimeAtTopQuality: 30,
    //The time that the internal buffer target will be set to once playing the top quality for long form content.
    bufferTimeAtTopQualityLongForm: 60,
    //This will directly affect the buffer targets when playing back at the top quality.
    longFormContentDurationThreshold: 600,
    //A threshold, in seconds, of when dashjs abr becomes less conservative since we have a larger "rich" buffer
    richBufferThreshold: 20,
    //A timeout value in seconds, which during the ABRController will block switch-up events.
    abandonLoadTimeout: 10,
    //Total number of retry attempts that will occur on a fragment load before it fails.
    fragmentLoaderRetryAttempts: 3,
    //Time in milliseconds of which to reload a failed fragment load attempt.
    fragmentLoaderRetryInterval: 1000
  },
  protData: {}
};

/* Dash Support Testing -------------------------------------------------------- */

Dash.isSupported = function () {
  return Html5.isSupported() && !!window.MediaSource;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dash);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dash.nativeSourceHandler = {};

Dash.prototype['featuresNativeTextTracks'] = false;
/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeAudioTracks'] = false;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Dash.prototype['featuresNativeVideoTracks'] = false;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.supportsNativeTextTracks = function () {
  var supportsTextTracks;
  supportsTextTracks = !!Html5.TEST_VID.textTracks;
  if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Html5.TEST_VID.textTracks[0]['mode'] !== 'number';
  }
  if (supportsTextTracks && !('onremovetrack' in Html5.TEST_VID.textTracks)) {
    supportsTextTracks = false;
  }
  return supportsTextTracks;
};

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeVideoTracks = function () {
  var supportsVideoTracks = !!Html5.TEST_VID.videoTracks && !_video2.default.browser.IS_SAFARI;
  return supportsVideoTracks;
};

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeAudioTracks = function () {
  var supportsAudioTracks = !!Html5.TEST_VID.audioTracks && !_video2.default.browser.IS_SAFARI;
  return supportsAudioTracks;
};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (type) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;
  var canPlay = '';
  if (dashTypeRE.test(type)) {
    canPlay = 'probably';
  } else if (dashExtRE.test(type)) {
    canPlay = 'maybe';
  } else {
    canPlay = '';
  }

  return canPlay;
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dash.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dash.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Dash.qualityLabels = ['bas', 'moyen', 'normal', 'HD'];

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dash.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dash.registerSourceHandler(Dash.nativeSourceHandler);

_video2.default.options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
exports.default = Dash;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dashas.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for Flash Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Flash = _video2.default.getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dashas = function (_Flash) {
  _inherits(Dashas, _Flash);

  function Dashas(options, ready) {
    _classCallCheck(this, Dashas);

    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashas).call(this, options, ready));

    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    _this.metricsInterval = _this.setInterval(_this.detectBandwithChange, 5000);
    _this.one('loadedmetadata', _this.onInitialized.bind(_this));

    var tracks = _this.audioTracks();

    var changeHandler = _this.handleAudioTracksChange.bind(_this);

    tracks.addEventListener('change', changeHandler);
    _this.on('dispose', function () {
      tracks.removeEventListener('change', changeHandler);
    });

    return _this;
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */


  _createClass(Dashas, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      // Merge default flashvars with ones passed in to init
      options.flashVars = _video2.default.mergeOptions({
        'metadataUrl': encodeURIComponent(serverUrl),
        'authenticationToken': encodeURIComponent(customData),
        'language': 'fr',
        'spinner': !1,
        'watermark': !1,
        'muted': this.player_.options_.muted,
        'debug': true,
        'quality': 'autolow',
        'maxBufferLength': 8
      }, options.flashVars || {});

      return _get(Object.getPrototypeOf(Dashas.prototype), 'createEl', this).call(this);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized() {
      var metrics = this.getPlaybackStatistics();
      if (!metrics) {
        return;
      }
      this.metrics_ = _video2.default.mergeOptions(this.metrics_, metrics);

      this.addAudioTracks();
    }
  }, {
    key: 'handleAudioTracksChange',
    value: function handleAudioTracksChange() {
      var tracks = this.audioTracks();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track['enabled']) {
          try {
            this.el_.vjs_setProperty('forcedAudioLang', i);
          } catch (err) {
            _video2.default.log(err);
          }
        }
      }
    }
  }, {
    key: 'addAudioTracks',
    value: function addAudioTracks() {
      var tracks = this.el_.vjs_getProperty('audioTracks');

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (typeof track === 'string') {
          track = {
            label: track,
            lang: track
          };
        }
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === 'fra' || plTrack['language'] === 'fr';
      }
    }
  }, {
    key: 'detectBandwithChange',
    value: function detectBandwithChange() {
      var metrics = this.getPlaybackStatistics();
      var metricsChangeType = void 0;
      if (!metrics) {
        return;
      }
      switch (true) {
        case metrics.video.bandwidth !== this.metrics_.video.bandwidth:
          this.metrics_.video.bandwidth = metrics.video.bandwidth;
          metricsChangeType = 'video';
          break;
        case metrics.audio.bandwidth !== this.metrics_.audio.bandwidth:
          this.metrics_.audio.bandwidth = metrics.audio.bandwidth;
          metricsChangeType = 'audio';
          break;
        default:
          break;
      }
      if (metricsChangeType) {
        var metricsChangeEvent = {
          type: _dashjs.MediaPlayer.events.METRIC_CHANGED,
          mediaType: metricsChangeType
        };

        this.trigger(metricsChangeEvent);
      }
    }
  }, {
    key: 'subtitleTracks',
    value: function subtitleTracks() {
      return this.textTracks();
    }
  }, {
    key: 'setSubsTrack',
    value: function setSubsTrack(track) {
      this.setTextTrack(track);
    }
  }, {
    key: 'getDroppedFrames',
    value: function getDroppedFrames() {
      return this.el_.vjs_getProperty('droppedFrames');
    }
  }, {
    key: 'getBuffered',
    value: function getBuffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }, {
    key: 'getBufferLevel',
    value: function getBufferLevel() {
      return this.el_.vjs_getProperty('bufferLevel');
    }
  }, {
    key: 'getCurrentAudioBandwidth',
    value: function getCurrentAudioBandwidth() {
      return this.el_.vjs_getProperty('currentAudioBandwidth');
    }
  }, {
    key: 'getCurrentVideoBandwidth',
    value: function getCurrentVideoBandwidth() {
      return this.el_.vjs_getProperty('currentVideoBandwidth');
    }
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return Tech.prototype.audioTracks.call(this);
    }
  }, {
    key: 'poster',
    value: function poster() {
      return '';
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      var z = this.getBuffered();
      var W = (this.getBufferLevel(), this.getDroppedFrames());
      var Z = this.getCurrentVideoBandwidth();
      var K = this.getCurrentAudioBandwidth();
      var R = {
        bandwidth: Z / 1000,
        bufferLength: z,
        droppedFrames: W
      };
      var N = {
        bandwidth: K / 1000,
        bufferLength: z
      };
      return _video2.default.mergeOptions(this.metrics_, { video: R, audio: N });
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.currentSrc();
      }
      var options = this.options_;
      var autoPlay = this.player_.autoplay();
      var serverUrl = Dashas.buildMetadataUrl(options);
      var customData = Dashas.buildOptData(options);
      this.el_.vjs_source(_src, autoPlay, serverUrl, customData);
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.el_.vjs_getProperty('currentTime');
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return this.el_.vjs_getProperty('buffered');
    }
  }]);

  return Dashas;
}(Flash);

Dashas.extractAssetId = function (source) {
  var reg = /^(.*\/)?(?:$|(.+?)(?:(\.[^.]*$)|$))/;
  var filePath = source.match(reg);

  var assetId = filePath[2];
  return assetId;
};

Dashas.getDRMData = function (options) {
  var drmData = options.protData['com.adobe.flashaccess'];
  var assetId = options.source ? Dashas.extractAssetId(options.source.src) : '';
  var customData = drmData['httpRequestHeaders'] ? drmData['httpRequestHeaders'].customData || {} : {};
  var serverUrl = drmData['serverURL'] ? drmData['serverURL'] || '' : '';

  if (options.source && !options.source.drm) {
    serverUrl = customData = assetId = '';
  }

  return {
    customData: customData,
    serverUrl: serverUrl,
    assetId: assetId,
    variantId: '' //on utilise pas cette key
  };
};

Dashas.buildMetadataUrl = function (options) {
  var data = Dashas.getDRMData(options);
  var metadataUrl = data.serverUrl;
  if (data.customData) {
    metadataUrl += '?optData=' + data.customData;
  }
  if (data.assetId) {
    metadataUrl += '&assetId=' + data.assetId;
  }
  if (data.variantId) {
    metadataUrl += '&variantId=' + data.variantId;
  }
  return metadataUrl;
};

Dashas.buildOptData = function (options) {
  return Dashas.getDRMData(options).customData;
};

Dashas.prototype.options_ = {
  customData: {},
  protData: {
    "com.widevine.alpha": {},
    "com.microsoft.playready": {},
    "com.adobe.flashaccess": {},
    "org.w3.clearkey": {}
  }
};

/* Dash Support Testing -------------------------------------------------------- */

Dashas.isSupported = function () {
  return Flash.isSupported() && Flash.version()[0] >= 14;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dashas);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dashas.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canPlayType = function (source) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source)) {
    return 'probably';
  } else if (dashExtRE.test(source)) {
    return 'maybe';
  } else {
    return '';
  }
};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dashas.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dashas.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dashas.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dashas.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dashas.registerSourceHandler(Dashas.nativeSourceHandler);

_video2.default.options.dashas = {};

Component.registerComponent('Dashas', Dashas);
Tech.registerTech('Dashas', Dashas);

/**
 * @fileoverview Externs for video-js.swf. Externs are functions
 * that the compiler shouldn't obfuscate.
 */

/**
 * @param {string} name
 */
HTMLObjectElement.prototype.vjs_getProperty = function (name) {};

/**
 * @param {string} name
 * @param {string|number} value
 */
HTMLObjectElement.prototype.vjs_setProperty = function (name, value) {};

/**
 * Control methods
 */
HTMLObjectElement.prototype.vjs_play = function () {};
HTMLObjectElement.prototype.vjs_pause = function () {};
HTMLObjectElement.prototype.vjs_load = function () {};

/**
 * @param {string} src
 */
HTMLObjectElement.prototype.vjs_src = function (src) {};

exports.default = Dashas;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file easy-broadcast.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EASY_BROADCAST P2P Media Controller - Wrapper for DASH Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var EasyBroadcast = function (_Dash) {
  _inherits(EasyBroadcast, _Dash);

  function EasyBroadcast(options, ready) {
    _classCallCheck(this, EasyBroadcast);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EasyBroadcast).call(this, options, ready));
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */


  _createClass(EasyBroadcast, [{
    key: 'src',
    value: function src(_src) {
      var _this2 = this;

      if (!_src) {
        return this.el_.src;
      }

      this.clearTimeout(this.loadEBTimeout);
      if (!EasyBroadcast.ebLoaded) {
        // Set the source when ready
        this.loadEBTimeout = this.setTimeout(function () {
          _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', _this2).call(_this2, _src);
        }, 2000);
        return this.injectJs(_src);
      } else {
        this.mediaPlayer_ = new DashEB.MediaPlayer(this.el_, _src, true);
        _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', this).call(this, _src);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2pweb') {
        return _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'getCribbedMetricsFor', this).call(this, type);
      }
      var metrics = this.mediaPlayer_.getMetricsFor(type);
      if (metrics) {
        return metrics.metricsP2PWeb;
      } else {
        return null;
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
        return;
      }
      var metricsKey = 'p2pweb';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'onMetricChanged', this).call(this, e);
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.triggerReady();
    }
  }, {
    key: 'injectJs',
    value: function injectJs(src) {
      var url = this.options_.ebLib;
      var t = 'script';
      var d = document;
      var s = d.getElementsByTagName('head')[0] || d.documentElement;
      var js = d.createElement(t);
      var cb = this.src.bind(this);
      js.async = true;
      js.type = 'text/javascript';

      js.onload = js.onreadystatechange = function () {
        var rs = this.readyState;
        if (!EasyBroadcast.ebLoaded && (!rs || /loaded|complete/.test(rs))) {
          EasyBroadcast.ebLoaded = true;
          cb(src);
        }
      };
      js.src = url;
      s.insertBefore(js, s.firstChild);
    }
  }]);

  return EasyBroadcast;
}(_dash2.default);

EasyBroadcast.prototype.options_ = _video2.default.mergeOptions(_dash2.default.prototype.options_, {
  ebLib: '//www.libs.easybroadcast.fr/afrostream/EB.js&s2member_file_download_key=dbb00d0abec8ccb2295b7d2df5325f6b',
  //override option EB, cause switch lang too long
  trackSwitchMode: 'alwaysReplace'
});

/* EasyBroadcast Support Testing -------------------------------------------------------- */

EasyBroadcast.isSupported = function () {
  return _dash2.default.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && !_video2.default.browser.IS_IOS && !_video2.default.browser.IS_ANDROID;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(EasyBroadcast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
EasyBroadcast.nativeSourceHandler = _dash2.default.nativeSourceHandler;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
EasyBroadcast.supportsNativeTextTracks = _dash2.default.supportsNativeTextTracks;

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeVideoTracks = _dash2.default.supportsNativeVideoTracks;

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeAudioTracks = _dash2.default.supportsNativeAudioTracks;

EasyBroadcast.loadEBTimeout = 0;

EasyBroadcast.ebLoaded = false;

_video2.default.options.easybroadcast = {};

Component.registerComponent('EasyBroadcast', EasyBroadcast);
Tech.registerTech('EasyBroadcast', EasyBroadcast);
exports.default = EasyBroadcast;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./dash":45}],48:[function(require,module,exports){
(function (global){
'use strict';

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaTechController = _video2.default.getComponent('MediaTechController');

MediaTechController.METRICS_DATA = {
  bandwidth: -1,
  bitrateIndex: 0,
  pendingIndex: '',
  numBitrates: 0,
  bufferLength: 0,
  droppedFrames: 0,
  movingLatency: 0,
  movingDownload: 0,
  movingRatio: 0,
  requestsQueue: 0
};

MediaTechController.prototype.metrics_ = {
  video: _video2.default.mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _video2.default.mergeOptions({
    bandwidth: /*this.el().webkitAudioDecodedByteCount || */-1
  }, MediaTechController.METRICS_DATA),
  p2pweb: {
    chunksFromCDN: 0,
    chunksFromP2P: 0,
    chunksSent: 0,
    bufferLength: -1,
    swarmSize: -1,
    p2pRatio: -1,
    startupTime: -1
  }
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type];
};

/**
 * Creates and returns a remote text track object
 *
 * @param {String} kind Text track kind (subtitles, captions, descriptions
 *                                       chapters and metadata)
 * @param {String=} label Label to identify the text track
 * @param {String=} language Two letter language abbreviation
 * @return {TextTrackObject}
 * @method addTextTrack
 */
MediaTechController.prototype.addAudioTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('AudioTrack kind is required but was not provided');
  }

  var tracks = this.audioTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new _video2.default.AudioTrack(options);
  tracks.addTrack_(track);

  return track;
};

MediaTechController.prototype.addVideoTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('VideoTrack kind is required but was not provided');
  }

  var tracks = this.videoTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new _video2.default.VideoTrack(options);
  tracks.addTrack_(track);

  return track;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],49:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _streamrootDashjsP2pWrapper = require('streamroot-dashjs-p2p-wrapper');

var _streamrootDashjsP2pWrapper2 = _interopRequireDefault(_streamrootDashjsP2pWrapper);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file streamroot.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * STREAMROOT P2P Media Controller - Wrapper for DASH Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var Streamroot = function (_Dash) {
  _inherits(Streamroot, _Dash);

  function Streamroot(options, ready) {
    _classCallCheck(this, Streamroot);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Streamroot).call(this, options, ready));
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */


  _createClass(Streamroot, [{
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.el_.src;
      }
      // But make a fresh MediaPlayer each time the sourceHandler is used
      this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();
      this.dashjsWrapper_ = new _streamrootDashjsP2pWrapper2.default(this.mediaPlayer_, this.options_.p2pConfig, 30);
      // Apply any options that are set
      this.mediaPlayer_.initialize();
      this.mediaPlayer_.setLimitBitrateByPortal(this.options_.limitBitrateByPortal);
      _get(Object.getPrototypeOf(Streamroot.prototype), 'src', this).call(this, _src);
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2p') {
        return _get(Object.getPrototypeOf(Streamroot.prototype), 'getCribbedMetricsFor', this).call(this, type);
      }
      var metrics = this.mediaPlayer_.getMetricsFor(type);
      if (metrics) {
        return metrics.metricsP2PWeb;
      } else {
        return null;
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
        return;
      }
      var metricsKey = 'p2p';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(Streamroot.prototype), 'onMetricChanged', this).call(this, e);
    }
  }]);

  return Streamroot;
}(_dash2.default);

Streamroot.prototype.options_ = _video2.default.mergeOptions(_dash2.default.prototype.options_, {
  p2pConfig: {
    streamrootKey: 'none',
    debug: true
  },
  limitBitrateByPortal: true
});

/* Streamroot Support Testing -------------------------------------------------------- */

Streamroot.isSupported = function () {
  return _dash2.default.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && !_video2.default.browser.IS_IOS && !_video2.default.browser.IS_ANDROID;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Streamroot);

_video2.default.options.streamroot = {};

Component.registerComponent('Streamroot', Streamroot);
Tech.registerTech('Streamroot', Streamroot);
exports.default = Streamroot;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./dash":45,"streamroot-dashjs-p2p-wrapper":6}]},{},[33]);
