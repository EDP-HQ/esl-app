'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var button = require('primereact/button');
var hooks = require('primereact/hooks');
var minus = require('primereact/icons/minus');
var plus = require('primereact/icons/plus');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

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

var SpeedDialBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SpeedDial',
    id: null,
    model: null,
    visible: false,
    style: null,
    className: null,
    direction: 'up',
    transitionDelay: 30,
    type: 'linear',
    radius: 0,
    mask: false,
    disabled: false,
    hideOnClickOutside: true,
    buttonStyle: null,
    buttonClassName: null,
    buttonTemplate: null,
    'aria-label': null,
    maskStyle: null,
    maskClassName: null,
    showIcon: null,
    hideIcon: null,
    rotateAnimation: true,
    onVisibleChange: null,
    onClick: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SpeedDial = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = SpeedDialBase.getProps(inProps, context);
  var _SpeedDialBase$setMet = SpeedDialBase.setMetaData({
      props: props,
      state: {
        visible: visibleState
      }
    }),
    ptm = _SpeedDialBase$setMet.ptm;
  var isItemClicked = React__namespace.useRef(false);
  var elementRef = React__namespace.useRef(null);
  var listRef = React__namespace.useRef(null);
  var visible = props.onVisibleChange ? props.visible : visibleState;
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (!isItemClicked.current && isOutsideClicked(event)) {
          hide();
        }
        isItemClicked.current = false;
      },
      when: visibleState
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var show = function show() {
    props.onVisibleChange ? props.onVisibleChange(true) : setVisibleState(true);
    props.onShow && props.onShow();
  };
  var hide = function hide() {
    props.onVisibleChange ? props.onVisibleChange(false) : setVisibleState(false);
    props.onHide && props.onHide();
  };
  var _onClick = function onClick(e) {
    visible ? hide() : show();
    props.onClick && props.onClick(e);
    isItemClicked.current = true;
  };
  var onItemClick = function onItemClick(e, item) {
    item.command && item.command({
      originalEvent: e,
      item: item
    });
    hide();
    isItemClicked.current = true;
    e.preventDefault();
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target));
  };
  var calculateTransitionDelay = function calculateTransitionDelay(index) {
    var length = props.model.length;
    return (visible ? index : length - index - 1) * props.transitionDelay;
  };
  var calculatePointStyle = function calculatePointStyle(index) {
    var type = props.type;
    if (type !== 'linear') {
      var length = props.model.length;
      var radius = props.radius || length * 20;
      if (type === 'circle') {
        var step = 2 * Math.PI / length;
        return {
          left: "calc(".concat(radius * Math.cos(step * index), "px + var(--item-diff-x, 0px))"),
          top: "calc(".concat(radius * Math.sin(step * index), "px + var(--item-diff-y, 0px))")
        };
      } else if (type === 'semi-circle') {
        var direction = props.direction;
        var _step = Math.PI / (length - 1);
        var x = "calc(".concat(radius * Math.cos(_step * index), "px + var(--item-diff-x, 0px))");
        var y = "calc(".concat(radius * Math.sin(_step * index), "px + var(--item-diff-y, 0px))");
        if (direction === 'up') {
          return {
            left: x,
            bottom: y
          };
        } else if (direction === 'down') {
          return {
            left: x,
            top: y
          };
        } else if (direction === 'left') {
          return {
            right: y,
            top: x
          };
        } else if (direction === 'right') {
          return {
            left: y,
            top: x
          };
        }
      } else if (type === 'quarter-circle') {
        var _direction = props.direction;
        var _step2 = Math.PI / (2 * (length - 1));
        var _x = "calc(".concat(radius * Math.cos(_step2 * index), "px + var(--item-diff-x, 0px))");
        var _y = "calc(".concat(radius * Math.sin(_step2 * index), "px + var(--item-diff-y, 0px))");
        if (_direction === 'up-left') {
          return {
            right: _x,
            bottom: _y
          };
        } else if (_direction === 'up-right') {
          return {
            left: _x,
            bottom: _y
          };
        } else if (_direction === 'down-left') {
          return {
            right: _y,
            top: _x
          };
        } else if (_direction === 'down-right') {
          return {
            left: _y,
            top: _x
          };
        }
      }
    }
    return {};
  };
  var getItemStyle = function getItemStyle(index) {
    var transitionDelay = calculateTransitionDelay(index);
    var pointStyle = calculatePointStyle(index);
    return _objectSpread({
      transitionDelay: "".concat(transitionDelay, "ms")
    }, pointStyle);
  };
  hooks.useMountEffect(function () {
    if (props.type !== 'linear') {
      var _button = utils.DomHandler.findSingle(elementRef.current, '.p-speeddial-button');
      var firstItem = utils.DomHandler.findSingle(listRef.current, '.p-speeddial-item');
      if (_button && firstItem) {
        var wDiff = Math.abs(_button.offsetWidth - firstItem.offsetWidth);
        var hDiff = Math.abs(_button.offsetHeight - firstItem.offsetHeight);
        listRef.current.style.setProperty('--item-diff-x', "".concat(wDiff / 2, "px"));
        listRef.current.style.setProperty('--item-diff-y', "".concat(hDiff / 2, "px"));
      }
    }
  });
  hooks.useUpdateEffect(function () {
    if (visibleState) {
      props.hideOnClickOutside && bindDocumentClickListener();
    }
    return function () {
      props.hideOnClickOutside && unbindDocumentClickListener();
    };
  }, [visibleState]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var style = getItemStyle(index);
    var disabled = item.disabled,
      _icon = item.icon,
      label = item.label,
      template = item.template,
      url = item.url,
      target = item.target;
    var contentClassName = utils.classNames('p-speeddial-action', {
      'p-disabled': disabled
    });
    var iconClassName = utils.classNames('p-speeddial-action-icon', _icon);
    var actionIconProps = utils.mergeProps({
      className: iconClassName
    }, ptm('actionIcon'));
    var actionProps = utils.mergeProps({
      href: url || '#',
      role: 'menuitem',
      className: contentClassName,
      target: target,
      'data-pr-tooltip': label,
      onClick: function onClick(e) {
        return onItemClick(e, item);
      }
    }, ptm('action'));
    var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, actionIconProps), {
      props: props
    });
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(e) {
          return onItemClick(e, item);
        },
        className: contentClassName,
        iconClassName: iconClassName,
        element: content,
        props: props,
        visible: visible
      };
      content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    var menuItemProps = utils.mergeProps({
      key: index,
      className: 'p-speeddial-item',
      style: style,
      role: 'none'
    }, ptm('menuitem'));
    return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, content);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var createList = function createList() {
    var items = createItems();
    var menuProps = utils.mergeProps({
      ref: listRef,
      className: 'p-speeddial-list',
      role: 'menu'
    }, ptm('menu'));
    return /*#__PURE__*/React__namespace.createElement("ul", menuProps, items);
  };
  var createButton = function createButton() {
    var showIconVisible = !visible && !!props.showIcon || !props.hideIcon;
    var hideIconVisible = visible && !!props.hideIcon;
    var className = utils.classNames('p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    }, props.buttonClassName);
    var iconClassName = utils.classNames(_defineProperty(_defineProperty({}, "".concat(props.showIcon), !visible && !!props.showIcon || !props.hideIcon), "".concat(props.hideIcon), visible && !!props.hideIcon));
    var icon = showIconVisible ? props.showIcon || /*#__PURE__*/React__namespace.createElement(plus.PlusIcon, {
      className: iconClassName,
      onClick: _onClick
    }) : hideIconVisible ? props.hideIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, {
      className: iconClassName,
      onClick: _onClick
    }) : null;
    var toggleIcon = utils.IconUtils.getJSXIcon(icon, {
      className: iconClassName
    }, {
      props: props,
      visible: visible
    });
    var buttonProps = utils.mergeProps({
      type: 'button',
      style: props.buttonStyle,
      className: className,
      icon: toggleIcon,
      onClick: function onClick(e) {
        return _onClick(e);
      },
      disabled: props.disabled,
      'aria-label': props['aria-label'],
      pt: props.pt && props.pt.button ? props.pt.button : {}
    });
    var content = /*#__PURE__*/React__namespace.createElement(button.Button, buttonProps);
    if (props.buttonTemplate) {
      var defaultContentOptions = {
        onClick: _onClick,
        className: className,
        iconClassName: iconClassName,
        element: content,
        props: props,
        visible: visible
      };
      return utils.ObjectUtils.getJSXElement(props.buttonTemplate, defaultContentOptions);
    }
    return content;
  };
  var createMask = function createMask() {
    if (props.mask) {
      var _className = utils.classNames('p-speeddial-mask', {
        'p-speeddial-mask-visible': visible
      }, props.maskClassName);
      var maskProps = utils.mergeProps({
        className: _className,
        style: props.maskStyle
      }, ptm('mask'));
      return /*#__PURE__*/React__namespace.createElement("div", maskProps);
    }
    return null;
  };
  var className = utils.classNames("p-speeddial p-component p-speeddial-".concat(props.type), _defineProperty(_defineProperty(_defineProperty({}, "p-speeddial-direction-".concat(props.direction), props.type !== 'circle'), 'p-speeddial-opened', visible), 'p-disabled', props.disabled), props.className);
  var button$1 = createButton();
  var list = createList();
  var mask = createMask();
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, SpeedDialBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, button$1, list), mask);
}));
SpeedDial.displayName = 'SpeedDial';

exports.SpeedDial = SpeedDial;
