(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! @styles/main.scss */ "./styles/main.scss");

var _select = _interopRequireDefault(__webpack_require__(/*! @main/select */ "./scripts/main/select.js"));

var _app = _interopRequireDefault(__webpack_require__(/*! @main/app */ "./scripts/main/app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _select["default"]("#select-1", {
  name: "questions",
  targetValue: "вопросы",
  options: [["вопросы", "Вопросы учебы и образования"], ["общее", "Общие вопросы"]]
});
new _select["default"]("#select-2", {
  name: "service",
  targetValue: "перезачёты",
  options: [["перезачёты", "Перезачеты"], ["несогласие", "Несогласие на перезачет на оценку удовлетворительно (с зачета на экзамен)"], ["вопросы", "Вопросы по перезачету"]]
});
new _select["default"]("#select-3", {
  name: "не важно",
  targetValue: "не важно",
  options: [["онлайн", "Доступно онлайн"], ["лично", "Только лично"], ["не важно", "Не важно"]]
});
window.App = new _app["default"]();

/***/ }),

/***/ "./scripts/main/app.js":
/*!*****************************!*\
  !*** ./scripts/main/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.concat */ "../node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "../node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.define-property */ "../node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "../node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.promise */ "../node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../node_modules/core-js/modules/web.dom-collections.for-each.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

__webpack_require__(/*! regenerator-runtime/runtime */ "../node_modules/regenerator-runtime/runtime.js");

