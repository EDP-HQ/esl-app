'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var times = require('primereact/icons/times');
var portal = require('primereact/portal');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var SidebarBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Sidebar',
    id: null,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
    visible: false,
    position: 'left',
    fullScreen: false,
    blockScroll: false,
    baseZIndex: 0,
    dismissable: true,
    showCloseIcon: true,
    closeIcon: null,
    ariaCloseLabel: null,
    closeOnEscape: true,
    icons: null,
    modal: true,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Sidebar = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = SidebarBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    maskVisibleState = _React$useState2[0],
    setMaskVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _SidebarBase$setMetaD = SidebarBase.setMetaData({
      props: props,
      state: {
        containerVisible: maskVisibleState
      }
    }),
    ptm = _SidebarBase$setMetaD.ptm;
  var sidebarRef = React__namespace.useRef(null);
  var maskRef = React__namespace.useRef(null);
  var closeIconRef = React__namespace.useRef(null);
  var _useEventListener = hooks.useEventListener({
      type: 'keydown',
      listener: function listener(event) {
        if (event.key === 'Escape') {
          if (utils.ZIndexUtils.get(maskRef.current) === utils.ZIndexUtils.getCurrent('modal', context && context.autoZIndex || PrimeReact__default["default"].autoZIndex)) {
            onClose(event);
          }
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentEscapeListener = _useEventListener2[0],
    unbindDocumentEscapeListener = _useEventListener2[1];
  var _useEventListener3 = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (event.button !== 0) {
          // ignore anything other than left click
          return;
        }
        if (isOutsideClicked(event)) {
          onClose(event);
        }
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentClickListener = _useEventListener4[0],
    unbindDocumentClickListener = _useEventListener4[1];
  var isOutsideClicked = function isOutsideClicked(event) {
    return sidebarRef && sidebarRef.current && !sidebarRef.current.contains(event.target);
  };
  var getPositionClass = function getPositionClass() {
    var positions = ['left', 'right', 'top', 'bottom'];
    var pos = positions.find(function (item) {
      return item === props.position;
    });
    return pos ? "p-sidebar-".concat(pos) : '';
  };
  var focus = function focus() {
    var activeElement = document.activeElement;
    var isActiveElementInDialog = activeElement && sidebarRef && sidebarRef.current.contains(activeElement);
    if (!isActiveElementInDialog && props.showCloseIcon) {
      closeIconRef.current.focus();
    }
  };
  var onMaskClick = function onMaskClick(event) {
    if (props.dismissable && props.modal && maskRef.current === event.target) {
      onClose(event);
    }
  };
  var onClose = function onClose(event) {
    props.onHide();
    event.preventDefault();
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
    focus();
    enableDocumentSettings();
  };
  var onExiting = function onExiting() {
    if (props.modal) {
      utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
    }
  };
  var onExited = function onExited() {
    utils.ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
    disableDocumentSettings();
  };
  var enableDocumentSettings = function enableDocumentSettings() {
    if (props.closeOnEscape) {
      bindDocumentEscapeListener();
    }
    if (props.dismissable && !props.modal) {
      bindDocumentClickListener();
    }
    if (props.blockScroll) {
      utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  };
  var disableDocumentSettings = function disableDocumentSettings() {
    unbindDocumentEscapeListener();
    unbindDocumentClickListener();
    if (props.blockScroll) {
      utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return sidebarRef.current;
      },
      gteMask: function gteMask() {
        return maskRef.current;
      },
      getCloseIcon: function getCloseIcon() {
        return closeIconRef.current;
      }
    };
  });
  hooks.useMountEffect(function () {
    if (props.visible) {
      setMaskVisibleState(true);
    }
  });
  hooks.useUpdateEffect(function () {
    if (props.visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }
    if (props.visible !== visibleState && maskVisibleState) {
      setVisibleState(props.visible);
    }
  });
  hooks.useUpdateEffect(function () {
    if (maskVisibleState) {
      utils.ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['modal'] || PrimeReact__default["default"].zIndex['modal']);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  hooks.useUpdateEffect(function () {
    // #3811 if dismissible state is toggled while open we must unregister and re-regisetr
    if (visibleState) {
      unbindDocumentClickListener();
      if (props.dismissable && !props.modal) {
        bindDocumentClickListener();
      }
    }
  }, [props.dismissable, props.modal, visibleState]);
  hooks.useUnmountEffect(function () {
    disableDocumentSettings();
    maskRef.current && utils.ZIndexUtils.clear(maskRef.current);
  });
  var createCloseIcon = function createCloseIcon() {
    var iconClassName = 'p-sidebar-close-icon';
    var closeButtonProps = utils.mergeProps({
      type: 'button',
      ref: closeIconRef,
      className: 'p-sidebar-close p-sidebar-icon p-link',
      onClick: function onClick(e) {
        return onClose(e);
      },
      'aria-label': ariaLabel
    }, ptm('closeButton'));
    var closeIconProps = utils.mergeProps({
      className: iconClassName
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, closeIconProps);
    var closeIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var ariaLabel = props.ariaCloseLabel || PrimeReact.localeOption('close');
    if (props.showCloseIcon) {
      return /*#__PURE__*/React__namespace.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createIcons = function createIcons() {
    return props.icons ? utils.ObjectUtils.getJSXElement(props.icons, props) : null;
  };
  var createElement = function createElement() {
    var className = utils.classNames('p-sidebar p-component', props.className, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
    var maskClassName = utils.classNames('p-sidebar-mask', {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-sidebar-mask-scrollblocker': props.blockScroll,
      'p-sidebar-visible': maskVisibleState,
      'p-sidebar-full': props.fullScreen
    }, getPositionClass(), props.maskClassName);
    var closeIcon = createCloseIcon();
    var icons = createIcons();
    var transitionTimeout = {
      enter: props.fullScreen ? 150 : 300,
      exit: props.fullScreen ? 150 : 300
    };
    var maskProps = utils.mergeProps({
      ref: maskRef,
      style: props.maskStyle,
      className: maskClassName,
      onMouseDown: function onMouseDown(e) {
        return onMaskClick(e);
      }
    }, ptm('mask'));
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: sidebarRef,
      className: className,
      style: props.style,
      role: 'complementary'
    }, SidebarBase.getOtherProps(props), ptm('root'));
    var headerProps = utils.mergeProps({
      className: 'p-sidebar-header'
    }, ptm('header'));
    var contentProps = utils.mergeProps({
      className: 'p-sidebar-content'
    }, ptm('content'));
    return /*#__PURE__*/React__namespace.createElement("div", maskProps, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: sidebarRef,
      classNames: "p-sidebar",
      "in": visibleState,
      timeout: transitionTimeout,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", headerProps, icons, closeIcon), /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children))));
  };
  var createSidebar = function createSidebar() {
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo,
      visible: true
    });
  };
  return maskVisibleState && createSidebar();
});
Sidebar.displayName = 'Sidebar';

exports.Sidebar = Sidebar;
