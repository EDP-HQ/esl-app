this.primereact = this.primereact || {};
this.primereact.button = (function (exports, React, spinner, ripple, tooltip, utils, componentbase, api) {
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

  var ButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Button',
      badge: null,
      badgeClassName: null,
      className: null,
      children: undefined,
      disabled: false,
      icon: null,
      iconPos: 'left',
      label: null,
      link: false,
      loading: false,
      loadingIcon: null,
      outlined: false,
      raised: false,
      rounded: false,
      severity: null,
      size: null,
      text: false,
      tooltip: null,
      tooltipOptions: null,
      visible: true
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Button = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = ButtonBase.getProps(inProps, context);
    var _ButtonBase$setMetaDa = ButtonBase.setMetaData({
        props: props
      }),
      ptm = _ButtonBase$setMetaDa.ptm;
    var elementRef = React__namespace.useRef(ref);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    if (props.visible === false) {
      return null;
    }
    var createIcon = function createIcon() {
      var className = utils.classNames('p-button-icon p-c', _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label));
      var iconsProps = utils.mergeProps({
        className: className
      }, ptm('icon'));
      className = utils.classNames(className, {
        'p-button-loading-icon': props.loading
      });
      var loadingIconProps = utils.mergeProps({
        className: className
      }, ptm('loadingIcon'));
      var icon = props.loading ? props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      })) : props.icon;
      return utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconsProps), {
        props: props
      });
    };
    var createLabel = function createLabel() {
      if (props.label) {
        var labelProps = utils.mergeProps({
          className: 'p-button-label p-c'
        }, ptm('label'));
        return /*#__PURE__*/React__namespace.createElement("span", labelProps, props.label);
      }
      return !props.children && !props.label && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-button-label p-c",
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      });
    };
    var createBadge = function createBadge() {
      if (props.badge) {
        var badgeClassName = utils.classNames('p-badge', props.badgeClassName);
        var badgeProps = utils.mergeProps({
          className: badgeClassName
        }, ptm('badge'));
        return /*#__PURE__*/React__namespace.createElement("span", badgeProps, props.badge);
      }
      return null;
    };
    var disabled = props.disabled || props.loading;
    var showTooltip = !disabled || props.tooltipOptions && props.tooltipOptions.showOnDisabled;
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
    var sizeMapping = {
      large: 'lg',
      small: 'sm'
    };
    var size = sizeMapping[props.size];
    var className = utils.classNames('p-button p-component', props.className, _defineProperty(_defineProperty(_defineProperty({
      'p-button-icon-only': (props.icon || props.loading) && !props.label && !props.children,
      'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
      'p-disabled': disabled,
      'p-button-loading': props.loading,
      'p-button-outlined': props.outlined,
      'p-button-raised': props.raised,
      'p-button-link': props.link,
      'p-button-text': props.text,
      'p-button-rounded': props.rounded,
      'p-button-loading-label-only': props.loading && !props.icon && props.label
    }, "p-button-loading-".concat(props.iconPos), props.loading && props.label), "p-button-".concat(size), size), "p-button-".concat(props.severity), props.severity));
    var icon = createIcon();
    var label = createLabel();
    var badge = createBadge();
    var defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];
    var rootProps = utils.mergeProps({
      ref: elementRef,
      'aria-label': defaultAriaLabel,
      className: className,
      disabled: disabled
    }, ButtonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("button", rootProps, icon, label, props.children, badge, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  Button.displayName = 'Button';

  exports.Button = Button;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.icons.spinner, primereact.ripple, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.api);
