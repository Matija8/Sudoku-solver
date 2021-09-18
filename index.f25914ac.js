// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1n2s4":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "14af57c2f25914ac";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1yGwE":[function(require,module,exports) {
var _sudokuController = require("./Controller/sudoku-controller");
const main = function appendSudokuGameToRoot(rootId = 'root') {
    const root = document.getElementById(rootId);
    if (!root) {
        console.error(`Couldn't get the root element for the sudoku board.`);
        return;
    }
    const sudoku = new _sudokuController.Sudoku(root);
    document.addEventListener('keypress', (event)=>{
        if (event.key === 't') console.table(sudoku.matrixValue);
    });
};
main();

},{"./Controller/sudoku-controller":"h7E3s"}],"h7E3s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sudoku", ()=>Sudoku
);
var _sudokuCell = require("../Model/sudokuCell");
var _sudokuView = require("../View/sudokuView");
var _cellValidator = require("./cell-validator");
class Sudoku {
    constructor(root){
        this.addEventListenersToCell = (row, col, cell)=>{
            cell.addEventListener('keydown', (event)=>{
                event.preventDefault();
                const setDOMValue = (newVal)=>event.target.value = newVal
                ;
                const cell1 = this.getCellByRowCol(row, col);
                const val = Number(event.key);
                const isValidNumber = 1 <= val && val <= 9;
                if (isValidNumber) {
                    this.trySetCellValue(cell1, val) && setDOMValue(String(val));
                    return;
                }
                if ([
                    'Backspace',
                    'Delete',
                    'x'
                ].includes(event.key)) this.trySetCellValue(cell1, null) && setDOMValue('');
            });
        };
        this.addGlobalKeyPressListeners = ()=>{
            document.addEventListener('keydown', (event)=>{
                if (event.key === 'c') this.updateCellValidityView();
            });
        };
        const { DOMmatrix , sudokuDOM , checkBtn  } = _sudokuView.createDOM();
        this.matrix = Sudoku.createMatrix(DOMmatrix);
        this.cellValidator = new _cellValidator.CellValidator(this.matrix);
        root.appendChild(sudokuDOM);
        // TODO: Added removing from root!?
        // TODO: Add new game/clear.
        for(let row1 = 0; row1 < 9; row1++)for(let col1 = 0; col1 < 9; col1++)this.addEventListenersToCell(row1, col1, DOMmatrix[row1][col1]);
        // TODO: remove listeners on close.
        const clickCheckBtn = ()=>{
            this.updateCellValidityView();
        };
        checkBtn.addEventListener('click', clickCheckBtn);
        this.addGlobalKeyPressListeners();
    }
    get matrixValue() {
        const matrixValues = [];
        for(let i = 0; i < this.matrix.length; i++)matrixValues[i] = this.matrix[i].map((cell)=>cell.val
        );
        return matrixValues;
    }
    static createMatrix(DOMMatrix) {
        const matrix = [];
        for(let i = 0; i < 9; i++){
            matrix[i] = [];
            for(let j = 0; j < 9; j++)matrix[i][j] = new _sudokuCell.SudokuCell({
                DOMElement: DOMMatrix[i][j]
            });
        }
        return matrix;
    }
    updateCellValidityView() {
        const invalidCells = this.getInvalidCells();
        for (const cell of this.getAllCells())cell.isCorrect = !invalidCells.has(cell);
    }
    clearCellValidityView() {
        this.getAllCells().forEach((cell)=>{
            cell.isCorrect = true;
        });
    }
    getCellByRowCol(row, col) {
        return this.matrix[row][col];
    }
    getAllCells() {
        const cells = [];
        for (const row2 of this.matrix)for (const cell of row2)cells.push(cell);
        return cells;
    }
    trySetCellValue(cell, val) {
        this.clearCellValidityView();
        if (_sudokuCell.isSudokuValue(val)) {
            cell.val = val;
            if (this.checkWin()) // TODO: Do something on victory!
            alert('Yo win!');
            return true;
        }
        return false;
    }
    checkWin() {
        return this.checkIfAllCellsAreFilled() && this.getInvalidCells().size === 0;
    }
    checkIfAllCellsAreFilled() {
        return this.getAllCells().every((cell)=>cell.val !== null
        );
    }
    getInvalidCells() {
        return this.cellValidator.getInvalidCells();
    }
}

},{"../Model/sudokuCell":"9tC0o","../View/sudokuView":"74Mhi","./cell-validator":"3UKlX","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"9tC0o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isSudokuValue", ()=>isSudokuValue
);
parcelHelpers.export(exports, "SudokuCell", ()=>SudokuCell
);
var _cellView = require("../View/CellView");
const isSudokuValue = function isValidSudokuCellValue(n) {
    return [
        null,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ].includes(n);
};
class SudokuCell {
    constructor({ readOnly =false , val =null , DOMElement  }){
        this._isCorrect = true;
        this._val = val;
        this._readOnly = readOnly;
        console.assert(!!DOMElement, 'DOM element falsy!');
        this._DOMElement = DOMElement;
        this._view = new _cellView.CellView(DOMElement);
    }
    get isCorrect() {
        return this._isCorrect;
    }
    set isCorrect(correct) {
        this._isCorrect = correct;
        this._view.isCorrect = correct;
    }
    get val() {
        return this._val;
    }
    set val(newVal) {
        if (newVal === this._val || this._readOnly) return;
        this._val = newVal;
        const DOMText = newVal === null ? '' : String(newVal);
        this._DOMElement.innerHTML = DOMText;
    }
}

},{"../View/CellView":"8eOab","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"8eOab":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CellView", ()=>CellView
);
class CellView {
    constructor(_DOMElement){
        this._DOMElement = _DOMElement;
        this.isCorrect = true;
    }
    set isCorrect(correct) {
        if (!correct) this._DOMElement.classList.add('invalid-cell');
        else this._DOMElement.classList.remove('invalid-cell');
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"JacNc":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"74Mhi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createDOM", ()=>createDOM
);
const createDOM = function createSudokuDOMView() {
    const sudokuDOM = document.createElement('div');
    sudokuDOM.classList.add('sudoku-DOM');
    const { sudokuTable , DOMmatrix  } = makeTable();
    sudokuDOM.appendChild(sudokuTable);
    const checkBtn = makeCheckButton();
    sudokuDOM.appendChild(checkBtn);
    // TODO: add solve logic.
    // const solveBtn = makeSolveButton();
    // sudokuDOM.appendChild(solveBtn);
    return {
        DOMmatrix,
        sudokuDOM,
        checkBtn
    };
};
const makeTable = ()=>{
    const sudokuTable = document.createElement('div');
    sudokuTable.classList.add('sudoku-table');
    const DOMmatrix = [];
    for(let i = 0; i < 9; i++){
        const sudokuRow = document.createElement('div');
        sudokuRow.classList.add('sudoku-row');
        sudokuTable.appendChild(sudokuRow);
        DOMmatrix[i] = [];
        for(let j = 0; j < 9; j++){
            const sudokuCell = makeSudokuCell(i, j);
            sudokuRow.appendChild(sudokuCell);
            DOMmatrix[i][j] = sudokuCell;
        }
    }
    return {
        sudokuTable,
        DOMmatrix
    };
};
const makeSudokuCell = function makeSudokuCellDOMElement(i, j) {
    const sudokuCell = document.createElement('input');
    sudokuCell.type = 'number';
    sudokuCell.maxLength = 1;
    sudokuCell.style.caretColor = 'transparent';
    sudokuCell.classList.add('sudoku-cell');
    addCellBorder(sudokuCell, i, j);
    sudokuCell.setAttribute('tabindex', '-1');
    return sudokuCell;
};
const addCellBorder = function AddedBorderCssClasses(cellDOM, row, col) {
    if (col % 3 === 0) cellDOM.classList.add('strong-border-left');
    if (col === 8) cellDOM.classList.add('strong-border-right');
    if (row % 3 === 0) cellDOM.classList.add('strong-border-above');
    if (row === 8) cellDOM.classList.add('strong-border-below');
};
const makeCheckButton = ()=>{
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = 'Check';
    checkBtn.classList.add('button', 'button-primary');
    return checkBtn;
};
const makeSolveButton = ()=>{
    const solveBtn = document.createElement('button');
    solveBtn.classList.add('button', 'button-danger');
    solveBtn.innerHTML = 'Solve';
    return solveBtn;
}; // TODO: Add undo and redo buttons (Command pattern).

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"3UKlX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CellValidator", ()=>CellValidator
);
class CellValidator {
    constructor(matrix){
        this.matrix = matrix;
    }
    getInvalidCells() {
        const invalidCells = new Set();
        for(let i = 0; i < 9; i++){
            for (const cell of this.getInvalidCellsFromRow(i))invalidCells.add(cell);
            for (const cell1 of this.getInvalidCellsFromCol(i))invalidCells.add(cell1);
        }
        for(let i1 = 0; i1 < 3; i1++){
            for(let j = 0; j < 3; j++)for (const cell of this.getInvalidCellsFromSquare(i1, j))invalidCells.add(cell);
        }
        return invalidCells;
    }
    getInvalidCellsFromRow(row) {
        console.assert(0 <= row && row < 9, 'Row number is invalid.');
        return CellValidator.invalidCellsFromArray(this.matrix[row]);
    }
    getInvalidCellsFromCol(col) {
        console.assert(0 <= col && col < 9, 'Col number is invalid.');
        const cells = [];
        for(let row = 0; row < 9; row++)cells.push(this.matrix[row][col]);
        return CellValidator.invalidCellsFromArray(cells);
    }
    getInvalidCellsFromSquare(xAxis, yAxis) {
        const cells = [];
        for(let row = 0 + 3 * yAxis; row < 3 + 3 * yAxis; row++)for(let col = 0 + 3 * xAxis; col < 3 + 3 * xAxis; col++)cells.push(this.matrix[row][col]);
        return CellValidator.invalidCellsFromArray(cells);
    }
    static invalidCellsFromArray(cells) {
        const invalidCells = new Set();
        const repeated = new Set();
        const vals = new Set();
        for (const val of cells.map((cell)=>cell.val
        )){
            if (val === null) continue;
            if (vals.has(val)) repeated.add(val);
            vals.add(val);
        }
        for (const cell of cells){
            if (cell.val === null) continue;
            if (repeated.has(cell.val)) invalidCells.add(cell);
        }
        return invalidCells;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}]},["1n2s4","1yGwE"], "1yGwE", "parcelRequireb724")

//# sourceMappingURL=index.f25914ac.js.map
