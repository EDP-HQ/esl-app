this.primereact = this.primereact || {};
this.primereact.megamenu = (function (exports, React, PrimeReact, hooks, angledown, angleright, bars, ripple, utils, componentbase) {
  'use strict';

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

  var MegaMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'MegaMenu',
      id: null,
      model: null,
      style: null,
      className: null,
      orientation: 'horizontal',
      breakpoint: undefined,
      scrollHeight: '400px',
      start: null,
      submenuIcon: null,
      menuIcon: null,
      end: null,
      children: undefined
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var MegaMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = MegaMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeItemState = _React$useState2[0],
      setActiveItemState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      attributeSelectorState = _React$useState4[0],
      setAttributeSelectorState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      mobileActiveState = _React$useState6[0],
      setMobileActiveState = _React$useState6[1];
    var elementRef = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var menuButtonRef = React__namespace.useRef(null);
    var horizontal = props.orientation === 'horizontal';
    var vertical = props.orientation === 'vertical';
    var isMobileMode = hooks.useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
    var _MegaMenuBase$setMeta = MegaMenuBase.setMetaData({
        props: props,
        state: {
          activeItem: activeItemState,
          attributeSelector: attributeSelectorState,
          mobileActive: mobileActiveState
        }
      }),
      ptm = _MegaMenuBase$setMeta.ptm;
    var getPTOptions = function getPTOptions(item, key) {
      return ptm(key, {
        context: {
          active: activeItemState === item
        }
      });
    };
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if ((!isMobileMode || mobileActiveState) && isOutsideClicked(event)) {
            setActiveItemState(null);
            setMobileActiveState(false);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 1),
      bindDocumentClickListener = _useEventListener2[0];
    var _useResizeListener = hooks.useResizeListener({
        listener: function listener() {
          if (!isMobileMode || mobileActiveState) {
            setActiveItemState(null);
            setMobileActiveState(false);
          }
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
      bindDocumentResizeListener = _useResizeListener2[0];
    var onLeafClick = function onLeafClick(event, item) {
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
      setActiveItemState(null);
      setMobileActiveState(false);
    };
    var onCategoryMouseEnter = function onCategoryMouseEnter(event, item) {
      if (item.disabled || isMobileMode) {
        event.preventDefault();
        return;
      }
      if (activeItemState) {
        setActiveItemState(item);
      }
    };
    var onCategoryClick = function onCategoryClick(event, item) {
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
          item: props.item
        });
      }
      if (item.items) {
        activeItemState && activeItemState === item ? setActiveItemState(null) : setActiveItemState(item);
      }
      event.preventDefault();
    };
    var onCategoryKeyDown = function onCategoryKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;
      switch (event.which) {
        //down
        case 40:
          horizontal ? expandMenu(item) : navigateToNextItem(listItem);
          event.preventDefault();
          break;

        //up
        case 38:
          vertical ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
          event.preventDefault();
          break;

        //right
        case 39:
          horizontal ? navigateToNextItem(listItem) : expandMenu(item);
          event.preventDefault();
          break;

        //left
        case 37:
          horizontal ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
          event.preventDefault();
          break;
      }
    };
    var expandMenu = function expandMenu(item) {
      if (item.items) {
        setActiveItemState(item);
      }
    };
    var collapseMenu = function collapseMenu(item) {
      setActiveItemState(null);
    };
    var toggle = function toggle(event) {
      event.preventDefault();
      setMobileActiveState(function (prevMobileActive) {
        return !prevMobileActive;
      });
      setActiveItemState(null);
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-disabled') || !utils.DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-disabled') || !utils.DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
    };
    var navigateToNextItem = function navigateToNextItem(listItem) {
      var nextItem = findNextItem(listItem);
      nextItem && nextItem.children[0].focus();
    };
    var navigateToPrevItem = function navigateToPrevItem(listItem) {
      var prevItem = findPrevItem(listItem);
      prevItem && prevItem.children[0].focus();
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target) || menuButtonRef.current && menuButtonRef.current.contains(event.target));
    };
    var getColumnClassName = function getColumnClassName(category) {
      var length = category.items ? category.items.length : 0;
      var columnClass;
      switch (length) {
        case 2:
          columnClass = 'p-megamenu-col-6';
          break;
        case 3:
          columnClass = 'p-megamenu-col-4';
          break;
        case 4:
          columnClass = 'p-megamenu-col-3';
          break;
        case 6:
          columnClass = 'p-megamenu-col-2';
          break;
        default:
          columnClass = 'p-megamenu-col-12';
          break;
      }
      return columnClass;
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
      if (props.breakpoint) {
        !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
      }
      bindDocumentClickListener();
      bindDocumentResizeListener();
    });
    hooks.useUpdateEffect(function () {
      var currentPanel = utils.DomHandler.findSingle(elementRef.current, '.p-menuitem-active > .p-megamenu-panel');
      if (activeItemState && !isMobileMode) {
        utils.ZIndexUtils.set('menu', currentPanel, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
      }
      if (isMobileMode) {
        currentPanel && currentPanel.previousElementSibling.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
      return function () {
        utils.ZIndexUtils.clear(currentPanel);
      };
    }, [activeItemState]);
    var createSeparator = function createSeparator(index) {
      var key = 'separator_' + index;
      var separatorProps = utils.mergeProps({
        key: key,
        className: 'p-menu-separator',
        role: 'separator'
      }, ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createSubmenuIcon = function createSubmenuIcon(item) {
      if (item.items) {
        var iconClassName = 'p-submenu-icon';
        var submenuIconProps = utils.mergeProps({
          className: iconClassName
        }, ptm('submenuIcon'));
        var icon = vertical ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, submenuIconProps);
        var submenuIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, submenuIconProps), {
          props: props
        });
        return submenuIcon;
      }
      return null;
    };
    var createSubmenuItem = function createSubmenuItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      if (item.separator) {
        return createSeparator(index);
      } else {
        var key = item.label + '_' + index;
        var _className = utils.classNames('p-menuitem', item.className);
        var linkClassName = utils.classNames('p-menuitem-link', {
          'p-disabled': item.disabled
        });
        var iconClassName = utils.classNames(item.icon, 'p-menuitem-icon');
        var icon = utils.IconUtils.getJSXIcon(item.icon, {
          className: 'p-menuitem-icon'
        }, {
          props: props
        });
        var label = item.label && /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-menuitem-text"
        }, item.label);
        var actionProps = utils.mergeProps({
          href: item.url || '#',
          className: linkClassName,
          target: item.target,
          onClick: function onClick(event) {
            return onLeafClick(event, item);
          },
          role: 'menuitem',
          'aria-disabled': item.disabled
        }, getPTOptions(item, 'action'));
        var submenuItemProps = utils.mergeProps({
          key: key,
          id: item.id,
          className: _className,
          style: item.style,
          role: 'none'
        }, getPTOptions(item, 'submenuItem'));
        var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
        if (item.template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return onLeafClick(event, item);
            },
            className: linkClassName,
            labelClassName: 'p-menuitem-text',
            iconClassName: iconClassName,
            element: content,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("li", submenuItemProps, content);
      }
    };
    var createSubmenu = function createSubmenu(submenu) {
      if (submenu.visible === false) {
        return null;
      }
      var className = utils.classNames('p-megamenu-submenu-header', {
        'p-disabled': submenu.disabled
      }, submenu.className);
      var items = submenu.items.map(createSubmenuItem);
      var submenuHeaderProps = utils.mergeProps({
        id: submenu.id,
        className: className,
        style: submenu.style,
        role: 'presentation'
      }, ptm('submenuHeader'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: submenu.label
      }, /*#__PURE__*/React__namespace.createElement("li", submenuHeaderProps, submenu.label), items);
    };
    var createSubmenus = function createSubmenus(column) {
      return column.map(createSubmenu);
    };
    var createColumn = function createColumn(category, column, index, columnClassName) {
      var key = category.label + '_column_' + index;
      var submenus = createSubmenus(column);
      var columnProps = utils.mergeProps({
        key: key,
        className: columnClassName
      }, ptm('column'));
      var submenuProps = utils.mergeProps({
        className: 'p-megamenu-submenu',
        role: 'menu'
      }, ptm('submenu'));
      return /*#__PURE__*/React__namespace.createElement("div", columnProps, /*#__PURE__*/React__namespace.createElement("ul", submenuProps, submenus));
    };
    var createColumns = function createColumns(category) {
      if (category.items) {
        var columnClassName = getColumnClassName(category);
        return category.items.map(function (column, index) {
          return createColumn(category, column, index, columnClassName);
        });
      }
      return null;
    };
    var createCategoryPanel = function createCategoryPanel(category) {
      if (category.items) {
        var columns = createColumns(category);
        var panelProps = utils.mergeProps({
          className: 'p-megamenu-panel'
        }, ptm('panel'));
        var gridProps = utils.mergeProps({
          className: 'p-megamenu-grid'
        }, ptm('grid'));
        return /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", gridProps, columns));
      }
      return null;
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce);
        var selector = "".concat(attributeSelectorState);
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-megamenu[").concat(selector, "] > .p-megamenu-root-list .p-menuitem-active .p-megamenu-panel {\n        position: relative;\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        background: inherit;\n    }\n\n    .p-megamenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-megamenu[").concat(selector, "] .p-megamenu-grid {\n        flex-wrap: wrap;\n    }\n\n    ").concat(horizontal ? "\n.p-megamenu[".concat(selector, "] .p-megamenu-button {\n    display: flex;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal {\n    position: relative;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal .p-megamenu-root-list {\n    display: none;\n}\n\n.p-megamenu-horizontal[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: auto;\n    flex: 1;\n    padding: 0;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-mobile-active .p-megamenu-root-list {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    width: 100%;\n    top: 100%;\n    left: 0;\n    z-index: 1;\n}\n        ") : '', "\n\n    ").concat(vertical ? "\n.p-megamenu-vertical[".concat(selector, "] {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-root-list {\n    max-height: ").concat(props.scrollHeight, ";\n    overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n}\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: 100%;\n    padding: 0;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-submenu {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] .p-megamenu-submenu-header {\n    background: inherit;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-submenu-icon:before {\n    content: \"\\e930\";\n}\n        ") : '', "\n}\n");
        styleElementRef.current.innerHTML = innerHTML;
      }
    };
    var destroyStyle = function destroyStyle() {
      styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
    };
    hooks.useUpdateEffect(function () {
      if (attributeSelectorState && elementRef.current) {
        elementRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
      return function () {
        destroyStyle();
      };
    }, [attributeSelectorState, props.breakpoint]);
    var createCategory = function createCategory(category, index) {
      var className = utils.classNames('p-menuitem', {
        'p-menuitem-active': category === activeItemState
      }, category.className);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': category.disabled
      });
      var iconProps = utils.mergeProps({
        className: 'p-menuitem-icon'
      }, getPTOptions(category, 'icon'));
      var icon = utils.IconUtils.getJSXIcon(category.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, getPTOptions(category, 'label'));
      var label = category.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, category.label);
      var itemContent = category.template ? utils.ObjectUtils.getJSXElement(category.template, category) : null;
      var submenuIcon = createSubmenuIcon(category);
      var panel = createCategoryPanel(category);
      var headerActionProps = utils.mergeProps({
        href: category.url || '#',
        className: linkClassName,
        target: category.target,
        onClick: function onClick(e) {
          return onCategoryClick(e, category);
        },
        onKeyDown: function onKeyDown(e) {
          return onCategoryKeyDown(e, category);
        },
        role: 'menuitem',
        'aria-haspopup': category.items != null
      }, getPTOptions(category, 'headerAction'));
      var menuItemProps = utils.mergeProps({
        key: category.label + '_' + index,
        id: category.id,
        className: className,
        style: category.style,
        onMouseEnter: function onMouseEnter(e) {
          return onCategoryMouseEnter(e, category);
        },
        role: 'none'
      }, getPTOptions(category, 'menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, /*#__PURE__*/React__namespace.createElement("a", headerActionProps, icon, label, itemContent, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), panel);
    };
    var createMenu = function createMenu() {
      var menuProps = utils.mergeProps({
        className: 'p-megamenu-root-list',
        role: 'menubar'
      }, ptm('menu'));
      if (props.model) {
        return /*#__PURE__*/React__namespace.createElement("ul", menuProps, props.model.map(function (item, index) {
          return createCategory(item, index);
        }));
      }
      return null;
    };
    var createStartContent = function createStartContent() {
      var startProps = utils.mergeProps({
        className: 'p-megamenu-start'
      }, ptm('start'));
      if (props.start) {
        var _start = utils.ObjectUtils.getJSXElement(props.start, props);
        return /*#__PURE__*/React__namespace.createElement("div", startProps, _start);
      }
      return null;
    };
    var createEndContent = function createEndContent() {
      var endProps = utils.mergeProps({
        className: 'p-megamenu-end'
      }, ptm('end'));
      if (props.end) {
        var _end = utils.ObjectUtils.getJSXElement(props.end, props);
        return /*#__PURE__*/React__namespace.createElement("div", endProps, _end);
      }
      return null;
    };
    var createMenuButton = function createMenuButton() {
      if (props.orientation === 'vertical' || props.model && props.model.length < 1) {
        return null;
      }
      var icon = props.menuIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, null);
      var menuIcon = utils.IconUtils.getJSXIcon(icon, undefined, {
        props: props
      });
      /* eslint-disable */
      var button = /*#__PURE__*/React__namespace.createElement("a", {
        ref: menuButtonRef,
        href: '#',
        role: "button",
        tabIndex: 0,
        className: "p-megamenu-button",
        onClick: toggle
      }, menuIcon);
      /* eslint-enable */

      return button;
    };
    var className = utils.classNames('p-megamenu p-component', {
      'p-megamenu-horizontal': props.orientation === 'horizontal',
      'p-megamenu-vertical': props.orientation === 'vertical',
      'p-megamenu-mobile-active': mobileActiveState
    }, props.className);
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, MegaMenuBase.getOtherProps(props), ptm('root'));
    var menu = createMenu();
    var start = createStartContent();
    var end = createEndContent();
    var menuButton = createMenuButton();
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, start, menuButton, menu, end);
  }));
  MegaMenu.displayName = 'MegaMenu';

  exports.MegaMenu = MegaMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.icons.angledown, primereact.icons.angleright, primereact.icons.bars, primereact.ripple, primereact.utils, primereact.componentbase);
