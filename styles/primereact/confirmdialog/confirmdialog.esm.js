import * as React from 'react';
import { PrimeReactContext, localeOption } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, ObjectUtils, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var ConfirmDialogBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ConfirmDialog',
    tagKey: undefined,
    visible: undefined,
    message: null,
    rejectLabel: null,
    acceptLabel: null,
    icon: null,
    rejectIcon: null,
    acceptIcon: null,
    rejectClassName: null,
    acceptClassName: null,
    className: null,
    appendTo: null,
    footer: null,
    breakpoints: null,
    onHide: null,
    accept: null,
    reject: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var confirmDialog = function confirmDialog() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  props = _objectSpread(_objectSpread({}, props), {
    visible: props.visible === undefined ? true : props.visible
  });
  props.visible && OverlayService.emit('confirm-dialog', props);
  var show = function show() {
    var updatedProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    OverlayService.emit('confirm-dialog', _objectSpread(_objectSpread(_objectSpread({}, props), updatedProps), {
      visible: true
    }));
  };
  var hide = function hide() {
    OverlayService.emit('confirm-dialog', {
      visible: false
    });
  };
  return {
    show: show,
    hide: hide
  };
};
var ConfirmDialog = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ConfirmDialogBase.getProps(inProps, context);
  var _React$useState = React.useState(props.visible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    reshowState = _React$useState4[0],
    setReshowState = _React$useState4[1];
  var confirmProps = React.useRef(null);
  var isCallbackExecuting = React.useRef(false);
  var getCurrentProps = function getCurrentProps() {
    return confirmProps.current || props;
  };
  var getPropValue = function getPropValue(key) {
    return (confirmProps.current || props)[key];
  };
  var callbackFromProp = function callbackFromProp(key) {
    for (var _len = arguments.length, param = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      param[_key - 1] = arguments[_key];
    }
    return ObjectUtils.getPropValue(getPropValue(key), param);
  };
  var acceptLabel = getPropValue('acceptLabel') || localeOption('accept');
  var rejectLabel = getPropValue('rejectLabel') || localeOption('reject');
  var _ConfirmDialogBase$se = ConfirmDialogBase.setMetaData({
      props: props,
      state: {
        visible: visibleState
      }
    }),
    ptm = _ConfirmDialogBase$se.ptm;
  var accept = function accept() {
    if (!isCallbackExecuting.current) {
      isCallbackExecuting.current = true;
      callbackFromProp('accept');
      hide('accept');
    }
  };
  var reject = function reject() {
    if (!isCallbackExecuting.current) {
      isCallbackExecuting.current = true;
      callbackFromProp('reject');
      hide('reject');
    }
  };
  var show = function show() {
    setVisibleState(true);
    isCallbackExecuting.current = false;
  };
  var hide = function hide() {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cancel';
    setVisibleState(false);
    callbackFromProp('onHide', {
      result: result
    });
  };
  var confirm = function confirm(updatedProps) {
    if (updatedProps.tagKey === props.tagKey) {
      var isVisibleChanged = visibleState !== updatedProps.visible;
      var targetChanged = getPropValue('target') !== updatedProps.target;
      if (targetChanged && !props.target) {
        hide();
        confirmProps.current = updatedProps;
        setReshowState(true);
      } else if (isVisibleChanged) {
        confirmProps.current = updatedProps;
        updatedProps.visible ? show() : hide();
      }
    }
  };
  React.useEffect(function () {
    props.visible ? show() : hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);
  React.useEffect(function () {
    if (!props.target && !props.message) {
      OverlayService.on('confirm-dialog', confirm);
    }
    return function () {
      OverlayService.off('confirm-dialog', confirm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.target]);
  useUpdateEffect(function () {
    reshowState && show();
  }, [reshowState]);
  useUnmountEffect(function () {
    OverlayService.off('confirm-dialog', confirm);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      confirm: confirm
    };
  });
  var createFooter = function createFooter() {
    var acceptClassName = classNames('p-confirm-dialog-accept', getPropValue('acceptClassName'));
    var rejectClassName = classNames('p-confirm-dialog-reject', {
      'p-button-text': !getPropValue('rejectClassName')
    }, getPropValue('rejectClassName'));
    var rejectButtonProps = mergeProps({
      label: rejectLabel,
      icon: getPropValue('rejectIcon'),
      className: rejectClassName,
      onClick: reject
    }, ptm('rejectButton'));
    var acceptButtonProps = mergeProps({
      label: acceptLabel,
      icon: getPropValue('acceptIcon'),
      className: acceptClassName,
      onClick: accept
    }, ptm('acceptButton'));
    var content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, rejectButtonProps), /*#__PURE__*/React.createElement(Button, _extends({}, acceptButtonProps, {
      autoFocus: true
    })));
    if (getPropValue('footer')) {
      var defaultContentOptions = {
        accept: accept,
        reject: reject,
        acceptClassName: acceptClassName,
        rejectClassName: rejectClassName,
        acceptLabel: acceptLabel,
        rejectLabel: rejectLabel,
        element: content,
        props: getCurrentProps()
      };
      return ObjectUtils.getJSXElement(getPropValue('footer'), defaultContentOptions);
    }
    return content;
  };
  var createElement = function createElement() {
    var currentProps = getCurrentProps();
    var className = classNames('p-confirm-dialog', getPropValue('className'));
    var message = ObjectUtils.getJSXElement(getPropValue('message'), currentProps);
    var iconProps = mergeProps({
      className: 'p-confirm-dialog-icon'
    }, ptm('icon'));
    var icon = IconUtils.getJSXIcon(getPropValue('icon'), _objectSpread({}, iconProps), {
      props: currentProps
    });
    var footer = createFooter();
    var messageProps = mergeProps({
      className: 'p-confirm-dialog-message'
    }, ptm('message'));
    var rootProps = mergeProps({
      visible: visibleState,
      className: className,
      footer: footer,
      onHide: hide,
      breakpoints: getPropValue('breakpoints'),
      pt: currentProps.pt
    }, ConfirmDialogBase.getOtherProps(currentProps));
    return /*#__PURE__*/React.createElement(Dialog, rootProps, icon, /*#__PURE__*/React.createElement("span", messageProps, message));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: getPropValue('appendTo')
  });
}));
ConfirmDialog.displayName = 'ConfirmDialog';

export { ConfirmDialog, confirmDialog };
