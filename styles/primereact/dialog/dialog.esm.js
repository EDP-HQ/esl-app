import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { WindowMaximizeIcon } from 'primereact/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primereact/icons/windowminimize';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { UniqueComponentId, DomHandler, ZIndexUtils, classNames, mergeProps, ObjectUtils, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var DialogBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Dialog',
    appendTo: null,
    ariaCloseIconLabel: null,
    baseZIndex: 0,
    blockScroll: false,
    breakpoints: null,
    className: null,
    closable: true,
    closeIcon: null,
    closeOnEscape: true,
    contentClassName: null,
    contentStyle: null,
    dismissableMask: false,
    draggable: true,
    focusOnShow: true,
    footer: null,
    header: null,
    headerClassName: null,
    headerStyle: null,
    icons: null,
    id: null,
    keepInViewport: true,
    maskClassName: null,
    maskStyle: null,
    maximizable: false,
    maximizeIcon: null,
    maximized: false,
    minX: 0,
    minY: 0,
    minimizeIcon: null,
    modal: true,
    onClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragStart: null,
    onHide: null,
    onMaskClick: null,
    onMaximize: null,
    onResize: null,
    onResizeEnd: null,
    onResizeStart: null,
    onShow: null,
    position: 'center',
    resizable: true,
    rtl: false,
    showHeader: true,
    style: null,
    transitionOptions: null,
    visible: false,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Dialog = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = DialogBase.getProps(inProps, context);
  var uniqueId = props.id ? props.id : UniqueComponentId();
  var _React$useState = React.useState(uniqueId),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0];
    _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maskVisibleState = _React$useState4[0],
    setMaskVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    visibleState = _React$useState6[0],
    setVisibleState = _React$useState6[1];
  var _React$useState7 = React.useState(props.maximized),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    maximizedState = _React$useState8[0],
    setMaximizedState = _React$useState8[1];
  var dialogRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var pointerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var headerRef = React.useRef(null);
  var footerRef = React.useRef(null);
  var closeRef = React.useRef(null);
  var dragging = React.useRef(false);
  var resizing = React.useRef(false);
  var lastPageX = React.useRef(null);
  var lastPageY = React.useRef(null);
  var styleElement = React.useRef(null);
  var attributeSelector = React.useRef(uniqueId);
  var maximized = props.onMaximize ? props.maximized : maximizedState;
  var _DialogBase$setMetaDa = DialogBase.setMetaData({
      props: props,
      state: {
        id: idState,
        maximized: maximized,
        containerVisible: maskVisibleState
      }
    }),
    ptm = _DialogBase$setMetaDa.ptm;
  var _useEventListener = useEventListener({
      type: 'keydown',
      listener: function listener(event) {
        return onKeyDown(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentKeyDownListener = _useEventListener2[0],
    unbindDocumentKeyDownListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResize(event);
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentResizeListener = _useEventListener4[0],
    unbindDocumentResizeListener = _useEventListener4[1];
  var _useEventListener5 = useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResizeEnd(event);
      }
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentResizeEndListener = _useEventListener6[0],
    unbindDocumentResizEndListener = _useEventListener6[1];
  var _useEventListener7 = useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDrag(event);
      }
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindDocumentDragListener = _useEventListener8[0],
    unbindDocumentDragListener = _useEventListener8[1];
  var _useEventListener9 = useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDragEnd(event);
      }
    }),
    _useEventListener10 = _slicedToArray(_useEventListener9, 2),
    bindDocumentDragEndListener = _useEventListener10[0],
    unbindDocumentDragEndListener = _useEventListener10[1];
  var onClose = function onClose(event) {
    props.onHide();
    event.preventDefault();
  };
  var focus = function focus() {
    var activeElement = document.activeElement;
    var isActiveElementInDialog = activeElement && dialogRef.current && dialogRef.current.contains(activeElement);
    if (!isActiveElementInDialog && props.closable && props.showHeader) {
      closeRef.current.focus();
    }
  };
  var onDialogPointerDown = function onDialogPointerDown(event) {
    pointerRef.current = event.target;
    props.onPointerDown && props.onPointerDown(event);
  };
  var onMaskPointerUp = function onMaskPointerUp(event) {
    if (props.dismissableMask && props.modal && maskRef.current === event.target && !pointerRef.current) {
      onClose(event);
    }
    props.onMaskClick && props.onMaskClick(event);
    pointerRef.current = null;
  };
  var toggleMaximize = function toggleMaximize(event) {
    if (props.onMaximize) {
      props.onMaximize({
        originalEvent: event,
        maximized: !maximized
      });
    } else {
      setMaximizedState(function (prevMaximized) {
        return !prevMaximized;
      });
    }
    event.preventDefault();
  };
  var onKeyDown = function onKeyDown(event) {
    var currentTarget = event.currentTarget;
    if (!currentTarget || !currentTarget.primeDialogParams) {
      return;
    }
    var params = currentTarget.primeDialogParams;
    var paramLength = params.length;
    var dialogId = params[paramLength - 1] ? params[paramLength - 1].id : undefined;
    if (dialogId !== idState) {
      return;
    }
    var dialog = document.getElementById(dialogId);
    if (props.closable && props.closeOnEscape && event.key === 'Escape') {
      onClose(event);
      event.stopImmediatePropagation();
      params.splice(paramLength - 1, 1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      var focusableElements = DomHandler.getFocusableElements(dialog);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    }
  };
  var onDragStart = function onDragStart(event) {
    if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
      return;
    }
    if (props.draggable) {
      dragging.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      dialogRef.current.style.margin = '0';
      DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onDragStart && props.onDragStart(event);
    }
  };
  var onDrag = function onDrag(event) {
    if (dragging.current) {
      var width = DomHandler.getOuterWidth(dialogRef.current);
      var height = DomHandler.getOuterHeight(dialogRef.current);
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var offset = dialogRef.current.getBoundingClientRect();
      var leftPos = offset.left + deltaX;
      var topPos = offset.top + deltaY;
      var viewport = DomHandler.getViewport();
      dialogRef.current.style.position = 'fixed';
      if (props.keepInViewport) {
        if (leftPos >= props.minX && leftPos + width < viewport.width) {
          lastPageX.current = event.pageX;
          dialogRef.current.style.left = leftPos + 'px';
        }
        if (topPos >= props.minY && topPos + height < viewport.height) {
          lastPageY.current = event.pageY;
          dialogRef.current.style.top = topPos + 'px';
        }
      } else {
        lastPageX.current = event.pageX;
        dialogRef.current.style.left = leftPos + 'px';
        lastPageY.current = event.pageY;
        dialogRef.current.style.top = topPos + 'px';
      }
      props.onDrag && props.onDrag(event);
    }
  };
  var onDragEnd = function onDragEnd(event) {
    if (dragging.current) {
      dragging.current = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onDragEnd && props.onDragEnd(event);
    }
  };
  var onResizeStart = function onResizeStart(event) {
    if (props.resizable) {
      resizing.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onResizeStart && props.onResizeStart(event);
    }
  };
  var convertToPx = function convertToPx(value, property, viewport) {
    !viewport && (viewport = DomHandler.getViewport());
    var val = parseInt(value);
    if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
      return val * (viewport[property] / 100);
    }
    return val;
  };
  var onResize = function onResize(event) {
    if (resizing.current) {
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var width = DomHandler.getOuterWidth(dialogRef.current);
      var height = DomHandler.getOuterHeight(dialogRef.current);
      var offset = dialogRef.current.getBoundingClientRect();
      var viewport = DomHandler.getViewport();
      var hasBeenDragged = !parseInt(dialogRef.current.style.top) || !parseInt(dialogRef.current.style.left);
      var minWidth = convertToPx(dialogRef.current.style.minWidth, 'width', viewport);
      var minHeight = convertToPx(dialogRef.current.style.minHeight, 'height', viewport);
      var newWidth = width + deltaX;
      var newHeight = height + deltaY;
      if (hasBeenDragged) {
        newWidth += deltaX;
        newHeight += deltaY;
      }
      if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
        dialogRef.current.style.width = newWidth + 'px';
      }
      if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
        dialogRef.current.style.height = newHeight + 'px';
      }
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      props.onResize && props.onResize(event);
    }
  };
  var onResizeEnd = function onResizeEnd(event) {
    if (resizing.current) {
      resizing.current = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onResizeEnd && props.onResizeEnd(event);
    }
  };
  var resetPosition = function resetPosition() {
    dialogRef.current.style.position = '';
    dialogRef.current.style.left = '';
    dialogRef.current.style.top = '';
    dialogRef.current.style.margin = '';
  };
  var getPositionClass = function getPositionClass() {
    var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
    var pos = positions.find(function (item) {
      return item === props.position || item.replace('-', '') === props.position;
    });
    return pos ? "p-dialog-".concat(pos) : '';
  };
  var onEnter = function onEnter() {
    dialogRef.current.setAttribute(attributeSelector.current, '');
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
    if (props.focusOnShow) {
      focus();
    }
    enableDocumentSettings();
  };
  var onExiting = function onExiting() {
    if (props.modal) {
      DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
    }
    if (props.blockScroll) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  var onExited = function onExited() {
    dragging.current = false;
    ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
    disableDocumentSettings();
  };
  var enableDocumentSettings = function enableDocumentSettings() {
    bindGlobalListeners();
    if (props.blockScroll || props.maximizable && maximized) {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  };
  var disableDocumentSettings = function disableDocumentSettings() {
    unbindGlobalListeners();
    var isMaximized = props.maximizable && maximized;
    if (props.modal) {
      var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
        return param.hasBlockScroll;
      });
      if (hasBlockScroll || isMaximized) {
        DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    } else if (props.blockScroll || isMaximized) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  var bindGlobalListeners = function bindGlobalListeners() {
    if (props.draggable) {
      bindDocumentDragListener();
      bindDocumentDragEndListener();
    }
    if (props.resizable) {
      bindDocumentResizeListener();
      bindDocumentResizeEndListener();
    }
    bindDocumentKeyDownListener();
    var newParam = {
      id: idState,
      hasBlockScroll: props.blockScroll
    };
    document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
  };
  var unbindGlobalListeners = function unbindGlobalListeners() {
    unbindDocumentDragListener();
    unbindDocumentDragEndListener();
    unbindDocumentResizeListener();
    unbindDocumentResizEndListener();
    unbindDocumentKeyDownListener();
    document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
      return param.id !== idState;
    });
  };
  var createStyle = function createStyle() {
    styleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
    var innerHTML = '';
    for (var breakpoint in props.breakpoints) {
      innerHTML += "\n                @media screen and (max-width: ".concat(breakpoint, ") {\n                    .p-dialog[").concat(attributeSelector.current, "] {\n                        width: ").concat(props.breakpoints[breakpoint], " !important;\n                    }\n                }\n            ");
    }
    styleElement.current.innerHTML = innerHTML;
  };
  var changeScrollOnMaximizable = function changeScrollOnMaximizable() {
    if (!props.blockScroll) {
      var funcName = maximized && visibleState ? 'addClass' : 'removeClass';
      DomHandler[funcName](document.body, 'p-overflow-hidden');
    }
  };
  useMountEffect(function () {
    if (props.visible) {
      setMaskVisibleState(true);
    }
    if (props.breakpoints) {
      createStyle();
    }
  });
  useUpdateEffect(function () {
    if (props.visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }
    if (props.visible !== visibleState && maskVisibleState) {
      setVisibleState(props.visible);
    }
  });
  useUpdateEffect(function () {
    if (maskVisibleState) {
      ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['modal'] || PrimeReact.zIndex['modal']);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  useUpdateEffect(function () {
    changeScrollOnMaximizable();
  }, [props.maximized, maximizedState, visibleState]);
  useUnmountEffect(function () {
    disableDocumentSettings();
    DomHandler.removeInlineStyle(styleElement.current);
    ZIndexUtils.clear(maskRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      resetPosition: resetPosition,
      getElement: function getElement() {
        return dialogRef.current;
      },
      getMask: function getMask() {
        return maskRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getHeader: function getHeader() {
        return headerRef.current;
      },
      getFooter: function getFooter() {
        return footerRef.current;
      },
      getCloseButton: function getCloseButton() {
        return closeRef.current;
      }
    };
  });
  var createCloseIcon = function createCloseIcon() {
    if (props.closable) {
      var ariaLabel = props.ariaCloseIconLabel || localeOption('close');
      var closeButtonIconProps = mergeProps({
        className: 'p-dialog-header-close-icon',
        'aria-hidden': true
      }, ptm('closeButtonIcon'));
      var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeButtonIconProps);
      var headerCloseIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeButtonIconProps), {
        props: props
      });
      var closeButtonProps = mergeProps({
        ref: closeRef,
        type: 'button',
        className: 'p-dialog-header-icon p-dialog-header-close p-link',
        'aria-label': ariaLabel,
        onClick: onClose
      }, ptm('closeButton'));
      return /*#__PURE__*/React.createElement("button", closeButtonProps, headerCloseIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createMaximizeIcon = function createMaximizeIcon() {
    var icon;
    var iconClassName = 'p-dialog-header-maximize-icon';
    var maximizableIconProps = mergeProps({
      className: iconClassName
    }, ptm('maximizableIcon'));
    if (!maximized) {
      icon = props.maximizeIcon || /*#__PURE__*/React.createElement(WindowMaximizeIcon, maximizableIconProps);
    } else {
      icon = props.minimizeIcon || /*#__PURE__*/React.createElement(WindowMinimizeIcon, maximizableIconProps);
    }
    var toggleIcon = IconUtils.getJSXIcon(icon, maximizableIconProps, {
      props: props
    });
    if (props.maximizable) {
      var maximizableButtonProps = mergeProps({
        type: 'button',
        className: 'p-dialog-header-icon p-dialog-header-maximize p-link',
        onClick: toggleMaximize
      }, ptm('maximizableButton'));
      return /*#__PURE__*/React.createElement("button", maximizableButtonProps, toggleIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.showHeader) {
      var closeIcon = createCloseIcon();
      var maximizeIcon = createMaximizeIcon();
      var icons = ObjectUtils.getJSXElement(props.icons, props);
      var header = ObjectUtils.getJSXElement(props.header, props);
      var headerId = idState + '_header';
      var headerClassName = classNames('p-dialog-header', props.headerClassName);
      var headerProps = mergeProps({
        ref: headerRef,
        style: props.headerStyle,
        className: headerClassName,
        onMouseDown: onDragStart
      }, ptm('header'));
      var headerTitleProps = mergeProps({
        id: headerId,
        className: 'p-dialog-title'
      }, ptm('headerTitle'));
      var headerIconsProps = mergeProps({
        className: 'p-dialog-header-icons'
      }, ptm('headerIcons'));
      return /*#__PURE__*/React.createElement("div", headerProps, /*#__PURE__*/React.createElement("div", headerTitleProps, header), /*#__PURE__*/React.createElement("div", headerIconsProps, icons, maximizeIcon, closeIcon));
    }
    return null;
  };
  var createContent = function createContent() {
    var className = classNames('p-dialog-content', props.contentClassName);
    var contentId = idState + '_content';
    var contentProps = mergeProps({
      id: contentId,
      ref: contentRef,
      style: props.contentStyle,
      className: className
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", contentProps, props.children);
  };
  var createFooter = function createFooter() {
    var footer = ObjectUtils.getJSXElement(props.footer, props);
    var footerProps = mergeProps({
      ref: footerRef,
      className: 'p-dialog-footer'
    }, ptm('footer'));
    return footer && /*#__PURE__*/React.createElement("div", footerProps, footer);
  };
  var createResizer = function createResizer() {
    if (props.resizable) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-resizable-handle",
        style: {
          zIndex: 90
        },
        onMouseDown: onResizeStart
      });
    }
    return null;
  };
  var createElement = function createElement() {
    var className = classNames('p-dialog p-component', props.className, {
      'p-dialog-rtl': props.rtl,
      'p-dialog-maximized': maximized,
      'p-dialog-default': !maximized,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var maskClassName = classNames('p-dialog-mask', getPositionClass(), {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-dialog-visible': maskVisibleState,
      'p-dialog-draggable': props.draggable,
      'p-dialog-resizable': props.resizable
    }, props.maskClassName);
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    var resizer = createResizer();
    var headerId = idState + '_header';
    var contentId = idState + '_content';
    var transitionTimeout = {
      enter: props.position === 'center' ? 150 : 300,
      exit: props.position === 'center' ? 150 : 300
    };
    var maskProps = mergeProps({
      ref: maskRef,
      style: props.maskStyle,
      className: maskClassName,
      onPointerUp: onMaskPointerUp
    }, ptm('mask'));
    var rootProps = mergeProps({
      ref: dialogRef,
      id: idState,
      className: className,
      style: props.style,
      onClick: props.onClick,
      role: 'dialog',
      'aria-labelledby': headerId,
      'aria-describedby': contentId,
      'aria-modal': props.modal,
      onPointerDown: onDialogPointerDown
    }, DialogBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React.createElement("div", maskProps, /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: dialogRef,
      classNames: "p-dialog",
      timeout: transitionTimeout,
      "in": visibleState,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, /*#__PURE__*/React.createElement("div", rootProps, header, content, footer, resizer)));
  };
  var createDialog = function createDialog() {
    var element = createElement();
    return /*#__PURE__*/React.createElement(Portal, {
      element: element,
      appendTo: props.appendTo,
      visible: true
    });
  };
  return maskVisibleState && createDialog();
});
Dialog.displayName = 'Dialog';

export { Dialog };