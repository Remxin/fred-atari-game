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

/***/ "./src/classes/ImageMapper.ts":
/*!************************************!*\
  !*** ./src/classes/ImageMapper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ImageMapper = /** @class */ (function () {\n    function ImageMapper() {\n    }\n    var _a;\n    _a = ImageMapper;\n    ImageMapper.imageMap = {\n        \"0\": \"../../img/numbers/0.png\",\n        \"1\": \"../../img/numbers/1.png\",\n        \"2\": \"../../img/numbers/2.png\",\n        \"3\": \"../../img/numbers/3.png\",\n        \"4\": \"../../img/numbers/4.png\",\n        \"5\": \"../../img/numbers/5.png\",\n        \"6\": \"../../img/numbers/6.png\",\n        \"7\": \"../../img/numbers/7.png\",\n        \"8\": \"../../img/numbers/8.png\",\n        \"9\": \"../../img/numbers/9.png\",\n        \"stone\": \"../../img/stone.gif\",\n        \"life\": \"../../img/fred-life.png\",\n        \"item placeholder\": \"../../img/item-placeholder.png\",\n        \"stone stack\": \"../../img/stone-stack.png\",\n        \"hat\": \"../../img/hat.png\",\n        \"shield\": \"../../img/shield.png\",\n        \"oxygen\": \"../../img/oxygen-game.png\",\n    };\n    ImageMapper.getImage = function (key) {\n        return _a.imageMap[key];\n    };\n    return ImageMapper;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageMapper);\n\n\n//# sourceURL=webpack://fred/./src/classes/ImageMapper.ts?");

/***/ }),

