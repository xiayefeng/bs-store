import LZString from 'lz-string';
var BsStore = /** @class */ (function () {
    function BsStore() {
        this.compress = false;
    }
    Object.defineProperty(BsStore.prototype, "pressState", {
        get: function () {
            return this.compress;
        },
        set: function (state) {
            if (this.compress) {
                console.warn('pressState on set once');
                return;
            }
            this.compress = state;
        },
        enumerable: true,
        configurable: true
    });
    BsStore.prototype.getSession = function (key) {
        if (typeof key !== 'string') {
            throw new Error('params must be string');
        }
        var val = this.getItem(key);
        if (val === null) {
            console.log("no exist such " + key + " sessionStorage");
            return null;
        }
        return this.getValue(val);
    };
    BsStore.prototype.getValue = function (val) {
        try {
            var parseVal = JSON.parse(val);
            parseVal = this.checkStr(parseVal);
            parseVal = this.checkNaN(parseVal);
            parseVal = this.checkBigInt(parseVal);
            return parseVal;
        }
        catch (err) {
            return val;
        }
    };
    BsStore.prototype.getLocal = function (key) {
        if (typeof key !== 'string') {
            throw new Error('params must be string');
        }
        var val = this.getItem(key, 2);
        if (val === null) {
            console.log("no exist such " + key + " \u7684localStorage");
            return null;
        }
        return this.getValue(val);
    };
    BsStore.prototype.setSession = function (key, val) {
        this.setItem(key, val);
    };
    BsStore.prototype.setLocal = function (key, val) {
        this.setItem(key, val, 2);
    };
    BsStore.prototype.removeSession = function (key) {
        this.removeItem(key);
    };
    BsStore.prototype.removeLocal = function (key) {
        this.removeItem(key, 2);
    };
    BsStore.prototype.removeAllSession = function () {
        this.removeAll();
    };
    BsStore.prototype.removeAllLocal = function () {
        this.removeAll(2);
    };
    BsStore.prototype.removeAllStorage = function () {
        this.removeAll(3);
    };
    BsStore.prototype.getItem = function (key, lx) {
        if (lx === void 0) { lx = 1; }
        var val = null;
        if (lx === 1) {
            val = sessionStorage.getItem(key);
        }
        else if (lx === 2) {
            val = localStorage.getItem(key);
        }
        if (val === null)
            return val;
        if (this.compress) {
            val = LZString.decompress(val);
        }
        return val;
    };
    BsStore.prototype.setItem = function (key, val, lx) {
        if (lx === void 0) { lx = 1; }
        if (typeof key !== 'string') {
            throw new Error('Items key params must be string');
        }
        if (typeof val === 'undefined') {
            throw new Error('set value is not defind');
        }
        if (typeof val === 'symbol') {
            throw new Error('value is not support symbol');
        }
        if (typeof val === 'object') {
            val = JSON.stringify(val);
        }
        else if (typeof val === 'string') {
            val = JSON.stringify({ str: val, isString2Object: true });
        }
        else if (Number.isNaN(val)) {
            val = JSON.stringify({ num: null, isNaN2Object: true });
        }
        else if (typeof val === 'bigint') {
            val = JSON.stringify({ num: String(val), isBigInt2Object: true });
        }
        if (this.compress) {
            val = LZString.compress(String(val));
        }
        if (lx === 1) {
            sessionStorage.setItem(key, val);
        }
        else {
            localStorage.setItem(key, val);
        }
    };
    BsStore.prototype.removeItem = function (key, lx) {
        if (lx === void 0) { lx = 1; }
        if (typeof key !== 'string') {
            throw new Error('Items key params must be string');
        }
        if (lx === 1 && sessionStorage.getItem(key) != null) {
            sessionStorage.removeItem(key);
        }
        else if (lx === 2 && localStorage.getItem(key) != null) {
            localStorage.removeItem(key);
        }
    };
    BsStore.prototype.removeAll = function (lx) {
        if (lx === void 0) { lx = 1; }
        if (lx === 1) {
            sessionStorage.clear();
        }
        else if (lx === 2) {
            localStorage.clear();
        }
        else if (lx === 3) {
            sessionStorage.clear();
            localStorage.clear();
        }
        else {
            throw new Error('param error, param must be one of 1,2,3');
        }
    };
    BsStore.prototype.checkStr = function (obj) {
        var target = obj;
        if (this.checkedType(target) === 'Object') {
            if (Reflect.has(target, 'isString2Object') && target.isString2Object) {
                target = target.str;
            }
        }
        return target;
    };
    BsStore.prototype.checkNaN = function (obj) {
        var target = obj;
        if (this.checkedType(target) === 'Object') {
            if (Reflect.has(target, 'isNaN2Object')) {
                target = NaN;
            }
        }
        return target;
    };
    BsStore.prototype.checkBigInt = function (obj) {
        var target = obj;
        if (this.checkedType(target) === 'Object') {
            if (Reflect.has(target, 'isBigInt2Object')) {
                // eslint-disable-next-line
                target = BigInt(target.num);
            }
        }
        return target;
    };
    BsStore.prototype.checkedType = function (target) {
        return Object.prototype.toString.call(target).slice(8, -1);
    };
    return BsStore;
}());
export default BsStore;
export function getSessionSize() {
    var arr = Reflect.ownKeys(sessionStorage);
    var num = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        num += sessionStorage.getItem(item).length;
    }
    console.log("sessionStorage used " + (num / 1024).toFixed(2) + "kb");
    return num;
}
export function getLocalSize() {
    var arr = Reflect.ownKeys(localStorage);
    var num = 0;
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        num += localStorage.getItem(item).length;
    }
    console.log("localStorage used " + (num / 1024).toFixed(2) + "kb");
    return num;
}