var _select = _interopRequireDefault(__webpack_require__(/*! @main/select */ "./scripts/main/select.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.initEvents();
  }

  _createClass(App, [{
    key: "initEvents",
    value: function initEvents() {
      // отслеживаем клики на документе
      document.addEventListener("click", documentActions); //назначаем функции-обработчики элементам

      function documentActions(e) {
        var targetElement = e.target; // выбор пункта в первом селекте

        if (targetElement.classList.contains("itc-select__option")) {
          if (targetElement.closest(".select-1")) {
            changeDependSelect(targetElement);
          }
        } // Нажатие на кнопку "Показать"


        if (targetElement.classList.contains("button_submit")) {
          updateCardsBlock(targetElement);
        } // нажатие на кнопку ...Показать ещё


        if (targetElement.classList.contains("cards__more-btn")) {
          getServiceItem(targetElement);
        }
      } // по клику на селект с разделами меняем список услуг в селекте с услугами


      function changeDependSelect(element) {
        var currentIndex = element.dataset.index;
        var dependSelect = document.getElementById("select-2");
        var selectContainer = document.getElementById("selectContainer");

        if (currentIndex === "1") {
          element.closest(".select-1").dataset.chapter = "1";
          var selectedItem = "документы";
          var newListItems = [["документы", "Документы"], ["статус", "Статус в реестре студентов"], ["отчет", "Отчет по практике"]];
          updateDependSelect(selectedItem, newListItems);
        }

        if (currentIndex === "0") {
          element.closest(".select-1").dataset.chapter = "0";
          var _selectedItem = "перезачёты";
          var _newListItems = [["перезачёты", "Перезачеты"], ["несогласие", "Несогласие на перезачет на оценку удовлетворительно (с зачета на экзамен)"], ["вопросы", "Вопросы по перезачету"]];
          updateDependSelect(_selectedItem, _newListItems);
        }

        function updateDependSelect(item, options) {
          dependSelect.remove();
          selectContainer.insertAdjacentHTML("beforeend", "\n                <div class=\"select filter__select\" id=\"select-2\" data-selectIndex=\"1\"></div>\n                ");
          new _select["default"]("#select-2", {
            targetValue: item,
            name: "service",
            options: options
          });
        }
      } // получаем выбранные в селектах параметры поиска услуг


      var chapterId, serviceId, serviceStatus;

      function updateCardsBlock(button) {
        chapterId = document.getElementById("select-1").dataset.chapter;
        serviceId = document.querySelector("#select-2 .itc-select__toggle").dataset.index;
        serviceStatus = document.querySelector("#select-3 .itc-select__toggle").dataset.index;
        var cardsWrapper = document.querySelector(".cards__block");
        cardsWrapper.innerHTML = "";
        getAllServiceItems(button);
        return chapterId, serviceId, serviceStatus;
      } // получаем объект с услугами


      function getAllServiceItems(_x) {
        return _getAllServiceItems.apply(this, arguments);
      } // выбираем из всех услуг услуги, подходящие под условия поиска


      function _getAllServiceItems() {
        _getAllServiceItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(button) {
          var file, response, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (button.classList.contains("_pushed")) {
                    _context.next = 15;
                    break;
                  }

                  !button.classList.add("_pushed");
                  file = "../services.json";
                  _context.next = 5;
                  return fetch(file, {
                    method: "GET"
                  });

                case 5:
                  response = _context.sent;

                  if (!response.ok) {
                    _context.next = 14;
                    break;
                  }

                  _context.next = 9;
                  return response.json();

                case 9:
                  result = _context.sent;
                  renderFilteredCard(result);
                  button.classList.remove("_pushed");
                  _context.next = 15;
                  break;

                case 14:
                  alert("Ошибка");

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _getAllServiceItems.apply(this, arguments);
      }

      function renderFilteredCard(resultData) {
        var cardsBlock = document.querySelector(".cards__block");
        resultData.services.forEach(function (item) {
          if (serviceStatus == 2) {
            // онлайн или лично - не имеет значения, значит выбираем только по двум параметрам
            if (item.chapter == chapterId && item.service == serviceId) {
              insertDataToTemplate(item, cardsBlock);
            }
          } else {
            if (item.chapter == chapterId && item.service == serviceId && item.status == serviceStatus) {
              insertDataToTemplate(item, cardsBlock);
            }
          }
        }); // если ни одна услуга не подошла под параметры поиска - выводим сообщение

        if (cardsBlock.querySelectorAll(".card").length < 1) {
          cardsBlock.insertAdjacentHTML("beforeend", "\n                            <div class=\"warning\">\n                                <p class=\"warning__title\">\u0423\u0441\u043B\u0443\u0433 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E.\n                                \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430.</p>\n                            </div>\n                        ");
        }

        if (document.querySelector(".cards__more-btn")) {
          document.querySelector(".cards__more-btn").innerHTML = "Показать все услуги";
        } else {
          document.querySelector(".cards__more").insertAdjacentHTML("beforeend", "\n                    <button type=\"submit\" class=\"button cards__more-btn\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438</button>\n                ");
        }
      } // по клику на "...Показать еще" загружаем данные об услугах


      function getServiceItem(_x2) {
        return _getServiceItem.apply(this, arguments);
      } // из полученных данных собираем карточки


      function _getServiceItem() {
        _getServiceItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(button) {
          var file, response, result;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (button.classList.contains("_pushed")) {
                    _context2.next = 16;
                    break;
                  }

                  !button.classList.add("_pushed");
                  file = "../services.json";
                  _context2.next = 5;
                  return fetch(file, {
                    method: "GET"
                  });

                case 5:
                  response = _context2.sent;

                  if (!response.ok) {
                    _context2.next = 15;
                    break;
                  }

                  _context2.next = 9;
                  return response.json();

                case 9:
                  result = _context2.sent;
                  renderCard(result);
                  button.classList.remove("_pushed");
                  button.remove();
                  _context2.next = 16;
                  break;

                case 15:
                  alert("Ошибка");

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return _getServiceItem.apply(this, arguments);
      }

      function renderCard(data) {
        var cardsBlock = document.querySelector(".cards__block");
        cardsBlock.innerHTML = "";
        data.services.forEach(function (item) {
          insertDataToTemplate(item, cardsBlock);
        });
      } //функция наполнения шаблона


      function insertDataToTemplate(item, cardsBlock) {
        var serviceId = item.id;
        var serviceSphere = item.dataSphere;
        var serviceService = item.dataService;
        var serviceTitle = item.title;
        var serviceText = item.text;
        var serviceLabel = item.label;
        var serviceTagColor = item.labelClass;
        var serviceButtons = item.buttons;
        var cardTemplate = "";
        var cardTemplateStart = "\n                                        <div class=\"cards__item card\" data-id=\"".concat(serviceId, "\" data-sphere=\"").concat(serviceSphere, "\" data-service=\"").concat(serviceService, "\">    \n                                        ");
        var cardTemplateEnd = "</div>";
        var cardTemplateTop = "\n                        <div class=\"card__tag ".concat(serviceTagColor, "\">").concat(serviceLabel, "</div>\n                        <div class=\"card__title\">").concat(serviceTitle, "</div>\n                        <div class=\"card__text\">").concat(serviceText, "</div>\n                    ");
        var cardTemplateBottom = "";

        if (serviceButtons) {
          var cardTemplateBottomStart = "<div class='card__buttons'>";
          var cardTemplateBottomEnd = "</div>";
          var cardTemplateBottomContent = "";

          if (serviceButtons.length === 1) {
            serviceButtons.forEach(function (button) {
              cardTemplateBottomContent += "<a href=\"".concat(button.url, "\" class=\"button button_action ").concat(button["class"], " button_single\">\n                                ").concat(button.svg, "\n                                <span>").concat(button.text, "</span>\n                               </a>\n                                ");
            });
          } else {
            serviceButtons.forEach(function (button) {
              cardTemplateBottomContent += "<a href=\"".concat(button.url, "\" class=\"button button_action ").concat(button["class"], "\">\n                                ").concat(button.svg, "\n                                <span>").concat(button.text, "</span>\n                               </a>\n                                ");
            });
          }

          cardTemplateBottom += cardTemplateBottomStart;
          cardTemplateBottom += cardTemplateBottomContent;
          cardTemplateBottom += cardTemplateBottomEnd;
        }

        cardTemplate += cardTemplateStart;
        cardTemplate += cardTemplateTop;
        cardTemplate += cardTemplateBottom;
        cardTemplate += cardTemplateEnd;
        cardsBlock.insertAdjacentHTML("beforeend", cardTemplate);
      } // показать ещё текст в мобильном виде


      var mql = window.matchMedia("(max-width: 575.98px)");
      var textBlock = document.querySelector(".main-info__text");
      var event_list = ["load", "resize"];
      event_list.forEach(function (event) {
        window.addEventListener(event, function () {
          if (mql.matches) {
            textBlock.addEventListener("click", openCloseMore);
          } else {
            textBlock.removeEventListener("click", openCloseMore);
          }
        });
      });

      function openCloseMore() {
        if (textBlock.classList.contains("_opened")) {
          textBlock.classList.remove("_opened");
        } else {
          textBlock.classList.add("_opened");
        }
      }
    }
  }]);

  return App;
}();

exports["default"] = App;
module.exports = exports.default;

/***/ }),