/***/ "./src/classes/InformationManager.ts":
/*!*******************************************!*\
  !*** ./src/classes/InformationManager.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ImageMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageMapper */ \"./src/classes/ImageMapper.ts\");\n\nvar playerContext = {\n    mapSize: { min: -300, max: 2000 },\n    currentRunPoints: 0,\n    currentPoints: 0,\n    bag: [],\n    oxygen: { current: 0, max: 40, maxHeight: 85 },\n    lives: { current: 5, max: 8 },\n    stones: { current: 9, max: 10 },\n    scoreLen: 6,\n};\nvar InformationManager = /** @class */ (function () {\n    function InformationManager() {\n        this.playerPosIndex = { div: document.getElementById(\"player-on-map\"), min: playerContext.mapSize.min, max: playerContext.mapSize.max };\n        this.runScore = { div: document.getElementById('run-score'), value: playerContext.currentRunPoints };\n        this.totalScore = { div: document.getElementById(\"total-score\"), value: playerContext.currentPoints };\n        this.stones = { div: document.getElementById(\"stones\"), value: playerContext.stones.current, max: playerContext.stones.max },\n            this.lives = { div: document.getElementById(\"lives\"), value: playerContext.lives.current, max: playerContext.lives.max };\n        this.oxygen = { div: document.getElementById(\"bottle-fill\"), value: playerContext.oxygen.current, max: playerContext.oxygen.max };\n        this.bag = { div: document.getElementById(\"bag\"), items: [], maxLen: 8 };\n    }\n    InformationManager.prototype.watchAndUpdatePlayerPos = function (currentPos) {\n        var finishPercentage = Math.round(currentPos / (this.playerPosIndex.max - this.playerPosIndex.min) * 100);\n        this.playerPosIndex.div.style.left = finishPercentage + \"%\";\n    };\n    InformationManager.prototype.addScorePoints = function (updateQuantity) {\n        var _this = this;\n        this.runScore.value += updateQuantity;\n        this.totalScore.value += updateQuantity;\n        this.runScore.div.innerHTML = \"\";\n        this.totalScore.div.innerHTML = \"\";\n        var scoreStr = { run: this.runScore.value + \"\", total: this.totalScore.value + \"\" };\n        var blankZeros = { run: playerContext.scoreLen - scoreStr.run.length, total: playerContext.scoreLen - scoreStr.total.length };\n        console.log(blankZeros);\n        Object.values(blankZeros).forEach(function (blankZero, index) {\n            for (var i = 0; i < blankZero; i++) {\n                var img = document.createElement(\"img\");\n                img.alt = \"score zero\";\n                img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(\"0\");\n                if (index === 0) {\n                    _this.runScore.div.appendChild(img);\n                }\n                else {\n                    _this.totalScore.div.appendChild(img);\n                }\n            }\n        });\n        Object.values(scoreStr).forEach(function (score, index) {\n            for (var _i = 0, score_1 = score; _i < score_1.length; _i++) {\n                var char = score_1[_i];\n                var img = document.createElement(\"img\");\n                img.alt = \"score \" + char;\n                img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(char);\n                if (index === 0) {\n                    _this.runScore.div.appendChild(img);\n                }\n                else {\n                    _this.totalScore.div.appendChild(img);\n                }\n            }\n        });\n    };\n    InformationManager.prototype.resetRunScore = function () {\n        this.runScore.div.innerHTML = \"\";\n        this.runScore.value = 0;\n        for (var i = 0; i < 6; i++) {\n            var img = document.createElement(\"img\");\n            img.alt = \"score zero\";\n            img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(\"0\");\n            this.runScore.div.appendChild(img);\n        }\n    };\n    InformationManager.prototype.updateOxygen = function (newOxygenValue) {\n        this.oxygen.value = newOxygenValue;\n        var fullPercentageFloat = Math.round((newOxygenValue / playerContext.oxygen.max) * 100) / 100;\n        var height = Math.round(fullPercentageFloat * playerContext.oxygen.maxHeight);\n        this.oxygen.\n            div.style.height = height + \"px\";\n    };\n    InformationManager.prototype.updateStones = function (newStoneValue) {\n        this.stones.value = newStoneValue;\n        for (var i = 0; i < newStoneValue; i++) {\n            var img = document.createElement(\"img\");\n            img.alt = \"stone image\";\n            img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(\"stone\");\n            var isEven = i % 2 === 0;\n            if (isEven) {\n                img.style.top = \"30px\";\n            }\n            this.stones.div.appendChild(img);\n        }\n    };\n    InformationManager.prototype.updateLives = function (newLivesValue) {\n        this.lives.value = newLivesValue;\n        for (var i = 0; i < newLivesValue; i++) {\n            var img = document.createElement(\"img\");\n            img.alt = \"life image\";\n            img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(\"life\");\n            this.lives.div.appendChild(img);\n        }\n    };\n    InformationManager.prototype.showItems = function () {\n        var blankItems = this.bag.maxLen - this.bag.items.length;\n        for (var _i = 0, _a = this.bag.items; _i < _a.length; _i++) {\n            var item = _a[_i];\n            var img = document.createElement(\"img\");\n            img.alt = \"item image\";\n            img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(item.name);\n            this.bag.div.appendChild(img);\n        }\n        for (var i = 0; i < blankItems; i++) {\n            var img = document.createElement(\"img\");\n            img.alt = \"item placeholder\";\n            img.src = _ImageMapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(\"item placeholder\");\n            this.bag.div.appendChild(img);\n        }\n    };\n    InformationManager.prototype.resetItems = function () {\n        this.bag.items = [];\n        this.showItems();\n    };\n    InformationManager.prototype.addItem = function (item) {\n        this.bag.items.push(item);\n        this.showItems();\n    };\n    InformationManager.prototype.deleteItem = function (deletedItem) {\n        var itemIndex = this.bag.items.findIndex(function (item) { return item.name === deletedItem.name; });\n        if (itemIndex === -1)\n            throw new Error(\"Item index out of range (please check deleteItem function at renderer)\");\n        this.bag.items.splice(itemIndex, 1); // deleting item from bag\n        this.showItems();\n    };\n    return InformationManager;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InformationManager);\n\n\n//# sourceURL=webpack://fred/./src/classes/InformationManager.ts?");

/***/ }),

/***/ "./src/classes/Platform.ts":
/*!*********************************!*\
  !*** ./src/classes/Platform.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n\nvar Platform = /** @class */ (function () {\n    function Platform(x, y) {\n        this.position = {\n            x: x,\n            y: _main__WEBPACK_IMPORTED_MODULE_0__.canvasProps.height - y\n        };\n        this.width = 200;\n        this.height = 20;\n    }\n    Platform.prototype.draw = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillStyle = \"blue\";\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillRect(this.position.x, this.position.y, this.width, this.height);\n    };\n    return Platform;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Platform);\n\n\n//# sourceURL=webpack://fred/./src/classes/Platform.ts?");

/***/ }),

