'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var chevronright = require('primereact/icons/chevronright');
var chevrondown = require('primereact/icons/chevrondown');

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

var AccordionBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Accordion',
    id: null,
    activeIndex: null,
    className: null,
    style: null,
    multiple: false,
    expandIcon: null,
    collapseIcon: null,
    transitionOptions: null,
    onTabOpen: null,
    onTabClose: null,
    onTabChange: null,
    children: undefined
  }
});
var AccordionTabBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AccordionTab',
    className: null,
    contentClassName: null,
    contentStyle: null,
    disabled: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTemplate: null,
    style: null,
    tabIndex: 0,
    children: undefined
  },
  getCProp: function getCProp(tab, name) {
    return utils.ObjectUtils.getComponentProp(tab, name, AccordionTabBase.defaultProps);
  },
  getCProps: function getCProps(tab) {
    return utils.ObjectUtils.getComponentProps(tab, AccordionTabBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(tab) {
    return utils.ObjectUtils.getComponentDiffProps(tab, AccordionTabBase.defaultProps);
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AccordionTab = function AccordionTab() {};
var Accordion = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = AccordionBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.activeIndex),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeIndexState = _React$useState4[0],
    setActiveIndexState = _React$useState4[1];
  var elementRef = React__namespace.useRef(null);
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var metaData = {
    props: props,
    state: {
      id: idState,
      activeIndex: activeIndexState
    }
  };
  var _AccordionBase$setMet = AccordionBase.setMetaData(_objectSpread({}, metaData)),
    ptm = _AccordionBase$setMet.ptm,
    ptmo = _AccordionBase$setMet.ptmo;
  var getTabPT = function getTabPT(tab, key) {
    return ptmo(getTabProp(tab, 'pt'), key, {
      props: tab.props,
      parent: metaData
    });
  };
  var getTabProp = function getTabProp(tab, name) {
    return AccordionTabBase.getCProp(tab, name);
  };
  var onTabHeaderClick = function onTabHeaderClick(event, tab, index) {
    if (!getTabProp(tab, 'disabled')) {
      var selected = isSelected(index);
      var newActiveIndex = null;
      if (props.multiple) {
        var indexes = activeIndex || [];
        newActiveIndex = selected ? indexes.filter(function (i) {
          return i !== index;
        }) : [].concat(_toConsumableArray(indexes), [index]);
      } else {
        newActiveIndex = selected ? null : index;
      }
      var callback = selected ? props.onTabClose : props.onTabOpen;
      callback && callback({
        originalEvent: event,
        index: index
      });
      if (props.onTabChange) {
        props.onTabChange({
          originalEvent: event,
          index: newActiveIndex
        });
      } else {
        setActiveIndexState(newActiveIndex);
      }
    }
    event.preventDefault();
  };
  var isSelected = function isSelected(index) {
    return props.multiple ? activeIndex && activeIndex.some(function (i) {
      return i === index;
    }) : activeIndex === index;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useMountEffect(function () {
    if (!idState) {
      setIdState(utils.UniqueComponentId());
    }
  });
  if (!idState) {
    return null;
  }
  var createTabHeader = function createTabHeader(tab, selected, index) {
    var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'style') || {}), getTabProp(tab, 'headerStyle') || {});
    var className = utils.classNames('p-accordion-header', {
      'p-highlight': selected,
      'p-disabled': getTabProp(tab, 'disabled')
    }, getTabProp(tab, 'headerClassName'), getTabProp(tab, 'className'));
    var headerId = idState + '_header_' + index;
    var ariaControls = idState + '_content_' + index;
    var tabIndex = getTabProp(tab, 'disabled') ? -1 : getTabProp(tab, 'tabIndex');
    var headerTitleProps = utils.mergeProps({
      className: 'p-accordion-header-text'
    }, getTabPT(tab, 'headertitle'));
    var header = getTabProp(tab, 'headerTemplate') ? utils.ObjectUtils.getJSXElement(getTabProp(tab, 'headerTemplate'), AccordionTabBase.getCProps(tab)) : /*#__PURE__*/React__namespace.createElement("span", headerTitleProps, getTabProp(tab, 'header'));
    var iconClassName = 'p-accordion-toggle-icon';
    var headerIconProps = utils.mergeProps({
      className: iconClassName
    }, getTabPT(tab, 'headericon'));
    var icon = selected ? props.collapseIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, headerIconProps) : props.expandIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, headerIconProps);
    var toggleIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, headerIconProps), {
      props: props,
      selected: selected
    });
    var label = selected ? api.ariaLabel('collapseLabel') : api.ariaLabel('expandLabel');
    var headerProps = utils.mergeProps({
      className: className,
      style: style
    }, getTabPT(tab, 'header'));
    var headerActionProps = utils.mergeProps({
      id: headerId,
      href: '#' + ariaControls,
      className: 'p-accordion-header-link',
      role: 'tab',
      tabIndex: tabIndex,
      onClick: function onClick(e) {
        return onTabHeaderClick(e, tab, index);
      },
      'aria-label': label,
      'aria-controls': ariaControls,
      'aria-expanded': selected
    }, getTabPT(tab, 'headeraction'));
    return /*#__PURE__*/React__namespace.createElement("div", headerProps, /*#__PURE__*/React__namespace.createElement("a", headerActionProps, toggleIcon, header));
  };
  var createTabContent = function createTabContent(tab, selected, index) {
    var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'style') || {}), getTabProp(tab, 'contentStyle') || {});
    var className = utils.classNames('p-toggleable-content', getTabProp(tab, 'contentClassName'), getTabProp(tab, 'className'));
    var contentId = idState + '_content_' + index;
    var ariaLabelledby = idState + '_header_' + index;
    var contentRef = /*#__PURE__*/React__namespace.createRef();
    var toggleableContentProps = utils.mergeProps({
      id: contentId,
      ref: contentRef,
      className: className,
      style: style,
      role: 'region',
      'aria-labelledby': ariaLabelledby
    }, getTabPT(tab, 'toggleablecontent'));
    var contentProps = utils.mergeProps({
      className: 'p-accordion-content'
    }, getTabPT(tab, 'content'));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: contentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": selected,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React__namespace.createElement("div", toggleableContentProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, getTabProp(tab, 'children'))));
  };
  var createTab = function createTab(tab, index) {
    if (utils.ObjectUtils.isValidChild(tab, 'AccordionTab')) {
      var key = idState + '_' + index;
      var selected = isSelected(index);
      var tabHeader = createTabHeader(tab, selected, index);
      var tabContent = createTabContent(tab, selected, index);
      var tabClassName = utils.classNames('p-accordion-tab', {
        'p-accordion-tab-active': selected
      });
      var _rootProps = utils.mergeProps({
        key: key,
        className: tabClassName
      }, AccordionTabBase.getCOtherProps(tab), getTabPT(tab, 'root'));
      return /*#__PURE__*/React__namespace.createElement("div", _rootProps, tabHeader, tabContent);
    }
    return null;
  };
  var createTabs = function createTabs() {
    return React__namespace.Children.map(props.children, createTab);
  };
  var className = utils.classNames('p-accordion p-component', props.className);
  var tabs = createTabs();
  var rootProps = utils.mergeProps({
    id: idState,
    ref: elementRef,
    className: className,
    style: props.style
  }, AccordionBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, tabs);
});
AccordionTab.displayName = 'AccordionTab';
Accordion.displayName = 'Accordion';

exports.Accordion = Accordion;
exports.AccordionTab = AccordionTab;