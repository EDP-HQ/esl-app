import * as React from 'react';
import { PrimeReactContext, localeOption } from 'primereact/api';
import { useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { classNames, mergeProps, ObjectUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var DataScrollerBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataScroller',
    id: null,
    value: null,
    rows: 0,
    inline: false,
    scrollHeight: null,
    loader: false,
    buffer: 0.9,
    style: null,
    className: null,
    onLazyLoad: null,
    emptyMessage: null,
    itemTemplate: null,
    header: null,
    footer: null,
    lazy: false,
    children: undefined
  }
});

var DataScroller = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = DataScrollerBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dataToRenderState = _React$useState2[0],
    setDataToRenderState = _React$useState2[1];
  var _DataScrollerBase$set = DataScrollerBase.setMetaData({
      props: props
    }),
    ptm = _DataScrollerBase$set.ptm;
  var elementRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var value = React.useRef(props.value);
  var dataToRender = React.useRef([]);
  var first = React.useRef(0);
  var scrollFunction = React.useRef(null);
  var handleDataChange = function handleDataChange() {
    if (props.lazy) {
      dataToRender.current = value.current;
      setDataToRenderState(_toConsumableArray(dataToRender.current));
    } else {
      load();
    }
  };
  var load = function load() {
    if (props.lazy) {
      if (props.onLazyLoad) {
        props.onLazyLoad(createLazyLoadMetadata());
      }
      first.current += props.rows;
    } else {
      if (value.current) {
        for (var i = first.current; i < first.current + props.rows; i++) {
          if (i >= value.current.length) {
            break;
          }
          dataToRender.current.push(value.current[i]);
        }
        if (value.current.length !== 0) {
          first.current += props.rows;
        }
        setDataToRenderState(_toConsumableArray(dataToRender.current));
      }
    }
  };
  var reset = function reset() {
    first.current = 0;
    dataToRender.current = [];
    setDataToRenderState(_toConsumableArray(dataToRender.current));
    load();
  };
  var createLazyLoadMetadata = function createLazyLoadMetadata() {
    return {
      first: first.current,
      rows: props.rows
    };
  };
  var bindScrollListener = function bindScrollListener() {
    if (props.inline) {
      scrollFunction.current = function () {
        var scrollTop = contentRef.current.scrollTop,
          scrollHeight = contentRef.current.scrollHeight,
          viewportHeight = contentRef.current.clientHeight;
        if (scrollTop >= scrollHeight * props.buffer - viewportHeight) {
          load();
        }
      };
      contentRef.current.addEventListener('scroll', scrollFunction.current);
    } else {
      scrollFunction.current = function () {
        var docBody = document.body,
          docElement = document.documentElement,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop,
          winHeight = docElement.clientHeight,
          docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
        if (scrollTop >= docHeight * props.buffer - winHeight) {
          load();
        }
      };
      window.addEventListener('scroll', scrollFunction.current);
    }
  };
  var unbindScrollListener = function unbindScrollListener() {
    if (scrollFunction.current) {
      if (props.inline && contentRef.current) {
        contentRef.current.removeEventListener('scroll', scrollFunction.current);
      } else if (!props.loader) {
        window.removeEventListener('scroll', scrollFunction.current);
      }
    }
    scrollFunction.current = null;
  };
  useMountEffect(function () {
    load();
    if (!props.loader) {
      bindScrollListener();
    }
  });
  useUpdateEffect(function () {
    if (props.value) {
      value.current = props.value;
      if (!props.lazy) {
        first.current = 0;
      }
      dataToRender.current = [];
      handleDataChange();
    }
  }, [props.value]);
  useUpdateEffect(function () {
    if (props.loader) {
      unbindScrollListener();
    }
  }, [props.loader]);
  useUnmountEffect(function () {
    if (scrollFunction.current) {
      unbindScrollListener();
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      load: load,
      reset: reset,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });
  var createHeader = function createHeader() {
    var headerProps = mergeProps({
      className: 'p-datascroller-header'
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    var footerProps = mergeProps({
      className: 'p-datascroller-footer'
    }, ptm('footer'));
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createItem = function createItem(_value, index) {
    var itemProps = mergeProps({
      key: index + '_datascrollitem'
    }, ptm('item'));
    var content = props.itemTemplate ? props.itemTemplate(_value) : _value;
    return /*#__PURE__*/React.createElement("li", itemProps, content);
  };
  var createEmptyMessage = function createEmptyMessage() {
    var emptyMessageProps = mergeProps(ptm('emptyMessage'));
    var content = ObjectUtils.getJSXElement(props.emptyMessage, props) || localeOption('emptyMessage');
    return /*#__PURE__*/React.createElement("li", emptyMessageProps, content);
  };
  var createContent = function createContent() {
    var contentProps = mergeProps({
      ref: contentRef,
      className: 'p-datascroller-content',
      style: {
        maxHeight: props.scrollHeight
      }
    }, ptm('content'));
    var listProps = mergeProps({
      className: 'p-datascroller-list'
    }, ptm('list'));
    var content = ObjectUtils.isNotEmpty(dataToRenderState) ? dataToRenderState.map(createItem) : createEmptyMessage();
    return /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement("ul", listProps, content));
  };
  var className = classNames('p-datascroller p-component', props.className, {
    'p-datascroller-inline': props.inline
  });
  var header = createHeader();
  var footer = createFooter();
  var content = createContent();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: className
  }, DataScrollerBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, header, content, footer);
}));
DataScroller.displayName = 'DataScroller';

export { DataScroller };
