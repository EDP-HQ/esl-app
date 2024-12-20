import * as React from 'react';
import { useEventListener } from 'primereact/hooks';
import { ObjectUtils, DomHandler, classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var SplitterBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Splitter',
    className: null,
    gutterSize: 4,
    id: null,
    layout: 'horizontal',
    onResizeEnd: null,
    stateKey: null,
    stateStorage: 'session',
    style: null,
    children: undefined
  }
});
var SplitterPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SplitterPanel',
    className: null,
    minSize: null,
    size: null,
    style: null,
    children: undefined
  },
  getCProps: function getCProps(panel) {
    return ObjectUtils.getComponentProps(panel, SplitterPanelBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(panel) {
    return ObjectUtils.getComponentDiffProps(panel, SplitterPanelBase.defaultProps);
  },
  getCProp: function getCProp(panel, name) {
    return ObjectUtils.getComponentProp(panel, name, SplitterPanelBase.defaultProps);
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SplitterPanel = function SplitterPanel() {};
var Splitter = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = SplitterBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var gutterRef = React.useRef();
  var gutterRefs = React.useRef({});
  var size = React.useRef(null);
  var dragging = React.useRef(null);
  var startPos = React.useRef(null);
  var prevPanelElement = React.useRef(null);
  var nextPanelElement = React.useRef(null);
  var prevPanelSize = React.useRef(null);
  var prevPanelSizeNew = React.useRef(null);
  var nextPanelSize = React.useRef(null);
  var nextPanelSizeNew = React.useRef(null);
  var prevPanelIndex = React.useRef(null);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    panelSizes = _React$useState2[0],
    setPanelSizes = _React$useState2[1];
  var isStateful = props.stateKey != null;
  var childrenLength = props.children && props.children.length || 1;
  var panelSize = function panelSize(sizes, index) {
    return index in sizes ? sizes[index] : props.children && [].concat(props.children)[index].props.size || 100 / childrenLength;
  };
  var metaData = {
    props: props,
    state: {
      panelSizes: panelSizes
    }
  };
  var _SplitterBase$setMeta = SplitterBase.setMetaData(_objectSpread({}, metaData)),
    ptm = _SplitterBase$setMeta.ptm,
    ptmo = _SplitterBase$setMeta.ptmo;
  var getPanelPT = function getPanelPT(panel, key) {
    return ptmo(getPanelProp(panel, 'pt'), key, {
      props: panel.props,
      parent: metaData
    });
  };
  var _useEventListener = useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        return onResize(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: function listener(event) {
        onResizeEnd(event);
        unbindMouseListeners();
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var bindMouseListeners = function bindMouseListeners() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindMouseListeners = function unbindMouseListeners() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var getPanelProp = function getPanelProp(panel, name) {
    return SplitterPanelBase.getCProp(panel, name);
  };
  var validateResize = function validateResize(newPrevPanelSize, newNextPanelSize) {
    if (newPrevPanelSize > 100 || newPrevPanelSize < 0) return false;
    if (newNextPanelSize > 100 || newNextPanelSize < 0) return false;
    if (props.children[prevPanelIndex.current].props && props.children[prevPanelIndex.current].props.minSize && props.children[prevPanelIndex.current].props.minSize > newPrevPanelSize) {
      return false;
    }
    if (props.children[prevPanelIndex.current + 1].props && props.children[prevPanelIndex.current + 1].props.minSize && props.children[prevPanelIndex.current + 1].props.minSize > newNextPanelSize) {
      return false;
    }
    return true;
  };
  var clear = function clear() {
    dragging.current = false;
    size.current = null;
    startPos.current = null;
    prevPanelElement.current = null;
    nextPanelElement.current = null;
    prevPanelSize.current = null;
    prevPanelSizeNew.current = null;
    nextPanelSize.current = null;
    nextPanelSizeNew.current = null;
    prevPanelIndex.current = null;
  };
  var getStorage = React.useCallback(function () {
    switch (props.stateStorage) {
      case 'local':
        return window.localStorage;
      case 'session':
        return window.sessionStorage;
      default:
        throw new Error(props.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
    }
  }, [props.stateStorage]);
  var saveState = function saveState(sizes) {
    getStorage().setItem(props.stateKey, JSON.stringify(sizes));
  };
  var restoreState = React.useCallback(function () {
    var stateString = getStorage().getItem(props.stateKey);
    if (stateString) setPanelSizes(JSON.parse(stateString));
  }, [getStorage, props.stateKey]);
  var onResizeStart = function onResizeStart(event, index) {
    gutterRef.current = gutterRefs.current[index];
    var pageX = event.type === 'touchstart' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchstart' ? event.touches[0].pageY : event.pageY;
    size.current = props.layout === 'horizontal' ? DomHandler.getWidth(elementRef.current) : DomHandler.getHeight(elementRef.current);
    dragging.current = true;
    startPos.current = props.layout === 'horizontal' ? pageX : pageY;
    prevPanelElement.current = gutterRef.current.previousElementSibling;
    nextPanelElement.current = gutterRef.current.nextElementSibling;
    prevPanelSize.current = 100 * (props.layout === 'horizontal' ? DomHandler.getOuterWidth(prevPanelElement.current, true) : DomHandler.getOuterHeight(prevPanelElement.current, true)) / size.current;
    prevPanelSizeNew.current = prevPanelSize.current;
    nextPanelSize.current = 100 * (props.layout === 'horizontal' ? DomHandler.getOuterWidth(nextPanelElement.current, true) : DomHandler.getOuterHeight(nextPanelElement.current, true)) / size.current;
    nextPanelSizeNew.current = nextPanelSize.current;
    prevPanelIndex.current = index;
    DomHandler.addClass(gutterRef.current, 'p-splitter-gutter-resizing');
    DomHandler.addClass(elementRef.current, 'p-splitter-resizing');
  };
  var onResize = function onResize(event) {
    var newPos;
    var pageX = event.type === 'touchmove' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchmove' ? event.touches[0].pageY : event.pageY;
    if (props.layout === 'horizontal') newPos = pageX * 100 / size.current - startPos.current * 100 / size.current;else newPos = pageY * 100 / size.current - startPos.current * 100 / size.current;
    var newPrevPanelSize = prevPanelSize.current + newPos;
    var newNextPanelSize = nextPanelSize.current - newPos;
    if (validateResize(newPrevPanelSize, newNextPanelSize)) {
      prevPanelSizeNew.current = newPrevPanelSize;
      nextPanelSizeNew.current = newNextPanelSize;
      prevPanelElement.current.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
      nextPanelElement.current.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
    }
  };
  var onResizeEnd = function onResizeEnd(event) {
    setPanelSizes(function (prev) {
      var sizes = [];
      for (var index = 0; index < props.children.length; index++) sizes[index] = panelSize(prev, index);
      sizes[prevPanelIndex.current] = prevPanelSizeNew.current;
      sizes[prevPanelIndex.current + 1] = nextPanelSizeNew.current;
      if (props.onResizeEnd) {
        props.onResizeEnd({
          originalEvent: event,
          sizes: sizes
        });
      }
      if (isStateful) saveState(sizes);
      return sizes;
    });
    DomHandler.removeClass(gutterRef.current, 'p-splitter-gutter-resizing');
    DomHandler.removeClass(elementRef.current, 'p-splitter-resizing');
    clear();
  };
  var onGutterMouseDown = function onGutterMouseDown(event, index) {
    onResizeStart(event, index);
    bindMouseListeners();
  };
  var onGutterTouchStart = function onGutterTouchStart(event, index) {
    onResizeStart(event, index);
    window.addEventListener('touchmove', onGutterTouchMove, {
      passive: false,
      cancelable: false
    });
    window.addEventListener('touchend', onGutterTouchEnd);
  };
  var onGutterTouchMove = function onGutterTouchMove(event) {
    onResize(event);
  };
  var onGutterTouchEnd = function onGutterTouchEnd(event) {
    onResizeEnd(event);
    window.removeEventListener('touchmove', onGutterTouchMove);
    window.removeEventListener('touchend', onGutterTouchEnd);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    var panelElements = _toConsumableArray(elementRef.current.children).filter(function (child) {
      return DomHandler.hasClass(child, 'p-splitter-panel');
    });
    panelElements.map(function (panelElement) {
      if (panelElement.childNodes && ObjectUtils.isNotEmpty(DomHandler.find(panelElement, '.p-splitter'))) {
        DomHandler.addClass(panelElement, 'p-splitter-panel-nested');
      }
    });
  }, []);
  React.useEffect(function () {
    if (isStateful) restoreState();
  }, [restoreState, isStateful]);
  var createPanel = function createPanel(panel, index) {
    var panelClassName = classNames('p-splitter-panel', getPanelProp(panel, 'className'));
    var gutterStyle = props.layout === 'horizontal' ? {
      width: props.gutterSize + 'px'
    } : {
      height: props.gutterSize + 'px'
    };
    var gutterProps = mergeProps({
      ref: function ref(el) {
        return gutterRefs.current[index] = el;
      },
      className: 'p-splitter-gutter',
      style: gutterStyle,
      onMouseDown: function onMouseDown(event) {
        return onGutterMouseDown(event, index);
      },
      onTouchStart: function onTouchStart(event) {
        return onGutterTouchStart(event, index);
      },
      onTouchMove: function onTouchMove(event) {
        return onGutterTouchMove(event);
      },
      onTouchEnd: function onTouchEnd(event) {
        return onGutterTouchEnd(event);
      }
    }, ptm('gutter'));
    var gutterHandlerProps = mergeProps({
      className: 'p-splitter-gutter-handle'
    }, ptm('gutterHandler'));
    var gutter = index !== props.children.length - 1 && /*#__PURE__*/React.createElement("div", gutterProps, /*#__PURE__*/React.createElement("div", gutterHandlerProps));
    var flexBasis = 'calc(' + panelSize(panelSizes, index) + '% - ' + (childrenLength - 1) * props.gutterSize + 'px)';
    var rootProps = mergeProps({
      key: index,
      className: panelClassName,
      style: _objectSpread(_objectSpread({}, getPanelProp(panel, 'style')), {}, {
        flexBasis: flexBasis
      }),
      role: 'presentation'
    }, getPanelPT(panel, 'root'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, getPanelProp(panel, 'children')), gutter);
  };
  var createPanels = function createPanels() {
    return React.Children.map(props.children, createPanel);
  };
  var className = classNames("p-splitter p-component p-splitter-".concat(props.layout), props.className);
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className
  }, SplitterBase.getOtherProps(props), ptm('root'));
  var panels = createPanels();
  return /*#__PURE__*/React.createElement("div", rootProps, panels);
}));
SplitterPanel.displayName = 'SplitterPanel';
Splitter.displayName = 'Splitter';

export { Splitter, SplitterPanel };
