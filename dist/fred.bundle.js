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

/***/ "./src/classes/AudioManager.ts":
/*!*************************************!*\
  !*** ./src/classes/AudioManager.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar AudioManager = /** @class */ (function () {\n    function AudioManager() {\n        this.backgroundMusic = new Audio(\"../../audio/soundtrack.mp3\");\n    }\n    AudioManager.prototype.play = function () {\n        this.backgroundMusic.loop = true;\n        this.backgroundMusic.play();\n    };\n    AudioManager.prototype.stop = function () {\n        this.backgroundMusic.pause();\n    };\n    return AudioManager;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioManager);\n\n\n//# sourceURL=webpack://fred/./src/classes/AudioManager.ts?");

/***/ }),

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n\n// CONSTANTS \nvar jumpHeight = 30;\nvar velocity = { x: 5, y: 1 };\nvar Player = /** @class */ (function () {\n    function Player(x, y) {\n        this.position = { x: x, y: y };\n        this.velocity = velocity;\n        this.width = 30,\n            this.height = 30;\n        this.jumpHeight = jumpHeight;\n        this.floating = true;\n        this.blocks = { right: false, left: false };\n    }\n    Player.prototype.draw = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillStyle = \"red\";\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillRect(this.position.x, this.position.y, this.width, this.height);\n    };\n    Player.prototype.update = function () {\n        this.draw();\n        this.captureMovement();\n        this.checkCollisions();\n        if (this.position.y + this.height + this.velocity.y <= _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height) {\n            this.position.y += this.velocity.y;\n            this.velocity.y += _main__WEBPACK_IMPORTED_MODULE_0__.app.gravity;\n        }\n        else {\n            this.velocity.y = 0;\n            this.position.y = _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height - this.height;\n            this.floating = false;\n        }\n    };\n    Player.prototype.captureMovement = function () {\n        // right\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.right && !this.blocks.right) {\n            _main__WEBPACK_IMPORTED_MODULE_0__.app.renderer.playerAbstractionPos.x += this.velocity.x;\n            if (this.position.x < 450) { // move player\n                this.position.x += this.velocity.x;\n            }\n            else { // --- scroll view ---\n                for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n                    var platfrom = _a[_i];\n                    platfrom.position.x -= this.velocity.x;\n                }\n            }\n        }\n        // left\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.left && !this.blocks.left) {\n            _main__WEBPACK_IMPORTED_MODULE_0__.app.renderer.playerAbstractionPos.x -= this.velocity.x;\n            if (this.position.x > 100) {\n                this.position.x -= this.velocity.x;\n            }\n            else {\n                for (var _b = 0, _c = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _b < _c.length; _b++) {\n                    var platform = _c[_b];\n                    platform.position.x += this.velocity.x;\n                }\n            }\n        }\n        // jumping\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.up && !this.floating) {\n            this.floating = true;\n            var isCollision = false;\n            for (var _d = 0, _e = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _d < _e.length; _d++) {\n                var platform = _e[_d];\n                if (this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width && this.position.y - (this.jumpHeight * 2) <= platform.position.y + platform.height && this.position.y + this.height - this.jumpHeight >= platform.position.y) {\n                    this.position.y = platform.position.y + platform.height;\n                    isCollision = true;\n                }\n            }\n            if (!isCollision) {\n                this.velocity.y -= this.jumpHeight;\n            }\n        }\n    };\n    Player.prototype.checkCollisions = function () {\n        for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n            var platform = _a[_i];\n            // dropping down collision\n            if (this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {\n                this.velocity.y = 0;\n                this.floating = false;\n                // this.position.y = platform.height + platform.position.y - this.height\n            }\n            // console.log(this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width) // works\n            // console.log(this.position.y, platform.position.y + platform.height, this.velocity.y)\n            // bottom collision\n            // if (this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width && this.position.y <= platform.position.y + platform.height && this.position.y + this.height >= platform.position.y) {\n            //     this.velocity.y = 1\n            // }\n            // right collision\n            // right - works (sometimes bugs)\n            if (this.position.y <= platform.position.y && this.position.y + this.height >= platform.position.y + platform.height && this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width) {\n                this.blocks.right = true;\n            }\n            else {\n                this.blocks.right = false;\n            }\n            // left works, but blocks player perma\n            // if (this.position.y <= platform.position.y && this.position.y  + this.height >= platform.position.y + platform.height && this.position.x <= platform.position.x + platform.width  && this.position.x + this.width >= platform.position.x) {\n            //     this.blocks.left = true\n            // } else {\n            //     this.blocks.left = false\n            // }\n        }\n    };\n    return Player;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://fred/./src/classes/Player.ts?");

/***/ }),

