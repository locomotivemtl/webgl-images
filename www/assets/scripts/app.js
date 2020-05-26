(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var _default =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.mAttr = 'data-' + options.dataName;
      this.mCaptureEvents = ['mouseenter', 'mouseleave'];
      this.el = options.el;
    }

    _createClass(_default, [{
      key: "mInit",
      value: function mInit(modules) {
        var _this = this;

        this.modules = modules;
        this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this.mAddEvent(event);
          });
        }
      }
    }, {
      key: "mUpdate",
      value: function mUpdate(modules) {
        this.modules = modules;
      }
    }, {
      key: "mDestroy",
      value: function mDestroy() {
        var _this2 = this;

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this2.mRemoveEvent(event);
          });
        }
      }
    }, {
      key: "mAddEvent",
      value: function mAddEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.addEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mRemoveEvent",
      value: function mRemoveEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.removeEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mCheckEventTarget",
      value: function mCheckEventTarget(e) {
        var event = this.events[e.type];

        if (typeof event === "string") {
          this[event](e);
        } else {
          var data = '[' + this.mAttr + ']';
          var target = e.target;

          if (this.mCaptureEvents.includes(e.type)) {
            if (target.matches(data)) {
              this.mCallEventMethod(e, event, target);
            }
          } else {
            while (target && target !== document) {
              if (target.matches(data)) {
                if (this.mCallEventMethod(e, event, target) != 'undefined') {
                  break;
                }
              }

              target = target.parentNode;
            }
          }
        }
      }
    }, {
      key: "mCallEventMethod",
      value: function mCallEventMethod(e, event, target) {
        var name = target.getAttribute(this.mAttr);

        if (event.hasOwnProperty(name)) {
          var method = event[name];
          Object.defineProperty(e, 'currentTarget', {
            value: target
          });
          Object.defineProperty(e, 'curTarget', {
            value: target
          }); // For IE 11

          this[method](e);
        }
      }
    }, {
      key: "$",
      value: function $(query, context) {
        var classIndex = query.indexOf('.');
        var idIndex = query.indexOf('#');
        var attrIndex = query.indexOf('[');
        var indexes = [classIndex, idIndex, attrIndex].filter(function (index) {
          return index != -1;
        });
        var index = false;
        var name = query;
        var more = '';
        var parent = this.el;

        if (indexes.length) {
          index = Math.min.apply(Math, _toConsumableArray(indexes));
          name = query.slice(0, index);
          more = query.slice(index);
        }

        if (_typeof(context) == 'object') {
          parent = context;
        }

        return parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);
      }
    }, {
      key: "parent",
      value: function parent(query, context) {
        var data = '[' + this.mAttr + '=' + query + ']';
        var parent = context;

        while (parent && parent !== document) {
          if (parent.matches(data)) {
            return parent;
          }

          parent = parent.parentNode;
        }
      }
    }, {
      key: "getData",
      value: function getData(name, context) {
        var target = context || this.el;
        return target.getAttribute(this.mAttr + '-' + name);
      }
    }, {
      key: "setData",
      value: function setData(name, value, context) {
        var target = context || this.el;
        return target.setAttribute(this.mAttr + '-' + name, value);
      }
    }, {
      key: "call",
      value: function call(func, args, mod, id) {
        var _this3 = this;

        if (args && !mod) {
          mod = args;
          args = false;
        }

        if (this.modules[mod]) {
          if (id) {
            if (this.modules[mod][id]) {
              this.modules[mod][id][func](args);
            }
          } else {
            Object.keys(this.modules[mod]).forEach(function (id) {
              _this3.modules[mod][id][func](args);
            });
          }
        }
      }
    }, {
      key: "init",
      value: function init() {}
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);

    return _default;
  }();

  var _default$1 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.app;
      this.modules = options.modules;
      this.currentModules = {};
      this.activeModules = {};
      this.newModules = {};
      this.moduleId = 0;
    }

    _createClass(_default, [{
      key: "init",
      value: function init(app, scope) {
        var _this = this;

        var container = scope || document;
        var elements = container.querySelectorAll('*');

        if (app && !this.app) {
          this.app = app;
        }

        this.activeModules['app'] = {
          'app': this.app
        };
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var moduleExists = false;
              var dataName = i.name.split('-').splice(2);

              var moduleName = _this.toCamel(dataName);

              if (_this.modules[moduleName]) {
                moduleExists = true;
              } else if (_this.modules[_this.toUpper(moduleName)]) {
                moduleName = _this.toUpper(moduleName);
                moduleExists = true;
              }

              if (moduleExists) {
                var options = {
                  el: el,
                  name: moduleName,
                  dataName: dataName.join('-')
                };
                var module = new _this.modules[moduleName](options);
                var id = i.value;

                if (!id) {
                  _this.moduleId++;
                  id = 'm' + _this.moduleId;
                  el.setAttribute(i.name, id);
                }

                _this.addActiveModule(moduleName, id, module);

                var moduleId = moduleName + '-' + id;

                if (scope) {
                  _this.newModules[moduleId] = module;
                } else {
                  _this.currentModules[moduleId] = module;
                }
              }
            }
          });
        });
        Object.entries(this.currentModules).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              id = _ref2[0],
              module = _ref2[1];

          if (scope) {
            var split = id.split('-');
            var moduleName = split.shift();
            var moduleId = split.pop();

            _this.addActiveModule(moduleName, moduleId, module);
          } else {
            _this.initModule(module);
          }
        });
      }
    }, {
      key: "initModule",
      value: function initModule(module) {
        module.mInit(this.activeModules);
        module.init();
      }
    }, {
      key: "addActiveModule",
      value: function addActiveModule(name, id, module) {
        if (this.activeModules[name]) {
          Object.assign(this.activeModules[name], _defineProperty({}, id, module));
        } else {
          this.activeModules[name] = _defineProperty({}, id, module);
        }
      }
    }, {
      key: "update",
      value: function update(scope) {
        var _this2 = this;

        this.init(this.app, scope);
        Object.entries(this.currentModules).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              id = _ref4[0],
              module = _ref4[1];

          module.mUpdate(_this2.activeModules);
        });
        Object.entries(this.newModules).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              id = _ref6[0],
              module = _ref6[1];

          _this2.initModule(module);
        });
        Object.assign(this.currentModules, this.newModules);
      }
    }, {
      key: "destroy",
      value: function destroy(scope) {
        if (scope) {
          this.destroyScope(scope);
        } else {
          this.destroyModules();
        }
      }
    }, {
      key: "destroyScope",
      value: function destroyScope(scope) {
        var _this3 = this;

        var elements = scope.querySelectorAll('*');
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var id = i.value;
              var dataName = i.name.split('-').splice(2);
              var moduleName = _this3.toCamel(dataName) + '-' + id;
              var moduleExists = false;

              if (_this3.currentModules[moduleName]) {
                moduleExists = true;
              } else if (_this3.currentModules[_this3.toUpper(moduleName)]) {
                moduleName = _this3.toUpper(moduleName);
                moduleExists = true;
              }

              if (moduleExists) {
                _this3.destroyModule(_this3.currentModules[moduleName]);

                delete _this3.currentModules[moduleName];
              }
            }
          });
        });
        this.activeModules = {};
        this.newModules = {};
      }
    }, {
      key: "destroyModules",
      value: function destroyModules() {
        var _this4 = this;

        Object.entries(this.currentModules).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              id = _ref8[0],
              module = _ref8[1];

          _this4.destroyModule(module);
        });
        this.currentModules = [];
      }
    }, {
      key: "destroyModule",
      value: function destroyModule(module) {
        module.mDestroy();
        module.destroy();
      }
    }, {
      key: "toCamel",
      value: function toCamel(arr) {
        var _this5 = this;

        return arr.reduce(function (a, b) {
          return a + _this5.toUpper(b);
        });
      }
    }, {
      key: "toUpper",
      value: function toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }]);

    return _default;
  }();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var _default$2 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck$2(this, _default);

      this.defaults = {
        name: 'load',
        loadingClass: 'is-loading',
        loadedClass: 'is-loaded',
        readyClass: 'is-ready',
        transitionsPrefix: 'is-',
        transitionsHistory: true,
        enterDelay: 0,
        exitDelay: 0,
        loadedDelay: 0,
        isLoaded: false,
        isEntered: false,
        isUrl: false,
        transitionContainer: null
      };
      Object.assign(this, this.defaults, options);
      this.options = options;
      this.namespace = 'modular';
      this.html = document.documentElement;
      this.href = window.location.href;
      this.container = 'data-' + this.name + '-container';
      this.subContainer = false;
      this.prevTransition = null;
      this.loadAttributes = ['src', 'srcset', 'style', 'href'];
      this.isInserted = false;
      this.isLoading = false;
      this.enterTimeout = false;
      this.controller = new AbortController();
      this.classContainer = this.html;
      this.isChrome = navigator.userAgent.indexOf("Chrome") != -1 ? true : false;
      this.init();
    }

    _createClass$2(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        window.addEventListener('popstate', function (e) {
          return _this.checkState(e);
        }, false);
        this.html.addEventListener('click', function (e) {
          return _this.checkClick(e);
        }, false);
        this.loadEls(document);
      }
    }, {
      key: "checkClick",
      value: function checkClick(e) {
        if (!e.ctrlKey && !e.metaKey) {
          var target = e.target;

          while (target && target !== document) {
            if (target.matches('a') && target.getAttribute('download') == null) {
              var href = target.getAttribute('href');

              if (!href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                this.reset();
                this.getClickOptions(target);
              }

              break;
            }

            target = target.parentNode;
          }
        }
      }
    }, {
      key: "checkState",
      value: function checkState() {
        this.reset();
        this.getStateOptions();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.isLoading) {
          this.controller.abort();
          this.isLoading = false;
          this.controller = new AbortController();
        }

        window.clearTimeout(this.enterTimeout);

        if (this.isInserted) {
          this.removeContainer();
        }

        this.classContainer = this.html;
        Object.assign(this, this.defaults, this.options);
      }
    }, {
      key: "getClickOptions",
      value: function getClickOptions(link) {
        this.transition = link.getAttribute('data-' + this.name);
        this.isUrl = link.getAttribute('data-' + this.name + '-url');
        var href = link.getAttribute('href');
        var target = link.getAttribute('target');

        if (target == '_blank') {
          window.open(href, '_blank');
          return;
        }

        if (this.transition == 'false') {
          window.location = href;
          return;
        }

        this.setOptions(href, true);
      }
    }, {
      key: "getStateOptions",
      value: function getStateOptions() {
        if (this.transitionsHistory) {
          this.transition = history.state;
        } else {
          this.transition = false;
        }

        var href = window.location.href;
        this.setOptions(href);
      }
    }, {
      key: "goTo",
      value: function goTo(href, transition, isUrl) {
        this.reset();
        this.transition = transition;
        this.isUrl = isUrl;
        this.setOptions(href, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(href, push) {
        var container = '[' + this.container + ']';
        var oldContainer;

        if (this.transition && this.transition != 'true') {
          this.transitionContainer = '[' + this.container + '="' + this.transition + '"]';
          this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass;
          this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass;
          this.readyClass = this.transitions[this.transition].readyClass || this.readyClass;
          this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix;
          this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay;
          this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay;
          this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay;
          oldContainer = document.querySelector(this.transitionContainer);
        }

        if (oldContainer) {
          container = this.transitionContainer;
          this.oldContainer = oldContainer;
          this.classContainer = this.oldContainer.parentNode;

          if (!this.subContainer) {
            history.replaceState(this.transition, null, this.href);
          }

          this.subContainer = true;
        } else {
          this.oldContainer = document.querySelector(container);

          if (this.subContainer) {
            history.replaceState(this.prevTransition, null, this.href);
          }

          this.subContainer = false;
        }

        this.href = href;
        this.parentContainer = this.oldContainer.parentNode;

        if (this.isUrl === '' || this.isUrl != null && this.isUrl != 'false' && this.isUrl != false) {
          history.pushState(this.transition, null, href);
        } else {
          this.oldContainer.classList.add('is-old');
          this.setLoading();
          this.startEnterDelay();
          this.loadHref(href, container, push);
        }
      }
    }, {
      key: "setLoading",
      value: function setLoading() {
        this.classContainer.classList.remove(this.loadedClass, this.readyClass);
        this.classContainer.classList.add(this.loadingClass);
        this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition);

        if (this.transition) {
          this.classContainer.classList.add(this.transitionsPrefix + this.transition);
        }

        if (!this.subContainer) {
          this.prevTransition = this.transition;
        }

        var loadingEvent = new Event(this.namespace + 'loading');
        window.dispatchEvent(loadingEvent);
      }
    }, {
      key: "startEnterDelay",
      value: function startEnterDelay() {
        var _this2 = this;

        this.enterTimeout = window.setTimeout(function () {
          _this2.isEntered = true;

          if (_this2.isLoaded) {
            _this2.transitionContainers();
          }
        }, this.enterDelay);
      }
    }, {
      key: "loadHref",
      value: function loadHref(href, container, push) {
        var _this3 = this;

        this.isLoading = true;
        var signal = this.controller.signal;
        fetch(href, {
          signal: signal
        }).then(function (response) {
          return response.text();
        }).then(function (data) {
          var parser = new DOMParser();
          _this3.data = parser.parseFromString(data, 'text/html');
          _this3.newContainer = _this3.data.querySelector(container);

          _this3.newContainer.classList.add('is-new');

          _this3.parentNewContainer = _this3.newContainer.parentNode;

          _this3.hideContainer();

          _this3.parentContainer.insertBefore(_this3.newContainer, _this3.oldContainer);

          _this3.isInserted = true;

          _this3.setSvgs();

          _this3.isLoaded = true;

          if (_this3.isEntered) {
            _this3.transitionContainers();
          }

          _this3.loadEls(_this3.newContainer);

          _this3.isLoading = false;
        })["catch"](function (err) {
          console.log(err);
        });

        if (push) {
          history.pushState(this.transition, null, href);
        }
      }
    }, {
      key: "transitionContainers",
      value: function transitionContainers() {
        var _this4 = this;

        this.setAttributes();
        this.showContainer();
        this.setLoaded();
        setTimeout(function () {
          _this4.removeContainer();

          _this4.setReady();
        }, this.exitDelay);
      }
    }, {
      key: "setSvgs",
      value: function setSvgs() {
        if (this.isChrome) {
          var svgs = this.newContainer.querySelectorAll('use');

          if (svgs.length) {
            svgs.forEach(function (svg) {
              var xhref = svg.getAttribute('xlink:href');

              if (xhref) {
                svg.parentNode.innerHTML = '<use xlink:href="' + xhref + '"></use>';
              } else {
                var href = svg.getAttribute('href');
                if (href) svg.parentNode.innerHTML = '<use href="' + href + '"></use>';
              }
            });
          }
        }
      }
    }, {
      key: "setAttributes",
      value: function setAttributes() {
        var _this5 = this;

        var title = this.data.getElementsByTagName('title')[0];
        var newDesc = this.data.head.querySelector('meta[name="description"]');
        var oldDesc = document.head.querySelector('meta[name="description"]');
        var container;
        var newContainer;

        if (this.subContainer) {
          newContainer = this.parentNewContainer;
          container = document.querySelector(this.transitionContainer).parentNode;
        } else {
          newContainer = this.data.querySelector('html');
          container = document.querySelector('html');
        }

        var datas = Object.assign({}, newContainer.dataset);
        if (title) document.title = title.innerHTML;
        if (oldDesc && newDesc) oldDesc.setAttribute('content', newDesc.getAttribute('content'));

        if (datas) {
          Object.entries(datas).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            container.setAttribute('data-' + _this5.toDash(key), val);
          });
        }
      }
    }, {
      key: "toDash",
      value: function toDash(str) {
        return str.split(/(?=[A-Z])/).join('-').toLowerCase();
      }
    }, {
      key: "hideContainer",
      value: function hideContainer() {
        this.newContainer.style.visibility = 'hidden';
        this.newContainer.style.height = 0;
        this.newContainer.style.overflow = 'hidden';
      }
    }, {
      key: "showContainer",
      value: function showContainer() {
        this.newContainer.style.visibility = '';
        this.newContainer.style.height = '';
        this.newContainer.style.overflow = '';
      }
    }, {
      key: "loadEls",
      value: function loadEls(container) {
        var _this6 = this;

        var promises = [];
        this.loadAttributes.forEach(function (attr) {
          var data = 'data-' + _this6.name + '-' + attr;
          var els = container.querySelectorAll('[' + data + ']');

          if (els.length) {
            els.forEach(function (el) {
              var elData = el.getAttribute(data);
              el.setAttribute(attr, elData);

              if (attr == 'src' || attr == 'srcset') {
                var promise = new Promise(function (resolve) {
                  el.onload = function () {
                    return resolve(el);
                  };
                });
                promises.push(promise);
              }
            });
          }
        });
        Promise.all(promises).then(function (val) {
          var imagesEvent = new Event(_this6.namespace + 'images');
          window.dispatchEvent(imagesEvent);
        });
      }
    }, {
      key: "setLoaded",
      value: function setLoaded() {
        var _this7 = this;

        this.classContainer.classList.remove(this.loadingClass);
        setTimeout(function () {
          _this7.classContainer.classList.add(_this7.loadedClass);
        }, this.loadedDelay);
        var loadedEvent = new Event(this.namespace + 'loaded');
        window.dispatchEvent(loadedEvent);
      }
    }, {
      key: "removeContainer",
      value: function removeContainer() {
        this.parentContainer.removeChild(this.oldContainer);
        this.newContainer.classList.remove('is-new');
        this.isInserted = false;
      }
    }, {
      key: "setReady",
      value: function setReady() {
        this.classContainer.classList.add(this.readyClass);
        var readyEvent = new Event(this.namespace + 'ready');
        window.dispatchEvent(readyEvent);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        var _this8 = this;

        window.addEventListener(this.namespace + event, function () {
          switch (event) {
            case 'loading':
              return func(_this8.transition, _this8.oldContainer);

            case 'loaded':
              return func(_this8.transition, _this8.oldContainer, _this8.newContainer);

            case 'ready':
              return func(_this8.transition, _this8.newContainer);

            default:
              return func();
          }
        }, false);
      }
    }]);

    return _default;
  }();

  var _default$3 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        var load = new _default$2({
          enterDelay: 0,
          transitions: {
            customTransition: {}
          }
        });
        load.on('loaded', function (transition, oldContainer, newContainer) {
          _this.call('destroy', oldContainer, 'app');

          _this.call('update', newContainer, 'app');
        });
      }
    }]);

    return _default;
  }(_default);

  /* locomotive-scroll v3.2.7 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _superPropBase$1(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$1(object);
      if (object === null) break;
    }

    return object;
  }

  function _get$1(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$1 = Reflect.get;
    } else {
      _get$1 = function _get(target, property, receiver) {
        var base = _superPropBase$1(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$1(target, property, receiver || target);
  }

  var defaults = {
    el: document,
    elMobile: document,
    name: 'scroll',
    offset: 0,
    repeat: false,
    smooth: false,
    smoothMobile: false,
    direction: 'vertical',
    inertia: 1,
    "class": 'is-inview',
    scrollbarClass: 'c-scrollbar',
    scrollingClass: 'has-scroll-scrolling',
    draggingClass: 'has-scroll-dragging',
    smoothClass: 'has-scroll-smooth',
    initClass: 'has-scroll-init',
    getSpeed: false,
    getDirection: false,
    firefoxMultiplier: 50,
    touchMultiplier: 2
  };

  var _default$4 =
  /*#__PURE__*/
  function () {
    function _default() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$3(this, _default);

      window.scrollTo(0, 0);
      Object.assign(this, defaults, options);
      this.namespace = 'locomotive';
      this.html = document.documentElement;
      this.windowHeight = window.innerHeight;
      this.windowMiddle = this.windowHeight / 2;
      this.els = [];
      this.listeners = {};
      this.hasScrollTicking = false;
      this.hasCallEventSet = false;
      this.checkScroll = this.checkScroll.bind(this);
      this.checkResize = this.checkResize.bind(this);
      this.checkEvent = this.checkEvent.bind(this);
      this.instance = {
        scroll: {
          x: 0,
          y: 0
        },
        limit: this.html.offsetHeight
      };

      if (this.getDirection) {
        this.instance.direction = null;
      }

      if (this.getDirection) {
        this.instance.speed = 0;
      }

      this.html.classList.add(this.initClass);
      window.addEventListener('resize', this.checkResize, false);
    }

    _createClass$3(_default, [{
      key: "init",
      value: function init() {
        this.initEvents();
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        this.dispatchScroll();
      }
    }, {
      key: "checkResize",
      value: function checkResize() {}
    }, {
      key: "initEvents",
      value: function initEvents() {
        var _this = this;

        this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
        this.setScrollTo = this.setScrollTo.bind(this);
        this.scrollToEls.forEach(function (el) {
          el.addEventListener('click', _this.setScrollTo, false);
        });
      }
    }, {
      key: "setScrollTo",
      value: function setScrollTo(event) {
        event.preventDefault();
        this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute('href'), event.currentTarget.getAttribute("data-".concat(this.name, "-offset")));
      }
    }, {
      key: "addElements",
      value: function addElements() {}
    }, {
      key: "detectElements",
      value: function detectElements(hasCallEventSet) {
        var _this2 = this;

        var scrollTop = this.instance.scroll.y;
        var scrollBottom = scrollTop + this.windowHeight;
        this.els.forEach(function (el, i) {
          if (el && (!el.inView || hasCallEventSet)) {
            if (scrollBottom >= el.top && scrollTop < el.bottom) {
              _this2.setInView(el, i);
            }
          }

          if (el && el.inView) {
            if (scrollBottom < el.top || scrollTop > el.bottom) {
              _this2.setOutOfView(el, i);
            }
          }
        });
        this.els = this.els.filter(function (current, i) {
          return current !== null;
        });
        this.hasScrollTicking = false;
      }
    }, {
      key: "setInView",
      value: function setInView(current, i) {
        this.els[i].inView = true;
        current.el.classList.add(current["class"]);

        if (current.call && this.hasCallEventSet) {
          this.dispatchCall(current, 'enter');

          if (!current.repeat) {
            this.els[i].call = false;
          }
        }

        if (!current.repeat && !current.speed && !current.sticky) {
          if (!current.call || current.call && this.hasCallEventSet) {
            this.els[i] = null;
          }
        }
      }
    }, {
      key: "setOutOfView",
      value: function setOutOfView(current, i) {
        if (current.repeat || current.speed !== undefined) {
          this.els[i].inView = false;
        }

        if (current.call && this.hasCallEventSet) {
          this.dispatchCall(current, 'exit');
        }

        if (current.repeat) {
          current.el.classList.remove(current["class"]);
        }
      }
    }, {
      key: "dispatchCall",
      value: function dispatchCall(current, way) {
        this.callWay = way;
        this.callValue = current.call.split(',').map(function (item) {
          return item.trim();
        });
        this.callObj = current;
        if (this.callValue.length == 1) this.callValue = this.callValue[0];
        var callEvent = new Event(this.namespace + 'call');
        this.el.dispatchEvent(callEvent);
      }
    }, {
      key: "dispatchScroll",
      value: function dispatchScroll() {
        var scrollEvent = new Event(this.namespace + 'scroll');
        this.el.dispatchEvent(scrollEvent);
      }
    }, {
      key: "setEvents",
      value: function setEvents(event, func) {
        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }

        var list = this.listeners[event];
        list.push(func);

        if (list.length === 1) {
          this.el.addEventListener(this.namespace + event, this.checkEvent, false);
        }

        if (event === 'call') {
          this.hasCallEventSet = true;
          this.detectElements(true);
        }
      }
    }, {
      key: "unsetEvents",
      value: function unsetEvents(event, func) {
        if (!this.listeners[event]) return;
        var list = this.listeners[event];
        var index = list.indexOf(func);
        if (index < 0) return;
        list.splice(index, 1);

        if (list.index === 0) {
          this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
        }
      }
    }, {
      key: "checkEvent",
      value: function checkEvent(event) {
        var _this3 = this;

        var name = event.type.replace(this.namespace, '');
        var list = this.listeners[name];
        if (!list || list.length === 0) return;
        list.forEach(function (func) {
          switch (name) {
            case 'scroll':
              return func(_this3.instance);

            case 'call':
              return func(_this3.callValue, _this3.callWay, _this3.callObj);

            default:
              return func();
          }
        });
      }
    }, {
      key: "startScroll",
      value: function startScroll() {}
    }, {
      key: "stopScroll",
      value: function stopScroll() {}
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.instance.scroll = {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this4 = this;

        window.removeEventListener('resize', this.checkResize, false);
        Object.keys(this.listeners).forEach(function (event) {
          _this4.el.removeEventListener(_this4.namespace + event, _this4.checkEvent, false);
        });
        this.listeners = {};
        this.scrollToEls.forEach(function (el) {
          el.removeEventListener('click', _this4.setScrollTo, false);
        });
      }
    }]);

    return _default;
  }();

  var _default$1$1 =
  /*#__PURE__*/
  function (_Core) {
    _inherits$1(_default, _Core);

    function _default() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$3(this, _default);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(_default).call(this, options));
      window.addEventListener('scroll', _this.checkScroll, false);
      return _this;
    }

    _createClass$3(_default, [{
      key: "init",
      value: function init() {
        this.instance.scroll.y = window.pageYOffset;
        this.addElements();
        this.detectElements();

        _get$1(_getPrototypeOf$1(_default.prototype), "init", this).call(this);
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        var _this2 = this;

        _get$1(_getPrototypeOf$1(_default.prototype), "checkScroll", this).call(this);

        this.instance.scroll.y = window.pageYOffset;

        if (this.els.length) {
          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              _this2.detectElements();
            });
            this.hasScrollTicking = true;
          }
        }
      }
    }, {
      key: "checkResize",
      value: function checkResize() {
        var _this3 = this;

        if (this.els.length) {
          this.windowHeight = window.innerHeight;

          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              _this3.updateElements();
            });
            this.hasScrollTicking = true;
          }
        }
      }
    }, {
      key: "addElements",
      value: function addElements() {
        var _this4 = this;

        this.els = [];
        var els = this.el.querySelectorAll('[data-' + this.name + ']');
        els.forEach(function (el, i) {
          var cl = el.dataset[_this4.name + 'Class'] || _this4["class"];

          var top = el.getBoundingClientRect().top + _this4.instance.scroll.y;

          var bottom = top + el.offsetHeight;
          var offset = parseInt(el.dataset[_this4.name + 'Offset']) || parseInt(_this4.offset);
          var repeat = el.dataset[_this4.name + 'Repeat'];
          var call = el.dataset[_this4.name + 'Call'];

          if (repeat == 'false') {
            repeat = false;
          } else if (repeat != undefined) {
            repeat = true;
          } else {
            repeat = _this4.repeat;
          }

          var mappedEl = {
            el: el,
            id: i,
            "class": cl,
            top: top + offset,
            bottom: bottom,
            offset: offset,
            repeat: repeat,
            inView: false,
            call: call
          };

          _this4.els.push(mappedEl);
        });
      }
    }, {
      key: "updateElements",
      value: function updateElements() {
        var _this5 = this;

        this.els.forEach(function (el, i) {
          var top = el.el.getBoundingClientRect().top + _this5.instance.scroll.y;

          var bottom = top + el.el.offsetHeight;
          _this5.els[i].top = top + el.offset;
          _this5.els[i].bottom = bottom;
        });
        this.hasScrollTicking = false;
      }
      /**
       * Scroll to a desired target.
       *
       * @param  {object} options
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(targetOption, offsetOption) {
        var target;
        var offset = offsetOption ? parseInt(offsetOption) : 0;

        if (typeof targetOption === 'string') {
          if (targetOption === 'top') {
            target = this.html;
          } else if (targetOption === 'bottom') {
            offset = this.html.offsetHeight - window.innerHeight;
          } else {
            target = document.querySelectorAll(targetOption)[0];
          }
        } else if (!targetOption.target) {
          target = targetOption;
        }

        if (target) {
          offset = target.getBoundingClientRect().top + offset;
        }

        offset += this.instance.scroll.y;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }, {
      key: "update",
      value: function update() {
        this.addElements();
        this.detectElements();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get$1(_getPrototypeOf$1(_default.prototype), "destroy", this).call(this);

        window.removeEventListener('scroll', this.checkScroll, false);
      }
    }]);

    return _default;
  }(_default$4);

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  var tinyEmitter = E;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var lethargy = createCommonjsModule(function (module, exports) {
  // Generated by CoffeeScript 1.9.2
  (function() {
    var root;

    root =  exports !== null ? exports : this;

    root.Lethargy = (function() {
      function Lethargy(stability, sensitivity, tolerance, delay) {
        this.stability = stability != null ? Math.abs(stability) : 8;
        this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
        this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
        this.delay = delay != null ? delay : 150;
        this.lastUpDeltas = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
        this.lastDownDeltas = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
        this.deltasTimestamp = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
      }

      Lethargy.prototype.check = function(e) {
        var lastDelta;
        e = e.originalEvent || e;
        if (e.wheelDelta != null) {
          lastDelta = e.wheelDelta;
        } else if (e.deltaY != null) {
          lastDelta = e.deltaY * -40;
        } else if ((e.detail != null) || e.detail === 0) {
          lastDelta = e.detail * -40;
        }
        this.deltasTimestamp.push(Date.now());
        this.deltasTimestamp.shift();
        if (lastDelta > 0) {
          this.lastUpDeltas.push(lastDelta);
          this.lastUpDeltas.shift();
          return this.isInertia(1);
        } else {
          this.lastDownDeltas.push(lastDelta);
          this.lastDownDeltas.shift();
          return this.isInertia(-1);
        }
      };

      Lethargy.prototype.isInertia = function(direction) {
        var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
        lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
        if (lastDeltas[0] === null) {
          return direction;
        }
        if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
          return false;
        }
        lastDeltasOld = lastDeltas.slice(0, this.stability);
        lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
        oldSum = lastDeltasOld.reduce(function(t, s) {
          return t + s;
        });
        newSum = lastDeltasNew.reduce(function(t, s) {
          return t + s;
        });
        oldAverage = oldSum / lastDeltasOld.length;
        newAverage = newSum / lastDeltasNew.length;
        if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
          return direction;
        } else {
          return false;
        }
      };

      Lethargy.prototype.showLastUpDeltas = function() {
        return this.lastUpDeltas;
      };

      Lethargy.prototype.showLastDownDeltas = function() {
        return this.lastDownDeltas;
      };

      return Lethargy;

    })();

  }).call(commonjsGlobal);
  });

  var support = (function getSupport() {
      return {
          hasWheelEvent: 'onwheel' in document,
          hasMouseWheelEvent: 'onmousewheel' in document,
          hasTouch: 'ontouchstart' in document,
          hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
          hasPointer: !!window.navigator.msPointerEnabled,
          hasKeyDown: 'onkeydown' in document,
          isFirefox: navigator.userAgent.indexOf('Firefox') > -1
      };
  })();

  var toString = Object.prototype.toString,
      hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  var bindallStandalone = function(object) {
      if(!object) return console.warn('bindAll requires at least one argument.');

      var functions = Array.prototype.slice.call(arguments, 1);

      if (functions.length === 0) {

          for (var method in object) {
              if(hasOwnProperty$1.call(object, method)) {
                  if(typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") {
                      functions.push(method);
                  }
              }
          }
      }

      for(var i = 0; i < functions.length; i++) {
          var f = functions[i];
          object[f] = bind(object[f], object);
      }
  };

  /*
      Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
      bindAll is only needed for events binding so no need to make slow fixes for constructor
      or partial application.
  */
  function bind(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }

  var Lethargy = lethargy.Lethargy;



  var EVT_ID = 'virtualscroll';

  var src = VirtualScroll;

  var keyCodes = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32
  };

  function VirtualScroll(options) {
      bindallStandalone(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');

      this.el = window;
      if (options && options.el) {
          this.el = options.el;
          delete options.el;
      }
      this.options = objectAssign({
          mouseMultiplier: 1,
          touchMultiplier: 2,
          firefoxMultiplier: 15,
          keyStep: 120,
          preventTouch: false,
          unpreventTouchClass: 'vs-touchmove-allowed',
          limitInertia: false,
          useKeyboard: true,
          useTouch: true
      }, options);

      if (this.options.limitInertia) this._lethargy = new Lethargy();

      this._emitter = new tinyEmitter();
      this._event = {
          y: 0,
          x: 0,
          deltaX: 0,
          deltaY: 0
      };
      this.touchStartX = null;
      this.touchStartY = null;
      this.bodyTouchAction = null;

      if (this.options.passive !== undefined) {
          this.listenerOptions = {passive: this.options.passive};
      }
  }

  VirtualScroll.prototype._notify = function(e) {
      var evt = this._event;
      evt.x += evt.deltaX;
      evt.y += evt.deltaY;

     this._emitter.emit(EVT_ID, {
          x: evt.x,
          y: evt.y,
          deltaX: evt.deltaX,
          deltaY: evt.deltaY,
          originalEvent: e
     });
  };

  VirtualScroll.prototype._onWheel = function(e) {
      var options = this.options;
      if (this._lethargy && this._lethargy.check(e) === false) return;
      var evt = this._event;

      // In Chrome and in Firefox (at least the new one)
      evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
      evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

      // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
      // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
      if(support.isFirefox && e.deltaMode == 1) {
          evt.deltaX *= options.firefoxMultiplier;
          evt.deltaY *= options.firefoxMultiplier;
      }

      evt.deltaX *= options.mouseMultiplier;
      evt.deltaY *= options.mouseMultiplier;

      this._notify(e);
  };

  VirtualScroll.prototype._onMouseWheel = function(e) {
      if (this.options.limitInertia && this._lethargy.check(e) === false) return;

      var evt = this._event;

      // In Safari, IE and in Chrome if 'wheel' isn't defined
      evt.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
      evt.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

      this._notify(e);
  };

  VirtualScroll.prototype._onTouchStart = function(e) {
      var t = (e.targetTouches) ? e.targetTouches[0] : e;
      this.touchStartX = t.pageX;
      this.touchStartY = t.pageY;
  };

  VirtualScroll.prototype._onTouchMove = function(e) {
      var options = this.options;
      if(options.preventTouch
          && !e.target.classList.contains(options.unpreventTouchClass)) {
          e.preventDefault();
      }

      var evt = this._event;

      var t = (e.targetTouches) ? e.targetTouches[0] : e;

      evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
      evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

      this.touchStartX = t.pageX;
      this.touchStartY = t.pageY;

      this._notify(e);
  };

  VirtualScroll.prototype._onKeyDown = function(e) {
      var evt = this._event;
      evt.deltaX = evt.deltaY = 0;
      var windowHeight = window.innerHeight - 40;

      switch(e.keyCode) {
          case keyCodes.LEFT:
          case keyCodes.UP:
              evt.deltaY = this.options.keyStep;
              break;

          case keyCodes.RIGHT:
          case keyCodes.DOWN:
              evt.deltaY = - this.options.keyStep;
              break;
          case  e.shiftKey:
              evt.deltaY = windowHeight;
              break;
          case keyCodes.SPACE:
              evt.deltaY = - windowHeight;
              break;
          default:
              return;
      }

      this._notify(e);
  };

  VirtualScroll.prototype._bind = function() {
      if(support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel, this.listenerOptions);
      if(support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel, this.listenerOptions);

      if(support.hasTouch && this.options.useTouch) {
          this.el.addEventListener('touchstart', this._onTouchStart, this.listenerOptions);
          this.el.addEventListener('touchmove', this._onTouchMove, this.listenerOptions);
      }

      if(support.hasPointer && support.hasTouchWin) {
          this.bodyTouchAction = document.body.style.msTouchAction;
          document.body.style.msTouchAction = 'none';
          this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
          this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
      }

      if(support.hasKeyDown && this.options.useKeyboard) document.addEventListener('keydown', this._onKeyDown);
  };

  VirtualScroll.prototype._unbind = function() {
      if(support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
      if(support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);

      if(support.hasTouch) {
          this.el.removeEventListener('touchstart', this._onTouchStart);
          this.el.removeEventListener('touchmove', this._onTouchMove);
      }

      if(support.hasPointer && support.hasTouchWin) {
          document.body.style.msTouchAction = this.bodyTouchAction;
          this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
          this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
      }

      if(support.hasKeyDown && this.options.useKeyboard) document.removeEventListener('keydown', this._onKeyDown);
  };

  VirtualScroll.prototype.on = function(cb, ctx) {
    this._emitter.on(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
  };

  VirtualScroll.prototype.off = function(cb, ctx) {
    this._emitter.off(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
  };

  VirtualScroll.prototype.reset = function() {
      var evt = this._event;
      evt.x = 0;
      evt.y = 0;
  };

  VirtualScroll.prototype.destroy = function() {
      this._emitter.off();
      this._unbind();
  };

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function getTranslate(el) {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    return translate;
  }

  /**
   * Returns an array containing all the parent nodes of the given node
   * @param  {object} node
   * @return {array} parent nodes
   */
  function getParents(elem) {
    // Set up a parent array
    var parents = []; // Push each parent element to the array

    for (; elem && elem !== document; elem = elem.parentNode) {
      parents.push(elem);
    } // Return our parent array


    return parents;
  } // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

  var keyCodes$1 = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    TAB: 9
  };

  var _default$2$1 =
  /*#__PURE__*/
  function (_Core) {
    _inherits$1(_default, _Core);

    function _default() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$3(this, _default);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(_default).call(this, options));
      _this.inertia = _this.inertia * 0.1;
      _this.isScrolling = false;
      _this.isDraggingScrollbar = false;
      _this.isTicking = false;
      _this.hasScrollTicking = false;
      _this.parallaxElements = [];
      _this.inertiaRatio = 1;
      _this.stop = false;
      _this.checkKey = _this.checkKey.bind(_assertThisInitialized$1(_this));
      window.addEventListener('keydown', _this.checkKey, false);
      return _this;
    }

    _createClass$3(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.html.classList.add(this.smoothClass);
        this.instance = _objectSpread2({
          delta: {
            x: 0,
            y: 0
          }
        }, this.instance);
        this.vs = new src({
          el: this.el,
          mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
          firefoxMultiplier: this.firefoxMultiplier,
          touchMultiplier: this.touchMultiplier,
          useKeyboard: false,
          passive: true
        });
        this.vs.on(function (e) {
          if (_this2.stop) {
            return;
          }

          if (!_this2.isTicking && !_this2.isDraggingScrollbar) {
            requestAnimationFrame(function () {
              if (!_this2.isScrolling) _this2.startScrolling();

              _this2.updateDelta(e);
            });
            _this2.isTicking = true;
          }

          _this2.isTicking = false;
        });
        this.setScrollLimit();
        this.initScrollBar();
        this.addSections();
        this.addElements();
        this.detectElements();
        this.transformElements(true);

        _get$1(_getPrototypeOf$1(_default.prototype), "init", this).call(this);
      }
    }, {
      key: "setScrollLimit",
      value: function setScrollLimit() {
        this.instance.limit = this.el.offsetHeight - this.windowHeight;
      }
    }, {
      key: "startScrolling",
      value: function startScrolling() {
        this.isScrolling = true;
        this.checkScroll();
        this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "stopScrolling",
      value: function stopScrolling() {
        this.isScrolling = false;
        this.inertiaRatio = 1;
        this.instance.scroll.y = Math.round(this.instance.scroll.y);
        this.html.classList.remove(this.scrollingClass);
      }
    }, {
      key: "checkKey",
      value: function checkKey(e) {
        var _this3 = this;

        switch (e.keyCode) {
          case keyCodes$1.TAB:
            setTimeout(function () {
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;

              if (!(document.activeElement instanceof HTMLBodyElement)) {
                _this3.scrollTo(document.activeElement, -window.innerHeight / 2);
              }
            }, 0);
            break;

          case keyCodes$1.UP:
            this.instance.delta.y -= 240;
            break;

          case keyCodes$1.DOWN:
            this.instance.delta.y += 240;
            break;

          case keyCodes$1.SPACE:
            if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
              if (e.shiftKey) {
                this.instance.delta.y -= window.innerHeight;
              } else {
                this.instance.delta.y += window.innerHeight;
              }
            }

            break;

          default:
            return;
        }

        if (this.instance.delta.y < 0) this.instance.delta.y = 0;
        if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
        this.isScrolling = true;
        this.checkScroll();
        this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        var _this4 = this;

        if (this.isScrolling || this.isDraggingScrollbar) {
          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              return _this4.checkScroll();
            });
            this.hasScrollTicking = true;
          }

          var distance = Math.abs(this.instance.delta.y - this.instance.scroll.y);

          if (distance < 0.5 && this.instance.delta.y != 0 || distance < 0.5 && this.instance.delta.y == 0) {
            this.stopScrolling();
          }

          this.updateScroll();

          for (var i = this.sections.length - 1; i >= 0; i--) {
            if (this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit) {
              this.transform(this.sections[i].el, 0, -this.instance.scroll.y);
              this.sections[i].el.style.visibility = 'visible';
              this.sections[i].inView = true;
            } else {
              this.sections[i].el.style.visibility = 'hidden';
              this.sections[i].inView = false;
              this.transform(this.sections[i].el, 0, 0);
            }
          }

          if (this.getDirection) {
            this.addDirection();
          }

          if (this.getSpeed) {
            this.addSpeed();
            this.timestamp = Date.now();
          }

          this.detectElements();
          this.transformElements();
          var scrollBarTranslation = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
          this.transform(this.scrollbarThumb, 0, scrollBarTranslation);

          _get$1(_getPrototypeOf$1(_default.prototype), "checkScroll", this).call(this);

          this.hasScrollTicking = false;
        }
      }
    }, {
      key: "checkResize",
      value: function checkResize() {
        this.windowHeight = window.innerHeight;
        this.windowMiddle = this.windowHeight / 2;
        this.update();
      }
    }, {
      key: "updateDelta",
      value: function updateDelta(e) {
        this.instance.delta.y -= e.deltaY;
        if (this.instance.delta.y < 0) this.instance.delta.y = 0;
        if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
      }
    }, {
      key: "updateScroll",
      value: function updateScroll(e) {
        if (this.isScrolling || this.isDraggingScrollbar) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia * this.inertiaRatio);
        } else {
          this.instance.scroll.y = this.instance.delta.y;
        }
      }
    }, {
      key: "addDirection",
      value: function addDirection() {
        if (this.instance.delta.y > this.instance.scroll.y) {
          if (this.instance.direction !== 'down') {
            this.instance.direction = 'down';
          }
        } else if (this.instance.delta.y < this.instance.scroll.y) {
          if (this.instance.direction !== 'up') {
            this.instance.direction = 'up';
          }
        }
      }
    }, {
      key: "addSpeed",
      value: function addSpeed() {
        if (this.instance.delta.y != this.instance.scroll.y) {
          this.instance.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp);
        } else {
          this.instance.speed = 0;
        }
      }
    }, {
      key: "initScrollBar",
      value: function initScrollBar() {
        this.scrollbar = document.createElement('span');
        this.scrollbarThumb = document.createElement('span');
        this.scrollbar.classList.add("".concat(this.scrollbarClass));
        this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
        this.scrollbar.append(this.scrollbarThumb);
        document.body.append(this.scrollbar);
        this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height;
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px");
        this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height;
        this.getScrollBar = this.getScrollBar.bind(this);
        this.releaseScrollBar = this.releaseScrollBar.bind(this);
        this.moveScrollBar = this.moveScrollBar.bind(this);
        this.scrollbarThumb.addEventListener('mousedown', this.getScrollBar);
        window.addEventListener('mouseup', this.releaseScrollBar);
        window.addEventListener('mousemove', this.moveScrollBar);
      }
    }, {
      key: "reinitScrollBar",
      value: function reinitScrollBar() {
        this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height;
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / this.instance.limit, "px");
        this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height;
      }
    }, {
      key: "destroyScrollBar",
      value: function destroyScrollBar() {
        this.scrollbarThumb.removeEventListener('mousedown', this.getScrollBar);
        window.removeEventListener('mouseup', this.releaseScrollBar);
        window.removeEventListener('mousemove', this.moveScrollBar);
        this.scrollbar.remove();
      }
    }, {
      key: "getScrollBar",
      value: function getScrollBar(e) {
        this.isDraggingScrollbar = true;
        this.checkScroll();
        this.html.classList.remove(this.scrollingClass);
        this.html.classList.add(this.draggingClass);
      }
    }, {
      key: "releaseScrollBar",
      value: function releaseScrollBar(e) {
        this.isDraggingScrollbar = false;
        this.html.classList.add(this.scrollingClass);
        this.html.classList.remove(this.draggingClass);
      }
    }, {
      key: "moveScrollBar",
      value: function moveScrollBar(e) {
        var _this5 = this;

        if (!this.isTicking && this.isDraggingScrollbar) {
          requestAnimationFrame(function () {
            var y = e.clientY * 100 / _this5.scrollbarHeight * _this5.instance.limit / 100;

            if (y > 0 && y < _this5.instance.limit) {
              _this5.instance.delta.y = y;
            }
          });
          this.isTicking = true;
        }

        this.isTicking = false;
      }
    }, {
      key: "addElements",
      value: function addElements() {
        var _this6 = this;

        this.els = [];
        this.parallaxElements = [];
        this.sections.forEach(function (section, y) {
          var els = _this6.sections[y].el.querySelectorAll("[data-".concat(_this6.name, "]"));

          els.forEach(function (el, i) {
            var cl = el.dataset[_this6.name + 'Class'] || _this6["class"];
            var top;
            var repeat = el.dataset[_this6.name + 'Repeat'];
            var call = el.dataset[_this6.name + 'Call'];
            var position = el.dataset[_this6.name + 'Position'];
            var delay = el.dataset[_this6.name + 'Delay'];
            var direction = el.dataset[_this6.name + 'Direction'];
            var sticky = typeof el.dataset[_this6.name + 'Sticky'] === 'string';
            var speed = el.dataset[_this6.name + 'Speed'] ? parseFloat(el.dataset[_this6.name + 'Speed']) / 10 : false;
            var offset = typeof el.dataset[_this6.name + 'Offset'] === 'string' ? el.dataset[_this6.name + 'Offset'].split(',') : false;
            var target = el.dataset[_this6.name + 'Target'];
            var targetEl;

            if (target !== undefined) {
              targetEl = document.querySelector("".concat(target));
            } else {
              targetEl = el;
            }

            if (!_this6.sections[y].inView) {
              top = targetEl.getBoundingClientRect().top - getTranslate(_this6.sections[y].el).y - getTranslate(targetEl).y;
            } else {
              top = targetEl.getBoundingClientRect().top + _this6.instance.scroll.y - getTranslate(targetEl).y;
            }

            var bottom = top + targetEl.offsetHeight;
            var middle = (bottom - top) / 2 + top;

            if (sticky) {
              var elDistance = el.getBoundingClientRect().top - top;
              top += window.innerHeight;
              bottom = top + targetEl.offsetHeight - window.innerHeight - el.offsetHeight - elDistance;
              middle = (bottom - top) / 2 + top;
            }

            if (repeat == 'false') {
              repeat = false;
            } else if (repeat != undefined) {
              repeat = true;
            } else {
              repeat = _this6.repeat;
            }

            var relativeOffset = [0, 0];

            if (offset) {
              for (var i = 0; i < offset.length; i++) {
                if (offset[i].includes('%')) {
                  relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowHeight / 100);
                } else {
                  relativeOffset[i] = parseInt(offset[i]);
                }
              }
            }

            var mappedEl = {
              el: el,
              id: i,
              "class": cl,
              top: top + relativeOffset[0],
              middle: middle,
              bottom: bottom - relativeOffset[1],
              offset: offset,
              repeat: repeat,
              inView: false,
              call: call,
              speed: speed,
              delay: delay,
              position: position,
              target: targetEl,
              direction: direction,
              sticky: sticky
            };

            _this6.els.push(mappedEl);

            if (speed !== false || sticky) {
              _this6.parallaxElements.push(mappedEl);
            }
          });
        });
      }
    }, {
      key: "addSections",
      value: function addSections() {
        var _this7 = this;

        this.sections = [];
        var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));

        if (sections.length === 0) {
          sections = [this.el];
        }

        sections.forEach(function (section, i) {
          var offset = section.getBoundingClientRect().top - window.innerHeight * 1.5 - getTranslate(section).y;
          var limit = offset + section.getBoundingClientRect().height + window.innerHeight * 2;
          var persistent = typeof section.dataset[_this7.name + 'Persistent'] === 'string';
          var inView = false;

          if (_this7.instance.scroll.y >= offset && _this7.instance.scroll.y <= limit) {
            inView = true;
          }

          var mappedSection = {
            el: section,
            offset: offset,
            limit: limit,
            inView: inView,
            persistent: persistent
          };
          _this7.sections[i] = mappedSection;
        });
      }
    }, {
      key: "transform",
      value: function transform(element, x, y, delay) {
        var transform;

        if (!delay) {
          transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
        } else {
          var start = getTranslate(element);
          var lerpX = lerp(start.x, x, delay);
          var lerpY = lerp(start.y, y, delay);
          transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
        }

        element.style.webkitTransform = transform;
        element.style.msTransform = transform;
        element.style.transform = transform;
      }
    }, {
      key: "transformElements",
      value: function transformElements(isForced) {
        var _this8 = this;

        var scrollBottom = this.instance.scroll.y + this.windowHeight;
        var scrollMiddle = this.instance.scroll.y + this.windowMiddle;
        this.parallaxElements.forEach(function (current, i) {
          var transformDistance = false;

          if (isForced) {
            transformDistance = 0;
          }

          if (current.inView) {
            switch (current.position) {
              case 'top':
                transformDistance = _this8.instance.scroll.y * -current.speed;
                break;

              case 'elementTop':
                transformDistance = (scrollBottom - current.top) * -current.speed;
                break;

              case 'bottom':
                transformDistance = (_this8.instance.limit - scrollBottom + _this8.windowHeight) * current.speed;
                break;

              default:
                transformDistance = (scrollMiddle - current.middle) * -current.speed;
                break;
            }
          }

          if (current.sticky) {
            if (current.inView) {
              transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight;
            } else {
              if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) {
                transformDistance = 0;
              } else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) {
                transformDistance = current.bottom - current.top + window.innerHeight;
              } else {
                transformDistance = false;
              }
            }
          }

          if (transformDistance !== false) {
            if (current.direction === 'horizontal') {
              _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay);
            } else {
              _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
            }
          }
        });
      }
      /**
       * Scroll to a desired target.
       *
       * @param  {object} options
       *      Available options :
       *          {node, string, "top", "bottom"} targetOption - The DOM element we want to scroll to
       *          {int} offsetOption - An absolute vertical scroll value to reach, or an offset to apply on top of given `target` or `sourceElem`'s target
       *          {boolean} toBottom - Set to true to scroll all the way to the bottom
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(targetOption, offsetOption) {
        var _this9 = this;

        var target;
        var offset = offsetOption ? parseInt(offsetOption) : 0;

        if (typeof targetOption === 'string') {
          if (targetOption === 'top') {
            offset = 0;
          } else if (targetOption === 'bottom') {
            offset = this.instance.limit;
          } else {
            target = document.querySelectorAll(targetOption)[0];
          }
        } else if (!targetOption.target) {
          target = targetOption;
        } // We have a target, get it's coordinates


        if (target) {
          // Get target offset from top
          var targetBCR = target.getBoundingClientRect();
          var offsetTop = targetBCR.top + this.instance.scroll.y; // Try and find the target's parent section

          var targetParents = getParents(target);
          var parentSection = targetParents.find(function (candidate) {
            return _this9.sections.find(function (section) {
              return section.el == candidate;
            });
          });
          var parentSectionOffset = 0;

          if (parentSection) {
            parentSectionOffset = getTranslate(parentSection).y; // We got a parent section, store it's current offset to remove it later
          } // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)


          offset = offsetTop + offset - parentSectionOffset;
        }

        offset -= this.instance.scroll.y;
        this.instance.delta.y = Math.min(offset, this.instance.limit); // Actual scrollTo (the lerp will do the animation itself)

        this.inertiaRatio = Math.min(4000 / Math.abs(this.instance.delta.y - this.instance.scroll.y), 0.8); // Update the scroll. If we were in idle state: we're not anymore

        this.isScrolling = true;
        this.checkScroll();
        this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "update",
      value: function update() {
        this.setScrollLimit();
        this.addSections();
        this.addElements();
        this.detectElements();
        this.updateScroll();
        this.transformElements(true);
        this.reinitScrollBar();
      }
    }, {
      key: "startScroll",
      value: function startScroll() {
        this.stop = false;
      }
    }, {
      key: "stopScroll",
      value: function stopScroll() {
        this.stop = true;
      }
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.instance = {
          scroll: {
            x: x,
            y: y
          },
          delta: {
            x: x,
            y: y
          }
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get$1(_getPrototypeOf$1(_default.prototype), "destroy", this).call(this);

        this.stopScrolling();
        this.html.classList.remove(this.smoothClass);
        this.vs.destroy();
        this.destroyScrollBar();
        window.removeEventListener('keydown', this.checkKey, false);
      }
    }]);

    return _default;
  }(_default$4);

  var _default$3$1 =
  /*#__PURE__*/
  function () {
    function _default() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$3(this, _default);

      this.options = options;
      Object.assign(this, defaults, options);
      this.init();
    }

    _createClass$3(_default, [{
      key: "init",
      value: function init() {
        if (!this.smoothMobile) {
          this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
        }

        if (this.smooth === true && !this.isMobile) {
          this.scroll = new _default$2$1(this.options);
        } else {
          this.scroll = new _default$1$1(this.options);
        }

        this.scroll.init();

        if (window.location.hash) {
          this.scroll.scrollTo(window.location.hash);
        }
      }
    }, {
      key: "update",
      value: function update() {
        this.scroll.update();
      }
    }, {
      key: "start",
      value: function start() {
        this.scroll.startScroll();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.scroll.stopScroll();
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(target, offset) {
        this.scroll.scrollTo(target, offset);
      }
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.scroll.setScroll(x, y);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        this.scroll.setEvents(event, func);
      }
    }, {
      key: "off",
      value: function off(event, func) {
        this.scroll.unsetEvents(event, func);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
      }
    }]);

    return _default;
  }();

  var _default$5 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.scroll = new _default$3$1({
          el: this.el,
          smooth: true
        });
        this.scroll.on('call', function (func, way, obj, id) {
          // Using modularJS
          _this.call(func[0], {
            way: way,
            obj: obj
          }, func[1], func[2]);
        });
        this.scroll.on('scroll', function (args) {// console.log(args.scroll);
        });
      }
    }, {
      key: "toggleLazy",
      value: function toggleLazy(args) {
        var src = this.getData('lazy', args.obj.el);

        if (src.length) {
          if (args.obj.el.tagName == "IMG") {
            args.obj.el.src = src;
          } else {
            args.obj.el.style.backgroundImage = "url(".concat(src, ")");
          }

          this.setData('lazy', '', args.obj.el);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
      }
    }]);

    return _default;
  }(_default);

  var vertexShader = "\n    precision highp float;\n    precision highp int;\n    attribute vec2 uv;\n    attribute vec3 position;\n    attribute vec3 normal;\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n\n    uniform sampler2D displacementTexture;\n    uniform float factor;\n    uniform float scale;\n    uniform vec2 displacement;\n    varying vec2 displacementUv;\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    void main() {\n        \n        // vNormal = normalize(normalMatrix * normal);\n        \n        displacementUv = uv + displacement;\n        vUv = uv;\n\n        vec3 newPosition = vec3(position.x, position.y , position.z + (texture2D(displacementTexture, displacementUv).r * factor * 0.1));\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);\n    }\n";

  var fragmentShader = "\n\n    precision highp float;\n    precision highp int;\n    uniform sampler2D texture;\n    varying vec2 vUv;\n    varying vec3 vNormal;\n\n    void main() {\n\n      vec3 normal = normalize(vNormal);\n      vec3 tex = texture2D(texture, vUv).rgb;\n      \n      // vec3 light = normalize(vec3(0.5, 1.0, -0.3));\n      // float shading = dot(normal, light) * 0.15;\n      \n      gl_FragColor.rgb = tex;\n      gl_FragColor.a = 1.0;\n\n      gl_FragColor = texture2D(texture, vUv);\n      \n\n    }\n";

  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length(a) {
      let x = a[0];
      let y = a[1];
      let z = a[2];
      return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the source vector
   * @returns {vec3} out
   */
  function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
  }

  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */
  function set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
  }

  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      return out;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
  }

  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      return out;
  }

  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      return out;
  }

  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */
  function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      return out;
  }

  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance(a, b) {
      let x = b[0] - a[0];
      let y = b[1] - a[1];
      let z = b[2] - a[2];
      return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance(a, b) {
      let x = b[0] - a[0];
      let y = b[1] - a[1];
      let z = b[2] - a[2];
      return x * x + y * y + z * z;
  }

  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength(a) {
      let x = a[0];
      let y = a[1];
      let z = a[2];
      return x * x + y * y + z * z;
  }

  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to negate
   * @returns {vec3} out
   */
  function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      return out;
  }

  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to invert
   * @returns {vec3} out
   */
  function inverse(out, a) {
      out[0] = 1.0 / a[0];
      out[1] = 1.0 / a[1];
      out[2] = 1.0 / a[2];
      return out;
  }

  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */
  function normalize(out, a) {
      let x = a[0];
      let y = a[1];
      let z = a[2];
      let len = x * x + y * y + z * z;
      if (len > 0) {
          //TODO: evaluate use of glm_invsqrt here?
          len = 1 / Math.sqrt(len);
      }
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
      return out;
  }

  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function cross(out, a, b) {
      let ax = a[0],
          ay = a[1],
          az = a[2];
      let bx = b[0],
          by = b[1],
          bz = b[2];

      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
  }

  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec3} out
   */
  function lerp$1(out, a, b, t) {
      let ax = a[0];
      let ay = a[1];
      let az = a[2];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      return out;
  }

  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec3} out
   */
  function transformMat4(out, a, m) {
      let x = a[0],
          y = a[1],
          z = a[2];
      let w = m[3] * x + m[7] * y + m[11] * z + m[15];
      w = w || 1.0;
      out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      return out;
  }

  /**
   * Same as above but doesn't apply translation.
   * Useful for rays.
   */
  function scaleRotateMat4(out, a, m) {
      let x = a[0],
          y = a[1],
          z = a[2];
      let w = m[3] * x + m[7] * y + m[11] * z + m[15];
      w = w || 1.0;
      out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
      return out;
  }

  /**
   * Transforms the vec3 with a quat
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */
  function transformQuat(out, a, q) {
      // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed

      let x = a[0],
          y = a[1],
          z = a[2];
      let qx = q[0],
          qy = q[1],
          qz = q[2],
          qw = q[3];

      let uvx = qy * z - qz * y;
      let uvy = qz * x - qx * z;
      let uvz = qx * y - qy * x;

      let uuvx = qy * uvz - qz * uvy;
      let uuvy = qz * uvx - qx * uvz;
      let uuvz = qx * uvy - qy * uvx;

      let w2 = qw * 2;
      uvx *= w2;
      uvy *= w2;
      uvz *= w2;

      uuvx *= 2;
      uuvy *= 2;
      uuvz *= 2;

      out[0] = x + uvx + uuvx;
      out[1] = y + uvy + uuvy;
      out[2] = z + uvz + uuvz;
      return out;
  }

  /**
   * Get the angle between two 3D vectors
   * @param {vec3} a The first operand
   * @param {vec3} b The second operand
   * @returns {Number} The angle in radians
   */
  const angle = (function () {
      const tempA = [0, 0, 0];
      const tempB = [0, 0, 0];

      return function (a, b) {
          copy(tempA, a);
          copy(tempB, b);

          normalize(tempA, tempA);
          normalize(tempB, tempB);

          let cosine = dot(tempA, tempB);

          if (cosine > 1.0) {
              return 0;
          } else if (cosine < -1.0) {
              return Math.PI;
          } else {
              return Math.acos(cosine);
          }
      };
  })();

  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  class Vec3 extends Array {
      constructor(x = 0, y = x, z = x) {
          super(x, y, z);
          return this;
      }

      get x() {
          return this[0];
      }

      get y() {
          return this[1];
      }

      get z() {
          return this[2];
      }

      set x(v) {
          this[0] = v;
      }

      set y(v) {
          this[1] = v;
      }

      set z(v) {
          this[2] = v;
      }

      set(x, y = x, z = x) {
          if (x.length) return this.copy(x);
          set(this, x, y, z);
          return this;
      }

      copy(v) {
          copy(this, v);
          return this;
      }

      add(va, vb) {
          if (vb) add(this, va, vb);
          else add(this, this, va);
          return this;
      }

      sub(va, vb) {
          if (vb) subtract(this, va, vb);
          else subtract(this, this, va);
          return this;
      }

      multiply(v) {
          if (v.length) multiply(this, this, v);
          else scale(this, this, v);
          return this;
      }

      divide(v) {
          if (v.length) divide(this, this, v);
          else scale(this, this, 1 / v);
          return this;
      }

      inverse(v = this) {
          inverse(this, v);
          return this;
      }

      // Can't use 'length' as Array.prototype uses it
      len() {
          return length(this);
      }

      distance(v) {
          if (v) return distance(this, v);
          else return length(this);
      }

      squaredLen() {
          return squaredLength(this);
      }

      squaredDistance(v) {
          if (v) return squaredDistance(this, v);
          else return squaredLength(this);
      }

      negate(v = this) {
          negate(this, v);
          return this;
      }

      cross(va, vb) {
          if (vb) cross(this, va, vb);
          else cross(this, this, va);
          return this;
      }

      scale(v) {
          scale(this, this, v);
          return this;
      }

      normalize() {
          normalize(this, this);
          return this;
      }

      dot(v) {
          return dot(this, v);
      }

      equals(v) {
          return exactEquals(this, v);
      }

      applyMatrix4(mat4) {
          transformMat4(this, this, mat4);
          return this;
      }

      scaleRotateMatrix4(mat4) {
          scaleRotateMat4(this, this, mat4);
          return this;
      }

      applyQuaternion(q) {
          transformQuat(this, this, q);
          return this;
      }

      angle(v) {
          return angle(this, v);
      }

      lerp(v, t) {
          lerp$1(this, this, v, t);
          return this;
      }

      clone() {
          return new Vec3(this[0], this[1], this[2]);
      }

      fromArray(a, o = 0) {
          this[0] = a[o];
          this[1] = a[o + 1];
          this[2] = a[o + 2];
          return this;
      }

      toArray(a = [], o = 0) {
          a[o] = this[0];
          a[o + 1] = this[1];
          a[o + 2] = this[2];
          return a;
      }

      transformDirection(mat4) {
          const x = this[0];
          const y = this[1];
          const z = this[2];

          this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
          this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
          this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;

          return this.normalize();
      }
  }

  // attribute params

  const tempVec3 = new Vec3();

  let ID = 1;
  let ATTR_ID = 1;

  // To stop inifinite warnings
  let isBoundsWarned = false;

  class Geometry {
      constructor(gl, attributes = {}) {
          if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
          this.gl = gl;
          this.attributes = attributes;
          this.id = ID++;

          // Store one VAO per program attribute locations order
          this.VAOs = {};

          this.drawRange = { start: 0, count: 0 };
          this.instancedCount = 0;

          // Unbind current VAO so that new buffers don't get added to active mesh
          this.gl.renderer.bindVertexArray(null);
          this.gl.renderer.currentGeometry = null;

          // Alias for state store to avoid redundant calls for global state
          this.glState = this.gl.renderer.state;

          // create the buffers
          for (let key in attributes) {
              this.addAttribute(key, attributes[key]);
          }
      }

      addAttribute(key, attr) {
          this.attributes[key] = attr;

          // Set options
          attr.id = ATTR_ID++; // TODO: currently unused, remove?
          attr.size = attr.size || 1;
          attr.type =
              attr.type ||
              (attr.data.constructor === Float32Array
                  ? this.gl.FLOAT
                  : attr.data.constructor === Uint16Array
                  ? this.gl.UNSIGNED_SHORT
                  : this.gl.UNSIGNED_INT); // Uint32Array
          attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
          attr.normalized = attr.normalized || false;
          attr.stride = attr.stride || 0;
          attr.offset = attr.offset || 0;
          attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
          attr.divisor = attr.instanced || 0;
          attr.needsUpdate = false;

          if (!attr.buffer) {
              attr.buffer = this.gl.createBuffer();

              // Push data to buffer
              this.updateAttribute(attr);
          }

          // Update geometry counts. If indexed, ignore regular attributes
          if (attr.divisor) {
              this.isInstanced = true;
              if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
                  console.warn('geometry has multiple instanced buffers of different length');
                  return (this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor));
              }
              this.instancedCount = attr.count * attr.divisor;
          } else if (key === 'index') {
              this.drawRange.count = attr.count;
          } else if (!this.attributes.index) {
              this.drawRange.count = Math.max(this.drawRange.count, attr.count);
          }
      }

      updateAttribute(attr) {
          if (this.glState.boundBuffer !== attr.buffer) {
              this.gl.bindBuffer(attr.target, attr.buffer);
              this.glState.boundBuffer = attr.buffer;
          }
          this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
          attr.needsUpdate = false;
      }

      setIndex(value) {
          this.addAttribute('index', value);
      }

      setDrawRange(start, count) {
          this.drawRange.start = start;
          this.drawRange.count = count;
      }

      setInstancedCount(value) {
          this.instancedCount = value;
      }

      createVAO(program) {
          this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
          this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
          this.bindAttributes(program);
      }

      bindAttributes(program) {
          // Link all attributes to program using gl.vertexAttribPointer
          program.attributeLocations.forEach((location, name) => {
              // If geometry missing a required shader attribute
              if (!this.attributes[name]) {
                  console.warn(`active attribute ${name} not being supplied`);
                  return;
              }

              const attr = this.attributes[name];

              this.gl.bindBuffer(attr.target, attr.buffer);
              this.glState.boundBuffer = attr.buffer;
              this.gl.vertexAttribPointer(location, attr.size, attr.type, attr.normalized, attr.stride, attr.offset);
              this.gl.enableVertexAttribArray(location);

              // For instanced attributes, divisor needs to be set.
              // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render
              this.gl.renderer.vertexAttribDivisor(location, attr.divisor);
          });

          // Bind indices if geometry indexed
          if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
      }

      draw({ program, mode = this.gl.TRIANGLES }) {
          if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
              if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
              this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
              this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
          }

          // Check if any attributes need updating
          program.attributeLocations.forEach((location, name) => {
              const attr = this.attributes[name];
              if (attr.needsUpdate) this.updateAttribute(attr);
          });

          if (this.isInstanced) {
              if (this.attributes.index) {
                  this.gl.renderer.drawElementsInstanced(
                      mode,
                      this.drawRange.count,
                      this.attributes.index.type,
                      this.drawRange.start,
                      this.instancedCount
                  );
              } else {
                  this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
              }
          } else {
              if (this.attributes.index) {
                  this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
              } else {
                  this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
              }
          }
      }

      getPositionArray() {
          // Use position buffer, or min/max if available
          const attr = this.attributes.position;
          if (attr.min) return [...attr.min, ...attr.max];
          if (attr.data) return attr.data;
          if (isBoundsWarned) return;
          console.warn('No position buffer data found to compute bounds');
          return (isBoundsWarned = true);
      }

      computeBoundingBox(array) {
          if (!array) array = this.getPositionArray();

          if (!this.bounds) {
              this.bounds = {
                  min: new Vec3(),
                  max: new Vec3(),
                  center: new Vec3(),
                  scale: new Vec3(),
                  radius: Infinity,
              };
          }

          const min = this.bounds.min;
          const max = this.bounds.max;
          const center = this.bounds.center;
          const scale = this.bounds.scale;

          min.set(+Infinity);
          max.set(-Infinity);

          // TODO: use offset/stride if exists
          // TODO: check size of position (eg triangle with Vec2)
          for (let i = 0, l = array.length; i < l; i += 3) {
              const x = array[i];
              const y = array[i + 1];
              const z = array[i + 2];

              min.x = Math.min(x, min.x);
              min.y = Math.min(y, min.y);
              min.z = Math.min(z, min.z);

              max.x = Math.max(x, max.x);
              max.y = Math.max(y, max.y);
              max.z = Math.max(z, max.z);
          }

          scale.sub(max, min);
          center.add(min, max).divide(2);
      }

      computeBoundingSphere(array) {
          if (!array) array = this.getPositionArray();
          if (!this.bounds) this.computeBoundingBox(array);

          let maxRadiusSq = 0;
          for (let i = 0, l = array.length; i < l; i += 3) {
              tempVec3.fromArray(array, i);
              maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
          }

          this.bounds.radius = Math.sqrt(maxRadiusSq);
      }

      remove() {
          if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);
          for (let key in this.attributes) {
              this.gl.deleteBuffer(this.attributes[key].buffer);
              delete this.attributes[key];
          }
      }
  }

  // TODO: upload empty texture if null ? maybe not
  // TODO: upload identity matrix if null ?
  // TODO: sampler Cube

  let ID$1 = 1;

  // cache of typed arrays used to flatten uniform arrays
  const arrayCacheF32 = {};

  class Program {
      constructor(
          gl,
          {
              vertex,
              fragment,
              uniforms = {},

              transparent = false,
              cullFace = gl.BACK,
              frontFace = gl.CCW,
              depthTest = true,
              depthWrite = true,
              depthFunc = gl.LESS,
          } = {}
      ) {
          if (!gl.canvas) console.error('gl not passed as fist argument to Program');
          this.gl = gl;
          this.uniforms = uniforms;
          this.id = ID$1++;

          if (!vertex) console.warn('vertex shader not supplied');
          if (!fragment) console.warn('fragment shader not supplied');

          // Store program state
          this.transparent = transparent;
          this.cullFace = cullFace;
          this.frontFace = frontFace;
          this.depthTest = depthTest;
          this.depthWrite = depthWrite;
          this.depthFunc = depthFunc;
          this.blendFunc = {};
          this.blendEquation = {};

          // set default blendFunc if transparent flagged
          if (this.transparent && !this.blendFunc.src) {
              if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
              else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
          }

          // compile vertex shader and log errors
          const vertexShader = gl.createShader(gl.VERTEX_SHADER);
          gl.shaderSource(vertexShader, vertex);
          gl.compileShader(vertexShader);
          if (gl.getShaderInfoLog(vertexShader) !== '') {
              console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
          }

          // compile fragment shader and log errors
          const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
          gl.shaderSource(fragmentShader, fragment);
          gl.compileShader(fragmentShader);
          if (gl.getShaderInfoLog(fragmentShader) !== '') {
              console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
          }

          // compile program and log errors
          this.program = gl.createProgram();
          gl.attachShader(this.program, vertexShader);
          gl.attachShader(this.program, fragmentShader);
          gl.linkProgram(this.program);
          if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
              return console.warn(gl.getProgramInfoLog(this.program));
          }

          // Remove shader once linked
          gl.deleteShader(vertexShader);
          gl.deleteShader(fragmentShader);

          // Get active uniform locations
          this.uniformLocations = new Map();
          let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
          for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
              let uniform = gl.getActiveUniform(this.program, uIndex);
              this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));

              // split uniforms' names to separate array and struct declarations
              const split = uniform.name.match(/(\w+)/g);

              uniform.uniformName = split[0];

              if (split.length === 3) {
                  uniform.isStructArray = true;
                  uniform.structIndex = Number(split[1]);
                  uniform.structProperty = split[2];
              } else if (split.length === 2 && isNaN(Number(split[1]))) {
                  uniform.isStruct = true;
                  uniform.structProperty = split[1];
              }
          }

          // Get active attribute locations
          this.attributeLocations = new Map();
          const locations = [];
          const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
          for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
              const attribute = gl.getActiveAttrib(this.program, aIndex);
              const location = gl.getAttribLocation(this.program, attribute.name);
              locations[location] = attribute.name;
              this.attributeLocations.set(attribute.name, location);
          }
          this.attributeOrder = locations.join('');
      }

      setBlendFunc(src, dst, srcAlpha, dstAlpha) {
          this.blendFunc.src = src;
          this.blendFunc.dst = dst;
          this.blendFunc.srcAlpha = srcAlpha;
          this.blendFunc.dstAlpha = dstAlpha;
          if (src) this.transparent = true;
      }

      setBlendEquation(modeRGB, modeAlpha) {
          this.blendEquation.modeRGB = modeRGB;
          this.blendEquation.modeAlpha = modeAlpha;
      }

      applyState() {
          if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);
          else this.gl.renderer.disable(this.gl.DEPTH_TEST);

          if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);
          else this.gl.renderer.disable(this.gl.CULL_FACE);

          if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);
          else this.gl.renderer.disable(this.gl.BLEND);

          if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
          this.gl.renderer.setFrontFace(this.frontFace);
          this.gl.renderer.setDepthMask(this.depthWrite);
          this.gl.renderer.setDepthFunc(this.depthFunc);
          if (this.blendFunc.src)
              this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
          if (this.blendEquation.modeRGB) this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
      }

      use({ flipFaces = false } = {}) {
          let textureUnit = -1;
          const programActive = this.gl.renderer.currentProgram === this.id;

          // Avoid gl call if program already in use
          if (!programActive) {
              this.gl.useProgram(this.program);
              this.gl.renderer.currentProgram = this.id;
          }

          // Set only the active uniforms found in the shader
          this.uniformLocations.forEach((location, activeUniform) => {
              let name = activeUniform.uniformName;

              // get supplied uniform
              let uniform = this.uniforms[name];

              // For structs, get the specific property instead of the entire object
              if (activeUniform.isStruct) {
                  uniform = uniform[activeUniform.structProperty];
                  name += `.${activeUniform.structProperty}`;
              }
              if (activeUniform.isStructArray) {
                  uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
                  name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
              }

              if (!uniform) {
                  return warn(`Active uniform ${name} has not been supplied`);
              }

              if (uniform && uniform.value === undefined) {
                  return warn(`${name} uniform is missing a value parameter`);
              }

              if (uniform.value.texture) {
                  textureUnit = textureUnit + 1;

                  // Check if texture needs to be updated
                  uniform.value.update(textureUnit);
                  return setUniform(this.gl, activeUniform.type, location, textureUnit);
              }

              // For texture arrays, set uniform as an array of texture units instead of just one
              if (uniform.value.length && uniform.value[0].texture) {
                  const textureUnits = [];
                  uniform.value.forEach((value) => {
                      textureUnit = textureUnit + 1;
                      value.update(textureUnit);
                      textureUnits.push(textureUnit);
                  });

                  return setUniform(this.gl, activeUniform.type, location, textureUnits);
              }

              setUniform(this.gl, activeUniform.type, location, uniform.value);
          });

          this.applyState();
          if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
      }

      remove() {
          this.gl.deleteProgram(this.program);
      }
  }

  function setUniform(gl, type, location, value) {
      value = value.length ? flatten(value) : value;
      const setValue = gl.renderer.state.uniformLocations.get(location);

      // Avoid redundant uniform commands
      if (value.length) {
          if (setValue === undefined || setValue.length !== value.length) {
              // clone array to store as cache
              gl.renderer.state.uniformLocations.set(location, value.slice(0));
          } else {
              if (arraysEqual(setValue, value)) return;

              // Update cached array values
              setValue.set ? setValue.set(value) : setArray(setValue, value);
              gl.renderer.state.uniformLocations.set(location, setValue);
          }
      } else {
          if (setValue === value) return;
          gl.renderer.state.uniformLocations.set(location, value);
      }

      switch (type) {
          case 5126:
              return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value); // FLOAT
          case 35664:
              return gl.uniform2fv(location, value); // FLOAT_VEC2
          case 35665:
              return gl.uniform3fv(location, value); // FLOAT_VEC3
          case 35666:
              return gl.uniform4fv(location, value); // FLOAT_VEC4
          case 35670: // BOOL
          case 5124: // INT
          case 35678: // SAMPLER_2D
          case 35680:
              return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value); // SAMPLER_CUBE
          case 35671: // BOOL_VEC2
          case 35667:
              return gl.uniform2iv(location, value); // INT_VEC2
          case 35672: // BOOL_VEC3
          case 35668:
              return gl.uniform3iv(location, value); // INT_VEC3
          case 35673: // BOOL_VEC4
          case 35669:
              return gl.uniform4iv(location, value); // INT_VEC4
          case 35674:
              return gl.uniformMatrix2fv(location, false, value); // FLOAT_MAT2
          case 35675:
              return gl.uniformMatrix3fv(location, false, value); // FLOAT_MAT3
          case 35676:
              return gl.uniformMatrix4fv(location, false, value); // FLOAT_MAT4
      }
  }

  function addLineNumbers(string) {
      let lines = string.split('\n');
      for (let i = 0; i < lines.length; i++) {
          lines[i] = i + 1 + ': ' + lines[i];
      }
      return lines.join('\n');
  }

  function flatten(a) {
      const arrayLen = a.length;
      const valueLen = a[0].length;
      if (valueLen === undefined) return a;
      const length = arrayLen * valueLen;
      let value = arrayCacheF32[length];
      if (!value) arrayCacheF32[length] = value = new Float32Array(length);
      for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);
      return value;
  }

  function arraysEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0, l = a.length; i < l; i++) {
          if (a[i] !== b[i]) return false;
      }
      return true;
  }

  function setArray(a, b) {
      for (let i = 0, l = a.length; i < l; i++) {
          a[i] = b[i];
      }
  }

  let warnCount = 0;
  function warn(message) {
      if (warnCount > 100) return;
      console.warn(message);
      warnCount++;
      if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
  }

  // TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost

  // Not automatic - devs to use these methods manually
  // gl.colorMask( colorMask, colorMask, colorMask, colorMask );
  // gl.clearColor( r, g, b, a );
  // gl.stencilMask( stencilMask );
  // gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
  // gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
  // gl.clearStencil( stencil );

  const tempVec3$1 = new Vec3();
  let ID$2 = 1;

  class Renderer {
      constructor({
          canvas = document.createElement('canvas'),
          width = 300,
          height = 150,
          dpr = 1,
          alpha = false,
          depth = true,
          stencil = false,
          antialias = false,
          premultipliedAlpha = false,
          preserveDrawingBuffer = false,
          powerPreference = 'default',
          autoClear = true,
          webgl = 2,
      } = {}) {
          const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
          this.dpr = dpr;
          this.alpha = alpha;
          this.color = true;
          this.depth = depth;
          this.stencil = stencil;
          this.premultipliedAlpha = premultipliedAlpha;
          this.autoClear = autoClear;
          this.id = ID$2++;

          // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1
          if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
          this.isWebgl2 = !!this.gl;
          if (!this.gl) {
              this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
          }

          // Attach renderer to gl so that all classes have access to internal state functions
          this.gl.renderer = this;

          // initialise size values
          this.setSize(width, height);

          // gl state stores to avoid redundant calls on methods used internally
          this.state = {};
          this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
          this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
          this.state.cullFace = null;
          this.state.frontFace = this.gl.CCW;
          this.state.depthMask = true;
          this.state.depthFunc = this.gl.LESS;
          this.state.premultiplyAlpha = false;
          this.state.flipY = false;
          this.state.unpackAlignment = 4;
          this.state.framebuffer = null;
          this.state.viewport = { width: null, height: null };
          this.state.textureUnits = [];
          this.state.activeTextureUnit = 0;
          this.state.boundBuffer = null;
          this.state.uniformLocations = new Map();

          // store requested extensions
          this.extensions = {};

          // Initialise extra format types
          if (this.isWebgl2) {
              this.getExtension('EXT_color_buffer_float');
              this.getExtension('OES_texture_float_linear');
          } else {
              this.getExtension('OES_texture_float');
              this.getExtension('OES_texture_float_linear');
              this.getExtension('OES_texture_half_float');
              this.getExtension('OES_texture_half_float_linear');
              this.getExtension('OES_element_index_uint');
              this.getExtension('OES_standard_derivatives');
              this.getExtension('EXT_sRGB');
              this.getExtension('WEBGL_depth_texture');
              this.getExtension('WEBGL_draw_buffers');
          }

          // Create method aliases using extension (WebGL1) or native if available (WebGL2)
          this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
          this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
          this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
          this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
          this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
          this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
          this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL');

          // Store device parameters
          this.parameters = {};
          this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
          this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic')
              ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT)
              : 0;
      }

      setSize(width, height) {
          this.width = width;
          this.height = height;

          this.gl.canvas.width = width * this.dpr;
          this.gl.canvas.height = height * this.dpr;

          Object.assign(this.gl.canvas.style, {
              width: width + 'px',
              height: height + 'px',
          });
      }

      setViewport(width, height) {
          if (this.state.viewport.width === width && this.state.viewport.height === height) return;
          this.state.viewport.width = width;
          this.state.viewport.height = height;
          this.gl.viewport(0, 0, width, height);
      }

      enable(id) {
          if (this.state[id] === true) return;
          this.gl.enable(id);
          this.state[id] = true;
      }

      disable(id) {
          if (this.state[id] === false) return;
          this.gl.disable(id);
          this.state[id] = false;
      }

      setBlendFunc(src, dst, srcAlpha, dstAlpha) {
          if (
              this.state.blendFunc.src === src &&
              this.state.blendFunc.dst === dst &&
              this.state.blendFunc.srcAlpha === srcAlpha &&
              this.state.blendFunc.dstAlpha === dstAlpha
          )
              return;
          this.state.blendFunc.src = src;
          this.state.blendFunc.dst = dst;
          this.state.blendFunc.srcAlpha = srcAlpha;
          this.state.blendFunc.dstAlpha = dstAlpha;
          if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
          else this.gl.blendFunc(src, dst);
      }

      setBlendEquation(modeRGB, modeAlpha) {
          if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
          this.state.blendEquation.modeRGB = modeRGB;
          this.state.blendEquation.modeAlpha = modeAlpha;
          if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);
          else this.gl.blendEquation(modeRGB);
      }

      setCullFace(value) {
          if (this.state.cullFace === value) return;
          this.state.cullFace = value;
          this.gl.cullFace(value);
      }

      setFrontFace(value) {
          if (this.state.frontFace === value) return;
          this.state.frontFace = value;
          this.gl.frontFace(value);
      }

      setDepthMask(value) {
          if (this.state.depthMask === value) return;
          this.state.depthMask = value;
          this.gl.depthMask(value);
      }

      setDepthFunc(value) {
          if (this.state.depthFunc === value) return;
          this.state.depthFunc = value;
          this.gl.depthFunc(value);
      }

      activeTexture(value) {
          if (this.state.activeTextureUnit === value) return;
          this.state.activeTextureUnit = value;
          this.gl.activeTexture(this.gl.TEXTURE0 + value);
      }

      bindFramebuffer({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
          if (this.state.framebuffer === buffer) return;
          this.state.framebuffer = buffer;
          this.gl.bindFramebuffer(target, buffer);
      }

      getExtension(extension, webgl2Func, extFunc) {
          // if webgl2 function supported, return func bound to gl context
          if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl);

          // fetch extension once only
          if (!this.extensions[extension]) {
              this.extensions[extension] = this.gl.getExtension(extension);
          }

          // return extension if no function requested
          if (!webgl2Func) return this.extensions[extension];

          // Return null if extension not supported
          if (!this.extensions[extension]) return null;

          // return extension function, bound to extension
          return this.extensions[extension][extFunc].bind(this.extensions[extension]);
      }

      sortOpaque(a, b) {
          if (a.renderOrder !== b.renderOrder) {
              return a.renderOrder - b.renderOrder;
          } else if (a.program.id !== b.program.id) {
              return a.program.id - b.program.id;
          } else if (a.zDepth !== b.zDepth) {
              return a.zDepth - b.zDepth;
          } else {
              return b.id - a.id;
          }
      }

      sortTransparent(a, b) {
          if (a.renderOrder !== b.renderOrder) {
              return a.renderOrder - b.renderOrder;
          }
          if (a.zDepth !== b.zDepth) {
              return b.zDepth - a.zDepth;
          } else {
              return b.id - a.id;
          }
      }

      sortUI(a, b) {
          if (a.renderOrder !== b.renderOrder) {
              return a.renderOrder - b.renderOrder;
          } else if (a.program.id !== b.program.id) {
              return a.program.id - b.program.id;
          } else {
              return b.id - a.id;
          }
      }

      getRenderList({ scene, camera, frustumCull, sort }) {
          let renderList = [];

          if (camera && frustumCull) camera.updateFrustum();

          // Get visible
          scene.traverse((node) => {
              if (!node.visible) return true;
              if (!node.draw) return;

              if (frustumCull && node.frustumCulled && camera) {
                  if (!camera.frustumIntersectsMesh(node)) return;
              }

              renderList.push(node);
          });

          if (sort) {
              const opaque = [];
              const transparent = []; // depthTest true
              const ui = []; // depthTest false

              renderList.forEach((node) => {
                  // Split into the 3 render groups
                  if (!node.program.transparent) {
                      opaque.push(node);
                  } else if (node.program.depthTest) {
                      transparent.push(node);
                  } else {
                      ui.push(node);
                  }

                  node.zDepth = 0;

                  // Only calculate z-depth if renderOrder unset and depthTest is true
                  if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return;

                  // update z-depth
                  node.worldMatrix.getTranslation(tempVec3$1);
                  tempVec3$1.applyMatrix4(camera.projectionViewMatrix);
                  node.zDepth = tempVec3$1.z;
              });

              opaque.sort(this.sortOpaque);
              transparent.sort(this.sortTransparent);
              ui.sort(this.sortUI);

              renderList = opaque.concat(transparent, ui);
          }

          return renderList;
      }

      render({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
          if (target === null) {
              // make sure no render target bound so draws to canvas
              this.bindFramebuffer();
              this.setViewport(this.width * this.dpr, this.height * this.dpr);
          } else {
              // bind supplied render target and update viewport
              this.bindFramebuffer(target);
              this.setViewport(target.width, target.height);
          }

          if (clear || (this.autoClear && clear !== false)) {
              // Ensure depth buffer writing is enabled so it can be cleared
              if (this.depth && (!target || target.depth)) {
                  this.enable(this.gl.DEPTH_TEST);
                  this.setDepthMask(true);
              }
              this.gl.clear(
                  (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
                      (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
                      (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
              );
          }

          // updates all scene graph matrices
          if (update) scene.updateMatrixWorld();

          // Update camera separately, in case not in scene graph
          if (camera) camera.updateMatrixWorld();

          // Get render list - entails culling and sorting
          const renderList = this.getRenderList({ scene, camera, frustumCull, sort });

          renderList.forEach((node) => {
              node.draw({ camera });
          });
      }
  }

  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */
  function copy$1(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
  }

  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */
  function set$1(out, x, y, z, w) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
  }

  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */
  function normalize$1(out, a) {
      let x = a[0];
      let y = a[1];
      let z = a[2];
      let w = a[3];
      let len = x * x + y * y + z * z + w * w;
      if (len > 0) {
          len = 1 / Math.sqrt(len);
      }
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
      return out;
  }

  /**
   * Calculates the dot product of two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot$1(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */
  function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
  }

  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/
  function setAxisAngle(out, axis, rad) {
      rad = rad * 0.5;
      let s = Math.sin(rad);
      out[0] = s * axis[0];
      out[1] = s * axis[1];
      out[2] = s * axis[2];
      out[3] = Math.cos(rad);
      return out;
  }

  /**
   * Multiplies two quats
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */
  function multiply$1(out, a, b) {
      let ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      let bx = b[0],
          by = b[1],
          bz = b[2],
          bw = b[3];

      out[0] = ax * bw + aw * bx + ay * bz - az * by;
      out[1] = ay * bw + aw * by + az * bx - ax * bz;
      out[2] = az * bw + aw * bz + ax * by - ay * bx;
      out[3] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
  }

  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  function rotateX(out, a, rad) {
      rad *= 0.5;

      let ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      let bx = Math.sin(rad),
          bw = Math.cos(rad);

      out[0] = ax * bw + aw * bx;
      out[1] = ay * bw + az * bx;
      out[2] = az * bw - ay * bx;
      out[3] = aw * bw - ax * bx;
      return out;
  }

  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  function rotateY(out, a, rad) {
      rad *= 0.5;

      let ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      let by = Math.sin(rad),
          bw = Math.cos(rad);

      out[0] = ax * bw - az * by;
      out[1] = ay * bw + aw * by;
      out[2] = az * bw + ax * by;
      out[3] = aw * bw - ay * by;
      return out;
  }

  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  function rotateZ(out, a, rad) {
      rad *= 0.5;

      let ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      let bz = Math.sin(rad),
          bw = Math.cos(rad);

      out[0] = ax * bw + ay * bz;
      out[1] = ay * bw - ax * bz;
      out[2] = az * bw + aw * bz;
      out[3] = aw * bw - az * bz;
      return out;
  }

  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {quat} out
   */
  function slerp(out, a, b, t) {
      // benchmarks:
      //    http://jsperf.com/quaternion-slerp-implementations
      let ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      let bx = b[0],
          by = b[1],
          bz = b[2],
          bw = b[3];

      let omega, cosom, sinom, scale0, scale1;

      // calc cosine
      cosom = ax * bx + ay * by + az * bz + aw * bw;
      // adjust signs (if necessary)
      if (cosom < 0.0) {
          cosom = -cosom;
          bx = -bx;
          by = -by;
          bz = -bz;
          bw = -bw;
      }
      // calculate coefficients
      if (1.0 - cosom > 0.000001) {
          // standard case (slerp)
          omega = Math.acos(cosom);
          sinom = Math.sin(omega);
          scale0 = Math.sin((1.0 - t) * omega) / sinom;
          scale1 = Math.sin(t * omega) / sinom;
      } else {
          // "from" and "to" quaternions are very close
          //  ... so we can do a linear interpolation
          scale0 = 1.0 - t;
          scale1 = t;
      }
      // calculate final values
      out[0] = scale0 * ax + scale1 * bx;
      out[1] = scale0 * ay + scale1 * by;
      out[2] = scale0 * az + scale1 * bz;
      out[3] = scale0 * aw + scale1 * bw;

      return out;
  }

  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate inverse of
   * @returns {quat} out
   */
  function invert(out, a) {
      let a0 = a[0],
          a1 = a[1],
          a2 = a[2],
          a3 = a[3];
      let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
      let invDot = dot ? 1.0 / dot : 0;

      // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

      out[0] = -a0 * invDot;
      out[1] = -a1 * invDot;
      out[2] = -a2 * invDot;
      out[3] = a3 * invDot;
      return out;
  }

  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */
  function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      return out;
  }

  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */
  function fromMat3(out, m) {
      // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
      // article "Quaternion Calculus and Fast Animation".
      let fTrace = m[0] + m[4] + m[8];
      let fRoot;

      if (fTrace > 0.0) {
          // |w| > 1/2, may as well choose w > 1/2
          fRoot = Math.sqrt(fTrace + 1.0); // 2w
          out[3] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot; // 1/(4w)
          out[0] = (m[5] - m[7]) * fRoot;
          out[1] = (m[6] - m[2]) * fRoot;
          out[2] = (m[1] - m[3]) * fRoot;
      } else {
          // |w| <= 1/2
          let i = 0;
          if (m[4] > m[0]) i = 1;
          if (m[8] > m[i * 3 + i]) i = 2;
          let j = (i + 1) % 3;
          let k = (i + 2) % 3;

          fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
          out[i] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot;
          out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
          out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
          out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
      }

      return out;
  }

  /**
   * Creates a quaternion from the given euler angle x, y, z.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} euler Angles to rotate around each axis in degrees.
   * @param {String} order detailing order of operations. Default 'XYZ'.
   * @returns {quat} out
   * @function
   */
  function fromEuler(out, euler, order = 'YXZ') {
      let sx = Math.sin(euler[0] * 0.5);
      let cx = Math.cos(euler[0] * 0.5);
      let sy = Math.sin(euler[1] * 0.5);
      let cy = Math.cos(euler[1] * 0.5);
      let sz = Math.sin(euler[2] * 0.5);
      let cz = Math.cos(euler[2] * 0.5);

      if (order === 'XYZ') {
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
      } else if (order === 'YXZ') {
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
      } else if (order === 'ZXY') {
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
      } else if (order === 'ZYX') {
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
      } else if (order === 'YZX') {
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
      } else if (order === 'XZY') {
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
      }

      return out;
  }

  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */
  const copy$2 = copy$1;

  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */
  const set$2 = set$1;

  /**
   * Calculates the dot product of two quat's
   *
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */
  const dot$2 = dot$1;

  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */
  const normalize$2 = normalize$1;

  class Quat extends Array {
      constructor(x = 0, y = 0, z = 0, w = 1) {
          super(x, y, z, w);
          this.onChange = () => {};
          return this;
      }

      get x() {
          return this[0];
      }

      get y() {
          return this[1];
      }

      get z() {
          return this[2];
      }

      get w() {
          return this[3];
      }

      set x(v) {
          this[0] = v;
          this.onChange();
      }

      set y(v) {
          this[1] = v;
          this.onChange();
      }

      set z(v) {
          this[2] = v;
          this.onChange();
      }

      set w(v) {
          this[3] = v;
          this.onChange();
      }

      identity() {
          identity(this);
          this.onChange();
          return this;
      }

      set(x, y, z, w) {
          if (x.length) return this.copy(x);
          set$2(this, x, y, z, w);
          this.onChange();
          return this;
      }

      rotateX(a) {
          rotateX(this, this, a);
          this.onChange();
          return this;
      }

      rotateY(a) {
          rotateY(this, this, a);
          this.onChange();
          return this;
      }

      rotateZ(a) {
          rotateZ(this, this, a);
          this.onChange();
          return this;
      }

      inverse(q = this) {
          invert(this, q);
          this.onChange();
          return this;
      }

      conjugate(q = this) {
          conjugate(this, q);
          this.onChange();
          return this;
      }

      copy(q) {
          copy$2(this, q);
          this.onChange();
          return this;
      }

      normalize(q = this) {
          normalize$2(this, q);
          this.onChange();
          return this;
      }

      multiply(qA, qB) {
          if (qB) {
              multiply$1(this, qA, qB);
          } else {
              multiply$1(this, this, qA);
          }
          this.onChange();
          return this;
      }

      dot(v) {
          return dot$2(this, v);
      }

      fromMatrix3(matrix3) {
          fromMat3(this, matrix3);
          this.onChange();
          return this;
      }

      fromEuler(euler) {
          fromEuler(this, euler, euler.order);
          return this;
      }

      fromAxisAngle(axis, a) {
          setAxisAngle(this, axis, a);
          return this;
      }

      slerp(q, t) {
          slerp(this, this, q, t);
          return this;
      }

      fromArray(a, o = 0) {
          this[0] = a[o];
          this[1] = a[o + 1];
          this[2] = a[o + 2];
          this[3] = a[o + 3];
          return this;
      }

      toArray(a = [], o = 0) {
          a[o] = this[0];
          a[o + 1] = this[1];
          a[o + 2] = this[2];
          a[o + 3] = this[3];
          return a;
      }
  }

  const EPSILON = 0.000001;

  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function copy$3(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
  }

  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
  function set$3(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
  }

  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
  function identity$1(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
  }

  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function invert$1(out, a) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];

      let b00 = a00 * a11 - a01 * a10;
      let b01 = a00 * a12 - a02 * a10;
      let b02 = a00 * a13 - a03 * a10;
      let b03 = a01 * a12 - a02 * a11;
      let b04 = a01 * a13 - a03 * a11;
      let b05 = a02 * a13 - a03 * a12;
      let b06 = a20 * a31 - a21 * a30;
      let b07 = a20 * a32 - a22 * a30;
      let b08 = a20 * a33 - a23 * a30;
      let b09 = a21 * a32 - a22 * a31;
      let b10 = a21 * a33 - a23 * a31;
      let b11 = a22 * a33 - a23 * a32;

      // Calculate the determinant
      let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if (!det) {
          return null;
      }
      det = 1.0 / det;

      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

      return out;
  }

  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} a the source matrix
   * @returns {Number} determinant of a
   */
  function determinant(a) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];

      let b00 = a00 * a11 - a01 * a10;
      let b01 = a00 * a12 - a02 * a10;
      let b02 = a00 * a13 - a03 * a10;
      let b03 = a01 * a12 - a02 * a11;
      let b04 = a01 * a13 - a03 * a11;
      let b05 = a02 * a13 - a03 * a12;
      let b06 = a20 * a31 - a21 * a30;
      let b07 = a20 * a32 - a22 * a30;
      let b08 = a20 * a33 - a23 * a30;
      let b09 = a21 * a32 - a22 * a31;
      let b10 = a21 * a33 - a23 * a31;
      let b11 = a22 * a33 - a23 * a32;

      // Calculate the determinant
      return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }

  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  function multiply$2(out, a, b) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];

      // Cache only the current line of the second matrix
      let b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
  }

  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */
  function translate(out, a, v) {
      let x = v[0],
          y = v[1],
          z = v[2];
      let a00, a01, a02, a03;
      let a10, a11, a12, a13;
      let a20, a21, a22, a23;

      if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
          a00 = a[0];
          a01 = a[1];
          a02 = a[2];
          a03 = a[3];
          a10 = a[4];
          a11 = a[5];
          a12 = a[6];
          a13 = a[7];
          a20 = a[8];
          a21 = a[9];
          a22 = a[10];
          a23 = a[11];

          out[0] = a00;
          out[1] = a01;
          out[2] = a02;
          out[3] = a03;
          out[4] = a10;
          out[5] = a11;
          out[6] = a12;
          out[7] = a13;
          out[8] = a20;
          out[9] = a21;
          out[10] = a22;
          out[11] = a23;

          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }

      return out;
  }

  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
  function scale$1(out, a, v) {
      let x = v[0],
          y = v[1],
          z = v[2];

      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
  }

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  function rotate(out, a, rad, axis) {
      let x = axis[0],
          y = axis[1],
          z = axis[2];
      let len = Math.hypot(x, y, z);
      let s, c, t;
      let a00, a01, a02, a03;
      let a10, a11, a12, a13;
      let a20, a21, a22, a23;
      let b00, b01, b02;
      let b10, b11, b12;
      let b20, b21, b22;

      if (Math.abs(len) < EPSILON) {
          return null;
      }

      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;

      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;

      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];

      // Construct the elements of the rotation matrix
      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c;

      // Perform rotation-specific matrix multiplication
      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;

      if (a !== out) {
          // If the source and destination differ, copy the unchanged last row
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
      }
      return out;
  }

  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  function getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];

      return out;
  }

  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  function getScaling(out, mat) {
      let m11 = mat[0];
      let m12 = mat[1];
      let m13 = mat[2];
      let m21 = mat[4];
      let m22 = mat[5];
      let m23 = mat[6];
      let m31 = mat[8];
      let m32 = mat[9];
      let m33 = mat[10];

      out[0] = Math.hypot(m11, m12, m13);
      out[1] = Math.hypot(m21, m22, m23);
      out[2] = Math.hypot(m31, m32, m33);

      return out;
  }

  function getMaxScaleOnAxis(mat) {
      let m11 = mat[0];
      let m12 = mat[1];
      let m13 = mat[2];
      let m21 = mat[4];
      let m22 = mat[5];
      let m23 = mat[6];
      let m31 = mat[8];
      let m32 = mat[9];
      let m33 = mat[10];

      const x = m11 * m11 + m12 * m12 + m13 * m13;
      const y = m21 * m21 + m22 * m22 + m23 * m23;
      const z = m31 * m31 + m32 * m32 + m33 * m33;

      return Math.sqrt(Math.max(x, y, z));
  }

  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {mat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */
  const getRotation = (function () {
      const temp = [0, 0, 0];

      return function (out, mat) {
          let scaling = temp;
          getScaling(scaling, mat);

          let is1 = 1 / scaling[0];
          let is2 = 1 / scaling[1];
          let is3 = 1 / scaling[2];

          let sm11 = mat[0] * is1;
          let sm12 = mat[1] * is2;
          let sm13 = mat[2] * is3;
          let sm21 = mat[4] * is1;
          let sm22 = mat[5] * is2;
          let sm23 = mat[6] * is3;
          let sm31 = mat[8] * is1;
          let sm32 = mat[9] * is2;
          let sm33 = mat[10] * is3;

          let trace = sm11 + sm22 + sm33;
          let S = 0;

          if (trace > 0) {
              S = Math.sqrt(trace + 1.0) * 2;
              out[3] = 0.25 * S;
              out[0] = (sm23 - sm32) / S;
              out[1] = (sm31 - sm13) / S;
              out[2] = (sm12 - sm21) / S;
          } else if (sm11 > sm22 && sm11 > sm33) {
              S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
              out[3] = (sm23 - sm32) / S;
              out[0] = 0.25 * S;
              out[1] = (sm12 + sm21) / S;
              out[2] = (sm31 + sm13) / S;
          } else if (sm22 > sm33) {
              S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
              out[3] = (sm31 - sm13) / S;
              out[0] = (sm12 + sm21) / S;
              out[1] = 0.25 * S;
              out[2] = (sm23 + sm32) / S;
          } else {
              S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
              out[3] = (sm12 - sm21) / S;
              out[0] = (sm31 + sm13) / S;
              out[1] = (sm23 + sm32) / S;
              out[2] = 0.25 * S;
          }

          return out;
      };
  })();

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @returns {mat4} out
   */
  function fromRotationTranslationScale(out, q, v, s) {
      // Quaternion math
      let x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      let x2 = x + x;
      let y2 = y + y;
      let z2 = z + z;

      let xx = x * x2;
      let xy = x * y2;
      let xz = x * z2;
      let yy = y * y2;
      let yz = y * z2;
      let zz = z * z2;
      let wx = w * x2;
      let wy = w * y2;
      let wz = w * z2;
      let sx = s[0];
      let sy = s[1];
      let sz = s[2];

      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;

      return out;
  }

  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */
  function fromQuat(out, q) {
      let x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      let x2 = x + x;
      let y2 = y + y;
      let z2 = z + z;

      let xx = x * x2;
      let yx = y * x2;
      let yy = y * y2;
      let zx = z * x2;
      let zy = z * y2;
      let zz = z * z2;
      let wx = w * x2;
      let wy = w * y2;
      let wz = w * z2;

      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;

      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;

      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;

      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;

      return out;
  }

  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function perspective(out, fovy, aspect, near, far) {
      let f = 1.0 / Math.tan(fovy / 2);
      let nf = 1 / (near - far);
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = 2 * far * near * nf;
      out[15] = 0;
      return out;
  }

  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function ortho(out, left, right, bottom, top, near, far) {
      let lr = 1 / (left - right);
      let bt = 1 / (bottom - top);
      let nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
  }

  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} target Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */
  function targetTo(out, eye, target, up) {
      let eyex = eye[0],
          eyey = eye[1],
          eyez = eye[2],
          upx = up[0],
          upy = up[1],
          upz = up[2];

      let z0 = eyex - target[0],
          z1 = eyey - target[1],
          z2 = eyez - target[2];

      let len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len === 0) {
          // eye and target are in the same position
          z2 = 1;
      } else {
          len = 1 / Math.sqrt(len);
          z0 *= len;
          z1 *= len;
          z2 *= len;
      }

      let x0 = upy * z2 - upz * z1,
          x1 = upz * z0 - upx * z2,
          x2 = upx * z1 - upy * z0;

      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len === 0) {
          // up and z are parallel
          if (upz) {
              upx += 1e-6;
          } else if (upy) {
              upz += 1e-6;
          } else {
              upy += 1e-6;
          }
          (x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);

          len = x0 * x0 + x1 * x1 + x2 * x2;
      }

      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;

      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
  }

  class Mat4 extends Array {
      constructor(
          m00 = 1,
          m01 = 0,
          m02 = 0,
          m03 = 0,
          m10 = 0,
          m11 = 1,
          m12 = 0,
          m13 = 0,
          m20 = 0,
          m21 = 0,
          m22 = 1,
          m23 = 0,
          m30 = 0,
          m31 = 0,
          m32 = 0,
          m33 = 1
      ) {
          super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
          return this;
      }

      get x() {
          return this[12];
      }

      get y() {
          return this[13];
      }

      get z() {
          return this[14];
      }

      get w() {
          return this[15];
      }

      set x(v) {
          this[12] = v;
      }

      set y(v) {
          this[13] = v;
      }

      set z(v) {
          this[14] = v;
      }

      set w(v) {
          this[15] = v;
      }

      set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
          if (m00.length) return this.copy(m00);
          set$3(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
          return this;
      }

      translate(v, m = this) {
          translate(this, m, v);
          return this;
      }

      rotate(v, axis, m = this) {
          rotate(this, m, v, axis);
          return this;
      }

      scale(v, m = this) {
          scale$1(this, m, typeof v === 'number' ? [v, v, v] : v);
          return this;
      }

      multiply(ma, mb) {
          if (mb) {
              multiply$2(this, ma, mb);
          } else {
              multiply$2(this, this, ma);
          }
          return this;
      }

      identity() {
          identity$1(this);
          return this;
      }

      copy(m) {
          copy$3(this, m);
          return this;
      }

      fromPerspective({ fov, aspect, near, far } = {}) {
          perspective(this, fov, aspect, near, far);
          return this;
      }

      fromOrthogonal({ left, right, bottom, top, near, far }) {
          ortho(this, left, right, bottom, top, near, far);
          return this;
      }

      fromQuaternion(q) {
          fromQuat(this, q);
          return this;
      }

      setPosition(v) {
          this.x = v[0];
          this.y = v[1];
          this.z = v[2];
          return this;
      }

      inverse(m = this) {
          invert$1(this, m);
          return this;
      }

      compose(q, pos, scale) {
          fromRotationTranslationScale(this, q, pos, scale);
          return this;
      }

      getRotation(q) {
          getRotation(q, this);
          return this;
      }

      getTranslation(pos) {
          getTranslation(pos, this);
          return this;
      }

      getScaling(scale) {
          getScaling(scale, this);
          return this;
      }

      getMaxScaleOnAxis() {
          return getMaxScaleOnAxis(this);
      }

      lookAt(eye, target, up) {
          targetTo(this, eye, target, up);
          return this;
      }

      determinant() {
          return determinant(this);
      }
  }

  // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
  function fromRotationMatrix(out, m, order = 'YXZ') {
      if (order === 'XYZ') {
          out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
          if (Math.abs(m[8]) < 0.99999) {
              out[0] = Math.atan2(-m[9], m[10]);
              out[2] = Math.atan2(-m[4], m[0]);
          } else {
              out[0] = Math.atan2(m[6], m[5]);
              out[2] = 0;
          }
      } else if (order === 'YXZ') {
          out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
          if (Math.abs(m[9]) < 0.99999) {
              out[1] = Math.atan2(m[8], m[10]);
              out[2] = Math.atan2(m[1], m[5]);
          } else {
              out[1] = Math.atan2(-m[2], m[0]);
              out[2] = 0;
          }
      } else if (order === 'ZXY') {
          out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
          if (Math.abs(m[6]) < 0.99999) {
              out[1] = Math.atan2(-m[2], m[10]);
              out[2] = Math.atan2(-m[4], m[5]);
          } else {
              out[1] = 0;
              out[2] = Math.atan2(m[1], m[0]);
          }
      } else if (order === 'ZYX') {
          out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
          if (Math.abs(m[2]) < 0.99999) {
              out[0] = Math.atan2(m[6], m[10]);
              out[2] = Math.atan2(m[1], m[0]);
          } else {
              out[0] = 0;
              out[2] = Math.atan2(-m[4], m[5]);
          }
      } else if (order === 'YZX') {
          out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
          if (Math.abs(m[1]) < 0.99999) {
              out[0] = Math.atan2(-m[9], m[5]);
              out[1] = Math.atan2(-m[2], m[0]);
          } else {
              out[0] = 0;
              out[1] = Math.atan2(m[8], m[10]);
          }
      } else if (order === 'XZY') {
          out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
          if (Math.abs(m[4]) < 0.99999) {
              out[0] = Math.atan2(m[6], m[5]);
              out[1] = Math.atan2(m[8], m[0]);
          } else {
              out[0] = Math.atan2(-m[9], m[10]);
              out[1] = 0;
          }
      }

      return out;
  }

  const tmpMat4 = new Mat4();

  class Euler extends Array {
      constructor(x = 0, y = x, z = x, order = 'YXZ') {
          super(x, y, z);
          this.order = order;
          this.onChange = () => {};
          return this;
      }

      get x() {
          return this[0];
      }

      get y() {
          return this[1];
      }

      get z() {
          return this[2];
      }

      set x(v) {
          this[0] = v;
          this.onChange();
      }

      set y(v) {
          this[1] = v;
          this.onChange();
      }

      set z(v) {
          this[2] = v;
          this.onChange();
      }

      set(x, y = x, z = x) {
          if (x.length) return this.copy(x);
          this[0] = x;
          this[1] = y;
          this[2] = z;
          this.onChange();
          return this;
      }

      copy(v) {
          this[0] = v[0];
          this[1] = v[1];
          this[2] = v[2];
          this.onChange();
          return this;
      }

      reorder(order) {
          this.order = order;
          this.onChange();
          return this;
      }

      fromRotationMatrix(m, order = this.order) {
          fromRotationMatrix(this, m, order);
          return this;
      }

      fromQuaternion(q, order = this.order) {
          tmpMat4.fromQuaternion(q);
          return this.fromRotationMatrix(tmpMat4, order);
      }
  }

  class Transform {
      constructor() {
          this.parent = null;
          this.children = [];
          this.visible = true;

          this.matrix = new Mat4();
          this.worldMatrix = new Mat4();
          this.matrixAutoUpdate = true;

          this.position = new Vec3();
          this.quaternion = new Quat();
          this.scale = new Vec3(1);
          this.rotation = new Euler();
          this.up = new Vec3(0, 1, 0);

          this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
          this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
      }

      setParent(parent, notifyParent = true) {
          if (notifyParent && this.parent && parent !== this.parent) this.parent.removeChild(this, false);
          this.parent = parent;
          if (notifyParent && parent) parent.addChild(this, false);
      }

      addChild(child, notifyChild = true) {
          if (!~this.children.indexOf(child)) this.children.push(child);
          if (notifyChild) child.setParent(this, false);
      }

      removeChild(child, notifyChild = true) {
          if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
          if (notifyChild) child.setParent(null, false);
      }

      updateMatrixWorld(force) {
          if (this.matrixAutoUpdate) this.updateMatrix();
          if (this.worldMatrixNeedsUpdate || force) {
              if (this.parent === null) this.worldMatrix.copy(this.matrix);
              else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
              this.worldMatrixNeedsUpdate = false;
              force = true;
          }

          for (let i = 0, l = this.children.length; i < l; i++) {
              this.children[i].updateMatrixWorld(force);
          }
      }

      updateMatrix() {
          this.matrix.compose(this.quaternion, this.position, this.scale);
          this.worldMatrixNeedsUpdate = true;
      }

      traverse(callback) {
          // Return true in callback to stop traversing children
          if (callback(this)) return;
          for (let i = 0, l = this.children.length; i < l; i++) {
              this.children[i].traverse(callback);
          }
      }

      decompose() {
          this.matrix.getTranslation(this.position);
          this.matrix.getRotation(this.quaternion);
          this.matrix.getScaling(this.scale);
          this.rotation.fromQuaternion(this.quaternion);
      }

      lookAt(target, invert = false) {
          if (invert) this.matrix.lookAt(this.position, target, this.up);
          else this.matrix.lookAt(target, this.position, this.up);
          this.matrix.getRotation(this.quaternion);
          this.rotation.fromQuaternion(this.quaternion);
      }
  }

  const tempMat4 = new Mat4();
  const tempVec3a = new Vec3();
  const tempVec3b = new Vec3();

  class Camera extends Transform {
      constructor(gl, { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {}) {
          super();

          Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });

          this.projectionMatrix = new Mat4();
          this.viewMatrix = new Mat4();
          this.projectionViewMatrix = new Mat4();
          this.worldPosition = new Vec3();

          // Use orthographic if left/right set, else default to perspective camera
          this.type = left || right ? 'orthographic' : 'perspective';

          if (this.type === 'orthographic') this.orthographic();
          else this.perspective();
      }

      perspective({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
          Object.assign(this, { near, far, fov, aspect });
          this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
          this.type = 'perspective';
          return this;
      }

      orthographic({
          near = this.near,
          far = this.far,
          left = this.left,
          right = this.right,
          bottom = this.bottom,
          top = this.top,
          zoom = this.zoom,
      } = {}) {
          Object.assign(this, { near, far, left, right, bottom, top, zoom });
          left /= zoom;
          right /= zoom;
          bottom /= zoom;
          top /= zoom;
          this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
          this.type = 'orthographic';
          return this;
      }

      updateMatrixWorld() {
          super.updateMatrixWorld();
          this.viewMatrix.inverse(this.worldMatrix);
          this.worldMatrix.getTranslation(this.worldPosition);

          // used for sorting
          this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
          return this;
      }

      lookAt(target) {
          super.lookAt(target, true);
          return this;
      }

      // Project 3D coordinate to 2D point
      project(v) {
          v.applyMatrix4(this.viewMatrix);
          v.applyMatrix4(this.projectionMatrix);
          return this;
      }

      // Unproject 2D point to 3D coordinate
      unproject(v) {
          v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
          v.applyMatrix4(this.worldMatrix);
          return this;
      }

      updateFrustum() {
          if (!this.frustum) {
              this.frustum = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
          }

          const m = this.projectionViewMatrix;
          this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x
          this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x
          this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y
          this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y
          this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)
          this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

          for (let i = 0; i < 6; i++) {
              const invLen = 1.0 / this.frustum[i].distance();
              this.frustum[i].multiply(invLen);
              this.frustum[i].constant *= invLen;
          }
      }

      frustumIntersectsMesh(node) {
          // If no position attribute, treat as frustumCulled false
          if (!node.geometry.attributes.position) return true;

          if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();

          if (!node.geometry.bounds) return true;

          const center = tempVec3a;
          center.copy(node.geometry.bounds.center);
          center.applyMatrix4(node.worldMatrix);

          const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();

          return this.frustumIntersectsSphere(center, radius);
      }

      frustumIntersectsSphere(center, radius) {
          const normal = tempVec3b;

          for (let i = 0; i < 6; i++) {
              const plane = this.frustum[i];
              const distance = normal.copy(plane).dot(center) + plane.constant;
              if (distance < -radius) return false;
          }
          return true;
      }
  }

  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {mat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */
  function fromMat4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[4];
      out[4] = a[5];
      out[5] = a[6];
      out[6] = a[8];
      out[7] = a[9];
      out[8] = a[10];
      return out;
  }

  /**
   * Calculates a 3x3 matrix from the given quaternion
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat3} out
   */
  function fromQuat$1(out, q) {
      let x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      let x2 = x + x;
      let y2 = y + y;
      let z2 = z + z;

      let xx = x * x2;
      let yx = y * x2;
      let yy = y * y2;
      let zx = z * x2;
      let zy = z * y2;
      let zz = z * z2;
      let wx = w * x2;
      let wy = w * y2;
      let wz = w * z2;

      out[0] = 1 - yy - zz;
      out[3] = yx - wz;
      out[6] = zx + wy;

      out[1] = yx + wz;
      out[4] = 1 - xx - zz;
      out[7] = zy - wx;

      out[2] = zx - wy;
      out[5] = zy + wx;
      out[8] = 1 - xx - yy;

      return out;
  }

  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function copy$4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
  }

  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */
  function set$4(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
  }

  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */
  function identity$2(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
  }

  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function invert$2(out, a) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2];
      let a10 = a[3],
          a11 = a[4],
          a12 = a[5];
      let a20 = a[6],
          a21 = a[7],
          a22 = a[8];

      let b01 = a22 * a11 - a12 * a21;
      let b11 = -a22 * a10 + a12 * a20;
      let b21 = a21 * a10 - a11 * a20;

      // Calculate the determinant
      let det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
          return null;
      }
      det = 1.0 / det;

      out[0] = b01 * det;
      out[1] = (-a22 * a01 + a02 * a21) * det;
      out[2] = (a12 * a01 - a02 * a11) * det;
      out[3] = b11 * det;
      out[4] = (a22 * a00 - a02 * a20) * det;
      out[5] = (-a12 * a00 + a02 * a10) * det;
      out[6] = b21 * det;
      out[7] = (-a21 * a00 + a01 * a20) * det;
      out[8] = (a11 * a00 - a01 * a10) * det;
      return out;
  }

  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  function multiply$3(out, a, b) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2];
      let a10 = a[3],
          a11 = a[4],
          a12 = a[5];
      let a20 = a[6],
          a21 = a[7],
          a22 = a[8];

      let b00 = b[0],
          b01 = b[1],
          b02 = b[2];
      let b10 = b[3],
          b11 = b[4],
          b12 = b[5];
      let b20 = b[6],
          b21 = b[7],
          b22 = b[8];

      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;

      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;

      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return out;
  }

  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to translate
   * @param {vec2} v vector to translate by
   * @returns {mat3} out
   */
  function translate$1(out, a, v) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a10 = a[3],
          a11 = a[4],
          a12 = a[5],
          a20 = a[6],
          a21 = a[7],
          a22 = a[8],
          x = v[0],
          y = v[1];

      out[0] = a00;
      out[1] = a01;
      out[2] = a02;

      out[3] = a10;
      out[4] = a11;
      out[5] = a12;

      out[6] = x * a00 + y * a10 + a20;
      out[7] = x * a01 + y * a11 + a21;
      out[8] = x * a02 + y * a12 + a22;
      return out;
  }

  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */
  function rotate$1(out, a, rad) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a10 = a[3],
          a11 = a[4],
          a12 = a[5],
          a20 = a[6],
          a21 = a[7],
          a22 = a[8],
          s = Math.sin(rad),
          c = Math.cos(rad);

      out[0] = c * a00 + s * a10;
      out[1] = c * a01 + s * a11;
      out[2] = c * a02 + s * a12;

      out[3] = c * a10 - s * a00;
      out[4] = c * a11 - s * a01;
      out[5] = c * a12 - s * a02;

      out[6] = a20;
      out[7] = a21;
      out[8] = a22;
      return out;
  }

  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/
  function scale$2(out, a, v) {
      let x = v[0],
          y = v[1];

      out[0] = x * a[0];
      out[1] = x * a[1];
      out[2] = x * a[2];

      out[3] = y * a[3];
      out[4] = y * a[4];
      out[5] = y * a[5];

      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
  }

  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {mat4} a Mat4 to derive the normal matrix from
   *
   * @returns {mat3} out
   */
  function normalFromMat4(out, a) {
      let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];

      let b00 = a00 * a11 - a01 * a10;
      let b01 = a00 * a12 - a02 * a10;
      let b02 = a00 * a13 - a03 * a10;
      let b03 = a01 * a12 - a02 * a11;
      let b04 = a01 * a13 - a03 * a11;
      let b05 = a02 * a13 - a03 * a12;
      let b06 = a20 * a31 - a21 * a30;
      let b07 = a20 * a32 - a22 * a30;
      let b08 = a20 * a33 - a23 * a30;
      let b09 = a21 * a32 - a22 * a31;
      let b10 = a21 * a33 - a23 * a31;
      let b11 = a22 * a33 - a23 * a32;

      // Calculate the determinant
      let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if (!det) {
          return null;
      }
      det = 1.0 / det;

      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

      out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

      out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

      return out;
  }

  class Mat3 extends Array {
      constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
          super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
          return this;
      }

      set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
          if (m00.length) return this.copy(m00);
          set$4(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
          return this;
      }

      translate(v, m = this) {
          translate$1(this, m, v);
          return this;
      }

      rotate(v, m = this) {
          rotate$1(this, m, v);
          return this;
      }

      scale(v, m = this) {
          scale$2(this, m, v);
          return this;
      }

      multiply(ma, mb) {
          if (mb) {
              multiply$3(this, ma, mb);
          } else {
              multiply$3(this, this, ma);
          }
          return this;
      }

      identity() {
          identity$2(this);
          return this;
      }

      copy(m) {
          copy$4(this, m);
          return this;
      }

      fromMatrix4(m) {
          fromMat4(this, m);
          return this;
      }

      fromQuaternion(q) {
          fromQuat$1(this, q);
          return this;
      }

      fromBasis(vec3a, vec3b, vec3c) {
          this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
          return this;
      }

      inverse(m = this) {
          invert$2(this, m);
          return this;
      }

      getNormalMatrix(m) {
          normalFromMat4(this, m);
          return this;
      }
  }

  let ID$3 = 0;

  class Mesh extends Transform {
      constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
          super();
          if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
          this.gl = gl;
          this.id = ID$3++;
          this.geometry = geometry;
          this.program = program;
          this.mode = mode;

          // Used to skip frustum culling
          this.frustumCulled = frustumCulled;

          // Override sorting to force an order
          this.renderOrder = renderOrder;
          this.modelViewMatrix = new Mat4();
          this.normalMatrix = new Mat3();
          this.beforeRenderCallbacks = [];
          this.afterRenderCallbacks = [];
      }

      onBeforeRender(f) {
          this.beforeRenderCallbacks.push(f);
          return this;
      }

      onAfterRender(f) {
          this.afterRenderCallbacks.push(f);
          return this;
      }

      draw({ camera } = {}) {
          this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
          if (camera) {
              // Add empty matrix uniforms to program if unset
              if (!this.program.uniforms.modelMatrix) {
                  Object.assign(this.program.uniforms, {
                      modelMatrix: { value: null },
                      viewMatrix: { value: null },
                      modelViewMatrix: { value: null },
                      normalMatrix: { value: null },
                      projectionMatrix: { value: null },
                      cameraPosition: { value: null },
                  });
              }

              // Set the matrix uniforms
              this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
              this.program.uniforms.cameraPosition.value = camera.worldPosition;
              this.program.uniforms.viewMatrix.value = camera.viewMatrix;
              this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
              this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
              this.program.uniforms.modelMatrix.value = this.worldMatrix;
              this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
              this.program.uniforms.normalMatrix.value = this.normalMatrix;
          }

          // determine if faces need to be flipped - when mesh scaled negatively
          let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
          this.program.use({ flipFaces });
          this.geometry.draw({ mode: this.mode, program: this.program });
          this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
      }
  }

  // TODO: delete texture
  // TODO: use texSubImage2D for updates (video or when loaded)
  // TODO: need? encoding = linearEncoding
  // TODO: support non-compressed mipmaps uploads

  const emptyPixel = new Uint8Array(4);

  function isPowerOf2(value) {
      return (value & (value - 1)) === 0;
  }

  let ID$4 = 1;

  class Texture {
      constructor(
          gl,
          {
              image,
              target = gl.TEXTURE_2D,
              type = gl.UNSIGNED_BYTE,
              format = gl.RGBA,
              internalFormat = format,
              wrapS = gl.CLAMP_TO_EDGE,
              wrapT = gl.CLAMP_TO_EDGE,
              generateMipmaps = true,
              minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
              magFilter = gl.LINEAR,
              premultiplyAlpha = false,
              unpackAlignment = 4,
              flipY = target == gl.TEXTURE_2D ? true : false,
              anisotropy = 0,
              level = 0,
              width, // used for RenderTargets or Data Textures
              height = width,
          } = {}
      ) {
          this.gl = gl;
          this.id = ID$4++;

          this.image = image;
          this.target = target;
          this.type = type;
          this.format = format;
          this.internalFormat = internalFormat;
          this.minFilter = minFilter;
          this.magFilter = magFilter;
          this.wrapS = wrapS;
          this.wrapT = wrapT;
          this.generateMipmaps = generateMipmaps;
          this.premultiplyAlpha = premultiplyAlpha;
          this.unpackAlignment = unpackAlignment;
          this.flipY = flipY;
          this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
          this.level = level;
          this.width = width;
          this.height = height;
          this.texture = this.gl.createTexture();

          this.store = {
              image: null,
          };

          // Alias for state store to avoid redundant calls for global state
          this.glState = this.gl.renderer.state;

          // State store to avoid redundant calls for per-texture state
          this.state = {};
          this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
          this.state.magFilter = this.gl.LINEAR;
          this.state.wrapS = this.gl.REPEAT;
          this.state.wrapT = this.gl.REPEAT;
          this.state.anisotropy = 0;
      }

      bind() {
          // Already bound to active texture unit
          if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
          this.gl.bindTexture(this.target, this.texture);
          this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
      }

      update(textureUnit = 0) {
          const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);

          // Make sure that texture is bound to its texture unit
          if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
              // set active texture unit to perform texture functions
              this.gl.renderer.activeTexture(textureUnit);
              this.bind();
          }

          if (!needsUpdate) return;
          this.needsUpdate = false;

          if (this.flipY !== this.glState.flipY) {
              this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
              this.glState.flipY = this.flipY;
          }

          if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
              this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
              this.glState.premultiplyAlpha = this.premultiplyAlpha;
          }

          if (this.unpackAlignment !== this.glState.unpackAlignment) {
              this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
              this.glState.unpackAlignment = this.unpackAlignment;
          }

          if (this.minFilter !== this.state.minFilter) {
              this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
              this.state.minFilter = this.minFilter;
          }

          if (this.magFilter !== this.state.magFilter) {
              this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
              this.state.magFilter = this.magFilter;
          }

          if (this.wrapS !== this.state.wrapS) {
              this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
              this.state.wrapS = this.wrapS;
          }

          if (this.wrapT !== this.state.wrapT) {
              this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
              this.state.wrapT = this.wrapT;
          }

          if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
              this.gl.texParameterf(
                  this.target,
                  this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT,
                  this.anisotropy
              );
              this.state.anisotropy = this.anisotropy;
          }

          if (this.image) {
              if (this.image.width) {
                  this.width = this.image.width;
                  this.height = this.image.height;
              }

              if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                  // For cube maps
                  for (let i = 0; i < 6; i++) {
                      this.gl.texImage2D(
                          this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                          this.level,
                          this.internalFormat,
                          this.format,
                          this.type,
                          this.image[i]
                      );
                  }
              } else if (ArrayBuffer.isView(this.image)) {
                  // Data texture
                  this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
              } else if (this.image.isCompressedTexture) {
                  // Compressed texture
                  for (let level = 0; level < this.image.length; level++) {
                      this.gl.compressedTexImage2D(
                          this.target,
                          level,
                          this.internalFormat,
                          this.image[level].width,
                          this.image[level].height,
                          0,
                          this.image[level].data
                      );
                  }
              } else {
                  // Regular texture
                  this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
              }

              if (this.generateMipmaps) {
                  // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
                  if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
                      this.generateMipmaps = false;
                      this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
                      this.minFilter = this.gl.LINEAR;
                  } else {
                      this.gl.generateMipmap(this.target);
                  }
              }

              // Callback for when data is pushed to GPU
              this.onUpdate && this.onUpdate();
          } else {
              if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                  // Upload empty pixel for each side while no image to avoid errors while image or video loading
                  for (let i = 0; i < 6; i++) {
                      this.gl.texImage2D(
                          this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                          0,
                          this.gl.RGBA,
                          1,
                          1,
                          0,
                          this.gl.RGBA,
                          this.gl.UNSIGNED_BYTE,
                          emptyPixel
                      );
                  }
              } else if (this.width) {
                  // image intentionally left null for RenderTarget
                  this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
              } else {
                  // Upload empty pixel if no image to avoid errors while image or video loading
                  this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
              }
          }
          this.store.image = this.image;
      }
  }

  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */
  function copy$5(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
  }

  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */
  function set$5(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
  }

  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function add$1(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      return out;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function subtract$1(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
  }

  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function multiply$4(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      return out;
  }

  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function divide$1(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      return out;
  }

  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */
  function scale$3(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      return out;
  }

  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance$1(a, b) {
      var x = b[0] - a[0],
          y = b[1] - a[1];
      return Math.sqrt(x * x + y * y);
  }

  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance$1(a, b) {
      var x = b[0] - a[0],
          y = b[1] - a[1];
      return x * x + y * y;
  }

  /**
   * Calculates the length of a vec2
   *
   * @param {vec2} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length$1(a) {
      var x = a[0],
          y = a[1];
      return Math.sqrt(x * x + y * y);
  }

  /**
   * Calculates the squared length of a vec2
   *
   * @param {vec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength$1(a) {
      var x = a[0],
          y = a[1];
      return x * x + y * y;
  }

  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to negate
   * @returns {vec2} out
   */
  function negate$1(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      return out;
  }

  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to invert
   * @returns {vec2} out
   */
  function inverse$1(out, a) {
      out[0] = 1.0 / a[0];
      out[1] = 1.0 / a[1];
      return out;
  }

  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to normalize
   * @returns {vec2} out
   */
  function normalize$3(out, a) {
      var x = a[0],
          y = a[1];
      var len = x * x + y * y;
      if (len > 0) {
          //TODO: evaluate use of glm_invsqrt here?
          len = 1 / Math.sqrt(len);
      }
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      return out;
  }

  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot$3(a, b) {
      return a[0] * b[0] + a[1] * b[1];
  }

  /**
   * Computes the cross product of two vec2's
   * Note that the cross product returns a scalar
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} cross product of a and b
   */
  function cross$1(a, b) {
      return a[0] * b[1] - a[1] * b[0];
  }

  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec2} out
   */
  function lerp$2(out, a, b, t) {
      var ax = a[0],
          ay = a[1];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      return out;
  }

  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat3} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat3(out, a, m) {
      var x = a[0],
          y = a[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
  }

  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat4$1(out, a, m) {
      let x = a[0];
      let y = a[1];
      out[0] = m[0] * x + m[4] * y + m[12];
      out[1] = m[1] * x + m[5] * y + m[13];
      return out;
  }

  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function exactEquals$1(a, b) {
      return a[0] === b[0] && a[1] === b[1];
  }

  class Vec2 extends Array {
      constructor(x = 0, y = x) {
          super(x, y);
          return this;
      }

      get x() {
          return this[0];
      }

      get y() {
          return this[1];
      }

      set x(v) {
          this[0] = v;
      }

      set y(v) {
          this[1] = v;
      }

      set(x, y = x) {
          if (x.length) return this.copy(x);
          set$5(this, x, y);
          return this;
      }

      copy(v) {
          copy$5(this, v);
          return this;
      }

      add(va, vb) {
          if (vb) add$1(this, va, vb);
          else add$1(this, this, va);
          return this;
      }

      sub(va, vb) {
          if (vb) subtract$1(this, va, vb);
          else subtract$1(this, this, va);
          return this;
      }

      multiply(v) {
          if (v.length) multiply$4(this, this, v);
          else scale$3(this, this, v);
          return this;
      }

      divide(v) {
          if (v.length) divide$1(this, this, v);
          else scale$3(this, this, 1 / v);
          return this;
      }

      inverse(v = this) {
          inverse$1(this, v);
          return this;
      }

      // Can't use 'length' as Array.prototype uses it
      len() {
          return length$1(this);
      }

      distance(v) {
          if (v) return distance$1(this, v);
          else return length$1(this);
      }

      squaredLen() {
          return this.squaredDistance();
      }

      squaredDistance(v) {
          if (v) return squaredDistance$1(this, v);
          else return squaredLength$1(this);
      }

      negate(v = this) {
          negate$1(this, v);
          return this;
      }

      cross(va, vb) {
          if (vb) return cross$1(va, vb);
          return cross$1(this, va);
      }

      scale(v) {
          scale$3(this, this, v);
          return this;
      }

      normalize() {
          normalize$3(this, this);
          return this;
      }

      dot(v) {
          return dot$3(this, v);
      }

      equals(v) {
          return exactEquals$1(this, v);
      }

      applyMatrix3(mat3) {
          transformMat3(this, this, mat3);
          return this;
      }

      applyMatrix4(mat4) {
          transformMat4$1(this, this, mat4);
          return this;
      }

      lerp(v, a) {
          lerp$2(this, this, v, a);
      }

      clone() {
          return new Vec2(this[0], this[1]);
      }

      fromArray(a, o = 0) {
          this[0] = a[o];
          this[1] = a[o + 1];
          return this;
      }

      toArray(a = [], o = 0) {
          a[o] = this[0];
          a[o + 1] = this[1];
          return a;
      }
  }

  class Plane extends Geometry {
      constructor(gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {
          const wSegs = widthSegments;
          const hSegs = heightSegments;

          // Determine length of arrays
          const num = (wSegs + 1) * (hSegs + 1);
          const numIndices = wSegs * hSegs * 6;

          // Generate empty arrays once
          const position = new Float32Array(num * 3);
          const normal = new Float32Array(num * 3);
          const uv = new Float32Array(num * 2);
          const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

          Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);

          Object.assign(attributes, {
              position: { size: 3, data: position },
              normal: { size: 3, data: normal },
              uv: { size: 2, data: uv },
              index: { data: index },
          });

          super(gl, attributes);
      }

      static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
          const io = i;
          const segW = width / wSegs;
          const segH = height / hSegs;

          for (let iy = 0; iy <= hSegs; iy++) {
              let y = iy * segH - height / 2;
              for (let ix = 0; ix <= wSegs; ix++, i++) {
                  let x = ix * segW - width / 2;

                  position[i * 3 + u] = x * uDir;
                  position[i * 3 + v] = y * vDir;
                  position[i * 3 + w] = depth / 2;

                  normal[i * 3 + u] = 0;
                  normal[i * 3 + v] = 0;
                  normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                  uv[i * 2] = ix / wSegs;
                  uv[i * 2 + 1] = 1 - iy / hSegs;

                  if (iy === hSegs || ix === wSegs) continue;
                  let a = io + ix + iy * (wSegs + 1);
                  let b = io + ix + (iy + 1) * (wSegs + 1);
                  let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
                  let d = io + ix + iy * (wSegs + 1) + 1;

                  index[ii * 6] = a;
                  index[ii * 6 + 1] = b;
                  index[ii * 6 + 2] = d;
                  index[ii * 6 + 3] = b;
                  index[ii * 6 + 4] = c;
                  index[ii * 6 + 5] = d;
                  ii++;
              }
          }
      }
  }

  var CLASS = {
    LOADING: 'is-loading'
  };

  var _default$6 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));

      _this.el.classList.add(CLASS.LOADING);

      _this.textureSrc = _this.getData('texture');
      _this.displacementSrc = _this.getData('displacement');
      _this.gap = _this.getData('gap');
      _this.windowWidth = window.innerWidth;
      _this.windowHeight = window.innerHeight;
      _this.events = {
        mousemove: {
          wrap: 'mousemove'
        },
        mouseenter: {
          wrap: 'mouseenter'
        },
        mouseleave: {
          wrap: 'mouseleave'
        }
      }; // El and webgl plane BCR

      _this.BCR = _this.el.getBoundingClientRect();
      _this.planeBCR = {
        width: 1,
        height: 1,
        x: 0,
        y: 0
      }; // Useful booleans

      _this.inView = true;
      _this.isLoaded = false;
      _this.isRenderable = false; // Positions

      _this.displacementPosition = new Vec2(-0.5, -0.5);
      _this.mouse = new Vec2(-0.5, -0.5);
      _this.settings = {
        factor: 0,
        factorAim: _this.getData('factor'),
        scale: 0
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.$wrap = this.$('wrap')[0]; // Init ogl renderer

        this.renderer = new Renderer({
          dpr: 2,
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(this.BCR.width, this.BCR.height);
        this.gl = this.renderer.gl;
        this.$wrap.appendChild(this.gl.canvas);
        this.initScene();
        this.initCamera();
        this.initShape();
        this.scrollBind = this.scroll.bind(this);
        document.addEventListener('scroll', this.scrollBind);
        this.resizeBind = this.resize.bind(this);
        window.addEventListener('resize', this.resizeBind);
      }
    }, {
      key: "initScene",
      value: function initScene() {
        this.scene = new Transform();
      }
    }, {
      key: "initCamera",
      value: function initCamera() {
        this.fov = 75;
        this.camera = new Camera(this.glElement, {
          fov: this.fov
        });
        this.camera.position.set(0, 0, 1);
      }
    }, {
      key: "initShape",
      value: function initShape() {
        var _this2 = this;

        this.geometry = new Plane(this.gl, {
          width: 1,
          height: 1,
          widthSegments: 10,
          heightSegments: 10
        });
        var texture = new Texture(this.gl, {
          minFilter: this.gl.LINEAR
        });
        var displacementTexture = new Texture(this.gl, {
          minFilter: this.gl.LINEAR
        });
        var displacementImg = new Image();
        displacementImg.src = this.displacementSrc;

        displacementImg.onload = function () {
          displacementTexture.image = displacementImg;
          var img = new Image();
          img.src = _this2.textureSrc;

          img.onload = function () {
            texture.image = img;
            _this2.program = new Program(_this2.gl, {
              vertex: vertexShader,
              fragment: fragmentShader,
              uniforms: {
                displacementTexture: {
                  value: displacementTexture
                },
                displacement: {
                  value: _this2.displacementPosition
                },
                texture: {
                  value: texture
                },
                factor: {
                  value: _this2.settings.factor
                }
              }
            });
            _this2.mesh = new Mesh(_this2.gl, {
              geometry: _this2.geometry,
              program: _this2.program
            });

            _this2.updateSize();

            _this2.isLoaded = true;

            _this2.el.classList.remove(CLASS.LOADING);

            _this2.render();
          };
        };
      }
    }, {
      key: "calculateUnitSize",
      value: function calculateUnitSize(distance) {
        var vFov = this.fov * Math.PI / 180;
        var height = 2 * Math.tan(vFov / 2) * distance;
        var width = height * this.camera.aspect;
        return {
          width: width,
          height: height
        };
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        this.camUnit = this.calculateUnitSize(this.camera.position.z); // Set size @update

        this.planeBCR.width = this.camUnit.width - this.camUnit.width * (this.gap / 100);
        this.planeBCR.height = this.planeBCR.width / this.camera.aspect;
        this.geometry = new Plane(this.gl, {
          width: this.planeBCR.width,
          height: this.planeBCR.height,
          widthSegments: 100,
          heightSegments: 100
        });
        this.mesh.geometry = this.geometry;
        this.gl.canvas.style.width = "".concat(this.BCR.width, "px");
        this.gl.canvas.style.height = "".concat(this.BCR.height, "px");
      }
    }, {
      key: "mouseenter",
      value: function mouseenter(e) {
        this.isRenderable = true;
        this.formatPosition({
          x: (e.clientX - this.BCR.left) / this.BCR.width,
          y: (e.clientY - this.BCR.top) / this.BCR.height,
          obj: this.mouse
        });
        this.formatPosition({
          x: (e.clientX - this.BCR.left) / this.BCR.width,
          y: (e.clientY - this.BCR.top) / this.BCR.height,
          obj: this.displacementPosition
        });
        gsap.to(this.settings, 0.6, {
          factor: this.settings.factorAim
        });
      }
    }, {
      key: "mouseleave",
      value: function mouseleave(e) {
        var _this3 = this;

        gsap.to(this.settings, 0.6, {
          factor: 0,
          onComplete: function onComplete() {
            _this3.isRenderable = false;
          }
        });
      }
    }, {
      key: "mousemove",
      value: function mousemove(e) {
        this.formatPosition({
          x: (e.clientX - this.BCR.left) / this.BCR.width,
          y: (e.clientY - this.BCR.top) / this.BCR.height,
          obj: this.mouse
        });
        this.formatPosition({
          x: (e.clientX - this.BCR.left) / this.BCR.width,
          y: (e.clientY - this.BCR.top) / this.BCR.height,
          obj: this.displacementPosition
        });
      }
    }, {
      key: "formatPosition",
      value: function formatPosition(param) {
        param.obj.x = -param.x + 0.5;
        param.obj.y = param.y - 0.5;
      }
    }, {
      key: "render",
      value: function render(t) {
        var _this4 = this;

        this.raf = requestAnimationFrame(function (t) {
          return _this4.render(t);
        });

        if (this.isLoaded && this.isRenderable) {
          this.program.uniforms.displacement.value = this.displacementPosition;
          this.program.uniforms.factor.value = this.settings.factor;
        }

        this.renderer.render({
          scene: this.mesh,
          camera: this.camera
        });
      }
    }, {
      key: "resize",
      value: function resize() {
        var newBCR = this.el.getBoundingClientRect();
        if (this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return;
        this.BCR = newBCR;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.renderer.setSize(this.BCR.width, this.BCR.height);
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height
        });
        this.updateSize();
      }
    }, {
      key: "scroll",
      value: function scroll() {
        var newBCR = this.el.getBoundingClientRect();
        if (this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return;
        this.BCR = newBCR;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.resizeBind);
        document.removeEventListener('scroll', this.scrollBind);
      }
    }]);

    return _default;
  }(_default);

  var CLASS$1 = {
    LOADING: 'is-loading'
  };

  var _default$7 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));

      _this.el.classList.add(CLASS$1.LOADING);

      _this.textureSrc = _this.getData('texture');
      _this.displacementSrc = _this.getData('displacement');
      _this.gap = _this.getData('gap');
      _this.windowWidth = window.innerWidth;
      _this.windowHeight = window.innerHeight; // El and webgl plane BCR

      _this.BCR = _this.el.getBoundingClientRect();
      _this.planeBCR = {
        width: 1,
        height: 1,
        x: 0,
        y: 0
      }; // Useful booleans

      _this.inView = true;
      _this.isLoaded = false;
      _this.isRenderable = false; // Positions

      _this.displacementPosition = new Vec2(0, 0);
      _this.mouse = new Vec2(0, 0);
      _this.settings = {
        factor: 0,
        factorAim: _this.getData('factor'),
        scale: 0
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.$wrap = this.$('wrap')[0]; // Init ogl renderer

        this.renderer = new Renderer({
          dpr: 2,
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(this.BCR.width, this.BCR.height);
        this.gl = this.renderer.gl;
        this.$wrap.appendChild(this.gl.canvas);
        this.initScene();
        this.initCamera();
        this.initShape();
        this.isRenderable = true;
        this.tl = new TimelineMax({
          repeat: -1,
          onUpdate: function onUpdate() {
            _this2.formatPosition({
              x: _this2.mouse.x,
              y: _this2.mouse.y,
              obj: _this2.displacementPosition
            });

            _this2.call('updateProgress', _this2.tl.progress(), 'Gui');
          }
        });
        this.settings.factor = this.settings.factorAim;
        this.tl.to(this.mouse, 1, {
          x: 1,
          y: 1
        });
        this.tl.to(this.mouse, 1, {
          x: 0,
          y: 0
        });
      }
    }, {
      key: "initScene",
      value: function initScene() {
        this.scene = new Transform();
      }
    }, {
      key: "initCamera",
      value: function initCamera() {
        this.fov = 75;
        this.camera = new Camera(this.glElement, {
          fov: this.fov
        });
        this.camera.position.set(0, 0, 1);
      }
    }, {
      key: "initShape",
      value: function initShape() {
        var _this3 = this;

        this.geometry = new Plane(this.gl, {
          width: 1,
          height: 1,
          widthSegments: 10,
          heightSegments: 10
        });
        var texture = new Texture(this.gl, {
          minFilter: this.gl.LINEAR
        });
        var displacementTexture = new Texture(this.gl, {
          minFilter: this.gl.LINEAR
        });
        var displacementImg = new Image();
        displacementImg.src = this.displacementSrc;

        displacementImg.onload = function () {
          displacementTexture.image = displacementImg;
          var img = new Image();
          img.src = _this3.textureSrc;

          img.onload = function () {
            texture.image = img;
            _this3.program = new Program(_this3.gl, {
              vertex: vertexShader,
              fragment: fragmentShader,
              uniforms: {
                displacementTexture: {
                  value: displacementTexture
                },
                displacement: {
                  value: _this3.displacementPosition
                },
                texture: {
                  value: texture
                },
                factor: {
                  value: _this3.settings.factor
                }
              }
            });
            _this3.mesh = new Mesh(_this3.gl, {
              geometry: _this3.geometry,
              program: _this3.program
            });

            _this3.updateSize();

            _this3.isLoaded = true;

            _this3.el.classList.remove(CLASS$1.LOADING);

            _this3.render();
          };
        };
      }
    }, {
      key: "calculateUnitSize",
      value: function calculateUnitSize(distance) {
        var vFov = this.fov * Math.PI / 180;
        var height = 2 * Math.tan(vFov / 2) * distance;
        var width = height * this.camera.aspect;
        return {
          width: width,
          height: height
        };
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        this.camUnit = this.calculateUnitSize(this.camera.position.z); // Set size @update

        this.planeBCR.width = this.camUnit.width - this.camUnit.width * (this.gap / 100);
        this.planeBCR.height = this.planeBCR.width / this.camera.aspect;
        this.geometry = new Plane(this.gl, {
          width: this.planeBCR.width,
          height: this.planeBCR.height,
          widthSegments: 100,
          heightSegments: 100
        });
        this.mesh.geometry = this.geometry;
        this.gl.canvas.style.width = "".concat(this.BCR.width, "px");
        this.gl.canvas.style.height = "".concat(this.BCR.height, "px");
      }
    }, {
      key: "formatPosition",
      value: function formatPosition(param) {
        param.obj.x = -param.x + 0.5;
        param.obj.y = param.y - 0.5;
      }
    }, {
      key: "render",
      value: function render(t) {
        var _this4 = this;

        this.raf = requestAnimationFrame(function (t) {
          return _this4.render(t);
        });

        if (this.isLoaded && this.isRenderable) {
          this.program.uniforms.displacement.value = this.displacementPosition;
          this.program.uniforms.factor.value = this.settings.factor;
        }

        this.renderer.render({
          scene: this.mesh,
          camera: this.camera
        });
      }
    }, {
      key: "resize",
      value: function resize() {
        var newBCR = this.el.getBoundingClientRect();
        if (this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return;
        this.BCR = newBCR;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.renderer.setSize(this.BCR.width, this.BCR.height);
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height
        });
        this.updateSize();
      }
    }, {
      key: "scroll",
      value: function scroll() {
        var newBCR = this.el.getBoundingClientRect();
        if (this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return;
        this.BCR = newBCR;
      }
    }, {
      key: "updateFactor",
      value: function updateFactor(factor) {
        this.settings.factor = factor;
      }
    }, {
      key: "updateProgress",
      value: function updateProgress(progress) {
        this.tl.progress(progress);
      }
    }, {
      key: "updatePlay",
      value: function updatePlay(value) {
        if (value) {
          this.tl.play();
        } else {
          this.tl.pause();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.resizeBind);
        document.removeEventListener('scroll', this.scrollBind);
      }
    }]);

    return _default;
  }(_default);

  var _default$8 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.settings = {
        factor: 1,
        progress: 0,
        play: true
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.gui = new dat.GUI();
        this.factorController = this.gui.add(this.settings, 'factor', -2, 2);
        this.progressController = this.gui.add(this.settings, 'progress', 0, 1).step(0.01);
        this.playController = this.gui.add(this.settings, 'play');
        this.factorController.onChange(function (value) {
          _this2.call('updateFactor', value, 'DistortionExample');
        });
        this.progressController.onChange(function (value) {
          _this2.call('updateProgress', value, 'DistortionExample');
        });
        this.playController.onChange(function (value) {
          _this2.call('updatePlay', value, 'DistortionExample');
        });
      }
    }, {
      key: "updateProgress",
      value: function updateProgress(progress) {
        this.progressController.setValue(progress);
      }
    }]);

    return _default;
  }(_default);



  var modules = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Load: _default$3,
    Scroll: _default$5,
    GlImage: _default$6,
    DistortionExample: _default$7,
    Gui: _default$8
  });

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule$1(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var svg4everybody = createCommonjsModule$1(function (module) {
  !function(root, factory) {
        module.exports ? // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory() : root.svg4everybody = factory();
  }(commonjsGlobal$1, function() {
      /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
      function embed(parent, svg, target) {
          // if the target exists
          if (target) {
              // create a document fragment to hold the contents of the target
              var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
              // conditionally set the viewBox on the svg
              viewBox && svg.setAttribute("viewBox", viewBox);
              // copy the contents of the clone into the fragment
              for (// clone the target
              var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                  fragment.appendChild(clone.firstChild);
              }
              // append the fragment into the svg
              parent.appendChild(fragment);
          }
      }
      function loadreadystatechange(xhr) {
          // listen to changes in the request
          xhr.onreadystatechange = function() {
              // if the request is ready
              if (4 === xhr.readyState) {
                  // get the cached html document
                  var cachedDocument = xhr._cachedDocument;
                  // ensure the cached html document based on the xhr response
                  cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                  cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                  xhr._embeds.splice(0).map(function(item) {
                      // get the cached target
                      var target = xhr._cachedTarget[item.id];
                      // ensure the cached target
                      target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                      // embed the target into the svg
                      embed(item.parent, item.svg, target);
                  });
              }
          }, // test the ready state change immediately
          xhr.onreadystatechange();
      }
      function svg4everybody(rawopts) {
          function oninterval() {
              // while the index exists in the live <use> collection
              for (// get the cached <use> index
              var index = 0; index < uses.length; ) {
                  // get the current <use>
                  var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                  if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                  svg && src) {
                      if (polyfill) {
                          if (!opts.validate || opts.validate(src, svg, use)) {
                              // remove the <use> element
                              parent.removeChild(use);
                              // parse the src and get the url and id
                              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                              // if the link is external
                              if (url.length) {
                                  // get the cached xhr request
                                  var xhr = requests[url];
                                  // ensure the xhr request exists
                                  xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                  xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                  xhr._embeds.push({
                                      parent: parent,
                                      svg: svg,
                                      id: id
                                  }), // prepare the xhr ready state change event
                                  loadreadystatechange(xhr);
                              } else {
                                  // embed the local id into the svg
                                  embed(parent, svg, document.getElementById(id));
                              }
                          } else {
                              // increase the index when the previous value was not "valid"
                              ++index, ++numberOfSvgUseElementsToBypass;
                          }
                      }
                  } else {
                      // increase the index when the previous value was not "valid"
                      ++index;
                  }
              }
              // continue the interval
              (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
          }
          var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
          polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
          // create xhr requests object
          var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
          // conditionally start the interval if the polyfill is active
          polyfill && oninterval();
      }
      function getSVGAncestor(node) {
          for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
          return svg;
      }
      return svg4everybody;
  });
  });

  function globals () {
    svg4everybody();
  }

  var html = document.documentElement;
  var isDebug = !!html.getAttribute('data-debug');

  var app = new _default$1({
    modules: modules
  });
  app.init(app);
  globals();
  html.classList.add('is-loaded', 'is-ready');
  html.classList.remove('is-loading');

}());
//# sourceMappingURL=app.js.map
