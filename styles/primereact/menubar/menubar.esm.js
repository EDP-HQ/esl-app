import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { useEventListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { BarsIcon } from 'primereact/icons/bars';
import { classNames, mergeProps, IconUtils, ObjectUtils, DomHandler, ZIndexUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { Ripple } from 'primereact/ripple';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { AngleDownIcon } from 'primereact/icons/angledown';

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

var MenubarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Menubar',
    id: null,
    model: null,
    style: null,
    className: null,
    start: null,
    submenuIcon: null,
    menuIcon: null,
    end: null,
    children: undefined
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MenubarSub = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        active: activeItemState === item
      }
    });
  };
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (ref && ref.current && !ref.current.contains(event.target)) {
          setActiveItemState(null);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindDocumentClickListener = _useEventListener2[0];
  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled || props.mobileActive) {
      event.preventDefault();
      return;
    }
    if (props.root) {
      if (activeItemState || props.popup) {
        setActiveItemState(item);
      }
    } else {
      setActiveItemState(item);
    }
  };
  var onItemClick = function onItemClick(event, item) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (!item.url) {
      event.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
    if (item.items) activeItemState && item === activeItemState ? setActiveItemState(null) : setActiveItemState(item);else onLeafClick();
  };
  var onItemKeyDown = function onItemKeyDown(event, item) {
    var listItem = event.currentTarget.parentElement;
    switch (event.which) {
      //down
      case 40:
        if (props.root) item.items && expandSubmenu(item, listItem);else navigateToNextItem(listItem);
        event.preventDefault();
        break;

      //up
      case 38:
        !props.root && navigateToPrevItem(listItem);
        event.preventDefault();
        break;

      //right
      case 39:
        if (props.root) {
          var nextItem = findNextItem(listItem);
          nextItem && nextItem.children[0].focus();
        } else {
          item.items && expandSubmenu(item, listItem);
        }
        event.preventDefault();
        break;

      //left
      case 37:
        props.root && navigateToPrevItem(listItem);
        event.preventDefault();
        break;
    }
    props.onKeyDown && props.onKeyDown(event, listItem);
  };
  var onChildItemKeyDown = function onChildItemKeyDown(event, childListItem) {
    if (props.root) {
      //up
      if (event.which === 38 && childListItem.previousElementSibling == null) {
        collapseMenu(childListItem);
      }
    } else {
      //left
      if (event.which === 37) {
        collapseMenu(childListItem);
      }
    }
  };
  var expandSubmenu = function expandSubmenu(item, listItem) {
    setActiveItemState(item);
    setTimeout(function () {
      listItem.children[1].children[0].children[0].focus();
    }, 50);
  };
  var collapseMenu = function collapseMenu(listItem) {
    setActiveItemState(null);
    listItem.parentElement.previousElementSibling.focus();
  };
  var navigateToNextItem = function navigateToNextItem(listItem) {
    var nextItem = findNextItem(listItem);
    nextItem && nextItem.children[0].focus();
  };
  var navigateToPrevItem = function navigateToPrevItem(listItem) {
    var prevItem = findPrevItem(listItem);
    prevItem && prevItem.children[0].focus();
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onLeafClick = function onLeafClick() {
    setActiveItemState(null);
    props.onLeafClick && props.onLeafClick();
  };
  useMountEffect(function () {
    bindDocumentClickListener();
  });
  useUpdateEffect(function () {
    !props.parentActive && setActiveItemState(null);
  }, [props.parentActive]);
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = mergeProps({
      key: key,
      className: 'p-menu-separator',
      role: 'separator'
    }, props.ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item) {
    if (item.items) {
      return /*#__PURE__*/React.createElement(MenubarSub, {
        menuProps: props.menuProps,
        model: item.items,
        mobileActive: props.mobileActive,
        onLeafClick: onLeafClick,
        onKeyDown: onChildItemKeyDown,
        parentActive: item === activeItemState,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm
      });
    }
    return null;
  };
  var createMenuitem = function createMenuitem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = item.label + '_' + index;
    var className = classNames('p-menuitem', {
      'p-menuitem-active': activeItemState === item
    }, item.className);
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: 'p-menuitem-icon'
    }, getPTOptions(item, 'icon'));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(item, 'label'));
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = mergeProps({
      className: submenuIconClassName
    }, getPTOptions(item, 'submenuIcon'));
    var submenuIcon = item.items && IconUtils.getJSXIcon(!props.root ? props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React.createElement(AngleDownIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: _objectSpread$1({
        menuProps: props.menuProps
      }, props)
    });
    var submenu = createSubmenu(item);
    var actionProps = mergeProps({
      href: item.url || '#',
      role: 'menuitem',
      className: linkClassName,
      target: item.target,
      'aria-haspopup': item.items != null,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event, item);
      }
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null));
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event, item);
        },
        className: linkClassName,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      key: key,
      role: 'none',
      id: item.id,
      className: className,
      style: item.style,
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, item);
      }
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuitem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model ? props.model.map(createItem) : null;
  };
  var role = props.root ? 'menubar' : 'menu';
  var className = classNames({
    'p-submenu-list': !props.root,
    'p-menubar-root-list': props.root
  });
  var submenu = createMenu();
  var menuProps = mergeProps({
    ref: ref,
    className: className,
    role: role
  }, props.ptm('menu'));
  return /*#__PURE__*/React.createElement("ul", menuProps, submenu);
}));
MenubarSub.displayName = 'MenubarSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Menubar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MenubarBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mobileActiveState = _React$useState2[0],
    setMobileActiveState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var rootMenuRef = React.useRef(null);
  var menuButtonRef = React.useRef(null);
  var _MenubarBase$setMetaD = MenubarBase.setMetaData({
      props: props,
      state: {
        mobileActive: mobileActiveState
      }
    }),
    ptm = _MenubarBase$setMetaD.ptm;
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (mobileActiveState && isOutsideClicked(event)) {
          setMobileActiveState(false);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var toggle = function toggle(event) {
    event.preventDefault();
    setMobileActiveState(function (prevMobileActive) {
      return !prevMobileActive;
    });
  };
  var onLeafClick = function onLeafClick() {
    setMobileActiveState(false);
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return rootMenuRef.current !== event.target && !rootMenuRef.current.contains(event.target) && menuButtonRef.current !== event.target && !menuButtonRef.current.contains(event.target);
  };
  useUpdateEffect(function () {
    if (mobileActiveState) {
      ZIndexUtils.set('menu', rootMenuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
      bindDocumentClickListener();
    } else {
      unbindDocumentClickListener();
      ZIndexUtils.clear(rootMenuRef.current);
    }
  }, [mobileActiveState]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(rootMenuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      getElement: function getElement() {
        return elementRef.current;
      },
      getRootMenu: function getRootMenu() {
        return rootMenuRef.current;
      },
      getMenuButton: function getMenuButton() {
        return menuButtonRef.current;
      }
    };
  });
  var createStartContent = function createStartContent() {
    if (props.start) {
      var _start = ObjectUtils.getJSXElement(props.start, props);
      var startProps = mergeProps({
        className: 'p-menubar-start'
      }, ptm('start'));
      return /*#__PURE__*/React.createElement("div", startProps, _start);
    }
    return null;
  };
  var createEndContent = function createEndContent() {
    if (props.end) {
      var _end = ObjectUtils.getJSXElement(props.end, props);
      var endProps = mergeProps({
        className: 'p-menubar-end'
      }, ptm('end'));
      return /*#__PURE__*/React.createElement("div", endProps, _end);
    }
    return null;
  };
  var createMenuButton = function createMenuButton() {
    if (props.model && props.model.length < 1) {
      return null;
    }
    var buttonProps = mergeProps({
      ref: menuButtonRef,
      href: '#',
      role: 'button',
      tabIndex: 0,
      className: 'p-menubar-button',
      onClick: function onClick(e) {
        return toggle(e);
      }
    }, ptm('button'));
    var popupIconProps = mergeProps(ptm('popupIcon'));
    var icon = props.menuIcon || /*#__PURE__*/React.createElement(BarsIcon, popupIconProps);
    var menuIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, popupIconProps), {
      props: props
    });

    /* eslint-disable */
    var button = /*#__PURE__*/React.createElement("a", buttonProps, menuIcon);
    /* eslint-enable */

    return button;
  };
  var className = classNames('p-menubar p-component', {
    'p-menubar-mobile-active': mobileActiveState
  }, props.className);
  var start = createStartContent();
  var end = createEndContent();
  var menuButton = createMenuButton();
  var submenu = /*#__PURE__*/React.createElement(MenubarSub, {
    ref: rootMenuRef,
    menuProps: props,
    model: props.model,
    root: true,
    mobileActive: mobileActiveState,
    onLeafClick: onLeafClick,
    submenuIcon: props.submenuIcon,
    ptm: ptm
  });
  var rootProps = mergeProps({
    id: props.id,
    className: className,
    style: props.style
  }, MenubarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, start, menuButton, submenu, end);
}));
Menubar.displayName = 'Menubar';

export { Menubar };