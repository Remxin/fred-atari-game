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

/***/ "./src/classes/Platform.ts":
/*!*********************************!*\
  !*** ./src/classes/Platform.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n\nvar Platform = /** @class */ (function () {\n    function Platform(x, y) {\n        this.position = {\n            x: x,\n            y: y\n        };\n        this.width = 200;\n        this.height = 20;\n    }\n    Platform.prototype.draw = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillStyle = \"blue\";\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillRect(this.position.x, this.position.y, this.width, this.height);\n    };\n    return Platform;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Platform);\n\n\n//# sourceURL=webpack://fred/./src/classes/Platform.ts?");

/***/ }),

/***/ "./src/classes/Player.ts":
/*!*******************************!*\
  !*** ./src/classes/Player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n\nvar Player = /** @class */ (function () {\n    function Player() {\n        this.position = { x: 100, y: 100 };\n        this.velocity = { x: 0, y: 1 };\n        this.width = 30,\n            this.height = 30;\n        this.floating = true;\n    }\n    Player.prototype.draw = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillStyle = \"red\";\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillRect(this.position.x, this.position.y, this.width, this.height);\n    };\n    Player.prototype.update = function () {\n        this.draw();\n        this.captureMovement();\n        this.checkCollisions();\n        if (this.position.y + this.height + this.velocity.y <= _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height) {\n            this.position.y += this.velocity.y;\n            this.velocity.y += _main__WEBPACK_IMPORTED_MODULE_0__.app.gravity;\n        }\n        else {\n            this.velocity.y = 0;\n            this.position.y = _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height - this.height;\n            this.floating = false;\n        }\n    };\n    Player.prototype.captureMovement = function () {\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.right) {\n            // this.velocity.x += 10\n            this.position.x += 10;\n        }\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.left) {\n            this.position.x -= 10;\n        }\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.up && !this.floating) {\n            this.floating = true;\n            this.velocity.y -= 20;\n        }\n    };\n    Player.prototype.checkCollisions = function () {\n        for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n            var platform = _a[_i];\n            if (this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {\n                this.velocity.y = 0;\n                this.floating = false;\n                // this.position.y = platform.height + platform.position.y - this.height\n            }\n        }\n    };\n    return Player;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://fred/./src/classes/Player.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"gameObjects\": () => (/* binding */ gameObjects),\n/* harmony export */   \"pressedKeys\": () => (/* binding */ pressedKeys)\n/* harmony export */ });\n/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Player */ \"./src/classes/Player.ts\");\n/* harmony import */ var _classes_Platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Platform */ \"./src/classes/Platform.ts\");\n\n\nvar canvas = document.getElementById(\"main\");\nvar app = {\n    canvas: canvas,\n    c: canvas.getContext(\"2d\"),\n    canvasProps: {\n        width: window.innerWidth - 5,\n        height: window.innerHeight,\n        rerenderStep: 30 // higher = better performance\n    },\n    gravity: 2,\n};\nvar pressedKeys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false\n};\nvar gameObjects = {\n    platforms: []\n};\nfunction startGame() {\n    // resize canvas\n    app.canvas.width = app.canvasProps.width;\n    app.canvas.height = app.canvasProps.height - 6;\n    // create player\n    var player = new _classes_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    var platform = new _classes_Platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](200, 950);\n    gameObjects.platforms.push(platform);\n    player.draw();\n    // animate game\n    function startAnim() {\n        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height);\n        platform.draw();\n        player.update();\n        setTimeout(function () {\n            requestAnimationFrame(startAnim);\n            // console.log(\"render leci\");\n        }, app.canvasProps.rerenderStep);\n    }\n    startAnim();\n    // listen to keys pressed\n    window.onkeydown = function (e) { return recognizePressedKeys(e); };\n    window.onkeyup = function (e) { return unbindPressedKeys(e); };\n}\nfunction recognizePressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = true;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = true;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = true;\n    }\n}\nfunction unbindPressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = false;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = false;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = false;\n    }\n}\nstartGame();\n\n\n//# sourceURL=webpack://fred/./src/main.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;