/***/ "./src/classes/Renderer.ts":
/*!*********************************!*\
  !*** ./src/classes/Renderer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n/* harmony import */ var _Platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Platform */ \"./src/classes/Platform.ts\");\n\n\n// ___ Breakpoints ___\n// initial\n//\nvar Renderer = /** @class */ (function () {\n    function Renderer(x, y) {\n        this.playerAbstractionPos = { x: x, y: y };\n        this.currentBreakPoint = 0;\n        this.currentBreakPointRendered = false;\n        this.breakPoints = [\n            {\n                abstractionPos: { min: -200, max: 2000 },\n                reached: false,\n                // platforms: [ new Platform(250, 950), new Platform(300, 870), new Platform(200, 980) ]\n                platforms: [new _Platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](250, 920)]\n            },\n            {\n                abstractionPos: { min: 2000, max: 3000 },\n                reached: false,\n                platforms: []\n            }\n        ];\n    }\n    Renderer.prototype.updateGameObjects = function () {\n        for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n            var platform = _a[_i];\n            platform.draw();\n        }\n    };\n    Renderer.prototype.trackRendering = function () {\n        if (!this.currentBreakPointRendered) {\n            // TODO: delte current platforms and enemies\n            _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms = [];\n            this.currentBreakPointRendered = true;\n            this.breakPoints[this.currentBreakPoint].platforms.forEach(function (platform) {\n                _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms.push(platform);\n            });\n        }\n        // update rerendering phase (add new elements, delete previous)\n        if (this.playerAbstractionPos.x > this.breakPoints[this.currentBreakPoint].abstractionPos.max) {\n            this.currentBreakPoint += 1;\n        }\n        if (this.playerAbstractionPos.x < this.breakPoints[this.currentBreakPoint].abstractionPos.min) {\n            console.log(this.currentBreakPoint);\n            this.currentBreakPoint -= 1;\n        }\n    };\n    return Renderer;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Renderer);\n\n\n//# sourceURL=webpack://fred/./src/classes/Renderer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"gameObjects\": () => (/* binding */ gameObjects),\n/* harmony export */   \"pressedKeys\": () => (/* binding */ pressedKeys)\n/* harmony export */ });\n/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Player */ \"./src/classes/Player.ts\");\n/* harmony import */ var _classes_AudioManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/AudioManager */ \"./src/classes/AudioManager.ts\");\n/* harmony import */ var _classes_Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Renderer */ \"./src/classes/Renderer.ts\");\n\n\n\nvar canvas = document.getElementById(\"main\");\nvar audioManager = new _classes_AudioManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar playerStartPos = { x: 100, y: 100 };\nvar renderer = new _classes_Renderer__WEBPACK_IMPORTED_MODULE_2__[\"default\"](playerStartPos.x, playerStartPos.y);\nvar app = {\n    canvas: canvas,\n    c: canvas.getContext(\"2d\"),\n    canvasProps: {\n        width: window.innerWidth - 5,\n        height: window.innerHeight,\n        rerenderStep: 20 // higher = better performance\n    },\n    gravity: 3,\n    audioManager: audioManager,\n    renderer: renderer\n};\nvar pressedKeys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false\n};\nvar gameObjects = {\n    platforms: []\n};\nfunction startGame() {\n    // resize canvas\n    app.canvas.width = app.canvasProps.width;\n    app.canvas.height = app.canvasProps.height - 6;\n    // play background music\n    // app.audioManager.play()\n    // create player\n    var player = new _classes_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerStartPos.x, playerStartPos.y);\n    player.draw();\n    // animate game\n    function startAnim() {\n        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height);\n        player.update();\n        // initialize renderer (it will automatically render new objects and delte unnecessary ones)\n        renderer.trackRendering();\n        renderer.updateGameObjects();\n        setTimeout(function () {\n            requestAnimationFrame(startAnim);\n        }, app.canvasProps.rerenderStep);\n    }\n    startAnim();\n    // listen to keys pressed\n    window.onkeydown = function (e) { return recognizePressedKeys(e); };\n    window.onkeyup = function (e) { return unbindPressedKeys(e); };\n}\nfunction recognizePressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = true;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = true;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = true;\n    }\n}\nfunction unbindPressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = false;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = false;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = false;\n    }\n}\nstartGame();\n\n\n//# sourceURL=webpack://fred/./src/main.ts?");

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