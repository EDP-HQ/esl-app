import * as React from 'react';
import { BanIcon } from 'primereact/icons/ban';
import { StarIcon } from 'primereact/icons/star';
import { StarFillIcon } from 'primereact/icons/starfill';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
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

var RatingBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Rating',
    id: null,
    value: null,
    disabled: false,
    readOnly: false,
    stars: 5,
    cancel: true,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onIcon: null,
    offIcon: null,
    cancelIcon: null,
    cancelIconProps: null,
    onIconProps: null,
    offIconProps: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Rating = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = RatingBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var _RatingBase$setMetaDa = RatingBase.setMetaData({
      props: props
    }),
    ptm = _RatingBase$setMetaDa.ptm;
  var getPTOptions = function getPTOptions(value, key) {
    return ptm(key, {
      context: {
        active: value <= props.value
      }
    });
  };
  var enabled = !props.disabled && !props.readOnly;
  var tabIndex = enabled ? 0 : null;
  var rate = function rate(event, i) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: i,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: i
        }
      });
    }
    event.preventDefault();
  };
  var clear = function clear(event) {
    if (enabled && props.onChange) {
      props.onChange({
        originalEvent: event,
        value: null,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: null
        }
      });
    }
    event.preventDefault();
  };
  var onStarKeyDown = function onStarKeyDown(event, value) {
    if (event.key === 'Enter') {
      rate(event, value);
    }
  };
  var onCancelKeyDown = function onCancelKeyDown(event) {
    if (event.key === 'Enter') {
      clear(event);
    }
  };
  var createIcons = function createIcons() {
    return Array.from({
      length: props.stars
    }, function (_, i) {
      return i + 1;
    }).map(function (value) {
      var active = value <= props.value;
      var className = classNames('p-rating-item', {
        'p-rating-item-active': active
      });
      var iconClassName = 'p-rating-icon';
      var onIconProps = mergeProps({
        className: iconClassName
      }, getPTOptions(props.value, 'onIcon'));
      var offIconProps = mergeProps({
        className: iconClassName
      }, getPTOptions(props.value, 'offIcon'));
      var icon = active ? {
        type: props.onIcon || /*#__PURE__*/React.createElement(StarFillIcon, onIconProps)
      } : {
        type: props.offIcon || /*#__PURE__*/React.createElement(StarIcon, offIconProps)
      };
      var content = IconUtils.getJSXIcon(icon.type, active ? _objectSpread({}, onIconProps) : _objectSpread({}, offIconProps), {
        props: props
      });
      var itemProps = mergeProps({
        key: value,
        className: className,
        tabIndex: tabIndex,
        onClick: function onClick(e) {
          return rate(e, value);
        },
        onKeyDown: function onKeyDown(e) {
          return onStarKeyDown(e, value);
        }
      }, getPTOptions(props.value, 'item'));
      return /*#__PURE__*/React.createElement("div", _extends({
        key: value
      }, itemProps), content);
    });
  };
  var createCancelIcon = function createCancelIcon() {
    if (props.cancel) {
      var iconClassName = 'p-rating-icon p-rating-cancel';
      var cancelIconProps = mergeProps({
        className: iconClassName
      }, ptm('cancelIcon'));
      var icon = props.cancelIcon || /*#__PURE__*/React.createElement(BanIcon, cancelIconProps);
      var content = IconUtils.getJSXIcon(icon, _objectSpread(_objectSpread({}, cancelIconProps), props.cancelIconProps), {
        props: props
      });
      var cancelItemProps = mergeProps({
        className: 'p-rating-item p-rating-cancel-item',
        onClick: clear,
        tabIndex: tabIndex,
        onKeyDown: onCancelKeyDown
      }, ptm('cancelItem'));
      return /*#__PURE__*/React.createElement("div", cancelItemProps, content);
    }
    return null;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var className = classNames('p-rating', {
    'p-disabled': props.disabled,
    'p-readonly': props.readOnly
  }, props.className);
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, RatingBase.getOtherProps(props), ptm('root'));
  var cancelIcon = createCancelIcon();
  var icons = createIcons();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, cancelIcon, icons), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
Rating.displayName = 'Rating';

export { Rating };
