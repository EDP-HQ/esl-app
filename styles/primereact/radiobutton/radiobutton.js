this.primereact = this.primereact || {};
this.primereact.radiobutton = (function (exports, React, hooks, tooltip, utils, componentbase, api) {
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

  var RadioButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'RadioButton',
      autoFocus: false,
      checked: false,
      className: null,
      disabled: false,
      id: null,
      inputId: null,
      inputRef: null,
      name: null,
      onChange: null,
      onClick: null,
      required: false,
      style: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      value: null,
      children: undefined
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var RadioButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = RadioButtonBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var _RadioButtonBase$setM = RadioButtonBase.setMetaData({
        props: props,
        state: {
          focused: focusedState
        }
      }),
      ptm = _RadioButtonBase$setM.ptm;
    var select = function select(event) {
      onClick(event);
    };
    var onClick = function onClick(event) {
      if (props.disabled) {
        return;
      }
      if (props.onChange || props.onClick) {
        var checked = props.checked;
        var radioClicked = event.target instanceof HTMLDivElement;
        var inputClicked = event.target === inputRef.current;
        var isInputToggled = inputClicked && event.target.checked !== checked;
        var isRadioToggled = radioClicked && (utils.DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
        if (isInputToggled || isRadioToggled) {
          var value = !checked;
          var eventData = {
            originalEvent: event,
            value: props.value,
            checked: value,
            stopPropagation: function stopPropagation() {
              event.stopPropagation();
            },
            preventDefault: function preventDefault() {
              event.preventDefault();
            },
            target: {
              type: 'radio',
              name: props.name,
              id: props.id,
              value: props.value,
              checked: value
            }
          };
          props.onClick && props.onClick(eventData);

          // do not continue if the user defined click wants to prevent
          if (event.defaultPrevented) {
            return;
          }
          props.onChange && props.onChange(eventData);
          if (isRadioToggled) {
            inputRef.current.checked = value;
          }
        }
        utils.DomHandler.focus(inputRef.current);
        event.preventDefault();
      }
    };
    var onFocus = function onFocus() {
      setFocusedState(true);
    };
    var onBlur = function onBlur() {
      setFocusedState(false);
    };
    var onKeyDown = function onKeyDown(event) {
      if (event.code === 'Space' || event.key === ' ') {
        // event.key is for Android support
        onClick(event);
      }
    };
    React__namespace.useEffect(function () {
      if (inputRef.current) {
        inputRef.current.checked = props.checked;
      }
    }, [props.checked]);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focus(inputRef.current, props.autoFocus);
      }
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        select: select,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = RadioButtonBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-radiobutton p-component', {
      'p-radiobutton-checked': props.checked,
      'p-radiobutton-disabled': props.disabled,
      'p-radiobutton-focused': focusedState
    }, props.className);
    var boxClassName = utils.classNames('p-radiobutton-box', {
      'p-highlight': props.checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style,
      onClick: onClick
    }, RadioButtonBase.getOtherProps(props), ptm('root'));
    var hiddenInputWrapperProps = utils.mergeProps({
      className: 'p-hidden-accessible'
    }, ptm('hiddenInputWrapper'));
    var hiddenInputProps = utils.mergeProps(_objectSpread({
      ref: inputRef,
      id: props.inputId,
      type: 'radio',
      name: props.name,
      defaultChecked: props.checked,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      disabled: props.disabled,
      required: props.required,
      tabIndex: props.tabIndex
    }, ariaProps), ptm('hiddenInput'));
    var inputProps = utils.mergeProps({
      className: boxClassName
    }, ptm('input'));
    var iconProps = utils.mergeProps({
      className: 'p-radiobutton-icon'
    }, ptm('icon'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React__namespace.createElement("input", hiddenInputProps)), /*#__PURE__*/React__namespace.createElement("div", inputProps, /*#__PURE__*/React__namespace.createElement("div", iconProps))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  RadioButton.displayName = 'RadioButton';

  exports.RadioButton = RadioButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.api);
