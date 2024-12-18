import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { Button } from 'primereact/button';
import { useOverlayListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { SpinnerIcon } from 'primereact/icons/spinner';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { InputText } from 'primereact/inputtext';
import { OverlayService } from 'primereact/overlayservice';
import { Tooltip } from 'primereact/tooltip';
import { classNames, mergeProps, ObjectUtils, UniqueComponentId, DomHandler, ZIndexUtils, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { VirtualScroller } from 'primereact/virtualscroller';

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

var AutoCompleteBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AutoComplete',
    id: null,
    appendTo: null,
    autoFocus: false,
    autoHighlight: false,
    className: null,
    completeMethod: null,
    delay: 300,
    disabled: false,
    dropdown: false,
    dropdownAriaLabel: null,
    dropdownAutoFocus: true,
    dropdownIcon: null,
    dropdownMode: 'blank',
    emptyMessage: null,
    field: null,
    forceSelection: false,
    inputClassName: null,
    inputId: null,
    inputRef: null,
    inputStyle: null,
    itemTemplate: null,
    loadingIcon: null,
    maxLength: null,
    minLength: 1,
    multiple: false,
    name: null,
    onBlur: null,
    onChange: null,
    onClear: null,
    onClick: null,
    onContextMenu: null,
    onDblClick: null,
    onDropdownClick: null,
    onFocus: null,
    onHide: null,
    onKeyPress: null,
    onKeyUp: null,
    onMouseDown: null,
    onSelect: null,
    onShow: null,
    onUnselect: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelStyle: null,
    placeholder: null,
    readOnly: false,
    removeTokenIcon: null,
    scrollHeight: '200px',
    selectedItemTemplate: null,
    selectionLimit: null,
    showEmptyMessage: false,
    size: null,
    style: null,
    suggestions: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    type: 'text',
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AutoCompletePanel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var context = React.useContext(PrimeReactContext);
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        selected: props.selectedItem.current === item
      }
    });
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var createFooter = function createFooter() {
    if (props.panelFooterTemplate) {
      var content = ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
      var footerProps = mergeProps({
        className: 'p-autocomplete-footer'
      }, props.ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, content);
    }
    return null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, i, style) {
    var groupChildren = props.getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (item, j) {
      var key = i + '_' + j;
      var selected = props.selectedItem === item;
      var content = props.itemTemplate ? ObjectUtils.getJSXElement(props.itemTemplate, item, j) : props.field ? ObjectUtils.resolveFieldData(item, props.field) : item;
      var className = classNames('p-autocomplete-item', {
        'p-disabled': item.disabled
      });
      var itemProps = mergeProps({
        role: 'option',
        'aria-selected': selected,
        className: className,
        style: style,
        onClick: function onClick(e) {
          return props.onItemClick(e, item);
        },
        'data-group': i,
        'data-index': j
      }, getPTOptions(item, 'item'));
      return /*#__PURE__*/React.createElement("li", _extends({
        key: key
      }, itemProps), content, /*#__PURE__*/React.createElement(Ripple, null));
    });
  };
  var createItem = function createItem(suggestion, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    if (props.optionGroupLabel) {
      var content = props.optionGroupTemplate ? ObjectUtils.getJSXElement(props.optionGroupTemplate, suggestion, index) : props.getOptionGroupLabel(suggestion);
      var childrenContent = createGroupChildren(suggestion, index, style);
      var key = index + '_' + getOptionGroupRenderKey(suggestion);
      var itemGroupProps = mergeProps({
        className: 'p-autocomplete-item-group',
        style: style
      }, props.ptm('itemGroup'));
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement("li", itemGroupProps, content), childrenContent);
    } else {
      var _content = props.itemTemplate ? ObjectUtils.getJSXElement(props.itemTemplate, suggestion, index) : props.field ? ObjectUtils.resolveFieldData(suggestion, props.field) : suggestion;
      var className = classNames('p-autocomplete-item', {
        'p-disabled': suggestion.disabled
      });
      var itemProps = mergeProps({
        role: 'option',
        'aria-selected': props.selectedItem === suggestion,
        className: className,
        style: style,
        onClick: function onClick(e) {
          return props.onItemClick(e, suggestion);
        }
      }, getPTOptions(suggestion, 'item'));
      return /*#__PURE__*/React.createElement("li", _extends({
        key: index
      }, itemProps), _content, /*#__PURE__*/React.createElement(Ripple, null));
    }
  };
  var createItems = function createItems() {
    return props.suggestions ? props.suggestions.map(createItem) : null;
  };
  var createContent = function createContent() {
    if (props.showEmptyMessage && ObjectUtils.isEmpty(props.suggestions)) {
      var emptyMessage = props.emptyMessage || localeOption('emptyMessage');
      var emptyMessageProps = mergeProps({
        className: 'p-autocomplete-item'
      }, props.ptm('emptyMesage'));
      var listProps = mergeProps({
        className: 'p-autocomplete-items'
      }, props.ptm('list'));
      return /*#__PURE__*/React.createElement("ul", listProps, /*#__PURE__*/React.createElement("li", emptyMessageProps, emptyMessage));
    }
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
        style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
          height: props.scrollHeight
        }),
        autoSize: true,
        items: props.suggestions,
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var className = classNames('p-autocomplete-items', options.className);
          var listProps = mergeProps({
            id: props.listId,
            ref: options.contentRef,
            style: options.style,
            className: className,
            role: 'listbox'
          }, props.ptm('list'));
          return /*#__PURE__*/React.createElement("ul", listProps, options.children);
        }
      });
      return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
        ref: props.virtualScrollerRef
      }, virtualScrollerProps, {
        pt: props.ptm('virtualScroller')
      }));
    } else {
      var items = createItems();
      var _listProps = mergeProps({
        id: props.listId,
        className: 'p-autocomplete-items',
        role: 'listbox'
      }, props.ptm('list'));
      var listWrapperProps = mergeProps({
        className: 'p-autocomplete-items-wrapper',
        style: {
          maxHeight: props.scrollHeight || 'auto'
        }
      }, props.ptm('listWrapper'));
      return /*#__PURE__*/React.createElement("div", listWrapperProps, /*#__PURE__*/React.createElement("ul", _listProps, items));
    }
  };
  var createElement = function createElement() {
    var className = classNames('p-autocomplete-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var style = _objectSpread$1({}, props.panelStyle || {});
    var content = createContent();
    var footer = createFooter();
    var panelProps = mergeProps({
      ref: ref,
      className: className,
      style: style,
      onClick: function onClick(e) {
        return props.onClick(e);
      }
    }, props.ptm('panel'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: ref,
      classNames: "p-connected-overlay",
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: props.onEnter,
      onEntering: props.onEntering,
      onEntered: props.onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, /*#__PURE__*/React.createElement("div", panelProps, content, footer));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
AutoCompletePanel.displayName = 'AutoCompletePanel';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AutoComplete = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = AutoCompleteBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    searchingState = _React$useState4[0],
    setSearchingState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedState = _React$useState6[0],
    setFocusedState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    overlayVisibleState = _React$useState8[0],
    setOverlayVisibleState = _React$useState8[1];
  var _AutoCompleteBase$set = AutoCompleteBase.setMetaData({
      props: props,
      state: {
        id: idState,
        searching: searchingState,
        focused: focusedState,
        overlayVisible: overlayVisibleState
      }
    }),
    ptm = _AutoCompleteBase$set.ptm;
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var multiContainerRef = React.useRef(null);
  var virtualScrollerRef = React.useRef(null);
  var timeout = React.useRef(null);
  var selectedItem = React.useRef(null);
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? !isInputClicked(event) && hide() : hide();
        }
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var isInputClicked = function isInputClicked(event) {
    return props.multiple ? event.target === multiContainerRef.current || multiContainerRef.current.contains(event.target) : event.target === inputRef.current;
  };
  var onInputChange = function onInputChange(event) {
    //Cancel the search request if user types within the timeout
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    var query = event.target.value;
    if (!props.multiple) {
      updateModel(event, query);
    }
    if (ObjectUtils.isEmpty(query)) {
      hide();
      props.onClear && props.onClear(event);
    } else {
      if (query.length >= props.minLength) {
        timeout.current = setTimeout(function () {
          search(event, query, 'input');
        }, props.delay);
      } else {
        hide();
      }
    }
  };
  var search = function search(event, query, source) {
    //allow empty string but not undefined or null
    if (query === undefined || query === null) {
      return;
    }

    //do not search blank values on input change
    if (source === 'input' && query.trim().length === 0) {
      return;
    }
    if (props.completeMethod) {
      setSearchingState(true);
      props.completeMethod({
        originalEvent: event,
        query: query
      });
    }
  };
  var selectItem = function selectItem(event, option, preventInputFocus) {
    if (props.multiple) {
      inputRef.current.value = '';
      if (!isSelected(option)) {
        // allows empty value/selectionlimit and within sectionlimit
        if (!props.value || !props.selectionLimit || props.value.length < props.selectionLimit) {
          var newValue = props.value ? [].concat(_toConsumableArray(props.value), [option]) : [option];
          updateModel(event, newValue);
        }
      }
    } else {
      updateInputField(option);
      updateModel(event, option);
    }
    if (props.onSelect) {
      props.onSelect({
        originalEvent: event,
        value: option
      });
    }
    if (!preventInputFocus) {
      DomHandler.focus(inputRef.current);
      hide();
    }
  };
  var updateModel = function updateModel(event, value) {
    // #2176 only call change if value actually changed
    if (selectedItem && ObjectUtils.deepEquals(selectedItem.current, value)) {
      return;
    }
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: idState,
          value: value
        }
      });
    }
    selectedItem.current = value;
  };
  var formatValue = function formatValue(value) {
    if (value) {
      if (typeof value === 'string') {
        return value;
      } else if (props.selectedItemTemplate) {
        var resolvedFieldData = ObjectUtils.getJSXElement(props.selectedItemTemplate, value);
        return resolvedFieldData ? resolvedFieldData : value;
      } else if (props.field) {
        var _resolvedFieldData = ObjectUtils.resolveFieldData(value, props.field);
        return _resolvedFieldData !== null && _resolvedFieldData !== undefined ? _resolvedFieldData : value;
      } else {
        return value;
      }
    }
    return '';
  };
  var updateInputField = function updateInputField(value) {
    inputRef.current.value = formatValue(value);
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
    setSearchingState(false);
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
    alignOverlay();
  };
  var onOverlayEntering = function onOverlayEntering() {
    if (props.autoHighlight && props.suggestions && props.suggestions.length) {
      var element = getScrollableElement().firstChild.firstChild;
      DomHandler.addClass(element, 'p-highlight');
    }
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    var target = props.multiple ? multiContainerRef.current : inputRef.current;
    DomHandler.alignOverlay(overlayRef.current, target, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
  };
  var onPanelClick = function onPanelClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var onDropdownClick = function onDropdownClick(event) {
    if (props.dropdownAutoFocus) {
      DomHandler.focus(inputRef.current, props.dropdownAutoFocus);
    }
    if (props.dropdownMode === 'blank') search(event, '', 'dropdown');else if (props.dropdownMode === 'current') search(event, inputRef.current.value, 'dropdown');
    if (props.onDropdownClick) {
      props.onDropdownClick({
        originalEvent: event,
        query: inputRef.current.value
      });
    }
  };
  var removeItem = function removeItem(event, index) {
    var removedValue = props.value[index];
    var newValue = props.value.filter(function (_, i) {
      return index !== i;
    });
    updateModel(event, newValue);
    if (props.onUnselect) {
      props.onUnselect({
        originalEvent: event,
        value: removedValue
      });
    }
  };
  var onInputKeyDown = function onInputKeyDown(event) {
    if (overlayVisibleState) {
      var highlightItem = DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
      switch (event.which) {
        //down
        case 40:
          if (highlightItem) {
            var nextElement = findNextItem(highlightItem);
            if (nextElement) {
              DomHandler.addClass(nextElement, 'p-highlight');
              DomHandler.removeClass(highlightItem, 'p-highlight');
              DomHandler.scrollInView(getScrollableElement(), nextElement);
            }
          } else {
            highlightItem = DomHandler.findSingle(overlayRef.current, 'li');
            if (DomHandler.hasClass(highlightItem, 'p-autocomplete-item-group')) {
              highlightItem = findNextItem(highlightItem);
            }
            if (highlightItem) {
              DomHandler.addClass(highlightItem, 'p-highlight');
            }
          }
          event.preventDefault();
          break;

        //up
        case 38:
          if (highlightItem) {
            var previousElement = findPrevItem(highlightItem);
            if (previousElement) {
              DomHandler.addClass(previousElement, 'p-highlight');
              DomHandler.removeClass(highlightItem, 'p-highlight');
              DomHandler.scrollInView(getScrollableElement(), previousElement);
            }
          }
          event.preventDefault();
          break;

        //enter
        case 13:
          if (highlightItem) {
            selectHighlightItem(event, highlightItem);
            hide();
            event.preventDefault();
          }
          break;

        //escape
        case 27:
          hide();
          event.preventDefault();
          break;

        //tab
        case 9:
          if (highlightItem) {
            selectHighlightItem(event, highlightItem);
          }
          hide();
          break;
      }
    }
    if (props.multiple) {
      switch (event.which) {
        //backspace
        case 8:
          if (props.value && props.value.length && !inputRef.current.value) {
            var removedValue = props.value[props.value.length - 1];
            var newValue = props.value.slice(0, -1);
            updateModel(event, newValue);
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                value: removedValue
              });
            }
          }
          break;
      }
    }
  };
  var selectHighlightItem = function selectHighlightItem(event, item) {
    if (props.optionGroupLabel) {
      var optionGroup = props.suggestions[item.dataset.group];
      selectItem(event, getOptionGroupChildren(optionGroup)[item.dataset.index]);
    } else {
      selectItem(event, props.suggestions[DomHandler.index(item)]);
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-autocomplete-item-group') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-autocomplete-item-group') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onInputFocus = function onInputFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var forceItemSelection = function forceItemSelection(event) {
    if (props.multiple) {
      inputRef.current.value = '';
      return;
    }
    var inputValue = event.target.value.trim();
    var item = (props.suggestions || []).find(function (it) {
      var value = props.field ? ObjectUtils.resolveFieldData(it, props.field) : it;
      return value && inputValue === value.trim();
    });
    if (item) {
      selectItem(event, item, true);
    } else {
      inputRef.current.value = '';
      updateModel(event, null);
      props.onClear && props.onClear(event);
    }
  };
  var onInputBlur = function onInputBlur(event) {
    setFocusedState(false);
    if (props.forceSelection) {
      forceItemSelection(event);
    }
    props.onBlur && props.onBlur(event);
  };
  var onMultiContainerClick = function onMultiContainerClick(event) {
    DomHandler.focus(inputRef.current);
    props.onClick && props.onClick(event);
  };
  var onMultiInputFocus = function onMultiInputFocus(event) {
    onInputFocus(event);
    DomHandler.addClass(multiContainerRef.current, 'p-focus');
  };
  var onMultiInputBlur = function onMultiInputBlur(event) {
    onInputBlur(event);
    DomHandler.removeClass(multiContainerRef.current, 'p-focus');
  };
  var isSelected = function isSelected(val) {
    return props.value ? props.value.some(function (v) {
      return ObjectUtils.equals(v, val);
    }) : false;
  };
  var getScrollableElement = function getScrollableElement() {
    return virtualScrollerRef.current ? overlayRef.current.firstChild : overlayRef.current;
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return props.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel) : optionGroup;
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  useUpdateEffect(function () {
    if (searchingState) {
      ObjectUtils.isNotEmpty(props.suggestions) || props.showEmptyMessage ? show() : hide();
      setSearchingState(false);
    }
  }, [props.suggestions]);
  useUpdateEffect(function () {
    if (inputRef.current && !props.multiple) {
      updateInputField(props.value);
    }
    if (overlayVisibleState) {
      alignOverlay();
    }
  });
  useUnmountEffect(function () {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    ZIndexUtils.clear(overlayRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      search: search,
      show: show,
      hide: hide,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      },
      getVirtualScroller: function getVirtualScroller() {
        return virtualScrollerRef.current;
      }
    };
  });
  var createSimpleAutoComplete = function createSimpleAutoComplete() {
    var value = formatValue(props.value);
    var ariaControls = overlayVisibleState ? idState + '_list' : null;
    var className = classNames('p-autocomplete-input', props.inputClassName, {
      'p-autocomplete-dd-input': props.dropdown
    });
    return /*#__PURE__*/React.createElement(InputText, _extends({
      ref: inputRef,
      id: props.inputId,
      type: props.type,
      name: props.name,
      defaultValue: value,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": ariaControls,
      "aria-haspopup": "listbox",
      "aria-expanded": overlayVisibleState,
      className: className,
      style: props.inputStyle,
      autoComplete: "off",
      readOnly: props.readOnly,
      disabled: props.disabled,
      placeholder: props.placeholder,
      size: props.size,
      maxLength: props.maxLength,
      tabIndex: props.tabIndex,
      onBlur: onInputBlur,
      onFocus: onInputFocus,
      onChange: onInputChange,
      onMouseDown: props.onMouseDown,
      onKeyUp: props.onKeyUp,
      onKeyDown: onInputKeyDown,
      onKeyPress: props.onKeyPress,
      onContextMenu: props.onContextMenu,
      onClick: props.onClick,
      onDoubleClick: props.onDblClick,
      pt: ptm('input')
    }, ariaProps));
  };
  var createChips = function createChips() {
    if (ObjectUtils.isNotEmpty(props.value)) {
      return props.value.map(function (val, index) {
        var key = index + 'multi-item';
        var removeTokenIconProps = mergeProps({
          className: 'p-autocomplete-token-icon',
          onClick: function onClick(e) {
            return removeItem(e, index);
          }
        }, ptm('removeTokenIcon'));
        var icon = props.removeTokenIcon || /*#__PURE__*/React.createElement(TimesCircleIcon, removeTokenIconProps);
        var removeTokenIcon = !props.disabled && IconUtils.getJSXIcon(icon, _objectSpread({}, removeTokenIconProps), {
          props: props
        });
        var tokenProps = mergeProps({
          className: 'p-autocomplete-token p-highlight'
        }, ptm('token'));
        var tokenLabelProps = mergeProps({
          className: 'p-autocomplete-token-label'
        }, ptm('tokenLabel'));
        return /*#__PURE__*/React.createElement("li", _extends({
          key: key
        }, tokenProps), /*#__PURE__*/React.createElement("span", tokenLabelProps, formatValue(val)), removeTokenIcon);
      });
    }
    return null;
  };
  var createMultiInput = function createMultiInput() {
    var ariaControls = overlayVisibleState ? idState + '_list' : null;
    var inputTokenProps = mergeProps({
      className: 'p-autocomplete-input-token'
    }, ptm('inputToken'));
    var inputProps = mergeProps(_objectSpread({
      id: props.inputId,
      ref: inputRef,
      type: props.type,
      disabled: props.disabled,
      placeholder: props.placeholder,
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-controls': ariaControls,
      'aria-haspopup': 'listbox',
      'aria-expanded': overlayVisibleState,
      autoComplete: 'off',
      readOnly: props.readOnly,
      tabIndex: props.tabIndex,
      onChange: onInputChange,
      name: props.name,
      style: props.inputStyle,
      className: props.inputClassName,
      maxLength: props.maxLength,
      onKeyUp: props.onKeyUp,
      onKeyDown: onInputKeyDown,
      onKeyPress: props.onKeyPress,
      onFocus: onMultiInputFocus,
      onBlur: onMultiInputBlur
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React.createElement("li", inputTokenProps, /*#__PURE__*/React.createElement("input", inputProps));
  };
  var createMultipleAutoComplete = function createMultipleAutoComplete() {
    var className = classNames('p-autocomplete-multiple-container p-component p-inputtext', {
      'p-disabled': props.disabled
    });
    var tokens = createChips();
    var input = createMultiInput();
    var containerProps = mergeProps({
      ref: multiContainerRef,
      className: className,
      onClick: onMultiContainerClick,
      onContextMenu: props.onContextMenu,
      onMouseDown: props.onMouseDown,
      onDoubleClick: props.onDblClick
    }, ptm('container'));
    return /*#__PURE__*/React.createElement("ul", containerProps, tokens, input);
  };
  var createDropdown = function createDropdown() {
    if (props.dropdown) {
      var ariaLabel = props.dropdownAriaLabel || props.placeholder || localeOption('choose');
      return /*#__PURE__*/React.createElement(Button, {
        type: "button",
        icon: props.dropdownIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, null),
        className: "p-autocomplete-dropdown",
        disabled: props.disabled,
        onClick: onDropdownClick,
        "aria-label": ariaLabel,
        pt: ptm('dropdownButton')
      });
    }
    return null;
  };
  var createLoader = function createLoader() {
    if (searchingState) {
      var iconClassName = 'p-autocomplete-loader p-icon-spin';
      var loadingIconProps = mergeProps({
        className: iconClassName
      }, ptm('loadingIcon'));
      var icon = props.loadingIcon || /*#__PURE__*/React.createElement(SpinnerIcon, loadingIconProps);
      var loaderIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
        props: props
      });
      return loaderIcon;
    }
    return null;
  };
  var createInput = function createInput() {
    return props.multiple ? createMultipleAutoComplete() : createSimpleAutoComplete();
  };
  var listId = idState + '_list';
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = AutoCompleteBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-autocomplete p-component p-inputwrapper', {
    'p-autocomplete-dd': props.dropdown,
    'p-autocomplete-multiple': props.multiple,
    'p-inputwrapper-filled': props.value,
    'p-inputwrapper-focus': focusedState
  }, props.className);
  var loader = createLoader();
  var input = createInput();
  var dropdown = createDropdown();
  var rootProps = mergeProps({
    id: idState,
    ref: elementRef,
    style: props.style,
    className: className
  }, otherProps, ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", rootProps, input, loader, dropdown, /*#__PURE__*/React.createElement(AutoCompletePanel, _extends({
    ref: overlayRef,
    virtualScrollerRef: virtualScrollerRef
  }, props, {
    listId: listId,
    onItemClick: selectItem,
    selectedItem: selectedItem,
    onClick: onPanelClick,
    getOptionGroupLabel: getOptionGroupLabel,
    getOptionGroupChildren: getOptionGroupChildren,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntering: onOverlayEntering,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    ptm: ptm
  }))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
AutoComplete.displayName = 'AutoComplete';

export { AutoComplete };
