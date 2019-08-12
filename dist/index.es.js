import { useState, useEffect } from 'react';
import equal from 'fast-deep-equal';
import produce from 'immer';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function useMount(mount) {
    useEffect(mount, []);
}
function useUnmount(unmount) {
    useEffect(function () { return function () {
        if (unmount)
            unmount();
    }; }, []);
}
var identify = function (arg) { return arg; };
function createAction(type) {
    return function (fn) {
        if (fn === void 0) { fn = identify; }
        return function (params) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return {
                type: type,
                payload: fn.apply(void 0, [params].concat(args)),
            };
        };
    };
}
function createStore(opt) {
    var storeState = opt.state;
    var updaters = [];
    function useStore(selector) {
        var _a = useState(function () { return selector(storeState); }), state = _a[0], setState = _a[1];
        var update = function (set, oldState, nextState) {
            var shouldUpdate = !equal(selector(oldState), selector(nextState));
            if (shouldUpdate) {
                set(function () { return selector(nextState); });
            }
        };
        var updater = {
            update: update,
            set: setState,
        };
        useMount(function () {
            updaters.push(updater);
        });
        useUnmount(function () {
            updaters.splice(updaters.indexOf(updater), 1);
        });
        return state;
    }
    function getState(selector) {
        return selector(storeState);
    }
    function dispatch(action) {
        return __awaiter(this, void 0, void 0, function () {
            var result, actionName, actionPayload, reducer_1, nextState_1, oldState_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actionName = action.type;
                        actionPayload = action.payload;
                        if (!(opt.effects && opt.effects[actionName])) return [3 /*break*/, 2];
                        return [4 /*yield*/, opt.effects[actionName](actionPayload)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        if (!updaters.length)
                            return [2 /*return*/];
                        if (!action)
                            return [2 /*return*/, null];
                        if (opt.reducers) {
                            reducer_1 = opt.reducers[actionName];
                            if (reducer_1) {
                                nextState_1 = produce(storeState, function (draft) {
                                    result = reducer_1(draft, actionPayload);
                                });
                                oldState_1 = storeState;
                                storeState = nextState_1;
                                updaters.forEach(function (updater) {
                                    updater.update(updater.set, oldState_1, nextState_1);
                                });
                            }
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return { useStore: useStore, dispatch: dispatch, getState: getState };
}

export { createAction, createStore };
//# sourceMappingURL=index.es.js.map