/***/ "./src/classes/Player.ts":
/*!*******************************!*\
  !*** ./src/classes/Player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n\n// CONSTANTS \nvar jumpHeight = 30;\nvar velocity = { x: 5, y: 1 };\nvar Player = /** @class */ (function () {\n    function Player(x, y) {\n        this.position = { x: x, y: y };\n        this.velocity = velocity;\n        this.width = 30,\n            this.height = 30;\n        this.jumpHeight = jumpHeight;\n        this.floating = true;\n    }\n    Player.prototype.draw = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillStyle = \"red\";\n        _main__WEBPACK_IMPORTED_MODULE_0__.app.c.fillRect(this.position.x, this.position.y, this.width, this.height);\n    };\n    Player.prototype.update = function () {\n        this.draw();\n        this.captureMovement();\n        this.checkCollisions();\n        if (this.position.y + this.height + this.velocity.y <= _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height) {\n            this.position.y += this.velocity.y;\n            this.velocity.y += _main__WEBPACK_IMPORTED_MODULE_0__.app.gravity;\n        }\n        else {\n            this.velocity.y = 0;\n            this.position.y = _main__WEBPACK_IMPORTED_MODULE_0__.app.canvas.height - this.height;\n            this.floating = false;\n        }\n    };\n    Player.prototype.captureMovement = function () {\n        // right\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.right) {\n            var isCollision = false;\n            for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n                var platform = _a[_i];\n                if (this.position.x + this.width + this.velocity.x > platform.position.x && this.position.x < platform.position.x + platform.width && this.position.y <= platform.position.y && this.position.y + this.height >= platform.position.y + platform.height) {\n                    isCollision = true;\n                    this.position.x = platform.position.x - this.width;\n                    break;\n                }\n            }\n            // if no collision\n            if (!isCollision) {\n                _main__WEBPACK_IMPORTED_MODULE_0__.app.renderer.playerAbstractionPos.x += this.velocity.x;\n                if (this.position.x < 450) { // move player\n                    this.position.x += this.velocity.x;\n                }\n                else { // --- scroll view ---\n                    for (var _b = 0, _c = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _b < _c.length; _b++) {\n                        var platfrom = _c[_b];\n                        platfrom.position.x -= this.velocity.x;\n                    }\n                }\n            }\n        }\n        // left\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.left) {\n            var isCollision = false;\n            for (var _d = 0, _e = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _d < _e.length; _d++) {\n                var platform = _e[_d];\n                if (this.position.x - this.velocity.x < platform.position.x + platform.width && this.position.x + this.width > platform.position.x && this.position.y <= platform.position.y && this.position.y + this.height >= platform.position.y + platform.height) {\n                    this.position.x = platform.position.x + platform.width;\n                    isCollision = true;\n                    break;\n                }\n            }\n            if (!isCollision) {\n                _main__WEBPACK_IMPORTED_MODULE_0__.app.renderer.playerAbstractionPos.x -= this.velocity.x;\n                if (this.position.x > 100) {\n                    this.position.x -= this.velocity.x;\n                }\n                else {\n                    for (var _f = 0, _g = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _f < _g.length; _f++) {\n                        var platform = _g[_f];\n                        platform.position.x += this.velocity.x;\n                    }\n                }\n            }\n        }\n        // jumping\n        if (_main__WEBPACK_IMPORTED_MODULE_0__.pressedKeys.up && !this.floating) {\n            this.floating = true;\n            this.velocity.y -= this.jumpHeight;\n        }\n    };\n    Player.prototype.checkCollisions = function () {\n        for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n            var platform = _a[_i];\n            // dropping down collision \n            if (this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {\n                this.velocity.y = 0;\n                this.floating = false;\n                // this.position.y = platform.height + platform.position.y - this.height\n            }\n            // bottom collision \n            if (this.position.y + this.velocity.y < platform.position.y + platform.height && this.position.y + this.height > platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {\n                this.position.y = platform.position.y + platform.height;\n                this.velocity.y = 1;\n            }\n        }\n    };\n    return Player;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://fred/./src/classes/Player.ts?");

/***/ }),

