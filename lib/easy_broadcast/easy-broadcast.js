(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'")
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, f, f.exports, e, t, n, r)
    }
    return n[o].exports
  }

  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [
    function (require, module, exports) {
      "use strict";
      module.exports = require("./src/main");


    }, {
      "./src/main": 47
    }
  ],
  2: [
    function (require, module, exports) {

    }, {}
  ],
  3: [
    function (require, module, exports) {

      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
      }

      module.exports = EventEmitter;

      // Backwards-compat with node 0.10.x
      EventEmitter.EventEmitter = EventEmitter;

      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._maxListeners = undefined;

      // By default EventEmitters will print a warning if more than 10 listeners are
      // added to it. This is a useful default which helps finding memory leaks.
      EventEmitter.defaultMaxListeners = 10;

      // Obviously not all Emitters should be limited to 10. This function allows
      // that to be increased. Set to zero for unlimited.
      EventEmitter.prototype.setMaxListeners = function (n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
          throw TypeError('n must be a positive number');
        this._maxListeners = n;
        return this;
      };

      EventEmitter.prototype.emit = function (type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
          this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === 'error') {
          if (!this._events.error ||
            (isObject(this._events.error) && !this._events.error.length)) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er; // Unhandled 'error' event
            }
            throw TypeError('Uncaught, unspecified "error" event.');
          }
        }

        handler = this._events[type];

        if (isUndefined(handler))
          return false;

        if (isFunction(handler)) {
          switch (arguments.length) {
            // fast cases
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            // slower
            default:
              len = arguments.length;
              args = new Array(len - 1);
              for (i = 1; i < len; i++)
                args[i - 1] = arguments[i];
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];

          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++)
            listeners[i].apply(this, args);
        }

        return true;
      };

      EventEmitter.prototype.addListener = function (type, listener) {
        var m;

        if (!isFunction(listener))
          throw TypeError('listener must be a function');

        if (!this._events)
          this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
          this.emit('newListener', type,
            isFunction(listener.listener) ?
              listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
          this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
          this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
          this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
          var m;
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }

          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error('(node) warning: possible EventEmitter memory ' +
              'leak detected. %d listeners added. ' +
              'Use emitter.setMaxListeners() to increase limit.',
              this._events[type].length);
            if (typeof console.trace === 'function') {
              // not supported in IE 10
              console.trace();
            }
          }
        }

        return this;
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.once = function (type, listener) {
        if (!isFunction(listener))
          throw TypeError('listener must be a function');

        var fired = false;

        function g() {
          this.removeListener(type, g);

          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
      };

      // emits a 'removeListener' event iff the listener was removed
      EventEmitter.prototype.removeListener = function (type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
          throw TypeError('listener must be a function');

        if (!this._events || !this._events[type])
          return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
          (isFunction(list.listener) && list.listener === listener)) {
          delete this._events[type];
          if (this._events.removeListener)
            this.emit('removeListener', type, listener);

        } else if (isObject(list)) {
          for (i = length; i-- > 0;) {
            if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }

          if (this._events.removeListener)
            this.emit('removeListener', type, listener);
        }

        return this;
      };

      EventEmitter.prototype.removeAllListeners = function (type) {
        var key, listeners;

        if (!this._events)
          return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
          if (arguments.length === 0)
            this._events = {};
          else if (this._events[type])
            delete this._events[type];
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = {};
          return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else {
          // LIFO order
          while (listeners.length)
            this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
      };

      EventEmitter.prototype.listeners = function (type) {
        var ret;
        if (!this._events || !this._events[type])
          ret = [];
        else if (isFunction(this._events[type]))
          ret = [this._events[type]];
        else
          ret = this._events[type].slice();
        return ret;
      };

      EventEmitter.listenerCount = function (emitter, type) {
        var ret;
        if (!emitter._events || !emitter._events[type])
          ret = 0;
        else if (isFunction(emitter._events[type]))
          ret = 1;
        else
          ret = emitter._events[type].length;
        return ret;
      };

      function isFunction(arg) {
        return typeof arg === 'function';
      }

      function isNumber(arg) {
        return typeof arg === 'number';
      }

      function isObject(arg) {
        return typeof arg === 'object' && arg !== null;
      }

      function isUndefined(arg) {
        return arg === void 0;
      }

    }, {}
  ],
  4: [
    function (require, module, exports) {
      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = (function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f)
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      })();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {
      }

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      }

      // TODO(shtylman)
      process.cwd = function () {
        return '/'
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };

    }, {}
  ],
  5: [
    function (require, module, exports) {
      (function (process, global) {
        (function (global) {
          'use strict';
          if (global.$traceurRuntime) {
            return;
          }
          var $Object = Object;
          var $TypeError = TypeError;
          var $create = $Object.create;
          var $defineProperties = $Object.defineProperties;
          var $defineProperty = $Object.defineProperty;
          var $freeze = $Object.freeze;
          var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
          var $getOwnPropertyNames = $Object.getOwnPropertyNames;
          var $keys = $Object.keys;
          var $hasOwnProperty = $Object.prototype.hasOwnProperty;
          var $toString = $Object.prototype.toString;
          var $preventExtensions = Object.preventExtensions;
          var $seal = Object.seal;
          var $isExtensible = Object.isExtensible;

          function nonEnum(value) {
            return {
              configurable: true,
              enumerable: false,
              value: value,
              writable: true
            };
          }

          var types = {
            void: function voidType() {
            },
            any: function any() {
            },
            string: function string() {
            },
            number: function number() {
            },
            boolean: function boolean() {
            }
          };
          var method = nonEnum;
          var counter = 0;

          function newUniqueString() {
            return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
          }

          var symbolInternalProperty = newUniqueString();
          var symbolDescriptionProperty = newUniqueString();
          var symbolDataProperty = newUniqueString();
          var symbolValues = $create(null);
          var privateNames = $create(null);

          function createPrivateName() {
            var s = newUniqueString();
            privateNames[s] = true;
            return s;
          }

          function isSymbol(symbol) {
            return typeof symbol === 'object' && symbol instanceof SymbolValue;
          }

          function typeOf(v) {
            if (isSymbol(v))
              return 'symbol';
            return typeof v;
          }

          function Symbol(description) {
            var value = new SymbolValue(description);
            if (!(this instanceof Symbol))
              return value;
            throw new TypeError('Symbol cannot be new\'ed');
          }

          $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
          $defineProperty(Symbol.prototype, 'toString', method(function () {
            var symbolValue = this[symbolDataProperty];
            if (!getOption('symbols'))
              return symbolValue[symbolInternalProperty];
            if (!symbolValue)
              throw TypeError('Conversion from symbol to string');
            var desc = symbolValue[symbolDescriptionProperty];
            if (desc === undefined)
              desc = '';
            return 'Symbol(' + desc + ')';
          }));
          $defineProperty(Symbol.prototype, 'valueOf', method(function () {
            var symbolValue = this[symbolDataProperty];
            if (!symbolValue)
              throw TypeError('Conversion from symbol to string');
            if (!getOption('symbols'))
              return symbolValue[symbolInternalProperty];
            return symbolValue;
          }));

          function SymbolValue(description) {
            var key = newUniqueString();
            $defineProperty(this, symbolDataProperty, {
              value: this
            });
            $defineProperty(this, symbolInternalProperty, {
              value: key
            });
            $defineProperty(this, symbolDescriptionProperty, {
              value: description
            });
            freeze(this);
            symbolValues[key] = this;
          }

          $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
          $defineProperty(SymbolValue.prototype, 'toString', {
            value: Symbol.prototype.toString,
            enumerable: false
          });
          $defineProperty(SymbolValue.prototype, 'valueOf', {
            value: Symbol.prototype.valueOf,
            enumerable: false
          });
          var hashProperty = createPrivateName();
          var hashPropertyDescriptor = {
            value: undefined
          };
          var hashObjectProperties = {
            hash: {
              value: undefined
            },
            self: {
              value: undefined
            }
          };
          var hashCounter = 0;

          function getOwnHashObject(object) {
            var hashObject = object[hashProperty];
            if (hashObject && hashObject.self === object)
              return hashObject;
            if ($isExtensible(object)) {
              hashObjectProperties.hash.value = hashCounter++;
              hashObjectProperties.self.value = object;
              hashPropertyDescriptor.value = $create(null, hashObjectProperties);
              $defineProperty(object, hashProperty, hashPropertyDescriptor);
              return hashPropertyDescriptor.value;
            }
            return undefined;
          }

          function freeze(object) {
            getOwnHashObject(object);
            return $freeze.apply(this, arguments);
          }

          function preventExtensions(object) {
            getOwnHashObject(object);
            return $preventExtensions.apply(this, arguments);
          }

          function seal(object) {
            getOwnHashObject(object);
            return $seal.apply(this, arguments);
          }

          Symbol.iterator = Symbol();
          freeze(SymbolValue.prototype);

          function toProperty(name) {
            if (isSymbol(name))
              return name[symbolInternalProperty];
            return name;
          }

          function getOwnPropertyNames(object) {
            var rv = [];
            var names = $getOwnPropertyNames(object);
            for (var i = 0; i < names.length; i++) {
              var name = names[i];
              if (!symbolValues[name] && !privateNames[name])
                rv.push(name);
            }
            return rv;
          }

          function getOwnPropertyDescriptor(object, name) {
            return $getOwnPropertyDescriptor(object, toProperty(name));
          }

          function getOwnPropertySymbols(object) {
            var rv = [];
            var names = $getOwnPropertyNames(object);
            for (var i = 0; i < names.length; i++) {
              var symbol = symbolValues[names[i]];
              if (symbol)
                rv.push(symbol);
            }
            return rv;
          }

          function hasOwnProperty(name) {
            return $hasOwnProperty.call(this, toProperty(name));
          }

          function getOption(name) {
            return global.traceur && global.traceur.options[name];
          }

          function setProperty(object, name, value) {
            var sym,
              desc;
            if (isSymbol(name)) {
              sym = name;
              name = name[symbolInternalProperty];
            }
            object[name] = value;
            if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
              $defineProperty(object, name, {
                enumerable: false
              });
            return value;
          }

          function defineProperty(object, name, descriptor) {
            if (isSymbol(name)) {
              if (descriptor.enumerable) {
                descriptor = $create(descriptor, {
                  enumerable: {
                    value: false
                  }
                });
              }
              name = name[symbolInternalProperty];
            }
            $defineProperty(object, name, descriptor);
            return object;
          }

          function polyfillObject(Object) {
            $defineProperty(Object, 'defineProperty', {
              value: defineProperty
            });
            $defineProperty(Object, 'getOwnPropertyNames', {
              value: getOwnPropertyNames
            });
            $defineProperty(Object, 'getOwnPropertyDescriptor', {
              value: getOwnPropertyDescriptor
            });
            $defineProperty(Object.prototype, 'hasOwnProperty', {
              value: hasOwnProperty
            });
            $defineProperty(Object, 'freeze', {
              value: freeze
            });
            $defineProperty(Object, 'preventExtensions', {
              value: preventExtensions
            });
            $defineProperty(Object, 'seal', {
              value: seal
            });
            Object.getOwnPropertySymbols = getOwnPropertySymbols;
          }

          function exportStar(object) {
            for (var i = 1; i < arguments.length; i++) {
              var names = $getOwnPropertyNames(arguments[i]);
              for (var j = 0; j < names.length; j++) {
                var name = names[j];
                if (privateNames[name])
                  continue;
                (function (mod, name) {
                  $defineProperty(object, name, {
                    get: function () {
                      return mod[name];
                    },
                    enumerable: true
                  });
                })(arguments[i], names[j]);
              }
            }
            return object;
          }

          function isObject(x) {
            return x != null && (typeof x === 'object' || typeof x === 'function');
          }

          function toObject(x) {
            if (x == null)
              throw $TypeError();
            return $Object(x);
          }

          function checkObjectCoercible(argument) {
            if (argument == null) {
              throw new TypeError('Value cannot be converted to an Object');
            }
            return argument;
          }

          function setupGlobals(global) {
            global.Symbol = Symbol;
            global.Reflect = global.Reflect || {};
            global.Reflect.global = global.Reflect.global || global;
            polyfillObject(global.Object);
          }

          setupGlobals(global);
          global.$traceurRuntime = {
            createPrivateName: createPrivateName,
            exportStar: exportStar,
            getOwnHashObject: getOwnHashObject,
            privateNames: privateNames,
            setProperty: setProperty,
            setupGlobals: setupGlobals,
            toObject: toObject,
            isObject: isObject,
            toProperty: toProperty,
            type: types,
            typeof: typeOf,
            checkObjectCoercible: checkObjectCoercible,
            hasOwnProperty: function (o, p) {
              return hasOwnProperty.call(o, p);
            },
            defineProperties: $defineProperties,
            defineProperty: $defineProperty,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            getOwnPropertyNames: $getOwnPropertyNames,
            keys: $keys
          };
        })(typeof global !== 'undefined' ? global : this);
        (function () {
          'use strict';

          function spread() {
            var rv = [],
              j = 0,
              iterResult;
            for (var i = 0; i < arguments.length; i++) {
              var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
              if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
                throw new TypeError('Cannot spread non-iterable object.');
              }
              var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
              while (!(iterResult = iter.next()).done) {
                rv[j++] = iterResult.value;
              }
            }
            return rv;
          }

          $traceurRuntime.spread = spread;
        })();
        (function () {
          'use strict';
          var $Object = Object;
          var $TypeError = TypeError;
          var $create = $Object.create;
          var $defineProperties = $traceurRuntime.defineProperties;
          var $defineProperty = $traceurRuntime.defineProperty;
          var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
          var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
          var $getPrototypeOf = Object.getPrototypeOf;

          function superDescriptor(homeObject, name) {
            var proto = $getPrototypeOf(homeObject);
            do {
              var result = $getOwnPropertyDescriptor(proto, name);
              if (result)
                return result;
              proto = $getPrototypeOf(proto);
            } while (proto);
            return undefined;
          }

          function superCall(self, homeObject, name, args) {
            return superGet(self, homeObject, name).apply(self, args);
          }

          function superGet(self, homeObject, name) {
            var descriptor = superDescriptor(homeObject, name);
            if (descriptor) {
              if (!descriptor.get)
                return descriptor.value;
              return descriptor.get.call(self);
            }
            return undefined;
          }

          function superSet(self, homeObject, name, value) {
            var descriptor = superDescriptor(homeObject, name);
            if (descriptor && descriptor.set) {
              descriptor.set.call(self, value);
              return value;
            }
            throw $TypeError("super has no setter '" + name + "'.");
          }

          function getDescriptors(object) {
            var descriptors = {},
              name,
              names = $getOwnPropertyNames(object);
            for (var i = 0; i < names.length; i++) {
              var name = names[i];
              descriptors[name] = $getOwnPropertyDescriptor(object, name);
            }
            return descriptors;
          }

          function createClass(ctor, object, staticObject, superClass) {
            $defineProperty(object, 'constructor', {
              value: ctor,
              configurable: true,
              enumerable: false,
              writable: true
            });
            if (arguments.length > 3) {
              if (typeof superClass === 'function')
                ctor.__proto__ = superClass;
              ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
            } else {
              ctor.prototype = object;
            }
            $defineProperty(ctor, 'prototype', {
              configurable: false,
              writable: false
            });
            return $defineProperties(ctor, getDescriptors(staticObject));
          }

          function getProtoParent(superClass) {
            if (typeof superClass === 'function') {
              var prototype = superClass.prototype;
              if ($Object(prototype) === prototype || prototype === null)
                return superClass.prototype;
              throw new $TypeError('super prototype must be an Object or null');
            }
            if (superClass === null)
              return null;
            throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
          }

          function defaultSuperCall(self, homeObject, args) {
            if ($getPrototypeOf(homeObject) !== null)
              superCall(self, homeObject, 'constructor', args);
          }

          $traceurRuntime.createClass = createClass;
          $traceurRuntime.defaultSuperCall = defaultSuperCall;
          $traceurRuntime.superCall = superCall;
          $traceurRuntime.superGet = superGet;
          $traceurRuntime.superSet = superSet;
        })();
        (function () {
          'use strict';
          var createPrivateName = $traceurRuntime.createPrivateName;
          var $defineProperties = $traceurRuntime.defineProperties;
          var $defineProperty = $traceurRuntime.defineProperty;
          var $create = Object.create;
          var $TypeError = TypeError;

          function nonEnum(value) {
            return {
              configurable: true,
              enumerable: false,
              value: value,
              writable: true
            };
          }

          var ST_NEWBORN = 0;
          var ST_EXECUTING = 1;
          var ST_SUSPENDED = 2;
          var ST_CLOSED = 3;
          var END_STATE = -2;
          var RETHROW_STATE = -3;

          function getInternalError(state) {
            return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
          }

          function GeneratorContext() {
            this.state = 0;
            this.GState = ST_NEWBORN;
            this.storedException = undefined;
            this.finallyFallThrough = undefined;
            this.sent_ = undefined;
            this.returnValue = undefined;
            this.tryStack_ = [];
          }

          GeneratorContext.prototype = {
            pushTry: function (catchState, finallyState) {
              if (finallyState !== null) {
                var finallyFallThrough = null;
                for (var i = this.tryStack_.length - 1; i >= 0; i--) {
                  if (this.tryStack_[i].catch !== undefined) {
                    finallyFallThrough = this.tryStack_[i].catch;
                    break;
                  }
                }
                if (finallyFallThrough === null)
                  finallyFallThrough = RETHROW_STATE;
                this.tryStack_.push({
                  finally: finallyState,
                  finallyFallThrough: finallyFallThrough
                });
              }
              if (catchState !== null) {
                this.tryStack_.push({
                  catch: catchState
                });
              }
            },
            popTry: function () {
              this.tryStack_.pop();
            },
            get sent() {
              this.maybeThrow();
              return this.sent_;
            },
            set sent(v) {
              this.sent_ = v;
            },
            get sentIgnoreThrow() {
              return this.sent_;
            },
            maybeThrow: function () {
              if (this.action === 'throw') {
                this.action = 'next';
                throw this.sent_;
              }
            },
            end: function () {
              switch (this.state) {
                case END_STATE:
                  return this;
                case RETHROW_STATE:
                  throw this.storedException;
                default:
                  throw getInternalError(this.state);
              }
            },
            handleException: function (ex) {
              this.GState = ST_CLOSED;
              this.state = END_STATE;
              throw ex;
            }
          };

          function nextOrThrow(ctx, moveNext, action, x) {
            switch (ctx.GState) {
              case ST_EXECUTING:
                throw new Error(("\"" + action + "\" on executing generator"));
              case ST_CLOSED:
                if (action == 'next') {
                  return {
                    value: undefined,
                    done: true
                  };
                }
                throw x;
              case ST_NEWBORN:
                if (action === 'throw') {
                  ctx.GState = ST_CLOSED;
                  throw x;
                }
                if (x !== undefined)
                  throw $TypeError('Sent value to newborn generator');
              case ST_SUSPENDED:
                ctx.GState = ST_EXECUTING;
                ctx.action = action;
                ctx.sent = x;
                var value = moveNext(ctx);
                var done = value === ctx;
                if (done)
                  value = ctx.returnValue;
                ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
                return {
                  value: value,
                  done: done
                };
            }
          }

          var ctxName = createPrivateName();
          var moveNextName = createPrivateName();

          function GeneratorFunction() {
          }

          function GeneratorFunctionPrototype() {
          }

          GeneratorFunction.prototype = GeneratorFunctionPrototype;
          $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
          GeneratorFunctionPrototype.prototype = {
            constructor: GeneratorFunctionPrototype,
            next: function (v) {
              return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
            },
            throw: function (v) {
              return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
            }
          };
          $defineProperties(GeneratorFunctionPrototype.prototype, {
            constructor: {
              enumerable: false
            },
            next: {
              enumerable: false
            },
            throw: {
              enumerable: false
            }
          });
          Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function () {
            return this;
          }));

          function createGeneratorInstance(innerFunction, functionObject, self) {
            var moveNext = getMoveNext(innerFunction, self);
            var ctx = new GeneratorContext();
            var object = $create(functionObject.prototype);
            object[ctxName] = ctx;
            object[moveNextName] = moveNext;
            return object;
          }

          function initGeneratorFunction(functionObject) {
            functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
            functionObject.__proto__ = GeneratorFunctionPrototype;
            return functionObject;
          }

          function AsyncFunctionContext() {
            GeneratorContext.call(this);
            this.err = undefined;
            var ctx = this;
            ctx.result = new Promise(function (resolve, reject) {
              ctx.resolve = resolve;
              ctx.reject = reject;
            });
          }

          AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
          AsyncFunctionContext.prototype.end = function () {
            switch (this.state) {
              case END_STATE:
                this.resolve(this.returnValue);
                break;
              case RETHROW_STATE:
                this.reject(this.storedException);
                break;
              default:
                this.reject(getInternalError(this.state));
            }
          };
          AsyncFunctionContext.prototype.handleException = function () {
            this.state = RETHROW_STATE;
          };

          function asyncWrap(innerFunction, self) {
            var moveNext = getMoveNext(innerFunction, self);
            var ctx = new AsyncFunctionContext();
            ctx.createCallback = function (newState) {
              return function (value) {
                ctx.state = newState;
                ctx.value = value;
                moveNext(ctx);
              };
            };
            ctx.errback = function (err) {
              handleCatch(ctx, err);
              moveNext(ctx);
            };
            moveNext(ctx);
            return ctx.result;
          }

          function getMoveNext(innerFunction, self) {
            return function (ctx) {
              while (true) {
                try {
                  return innerFunction.call(self, ctx);
                } catch (ex) {
                  handleCatch(ctx, ex);
                }
              }
            };
          }

          function handleCatch(ctx, ex) {
            ctx.storedException = ex;
            var last = ctx.tryStack_[ctx.tryStack_.length - 1];
            if (!last) {
              ctx.handleException(ex);
              return;
            }
            ctx.state = last.catch !== undefined ? last.catch : last.finally;
            if (last.finallyFallThrough !== undefined)
              ctx.finallyFallThrough = last.finallyFallThrough;
          }

          $traceurRuntime.asyncWrap = asyncWrap;
          $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
          $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
        })();
        (function () {
          function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
            var out = [];
            if (opt_scheme) {
              out.push(opt_scheme, ':');
            }
            if (opt_domain) {
              out.push('//');
              if (opt_userInfo) {
                out.push(opt_userInfo, '@');
              }
              out.push(opt_domain);
              if (opt_port) {
                out.push(':', opt_port);
              }
            }
            if (opt_path) {
              out.push(opt_path);
            }
            if (opt_queryData) {
              out.push('?', opt_queryData);
            }
            if (opt_fragment) {
              out.push('#', opt_fragment);
            }
            return out.join('');
          };
          var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
          var ComponentIndex = {
            SCHEME: 1,
            USER_INFO: 2,
            DOMAIN: 3,
            PORT: 4,
            PATH: 5,
            QUERY_DATA: 6,
            FRAGMENT: 7
          };

          function split(uri) {
            return (uri.match(splitRe));
          }

          function removeDotSegments(path) {
            if (path === '/')
              return '/';
            var leadingSlash = path[0] === '/' ? '/' : '';
            var trailingSlash = path.slice(-1) === '/' ? '/' : '';
            var segments = path.split('/');
            var out = [];
            var up = 0;
            for (var pos = 0; pos < segments.length; pos++) {
              var segment = segments[pos];
              switch (segment) {
                case '':
                case '.':
                  break;
                case '..':
                  if (out.length)
                    out.pop();
                  else
                    up++;
                  break;
                default:
                  out.push(segment);
              }
            }
            if (!leadingSlash) {
              while (up-- > 0) {
                out.unshift('..');
              }
              if (out.length === 0)
                out.push('.');
            }
            return leadingSlash + out.join('/') + trailingSlash;
          }

          function joinAndCanonicalizePath(parts) {
            var path = parts[ComponentIndex.PATH] || '';
            path = removeDotSegments(path);
            parts[ComponentIndex.PATH] = path;
            return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
          }

          function canonicalizeUrl(url) {
            var parts = split(url);
            return joinAndCanonicalizePath(parts);
          }

          function resolveUrl(base, url) {
            var parts = split(url);
            var baseParts = split(base);
            if (parts[ComponentIndex.SCHEME]) {
              return joinAndCanonicalizePath(parts);
            } else {
              parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
            }
            for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
              if (!parts[i]) {
                parts[i] = baseParts[i];
              }
            }
            if (parts[ComponentIndex.PATH][0] == '/') {
              return joinAndCanonicalizePath(parts);
            }
            var path = baseParts[ComponentIndex.PATH];
            var index = path.lastIndexOf('/');
            path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
            parts[ComponentIndex.PATH] = path;
            return joinAndCanonicalizePath(parts);
          }

          function isAbsolute(name) {
            if (!name)
              return false;
            if (name[0] === '/')
              return true;
            var parts = split(name);
            if (parts[ComponentIndex.SCHEME])
              return true;
            return false;
          }

          $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
          $traceurRuntime.isAbsolute = isAbsolute;
          $traceurRuntime.removeDotSegments = removeDotSegments;
          $traceurRuntime.resolveUrl = resolveUrl;
        })();
        (function (global) {
          'use strict';
          var $__2 = $traceurRuntime,
            canonicalizeUrl = $__2.canonicalizeUrl,
            resolveUrl = $__2.resolveUrl,
            isAbsolute = $__2.isAbsolute;
          var moduleInstantiators = Object.create(null);
          var baseURL;
          if (global.location && global.location.href)
            baseURL = resolveUrl(global.location.href, './');
          else
            baseURL = '';
          var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
            this.url = url;
            this.value_ = uncoatedModule;
          };
          ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
          var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
            this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
            if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
              this.stack = this.stripStack(cause.stack);
            else
              this.stack = '';
          };
          var $ModuleEvaluationError = ModuleEvaluationError;
          ($traceurRuntime.createClass)(ModuleEvaluationError, {
            stripError: function (message) {
              return message.replace(/.*Error:/, this.constructor.name + ':');
            },
            stripCause: function (cause) {
              if (!cause)
                return '';
              if (!cause.message)
                return cause + '';
              return this.stripError(cause.message);
            },
            loadedBy: function (moduleName) {
              this.stack += '\n loaded by ' + moduleName;
            },
            stripStack: function (causeStack) {
              var stack = [];
              causeStack.split('\n').some((function (frame) {
                if (/UncoatedModuleInstantiator/.test(frame))
                  return true;
                stack.push(frame);
              }));
              stack[0] = this.stripError(stack[0]);
              return stack.join('\n');
            }
          }, {}, Error);
          var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
            $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
            this.func = func;
          };
          var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
          ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {
            getUncoatedModule: function () {
              if (this.value_)
                return this.value_;
              try {
                return this.value_ = this.func.call(global);
              } catch (ex) {
                if (ex instanceof ModuleEvaluationError) {
                  ex.loadedBy(this.url);
                  throw ex;
                }
                throw new ModuleEvaluationError(this.url, ex);
              }
            }
          }, {}, UncoatedModuleEntry);

          function getUncoatedModuleInstantiator(name) {
            if (!name)
              return;
            var url = ModuleStore.normalize(name);
            return moduleInstantiators[url];
          };
          var moduleInstances = Object.create(null);
          var liveModuleSentinel = {};

          function Module(uncoatedModule) {
            var isLive = arguments[1];
            var coatedModule = Object.create(null);
            Object.getOwnPropertyNames(uncoatedModule).forEach((function (name) {
              var getter,
                value;
              if (isLive === liveModuleSentinel) {
                var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
                if (descr.get)
                  getter = descr.get;
              }
              if (!getter) {
                value = uncoatedModule[name];
                getter = function () {
                  return value;
                };
              }
              Object.defineProperty(coatedModule, name, {
                get: getter,
                enumerable: true
              });
            }));
            Object.preventExtensions(coatedModule);
            return coatedModule;
          }

          var ModuleStore = {
            normalize: function (name, refererName, refererAddress) {
              if (typeof name !== "string")
                throw new TypeError("module name must be a string, not " + typeof name);
              if (isAbsolute(name))
                return canonicalizeUrl(name);
              if (/[^\.]\/\.\.\//.test(name)) {
                throw new Error('module name embeds /../: ' + name);
              }
              if (name[0] === '.' && refererName)
                return resolveUrl(refererName, name);
              return canonicalizeUrl(name);
            },
            get: function (normalizedName) {
              var m = getUncoatedModuleInstantiator(normalizedName);
              if (!m)
                return undefined;
              var moduleInstance = moduleInstances[m.url];
              if (moduleInstance)
                return moduleInstance;
              moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
              return moduleInstances[m.url] = moduleInstance;
            },
            set: function (normalizedName, module) {
              normalizedName = String(normalizedName);
              moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function () {
                return module;
              }));
              moduleInstances[normalizedName] = module;
            },
            get baseURL() {
              return baseURL;
            },
            set baseURL(v) {
              baseURL = String(v);
            },
            registerModule: function (name, func) {
              var normalizedName = ModuleStore.normalize(name);
              if (moduleInstantiators[normalizedName])
                throw new Error('duplicate module named ' + normalizedName);
              moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
            },
            bundleStore: Object.create(null),
            register: function (name, deps, func) {
              if (!deps || !deps.length && !func.length) {
                this.registerModule(name, func);
              } else {
                this.bundleStore[name] = {
                  deps: deps,
                  execute: function () {
                    var $__0 = arguments;
                    var depMap = {};
                    deps.forEach((function (dep, index) {
                      return depMap[dep] = $__0[index];
                    }));
                    var registryEntry = func.call(this, depMap);
                    registryEntry.execute.call(this);
                    return registryEntry.exports;
                  }
                };
              }
            },
            getAnonymousModule: function (func) {
              return new Module(func.call(global), liveModuleSentinel);
            },
            getForTesting: function (name) {
              var $__0 = this;
              if (!this.testingPrefix_) {
                Object.keys(moduleInstances).some((function (key) {
                  var m = /(traceur@[^\/]*\/)/.exec(key);
                  if (m) {
                    $__0.testingPrefix_ = m[1];
                    return true;
                  }
                }));
              }
              return this.get(this.testingPrefix_ + name);
            }
          };
          ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({
            ModuleStore: ModuleStore
          }));
          var setupGlobals = $traceurRuntime.setupGlobals;
          $traceurRuntime.setupGlobals = function (global) {
            setupGlobals(global);
          };
          $traceurRuntime.ModuleStore = ModuleStore;
          global.System = {
            register: ModuleStore.register.bind(ModuleStore),
            get: ModuleStore.get,
            set: ModuleStore.set,
            normalize: ModuleStore.normalize
          };
          $traceurRuntime.getModuleImpl = function (name) {
            var instantiator = getUncoatedModuleInstantiator(name);
            return instantiator && instantiator.getUncoatedModule();
          };
        })(typeof global !== 'undefined' ? global : this);
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/utils", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/utils";
          var $ceil = Math.ceil;
          var $floor = Math.floor;
          var $isFinite = isFinite;
          var $isNaN = isNaN;
          var $pow = Math.pow;
          var $min = Math.min;
          var toObject = $traceurRuntime.toObject;

          function toUint32(x) {
            return x >>> 0;
          }

          function isObject(x) {
            return x && (typeof x === 'object' || typeof x === 'function');
          }

          function isCallable(x) {
            return typeof x === 'function';
          }

          function isNumber(x) {
            return typeof x === 'number';
          }

          function toInteger(x) {
            x = +x;
            if ($isNaN(x))
              return 0;
            if (x === 0 || !$isFinite(x))
              return x;
            return x > 0 ? $floor(x) : $ceil(x);
          }

          var MAX_SAFE_LENGTH = $pow(2, 53) - 1;

          function toLength(x) {
            var len = toInteger(x);
            return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
          }

          function checkIterable(x) {
            return !isObject(x) ? undefined : x[Symbol.iterator];
          }

          function isConstructor(x) {
            return isCallable(x);
          }

          function createIteratorResultObject(value, done) {
            return {
              value: value,
              done: done
            };
          }

          function maybeDefine(object, name, descr) {
            if (!(name in object)) {
              Object.defineProperty(object, name, descr);
            }
          }

          function maybeDefineMethod(object, name, value) {
            maybeDefine(object, name, {
              value: value,
              configurable: true,
              enumerable: false,
              writable: true
            });
          }

          function maybeDefineConst(object, name, value) {
            maybeDefine(object, name, {
              value: value,
              configurable: false,
              enumerable: false,
              writable: false
            });
          }

          function maybeAddFunctions(object, functions) {
            for (var i = 0; i < functions.length; i += 2) {
              var name = functions[i];
              var value = functions[i + 1];
              maybeDefineMethod(object, name, value);
            }
          }

          function maybeAddConsts(object, consts) {
            for (var i = 0; i < consts.length; i += 2) {
              var name = consts[i];
              var value = consts[i + 1];
              maybeDefineConst(object, name, value);
            }
          }

          function maybeAddIterator(object, func, Symbol) {
            if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
              return;
            if (object['@@iterator'])
              func = object['@@iterator'];
            Object.defineProperty(object, Symbol.iterator, {
              value: func,
              configurable: true,
              enumerable: false,
              writable: true
            });
          }

          var polyfills = [];

          function registerPolyfill(func) {
            polyfills.push(func);
          }

          function polyfillAll(global) {
            polyfills.forEach((function (f) {
              return f(global);
            }));
          }

          return {
            get toObject() {
              return toObject;
            },
            get toUint32() {
              return toUint32;
            },
            get isObject() {
              return isObject;
            },
            get isCallable() {
              return isCallable;
            },
            get isNumber() {
              return isNumber;
            },
            get toInteger() {
              return toInteger;
            },
            get toLength() {
              return toLength;
            },
            get checkIterable() {
              return checkIterable;
            },
            get isConstructor() {
              return isConstructor;
            },
            get createIteratorResultObject() {
              return createIteratorResultObject;
            },
            get maybeDefine() {
              return maybeDefine;
            },
            get maybeDefineMethod() {
              return maybeDefineMethod;
            },
            get maybeDefineConst() {
              return maybeDefineConst;
            },
            get maybeAddFunctions() {
              return maybeAddFunctions;
            },
            get maybeAddConsts() {
              return maybeAddConsts;
            },
            get maybeAddIterator() {
              return maybeAddIterator;
            },
            get registerPolyfill() {
              return registerPolyfill;
            },
            get polyfillAll() {
              return polyfillAll;
            }
          };
        });
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Map", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Map";
          var $__3 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            isObject = $__3.isObject,
            maybeAddIterator = $__3.maybeAddIterator,
            registerPolyfill = $__3.registerPolyfill;
          var getOwnHashObject = $traceurRuntime.getOwnHashObject;
          var $hasOwnProperty = Object.prototype.hasOwnProperty;
          var deletedSentinel = {};

          function lookupIndex(map, key) {
            if (isObject(key)) {
              var hashObject = getOwnHashObject(key);
              return hashObject && map.objectIndex_[hashObject.hash];
            }
            if (typeof key === 'string')
              return map.stringIndex_[key];
            return map.primitiveIndex_[key];
          }

          function initMap(map) {
            map.entries_ = [];
            map.objectIndex_ = Object.create(null);
            map.stringIndex_ = Object.create(null);
            map.primitiveIndex_ = Object.create(null);
            map.deletedCount_ = 0;
          }

          var Map = function Map() {
            var iterable = arguments[0];
            if (!isObject(this))
              throw new TypeError('Map called on incompatible type');
            if ($hasOwnProperty.call(this, 'entries_')) {
              throw new TypeError('Map can not be reentrantly initialised');
            }
            initMap(this);
            if (iterable !== null && iterable !== undefined) {
              for (var $__5 = iterable[Symbol.iterator](),
                     $__6; !($__6 = $__5.next()).done;) {
                var $__7 = $__6.value,
                  key = $__7[0],
                  value = $__7[1];
                {
                  this.set(key, value);
                }
              }
            }
          };
          ($traceurRuntime.createClass)(Map, {
            get size() {
              return this.entries_.length / 2 - this.deletedCount_;
            },
            get: function (key) {
              var index = lookupIndex(this, key);
              if (index !== undefined)
                return this.entries_[index + 1];
            },
            set: function (key, value) {
              var objectMode = isObject(key);
              var stringMode = typeof key === 'string';
              var index = lookupIndex(this, key);
              if (index !== undefined) {
                this.entries_[index + 1] = value;
              } else {
                index = this.entries_.length;
                this.entries_[index] = key;
                this.entries_[index + 1] = value;
                if (objectMode) {
                  var hashObject = getOwnHashObject(key);
                  var hash = hashObject.hash;
                  this.objectIndex_[hash] = index;
                } else if (stringMode) {
                  this.stringIndex_[key] = index;
                } else {
                  this.primitiveIndex_[key] = index;
                }
              }
              return this;
            },
            has: function (key) {
              return lookupIndex(this, key) !== undefined;
            },
            delete: function (key) {
              var objectMode = isObject(key);
              var stringMode = typeof key === 'string';
              var index;
              var hash;
              if (objectMode) {
                var hashObject = getOwnHashObject(key);
                if (hashObject) {
                  index = this.objectIndex_[hash = hashObject.hash];
                  delete this.objectIndex_[hash];
                }
              } else if (stringMode) {
                index = this.stringIndex_[key];
                delete this.stringIndex_[key];
              } else {
                index = this.primitiveIndex_[key];
                delete this.primitiveIndex_[key];
              }
              if (index !== undefined) {
                this.entries_[index] = deletedSentinel;
                this.entries_[index + 1] = undefined;
                this.deletedCount_++;
                return true;
              }
              return false;
            },
            clear: function () {
              initMap(this);
            },
            forEach: function (callbackFn) {
              var thisArg = arguments[1];
              for (var i = 0; i < this.entries_.length; i += 2) {
                var key = this.entries_[i];
                var value = this.entries_[i + 1];
                if (key === deletedSentinel)
                  continue;
                callbackFn.call(thisArg, value, key, this);
              }
            },
            entries: $traceurRuntime.initGeneratorFunction(function $__8() {
              var i,
                key,
                value;
              return $traceurRuntime.createGeneratorInstance(function ($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      i = 0;
                      $ctx.state = 12;
                      break;
                    case 12:
                      $ctx.state = (i < this.entries_.length) ? 8 : -2;
                      break;
                    case 4:
                      i += 2;
                      $ctx.state = 12;
                      break;
                    case 8:
                      key = this.entries_[i];
                      value = this.entries_[i + 1];
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = (key === deletedSentinel) ? 4 : 6;
                      break;
                    case 6:
                      $ctx.state = 2;
                      return [key, value];
                    case 2:
                      $ctx.maybeThrow();
                      $ctx.state = 4;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__8, this);
            }),
            keys: $traceurRuntime.initGeneratorFunction(function $__9() {
              var i,
                key,
                value;
              return $traceurRuntime.createGeneratorInstance(function ($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      i = 0;
                      $ctx.state = 12;
                      break;
                    case 12:
                      $ctx.state = (i < this.entries_.length) ? 8 : -2;
                      break;
                    case 4:
                      i += 2;
                      $ctx.state = 12;
                      break;
                    case 8:
                      key = this.entries_[i];
                      value = this.entries_[i + 1];
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = (key === deletedSentinel) ? 4 : 6;
                      break;
                    case 6:
                      $ctx.state = 2;
                      return key;
                    case 2:
                      $ctx.maybeThrow();
                      $ctx.state = 4;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__9, this);
            }),
            values: $traceurRuntime.initGeneratorFunction(function $__10() {
              var i,
                key,
                value;
              return $traceurRuntime.createGeneratorInstance(function ($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      i = 0;
                      $ctx.state = 12;
                      break;
                    case 12:
                      $ctx.state = (i < this.entries_.length) ? 8 : -2;
                      break;
                    case 4:
                      i += 2;
                      $ctx.state = 12;
                      break;
                    case 8:
                      key = this.entries_[i];
                      value = this.entries_[i + 1];
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = (key === deletedSentinel) ? 4 : 6;
                      break;
                    case 6:
                      $ctx.state = 2;
                      return value;
                    case 2:
                      $ctx.maybeThrow();
                      $ctx.state = 4;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__10, this);
            })
          }, {});
          Object.defineProperty(Map.prototype, Symbol.iterator, {
            configurable: true,
            writable: true,
            value: Map.prototype.entries
          });

          function polyfillMap(global) {
            var $__7 = global,
              Object = $__7.Object,
              Symbol = $__7.Symbol;
            if (!global.Map)
              global.Map = Map;
            var mapPrototype = global.Map.prototype;
            if (mapPrototype.entries) {
              maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
              maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function () {
                return this;
              }, Symbol);
            }
          }

          registerPolyfill(polyfillMap);
          return {
            get Map() {
              return Map;
            },
            get polyfillMap() {
              return polyfillMap;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Set";
          var $__11 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            isObject = $__11.isObject,
            maybeAddIterator = $__11.maybeAddIterator,
            registerPolyfill = $__11.registerPolyfill;
          var Map = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map;
          var getOwnHashObject = $traceurRuntime.getOwnHashObject;
          var $hasOwnProperty = Object.prototype.hasOwnProperty;

          function initSet(set) {
            set.map_ = new Map();
          }

          var Set = function Set() {
            var iterable = arguments[0];
            if (!isObject(this))
              throw new TypeError('Set called on incompatible type');
            if ($hasOwnProperty.call(this, 'map_')) {
              throw new TypeError('Set can not be reentrantly initialised');
            }
            initSet(this);
            if (iterable !== null && iterable !== undefined) {
              for (var $__15 = iterable[Symbol.iterator](),
                     $__16; !($__16 = $__15.next()).done;) {
                var item = $__16.value;
                {
                  this.add(item);
                }
              }
            }
          };
          ($traceurRuntime.createClass)(Set, {
            get size() {
              return this.map_.size;
            },
            has: function (key) {
              return this.map_.has(key);
            },
            add: function (key) {
              this.map_.set(key, key);
              return this;
            },
            delete: function (key) {
              return this.map_.delete(key);
            },
            clear: function () {
              return this.map_.clear();
            },
            forEach: function (callbackFn) {
              var thisArg = arguments[1];
              var $__13 = this;
              return this.map_.forEach((function (value, key) {
                callbackFn.call(thisArg, key, key, $__13);
              }));
            },
            values: $traceurRuntime.initGeneratorFunction(function $__18() {
              var $__19,
                $__20;
              return $traceurRuntime.createGeneratorInstance(function ($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      $__19 = this.map_.keys()[Symbol.iterator]();
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 12;
                      break;
                    case 12:
                      $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = ($__20.done) ? 3 : 2;
                      break;
                    case 3:
                      $ctx.sent = $__20.value;
                      $ctx.state = -2;
                      break;
                    case 2:
                      $ctx.state = 12;
                      return $__20.value;
                    default:
                      return $ctx.end();
                  }
              }, $__18, this);
            }),
            entries: $traceurRuntime.initGeneratorFunction(function $__21() {
              var $__22,
                $__23;
              return $traceurRuntime.createGeneratorInstance(function ($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      $__22 = this.map_.entries()[Symbol.iterator]();
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 12;
                      break;
                    case 12:
                      $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = ($__23.done) ? 3 : 2;
                      break;
                    case 3:
                      $ctx.sent = $__23.value;
                      $ctx.state = -2;
                      break;
                    case 2:
                      $ctx.state = 12;
                      return $__23.value;
                    default:
                      return $ctx.end();
                  }
              }, $__21, this);
            })
          }, {});
          Object.defineProperty(Set.prototype, Symbol.iterator, {
            configurable: true,
            writable: true,
            value: Set.prototype.values
          });
          Object.defineProperty(Set.prototype, 'keys', {
            configurable: true,
            writable: true,
            value: Set.prototype.values
          });

          function polyfillSet(global) {
            var $__17 = global,
              Object = $__17.Object,
              Symbol = $__17.Symbol;
            if (!global.Set)
              global.Set = Set;
            var setPrototype = global.Set.prototype;
            if (setPrototype.values) {
              maybeAddIterator(setPrototype, setPrototype.values, Symbol);
              maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function () {
                return this;
              }, Symbol);
            }
          }

          registerPolyfill(polyfillSet);
          return {
            get Set() {
              return Set;
            },
            get polyfillSet() {
              return polyfillSet;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set" + '');
        System.register("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap";
          var len = 0;

          function asap(callback, arg) {
            queue[len] = callback;
            queue[len + 1] = arg;
            len += 2;
            if (len === 2) {
              scheduleFlush();
            }
          }

          var $__default = asap;
          var browserGlobal = (typeof window !== 'undefined') ? window : {};
          var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
          var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

          function useNextTick() {
            return function () {
              process.nextTick(flush);
            };
          }

          function useMutationObserver() {
            var iterations = 0;
            var observer = new BrowserMutationObserver(flush);
            var node = document.createTextNode('');
            observer.observe(node, {
              characterData: true
            });
            return function () {
              node.data = (iterations = ++iterations % 2);
            };
          }

          function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
              channel.port2.postMessage(0);
            };
          }

          function useSetTimeout() {
            return function () {
              setTimeout(flush, 1);
            };
          }

          var queue = new Array(1000);

          function flush() {
            for (var i = 0; i < len; i += 2) {
              var callback = queue[i];
              var arg = queue[i + 1];
              callback(arg);
              queue[i] = undefined;
              queue[i + 1] = undefined;
            }
            len = 0;
          }

          var scheduleFlush;
          if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
            scheduleFlush = useNextTick();
          } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
          } else if (isWorker) {
            scheduleFlush = useMessageChannel();
          } else {
            scheduleFlush = useSetTimeout();
          }
          return {
            get
              default() {
              return $__default;
            }
          };
        });
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Promise";
          var async = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").default;
          var registerPolyfill = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill;
          var promiseRaw = {};

          function isPromise(x) {
            return x && typeof x === 'object' && x.status_ !== undefined;
          }

          function idResolveHandler(x) {
            return x;
          }

          function idRejectHandler(x) {
            throw x;
          }

          function chain(promise) {
            var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
            var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
            var deferred = getDeferred(promise.constructor);
            switch (promise.status_) {
              case undefined:
                throw TypeError;
              case 0:
                promise.onResolve_.push(onResolve, deferred);
                promise.onReject_.push(onReject, deferred);
                break;
              case +1:
                promiseEnqueue(promise.value_, [onResolve, deferred]);
                break;
              case -1:
                promiseEnqueue(promise.value_, [onReject, deferred]);
                break;
            }
            return deferred.promise;
          }

          function getDeferred(C) {
            if (this === $Promise) {
              var promise = promiseInit(new $Promise(promiseRaw));
              return {
                promise: promise,
                resolve: (function (x) {
                  promiseResolve(promise, x);
                }),
                reject: (function (r) {
                  promiseReject(promise, r);
                })
              };
            } else {
              var result = {};
              result.promise = new C((function (resolve, reject) {
                result.resolve = resolve;
                result.reject = reject;
              }));
              return result;
            }
          }

          function promiseSet(promise, status, value, onResolve, onReject) {
            promise.status_ = status;
            promise.value_ = value;
            promise.onResolve_ = onResolve;
            promise.onReject_ = onReject;
            return promise;
          }

          function promiseInit(promise) {
            return promiseSet(promise, 0, undefined, [], []);
          }

          var Promise = function Promise(resolver) {
            if (resolver === promiseRaw)
              return;
            if (typeof resolver !== 'function')
              throw new TypeError;
            var promise = promiseInit(this);
            try {
              resolver((function (x) {
                promiseResolve(promise, x);
              }), (function (r) {
                promiseReject(promise, r);
              }));
            } catch (e) {
              promiseReject(promise, e);
            }
          };
          ($traceurRuntime.createClass)(Promise, {
            catch: function (onReject) {
              return this.then(undefined, onReject);
            },
            then: function (onResolve, onReject) {
              if (typeof onResolve !== 'function')
                onResolve = idResolveHandler;
              if (typeof onReject !== 'function')
                onReject = idRejectHandler;
              var that = this;
              var constructor = this.constructor;
              return chain(this, function (x) {
                x = promiseCoerce(constructor, x);
                return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
              }, onReject);
            }
          }, {
            resolve: function (x) {
              if (this === $Promise) {
                if (isPromise(x)) {
                  return x;
                }
                return promiseSet(new $Promise(promiseRaw), +1, x);
              } else {
                return new this(function (resolve, reject) {
                  resolve(x);
                });
              }
            },
            reject: function (r) {
              if (this === $Promise) {
                return promiseSet(new $Promise(promiseRaw), -1, r);
              } else {
                return new this((function (resolve, reject) {
                  reject(r);
                }));
              }
            },
            all: function (values) {
              var deferred = getDeferred(this);
              var resolutions = [];
              try {
                var count = values.length;
                if (count === 0) {
                  deferred.resolve(resolutions);
                } else {
                  for (var i = 0; i < values.length; i++) {
                    this.resolve(values[i]).then(function (i, x) {
                      resolutions[i] = x;
                      if (--count === 0)
                        deferred.resolve(resolutions);
                    }.bind(undefined, i), (function (r) {
                      deferred.reject(r);
                    }));
                  }
                }
              } catch (e) {
                deferred.reject(e);
              }
              return deferred.promise;
            },
            race: function (values) {
              var deferred = getDeferred(this);
              try {
                for (var i = 0; i < values.length; i++) {
                  this.resolve(values[i]).then((function (x) {
                    deferred.resolve(x);
                  }), (function (r) {
                    deferred.reject(r);
                  }));
                }
              } catch (e) {
                deferred.reject(e);
              }
              return deferred.promise;
            }
          });
          var $Promise = Promise;
          var $PromiseReject = $Promise.reject;

          function promiseResolve(promise, x) {
            promiseDone(promise, +1, x, promise.onResolve_);
          }

          function promiseReject(promise, r) {
            promiseDone(promise, -1, r, promise.onReject_);
          }

          function promiseDone(promise, status, value, reactions) {
            if (promise.status_ !== 0)
              return;
            promiseEnqueue(value, reactions);
            promiseSet(promise, status, value);
          }

          function promiseEnqueue(value, tasks) {
            async((function () {
              for (var i = 0; i < tasks.length; i += 2) {
                promiseHandle(value, tasks[i], tasks[i + 1]);
              }
            }));
          }

          function promiseHandle(value, handler, deferred) {
            try {
              var result = handler(value);
              if (result === deferred.promise)
                throw new TypeError;
              else if (isPromise(result))
                chain(result, deferred.resolve, deferred.reject);
              else
                deferred.resolve(result);
            } catch (e) {
              try {
                deferred.reject(e);
              } catch (e) {
              }
            }
          }

          var thenableSymbol = '@@thenable';

          function isObject(x) {
            return x && (typeof x === 'object' || typeof x === 'function');
          }

          function promiseCoerce(constructor, x) {
            if (!isPromise(x) && isObject(x)) {
              var then;
              try {
                then = x.then;
              } catch (r) {
                var promise = $PromiseReject.call(constructor, r);
                x[thenableSymbol] = promise;
                return promise;
              }
              if (typeof then === 'function') {
                var p = x[thenableSymbol];
                if (p) {
                  return p;
                } else {
                  var deferred = getDeferred(constructor);
                  x[thenableSymbol] = deferred.promise;
                  try {
                    then.call(x, deferred.resolve, deferred.reject);
                  } catch (r) {
                    deferred.reject(r);
                  }
                  return deferred.promise;
                }
              }
            }
            return x;
          }

          function polyfillPromise(global) {
            if (!global.Promise)
              global.Promise = Promise;
          }

          registerPolyfill(polyfillPromise);
          return {
            get Promise() {
              return Promise;
            },
            get polyfillPromise() {
              return polyfillPromise;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function () {
          "use strict";
          var $__29;
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator";
          var $__27 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            createIteratorResultObject = $__27.createIteratorResultObject,
            isObject = $__27.isObject;
          var $__30 = $traceurRuntime,
            hasOwnProperty = $__30.hasOwnProperty,
            toProperty = $__30.toProperty;
          var iteratedString = Symbol('iteratedString');
          var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
          var StringIterator = function StringIterator() {
          };
          ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
            value: function () {
              var o = this;
              if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
                throw new TypeError('this must be a StringIterator object');
              }
              var s = o[toProperty(iteratedString)];
              if (s === undefined) {
                return createIteratorResultObject(undefined, true);
              }
              var position = o[toProperty(stringIteratorNextIndex)];
              var len = s.length;
              if (position >= len) {
                o[toProperty(iteratedString)] = undefined;
                return createIteratorResultObject(undefined, true);
              }
              var first = s.charCodeAt(position);
              var resultString;
              if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
                resultString = String.fromCharCode(first);
              } else {
                var second = s.charCodeAt(position + 1);
                if (second < 0xDC00 || second > 0xDFFF) {
                  resultString = String.fromCharCode(first);
                } else {
                  resultString = String.fromCharCode(first) + String.fromCharCode(second);
                }
              }
              o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
              return createIteratorResultObject(resultString, false);
            },
            configurable: true,
            enumerable: true,
            writable: true
          }), Object.defineProperty($__29, Symbol.iterator, {
            value: function () {
              return this;
            },
            configurable: true,
            enumerable: true,
            writable: true
          }), $__29), {});

          function createStringIterator(string) {
            var s = String(string);
            var iterator = Object.create(StringIterator.prototype);
            iterator[toProperty(iteratedString)] = s;
            iterator[toProperty(stringIteratorNextIndex)] = 0;
            return iterator;
          }

          return {
            get createStringIterator() {
              return createStringIterator;
            }
          };
        });
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/String";
          var createStringIterator = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator;
          var $__32 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            maybeAddFunctions = $__32.maybeAddFunctions,
            maybeAddIterator = $__32.maybeAddIterator,
            registerPolyfill = $__32.registerPolyfill;
          var $toString = Object.prototype.toString;
          var $indexOf = String.prototype.indexOf;
          var $lastIndexOf = String.prototype.lastIndexOf;

          function startsWith(search) {
            var string = String(this);
            if (this == null || $toString.call(search) == '[object RegExp]') {
              throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            var pos = position ? Number(position) : 0;
            if (isNaN(pos)) {
              pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            return $indexOf.call(string, searchString, pos) == start;
          }

          function endsWith(search) {
            var string = String(this);
            if (this == null || $toString.call(search) == '[object RegExp]') {
              throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var pos = stringLength;
            if (arguments.length > 1) {
              var position = arguments[1];
              if (position !== undefined) {
                pos = position ? Number(position) : 0;
                if (isNaN(pos)) {
                  pos = 0;
                }
              }
            }
            var end = Math.min(Math.max(pos, 0), stringLength);
            var start = end - searchLength;
            if (start < 0) {
              return false;
            }
            return $lastIndexOf.call(string, searchString, start) == start;
          }

          function contains(search) {
            if (this == null) {
              throw TypeError();
            }
            var string = String(this);
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            var pos = position ? Number(position) : 0;
            if (isNaN(pos)) {
              pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            return $indexOf.call(string, searchString, pos) != -1;
          }

          function repeat(count) {
            if (this == null) {
              throw TypeError();
            }
            var string = String(this);
            var n = count ? Number(count) : 0;
            if (isNaN(n)) {
              n = 0;
            }
            if (n < 0 || n == Infinity) {
              throw RangeError();
            }
            if (n == 0) {
              return '';
            }
            var result = '';
            while (n--) {
              result += string;
            }
            return result;
          }

          function codePointAt(position) {
            if (this == null) {
              throw TypeError();
            }
            var string = String(this);
            var size = string.length;
            var index = position ? Number(position) : 0;
            if (isNaN(index)) {
              index = 0;
            }
            if (index < 0 || index >= size) {
              return undefined;
            }
            var first = string.charCodeAt(index);
            var second;
            if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
              second = string.charCodeAt(index + 1);
              if (second >= 0xDC00 && second <= 0xDFFF) {
                return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
              }
            }
            return first;
          }

          function raw(callsite) {
            var raw = callsite.raw;
            var len = raw.length >>> 0;
            if (len === 0)
              return '';
            var s = '';
            var i = 0;
            while (true) {
              s += raw[i];
              if (i + 1 === len)
                return s;
              s += arguments[++i];
            }
          }

          function fromCodePoint() {
            var codeUnits = [];
            var floor = Math.floor;
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return '';
            }
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
                throw RangeError('Invalid code point: ' + codePoint);
              }
              if (codePoint <= 0xFFFF) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 0x10000;
                highSurrogate = (codePoint >> 10) + 0xD800;
                lowSurrogate = (codePoint % 0x400) + 0xDC00;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
            }
            return String.fromCharCode.apply(null, codeUnits);
          }

          function stringPrototypeIterator() {
            var o = $traceurRuntime.checkObjectCoercible(this);
            var s = String(o);
            return createStringIterator(s);
          }

          function polyfillString(global) {
            var String = global.String;
            maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
            maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
            maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
          }

          registerPolyfill(polyfillString);
          return {
            get startsWith() {
              return startsWith;
            },
            get endsWith() {
              return endsWith;
            },
            get contains() {
              return contains;
            },
            get repeat() {
              return repeat;
            },
            get codePointAt() {
              return codePointAt;
            },
            get raw() {
              return raw;
            },
            get fromCodePoint() {
              return fromCodePoint;
            },
            get stringPrototypeIterator() {
              return stringPrototypeIterator;
            },
            get polyfillString() {
              return polyfillString;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function () {
          "use strict";
          var $__36;
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator";
          var $__34 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            toObject = $__34.toObject,
            toUint32 = $__34.toUint32,
            createIteratorResultObject = $__34.createIteratorResultObject;
          var ARRAY_ITERATOR_KIND_KEYS = 1;
          var ARRAY_ITERATOR_KIND_VALUES = 2;
          var ARRAY_ITERATOR_KIND_ENTRIES = 3;
          var ArrayIterator = function ArrayIterator() {
          };
          ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
            value: function () {
              var iterator = toObject(this);
              var array = iterator.iteratorObject_;
              if (!array) {
                throw new TypeError('Object is not an ArrayIterator');
              }
              var index = iterator.arrayIteratorNextIndex_;
              var itemKind = iterator.arrayIterationKind_;
              var length = toUint32(array.length);
              if (index >= length) {
                iterator.arrayIteratorNextIndex_ = Infinity;
                return createIteratorResultObject(undefined, true);
              }
              iterator.arrayIteratorNextIndex_ = index + 1;
              if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
                return createIteratorResultObject(array[index], false);
              if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
                return createIteratorResultObject([index, array[index]], false);
              return createIteratorResultObject(index, false);
            },
            configurable: true,
            enumerable: true,
            writable: true
          }), Object.defineProperty($__36, Symbol.iterator, {
            value: function () {
              return this;
            },
            configurable: true,
            enumerable: true,
            writable: true
          }), $__36), {});

          function createArrayIterator(array, kind) {
            var object = toObject(array);
            var iterator = new ArrayIterator;
            iterator.iteratorObject_ = object;
            iterator.arrayIteratorNextIndex_ = 0;
            iterator.arrayIterationKind_ = kind;
            return iterator;
          }

          function entries() {
            return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
          }

          function keys() {
            return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
          }

          function values() {
            return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
          }

          return {
            get entries() {
              return entries;
            },
            get keys() {
              return keys;
            },
            get values() {
              return values;
            }
          };
        });
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Array";
          var $__37 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"),
            entries = $__37.entries,
            keys = $__37.keys,
            values = $__37.values;
          var $__38 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            checkIterable = $__38.checkIterable,
            isCallable = $__38.isCallable,
            isConstructor = $__38.isConstructor,
            maybeAddFunctions = $__38.maybeAddFunctions,
            maybeAddIterator = $__38.maybeAddIterator,
            registerPolyfill = $__38.registerPolyfill,
            toInteger = $__38.toInteger,
            toLength = $__38.toLength,
            toObject = $__38.toObject;

          function from(arrLike) {
            var mapFn = arguments[1];
            var thisArg = arguments[2];
            var C = this;
            var items = toObject(arrLike);
            var mapping = mapFn !== undefined;
            var k = 0;
            var arr,
              len;
            if (mapping && !isCallable(mapFn)) {
              throw TypeError();
            }
            if (checkIterable(items)) {
              arr = isConstructor(C) ? new C() : [];
              for (var $__39 = items[Symbol.iterator](),
                     $__40; !($__40 = $__39.next()).done;) {
                var item = $__40.value;
                {
                  if (mapping) {
                    arr[k] = mapFn.call(thisArg, item, k);
                  } else {
                    arr[k] = item;
                  }
                  k++;
                }
              }
              arr.length = k;
              return arr;
            }
            len = toLength(items.length);
            arr = isConstructor(C) ? new C(len) : new Array(len);
            for (; k < len; k++) {
              if (mapping) {
                arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
              } else {
                arr[k] = items[k];
              }
            }
            arr.length = len;
            return arr;
          }

          function of() {
            for (var items = [],
                   $__41 = 0; $__41 < arguments.length; $__41++)
              items[$__41] = arguments[$__41];
            var C = this;
            var len = items.length;
            var arr = isConstructor(C) ? new C(len) : new Array(len);
            for (var k = 0; k < len; k++) {
              arr[k] = items[k];
            }
            arr.length = len;
            return arr;
          }

          function fill(value) {
            var start = arguments[1] !== (void 0) ? arguments[1] : 0;
            var end = arguments[2];
            var object = toObject(this);
            var len = toLength(object.length);
            var fillStart = toInteger(start);
            var fillEnd = end !== undefined ? toInteger(end) : len;
            fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
            fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
            while (fillStart < fillEnd) {
              object[fillStart] = value;
              fillStart++;
            }
            return object;
          }

          function find(predicate) {
            var thisArg = arguments[1];
            return findHelper(this, predicate, thisArg);
          }

          function findIndex(predicate) {
            var thisArg = arguments[1];
            return findHelper(this, predicate, thisArg, true);
          }

          function findHelper(self, predicate) {
            var thisArg = arguments[2];
            var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
            var object = toObject(self);
            var len = toLength(object.length);
            if (!isCallable(predicate)) {
              throw TypeError();
            }
            for (var i = 0; i < len; i++) {
              if (i in object) {
                var value = object[i];
                if (predicate.call(thisArg, value, i, object)) {
                  return returnIndex ? i : value;
                }
              }
            }
            return returnIndex ? -1 : undefined;
          }

          function polyfillArray(global) {
            var $__42 = global,
              Array = $__42.Array,
              Object = $__42.Object,
              Symbol = $__42.Symbol;
            maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
            maybeAddFunctions(Array, ['from', from, 'of', of]);
            maybeAddIterator(Array.prototype, values, Symbol);
            maybeAddIterator(Object.getPrototypeOf([].values()), function () {
              return this;
            }, Symbol);
          }

          registerPolyfill(polyfillArray);
          return {
            get from() {
              return from;
            },
            get of() {
              return of;
            },
            get fill() {
              return fill;
            },
            get find() {
              return find;
            },
            get findIndex() {
              return findIndex;
            },
            get polyfillArray() {
              return polyfillArray;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Object";
          var $__43 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            maybeAddFunctions = $__43.maybeAddFunctions,
            registerPolyfill = $__43.registerPolyfill;
          var $__44 = $traceurRuntime,
            defineProperty = $__44.defineProperty,
            getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
            getOwnPropertyNames = $__44.getOwnPropertyNames,
            keys = $__44.keys,
            privateNames = $__44.privateNames;

          function is(left, right) {
            if (left === right)
              return left !== 0 || 1 / left === 1 / right;
            return left !== left && right !== right;
          }

          function assign(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              var props = keys(source);
              var p,
                length = props.length;
              for (p = 0; p < length; p++) {
                var name = props[p];
                if (privateNames[name])
                  continue;
                target[name] = source[name];
                //alert(name);
              }
            }
            return target;
          }

          function mixin(target, source) {
            var props = getOwnPropertyNames(source);
            var p,
              descriptor,
              length = props.length;
            for (p = 0; p < length; p++) {
              var name = props[p];
              if (privateNames[name])
                continue;
              descriptor = getOwnPropertyDescriptor(source, props[p]);
              defineProperty(target, props[p], descriptor);
            }
            return target;
          }

          function polyfillObject(global) {
            var Object = global.Object;
            maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
          }

          registerPolyfill(polyfillObject);
          return {
            get is() {
              return is;
            },
            get assign() {
              return assign;
            },
            get mixin() {
              return mixin;
            },
            get polyfillObject() {
              return polyfillObject;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Number";
          var $__46 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
            isNumber = $__46.isNumber,
            maybeAddConsts = $__46.maybeAddConsts,
            maybeAddFunctions = $__46.maybeAddFunctions,
            registerPolyfill = $__46.registerPolyfill,
            toInteger = $__46.toInteger;
          var $abs = Math.abs;
          var $isFinite = isFinite;
          var $isNaN = isNaN;
          var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
          var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
          var EPSILON = Math.pow(2, -52);

          function NumberIsFinite(number) {
            return isNumber(number) && $isFinite(number);
          };

          function isInteger(number) {
            return NumberIsFinite(number) && toInteger(number) === number;
          }

          function NumberIsNaN(number) {
            return isNumber(number) && $isNaN(number);
          };

          function isSafeInteger(number) {
            if (NumberIsFinite(number)) {
              var integral = toInteger(number);
              if (integral === number)
                return $abs(integral) <= MAX_SAFE_INTEGER;
            }
            return false;
          }

          function polyfillNumber(global) {
            var Number = global.Number;
            maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
            maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
          }

          registerPolyfill(polyfillNumber);
          return {
            get MAX_SAFE_INTEGER() {
              return MAX_SAFE_INTEGER;
            },
            get MIN_SAFE_INTEGER() {
              return MIN_SAFE_INTEGER;
            },
            get EPSILON() {
              return EPSILON;
            },
            get isFinite() {
              return NumberIsFinite;
            },
            get isInteger() {
              return isInteger;
            },
            get isNaN() {
              return NumberIsNaN;
            },
            get isSafeInteger() {
              return isSafeInteger;
            },
            get polyfillNumber() {
              return polyfillNumber;
            }
          };
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number" + '');
        System.register("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills", [], function () {
          "use strict";
          var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/polyfills";
          var polyfillAll = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").polyfillAll;
          polyfillAll(this);
          var setupGlobals = $traceurRuntime.setupGlobals;
          $traceurRuntime.setupGlobals = function (global) {
            setupGlobals(global);
            polyfillAll(global);
          };
          return {};
        });
        System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills" + '');

      }).call(this, require("Zbi7gb"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "Zbi7gb": 4
    }
  ],
  6: [
    function (require, module, exports) {
      (function () {
        var exportedLog, ffSupport, formats, getOrderedMatches, hasMatches, isFF, isIE, isOpera, isSafari, log, makeArray, operaSupport, safariSupport, stringToArgs, _log;

        if (!(window.console && window.console.log)) {
          return;
        }

        log = function () {
          var args;
          args = [];
          makeArray(arguments).forEach(function (arg) {
            if (typeof arg === 'string') {
              return args = args.concat(stringToArgs(arg));
            } else {
              return args.push(arg);
            }
          });
          return _log.apply(window, args);
        };

        _log = function () {
          return console.log.apply(console, makeArray(arguments));
        };

        makeArray = function (arrayLikeThing) {
          return Array.prototype.slice.call(arrayLikeThing);
        };

        formats = [{
          regex: /\*([^\*]+)\*/,
          replacer: function (m, p1) {
            return "%c" + p1 + "%c";
          },
          styles: function () {
            return ['font-style: italic', ''];
          }
        }, {
          regex: /\_([^\_]+)\_/,
          replacer: function (m, p1) {
            return "%c" + p1 + "%c";
          },
          styles: function () {
            return ['font-weight: bold', ''];
          }
        }, {
          regex: /\`([^\`]+)\`/,
          replacer: function (m, p1) {
            return "%c" + p1 + "%c";
          },
          styles: function () {
            return ['background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)', ''];
          }
        }, {
          regex: /\[c\=(?:\"|\')?((?:(?!(?:\"|\')\]).)*)(?:\"|\')?\]((?:(?!\[c\]).)*)\[c\]/,
          replacer: function (m, p1, p2) {
            return "%c" + p2 + "%c";
          },
          styles: function (match) {
            return [match[1], ''];
          }
        }];

        hasMatches = function (str) {
          var _hasMatches;
          _hasMatches = false;
          formats.forEach(function (format) {
            if (format.regex.test(str)) {
              return _hasMatches = true;
            }
          });
          return _hasMatches;
        };

        getOrderedMatches = function (str) {
          var matches;
          matches = [];
          formats.forEach(function (format) {
            var match;
            match = str.match(format.regex);
            if (match) {
              return matches.push({
                format: format,
                match: match
              });
            }
          });
          return matches.sort(function (a, b) {
            return a.match.index - b.match.index;
          });
        };

        stringToArgs = function (str) {
          var firstMatch, matches, styles;
          styles = [];
          while (hasMatches(str)) {
            matches = getOrderedMatches(str);
            firstMatch = matches[0];
            str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
            styles = styles.concat(firstMatch.format.styles(firstMatch.match));
          }
          return [str].concat(styles);
        };

        isSafari = function () {
          return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        };

        isOpera = function () {
          return /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);
        };

        isFF = function () {
          return /Firefox/.test(navigator.userAgent);
        };

        isIE = function () {
          return /MSIE/.test(navigator.userAgent);
        };

        safariSupport = function () {
          var m;
          m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
          if (!m) {
            return false;
          }
          return 537.38 <= parseInt(m[1], 10) + (parseInt(m[2], 10) / 100);
        };

        operaSupport = function () {
          var m;
          m = navigator.userAgent.match(/OPR\/(\d+)\./);
          if (!m) {
            return false;
          }
          return 15 <= parseInt(m[1], 10);
        };

        ffSupport = function () {
          return window.console.firebug || window.console.exception;
        };

        if (isIE() || (isFF() && !ffSupport()) || (isOpera() && !operaSupport()) || (isSafari() && !safariSupport())) {
          exportedLog = _log;
        } else {
          exportedLog = log;
        }

        exportedLog.l = _log;

        if (typeof define === 'function' && define.amd) {
          define(exportedLog);
        } else if (typeof exports !== 'undefined') {
          module.exports = exportedLog;
        } else {
          window.log = exportedLog;
        }

      }).call(this);

    }, {}
  ],
  7: [
    function (require, module, exports) {
      /**
       * Copyright 2012 Craig Campbell
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       * http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       * Mousetrap is a simple keyboard shortcut library for Javascript with
       * no external dependencies
       *
       * @version 1.1.2
       * @url craig.is/killing/mice
       */

      /**
       * mapping of special keycodes to their corresponding keys
       *
       * everything in this dictionary cannot use keypress events
       * so it has to be here to map to the correct keycodes for
       * keyup/keydown events
       *
       * @type {Object}
       */
      var _MAP = {
          8: 'backspace',
          9: 'tab',
          13: 'enter',
          16: 'shift',
          17: 'ctrl',
          18: 'alt',
          20: 'capslock',
          27: 'esc',
          32: 'space',
          33: 'pageup',
          34: 'pagedown',
          35: 'end',
          36: 'home',
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          45: 'ins',
          46: 'del',
          91: 'meta',
          93: 'meta',
          224: 'meta'
        },

        /**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
        _KEYCODE_MAP = {
          106: '*',
          107: '+',
          109: '-',
          110: '.',
          111: '/',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: '\''
        },

        /**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
        _SHIFT_MAP = {
          '~': '`',
          '!': '1',
          '@': '2',
          '#': '3',
          '$': '4',
          '%': '5',
          '^': '6',
          '&': '7',
          '*': '8',
          '(': '9',
          ')': '0',
          '_': '-',
          '+': '=',
          ':': ';',
          '\"': '\'',
          '<': ',',
          '>': '.',
          '?': '/',
          '|': '\\'
        },

        /**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
        _SPECIAL_ALIASES = {
          'option': 'alt',
          'command': 'meta',
          'return': 'enter',
          'escape': 'esc'
        },

        /**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
        _REVERSE_MAP,

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        _callbacks = {},

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        _direct_map = {},

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        _sequence_levels = {},

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        _reset_timer,

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        _ignore_next_keyup = false,

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        _inside_sequence = false;

      /**
       * loop through the f keys, f1 to f19 and add them to the map
       * programatically
       */
      for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
      }

      /**
       * loop through to map numbers on the numeric keypad
       */
      for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
      }

      /**
       * cross browser add event method
       *
       * @param {Element|HTMLDocument} object
       * @param {string} type
       * @param {Function} callback
       * @returns void
       */

      function _addEvent(object, type, callback) {
        if (object.addEventListener) {
          return object.addEventListener(type, callback, false);
        }

        object.attachEvent('on' + type, callback);
      }

      /**
       * takes the event and returns the key character
       *
       * @param {Event} e
       * @return {string}
       */

      function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
          return String.fromCharCode(e.which);
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
          return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
          return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map
        return String.fromCharCode(e.which).toLowerCase();
      }

      /**
       * should we stop this event before firing off callbacks
       *
       * @param {Event} e
       * @return {boolean}
       */

      function _stop(e) {
        var element = e.target || e.srcElement,
          tag_name = element.tagName;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
          return false;
        }

        // stop for input, select, and textarea
        return tag_name == 'INPUT' || tag_name == 'SELECT' || tag_name == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true');
      }

      /**
       * checks if two arrays are equal
       *
       * @param {Array} modifiers1
       * @param {Array} modifiers2
       * @returns {boolean}
       */

      function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
      }

      /**
       * resets all sequence counters except for the ones passed in
       *
       * @param {Object} do_not_reset
       * @returns void
       */

      function _resetSequences(do_not_reset) {
        do_not_reset = do_not_reset || {};

        var active_sequences = false,
          key;

        for (key in _sequence_levels) {
          if (do_not_reset[key]) {
            active_sequences = true;
            continue;
          }
          _sequence_levels[key] = 0;
        }

        if (!active_sequences) {
          _inside_sequence = false;
        }
      }

      /**
       * finds all callbacks that match based on the keycode, modifiers,
       * and action
       *
       * @param {string} character
       * @param {Array} modifiers
       * @param {string} action
       * @param {boolean=} remove - should we remove any matches
       * @param {string=} combination
       * @returns {Array}
       */

      function _getMatches(character, modifiers, action, remove, combination) {
        var i,
          callback,
          matches = [];

        // if there are no events related to this keycode
        if (!_callbacks[character]) {
          return [];
        }

        // if a modifier key is coming up on its own we should allow it
        if (action == 'keyup' && _isModifier(character)) {
          modifiers = [character];
        }

        // loop through all callbacks for the key that was pressed
        // and see if any of them match
        for (i = 0; i < _callbacks[character].length; ++i) {
          callback = _callbacks[character][i];

          // if this is a sequence but it is not at the right level
          // then move onto the next match
          if (callback.seq && _sequence_levels[callback.seq] != callback.level) {
            continue;
          }

          // if the action we are looking for doesn't match the action we got
          // then we should keep going
          if (action != callback.action) {
            continue;
          }

          // if this is a keypress event that means that we need to only
          // look at the character, otherwise check the modifiers as
          // well
          if (action == 'keypress' || _modifiersMatch(modifiers, callback.modifiers)) {

            // remove is used so if you change your mind and call bind a
            // second time with a new function the first one is overwritten
            if (remove && callback.combo == combination) {
              _callbacks[character].splice(i, 1);
            }

            matches.push(callback);
          }
        }

        return matches;
      }

      /**
       * takes a key event and figures out what the modifiers are
       *
       * @param {Event} e
       * @returns {Array}
       */

      function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
          modifiers.push('shift');
        }

        if (e.altKey) {
          modifiers.push('alt');
        }

        if (e.ctrlKey) {
          modifiers.push('ctrl');
        }

        if (e.metaKey) {
          modifiers.push('meta');
        }

        return modifiers;
      }

      /**
       * actually calls the callback function
       *
       * if your callback function returns false this will use the jquery
       * convention - prevent default and stop propogation on the event
       *
       * @param {Function} callback
       * @param {Event} e
       * @returns void
       */

      function _fireCallback(callback, e) {
        if (callback(e) === false) {
          if (e.preventDefault) {
            e.preventDefault();
          }

          if (e.stopPropagation) {
            e.stopPropagation();
          }

          e.returnValue = false;
          e.cancelBubble = true;
        }
      }

      /**
       * handles a character key event
       *
       * @param {string} character
       * @param {Event} e
       * @returns void
       */

      function _handleCharacter(character, e) {

        // if this event should not happen stop here
        if (_stop(e)) {
          return;
        }

        var callbacks = _getMatches(character, _eventModifiers(e), e.type),
          i,
          do_not_reset = {},
          processed_sequence_callback = false;

        // loop through matching callbacks for this key event
        for (i = 0; i < callbacks.length; ++i) {

          // fire for all sequence callbacks
          // this is because if for example you have multiple sequences
          // bound such as "g i" and "g t" they both need to fire the
          // callback for matching g cause otherwise you can only ever
          // match the first one
          if (callbacks[i].seq) {
            processed_sequence_callback = true;

            // keep a list of which sequences were matches for later
            do_not_reset[callbacks[i].seq] = 1;
            _fireCallback(callbacks[i].callback, e);
            continue;
          }

          // if there were no sequence matches but we are still here
          // that means this is a regular match so we should fire that
          if (!processed_sequence_callback && !_inside_sequence) {
            _fireCallback(callbacks[i].callback, e);
          }
        }

        // if you are inside of a sequence and the key you are pressing
        // is not a modifier key then we should reset all sequences
        // that were not matched by this key event
        if (e.type == _inside_sequence && !_isModifier(character)) {
          _resetSequences(do_not_reset);
        }
      }

      /**
       * handles a keydown event
       *
       * @param {Event} e
       * @returns void
       */

      function _handleKey(e) {

        // normalize e.which for key events
        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
        e.which = typeof e.which == "number" ? e.which : e.keyCode;

        var character = _characterFromEvent(e);

        // no character found then stop
        if (!character) {
          return;
        }

        if (e.type == 'keyup' && _ignore_next_keyup == character) {
          _ignore_next_keyup = false;
          return;
        }

        _handleCharacter(character, e);
      }

      /**
       * determines if the keycode specified is a modifier key or not
       *
       * @param {string} key
       * @returns {boolean}
       */

      function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
      }

      /**
       * called to set a 1 second timeout on the specified sequence
       *
       * this is so after each key press in the sequence you have 1 second
       * to press the next key before you have to start over
       *
       * @returns void
       */

      function _resetSequenceTimer() {
        clearTimeout(_reset_timer);
        _reset_timer = setTimeout(_resetSequences, 1000);
      }

      /**
       * reverses the map lookup so that we can look for specific keys
       * to see what can and can't use keypress
       *
       * @return {Object}
       */

      function _getReverseMap() {
        if (!_REVERSE_MAP) {
          _REVERSE_MAP = {};
          for (var key in _MAP) {

            // pull out the numeric keypad from here cause keypress should
            // be able to detect the keys from the character
            if (key > 95 && key < 112) {
              continue;
            }

            if (_MAP.hasOwnProperty(key)) {
              _REVERSE_MAP[_MAP[key]] = key;
            }
          }
        }
        return _REVERSE_MAP;
      }

      /**
       * picks the best action based on the key combination
       *
       * @param {string} key - character for key
       * @param {Array} modifiers
       * @param {string=} action passed in
       */

      function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
          action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
          action = 'keydown';
        }

        return action;
      }

      /**
       * binds a key sequence to an event
       *
       * @param {string} combo - combo specified in bind call
       * @param {Array} keys
       * @param {Function} callback
       * @param {string=} action
       * @returns void
       */

      function _bindSequence(combo, keys, callback, action) {

        // start off by adding a sequence level record for this combination
        // and setting the level to 0
        _sequence_levels[combo] = 0;

        // if there is no action pick the best one for the first key
        // in the sequence
        if (!action) {
          action = _pickBestAction(keys[0], []);
        }

        /**
         * callback to increase the sequence level for this sequence and reset
         * all other sequences that were active
         *
         * @param {Event} e
         * @returns void
         */
        var _increaseSequence = function (e) {
            _inside_sequence = action;
            ++_sequence_levels[combo];
            _resetSequenceTimer();
          },

          /**
           * wraps the specified callback inside of another function in order
           * to reset all sequence counters as soon as this sequence is done
           *
           * @param {Event} e
           * @returns void
           */
          _callbackAndReset = function (e) {
            _fireCallback(callback, e);

            // we should ignore the next key up if the action is key down
            // or keypress.  this is so if you finish a sequence and
            // release the key the final key will not trigger a keyup
            if (action !== 'keyup') {
              _ignore_next_keyup = _characterFromEvent(e);
            }

            // weird race condition if a sequence ends with the key
            // another sequence begins with
            setTimeout(_resetSequences, 10);
          },
          i;

        // loop through keys one at a time and bind the appropriate callback
        // function.  for any key leading up to the final one it should
        // increase the sequence. after the final, it should reset all sequences
        for (i = 0; i < keys.length; ++i) {
          _bindSingle(keys[i], i < keys.length - 1 ? _increaseSequence : _callbackAndReset, action, combo, i);
        }
      }

      /**
       * binds a single keyboard combination
       *
       * @param {string} combination
       * @param {Function} callback
       * @param {string=} action
       * @param {string=} sequence_name - name of sequence if part of sequence
       * @param {number=} level - what part of the sequence the command is
       * @returns void
       */

      function _bindSingle(combination, callback, action, sequence_name, level) {

        // make sure multiple spaces in a row become a single space
        combination = combination.replace(/\s+/g, ' ');

        var sequence = combination.split(' '),
          i,
          key,
          keys,
          modifiers = [];

        // if this pattern is a sequence of keys then run through this method
        // to reprocess each pattern one key at a time
        if (sequence.length > 1) {
          return _bindSequence(combination, sequence, callback, action);
        }

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = combination === '+' ? ['+'] : combination.split('+');

        for (i = 0; i < keys.length; ++i) {
          key = keys[i];

          // normalize key names
          if (_SPECIAL_ALIASES[key]) {
            key = _SPECIAL_ALIASES[key];
          }

          // if this is not a keypress event then we should
          // be smart about using shift keys
          // this will only work for US keyboards however
          if (action && action != 'keypress' && _SHIFT_MAP[key]) {
            key = _SHIFT_MAP[key];
            modifiers.push('shift');
          }

          // if this key is a modifier then add it to the list of modifiers
          if (_isModifier(key)) {
            modifiers.push(key);
          }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        // make sure to initialize array if this is the first time
        // a callback is added for this key
        if (!_callbacks[key]) {
          _callbacks[key] = [];
        }

        // remove an existing match if there is one
        _getMatches(key, modifiers, action, !sequence_name, combination);

        // add this call back to the array
        // if it is a sequence put it at the beginning
        // if not put it at the end
        //
        // this is important because the way these are processed expects
        // the sequence ones to come first
        _callbacks[key][sequence_name ? 'unshift' : 'push']({
          callback: callback,
          modifiers: modifiers,
          action: action,
          seq: sequence_name,
          level: level,
          combo: combination
        });
      }

      /**
       * binds multiple combinations to the same callback
       *
       * @param {Array} combinations
       * @param {Function} callback
       * @param {string|undefined} action
       * @returns void
       */

      function _bindMultiple(combinations, callback, action) {
        for (var i = 0; i < combinations.length; ++i) {
          _bindSingle(combinations[i], callback, action);
        }
      }

      // start!
      _addEvent(document, 'keypress', _handleKey);
      _addEvent(document, 'keydown', _handleKey);
      _addEvent(document, 'keyup', _handleKey);

      var mousetrap = {

        /**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * a comma separated list of keys, an array of keys, or
         * a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
        bind: function (keys, callback, action) {
          _bindMultiple(keys instanceof Array ? keys : [keys], callback, action);
          _direct_map[keys + ':' + action] = callback;
          return this;
        },

        /**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _direct_map dict.
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
        unbind: function (keys, action) {
          if (_direct_map[keys + ':' + action]) {
            delete _direct_map[keys + ':' + action];
            this.bind(keys, function () {
            }, action);
          }
          return this;
        },

        /**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
        trigger: function (keys, action) {
          _direct_map[keys + ':' + action]();
          return this;
        },

        /**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
        reset: function () {
          _callbacks = {};
          _direct_map = {};
          return this;
        }
      };

      module.exports = mousetrap;


    }, {}
  ],
  8: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var EventEmitter = require('events').EventEmitter;
      var metaHeader = 'CHUNKS';
      var metaHeaderLength = metaHeader.length;
      var reByteChar = /%..|./;
      var DEFAULT_MAXSIZE = 1024 * 16;

      /**
       # rtc-bufferedchannel

       This is a wrapper for a native `RTCDataChannel` that ensures that data
       sent over the channel complies with the current data channel size limits
       (which is < 16Kb for firefox <--> chrome interop).

       __NOTE:__ The `rtc-bufferedchannel` module is able to wrap any standard
       `RTCDataChannel` object.  If you use other WebRTC helper libraries, then
       this module can still be **very useful**!

       ## How it Works

       The `rtc-bufferedchannel` works by wrapping a standard `RTCDataChannel` with
       an object that proxies `send` function calls and emits data through an
       `channel.on('data', handler)` event handler for receiving data.  When you
       call the `send` function provided by buffered channel it determines the size
       of the message that you are sending and determines whether that needs to be
       "chunked" to assist with successful delivery of your data.

       At this present point in time, a browser will complain if you attempt to
       send large payloads of data via a data channel, and this is where the
       `rtc-bufferedchannel` module comes to your rescue.

       ### Typed Array Handling

       Since `rtc-bufferedchannel@0.3` all manner of typed integer arrays (int,
       uint, etc) are catered for and correctly chunked to ensure successful delivery.
       Additionally, the module will provide identification of the typed array type
       before sending the raw data across the wire.  Using this functionality when
       you receive the `data` event from the buffered channel you will receive the
       data in the same format it was sent from your peer, i.e.
       `Uint8Array` in, `Uint8Array` out which is different to the standard
       data channel functionality.

       ## Example Usage

       Shown below is a simple example of how you might use a buffered channel to
       send data that is larger than what you can typically send over a webrtc
       data channel:

       <<< examples/have-some-mentos.js

       **/
      module.exports = function (dc, opts) {
        // create an event emitter that will replace our datachannel
        // which does mean the replacement object will fail instanceof checks for
        // RTCDataChannel
        var channel = new EventEmitter();

        // initialise the default max buffer size
        // which at this stage is recommended to be 16Kb for interop between
        // firefox and chrome
        // see https://groups.google.com/forum/#!topic/discuss-webrtc/AefA5Pg_xIU
        var maxSize = (opts || {}).maxsize || DEFAULT_MAXSIZE;

        // initilaise the pending chunks count to 0
        var pendingChunks = 0;
        var collectedQueue = [];
        var queueDataType;

        // initialise the send queue
        var sendQueue = [];
        var sendTimer = 0;
        var retry = (opts || {}).retry !== false;
        var calcCharSize = (opts || {}).calcCharSize !== false;

        function buildData() {
          var totalByteSize = 0;
          var lastOffset = 0;
          var input = collectedQueue.splice(0);
          var dataView;

          // if we have string data, then it's simple
          if (queueDataType === 'string') {
            return input.join('');
          }

          // otherwise, rebuild the array buffer into the correct view type
          totalByteSize = input.reduce(function (memo, buffer) {
            return memo + buffer.byteLength;
          }, 0);

          // create data view
          dataView = createDataView(queueDataType, totalByteSize);

          // iterate through the collected queue and set the data
          input.forEach(function (chunk) {
            dataView.set(new dataView.constructor(chunk), lastOffset);
            lastOffset = lastOffset + ((chunk.byteLength / dataView.BYTES_PER_ELEMENT) | 0);
          });

          return dataView;
        }

        function createDataView(dt, size) {
          switch (dt) {
            case 'uint8clamped':
            {
              return new Uint8ClampedArray(size);
            }

            case 'uint16':
            {
              return new Uint16Array(size >> 1);
            }

            case 'uint32':
            {
              return new Uint32Array(size >> 2);
            }

            case 'int8':
            {
              return new Int8Array(size);
            }

            case 'int16':
            {
              return new Int16Array(size >> 1);
            }

            case 'int32':
            {
              return new Int32Array(size >> 2);
            }
          }

          return new Uint8Array(size);
        }

        function handleClose(evt) {
          console.log('received dc close', evt);
        }

        function handleError(evt) {
          console.log('received dc error: ', evt);
        }

        function handleMessage(evt) {
          var haveData = evt && evt.data;
          var parts;
          var isMeta;

          if (haveData && pendingChunks) {
            collectedQueue.push(evt.data);
            pendingChunks -= 1;

            // if we have no more pending chunks then assemble the data
            // and emit the data event
            if (pendingChunks === 0) {
              channel.emit('data', buildData());
            }
          } else if (haveData) {
            // determine if this is a metadata chunk
            isMeta = typeof evt.data == 'string' &&
              evt.data.slice(0, metaHeaderLength) === metaHeader;

            if (isMeta) {
              parts = evt.data.split(':');
              pendingChunks = parseInt(parts[1], 10);
              queueDataType = parts[2] || 'string';
            } else {
              channel.emit('data', evt.data);
            }
          }
        }

        function queue(payload, timeout) {
          if (payload) {
            // add the payload to the send queue
            sendQueue[sendQueue.length] = payload;
          }

          // queue a transmit only if not already queued
          sendTimer = sendTimer || setTimeout(transmit, timeout || 0);
        }

        function segmentArrayBuffer(input) {
          var chunks = [];
          var offset = 0;

          while (offset < input.byteLength) {
            chunks.push(input.slice(offset, offset + maxSize));
            offset += maxSize;
          }

          return chunks;
        }

        function send(data) {
          var size;
          var chunks = [];
          var abort = false;
          var charSize;
          var currentSize = 0;
          var currentStartIndex = 0;
          var ii = 0;
          var length;
          var dataType;

          if (typeof data == 'string' || (data instanceof String)) {
            // organise into data chunks
            length = data.length;
            while (ii < length) {
              // calculate the current character size
              charSize = calcCharSize ? ~-encodeURI(data.charAt(ii)).split(reByteChar).length :
                1;

              // if this will tip us over the limit, copy the chunk
              if (currentSize + charSize >= maxSize) {
                // copy the chunk
                chunks[chunks.length] = data.slice(currentStartIndex, ii);

                // reset tracking variables
                currentStartIndex = ii;
                currentSize = 0;
              }
              // otherwise, increment the current chunk size
              else {
                currentSize += charSize;
              }

              // increment the index
              ii += 1;
            }

            // if we have a pending chunk, then add it
            if (currentSize > 0) {
              chunks[chunks.length] = data.slice(currentStartIndex);
            }
          } else if (data && data.buffer && data.buffer instanceof ArrayBuffer) {
            // derive the data type
            dataType = data.constructor.name.slice(0, -5).toLowerCase();

            if (data.byteLength < maxSize) {
              chunks[0] = data;
            } else {
              chunks = segmentArrayBuffer(data.buffer);
            }
          }
          // else if (data instanceof ArrayBuffer) {
          //   console.log('got an array buffer');
          // }

          // if we only have one chunk, just send the data
          if ((!dataType) && chunks.length === 1) {
            queue(chunks[0]);
          } else {
            queue(metaHeader + ':' + chunks.length + ':' + (dataType || 'string'));
            chunks.forEach(queue);
          }
        }

        function transmit() {
          var next = sendQueue.shift();

          // reset the send timer to 0 (means queuing will again occur)
          sendTimer = 0;

          // if we have cleaned out the queue then abort
          if (dc.readyState !== 'open' || (!next)) {
            return;
          }

          try {
            dc.send(next);
            queue();
          } catch (e) {
            console.error('error sending chunk: ', e);
            // console.log('buffered amount = ' + dc.bufferedAmount);
            // console.log('ready state = ' + dc.readyState);

            // if we are retrying unshift the next payload back onto
            // the senqQueue
            if (retry) {
              sendQueue.unshift(next);
            }

            // TODO: reset the send queue?
            queue(null, 10);
          }
        }

        // set the binary type on the datachannel to array buffer
        dc.binaryType = 'arraybuffer';

        // patch in the send function
        channel.send = send;

        // handle data channel message events
        dc.onmessage = handleMessage;

        // handle the channel close
        dc.onclose = handleClose;
        dc.onerror = handleError;

        return channel;
      };
    }, {
      "events": 3
    }
  ],
  9: [
    function (require, module, exports) {
      (function (process) {
        /* jshint node: true */
        'use strict';

        var rtc = require('rtc-tools');
        var mbus = require('mbus');
        var cleanup = require('rtc-tools/cleanup');
        var debug = rtc.logger('rtc-quickconnect');
        var defaults = require('cog/defaults');
        var extend = require('cog/extend');
        var getable = require('cog/getable');
        var reTrailingSlash = /\/$/;

        /**
         # rtc-quickconnect

         This is a high level helper module designed to help you get up
         an running with WebRTC really, really quickly.  By using this module you
         are trading off some flexibility, so if you need a more flexible
         configuration you should drill down into lower level components of the
         [rtc.io](http://www.rtc.io) suite.  In particular you should check out
         [rtc](https://github.com/rtc-io/rtc).

         ## Example Usage

         In the simplest case you simply call quickconnect with a single string
         argument which tells quickconnect which server to use for signaling:

         <<< examples/simple.js

         <<< docs/events.md

         <<< docs/examples.md

         ## Regarding Signalling and a Signalling Server

         Signaling is an important part of setting up a WebRTC connection and for
         our examples we use our own test instance of the
         [rtc-switchboard](https://github.com/rtc-io/rtc-switchboard). For your
         testing and development you are more than welcome to use this also, but
         just be aware that we use this for our testing so it may go up and down
         a little.  If you need something more stable, why not consider deploying
         an instance of the switchboard yourself - it's pretty easy :)

         ## Reference

         ```
         quickconnect(signalhost, opts?) => rtc-sigaller instance (+ helpers)
         ```

         ### Valid Quick Connect Options

         The options provided to the `rtc-quickconnect` module function influence the
         behaviour of some of the underlying components used from the rtc.io suite.

         Listed below are some of the commonly used options:

         - `ns` (default: '')

         An optional namespace for your signalling room.  While quickconnect
         will generate a unique hash for the room, this can be made to be more
         unique by providing a namespace.  Using a namespace means two demos
         that have generated the same hash but use a different namespace will be
         in different rooms.

         - `room` (default: null) _added 0.6_

         Rather than use the internal hash generation
         (plus optional namespace) for room name generation, simply use this room
         name instead.  __NOTE:__ Use of the `room` option takes precendence over
         `ns`.

         - `debug` (default: false)

         Write rtc.io suite debug output to the browser console.

         - `expectedLocalStreams` (default: not specified) _added 3.0_

         By providing a positive integer value for this option will mean that
         the created quickconnect instance will wait until the specified number of
         streams have been added to the quickconnect "template" before announcing
         to the signaling server.

         - `manualJoin` (default: `false`)

         Set this value to `true` if you would prefer to call the `join` function
         to connecting to the signalling server, rather than having that happen
         automatically as soon as quickconnect is ready to.

         #### Options for Peer Connection Creation

         Options that are passed onto the
         [rtc.createConnection](https://github.com/rtc-io/rtc#createconnectionopts-constraints)
         function:

         - `iceServers`

         This provides a list of ice servers that can be used to help negotiate a
         connection between peers.

         #### Options for P2P negotiation

         Under the hood, quickconnect uses the
         [rtc/couple](https://github.com/rtc-io/rtc#rtccouple) logic, and the options
         passed to quickconnect are also passed onto this function.

         **/
        module.exports = function (signalhost, opts) {
          var hash = typeof location != 'undefined' && location.hash.slice(1);
          var signaller = require('rtc-signaller')(signalhost, opts);

          // init configurable vars
          var ns = (opts || {}).ns || '';
          var room = (opts || {}).room;
          var debugging = (opts || {}).debug;
          var allowJoin = !(opts || {}).manualJoin;
          var profile = {};
          var announced = false;

          // collect the local streams
          var localStreams = [];

          // create the calls map
          var calls = signaller.calls = getable({});

          // create the known data channels registry
          var channels = {};

          // save the plugins passed to the signaller
          var plugins = signaller.plugins = (opts || {}).plugins || [];

          // check how many local streams have been expected (default: 0)
          var expectedLocalStreams = parseInt((opts || {}).expectedLocalStreams, 10) || 0;
          var announceTimer = 0;

          function callCreate(id, pc, data) {
            calls.set(id, {
              active: false,
              pc: pc,
              channels: getable({}),
              data: data,
              streams: []
            });
          }

          function callEnd(id) {
            var call = calls.get(id);

            // if we have no data, then do nothing
            if (!call) {
              return;
            }

            debug('ending call to: ' + id);

            // if we have no data, then return
            call.channels.keys().forEach(function (label) {
              var channel = call.channels.get(label);
              var args = [id, channel, label];

              // emit the plain channel:closed event
              signaller.apply(signaller, ['channel:closed'].concat(args));

              // emit the labelled version of the event
              signaller.apply(signaller, ['channel:closed:' + label].concat(args));

              // decouple the events
              channel.onopen = null;
            });

            // trigger stream:removed events for each of the remotestreams in the pc
            call.streams.forEach(function (stream) {
              signaller('stream:removed', id, stream);
            });

            // delete the call data
            calls.delete(id);

            // trigger the call:ended event
            signaller('call:ended', id, call.pc);

            // ensure the peer connection is properly cleaned up
            cleanup(call.pc);
          }

          function callStart(id, pc, data) {
            var call = calls.get(id);
            var streams = [].concat(pc.getRemoteStreams());

            // flag the call as active
            call.active = true;
            call.streams = [].concat(pc.getRemoteStreams());

            pc.onaddstream = createStreamAddHandler(id);
            pc.onremovestream = createStreamRemoveHandler(id);

            debug(signaller.id + ' - ' + id + ' call start: ' + streams.length + ' streams');
            signaller('call:started', id, pc, data);

            // examine the existing remote streams after a short delay
            process.nextTick(function () {
              // iterate through any remote streams
              streams.forEach(receiveRemoteStream(id));
            });
          }

          function checkReadyToAnnounce() {
            clearTimeout(announceTimer);
            if (!allowJoin) {
              return;
            }

            // if we are waiting for a set number of streams, then wait until we have
            // the required number
            if (expectedLocalStreams && localStreams.length < expectedLocalStreams) {
              return;
            }

            // announce ourselves to our new friend
            announceTimer = setTimeout(function () {
              var data = extend({}, profile, {
                room: room
              });

              // announce and emit the local announce event
              signaller.announce(data);
              announced = true;
            }, 0);
          }

          function createStreamAddHandler(id) {
            return function (evt) {
              debug('peer ' + id + ' added stream');
              updateRemoteStreams(id);
              receiveRemoteStream(id)(evt.stream);
            }
          }

          function createStreamRemoveHandler(id) {
            return function (evt) {
              debug('peer ' + id + ' removed stream');
              updateRemoteStreams(id);
              signaller('stream:removed', id, evt.stream);
            };
          }

          function getActiveCall(peerId) {
            var call = calls.get(peerId);

            if (!call) {
              throw new Error('No active call for peer: ' + peerId);
            }

            return call;
          }

          function gotPeerChannel(channel, pc, data) {
            var channelMonitor;

            function channelReady() {
              var call = calls.get(data.id);
              var args = [data.id, channel, data, pc];

              // decouple the channel.onopen listener
              debug('reporting channel "' + channel.label + '" ready, have call: ' + ( !!call));
              clearInterval(channelMonitor);
              channel.onopen = null;

              // save the channel
              if (call) {
                call.channels.set(channel.label, channel);
              }

              // trigger the %channel.label%:open event
              debug('triggering channel:opened events for channel: ' + channel.label);

              // emit the plain channel:opened event
              signaller.apply(signaller, ['channel:opened'].concat(args));

              // emit the channel:opened:%label% eve
              signaller.apply(
                signaller, ['channel:opened:' + channel.label].concat(args)
              );
            }

            debug('channel ' + channel.label + ' discovered for peer: ' + data.id);
            if (channel.readyState === 'open') {
              return channelReady();
            }

            debug('channel not ready, current state = ' + channel.readyState);
            channel.onopen = channelReady;

            // monitor the channel open (don't trust the channel open event just yet)
            channelMonitor = setInterval(function () {
              debug('checking channel state, current state = ' + channel.readyState);
              if (channel.readyState === 'open') {
                channelReady();
              }
            }, 500);
          }

          function handleLocalAnnounce(data) {
            // if we send an announce with an updated room then update our local room name
            if (data && typeof data.room != 'undefined') {
              room = data.room;
            }
          }

          function handlePeerAnnounce(data) {
            var pc;
            var monitor;

            // if the room is not a match, abort
            if (data.room !== room) {
              return;
            }

            // create a peer connection
            pc = rtc.createConnection(opts, (opts || {}).constraints);
            signaller('peer:connect', data.id, pc, data);

            // add this connection to the calls list
            callCreate(data.id, pc, data);

            // add the local streams
            localStreams.forEach(function (stream, idx) {
              pc.addStream(stream);
            });

            // add the data channels
            // do this differently based on whether the connection is a
            // master or a slave connection
            if (signaller.isMaster(data.id)) {
              debug('is master, creating data channels: ', Object.keys(channels));

              // create the channels
              Object.keys(channels).forEach(function (label) {
                gotPeerChannel(pc.createDataChannel(label, channels[label]), pc, data);
              });
            } else {
              pc.ondatachannel = function (evt) {
                var channel = evt && evt.channel;

                // if we have no channel, abort
                if (!channel) {
                  return;
                }

                if (channels[channel.label] !== undefined) {
                  gotPeerChannel(channel, pc, data);
                }
              };
            }

            // couple the connections
            debug('coupling ' + signaller.id + ' to ' + data.id);
            monitor = rtc.couple(pc, data.id, signaller, extend({}, opts, {
              logger: mbus('pc.' + data.id, signaller)
            }));

            signaller('peer:couple', data.id, pc, data, monitor);

            // once active, trigger the peer connect event
            monitor.once('connected', callStart.bind(null, data.id, pc, data))
            monitor.once('closed', callEnd.bind(null, data.id));

            // if we are the master connnection, create the offer
            // NOTE: this only really for the sake of politeness, as rtc couple
            // implementation handles the slave attempting to create an offer
            if (signaller.isMaster(data.id)) {
              monitor.createOffer();
            }
          }

          function handlePeerFilter(evt) {
            // only connect with the peer if we are ready
            evt.allow = evt.allow && (localStreams.length >= expectedLocalStreams);
          }

          function handlePeerUpdate(data) {
            var id = data && data.id;
            var activeCall = id && calls.get(id);

            // if we have received an update for a peer that has no active calls,
            // then pass this onto the announce handler
            if (id && (!activeCall)) {
              debug('received peer update from peer ' + id + ', no active calls');
              return handlePeerAnnounce(data);
            }
          }

          function receiveRemoteStream(id) {
            var call = calls.get(id);

            return function (stream) {
              signaller('stream:added', id, stream, call && call.data);
            };
          }

          function updateRemoteStreams(id) {
            var call = calls.get(id);

            if (call && call.pc) {
              call.streams = [].concat(call.pc.getRemoteStreams());
            }
          }

          // if the room is not defined, then generate the room name
          if (!room) {
            // if the hash is not assigned, then create a random hash value
            if (!hash) {
              hash = location.hash = '' + (Math.pow(2, 53) * Math.random());
            }

            room = ns + '#' + hash;
          }

          if (debugging) {
            rtc.logger.enable.apply(rtc.logger, Array.isArray(debug) ? debugging : ['*']);
          }

          signaller.on('peer:announce', handlePeerAnnounce);
          signaller.on('peer:update', handlePeerUpdate);
          signaller.on('peer:leave', callEnd);

          /**
           ### Quickconnect Broadcast and Data Channel Helper Functions

           The following are functions that are patched into the `rtc-signaller`
           instance that make working with and creating functional WebRTC applications
           a lot simpler.

           **/

          /**
           #### addStream

           ```
           addStream(stream:MediaStream) => qc
           ```

           Add the stream to active calls and also save the stream so that it
           can be added to future calls.

           **/
          signaller.broadcast = signaller.addStream = function (stream) {
            localStreams.push(stream);

            // if we have any active calls, then add the stream
            calls.values().forEach(function (data) {
              data.pc.addStream(stream);
            });

            checkReadyToAnnounce();
            return signaller;
          };

          /**
           #### endCalls()

           The `endCalls` function terminates all the active calls that have been
           created in this quickconnect instance.  Calling `endCalls` does not
           kill the connection with the signalling server.

           **/
          signaller.endCalls = function () {
            calls.keys().forEach(callEnd);
          };

          /**
           #### close()

           The `close` function provides a convenient way of closing all associated
           peer connections.  This function simply uses the `endCalls` function and
           the underlying `leave` function of the signaller to do a "full cleanup"
           of all connections.
           **/
          signaller.close = function () {
            signaller.endCalls();
            signaller.leave();
          };

          /**
           #### createDataChannel(label, config)

           Request that a data channel with the specified `label` is created on
           the peer connection.  When the data channel is open and available, an
           event will be triggered using the label of the data channel.

           For example, if a new data channel was requested using the following
           call:

           ```js
           var qc = quickconnect('http://rtc.io/switchboard').createDataChannel('test');
           ```

           Then when the data channel is ready for use, a `test:open` event would
           be emitted by `qc`.

           **/
          signaller.createDataChannel = function (label, opts) {
            // create a channel on all existing calls
            calls.keys().forEach(function (peerId) {
              var call = calls.get(peerId);
              var dc;

              // if we are the master connection, create the data channel
              if (call && call.pc && signaller.isMaster(peerId)) {
                dc = call.pc.createDataChannel(label, opts);
                gotPeerChannel(dc, call.pc, call.data);
              }
            });

            // save the data channel opts in the local channels dictionary
            channels[label] = opts || null;

            return signaller;
          };

          /**
           #### join()

           The `join` function is used when `manualJoin` is set to true when creating
           a quickconnect instance.  Call the `join` function once you are ready to
           join the signalling server and initiate connections with other people.

           **/
          signaller.join = function () {
            allowJoin = true;
            checkReadyToAnnounce();
          };

          /**
           #### reactive()

           Flag that this session will be a reactive connection.

           **/
          signaller.reactive = function () {
            // add the reactive flag
            opts = opts || {};
            opts.reactive = true;

            // chain
            return signaller;
          };

          /**
           #### removeStream

           ```
           removeStream(stream:MediaStream)
           ```

           Remove the specified stream from both the local streams that are to
           be connected to new peers, and also from any active calls.

           **/
          signaller.removeStream = function (stream) {
            var localIndex = localStreams.indexOf(stream);

            // remove the stream from any active calls
            calls.values().forEach(function (call) {
              call.pc.removeStream(stream);
            });

            // remove the stream from the localStreams array
            if (localIndex >= 0) {
              localStreams.splice(localIndex, 1);
            }

            return signaller;
          };

          /**
           #### requestChannel

           ```
           requestChannel(targetId, label, callback)
           ```

           This is a function that can be used to respond to remote peers supplying
           a data channel as part of their configuration.  As per the `receiveStream`
           function this function will either fire the callback immediately if the
           channel is already available, or once the channel has been discovered on
           the call.

           **/
          signaller.requestChannel = function (targetId, label, callback) {
            var call = getActiveCall(targetId);
            var channel = call && call.channels.get(label);

            // if we have then channel trigger the callback immediately
            if (channel) {
              callback(null, channel);
              return signaller;
            }

            // if not, wait for it
            signaller.once('channel:opened:' + label, function (id, dc) {
              callback(null, dc);
            });

            return signaller;
          };

          /**
           #### requestStream

           ```
           requestStream(targetId, idx, callback)
           ```

           Used to request a remote stream from a quickconnect instance. If the
           stream is already available in the calls remote streams, then the callback
           will be triggered immediately, otherwise this function will monitor
           `stream:added` events and wait for a match.

           In the case that an unknown target is requested, then an exception will
           be thrown.
           **/
          signaller.requestStream = function (targetId, idx, callback) {
            var call = getActiveCall(targetId);
            var stream;

            function waitForStream(peerId) {
              if (peerId !== targetId) {
                return;
              }

              // get the stream
              stream = call.pc.getRemoteStreams()[idx];

              // if we have the stream, then remove the listener and trigger the cb
              if (stream) {
                signaller.removeListener('stream:added', waitForStream);
                callback(null, stream);
              }
            }

            // look for the stream in the remote streams of the call
            stream = call.pc.getRemoteStreams()[idx];

            // if we found the stream then trigger the callback
            if (stream) {
              callback(null, stream);
              return signaller;
            }

            // otherwise wait for the stream
            signaller.on('stream:added', waitForStream);
            return signaller;
          };

          /**
           #### profile(data)

           Update the profile data with the attached information, so when
           the signaller announces it includes this data in addition to any
           room and id information.

           **/
          signaller.profile = function (data) {
            extend(profile, data);

            // if we have already announced, then reannounce our profile to provide
            // others a `peer:update` event
            if (announced) {
              signaller.announce(profile);
            }

            return signaller;
          };

          /**
           #### waitForCall

           ```
           waitForCall(targetId, callback)
           ```

           Wait for a call from the specified targetId.  If the call is already
           active the callback will be fired immediately, otherwise we will wait
           for a `call:started` event that matches the requested `targetId`

           **/
          signaller.waitForCall = function (targetId, callback) {
            var call = calls.get(targetId);

            if (call && call.active) {
              callback(null, call.pc);
              return signaller;
            }

            signaller.on('call:started', function handleNewCall(id) {
              if (id === targetId) {
                signaller.removeListener('call:started', handleNewCall);
                callback(null, calls.get(id).pc);
              }
            });
          };

          // if we have an expected number of local streams, then use a filter to
          // check if we should respond
          if (expectedLocalStreams) {
            signaller.on('peer:filter', handlePeerFilter);
          }

          // respond to local announce messages
          signaller.on('local:announce', handleLocalAnnounce);

          // check to see if we are ready to announce
          checkReadyToAnnounce();

          // pass the signaller on
          return signaller;
        };

      }).call(this, require("Zbi7gb"))
    }, {
      "Zbi7gb": 4,
      "cog/defaults": 10,
      "cog/extend": 11,
      "cog/getable": 12,
      "mbus": 16,
      "rtc-signaller": 22,
      "rtc-tools": 37,
      "rtc-tools/cleanup": 33
    }
  ],
  10: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## cog/defaults

       ```js
       var defaults = require('cog/defaults');
       ```

       ### defaults(target, *)

       Shallow copy object properties from the supplied source objects (*) into
       the target object, returning the target object once completed.  Do not,
       however, overwrite existing keys with new values:

       ```js
       defaults({ a: 1, b: 2 }, { c: 3 }, { d: 4 }, { b: 5 }));
       ```

       See an example on [requirebin](http://requirebin.com/?gist=6079475).
       **/
      module.exports = function (target) {
        // ensure we have a target
        target = target || {};

        // iterate through the sources and copy to the target
        [].slice.call(arguments, 1).forEach(function (source) {
          if (!source) {
            return;
          }

          for (var prop in source) {
            if (target[prop] === void 0) {
              target[prop] = source[prop];
            }
          }
        });

        return target;
      };
    }, {}
  ],
  11: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## cog/extend

       ```js
       var extend = require('cog/extend');
       ```

       ### extend(target, *)

       Shallow copy object properties from the supplied source objects (*) into
       the target object, returning the target object once completed:

       ```js
       extend({ a: 1, b: 2 }, { c: 3 }, { d: 4 }, { b: 5 }));
       ```

       See an example on [requirebin](http://requirebin.com/?gist=6079475).
       **/
      module.exports = function (target) {
        [].slice.call(arguments, 1).forEach(function (source) {
          if (!source) {
            return;
          }

          for (var prop in source) {
            target[prop] = source[prop];
          }
        });

        return target;
      };
    }, {}
  ],
  12: [
    function (require, module, exports) {
      /**
       ## cog/getable

       Take an object and provide a wrapper that allows you to `get` and
       `set` values on that object.

       **/
      module.exports = function (target) {
        function get(key) {
          return target[key];
        }

        function set(key, value) {
          target[key] = value;
        }

        function remove(key) {
          return delete target[key];
        }

        function keys() {
          return Object.keys(target);
        };

        function values() {
          return Object.keys(target).map(function (key) {
            return target[key];
          });
        };

        if (typeof target != 'object') {
          return target;
        }

        return {
          get: get,
          set: set,
          remove: remove,
          delete: remove,
          keys: keys,
          values: values
        };
      };

    }, {}
  ],
  13: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## cog/jsonparse

       ```js
       var jsonparse = require('cog/jsonparse');
       ```

       ### jsonparse(input)

       This function will attempt to automatically detect stringified JSON, and
       when detected will parse into JSON objects.  The function looks for strings
       that look and smell like stringified JSON, and if found attempts to
       `JSON.parse` the input into a valid object.

       **/
      module.exports = function (input) {
        var isString = typeof input == 'string' || (input instanceof String);
        var reNumeric = /^\-?\d+\.?\d*$/;
        var shouldParse;
        var firstChar;
        var lastChar;

        if ((!isString) || input.length < 2) {
          if (isString && reNumeric.test(input)) {
            return parseFloat(input);
          }

          return input;
        }

        // check for true or false
        if (input === 'true' || input === 'false') {
          return input === 'true';
        }

        // check for null
        if (input === 'null') {
          return null;
        }

        // get the first and last characters
        firstChar = input.charAt(0);
        lastChar = input.charAt(input.length - 1);

        // determine whether we should JSON.parse the input
        shouldParse =
          (firstChar == '{' && lastChar == '}') ||
          (firstChar == '[' && lastChar == ']') ||
          (firstChar == '"' && lastChar == '"');

        if (shouldParse) {
          try {
            return JSON.parse(input);
          } catch (e) {
            // apparently it wasn't valid json, carry on with regular processing
          }
        }


        return reNumeric.test(input) ? parseFloat(input) : input;
      };
    }, {}
  ],
  14: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## cog/logger

       ```js
       var logger = require('cog/logger');
       ```

       Simple browser logging offering similar functionality to the
       [debug](https://github.com/visionmedia/debug) module.

       ### Usage

       Create your self a new logging instance and give it a name:

       ```js
       var debug = logger('phil');
       ```

       Now do some debugging:

       ```js
       debug('hello');
       ```

       At this stage, no log output will be generated because your logger is
       currently disabled.  Enable it:

       ```js
       logger.enable('phil');
       ```

       Now do some more logger:

       ```js
       debug('Oh this is so much nicer :)');
       // --> phil: Oh this is some much nicer :)
       ```

       ### Reference
       **/

      var active = [];
      var unleashListeners = [];
      var targets = [console];

      /**
       #### logger(name)

       Create a new logging instance.
       **/
      var logger = module.exports = function (name) {
        // initial enabled check
        var enabled = checkActive();

        function checkActive() {
          return enabled = active.indexOf('*') >= 0 || active.indexOf(name) >= 0;
        }

        // register the check active with the listeners array
        unleashListeners[unleashListeners.length] = checkActive;

        // return the actual logging function
        return function () {
          var args = [].slice.call(arguments);

          // if we have a string message
          if (typeof args[0] == 'string' || (args[0] instanceof String)) {
            args[0] = name + ': ' + args[0];
          }

          // if not enabled, bail
          if (!enabled) {
            return;
          }

          // log
          targets.forEach(function (target) {
            target.log.apply(target, args);
          });
        };
      };

      /**
       #### logger.reset()

       Reset logging (remove the default console logger, flag all loggers as
       inactive, etc, etc.
       **/
      logger.reset = function () {
        // reset targets and active states
        targets = [];
        active = [];

        return logger.enable();
      };

      /**
       #### logger.to(target)

       Add a logging target.  The logger must have a `log` method attached.

       **/
      logger.to = function (target) {
        targets = targets.concat(target || []);

        return logger;
      };

      /**
       #### logger.enable(names*)

       Enable logging via the named logging instances.  To enable logging via all
       instances, you can pass a wildcard:

       ```js
       logger.enable('*');
       ```

       __TODO:__ wildcard enablers
       **/
      logger.enable = function () {
        // update the active
        active = active.concat([].slice.call(arguments));

        // trigger the unleash listeners
        unleashListeners.forEach(function (listener) {
          listener();
        });

        return logger;
      };
    }, {}
  ],
  15: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## cog/throttle

       ```js
       var throttle = require('cog/throttle');
       ```

       ### throttle(fn, delay, opts)

       A cherry-pickable throttle function.  Used to throttle `fn` to ensure
       that it can be called at most once every `delay` milliseconds.  Will
       fire first event immediately, ensuring the next event fired will occur
       at least `delay` milliseconds after the first, and so on.

       **/
      module.exports = function (fn, delay, opts) {
        var lastExec = (opts || {}).leading !== false ? 0 : Date.now();
        var trailing = (opts || {}).trailing;
        var timer;
        var queuedArgs;
        var queuedScope;

        // trailing defaults to true
        trailing = trailing || trailing === undefined;

        function invokeDefered() {
          fn.apply(queuedScope, queuedArgs || []);
          lastExec = Date.now();
        }

        return function () {
          var tick = Date.now();
          var elapsed = tick - lastExec;

          // always clear the defered timer
          clearTimeout(timer);

          if (elapsed < delay) {
            queuedArgs = [].slice.call(arguments, 0);
            queuedScope = this;

            return trailing && (timer = setTimeout(invokeDefered, delay - elapsed));
          }

          // call the function
          lastExec = tick;
          fn.apply(this, arguments);
        };
      };
    }, {}
  ],
  16: [
    function (require, module, exports) {
      var createTrie = require('array-trie');
      var reDelim = /[\.\:]/;

      /**
       # mbus

       If Node's EventEmitter and Eve were to have a child, it might look something like this.
       No wildcard support at this stage though...

       ## Example Usage

       <<< docs/usage.md

       ## Reference

       ### `mbus(namespace?, parent?, scope?)`

       Create a new message bus with `namespace` inheriting from the `parent`
       mbus instance.  If events from this message bus should be triggered with
       a specific `this` scope, then specify it using the `scope` argument.

       **/

      var createBus = module.exports = function (namespace, parent, scope) {
        var registry = createTrie();
        var feeds = [];

        function bus(name) {
          var args = [].slice.call(arguments, 1);
          var parts = getNameParts(name);
          var delimited = parts.join('.');
          var handlers = registry.get(parts) || [];
          var results;

          // send through the feeds
          feeds.forEach(function (feed) {
            feed({
              name: delimited,
              args: args
            });
          });

          // run the registered handlers
          results = [].concat(handlers).map(function (handler) {
            return handler.apply(scope || this, args);
          });

          // run the parent handlers
          if (bus.parent) {
            results = results.concat(
              bus.parent.apply(scope || this, [namespace.concat(parts)].concat(args))
            );
          }

          return results;
        }

        /**
         ### `mbus#clear()`

         Reset the handler registry, which essential deregisters all event listeners.

         _Alias:_ `removeAllListeners`
         **/

        function clear(name) {
          // if we have a name, reset handlers for that handler
          if (name) {
            registry.set(getNameParts(name), []);
          }
          // otherwise, reset the entire handler registry
          else {
            registry = createTrie();
          }
        }

        /**
         ### `mbus#feed(handler)`

         Attach a handler function that will see all events that are sent through
         this bus in an "object stream" format that matches the following format:

         ```
         { name: 'event.name', args: [ 'event', 'args' ] }
         ```

         The feed function returns a function that can be called to stop the feed
         sending data.

         **/

        function feed(handler) {
          function stop() {
            feeds.splice(feeds.indexOf(handler), 1);
          }

          feeds.push(handler);
          return stop;
        }

        function getNameParts(name) {
          return Array.isArray(name) ? name : name.split(reDelim);
        }

        /**
         ### `mbus#off(name, handler)`

         Deregister an event handler.
         **/

        function off(name, handler) {
          var handlers = registry.get(getNameParts(name));
          var idx = handlers ? handlers.indexOf(handler) : -1;

          if (idx >= 0) {
            handlers.splice(idx, 1);
          }
        }

        /**
         ### `mbus#on(name, handler)`

         Register an event handler for the event `name`.

         **/

        function on(name, handler) {
          var parts = getNameParts(name);
          var handlers = registry.get(parts);

          if (handlers) {
            handlers.push(handler);
          } else {
            registry.set(parts, [handler]);
          }

          return bus;
        }


        /**
         ### `mbus#once(name, handler)`

         Register an event handler for the event `name` that will only
         trigger once (i.e. the handler will be deregistered immediately after
         being triggered the first time).

         **/

        function once(name, handler) {
          return on(name, function handleEvent() {
            var result = handler.apply(this, arguments);
            bus.off(name, handleEvent);

            return result;
          });
        }

        if (typeof namespace == 'function') {
          parent = namespace;
          namespace = '';
        }

        namespace = (namespace && namespace.split(reDelim)) || [];

        bus.clear = bus.removeAllListeners = clear;
        bus.feed = feed;
        bus.on = bus.addListener = on;
        bus.once = once;
        bus.off = bus.removeListener = off;
        bus.parent = parent || (namespace && namespace.length > 0 && createBus());

        return bus;
      };

    }, {
      "array-trie": 18
    }
  ],
  17: [
    function (require, module, exports) {
      "use strict"

      function compileSearch(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
        var code = [
          "function ", funcName, "(a,l,h,", extraArgs.join(","), "){",
          earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
          ";while(l<=h){\
var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"
        ]
        if (earlyOut) {
          if (predicate.indexOf("c") < 0) {
            code.push(";if(x===y){return m}else if(x<=y){")
          } else {
            code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
          }
        } else {
          code.push(";if(", predicate, "){i=m;")
        }
        if (reversed) {
          code.push("l=m+1}else{h=m-1}")
        } else {
          code.push("h=m-1}else{l=m+1}")
        }
        code.push("}")
        if (earlyOut) {
          code.push("return -1};")
        } else {
          code.push("return i};")
        }
        return code.join("")
      }

      function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
        var result = new Function([
          compileSearch("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
          compileSearch("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
          compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
          compileSearch("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
          "function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(a.shape){\
if(typeof(c)==='function'){\
return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
}else{\
return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
}}else{\
if(typeof(c)==='function'){\
return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
}}}\
return dispatchBsearch", suffix
        ].join(""))
        return result()
      }

      module.exports = {
        ge: compileBoundsSearch(">=", false, "GE"),
        gt: compileBoundsSearch(">", false, "GT"),
        lt: compileBoundsSearch("<", true, "LT"),
        le: compileBoundsSearch("<=", true, "LE"),
        eq: compileBoundsSearch("-", true, "EQ", true)
      }

    }, {}
  ],
  18: [
    function (require, module, exports) {
      "use strict"

      var bounds = require("binary-search-bounds")

      module.exports = createTrie

      function Trie(symbols, children, value) {
        this.symbols = symbols
        this.children = children
        this.value = value
      }

      var proto = Trie.prototype

      proto.set = function (s, value) {
        if (s.shape) {
          var v = this
          var n = s.shape[0]
          for (var i = 0; i < n; ++i) {
            var c = s.get(i)
            var j = bounds.ge(v.symbols, c)
            if (j < v.symbols.length && v.symbols[j] === c) {
              v = v.children[j]
            } else {
              var l = new Trie([], [], value)
              for (var k = n - 1; k > i; --k) {
                l = new Trie([s.get(k)], [l])
              }
              v.symbols.splice(j, 0, c)
              v.children.splice(j, 0, l)
              return value
            }
          }
          return v.value = value
        } else {
          var v = this
          var n = s.length
          for (var i = 0; i < n; ++i) {
            var c = s[i]
            var j = bounds.ge(v.symbols, c)
            if (j < v.symbols.length && v.symbols[j] === c) {
              v = v.children[j]
            } else {
              var l = new Trie([], [], value)
              for (var k = n - 1; k > i; --k) {
                l = new Trie([s[k]], [l])
              }
              v.symbols.splice(j, 0, c)
              v.children.splice(j, 0, l)
              return value
            }
          }
          return v.value = value
        }
      }

      proto.get = function (s) {
        if (s.shape) {
          var v = this
          var n = s.shape[0]
          for (var i = 0; i < n; ++i) {
            var c = s.get(i)
            var j = bounds.eq(v.symbols, c)
            if (j < 0) {
              return
            }
            v = v.children[j]
          }
          return v.value
        } else {
          var v = this
          var n = s.length
          for (var i = 0; i < n; ++i) {
            var c = s[i]
            var j = bounds.eq(v.symbols, c)
            if (j < 0) {
              return
            }
            v = v.children[j]
          }
          return v.value
        }
      }

      function createTrie() {
        return new Trie([], [])
      }
    }, {
      "binary-search-bounds": 17
    }
  ],
  19: [
    function (require, module, exports) {
      /* jshint node: true */
      /* global window: false */
      /* global navigator: false */

      'use strict';

      var browser = require('detect-browser');

      /**
       ### `rtc-core/detect`

       A browser detection helper for accessing prefix-free versions of the various
       WebRTC types.

       ### Example Usage

       If you wanted to get the native `RTCPeerConnection` prototype in any browser
       you could do the following:

       ```js
       var detect = require('rtc-core/detect'); // also available in rtc/detect
       var RTCPeerConnection = detect('RTCPeerConnection');
       ```

       This would provide whatever the browser prefixed version of the
       RTCPeerConnection is available (`webkitRTCPeerConnection`,
       `mozRTCPeerConnection`, etc).
       **/
      var detect = module.exports = function (target, prefixes) {
        var prefixIdx;
        var prefix;
        var testName;
        var hostObject = this || (typeof window != 'undefined' ? window : undefined);

        // if we have no host object, then abort
        if (!hostObject) {
          return;
        }

        // initialise to default prefixes
        // (reverse order as we use a decrementing for loop)
        prefixes = (prefixes || ['ms', 'o', 'moz', 'webkit']).concat('');

        // iterate through the prefixes and return the class if found in global
        for (prefixIdx = prefixes.length; prefixIdx--;) {
          prefix = prefixes[prefixIdx];

          // construct the test class name
          // if we have a prefix ensure the target has an uppercase first character
          // such that a test for getUserMedia would result in a
          // search for webkitGetUserMedia
          testName = prefix + (prefix ?
            target.charAt(0).toUpperCase() + target.slice(1) :
              target);

          if (typeof hostObject[testName] != 'undefined') {
            // update the last used prefix
            detect.browser = detect.browser || prefix.toLowerCase();

            // return the host object member
            return hostObject[target] = hostObject[testName];
          }
        }
      };

      // detect mozilla (yes, this feels dirty)
      detect.moz = typeof navigator != 'undefined' && !!navigator.mozGetUserMedia;

      // set the browser and browser version
      detect.browser = browser.name;
      detect.browserVersion = detect.version = browser.version;

    }, {
      "detect-browser": 20
    }
  ],
  20: [
    function (require, module, exports) {
      var browsers = [
        ['chrome', /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
        ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
        ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
        ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-6].0/],
        ['ie', /MSIE\s(7\.0)/],
        ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ['android', /Android\s([0-9\.]+)/],
        ['ios', /iPad\;\sCPU\sOS\s([0-9\._]+)/],
        ['ios', /iPhone\;\sCPU\siPhone\sOS\s([0-9\._]+)/],
        ['safari', /Safari\/([0-9\._]+)/]
      ];

      var match = browsers.map(match).filter(isMatch)[0];
      var parts = match && match[3].split(/[._]/).slice(0, 3);

      while (parts && parts.length < 3) {
        parts.push('0');
      }

      // set the name and version
      exports.name = match && match[0];
      exports.version = parts && parts.join('.');

      function match(pair) {
        return pair.concat(pair[1].exec(navigator.userAgent));
      }

      function isMatch(pair) {
        return !!pair[2];
      }

    }, {}
  ],
  21: [
    function (require, module, exports) {
      var detect = require('./detect');
      var requiredFunctions = [
        'init'
      ];

      function isSupported(plugin) {
        return plugin && typeof plugin.supported == 'function' && plugin.supported(detect);
      }

      function isValid(plugin) {
        var supportedFunctions = requiredFunctions.filter(function (fn) {
          return typeof plugin[fn] == 'function';
        });

        return supportedFunctions.length === requiredFunctions.length;
      }

      module.exports = function (plugins) {
        return [].concat(plugins || []).filter(isSupported).filter(isValid)[0];
      }

    }, {
      "./detect": 19
    }
  ],
  22: [
    function (require, module, exports) {
      var extend = require('cog/extend');

      module.exports = function (messenger, opts) {
        return require('./index.js')(messenger, extend({
          connect: require('./primus-loader')
        }, opts));
      };

    }, {
      "./index.js": 27,
      "./primus-loader": 31,
      "cog/extend": 11
    }
  ],
  23: [
    function (require, module, exports) {
      module.exports = {
        // messenger events
        dataEvent: 'data',
        openEvent: 'open',
        closeEvent: 'close',

        // messenger functions
        writeMethod: 'write',
        closeMethod: 'close',

        // leave timeout (ms)
        leaveTimeout: 3000
      };
    }, {}
  ],
  24: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var debug = require('cog/logger')('rtc-signaller');
      var extend = require('cog/extend');
      var roles = ['a', 'b'];

      /**
       #### announce

       ```
       /announce|%metadata%|{"id": "...", ... }
       ```

       When an announce message is received by the signaller, the attached
       object data is decoded and the signaller emits an `announce` message.

       **/
      module.exports = function (signaller) {

        function copyData(target, source) {
          if (target && source) {
            for (var key in source) {
              target[key] = source[key];
            }
          }

          return target;
        }

        function dataAllowed(data) {
          var evt = {
            data: data,
            allow: true
          };

          signaller('peer:filter', evt);

          return evt.allow;
        }

        return function (args, messageType, srcData, srcState, isDM) {
          var data = args[0];
          var peer;

          debug('announce handler invoked, received data: ', data);

          // if we have valid data then process
          if (data && data.id && data.id !== signaller.id) {
            if (!dataAllowed(data)) {
              return;
            }
            // check to see if this is a known peer
            peer = signaller.peers.get(data.id);

            // trigger the peer connected event to flag that we know about a
            // peer connection. The peer has passed the "filter" check but may
            // be announced / updated depending on previous connection status
            signaller('peer:connected', data.id, data);

            // if the peer is existing, then update the data
            if (peer && (!peer.inactive)) {
              debug('signaller: ' + signaller.id + ' received update, data: ', data);

              // update the data
              copyData(peer.data, data);

              // trigger the peer update event
              return signaller('peer:update', data, srcData);
            }

            // create a new peer
            peer = {
              id: data.id,

              // initialise the local role index
              roleIdx: [data.id, signaller.id].sort().indexOf(data.id),

              // initialise the peer data
              data: {}
            };

            // initialise the peer data
            copyData(peer.data, data);

            // reset inactivity state
            clearTimeout(peer.leaveTimer);
            peer.inactive = false;

            // set the peer data
            signaller.peers.set(data.id, peer);

            // if this is an initial announce message (no vector clock attached)
            // then send a announce reply
            if (signaller.autoreply && (!isDM)) {
              signaller
                .to(data.id)
                .send('/announce', signaller.attributes);
            }

            // emit a new peer announce event
            return signaller('peer:announce', data, peer);
          }
        };
      };

    }, {
      "cog/extend": 11,
      "cog/logger": 14
    }
  ],
  25: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ### signaller message handlers

       **/

      module.exports = function (signaller, opts) {
        return {
          announce: require('./announce')(signaller, opts),
          leave: require('./leave')(signaller, opts)
        };
      };
    }, {
      "./announce": 24,
      "./leave": 26
    }
  ],
  26: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       #### leave

       ```
       /leave|{"id":"..."}
       ```

       When a leave message is received from a peer, we check to see if that is
       a peer that we are managing state information for and if we are then the
       peer state is removed.

       **/
      module.exports = function (signaller, opts) {
        return function (args) {
          var data = args[0];
          var peer = signaller.peers.get(data && data.id);

          if (peer) {
            // start the inactivity timer
            peer.leaveTimer = setTimeout(function () {
              peer.inactive = true;
              signaller('peer:leave', data.id, peer);
            }, opts.leaveTimeout);
          }

          // emit the event
          signaller('peer:disconnected', data.id, peer);
        };
      };

    }, {}
  ],
  27: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var debug = require('cog/logger')('rtc-signaller');
      var detect = require('rtc-core/detect');
      var defaults = require('cog/defaults');
      var extend = require('cog/extend');
      var mbus = require('mbus');
      var throttle = require('cog/throttle');
      var getable = require('cog/getable');
      var uuid = require('cuid');

      // initialise the list of valid "write" methods
      var WRITE_METHODS = ['write', 'send'];
      var CLOSE_METHODS = ['close', 'end'];

      // initialise signaller metadata so we don't have to include the package.json
      // TODO: make this checkable with some kind of prepublish script
      var metadata = {
        version: '3.0.0'
      };

      /**
       # rtc-signaller

       The `rtc-signaller` module provides a transportless signalling
       mechanism for WebRTC.

       ## Purpose

       <<< docs/purpose.md

       ## Getting Started

       While the signaller is capable of communicating by a number of different
       messengers (i.e. anything that can send and receive messages over a wire)
       it comes with support for understanding how to connect to an
       [rtc-switchboard](https://github.com/rtc-io/rtc-switchboard) out of the box.

       The following code sample demonstrates how:

       <<< examples/getting-started.js

       <<< docs/events.md

       <<< docs/signalflow-diagrams.md

       ## Reference

       The `rtc-signaller` module is designed to be used primarily in a functional
       way and when called it creates a new signaller that will enable
       you to communicate with other peers via your messaging network.

       ```js
       // create a signaller from something that knows how to send messages
       var signaller = require('rtc-signaller')(messenger);
       ```

       As demonstrated in the getting started guide, you can also pass through
       a string value instead of a messenger instance if you simply want to
       connect to an existing `rtc-switchboard` instance.

       **/
      module.exports = function (messenger, opts) {
        // get the autoreply setting
        var autoreply = (opts || {}).autoreply;
        var connect = (opts || {}).connect;

        // initialise the metadata
        var localMeta = {};

        // create the signaller
        var signaller = mbus('', (opts || {}).logger);

        // initialise the id
        var id = signaller.id = (opts || {}).id || uuid();

        // initialise the attributes
        var attributes = signaller.attributes = {
          browser: detect.browser,
          browserVersion: detect.browserVersion,
          id: id,
          agent: 'signaller@' + metadata.version
        };

        // create the peers map
        var peers = signaller.peers = getable({});

        // initialise the data event name

        var connected = false;
        var write;
        var close;
        var processor;
        var announceTimer = 0;

        function announceOnReconnect() {
          signaller.announce();
        }

        function bindBrowserEvents() {
          messenger.addEventListener('message', function (evt) {
            processor(evt.data);
          });

          messenger.addEventListener('open', function (evt) {
            connected = true;
            signaller('open');
            signaller('connected');
          });

          messenger.addEventListener('close', function (evt) {
            connected = false;
            signaller('disconnected');
          });
        }

        function bindEvents() {
          // if we don't have an on function for the messenger, then do nothing
          if (typeof messenger.on != 'function') {
            return;
          }

          // handle message data events
          messenger.on(opts.dataEvent, processor);

          // when the connection is open, then emit an open event and a connected event
          messenger.on(opts.openEvent, function () {
            connected = true;
            signaller('open');
            signaller('connected');
          });

          messenger.on(opts.closeEvent, function () {
            connected = false;
            signaller('disconnected');
          });
        }

        function connectToHost(url) {
          if (typeof connect != 'function') {
            return signaller('error', new Error('no connect function'));
          }

          // load primus
          connect(url, opts, function (err, socket) {
            if (err) {
              return signaller('error', err);
            }

            // create the actual messenger from a primus connection
            signaller._messenger = messenger = socket.connect(url);

            // now init
            init();
          });
        }

        function createDataLine(args) {
          return args.map(prepareArg).join('|');
        }

        function createMetadata() {
          return extend({}, localMeta, {
            id: signaller.id
          });
        }

        function extractProp(name) {
          return messenger[name];
        }

        // attempt to detect whether the underlying messenger is closing
        // this can be tough as we deal with both native (or simulated native)
        // sockets or an abstraction layer such as primus

        function isClosing() {
          var isAbstraction = messenger &&
              // a primus socket has a socket attribute
            typeof messenger.socket != 'undefined';

          return isAbstraction ? false : (
            messenger &&
            typeof messenger.readyState != 'undefined' &&
            messenger.readyState >= 2
          );
        }

        function isF(target) {
          return typeof target == 'function';
        }

        function init() {
          // extract the write and close function references
          write = [opts.writeMethod].concat(WRITE_METHODS).map(extractProp).filter(isF)[0];
          close = [opts.closeMethod].concat(CLOSE_METHODS).map(extractProp).filter(isF)[0];

          // create the processor
          signaller.process = processor = require('./processor')(signaller, opts);

          // if the messenger doesn't provide a valid write method, then complain
          if (typeof write != 'function') {
            throw new Error('provided messenger does not implement a "' +
              opts.writeMethod + '" write method');
          }

          // handle core browser messenging apis
          if (typeof messenger.addEventListener == 'function') {
            bindBrowserEvents();
          } else {
            bindEvents();
          }

          // determine if we are connected or not
          connected = messenger.connected || false;
          if (!connected) {
            signaller.once('connected', function () {
              // always announce on reconnect
              signaller.on('connected', announceOnReconnect);
            });
          }

          // emit the initialized event
          setTimeout(signaller.bind(signaller, 'init'), 0);
        }

        function prepareArg(arg) {
          if (typeof arg == 'object' && (!(arg instanceof String))) {
            return JSON.stringify(arg);
          } else if (typeof arg == 'function') {
            return null;
          }

          return arg;
        }

        /**
         ### signaller#send(message, data*)

         Use the send function to send a message to other peers in the current
         signalling scope (if announced in a room this will be a room, otherwise
         broadcast to all peers connected to the signalling server).

         **/
        var send = signaller.send = function () {
          // iterate over the arguments and stringify as required
          // var metadata = { id: signaller.id };
          var args = [].slice.call(arguments);
          var dataline;

          // inject the metadata
          args.splice(1, 0, createMetadata());
          dataline = createDataLine(args);

          // perform an isclosing check
          if (isClosing()) {
            return;
          }

          // if we are not initialized, then wait until we are
          if (!connected) {
            return signaller.once('connected', function () {
              write.call(messenger, dataline);
            });
          }

          // send the data over the messenger
          return write.call(messenger, dataline);
        };

        /**
         ### announce(data?)

         The `announce` function of the signaller will pass an `/announce` message
         through the messenger network.  When no additional data is supplied to
         this function then only the id of the signaller is sent to all active
         members of the messenging network.

         #### Joining Rooms

         To join a room using an announce call you simply provide the name of the
         room you wish to join as part of the data block that you annouce, for
         example:

         ```js
         signaller.announce({ room: 'testroom' });
         ```

         Signalling servers (such as
         [rtc-switchboard](https://github.com/rtc-io/rtc-switchboard)) will then
         place your peer connection into a room with other peers that have also
         announced in this room.

         Once you have joined a room, the server will only deliver messages that
         you `send` to other peers within that room.

         #### Providing Additional Announce Data

         There may be instances where you wish to send additional data as part of
         your announce message in your application.  For instance, maybe you want
         to send an alias or nick as part of your announce message rather than just
         use the signaller's generated id.

         If for instance you were writing a simple chat application you could join
         the `webrtc` room and tell everyone your name with the following announce
         call:

         ```js
         signaller.announce({
      room: 'webrtc',
      nick: 'Damon'
    });
         ```

         #### Announcing Updates

         The signaller is written to distinguish between initial peer announcements
         and peer data updates (see the docs on the announce handler below). As
         such it is ok to provide any data updates using the announce method also.

         For instance, I could send a status update as an announce message to flag
         that I am going offline:

         ```js
         signaller.announce({ status: 'offline' });
         ```

         **/
        signaller.announce = function (data, sender) {

          function sendAnnounce() {
            (sender || send)('/announce', attributes);
            signaller('local:announce', attributes);
          }

          clearTimeout(announceTimer);

          // update internal attributes
          extend(attributes, data, {
            id: signaller.id
          });

          // if we are already connected, then ensure we announce on
          // reconnect
          if (connected) {
            // always announce on reconnect
            signaller.removeListener('connected', announceOnReconnect);
            signaller.on('connected', announceOnReconnect);
          }

          // send the attributes over the network
          return announceTimer = setTimeout(function () {
            if (!connected) {
              return signaller.once('connected', sendAnnounce);
            }

            sendAnnounce();
          }, (opts || {}).announceDelay || 10);
        };

        /**
         ### isMaster(targetId)

         A simple function that indicates whether the local signaller is the master
         for it's relationship with peer signaller indicated by `targetId`.  Roles
         are determined at the point at which signalling peers discover each other,
         and are simply worked out by whichever peer has the lowest signaller id
         when lexigraphically sorted.

         For example, if we have two signaller peers that have discovered each
         others with the following ids:

         - `b11f4fd0-feb5-447c-80c8-c51d8c3cced2`
         - `8a07f82e-49a5-4b9b-a02e-43d911382be6`

         They would be assigned roles:

         - `b11f4fd0-feb5-447c-80c8-c51d8c3cced2`
         - `8a07f82e-49a5-4b9b-a02e-43d911382be6` (master)

         **/
        signaller.isMaster = function (targetId) {
          var peer = peers.get(targetId);

          return peer && peer.roleIdx !== 0;
        };

        /**
         ### leave()

         Tell the signalling server we are leaving.  Calling this function is
         usually not required though as the signalling server should issue correct
         `/leave` messages when it detects a disconnect event.

         **/
        signaller.leave = signaller.close = function () {
          // send the leave signal
          send('/leave', {
            id: id
          });

          // stop announcing on reconnect
          signaller.removeListener('connected', announceOnReconnect);

          // call the close method
          if (typeof close == 'function') {
            close.call(messenger);
          }
        };

        /**
         ### metadata(data?)

         Get (pass no data) or set the metadata that is passed through with each
         request sent by the signaller.

         __NOTE:__ Regardless of what is passed to this function, metadata
         generated by the signaller will **always** include the id of the signaller
         and this cannot be modified.
         **/
        signaller.metadata = function (data) {
          if (arguments.length === 0) {
            return extend({}, localMeta);
          }

          localMeta = extend({}, data);
        };

        /**
         ### to(targetId)

         Use the `to` function to send a message to the specified target peer.
         A large parge of negotiating a WebRTC peer connection involves direct
         communication between two parties which must be done by the signalling
         server.  The `to` function provides a simple way to provide a logical
         communication channel between the two parties:

         ```js
         var send = signaller.to('e95fa05b-9062-45c6-bfa2-5055bf6625f4').send;

         // create an offer on a local peer connection
         pc.createOffer(
         function(desc) {
        // set the local description using the offer sdp
        // if this occurs successfully send this to our peer
        pc.setLocalDescription(
          desc,
          function() {
            send('/sdp', desc);
          },
          handleFail
        );
      },
         handleFail
         );
         ```

         **/
        signaller.to = function (targetId) {
          // create a sender that will prepend messages with /to|targetId|
          var sender = function () {
            // get the peer (yes when send is called to make sure it hasn't left)
            var peer = signaller.peers.get(targetId);
            var args;

            if (!peer) {
              throw new Error('Unknown peer: ' + targetId);
            }

            // if the peer is inactive, then abort
            if (peer.inactive) {
              return;
            }

            args = [
              '/to',
              targetId
            ].concat([].slice.call(arguments));

            // inject metadata
            args.splice(3, 0, createMetadata());

            setTimeout(function () {
              var msg = createDataLine(args);
              debug('TX (' + targetId + '): ' + msg);

              write.call(messenger, msg);
            }, 0);
          };

          return {
            announce: function (data) {
              return signaller.announce(data, sender);
            },

            send: sender,
          }
        };

        // initialise opts defaults
        opts = defaults({}, opts, require('./defaults'));

        // set the autoreply flag
        signaller.autoreply = autoreply === undefined || autoreply;

        // if the messenger is a string, then we are going to attach to a
        // ws endpoint and automatically set up primus
        if (typeof messenger == 'string' || (messenger instanceof String)) {
          connectToHost(messenger);
        }
        // otherwise, initialise the connection
        else {
          init();
        }

        // connect an instance of the messenger to the signaller
        signaller._messenger = messenger;

        // expose the process as a process function
        signaller.process = processor;

        return signaller;
      };

    }, {
      "./defaults": 23,
      "./processor": 32,
      "cog/defaults": 10,
      "cog/extend": 11,
      "cog/getable": 12,
      "cog/logger": 14,
      "cog/throttle": 15,
      "cuid": 28,
      "mbus": 16,
      "rtc-core/detect": 19
    }
  ],
  28: [
    function (require, module, exports) {
      /**
       * cuid.js
       * Collision-resistant UID generator for browsers and node.
       * Sequential for fast db lookups and recency sorting.
       * Safe for element IDs and server-side lookups.
       *
       * Extracted from CLCTR
       *
       * Copyright (c) Eric Elliott 2012
       * MIT License
       */

      /*global window, navigator, document, require, process, module */
      (function (app) {
        'use strict';
        var namespace = 'cuid',
          c = 0,
          blockSize = 4,
          base = 36,
          discreteValues = Math.pow(base, blockSize),

          pad = function pad(num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
          },

          randomBlock = function randomBlock() {
            return pad((Math.random() *
            discreteValues << 0)
              .toString(base), blockSize);
          },

          safeCounter = function () {
            c = (c < discreteValues) ? c : 0;
            c++; // this is not subliminal
            return c - 1;
          },

          api = function cuid() {
            // Starting with a lowercase letter makes
            // it HTML element ID friendly.
            var letter = 'c', // hard-coded allows for sequential access

            // timestamp
            // warning: this exposes the exact date and time
            // that the uid was created.
              timestamp = (new Date().getTime()).toString(base),

            // Prevent same-machine collisions.
              counter,

            // A few chars to generate distinct ids for different
            // clients (so different computers are far less
            // likely to generate the same id)
              fingerprint = api.fingerprint(),

            // Grab some more chars from Math.random()
              random = randomBlock() + randomBlock();

            counter = pad(safeCounter().toString(base), blockSize);

            return (letter + timestamp + counter + fingerprint + random);
          };

        api.slug = function slug() {
          var date = new Date().getTime().toString(36),
            counter,
            print = api.fingerprint().slice(0, 1) +
              api.fingerprint().slice(-1),
            random = randomBlock().slice(-2);

          counter = safeCounter().toString(36).slice(-4);

          return date.slice(-2) +
            counter + print + random;
        };

        api.globalCount = function globalCount() {
          // We want to cache the results of this
          var cache = (function calc() {
            var i,
              count = 0;

            for (i in window) {
              count++;
            }

            return count;
          }());

          api.globalCount = function () {
            return cache;
          };
          return cache;
        };

        api.fingerprint = function browserPrint() {
          return pad((navigator.mimeTypes.length +
            navigator.userAgent.length).toString(36) +
            api.globalCount().toString(36), 4);
        };

        // don't change anything from here down.
        if (app.register) {
          app.register(namespace, api);
        } else if (typeof module !== 'undefined') {
          module.exports = api;
        } else {
          app[namespace] = api;
        }

      }(this.applitude || this));

    }, {}
  ],
  29: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var reVariable = /\{\{\s*([^\}]+?)\s*\}\}/;
      var mods = require('./mods');

      /**
       # formatter

       This is a simple library designed to do one thing and one thing only -
       replace variables in strings with variable values.  It is built in such a
       way that the formatter strings are parsed and you are provided with a
       function than can efficiently be called to provide the custom output.

       ## Example Usage

       <<< examples/likefood.js

       __NOTE__: Formatter is not designed to be a templating library and if
       you are already using something like Handlebars or
       [hogan](https://github.com/twitter/hogan.js) in your library or application
       stack consider using them instead.

       ## Using named variables

       In the examples above we saw how the formatter can be used to replace
       function arguments in a formatter string.  We can also set up a formatter
       to use particular key values from an input string instead if that is more
       suitable:

       <<< examples/likefood-named.js

       ## Nested Property Values

       Since version `0.1.0` you can also access nested property values, as you
       can with templates like handlebars.

       ## Partial Execution

       Since version `0.3.x` formatter also supports partial execution when using
       indexed arguments (e.g. `{{ 0 }}`, `{{ 1 }}`, etc).  For example:

       <<< examples/partial.js

       In the case above, the original formatter function returned by `formatter`
       did not receive enough values to resolve all the required variables.  As
       such it returned a function ready to accept the remaining values.

       Once all values have been received the output will be generated.

       ## Performance

       I've done some
       [performance benchmarks](http://jsperf.com/formatter-performance) and
       formatter is faster than handlebars, but that isn't surprising as it is far
       simpler and doesn't have the smarts of HBS.  The test is really there to
       ensure that I didn't do anything too silly...

       Additionally, it should be noted that using formatter is 100% slower than
       concatenating strings, so don't use it where performance is critical.
       Do use it where not repeating yourself is.
       **/

      var formatter = module.exports = function (format, opts) {
        // extract the matches from the string
        var parts = [];
        var output = [];
        var chunk;
        var varname;
        var varParts;
        var match = reVariable.exec(format);
        var isNumeric;
        var outputIdx = 0;
        var ignoreNumeric = (opts || {}).ignoreNumeric;

        while (match) {
          // get the prematch chunk
          chunk = format.slice(0, match.index);

          // if we have a valid chunk, add it to the parts
          if (chunk) {
            output[outputIdx++] = chunk;
          }

          varParts = match[1].split(/\s*\|\s*/);
          match[1] = varParts[0];

          // extract the varname
          varname = parseInt(match[1], 10);
          isNumeric = !isNaN(varname);

          // if this is a numeric replacement expression, and we are ignoring
          // those expressions then pass it through to the output
          if (ignoreNumeric && isNumeric) {
            output[outputIdx++] = match[0];
          }
          // otherwise, handle normally
          else {
            // extract the expression and add it as a function
            parts[parts.length] = {
              idx: (outputIdx++),
              numeric: isNumeric,
              varname: isNumeric ? varname : match[1],
              modifiers: varParts.length > 1 ? createModifiers(varParts.slice(1)) : []
            };
          }

          // remove this matched chunk and replacer from the string
          format = format.slice(match.index + match[0].length);

          // check for the next match
          match = reVariable.exec(format);
        }

        // if we still have some of the format string remaining, add it to the list
        if (format) {
          output[outputIdx++] = format;
        }

        return collect(parts, output);
      };

      formatter.error = function (message) {
        // create the format
        var format = formatter(message);

        return function (err) {
          var output;

          // if no error has been supplied, then pass it straight through
          if (!err) {
            return;
          }

          output = new Error(
            format.apply(null, Array.prototype.slice.call(arguments, 1)));

          output._original = err;

          // return the new error
          return output;
        };
      };

      function collect(parts, resolved, indexShift) {
        // default optionals
        indexShift = indexShift || 0;

        return function () {
          var output = [].concat(resolved);
          var unresolved;
          var ii;
          var part;
          var partIdx;
          var propNames;
          var val;
          var numericResolved = [];

          // find the unresolved parts
          unresolved = parts.filter(function (part) {
            return typeof output[part.idx] == 'undefined';
          });

          // initialise the counter
          ii = unresolved.length;

          // iterate through the unresolved parts and attempt to resolve the value
          for (; ii--;) {
            part = unresolved[ii];

            if (typeof part == 'object') {
              // if this is a numeric part, this is a simple index lookup
              if (part.numeric) {
                partIdx = part.varname - indexShift;
                if (arguments.length > partIdx) {
                  output[part.idx] = arguments[partIdx];
                  if (numericResolved.indexOf(part.varname) < 0) {
                    numericResolved[numericResolved.length] = part.varname;
                  }
                }
              }
              // otherwise, we are doing a recursive property search
              else if (arguments.length > 0) {
                propNames = (part.varname || '').split('.');

                // initialise the output from the last valid argument
                output[part.idx] = (arguments[arguments.length - 1] || {});
                while (output[part.idx] && propNames.length > 0) {
                  val = output[part.idx][propNames.shift()];
                  output[part.idx] = typeof val != 'undefined' ? val : '';
                }
              }

              // if the output was resolved, then apply the modifier
              if (typeof output[part.idx] != 'undefined' && part.modifiers) {
                output[part.idx] = applyModifiers(part.modifiers, output[part.idx]);
              }
            }
          }

          // reasses unresolved (only caring about numeric parts)
          unresolved = parts.filter(function (part) {
            return part.numeric && typeof output[part.idx] == 'undefined';
          });

          // if we have no unresolved parts, then return the value
          if (unresolved.length === 0) {
            return output.join('');
          }

          // otherwise, return the collect function again
          return collect(
            parts,
            output,
            indexShift + numericResolved.length
          );
        };
      }

      function applyModifiers(modifiers, value) {
        // if we have modifiers, then tweak the output
        for (var ii = 0, count = modifiers.length; ii < count; ii++) {
          value = modifiers[ii](value);
        }

        return value;
      }

      function createModifiers(modifierStrings) {
        var modifiers = [];
        var parts;
        var fn;

        for (var ii = 0, count = modifierStrings.length; ii < count; ii++) {
          parts = modifierStrings[ii].split(':');
          fn = mods[parts[0].toLowerCase()];

          if (fn) {
            modifiers[modifiers.length] = fn.apply(null, parts.slice(1));
          }
        }

        return modifiers;
      }

    }, {
      "./mods": 30
    }
  ],
  30: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ## Modifiers

       **/

      /**
       ### Length Modifier (len)

       The length modifier is used to ensure that a string is exactly the length specified.  The string is sliced to the required max length, and then padded out with spaces (or a specified character) to meet the required length.

       ```js
       // pad the string test to 10 characters
       formatter('{{ 0|len:10 }}')('test');   // 'test      '

       // pad the string test to 10 characters, using a as the padding character
       formatter('{{ 0|len:10:a }}')('test'); // 'testaaaaaa'
       ```
       **/
      exports.len = function (length, padder) {
        var testInt = parseInt(padder, 10);
        var isNumber;

        // default the padder to a space
        padder = (!isNaN(testInt)) ? testInt : (padder || ' ');

        // check whether we have a number for padding (we will pad left if we do)
        isNumber = typeof padder == 'number';

        return function (input) {
          var output = input.toString().slice(0, length);

          // pad the string to the required length
          while (output.length < length) {
            output = isNumber ? padder + output : output + padder;
          }

          return output;
        };
      };
    }, {}
  ],
  31: [
    function (require, module, exports) {
      /* jshint node: true */
      /* global document, location, Primus: false */
      'use strict';

      var reTrailingSlash = /\/$/;
      var formatter = require('formatter');
      var primusUrl = formatter('{{ signalhost }}{{ primusPath }}');

      /**
       ### loadPrimus(signalhost, opts?, callback)

       This is a convenience function that is patched into the signaller to assist
       with loading the `primus.js` client library from an `rtc-switchboard`
       signaling server.

       In the case that you wish to load `primus.js` from a location other than
       the default location of `{{ signalhost }}/rtc.io/primus.js` you can
       provide an options object which allows for the following customizations:

       - `primusPath` (default: `/rtc.io/primus.js`)

       The path at which the `primus.js` file can be found on the signalhost.

       __NOTE:__ The above options are passed through when creating a
       signaller object, and thus packages such as
       [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect)
       will allow you to make the customisation with it's top level
       options also.

       **/
      module.exports = function (signalhost, opts, callback) {
        var anchor = document.createElement('a');
        var script;
        var scriptSrc;

        if (typeof opts == 'function') {
          callback = opts;
          opts = {};
        }

        // initialise the anchor with the signalhost
        anchor.href = signalhost;

        // initialise the script location
        scriptSrc = primusUrl({
          signalhost: signalhost.replace(reTrailingSlash, ''),
          primusPath: (opts || {}).primusPath || '/rtc.io/primus.js' //'/rtc.io/primus.js'
        });

        // look for the script first
        script = document.querySelector('script[src="' + scriptSrc + '"]');

        // if we found, the script trigger the callback immediately
        if (script && typeof Primus != 'undefined') {
          return callback(null, Primus);
        }
        // otherwise, if the script exists but Primus is not loaded,
        // then wait for the load
        else if (script) {
          script.addEventListener('load', function () {
            callback(null, Primus);
          });

          return;
        }

        // otherwise create the script and load primus
        script = document.createElement('script');
        script.src = scriptSrc;

        script.onerror = callback;
        script.addEventListener('load', function () {
          // if we have a signalhost that is not basepathed at /
          // then tweak the primus prototype
          if (anchor.pathname !== '/') {
            Primus.prototype.pathname = anchor.pathname.replace(reTrailingSlash, '') +
              Primus.prototype.pathname;
          }

          callback(null, Primus);
        });

        document.body.appendChild(script);
      };

    }, {
      "formatter": 29
    }
  ],
  32: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var debug = require('cog/logger')('rtc-signaller');
      var jsonparse = require('cog/jsonparse');

      /**
       ### signaller process handling

       When a signaller's underling messenger emits a `data` event this is
       delegated to a simple message parser, which applies the following simple
       logic:

       - Is the message a `/to` message. If so, see if the message is for this
       signaller (checking the target id - 2nd arg).  If so pass the
       remainder of the message onto the standard processing chain.  If not,
       discard the message.

       - Is the message a command message (prefixed with a forward slash). If so,
       look for an appropriate message handler and pass the message payload on
       to it.

       - Finally, does the message match any patterns that we are listening for?
       If so, then pass the entire message contents onto the registered handler.
       **/
      module.exports = function (signaller, opts) {
        var handlers = require('./handlers')(signaller, opts);

        function sendEvent(parts, srcState, data) {
          // initialise the event name
          var evtName = parts[0].slice(1);

          // convert any valid json objects to json
          var args = parts.slice(2).map(jsonparse);

          signaller.apply(
            signaller, [evtName].concat(args).concat([srcState, data])
          );
        }

        return function (originalData) {
          var data = originalData;
          var isMatch = true;
          var parts;
          var handler;
          var srcData;
          var srcState;
          var isDirectMessage = false;

          // force the id into string format so we can run length and comparison tests on it
          var id = signaller.id + '';
          debug('signaller ' + id + ' received data: ' + originalData);

          // process /to messages
          if (data.slice(0, 3) === '/to') {
            isMatch = data.slice(4, id.length + 4) === id;
            if (isMatch) {
              parts = data.slice(5 + id.length).split('|').map(jsonparse);

              // get the source data
              isDirectMessage = true;

              // extract the vector clock and update the parts
              parts = parts.map(jsonparse);
            }
          }

          // if this is not a match, then bail
          if (!isMatch) {
            return;
          }

          // chop the data into parts
          parts = parts || data.split('|').map(jsonparse);

          // if we have a specific handler for the action, then invoke
          if (typeof parts[0] == 'string') {
            // extract the metadata from the input data
            srcData = parts[1];

            // if we got data from ourself, then this is pretty dumb
            // but if we have then throw it away
            if (srcData && srcData.id === signaller.id) {
              return console.warn('got data from ourself, discarding');
            }

            // get the source state
            srcState = signaller.peers.get(srcData && srcData.id) || srcData;

            // handle commands
            if (parts[0].charAt(0) === '/') {
              // look for a handler for the message type
              handler = handlers[parts[0].slice(1)];

              if (typeof handler == 'function') {
                handler(
                  parts.slice(2),
                  parts[0].slice(1),
                  srcData,
                  srcState,
                  isDirectMessage
                );
              } else {
                sendEvent(parts, srcState, originalData);
              }
            }
            // otherwise, emit data
            else {
              signaller(
                'data',
                parts.slice(0, 1).concat(parts.slice(2)),
                srcData,
                srcState,
                isDirectMessage
              );
            }
          }
        };
      };

    }, {
      "./handlers": 25,
      "cog/jsonparse": 13,
      "cog/logger": 14
    }
  ],
  33: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var debug = require('cog/logger')('rtc/cleanup');

      var CANNOT_CLOSE_STATES = [
        'closed'
      ];

      var EVENTS_DECOUPLE_BC = [
        'addstream',
        'datachannel',
        'icecandidate',
        'negotiationneeded',
        'removestream',
        'signalingstatechange'
      ];

      var EVENTS_DECOUPLE_AC = [
        'iceconnectionstatechange'
      ];

      /**
       ### rtc-tools/cleanup

       ```
       cleanup(pc)
       ```

       The `cleanup` function is used to ensure that a peer connection is properly
       closed and ready to be cleaned up by the browser.

       **/
      module.exports = function (pc) {
        // see if we can close the connection
        var currentState = pc.iceConnectionState;
        var canClose = CANNOT_CLOSE_STATES.indexOf(currentState) < 0;

        function decouple(events) {
          events.forEach(function (evtName) {
            if (pc['on' + evtName]) {
              pc['on' + evtName] = null;
            }
          });
        }

        // decouple "before close" events
        decouple(EVENTS_DECOUPLE_BC);

        if (canClose) {
          debug('attempting connection close, current state: ' + pc.iceConnectionState);
          pc.close();
        }

        // remove the event listeners
        // after a short delay giving the connection time to trigger
        // close and iceconnectionstatechange events
        setTimeout(function () {
          decouple(EVENTS_DECOUPLE_AC);
        }, 100);
      };

    }, {
      "cog/logger": 14
    }
  ],
  34: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var mbus = require('mbus');
      var queue = require('rtc-taskqueue');
      var cleanup = require('./cleanup');
      var monitor = require('./monitor');
      var detect = require('./detect');
      var findPlugin = require('rtc-core/plugin');
      var CLOSED_STATES = ['closed', 'failed'];

      // track the various supported CreateOffer / CreateAnswer contraints
      // that we recognize and allow
      var OFFER_ANSWER_CONSTRAINTS = [
        'offerToReceiveVideo',
        'offerToReceiveAudio',
        'voiceActivityDetection',
        'iceRestart'
      ];

      /**
       ### rtc-tools/couple

       #### couple(pc, targetId, signaller, opts?)

       Couple a WebRTC connection with another webrtc connection identified by
       `targetId` via the signaller.

       The following options can be provided in the `opts` argument:

       - `sdpfilter` (default: null)

       A simple function for filtering SDP as part of the peer
       connection handshake (see the Using Filters details below).

       ##### Example Usage

       ```js
       var couple = require('rtc/couple');

       couple(pc, '54879965-ce43-426e-a8ef-09ac1e39a16d', signaller);
       ```

       ##### Using Filters

       In certain instances you may wish to modify the raw SDP that is provided
       by the `createOffer` and `createAnswer` calls.  This can be done by passing
       a `sdpfilter` function (or array) in the options.  For example:

       ```js
       // run the sdp from through a local tweakSdp function.
       couple(pc, '54879965-ce43-426e-a8ef-09ac1e39a16d', signaller, {
    sdpfilter: tweakSdp
  });
       ```

       **/

      function couple(pc, targetId, signaller, opts) {
        var debugLabel = (opts || {}).debugLabel || 'rtc';
        var debug = require('cog/logger')(debugLabel + '/couple');

        // create a monitor for the connection
        var mon = monitor(pc, targetId, signaller, (opts || {}).logger);
        var emit = mbus('', mon);
        var queuedCandidates = [];
        var sdpFilter = (opts || {}).sdpfilter;
        var reactive = (opts || {}).reactive;
        var offerTimeout;
        var endOfCandidates = true;
        var plugin = findPlugin((opts || {}).plugins);

        // configure the time to wait between receiving a 'disconnect'
        // iceConnectionState and determining that we are closed
        var disconnectTimeout = (opts || {}).disconnectTimeout || 10000;
        var disconnectTimer;

        // initilaise the negotiation helpers
        var isMaster = signaller.isMaster(targetId);

        // initialise the processing queue (one at a time please)
        var q = queue(pc, opts);

        function createOrRequestOffer() {
          if (!isMaster) {
            return signaller.to(targetId).send('/negotiate');
          }

          q.createOffer();
        }

        function debounceOffer() {
          debug('debouncing offer');
          clearTimeout(offerTimeout);
          offerTimeout = setTimeout(q.createOffer, 50);
        }

        function decouple() {
          debug('decoupling ' + signaller.id + ' from ' + targetId);

          // stop the monitor
          //     mon.removeAllListeners();
          mon.stop();

          // cleanup the peerconnection
          cleanup(pc);

          // remove listeners
          signaller.removeListener('sdp', handleSdp);
          signaller.removeListener('candidate', handleCandidate);
          signaller.removeListener('negotiate', handleNegotiateRequest);
        }

        function generateConstraints(methodName) {
          var constraints = {};

          function reformatConstraints() {
            var tweaked = {};

            Object.keys(constraints).forEach(function (param) {
              var sentencedCased = param.charAt(0).toUpperCase() + param.substr(1);
              tweaked[sentencedCased] = constraints[param];
            });

            // update the constraints to match the expected format
            constraints = {
              mandatory: tweaked
            };
          }

          // TODO: customize behaviour based on offer vs answer

          // pull out any valid
          OFFER_ANSWER_CONSTRAINTS.forEach(function (param) {
            var sentencedCased = param.charAt(0).toUpperCase() + param.substr(1);

            // if we have no opts, do nothing
            if (!opts) {
              return;
            }
            // if the parameter has been defined, then add it to the constraints
            else if (opts[param] !== undefined) {
              constraints[param] = opts[param];
            }
            // if the sentenced cased version has been added, then use that
            else if (opts[sentencedCased] !== undefined) {
              constraints[param] = opts[sentencedCased];
            }
          });

          // TODO: only do this for the older browsers that require it
          reformatConstraints();

          return constraints;
        }

        function handleCandidate(data) {
          q.addIceCandidate(data);
        }

        function handleSdp(sdp, src) {
          emit('sdp.remote', sdp);

          // if the source is unknown or not a match, then don't process
          if ((!src) || (src.id !== targetId)) {
            return;
          }

          q.setRemoteDescription(sdp);
        }

        function handleConnectionClose() {
          debug('captured pc close, iceConnectionState = ' + pc.iceConnectionState);
          decouple();
        }

        function handleDisconnect() {
          debug('captured pc disconnect, monitoring connection status');

          // start the disconnect timer
          disconnectTimer = setTimeout(function () {
            debug('manually closing connection after disconnect timeout');
            pc.close();
          }, disconnectTimeout);

          mon.on('statechange', handleDisconnectAbort);
        }

        function handleDisconnectAbort() {
          debug('connection state changed to: ' + pc.iceConnectionState);
          resetDisconnectTimer();

          // if we have a closed or failed status, then close the connection
          if (CLOSED_STATES.indexOf(pc.iceConnectionState) >= 0) {
            return mon('closed');
          }

          mon.once('disconnect', handleDisconnect);
        };

        function handleLocalCandidate(evt) {
          if (evt.candidate) {
            resetDisconnectTimer();

            emit('ice.local', evt.candidate);
            signaller.to(targetId).send('/candidate', evt.candidate);
            endOfCandidates = false;
          } else if (!endOfCandidates) {
            endOfCandidates = true;
            emit('ice.gathercomplete');
            signaller.to(targetId).send('/endofcandidates', {});
          }
        }

        function handleNegotiateRequest(src) {
          if (src.id === targetId) {
            emit('negotiate.request', src.id);
            debounceOffer();
          }
        }

        function resetDisconnectTimer() {
          mon.off('statechange', handleDisconnectAbort);

          // clear the disconnect timer
          debug('reset disconnect timer, state: ' + pc.iceConnectionState);
          clearTimeout(disconnectTimer);
        }

        // when regotiation is needed look for the peer
        if (reactive) {
          pc.onnegotiationneeded = function () {
            emit('negotiate.renegotiate');
            createOrRequestOffer();
          };
        }

        pc.onicecandidate = handleLocalCandidate;

        // when the task queue tells us we have sdp available, send that over the wire
        q.on('sdp.local', function (desc) {
          signaller.to(targetId).send('/sdp', desc);
        });

        // when we receive sdp, then
        signaller.on('sdp', handleSdp);
        signaller.on('candidate', handleCandidate);

        // if this is a master connection, listen for negotiate events
        if (isMaster) {
          signaller.on('negotiate', handleNegotiateRequest);
        }

        // when the connection closes, remove event handlers
        mon.once('closed', handleConnectionClose);
        mon.once('disconnected', handleDisconnect);

        // patch in the create offer functions
        mon.createOffer = createOrRequestOffer;

        return mon;
      }

      module.exports = couple;

    }, {
      "./cleanup": 33,
      "./detect": 35,
      "./monitor": 38,
      "cog/logger": 14,
      "mbus": 16,
      "rtc-core/plugin": 21,
      "rtc-taskqueue": 39
    }
  ],
  35: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      /**
       ### rtc-tools/detect

       Provide the [rtc-core/detect](https://github.com/rtc-io/rtc-core#detect)
       functionality.
       **/
      module.exports = require('rtc-core/detect');

    }, {
      "rtc-core/detect": 19
    }
  ],
  36: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var debug = require('cog/logger')('generators');
      var detect = require('./detect');
      var defaults = require('cog/defaults');

      var mappings = {
        create: {
          dtls: function (c) {
            if (!detect.moz) {
              c.optional = (c.optional || []).concat({
                DtlsSrtpKeyAgreement: true
              });
            }
          }
        }
      };

      /**
       ### rtc-tools/generators

       The generators package provides some utility methods for generating
       constraint objects and similar constructs.

       ```js
       var generators = require('rtc/generators');
       ```

       **/

      /**
       #### generators.config(config)

       Generate a configuration object suitable for passing into an W3C
       RTCPeerConnection constructor first argument, based on our custom config.

       In the event that you use short term authentication for TURN, and you want
       to generate new `iceServers` regularly, you can specify an iceServerGenerator
       that will be used prior to coupling. This generator should return a fully
       compliant W3C (RTCIceServer dictionary)[http://www.w3.org/TR/webrtc/#idl-def-RTCIceServer].

       If you pass in both a generator and iceServers, the iceServers _will be
       ignored and the generator used instead.
       **/

      var iceServerGenerator = function () {
        return [];
      }

      exports.config = function (config) {
        var iceServerGenerator = (config || {}).iceServerGenerator;

        return defaults({}, config, {
          iceServers: typeof iceServerGenerator == 'function' ? iceServerGenerator() : []
        });
      };

      /**
       #### generators.connectionConstraints(flags, constraints)

       This is a helper function that will generate appropriate connection
       constraints for a new `RTCPeerConnection` object which is constructed
       in the following way:

       ```js
       var conn = new RTCPeerConnection(flags, constraints);
       ```

       In most cases the constraints object can be left empty, but when creating
       data channels some additional options are required.  This function
       can generate those additional options and intelligently combine any
       user defined constraints (in `constraints`) with shorthand flags that
       might be passed while using the `rtc.createConnection` helper.
       **/
      exports.connectionConstraints = function (flags, constraints) {
        var generated = {};
        var m = mappings.create;
        var out;

        // iterate through the flags and apply the create mappings
        Object.keys(flags || {}).forEach(function (key) {
          if (m[key]) {
            m[key](generated);
          }
        });

        // generate the connection constraints
        out = defaults({}, constraints, generated);
        debug('generated connection constraints: ', out);

        return out;
      };

    }, {
      "./detect": 35,
      "cog/defaults": 10,
      "cog/logger": 14
    }
  ],
  37: [
    function (require, module, exports) {
      /* jshint node: true */

      'use strict';

      /**
       # rtc-tools

       The `rtc-tools` module does most of the heavy lifting within the
       [rtc.io](http://rtc.io) suite.  Primarily it handles the logic of coupling
       a local `RTCPeerConnection` with it's remote counterpart via an
       [rtc-signaller](https://github.com/rtc-io/rtc-signaller) signalling
       channel.

       ## Getting Started

       If you decide that the `rtc-tools` module is a better fit for you than either
       [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect) or
       [rtc-glue](https://github.com/rtc-io/rtc-glue) then the code snippet below
       will provide you a guide on how to get started using it in conjunction with
       the [rtc-signaller](https://github.com/rtc-io/rtc-signaller) and
       [rtc-media](https://github.com/rtc-io/rtc-media) modules:

       <<< examples/getting-started.js

       This code definitely doesn't cover all the cases that you need to consider
       (i.e. peers leaving, etc) but it should demonstrate how to:

       1. Capture video and add it to a peer connection
       2. Couple a local peer connection with a remote peer connection
       3. Deal with the remote steam being discovered and how to render
       that to the local interface.

       ## Reference

       **/

      var gen = require('./generators');

      // export detect
      var detect = exports.detect = require('./detect');
      var findPlugin = require('rtc-core/plugin');

      // export cog logger for convenience
      exports.logger = require('cog/logger');

      // export peer connection
      var RTCPeerConnection =
        exports.RTCPeerConnection = detect('RTCPeerConnection');

      // add the couple utility
      exports.couple = require('./couple');

      /**
       ### createConnection

       ```
       createConnection(opts?, constraints?) => RTCPeerConnection
       ```

       Create a new `RTCPeerConnection` auto generating default opts as required.

       ```js
       var conn;

       // this is ok
       conn = rtc.createConnection();

       // and so is this
       conn = rtc.createConnection({
    iceServers: []
  });
       ```
       **/
      exports.createConnection = function (opts, constraints) {
        var plugin = findPlugin((opts || {}).plugins);

        // generate the config based on options provided
        var config = gen.config(opts);

        // generate appropriate connection constraints
        var constraints = gen.connectionConstraints(opts, constraints);

        if (plugin && typeof plugin.createConnection == 'function') {
          return plugin.createConnection(config, constraints);
        } else {
          return new ((opts || {}).RTCPeerConnection || RTCPeerConnection)(
            config, constraints
          );
        }
      };

    }, {
      "./couple": 34,
      "./detect": 35,
      "./generators": 36,
      "cog/logger": 14,
      "rtc-core/plugin": 21
    }
  ],
  38: [
    function (require, module, exports) {
      /* jshint node: true */
      'use strict';

      var mbus = require('mbus');

      // define some state mappings to simplify the events we generate
      var stateMappings = {
        completed: 'connected'
      };

      // define the events that we need to watch for peer connection
      // state changes
      var peerStateEvents = [
        'signalingstatechange',
        'iceconnectionstatechange',
      ];

      /**
       ### rtc-tools/monitor

       ```
       monitor(pc, targetId, signaller, parentBus) => mbus
       ```

       The monitor is a useful tool for determining the state of `pc` (an
       `RTCPeerConnection`) instance in the context of your application. The
       monitor uses both the `iceConnectionState` information of the peer
       connection and also the various
       [signaller events](https://github.com/rtc-io/rtc-signaller#signaller-events)
       to determine when the connection has been `connected` and when it has
       been `disconnected`.

       A monitor created `mbus` is returned as the result of a
       [couple](https://github.com/rtc-io/rtc#rtccouple) between a local peer
       connection and it's remote counterpart.

       **/
      module.exports = function (pc, targetId, signaller, parentBus) {
        var monitor = mbus('', parentBus);
        var state;

        function checkState() {
          var newState = getMappedState(pc.iceConnectionState);

          // flag the we had a state change
          monitor('statechange', pc, newState);

          // if the active state has changed, then send the appopriate message
          if (state !== newState) {
            monitor(newState);
            state = newState;
          }
        }

        function handleClose() {
          monitor('closed');
        }

        function handlePeerLeave(peerId) {
          // if the peer leaving is not the peer we are connected to
          // then we aren't interested
          if (peerId !== targetId) {
            return;
          }

          // trigger a closed event
          monitor('closed');
        }

        pc.addEventListener('close', handleClose);
        peerStateEvents.forEach(function (evtName) {
          pc.addEventListener(evtName, checkState);
        });

        monitor.stop = function () {
          pc.removeEventListener('close', handleClose);
          peerStateEvents.forEach(function (evtName) {
            pc.removeEventListener(evtName, checkState);
          });

          // remove the peer:leave listener
          if (signaller && typeof signaller.removeListener == 'function') {
            signaller.removeListener('peer:leave', handlePeerLeave);
          }
        };

        monitor.checkState = checkState;

        // if we haven't been provided a valid peer connection, abort
        if (!pc) {
          return monitor;
        }

        // determine the initial is active state
        state = getMappedState(pc.iceConnectionState);

        // if we've been provided a signaller, then watch for peer:leave events
        if (signaller && typeof signaller.on == 'function') {
          signaller.on('peer:leave', handlePeerLeave);
        }

        return monitor;
      };

      /* internal helpers */

      function getMappedState(state) {
        return stateMappings[state] || state;
      }

    }, {
      "mbus": 16
    }
  ],
  39: [
    function (require, module, exports) {
      var detect = require('rtc-core/detect');
      var zip = require('whisk/zip');
      var findPlugin = require('rtc-core/plugin');
      var PriorityQueue = require('priorityqueuejs');

      // some validation routines
      var checkCandidate = require('rtc-validator/candidate');

      // the sdp cleaner
      var sdpclean = require('rtc-sdpclean');

      var PRIORITY_LOW = 100;
      var PRIORITY_WAIT = 1000;

      // priority order (lower is better)
      var DEFAULT_PRIORITIES = [
        'candidate',
        'setLocalDescription',
        'setRemoteDescription',
        'createAnswer',
        'createOffer'
      ];

      // define event mappings
      var METHOD_EVENTS = {
        setLocalDescription: 'setlocaldesc',
        setRemoteDescription: 'setremotedesc',
        createOffer: 'offer',
        createAnswer: 'answer'
      };

      /**
       # rtc-taskqueue

       This is a package that assists with applying actions to an `RTCPeerConnection`
       in as reliable order as possible. It is primarily used by the coupling logic
       of the [`rtc-tools`](https://github.com/rtc-io/rtc-tools).

       ## Example Usage

       To be completed
       **/
      module.exports = function (pc, opts) {
        // create the task queue
        var queue = new PriorityQueue(orderTasks);
        var tq = require('mbus')('', (opts || {}).logger);

        // initialise task importance
        var priorities = (opts || {}).priorities || DEFAULT_PRIORITIES;

        // check for plugin usage
        var plugin = findPlugin((opts || {}).plugins);

        // initialise state tracking
        var checkQueueTimer = 0;
        var currentTask;
        var defaultFail = tq.bind(tq, 'fail');

        // initialise session description and icecandidate objects
        var RTCSessionDescription = (opts || {}).RTCSessionDescription ||
          detect('RTCSessionDescription');

        var RTCIceCandidate = (opts || {}).RTCIceCandidate ||
          detect('RTCIceCandidate');

        function abortQueue(err) {
          console.error(err);
        }

        function applyCandidate(task, next) {
          var candidate;
          var data = task.args[0];

          // we have a null candidate, we have finished gathering candidates
          if (!data.candidate) {
            return next();
          }

          try {
            candidate = createIceCandidate(data);
            pc.addIceCandidate(candidate);
            tq('ice.remote.applied', candidate);
          } catch (e) {
            tq('ice.remote.invalid', candidate);
            return next(e);
          }

          next();
        }

        function checkQueue() {
          // peek at the next item on the queue
          var next = (!queue.isEmpty()) && (!currentTask) && queue.peek();
          var ready = next && testReady(next);
          var retry = (!queue.isEmpty()) && isNotClosed(pc);

          //     debug('checking queue: ', currentTask, next && next.name, ready);

          // if we don't have a task ready, then abort
          if (!ready) {
            return retry && triggerQueueCheck(100);
          }

          // update the current task (dequeue)
          currentTask = queue.deq();

          // process the task
          currentTask.fn(currentTask, function (err) {
            var fail = currentTask.fail || defaultFail;
            var pass = currentTask.pass;
            var taskName = currentTask.name;

            // unset the current task
            currentTask = null;

            // if errored, fail
            if (err) {
              console.error(taskName + ' task failed: ', err);
              return fail(err);
            }

            if (typeof pass == 'function') {
              pass.apply(null, [].slice.call(arguments, 1));
            }

            triggerQueueCheck();
          });
        }

        function cleansdp(desc) {
          // ensure we have clean sdp
          var sdpErrors = [];
          var sdp = desc && sdpclean(desc.sdp, {
              collector: sdpErrors
            });

          // if we don't have a match, log some info
          if (desc && sdp !== desc.sdp) {
            console.info('invalid lines removed from sdp: ', sdpErrors);
            desc.sdp = sdp;
          }

          return desc;
        }

        function completeConnection() {
          if (pc.signalingState === 'have-remote-offer') {
            return tq.createAnswer();
          }
        }

        function createIceCandidate(data) {
          if (plugin && typeof plugin.createIceCandidate == 'function') {
            return plugin.createIceCandidate(data);
          }

          return new RTCIceCandidate(data);
        }

        function createSessionDescription(data) {
          if (plugin && typeof plugin.createSessionDescription == 'function') {
            return plugin.createSessionDescription(data);
          }

          return new RTCSessionDescription(data);
        }

        function emitSdp(sdp) {
          tq('sdp.local', pc.localDescription);
        }

        function enqueue(name, handler, opts) {
          return function () {
            var args = [].slice.call(arguments);

            if (opts && typeof opts.processArgs == 'function') {
              args = args.map(opts.processArgs);
            }

            queue.enq({
              args: args,
              name: name,
              fn: handler,

              // initilaise any checks that need to be done prior
              // to the task executing
              checks: [isNotClosed].concat((opts || {}).checks || []),

              // initialise the pass and fail handlers
              pass: (opts || {}).pass,
              fail: (opts || {}).fail
            });

            triggerQueueCheck();
          };
        }

        function execMethod(task, next) {
          var fn = pc[task.name];
          var eventName = METHOD_EVENTS[task.name] || (task.name || '').toLowerCase();

          function fail(err) {
            tq.apply(tq, ['negotiate.error', task.name, err].concat(task.args));
            next(err);
          }

          function success() {
            tq.apply(tq, [
              ['negotiate', eventName, 'ok'], task.name
            ].concat(task.args));
            next.apply(null, [null].concat([].slice.call(arguments)));
          }

          if (typeof fn != 'function') {
            return next(new Error('cannot call "' + task.name + '" on RTCPeerConnection'));
          }

          // invoke the function
          tq.apply(tq, ['negotiate.' + eventName].concat(task.args));
          fn.apply(pc, task.args.concat([success, fail]));
        }

        function extractCandidateEventData(data) {
          // if we have been passed an event, then extract the candidate from the data
          if (data.srcElement && data.candidate) {
            data = data.candidate;
          }

          return data;
        }

        function hasLocalOrRemoteDesc(pc, task) {
          return pc.localDescription !== null || pc.remoteDescription !== null;
        }

        function isNotNegotiating(pc) {
          return pc.signalingState !== 'have-local-offer';
        }

        function isNotClosed(pc) {
          return pc.signalingState !== 'closed';
        }

        function isStable(pc) {
          return pc.signalingState === 'stable';
        }

        function isValidCandidate(pc, data) {
          return checkCandidate(data.args[0]).length === 0;
        }

        function orderTasks(a, b) {
          // apply each of the checks for each task
          var tasks = [a, b];
          var readiness = tasks.map(testReady);
          var taskPriorities = tasks.map(zip(readiness)).map(function (args) {
            var priority = priorities.indexOf(args[0].name);

            return args[1] ? (priority >= 0 ? priority : PRIORITY_LOW) : PRIORITY_WAIT;
          });

          return taskPriorities[1] - taskPriorities[0];
        }

        // check whether a task is ready (does it pass all the checks)

        function testReady(task) {
          return (task.checks || []).reduce(function (memo, check) {
            return memo && check(pc, task);
          }, true);
        }

        function triggerQueueCheck(wait) {
          clearTimeout(checkQueueTimer);
          checkQueueTimer = setTimeout(checkQueue, wait || 5);
        }

        // patch in the queue helper methods
        tq.addIceCandidate = enqueue('addIceCandidate', applyCandidate, {
          processArgs: extractCandidateEventData,
          checks: [hasLocalOrRemoteDesc, isValidCandidate]
        });

        tq.setLocalDescription = enqueue('setLocalDescription', execMethod, {
          processArgs: cleansdp,
          pass: emitSdp
        });

        tq.setRemoteDescription = enqueue('setRemoteDescription', execMethod, {
          processArgs: createSessionDescription,
          pass: completeConnection
        });

        tq.createOffer = enqueue('createOffer', execMethod, {
          checks: [isNotNegotiating],
          pass: tq.setLocalDescription
        });

        tq.createAnswer = enqueue('createAnswer', execMethod, {
          pass: tq.setLocalDescription
        });

        return tq;
      };

    }, {
      "mbus": 16,
      "priorityqueuejs": 40,
      "rtc-core/detect": 19,
      "rtc-core/plugin": 21,
      "rtc-sdpclean": 41,
      "rtc-validator/candidate": 42,
      "whisk/zip": 43
    }
  ],
  40: [
    function (require, module, exports) {
      /**
       * Expose `PriorityQueue`.
       */
      module.exports = PriorityQueue;

      /**
       * Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
       * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
       *
       * The comparator function must return a positive number when `a > b`, 0 when
       * `a == b` and a negative number when `a < b`.
       *
       * @param {Function}
       * @return {PriorityQueue}
       * @api public
       */

      function PriorityQueue(comparator) {
        this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
        this._elements = [];
      }

      /**
       * Compares `a` and `b`, when `a > b` it returns a positive number, when
       * it returns 0 and when `a < b` it returns a negative number.
       *
       * @param {String|Number} a
       * @param {String|Number} b
       * @return {Number}
       * @api public
       */
      PriorityQueue.DEFAULT_COMPARATOR = function (a, b) {
        if (a instanceof Number && b instanceof Number) {
          return a - b;
        } else {
          a = a.toString();
          b = b.toString();

          if (a == b) return 0;

          return (a > b) ? 1 : -1;
        }
      };

      /**
       * Returns whether the priority queue is empty or not.
       *
       * @return {Boolean}
       * @api public
       */
      PriorityQueue.prototype.isEmpty = function () {
        return this.size() === 0;
      };

      /**
       * Peeks at the top element of the priority queue.
       *
       * @return {Object}
       * @throws {Error} when the queue is empty.
       * @api public
       */
      PriorityQueue.prototype.peek = function () {
        if (this.isEmpty()) throw new Error('PriorityQueue is empty');

        return this._elements[0];
      };

      /**
       * Dequeues the top element of the priority queue.
       *
       * @return {Object}
       * @throws {Error} when the queue is empty.
       * @api public
       */
      PriorityQueue.prototype.deq = function () {
        var first = this.peek();
        var last = this._elements.pop();
        var size = this.size();

        if (size === 0) return first;

        this._elements[0] = last;
        var current = 0;

        while (current < size) {
          var largest = current;
          var left = (2 * current) + 1;
          var right = (2 * current) + 2;

          if (left < size && this._compare(left, largest) > 0) {
            largest = left;
          }

          if (right < size && this._compare(right, largest) > 0) {
            largest = right;
          }

          if (largest === current) break;

          this._swap(largest, current);
          current = largest;
        }

        return first;
      };

      /**
       * Enqueues the `element` at the priority queue and returns its new size.
       *
       * @param {Object} element
       * @return {Number}
       * @api public
       */
      PriorityQueue.prototype.enq = function (element) {
        var size = this._elements.push(element);
        var current = size - 1;

        while (current > 0) {
          var parent = Math.floor((current - 1) / 2);

          if (this._compare(current, parent) < 0) break;

          this._swap(parent, current);
          current = parent;
        }

        return size;
      };

      /**
       * Returns the size of the priority queue.
       *
       * @return {Number}
       * @api public
       */
      PriorityQueue.prototype.size = function () {
        return this._elements.length;
      };

      /**
       *  Iterates over queue elements
       *
       *  @param {Function} fn
       */
      PriorityQueue.prototype.forEach = function (fn) {
        return this._elements.forEach(fn);
      };

      /**
       * Compares the values at position `a` and `b` in the priority queue using its
       * comparator function.
       *
       * @param {Number} a
       * @param {Number} b
       * @return {Number}
       * @api private
       */
      PriorityQueue.prototype._compare = function (a, b) {
        return this._comparator(this._elements[a], this._elements[b]);
      };

      /**
       * Swaps the values at position `a` and `b` in the priority queue.
       *
       * @param {Number} a
       * @param {Number} b
       * @api private
       */
      PriorityQueue.prototype._swap = function (a, b) {
        var aux = this._elements[a];
        this._elements[a] = this._elements[b];
        this._elements[b] = aux;
      };

    }, {}
  ],
  41: [
    function (require, module, exports) {
      var validators = [
        [/^(a\=candidate.*)$/, require('rtc-validator/candidate')]
      ];

      var reSdpLineBreak = /(\r?\n|\\r\\n)/;

      /**
       # rtc-sdpclean

       Remove invalid lines from your SDP.

       ## Why?

       This module removes the occasional "bad egg" that will slip into SDP when it
       is generated by the browser.  In particular these situations are catered for:

       - invalid ICE candidates

       **/
      module.exports = function (input, opts) {
        var lineBreak = detectLineBreak(input);
        var lines = input.split(lineBreak);
        var collector = (opts || {}).collector;

        // filter out invalid lines
        lines = lines.filter(function (line) {
          // iterate through the validators and use the one that matches
          var validator = validators.reduce(function (memo, data, idx) {
            return typeof memo != 'undefined' ? memo : (data[0].exec(line) && {
              line: line.replace(data[0], '$1'),
              fn: data[1]
            });
          }, undefined);

          // if we have a validator, ensure we have no errors
          var errors = validator ? validator.fn(validator.line) : [];

          // if we have errors and an error collector, then add to the collector
          if (collector) {
            errors.forEach(function (err) {
              collector.push(err);
            });
          }

          return errors.length === 0;
        });

        return lines.join(lineBreak);
      };

      function detectLineBreak(input) {
        var match = reSdpLineBreak.exec(input);

        return match && match[0];
      }

    }, {
      "rtc-validator/candidate": 42
    }
  ],
  42: [
    function (require, module, exports) {
      var debug = require('cog/logger')('rtc-validator');
      var rePrefix = /^(?:a=)?candidate:/;
      var reIP = /^(\d+\.){3}\d+$/;

      /*

       validation rules as per:
       http://tools.ietf.org/html/draft-ietf-mmusic-ice-sip-sdp-03#section-8.1

       candidate-attribute   = "candidate" ":" foundation SP component-id SP
       transport SP
       priority SP
       connection-address SP     ;from RFC 4566
       port         ;port from RFC 4566
       SP cand-type
       [SP rel-addr]
       [SP rel-port]
       *(SP extension-att-name SP
       extension-att-value)

       foundation            = 1*32ice-char
       component-id          = 1*5DIGIT
       transport             = "UDP" / transport-extension
       transport-extension   = token              ; from RFC 3261
       priority              = 1*10DIGIT
       cand-type             = "typ" SP candidate-types
       candidate-types       = "host" / "srflx" / "prflx" / "relay" / token
       rel-addr              = "raddr" SP connection-address
       rel-port              = "rport" SP port
       extension-att-name    = token
       extension-att-value   = *VCHAR
       ice-char              = ALPHA / DIGIT / "+" / "/"
       */
      var partValidation = [
        [/.+/, 'invalid foundation component', 'foundation'],
        [/\d+/, 'invalid component id', 'component-id'],
        [/(UDP|TCP)/i, 'transport must be TCP or UDP', 'transport'],
        [/\d+/, 'numeric priority expected', 'priority'],
        [reIP, 'invalid connection address', 'connection-address'],
        [/\d+/, 'invalid connection port', 'connection-port'],
        [/typ/, 'Expected "typ" identifier', 'type classifier'],
        [/.+/, 'Invalid candidate type specified', 'candidate-type']
      ];

      /**
       ### `rtc-validator/candidate`

       Validate that an `RTCIceCandidate` (or plain old object with data, sdpMid,
       etc attributes) is a valid ice candidate.

       Specs reviewed as part of the validation implementation:

       - <http://tools.ietf.org/html/draft-ietf-mmusic-ice-sip-sdp-03#section-8.1>
       - <http://tools.ietf.org/html/rfc5245>

       **/
      module.exports = function (data) {
        var errors = [];
        var candidate = data && (data.candidate || data);
        var prefixMatch = candidate && rePrefix.exec(candidate);
        var parts = prefixMatch && candidate.slice(prefixMatch[0].length).split(/\s/);

        if (!candidate) {
          return [new Error('empty candidate')];
        }

        // check that the prefix matches expected
        if (!prefixMatch) {
          return [new Error('candidate did not match expected sdp line format')];
        }

        // perform the part validation
        errors = errors.concat(parts.map(validateParts)).filter(Boolean);

        return errors;
      };

      function validateParts(part, idx) {
        var validator = partValidation[idx];

        if (validator && (!validator[0].test(part))) {
          debug(validator[2] + ' part failed validation: ' + part);
          return new Error(validator[1]);
        }
      }

    }, {
      "cog/logger": 14
    }
  ],
  43: [
    function (require, module, exports) {
      /**
       ## zip

       zip one array with other arrays

       <<< examples/zip.js

       ### zip todo

       - tests

       **/
      module.exports = function () {
        var targets = [].slice.call(arguments);

        return function (item, index) {
          return [item].concat(targets.map(function (val) {
            return val[index];
          }));
        };
      };
    }, {}
  ],
  44: [
    function (require, module, exports) {
      "use strict";
      var BaseObject = require('base_object');
      var Storage = require('./storage');

      var separateur = "@@@";

      var CDNRequester = function CDNRequester() {
        var $__0 = this;
        this.storage = Storage.getInstance();
        this.utils = new Worker(this.getWorkerURL());
        this.utils.onmessage = (function (e) {

          // renvoyÃ© par le worker
          // contient : resource + separateur + encodedChunk
          var reponse = e.data;

          // on rÃ©cupÃ¨re sÃ©parÃ©ment resource et encodedChunk
          var positionSeparateur = reponse.indexOf(separateur);
          var resource = reponse.substring(0, positionSeparateur);
          var data = reponse.substring(positionSeparateur + separateur.length);

          return $__0.resourceLoaded(resource, data);
        });

        this.callbacks = {};

      };
      ($traceurRuntime.createClass)(CDNRequester, {
        get name() {
          return 'CDNRequester';
        },
        getWorkerURL: function () {
          var content = 'request=function(e,r,s){var n=new XMLHttpRequest;return n.open("GET",e,r?!0:!1),s&&(n.responseType=s),r?(n.onload=r,void n.send()):(n.send(),200==n.status?n.response:"")},base64ArrayBuffer=function(e){for(var r,s,n,t,a,o="",u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=new Uint8Array(e),f=d.byteLength,i=f%3,c=f-i,p=0;c>p;p+=3)a=d[p]<<16|d[p+1]<<8|d[p+2],r=(16515072&a)>>18,s=(258048&a)>>12,n=(4032&a)>>6,t=63&a,o+=u[r]+u[s]+u[n]+u[t];return 1==i?(a=d[c],r=(252&a)>>2,s=(3&a)<<4,o+=u[r]+u[s]+"=="):2==i&&(a=d[c]<<8|d[c+1],r=(64512&a)>>10,s=(1008&a)>>4,n=(15&a)<<2,o+=u[r]+u[s]+u[n]+"="),o},resourceLoaded=function(resource, e){var r=base64ArrayBuffer(e.currentTarget.response);rr=resource+"' + separateur + '"+r;this.postMessage(rr)},this.addEventListener("message",function(e){request(e.data,resourceLoaded.bind(this, e.data),"arraybuffer")},!1);'
          var blob;
          try {
            blob = new Blob([content], {
              type: 'application/javascript'
            });
          } catch (e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            blob = new BlobBuilder();
            blob.append(content);
            blob = blob.getBlob();
          }
          return URL.createObjectURL(blob);
        },
        requestResource: function (resource, callback) {
          this.callbacks[resource] = callback; // ajout d'une nouvelle demande de ressource
          this.utils.postMessage(resource); // demande de ressource
        },
        resourceLoaded: function (resource, chunk) {
          this.storage.setItem(resource, chunk);
          var callback = this.callbacks[resource];
          callback(chunk, "cdn");
          delete this.callbacks[resource]; // suppression de la ressource qui a Ã©tÃ© reÃ§ue
        }
      }, {}, BaseObject);
      module.exports = CDNRequester;


    }, {
      "./storage": 52
    }
  ],
  46: [
    function (require, module, exports) {
      "use strict";
      var Settings = require('./settings');
      var Logger = require('log-with-style');
      var Mousetrap = require('mousetrap');
      var Log = function Log() {
      };
      ($traceurRuntime.createClass)(Log, {}, {});
      Log.info = function (message) {
        Log.log('info', message);
      };
      Log.warn = function (message) {
        Log.log('warn', message);
      };
      Log.debug = function (message) {
        Log.log('debug', message);
      };
      Log.active = Settings.logging;
      Log.onOff = function () {
        Log.active = !Log.active;
        if (Log.active)
          Logger('[c="color: red"][WARNING][c] log enabled');
        else
          Logger('[c="color: red"][WARNING][c] log disabled');
      };
      Log.log = function (level, message) {
        if (!Log.active)
          return;
        if (level === 'warn') {
          Logger('[c="color: red"][WARNING][c] ' + message);
        } else if (level === 'info') {
          Logger('[c="color: green"][INFO] [c] ' + message);
        } else if (level === 'debug') {
          Logger('[c="color: blue"][DEBUG] [c] ' + message);
        }
      };
      Mousetrap.bind(['command+shift+l', 'ctrl+shift+l'], (function () {
        return Log.onOff();
      }));
      module.exports = Log;


    }, {
      "./settings": 51,
      "log-with-style": 6,
      "mousetrap": 7
    }
  ],
  47: [
    function (require, module, exports) {
      (function (global) {

        "use strict";
        //var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
        var _ = require('underscore');
        var Events = require('./events');
        var BaseObject = require('base_object');
        var log = require('./log');
        //var Settings = require('./settings');
        var ResourceRequester = require('./resource_requester');
        var UploadHandler = require('./upload_handler');


        /*
         * Classes utilisÃ©es pour dÃ©coder l'encodage rÃ©alisÃ© avec : https://gist.github.com/jonleighton/958841
         * voir https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js
         *
         * (opÃ©rations plus lentes qu'en effectuant base64 -atob()-> string -> ArrayBuffer)
         */
        var Base64Binary = {
          _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

          /* will return a  Uint8Array type */
          decodeArrayBuffer: function (input) {
            var bytes = (input.length / 4) * 3;
            var ab = new ArrayBuffer(bytes);
            this.decode(input, ab);

            return ab;
          },

          removePaddingChars: function (input) {
            var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
            if (lkey == 64) {
              return input.substring(0, input.length - 1);
            }
            return input;
          },

          decode: function (input, arrayBuffer) {
            //get last chars to see if are valid
            input = this.removePaddingChars(input);
            input = this.removePaddingChars(input);

            var bytes = parseInt((input.length / 4) * 3, 10);

            var uarray;
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            var j = 0;

            if (arrayBuffer)
              uarray = new Uint8Array(arrayBuffer);
            else
              uarray = new Uint8Array(bytes);

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            for (i = 0; i < bytes; i += 3) {
              //get the 3 octects in 4 ascii chars
              enc1 = this._keyStr.indexOf(input.charAt(j++));
              enc2 = this._keyStr.indexOf(input.charAt(j++));
              enc3 = this._keyStr.indexOf(input.charAt(j++));
              enc4 = this._keyStr.indexOf(input.charAt(j++));

              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;

              uarray[i] = chr1;
              if (enc3 != 64) uarray[i + 1] = chr2;
              if (enc4 != 64) uarray[i + 2] = chr3;
            }

            return uarray;
          }
        };


        /*
         *
         *    Partie Dash P2PWeb
         *
         */


        /**
         * Module contenant les classes permettant l'ajout du P2PWeb au player Dash.js
         * (extension du player Dash.js)
         */
        var DashEB = function () {
          "use strict";
          return {};
        };
        DashEB.classes = {};


        /**
         * Permet de calculer la taille moyenne des segments sans avoir Ã  parcourir une liste Ã  chaque fois.
         */
        DashEB.classes.AvgSegmentSize = function () {
          var sommeDureesSegments = 0;
          var nbSegmentsDemandes = 0;

          /**
           * ajoute une nouvelle durÃ©e Ã  prendre en compte lors du calcul de la durÃ©e moyenne des segments
           * @param {number} duree une nouvelle durÃ©e Ã  ajouter (prise Ã  partir de requete.duration)
           */
          var addSegmentSize = function (duree) {
            if (!duree) return;
            sommeDureesSegments += duree;
            nbSegmentsDemandes += 1;
          };

          /**
           * retourne la durÃ©e moyenne des segments
           * @returns {number} la durÃ©e moyenne des segments
           */
          var getAvgSegmentSize = function () {
            return Math.round(sommeDureesSegments / nbSegmentsDemandes);
          };

          return {
            addSegmentSize: addSegmentSize,
            getAverageSegmentSize: getAvgSegmentSize
          }
        };


        /**
         * Classe permettant de rÃ©cupÃ©rer un segment.
         * HÃ©rite de MediaPlayer.dependencies.FragmentLoader.
         */
        DashEB.classes.FragmentLoader = function () {
          "use strict"

          var numeroFragmentLoader;

          var avgSegmentSize = new DashEB.classes.AvgSegmentSize(); // calcule la taille moyenne des segments
          // sans parcourir une liste Ã  chaque fois

          /**
           * AppelÃ©e lorsqu'un segment/fragment a Ã©tÃ© rÃ©cupÃ©rÃ© par le ResourceRequester
           * @param {MediaPlayer.vo.FragmentRequest} requete      correspond Ã  la requÃªte de segment (la ressource)
           * @param {string}                         encodedChunk le segment encodÃ© en string base64
           * @param {string}                         method       la mÃ©thode avec laquelle le segment a Ã©tÃ© rÃ©cupÃ©rÃ© (cdn ou p2p)
           */
          var resourceLoaded = function (requete, encodedChunk, method) {

            console.log("[FragmentLoader " + numeroFragmentLoader + "] from " + method + " for " + requete.url);

            var chunk = decodeChunk(encodedChunk);

            // on notifie que l'on a bien recu le fragment recherchÃ© au player Dash.js
            this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
              request: requete, // la requete de la librairie Dash de dÃ©part
              response: chunk, // le segment rÃ©cupÃ©rÃ©
              method: method // la mÃ©thode de rÃ©cupÃ©ration (pour les mÃ©thiques)
            });

            // les mÃ©triques sont notifiÃ©es par cet Ã©vÃ¨nement Ã©galement
          };


          /**
           * Permet de dÃ©coder les segments retournÃ©s par le client ou les pairs.
           * Ces segments sont encodÃ© sous la forme de string de base64
           * (encodage rÃ©alisÃ© avec "https://gist.github.com/jonleighton/958841")
           * @param   {string}      encodedChunk le segment encodÃ© au format string base64
           * @returns {ArrayBuffer} le segment
           */
          var decodeChunk = function (encodedChunk) {

            // retirer les "=" Ã  la fin de la chaine (encodage rÃ©alisÃ© avec https://gist.github.com/jonleighton/958841)
            if (encodedChunk.endsWith("==")) encodedChunk = encodedChunk.slice(0, -2);
            else if (encodedChunk.endsWith("=")) encodedChunk = encodedChunk.slice(0, -1);

            return Base64Binary.decodeArrayBuffer(encodedChunk);
          };


          /**
           * Permet d'obtenir le niveau/level du buffer, correspond aux segments chargÃ©s dans le buffer mais qui n'ont pas encore Ã©tÃ© visualisÃ© par l'utilisateur
           * c'est Ã  dire le buffer restant entre la position du curseur de la vidÃ©o et la fin du buffer chargÃ©
           * (la diffÃ©rence entre la taille du buffer chargÃ© actuellement et la position du curseur sur le buffer)
           * @returns {number} le niveau/level du buffer
           */
          var getCurrentBufferLevel = function () {
            var metrics = this.metricsModel.getMetricsFor("video") || this.metricsModel.getMetricsFor("audio"); // demande les metrics pour la vidÃ©o
            var bufferLevel = this.metricsExt.getCurrentBufferLevel(metrics) || {
                level: -1
              }; // pas de bufferLevel pour la 1Ã¨re requete
            bufferLevel = bufferLevel.level.toPrecision(3);
            return bufferLevel;
          };


          /**
           * Notifie les mÃ©triques qu'un nouveau segment a Ã©tÃ© reÃ§u avec une certaine mÃ©thode (p2p ou cdn)
           * @param {string} method la mÃ©thode avec laquelle le segment a Ã©tÃ© rÃ©cupÃ©rÃ© ("cdn", ou "p2p")
           */
          var updateMetrics = function (method) {
            this.notify("fragmentLoader:receivedChunk", {
              method: method
            });
          };

          return {
            metricsModel: undefined, // permet de rÃ©cupÃ©rer les mÃ©trics par reprÃ©sentations (vidÃ©o, audio, ...)
            metricsExt: undefined,

            errHandler: undefined,
            log: undefined,
            requestModifierExt: undefined,

            notify: undefined,
            subscribe: undefined,
            unsubscribe: undefined,

            resourceRequester: undefined, // rÃ©cupÃ¨re le segment/fragment chez le serveur ou les pairs.
            metricsUpdater: undefined,

            /**
             * Initialise l'objet et ses attributs, c'est ici que l'on crÃ©e le ResourceRequester.
             * AppelÃ© par Dijon tout de suite aprÃ¨s avoir instanciÃ© la classe.
             */
            setup: function () {
              this.resourceRequester.isInitialBuffer = false;

              // on indique au MetricsUpdater d'Ã©couter le FragmentLoader pour l'Ã©vÃ¨nement correspondant Ã  la rÃ©ception d'un segment
              this.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, this.metricsUpdater, this.metricsUpdater.updateChunksReceived.bind(this.metricsUpdater));


              numeroFragmentLoader = DashEB.classes.FragmentLoader.nbFragmentLoader;
              DashEB.classes.FragmentLoader.nbFragmentLoader++;
            },

            /*
             * Demande une ressource, soit au serveur de contenu, soit aux pairs (en utilisant ResourceeRequester)
             * @param {MediaPlayer.vo.FragmentRequest} requete correspond Ã  la requÃªte de segment (la ressource)
             */
            load: function (requete) {
              if (!requete) {
                console.log("[FragmentLoader " + numeroFragmentLoader + "] load(requete) : la requÃªte demandÃ© par Dash.js est nulle");
                this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
                  request: requete,
                  bytes: null
                }, new MediaPlayer.vo.Error(null, "request is null", null));
                return;
              }

              console.log("[FragmentLoader " + numeroFragmentLoader + "] load(requete) : demande '" + requete.url + "'");

              var url = requete.url;
              var currentBufferLevel = getCurrentBufferLevel.call(this);

              // mise Ã  jour de la taille moyenne des segments
              avgSegmentSize.addSegmentSize(requete.duration);
              this.resourceRequester.p2pManager.swarm.avgSegmentSize = currentBufferLevel;
              avgSegmentSize.getAverageSegmentSize();

              console.log("[FragmentLoader " + numeroFragmentLoader + "] taille moyenne des segments : " + this.resourceRequester.p2pManager.swarm.avgSegmentSize);

              // demande du segment au ResourceRequester
              this.resourceRequester.requestResource(url, currentBufferLevel, resourceLoaded.bind(this, requete));

            },

            /**
             * VÃ©rifie si une ressource existe
             * @param {MediaPlayer.vo.FragmentRequest} req correspond Ã  la requÃªte (la demande de segment/fragment)
             */
            checkForExistence: function (req) {
              console.warn("[FragmentLoader " + numeroFragmentLoader + "] checkForExistence(requete) is not implemented yet");
            },

            /**
             * Annule toutes les demandes de ressources
             */
            abort: function () {
              console.warn("[FragmentLoader " + numeroFragmentLoader + "] abort() is not implemented yet");
            }

          };
        };
        DashEB.classes.FragmentLoader.nbFragmentLoader = 0;
        DashEB.classes.FragmentLoader.prototype = new MediaPlayer.dependencies.FragmentLoader();
        DashEB.classes.FragmentLoader.prototype.constructor = DashEB.classes.FragmentLoader;


        /**
         * Regroupe toutes les informations de mÃ©triques pour le P2PWeb
         */
        DashEB.classes.MetricsUpdater = function () {

          var metricsP2PWeb = {
            chunksFromCDN: 0,
            chunksFromP2P: 0,
            chunksSent: 0,
            bufferLength: -1,
            swarmSize: 0,
            p2pRatio: 0,
            startupTime: "-"
          };

          /**
           * Met Ã  jour le temps de lancement du lecteur (startup time).
           * voir : https://github.com/Dash-Industry-Forum/dash.js/issues/888
           */
          var updateStartupTime = function () {
            var metrics = this.metricsModel.getMetricsFor("video") || this.metricsModel.getMetricsFor("audio");
            var playList = metrics.PlayList[0];

            if (!playList.trace[0]) { //la premiÃ¨re image n'a toujours pas Ã©tÃ© affichÃ©e
              return;
            }

            var startPlaybackStreamTime = playList.start; // horodatage de l'action "dÃ©marrer le flux" de l'utilisateur
            var firstSampeleRenderedTime = playList.trace[0].start; // horodatage du premier segment affichÃ©
            var startupTime = firstSampeleRenderedTime - startPlaybackStreamTime;
            metricsP2PWeb.startupTime = startupTime;

            this.virtualBuffer.unsubscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, this);
          };

          /**
           * Met Ã  jour le nombre de segments reÃ§u de la part du serveur ou des pairs en fonction de la mÃ©thode.
           * La mÃ©thode utilisÃ©e pour rÃ©cupÃ©rer le segment sera indiquÃ© dans les donnÃ©es (champ data) du paramÃ¨tre mediaPlayerEvent.
           * Cette fonction est appelÃ©e Ã©vÃ¨nementiellement lors de l'event "fragmentLoader:receivedChunk" dÃ©clanchÃ© par un FragmentLoader.
           * @param {Dash.vo.Event} mediaPlayerEvent l'Ã©vÃ¨nement dÃ©clanchÃ© par le FragemntLoader qui a reÃ§u un segment. Contient la mÃ©thode de rÃ©ception dans le champ data.
           */
          var updateChunksReceived = function (mediaPlayerEvent) {

            var data = mediaPlayerEvent.data;
            var method = data.method;

            // mise Ã  jour du nombre de segments reÃ§us
            if (method === "cdn") metricsP2PWeb.chunksFromCDN++;
            else if (method === "p2p") metricsP2PWeb.chunksFromP2P++;

            // mise Ã  jour du ratio
            metricsP2PWeb.p2pRatio = (100 * metricsP2PWeb.chunksFromP2P / (metricsP2PWeb.chunksFromP2P + metricsP2PWeb.chunksFromCDN)).toPrecision(3);
          };


          /**
           * Met Ã  jour la taille de l'essaim (Swarm) des pairs.
           * Cette mÃ©thode est appelÃ©e Ã©vÃ¨nementiellement lorsque le Swarm dÃ©clanche un Ã©vÃ¨nement "swarm:sizeupdate"
           * @param {object} event object contenant la nouvelle taille de l'essaim dans l'attribut "swarmSize".
           */
          var updateSwarmSize = function (event) {
            metricsP2PWeb.swarmSize = event.swarmSize;
          };

          /**
           * Met Ã  jour le nombre de segments envoyÃ©s aux autres pairs.
           * Cette mÃ©thode est appelÃ©e Ã©vÃ¨nementiellement par le Swarm lorsque celui-ci dÃ©clanche l'Ã©vÃ¨nement "swarm:chunksent".
           * @param {object} event contient le nombre de segments envoyÃ©s aux pairs dans l'attribut "chunksSent"
           */
          var updateChunksSent = function (event) {
            metricsP2PWeb.chunksSent = this.resourceRequester.p2pManager.swarm.chunksSent;
          };

          /**
           * Met Ã  jour la taille du buffer.
           * Cette mÃ©thode est appelÃ©e pÃ©riodiquement (toutes les 500ms) par le MetricsUpdater.
           */
          var updateBufferLength = function () {
            metricsP2PWeb.bufferLength = getCurrentBufferLevel.call(this);
          };

          /**
           * Permet d'obtenir le niveau/level du buffer, correspond aux segments chargÃ©s dans le buffer mais qui n'ont pas encore Ã©tÃ© visualisÃ© par l'utilisateur
           * c'est Ã  dire le buffer restant entre la position du curseur de la vidÃ©o et la fin du buffer chargÃ©
           * (la diffÃ©rence entre la taille du buffer chargÃ© actuellement et la position du curseur sur le buffer)
           * @returns {number} le niveau/level du buffer
           */
          var getCurrentBufferLevel = function () {
            var metrics = this.metricsModel.getMetricsFor("video") || this.metricsModel.getMetricsFor("audio"); // demande les metrics pour la vidÃ©o
            var bufferLevel = this.metricsExt.getCurrentBufferLevel(metrics) || {
                level: -1
              }; // pas de bufferLevel pour la 1Ã¨re requete
            bufferLevel = bufferLevel.level.toPrecision(3);
            return bufferLevel;
          };


          return {
            system: undefined,
            notify: undefined,
            subscribe: undefined,
            unsubscribe: undefined,

            resourceRequester: undefined,
            metricsModel: undefined,
            metricsExt: undefined,
            virtualBuffer: undefined, // utilisÃ© pour rÃ©cupÃ©rer startup time

            /**
             * initialise le MetricsUpdater.
             * Cette mÃ©thode est appelÃ© par Dijon aprÃ¨s la crÃ©ation
             */
            setup: function () {
              // rendre les mÃ©triques disponibles
              var metrics = this.metricsModel.getMetricsFor("p2pweb");
              metrics.metricsP2PWeb = metricsP2PWeb;

              // les mises Ã  jour
              this.resourceRequester.listenTo(this.resourceRequester.p2pManager.swarm, "swarm:sizeupdate", updateSwarmSize.bind(this)); // maj de la taille de l'essaim
              this.resourceRequester.listenTo(this.resourceRequester.p2pManager.swarm, "swarm:chunksent", updateChunksSent.bind(this)); // maj du nombre de segments envoyÃ©s
              this.virtualBuffer.subscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, this, updateStartupTime.bind(this)); // maj du startup time
              setInterval(updateBufferLength.bind(this), 500); // met Ã  jour rÃ©guliÃ¨rement la taille du buffer
            },

            updateChunksReceived: updateChunksReceived

          }
        };

        DashEB.classes.MetricsUpdater.prototype.constructor = DashEB.classes.MetricsUpdater;


        /**
         * Contexte, permet de crÃ©er nos diffÃ©rentes classes Ã  utiliser Ã  la place de celle de Dash.js
         * HÃ©rite de la classe Dash.di.DashContext.
         * voir https://github.com/Dash-Industry-Forum/dash.js/wiki/Extending-the-Player
         *
         * Exemple de parametre pouvant Ãªtre passÃ© :
         * var requesterOptions = {
                 *      source: "url_manifeste",
                 *      tracker: undefined  // optionnel, adresse du tracker
                 * }
         * @param   {object} parametres les parametres de P2PWeb (url du manifeste, adresse du tracker)
         */
        DashEB.classes.Context = function (parametres) {
          "use strict";

          return {
            system: undefined,

            /**
             * initialise la classe DashEB.classes.Context
             * Cette mÃ©thode est appelÃ© par Dijon aprÃ¨s la crÃ©ation du Context.
             */
            setup: function () {
              DashEB.classes.Context.prototype.setup.call(this);

              // les paramÃ¨tres utilisÃ©s pour la crÃ©ation du ResourceRequester (passÃ© avec un .bind())
              var requesterOptions = {
                swarm: btoa(parametres.source),
                tracker: parametres.tracker || undefined
              };

              // ne crÃ©era un FragmentLoader seulement lorsque Dash.js lui demandera (voir Dijon.js)
              this.system.mapClass("fragmentLoader", DashEB.classes.FragmentLoader);

              // il ne faut qu'une seule instance du resourceRequester et du MetricsUpdater (sinon des users non existants peuvent apparaÃ®tre)
              this.system.mapSingleton("resourceRequester", ResourceRequester.bind(undefined, requesterOptions));
              this.system.mapSingleton("metricsUpdater", DashEB.classes.MetricsUpdater);
            }
          };
        };

        DashEB.classes.Context.prototype = new Dash.di.DashContext();
        DashEB.classes.Context.prototype.constructor = DashEB.classes.Context;


        module.exports = window.DashEB = DashEB;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./log": 46,
      "./resource_requester": 50,
      "./settings": 51,
      "./upload_handler": 56,
      "underscore": 57,
      "./events": 58
    }
  ],
  48: [
    function (require, module, exports) {
      "use strict";
      var BaseObject = require('base_object');
      var QuickConnect = require('rtc-quickconnect');
      var Settings = require("./settings");
      var Swarm = require('./swarm');
      var log = require('./log');
      var P2PManager = function P2PManager(params) {
        this.connectionSettings = {
          'room': params.swarm,
          iceServers: Settings.stunServers,
          debug: false
        };
        var tracker = params.tracker || Settings.tracker;
        log.info("Initializing P2PManager with " + tracker);
        var connection = QuickConnect(tracker, this.connectionSettings);
        this.swarm = new Swarm();
        this.dataChannel = connection.createDataChannel('P2PWebtv');
        this.setupListerners();
      };
      ($traceurRuntime.createClass)(P2PManager, {
        setupListerners: function () {
          var $__0 = this;
          this.dataChannel.on('channel:opened', (function (id, dataChannel) {
            return $__0.onChannelOpened(id, dataChannel);
          }));
          this.dataChannel.on('channel:closed', (function (id, dataChannel) {
            return $__0.onChannelClosed(id);
          }));
        },
        onChannelOpened: function (id, dataChannel) {
          if (this.swarm.size() <= Settings.maxSwarmSize) {
            this.swarm.addPeer(id, dataChannel);
          } else {
            log.warn("ignoring new peer, maxSwarmSize reached.");
          }
        },
        onChannelClosed: function (id) {
          this.swarm.removePeer(id);
        },
        requestResource: function (resource, callbackSuccess, callbackFail) {
          if (this.swarm.size() === 0) {
            callbackFail();
          } else {
            this.swarm.sendInterested(resource, callbackSuccess, callbackFail);
          }
        }
      }, {}, BaseObject);
      module.exports = P2PManager;


    }, {
      "./log": 46,
      "./settings": 51,
      "./swarm": 54,
      "rtc-quickconnect": 9
    }
  ],
  49: [
    function (require, module, exports) {
      "use strict";
      var BaseObject = require('base_object');
      var Storage = require('./storage');
      var UploadHandler = require('./upload_handler');
      var log = require('./log');
      var Peer = function Peer(params) {
        var $__0 = this;
        this.storage = Storage.getInstance();
        this.ident = params.ident;
        this.swarm = params.swarm;
        this.dataChannel = params.dataChannel;
        this.dataChannel.on("data", (function (data) {
          return $__0.messageReceived(data);
        }));
        this.uploadHandler = UploadHandler.getInstance();
        this.score = 1000;
        this.sendPing();
      };
      ($traceurRuntime.createClass)(Peer, {
        sendPing: function () {
          this.pingSentTime = Date.now();
          this.dataChannel.send("ping$$");
        },
        sendPong: function () {
          this.dataChannel.send("pong$$");
        },
        calculateRTT: function () {
          this.rtt = Date.now() - this.pingSentTime;
          log.debug(this.ident + ': ping?pong! rtt: ' + this.rtt);
        },
        sendSatisfy: function (resource) {
          if (this.uploadHandler.getSlot(this.ident)) {
            this.send('satisfy', resource, this.storage.getItem(resource));
            this.swarm.chunksSent += 1;

            // on notifie que l'on a envoyÃ© un segment aux autres pairs
            this.swarm.trigger("swarm:chunksent", {
              chunksSent: this.swarm.chunksSent
            });

          } else {
            log.warn("cannot send satisfy, no upload slot available");
            this.send("busy", resource);
          }
        },
        interestedReceived: function (resource) {
          if (this.storage.contain(resource)) {
            if (this.uploadHandler.getSlot(this.ident)) {
              this.send('contain', resource);
            } else {
              this.send('busy', resource);
            }
          } else {
            this.send("choke", resource);
          }
        },
        messageReceived: function (data) {
          var $__2 = data.split("$"),
            command = $__2[0],
            resource = $__2[1],
            content = $__2[2];
          switch (command) {
            case 'interested':
              this.interestedReceived(resource);
              break;
            case 'contain':
              this.swarm.containReceived(this, resource);
              break;
            case 'request':
              this.sendSatisfy(resource);
              break;
            case 'choke':
              this.swarm.chokeReceived(resource);
              break;
            case 'satisfy':
              log.debug('received _satisfy_');
              this.swarm.satisfyReceived(this, resource, content);
              break;
            case 'busy':
              this.swarm.busyReceived(this);
              break;
            case 'ping':
              this.sendPong();
              break;
            case 'pong':
              this.calculateRTT();
              break;
          }
        },
        send: function (command, resource) {
          var content = arguments[2] !== (void 0) ? arguments[2] : '';
          var message = this.mountMessage(command, resource, content);
          this.dataChannel.send(message);
        },
        mountMessage: function (command, resource, content) {
          var msg = command + "$" + resource + "$";
          if (content) {
            msg = msg + content;
          }
          return msg;
        }
      }, {}, BaseObject);
      module.exports = Peer;


    }, {
      "./log": 46,
      "./storage": 52,
      "./upload_handler": 56
    }
  ],
  50: [
    function (require, module, exports) {
      "use strict";
      var BaseObject = require('base_object');
      var CDNRequester = require('./cdn_requester');
      var P2PManager = require('./p2p_manager');
      var Settings = require('./settings');
      var ResourceRequester = function ResourceRequester(params) {
        this.cdnRequester = new CDNRequester();
        this.p2pManager = new P2PManager(params);
        this.currentState = params.currentState;
        this.isInitialBuffer = true;

        this.callbacks = {}; // map permettant de stocker les callbacks pour chaque ressource demandÃ©
      };
      ($traceurRuntime.createClass)(ResourceRequester, {

        /**
         * Recherche une ressource donnÃ©e Ã  une certaine adresse
         * @param {string}   resource     correspond Ã  l'adresse Ã  laquelle la ressource se trouve
         * @param {number}   bufferLength correspond Ã  la taille du buffer
         * @param {function} callback     correspond Ã  la fonction Ã  appeler lorsque la ressource est tÃ©lÃ©chargÃ©e
         */
        requestResource: function (resource, bufferLength, callback) {

          // on enregistre la requete de ressource
          this.callbacks[resource] = callback;

          if (bufferLength < Settings.lowBufferLength || this.isInitialBuffer || this.p2pManager.swarm.size() === 0) {
            console.log("[ResourceRequester] demande au serveur");
            this.requestToCDN(resource, callback);
          } else {
            console.log("[ResourceRequester] demande aux pairs");
            this.requestToP2P(resource, callback);
          }
        },

        /**
         * Demande la ressource au serveur de contenu CDN
         */
        requestToCDN: function (resource, callback) {
          this.cdnRequester.requestResource(resource, callback);
        },


        /**
         * Demande la ressource aux pairs
         */
        requestToP2P: function (resource, callback) {
          this.p2pManager.requestResource(resource, callback, this.requestToCDN.bind(this, resource, callback));
        }
      }, {}, BaseObject);
      module.exports = ResourceRequester;


    }, {
      "./cdn_requester": 44,
      "./p2p_manager": 48,
      "./settings": 51
    }
  ],
  51: [
    function (require, module, exports) {
      "use strict";
      var Settings = function Settings() {
      };
      ($traceurRuntime.createClass)(Settings, {}, {});
      Settings.logging = false;
      Settings.maxStorageChunks = 20; //10
      Settings.maxContributors = 5;
      Settings.maxSwarmSize = 50;
      Settings.maxUploadSlots = 10;
      Settings.uploadSlotTimeout = 8000;
      Settings.tracker = 'http://82.138.70.140:3000';
      Settings.lowBufferLength = 5;
      Settings.points = 1;
      Settings.stunServers = [{
        "url": "stun:stun.l.google.com:19302"
      }, {
        "url": "stun:stun1.l.google.com:19302"
      }, {
        "url": "stun:stun2.l.google.com:19302"
      }, {
        "url": "stun:stun3.l.google.com:19302"
      }, {
        "url": "stun:stun4.l.google.com:19302"
      }, {
        "url": "stun:stun.stunprotocol.org:3478"
      }];
      module.exports = Settings;


    }, {}
  ],
  52: [
    function (require, module, exports) {
      (function (global) {
        "use strict";
        var Settings = require("./settings");
        //var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
        var _ = require('underscore');
        var log = require('./log');
        var Storage = function Storage() {
          this.keys = [];
          this.chunks = {};
        };
        ($traceurRuntime.createClass)(Storage, {
          setItem: function (key, value) {
            if (_.has(this.chunks, key)) {
              log.warn("already have this chunk on storage: " + key);
              return;
            }
            this.keys.push(key);
            this.chunks[key] = value;
            if (this.keys.length > Settings.maxStorageChunks) {
              this.removeOlderItem();
            }
          },
          removeOlderItem: function () {
            var key = this.keys.splice(0, 1)[0];
            delete this.chunks[key];
          },
          getItem: function (key) {
            return this.chunks[key];
          },
          contain: function (key) {
            return _.contains(this.keys, key);
          }
        }, {});
        Storage.getInstance = function () {
          if (this._instance === undefined) {
            this._instance = new this();
          }
          return this._instance;
        };
        module.exports = Storage;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./log": 46,
      "./settings": 51,
      "underscore": 57
    }
  ],
  54: [
    function (require, module, exports) {
      (function (global) {
        "use strict";
        var BaseObject = require('base_object');
        var BufferedChannel = require('rtc-bufferedchannel');
        var Peer = require('./peer');
        var Settings = require('./settings');
        //var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
        var _ = require('underscore');
        var log = require('./log');
        var SwarmUtils = require('./swarm_utils');

        var Swarm = function Swarm() {
          this.utils = new SwarmUtils(this);
          this.peers = [];
          this.chunksSent = 0;
          this.avgSegmentSize = 0;
          this.requetes = {};
        };
        ($traceurRuntime.createClass)(Swarm, {
          size: function () {
            return _.size(this.peers);
          },
          addPeer: function (id, dataChannel) {
            log.info("join: " + id);
            var bufferedChannel = BufferedChannel(dataChannel, {
              calcCharSize: false
            });
            var peer = new Peer({
              ident: id,
              dataChannel: bufferedChannel,
              swarm: this
            });
            this.peers.push(peer);
            this.trigger('swarm:sizeupdate', {
              swarmSize: this.size()
            });
          },
          removePeer: function (id) {
            var peer = this.utils.findPeer(id);
            this.peers = _.without(this.peers, peer);
            log.info("quit: " + id + " (remains: " + this.size() + ")");
            this.trigger('swarm:sizeupdate', {
              swarmSize: this.size()
            });
          },
          sendTo: function (recipients, command, resource) {
            var content = arguments[3] !== (void 0) ? arguments[3] : '';
            if (recipients === 'contributors') {
              _.each(this.utils.contributors, function (peer) {
                peer.send(command, resource, content);
              }, this);
            } else {
              var peer = this.utils.findPeer(recipients);
              peer.send(command, resource, content);
            }
          },
          sendInterested: function (resource, callbackSuccess, callbackFail) {

            console.log("[Swarm] send interested in " + resource);

            this.sendTo('contributors', 'interested', resource);

            var timeout = this.utils.timeoutFor('interested');
            var interestedFailID = setTimeout(this.callbackFail.bind(this, resource), timeout);

            this.requetes[resource] = {
              externalCallbackFail: callbackFail,
              externalCallbackSuccess: callbackSuccess,
              interestedFailID: interestedFailID,
              requestFailID: undefined,
              chokedClients: 0,
              peersContainsResource: [],
              satisfyCandidate: undefined
            };

          },
          chokeReceived: function (resource) {

            var requete = this.requetes[resource];
            if (!requete) {
              console.log("[Swarm] choke received from peer for a wrong resource " + resource);
              return;
            }
            ;

            console.log("[Swarm] choke received from peer for " + resource);

            requete.chokedClients++;

            if (requete.chokedClients === _.size(this.utils.contributors)) {
              log.warn("[Swarm] all contributors choked, getting from cdn");
              this.callbackFail(resource);
            }

          },
          containReceived: function (peer, resource) {

            var requete = this.requetes[resource];
            if (!requete) {
              console.log("[Swarm] contain received from peer " + peer.ident + " for a wrong resource " + resource);
              return;
            }
            ;

            console.log("[Swarm] contain received from peer " + peer.ident + " for " + resource);

            if (requete.satisfyCandidate) {
              log.warn("[Swarm] contain received but already have satisfy candidate for " + resource);
              requete.peersContainsResource.push(peer);
            } else {
              console.log("[Swarm] send request to " + peer.ident + " for " + resource);
              requete.satisfyCandidate = peer.ident;
              this.clearInterestedFailInterval(resource);
              this.sendTo(requete.satisfyCandidate, 'request', resource);
              requete.requestFailID = setTimeout(this.callbackFail.bind(this, resource), this.utils.timeoutFor('request'));
            }

          },
          satisfyReceived: function (peer, resource, chunk) {

            var requete = this.requetes[resource];
            if (!requete || requete.satisfyCandidate != peer.ident) {
              console.log("[Swarm] satisfy received for a wrong resource or satisfyCandidate : " + resource + " ; " + peer.ident);
              log.warn("[Swarm] satisfy received for a wrong resource or satisfyCandidate");
              return;
            }

            console.log("[Swarm] satisfy received from " + peer.ident + " for " + resource);

            this.clearRequestFailInterval(resource);
            requete.externalCallbackSuccess(chunk, "p2p");
            this.utils.updatePeersScore(resource);
            this.rebootRoundVars(resource);

          },
          busyReceived: function (peer) {
            var lowerScore = this.utils.getLowestScorePeer().score;
            if (lowerScore < 0) {
              peer.score = lowerScore - Settings.points;
            } else {
              peer.score = 0;
            }
            log.warn("busy received. " + peer.ident + " score is now: " + peer.score);
          },
          callbackFail: function (resource) {

            this.utils.decrementScore(this.utils.contributors);

            var requete = this.requetes[resource];
            if (!requete) {
              console.log("[Swarm] callbackFail for a wrong resource " + resource);
              return;
            }
            ;

            console.log("[Swarm] callbackFail for " + resource + " (ask server)");
            requete.externalCallbackFail();
            this.rebootRoundVars(resource);
          },
          rebootRoundVars: function (resource) {
            delete this.requetes[resource];
          },
          clearInterestedFailInterval: function (resource) {

            var requete = this.requetes[resource];
            if (!requete) {
              console.log("[Swarm] clear timeout interested for a wrong resource " + resource);
              return;
            }
            ;

            console.log("[Swarm] clear timeout interested for " + resource);
            clearTimeout(requete.interestedFailID);
            requete.interestedFailID = 0;
          },
          clearRequestFailInterval: function (resource) {

            var requete = this.requetes[resource];
            if (!requete) {
              console.log("[Swarm] clear timeout request for a wrong resource " + resource);
              return;
            }
            ;

            console.log("[Swarm] clear timeout request for " + resource);
            clearTimeout(requete.requestFailID);
            requete.requestFailID = 0;
          }
        }, {}, BaseObject);
        module.exports = Swarm;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./log": 46,
      "./peer": 49,
      "./settings": 51,
      "./swarm_utils": 55,
      "rtc-bufferedchannel": 8,
      "underscore": 57
    }
  ],
  55: [
    function (require, module, exports) {
      (function (global) {
        "use strict";
        var BaseObject = require('base_object');
        //var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
        var _ = require('underscore');
        var Settings = require('./settings');
        var log = require('./log');
        var SwarmUtils = function SwarmUtils(swarm) {
          this.swarm = swarm;
        };
        ($traceurRuntime.createClass)(SwarmUtils, {
          findPeer: function (id) {
            return _.find(this.swarm.peers, function (peer) {
              return (peer.ident === id);
            }, this);
          },
          updatePeersScore: function (resource) {

            var requete = this.swarm.requetes[resource];
            if (!requete) return;

            var successPeer = this.findPeer(requete.satisfyCandidate); // this.findPeer(this.utils.satisfyCandidate);
            var goodPeers = _.union([successPeer], requete.peersContainsResource); // _.union([successPeer], this.utils.peersContainsResource);
            var badPeers = _.difference(this.contributors, goodPeers);
            log.info("contributors good: " + goodPeers.length);
            this.incrementScore(goodPeers);
            this.decrementScore(badPeers);
          },
          incrementScore: function (peers) {
            this.changeScore(peers, Settings.points);
          },
          decrementScore: function (peers) {
            this.changeScore(peers, Settings.points * -1);
          },
          changeScore: function (peers, points) {
            _.each(peers, function (peer) {
              peer.score += points;
            }, this);
          },
          get contributors() {
            var orderedPeers = _.sortBy(this.swarm.peers, function (p) {
              return p.score;
            }).reverse();
            if (_.size(this.swarm.peers) > Settings.maxContributors) {
              var slice = orderedPeers.slice(0, Settings.maxContributors);
              return slice;
            } else {
              return orderedPeers;
            }
          },
          getLowestScorePeer: function () {
            return _.first(_.sortBy(this.swarm.peers, function (p) {
              return p.score;
            }));
          },
          timeoutFor: function (command) {
            var segmentSize = this.swarm.avgSegmentSize > 0 ? this.swarm.avgSegmentSize * 1000 : 1000;
            if (command === 'interested') {
              var timeout = segmentSize / 4;
              return timeout > 2000 ? 2000 : timeout;
            } else if (command === 'request') {
              return segmentSize * 0.6;
            }
          }
        }, {}, BaseObject);
        module.exports = SwarmUtils;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./log": 46,
      "./settings": 51,
      "underscore": 57
    }
  ],
  56: [
    function (require, module, exports) {
      (function (global) {
        "use strict";
        var BaseObject = require('base_object');
        var Settings = require("./settings");
        //var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
        var _ = require('underscore');
        var log = require('./log');
        var UploadHandler = function UploadHandler() {
          this.maxUploadSlots = Settings.maxUploadSlots;
          this.slots = {};
          setInterval(this.checkAndFreeSlots.bind(this), 5000);
        };
        ($traceurRuntime.createClass)(UploadHandler, {
          getSlot: function (peerId) {
            if (_.contains(this.slots.keys, peerId) || this.hasFreeSlots()) {
              this.slots[peerId] = Date.now();
              this.updateSlotsCount();
              return true;
            } else {
              log.warn("don't have free upload slots");
              return false;
            }
          },
          checkAndFreeSlots: function () {
            var threshold = Date.now() - Settings.uploadSlotTimeout;
            _.each(this.slots, function (timestamp, peerId) {
              if (timestamp <= threshold) {
                delete this.slots[peerId];
                this.updateSlotsCount();
              }
            }, this);
          },
          hasFreeSlots: function () {
            return (_.size(this.slots) < this.maxUploadSlots);
          },
          updateSlotsCount: function () {
            this.trigger('uploadhandler:update', {
              occupiedSlots: _.size(this.slots),
              totalSlots: this.maxUploadSlots
            });
          }
        }, {}, BaseObject);
        UploadHandler.getInstance = function () {
          if (this._instance === undefined) {
            this._instance = new this();
          }
          return this._instance;
        };
        module.exports = UploadHandler;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./log": 46,
      "./settings": 51,
      "underscore": 57
    }
  ]
















  // Underscore (copier/coller de Clappr.js)
  ,
  57: [
    function (require, module, exports) {
      //     Underscore.js 1.7.0
      //     http://underscorejs.org
      //     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
      //     Underscore may be freely distributed under the MIT license.

      (function () {

        // Baseline setup
        // --------------

        // Establish the root object, `window` in the browser, or `exports` on the server.
        var root = this;

        // Save the previous value of the `_` variable.
        var previousUnderscore = root._;

        // Save bytes in the minified (but not gzipped) version:
        var ArrayProto = Array.prototype,
          ObjProto = Object.prototype,
          FuncProto = Function.prototype;

        // Create quick reference variables for speed access to core prototypes.
        var
          push = ArrayProto.push,
          slice = ArrayProto.slice,
          concat = ArrayProto.concat,
          toString = ObjProto.toString,
          hasOwnProperty = ObjProto.hasOwnProperty;

        // All **ECMAScript 5** native function implementations that we hope to use
        // are declared here.
        var
          nativeIsArray = Array.isArray,
          nativeKeys = Object.keys,
          nativeBind = FuncProto.bind;

        // Create a safe reference to the Underscore object for use below.
        var _ = function (obj) {
          if (obj instanceof _) return obj;
          if (!(this instanceof _)) return new _(obj);
          this._wrapped = obj;
        };

        // Export the Underscore object for **Node.js**, with
        // backwards-compatibility for the old `require()` API. If we're in
        // the browser, add `_` as a global object.
        if (typeof exports !== 'undefined') {
          if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
          }
          exports._ = _;
        } else {
          root._ = _;
        }

        // Current version.
        _.VERSION = '1.7.0';

        // Internal function that returns an efficient (for current engines) version
        // of the passed-in callback, to be repeatedly applied in other Underscore
        // functions.
        var createCallback = function (func, context, argCount) {
          if (context === void 0) return func;
          switch (argCount == null ? 3 : argCount) {
            case 1:
              return function (value) {
                return func.call(context, value);
              };
            case 2:
              return function (value, other) {
                return func.call(context, value, other);
              };
            case 3:
              return function (value, index, collection) {
                return func.call(context, value, index, collection);
              };
            case 4:
              return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
              };
          }
          return function () {
            return func.apply(context, arguments);
          };
        };

        // A mostly-internal function to generate callbacks that can be applied
        // to each element in a collection, returning the desired result â€” either
        // identity, an arbitrary callback, a property matcher, or a property accessor.
        _.iteratee = function (value, context, argCount) {
          if (value == null) return _.identity;
          if (_.isFunction(value)) return createCallback(value, context, argCount);
          if (_.isObject(value)) return _.matches(value);
          return _.property(value);
        };

        // Collection Functions
        // --------------------

        // The cornerstone, an `each` implementation, aka `forEach`.
        // Handles raw objects in addition to array-likes. Treats all
        // sparse array-likes as if they were dense.
        _.each = _.forEach = function (obj, iteratee, context) {
          if (obj == null) return obj;
          iteratee = createCallback(iteratee, context);
          var i, length = obj.length;
          if (length === +length) {
            for (i = 0; i < length; i++) {
              iteratee(obj[i], i, obj);
            }
          } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
              iteratee(obj[keys[i]], keys[i], obj);
            }
          }
          return obj;
        };

        // Return the results of applying the iteratee to each element.
        _.map = _.collect = function (obj, iteratee, context) {
          if (obj == null) return [];
          iteratee = _.iteratee(iteratee, context);
          var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length),
            currentKey;
          for (var index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
          }
          return results;
        };

        var reduceError = 'Reduce of empty array with no initial value';

        // **Reduce** builds up a single result from a list of values, aka `inject`,
        // or `foldl`.
        _.reduce = _.foldl = _.inject = function (obj, iteratee, memo, context) {
          if (obj == null) obj = [];
          iteratee = createCallback(iteratee, context, 4);
          var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index = 0,
            currentKey;
          if (arguments.length < 3) {
            if (!length) throw new TypeError(reduceError);
            memo = obj[keys ? keys[index++] : index++];
          }
          for (; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
          }
          return memo;
        };

        // The right-associative version of reduce, also known as `foldr`.
        _.reduceRight = _.foldr = function (obj, iteratee, memo, context) {
          if (obj == null) obj = [];
          iteratee = createCallback(iteratee, context, 4);
          var keys = obj.length !== +obj.length && _.keys(obj),
            index = (keys || obj).length,
            currentKey;
          if (arguments.length < 3) {
            if (!index) throw new TypeError(reduceError);
            memo = obj[keys ? keys[--index] : --index];
          }
          while (index--) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
          }
          return memo;
        };

        // Return the first value which passes a truth test. Aliased as `detect`.
        _.find = _.detect = function (obj, predicate, context) {
          var result;
          predicate = _.iteratee(predicate, context);
          _.some(obj, function (value, index, list) {
            if (predicate(value, index, list)) {
              result = value;
              return true;
            }
          });
          return result;
        };

        // Return all the elements that pass a truth test.
        // Aliased as `select`.
        _.filter = _.select = function (obj, predicate, context) {
          var results = [];
          if (obj == null) return results;
          predicate = _.iteratee(predicate, context);
          _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
          });
          return results;
        };

        // Return all the elements for which a truth test fails.
        _.reject = function (obj, predicate, context) {
          return _.filter(obj, _.negate(_.iteratee(predicate)), context);
        };

        // Determine whether all of the elements match a truth test.
        // Aliased as `all`.
        _.every = _.all = function (obj, predicate, context) {
          if (obj == null) return true;
          predicate = _.iteratee(predicate, context);
          var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
          for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
          }
          return true;
        };

        // Determine if at least one element in the object matches a truth test.
        // Aliased as `any`.
        _.some = _.any = function (obj, predicate, context) {
          if (obj == null) return false;
          predicate = _.iteratee(predicate, context);
          var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
          for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
          }
          return false;
        };

        // Determine if the array or object contains a given value (using `===`).
        // Aliased as `include`.
        _.contains = _.include = function (obj, target) {
          if (obj == null) return false;
          if (obj.length !== +obj.length) obj = _.values(obj);
          return _.indexOf(obj, target) >= 0;
        };

        // Invoke a method (with arguments) on every item in a collection.
        _.invoke = function (obj, method) {
          var args = slice.call(arguments, 2);
          var isFunc = _.isFunction(method);
          return _.map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
          });
        };

        // Convenience version of a common use case of `map`: fetching a property.
        _.pluck = function (obj, key) {
          return _.map(obj, _.property(key));
        };

        // Convenience version of a common use case of `filter`: selecting only objects
        // containing specific `key:value` pairs.
        _.where = function (obj, attrs) {
          return _.filter(obj, _.matches(attrs));
        };

        // Convenience version of a common use case of `find`: getting the first object
        // containing specific `key:value` pairs.
        _.findWhere = function (obj, attrs) {
          return _.find(obj, _.matches(attrs));
        };

        // Return the maximum element (or element-based computation).
        _.max = function (obj, iteratee, context) {
          var result = -Infinity,
            lastComputed = -Infinity,
            value, computed;
          if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
              value = obj[i];
              if (value > result) {
                result = value;
              }
            }
          } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
              computed = iteratee(value, index, list);
              if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                result = value;
                lastComputed = computed;
              }
            });
          }
          return result;
        };

        // Return the minimum element (or element-based computation).
        _.min = function (obj, iteratee, context) {
          var result = Infinity,
            lastComputed = Infinity,
            value, computed;
          if (iteratee == null && obj != null) {
            obj = obj.length === +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
              value = obj[i];
              if (value < result) {
                result = value;
              }
            }
          } else {
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index, list) {
              computed = iteratee(value, index, list);
              if (computed < lastComputed || computed === Infinity && result === Infinity) {
                result = value;
                lastComputed = computed;
              }
            });
          }
          return result;
        };

        // Shuffle a collection, using the modern version of the
        // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisherâ€“Yates_shuffle).
        _.shuffle = function (obj) {
          var set = obj && obj.length === +obj.length ? obj : _.values(obj);
          var length = set.length;
          var shuffled = Array(length);
          for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
          }
          return shuffled;
        };

        // Sample **n** random values from a collection.
        // If **n** is not specified, returns a single random element.
        // The internal `guard` argument allows it to work with `map`.
        _.sample = function (obj, n, guard) {
          if (n == null || guard) {
            if (obj.length !== +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
          }
          return _.shuffle(obj).slice(0, Math.max(0, n));
        };

        // Sort the object's values by a criterion produced by an iteratee.
        _.sortBy = function (obj, iteratee, context) {
          iteratee = _.iteratee(iteratee, context);
          return _.pluck(_.map(obj, function (value, index, list) {
            return {
              value: value,
              index: index,
              criteria: iteratee(value, index, list)
            };
          }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
              if (a > b || a === void 0) return 1;
              if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
          }), 'value');
        };

        // An internal function used for aggregate "group by" operations.
        var group = function (behavior) {
          return function (obj, iteratee, context) {
            var result = {};
            iteratee = _.iteratee(iteratee, context);
            _.each(obj, function (value, index) {
              var key = iteratee(value, index, obj);
              behavior(result, value, key);
            });
            return result;
          };
        };

        // Groups the object's values by a criterion. Pass either a string attribute
        // to group by, or a function that returns the criterion.
        _.groupBy = group(function (result, value, key) {
          if (_.has(result, key)) result[key].push(value);
          else result[key] = [value];
        });

        // Indexes the object's values by a criterion, similar to `groupBy`, but for
        // when you know that your index values will be unique.
        _.indexBy = group(function (result, value, key) {
          result[key] = value;
        });

        // Counts instances of an object that group by a certain criterion. Pass
        // either a string attribute to count by, or a function that returns the
        // criterion.
        _.countBy = group(function (result, value, key) {
          if (_.has(result, key)) result[key]++;
          else result[key] = 1;
        });

        // Use a comparator function to figure out the smallest index at which
        // an object should be inserted so as to maintain order. Uses binary search.
        _.sortedIndex = function (array, obj, iteratee, context) {
          iteratee = _.iteratee(iteratee, context, 1);
          var value = iteratee(obj);
          var low = 0,
            high = array.length;
          while (low < high) {
            var mid = low + high >>> 1;
            if (iteratee(array[mid]) < value) low = mid + 1;
            else high = mid;
          }
          return low;
        };

        // Safely create a real, live array from anything iterable.
        _.toArray = function (obj) {
          if (!obj) return [];
          if (_.isArray(obj)) return slice.call(obj);
          if (obj.length === +obj.length) return _.map(obj, _.identity);
          return _.values(obj);
        };

        // Return the number of elements in an object.
        _.size = function (obj) {
          if (obj == null) return 0;
          return obj.length === +obj.length ? obj.length : _.keys(obj).length;
        };

        // Split a collection into two arrays: one whose elements all satisfy the given
        // predicate, and one whose elements all do not satisfy the predicate.
        _.partition = function (obj, predicate, context) {
          predicate = _.iteratee(predicate, context);
          var pass = [],
            fail = [];
          _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
          });
          return [pass, fail];
        };

        // Array Functions
        // ---------------

        // Get the first element of an array. Passing **n** will return the first N
        // values in the array. Aliased as `head` and `take`. The **guard** check
        // allows it to work with `_.map`.
        _.first = _.head = _.take = function (array, n, guard) {
          if (array == null) return void 0;
          if (n == null || guard) return array[0];
          if (n < 0) return [];
          return slice.call(array, 0, n);
        };

        // Returns everything but the last entry of the array. Especially useful on
        // the arguments object. Passing **n** will return all the values in
        // the array, excluding the last N. The **guard** check allows it to work with
        // `_.map`.
        _.initial = function (array, n, guard) {
          return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
        };

        // Get the last element of an array. Passing **n** will return the last N
        // values in the array. The **guard** check allows it to work with `_.map`.
        _.last = function (array, n, guard) {
          if (array == null) return void 0;
          if (n == null || guard) return array[array.length - 1];
          return slice.call(array, Math.max(array.length - n, 0));
        };

        // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
        // Especially useful on the arguments object. Passing an **n** will return
        // the rest N values in the array. The **guard**
        // check allows it to work with `_.map`.
        _.rest = _.tail = _.drop = function (array, n, guard) {
          return slice.call(array, n == null || guard ? 1 : n);
        };

        // Trim out all falsy values from an array.
        _.compact = function (array) {
          return _.filter(array, _.identity);
        };

        // Internal implementation of a recursive `flatten` function.
        var flatten = function (input, shallow, strict, output) {
          if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
          }
          for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];
            if (!_.isArray(value) && !_.isArguments(value)) {
              if (!strict) output.push(value);
            } else if (shallow) {
              push.apply(output, value);
            } else {
              flatten(value, shallow, strict, output);
            }
          }
          return output;
        };

        // Flatten out an array, either recursively (by default), or just one level.
        _.flatten = function (array, shallow) {
          return flatten(array, shallow, false, []);
        };

        // Return a version of the array that does not contain the specified value(s).
        _.without = function (array) {
          return _.difference(array, slice.call(arguments, 1));
        };

        // Produce a duplicate-free version of the array. If the array has already
        // been sorted, you have the option of using a faster algorithm.
        // Aliased as `unique`.
        _.uniq = _.unique = function (array, isSorted, iteratee, context) {
          if (array == null) return [];
          if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
          }
          if (iteratee != null) iteratee = _.iteratee(iteratee, context);
          var result = [];
          var seen = [];
          for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if (isSorted) {
              if (!i || seen !== value) result.push(value);
              seen = value;
            } else if (iteratee) {
              var computed = iteratee(value, i, array);
              if (_.indexOf(seen, computed) < 0) {
                seen.push(computed);
                result.push(value);
              }
            } else if (_.indexOf(result, value) < 0) {
              result.push(value);
            }
          }
          return result;
        };

        // Produce an array that contains the union: each distinct element from all of
        // the passed-in arrays.
        _.union = function () {
          return _.uniq(flatten(arguments, true, true, []));
        };

        // Produce an array that contains every item shared between all the
        // passed-in arrays.
        _.intersection = function (array) {
          if (array == null) return [];
          var result = [];
          var argsLength = arguments.length;
          for (var i = 0, length = array.length; i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            for (var j = 1; j < argsLength; j++) {
              if (!_.contains(arguments[j], item)) break;
            }
            if (j === argsLength) result.push(item);
          }
          return result;
        };

        // Take the difference between one array and a number of other arrays.
        // Only the elements present in just the first array will remain.
        _.difference = function (array) {
          var rest = flatten(slice.call(arguments, 1), true, true, []);
          return _.filter(array, function (value) {
            return !_.contains(rest, value);
          });
        };

        // Zip together multiple lists into a single array -- elements that share
        // an index go together.
        _.zip = function (array) {
          if (array == null) return [];
          var length = _.max(arguments, 'length').length;
          var results = Array(length);
          for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, i);
          }
          return results;
        };

        // Converts lists into objects. Pass either a single array of `[key, value]`
        // pairs, or two parallel arrays of the same length -- one of keys, and one of
        // the corresponding values.
        _.object = function (list, values) {
          if (list == null) return {};
          var result = {};
          for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
              result[list[i]] = values[i];
            } else {
              result[list[i][0]] = list[i][1];
            }
          }
          return result;
        };

        // Return the position of the first occurrence of an item in an array,
        // or -1 if the item is not included in the array.
        // If the array is large and already in sort order, pass `true`
        // for **isSorted** to use binary search.
        _.indexOf = function (array, item, isSorted) {
          if (array == null) return -1;
          var i = 0,
            length = array.length;
          if (isSorted) {
            if (typeof isSorted == 'number') {
              i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
            } else {
              i = _.sortedIndex(array, item);
              return array[i] === item ? i : -1;
            }
          }
          for (; i < length; i++)
            if (array[i] === item) return i;
          return -1;
        };

        _.lastIndexOf = function (array, item, from) {
          if (array == null) return -1;
          var idx = array.length;
          if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
          }
          while (--idx >= 0)
            if (array[idx] === item) return idx;
          return -1;
        };

        // Generate an integer Array containing an arithmetic progression. A port of
        // the native Python `range()` function. See
        // [the Python documentation](http://docs.python.org/library/functions.html#range).
        _.range = function (start, stop, step) {
          if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
          }
          step = step || 1;

          var length = Math.max(Math.ceil((stop - start) / step), 0);
          var range = Array(length);

          for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
          }

          return range;
        };

        // Function (ahem) Functions
        // ------------------

        // Reusable constructor function for prototype setting.
        var Ctor = function () {
        };

        // Create a function bound to a given object (assigning `this`, and arguments,
        // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
        // available.
        _.bind = function (func, context) {
          var args, bound;
          if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
          if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
          args = slice.call(arguments, 2);
          bound = function () {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            Ctor.prototype = func.prototype;
            var self = new Ctor;
            Ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (_.isObject(result)) return result;
            return self;
          };
          return bound;
        };

        // Partially apply a function by creating a version that has had some of its
        // arguments pre-filled, without changing its dynamic `this` context. _ acts
        // as a placeholder, allowing any combination of arguments to be pre-filled.
        _.partial = function (func) {
          var boundArgs = slice.call(arguments, 1);
          return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
              if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return func.apply(this, args);
          };
        };

        // Bind a number of an object's methods to that object. Remaining arguments
        // are the method names to be bound. Useful for ensuring that all callbacks
        // defined on an object belong to it.
        _.bindAll = function (obj) {
          var i, length = arguments.length,
            key;
          if (length <= 1) throw new Error('bindAll must be passed function names');
          for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
          }
          return obj;
        };

        // Memoize an expensive function by storing its results.
        _.memoize = function (func, hasher) {
          var memoize = function (key) {
            var cache = memoize.cache;
            var address = hasher ? hasher.apply(this, arguments) : key;
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
          };
          memoize.cache = {};
          return memoize;
        };

        // Delays a function for the given number of milliseconds, and then calls
        // it with the arguments supplied.
        _.delay = function (func, wait) {
          var args = slice.call(arguments, 2);
          return setTimeout(function () {
            return func.apply(null, args);
          }, wait);
        };

        // Defers a function, scheduling it to run after the current call stack has
        // cleared.
        _.defer = function (func) {
          return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
        };

        // Returns a function, that, when invoked, will only be triggered at most once
        // during a given window of time. Normally, the throttled function will run
        // as much as it can, without ever going more than once per `wait` duration;
        // but if you'd like to disable the execution on the leading edge, pass
        // `{leading: false}`. To disable execution on the trailing edge, ditto.
        _.throttle = function (func, wait, options) {
          var context, args, result;
          var timeout = null;
          var previous = 0;
          if (!options) options = {};
          var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          };
          return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
              clearTimeout(timeout);
              timeout = null;
              previous = now;
              result = func.apply(context, args);
              if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining);
            }
            return result;
          };
        };

        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        _.debounce = function (func, wait, immediate) {
          var timeout, args, context, timestamp, result;

          var later = function () {
            var last = _.now() - timestamp;

            if (last < wait && last > 0) {
              timeout = setTimeout(later, wait - last);
            } else {
              timeout = null;
              if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
              }
            }
          };

          return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
              result = func.apply(context, args);
              context = args = null;
            }

            return result;
          };
        };

        // Returns the first function passed as an argument to the second,
        // allowing you to adjust arguments, run code before and after, and
        // conditionally execute the original function.
        _.wrap = function (func, wrapper) {
          return _.partial(wrapper, func);
        };

        // Returns a negated version of the passed-in predicate.
        _.negate = function (predicate) {
          return function () {
            return !predicate.apply(this, arguments);
          };
        };

        // Returns a function that is the composition of a list of functions, each
        // consuming the return value of the function that follows.
        _.compose = function () {
          var args = arguments;
          var start = args.length - 1;
          return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
          };
        };

        // Returns a function that will only be executed after being called N times.
        _.after = function (times, func) {
          return function () {
            if (--times < 1) {
              return func.apply(this, arguments);
            }
          };
        };

        // Returns a function that will only be executed before being called N times.
        _.before = function (times, func) {
          var memo;
          return function () {
            if (--times > 0) {
              memo = func.apply(this, arguments);
            } else {
              func = null;
            }
            return memo;
          };
        };

        // Returns a function that will be executed at most one time, no matter how
        // often you call it. Useful for lazy initialization.
        _.once = _.partial(_.before, 2);

        // Object Functions
        // ----------------

        // Retrieve the names of an object's properties.
        // Delegates to **ECMAScript 5**'s native `Object.keys`
        _.keys = function (obj) {
          if (!_.isObject(obj)) return [];
          if (nativeKeys) return nativeKeys(obj);
          var keys = [];
          for (var key in obj)
            if (_.has(obj, key)) keys.push(key);
          return keys;
        };

        // Retrieve the values of an object's properties.
        _.values = function (obj) {
          var keys = _.keys(obj);
          var length = keys.length;
          var values = Array(length);
          for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
          }
          return values;
        };

        // Convert an object into a list of `[key, value]` pairs.
        _.pairs = function (obj) {
          var keys = _.keys(obj);
          var length = keys.length;
          var pairs = Array(length);
          for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
          }
          return pairs;
        };

        // Invert the keys and values of an object. The values must be serializable.
        _.invert = function (obj) {
          var result = {};
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
          }
          return result;
        };

        // Return a sorted list of the function names available on the object.
        // Aliased as `methods`
        _.functions = _.methods = function (obj) {
          var names = [];
          for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
          }
          return names.sort();
        };

        // Extend a given object with all the properties in passed-in object(s).
        _.extend = function (obj) {
          if (!_.isObject(obj)) return obj;
          var source, prop;
          for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
              if (hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
              }
            }
          }
          return obj;
        };

        // Return a copy of the object only containing the whitelisted properties.
        _.pick = function (obj, iteratee, context) {
          var result = {}, key;
          if (obj == null) return result;
          if (_.isFunction(iteratee)) {
            iteratee = createCallback(iteratee, context);
            for (key in obj) {
              var value = obj[key];
              if (iteratee(value, key, obj)) result[key] = value;
            }
          } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            obj = new Object(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
              key = keys[i];
              if (key in obj) result[key] = obj[key];
            }
          }
          return result;
        };

        // Return a copy of the object without the blacklisted properties.
        _.omit = function (obj, iteratee, context) {
          if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
          } else {
            var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
            iteratee = function (value, key) {
              return !_.contains(keys, key);
            };
          }
          return _.pick(obj, iteratee, context);
        };

        // Fill in a given object with default properties.
        _.defaults = function (obj) {
          if (!_.isObject(obj)) return obj;
          for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            for (var prop in source) {
              if (obj[prop] === void 0) obj[prop] = source[prop];
            }
          }
          return obj;
        };

        // Create a (shallow-cloned) duplicate of an object.
        _.clone = function (obj) {
          if (!_.isObject(obj)) return obj;
          return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
        };

        // Invokes interceptor with the obj, and then returns obj.
        // The primary purpose of this method is to "tap into" a method chain, in
        // order to perform operations on intermediate results within the chain.
        _.tap = function (obj, interceptor) {
          interceptor(obj);
          return obj;
        };

        // Internal recursive comparison function for `isEqual`.
        var eq = function (a, b, aStack, bStack) {
          // Identical objects are equal. `0 === -0`, but they aren't identical.
          // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
          if (a === b) return a !== 0 || 1 / a === 1 / b;
          // A strict comparison is necessary because `null == undefined`.
          if (a == null || b == null) return a === b;
          // Unwrap any wrapped objects.
          if (a instanceof _) a = a._wrapped;
          if (b instanceof _) b = b._wrapped;
          // Compare `[[Class]]` names.
          var className = toString.call(a);
          if (className !== toString.call(b)) return false;
          switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            case '[object RegExp]':
            // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case '[object String]':
              // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
              // equivalent to `new String("5")`.
              return '' + a === '' + b;
            case '[object Number]':
              // `NaN`s are equivalent, but non-reflexive.
              // Object(NaN) is equivalent to NaN
              if (+a !== +a) return +b !== +b;
              // An `egal` comparison is performed for other numeric values.
              return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
              // Coerce dates and booleans to numeric primitive values. Dates are compared by their
              // millisecond representations. Note that invalid dates with millisecond representations
              // of `NaN` are not equivalent.
              return +a === +b;
          }
          if (typeof a != 'object' || typeof b != 'object') return false;
          // Assume equality for cyclic structures. The algorithm for detecting cyclic
          // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
          var length = aStack.length;
          while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a) return bStack[length] === b;
          }
          // Objects with different constructors are not equivalent, but `Object`s
          // from different frames are.
          var aCtor = a.constructor,
            bCtor = b.constructor;
          if (
            aCtor !== bCtor &&
              // Handle Object.create(x) cases
            'constructor' in a && 'constructor' in b && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
            _.isFunction(bCtor) && bCtor instanceof bCtor)
          ) {
            return false;
          }
          // Add the first object to the stack of traversed objects.
          aStack.push(a);
          bStack.push(b);
          var size, result;
          // Recursively compare objects and arrays.
          if (className === '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result = size === b.length;
            if (result) {
              // Deep compare the contents, ignoring non-numeric properties.
              while (size--) {
                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
              }
            }
          } else {
            // Deep compare objects.
            var keys = _.keys(a),
              key;
            size = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            result = _.keys(b).length === size;
            if (result) {
              while (size--) {
                // Deep compare each member
                key = keys[size];
                if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
              }
            }
          }
          // Remove the first object from the stack of traversed objects.
          aStack.pop();
          bStack.pop();
          return result;
        };

        // Perform a deep comparison to check if two objects are equal.
        _.isEqual = function (a, b) {
          return eq(a, b, [], []);
        };

        // Is a given array, string, or object empty?
        // An "empty" object has no enumerable own-properties.
        _.isEmpty = function (obj) {
          if (obj == null) return true;
          if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
          for (var key in obj)
            if (_.has(obj, key)) return false;
          return true;
        };

        // Is a given value a DOM element?
        _.isElement = function (obj) {
          return !!(obj && obj.nodeType === 1);
        };

        // Is a given value an array?
        // Delegates to ECMA5's native Array.isArray
        _.isArray = nativeIsArray || function (obj) {
            return toString.call(obj) === '[object Array]';
          };

        // Is a given variable an object?
        _.isObject = function (obj) {
          var type = typeof obj;
          return type === 'function' || type === 'object' && !!obj;
        };

        // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
        _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
          _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
          };
        });

        // Define a fallback version of the method in browsers (ahem, IE), where
        // there isn't any inspectable "Arguments" type.
        if (!_.isArguments(arguments)) {
          _.isArguments = function (obj) {
            return _.has(obj, 'callee');
          };
        }

        // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
        if (typeof / . / !== 'function') {
          _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
          };
        }

        // Is a given object a finite number?
        _.isFinite = function (obj) {
          return isFinite(obj) && !isNaN(parseFloat(obj));
        };

        // Is the given value `NaN`? (NaN is the only number which does not equal itself).
        _.isNaN = function (obj) {
          return _.isNumber(obj) && obj !== +obj;
        };

        // Is a given value a boolean?
        _.isBoolean = function (obj) {
          return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
        };

        // Is a given value equal to null?
        _.isNull = function (obj) {
          return obj === null;
        };

        // Is a given variable undefined?
        _.isUndefined = function (obj) {
          return obj === void 0;
        };

        // Shortcut function for checking if an object has a given property directly
        // on itself (in other words, not on a prototype).
        _.has = function (obj, key) {
          return obj != null && hasOwnProperty.call(obj, key);
        };

        // Utility Functions
        // -----------------

        // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
        // previous owner. Returns a reference to the Underscore object.
        _.noConflict = function () {
          root._ = previousUnderscore;
          return this;
        };

        // Keep the identity function around for default iteratees.
        _.identity = function (value) {
          return value;
        };

        _.constant = function (value) {
          return function () {
            return value;
          };
        };

        _.noop = function () {
        };

        _.property = function (key) {
          return function (obj) {
            return obj[key];
          };
        };

        // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
        _.matches = function (attrs) {
          var pairs = _.pairs(attrs),
            length = pairs.length;
          return function (obj) {
            if (obj == null) return !length;
            obj = new Object(obj);
            for (var i = 0; i < length; i++) {
              var pair = pairs[i],
                key = pair[0];
              if (pair[1] !== obj[key] || !(key in obj)) return false;
            }
            return true;
          };
        };

        // Run a function **n** times.
        _.times = function (n, iteratee, context) {
          var accum = Array(Math.max(0, n));
          iteratee = createCallback(iteratee, context, 1);
          for (var i = 0; i < n; i++) accum[i] = iteratee(i);
          return accum;
        };

        // Return a random integer between min and max (inclusive).
        _.random = function (min, max) {
          if (max == null) {
            max = min;
            min = 0;
          }
          return min + Math.floor(Math.random() * (max - min + 1));
        };

        // A (possibly faster) way to get the current timestamp as an integer.
        _.now = Date.now || function () {
            return new Date().getTime();
          };

        // List of HTML entities for escaping.
        var escapeMap = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '`': '&#x60;'
        };
        var unescapeMap = _.invert(escapeMap);

        // Functions for escaping and unescaping strings to/from HTML interpolation.
        var createEscaper = function (map) {
          var escaper = function (match) {
            return map[match];
          };
          // Regexes for identifying a key that needs to be escaped
          var source = '(?:' + _.keys(map).join('|') + ')';
          var testRegexp = RegExp(source);
          var replaceRegexp = RegExp(source, 'g');
          return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
          };
        };
        _.escape = createEscaper(escapeMap);
        _.unescape = createEscaper(unescapeMap);

        // If the value of the named `property` is a function then invoke it with the
        // `object` as context; otherwise, return it.
        _.result = function (object, property) {
          if (object == null) return void 0;
          var value = object[property];
          return _.isFunction(value) ? object[property]() : value;
        };

        // Generate a unique integer id (unique within the entire client session).
        // Useful for temporary DOM ids.
        var idCounter = 0;
        _.uniqueId = function (prefix) {
          var id = ++idCounter + '';
          return prefix ? prefix + id : id;
        };

        // By default, Underscore uses ERB-style template delimiters, change the
        // following template settings to use alternative delimiters.
        _.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g
        };

        // When customizing `templateSettings`, if you don't want to define an
        // interpolation, evaluation or escaping regex, we need one that is
        // guaranteed not to match.
        var noMatch = /(.)^/;

        // Certain characters need to be escaped so that they can be put into a
        // string literal.
        var escapes = {
          "'": "'",
          '\\': '\\',
          '\r': 'r',
          '\n': 'n',
          '\u2028': 'u2028',
          '\u2029': 'u2029'
        };

        var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

        var escapeChar = function (match) {
          return '\\' + escapes[match];
        };

        // JavaScript micro-templating, similar to John Resig's implementation.
        // Underscore templating handles arbitrary delimiters, preserves whitespace,
        // and correctly escapes quotes within interpolated code.
        // NB: `oldSettings` only exists for backwards compatibility.
        _.template = function (text, settings, oldSettings) {
          if (!settings && oldSettings) settings = oldSettings;
          settings = _.defaults({}, settings, _.templateSettings);

          // Combine delimiters into one regular expression via alternation.
          var matcher = RegExp([
              (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');

          // Compile the template source, escaping string literals appropriately.
          var index = 0;
          var source = "__p+='";
          text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
              source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
              source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
              source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offest.
            return match;
          });
          source += "';\n";

          // If a variable is not specified, place data values in local scope.
          if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

          source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

          try {
            var render = new Function(settings.variable || 'obj', '_', source);
          } catch (e) {
            e.source = source;
            throw e;
          }

          var template = function (data) {
            return render.call(this, data, _);
          };

          // Provide the compiled source as a convenience for precompilation.
          var argument = settings.variable || 'obj';
          template.source = 'function(' + argument + '){\n' + source + '}';

          return template;
        };

        // Add a "chain" function. Start chaining a wrapped Underscore object.
        _.chain = function (obj) {
          var instance = _(obj);
          instance._chain = true;
          return instance;
        };

        // OOP
        // ---------------
        // If Underscore is called as a function, it returns a wrapped object that
        // can be used OO-style. This wrapper holds altered versions of all the
        // underscore functions. Wrapped objects may be chained.

        // Helper function to continue chaining intermediate results.
        var result = function (obj) {
          return this._chain ? _(obj).chain() : obj;
        };

        // Add your own custom functions to the Underscore object.
        _.mixin = function (obj) {
          _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
              var args = [this._wrapped];
              push.apply(args, arguments);
              return result.call(this, func.apply(_, args));
            };
          });
        };

        // Add all of the Underscore functions to the wrapper object.
        _.mixin(_);

        // Add all mutator Array functions to the wrapper.
        _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
          var method = ArrayProto[name];
          _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
          };
        });

        // Add all accessor Array functions to the wrapper.
        _.each(['concat', 'join', 'slice'], function (name) {
          var method = ArrayProto[name];
          _.prototype[name] = function () {
            return result.call(this, method.apply(this._wrapped, arguments));
          };
        });

        // Extracts the result from a wrapped and chained object.
        _.prototype.value = function () {
          return this._wrapped;
        };

        // AMD registration happens at the end for compatibility with AMD loaders
        // that may not enforce next-turn semantics on modules. Even though general
        // practice for AMD registration is to be anonymous, underscore registers
        // as a named module because, like jQuery, it is a base library that is
        // popular enough to be bundled in a third party lib, but not be part of
        // an AMD load request. Those cases could generate an error when an
        // anonymous define() is called outside of a loader request.
        if (typeof define === 'function' && define.amd) {
          define('underscore', [], function () {
            return _;
          });
        }
      }.call(this));

    }, {}
  ]


  // Events (copier/coller de Clappr.js)
  ,
  58: [
    function (require, module, exports) {
      (function (global) {
        "use strict";
        var _ = require('underscore');
        var slice = Array.prototype.slice;
        var Events = function Events() {
        };
        ($traceurRuntime.createClass)(Events, {
          on: function (name, callback, context) {
            if (!eventsApi(this, 'on', name, [callback, context]) || !callback)
              return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({
              callback: callback,
              context: context,
              ctx: context || this
            });
            return this;
          },
          once: function (name, callback, context) {
            if (!eventsApi(this, 'once', name, [callback, context]) || !callback)
              return this;
            var self = this;
            var once = _.once(function () {
              self.off(name, once);
              callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
          },
          off: function (name, callback, context) {
            var retain,
              ev,
              events,
              names,
              i,
              l,
              j,
              k;
            if (!this._events || !eventsApi(this, 'off', name, [callback, context]))
              return this;
            if (!name && !callback && !context) {
              this._events = void 0;
              return this;
            }
            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
              name = names[i];
              events = this._events[name];
              if (events) {
                this._events[name] = retain = [];
                if (callback || context) {
                  for (j = 0, k = events.length; j < k; j++) {
                    ev = events[j];
                    if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                      retain.push(ev);
                    }
                  }
                }
                if (!retain.length)
                  delete this._events[name];
              }
            }
            return this;
          },
          trigger: function (name) {
            var klass = arguments[arguments.length - 1];
            if (!this._events)
              return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args))
              return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events)
              triggerEvents(events, args);
            if (allEvents)
              triggerEvents(allEvents, arguments);
            return this;
          },
          stopListening: function (obj, name, callback) {
            var listeningTo = this._listeningTo;
            if (!listeningTo)
              return this;
            var remove = !name && !callback;
            if (!callback && typeof name === 'object')
              callback = this;
            if (obj)
              (listeningTo = {})[obj._listenId] = obj;
            for (var id in listeningTo) {
              obj = listeningTo[id];
              obj.off(name, callback, this);
              if (remove || _.isEmpty(obj._events))
                delete this._listeningTo[id];
            }
            return this;
          }
        }, {});
        var eventSplitter = /\s+/;
        var eventsApi = function (obj, action, name, rest) {
          if (!name)
            return true;
          if (typeof name === 'object') {
            for (var key in name) {
              obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
          }
          if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0,
                   l = names.length; i < l; i++) {
              obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
          }
          return true;
        };
        var triggerEvents = function (events, args) {
          var ev,
            i = -1,
            l = events.length,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2];
          switch (args.length) {
            case 0:
              while (++i < l)
                (ev = events[i]).callback.call(ev.ctx);
              return;
            case 1:
              while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1);
              return;
            case 2:
              while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1, a2);
              return;
            case 3:
              while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
              return;
            default:
              while (++i < l)
                (ev = events[i]).callback.apply(ev.ctx, args);
              return;
          }
        };
        var listenMethods = {
          listenTo: 'on',
          listenToOnce: 'once'
        };
        _.each(listenMethods, function (implementation, method) {
          Events.prototype[method] = function (obj, name, callback) {
            var listeningTo = this._listeningTo || (this._listeningTo = {});
            var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
            listeningTo[id] = obj;
            if (!callback && typeof name === 'object')
              callback = this;
            obj[implementation](name, callback, this);
            return this;
          };
        });
        module.exports = Events;


      }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "underscore": 57
    }
  ]




  // Mediator (copier/coller de Clappr.js)
  ,
  59: [
    function (require, module, exports) {
      "use strict";
      var Events = require('../base/events');
      var events = new Events();
      var Mediator = function Mediator() {
      };
      ($traceurRuntime.createClass)(Mediator, {}, {});
      Mediator.on = function (name, callback, context) {
        events.on(name, callback, context);
        return;
      };
      Mediator.once = function (name, callback, context) {
        events.once(name, callback, context);
        return;
      };
      Mediator.off = function (name, callback, context) {
        events.off(name, callback, context);
        return;
      };
      Mediator.trigger = function (name, opts) {
        events.trigger(name, opts);
        return;
      };
      Mediator.stopListening = function (obj, name, callback) {
        events.stopListening(obj, name, callback);
        return;
      };
      module.exports = Mediator;


    }, {
      "../base/events": 58
    }
  ]





  // BaseObject (copier/coller de Clappr.js)
  ,
  "base_object": [
    function (require, module, exports) {
      module.exports = require('2HNVgz');
    }, {}
  ],
  "2HNVgz": [
    function (require, module, exports) {
      "use strict";
      var _ = require('underscore');
      //var extend = require('./utils').extend;
      var Events = require('./events');
      var pluginOptions = ['container'];
      var BaseObject = function BaseObject(options) {
        this.uniqueId = _.uniqueId('o');
        options || (options = {});
        _.extend(this, _.pick(options, pluginOptions));
      };
      ($traceurRuntime.createClass)(BaseObject, {}, {}, Events);
      //BaseObject.extend = extend;
      module.exports = BaseObject;


    }, {
      "./events": 58,
      /*"./utils":24,*/ "underscore": 57
    }
  ]


}, {}, [5, 1])
