import * as React from 'react';
import { CSSTransition } from 'primereact/csstransition';
import { useMountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { UniqueComponentId, mergeProps, classNames, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PlusIcon } from 'primereact/icons/plus';
import { MinusIcon } from 'primereact/icons/minus';
import { PrimeReactContext } from 'primereact/api';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
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

var FieldsetBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Fieldset',
    id: null,
    legend: null,
    className: null,
    style: null,
    toggleable: null,
    collapsed: null,
    collapseIcon: null,
    transitionOptions: null,
    expandIcon: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onClick: null,
    children: undefined
  }
});

var Fieldset = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = FieldsetBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(props.collapsed),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    collapsedState = _React$useState4[0],
    setCollapsedState = _React$useState4[1];
  var collapsed = props.toggleable ? props.onToggle ? props.collapsed : collapsedState : false;
  var elementRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var headerId = idState + '_header';
  var contentId = idState + '_content';
  var _FieldsetBase$setMeta = FieldsetBase.setMetaData({
      props: props,
      state: {
        id: idState,
        collapsed: collapsed
      }
    }),
    ptm = _FieldsetBase$setMeta.ptm;
  var toggle = function toggle(event) {
    if (props.toggleable) {
      collapsed ? expand(event) : collapse(event);
      if (props.onToggle) {
        props.onToggle({
          originalEvent: event,
          value: !collapsed
        });
      }
    }
    event.preventDefault();
  };
  var expand = function expand(event) {
    if (!props.onToggle) {
      setCollapsedState(false);
    }
    props.onExpand && props.onExpand(event);
  };
  var collapse = function collapse(event) {
    if (!props.onToggle) {
      setCollapsedState(true);
    }
    props.onCollapse && props.onCollapse(event);
  };
  useMountEffect(function () {
    if (!props.id) {
      setIdState(UniqueComponentId());
    }
  });
  var createContent = function createContent() {
    var contentProps = mergeProps({
      className: 'p-fieldset-content'
    }, ptm('content'));
    var toggleableProps = mergeProps({
      ref: contentRef,
      id: contentId,
      'aria-hidden': collapsed,
      role: 'region',
      'aria-labelledby': headerId,
      className: 'p-toggleable-content'
    }, ptm('toggleableContent'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: contentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": !collapsed,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React.createElement("div", toggleableProps, /*#__PURE__*/React.createElement("div", contentProps, props.children)));
  };
  var createToggleIcon = function createToggleIcon() {
    if (props.toggleable) {
      var togglerIconProps = mergeProps({
        className: 'p-fieldset-toggler'
      }, ptm('togglericon'));
      var icon = collapsed ? props.expandIcon || /*#__PURE__*/React.createElement(PlusIcon, togglerIconProps) : props.collapseIcon || /*#__PURE__*/React.createElement(MinusIcon, togglerIconProps);
      var toggleIcon = IconUtils.getJSXIcon(icon, togglerIconProps, {
        props: props
      });
      return toggleIcon;
    }
    return null;
  };
  var createLegendContent = function createLegendContent() {
    var legendTextProps = mergeProps({
      className: 'p-fieldset-legend-text'
    }, ptm('legendTitle'));
    var togglerProps = mergeProps({
      id: headerId,
      'aria-expanded': !collapsed,
      'aria-controls': contentId,
      href: '#' + contentId,
      tabIndex: props.toggleable ? null : -1
    }, ptm('toggler'));
    if (props.toggleable) {
      var toggleIcon = createToggleIcon();
      return /*#__PURE__*/React.createElement("a", togglerProps, toggleIcon, /*#__PURE__*/React.createElement("span", legendTextProps, props.legend), /*#__PURE__*/React.createElement(Ripple, null));
    }
    return /*#__PURE__*/React.createElement("span", _extends({}, legendTextProps, {
      id: headerId
    }), props.legend);
  };
  var createLegend = function createLegend() {
    var legendProps = mergeProps({
      className: 'p-fieldset-legend p-unselectable-text',
      onClick: toggle
    }, ptm('legend'));
    if (props.legend != null || props.toggleable) {
      var legendContent = createLegendContent();
      return /*#__PURE__*/React.createElement("legend", legendProps, legendContent);
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: idState,
    ref: elementRef,
    style: props.style,
    className: classNames('p-fieldset p-component', {
      'p-fieldset-toggleable': props.toggleable
    }, props.className),
    onClick: props.onClick
  }, FieldsetBase.getOtherProps(props), ptm('root'));
  var legend = createLegend();
  var content = createContent();
  return /*#__PURE__*/React.createElement("fieldset", rootProps, legend, content);
});
Fieldset.displayName = 'Fieldset';

export { Fieldset };
