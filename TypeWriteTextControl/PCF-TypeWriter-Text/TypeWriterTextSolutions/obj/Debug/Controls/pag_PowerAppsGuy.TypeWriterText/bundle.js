var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./TypeWriterTextControl/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./TypeWriterTextControl/index.ts":
/*!****************************************!*\
  !*** ./TypeWriterTextControl/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar TypeWriterText =\n/** @class */\nfunction () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function TypeWriterText() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  TypeWriterText.prototype.init = function (context, notifyOutputChanged, state, container) {\n    // Add control initialization code\n    this.controlId = Random.newString();\n    this.svgContent = \"<svg viewBox='0 0 500 30'><path id='a8bd933df1160a92d3e2149af913d542path'><animate attributeName='d' from='m0,110 h0' to='m0,110 h1100' dur='6' begin='0s' repeatCount='indefinite'></animate></path><text><textPath xlink:href='#a8bd933df1160a92d3e2149af913d542path' style='fill: black; font-size: 30px; font-family:&quot;courier&quot;; font-weight: 400; letter-spacing: undefinedpx;'>Text with typewriter effect</textPath></text></svg>\"; // Need to track container resize so that control could get the available width. The available height won't be provided even this is true\n\n    context.mode.trackContainerResize(true);\n    this.svgContainer = document.createElement('div');\n    this.svgContainer.setAttribute('id', this.controlId);\n    this.svgContainer.innerHTML = this.svgContent;\n    container.appendChild(this.svgContainer);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  TypeWriterText.prototype.updateView = function (context) {\n    // Add code to update control view\n    if (context.parameters.text != null) {\n      if (context.parameters.text.raw != null) this.text = context.parameters.text.raw.toString();\n    }\n\n    if (context.parameters.color != null) {\n      if (context.parameters.color.raw != null) this.color = context.parameters.color.raw.toString();\n    }\n\n    if (context.parameters.font != null) {\n      if (context.parameters.font.raw != null) this.font = context.parameters.font.raw.toString();\n    }\n\n    if (context.parameters.fontsize != null) {\n      if (context.parameters.fontsize.raw != null) this.fontsize = context.parameters.fontsize.raw;\n    }\n\n    if (context.parameters.fontweight != null) {\n      if (context.parameters.fontweight.raw != null) this.fontweight = context.parameters.fontweight.raw;\n    }\n\n    if (context.parameters.spacing != null) {\n      if (context.parameters.spacing.raw != null) this.spacing = context.parameters.spacing.raw;\n    }\n\n    if (context.parameters.duration != null) {\n      if (context.parameters.duration.raw != null) this.duration = context.parameters.duration.raw;\n    }\n\n    if (context.parameters.repeat != null) {\n      if (context.parameters.repeat.raw != null) this.repeat = context.parameters.repeat.raw;\n    }\n\n    this.svgContent = this.configureText(this.text, this.color, this.font, this.fontsize, this.fontweight, this.spacing, this.duration, this.repeat);\n    this.svgContainer.innerHTML = this.svgContent;\n  }; // configure the svg element according to input\t\n\n\n  TypeWriterText.prototype.configureText = function (text, color, font, fontsize, fontweight, spacing, duration, repeat) {\n    if (font.indexOf(\" \") > -1) {\n      font = \"\\\"\" + font + \"\\\"\";\n    }\n\n    var randomString = Random.newString();\n    var svgstring = \"<svg viewBox='0 0 500 \" + fontsize * 1.2 + \"'>\" + \"<path id='\" + randomString + \"path'>\" + \"<animate attributeName='d' from='m0,110 h0' to='m0,110 h1100' dur='\" + duration + \"' begin='0s' repeatCount='\" + repeat + \"'/>\" + \"</path>\" + \"<text >\" + \"<textPath xlink:href='#\" + randomString + \"path' style='fill: \" + color + \"; font-size: \" + fontsize + \"px; font-family:\\\"\" + font + \"\\\"; font-weight: \" + fontweight + \"; letter-spacing: \" + spacing + \"px;'>\" + text + \"</textPath>\" + \"</text>\" + \"</svg>\";\n    return svgstring;\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  TypeWriterText.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  TypeWriterText.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  return TypeWriterText;\n}();\n\nexports.TypeWriterText = TypeWriterText;\n\nvar Random =\n/** @class */\nfunction () {\n  function Random() {}\n\n  Random.newString = function () {\n    return 'axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n      var r = Math.random() * 16 | 0,\n          v = c == 'x' ? r : r & 0x3 | 0x8;\n      return v.toString(16);\n    });\n  };\n\n  return Random;\n}();\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./TypeWriterTextControl/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('PowerAppsGuy.TypeWriterText', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.TypeWriterText);
} else {
	var PowerAppsGuy = PowerAppsGuy || {};
	PowerAppsGuy.TypeWriterText = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.TypeWriterText;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}