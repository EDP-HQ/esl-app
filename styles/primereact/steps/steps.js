this.primereact = this.primereact || {};
this.primereact.steps = (function (exports, React, utils, componentbase, api) {
  'use strict';

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

  var StepsBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Steps',
      id: null,
      model: null,
      activeIndex: 0,
      readOnly: true,
      style: null,
      className: null,
      onSelect: null,
      children: undefined
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Steps = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = StepsBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(null);
    var _StepsBase$setMetaDat = StepsBase.setMetaData({
        props: props
      }),
      ptm = _StepsBase$setMetaDat.ptm;
    var itemClick = function itemClick(event, item, index) {
      if (props.readOnly || item.disabled) {
        event.preventDefault();
        return;
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          item: item,
          index: index
        });
      }
      if (!item.url) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item,
          index: index
        });
      }
    };
    var createItem = function createItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var key = item.label + '_' + index;
      var active = index === props.activeIndex;
      var disabled = item.disabled || index !== props.activeIndex && props.readOnly;
      var tabIndex = disabled ? -1 : '';
      var className = utils.classNames('p-steps-item', item.className, {
        'p-highlight p-steps-current': active,
        'p-disabled': disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var iconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('icon'));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = utils.mergeProps({
        className: 'p-steps-title'
      }, ptm('label'));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var stepProps = utils.mergeProps({
        className: 'p-steps-number'
      }, ptm('step'));
      var actionProps = utils.mergeProps({
        href: item.url || '#',
        className: 'p-menuitem-link',
        role: 'presentation',
        target: item.target,
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        },
        tabIndex: tabIndex
      }, ptm('action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, /*#__PURE__*/React__namespace.createElement("span", stepProps, index + 1), icon, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item, index);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-steps-title',
          numberClassName: 'p-steps-number',
          iconClassName: iconClassName,
          element: content,
          props: props,
          tabIndex: tabIndex,
          active: active,
          disabled: disabled
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var menuItemProps = utils.mergeProps({
        key: key,
        id: item.id,
        className: className,
        style: item.style,
        role: 'tab',
        'aria-selected': active,
        'aria-expanded': active
      }, ptm('menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, content);
    };
    var createItems = function createItems() {
      var menuProps = utils.mergeProps({
        role: 'tablist'
      }, ptm('menu'));
      if (props.model) {
        var _items = props.model.map(createItem);
        return /*#__PURE__*/React__namespace.createElement("ul", menuProps, _items);
      }
      return null;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var className = utils.classNames('p-steps p-component', {
      'p-readonly': props.readOnly
    }, props.className);
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, StepsBase.getOtherProps(props), ptm('root'));
    var items = createItems();
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, items);
  }));
  Steps.displayName = 'Steps';

  exports.Steps = Steps;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.componentbase, primereact.api);
