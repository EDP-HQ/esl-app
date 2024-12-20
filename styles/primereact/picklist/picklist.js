this.primereact = this.primereact || {};
this.primereact.picklist = (function (exports, React, PrimeReact, hooks, utils, componentbase, button, angledoubledown, angledoubleup, angledown, angleup, search, ripple, angledoubleleft, angledoubleright, angleleft, angleright) {
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

  var PickListBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'PickList',
      id: null,
      source: null,
      target: null,
      sourceHeader: null,
      targetHeader: null,
      style: null,
      className: null,
      sourceStyle: null,
      targetStyle: null,
      sourceSelection: null,
      targetSelection: null,
      showSourceControls: true,
      showTargetControls: true,
      metaKeySelection: true,
      filter: false,
      filterBy: null,
      filterMatchMode: 'contains',
      targetFilterIcon: null,
      sourceFilterIcon: null,
      moveAllToSourceIcon: null,
      moveToSourceIcon: null,
      moveAllToTargetIcon: null,
      moveToTargetIcon: null,
      moveBottomIcon: null,
      moveUpIcon: null,
      moveTopIcon: null,
      moveDownIcon: null,
      filterLocale: undefined,
      sourceFilterValue: null,
      targetFilterValue: null,
      showSourceFilter: true,
      showTargetFilter: true,
      sourceFilterPlaceholder: null,
      targetFilterPlaceholder: null,
      sourceFilterTemplate: null,
      targetFilterTemplate: null,
      tabIndex: 0,
      dataKey: null,
      breakpoint: '960px',
      itemTemplate: null,
      sourceItemTemplate: null,
      targetItemTemplate: null,
      onChange: null,
      onMoveToSource: null,
      onMoveAllToSource: null,
      onMoveToTarget: null,
      onMoveAllToTarget: null,
      onSourceSelectionChange: null,
      onTargetSelectionChange: null,
      onSourceFilterChange: null,
      onTargetFilterChange: null,
      children: undefined
    }
  });

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var PickListControls = /*#__PURE__*/React__namespace.memo(function (props) {
    var moveUpIcon = props.moveUpIcon || /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, null);
    var moveTopIcon = props.moveTopIcon || /*#__PURE__*/React__namespace.createElement(angledoubleup.AngleDoubleUpIcon, null);
    var moveDownIcon = props.moveDownIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, null);
    var moveBottomIcon = props.moveBottomIcon || /*#__PURE__*/React__namespace.createElement(angledoubledown.AngleDoubleDownIcon, null);
    var moveDisabled = !props.selection || !props.selection.length;
    var moveUp = function moveUp(event) {
      var selectedItems = props.selection;
      if (selectedItems && selectedItems.length) {
        var list = _toConsumableArray(props.list);
        for (var i = 0; i < selectedItems.length; i++) {
          var selectedItem = selectedItems[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
          if (selectedItemIndex !== 0) {
            var movedItem = list[selectedItemIndex];
            var temp = list[selectedItemIndex - 1];
            list[selectedItemIndex - 1] = movedItem;
            list[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        if (props.onReorder) {
          props.onReorder({
            originalEvent: event,
            value: list,
            direction: 'up'
          });
        }
      }
    };
    var moveTop = function moveTop(event) {
      var selectedItems = props.selection;
      if (selectedItems && selectedItems.length) {
        var list = _toConsumableArray(props.list);
        for (var i = 0; i < selectedItems.length; i++) {
          var selectedItem = selectedItems[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
          if (selectedItemIndex !== 0) {
            var movedItem = list.splice(selectedItemIndex, 1)[0];
            list.unshift(movedItem);
          } else {
            break;
          }
        }
        if (props.onReorder) {
          props.onReorder({
            originalEvent: event,
            value: list,
            direction: 'top'
          });
        }
      }
    };
    var moveDown = function moveDown(event) {
      var selectedItems = props.selection;
      if (selectedItems && selectedItems.length) {
        var list = _toConsumableArray(props.list);
        for (var i = selectedItems.length - 1; i >= 0; i--) {
          var selectedItem = selectedItems[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
          if (selectedItemIndex !== list.length - 1) {
            var movedItem = list[selectedItemIndex];
            var temp = list[selectedItemIndex + 1];
            list[selectedItemIndex + 1] = movedItem;
            list[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        if (props.onReorder) {
          props.onReorder({
            originalEvent: event,
            value: list,
            direction: 'down'
          });
        }
      }
    };
    var moveBottom = function moveBottom(event) {
      var selectedItems = props.selection;
      if (selectedItems && selectedItems.length) {
        var list = _toConsumableArray(props.list);
        for (var i = selectedItems.length - 1; i >= 0; i--) {
          var selectedItem = selectedItems[i];
          var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);
          if (selectedItemIndex !== list.length - 1) {
            var movedItem = list.splice(selectedItemIndex, 1)[0];
            list.push(movedItem);
          } else {
            break;
          }
        }
        if (props.onReorder) {
          props.onReorder({
            originalEvent: event,
            value: list,
            direction: 'bottom'
          });
        }
      }
    };
    var className = utils.classNames('p-picklist-buttons', props.className);
    var controlsProps = utils.mergeProps({
      className: className
    }, props.ptm('controls'));
    return /*#__PURE__*/React__namespace.createElement("div", controlsProps, /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveDisabled,
      type: "button",
      icon: moveUpIcon,
      onClick: moveUp,
      pt: props.ptm('moveUpButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveDisabled,
      type: "button",
      icon: moveTopIcon,
      onClick: moveTop,
      pt: props.ptm('moveTopButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveDisabled,
      type: "button",
      icon: moveDownIcon,
      onClick: moveDown,
      pt: props.ptm('moveDownButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveDisabled,
      type: "button",
      icon: moveBottomIcon,
      onClick: moveBottom,
      pt: props.ptm('moveBottomButton')
    }));
  });
  PickListControls.displayName = 'PickListControls';

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

  var PickListItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var getPTOptions = function getPTOptions(key) {
      return props.ptm(key, {
        context: {
          selected: props.selected
        }
      });
    };
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          value: props.value
        });
      }
    };
    var onKeyDown = function onKeyDown(event) {
      if (props.onKeyDown) {
        props.onKeyDown({
          originalEvent: event,
          value: props.value
        });
      }
    };
    var content = props.template ? props.template(props.value) : props.value;
    var className = utils.classNames('p-picklist-item', {
      'p-highlight': props.selected
    }, props.className);
    var itemProps = utils.mergeProps({
      className: className,
      onClick: onClick,
      onKeyDown: onKeyDown,
      tabIndex: props.tabIndex,
      role: 'option',
      'aria-selected': props.selected
    }, getPTOptions('item'));
    return /*#__PURE__*/React__namespace.createElement("li", itemProps, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  PickListItem.displayName = 'PickListItem';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var PickListSubList = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var listElementRef = React__namespace.useRef(null);
    var onItemClick = function onItemClick(event) {
      var originalEvent = event.originalEvent;
      var item = event.value;
      var selection = _toConsumableArray(props.selection);
      var index = utils.ObjectUtils.findIndexInList(item, selection, props.dataKey);
      var selected = index !== -1;
      var metaSelection = props.metaKeySelection;
      if (metaSelection) {
        var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
        if (selected && metaKey) {
          selection.splice(index, 1);
        } else {
          if (!metaKey) {
            selection.length = 0;
          }
          selection.push(item);
        }
      } else {
        if (selected) selection.splice(index, 1);else selection.push(item);
      }
      if (props.onSelectionChange) {
        props.onSelectionChange({
          event: originalEvent,
          value: selection
        });
      }
    };
    var onItemKeyDown = function onItemKeyDown(event) {
      var originalEvent = event.originalEvent;
      var listItem = originalEvent.currentTarget;
      switch (originalEvent.which) {
        //down
        case 40:
          var nextItem = findNextItem(listItem);
          nextItem && nextItem.focus();
          originalEvent.preventDefault();
          break;

        //up
        case 38:
          var prevItem = findPrevItem(listItem);
          prevItem && prevItem.focus();
          originalEvent.preventDefault();
          break;

        //enter
        case 13:
          onItemClick(event);
          originalEvent.preventDefault();
          break;
      }
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? !utils.DomHandler.hasClass(nextItem, 'p-picklist-item') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? !utils.DomHandler.hasClass(prevItem, 'p-picklist-item') ? findPrevItem(prevItem) : prevItem : null;
    };
    var isSelected = function isSelected(item) {
      return utils.ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
    };
    var onFilter = function onFilter(event) {
      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          value: event.target.value,
          type: props.type
        });
      }
    };
    var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
      //enter
      if (event.which === 13) {
        event.preventDefault();
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        listElementRef: listElementRef
      };
    });
    var createHeader = function createHeader() {
      var headerProps = utils.mergeProps({
        className: 'p-picklist-header'
      }, props.ptm('header'));
      if (props.header) {
        return /*#__PURE__*/React__namespace.createElement("div", headerProps, utils.ObjectUtils.getJSXElement(props.header, props));
      }
      return null;
    };
    var createItems = function createItems() {
      if (props.list) {
        return props.list.map(function (item) {
          var key = JSON.stringify(item);
          var selected = isSelected(item);
          return /*#__PURE__*/React__namespace.createElement(PickListItem, {
            key: key,
            value: item,
            template: props.itemTemplate,
            selected: selected,
            onClick: onItemClick,
            onKeyDown: onItemKeyDown,
            tabIndex: props.tabIndex,
            ptm: props.ptm
          });
        });
      }
      return null;
    };
    var createFilter = function createFilter() {
      var iconClassName = 'p-picklist-filter-icon';
      var filterIconProps = utils.mergeProps({
        className: iconClassName
      }, props.ptm('filterIcon'));
      var icon = props.type === 'source' ? props.sourceFilterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps) : props.targetFilterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps);
      var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, filterIconProps), {
        props: props
      });
      if (props.showFilter) {
        var filterProps = utils.mergeProps({
          className: 'p-picklist-filter'
        }, props.ptm('filter'));
        var filterInputProps = utils.mergeProps({
          type: 'text',
          value: props.filterValue,
          onChange: onFilter,
          onKeyDown: onFilterInputKeyDown,
          placeholder: props.placeholder,
          className: 'p-picklist-filter-input p-inputtext p-component'
        }, props.ptm('filterInput'));
        var content = /*#__PURE__*/React__namespace.createElement("div", filterProps, /*#__PURE__*/React__namespace.createElement("input", filterInputProps), /*#__PURE__*/React__namespace.createElement("span", null, " ", filterIcon, " "));
        if (props.filterTemplate) {
          var defaultContentOptions = {
            className: 'p-picklist-filter',
            inputProps: {
              className: 'p-picklist-filter-input p-inputtext p-component',
              onChange: onFilter,
              onKeyDown: onFilterInputKeyDown
            },
            iconClassName: iconClassName,
            element: content,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }
        var filterContainerProps = utils.mergeProps({
          className: 'p-picklist-filter-container'
        }, props.ptm('filterContainer'));
        return /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, content);
      }
      return null;
    };
    var createList = function createList() {
      var items = createItems();
      var className = utils.classNames('p-picklist-list', props.listClassName);
      var listProps = utils.mergeProps({
        className: className,
        role: 'listbox',
        'aria-multiselectable': true,
        style: props.style
      }, props.ptm('list'));
      return /*#__PURE__*/React__namespace.createElement("ul", listProps, items);
    };
    var className = utils.classNames('p-picklist-list-wrapper', props.className);
    var header = createHeader();
    var filter = createFilter();
    var list = createList();
    var listWrapperProps = utils.mergeProps({
      className: className,
      ref: listElementRef
    }, props.ptm('listWrapper'));
    return /*#__PURE__*/React__namespace.createElement("div", listWrapperProps, header, filter, list);
  }));
  PickListSubList.displayName = 'PickListSubList';

  var PickListTransferControls = /*#__PURE__*/React__namespace.memo(function (props) {
    var viewChanged = hooks.useMatchMedia("(max-width: ".concat(props.breakpoint, ")"), props.breakpoint);
    function getIconComponent(iconType) {
      switch (iconType) {
        case 'moveToTargetIcon':
          return props.moveToTargetIcon || viewChanged ? /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, null) : /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, null);
        case 'moveAllToTargetIcon':
          return props.moveAllToTargetIcon || viewChanged ? /*#__PURE__*/React__namespace.createElement(angledoubledown.AngleDoubleDownIcon, null) : /*#__PURE__*/React__namespace.createElement(angledoubleright.AngleDoubleRightIcon, null);
        case 'moveToSourceIcon':
          return props.moveToSourceIcon || viewChanged ? /*#__PURE__*/React__namespace.createElement(angleup.AngleUpIcon, null) : /*#__PURE__*/React__namespace.createElement(angleleft.AngleLeftIcon, null);
        case 'moveAllToSourceIcon':
          return props.moveAllToSourceIcon || viewChanged ? /*#__PURE__*/React__namespace.createElement(angledoubleup.AngleDoubleUpIcon, null) : /*#__PURE__*/React__namespace.createElement(angledoubleleft.AngleDoubleLeftIcon, null);
        default:
          return null;
      }
    }
    var moveToTargetIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveToTargetIcon'), undefined, {
      props: props,
      viewChanged: viewChanged
    });
    var moveAllToTargetIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveAllToTargetIcon'), undefined, {
      props: props,
      viewChanged: viewChanged
    });
    var moveToSourceIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveToSourceIcon'), undefined, {
      props: props,
      viewChanged: viewChanged
    });
    var moveAllToSourceIcon = utils.IconUtils.getJSXIcon(getIconComponent('moveAllToSourceIcon'), undefined, {
      props: props,
      viewChanged: viewChanged
    });
    var moveRightDisabled = utils.ObjectUtils.isEmpty(props.sourceSelection) || utils.ObjectUtils.isEmpty(props.visibleSourceList);
    var moveLeftDisabled = utils.ObjectUtils.isEmpty(props.targetSelection) || utils.ObjectUtils.isEmpty(props.visibleTargetList);
    var moveAllRightDisabled = utils.ObjectUtils.isEmpty(props.visibleSourceList);
    var moveAllLeftDisabled = utils.ObjectUtils.isEmpty(props.visibleTargetList);
    var moveRight = function moveRight(event) {
      var selection = props.sourceSelection;
      if (utils.ObjectUtils.isNotEmpty(selection)) {
        var targetList = _toConsumableArray(props.target);
        var sourceList = _toConsumableArray(props.source);
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (utils.ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey) === -1) {
            targetList.push(sourceList.splice(utils.ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey), 1)[0]);
          }
        }
        if (props.onTransfer) {
          props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'toTarget'
          });
        }
      }
    };
    var moveAllRight = function moveAllRight(event) {
      if (props.source) {
        var targetList = [].concat(_toConsumableArray(props.target), _toConsumableArray(props.visibleSourceList));
        var sourceList = props.source.filter(function (s) {
          return !props.visibleSourceList.some(function (vs) {
            return vs === s;
          });
        });
        if (props.onTransfer) {
          props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'allToTarget'
          });
        }
      }
    };
    var moveLeft = function moveLeft(event) {
      var selection = props.targetSelection;
      if (utils.ObjectUtils.isNotEmpty(selection)) {
        var targetList = _toConsumableArray(props.target);
        var sourceList = _toConsumableArray(props.source);
        for (var i = 0; i < selection.length; i++) {
          var selectedItem = selection[i];
          if (utils.ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey) === -1) {
            sourceList.push(targetList.splice(utils.ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey), 1)[0]);
          }
        }
        if (props.onTransfer) {
          props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'toSource'
          });
        }
      }
    };
    var moveAllLeft = function moveAllLeft(event) {
      if (props.source) {
        var sourceList = [].concat(_toConsumableArray(props.source), _toConsumableArray(props.visibleTargetList));
        var targetList = props.target.filter(function (t) {
          return !props.visibleTargetList.some(function (vt) {
            return vt === t;
          });
        });
        if (props.onTransfer) {
          props.onTransfer({
            originalEvent: event,
            source: sourceList,
            target: targetList,
            direction: 'allToSource'
          });
        }
      }
    };
    var className = utils.classNames('p-picklist-buttons p-picklist-transfer-buttons', props.className);
    var buttonsProps = utils.mergeProps({
      className: className
    }, props.ptm('buttons'));
    return /*#__PURE__*/React__namespace.createElement("div", buttonsProps, /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveRightDisabled,
      type: "button",
      icon: moveToTargetIcon,
      onClick: moveRight,
      pt: props.ptm('moveToTargetButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveAllRightDisabled,
      type: "button",
      icon: moveAllToTargetIcon,
      onClick: moveAllRight,
      pt: props.ptm('moveAllToTargetButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveLeftDisabled,
      type: "button",
      icon: moveToSourceIcon,
      onClick: moveLeft,
      pt: props.ptm('moveToSourceButton')
    }), /*#__PURE__*/React__namespace.createElement(button.Button, {
      disabled: moveAllLeftDisabled,
      type: "button",
      icon: moveAllToSourceIcon,
      onClick: moveAllLeft,
      pt: props.ptm('moveAllToSourceButton')
    }));
  });
  PickListTransferControls.displayName = 'PickListTransferControls';

  var PickList = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = PickListBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sourceSelectionState = _React$useState2[0],
      setSourceSelectionState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      targetSelectionState = _React$useState4[0],
      setTargetSelectionState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(''),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      sourceFilterValueState = _React$useState6[0],
      setSourceFilterValueState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(''),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      targetFilterValueState = _React$useState8[0],
      setTargetFilterValueState = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      attributeSelectorState = _React$useState10[0],
      setAttributeSelectorState = _React$useState10[1];
    var _PickListBase$setMeta = PickListBase.setMetaData({
        props: props,
        state: {
          sourceSelection: sourceSelectionState,
          targetSelection: targetSelectionState,
          sourceFilterValue: sourceFilterValueState,
          targetFilterValue: targetFilterValueState,
          attributeSelector: attributeSelectorState
        }
      }),
      ptm = _PickListBase$setMeta.ptm;
    var elementRef = React__namespace.useRef(null);
    var sourceListElementRef = React__namespace.useRef(null);
    var targetListElementRef = React__namespace.useRef(null);
    var reorderedListElementRef = React__namespace.useRef(null);
    var reorderDirection = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var sourceSelection = props.sourceSelection ? props.sourceSelection : sourceSelectionState;
    var targetSelection = props.targetSelection ? props.targetSelection : targetSelectionState;
    var sourceFilteredValue = props.onSourceFilterChange ? props.sourceFilterValue : sourceFilterValueState;
    var targetFilteredValue = props.onTargetFilterChange ? props.targetFilterValue : targetFilterValueState;
    var hasFilterBy = utils.ObjectUtils.isNotEmpty(props.filterBy);
    var showSourceFilter = hasFilterBy && props.showSourceFilter;
    var showTargetFilter = hasFilterBy && props.showTargetFilter;
    var onSourceReorder = function onSourceReorder(event) {
      handleChange(event, event.value, props.target);
      reorderedListElementRef.current = sourceListElementRef.current.listElementRef.current;
      reorderDirection.current = event.direction;
    };
    var onTargetReorder = function onTargetReorder(event) {
      handleChange(event, props.source, event.value);
      reorderedListElementRef.current = targetListElementRef.current.listElementRef.current;
      reorderDirection.current = event.direction;
    };
    var handleScrollPosition = function handleScrollPosition(listElement, direction) {
      if (listElement) {
        var list = utils.DomHandler.findSingle(listElement, '.p-picklist-list');
        switch (direction) {
          case 'up':
            scrollInView(list, -1);
            break;
          case 'top':
            list.scrollTop = 0;
            break;
          case 'down':
            scrollInView(list, 1);
            break;
          case 'bottom':
            /* TODO: improve this code block */
            setTimeout(function () {
              return list.scrollTop = list.scrollHeight;
            }, 100);
            break;
        }
      }
    };
    var handleChange = function handleChange(event, source, target) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event.originalEvent,
          source: source,
          target: target
        });
      }
    };
    var onTransfer = function onTransfer(event) {
      var originalEvent = event.originalEvent,
        source = event.source,
        target = event.target,
        direction = event.direction;
      var selectedValue = [];
      switch (direction) {
        case 'toTarget':
          selectedValue = sourceSelection;
          if (props.onMoveToTarget) {
            props.onMoveToTarget({
              originalEvent: originalEvent,
              value: selectedValue
            });
          }
          break;
        case 'allToTarget':
          selectedValue = props.source;
          if (props.onMoveAllToTarget) {
            props.onMoveAllToTarget({
              originalEvent: originalEvent,
              value: selectedValue
            });
          }
          selectedValue = [];
          break;
        case 'toSource':
          selectedValue = targetSelection;
          if (props.onMoveToSource) {
            props.onMoveToSource({
              originalEvent: originalEvent,
              value: selectedValue
            });
          }
          break;
        case 'allToSource':
          selectedValue = props.target;
          if (props.onMoveAllToSource) {
            props.onMoveAllToSource({
              originalEvent: originalEvent,
              value: selectedValue
            });
          }
          selectedValue = [];
          break;
      }
      _onSelectionChange({
        originalEvent: originalEvent,
        value: selectedValue
      }, 'sourceSelection', props.onSourceSelectionChange);
      _onSelectionChange({
        originalEvent: originalEvent,
        value: selectedValue
      }, 'targetSelection', props.onTargetSelectionChange);
      handleChange(event, source, target);
    };
    var scrollInView = function scrollInView(listContainer) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var selectedItems = listContainer.getElementsByClassName('p-highlight');
      if (utils.ObjectUtils.isNotEmpty(selectedItems)) {
        utils.DomHandler.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
      }
    };
    var _onSelectionChange = function onSelectionChange(e, stateKey, callback) {
      if (stateKey === 'sourceSelection') setSourceSelectionState(e.value);else setTargetSelectionState(e.value);
      if (callback) {
        callback(e);
      }
      if (utils.ObjectUtils.isNotEmpty(sourceSelection) && stateKey === 'targetSelection') {
        setSourceSelectionState([]);
      } else if (utils.ObjectUtils.isNotEmpty(targetSelection) && stateKey === 'sourceSelection') {
        setTargetSelectionState([]);
      }
    };
    var onFilter = function onFilter(event) {
      var originalEvent = event.originalEvent,
        value = event.value,
        type = event.type;
      var _ref = type === 'source' ? [setSourceFilterValueState, props.onSourceFilterChange] : [setTargetFilterValueState, props.onTargetFilterChange],
        _ref2 = _slicedToArray(_ref, 2),
        setFilterState = _ref2[0],
        onFilterChange = _ref2[1];
      if (onFilterChange) {
        onFilterChange({
          originalEvent: originalEvent,
          value: value
        });
      } else {
        setFilterState(value);
      }
    };
    var getVisibleList = function getVisibleList(list, type) {
      var _ref3 = type === 'source' ? [sourceFilteredValue, filterSource] : [targetFilteredValue, filterTarget],
        _ref4 = _slicedToArray(_ref3, 2),
        filteredValue = _ref4[0],
        filterCallback = _ref4[1];
      return hasFilterBy && utils.ObjectUtils.isNotEmpty(filteredValue) ? filterCallback(filteredValue) : list;
    };
    var filterSource = function filterSource() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var filteredValue = value.trim().toLocaleLowerCase(props.filterLocale);
      return filter(props.source, filteredValue);
    };
    var filterTarget = function filterTarget() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var filteredValue = value.trim().toLocaleLowerCase(props.filterLocale);
      return filter(props.target, filteredValue);
    };
    var filter = function filter(list, filterValue) {
      var searchFields = hasFilterBy ? props.filterBy.split(',') : [];
      return PrimeReact.FilterService.filter(list, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce);
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-picklist[").concat(attributeSelectorState, "] {\n        flex-direction: column;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-picklist[").concat(attributeSelectorState, "] .p-picklist-buttons .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
        styleElementRef.current.innerHTML = innerHTML;
      }
    };
    var destroyStyle = function destroyStyle() {
      styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
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
      !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
    });
    hooks.useUpdateEffect(function () {
      if (attributeSelectorState) {
        elementRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
      return function () {
        destroyStyle();
      };
    }, [attributeSelectorState, props.breakpoint]);
    hooks.useUpdateEffect(function () {
      if (reorderedListElementRef.current) {
        handleScrollPosition(reorderedListElementRef.current, reorderDirection.current);
        reorderedListElementRef.current = null;
        reorderDirection.current = null;
      }
    });
    var className = utils.classNames('p-picklist p-component', props.className);
    var sourceItemTemplate = props.sourceItemTemplate ? props.sourceItemTemplate : props.itemTemplate;
    var targetItemTemplate = props.targetItemTemplate ? props.targetItemTemplate : props.itemTemplate;
    var sourceList = getVisibleList(props.source, 'source');
    var targetList = getVisibleList(props.target, 'target');
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, PickListBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.showSourceControls && /*#__PURE__*/React__namespace.createElement(PickListControls, {
      list: props.source,
      selection: sourceSelection,
      onReorder: onSourceReorder,
      className: "p-picklist-source-controls",
      dataKey: props.dataKey,
      moveUpIcon: props.moveUpIcon,
      moveTopIcon: props.moveTopIcon,
      moveDownIcon: props.moveDownIcon,
      moveBottomIcon: props.moveBottomIcon,
      ptm: ptm
    }), /*#__PURE__*/React__namespace.createElement(PickListSubList, {
      ref: sourceListElementRef,
      type: "source",
      list: sourceList,
      selection: sourceSelection,
      onSelectionChange: function onSelectionChange(e) {
        return _onSelectionChange(e, 'sourceSelection', props.onSourceSelectionChange);
      },
      itemTemplate: sourceItemTemplate,
      header: props.sourceHeader,
      style: props.sourceStyle,
      className: "p-picklist-source-wrapper",
      listClassName: "p-picklist-source",
      metaKeySelection: props.metaKeySelection,
      tabIndex: props.tabIndex,
      dataKey: props.dataKey,
      filterValue: sourceFilteredValue,
      onFilter: onFilter,
      showFilter: showSourceFilter,
      placeholder: props.sourceFilterPlaceholder,
      filterTemplate: props.sourceFilterTemplate,
      sourceFilterIcon: props.sourceFilterIcon,
      ptm: ptm
    }), /*#__PURE__*/React__namespace.createElement(PickListTransferControls, {
      onTransfer: onTransfer,
      source: props.source,
      visibleSourceList: sourceList,
      target: props.target,
      breakpoint: props.breakpoint,
      visibleTargetList: targetList,
      sourceSelection: sourceSelection,
      targetSelection: targetSelection,
      dataKey: props.dataKey,
      moveToTargetIcon: props.moveToTargetIcon,
      moveAllToTargetIcon: props.moveAllToTargetIcon,
      moveToSourceIcon: props.moveToSourceIcon,
      moveAllToSourceIcon: props.moveAllToSourceIcon,
      ptm: ptm
    }), /*#__PURE__*/React__namespace.createElement(PickListSubList, {
      ref: targetListElementRef,
      type: "target",
      list: targetList,
      selection: targetSelection,
      onSelectionChange: function onSelectionChange(e) {
        return _onSelectionChange(e, 'targetSelection', props.onTargetSelectionChange);
      },
      itemTemplate: targetItemTemplate,
      header: props.targetHeader,
      style: props.targetStyle,
      className: "p-picklist-target-wrapper",
      listClassName: "p-picklist-target",
      metaKeySelection: props.metaKeySelection,
      tabIndex: props.tabIndex,
      dataKey: props.dataKey,
      filterValue: targetFilteredValue,
      onFilter: onFilter,
      showFilter: showTargetFilter,
      placeholder: props.targetFilterPlaceholder,
      filterTemplate: props.targetFilterTemplate,
      targetFilterIcon: props.targetFilterIcon,
      ptm: ptm
    }), props.showTargetControls && /*#__PURE__*/React__namespace.createElement(PickListControls, {
      list: props.target,
      selection: targetSelection,
      onReorder: onTargetReorder,
      className: "p-picklist-target-controls",
      dataKey: props.dataKey,
      moveUpIcon: props.moveUpIcon,
      moveTopIcon: props.moveTopIcon,
      moveDownIcon: props.moveDownIcon,
      moveBottomIcon: props.moveBottomIcon,
      ptm: ptm
    }));
  }));
  PickList.displayName = 'PickList';

  exports.PickList = PickList;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils, primereact.componentbase, primereact.button, primereact.icons.angledoubledown, primereact.icons.angledoubleup, primereact.icons.angledown, primereact.icons.angleup, primereact.icons.search, primereact.ripple, primereact.icons.angledoubleleft, primereact.icons.angledoubleright, primereact.icons.angleleft, primereact.icons.angleright);