/***/ "./src/classes/Renderer.ts":
/*!*********************************!*\
  !*** ./src/classes/Renderer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main.ts\");\n/* harmony import */ var _Platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Platform */ \"./src/classes/Platform.ts\");\n\n\n// ___ Breakpoints ___\n// initial\n//\nvar Renderer = /** @class */ (function () {\n    function Renderer(x, y) {\n        this.playerAbstractionPos = { x: x, y: y };\n        this.currentBreakPoint = 0;\n        this.currentBreakPointRendered = false;\n        this.breakPoints = [\n            {\n                abstractionPos: { min: -200, max: 2000 },\n                reached: false,\n                // platforms: [ new Platform(200, 980), new Platform(250, 950), new Platform(300, 870) ]\n                platforms: [new _Platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](250, 100), new _Platform__WEBPACK_IMPORTED_MODULE_1__[\"default\"](320, 200)]\n            },\n            {\n                abstractionPos: { min: 2000, max: 3000 },\n                reached: false,\n                platforms: []\n            }\n        ];\n    }\n    Renderer.prototype.updateGameObjects = function () {\n        for (var _i = 0, _a = _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms; _i < _a.length; _i++) {\n            var platform = _a[_i];\n            platform.draw();\n        }\n        this.updateInformations();\n    };\n    Renderer.prototype.trackRendering = function () {\n        if (!this.currentBreakPointRendered) {\n            // TODO: delte current platforms and enemies\n            _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms = [];\n            this.currentBreakPointRendered = true;\n            this.breakPoints[this.currentBreakPoint].platforms.forEach(function (platform) {\n                _main__WEBPACK_IMPORTED_MODULE_0__.gameObjects.platforms.push(platform);\n            });\n        }\n        // update rerendering phase (add new elements, delete previous)\n        if (this.playerAbstractionPos.x > this.breakPoints[this.currentBreakPoint].abstractionPos.max) {\n            this.currentBreakPoint += 1;\n        }\n        if (this.playerAbstractionPos.x < this.breakPoints[this.currentBreakPoint].abstractionPos.min) {\n            console.log(this.currentBreakPoint);\n            this.currentBreakPoint -= 1;\n        }\n    };\n    Renderer.prototype.updateInformations = function () {\n        _main__WEBPACK_IMPORTED_MODULE_0__.informationManager.watchAndUpdatePlayerPos(this.playerAbstractionPos.x);\n    };\n    return Renderer;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Renderer);\n\n\n//# sourceURL=webpack://fred/./src/classes/Renderer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"canvasProps\": () => (/* binding */ canvasProps),\n/* harmony export */   \"gameObjects\": () => (/* binding */ gameObjects),\n/* harmony export */   \"informationManager\": () => (/* binding */ informationManager),\n/* harmony export */   \"pressedKeys\": () => (/* binding */ pressedKeys),\n/* harmony export */   \"renderer\": () => (/* binding */ renderer)\n/* harmony export */ });\n/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Player */ \"./src/classes/Player.ts\");\n/* harmony import */ var _classes_AudioManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/AudioManager */ \"./src/classes/AudioManager.ts\");\n/* harmony import */ var _classes_Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Renderer */ \"./src/classes/Renderer.ts\");\n/* harmony import */ var _classes_InformationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/InformationManager */ \"./src/classes/InformationManager.ts\");\n\n\n\n\nvar canvas = document.getElementById(\"main\");\nvar audioManager = new _classes_AudioManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar playerStartPos = { x: 100, y: 100 };\nvar canvasProps = {\n    width: window.innerWidth - 5,\n    height: window.innerHeight - 250,\n    rerenderStep: 20 // higher = better performance\n};\nvar renderer = new _classes_Renderer__WEBPACK_IMPORTED_MODULE_2__[\"default\"](playerStartPos.x, playerStartPos.y);\nvar informationManager = new _classes_InformationManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nvar app = {\n    canvas: canvas,\n    c: canvas.getContext(\"2d\"),\n    canvasProps: canvasProps,\n    gravity: 2,\n    audioManager: audioManager,\n    renderer: renderer,\n    informationManager: informationManager\n};\nvar pressedKeys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false,\n    f: false\n};\nvar gameObjects = {\n    platforms: []\n};\nfunction startGame() {\n    // resize canvas\n    app.canvas.width = app.canvasProps.width;\n    app.canvas.height = app.canvasProps.height - 6;\n    // play background music\n    // app.audioManager.play()\n    // create player\n    var player = new _classes_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerStartPos.x, playerStartPos.y);\n    player.draw();\n    // show bottom data\n    informationManager.addScorePoints(1);\n    informationManager.updateOxygen(0);\n    informationManager.updateStones(9);\n    informationManager.updateLives(5);\n    informationManager.resetItems();\n    // animate game\n    function startAnim() {\n        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height);\n        player.update();\n        // initialize renderer (it will automatically render new objects and delte unnecessary ones)\n        renderer.trackRendering();\n        renderer.updateGameObjects();\n        setTimeout(function () {\n            requestAnimationFrame(startAnim);\n        }, app.canvasProps.rerenderStep);\n    }\n    startAnim();\n    // listen to keys pressed\n    window.onkeydown = function (e) { return recognizePressedKeys(e); };\n    window.onkeyup = function (e) { return unbindPressedKeys(e); };\n}\nfunction recognizePressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = true;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = true;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = true;\n    }\n    if (e.key === \"f\") {\n        pressedKeys.f = true;\n    }\n}\nfunction unbindPressedKeys(e) {\n    if (e.key === \"ArrowRight\" || e.key === \"d\") {\n        pressedKeys.right = false;\n    }\n    if (e.key === \"ArrowLeft\" || e.key === \"a\") {\n        pressedKeys.left = false;\n    }\n    if (e.key === \"ArrowUp\" || e.key === \"w\") {\n        pressedKeys.up = false;\n    }\n    if (e.key === \"f\") {\n        pressedKeys.f = false;\n    }\n}\nstartGame();\n\n\n//# sourceURL=webpack://fred/./src/main.ts?");

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