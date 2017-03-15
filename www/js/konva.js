/*
 * Konva JavaScript Framework v1.2.2
 * http://konvajs.github.io/
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Tue Sep 20 2016
 *
 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
 * Modified work Copyright (C) 2014 - 2015 by Anton Lavrenov (Konva)
 *
 * @license
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
! function (t) {
    "use strict";
    var e = Math.PI / 180,
        n = {
            version: "1.2.2",
            stages: [],
            idCounter: 0,
            ids: {},
            names: {},
            shapes: {},
            listenClickTap: !1,
            inDblClickWindow: !1,
            enableTrace: !1,
            traceArrMax: 100,
            dblClickWindow: 400,
            pixelRatio: void 0,
            dragDistance: 0,
            angleDeg: !0,
            showWarnings: !0,
            Filters: {},
            isDragging: function () {
                var t = n.DD;
                return t ? t.isDragging : !1
            },
            isDragReady: function () {
                var t = n.DD;
                return t ? !!t.node : !1
            },
            _addId: function (t, e) {
                void 0 !== e && (this.ids[e] = t)
            },
            _removeId: function (t) {
                void 0 !== t && delete this.ids[t]
            },
            _addName: function (t, e) {
                e && (this.names[e] || (this.names[e] = []), this.names[e].push(t))
            },
            _removeName: function (t, e) {
                if (t) {
                    var n = this.names[t];
                    if (n) {
                        for (var i = 0; i < n.length; i++) {
                            var a = n[i];
                            a._id === e && n.splice(i, 1)
                        }
                        0 === n.length && delete this.names[t]
                    }
                }
            },
            getAngle: function (t) {
                return this.angleDeg ? t * e : t
            },
            _detectIE: function (t) {
                var e = t.indexOf("msie ");
                if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
                var n = t.indexOf("trident/");
                if (n > 0) {
                    var i = t.indexOf("rv:");
                    return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
                }
                var a = t.indexOf("edge/");
                return a > 0 ? parseInt(t.substring(a + 5, t.indexOf(".", a)), 10) : !1
            },
            _parseUA: function (t) {
                var e = t.toLowerCase(),
                    i = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                    a = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
                    r = !!t.match(/IEMobile/i);
                return {
                    browser: i[1] || "",
                    version: i[2] || "0",
                    isIE: n._detectIE(e),
                    mobile: a,
                    ieMobile: r
                }
            },
            UA: void 0
        },
        i = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof WorkerGlobalScope ? self : {};
    if (n.UA = n._parseUA(i.navigator && i.navigator.userAgent || ""), i.Konva && console.error("Konva instance is already exist in current eviroment. Please use only one instance."), i.Konva = n, n.global = i, "object" == typeof exports) {
        if (i.window && i.window.document) n.document = i.window.document, n.window = i.window;
        else {
            var a = require("canvas"),
                r = require("jsdom").jsdom;
            n.window = r("<!DOCTYPE html><html><head></head><body></body></html>").defaultView, n.document = n.window.document, n.window.Image = a.Image, n._nodeCanvas = a
        }
        return void(module.exports = n)
    }
    "function" == typeof define && define.amd && define(function () {
        return n
    }), n.document = document, n.window = window
}("undefined" != typeof window ? window : global),
function () {
    "use strict";
    Konva.Collection = function () {
        var t = [].slice.call(arguments),
            e = t.length,
            n = 0;
        for (this.length = e; e > n; n++) this[n] = t[n];
        return this
    }, Konva.Collection.prototype = [], Konva.Collection.prototype.each = function (t) {
        for (var e = 0; e < this.length; e++) t(this[e], e)
    }, Konva.Collection.prototype.toArray = function () {
        var t, e = [],
            n = this.length;
        for (t = 0; n > t; t++) e.push(this[t]);
        return e
    }, Konva.Collection.toCollection = function (t) {
        var e, n = new Konva.Collection,
            i = t.length;
        for (e = 0; i > e; e++) n.push(t[e]);
        return n
    }, Konva.Collection._mapMethod = function (t) {
        Konva.Collection.prototype[t] = function () {
            var e, n = this.length,
                i = [].slice.call(arguments);
            for (e = 0; n > e; e++) this[e][t].apply(this[e], i);
            return this
        }
    }, Konva.Collection.mapMethods = function (t) {
        var e = t.prototype;
        for (var n in e) Konva.Collection._mapMethod(n)
    }, Konva.Transform = function (t) {
        this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
    }, Konva.Transform.prototype = {
        copy: function () {
            return new Konva.Transform(this.m)
        },
        point: function (t) {
            var e = this.m;
            return {
                x: e[0] * t.x + e[2] * t.y + e[4],
                y: e[1] * t.x + e[3] * t.y + e[5]
            }
        },
        translate: function (t, e) {
            return this.m[4] += this.m[0] * t + this.m[2] * e, this.m[5] += this.m[1] * t + this.m[3] * e, this
        },
        scale: function (t, e) {
            return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this
        },
        rotate: function (t) {
            var e = Math.cos(t),
                n = Math.sin(t),
                i = this.m[0] * e + this.m[2] * n,
                a = this.m[1] * e + this.m[3] * n,
                r = this.m[0] * -n + this.m[2] * e,
                o = this.m[1] * -n + this.m[3] * e;
            return this.m[0] = i, this.m[1] = a, this.m[2] = r, this.m[3] = o, this
        },
        getTranslation: function () {
            return {
                x: this.m[4],
                y: this.m[5]
            }
        },
        skew: function (t, e) {
            var n = this.m[0] + this.m[2] * e,
                i = this.m[1] + this.m[3] * e,
                a = this.m[2] + this.m[0] * t,
                r = this.m[3] + this.m[1] * t;
            return this.m[0] = n, this.m[1] = i, this.m[2] = a, this.m[3] = r, this
        },
        multiply: function (t) {
            var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
                n = this.m[1] * t.m[0] + this.m[3] * t.m[1],
                i = this.m[0] * t.m[2] + this.m[2] * t.m[3],
                a = this.m[1] * t.m[2] + this.m[3] * t.m[3],
                r = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
                o = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
            return this.m[0] = e, this.m[1] = n, this.m[2] = i, this.m[3] = a, this.m[4] = r, this.m[5] = o, this
        },
        invert: function () {
            var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                e = this.m[3] * t,
                n = -this.m[1] * t,
                i = -this.m[2] * t,
                a = this.m[0] * t,
                r = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                o = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            return this.m[0] = e, this.m[1] = n, this.m[2] = i, this.m[3] = a, this.m[4] = r, this.m[5] = o, this
        },
        getMatrix: function () {
            return this.m
        },
        setAbsolutePosition: function (t, e) {
            var n = this.m[0],
                i = this.m[1],
                a = this.m[2],
                r = this.m[3],
                o = this.m[4],
                s = this.m[5],
                h = (n * (e - s) - i * (t - o)) / (n * r - i * a),
                c = (t - o - a * h) / n;
            return this.translate(c, h)
        }
    };
    var t = "2d",
        e = "[object Array]",
        n = "[object Number]",
        i = "[object String]",
        a = Math.PI / 180,
        r = 180 / Math.PI,
        o = "#",
        s = "",
        h = "0",
        c = "Konva warning: ",
        l = "Konva error: ",
        d = "rgb(",
        u = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 132, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 255, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 203],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [119, 128, 144],
            slategrey: [119, 128, 144],
            snow: [255, 255, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            transparent: [255, 255, 255, 0],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 5]
        },
        v = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    Konva.Util = {
        _isElement: function (t) {
            return !(!t || 1 != t.nodeType)
        },
        _isFunction: function (t) {
            return !!(t && t.constructor && t.call && t.apply)
        },
        _isObject: function (t) {
            return !!t && t.constructor === Object
        },
        _isArray: function (t) {
            return Object.prototype.toString.call(t) === e
        },
        _isNumber: function (t) {
            return Object.prototype.toString.call(t) === n
        },
        _isString: function (t) {
            return Object.prototype.toString.call(t) === i
        },
        _throttle: function (t, e, n) {
            var i, a, r, o = null,
                s = 0,
                h = n || {},
                c = function () {
                    s = h.leading === !1 ? 0 : (new Date).getTime(), o = null, r = t.apply(i, a), i = a = null
                };
            return function () {
                var n = (new Date).getTime();
                s || h.leading !== !1 || (s = n);
                var l = e - (n - s);
                return i = this, a = arguments, 0 >= l ? (clearTimeout(o), o = null, s = n, r = t.apply(i, a), i = a = null) : o || h.trailing === !1 || (o = setTimeout(c, l)), r
            }
        },
        _hasMethods: function (t) {
            var e, n = [];
            for (e in t) t.hasOwnProperty(e) && this._isFunction(t[e]) && n.push(e);
            return n.length > 0
        },
        isValidSelector: function (t) {
            if ("string" != typeof t) return !1;
            var e = t[0];
            return "#" === e || "." === e || e === e.toUpperCase()
        },
        createCanvasElement: function () {
            var t = Konva.document.createElement("canvas");
            try {
                t.style = t.style || {}
            } catch (e) {}
            return t
        },
        isBrowser: function () {
            return "object" != typeof exports
        },
        _isInDocument: function (t) {
            for (; t = t.parentNode;)
                if (t == Konva.document) return !0;
            return !1
        },
        _simplifyArray: function (t) {
            var e, n, i = [],
                a = t.length,
                r = Konva.Util;
            for (e = 0; a > e; e++) n = t[e], r._isNumber(n) ? n = Math.round(1e3 * n) / 1e3 : r._isString(n) || (n = n.toString()), i.push(n);
            return i
        },
        _getImage: function (e, n) {
            var i, a;
            if (e)
                if (this._isElement(e)) n(e);
                else if (this._isString(e)) i = new Konva.window.Image, i.onload = function () {
                n(i)
            }, i.src = e;
            else if (e.data) {
                a = Konva.Util.createCanvasElement(), a.width = e.width, a.height = e.height;
                var r = a.getContext(t);
                r.putImageData(e, 0, 0), this._getImage(a.toDataURL(), n)
            } else n(null);
            else n(null)
        },
        _getRGBAString: function (t) {
            var e = t.red || 0,
                n = t.green || 0,
                i = t.blue || 0,
                a = t.alpha || 1;
            return ["rgba(", e, ",", n, ",", i, ",", a, ")"].join(s)
        },
        _rgbToHex: function (t, e, n) {
            return ((1 << 24) + (t << 16) + (e << 8) + n).toString(16).slice(1)
        },
        _hexToRgb: function (t) {
            t = t.replace(o, s);
            var e = parseInt(t, 16);
            return {
                r: e >> 16 & 255,
                g: e >> 8 & 255,
                b: 255 & e
            }
        },
        getRandomColor: function () {
            for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6;) t = h + t;
            return o + t
        },
        get: function (t, e) {
            return void 0 === t ? e : t
        },
        getRGB: function (t) {
            var e;
            return t in u ? (e = u[t], {
                r: e[0],
                g: e[1],
                b: e[2]
            }) : t[0] === o ? this._hexToRgb(t.substring(1)) : t.substr(0, 4) === d ? (e = v.exec(t.replace(/ /g, "")), {
                r: parseInt(e[1], 10),
                g: parseInt(e[2], 10),
                b: parseInt(e[3], 10)
            }) : {
                r: 0,
                g: 0,
                b: 0
            }
        },
        colorToRGBA: function (t) {
            return t = t || "black", Konva.Util._namedColorToRBA(t) || Konva.Util._hex3ColorToRGBA(t) || Konva.Util._hex6ColorToRGBA(t) || Konva.Util._rgbColorToRGBA(t) || Konva.Util._rgbaColorToRGBA(t)
        },
        _namedColorToRBA: function (t) {
            var e = u[t.toLowerCase()];
            return e ? {
                r: e[0],
                g: e[1],
                b: e[2],
                a: 1
            } : null
        },
        _rgbColorToRGBA: function (t) {
            if (0 === t.indexOf("rgb(")) {
                t = t.match(/rgb\(([^)]+)\)/)[1];
                var e = t.split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: 1
                }
            }
        },
        _rgbaColorToRGBA: function (t) {
            if (0 === t.indexOf("rgba(")) {
                t = t.match(/rgba\(([^)]+)\)/)[1];
                var e = t.split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: e[3]
                }
            }
        },
        _hex6ColorToRGBA: function (t) {
            return "#" === t[0] && 7 === t.length ? {
                r: parseInt(t.slice(1, 3), 16),
                g: parseInt(t.slice(3, 5), 16),
                b: parseInt(t.slice(5, 7), 16),
                a: 1
            } : void 0
        },
        _hex3ColorToRGBA: function (t) {
            return "#" === t[0] && 4 === t.length ? {
                r: parseInt(t[1] + t[1], 16),
                g: parseInt(t[2] + t[2], 16),
                b: parseInt(t[3] + t[3], 16),
                a: 1
            } : void 0
        },
        _merge: function (t, e) {
            var n = this._clone(e);
            for (var i in t) this._isObject(t[i]) ? n[i] = this._merge(t[i], n[i]) : n[i] = t[i];
            return n
        },
        cloneObject: function (t) {
            var e = {};
            for (var n in t) this._isObject(t[n]) ? e[n] = this.cloneObject(t[n]) : this._isArray(t[n]) ? e[n] = this.cloneArray(t[n]) : e[n] = t[n];
            return e
        },
        cloneArray: function (t) {
            return t.slice(0)
        },
        _degToRad: function (t) {
            return t * a
        },
        _radToDeg: function (t) {
            return t * r
        },
        _capitalize: function (t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        "throw": function (t) {
            throw new Error(l + t)
        },
        error: function (t) {
            console.error(l + t)
        },
        warn: function (t) {
            Konva.global.console && console.warn && Konva.showWarnings && console.warn(c + t)
        },
        extend: function (t, e) {
            function n() {
                this.constructor = t
            }
            n.prototype = e.prototype;
            var i = t.prototype;
            t.prototype = new n;
            for (var a in i) i.hasOwnProperty(a) && (t.prototype[a] = i[a]);
            t.__super__ = e.prototype, t["super"] = e
        },
        addMethods: function (t, e) {
            var n;
            for (n in e) t.prototype[n] = e[n]
        },
        _getControlPoints: function (t, e, n, i, a, r, o) {
            var s = Math.sqrt(Math.pow(n - t, 2) + Math.pow(i - e, 2)),
                h = Math.sqrt(Math.pow(a - n, 2) + Math.pow(r - i, 2)),
                c = o * s / (s + h),
                l = o * h / (s + h),
                d = n - c * (a - t),
                u = i - c * (r - e),
                v = n + l * (a - t),
                f = i + l * (r - e);
            return [d, u, v, f]
        },
        _expandPoints: function (t, e) {
            var n, i, a = t.length,
                r = [];
            for (n = 2; a - 2 > n; n += 2) i = Konva.Util._getControlPoints(t[n - 2], t[n - 1], t[n], t[n + 1], t[n + 2], t[n + 3], e), r.push(i[0]), r.push(i[1]), r.push(t[n]), r.push(t[n + 1]), r.push(i[2]), r.push(i[3]);
            return r
        },
        _removeLastLetter: function (t) {
            return t.substring(0, t.length - 1)
        },
        each: function (t, e) {
            for (var n in t) e(n, t[n])
        },
        _getProjectionToSegment: function (t, e, n, i, a, r) {
            var o, s, h, c = (t - n) * (t - n) + (e - i) * (e - i);
            if (0 == c) o = t, s = e, h = (a - n) * (a - n) + (r - i) * (r - i);
            else {
                var l = ((a - t) * (n - t) + (r - e) * (i - e)) / c;
                0 > l ? (o = t, s = e, h = (t - a) * (t - a) + (e - r) * (e - r)) : l > 1 ? (o = n, s = i, h = (n - a) * (n - a) + (i - r) * (i - r)) : (o = t + l * (n - t), s = e + l * (i - e), h = (o - a) * (o - a) + (s - r) * (s - r))
            }
            return [o, s, h]
        },
        _getProjectionToLine: function (t, e, n) {
            var i = Konva.Util.cloneObject(t),
                a = Number.MAX_VALUE;
            return e.forEach(function (r, o) {
                if (n || o !== e.length - 1) {
                    var s = e[(o + 1) % e.length],
                        h = Konva.Util._getProjectionToSegment(r.x, r.y, s.x, s.y, t.x, t.y),
                        c = h[0],
                        l = h[1],
                        d = h[2];
                    a > d && (i.x = c, i.y = l, a = d)
                }
            }), i
        },
        _prepareArrayForTween: function (t, e, n) {
            var i, a = [],
                r = [];
            if (t.length > e.length) {
                var o = e;
                e = t, t = o
            }
            for (i = 0; i < t.length; i += 2) a.push({
                x: t[i],
                y: t[i + 1]
            });
            for (i = 0; i < e.length; i += 2) r.push({
                x: e[i],
                y: e[i + 1]
            });
            var s = [];
            return r.forEach(function (t) {
                var e = Konva.Util._getProjectionToLine(t, a, n);
                s.push(e.x), s.push(e.y)
            }), s
        },
        _prepareToStringify: function (t) {
            var e;
            t.visitedByCircularReferenceRemoval = !0;
            for (var n in t)
                if (t.hasOwnProperty(n) && t[n] && "object" == typeof t[n])
                    if (e = Object.getOwnPropertyDescriptor(t, n), t[n].visitedByCircularReferenceRemoval || Konva.Util._isElement(t[n])) {
                        if (!e.configurable) return null;
                        delete t[n]
                    } else if (null === Konva.Util._prepareToStringify(t[n])) {
                if (!e.configurable) return null;
                delete t[n]
            }
            return delete t.visitedByCircularReferenceRemoval, t
        }
    }
}(),
function () {
    "use strict";
    var t = Konva.Util.createCanvasElement(),
        e = t.getContext("2d"),
        n = function () {
            var t = Konva.window.devicePixelRatio || 1,
                n = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
            return t / n
        }();
    Konva.Canvas = function (t) {
        this.init(t)
    }, Konva.Canvas.prototype = {
        init: function (t) {
            var e = t || {},
                i = e.pixelRatio || Konva.pixelRatio || n;
            this.pixelRatio = i, this._canvas = Konva.Util.createCanvasElement(), this._canvas.style.padding = 0, this._canvas.style.margin = 0, this._canvas.style.border = 0, this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = 0, this._canvas.style.left = 0
        },
        getContext: function () {
            return this.context
        },
        getPixelRatio: function () {
            return this.pixelRatio
        },
        setPixelRatio: function (t) {
            var e = this.pixelRatio;
            this.pixelRatio = t, this.setSize(this.getWidth() / e, this.getHeight() / e)
        },
        setWidth: function (t) {
            this.width = this._canvas.width = t * this.pixelRatio, this._canvas.style.width = t + "px";
            var e = this.pixelRatio,
                n = this.getContext()._context;
            n.scale(e, e)
        },
        setHeight: function (t) {
            this.height = this._canvas.height = t * this.pixelRatio, this._canvas.style.height = t + "px";
            var e = this.pixelRatio,
                n = this.getContext()._context;
            n.scale(e, e)
        },
        getWidth: function () {
            return this.width
        },
        getHeight: function () {
            return this.height
        },
        setSize: function (t, e) {
            this.setWidth(t), this.setHeight(e)
        },
        toDataURL: function (t, e) {
            try {
                return this._canvas.toDataURL(t, e)
            } catch (n) {
                try {
                    return this._canvas.toDataURL()
                } catch (i) {
                    return Konva.Util.warn("Unable to get data URL. " + i.message), ""
                }
            }
        }
    }, Konva.SceneCanvas = function (t) {
        var e = t || {},
            n = e.width || 0,
            i = e.height || 0;
        Konva.Canvas.call(this, e), this.context = new Konva.SceneContext(this), this.setSize(n, i)
    }, Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas), Konva.HitCanvas = function (t) {
        var e = t || {},
            n = e.width || 0,
            i = e.height || 0;
        Konva.Canvas.call(this, e), this.context = new Konva.HitContext(this), this.setSize(n, i), this.hitCanvas = !0
    }, Konva.Util.extend(Konva.HitCanvas, Konva.Canvas)
}(),
function () {
    "use strict";
    var t = ",",
        e = "(",
        n = ")",
        i = "([",
        a = "])",
        r = ";",
        o = "()",
        s = "=",
        h = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"],
        c = ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation"];
    Konva.Context = function (t) {
        this.init(t)
    }, Konva.Context.prototype = {
        init: function (t) {
            this.canvas = t, this._context = t._canvas.getContext("2d"), Konva.enableTrace && (this.traceArr = [], this._enableTrace())
        },
        fillShape: function (t) {
            t.getFillEnabled() && this._fill(t)
        },
        strokeShape: function (t) {
            t.getStrokeEnabled() && this._stroke(t)
        },
        fillStrokeShape: function (t) {
            var e = t.getFillEnabled();
            e && this._fill(t), t.getStrokeEnabled() && this._stroke(t)
        },
        getTrace: function (h) {
            var c, l, d, u, v = this.traceArr,
                f = v.length,
                g = "";
            for (c = 0; f > c; c++) l = v[c], d = l.method, d ? (u = l.args, g += d, g += h ? o : Konva.Util._isArray(u[0]) ? i + u.join(t) + a : e + u.join(t) + n) : (g += l.property, h || (g += s + l.val)), g += r;
            return g
        },
        clearTrace: function () {
            this.traceArr = []
        },
        _trace: function (t) {
            var e, n = this.traceArr;
            n.push(t), e = n.length, e >= Konva.traceArrMax && n.shift()
        },
        reset: function () {
            var t = this.getCanvas().getPixelRatio();
            this.setTransform(1 * t, 0, 0, 1 * t, 0, 0)
        },
        getCanvas: function () {
            return this.canvas
        },
        clear: function (t) {
            var e = this.getCanvas();
            t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
        },
        _applyLineCap: function (t) {
            var e = t.getLineCap();
            e && this.setAttr("lineCap", e)
        },
        _applyOpacity: function (t) {
            var e = t.getAbsoluteOpacity();
            1 !== e && this.setAttr("globalAlpha", e)
        },
        _applyLineJoin: function (t) {
            var e = t.getLineJoin();
            e && this.setAttr("lineJoin", e)
        },
        setAttr: function (t, e) {
            this._context[t] = e
        },
        arc: function () {
            var t = arguments;
            this._context.arc(t[0], t[1], t[2], t[3], t[4], t[5])
        },
        beginPath: function () {
            this._context.beginPath()
        },
        bezierCurveTo: function () {
            var t = arguments;
            this._context.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5])
        },
        clearRect: function () {
            var t = arguments;
            this._context.clearRect(t[0], t[1], t[2], t[3])
        },
        clip: function () {
            this._context.clip()
        },
        closePath: function () {
            this._context.closePath()
        },
        createImageData: function () {
            var t = arguments;
            return 2 === t.length ? this._context.createImageData(t[0], t[1]) : 1 === t.length ? this._context.createImageData(t[0]) : void 0
        },
        createLinearGradient: function () {
            var t = arguments;
            return this._context.createLinearGradient(t[0], t[1], t[2], t[3])
        },
        createPattern: function () {
            var t = arguments;
            return this._context.createPattern(t[0], t[1])
        },
        createRadialGradient: function () {
            var t = arguments;
            return this._context.createRadialGradient(t[0], t[1], t[2], t[3], t[4], t[5])
        },
        drawImage: function () {
            var t = arguments,
                e = this._context;
            3 === t.length ? e.drawImage(t[0], t[1], t[2]) : 5 === t.length ? e.drawImage(t[0], t[1], t[2], t[3], t[4]) : 9 === t.length && e.drawImage(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8])
        },
        isPointInPath: function (t, e) {
            return this._context.isPointInPath(t, e)
        },
        fill: function () {
            this._context.fill()
        },
        fillRect: function (t, e, n, i) {
            this._context.fillRect(t, e, n, i)
        },
        strokeRect: function (t, e, n, i) {
            this._context.strokeRect(t, e, n, i)
        },
        fillText: function () {
            var t = arguments;
            this._context.fillText(t[0], t[1], t[2])
        },
        measureText: function (t) {
            return this._context.measureText(t)
        },
        getImageData: function () {
            var t = arguments;
            return this._context.getImageData(t[0], t[1], t[2], t[3])
        },
        lineTo: function () {
            var t = arguments;
            this._context.lineTo(t[0], t[1])
        },
        moveTo: function () {
            var t = arguments;
            this._context.moveTo(t[0], t[1])
        },
        rect: function () {
            var t = arguments;
            this._context.rect(t[0], t[1], t[2], t[3])
        },
        putImageData: function () {
            var t = arguments;
            this._context.putImageData(t[0], t[1], t[2])
        },
        quadraticCurveTo: function () {
            var t = arguments;
            this._context.quadraticCurveTo(t[0], t[1], t[2], t[3])
        },
        restore: function () {
            this._context.restore()
        },
        rotate: function () {
            var t = arguments;
            this._context.rotate(t[0])
        },
        save: function () {
            this._context.save()
        },
        scale: function () {
            var t = arguments;
            this._context.scale(t[0], t[1])
        },
        setLineDash: function () {
            var t = arguments,
                e = this._context;
            this._context.setLineDash ? e.setLineDash(t[0]) : "mozDash" in e ? e.mozDash = t[0] : "webkitLineDash" in e && (e.webkitLineDash = t[0])
        },
        getLineDash: function () {
            return this._context.getLineDash()
        },
        setTransform: function () {
            var t = arguments;
            this._context.setTransform(t[0], t[1], t[2], t[3], t[4], t[5])
        },
        stroke: function () {
            this._context.stroke()
        },
        strokeText: function () {
            var t = arguments;
            this._context.strokeText(t[0], t[1], t[2])
        },
        transform: function () {
            var t = arguments;
            this._context.transform(t[0], t[1], t[2], t[3], t[4], t[5])
        },
        translate: function () {
            var t = arguments;
            this._context.translate(t[0], t[1])
        },
        _enableTrace: function () {
            var t, e, n = this,
                i = h.length,
                a = Konva.Util._simplifyArray,
                r = this.setAttr,
                o = function (t) {
                    var i, r = n[t];
                    n[t] = function () {
                        return e = a(Array.prototype.slice.call(arguments, 0)), i = r.apply(n, arguments), n._trace({
                            method: t,
                            args: e
                        }), i
                    }
                };
            for (t = 0; i > t; t++) o(h[t]);
            n.setAttr = function () {
                r.apply(n, arguments), n._trace({
                    property: arguments[0],
                    val: arguments[1]
                })
            }
        }
    }, c.forEach(function (t) {
        Object.defineProperty(Konva.Context.prototype, t, {
            get: function () {
                return this._context[t]
            },
            set: function (e) {
                this._context[t] = e
            }
        })
    }), Konva.SceneContext = function (t) {
        Konva.Context.call(this, t)
    }, Konva.SceneContext.prototype = {
        _fillColor: function (t) {
            var e = t.fill();
            this.setAttr("fillStyle", e), t._fillFunc(this)
        },
        _fillPattern: function (t) {
            var e = t.getFillPatternX(),
                n = t.getFillPatternY(),
                i = t.getFillPatternScale(),
                a = Konva.getAngle(t.getFillPatternRotation()),
                r = t.getFillPatternOffset();
            (e || n) && this.translate(e || 0, n || 0), a && this.rotate(a), i && this.scale(i.x, i.y), r && this.translate(-1 * r.x, -1 * r.y), this.setAttr("fillStyle", this.createPattern(t.getFillPatternImage(), t.getFillPatternRepeat() || "repeat")), this.fill()
        },
        _fillLinearGradient: function (t) {
            var e = t.getFillLinearGradientStartPoint(),
                n = t.getFillLinearGradientEndPoint(),
                i = t.getFillLinearGradientColorStops(),
                a = this.createLinearGradient(e.x, e.y, n.x, n.y);
            if (i) {
                for (var r = 0; r < i.length; r += 2) a.addColorStop(i[r], i[r + 1]);
                this.setAttr("fillStyle", a), t._fillFunc(this)
            }
        },
        _fillRadialGradient: function (t) {
            for (var e = t.getFillRadialGradientStartPoint(), n = t.getFillRadialGradientEndPoint(), i = t.getFillRadialGradientStartRadius(), a = t.getFillRadialGradientEndRadius(), r = t.getFillRadialGradientColorStops(), o = this.createRadialGradient(e.x, e.y, i, n.x, n.y, a), s = 0; s < r.length; s += 2) o.addColorStop(r[s], r[s + 1]);
            this.setAttr("fillStyle", o), this.fill()
        },
        _fill: function (t) {
            var e = t.fill(),
                n = t.getFillPatternImage(),
                i = t.getFillLinearGradientColorStops(),
                a = t.getFillRadialGradientColorStops(),
                r = t.getFillPriority();
            e && "color" === r ? this._fillColor(t) : n && "pattern" === r ? this._fillPattern(t) : i && "linear-gradient" === r ? this._fillLinearGradient(t) : a && "radial-gradient" === r ? this._fillRadialGradient(t) : e ? this._fillColor(t) : n ? this._fillPattern(t) : i ? this._fillLinearGradient(t) : a && this._fillRadialGradient(t)
        },
        _stroke: function (t) {
            var e = t.dash(),
                n = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
            t.hasStroke() && (n || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), e && t.dashEnabled() && this.setLineDash(e), this.setAttr("lineWidth", t.strokeWidth()), this.setAttr("strokeStyle", t.stroke()), t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t._strokeFunc(this), n || this.restore())
        },
        _applyShadow: function (t) {
            var e = Konva.Util,
                n = e.get(t.getShadowRGBA(), "black"),
                i = e.get(t.getShadowBlur(), 5),
                a = e.get(t.getShadowOffset(), {
                    x: 0,
                    y: 0
                }),
                r = t.getAbsoluteScale(),
                o = r.x,
                s = r.y;
            this.setAttr("shadowColor", n), this.setAttr("shadowBlur", i), this.setAttr("shadowOffsetX", a.x * o), this.setAttr("shadowOffsetY", a.y * s)
        }
    }, Konva.Util.extend(Konva.SceneContext, Konva.Context), Konva.HitContext = function (t) {
        Konva.Context.call(this, t)
    }, Konva.HitContext.prototype = {
        _fill: function (t) {
            this.save(), this.setAttr("fillStyle", t.colorKey), t._fillFuncHit(this), this.restore()
        },
        _stroke: function (t) {
            if (t.hasStroke() && t.strokeHitEnabled()) {
                var e = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
                e || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), this.setAttr("lineWidth", t.strokeWidth()), this.setAttr("strokeStyle", t.colorKey), t._strokeFuncHit(this), e || this.restore()
            }
        }
    }, Konva.Util.extend(Konva.HitContext, Konva.Context)
}(),
function () {
    "use strict";
    var t = "get",
        e = "set";
    Konva.Factory = {
        addGetterSetter: function (t, e, n, i, a) {
            this.addGetter(t, e, n), this.addSetter(t, e, i, a), this.addOverloadedGetterSetter(t, e)
        },
        addGetter: function (e, n, i) {
            var a = t + Konva.Util._capitalize(n);
            e.prototype[a] = function () {
                var t = this.attrs[n];
                return void 0 === t ? i : t
            }
        },
        addSetter: function (t, n, i, a) {
            var r = e + Konva.Util._capitalize(n);
            t.prototype[r] = function (t) {
                return i && (t = i.call(this, t)), this._setAttr(n, t), a && a.call(this), this
            }
        },
        addComponentsGetterSetter: function (n, i, a, r, o) {
            var s, h, c = a.length,
                l = Konva.Util._capitalize,
                d = t + l(i),
                u = e + l(i);
            n.prototype[d] = function () {
                var t = {};
                for (s = 0; c > s; s++) h = a[s], t[h] = this.getAttr(i + l(h));
                return t
            }, n.prototype[u] = function (t) {
                var e, n = this.attrs[i];
                r && (t = r.call(this, t));
                for (e in t) t.hasOwnProperty(e) && this._setAttr(i + l(e), t[e]);
                return this._fireChangeEvent(i, n, t), o && o.call(this), this
            }, this.addOverloadedGetterSetter(n, i)
        },
        addOverloadedGetterSetter: function (n, i) {
            var a = Konva.Util._capitalize(i),
                r = e + a,
                o = t + a;
            n.prototype[i] = function () {
                return arguments.length ? (this[r](arguments[0]), this) : this[o]()
            }
        },
        addDeprecatedGetterSetter: function (e, n, i, a) {
            var r = t + Konva.Util._capitalize(n),
                o = n + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
            e.prototype[r] = function () {
                Konva.Util.error(o);
                var t = this.attrs[n];
                return void 0 === t ? i : t
            }, this.addSetter(e, n, a, function () {
                Konva.Util.error(o)
            }), this.addOverloadedGetterSetter(e, n)
        },
        backCompat: function (t, e) {
            Konva.Util.each(e, function (e, n) {
                var i = t.prototype[n];
                t.prototype[e] = function () {
                    i.apply(this, arguments), Konva.Util.error(e + " method is deprecated and will be removed soon. Use " + n + " instead")
                }
            })
        },
        afterSetFilter: function () {
            this._filterUpToDate = !1
        }
    }, Konva.Validators = {
        RGBComponent: function (t) {
            return t > 255 ? 255 : 0 > t ? 0 : Math.round(t)
        },
        alphaComponent: function (t) {
            return t > 1 ? 1 : 1e-4 > t ? 1e-4 : t
        }
    }
}(),
function (t) {
    "use strict";
    var e = "absoluteOpacity",
        n = "absoluteTransform",
        i = "absoluteScale",
        a = "Change",
        r = "children",
        o = ".",
        s = "",
        h = "get",
        c = "id",
        l = "konva",
        d = "listening",
        u = "mouseenter",
        v = "mouseleave",
        f = "name",
        g = "set",
        p = "Shape",
        m = " ",
        y = "stage",
        _ = "transform",
        K = "Stage",
        S = "visible",
        C = ["id"],
        x = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(m),
        w = ["scaleXChange.konva", "scaleYChange.konva"].join(m);
    t.Node = function (t) {
        this._init(t)
    }, t.Util.addMethods(t.Node, {
        _init: function (a) {
            var r = this;
            this._id = t.idCounter++, this.eventListeners = {}, this.attrs = {}, this._cache = {}, this._filterUpToDate = !1, this.setAttrs(a), this.on(x, function () {
                this._clearCache(_), r._clearSelfAndDescendantCache(n)
            }), this.on(w, function () {
                r._clearSelfAndDescendantCache(i)
            }), this.on("visibleChange.konva", function () {
                r._clearSelfAndDescendantCache(S)
            }), this.on("listeningChange.konva", function () {
                r._clearSelfAndDescendantCache(d)
            }), this.on("opacityChange.konva", function () {
                r._clearSelfAndDescendantCache(e)
            })
        },
        _clearCache: function (t) {
            t ? delete this._cache[t] : this._cache = {}
        },
        _getCache: function (t, e) {
            var n = this._cache[t];
            return void 0 === n && (this._cache[t] = e.call(this)), this._cache[t]
        },
        _clearSelfAndDescendantCache: function (t) {
            this._clearCache(t), this.children && this.getChildren().each(function (e) {
                e._clearSelfAndDescendantCache(t)
            })
        },
        clearCache: function () {
            return delete this._cache.canvas, this._filterUpToDate = !1, this
        },
        cache: function (e) {
            var n = e || {},
                i = this.getClientRect(!0),
                a = n.width || i.width,
                r = n.height || i.height,
                o = n.x || i.x,
                s = n.y || i.y,
                h = n.offset || 0,
                c = n.drawBorder || !1;
            if (!a || !r) throw new Error("Width or height of caching configuration equals 0.");
            a += 2 * h, r += 2 * h, o -= h, s -= h;
            var l = new t.SceneCanvas({
                    width: a,
                    height: r
                }),
                d = new t.SceneCanvas({
                    width: a,
                    height: r
                }),
                u = new t.HitCanvas({
                    pixelRatio: 1,
                    width: a,
                    height: r
                }),
                v = l.getContext(),
                f = u.getContext();
            return u.isCache = !0, this.clearCache(), v.save(), f.save(), v.translate(-o, -s), f.translate(-o, -s), this.drawScene(l, this, !0), this.drawHit(u, this, !0), v.restore(), f.restore(), c && (v.save(), v.beginPath(), v.rect(0, 0, a, r), v.closePath(), v.setAttr("strokeStyle", "red"), v.setAttr("lineWidth", 5), v.stroke(), v.restore()), this._cache.canvas = {
                scene: l,
                filter: d,
                hit: u,
                x: o,
                y: s
            }, this
        },
        getClientRect: function () {
            throw new Error('abstract "getClientRect" method call')
        },
        _transformedRect: function (t) {
            var e, n, i, a, r = [{
                    x: t.x,
                    y: t.y
                }, {
                    x: t.x + t.width,
                    y: t.y
                }, {
                    x: t.x + t.width,
                    y: t.y + t.height
                }, {
                    x: t.x,
                    y: t.y + t.height
                }],
                o = this.getTransform();
            return r.forEach(function (t) {
                var r = o.point(t);
                void 0 === e && (e = i = r.x, n = a = r.y), e = Math.min(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.x), a = Math.max(a, r.y)
            }), {
                x: e,
                y: n,
                width: i - e,
                height: a - n
            }
        },
        _drawCachedSceneCanvas: function (t) {
            t.save(), t._applyOpacity(this), t.translate(this._cache.canvas.x, this._cache.canvas.y);
            var e = this._getCachedSceneCanvas(),
                n = e.pixelRatio;
            t.drawImage(e._canvas, 0, 0, e.width / n, e.height / n), t.restore()
        },
        _drawCachedHitCanvas: function (t) {
            var e = this._cache.canvas,
                n = e.hit;
            t.save(), t.translate(this._cache.canvas.x, this._cache.canvas.y), t.drawImage(n._canvas, 0, 0), t.restore()
        },
        _getCachedSceneCanvas: function () {
            var e, n, i, a, r = this.filters(),
                o = this._cache.canvas,
                s = o.scene,
                h = o.filter,
                c = h.getContext();
            if (r) {
                if (!this._filterUpToDate) {
                    var l = s.pixelRatio;
                    try {
                        for (e = r.length, c.clear(), c.drawImage(s._canvas, 0, 0, s.getWidth() / l, s.getHeight() / l), n = c.getImageData(0, 0, h.getWidth(), h.getHeight()), i = 0; e > i; i++) a = r[i], "function" == typeof a ? (a.call(this, n), c.putImageData(n, 0, 0)) : t.Util.error("Filter should be type of function, but got " + typeof a + " insted. Please check correct filters")
                    } catch (d) {
                        t.Util.error("Unable to apply filter. " + d.message)
                    }
                    this._filterUpToDate = !0
                }
                return h
            }
            return s
        },
        on: function (t, e) {
            if (3 === arguments.length) return this._delegate.apply(this, arguments);
            var n, i, a, r, h, c = t.split(m),
                l = c.length;
            for (n = 0; l > n; n++) i = c[n], a = i.split(o), r = a[0], h = a[1] || s, this.eventListeners[r] || (this.eventListeners[r] = []), this.eventListeners[r].push({
                name: h,
                handler: e
            });
            return this
        },
        off: function (t) {
            var e, n, i, a, r, s, h = (t || "").split(m),
                c = h.length;
            if (!t)
                for (n in this.eventListeners) this._off(n);
            for (e = 0; c > e; e++)
                if (i = h[e], a = i.split(o), r = a[0], s = a[1], r) this.eventListeners[r] && this._off(r, s);
                else
                    for (n in this.eventListeners) this._off(n, s);
            return this
        },
        dispatchEvent: function (t) {
            var e = {
                target: this,
                type: t.type,
                evt: t
            };
            return this.fire(t.type, e), this
        },
        addEventListener: function (t, e) {
            return this.on(t, function (t) {
                e.call(this, t.evt)
            }), this
        },
        removeEventListener: function (t) {
            return this.off(t), this
        },
        _delegate: function (e, n, i) {
            var a = this;
            this.on(e, function (e) {
                for (var r = e.target.findAncestors(n, !0, a), o = 0; o < r.length; o++) e = t.Util.cloneObject(e), e.currentTarget = r[o], i.call(r[o], e)
            })
        },
        remove: function () {
            var t = this.getParent();
            return t && t.children && (t.children.splice(this.index, 1), t._setChildrenIndices(), delete this.parent), this._clearSelfAndDescendantCache(y), this._clearSelfAndDescendantCache(n), this._clearSelfAndDescendantCache(S), this._clearSelfAndDescendantCache(d), this._clearSelfAndDescendantCache(e), this
        },
        destroy: function () {
            return t._removeId(this.getId()), t._removeName(this.getName(), this._id),
                this.remove(), this
        },
        getAttr: function (e) {
            var n = h + t.Util._capitalize(e);
            return t.Util._isFunction(this[n]) ? this[n]() : this.attrs[e]
        },
        getAncestors: function () {
            for (var e = this.getParent(), n = new t.Collection; e;) n.push(e), e = e.getParent();
            return n
        },
        getAttrs: function () {
            return this.attrs || {}
        },
        setAttrs: function (e) {
            var n, i;
            if (!e) return this;
            for (n in e) n !== r && (i = g + t.Util._capitalize(n), t.Util._isFunction(this[i]) ? this[i](e[n]) : this._setAttr(n, e[n]));
            return this
        },
        isListening: function () {
            return this._getCache(d, this._isListening)
        },
        _isListening: function () {
            var t = this.getListening(),
                e = this.getParent();
            return "inherit" === t ? e ? e.isListening() : !0 : t
        },
        isVisible: function () {
            return this._getCache(S, this._isVisible)
        },
        _isVisible: function () {
            var t = this.getVisible(),
                e = this.getParent();
            return "inherit" === t ? e ? e.isVisible() : !0 : t
        },
        shouldDrawHit: function (t) {
            var e = this.getLayer();
            return t && t.isCache || e && e.hitGraphEnabled() && this.isListening() && this.isVisible()
        },
        show: function () {
            return this.setVisible(!0), this
        },
        hide: function () {
            return this.setVisible(!1), this
        },
        getZIndex: function () {
            return this.index || 0
        },
        getAbsoluteZIndex: function () {
            function t(h) {
                for (e = [], n = h.length, i = 0; n > i; i++) a = h[i], s++, a.nodeType !== p && (e = e.concat(a.getChildren().toArray())), a._id === o._id && (i = n);
                e.length > 0 && e[0].getDepth() <= r && t(e)
            }
            var e, n, i, a, r = this.getDepth(),
                o = this,
                s = 0;
            return o.nodeType !== K && t(o.getStage().getChildren()), s
        },
        getDepth: function () {
            for (var t = 0, e = this.parent; e;) t++, e = e.parent;
            return t
        },
        setPosition: function (t) {
            return this.setX(t.x), this.setY(t.y), this
        },
        getPosition: function () {
            return {
                x: this.getX(),
                y: this.getY()
            }
        },
        getAbsolutePosition: function (e) {
            var n = this.getAbsoluteTransform(e).getMatrix(),
                i = new t.Transform,
                a = this.offset();
            return i.m = n.slice(), i.translate(a.x, a.y), i.getTranslation()
        },
        setAbsolutePosition: function (t) {
            var e, n = this._clearTransform();
            return this.attrs.x = n.x, this.attrs.y = n.y, delete n.x, delete n.y, e = this.getAbsoluteTransform(), e.invert(), e.translate(t.x, t.y), t = {
                x: this.attrs.x + e.getTranslation().x,
                y: this.attrs.y + e.getTranslation().y
            }, this.setPosition({
                x: t.x,
                y: t.y
            }), this._setTransform(n), this
        },
        _setTransform: function (t) {
            var e;
            for (e in t) this.attrs[e] = t[e];
            this._clearCache(_), this._clearSelfAndDescendantCache(n)
        },
        _clearTransform: function () {
            var t = {
                x: this.getX(),
                y: this.getY(),
                rotation: this.getRotation(),
                scaleX: this.getScaleX(),
                scaleY: this.getScaleY(),
                offsetX: this.getOffsetX(),
                offsetY: this.getOffsetY(),
                skewX: this.getSkewX(),
                skewY: this.getSkewY()
            };
            return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, this._clearCache(_), this._clearSelfAndDescendantCache(n), t
        },
        move: function (t) {
            var e = t.x,
                n = t.y,
                i = this.getX(),
                a = this.getY();
            return void 0 !== e && (i += e), void 0 !== n && (a += n), this.setPosition({
                x: i,
                y: a
            }), this
        },
        _eachAncestorReverse: function (t, e) {
            var n, i, a = [],
                r = this.getParent();
            if (e && e._id === this._id) return t(this), !0;
            for (a.unshift(this); r && (!e || r._id !== e._id);) a.unshift(r), r = r.parent;
            for (n = a.length, i = 0; n > i; i++) t(a[i])
        },
        rotate: function (t) {
            return this.setRotation(this.getRotation() + t), this
        },
        moveToTop: function () {
            if (!this.parent) return t.Util.warn("Node has no parent. moveToTop function is ignored."), !1;
            var e = this.index;
            return this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0
        },
        moveUp: function () {
            if (!this.parent) return t.Util.warn("Node has no parent. moveUp function is ignored."), !1;
            var e = this.index,
                n = this.parent.getChildren().length;
            return n - 1 > e ? (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0) : !1
        },
        moveDown: function () {
            if (!this.parent) return t.Util.warn("Node has no parent. moveDown function is ignored."), !1;
            var e = this.index;
            return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0) : !1
        },
        moveToBottom: function () {
            if (!this.parent) return t.Util.warn("Node has no parent. moveToBottom function is ignored."), !1;
            var e = this.index;
            return e > 0 ? (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0) : !1
        },
        setZIndex: function (e) {
            if (!this.parent) return t.Util.warn("Node has no parent. zIndex parameter is ignored."), !1;
            var n = this.index;
            return this.parent.children.splice(n, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this
        },
        getAbsoluteOpacity: function () {
            return this._getCache(e, this._getAbsoluteOpacity)
        },
        _getAbsoluteOpacity: function () {
            var t = this.getOpacity();
            return this.getParent() && (t *= this.getParent().getAbsoluteOpacity()), t
        },
        moveTo: function (t) {
            return this.getParent() !== t && (this.remove(), t.add(this)), this
        },
        toObject: function () {
            var e, n, i, a, r = {},
                o = this.getAttrs();
            r.attrs = {};
            for (e in o) n = o[e], i = this[e], delete o[e], a = i ? i.call(this) : null, o[e] = n, a !== n && (r.attrs[e] = n);
            return r.className = this.getClassName(), t.Util._prepareToStringify(r)
        },
        toJSON: function () {
            return JSON.stringify(this.toObject())
        },
        getParent: function () {
            return this.parent
        },
        findAncestors: function (t, e, n) {
            var i = [];
            e && this._isMatch(t) && i.push(this);
            for (var a = this.parent; a;) {
                if (a === n) return i;
                a._isMatch(t) && i.push(a), a = a.parent
            }
            return i
        },
        findAncestor: function (t, e, n) {
            return this.findAncestors(t, e, n)[0]
        },
        _isMatch: function (e) {
            if (!e) return !1;
            var n, i, a = e.replace(/ /g, "").split(","),
                r = a.length;
            for (n = 0; r > n; n++)
                if (i = a[n], t.Util.isValidSelector(i) || (t.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), t.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), t.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0)) {
                    if (this.id() === i.slice(1)) return !0
                } else if ("." === i.charAt(0)) {
                if (this.hasName(i.slice(1))) return !0
            } else if (0 !== this._get(i).length) return !0;
            return !1
        },
        getLayer: function () {
            var t = this.getParent();
            return t ? t.getLayer() : null
        },
        getStage: function () {
            return this._getCache(y, this._getStage)
        },
        _getStage: function () {
            var t = this.getParent();
            return t ? t.getStage() : void 0
        },
        fire: function (t, e, n) {
            return e = e || {}, e.target = e.target || this, n ? this._fireAndBubble(t, e) : this._fire(t, e), this
        },
        getAbsoluteTransform: function (t) {
            return t ? this._getAbsoluteTransform(t) : this._getCache(n, this._getAbsoluteTransform)
        },
        _getAbsoluteTransform: function (e) {
            var n, i, a = new t.Transform;
            return this._eachAncestorReverse(function (t) {
                n = t.transformsEnabled(), i = t.getTransform(), "all" === n ? a.multiply(i) : "position" === n && a.translate(t.x(), t.y())
            }, e), a
        },
        getAbsoluteScale: function (t) {
            return t ? this._getAbsoluteTransform(t) : this._getCache(i, this._getAbsoluteScale)
        },
        _getAbsoluteScale: function (t) {
            var e = 1,
                n = 1;
            return this._eachAncestorReverse(function (t) {
                e *= t.scaleX(), n *= t.scaleY()
            }, t), {
                x: e,
                y: n
            }
        },
        getTransform: function () {
            return this._getCache(_, this._getTransform)
        },
        _getTransform: function () {
            var e = new t.Transform,
                n = this.getX(),
                i = this.getY(),
                a = t.getAngle(this.getRotation()),
                r = this.getScaleX(),
                o = this.getScaleY(),
                s = this.getSkewX(),
                h = this.getSkewY(),
                c = this.getOffsetX(),
                l = this.getOffsetY();
            return 0 === n && 0 === i || e.translate(n, i), 0 !== a && e.rotate(a), 0 === s && 0 === h || e.skew(s, h), 1 === r && 1 === o || e.scale(r, o), 0 === c && 0 === l || e.translate(-1 * c, -1 * l), e
        },
        clone: function (e) {
            var n, i, a, r, o, s = t.Util.cloneObject(this.attrs);
            for (var h in C) {
                var c = C[h];
                delete s[c]
            }
            for (n in e) s[n] = e[n];
            var d = new this.constructor(s);
            for (n in this.eventListeners)
                for (i = this.eventListeners[n], a = i.length, r = 0; a > r; r++) o = i[r], o.name.indexOf(l) < 0 && (d.eventListeners[n] || (d.eventListeners[n] = []), d.eventListeners[n].push(o));
            return d
        },
        toDataURL: function (e) {
            e = e || {};
            var n = e.mimeType || null,
                i = e.quality || null,
                a = this.getStage(),
                r = e.x || 0,
                o = e.y || 0,
                s = e.pixelRatio || 1,
                h = new t.SceneCanvas({
                    width: e.width || this.getWidth() || (a ? a.getWidth() : 0),
                    height: e.height || this.getHeight() || (a ? a.getHeight() : 0),
                    pixelRatio: s
                }),
                c = h.getContext();
            return c.save(), (r || o) && c.translate(-1 * r, -1 * o), this.drawScene(h), c.restore(), h.toDataURL(n, i)
        },
        toImage: function (e) {
            if (!e || !e.callback) throw "callback required for toImage method config argument";
            t.Util._getImage(this.toDataURL(e), function (t) {
                e.callback(t)
            })
        },
        setSize: function (t) {
            return this.setWidth(t.width), this.setHeight(t.height), this
        },
        getSize: function () {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            }
        },
        getWidth: function () {
            return this.attrs.width || 0
        },
        getHeight: function () {
            return this.attrs.height || 0
        },
        getClassName: function () {
            return this.className || this.nodeType
        },
        getType: function () {
            return this.nodeType
        },
        getDragDistance: function () {
            return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : t.dragDistance
        },
        _get: function (t) {
            return this.className === t || this.nodeType === t ? [this] : []
        },
        _off: function (t, e) {
            var n, i, a = this.eventListeners[t];
            for (n = 0; n < a.length; n++)
                if (i = a[n].name, !("konva" === i && "konva" !== e || e && i !== e)) {
                    if (a.splice(n, 1), 0 === a.length) {
                        delete this.eventListeners[t];
                        break
                    }
                    n--
                }
        },
        _fireChangeEvent: function (t, e, n) {
            this._fire(t + a, {
                oldVal: e,
                newVal: n
            })
        },
        setId: function (e) {
            var n = this.getId();
            return t._removeId(n), t._addId(this, e), this._setAttr(c, e), this
        },
        setName: function (e) {
            var n, i, a = (this.getName() || "").split(/\s/g),
                r = (e || "").split(/\s/g);
            for (i = 0; i < a.length; i++) n = a[i], -1 === r.indexOf(n) && n && t._removeName(n, this._id);
            for (i = 0; i < r.length; i++) n = r[i], -1 === a.indexOf(n) && n && t._addName(this, n);
            return this._setAttr(f, e), this
        },
        addName: function (t) {
            if (!this.hasName(t)) {
                var e = this.name(),
                    n = e ? e + " " + t : t;
                this.setName(n)
            }
            return this
        },
        hasName: function (t) {
            var e = (this.name() || "").split(/\s/g);
            return -1 !== e.indexOf(t)
        },
        removeName: function (t) {
            var e = (this.name() || "").split(/\s/g),
                n = e.indexOf(t);
            return -1 !== n && (e.splice(n, 1), this.setName(e.join(" "))), this
        },
        setAttr: function (e, n) {
            var i = g + t.Util._capitalize(e),
                a = this[i];
            return t.Util._isFunction(a) ? a.call(this, n) : this._setAttr(e, n), this
        },
        _setAttr: function (t, e) {
            var n;
            n = this.attrs[t], n !== e && (void 0 === e || null === e ? delete this.attrs[t] : this.attrs[t] = e, this._fireChangeEvent(t, n, e))
        },
        _setComponentAttr: function (t, e, n) {
            var i;
            void 0 !== n && (i = this.attrs[t], i || (this.attrs[t] = this.getAttr(t)), this.attrs[t][e] = n, this._fireChangeEvent(t, i, n))
        },
        _fireAndBubble: function (t, e, n) {
            var i = !0;
            if (e && this.nodeType === p && (e.target = this), t === u && n && (this._id === n._id || this.isAncestorOf && this.isAncestorOf(n)) ? i = !1 : t === v && n && (this._id === n._id || this.isAncestorOf && this.isAncestorOf(n)) && (i = !1), i) {
                this._fire(t, e);
                var a = (t === u || t === v) && n && n.isAncestorOf && n.isAncestorOf(this) && !n.isAncestorOf(this.parent);
                (e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !a && (n && n.parent ? this._fireAndBubble.call(this.parent, t, e, n.parent) : this._fireAndBubble.call(this.parent, t, e))
            }
        },
        _fire: function (t, e) {
            var n, i = this.eventListeners[t];
            if (e = e || {}, e.currentTarget = this, e.type = t, i)
                for (n = 0; n < i.length; n++) i[n].handler.call(this, e)
        },
        draw: function () {
            return this.drawScene(), this.drawHit(), this
        }
    }), t.Node.create = function (e, n) {
        return t.Util._isString(e) && (e = JSON.parse(e)), this._createNode(e, n)
    }, t.Node._createNode = function (e, n) {
        var i, a, r, o = t.Node.prototype.getClassName.call(e),
            s = e.children;
        if (n && (e.attrs.container = n), i = new t[o](e.attrs), s)
            for (a = s.length, r = 0; a > r; r++) i.add(this._createNode(s[r]));
        return i
    }, t.Factory.addOverloadedGetterSetter(t.Node, "position"), t.Factory.addGetterSetter(t.Node, "x", 0), t.Factory.addGetterSetter(t.Node, "y", 0), t.Factory.addGetterSetter(t.Node, "opacity", 1), t.Factory.addGetter(t.Node, "name"), t.Factory.addOverloadedGetterSetter(t.Node, "name"), t.Factory.addGetter(t.Node, "id"), t.Factory.addOverloadedGetterSetter(t.Node, "id"), t.Factory.addGetterSetter(t.Node, "rotation", 0), t.Factory.addComponentsGetterSetter(t.Node, "scale", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "scaleX", 1), t.Factory.addGetterSetter(t.Node, "scaleY", 1), t.Factory.addComponentsGetterSetter(t.Node, "skew", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "skewX", 0), t.Factory.addGetterSetter(t.Node, "skewY", 0), t.Factory.addComponentsGetterSetter(t.Node, "offset", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "offsetX", 0), t.Factory.addGetterSetter(t.Node, "offsetY", 0), t.Factory.addSetter(t.Node, "dragDistance"), t.Factory.addOverloadedGetterSetter(t.Node, "dragDistance"), t.Factory.addSetter(t.Node, "width", 0), t.Factory.addOverloadedGetterSetter(t.Node, "width"), t.Factory.addSetter(t.Node, "height", 0), t.Factory.addOverloadedGetterSetter(t.Node, "height"), t.Factory.addGetterSetter(t.Node, "listening", "inherit"), t.Factory.addGetterSetter(t.Node, "preventDefault", !0), t.Factory.addGetterSetter(t.Node, "filters", void 0, function (t) {
        return this._filterUpToDate = !1, t
    }), t.Factory.addGetterSetter(t.Node, "visible", "inherit"), t.Factory.addGetterSetter(t.Node, "transformsEnabled", "all"), t.Factory.addOverloadedGetterSetter(t.Node, "size"), t.Factory.backCompat(t.Node, {
        rotateDeg: "rotate",
        setRotationDeg: "setRotation",
        getRotationDeg: "getRotation"
    }), t.Collection.mapMethods(t.Node)
}(Konva),
function () {
    "use strict";
    Konva.Filters.Grayscale = function (t) {
        var e, n, i = t.data,
            a = i.length;
        for (e = 0; a > e; e += 4) n = .34 * i[e] + .5 * i[e + 1] + .16 * i[e + 2], i[e] = n, i[e + 1] = n, i[e + 2] = n
    }
}(),
function () {
    "use strict";
    Konva.Filters.Brighten = function (t) {
        var e, n = 255 * this.brightness(),
            i = t.data,
            a = i.length;
        for (e = 0; a > e; e += 4) i[e] += n, i[e + 1] += n, i[e + 2] += n
    }, Konva.Factory.addGetterSetter(Konva.Node, "brightness", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.Invert = function (t) {
        var e, n = t.data,
            i = n.length;
        for (e = 0; i > e; e += 4) n[e] = 255 - n[e], n[e + 1] = 255 - n[e + 1], n[e + 2] = 255 - n[e + 2]
    }
}(),
function () {
    "use strict";

    function t() {
        this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
    }

    function e(e, a) {
        var r, o, s, h, c, l, d, u, v, f, g, p, m, y, _, K, S, C, x, w, b, F, T, P, A = e.data,
            D = e.width,
            k = e.height,
            G = a + a + 1,
            M = D - 1,
            R = k - 1,
            L = a + 1,
            I = L * (L + 1) / 2,
            N = new t,
            O = null,
            U = N,
            E = null,
            B = null,
            H = n[a],
            W = i[a];
        for (s = 1; G > s; s++) U = U.next = new t, s === L && (O = U);
        for (U.next = N, d = l = 0, o = 0; k > o; o++) {
            for (K = S = C = x = u = v = f = g = 0, p = L * (w = A[l]), m = L * (b = A[l + 1]), y = L * (F = A[l + 2]), _ = L * (T = A[l + 3]), u += I * w, v += I * b, f += I * F, g += I * T, U = N, s = 0; L > s; s++) U.r = w, U.g = b, U.b = F, U.a = T, U = U.next;
            for (s = 1; L > s; s++) h = l + ((s > M ? M : s) << 2), u += (U.r = w = A[h]) * (P = L - s), v += (U.g = b = A[h + 1]) * P, f += (U.b = F = A[h + 2]) * P, g += (U.a = T = A[h + 3]) * P, K += w, S += b, C += F, x += T, U = U.next;
            for (E = N, B = O, r = 0; D > r; r++) A[l + 3] = T = g * H >> W, 0 !== T ? (T = 255 / T, A[l] = (u * H >> W) * T, A[l + 1] = (v * H >> W) * T, A[l + 2] = (f * H >> W) * T) : A[l] = A[l + 1] = A[l + 2] = 0, u -= p, v -= m, f -= y, g -= _, p -= E.r, m -= E.g, y -= E.b, _ -= E.a, h = d + ((h = r + a + 1) < M ? h : M) << 2, K += E.r = A[h], S += E.g = A[h + 1], C += E.b = A[h + 2], x += E.a = A[h + 3], u += K, v += S, f += C, g += x, E = E.next, p += w = B.r, m += b = B.g, y += F = B.b, _ += T = B.a, K -= w, S -= b, C -= F, x -= T, B = B.next, l += 4;
            d += D
        }
        for (r = 0; D > r; r++) {
            for (S = C = x = K = v = f = g = u = 0, l = r << 2, p = L * (w = A[l]), m = L * (b = A[l + 1]), y = L * (F = A[l + 2]), _ = L * (T = A[l + 3]), u += I * w, v += I * b, f += I * F, g += I * T, U = N, s = 0; L > s; s++) U.r = w, U.g = b, U.b = F, U.a = T, U = U.next;
            for (c = D, s = 1; a >= s; s++) l = c + r << 2, u += (U.r = w = A[l]) * (P = L - s), v += (U.g = b = A[l + 1]) * P, f += (U.b = F = A[l + 2]) * P, g += (U.a = T = A[l + 3]) * P, K += w, S += b, C += F, x += T, U = U.next, R > s && (c += D);
            for (l = r, E = N, B = O, o = 0; k > o; o++) h = l << 2, A[h + 3] = T = g * H >> W, T > 0 ? (T = 255 / T, A[h] = (u * H >> W) * T, A[h + 1] = (v * H >> W) * T, A[h + 2] = (f * H >> W) * T) : A[h] = A[h + 1] = A[h + 2] = 0, u -= p, v -= m, f -= y, g -= _, p -= E.r, m -= E.g, y -= E.b, _ -= E.a, h = r + ((h = o + L) < R ? h : R) * D << 2, u += K += E.r = A[h], v += S += E.g = A[h + 1], f += C += E.b = A[h + 2], g += x += E.a = A[h + 3], E = E.next, p += w = B.r, m += b = B.g, y += F = B.b, _ += T = B.a, K -= w, S -= b, C -= F, x -= T, B = B.next, l += D
        }
    }
    var n = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
        i = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    Konva.Filters.Blur = function (t) {
        var n = Math.round(this.blurRadius());
        n > 0 && e(t, n)
    }, Konva.Factory.addGetterSetter(Konva.Node, "blurRadius", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";

    function t(t, e, n) {
        var i = 4 * (n * t.width + e),
            a = [];
        return a.push(t.data[i++], t.data[i++], t.data[i++], t.data[i++]), a
    }

    function e(t, e) {
        return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
    }

    function n(t) {
        for (var e = [0, 0, 0], n = 0; n < t.length; n++) e[0] += t[n][0], e[1] += t[n][1], e[2] += t[n][2];
        return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e
    }

    function i(i, a) {
        var r = t(i, 0, 0),
            o = t(i, i.width - 1, 0),
            s = t(i, 0, i.height - 1),
            h = t(i, i.width - 1, i.height - 1),
            c = a || 10;
        if (e(r, o) < c && e(o, h) < c && e(h, s) < c && e(s, r) < c) {
            for (var l = n([o, r, h, s]), d = [], u = 0; u < i.width * i.height; u++) {
                var v = e(l, [i.data[4 * u], i.data[4 * u + 1], i.data[4 * u + 2]]);
                d[u] = c > v ? 0 : 255
            }
            return d
        }
    }

    function a(t, e) {
        for (var n = 0; n < t.width * t.height; n++) t.data[4 * n + 3] = e[n]
    }

    function r(t, e, n) {
        for (var i = [1, 1, 1, 1, 0, 1, 1, 1, 1], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; n > s; s++)
            for (var h = 0; e > h; h++) {
                for (var c = s * e + h, l = 0, d = 0; a > d; d++)
                    for (var u = 0; a > u; u++) {
                        var v = s + d - r,
                            f = h + u - r;
                        if (v >= 0 && n > v && f >= 0 && e > f) {
                            var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p
                        }
                    }
                o[c] = 2040 === l ? 255 : 0
            }
        return o
    }

    function o(t, e, n) {
        for (var i = [1, 1, 1, 1, 1, 1, 1, 1, 1], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; n > s; s++)
            for (var h = 0; e > h; h++) {
                for (var c = s * e + h, l = 0, d = 0; a > d; d++)
                    for (var u = 0; a > u; u++) {
                        var v = s + d - r,
                            f = h + u - r;
                        if (v >= 0 && n > v && f >= 0 && e > f) {
                            var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p
                        }
                    }
                o[c] = l >= 1020 ? 255 : 0
            }
        return o
    }

    function s(t, e, n) {
        for (var i = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; n > s; s++)
            for (var h = 0; e > h; h++) {
                for (var c = s * e + h, l = 0, d = 0; a > d; d++)
                    for (var u = 0; a > u; u++) {
                        var v = s + d - r,
                            f = h + u - r;
                        if (v >= 0 && n > v && f >= 0 && e > f) {
                            var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p
                        }
                    }
                o[c] = l
            }
        return o
    }
    Konva.Filters.Mask = function (t) {
        var e = this.threshold(),
            n = i(t, e);
        return n && (n = r(n, t.width, t.height), n = o(n, t.width, t.height), n = s(n, t.width, t.height), a(t, n)), t
    }, Konva.Factory.addGetterSetter(Konva.Node, "threshold", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.RGB = function (t) {
        var e, n, i = t.data,
            a = i.length,
            r = this.red(),
            o = this.green(),
            s = this.blue();
        for (e = 0; a > e; e += 4) n = (.34 * i[e] + .5 * i[e + 1] + .16 * i[e + 2]) / 255, i[e] = n * r, i[e + 1] = n * o, i[e + 2] = n * s, i[e + 3] = i[e + 3]
    }, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function (t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : 0 > t ? 0 : Math.round(t)
    }), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function (t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : 0 > t ? 0 : Math.round(t)
    }), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.RGBA = function (t) {
        var e, n, i = t.data,
            a = i.length,
            r = this.red(),
            o = this.green(),
            s = this.blue(),
            h = this.alpha();
        for (e = 0; a > e; e += 4) n = 1 - h, i[e] = r * h + i[e] * n, i[e + 1] = o * h + i[e + 1] * n, i[e + 2] = s * h + i[e + 2] * n
    }, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function (t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : 0 > t ? 0 : Math.round(t)
    }), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function (t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : 0 > t ? 0 : Math.round(t)
    }), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "alpha", 1, function (t) {
        return this._filterUpToDate = !1, t > 1 ? 1 : 0 > t ? 0 : t
    })
}(),
function () {
    "use strict";
    Konva.Filters.HSV = function (t) {
        var e, n, i, a, r, o = t.data,
            s = o.length,
            h = Math.pow(2, this.value()),
            c = Math.pow(2, this.saturation()),
            l = Math.abs(this.hue() + 360) % 360,
            d = h * c * Math.cos(l * Math.PI / 180),
            u = h * c * Math.sin(l * Math.PI / 180),
            v = .299 * h + .701 * d + .167 * u,
            f = .587 * h - .587 * d + .33 * u,
            g = .114 * h - .114 * d - .497 * u,
            p = .299 * h - .299 * d - .328 * u,
            m = .587 * h + .413 * d + .035 * u,
            y = .114 * h - .114 * d + .293 * u,
            _ = .299 * h - .3 * d + 1.25 * u,
            K = .587 * h - .586 * d - 1.05 * u,
            S = .114 * h + .886 * d - .2 * u;
        for (e = 0; s > e; e += 4) n = o[e + 0], i = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = v * n + f * i + g * a, o[e + 1] = p * n + m * i + y * a, o[e + 2] = _ * n + K * i + S * a, o[e + 3] = r
    }, Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "value", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "luminance", 0, null, Konva.Factory.afterSetFilter), Konva.Filters.HSL = function (t) {
        var e, n, i, a, r, o = t.data,
            s = o.length,
            h = 1,
            c = Math.pow(2, this.saturation()),
            l = Math.abs(this.hue() + 360) % 360,
            d = 127 * this.luminance(),
            u = h * c * Math.cos(l * Math.PI / 180),
            v = h * c * Math.sin(l * Math.PI / 180),
            f = .299 * h + .701 * u + .167 * v,
            g = .587 * h - .587 * u + .33 * v,
            p = .114 * h - .114 * u - .497 * v,
            m = .299 * h - .299 * u - .328 * v,
            y = .587 * h + .413 * u + .035 * v,
            _ = .114 * h - .114 * u + .293 * v,
            K = .299 * h - .3 * u + 1.25 * v,
            S = .587 * h - .586 * u - 1.05 * v,
            C = .114 * h + .886 * u - .2 * v;
        for (e = 0; s > e; e += 4) n = o[e + 0], i = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = f * n + g * i + p * a + d, o[e + 1] = m * n + y * i + _ * a + d, o[e + 2] = K * n + S * i + C * a + d, o[e + 3] = r
    }
}(),
function () {
    "use strict";
    Konva.Filters.Emboss = function (t) {
        var e = 10 * this.embossStrength(),
            n = 255 * this.embossWhiteLevel(),
            i = this.embossDirection(),
            a = this.embossBlend(),
            r = 0,
            o = 0,
            s = t.data,
            h = t.width,
            c = t.height,
            l = 4 * h,
            d = c;
        switch (i) {
            case "top-left":
                r = -1, o = -1;
                break;
            case "top":
                r = -1, o = 0;
                break;
            case "top-right":
                r = -1, o = 1;
                break;
            case "right":
                r = 0, o = 1;
                break;
            case "bottom-right":
                r = 1, o = 1;
                break;
            case "bottom":
                r = 1, o = 0;
                break;
            case "bottom-left":
                r = 1, o = -1;
                break;
            case "left":
                r = 0, o = -1;
                break;
            default:
                Konva.Util.error("Unknwo emboss direction: " + i)
        }
        do {
            var u = (d - 1) * l,
                v = r;
            1 > d + v && (v = 0), d + v > c && (v = 0);
            var f = (d - 1 + v) * h * 4,
                g = h;
            do {
                var p = u + 4 * (g - 1),
                    m = o;
                1 > g + m && (m = 0), g + m > h && (m = 0);
                var y = f + 4 * (g - 1 + m),
                    _ = s[p] - s[y],
                    K = s[p + 1] - s[y + 1],
                    S = s[p + 2] - s[y + 2],
                    C = _,
                    x = C > 0 ? C : -C,
                    w = K > 0 ? K : -K,
                    b = S > 0 ? S : -S;
                if (w > x && (C = K), b > x && (C = S), C *= e, a) {
                    var F = s[p] + C,
                        T = s[p + 1] + C,
                        P = s[p + 2] + C;
                    s[p] = F > 255 ? 255 : 0 > F ? 0 : F, s[p + 1] = T > 255 ? 255 : 0 > T ? 0 : T, s[p + 2] = P > 255 ? 255 : 0 > P ? 0 : P
                } else {
                    var A = n - C;
                    0 > A ? A = 0 : A > 255 && (A = 255), s[p] = s[p + 1] = s[p + 2] = A
                }
            } while (--g)
        } while (--d)
    }, Konva.Factory.addGetterSetter(Konva.Node, "embossStrength", .5, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossWhiteLevel", .5, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossDirection", "top-left", null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossBlend", !1, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";

    function t(t, e, n, i, a) {
        var r, o = n - e,
            s = a - i;
        return 0 === o ? i + s / 2 : 0 === s ? i : (r = (t - e) / o, r = s * r + i)
    }
    Konva.Filters.Enhance = function (e) {
        var n, i, a, r, o = e.data,
            s = o.length,
            h = o[0],
            c = h,
            l = o[1],
            d = l,
            u = o[2],
            v = u,
            f = this.enhance();
        if (0 !== f) {
            for (r = 0; s > r; r += 4) n = o[r + 0], h > n ? h = n : n > c && (c = n), i = o[r + 1], l > i ? l = i : i > d && (d = i), a = o[r + 2], u > a ? u = a : a > v && (v = a);
            c === h && (c = 255, h = 0), d === l && (d = 255, l = 0), v === u && (v = 255, u = 0);
            var g, p, m, y, _, K, S, C, x;
            for (f > 0 ? (p = c + f * (255 - c), m = h - f * (h - 0), _ = d + f * (255 - d), K = l - f * (l - 0), C = v + f * (255 - v), x = u - f * (u - 0)) : (g = .5 * (c + h), p = c + f * (c - g), m = h + f * (h - g), y = .5 * (d + l), _ = d + f * (d - y), K = l + f * (l - y), S = .5 * (v + u), C = v + f * (v - S), x = u + f * (u - S)), r = 0; s > r; r += 4) o[r + 0] = t(o[r + 0], h, c, m, p), o[r + 1] = t(o[r + 1], l, d, K, _), o[r + 2] = t(o[r + 2], u, v, x, C)
        }
    }, Konva.Factory.addGetterSetter(Konva.Node, "enhance", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.Posterize = function (t) {
        var e, n = Math.round(254 * this.levels()) + 1,
            i = t.data,
            a = i.length,
            r = 255 / n;
        for (e = 0; a > e; e += 1) i[e] = Math.floor(i[e] / r) * r
    }, Konva.Factory.addGetterSetter(Konva.Node, "levels", .5, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.Noise = function (t) {
        var e, n = 255 * this.noise(),
            i = t.data,
            a = i.length,
            r = n / 2;
        for (e = 0; a > e; e += 4) i[e + 0] += r - 2 * r * Math.random(), i[e + 1] += r - 2 * r * Math.random(), i[e + 2] += r - 2 * r * Math.random()
    }, Konva.Factory.addGetterSetter(Konva.Node, "noise", .2, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.Pixelate = function (t) {
        var e, n, i, a, r, o, s, h, c, l, d, u, v, f, g = Math.ceil(this.pixelSize()),
            p = t.width,
            m = t.height,
            y = Math.ceil(p / g),
            _ = Math.ceil(m / g);
        if (t = t.data, 0 >= g) return void Konva.Util.error("pixelSize value can not be <= 0");
        for (u = 0; y > u; u += 1)
            for (v = 0; _ > v; v += 1) {
                for (a = 0, r = 0, o = 0, s = 0, h = u * g, c = h + g, l = v * g, d = l + g, f = 0, e = h; c > e; e += 1)
                    if (!(e >= p))
                        for (n = l; d > n; n += 1) n >= m || (i = 4 * (p * n + e), a += t[i + 0], r += t[i + 1], o += t[i + 2], s += t[i + 3], f += 1);
                for (a /= f, r /= f, o /= f, e = h; c > e; e += 1)
                    if (!(e >= p))
                        for (n = l; d > n; n += 1) n >= m || (i = 4 * (p * n + e), t[i + 0] = a, t[i + 1] = r, t[i + 2] = o, t[i + 3] = s)
            }
    }, Konva.Factory.addGetterSetter(Konva.Node, "pixelSize", 8, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Filters.Threshold = function (t) {
        var e, n = 255 * this.threshold(),
            i = t.data,
            a = i.length;
        for (e = 0; a > e; e += 1) i[e] = i[e] < n ? 0 : 255
    }, Konva.Factory.addGetterSetter(Konva.Node, "threshold", .5, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    /**
     * Sepia Filter
     * Based on: Pixastic Lib - Sepia filter - v0.1.0
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * @function
     * @name Sepia
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author Jacob Seidelin <jseidelin@nihilogic.dk>
     * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Sepia]);
     */
    Konva.Filters.Sepia = function (t) {
        var e, n, i, a, r, o, s, h, c, l = t.data,
            d = t.width,
            u = t.height,
            v = 4 * d;
        do {
            e = (u - 1) * v, n = d;
            do i = e + 4 * (n - 1), a = l[i], r = l[i + 1], o = l[i + 2], s = .393 * a + .769 * r + .189 * o, h = .349 * a + .686 * r + .168 * o, c = .272 * a + .534 * r + .131 * o, l[i] = s > 255 ? 255 : s, l[i + 1] = h > 255 ? 255 : h, l[i + 2] = c > 255 ? 255 : c, l[i + 3] = l[i + 3]; while (--n)
        } while (--u)
    }
}(),
function () {
    "use strict";
    Konva.Filters.Solarize = function (t) {
        var e = t.data,
            n = t.width,
            i = t.height,
            a = 4 * n,
            r = i;
        do {
            var o = (r - 1) * a,
                s = n;
            do {
                var h = o + 4 * (s - 1),
                    c = e[h],
                    l = e[h + 1],
                    d = e[h + 2];
                c > 127 && (c = 255 - c), l > 127 && (l = 255 - l), d > 127 && (d = 255 - d), e[h] = c, e[h + 1] = l, e[h + 2] = d
            } while (--s)
        } while (--r)
    }
}(),
function () {
    "use strict";
    var t = function (t, e, n) {
            var i, a, r, o, s = t.data,
                h = e.data,
                c = t.width,
                l = t.height,
                d = n.polarCenterX || c / 2,
                u = n.polarCenterY || l / 2,
                v = 0,
                f = 0,
                g = 0,
                p = 0,
                m = Math.sqrt(d * d + u * u);
            a = c - d, r = l - u, o = Math.sqrt(a * a + r * r), m = o > m ? o : m;
            var y, _, K, S, C = l,
                x = c,
                w = 360 / x * Math.PI / 180;
            for (_ = 0; x > _; _ += 1)
                for (K = Math.sin(_ * w), S = Math.cos(_ * w), y = 0; C > y; y += 1) a = Math.floor(d + m * y / C * S), r = Math.floor(u + m * y / C * K), i = 4 * (r * c + a), v = s[i + 0], f = s[i + 1], g = s[i + 2], p = s[i + 3], i = 4 * (_ + y * c), h[i + 0] = v, h[i + 1] = f, h[i + 2] = g, h[i + 3] = p
        },
        e = function (t, e, n) {
            var i, a, r, o, s, h, c = t.data,
                l = e.data,
                d = t.width,
                u = t.height,
                v = n.polarCenterX || d / 2,
                f = n.polarCenterY || u / 2,
                g = 0,
                p = 0,
                m = 0,
                y = 0,
                _ = Math.sqrt(v * v + f * f);
            a = d - v, r = u - f, h = Math.sqrt(a * a + r * r), _ = h > _ ? h : _;
            var K, S, C, x, w = u,
                b = d,
                F = n.polarRotation || 0;
            for (a = 0; d > a; a += 1)
                for (r = 0; u > r; r += 1) o = a - v, s = r - f, K = Math.sqrt(o * o + s * s) * w / _, S = (180 * Math.atan2(s, o) / Math.PI + 360 + F) % 360, S = S * b / 360, C = Math.floor(S), x = Math.floor(K), i = 4 * (x * d + C), g = c[i + 0], p = c[i + 1], m = c[i + 2], y = c[i + 3], i = 4 * (r * d + a), l[i + 0] = g, l[i + 1] = p, l[i + 2] = m, l[i + 3] = y
        },
        n = Konva.Util.createCanvasElement();
    Konva.Filters.Kaleidoscope = function (i) {
        var a, r, o, s, h, c, l, d, u, v, f = i.width,
            g = i.height,
            p = Math.round(this.kaleidoscopePower()),
            m = Math.round(this.kaleidoscopeAngle()),
            y = Math.floor(f * (m % 360) / 360);
        if (!(1 > p)) {
            n.width = f, n.height = g;
            var _ = n.getContext("2d").getImageData(0, 0, f, g);
            t(i, _, {
                polarCenterX: f / 2,
                polarCenterY: g / 2
            });
            for (var K = f / Math.pow(2, p); 8 >= K;) K = 2 * K, p -= 1;
            K = Math.ceil(K);
            var S = K,
                C = 0,
                x = S,
                w = 1;
            for (y + K > f && (C = S, x = 0, w = -1), r = 0; g > r; r += 1)
                for (a = C; a !== x; a += w) o = Math.round(a + y) % f, u = 4 * (f * r + o), h = _.data[u + 0], c = _.data[u + 1], l = _.data[u + 2], d = _.data[u + 3], v = 4 * (f * r + a), _.data[v + 0] = h, _.data[v + 1] = c, _.data[v + 2] = l, _.data[v + 3] = d;
            for (r = 0; g > r; r += 1)
                for (S = Math.floor(K), s = 0; p > s; s += 1) {
                    for (a = 0; S + 1 > a; a += 1) u = 4 * (f * r + a), h = _.data[u + 0], c = _.data[u + 1], l = _.data[u + 2], d = _.data[u + 3], v = 4 * (f * r + 2 * S - a - 1), _.data[v + 0] = h, _.data[v + 1] = c, _.data[v + 2] = l, _.data[v + 3] = d;
                    S *= 2
                }
            e(_, i, {
                polarRotation: 0
            })
        }
    }, Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopePower", 2, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopeAngle", 0, null, Konva.Factory.afterSetFilter)
}(),
function () {
    "use strict";
    Konva.Container = function (t) {
        this.__init(t)
    }, Konva.Util.addMethods(Konva.Container, {
        __init: function (t) {
            this.children = new Konva.Collection, Konva.Node.call(this, t)
        },
        getChildren: function (t) {
            if (!t) return this.children;
            var e = new Konva.Collection;
            return this.children.each(function (n) {
                t(n) && e.push(n)
            }), e
        },
        hasChildren: function () {
            return this.getChildren().length > 0
        },
        removeChildren: function () {
            for (var t, e = Konva.Collection.toCollection(this.children), n = 0; n < e.length; n++) t = e[n], delete t.parent, t.index = 0, t.remove();
            return e = null, this.children = new Konva.Collection, this
        },
        destroyChildren: function () {
            for (var t, e = Konva.Collection.toCollection(this.children), n = 0; n < e.length; n++) t = e[n], delete t.parent, t.index = 0, t.destroy();
            return e = null, this.children = new Konva.Collection, this
        },
        add: function (t) {
            if (arguments.length > 1) {
                for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                return this
            }
            if (t.getParent()) return t.moveTo(this), this;
            var n = this.children;
            return this._validateAdd(t), t.index = n.length, t.parent = this, n.push(t), this._fire("add", {
                child: t
            }), Konva.DD && t.isDragging() && Konva.DD.anim.setLayers(t.getLayer()), this
        },
        destroy: function () {
            return this.hasChildren() && this.destroyChildren(), Konva.Node.prototype.destroy.call(this), this
        },
        find: function (t) {
            var e, n, i, a, r, o, s, h = [],
                c = t.replace(/ /g, "").split(","),
                l = c.length;
            for (e = 0; l > e; e++)
                if (i = c[e], Konva.Util.isValidSelector(i) || (Konva.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), Konva.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), Konva.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0)) r = this._getNodeById(i.slice(1)), r && h.push(r);
                else if ("." === i.charAt(0)) a = this._getNodesByName(i.slice(1)), h = h.concat(a);
            else
                for (o = this.getChildren(), s = o.length, n = 0; s > n; n++) h = h.concat(o[n]._get(i));
            return Konva.Collection.toCollection(h)
        },
        findOne: function (t) {
            return this.find(t)[0]
        },
        _getNodeById: function (t) {
            var e = Konva.ids[t];
            return void 0 !== e && this.isAncestorOf(e) ? e : null
        },
        _getNodesByName: function (t) {
            var e = Konva.names[t] || [];
            return this._getDescendants(e)
        },
        _get: function (t) {
            for (var e = Konva.Node.prototype._get.call(this, t), n = this.getChildren(), i = n.length, a = 0; i > a; a++) e = e.concat(n[a]._get(t));
            return e
        },
        toObject: function () {
            var t = Konva.Node.prototype.toObject.call(this);
            t.children = [];
            for (var e = this.getChildren(), n = e.length, i = 0; n > i; i++) {
                var a = e[i];
                t.children.push(a.toObject())
            }
            return t
        },
        _getDescendants: function (t) {
            for (var e = [], n = t.length, i = 0; n > i; i++) {
                var a = t[i];
                this.isAncestorOf(a) && e.push(a)
            }
            return e
        },
        isAncestorOf: function (t) {
            for (var e = t.getParent(); e;) {
                if (e._id === this._id) return !0;
                e = e.getParent()
            }
            return !1
        },
        clone: function (t) {
            var e = Konva.Node.prototype.clone.call(this, t);
            return this.getChildren().each(function (t) {
                e.add(t.clone())
            }), e
        },
        getAllIntersections: function (t) {
            var e = [];
            return this.find("Shape").each(function (n) {
                n.isVisible() && n.intersects(t) && e.push(n)
            }), e
        },
        _setChildrenIndices: function () {
            this.children.each(function (t, e) {
                t.index = e
            })
        },
        drawScene: function (t, e, n) {
            var i = this.getLayer(),
                a = t || i && i.getCanvas(),
                r = a && a.getContext(),
                o = this._cache.canvas,
                s = o && o.scene;
            return this.isVisible() && (!n && s ? (r.save(), i._applyTransform(this, r, e), this._drawCachedSceneCanvas(r), r.restore()) : this._drawChildren(a, "drawScene", e, !1, n)), this
        },
        drawHit: function (t, e, n) {
            var i = this.getLayer(),
                a = t || i && i.hitCanvas,
                r = a && a.getContext(),
                o = this._cache.canvas,
                s = o && o.hit;
            return this.shouldDrawHit(a) && (i && i.clearHitCache(), !n && s ? (r.save(), i._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore()) : this._drawChildren(a, "drawHit", e)), this
        },
        _drawChildren: function (t, e, n, i, a) {
            var r, o, s = this.getLayer(),
                h = t && t.getContext(),
                c = this.getClipWidth(),
                l = this.getClipHeight(),
                d = this.getClipFunc(),
                u = c && l || d;
            u && s && (h.save(), s._applyTransform(this, h), h.beginPath(), d ? d.call(this, h, this) : (r = this.getClipX(), o = this.getClipY(), h.rect(r, o, c, l)), h.clip(), h.reset()), this.children.each(function (r) {
                r[e](t, n, i, a)
            }), u && h.restore()
        },
        shouldDrawHit: function (t) {
            var e = this.getLayer(),
                n = Konva.DD,
                i = n && Konva.isDragging() && -1 !== Konva.DD.anim.getLayers().indexOf(e);
            return t && t.isCache || e && e.hitGraphEnabled() && this.isVisible() && !i
        },
        getClientRect: function (t) {
            var e, n, i, a, r = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            return this.children.each(function (t) {
                var r = t.getClientRect();
                void 0 === e ? (e = r.x, n = r.y, i = r.x + r.width, a = r.y + r.height) : (e = Math.min(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.x + r.width), a = Math.max(a, r.y + r.height))
            }), 0 !== this.children.length && (r = {
                x: e,
                y: n,
                width: i - e,
                height: a - n
            }), t ? r : this._transformedRect(r)
        }
    }), Konva.Util.extend(Konva.Container, Konva.Node), Konva.Container.prototype.get = Konva.Container.prototype.find, Konva.Factory.addComponentsGetterSetter(Konva.Container, "clip", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Container, "clipX"), Konva.Factory.addGetterSetter(Konva.Container, "clipY"), Konva.Factory.addGetterSetter(Konva.Container, "clipWidth"), Konva.Factory.addGetterSetter(Konva.Container, "clipHeight"), Konva.Factory.addGetterSetter(Konva.Container, "clipFunc"), Konva.Collection.mapMethods(Konva.Container)
}(),
function (t) {
    "use strict";

    function e(t) {
        t.fill()
    }

    function n(t) {
        t.stroke()
    }

    function i(t) {
        t.fill()
    }

    function a(t) {
        t.stroke()
    }

    function r() {
        this._clearCache(s)
    }

    function o() {
        this._clearCache(h)
    }
    var s = "hasShadow",
        h = "shadowRGBA";
    t.Shape = function (t) {
        this.__init(t)
    }, t.Util.addMethods(t.Shape, {
        __init: function (s) {
            this.nodeType = "Shape", this._fillFunc = e, this._strokeFunc = n, this._fillFuncHit = i, this._strokeFuncHit = a;
            for (var h, c = t.shapes;;)
                if (h = t.Util.getRandomColor(), h && !(h in c)) break;
            this.colorKey = h, c[h] = this, t.Node.call(this, s), this.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", r), this.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", o)
        },
        hasChildren: function () {
            return !1
        },
        getChildren: function () {
            return []
        },
        getContext: function () {
            return this.getLayer().getContext()
        },
        getCanvas: function () {
            return this.getLayer().getCanvas()
        },
        hasShadow: function () {
            return this._getCache(s, this._hasShadow)
        },
        _hasShadow: function () {
            return this.getShadowEnabled() && 0 !== this.getShadowOpacity() && !!(this.getShadowColor() || this.getShadowBlur() || this.getShadowOffsetX() || this.getShadowOffsetY())
        },
        getShadowRGBA: function () {
            return this._getCache(h, this._getShadowRGBA)
        },
        _getShadowRGBA: function () {
            if (this.hasShadow()) {
                var e = t.Util.colorToRGBA(this.shadowColor());
                return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a * (this.getShadowOpacity() || 1) + ")"
            }
        },
        hasFill: function () {
            return !!(this.getFill() || this.getFillPatternImage() || this.getFillLinearGradientColorStops() || this.getFillRadialGradientColorStops())
        },
        hasStroke: function () {
            return this.strokeEnabled() && !!this.stroke()
        },
        intersects: function (t) {
            var e, n = this.getStage(),
                i = n.bufferHitCanvas;
            return i.getContext().clear(), this.drawScene(i), e = i.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data, e[3] > 0
        },
        destroy: function () {
            return t.Node.prototype.destroy.call(this), delete t.shapes[this.colorKey], this
        },
        _useBufferCanvas: function (t) {
            return !t && this.perfectDrawEnabled() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage() || this.perfectDrawEnabled() && this.hasShadow() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage()
        },
        getSelfRect: function () {
            var t = this.getSize();
            return {
                x: this._centroid ? Math.round(-t.width / 2) : 0,
                y: this._centroid ? Math.round(-t.height / 2) : 0,
                width: t.width,
                height: t.height
            }
        },
        getClientRect: function (t) {
            var e = this.getSelfRect(),
                n = this.hasStroke() && this.strokeWidth() || 0,
                i = e.width + n,
                a = e.height + n,
                r = this.hasShadow() ? this.shadowOffsetX() : 0,
                o = this.hasShadow() ? this.shadowOffsetY() : 0,
                s = i + Math.abs(r),
                h = a + Math.abs(o),
                c = this.hasShadow() && this.shadowBlur() || 0,
                l = s + 2 * c,
                d = h + 2 * c,
                u = 0;
            Math.round(n / 2) !== n / 2 && (u = 1);
            var v = {
                width: l + u,
                height: d + u,
                x: -Math.round(n / 2 + c) + Math.min(r, 0) + e.x,
                y: -Math.round(n / 2 + c) + Math.min(o, 0) + e.y
            };
            return t ? v : this._transformedRect(v)
        },
        drawScene: function (t, e, n, i) {
            var a, r, o, s = this.getLayer(),
                h = t || s.getCanvas(),
                c = h.getContext(),
                l = this._cache.canvas,
                d = this.sceneFunc(),
                u = this.hasShadow(),
                v = this.hasStroke();
            if (!this.isVisible()) return this;
            if (l) return c.save(), s._applyTransform(this, c, e), this._drawCachedSceneCanvas(c), c.restore(), this;
            if (!d) return this;
            if (c.save(), this._useBufferCanvas(n) && !i) {
                if (a = this.getStage(), r = a.bufferCanvas, o = r.getContext(), o.clear(), o.save(), o._applyLineJoin(this), !n)
                    if (s) s._applyTransform(this, o, e);
                    else {
                        var f = this.getAbsoluteTransform(e).getMatrix();
                        c.transform(f[0], f[1], f[2], f[3], f[4], f[5])
                    }
                d.call(this, o), o.restore();
                var g = r.pixelRatio;
                u && !h.hitCanvas ? (c.save(), c._applyShadow(this), c._applyOpacity(this), c.drawImage(r._canvas, 0, 0, r.width / g, r.height / g), c.restore()) : (c._applyOpacity(this), c.drawImage(r._canvas, 0, 0, r.width / g, r.height / g))
            } else {
                if (c._applyLineJoin(this), !n)
                    if (s) s._applyTransform(this, c, e);
                    else {
                        var p = this.getAbsoluteTransform(e).getMatrix();
                        c.transform(p[0], p[1], p[2], p[3], p[4], p[5])
                    }
                u && v && !h.hitCanvas ? (c.save(), n || c._applyOpacity(this), c._applyShadow(this), d.call(this, c), c.restore(), this.hasFill() && this.getShadowForStrokeEnabled() && d.call(this, c)) : u && !h.hitCanvas ? (c.save(), n || c._applyOpacity(this), c._applyShadow(this), d.call(this, c), c.restore()) : (n || c._applyOpacity(this), d.call(this, c))
            }
            return c.restore(), this
        },
        drawHit: function (t, e, n) {
            var i = this.getLayer(),
                a = t || i.hitCanvas,
                r = a.getContext(),
                o = this.hitFunc() || this.sceneFunc(),
                s = this._cache.canvas,
                h = s && s.hit;
            if (!this.shouldDrawHit(a)) return this;
            if (i && i.clearHitCache(), h) return r.save(), i._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore(), this;
            if (!o) return this;
            if (r.save(), r._applyLineJoin(this), !n)
                if (i) i._applyTransform(this, r, e);
                else {
                    var c = this.getAbsoluteTransform(e).getMatrix();
                    r.transform(c[0], c[1], c[2], c[3], c[4], c[5])
                }
            return o.call(this, r), r.restore(), this
        },
        drawHitFromCache: function (e) {
            var n, i, a, r, o, s, h = e || 0,
                c = this._cache.canvas,
                l = this._getCachedSceneCanvas(),
                d = c.hit,
                u = d.getContext(),
                v = d.getWidth(),
                f = d.getHeight();
            u.clear(), u.drawImage(l._canvas, 0, 0, v, f);
            try {
                for (n = u.getImageData(0, 0, v, f), i = n.data, a = i.length, r = t.Util._hexToRgb(this.colorKey), o = 0; a > o; o += 4) s = i[o + 3], s > h ? (i[o] = r.r, i[o + 1] = r.g, i[o + 2] = r.b, i[o + 3] = 255) : i[o + 3] = 0;
                u.putImageData(n, 0, 0)
            } catch (g) {
                t.Util.error("Unable to draw hit graph from cached scene canvas. " + g.message)
            }
            return this
        }
    }), t.Util.extend(t.Shape, t.Node), t.Factory.addGetterSetter(t.Shape, "stroke"), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "strokeWidth", 2), t.Factory.addGetterSetter(t.Shape, "strokeHitEnabled", !0), t.Factory.addGetterSetter(t.Shape, "perfectDrawEnabled", !0), t.Factory.addGetterSetter(t.Shape, "shadowForStrokeEnabled", !0), t.Factory.addGetterSetter(t.Shape, "lineJoin"), t.Factory.addGetterSetter(t.Shape, "lineCap"), t.Factory.addGetterSetter(t.Shape, "sceneFunc"), t.Factory.addGetterSetter(t.Shape, "hitFunc"), t.Factory.addGetterSetter(t.Shape, "dash"), t.Factory.addGetterSetter(t.Shape, "shadowColor"), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "shadowBlur"), t.Factory.addGetterSetter(t.Shape, "shadowOpacity"), t.Factory.addComponentsGetterSetter(t.Shape, "shadowOffset", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "shadowOffsetX", 0), t.Factory.addGetterSetter(t.Shape, "shadowOffsetY", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternImage"), t.Factory.addGetterSetter(t.Shape, "fill"), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "fillPatternX", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternY", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientColorStops"), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartRadius", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndRadius", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientColorStops"), t.Factory.addGetterSetter(t.Shape, "fillPatternRepeat", "repeat"), t.Factory.addGetterSetter(t.Shape, "fillEnabled", !0), t.Factory.addGetterSetter(t.Shape, "strokeEnabled", !0), t.Factory.addGetterSetter(t.Shape, "shadowEnabled", !0), t.Factory.addGetterSetter(t.Shape, "dashEnabled", !0), t.Factory.addGetterSetter(t.Shape, "strokeScaleEnabled", !0), t.Factory.addGetterSetter(t.Shape, "fillPriority", "color"), t.Factory.addComponentsGetterSetter(t.Shape, "fillPatternOffset", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillPatternOffsetX", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternOffsetY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillPatternScale", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillPatternScaleX", 1), t.Factory.addGetterSetter(t.Shape, "fillPatternScaleY", 1), t.Factory.addComponentsGetterSetter(t.Shape, "fillLinearGradientStartPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientStartPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientStartPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillLinearGradientEndPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientEndPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientEndPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillRadialGradientStartPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillRadialGradientEndPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndPointY", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternRotation", 0), t.Factory.backCompat(t.Shape, {
        dashArray: "dash",
        getDashArray: "getDash",
        setDashArray: "getDash",
        drawFunc: "sceneFunc",
        getDrawFunc: "getSceneFunc",
        setDrawFunc: "setSceneFunc",
        drawHitFunc: "hitFunc",
        getDrawHitFunc: "getHitFunc",
        setDrawHitFunc: "setHitFunc"
    }), t.Collection.mapMethods(t.Shape)
}(Konva),
function () {
    "use strict";

    function t(t, e) {
        t.content.addEventListener(e, function (n) {
            t[O + e](n)
        }, !1)
    }
    var e = "Stage",
        n = "string",
        i = "px",
        a = "mouseout",
        r = "mouseleave",
        o = "mouseover",
        s = "mouseenter",
        h = "mousemove",
        c = "mousedown",
        l = "mouseup",
        d = "click",
        u = "dblclick",
        v = "touchstart",
        f = "touchend",
        g = "tap",
        p = "dbltap",
        m = "touchmove",
        y = "DOMMouseScroll",
        _ = "mousewheel",
        K = "wheel",
        S = "contentMouseout",
        C = "contentMouseover",
        x = "contentMousemove",
        w = "contentMousedown",
        b = "contentMouseup",
        F = "contentClick",
        T = "contentDblclick",
        P = "contentTouchstart",
        A = "contentTouchend",
        D = "contentDbltap",
        k = "contentTap",
        G = "contentTouchmove",
        M = "contentWheel",
        R = "div",
        L = "relative",
        I = "konvajs-content",
        N = " ",
        O = "_",
        U = "container",
        E = "",
        B = [c, h, l, a, v, m, f, o, y, _, K],
        H = B.length;
    Konva.Stage = function (t) {
        this.___init(t)
    }, Konva.Util.addMethods(Konva.Stage, {
        ___init: function (t) {
            this.nodeType = e, Konva.Container.call(this, t), this._id = Konva.idCounter++, this._buildDOM(), this._bindContentEvents(), this._enableNestedTransforms = !1, Konva.stages.push(this)
        },
        _validateAdd: function (t) {
            "Layer" !== t.getType() && Konva.Util["throw"]("You may only add layers to the stage.")
        },
        setContainer: function (t) {
            if (typeof t === n) {
                if ("." === t.charAt(0)) {
                    var e = t.slice(1);
                    t = Konva.document.getElementsByClassName(e)[0]
                } else {
                    var i;
                    i = "#" !== t.charAt(0) ? t : t.slice(1), t = Konva.document.getElementById(i)
                }
                if (!t) throw "Can not find container in document with id " + i
            }
            return this._setAttr(U, t), this
        },
        shouldDrawHit: function () {
            return !0
        },
        draw: function () {
            return Konva.Node.prototype.draw.call(this), this
        },
        setHeight: function (t) {
            return Konva.Node.prototype.setHeight.call(this, t), this._resizeDOM(), this
        },
        setWidth: function (t) {
            return Konva.Node.prototype.setWidth.call(this, t), this._resizeDOM(), this
        },
        clear: function () {
            var t, e = this.children,
                n = e.length;
            for (t = 0; n > t; t++) e[t].clear();
            return this
        },
        clone: function (t) {
            return t || (t = {}), t.container = Konva.document.createElement(R), Konva.Container.prototype.clone.call(this, t)
        },
        destroy: function () {
            var t = this.content;
            Konva.Container.prototype.destroy.call(this), t && Konva.Util._isInDocument(t) && this.getContainer().removeChild(t);
            var e = Konva.stages.indexOf(this);
            return e > -1 && Konva.stages.splice(e, 1), this
        },
        getPointerPosition: function () {
            return this.pointerPos
        },
        getStage: function () {
            return this
        },
        getContent: function () {
            return this.content
        },
        toDataURL: function (t) {
            t = t || {};
            var e = t.mimeType || null,
                n = t.quality || null,
                i = t.x || 0,
                a = t.y || 0,
                r = new Konva.SceneCanvas({
                    width: t.width || this.getWidth(),
                    height: t.height || this.getHeight(),
                    pixelRatio: t.pixelRatio
                }),
                o = r.getContext()._context,
                s = this.children;
            (i || a) && o.translate(-1 * i, -1 * a), s.each(function (t) {
                var e = t.getCanvas().getWidth(),
                    n = t.getCanvas().getHeight(),
                    i = t.getCanvas().getPixelRatio();
                o.drawImage(t.getCanvas()._canvas, 0, 0, e / i, n / i)
            });
            var h = r.toDataURL(e, n);
            return t.callback && t.callback(h), h
        },
        toImage: function (t) {
            var e = t.callback;
            t.callback = function (t) {
                Konva.Util._getImage(t, function (t) {
                    e(t)
                })
            }, this.toDataURL(t)
        },
        getIntersection: function (t, e) {
            var n, i, a = this.getChildren(),
                r = a.length,
                o = r - 1;
            for (n = o; n >= 0; n--)
                if (i = a[n].getIntersection(t, e)) return i;
            return null
        },
        _resizeDOM: function () {
            if (this.content) {
                var t, e, n = this.getWidth(),
                    a = this.getHeight(),
                    r = this.getChildren(),
                    o = r.length;
                for (this.content.style.width = n + i, this.content.style.height = a + i, this.bufferCanvas.setSize(n, a), this.bufferHitCanvas.setSize(n, a), t = 0; o > t; t++) e = r[t], e.setSize(n, a), e.draw()
            }
        },
        add: function (t) {
            if (arguments.length > 1) {
                for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                return this
            }
            return Konva.Container.prototype.add.call(this, t), t._setCanvasSize(this.width(), this.height()), t.draw(), this.content.appendChild(t.canvas._canvas), this
        },
        getParent: function () {
            return null
        },
        getLayer: function () {
            return null
        },
        getLayers: function () {
            return this.getChildren()
        },
        _bindContentEvents: function () {
            for (var e = 0; H > e; e++) t(this, B[e])
        },
        _mouseover: function (t) {
            Konva.UA.mobile || (this._setPointerPosition(t), this._fire(C, {
                evt: t
            }))
        },
        _mouseout: function (t) {
            if (!Konva.UA.mobile) {
                this._setPointerPosition(t);
                var e = this.targetShape;
                e && !Konva.isDragging() && (e._fireAndBubble(a, {
                    evt: t
                }), e._fireAndBubble(r, {
                    evt: t
                }), this.targetShape = null), this.pointerPos = void 0, this._fire(S, {
                    evt: t
                })
            }
        },
        _mousemove: function (t) {
            if (Konva.UA.ieMobile) return this._touchmove(t);
            if (("undefined" != typeof t.movementX || "undefined" != typeof t.movementY) && 0 === t.movementY && 0 === t.movementX) return null;
            if (Konva.UA.mobile) return null;
            this._setPointerPosition(t);
            var e;
            Konva.isDragging() || (e = this.getIntersection(this.getPointerPosition()), e && e.isListening() ? Konva.isDragging() || this.targetShape && this.targetShape._id === e._id ? e._fireAndBubble(h, {
                evt: t
            }) : (this.targetShape && (this.targetShape._fireAndBubble(a, {
                evt: t
            }, e), this.targetShape._fireAndBubble(r, {
                evt: t
            }, e)), e._fireAndBubble(o, {
                evt: t
            }, this.targetShape), e._fireAndBubble(s, {
                evt: t
            }, this.targetShape), this.targetShape = e) : this.targetShape && !Konva.isDragging() && (this.targetShape._fireAndBubble(a, {
                evt: t
            }), this.targetShape._fireAndBubble(r, {
                evt: t
            }), this.targetShape = null), this._fire(x, {
                evt: t
            })), t.preventDefault && t.preventDefault()
        },
        _mousedown: function (t) {
            if (Konva.UA.ieMobile) return this._touchstart(t);
            if (!Konva.UA.mobile) {
                this._setPointerPosition(t);
                var e = this.getIntersection(this.getPointerPosition());
                Konva.listenClickTap = !0, e && e.isListening() && (this.clickStartShape = e, e._fireAndBubble(c, {
                    evt: t
                })), this._fire(w, {
                    evt: t
                })
            }
            t.preventDefault && t.preventDefault()
        },
        _mouseup: function (t) {
            if (Konva.UA.ieMobile) return this._touchend(t);
            if (!Konva.UA.mobile) {
                this._setPointerPosition(t);
                var e = this.getIntersection(this.getPointerPosition()),
                    n = this.clickStartShape,
                    i = !1,
                    a = Konva.DD;
                Konva.inDblClickWindow ? (i = !0, Konva.inDblClickWindow = !1) : a && a.justDragged ? a && (a.justDragged = !1) : Konva.inDblClickWindow = !0, setTimeout(function () {
                    Konva.inDblClickWindow = !1
                }, Konva.dblClickWindow), e && e.isListening() && (e._fireAndBubble(l, {
                    evt: t
                }), Konva.listenClickTap && n && n._id === e._id && (e._fireAndBubble(d, {
                    evt: t
                }), i && e._fireAndBubble(u, {
                    evt: t
                }))), this._fire(b, {
                    evt: t
                }), Konva.listenClickTap && (this._fire(F, {
                    evt: t
                }), i && this._fire(T, {
                    evt: t
                })), Konva.listenClickTap = !1
            }
            t.preventDefault && t.preventDefault()
        },
        _touchstart: function (t) {
            this._setPointerPosition(t);
            var e = this.getIntersection(this.getPointerPosition());
            Konva.listenClickTap = !0, e && e.isListening() && (this.tapStartShape = e, e._fireAndBubble(v, {
                evt: t
            }), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire(P, {
                evt: t
            })
        },
        _touchend: function (t) {
            this._setPointerPosition(t);
            var e = this.getIntersection(this.getPointerPosition()),
                n = !1;
            Konva.inDblClickWindow ? (n = !0, Konva.inDblClickWindow = !1) : Konva.inDblClickWindow = !0, setTimeout(function () {
                Konva.inDblClickWindow = !1
            }, Konva.dblClickWindow), e && e.isListening() && (e._fireAndBubble(f, {
                evt: t
            }), Konva.listenClickTap && this.tapStartShape && e._id === this.tapStartShape._id && (e._fireAndBubble(g, {
                evt: t
            }), n && e._fireAndBubble(p, {
                evt: t
            })), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire(A, {
                evt: t
            }), Konva.listenClickTap && (this._fire(k, {
                evt: t
            }), n && this._fire(D, {
                evt: t
            })), Konva.listenClickTap = !1
        },
        _touchmove: function (t) {
            this._setPointerPosition(t);
            var e, n = Konva.DD;
            Konva.isDragging() || (e = this.getIntersection(this.getPointerPosition()), e && e.isListening() && (e._fireAndBubble(m, {
                evt: t
            }), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire(G, {
                evt: t
            })), n && Konva.isDragging() && Konva.DD.node.preventDefault() && t.preventDefault()
        },
        _DOMMouseScroll: function (t) {
            this._mousewheel(t)
        },
        _mousewheel: function (t) {
            this._setPointerPosition(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() && e._fireAndBubble(K, {
                evt: t
            }), this._fire(M, {
                evt: t
            })
        },
        _wheel: function (t) {
            this._mousewheel(t)
        },
        _setPointerPosition: function (t) {
            var e = this._getContentPosition(),
                n = null,
                i = null;
            if (t = t ? t : window.event, void 0 !== t.touches) {
                if (t.touches.length > 0) {
                    var a = t.touches[0];
                    n = a.clientX - e.left, i = a.clientY - e.top
                }
            } else n = t.clientX - e.left, i = t.clientY - e.top;
            null !== n && null !== i && (this.pointerPos = {
                x: n,
                y: i
            })
        },
        _getContentPosition: function () {
            var t = this.content.getBoundingClientRect ? this.content.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: t.top,
                left: t.left
            }
        },
        _buildDOM: function () {
            var t = this.getContainer();
            if (!t) {
                if (Konva.Util.isBrowser()) throw "Stage has no container. A container is required.";
                t = Konva.document.createElement(R)
            }
            t.innerHTML = E, this.content = Konva.document.createElement(R), this.content.style.position = L, this.content.className = I, this.content.setAttribute("role", "presentation"), t.appendChild(this.content), this.bufferCanvas = new Konva.SceneCanvas, this.bufferHitCanvas = new Konva.HitCanvas({
                pixelRatio: 1
            }), this._resizeDOM()
        },
        _onContent: function (t, e) {
            var n, i, a = t.split(N),
                r = a.length;
            for (n = 0; r > n; n++) i = a[n], this.content.addEventListener(i, e, !1)
        },
        cache: function () {
            Konva.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.")
        },
        clearCache: function () {}
    }), Konva.Util.extend(Konva.Stage, Konva.Container), Konva.Factory.addGetter(Konva.Stage, "container"), Konva.Factory.addOverloadedGetterSetter(Konva.Stage, "container")
}(),
function () {
    "use strict";
    Konva.BaseLayer = function (t) {
        this.___init(t)
    }, Konva.Util.addMethods(Konva.BaseLayer, {
        ___init: function (t) {
            this.nodeType = "Layer", Konva.Container.call(this, t)
        },
        createPNGStream: function () {
            return this.canvas._canvas.createPNGStream()
        },
        getCanvas: function () {
            return this.canvas
        },
        getHitCanvas: function () {
            return this.hitCanvas
        },
        getContext: function () {
            return this.getCanvas().getContext()
        },
        clear: function (t) {
            return this.getContext().clear(t), this
        },
        clearHitCache: function () {
            this._hitImageData = void 0
        },
        setZIndex: function (t) {
            Konva.Node.prototype.setZIndex.call(this, t);
            var e = this.getStage();
            return e && (e.content.removeChild(this.getCanvas()._canvas), t < e.getChildren().length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.getChildren()[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas)), this
        },
        moveToTop: function () {
            Konva.Node.prototype.moveToTop.call(this);
            var t = this.getStage();
            return t && (t.content.removeChild(this.getCanvas()._canvas), t.content.appendChild(this.getCanvas()._canvas)), this
        },
        moveUp: function () {
            var t = Konva.Node.prototype.moveUp.call(this);
            if (!t) return this;
            var e = this.getStage();
            return e ? (e.content.removeChild(this.getCanvas()._canvas), this.index < e.getChildren().length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.getChildren()[this.index + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas), this) : this
        },
        moveDown: function () {
            if (Konva.Node.prototype.moveDown.call(this)) {
                var t = this.getStage();
                if (t) {
                    var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas)
                }
            }
            return this
        },
        moveToBottom: function () {
            if (Konva.Node.prototype.moveToBottom.call(this)) {
                var t = this.getStage();
                if (t) {
                    var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas)
                }
            }
            return this
        },
        getLayer: function () {
            return this
        },
        remove: function () {
            var t = this.getCanvas()._canvas;
            return Konva.Node.prototype.remove.call(this), t && t.parentNode && Konva.Util._isInDocument(t) && t.parentNode.removeChild(t), this
        },
        getStage: function () {
            return this.parent
        },
        setSize: function (t, e) {
            return this.canvas.setSize(t, e), this
        },
        getWidth: function () {
            return this.parent ? this.parent.getWidth() : void 0
        },
        setWidth: function () {
            Konva.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
        },
        getHeight: function () {
            return this.parent ? this.parent.getHeight() : void 0
        },
        setHeight: function () {
            Konva.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
        },
        _applyTransform: function (t, e, n) {
            var i = t.getAbsoluteTransform(n).getMatrix();
            e.transform(i[0], i[1], i[2], i[3], i[4], i[5])
        }
    }), Konva.Util.extend(Konva.BaseLayer, Konva.Container), Konva.Factory.addGetterSetter(Konva.BaseLayer, "clearBeforeDraw", !0), Konva.Collection.mapMethods(Konva.BaseLayer)
}(),
function () {
    "use strict";
    var t = "#",
        e = "beforeDraw",
        n = "draw",
        i = [{
            x: 0,
            y: 0
        }, {
            x: -1,
            y: 0
        }, {
            x: -1,
            y: -1
        }, {
            x: 0,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 0
        }, {
            x: 1,
            y: 1
        }, {
            x: 0,
            y: 1
        }, {
            x: -1,
            y: 1
        }],
        a = i.length;
    Konva.Layer = function (t) {
        this.____init(t)
    }, Konva.Util.addMethods(Konva.Layer, {
        ____init: function (t) {
            this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, this.hitCanvas = new Konva.HitCanvas({
                pixelRatio: 1
            }), Konva.BaseLayer.call(this, t)
        },
        _setCanvasSize: function (t, e) {
            this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e)
        },
        _validateAdd: function (t) {
            var e = t.getType();
            "Group" !== e && "Shape" !== e && Konva.Util["throw"]("You may only add groups and shapes to a layer.")
        },
        getIntersection: function (t, e) {
            var n, r, o, s;
            if (!this.hitGraphEnabled() || !this.isVisible()) return null;
            for (var h = 1, c = !1;;) {
                for (r = 0; a > r; r++) {
                    if (o = i[r], n = this._getIntersection({
                            x: t.x + o.x * h,
                            y: t.y + o.y * h
                        }), s = n.shape, s && e) return s.findAncestor(e, !0);
                    if (s) return s;
                    if (c = !!n.antialiased, !n.antialiased) break
                }
                if (!c) return null;
                h += 1
            }
        },
        _getImageData: function (t, e) {
            var n = this.hitCanvas.width || 1,
                i = this.hitCanvas.height || 1,
                a = Math.round(e) * n + Math.round(t);
            return this._hitImageData || (this._hitImageData = this.hitCanvas.context.getImageData(0, 0, n, i)), [this._hitImageData.data[4 * a + 0], this._hitImageData.data[4 * a + 1], this._hitImageData.data[4 * a + 2], this._hitImageData.data[4 * a + 3]]
        },
        _getIntersection: function (e) {
            var n, i, a = this.hitCanvas.pixelRatio,
                r = this.hitCanvas.context.getImageData(Math.round(e.x * a), Math.round(e.y * a), 1, 1).data,
                o = r[3];
            return 255 === o ? (n = Konva.Util._rgbToHex(r[0], r[1], r[2]), i = Konva.shapes[t + n], i ? {
                shape: i
            } : {
                antialiased: !0
            }) : o > 0 ? {
                antialiased: !0
            } : {}
        },
        drawScene: function (t, i) {
            var a = this.getLayer(),
                r = t || a && a.getCanvas();
            return this._fire(e, {
                node: this
            }), this.getClearBeforeDraw() && r.getContext().clear(), Konva.Container.prototype.drawScene.call(this, r, i), this._fire(n, {
                node: this
            }), this
        },
        drawHit: function (t, e) {
            var n = this.getLayer(),
                i = t || n && n.hitCanvas;
            return n && n.getClearBeforeDraw() && n.getHitCanvas().getContext().clear(), Konva.Container.prototype.drawHit.call(this, i, e), this.imageData = null, this
        },
        clear: function (t) {
            return Konva.BaseLayer.prototype.clear.call(this, t), this.getHitCanvas().getContext().clear(t), this.imageData = null, this
        },
        setVisible: function (t) {
            return Konva.Node.prototype.setVisible.call(this, t), t ? (this.getCanvas()._canvas.style.display = "block", this.hitCanvas._canvas.style.display = "block") : (this.getCanvas()._canvas.style.display = "none", this.hitCanvas._canvas.style.display = "none"), this
        },
        enableHitGraph: function () {
            return this.setHitGraphEnabled(!0), this
        },
        disableHitGraph: function () {
            return this.setHitGraphEnabled(!1), this
        },
        setSize: function (t, e) {
            return Konva.BaseLayer.prototype.setSize.call(this, t, e), this.hitCanvas.setSize(t, e), this
        }
    }), Konva.Util.extend(Konva.Layer, Konva.BaseLayer), Konva.Factory.addGetterSetter(Konva.Layer, "hitGraphEnabled", !0), Konva.Collection.mapMethods(Konva.Layer)
}(),
function () {
    "use strict";
    Konva.FastLayer = function (t) {
        this.____init(t)
    }, Konva.Util.addMethods(Konva.FastLayer, {
        ____init: function (t) {
            this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, Konva.BaseLayer.call(this, t)
        },
        _validateAdd: function (t) {
            var e = t.getType();
            "Shape" !== e && Konva.Util["throw"]("You may only add shapes to a fast layer.")
        },
        _setCanvasSize: function (t, e) {
            this.canvas.setSize(t, e)
        },
        hitGraphEnabled: function () {
            return !1
        },
        getIntersection: function () {
            return null
        },
        drawScene: function (t) {
            var e = this.getLayer(),
                n = t || e && e.getCanvas();
            return this.getClearBeforeDraw() && n.getContext().clear(), Konva.Container.prototype.drawScene.call(this, n), this
        },
        draw: function () {
            return this.drawScene(), this
        },
        setVisible: function (t) {
            return Konva.Node.prototype.setVisible.call(this, t), t ? this.getCanvas()._canvas.style.display = "block" : this.getCanvas()._canvas.style.display = "none", this
        }
    }), Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer), Konva.Collection.mapMethods(Konva.FastLayer)
}(),
function () {
    "use strict";
    Konva.Group = function (t) {
        this.___init(t)
    }, Konva.Util.addMethods(Konva.Group, {
        ___init: function (t) {
            this.nodeType = "Group", Konva.Container.call(this, t)
        },
        _validateAdd: function (t) {
            var e = t.getType();
            "Group" !== e && "Shape" !== e && Konva.Util["throw"]("You may only add groups and shapes to groups.")
        }
    }), Konva.Util.extend(Konva.Group, Konva.Container), Konva.Collection.mapMethods(Konva.Group)
}(),
function (t) {
    "use strict";

    function e(t) {
        setTimeout(t, 1e3 / 60)
    }

    function n() {
        return a.apply(t.global, arguments)
    }
    var i = function () {
            return t.global.performance && t.global.performance.now ? function () {
                return t.global.performance.now()
            } : function () {
                return (new Date).getTime()
            }
        }(),
        a = function () {
            return t.global.requestAnimationFrame || t.global.webkitRequestAnimationFrame || t.global.mozRequestAnimationFrame || t.global.oRequestAnimationFrame || t.global.msRequestAnimationFrame || e
        }();
    t.Animation = function (e, n) {
        var a = t.Animation;
        this.func = e, this.setLayers(n), this.id = a.animIdCounter++, this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: i()
        }
    }, t.Animation.prototype = {
        setLayers: function (t) {
            var e = [];
            return e = t ? t.length > 0 ? t : [t] : [], this.layers = e, this
        },
        getLayers: function () {
            return this.layers
        },
        addLayer: function (t) {
            var e, n = this.layers,
                i = n.length;
            for (e = 0; i > e; e++)
                if (n[e]._id === t._id) return !1;
            return this.layers.push(t), !0
        },
        isRunning: function () {
            var e, n = t.Animation,
                i = n.animations,
                a = i.length;
            for (e = 0; a > e; e++)
                if (i[e].id === this.id) return !0;
            return !1
        },
        start: function () {
            var e = t.Animation;
            return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = i(), e._addAnimation(this), this
        },
        stop: function () {
            return t.Animation._removeAnimation(this), this
        },
        _updateFrameObject: function (t) {
            this.frame.timeDiff = t - this.frame.lastTime, this.frame.lastTime = t, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff
        }
    }, t.Animation.animations = [], t.Animation.animIdCounter = 0, t.Animation.animRunning = !1, t.Animation._addAnimation = function (t) {
        this.animations.push(t), this._handleAnimation()
    }, t.Animation._removeAnimation = function (t) {
        var e, n = t.id,
            i = this.animations,
            a = i.length;
        for (e = 0; a > e; e++)
            if (i[e].id === n) {
                this.animations.splice(e, 1);
                break
            }
    }, t.Animation._runFrames = function () {
        var t, e, n, a, r, o, s, h, c, l = {},
            d = this.animations;
        for (a = 0; a < d.length; a++)
            if (t = d[a], e = t.layers, n = t.func, t._updateFrameObject(i()), o = e.length, c = n ? n.call(t, t.frame) !== !1 : !0)
                for (r = 0; o > r; r++) s = e[r], void 0 !== s._id && (l[s._id] = s);
        for (h in l) l.hasOwnProperty(h) && l[h].draw()
    }, t.Animation._animationLoop = function () {
        var e = t.Animation;
        e.animations.length ? (e._runFrames(), n(e._animationLoop)) : e.animRunning = !1
    }, t.Animation._handleAnimation = function () {
        this.animRunning || (this.animRunning = !0, n(this._animationLoop))
    }, t.BaseLayer.prototype.batchDraw = function () {
        var e = this,
            n = t.Animation;
        return this.batchAnim || (this.batchAnim = new n(function () {
            e.batchAnim.stop()
        }, this)), this.lastBatchDrawTime = i(), this.batchAnim.isRunning() || this.batchAnim.start(), this
    }, t.Stage.prototype.batchDraw = function () {
        return this.getChildren().each(function (t) {
            t.batchDraw()
        }), this
    }
}(Konva),
function () {
    "use strict";
    var t = {
            node: 1,
            duration: 1,
            easing: 1,
            onFinish: 1,
            yoyo: 1
        },
        e = 1,
        n = 2,
        i = 3,
        a = 0,
        r = ["fill", "stroke", "shadowColor"],
        o = function (t, e, n, i, a, r, o) {
            this.prop = t, this.propFunc = e, this.begin = i, this._pos = i, this.duration = r, this._change = 0, this.prevPos = 0, this.yoyo = o, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = n, this._change = a - this.begin, this.pause()
        };
    o.prototype = {
        fire: function (t) {
            var e = this[t];
            e && e()
        },
        setTime: function (t) {
            t > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : 0 > t ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t, this.update())
        },
        getTime: function () {
            return this._time
        },
        setPosition: function (t) {
            this.prevPos = this._pos, this.propFunc(t), this._pos = t
        },
        getPosition: function (t) {
            return void 0 === t && (t = this._time), this.func(t, this.begin, this._change, this.duration)
        },
        play: function () {
            this.state = n, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay")
        },
        reverse: function () {
            this.state = i, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse")
        },
        seek: function (t) {
            this.pause(), this._time = t, this.update(), this.fire("onSeek")
        },
        reset: function () {
            this.pause(), this._time = 0, this.update(), this.fire("onReset")
        },
        finish: function () {
            this.pause(), this._time = this.duration, this.update(), this.fire("onFinish")
        },
        update: function () {
            this.setPosition(this.getPosition(this._time))
        },
        onEnterFrame: function () {
            var t = this.getTimer() - this._startTime;
            this.state === n ? this.setTime(t) : this.state === i && this.setTime(this.duration - t)
        },
        pause: function () {
            this.state = e, this.fire("onPause")
        },
        getTimer: function () {
            return (new Date).getTime()
        }
    }, Konva.Tween = function (e) {
        var n, i, r = this,
            s = e.node,
            h = s._id,
            c = e.easing || Konva.Easings.Linear,
            l = !!e.yoyo;
        n = "undefined" == typeof e.duration ? 1 : 0 === e.duration ? .001 : e.duration, this.node = s, this._id = a++;
        var d = s.getLayer() || (s instanceof Konva.Stage ? s.getLayers() : null);
        d || Konva.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new Konva.Animation(function () {
            r.tween.onEnterFrame()
        }, d), this.tween = new o(i, function (t) {
            r._tweenFunc(t)
        }, c, 0, 1, 1e3 * n, l), this._addListeners(), Konva.Tween.attrs[h] || (Konva.Tween.attrs[h] = {}), Konva.Tween.attrs[h][this._id] || (Konva.Tween.attrs[h][this._id] = {}), Konva.Tween.tweens[h] || (Konva.Tween.tweens[h] = {});
        for (i in e) void 0 === t[i] && this._addAttr(i, e[i]);
        this.reset(), this.onFinish = e.onFinish, this.onReset = e.onReset
    }, Konva.Tween.attrs = {}, Konva.Tween.tweens = {}, Konva.Tween.prototype = {
        _addAttr: function (t, e) {
            var n, i, a, o, s, h, c, l = this.node,
                d = l._id;
            if (a = Konva.Tween.tweens[d][t], a && delete Konva.Tween.attrs[d][a][t], n = l.getAttr(t), Konva.Util._isArray(e))
                for (i = [], s = Math.max(e.length, n.length), "points" === t && e.length !== n.length && (e.length > n.length ? (c = n, n = Konva.Util._prepareArrayForTween(n, e, l.closed())) : (h = e, e = Konva.Util._prepareArrayForTween(e, n, l.closed()))), o = 0; s > o; o++) i.push(e[o] - n[o]);
            else if (-1 !== r.indexOf(t)) {
                n = Konva.Util.colorToRGBA(n);
                var u = Konva.Util.colorToRGBA(e);
                i = {
                    r: u.r - n.r,
                    g: u.g - n.g,
                    b: u.b - n.b,
                    a: u.a - n.a
                }
            } else i = e - n;
            Konva.Tween.attrs[d][this._id][t] = {
                start: n,
                diff: i,
                end: e,
                trueEnd: h,
                trueStart: c
            }, Konva.Tween.tweens[d][t] = this._id
        },
        _tweenFunc: function (t) {
            var e, n, i, a, o, s, h, c, l = this.node,
                d = Konva.Tween.attrs[l._id][this._id];
            for (e in d) {
                if (n = d[e], i = n.start, a = n.diff, c = n.end, Konva.Util._isArray(i))
                    for (o = [], h = Math.max(i.length, c.length), s = 0; h > s; s++) o.push((i[s] || 0) + a[s] * t);
                else o = -1 !== r.indexOf(e) ? "rgba(" + Math.round(i.r + a.r * t) + "," + Math.round(i.g + a.g * t) + "," + Math.round(i.b + a.b * t) + "," + (i.a + a.a * t) + ")" : i + a * t;
                l.setAttr(e, o)
            }
        },
        _addListeners: function () {
            var t = this;
            this.tween.onPlay = function () {
                t.anim.start()
            }, this.tween.onReverse = function () {
                t.anim.start()
            }, this.tween.onPause = function () {
                t.anim.stop()
            }, this.tween.onFinish = function () {
                var e = t.node,
                    n = Konva.Tween.attrs[e._id][t._id];
                n.points && n.points.trueEnd && e.points(n.points.trueEnd), t.onFinish && t.onFinish.call(t)
            }, this.tween.onReset = function () {
                var e = t.node,
                    n = Konva.Tween.attrs[e._id][t._id];
                n.points && n.points.trueStart && e.points(n.points.trueStart), t.onReset && t.onReset()
            }
        },
        play: function () {
            return this.tween.play(), this
        },
        reverse: function () {
            return this.tween.reverse(), this
        },
        reset: function () {
            return this.tween.reset(), this
        },
        seek: function (t) {
            return this.tween.seek(1e3 * t), this
        },
        pause: function () {
            return this.tween.pause(), this
        },
        finish: function () {
            return this.tween.finish(), this
        },
        destroy: function () {
            var t, e = this.node._id,
                n = this._id,
                i = Konva.Tween.tweens[e];
            this.pause();
            for (t in i) delete Konva.Tween.tweens[e][t];
            delete Konva.Tween.attrs[e][n]
        }
    }, Konva.Node.prototype.to = function (t) {
        var e = t.onFinish;
        t.node = this, t.onFinish = function () {
            this.destroy(), e && e()
        };
        var n = new Konva.Tween(t);
        n.play()
    }, Konva.Easings = {
        BackEaseIn: function (t, e, n, i) {
            var a = 1.70158;
            return n * (t /= i) * t * ((a + 1) * t - a) + e
        },
        BackEaseOut: function (t, e, n, i) {
            var a = 1.70158;
            return n * ((t = t / i - 1) * t * ((a + 1) * t + a) + 1) + e
        },
        BackEaseInOut: function (t, e, n, i) {
            var a = 1.70158;
            return (t /= i / 2) < 1 ? n / 2 * (t * t * (((a *= 1.525) + 1) * t - a)) + e : n / 2 * ((t -= 2) * t * (((a *= 1.525) + 1) * t + a) + 2) + e
        },
        ElasticEaseIn: function (t, e, n, i, a, r) {
            var o = 0;
            return 0 === t ? e : 1 === (t /= i) ? e + n : (r || (r = .3 * i), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r)) + e)
        },
        ElasticEaseOut: function (t, e, n, i, a, r) {
            var o = 0;
            return 0 === t ? e : 1 === (t /= i) ? e + n : (r || (r = .3 * i), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), a * Math.pow(2, -10 * t) * Math.sin((t * i - o) * (2 * Math.PI) / r) + n + e)
        },
        ElasticEaseInOut: function (t, e, n, i, a, r) {
            var o = 0;
            return 0 === t ? e : 2 === (t /= i / 2) ? e + n : (r || (r = i * (.3 * 1.5)), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), 1 > t ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r)) + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r) * .5 + n + e)
        },
        BounceEaseOut: function (t, e, n, i) {
            return (t /= i) < 1 / 2.75 ? n * (7.5625 * t * t) + e : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        },
        BounceEaseIn: function (t, e, n, i) {
            return n - Konva.Easings.BounceEaseOut(i - t, 0, n, i) + e
        },
        BounceEaseInOut: function (t, e, n, i) {
            return i / 2 > t ? .5 * Konva.Easings.BounceEaseIn(2 * t, 0, n, i) + e : .5 * Konva.Easings.BounceEaseOut(2 * t - i, 0, n, i) + .5 * n + e
        },
        EaseIn: function (t, e, n, i) {
            return n * (t /= i) * t + e
        },
        EaseOut: function (t, e, n, i) {
            return -n * (t /= i) * (t - 2) + e
        },
        EaseInOut: function (t, e, n, i) {
            return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
        },
        StrongEaseIn: function (t, e, n, i) {
            return n * (t /= i) * t * t * t * t + e
        },
        StrongEaseOut: function (t, e, n, i) {
            return n * ((t = t / i - 1) * t * t * t * t + 1) + e
        },
        StrongEaseInOut: function (t, e, n, i) {
            return (t /= i / 2) < 1 ? n / 2 * t * t * t * t * t + e : n / 2 * ((t -= 2) * t * t * t * t + 2) + e
        },
        Linear: function (t, e, n, i) {
            return n * t / i + e
        }
    }
}(),
function () {
    "use strict";
    Konva.DD = {
        anim: new Konva.Animation(function () {
            var t = this.dirty;
            return this.dirty = !1, t
        }),
        isDragging: !1,
        justDragged: !1,
        offset: {
            x: 0,
            y: 0
        },
        node: null,
        _drag: function (t) {
            var e = Konva.DD,
                n = e.node;
            if (n) {
                if (!e.isDragging) {
                    var i = n.getStage().getPointerPosition(),
                        a = n.dragDistance(),
                        r = Math.max(Math.abs(i.x - e.startPointerPos.x), Math.abs(i.y - e.startPointerPos.y));
                    if (a > r) return
                }
                n.getStage()._setPointerPosition(t), n._setDragPosition(t), e.isDragging || (e.isDragging = !0, n.fire("dragstart", {
                    type: "dragstart",
                    target: n,
                    evt: t
                }, !0)), n.fire("dragmove", {
                    type: "dragmove",
                    target: n,
                    evt: t
                }, !0)
            }
        },
        _endDragBefore: function (t) {
            var e, n = Konva.DD,
                i = n.node;
            i && (e = i.getLayer(), n.anim.stop(), n.isDragging && (n.isDragging = !1, n.justDragged = !0, Konva.listenClickTap = !1, t && (t.dragEndNode = i)), delete n.node, (i.getLayer() || e || i instanceof Konva.Stage) && (e || i).draw())
        },
        _endDragAfter: function (t) {
            t = t || {};
            var e = t.dragEndNode;
            t && e && e.fire("dragend", {
                type: "dragend",
                target: e,
                evt: t
            }, !0)
        }
    }, Konva.Node.prototype.startDrag = function () {
        var t = Konva.DD,
            e = this.getStage(),
            n = this.getLayer(),
            i = e.getPointerPosition(),
            a = this.getAbsolutePosition();
        i && (t.node && t.node.stopDrag(), t.node = this, t.startPointerPos = i, t.offset.x = i.x - a.x, t.offset.y = i.y - a.y, t.anim.setLayers(n || this.getLayers()), t.anim.start(), this._setDragPosition())
    }, Konva.Node.prototype._setDragPosition = function (t) {
        var e = Konva.DD,
            n = this.getStage().getPointerPosition(),
            i = this.getDragBoundFunc();
        if (n) {
            var a = {
                x: n.x - e.offset.x,
                y: n.y - e.offset.y
            };
            void 0 !== i && (a = i.call(this, a, t)), this.setAbsolutePosition(a), this._lastPos && this._lastPos.x === a.x && this._lastPos.y === a.y || (e.anim.dirty = !0), this._lastPos = a
        }
    }, Konva.Node.prototype.stopDrag = function () {
        var t = Konva.DD,
            e = {};
        t._endDragBefore(e), t._endDragAfter(e)
    }, Konva.Node.prototype.setDraggable = function (t) {
        this._setAttr("draggable", t), this._dragChange()
    };
    var t = Konva.Node.prototype.destroy;
    Konva.Node.prototype.destroy = function () {
        var e = Konva.DD;
        e.node && e.node._id === this._id && this.stopDrag(), t.call(this)
    }, Konva.Node.prototype.isDragging = function () {
        var t = Konva.DD;
        return !(!t.node || t.node._id !== this._id || !t.isDragging)
    }, Konva.Node.prototype._listenDrag = function () {
        var t = this;
        this._dragCleanup(), "Stage" === this.getClassName() ? this.on("contentMousedown.konva contentTouchstart.konva", function (e) {
            Konva.DD.node || t.startDrag(e)
        }) : this.on("mousedown.konva touchstart.konva", function (e) {
            1 !== e.evt.button && 2 !== e.evt.button && (Konva.DD.node || t.startDrag(e))
        })
    }, Konva.Node.prototype._dragChange = function () {
        if (this.attrs.draggable) this._listenDrag();
        else {
            this._dragCleanup();
            var t = this.getStage(),
                e = Konva.DD;
            t && e.node && e.node._id === this._id && e.node.stopDrag()
        }
    }, Konva.Node.prototype._dragCleanup = function () {
        "Stage" === this.getClassName() ? (this.off("contentMousedown.konva"), this.off("contentTouchstart.konva")) : (this.off("mousedown.konva"), this.off("touchstart.konva"))
    }, Konva.Factory.addGetterSetter(Konva.Node, "dragBoundFunc"), Konva.Factory.addGetter(Konva.Node, "draggable", !1), Konva.Factory.addOverloadedGetterSetter(Konva.Node, "draggable");
    var e = Konva.document.documentElement;
    e.addEventListener("mouseup", Konva.DD._endDragBefore, !0), e.addEventListener("touchend", Konva.DD._endDragBefore, !0), e.addEventListener("mousemove", Konva.DD._drag), e.addEventListener("touchmove", Konva.DD._drag), e.addEventListener("mouseup", Konva.DD._endDragAfter, !1), e.addEventListener("touchend", Konva.DD._endDragAfter, !1)
}(),
function () {
    "use strict";
    Konva.Rect = function (t) {
        this.___init(t)
    }, Konva.Rect.prototype = {
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Rect", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e = this.getCornerRadius(),
                n = this.getWidth(),
                i = this.getHeight();
            t.beginPath(), e ? (e = Math.min(e, n / 2, i / 2), t.moveTo(e, 0), t.lineTo(n - e, 0), t.arc(n - e, e, e, 3 * Math.PI / 2, 0, !1), t.lineTo(n, i - e), t.arc(n - e, i - e, e, 0, Math.PI / 2, !1), t.lineTo(e, i), t.arc(e, i - e, e, Math.PI / 2, Math.PI, !1), t.lineTo(0, e), t.arc(e, e, e, Math.PI, 3 * Math.PI / 2, !1)) : t.rect(0, 0, n, i), t.closePath(), t.fillStrokeShape(this)
        }
    }, Konva.Util.extend(Konva.Rect, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Rect, "cornerRadius", 0), Konva.Collection.mapMethods(Konva.Rect)
}(),
function () {
    "use strict";
    var t = 2 * Math.PI - 1e-4,
        e = "Circle";
    Konva.Circle = function (t) {
        this.___init(t)
    }, Konva.Circle.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = e, this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (e) {
            e.beginPath(), e.arc(0, 0, this.getRadius(), 0, t, !1), e.closePath(), e.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getRadius()
        },
        getHeight: function () {
            return 2 * this.getRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        }
    }, Konva.Util.extend(Konva.Circle, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Circle, "radius", 0), Konva.Factory.addOverloadedGetterSetter(Konva.Circle, "radius"), Konva.Collection.mapMethods(Konva.Circle)
}(),
function () {
    "use strict";
    var t = 2 * Math.PI - 1e-4,
        e = "Ellipse";
    Konva.Ellipse = function (t) {
        this.___init(t)
    }, Konva.Ellipse.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = e, this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (e) {
            var n = this.getRadiusX(),
                i = this.getRadiusY();
            e.beginPath(), e.save(), n !== i && e.scale(1, i / n), e.arc(0, 0, n, 0, t, !1), e.restore(), e.closePath(), e.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getRadiusX()
        },
        getHeight: function () {
            return 2 * this.getRadiusY()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.setRadius({
                x: t / 2
            })
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.setRadius({
                y: t / 2
            })
        }
    }, Konva.Util.extend(Konva.Ellipse, Konva.Shape), Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, "radius", ["x", "y"]), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusX", 0), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusY", 0), Konva.Collection.mapMethods(Konva.Ellipse)
}(),
function () {
    "use strict";
    var t = 2 * Math.PI - 1e-4;
    Konva.Ring = function (t) {
        this.___init(t)
    }, Konva.Ring.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Ring", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (e) {
            e.beginPath(), e.arc(0, 0, this.getInnerRadius(), 0, t, !1), e.moveTo(this.getOuterRadius(), 0), e.arc(0, 0, this.getOuterRadius(), t, 0, !0), e.closePath(), e.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getOuterRadius()
        },
        getHeight: function () {
            return 2 * this.getOuterRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
        },
        setOuterRadius: function (t) {
            this._setAttr("outerRadius", t), this.setWidth(2 * t), this.setHeight(2 * t)
        }
    }, Konva.Util.extend(Konva.Ring, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Ring, "innerRadius", 0), Konva.Factory.addGetter(Konva.Ring, "outerRadius", 0), Konva.Factory.addOverloadedGetterSetter(Konva.Ring, "outerRadius"), Konva.Collection.mapMethods(Konva.Ring)
}(),
function () {
    "use strict";
    Konva.Wedge = function (t) {
        this.___init(t)
    }, Konva.Wedge.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Wedge", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            t.beginPath(), t.arc(0, 0, this.getRadius(), 0, Konva.getAngle(this.getAngle()), this.getClockwise()), t.lineTo(0, 0), t.closePath(), t.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getRadius()
        },
        getHeight: function () {
            return 2 * this.getRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        }
    }, Konva.Util.extend(Konva.Wedge, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Wedge, "radius", 0), Konva.Factory.addGetterSetter(Konva.Wedge, "angle", 0), Konva.Factory.addGetterSetter(Konva.Wedge, "clockwise", !1), Konva.Factory.backCompat(Konva.Wedge, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle"
    }), Konva.Collection.mapMethods(Konva.Wedge)
}(),
function () {
    "use strict";
    Konva.Arc = function (t) {
        this.___init(t)
    }, Konva.Arc.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Arc", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e = Konva.getAngle(this.angle()),
                n = this.clockwise();
            t.beginPath(), t.arc(0, 0, this.getOuterRadius(), 0, e, n), t.arc(0, 0, this.getInnerRadius(), e, 0, !n), t.closePath(), t.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getOuterRadius()
        },
        getHeight: function () {
            return 2 * this.getOuterRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2)
        }
    }, Konva.Util.extend(Konva.Arc, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Arc, "innerRadius", 0), Konva.Factory.addGetterSetter(Konva.Arc, "outerRadius", 0), Konva.Factory.addGetterSetter(Konva.Arc, "angle", 0), Konva.Factory.addGetterSetter(Konva.Arc, "clockwise", !1), Konva.Collection.mapMethods(Konva.Arc)
}(),
function () {
    "use strict";
    var t = "Image";
    Konva.Image = function (t) {
        this.___init(t)
    }, Konva.Image.prototype = {
        ___init: function (e) {
            Konva.Shape.call(this, e), this.className = t, this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
        },
        _useBufferCanvas: function () {
            return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke() && this.getStage()
        },
        _sceneFunc: function (t) {
            var e, n, i, a = this.getWidth(),
                r = this.getHeight(),
                o = this.getImage();
            o && (e = this.getCropWidth(), n = this.getCropHeight(), i = e && n ? [o, this.getCropX(), this.getCropY(), e, n, 0, 0, a, r] : [o, 0, 0, a, r]), (this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, a, r), t.closePath(), t.fillStrokeShape(this)), o && t.drawImage.apply(t, i)
        },
        _hitFunc: function (t) {
            var e = this.getWidth(),
                n = this.getHeight();
            t.beginPath(), t.rect(0, 0, e, n), t.closePath(), t.fillStrokeShape(this)
        },
        getWidth: function () {
            var t = this.getImage();
            return this.attrs.width || (t ? t.width : 0)
        },
        getHeight: function () {
            var t = this.getImage();
            return this.attrs.height || (t ? t.height : 0)
        }
    }, Konva.Util.extend(Konva.Image, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Image, "image"), Konva.Factory.addComponentsGetterSetter(Konva.Image, "crop", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Image, "cropX", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropY", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropWidth", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropHeight", 0), Konva.Collection.mapMethods(Konva.Image), Konva.Image.fromURL = function (t, e) {
        var n = new Image;
        n.onload = function () {
            var t = new Konva.Image({
                image: n
            });
            e(t)
        }, n.src = t
    }
}(),
function () {
    "use strict";

    function t(t) {
        t.fillText(this.partialText, 0, 0)
    }

    function e(t) {
        t.strokeText(this.partialText, 0, 0)
    }
    var n = "auto",
        i = "center",
        a = "Change.konva",
        r = "2d",
        o = "-",
        s = "",
        h = "left",
        c = "text",
        l = "Text",
        d = "middle",
        u = "normal",
        v = "px ",
        f = " ",
        g = "right",
        p = "word",
        m = "char",
        y = "none",
        _ = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "lineHeight", "text", "width", "height", "wrap"],
        K = _.length,
        S = Konva.Util.createCanvasElement().getContext(r);
    Konva.Text = function (t) {
        this.___init(t)
    }, Konva.Text.prototype = {
        ___init: function (n) {
            n = n || {}, n.fillLinearGradientColorStops || n.fillRadialGradientColorStops || (n.fill = n.fill || "black"), Konva.Shape.call(this, n), this._fillFunc = t, this._strokeFunc = e, this.className = l;
            for (var i = 0; K > i; i++) this.on(_[i] + a, this._setTextData);
            this._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
        },
        _sceneFunc: function (t) {
            var e, n = this.getPadding(),
                a = this.getTextHeight(),
                r = this.getLineHeight() * a,
                o = this.textArr,
                s = o.length,
                c = this.getWidth();
            for (t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", d), t.setAttr("textAlign", h), t.save(), n ? (t.translate(n, 0), t.translate(0, n + a / 2)) : t.translate(0, a / 2), e = 0; s > e; e++) {
                var l = o[e],
                    u = l.text,
                    v = l.width;
                t.save(), this.getAlign() === g ? t.translate(c - v - 2 * n, 0) : this.getAlign() === i && t.translate((c - v - 2 * n) / 2, 0), this.partialText = u, t.fillStrokeShape(this), t.restore(), t.translate(0, r)
            }
            t.restore()
        },
        _hitFunc: function (t) {
            var e = this.getWidth(),
                n = this.getHeight();
            t.beginPath(), t.rect(0, 0, e, n), t.closePath(), t.fillStrokeShape(this)
        },
        setText: function (t) {
            var e = Konva.Util._isString(t) ? t : (t || "").toString();
            return this._setAttr(c, e), this
        },
        getWidth: function () {
            var t = this.attrs.width === n || void 0 === this.attrs.width;
            return t ? this.getTextWidth() + 2 * this.getPadding() : this.attrs.width
        },
        getHeight: function () {
            var t = this.attrs.height === n || void 0 === this.attrs.height;
            return t ? this.getTextHeight() * this.textArr.length * this.getLineHeight() + 2 * this.getPadding() : this.attrs.height
        },
        getTextWidth: function () {
            return this.textWidth
        },
        getTextHeight: function () {
            return this.textHeight
        },
        _getTextSize: function (t) {
            var e, n = S,
                i = this.getFontSize();
            return n.save(), n.font = this._getContextFont(), e = n.measureText(t), n.restore(), {
                width: e.width,
                height: parseInt(i, 10)
            }
        },
        _getContextFont: function () {
            return Konva.UA.isIE ? this.getFontStyle() + f + this.getFontSize() + v + this.getFontFamily() : this.getFontStyle() + f + this.getFontVariant() + f + this.getFontSize() + v + this.getFontFamily()
        },
        _addTextLine: function (t, e) {
            return this.textArr.push({
                text: t,
                width: e
            })
        },
        _getTextWidth: function (t) {
            return S.measureText(t).width
        },
        _setTextData: function () {
            var t = this.getText().split("\n"),
                e = +this.getFontSize(),
                i = 0,
                a = this.getLineHeight() * e,
                r = this.attrs.width,
                s = this.attrs.height,
                h = r !== n,
                c = s !== n,
                l = this.getPadding(),
                d = r - 2 * l,
                u = s - 2 * l,
                v = 0,
                g = this.getWrap(),
                p = g !== y,
                _ = g !== m && p;
            this.textArr = [], S.save(), S.font = this._getContextFont();
            for (var K = 0, C = t.length; C > K; ++K) {
                var x = t[K],
                    w = this._getTextWidth(x);
                if (h && w > d)
                    for (; x.length > 0;) {
                        for (var b = 0, F = x.length, T = "", P = 0; F > b;) {
                            var A = b + F >>> 1,
                                D = x.slice(0, A + 1),
                                k = this._getTextWidth(D);
                            d >= k ? (b = A + 1, T = D, P = k) : F = A
                        }
                        if (!T) break;
                        if (_) {
                            var G = Math.max(T.lastIndexOf(f), T.lastIndexOf(o)) + 1;
                            G > 0 && (b = G, T = T.slice(0, b), P = this._getTextWidth(T))
                        }
                        if (this._addTextLine(T, P), i = Math.max(i, P), v += a, !p || c && v + a > u) break;
                        if (x = x.slice(b), x.length > 0 && (w = this._getTextWidth(x), d >= w)) {
                            this._addTextLine(x, w), v += a, i = Math.max(i, w);
                            break
                        }
                    } else this._addTextLine(x, w), v += a, i = Math.max(i, w);
                if (c && v + a > u) break
            }
            S.restore(), this.textHeight = e, this.textWidth = i
        }
    }, Konva.Util.extend(Konva.Text, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Text, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.Text, "fontSize", 12), Konva.Factory.addGetterSetter(Konva.Text, "fontStyle", u), Konva.Factory.addGetterSetter(Konva.Text, "fontVariant", u), Konva.Factory.addGetterSetter(Konva.Text, "padding", 0), Konva.Factory.addGetterSetter(Konva.Text, "align", h), Konva.Factory.addGetterSetter(Konva.Text, "lineHeight", 1), Konva.Factory.addGetterSetter(Konva.Text, "wrap", p), Konva.Factory.addGetter(Konva.Text, "text", s), Konva.Factory.addOverloadedGetterSetter(Konva.Text, "text"), Konva.Collection.mapMethods(Konva.Text)
}(),
function () {
    "use strict";
    Konva.Line = function (t) {
        this.___init(t)
    }, Konva.Line.prototype = {
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Line", this.on("pointsChange.konva tensionChange.konva closedChange.konva", function () {
                this._clearCache("tensionPoints")
            }), this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e, n, i, a = this.getPoints(),
                r = a.length,
                o = this.getTension(),
                s = this.getClosed();
            if (r) {
                if (t.beginPath(), t.moveTo(a[0], a[1]), 0 !== o && r > 4) {
                    for (e = this.getTensionPoints(), n = e.length, i = s ? 0 : 4, s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); n - 2 > i;) t.bezierCurveTo(e[i++], e[i++], e[i++], e[i++], e[i++], e[i++]);
                    s || t.quadraticCurveTo(e[n - 2], e[n - 1], a[r - 2], a[r - 1])
                } else
                    for (i = 2; r > i; i += 2) t.lineTo(a[i], a[i + 1]);
                s ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this)
            }
        },
        getTensionPoints: function () {
            return this._getCache("tensionPoints", this._getTensionPoints)
        },
        _getTensionPoints: function () {
            return this.getClosed() ? this._getTensionPointsClosed() : Konva.Util._expandPoints(this.getPoints(), this.getTension())
        },
        _getTensionPointsClosed: function () {
            var t = this.getPoints(),
                e = t.length,
                n = this.getTension(),
                i = Konva.Util,
                a = i._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], n),
                r = i._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], n),
                o = Konva.Util._expandPoints(t, n),
                s = [a[2], a[3]].concat(o).concat([r[0], r[1], t[e - 2], t[e - 1], r[2], r[3], a[0], a[1], t[0], t[1]]);
            return s
        },
        getWidth: function () {
            return this.getSelfRect().width
        },
        getHeight: function () {
            return this.getSelfRect().height
        },
        getSelfRect: function () {
            var t;
            t = 0 !== this.getTension() ? this._getTensionPoints() : this.getPoints();
            for (var e, n, i = t[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++) e = t[2 * s], n = t[2 * s + 1], i = Math.min(i, e), a = Math.max(a, e), r = Math.min(r, n), o = Math.max(o, n);
            return {
                x: Math.round(i),
                y: Math.round(r),
                width: Math.round(a - i),
                height: Math.round(o - r)
            }
        }
    }, Konva.Util.extend(Konva.Line, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Line, "closed", !1), Konva.Factory.addGetterSetter(Konva.Line, "tension", 0), Konva.Factory.addGetterSetter(Konva.Line, "points", []), Konva.Collection.mapMethods(Konva.Line)
}(),
function () {
    "use strict";
    Konva.Sprite = function (t) {
        this.___init(t)
    }, Konva.Sprite.prototype = {
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Sprite", this._updated = !0;
            var e = this;
            this.anim = new Konva.Animation(function () {
                var t = e._updated;
                return e._updated = !1, t
            }), this.on("animationChange.konva", function () {
                this.frameIndex(0)
            }), this.on("frameIndexChange.konva", function () {
                this._updated = !0
            }), this.on("frameRateChange.konva", function () {
                this.anim.isRunning() && (clearInterval(this.interval), this._setInterval())
            }), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
        },
        _sceneFunc: function (t) {
            var e = this.getAnimation(),
                n = this.frameIndex(),
                i = 4 * n,
                a = this.getAnimations()[e],
                r = this.frameOffsets(),
                o = a[i + 0],
                s = a[i + 1],
                h = a[i + 2],
                c = a[i + 3],
                l = this.getImage();
            if ((this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, h, c), t.closePath(), t.fillStrokeShape(this)), l)
                if (r) {
                    var d = r[e],
                        u = 2 * n;
                    t.drawImage(l, o, s, h, c, d[u + 0], d[u + 1], h, c)
                } else t.drawImage(l, o, s, h, c, 0, 0, h, c)
        },
        _hitFunc: function (t) {
            var e = this.getAnimation(),
                n = this.frameIndex(),
                i = 4 * n,
                a = this.getAnimations()[e],
                r = this.frameOffsets(),
                o = a[i + 2],
                s = a[i + 3];
            if (t.beginPath(), r) {
                var h = r[e],
                    c = 2 * n;
                t.rect(h[c + 0], h[c + 1], o, s)
            } else t.rect(0, 0, o, s);
            t.closePath(), t.fillShape(this)
        },
        _useBufferCanvas: function () {
            return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke()
        },
        _setInterval: function () {
            var t = this;
            this.interval = setInterval(function () {
                t._updateIndex()
            }, 1e3 / this.getFrameRate())
        },
        start: function () {
            var t = this.getLayer();
            this.anim.setLayers(t), this._setInterval(), this.anim.start()
        },
        stop: function () {
            this.anim.stop(), clearInterval(this.interval)
        },
        isRunning: function () {
            return this.anim.isRunning()
        },
        _updateIndex: function () {
            var t = this.frameIndex(),
                e = this.getAnimation(),
                n = this.getAnimations(),
                i = n[e],
                a = i.length / 4;
            a - 1 > t ? this.frameIndex(t + 1) : this.frameIndex(0)
        }
    }, Konva.Util.extend(Konva.Sprite, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Sprite, "animation"), Konva.Factory.addGetterSetter(Konva.Sprite, "animations"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameOffsets"), Konva.Factory.addGetterSetter(Konva.Sprite, "image"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameIndex", 0), Konva.Factory.addGetterSetter(Konva.Sprite, "frameRate", 17), Konva.Factory.backCompat(Konva.Sprite, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex"
    }), Konva.Collection.mapMethods(Konva.Sprite)
}(),
function () {
    "use strict";
    Konva.Path = function (t) {
        this.___init(t)
    }, Konva.Path.prototype = {
        ___init: function (t) {
            this.dataArray = [];
            var e = this;
            Konva.Shape.call(this, t), this.className = "Path", this.dataArray = Konva.Path.parsePathData(this.getData()), this.on("dataChange.konva", function () {
                e.dataArray = Konva.Path.parsePathData(this.getData())
            }), this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e = this.dataArray;
            t.beginPath();
            for (var n = 0; n < e.length; n++) {
                var i = e[n].command,
                    a = e[n].points;
                switch (i) {
                    case "L":
                        t.lineTo(a[0], a[1]);
                        break;
                    case "M":
                        t.moveTo(a[0], a[1]);
                        break;
                    case "C":
                        t.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
                        break;
                    case "Q":
                        t.quadraticCurveTo(a[0], a[1], a[2], a[3]);
                        break;
                    case "A":
                        var r = a[0],
                            o = a[1],
                            s = a[2],
                            h = a[3],
                            c = a[4],
                            l = a[5],
                            d = a[6],
                            u = a[7],
                            v = s > h ? s : h,
                            f = s > h ? 1 : s / h,
                            g = s > h ? h / s : 1;
                        t.translate(r, o), t.rotate(d), t.scale(f, g), t.arc(0, 0, v, c, c + l, 1 - u), t.scale(1 / f, 1 / g), t.rotate(-d), t.translate(-r, -o);
                        break;
                    case "z":
                        t.closePath()
                }
            }
            t.fillStrokeShape(this)
        },
        getSelfRect: function () {
            var t = [];
            this.dataArray.forEach(function (e) {
                t = t.concat(e.points)
            });
            for (var e, n, i = t[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++) e = t[2 * s], n = t[2 * s + 1], i = Math.min(i, e), a = Math.max(a, e), r = Math.min(r, n), o = Math.max(o, n);
            return {
                x: Math.round(i),
                y: Math.round(r),
                width: Math.round(a - i),
                height: Math.round(o - r)
            }
        }
    }, Konva.Util.extend(Konva.Path, Konva.Shape), Konva.Path.getLineLength = function (t, e, n, i) {
        return Math.sqrt((n - t) * (n - t) + (i - e) * (i - e))
    }, Konva.Path.getPointOnLine = function (t, e, n, i, a, r, o) {
        void 0 === r && (r = e), void 0 === o && (o = n);
        var s = (a - n) / (i - e + 1e-8),
            h = Math.sqrt(t * t / (1 + s * s));
        e > i && (h *= -1);
        var c, l = s * h;
        if (i === e) c = {
            x: r,
            y: o + l
        };
        else if ((o - n) / (r - e + 1e-8) === s) c = {
            x: r + h,
            y: o + l
        };
        else {
            var d, u, v = this.getLineLength(e, n, i, a);
            if (1e-8 > v) return;
            var f = (r - e) * (i - e) + (o - n) * (a - n);
            f /= v * v, d = e + f * (i - e), u = n + f * (a - n);
            var g = this.getLineLength(r, o, d, u),
                p = Math.sqrt(t * t - g * g);
            h = Math.sqrt(p * p / (1 + s * s)), e > i && (h *= -1), l = s * h, c = {
                x: d + h,
                y: u + l
            }
        }
        return c
    }, Konva.Path.getPointOnCubicBezier = function (t, e, n, i, a, r, o, s, h) {
        function c(t) {
            return t * t * t
        }

        function l(t) {
            return 3 * t * t * (1 - t)
        }

        function d(t) {
            return 3 * t * (1 - t) * (1 - t)
        }

        function u(t) {
            return (1 - t) * (1 - t) * (1 - t)
        }
        var v = s * c(t) + r * l(t) + i * d(t) + e * u(t),
            f = h * c(t) + o * l(t) + a * d(t) + n * u(t);
        return {
            x: v,
            y: f
        }
    }, Konva.Path.getPointOnQuadraticBezier = function (t, e, n, i, a, r, o) {
        function s(t) {
            return t * t
        }

        function h(t) {
            return 2 * t * (1 - t)
        }

        function c(t) {
            return (1 - t) * (1 - t)
        }
        var l = r * s(t) + i * h(t) + e * c(t),
            d = o * s(t) + a * h(t) + n * c(t);
        return {
            x: l,
            y: d
        }
    }, Konva.Path.getPointOnEllipticalArc = function (t, e, n, i, a, r) {
        var o = Math.cos(r),
            s = Math.sin(r),
            h = {
                x: n * Math.cos(a),
                y: i * Math.sin(a)
            };
        return {
            x: t + (h.x * o - h.y * s),
            y: e + (h.x * s + h.y * o)
        }
    }, Konva.Path.parsePathData = function (t) {
        if (!t) return [];
        var e = t,
            n = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
        e = e.replace(new RegExp(" ", "g"), ",");
        for (var i = 0; i < n.length; i++) e = e.replace(new RegExp(n[i], "g"), "|" + n[i]);
        var a = e.split("|"),
            r = [],
            o = 0,
            s = 0;
        for (i = 1; i < a.length; i++) {
            var h = a[i],
                c = h.charAt(0);
            h = h.slice(1), h = h.replace(new RegExp(",-", "g"), "-"), h = h.replace(new RegExp("-", "g"), ",-"), h = h.replace(new RegExp("e,-", "g"), "e-");
            var l = h.split(",");
            l.length > 0 && "" === l[0] && l.shift();
            for (var d = 0; d < l.length; d++) l[d] = parseFloat(l[d]);
            for (; l.length > 0 && !isNaN(l[0]);) {
                var u, v, f, g, p, m, y, _, K, S, C = null,
                    x = [],
                    w = o,
                    b = s;
                switch (c) {
                    case "l":
                        o += l.shift(), s += l.shift(), C = "L", x.push(o, s);
                        break;
                    case "L":
                        o = l.shift(), s = l.shift(), x.push(o, s);
                        break;
                    case "m":
                        var F = l.shift(),
                            T = l.shift();
                        if (o += F, s += T, C = "M", r.length > 2 && "z" === r[r.length - 1].command)
                            for (var P = r.length - 2; P >= 0; P--)
                                if ("M" === r[P].command) {
                                    o = r[P].points[0] + F, s = r[P].points[1] + T;
                                    break
                                }
                        x.push(o, s), c = "l";
                        break;
                    case "M":
                        o = l.shift(), s = l.shift(), C = "M", x.push(o, s), c = "L";
                        break;
                    case "h":
                        o += l.shift(), C = "L", x.push(o, s);
                        break;
                    case "H":
                        o = l.shift(), C = "L", x.push(o, s);
                        break;
                    case "v":
                        s += l.shift(), C = "L", x.push(o, s);
                        break;
                    case "V":
                        s = l.shift(), C = "L", x.push(o, s);
                        break;
                    case "C":
                        x.push(l.shift(), l.shift(), l.shift(), l.shift()), o = l.shift(), s = l.shift(), x.push(o, s);
                        break;
                    case "c":
                        x.push(o + l.shift(), s + l.shift(), o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "C", x.push(o, s);
                        break;
                    case "S":
                        v = o, f = s, u = r[r.length - 1], "C" === u.command && (v = o + (o - u.points[2]), f = s + (s - u.points[3])), x.push(v, f, l.shift(), l.shift()), o = l.shift(), s = l.shift(), C = "C", x.push(o, s);
                        break;
                    case "s":
                        v = o, f = s, u = r[r.length - 1], "C" === u.command && (v = o + (o - u.points[2]), f = s + (s - u.points[3])), x.push(v, f, o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "C", x.push(o, s);
                        break;
                    case "Q":
                        x.push(l.shift(), l.shift()), o = l.shift(), s = l.shift(), x.push(o, s);
                        break;
                    case "q":
                        x.push(o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "Q", x.push(o, s);
                        break;
                    case "T":
                        v = o, f = s, u = r[r.length - 1], "Q" === u.command && (v = o + (o - u.points[0]), f = s + (s - u.points[1])), o = l.shift(), s = l.shift(), C = "Q", x.push(v, f, o, s);
                        break;
                    case "t":
                        v = o, f = s, u = r[r.length - 1], "Q" === u.command && (v = o + (o - u.points[0]), f = s + (s - u.points[1])), o += l.shift(), s += l.shift(), C = "Q", x.push(v, f, o, s);
                        break;
                    case "A":
                        g = l.shift(), p = l.shift(), m = l.shift(), y = l.shift(), _ = l.shift(), K = o, S = s, o = l.shift(), s = l.shift(), C = "A", x = this.convertEndpointToCenterParameterization(K, S, o, s, y, _, g, p, m);
                        break;
                    case "a":
                        g = l.shift(), p = l.shift(), m = l.shift(), y = l.shift(), _ = l.shift(), K = o, S = s, o += l.shift(), s += l.shift(), C = "A", x = this.convertEndpointToCenterParameterization(K, S, o, s, y, _, g, p, m)
                }
                r.push({
                    command: C || c,
                    points: x,
                    start: {
                        x: w,
                        y: b
                    },
                    pathLength: this.calcLength(w, b, C || c, x)
                })
            }
            "z" !== c && "Z" !== c || r.push({
                command: "z",
                points: [],
                start: void 0,
                pathLength: 0
            })
        }
        return r
    }, Konva.Path.calcLength = function (t, e, n, i) {
        var a, r, o, s, h = Konva.Path;
        switch (n) {
            case "L":
                return h.getLineLength(t, e, i[0], i[1]);
            case "C":
                for (a = 0, r = h.getPointOnCubicBezier(0, t, e, i[0], i[1], i[2], i[3], i[4], i[5]), s = .01; 1 >= s; s += .01) o = h.getPointOnCubicBezier(s, t, e, i[0], i[1], i[2], i[3], i[4], i[5]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
                return a;
            case "Q":
                for (a = 0, r = h.getPointOnQuadraticBezier(0, t, e, i[0], i[1], i[2], i[3]), s = .01; 1 >= s; s += .01) o = h.getPointOnQuadraticBezier(s, t, e, i[0], i[1], i[2], i[3]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
                return a;
            case "A":
                a = 0;
                var c = i[4],
                    l = i[5],
                    d = i[4] + l,
                    u = Math.PI / 180;
                if (Math.abs(c - d) < u && (u = Math.abs(c - d)), r = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], c, 0), 0 > l)
                    for (s = c - u; s > d; s -= u) o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
                else
                    for (s = c + u; d > s; s += u) o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
                return o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], d, 0), a += h.getLineLength(r.x, r.y, o.x, o.y)
        }
        return 0
    }, Konva.Path.convertEndpointToCenterParameterization = function (t, e, n, i, a, r, o, s, h) {
        var c = h * (Math.PI / 180),
            l = Math.cos(c) * (t - n) / 2 + Math.sin(c) * (e - i) / 2,
            d = -1 * Math.sin(c) * (t - n) / 2 + Math.cos(c) * (e - i) / 2,
            u = l * l / (o * o) + d * d / (s * s);
        u > 1 && (o *= Math.sqrt(u), s *= Math.sqrt(u));
        var v = Math.sqrt((o * o * (s * s) - o * o * (d * d) - s * s * (l * l)) / (o * o * (d * d) + s * s * (l * l)));
        a === r && (v *= -1), isNaN(v) && (v = 0);
        var f = v * o * d / s,
            g = v * -s * l / o,
            p = (t + n) / 2 + Math.cos(c) * f - Math.sin(c) * g,
            m = (e + i) / 2 + Math.sin(c) * f + Math.cos(c) * g,
            y = function (t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            },
            _ = function (t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (y(t) * y(e))
            },
            K = function (t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(_(t, e))
            },
            S = K([1, 0], [(l - f) / o, (d - g) / s]),
            C = [(l - f) / o, (d - g) / s],
            x = [(-1 * l - f) / o, (-1 * d - g) / s],
            w = K(C, x);
        return _(C, x) <= -1 && (w = Math.PI), _(C, x) >= 1 && (w = 0), 0 === r && w > 0 && (w -= 2 * Math.PI), 1 === r && 0 > w && (w += 2 * Math.PI), [p, m, o, s, S, w, c, r]
    }, Konva.Factory.addGetterSetter(Konva.Path, "data"), Konva.Collection.mapMethods(Konva.Path)
}(),
function () {
    "use strict";

    function t(t) {
        t.fillText(this.partialText, 0, 0)
    }

    function e(t) {
        t.strokeText(this.partialText, 0, 0)
    }
    var n = "",
        i = "normal";
    Konva.TextPath = function (t) {
        this.___init(t)
    }, Konva.TextPath.prototype = {
        ___init: function (n) {
            var i = this;
            this.dummyCanvas = Konva.Util.createCanvasElement(), this.dataArray = [], Konva.Shape.call(this, n), this._fillFunc = t, this._strokeFunc = e, this._fillFuncHit = t, this._strokeFuncHit = e, this.className = "TextPath", this.dataArray = Konva.Path.parsePathData(this.attrs.data), this.on("dataChange.konva", function () {
                i.dataArray = Konva.Path.parsePathData(this.attrs.data), i._setTextData()
            }), this.on("textChange.konva letterSpacingChange.konva", i._setTextData), i._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
        },
        _sceneFunc: function (t) {
            t.setAttr("font", this._getContextFont()), t.setAttr(this.getTextBaseline(), "middle"), t.setAttr("textAlign", "left"), t.save();
            for (var e = this.glyphInfo, n = 0; n < e.length; n++) {
                t.save();
                var i = e[n].p0;
                t.translate(i.x, i.y), t.rotate(e[n].rotation), this.partialText = e[n].text, t.fillStrokeShape(this), t.restore()
            }
            t.restore()
        },
        _hitFunc: function (t) {
            t.beginPath();
            var e = this.glyphInfo;
            if (e.length >= 1) {
                var n = e[0].p0;
                t.moveTo(n.x, n.y)
            }
            for (var i = 0; i < e.length; i++) {
                var a = e[i].p1;
                t.lineTo(a.x, a.y)
            }
            t.setAttr("lineWidth", this.getFontSize()), t.setAttr("strokeStyle", this.colorKey), t.stroke()
        },
        getTextWidth: function () {
            return this.textWidth
        },
        getTextHeight: function () {
            return this.textHeight
        },
        setText: function (t) {
            Konva.Text.prototype.setText.call(this, t)
        },
        _getTextSize: function (t) {
            var e = this.dummyCanvas,
                n = e.getContext("2d");
            n.save(), n.font = this._getContextFont();
            var i = n.measureText(t);
            return n.restore(), {
                width: i.width,
                height: parseInt(this.attrs.fontSize, 10)
            }
        },
        _setTextData: function () {
            var t = this,
                e = this._getTextSize(this.attrs.text),
                n = this.getLetterSpacing();
            this.textWidth = e.width, this.textHeight = e.height, this.glyphInfo = [];
            for (var i, a, r, o = this.getText().split(""), s = -1, h = 0, c = function () {
                    h = 0;
                    for (var e = t.dataArray, n = s + 1; n < e.length; n++) {
                        if (e[n].pathLength > 0) return s = n, e[n];
                        "M" === e[n].command && (i = {
                            x: e[n].points[0],
                            y: e[n].points[1]
                        })
                    }
                    return {}
                }, l = function (e) {
                    var o = t._getTextSize(e).width + n,
                        s = 0,
                        l = 0;
                    for (a = void 0; Math.abs(o - s) / o > .01 && 25 > l;) {
                        l++;
                        for (var d = s; void 0 === r;) r = c(), r && d + r.pathLength < o && (d += r.pathLength, r = void 0);
                        if (r === {} || void 0 === i) return;
                        var u = !1;
                        switch (r.command) {
                            case "L":
                                Konva.Path.getLineLength(i.x, i.y, r.points[0], r.points[1]) > o ? a = Konva.Path.getPointOnLine(o, i.x, i.y, r.points[0], r.points[1], i.x, i.y) : r = void 0;
                                break;
                            case "A":
                                var v = r.points[4],
                                    f = r.points[5],
                                    g = r.points[4] + f;
                                0 === h ? h = v + 1e-8 : o > s ? h += Math.PI / 180 * f / Math.abs(f) : h -= Math.PI / 360 * f / Math.abs(f), (0 > f && g > h || f >= 0 && h > g) && (h = g, u = !0), a = Konva.Path.getPointOnEllipticalArc(r.points[0], r.points[1], r.points[2], r.points[3], h, r.points[6]);
                                break;
                            case "C":
                                0 === h ? h = o > r.pathLength ? 1e-8 : o / r.pathLength : o > s ? h += (o - s) / r.pathLength : h -= (s - o) / r.pathLength, h > 1 && (h = 1, u = !0), a = Konva.Path.getPointOnCubicBezier(h, r.start.x, r.start.y, r.points[0], r.points[1], r.points[2], r.points[3], r.points[4], r.points[5]);
                                break;
                            case "Q":
                                0 === h ? h = o / r.pathLength : o > s ? h += (o - s) / r.pathLength : h -= (s - o) / r.pathLength, h > 1 && (h = 1, u = !0), a = Konva.Path.getPointOnQuadraticBezier(h, r.start.x, r.start.y, r.points[0], r.points[1], r.points[2], r.points[3])
                        }
                        void 0 !== a && (s = Konva.Path.getLineLength(i.x, i.y, a.x, a.y)), u && (u = !1, r = void 0)
                    }
                }, d = 0; d < o.length && (l(o[d]), void 0 !== i && void 0 !== a); d++) {
                var u = Konva.Path.getLineLength(i.x, i.y, a.x, a.y),
                    v = 0,
                    f = Konva.Path.getPointOnLine(v + u / 2, i.x, i.y, a.x, a.y),
                    g = Math.atan2(a.y - i.y, a.x - i.x);
                this.glyphInfo.push({
                    transposeX: f.x,
                    transposeY: f.y,
                    text: o[d],
                    rotation: g,
                    p0: i,
                    p1: a
                }), i = a
            }
        },
        getSelfRect: function () {
            var t = [],
                e = this.fontSize();
            this.glyphInfo.forEach(function (e) {
                t.push(e.p0.x), t.push(e.p0.y), t.push(e.p1.x), t.push(e.p1.y)
            });
            for (var n, i, a = t[0], r = t[0], o = t[0], s = t[0], h = 0; h < t.length / 2; h++) n = t[2 * h], i = t[2 * h + 1], a = Math.min(a, n), r = Math.max(r, n), o = Math.min(o, i), s = Math.max(s, i);
            return {
                x: Math.round(a) - e,
                y: Math.round(o) - e,
                width: Math.round(r - a) + 2 * e,
                height: Math.round(s - o) + 2 * e
            }
        }
    }, Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont, Konva.Util.extend(Konva.TextPath, Konva.Shape), Konva.Factory.addGetterSetter(Konva.TextPath, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontSize", 12), Konva.Factory.addGetterSetter(Konva.TextPath, "fontStyle", i), Konva.Factory.addGetterSetter(Konva.TextPath, "letterSpacing", 0), Konva.Factory.addGetterSetter(Konva.TextPath, "textBaseline", "middle"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontVariant", i), Konva.Factory.addGetter(Konva.TextPath, "text", n), Konva.Collection.mapMethods(Konva.TextPath)
}(),
function () {
    "use strict";
    Konva.RegularPolygon = function (t) {
        this.___init(t)
    }, Konva.RegularPolygon.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "RegularPolygon", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e, n, i, a = this.attrs.sides,
                r = this.attrs.radius;
            for (t.beginPath(), t.moveTo(0, 0 - r), e = 1; a > e; e++) n = r * Math.sin(2 * e * Math.PI / a), i = -1 * r * Math.cos(2 * e * Math.PI / a), t.lineTo(n, i);
            t.closePath(), t.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getRadius()
        },
        getHeight: function () {
            return 2 * this.getRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
        }
    }, Konva.Util.extend(Konva.RegularPolygon, Konva.Shape), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "radius", 0), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "sides", 0), Konva.Collection.mapMethods(Konva.RegularPolygon)
}(),
function () {
    "use strict";
    Konva.Star = function (t) {
        this.___init(t)
    }, Konva.Star.prototype = {
        _centroid: !0,
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Star", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e = this.innerRadius(),
                n = this.outerRadius(),
                i = this.numPoints();
            t.beginPath(), t.moveTo(0, 0 - n);
            for (var a = 1; 2 * i > a; a++) {
                var r = a % 2 === 0 ? n : e,
                    o = r * Math.sin(a * Math.PI / i),
                    s = -1 * r * Math.cos(a * Math.PI / i);
                t.lineTo(o, s)
            }
            t.closePath(), t.fillStrokeShape(this)
        },
        getWidth: function () {
            return 2 * this.getOuterRadius()
        },
        getHeight: function () {
            return 2 * this.getOuterRadius()
        },
        setWidth: function (t) {
            Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
        },
        setHeight: function (t) {
            Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
        }
    }, Konva.Util.extend(Konva.Star, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Star, "numPoints", 5), Konva.Factory.addGetterSetter(Konva.Star, "innerRadius", 0), Konva.Factory.addGetterSetter(Konva.Star, "outerRadius", 0), Konva.Collection.mapMethods(Konva.Star)
}(),
function () {
    "use strict";
    var t = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text"],
        e = "Change.konva",
        n = "none",
        i = "up",
        a = "right",
        r = "down",
        o = "left",
        s = "Label",
        h = t.length;
    Konva.Label = function (t) {
        this.____init(t)
    }, Konva.Label.prototype = {
        ____init: function (t) {
            var e = this;
            Konva.Group.call(this, t), this.className = s, this.on("add.konva", function (t) {
                e._addListeners(t.child), e._sync()
            })
        },
        getText: function () {
            return this.find("Text")[0]
        },
        getTag: function () {
            return this.find("Tag")[0]
        },
        _addListeners: function (n) {
            var i, a = this,
                r = function () {
                    a._sync()
                };
            for (i = 0; h > i; i++) n.on(t[i] + e, r)
        },
        getWidth: function () {
            return this.getText().getWidth()
        },
        getHeight: function () {
            return this.getText().getHeight()
        },
        _sync: function () {
            var t, e, n, s, h, c, l, d = this.getText(),
                u = this.getTag();
            if (d && u) {
                switch (t = d.getWidth(), e = d.getHeight(), n = u.getPointerDirection(), s = u.getPointerWidth(), l = u.getPointerHeight(), h = 0, c = 0, n) {
                    case i:
                        h = t / 2, c = -1 * l;
                        break;
                    case a:
                        h = t + s, c = e / 2;
                        break;
                    case r:
                        h = t / 2, c = e + l;
                        break;
                    case o:
                        h = -1 * s, c = e / 2
                }
                u.setAttrs({
                    x: -1 * h,
                    y: -1 * c,
                    width: t,
                    height: e
                }), d.setAttrs({
                    x: -1 * h,
                    y: -1 * c
                })
            }
        }
    }, Konva.Util.extend(Konva.Label, Konva.Group), Konva.Collection.mapMethods(Konva.Label), Konva.Tag = function (t) {
        this.___init(t)
    }, Konva.Tag.prototype = {
        ___init: function (t) {
            Konva.Shape.call(this, t), this.className = "Tag", this.sceneFunc(this._sceneFunc)
        },
        _sceneFunc: function (t) {
            var e = this.getWidth(),
                n = this.getHeight(),
                s = this.getPointerDirection(),
                h = this.getPointerWidth(),
                c = this.getPointerHeight(),
                l = Math.min(this.getCornerRadius(), e / 2, n / 2);
            t.beginPath(), l ? t.moveTo(l, 0) : t.moveTo(0, 0), s === i && (t.lineTo((e - h) / 2, 0), t.lineTo(e / 2, -1 * c), t.lineTo((e + h) / 2, 0)), l ? (t.lineTo(e - l, 0), t.arc(e - l, l, l, 3 * Math.PI / 2, 0, !1)) : t.lineTo(e, 0), s === a && (t.lineTo(e, (n - c) / 2), t.lineTo(e + h, n / 2), t.lineTo(e, (n + c) / 2)), l ? (t.lineTo(e, n - l), t.arc(e - l, n - l, l, 0, Math.PI / 2, !1)) : t.lineTo(e, n), s === r && (t.lineTo((e + h) / 2, n), t.lineTo(e / 2, n + c), t.lineTo((e - h) / 2, n)), l ? (t.lineTo(l, n), t.arc(l, n - l, l, Math.PI / 2, Math.PI, !1)) : t.lineTo(0, n), s === o && (t.lineTo(0, (n + c) / 2), t.lineTo(-1 * h, n / 2), t.lineTo(0, (n - c) / 2)), l && (t.lineTo(0, l), t.arc(l, l, l, Math.PI, 3 * Math.PI / 2, !1)), t.closePath(), t.fillStrokeShape(this)
        },
        getSelfRect: function () {
            var t = 0,
                e = 0,
                n = this.getPointerWidth(),
                s = this.getPointerHeight(),
                h = this.pointerDirection(),
                c = this.getWidth(),
                l = this.getHeight();
            return h === i ? (e -= s, l += s) : h === r ? l += s : h === o ? (t -= 1.5 * n, c += n) : h === a && (c += 1.5 * n), {
                x: t,
                y: e,
                width: c,
                height: l
            }
        }
    }, Konva.Util.extend(Konva.Tag, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Tag, "pointerDirection", n), Konva.Factory.addGetterSetter(Konva.Tag, "pointerWidth", 0), Konva.Factory.addGetterSetter(Konva.Tag, "pointerHeight", 0), Konva.Factory.addGetterSetter(Konva.Tag, "cornerRadius", 0), Konva.Collection.mapMethods(Konva.Tag)
}(),
function () {
    "use strict";
    Konva.Arrow = function (t) {
        this.____init(t)
    }, Konva.Arrow.prototype = {
        ____init: function (t) {
            Konva.Line.call(this, t), this.className = "Arrow"
        },
        _sceneFunc: function (t) {
            Konva.Line.prototype._sceneFunc.apply(this, arguments);
            var e = 2 * Math.PI,
                n = this.points(),
                i = n.length,
                a = n[i - 2] - n[i - 4],
                r = n[i - 1] - n[i - 3],
                o = (Math.atan2(r, a) + e) % e,
                s = this.pointerLength(),
                h = this.pointerWidth();
            t.save(), t.beginPath(), t.translate(n[i - 2], n[i - 1]), t.rotate(o), t.moveTo(0, 0), t.lineTo(-s, h / 2), t.lineTo(-s, -h / 2), t.closePath(), t.restore(), this.pointerAtBeginning() && (t.save(), t.translate(n[0], n[1]), a = n[2] - n[0], r = n[3] - n[1], t.rotate((Math.atan2(-r, -a) + e) % e), t.moveTo(0, 0), t.lineTo(-s, h / 2), t.lineTo(-s, -h / 2), t.closePath(), t.restore()), t.fillStrokeShape(this)
        }
    }, Konva.Util.extend(Konva.Arrow, Konva.Line), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerLength", 10), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerWidth", 10), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerAtBeginning", !1), Konva.Collection.mapMethods(Konva.Arrow)
}();
