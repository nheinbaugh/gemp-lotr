/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/gemp-022/merchantUi.js":
/*!***********************************!*\
  !*** ./js/gemp-022/merchantUi.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GempLotrMerchantUI\": () => (/* binding */ GempLotrMerchantUI)\n/* harmony export */ });\nvar GempLotrMerchantUI = Class.extend({\r\n    comm:null,\r\n\r\n    cardsDiv:null,\r\n    cardsGroup:null,\r\n\r\n    filterDiv:null,\r\n    cardFilter:null,\r\n\r\n    pocketDiv:null,\r\n    hideMerchantDiv:null,\r\n    countDiv:null,\r\n\r\n    infoDialog:null,\r\n    questionDialog:null,\r\n\r\n    currencyCount:null,\r\n    ownedMin:0,\r\n    hideMerchant:false,\r\n\r\n    init:function (cardListElem, cardFilterElem) {\r\n        var that = this;\r\n\r\n        this.comm = new GempLotrCommunication(\"/gemp-lotr-server\", that.processError);\r\n\r\n        this.cardFilter = new CardFilter(cardFilterElem, \r\n            function (filter, start, count, callback) {\r\n                that.comm.getMerchant(filter, that.ownedMin, start, count, callback);\r\n            },\r\n            function (rootElem) {\r\n                that.clearList(rootElem);\r\n            },\r\n            function (elem, type, blueprintId, count) {\r\n                that.addCardToList(elem, type, blueprintId, count);\r\n            },\r\n            function () {\r\n                that.finishList();\r\n            });s\r\n        this.cardFilter.setType(\"card\");\r\n        this.cardFilter.setFilter(\"type:card\");\r\n\r\n        this.cardsDiv = cardListElem;\r\n        this.cardsGroup = new NormalCardGroup(this.cardsDiv, function (card) {\r\n            return true;\r\n        });\r\n\r\n        this.filterDiv = cardFilterElem;\r\n\r\n        this.pocketDiv = $(\"<div class='pocket'></div>\");\r\n\r\n        this.hideMerchantDiv = $(\"<div class='hideMerchant'><label for='hideMerchantCheck'>Hide merchant</label><input type='checkbox' id='hideMerchantCheck' value='hideMerchant'/></div>\");\r\n\r\n        this.countDiv = $(\"<div class='countDiv'>Owned >= <select id='ownedMin'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select></div>\");\r\n\r\n        this.filterDiv.append(this.pocketDiv);\r\n        this.filterDiv.append(this.hideMerchantDiv);\r\n        this.filterDiv.append(this.countDiv);\r\n\r\n        $(\"#ownedMin\").change(\r\n                function () {\r\n                    that.ownedMin = $(\"#ownedMin option:selected\").prop(\"value\");\r\n                    that.cardFilter.getCollection();\r\n                });\r\n\r\n        $(\"#hideMerchantCheck\").change(\r\n                function () {\r\n                    that.hideMerchant = $(\"#hideMerchantCheck\").prop(\"checked\");\r\n                    that.cardFilter.getCollection();\r\n                });\r\n\r\n        this.infoDialog = $(\"<div></div>\")\r\n                .dialog({\r\n            autoOpen:false,\r\n            closeOnEscape:true,\r\n            resizable:false,\r\n            title:\"Card information\"\r\n        });\r\n\r\n        this.questionDialog = $(\"<div></div>\")\r\n                .dialog({\r\n            autoOpen:false,\r\n            closeOnEscape:true,\r\n            resizable:false,\r\n            modal:true,\r\n            title:\"Merchant operation\"\r\n        });\r\n\r\n        var swipeOptions = {\r\n            threshold:20,\r\n            swipeUp:function (event) {\r\n                that.infoDialog.prop({ scrollTop:that.infoDialog.prop(\"scrollHeight\") });\r\n                return false;\r\n            },\r\n            swipeDown:function (event) {\r\n                that.infoDialog.prop({ scrollTop:0 });\r\n                return false;\r\n            }\r\n        };\r\n        this.infoDialog.swipe(swipeOptions);\r\n\r\n        $(\"body\").click(\r\n                function (event) {\r\n                    return that.clickCardFunction(event);\r\n                });\r\n        $(\"body\").mousedown(\r\n                function (event) {\r\n                    return that.dragStartCardFunction(event);\r\n                });\r\n        $(\"body\").mouseup(\r\n                function (event) {\r\n                    return that.dragStopCardFunction(event);\r\n                });\r\n\r\n        this.cardFilter.getCollection();\r\n    },\r\n\r\n    dragCardData:null,\r\n    dragStartX:null,\r\n    dragStartY:null,\r\n    successfulDrag:null,\r\n\r\n    dragStartCardFunction:function (event) {\r\n        this.successfulDrag = false;\r\n        var tar = $(event.target);\r\n        if (tar.hasClass(\"actionArea\")) {\r\n            var selectedCardElem = tar.closest(\".card\");\r\n            if (event.which == 1) {\r\n                this.dragCardData = selectedCardElem.data(\"card\");\r\n                this.dragStartX = event.clientX;\r\n                this.dragStartY = event.clientY;\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    },\r\n\r\n    dragStopCardFunction:function (event) {\r\n        if (this.dragCardData != null) {\r\n            if (this.dragStartY - event.clientY >= 20) {\r\n                this.displayCardInfo(this.dragCardData);\r\n                this.successfulDrag = true;\r\n            }\r\n            this.dragCardData = null;\r\n            this.dragStartX = null;\r\n            this.dragStartY = null;\r\n            return false;\r\n        }\r\n        return true;\r\n    },\r\n\r\n    clickCardFunction:function (event) {\r\n        var that = this;\r\n\r\n        var tar = $(event.target);\r\n        if (tar.length == 1 && tar[0].tagName == \"A\")\r\n            return true;\r\n\r\n        if (!this.successfulDrag && this.infoDialog.dialog(\"isOpen\")) {\r\n            this.infoDialog.dialog(\"close\");\r\n            event.stopPropagation();\r\n            return false;\r\n        }\r\n\r\n        if (tar.hasClass(\"actionArea\")) {\r\n            var selectedCardElem = tar.closest(\".card\");\r\n            if (event.which == 1) {\r\n                if (!this.successfulDrag) {\r\n                    if (event.shiftKey) {\r\n                        this.displayCardInfo(selectedCardElem.data(\"card\"));\r\n                    }\r\n                    event.stopPropagation();\r\n                }\r\n            }\r\n            return false;\r\n        }\r\n        return true;\r\n    },\r\n\r\n    displayCardInfo:function (card) {\r\n        this.infoDialog.html(\"\");\r\n        this.infoDialog.html(\"<div style='scroll: auto'></div>\");\r\n        this.infoDialog.append(createFullCardDiv(card.imageUrl, card.foil, card.horizontal, card.isPack()));\r\n        if (card.hasWikiInfo())\r\n            this.infoDialog.append(\"<div><a href='\" + card.getWikiLink() + \"' target='_blank'>Wiki</a></div>\");\r\n        var windowWidth = $(window).width();\r\n        var windowHeight = $(window).height();\r\n\r\n        var horSpace = 30;\r\n        var vertSpace = 45;\r\n\r\n        if (card.horizontal) {\r\n            // 500x360\r\n            this.infoDialog.dialog({width:Math.min(500 + horSpace, windowWidth), height:Math.min(380 + vertSpace, windowHeight)});\r\n        } else {\r\n            // 360x500\r\n            this.infoDialog.dialog({width:Math.min(360 + horSpace, windowWidth), height:Math.min(520 + vertSpace, windowHeight)});\r\n        }\r\n        this.infoDialog.dialog(\"open\");\r\n    },\r\n\r\n    clearList:function (rootElem) {\r\n        $(\".card\", this.cardsDiv).remove();\r\n        this.currencyCount = rootElem.getAttribute(\"currency\");\r\n        this.pocketDiv.html(formatPrice(this.currencyCount));\r\n    },\r\n\r\n    addCardToList:function (elem, type, blueprintId, count) {\r\n        var buyPrice = elem.getAttribute(\"buyPrice\");\r\n        var sellPrice = elem.getAttribute(\"sellPrice\");\r\n        var tradeFoil = elem.getAttribute(\"tradeFoil\");\r\n\r\n        var sizeListeners = new Array();\r\n        sizeListeners[0] = {\r\n            sizeChanged:function (cardElem, width, height) {\r\n                $(\".owned\", cardElem).css({position:\"absolute\", left:5, top:height - 60, width:30, height:30});\r\n                $(\".buyPrice\", cardElem).css({position:\"absolute\", left:40, top:height - 80, width:width - 45, height:25});\r\n                $(\".sellPrice\", cardElem).css({position:\"absolute\", left:40, top:height - 50, width:width - 45, height:25});\r\n                $(\".tradeFoil\", cardElem).css({position:\"absolute\", left:40, top:height - 20, width:width - 45, height:15});\r\n            }\r\n        };\r\n\r\n        var cardDiv = null;\r\n        var card = null;\r\n\r\n        if (type == \"pack\") {\r\n            card = new Card(blueprintId, \"merchant\", \"collection\", \"player\");\r\n            cardDiv = createCardDiv(card.imageUrl, null, false, true, true, false);\r\n            cardDiv.data(\"card\", card);\r\n            cardDiv.data(\"sizeListeners\", sizeListeners);\r\n            this.cardsDiv.append(cardDiv);\r\n        } else if (type == \"card\") {\r\n            card = new Card(blueprintId, \"merchant\", \"collection\", \"player\");\r\n            cardDiv = createCardDiv(card.imageUrl, null, card.isFoil(), true, false, card.hasErrata());\r\n            cardDiv.data(\"card\", card);\r\n            cardDiv.data(\"sizeListeners\", sizeListeners);\r\n            this.cardsDiv.append(cardDiv);\r\n        }\r\n\r\n        if (cardDiv != null) {\r\n            var that = this;\r\n            cardDiv.append(\"<div class='owned'>\" + count + \"</div>\");\r\n            if (!this.hideMerchant) {\r\n                if (buyPrice != null) {\r\n                    var formattedBuyPrice = formatPrice(buyPrice);\r\n                    var buyBut = $(\"<div class='buyPrice'>Sell for<br/>\" + formattedBuyPrice + \"</div>\").button();\r\n                    buyBut.click(\r\n                            function () {\r\n                                that.displayMerchantAction(card, \"Do you want to sell this item for \" + formattedBuyPrice + \"?\",\r\n                                        function () {\r\n                                            that.comm.sellItem(blueprintId, buyPrice, function () {\r\n                                                that.cardFilter.getCollection();\r\n                                            });\r\n                                        });\r\n                            });\r\n                    cardDiv.append(buyBut);\r\n                }\r\n                if (sellPrice != null) {\r\n                    var formattedSellPrice = formatPrice(sellPrice);\r\n                    var sellBut = $(\"<div class='sellPrice'>Buy for<br/>\" + formattedSellPrice + \"</div>\").button();\r\n                    sellBut.click(\r\n                            function () {\r\n                                that.displayMerchantAction(card, \"Do you want to buy this item for \" + formattedSellPrice + \"?\",\r\n                                        function () {\r\n                                            that.comm.buyItem(blueprintId, sellPrice, function () {\r\n                                                that.cardFilter.getCollection();\r\n                                            });\r\n                                        });\r\n                            });\r\n                    if (parseInt(sellPrice) > parseInt(this.currencyCount)) {\r\n                        sellBut.button({disabled:true});\r\n                        sellBut.css({color:\"#ff0000\"});\r\n                    }\r\n                    cardDiv.append(sellBut);\r\n                }\r\n                if (tradeFoil == \"true\") {\r\n                    var tradeFoilBut = $(\"<div class='tradeFoil'>Trade 4 for foil</div>\").button();\r\n                    tradeFoilBut.click(\r\n                            function () {\r\n                                that.displayMerchantAction(card, \"Do you want to trade 4 of this card and 4G in currency for a foil version of the card?\",\r\n                                        function () {\r\n                                            that.comm.tradeInFoil(blueprintId, function () {\r\n                                                that.cardFilter.getCollection();\r\n                                            });\r\n                                        });\r\n                            });\r\n                    cardDiv.append(tradeFoilBut);\r\n                }\r\n            }\r\n        }\r\n    },\r\n\r\n    displayMerchantAction:function (card, text, yesFunc) {\r\n        var that = this;\r\n        this.questionDialog.html(\"\");\r\n        this.questionDialog.html(\"<div style='scroll: auto'></div>\");\r\n        var floatCardDiv = $(\"<div style='float: left;'></div>\");\r\n        floatCardDiv.append(createFullCardDiv(card.imageUrl, card.foil, card.horizontal, card.isPack()));\r\n        if (card.hasWikiInfo())\r\n            floatCardDiv.append(\"<div><a href='\" + card.getWikiLink() + \"' target='_blank'>Wiki</a></div>\");\r\n        this.questionDialog.append(floatCardDiv);\r\n        var questionDiv = $(\"<div id='cardEffects'>\" + text + \"</div>\");\r\n        questionDiv.append(\"<br/>\");\r\n        questionDiv.append($(\"<button>Yes</button>\").button().click(\r\n                function () {\r\n                    that.questionDialog.dialog(\"close\");\r\n                    yesFunc();\r\n                }));\r\n        questionDiv.append($(\"<button>No</button>\").button().click(\r\n                function () {\r\n                    that.questionDialog.dialog(\"close\");\r\n                }));\r\n        this.questionDialog.append(questionDiv);\r\n\r\n        var windowWidth = $(window).width();\r\n        var windowHeight = $(window).height();\r\n\r\n        var horSpace = 230;\r\n        var vertSpace = 45;\r\n\r\n        if (card.horizontal) {\r\n            // 500x360\r\n            this.questionDialog.dialog({width:Math.min(500 + horSpace, windowWidth), height:Math.min(380 + vertSpace, windowHeight)});\r\n        } else {\r\n            // 360x500\r\n            this.questionDialog.dialog({width:Math.min(360 + horSpace, windowWidth), height:Math.min(520 + vertSpace, windowHeight)});\r\n        }\r\n        this.questionDialog.dialog(\"open\");\r\n    },\r\n\r\n    finishList:function () {\r\n        this.cardsGroup.layoutCards();\r\n    },\r\n\r\n    layoutUI:function () {\r\n        var cardsGroupWidth = $(this.cardsDiv).width();\r\n        var cardsGroupHeight = $(this.cardsDiv).height();\r\n        this.cardsGroup.setBounds(0, 0, cardsGroupWidth, cardsGroupHeight);\r\n\r\n        var filterWidth = $(this.filterDiv).width();\r\n        var filterHeight = $(this.filterDiv).height();\r\n        this.cardFilter.layoutUi(0, 0, filterWidth, filterHeight);\r\n\r\n        this.pocketDiv.css({position:\"absolute\", left:filterWidth - 60, top:35, width:60, height:18});\r\n        this.hideMerchantDiv.css({position:\"absolute\", left:filterWidth - 100, top:filterHeight - 38, width:100, height:18});\r\n        this.countDiv.css({position:\"absolute\", left:filterWidth - 100, top:filterHeight - 20, width:100, height:20});\r\n    },\r\n\r\n    processError:function (xhr, ajaxOptions, thrownError) {\r\n        if (thrownError != \"abort\")\r\n            alert(\"There was a problem during communication with server\");\r\n    }\r\n});\r\n\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./js/gemp-022/merchantUi.js?");

/***/ }),

/***/ "./src/Merchant/merchant.js":
/*!**********************************!*\
  !*** ./src/Merchant/merchant.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_gemp_022_merchantUi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/gemp-022/merchantUi */ \"./js/gemp-022/merchantUi.js\");\n\r\n\r\n$(document).ready(\r\n    function () {\r\n        var ui = new _js_gemp_022_merchantUi__WEBPACK_IMPORTED_MODULE_0__.GempLotrMerchantUI($(\"#cardList\"), $(\"#cardFilter\"));\r\n\r\n        $(window).resize(function () {\r\n            layoutUi(ui);\r\n        });\r\n\r\n        layoutUi(ui);\r\n    });\r\n\r\nfunction layoutUi(ui) {\r\n    var width = $(window).width();\r\n    var height = $(window).height();\r\n    if (width < 800)\r\n        width = 800;\r\n    if (height < 400)\r\n        height = 400;\r\n\r\n    var padding = 5;\r\n    var filterHeight = 160;\r\n\r\n    $(\"#cardFilter\").css({ position: \"absolute\", left: padding, top: padding, width: width - padding * 2, height: filterHeight });\r\n    $(\"#cardList\").css({ position: \"absolute\", left: padding, top: 2 * padding + filterHeight, width: width - padding * 2, height: height - filterHeight - padding * 3 });\r\n    ui.layoutUI();\r\n}\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Merchant/merchant.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Merchant/merchant.js");
/******/ 	
/******/ })()
;