'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var bars = require('primereact/icons/bars');
var spinner = require('primereact/icons/spinner');
var thlarge = require('primereact/icons/thlarge');
var paginator = require('primereact/paginator');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');

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

var DataViewBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataView',
    id: null,
    header: null,
    footer: null,
    value: null,
    layout: 'list',
    dataKey: null,
    rows: null,
    first: 0,
    totalRecords: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorClassName: null,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    paginatorDropdownAppendTo: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    emptyMessage: null,
    sortField: null,
    sortOrder: null,
    style: null,
    className: null,
    lazy: false,
    loading: false,
    loadingIcon: null,
    gutter: false,
    itemTemplate: null,
    onPage: null,
    children: undefined
  }
});
var DataViewLayoutOptionsBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'DataViewLayoutOptions',
    id: null,
    style: null,
    className: null,
    layout: null,
    listIcon: null,
    gridIcon: null,
    onChange: null,
    children: undefined
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DataViewLayoutOptions = /*#__PURE__*/React__namespace.memo(function (inProps) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = DataViewLayoutOptionsBase.getProps(inProps, context);
  var _DataViewLayoutOption = DataViewLayoutOptionsBase.setMetaData({
      props: props
    }),
    ptm = _DataViewLayoutOption.ptm;
  var changeLayout = function changeLayout(event, layoutMode) {
    props.onChange({
      originalEvent: event,
      value: layoutMode
    });
    event.preventDefault();
  };
  var className = utils.classNames('p-dataview-layout-options p-selectbutton p-buttonset', props.className);
  var buttonListClass = utils.classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'list'
  });
  var buttonGridClass = utils.classNames('p-button p-button-icon-only', {
    'p-highlight': props.layout === 'grid'
  });
  var listIconProps = utils.mergeProps(ptm('list'));
  var gridIconProps = utils.mergeProps(ptm('grid'));
  var listIcon = utils.IconUtils.getJSXIcon(props.listIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, listIconProps), _objectSpread({}, listIconProps), {
    props: props
  });
  var gridIcon = utils.IconUtils.getJSXIcon(props.gridIcon || /*#__PURE__*/React__namespace.createElement(thlarge.ThLargeIcon, gridIconProps), _objectSpread({}, gridIconProps), {
    props: props
  });
  var rootProps = utils.mergeProps({
    id: props.id,
    style: props.style,
    className: className
  }, DataViewLayoutOptionsBase.getOtherProps(props), ptm('root'));
  var listButtonProps = utils.mergeProps({
    type: 'button',
    className: buttonListClass,
    onClick: function onClick(event) {
      return changeLayout(event, 'list');
    }
  }, ptm('listButton'));
  var gridButtonProps = utils.mergeProps({
    type: 'button',
    className: buttonGridClass,
    onClick: function onClick(event) {
      return changeLayout(event, 'grid');
    }
  }, ptm('gridButton'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("button", listButtonProps, listIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("button", gridButtonProps, gridIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
});
var DataViewItem = /*#__PURE__*/React__namespace.memo(function (props) {
  return props.template(props.item, props.layout);
});
var DataView = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = DataViewBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.first),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    firstState = _React$useState2[0],
    setFirstState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.rows),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rowsState = _React$useState4[0],
    setRowsState = _React$useState4[1];
  var _DataViewBase$setMeta = DataViewBase.setMetaData({
      props: props,
      state: {
        first: firstState,
        rows: rowsState
      }
    }),
    ptm = _DataViewBase$setMeta.ptm;
  var elementRef = React__namespace.useRef(null);
  var first = props.onPage ? props.first : firstState;
  var rows = props.onPage ? props.rows : rowsState;
  var getItemRenderKey = function getItemRenderKey(value) {
    return props.dataKey ? utils.ObjectUtils.resolveFieldData(value, props.dataKey) : null;
  };
  var getTotalRecords = function getTotalRecords() {
    return props.totalRecords ? props.totalRecords : props.value ? props.value.length : 0;
  };
  var createPaginator = function createPaginator(position) {
    var className = utils.classNames('p-paginator-' + position, props.paginatorClassName);
    var totalRecords = getTotalRecords();
    return /*#__PURE__*/React__namespace.createElement(paginator.Paginator, {
      first: first,
      rows: rows,
      pageLinkSize: props.pageLinkSize,
      className: className,
      onPageChange: onPageChange,
      template: props.paginatorTemplate,
      totalRecords: totalRecords,
      rowsPerPageOptions: props.rowsPerPageOptions,
      currentPageReportTemplate: props.currentPageReportTemplate,
      leftContent: props.paginatorLeft,
      rightContent: props.paginatorRight,
      alwaysShow: props.alwaysShowPaginator,
      dropdownAppendTo: props.paginatorDropdownAppendTo,
      ptm: ptm('paginator')
    });
  };
  var onPageChange = function onPageChange(event) {
    if (props.onPage) {
      props.onPage(event);
    } else {
      setFirstState(event.first);
      setRowsState(event.rows);
    }
  };
  var sort = function sort() {
    if (props.value) {
      var value = _toConsumableArray(props.value);
      value.sort(function (data1, data2) {
        var value1 = utils.ObjectUtils.resolveFieldData(data1, props.sortField);
        var value2 = utils.ObjectUtils.resolveFieldData(data2, props.sortField);
        return utils.ObjectUtils.sort(value1, value2, props.sortOrder, context && context.locale || PrimeReact__default["default"].locale, context && context.nullSortOrder || PrimeReact__default["default"].nullSortOrder);
      });
      return value;
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (props.loading) {
      var iconClassName = 'p-dataview-loading-icon';
      var loadingIconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
        spin: true
      }));
      var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      var loadingOverlayProps = utils.mergeProps({
        className: 'p-dataview-loading-overlay p-component-overlay'
      }, ptm('loadingOverlay'));
      return /*#__PURE__*/React__namespace.createElement("div", loadingOverlayProps, loadingIcon);
    }
    return null;
  };
  var createTopPaginator = function createTopPaginator() {
    if (props.paginator && (props.paginatorPosition !== 'bottom' || props.paginatorPosition === 'both')) {
      return createPaginator('top');
    }
    return null;
  };
  var createBottomPaginator = function createBottomPaginator() {
    if (props.paginator && (props.paginatorPosition !== 'top' || props.paginatorPosition === 'both')) {
      return createPaginator('bottom');
    }
    return null;
  };
  var createEmptyMessage = function createEmptyMessage() {
    if (!props.loading) {
      var _content = props.emptyMessage || PrimeReact.localeOption('emptyMessage');
      var emptyMessageProps = utils.mergeProps({
        className: 'p-col-12 col-12 p-dataview-emptymessage'
      }, ptm('emptyMessage'));
      return /*#__PURE__*/React__namespace.createElement("div", emptyMessageProps, _content);
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var headerProps = utils.mergeProps({
        className: 'p-dataview-header'
      }, ptm('header'));
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var footerProps = utils.mergeProps({
        className: 'p-dataview-footer'
      }, ptm('footer'));
      return /*#__PURE__*/React__namespace.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createItems = function createItems(value) {
    if (utils.ObjectUtils.isNotEmpty(value)) {
      if (props.paginator) {
        var currentFirst = props.lazy ? 0 : first;
        var totalRecords = getTotalRecords();
        var last = Math.min(rows + currentFirst, totalRecords);
        var items = [];
        for (var i = currentFirst; i < last; i++) {
          var val = value[i];
          val && items.push( /*#__PURE__*/React__namespace.createElement(DataViewItem, {
            key: getItemRenderKey(value) || i,
            template: props.itemTemplate,
            layout: props.layout,
            item: val
          }));
        }
        return items;
      }
      return value.map(function (item, index) {
        return /*#__PURE__*/React__namespace.createElement(DataViewItem, {
          key: getItemRenderKey(item) || index,
          template: props.itemTemplate,
          layout: props.layout,
          item: item
        });
      });
    }
    return createEmptyMessage();
  };
  var createContent = function createContent(value) {
    var items = createItems(value);
    var gridClassName = utils.classNames('p-grid grid', {
      'p-nogutter grid-nogutter': !props.gutter
    });
    var gridProps = utils.mergeProps({
      className: gridClassName
    }, ptm('grid'));
    var contentProps = utils.mergeProps({
      className: 'p-dataview-content'
    }, ptm('content'));
    return /*#__PURE__*/React__namespace.createElement("div", contentProps, /*#__PURE__*/React__namespace.createElement("div", gridProps, items));
  };
  var processData = function processData() {
    var data = props.value;
    if (utils.ObjectUtils.isNotEmpty(data) && props.sortField) {
      data = sort();
    }
    return data;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var data = processData();
  var className = utils.classNames('p-dataview p-component', _defineProperty(_defineProperty({}, "p-dataview-".concat(props.layout), !!props.layout), 'p-dataview-loading', props.loading), props.className);
  var loader = createLoader();
  var topPaginator = createTopPaginator();
  var bottomPaginator = createBottomPaginator();
  var header = createHeader();
  var footer = createFooter();
  var content = createContent(data);
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className
  }, DataViewBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, loader, header, topPaginator, content, bottomPaginator, footer);
}));
DataViewLayoutOptions.displayName = 'DataViewLayoutOptions';
DataViewItem.displayName = 'DataViewItem';
DataView.displayName = 'DataView';

exports.DataView = DataView;
exports.DataViewItem = DataViewItem;
exports.DataViewLayoutOptions = DataViewLayoutOptions;
