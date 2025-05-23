var Particles = function(e, t) {
    "use strict";
    var n, i = {};

    function o(e, t) {
        return e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0
    }
    return (n = function() {
        return function() {
            var e = this;
            e.defaults = {
                responsive: null,
                selector: null,
                maxParticles: 30,
                sizeVariations: 3,
                showParticles: 0,
                speed: .5,
                color: "#000000",
                minDistance: 120,
                connectParticles: 100
            }, e.element = null, e.context = null, e.ratio = null, e.breakpoints = [], e.activeBreakpoint = null, e.breakpointSettings = [], e.originalSettings = null, e.storage = [], e.usingPolyfill = !1
        }
    }()).prototype.init = function(e) {
        var t = this;
        return t.options = t._extend(t.defaults, e), t.originalSettings = JSON.parse(JSON.stringify(t.options)), t._animate = t._animate.bind(t), t._initializeCanvas(), t._initializeEvents(), t._registerBreakpoints(), t._checkResponsive(), t._initializeStorage(), t._animate(), t
    }, n.prototype.destroy = function() {
        var t = this;
        t.storage = [], t.element.remove(), e.removeEventListener("resize", t.listener, !1), e.clearTimeout(t._animation), cancelAnimationFrame(t._animation)
    }, n.prototype._initializeCanvas = function() {
        var n, i, o = this;
        if (!o.options.selector) return console.warn(""), !1;
        o.element = t.querySelector(o.options.selector), o.context = o.element.getContext("2d"), n = e.devicePixelRatio || 1, i = o.context.webkitBackingStorePixelRatio || o.context.mozBackingStorePixelRatio || o.context.msBackingStorePixelRatio || o.context.oBackingStorePixelRatio || o.context.backingStorePixelRatio || 1, o.ratio = n / i, o.element.width = o.element.offsetParent ? o.element.offsetParent.clientWidth * o.ratio : o.element.clientWidth * o.ratio, o.element.offsetParent && "BODY" === o.element.offsetParent.nodeName ? o.element.height = e.innerHeight * o.ratio : o.element.height = o.element.offsetParent ? o.element.offsetParent.clientHeight * o.ratio : o.element.clientHeight * o.ratio, o.element.style.width = "100%", o.element.style.height = "100%", o.context.scale(o.ratio, o.ratio)
    }, n.prototype._initializeEvents = function() {
        var t = this;
        t.listener = function() {
            t._resize()
        }.bind(this), e.addEventListener("resize", t.listener, !1)
    }, n.prototype._initializeStorage = function() {
        var e = this;
        e.storage = [];
        for (var t = e.options.maxParticles; t--;) e.storage.push(new i(e.context, e.options))
    }, n.prototype._registerBreakpoints = function() {
        var e, t, n, i = this,
            o = i.options.responsive || null;
        if ("object" == typeof o && null !== o && o.length) {
            for (e in o)
                if (n = i.breakpoints.length - 1, t = o[e].breakpoint, o.hasOwnProperty(e)) {
                    for (; n >= 0;) i.breakpoints[n] && i.breakpoints[n] === t && i.breakpoints.splice(n, 1), n--;
                    i.breakpoints.push(t), i.breakpointSettings[t] = o[e].options
                }
            i.breakpoints.sort(function(e, t) {
                return t - e
            })
        }
    }, n.prototype._checkResponsive = function() {
        var t, n = this,
            i = !1,
            o = e.innerWidth;
        if (n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (t in i = null, n.breakpoints) n.breakpoints.hasOwnProperty(t) && o <= n.breakpoints[t] && (i = n.breakpoints[t]);
            null !== i ? (n.activeBreakpoint = i, n.options = n._extend(n.options, n.breakpointSettings[i])) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, i = null, n.options = n._extend(n.options, n.originalSettings))
        }
    }, n.prototype._refresh = function() {
        this._initializeStorage(), this._draw()
    }, n.prototype._resize = function() {
        var t = this;
        t.element.width = t.element.offsetParent ? t.element.offsetParent.clientWidth * t.ratio : t.element.clientWidth * t.ratio, t.element.offsetParent && "BODY" === t.element.offsetParent.nodeName ? t.element.height = e.innerHeight * t.ratio : t.element.height = t.element.offsetParent ? t.element.offsetParent.clientHeight * t.ratio : t.element.clientHeight * t.ratio, t.context.scale(t.ratio, t.ratio), clearTimeout(t.windowDelay), t.windowDelay = e.setTimeout(function() {
            t._checkResponsive(), t._refresh()
        }, 50)
    }, n.prototype._animate = function() {
        var t = this;
        t._draw(), t._animation = e.requestAnimFrame(t._animate)
    }, n.prototype.resumeAnimation = function() {
        this._animation || this._animate()
    }, n.prototype.pauseAnimation = function() {
        var t = this;
        if (t._animation) {
            if (t.usingPolyfill) e.clearTimeout(t._animation);
            else(e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame)(t._animation);
            t._animation = null
        }
    }, n.prototype._draw = function() {
        var t = this,
            n = t.element,
            i = n.offsetParent ? n.offsetParent.clientWidth : n.clientWidth,
            r = n.offsetParent ? n.offsetParent.clientHeight : n.clientHeight,
            a = t.options.showParticles,
            s = t.storage;
        n.offsetParent && "BODY" === n.offsetParent.nodeName && (r = e.innerHeight), t.context.clearRect(0, 0, n.width, n.height), t.context.beginPath();
        for (var l = s.length; l--;) {
            var c = s[l];
            a && c._draw(), c._updateCoordinates(i, r)
        }
        t.options.connectParticles && (s.sort(o), t._updateEdges())
    }, n.prototype._updateEdges = function() {
        for (var e = this, t = e.options.minDistance, n = Math.sqrt, i = Math.abs, o = e.storage, r = o.length, a = 0; a < r; a++)
            for (var s = o[a], l = a + 1; l < r; l++) {
                var c, f = o[l],
                    p = s.x - f.x,
                    h = s.y - f.y;
                if (c = n(p * p + h * h), i(p) > t) break;
                c <= t && e._drawEdge(s, f, 1.2 - c / t)
            }
    }, n.prototype._drawEdge = function(e, t, n) {
        var i = this,
            o = i.context.createLinearGradient(e.x, e.y, t.x, t.y),
            r = this._hex2rgb(e.color),
            a = this._hex2rgb(t.color);
        o.addColorStop(0, "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")"), o.addColorStop(1, "rgba(" + a.r + "," + a.g + "," + a.b + "," + n + ")"), i.context.beginPath(), i.context.strokeStyle = o, i.context.moveTo(e.x, e.y), i.context.lineTo(t.x, t.y), i.context.stroke(), i.context.fill(), i.context.closePath()
    }, n.prototype._extend = function(e, t) {
        return Object.keys(t).forEach(function(n) {
            e[n] = t[n]
        }), e
    }, n.prototype._hex2rgb = function(e) {
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
        } : null
    }, (i = function(n, i) {
        var o = this,
            r = Math.random,
            a = i.speed,
            s = i.color instanceof Array ? i.color[Math.floor(Math.random() * i.color.length)] : i.color;
        o.context = n, o.options = i;
        var l = t.querySelector(i.selector);
        o.x = l.offsetParent ? r() * l.offsetParent.clientWidth : r() * l.clientWidth, l.offsetParent && "BODY" === l.offsetParent.nodeName ? o.y = r() * e.innerHeight : o.y = l.offsetParent ? r() * l.offsetParent.clientHeight : r() * l.clientHeight, o.vx = r() * a * 2 - a, o.vy = r() * a * 2 - a, o.radius = r() * r() * i.sizeVariations, o.color = s, o._draw()
    }).prototype._draw = function() {
        var e = this;
        e.context.save(), e.context.translate(e.x, e.y), e.context.moveTo(0, 0), e.context.beginPath(), e.context.arc(0, 0, e.radius, 0, 2 * Math.PI, !1), e.context.fillStyle = e.color, e.context.fill(), e.context.restore()
    }, i.prototype._updateCoordinates = function(e, t) {
        var n = this,
            i = n.x + this.vx,
            o = n.y + this.vy,
            r = n.radius;
        i + r > e ? i = r : i - r < 0 && (i = e - r), o + r > t ? o = r : o - r < 0 && (o = t - r), n.x = i, n.y = o
    }, e.requestAnimFrame = function() {
        var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame;
        return t || (this._usingPolyfill = !0, function(t) {
            return e.setTimeout(t, 1e3 / 60)
        })
    }(), new n
}(window, document);
! function() {
    "use strict";
    "function" == typeof define && define.amd ? define("Particles", function() {
        return Particles
    }) : "undefined" != typeof module && module.exports ? module.exports = Particles : window.Particles = Particles
}();