/***/ "./scripts/main/select.js":
/*!********************************!*\
  !*** ./scripts/main/select.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.concat */ "../node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "../node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.join */ "../node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.function.bind */ "../node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "../node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.object.define-property */ "../node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../node_modules/core-js/modules/web.dom-collections.for-each.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// select
var ItcCustomSelect = /*#__PURE__*/function () {
  _createClass(ItcCustomSelect, null, [{
    key: "template",
    value: function template(params) {
      var _this = this;

      var name = params.name,
          options = params.options,
          targetValue = params.targetValue;
      var items = [];
      var selectedIndex = -1;
      var selectedValue = "";
      var selectedContent = "Выберите из списка";
      options.forEach(function (option, index) {
        var selectedClass = "";

        if (option[0] === targetValue) {
          selectedClass = " ".concat(_this.EL_OPTION_SELECTED);
          selectedIndex = index;
          selectedValue = option[0];
          selectedContent = option[1];
        }

        items.push("<li class=\"itc-select__option".concat(selectedClass, "\" data-select=\"option\"\n        data-value=\"").concat(option[0], "\" data-index=\"").concat(index, "\">").concat(option[1], "</li>"));
      });
      return "<button type=\"button\" class=\"itc-select__toggle\" name=\"".concat(name, "\"\n      value=\"").concat(selectedValue, "\" data-select=\"toggle\" data-index=\"").concat(selectedIndex, "\">\n      ").concat(selectedContent, "</button><div class=\"itc-select__dropdown\">\n      <ul class=\"itc-select__options\">").concat(items.join(""), "</ul></div>");
    }
  }, {
    key: "hideOpenSelect",
    value: function hideOpenSelect() {
      var _this2 = this;

      document.addEventListener("click", function (e) {
        if (!e.target.closest(".".concat(_this2.EL))) {
          var elsActive = document.querySelectorAll(".".concat(_this2.EL_SHOW));
          elsActive.forEach(function (el) {
            el.classList.remove(_this2.EL_SHOW);
          });
        }
      });
    }
  }, {
    key: "create",
    value: function create(target, params) {
      this._el = typeof target === "string" ? document.querySelector(target) : target;

      if (this._el) {
        return new this(target, params);
      }

      return null;
    }
  }]);

  function ItcCustomSelect(target, params) {
    _classCallCheck(this, ItcCustomSelect);

    this._el = typeof target === "string" ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);

    if (this._params.options) {
      this._el.innerHTML = this.constructor.template(this._params);

      this._el.classList.add(this.constructor.EL);
    }

    this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);

    this._el.addEventListener("click", this._onClickFn);
  }

  _createClass(ItcCustomSelect, [{
    key: "_onClick",
    value: function _onClick(e) {
      var target = e.target;
      var type = target.closest(this.constructor.DATA).dataset.select;

      if (type === "toggle") {
        this.toggle();
      } else if (type === "option") {
        this._changeValue(target);
      }
    }
  }, {
    key: "_updateOption",
    value: function _updateOption(el) {
      var elOption = el.closest(".".concat(this.constructor.EL_OPTION));

      var elOptionSel = this._el.querySelector(".".concat(this.constructor.EL_OPTION_SELECTED));

      if (elOptionSel) {
        elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }

      elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
      this._elToggle.textContent = elOption.textContent;
      this._elToggle.value = elOption.dataset.value;
      this._elToggle.dataset.index = elOption.dataset.index;

      this._el.dispatchEvent(new CustomEvent("itc.select.change"));

      this._params.onSelected ? this._params.onSelected(this, elOption) : null;
      return elOption.dataset.value;
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var selected = this._el.querySelector(".".concat(this.constructor.EL_OPTION_SELECTED));

      if (selected) {
        selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }

      this._elToggle.textContent = "Выберите из списка";
      this._elToggle.value = "";
      this._elToggle.dataset.index = "-1";

      this._el.dispatchEvent(new CustomEvent("itc.select.change"));

      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return "";
    }
  }, {
    key: "_changeValue",
    value: function _changeValue(el) {
      if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
        return;
      }

      this._updateOption(el);

      this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      document.querySelectorAll(this.constructor.EL_SHOW).forEach(function (el) {
        el.classList.remove(_this3.constructor.EL_SHOW);
      });

      this._el.classList.add("".concat(this.constructor.EL_SHOW));
    }
  }, {
    key: "hide",
    value: function hide() {
      this._el.classList.remove(this.constructor.EL_SHOW);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._el.removeEventListener("click", this._onClickFn);
    }
  }, {
    key: "value",
    get: function get() {
      return this._elToggle.value;
    },
    set: function set(value) {
      var _this4 = this;

      var isExists = false;

      this._el.querySelectorAll(".select__option").forEach(function (option) {
        if (option.dataset.value === value) {
          isExists = true;

          _this4._updateOption(option);
        }
      });

      if (!isExists) {
        this._reset();
      }
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      return this._elToggle.dataset.index;
    },
    set: function set(index) {
      var option = this._el.querySelector(".select__option[data-index=\"".concat(index, "\"]"));

      if (option) {
        this._updateOption(option);
      }

      this._reset();
    }
  }]);

  return ItcCustomSelect;
}();

exports["default"] = ItcCustomSelect;
ItcCustomSelect.EL = "itc-select";
ItcCustomSelect.EL_SHOW = "itc-select_show";
ItcCustomSelect.EL_OPTION = "itc-select__option";
ItcCustomSelect.EL_OPTION_SELECTED = "itc-select__option_selected";
ItcCustomSelect.DATA = "[data-select]";
ItcCustomSelect.DATA_TOGGLE = "[data-select='toggle']";
ItcCustomSelect.hideOpenSelect();
module.exports = exports.default;

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

},[[0,"runtime","vendors"]]]);
//# sourceMappingURL=main.js.map