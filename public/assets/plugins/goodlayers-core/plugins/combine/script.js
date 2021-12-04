(function(t, e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof exports === "object") {
        module.exports = e(require("jquery"))
    } else {
        e(t.jQuery)
    }
})(this, function(t) {
    t.transit = {
        version: "0.9.12",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: true,
        useTransitionEnd: false
    };
    var e = document.createElement("div");
    var n = {};

    function i(t) {
        if (t in e.style) return t;
        var n = ["Moz", "Webkit", "O", "ms"];
        var i = t.charAt(0).toUpperCase() + t.substr(1);
        for (var r = 0; r < n.length; ++r) {
            var s = n[r] + i;
            if (s in e.style) {
                return s
            }
        }
    }

    function r() {
        e.style[n.transform] = "";
        e.style[n.transform] = "rotateY(90deg)";
        return e.style[n.transform] !== ""
    }
    var s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    n.transition = i("transition");
    n.transitionDelay = i("transitionDelay");
    n.transform = i("transform");
    n.transformOrigin = i("transformOrigin");
    n.filter = i("Filter");
    n.transform3d = r();
    var a = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    };
    var o = n.transitionEnd = a[n.transition] || null;
    for (var u in n) {
        if (n.hasOwnProperty(u) && typeof t.support[u] === "undefined") {
            t.support[u] = n[u]
        }
    }
    e = null;
    t.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
    };
    t.cssHooks["transit:transform"] = {
        get: function(e) {
            return t(e).data("transform") || new f
        },
        set: function(e, i) {
            var r = i;
            if (!(r instanceof f)) {
                r = new f(r)
            }
            if (n.transform === "WebkitTransform" && !s) {
                e.style[n.transform] = r.toString(true)
            } else {
                e.style[n.transform] = r.toString()
            }
            t(e).data("transform", r)
        }
    };
    t.cssHooks.transform = {
        set: t.cssHooks["transit:transform"].set
    };
    t.cssHooks.filter = {
        get: function(t) {
            return t.style[n.filter]
        },
        set: function(t, e) {
            t.style[n.filter] = e
        }
    };
    if (t.fn.jquery < "1.8") {
        t.cssHooks.transformOrigin = {
            get: function(t) {
                return t.style[n.transformOrigin]
            },
            set: function(t, e) {
                t.style[n.transformOrigin] = e
            }
        };
        t.cssHooks.transition = {
            get: function(t) {
                return t.style[n.transition]
            },
            set: function(t, e) {
                t.style[n.transition] = e
            }
        }
    }
    p("scale");
    p("scaleX");
    p("scaleY");
    p("translate");
    p("rotate");
    p("rotateX");
    p("rotateY");
    p("rotate3d");
    p("perspective");
    p("skewX");
    p("skewY");
    p("x", true);
    p("y", true);

    function f(t) {
        if (typeof t === "string") {
            this.parse(t)
        }
        return this
    }
    f.prototype = {
        setFromString: function(t, e) {
            var n = typeof e === "string" ? e.split(",") : e.constructor === Array ? e : [e];
            n.unshift(t);
            f.prototype.set.apply(this, n)
        },
        set: function(t) {
            var e = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[t]) {
                this.setter[t].apply(this, e)
            } else {
                this[t] = e.join(",")
            }
        },
        get: function(t) {
            if (this.getter[t]) {
                return this.getter[t].apply(this)
            } else {
                return this[t] || 0
            }
        },
        setter: {
            rotate: function(t) {
                this.rotate = b(t, "deg")
            },
            rotateX: function(t) {
                this.rotateX = b(t, "deg")
            },
            rotateY: function(t) {
                this.rotateY = b(t, "deg")
            },
            scale: function(t, e) {
                if (e === undefined) {
                    e = t
                }
                this.scale = t + "," + e
            },
            skewX: function(t) {
                this.skewX = b(t, "deg")
            },
            skewY: function(t) {
                this.skewY = b(t, "deg")
            },
            perspective: function(t) {
                this.perspective = b(t, "px")
            },
            x: function(t) {
                this.set("translate", t, null)
            },
            y: function(t) {
                this.set("translate", null, t)
            },
            translate: function(t, e) {
                if (this._translateX === undefined) {
                    this._translateX = 0
                }
                if (this._translateY === undefined) {
                    this._translateY = 0
                }
                if (t !== null && t !== undefined) {
                    this._translateX = b(t, "px")
                }
                if (e !== null && e !== undefined) {
                    this._translateY = b(e, "px")
                }
                this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0
            },
            y: function() {
                return this._translateY || 0
            },
            scale: function() {
                var t = (this.scale || "1,1").split(",");
                if (t[0]) {
                    t[0] = parseFloat(t[0])
                }
                if (t[1]) {
                    t[1] = parseFloat(t[1])
                }
                return t[0] === t[1] ? t[0] : t
            },
            rotate3d: function() {
                var t = (this.rotate3d || "0,0,0,0deg").split(",");
                for (var e = 0; e <= 3; ++e) {
                    if (t[e]) {
                        t[e] = parseFloat(t[e])
                    }
                }
                if (t[3]) {
                    t[3] = b(t[3], "deg")
                }
                return t
            }
        },
        parse: function(t) {
            var e = this;
            t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(t, n, i) {
                e.setFromString(n, i)
            })
        },
        toString: function(t) {
            var e = [];
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    if (!n.transform3d && (i === "rotateX" || i === "rotateY" || i === "perspective" || i === "transformOrigin")) {
                        continue
                    }
                    if (i[0] !== "_") {
                        if (t && i === "scale") {
                            e.push(i + "3d(" + this[i] + ",1)")
                        } else if (t && i === "translate") {
                            e.push(i + "3d(" + this[i] + ",0)")
                        } else {
                            e.push(i + "(" + this[i] + ")")
                        }
                    }
                }
            }
            return e.join(" ")
        }
    };

    function c(t, e, n) {
        if (e === true) {
            t.queue(n)
        } else if (e) {
            t.queue(e, n)
        } else {
            t.each(function() {
                n.call(this)
            })
        }
    }

    function l(e) {
        var i = [];
        t.each(e, function(e) {
            e = t.camelCase(e);
            e = t.transit.propertyMap[e] || t.cssProps[e] || e;
            e = h(e);
            if (n[e]) e = h(n[e]);
            if (t.inArray(e, i) === -1) {
                i.push(e)
            }
        });
        return i
    }

    function d(e, n, i, r) {
        var s = l(e);
        if (t.cssEase[i]) {
            i = t.cssEase[i]
        }
        var a = "" + y(n) + " " + i;
        if (parseInt(r, 10) > 0) {
            a += " " + y(r)
        }
        var o = [];
        t.each(s, function(t, e) {
            o.push(e + " " + a)
        });
        return o.join(", ")
    }
    t.fn.transition = t.fn.transit = function(e, i, r, s) {
        var a = this;
        var u = 0;
        var f = true;
        var l = t.extend(true, {}, e);
        if (typeof i === "function") {
            s = i;
            i = undefined
        }
        if (typeof i === "object") {
            r = i.easing;
            u = i.delay || 0;
            f = typeof i.queue === "undefined" ? true : i.queue;
            s = i.complete;
            i = i.duration
        }
        if (typeof r === "function") {
            s = r;
            r = undefined
        }
        if (typeof l.easing !== "undefined") {
            r = l.easing;
            delete l.easing
        }
        if (typeof l.duration !== "undefined") {
            i = l.duration;
            delete l.duration
        }
        if (typeof l.complete !== "undefined") {
            s = l.complete;
            delete l.complete
        }
        if (typeof l.queue !== "undefined") {
            f = l.queue;
            delete l.queue
        }
        if (typeof l.delay !== "undefined") {
            u = l.delay;
            delete l.delay
        }
        if (typeof i === "undefined") {
            i = t.fx.speeds._default
        }
        if (typeof r === "undefined") {
            r = t.cssEase._default
        }
        i = y(i);
        var p = d(l, i, r, u);
        var h = t.transit.enabled && n.transition;
        var b = h ? parseInt(i, 10) + parseInt(u, 10) : 0;
        if (b === 0) {
            var g = function(t) {
                a.css(l);
                if (s) {
                    s.apply(a)
                }
                if (t) {
                    t()
                }
            };
            c(a, f, g);
            return a
        }
        var m = {};
        var v = function(e) {
            var i = false;
            var r = function() {
                if (i) {
                    a.unbind(o, r)
                }
                if (b > 0) {
                    a.each(function() {
                        this.style[n.transition] = m[this] || null
                    })
                }
                if (typeof s === "function") {
                    s.apply(a)
                }
                if (typeof e === "function") {
                    e()
                }
            };
            if (b > 0 && o && t.transit.useTransitionEnd) {
                i = true;
                a.bind(o, r)
            } else {
                window.setTimeout(r, b)
            }
            a.each(function() {
                if (b > 0) {
                    this.style[n.transition] = p
                }
                t(this).css(l)
            })
        };
        var z = function(t) {
            this.offsetWidth;
            v(t)
        };
        c(a, f, z);
        return this
    };

    function p(e, i) {
        if (!i) {
            t.cssNumber[e] = true
        }
        t.transit.propertyMap[e] = n.transform;
        t.cssHooks[e] = {
            get: function(n) {
                var i = t(n).css("transit:transform");
                return i.get(e)
            },
            set: function(n, i) {
                var r = t(n).css("transit:transform");
                r.setFromString(e, i);
                t(n).css({
                    "transit:transform": r
                })
            }
        }
    }

    function h(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }

    function b(t, e) {
        if (typeof t === "string" && !t.match(/^[\-0-9\.]+$/)) {
            return t
        } else {
            return "" + t + e
        }
    }

    function y(e) {
        var n = e;
        if (typeof n === "string" && !n.match(/^[\-0-9\.]+/)) {
            n = t.fx.speeds[n] || t.fx.speeds._default
        }
        return b(n, "ms")
    }
    t.transit.getTransitionValue = d;
    return t
});
var Froogaloop = function() {
    function e(a) {
        return new e.fn.init(a)
    }

    function g(a, c, b) {
        if (!b.contentWindow.postMessage) return !1;
        a = JSON.stringify({
            method: a,
            value: c
        });
        b.contentWindow.postMessage(a, h)
    }

    function l(a) {
        var c, b;
        try {
            c = JSON.parse(a.data), b = c.event || c.method
        } catch (e) {}
        "ready" != b || k || (k = !0);
        if (!/^https?:\/\/player.vimeo.com/.test(a.origin)) return !1;
        "*" === h && (h = a.origin);
        a = c.value;
        var m = c.data,
            f = "" === f ? null : c.player_id;
        c = f ? d[f][b] : d[b];
        b = [];
        if (!c) return !1;
        void 0 !== a && b.push(a);
        m && b.push(m);
        f && b.push(f);
        return 0 < b.length ? c.apply(null, b) : c.call()
    }

    function n(a, c, b) {
        b ? (d[b] || (d[b] = {}), d[b][a] = c) : d[a] = c
    }
    var d = {},
        k = !1,
        h = "*";
    e.fn = e.prototype = {
        element: null,
        init: function(a) {
            "string" === typeof a && (a = document.getElementById(a));
            this.element = a;
            return this
        },
        api: function(a, c) {
            if (!this.element || !a) return !1;
            var b = this.element,
                d = "" !== b.id ? b.id : null,
                e = c && c.constructor && c.call && c.apply ? null : c,
                f = c && c.constructor && c.call && c.apply ? c : null;
            f && n(a, f, d);
            g(a, e, b);
            return this
        },
        addEvent: function(a, c) {
            if (!this.element) return !1;
            var b = this.element,
                d = "" !== b.id ? b.id : null;
            n(a, c, d);
            "ready" != a ? g("addEventListener", a, b) : "ready" == a && k && c.call(null, d);
            return this
        },
        removeEvent: function(a) {
            if (!this.element) return !1;
            var c = this.element,
                b = "" !== c.id ? c.id : null;
            a: {
                if (b && d[b]) {
                    if (!d[b][a]) {
                        b = !1;
                        break a
                    }
                    d[b][a] = null
                } else {
                    if (!d[a]) {
                        b = !1;
                        break a
                    }
                    d[a] = null
                }
                b = !0
            }
            "ready" != a && b && g("removeEventListener", a, c)
        }
    };
    e.fn.init.prototype = e.fn;
    window.addEventListener ? window.addEventListener("message", l, !1) : window.attachEvent("onmessage", l);
    return window.Froogaloop = window.$f = e
}();
! function(a) {
    var b = function() {
            var a, b = document.createElement("fakeelement"),
                c = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (a in c)
                if (void 0 !== b.style[a]) return c[a]
        },
        c = function(b, c, d) {
            this.setting = {
                axis: "y",
                reverse: !1,
                trigger: "click",
                speed: 500,
                forceHeight: !1,
                forceWidth: !1,
                autoSize: !0,
                front: ".front",
                back: ".back"
            }, this.setting = a.extend(this.setting, c), "string" != typeof c.axis || "x" !== c.axis.toLowerCase() && "y" !== c.axis.toLowerCase() || (this.setting.axis = c.axis.toLowerCase()), "boolean" == typeof c.reverse && (this.setting.reverse = c.reverse), "string" == typeof c.trigger && (this.setting.trigger = c.trigger.toLowerCase());
            var e = parseInt(c.speed);
            isNaN(e) || (this.setting.speed = e), "boolean" == typeof c.forceHeight && (this.setting.forceHeight = c.forceHeight), "boolean" == typeof c.forceWidth && (this.setting.forceWidth = c.forceWidth), "boolean" == typeof c.autoSize && (this.setting.autoSize = c.autoSize), ("string" == typeof c.front || c.front instanceof a) && (this.setting.front = c.front), ("string" == typeof c.back || c.back instanceof a) && (this.setting.back = c.back), this.element = b, this.frontElement = this.getFrontElement(), this.backElement = this.getBackElement(), this.isFlipped = !1, this.init(d)
        };
    a.extend(c.prototype, {
        flipDone: function(a) {
            var c = this;
            c.element.one(b(), function() {
                c.element.trigger("flip:done"), "function" == typeof a && a.call(c.element)
            })
        },
        flip: function(a) {
            if (!this.isFlipped) {
                this.isFlipped = !0;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }), this.backElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.flipDone(a)
            }
        },
        unflip: function(a) {
            if (this.isFlipped) {
                this.isFlipped = !1;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.backElement.css({
                    transform: b + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), this.flipDone(a)
            }
        },
        getFrontElement: function() {
            return this.setting.front instanceof a ? this.setting.front : this.element.find(this.setting.front)
        },
        getBackElement: function() {
            return this.setting.back instanceof a ? this.setting.back : this.element.find(this.setting.back)
        },
        init: function(a) {
            var b = this,
                c = b.frontElement.add(b.backElement),
                d = "rotate" + b.setting.axis,
                e = 2 * b.element["outer" + ("rotatex" === d ? "Height" : "Width")](),
                f = {
                    perspective: e,
                    position: "relative"
                },
                g = {
                    transform: d + "(" + (b.setting.reverse ? "180deg" : "-180deg") + ")",
                    "z-index": "0",
                    position: "relative"
                },
                h = {
                    "backface-visibility": "hidden",
                    "transform-style": "preserve-3d",
                    position: "absolute",
                    "z-index": "1"
                };
            b.setting.forceHeight ? c.outerHeight(b.element.height()) : b.setting.autoSize && (h.height = "100%"), b.setting.forceWidth ? c.outerWidth(b.element.width()) : b.setting.autoSize && (h.width = "100%"), (window.chrome || window.Intl && Intl.v8BreakIterator) && "CSS" in window && (f["-webkit-transform-style"] = "preserve-3d"), c.css(h).find("*").css({
                "backface-visibility": "hidden"
            }), b.element.css(f), b.backElement.css(g), setTimeout(function() {
                var d = b.setting.speed / 1e3 || .5;
                c.css({
                    transition: "all " + d + "s ease-out"
                }), "function" == typeof a && a.call(b.element)
            }, 20), b.attachEvents()
        },
        clickHandler: function(b) {
            b || (b = window.event), this.element.find(a(b.target).closest('button, a, input[type="submit"]')).length || (this.isFlipped ? this.unflip() : this.flip())
        },
        hoverHandler: function() {
            var b = this;
            b.element.off("mouseleave.flip"), b.flip(), setTimeout(function() {
                b.element.on("mouseleave.flip", a.proxy(b.unflip, b)), b.element.is(":hover") || b.unflip()
            }, b.setting.speed + 150)
        },
        attachEvents: function() {
            var b = this;
            "click" === b.setting.trigger ? b.element.on(a.fn.tap ? "tap.flip" : "click.flip", a.proxy(b.clickHandler, b)) : "hover" === b.setting.trigger && (b.element.on("mouseenter.flip", a.proxy(b.hoverHandler, b)), b.element.on("mouseleave.flip", a.proxy(b.unflip, b)))
        },
        flipChanged: function(a) {
            this.element.trigger("flip:change"), "function" == typeof a && a.call(this.element)
        },
        changeSettings: function(a, b) {
            var c = this,
                d = !1;
            if (void 0 !== a.axis && c.setting.axis !== a.axis.toLowerCase() && (c.setting.axis = a.axis.toLowerCase(), d = !0), void 0 !== a.reverse && c.setting.reverse !== a.reverse && (c.setting.reverse = a.reverse, d = !0), d) {
                var e = c.frontElement.add(c.backElement),
                    f = e.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);
                e.css({
                    transition: "none"
                });
                var g = "rotate" + c.setting.axis;
                c.isFlipped ? c.frontElement.css({
                    transform: g + (c.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }) : c.backElement.css({
                    transform: g + (c.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), setTimeout(function() {
                    e.css(f), c.flipChanged(b)
                }, 0)
            } else c.flipChanged(b)
        }
    }), a.fn.flip = function(b, d) {
        return "function" == typeof b && (d = b), "string" == typeof b || "boolean" == typeof b ? this.each(function() {
            var c = a(this).data("flip-model");
            "toggle" === b && (b = !c.isFlipped), b ? c.flip(d) : c.unflip(d)
        }) : this.each(function() {
            if (a(this).data("flip-model")) {
                var e = a(this).data("flip-model");
                !b || void 0 === b.axis && void 0 === b.reverse || e.changeSettings(b, d)
            } else a(this).data("flip-model", new c(a(this), b || {}, d))
        }), this
    }
}(jQuery);
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            a.appendChild(d), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size;
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                }(),
                k = function() {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1)
                };
            this.getCanvas = function() {
                return d
            }, this.getCtx = function() {
                return e
            }, this.clear = function() {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate.duration),
                        g = b.easing(this, f, a, c - a, b.animate.duration);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function(a, b) {},
                onStep: function(a, b, c) {},
                onStop: function(a, b) {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
                        duration: e.animate,
                        enabled: !0
                    }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                        duration: 1e3,
                        enabled: e.animate
                    }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) {
                return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), this.disableAnimation = function() {
                return e.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return e.animate.enabled = !0, this
            }, g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});
! function(e) {
    var t = !0;
    e.goodlayers_flexslider = function(a, n) {
        var i = e(a);
        i.vars = e.extend({}, e.goodlayers_flexslider.defaults, n);
        var s, r = i.vars.namespace,
            o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            l = ("ontouchstart" in window || o || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch,
            d = "click touchend MSPointerUp keyup",
            c = "",
            u = "vertical" === i.vars.direction,
            v = i.vars.reverse,
            p = i.vars.itemWidth > 0,
            m = "fade" === i.vars.animation,
            f = "" !== i.vars.asNavFor,
            g = {};
        e.data(a, "goodlayers_flexslider", i), g = {
            init: function() {
                i.animating = !1, i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10), isNaN(i.currentSlide) && (i.currentSlide = 0), i.animatingTo = i.currentSlide, i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last, i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")), i.slides = e(i.vars.selector, i), i.container = e(i.containerSelector, i), i.count = i.slides.length, i.syncExists = e(i.vars.sync).length > 0, "slide" === i.vars.animation && (i.vars.animation = "swing"), i.prop = u ? "top" : "marginLeft", i.args = {}, i.manualPause = !1, i.stopped = !1, i.started = !1, i.startTimeout = null, i.transitions = !i.vars.video && !m && i.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var a in t)
                        if (void 0 !== e.style[t[a]]) return i.pfx = t[a].replace("Perspective", "").toLowerCase(), i.prop = "-" + i.pfx + "-transform", !0;
                    return !1
                }(), i.ensureAnimationEnd = "", "" !== i.vars.controlsContainer && (i.controlsContainer = e(i.vars.controlsContainer).length > 0 && e(i.vars.controlsContainer)), "" !== i.vars.manualControls && (i.manualControls = e(i.vars.manualControls).length > 0 && e(i.vars.manualControls)), "" !== i.vars.customDirectionNav && (i.customDirectionNav = 2 === e(i.vars.customDirectionNav).length && e(i.vars.customDirectionNav)), i.vars.randomize && (i.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), i.container.empty().append(i.slides)), i.doMath(), i.setup("init"), i.vars.controlNav && g.controlNav.setup(), i.vars.directionNav && g.directionNav.setup(), i.vars.keyboard && (1 === e(i.containerSelector).length || i.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!i.animating && (39 === t || 37 === t)) {
                        var a = 39 === t ? i.getTarget("next") : 37 === t && i.getTarget("prev");
                        i.flexAnimate(a, i.vars.pauseOnAction)
                    }
                }), i.vars.mousewheel && i.bind("mousewheel", function(e, t, a, n) {
                    e.preventDefault();
                    var s = t < 0 ? i.getTarget("next") : i.getTarget("prev");
                    i.flexAnimate(s, i.vars.pauseOnAction)
                }), i.vars.pausePlay && g.pausePlay.setup(), i.vars.slideshow && i.vars.pauseInvisible && g.pauseInvisible.init(), i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function() {
                    i.manualPlay || i.manualPause || i.pause()
                }, function() {
                    i.manualPause || i.manualPlay || i.stopped || i.play()
                }), i.vars.pauseInvisible && g.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())), f && g.asNav.setup(), l && i.vars.touch && g.touch(), (!m || m && i.vars.smoothHeight) && e(window).bind("resize orientationchange focus gdlr-core-element-resize", g.resize), i.find("img").attr("draggable", "false"), setTimeout(function() {
                    i.vars.start(i)
                }, 200)
            },
            asNav: {
                setup: function() {
                    i.asNav = !0, i.animatingTo = Math.floor(i.currentSlide / i.move), i.currentItem = i.currentSlide, i.slides.removeClass(r + "active-slide").eq(i.currentItem).addClass(r + "active-slide"), o ? (a._slider = i, i.slides.each(function() {
                        var t = this;
                        t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), t.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var a = e(this),
                                n = a.index();
                            e(i.vars.asNavFor).data("goodlayers_flexslider").animating || a.hasClass("active") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : i.slides.on(d, function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = a.index();
                        a.offset().left - e(i).scrollLeft() <= 0 && a.hasClass(r + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : e(i.vars.asNavFor).data("goodlayers_flexslider").animating || a.hasClass(r + "active-slide") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    i.manualControls ? g.controlNav.setupManual() : g.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t, a, n = "thumbnails" === i.vars.controlNav ? "control-thumbs" : "control-paging",
                        s = 1;
                    if (i.controlNavScaffold = e('<ol class="' + r + "control-nav " + r + n + '"></ol>'), i.pagingCount > 1)
                        for (var o = 0; o < i.pagingCount; o++) {
                            if (void 0 === (a = i.slides.eq(o)).attr("data-thumb-alt") && a.attr("data-thumb-alt", ""), altText = "" !== a.attr("data-thumb-alt") ? altText = ' alt="' + a.attr("data-thumb-alt") + '"' : "", t = "thumbnails" === i.vars.controlNav ? '<img src="' + a.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + s + "</a>", "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                                var l = a.attr("data-thumbcaption");
                                "" !== l && void 0 !== l && (t += '<span class="' + r + 'caption">' + l + "</span>")
                            }
                            i.controlNavScaffold.append("<li>" + t + "</li>"), s++
                        }
                    i.controlsContainer ? e(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold), g.controlNav.set(), g.controlNav.active(), i.controlNavScaffold.delegate("a, img", d, function(t) {
                        if (t.preventDefault(), "" === c || c === t.type) {
                            var a = e(this),
                                n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (i.direction = n > i.currentSlide ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type), g.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    i.controlNav = i.manualControls, g.controlNav.active(), i.controlNav.bind(d, function(t) {
                        if (t.preventDefault(), "" === c || c === t.type) {
                            var a = e(this),
                                n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (n > i.currentSlide ? i.direction = "next" : i.direction = "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type), g.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = "thumbnails" === i.vars.controlNav ? "img" : "a";
                    i.controlNav = e("." + r + "control-nav li " + t, i.controlsContainer ? i.controlsContainer : i)
                },
                active: function() {
                    i.controlNav.removeClass(r + "active").eq(i.animatingTo).addClass(r + "active")
                },
                update: function(t, a) {
                    i.pagingCount > 1 && "add" === t ? i.controlNavScaffold.append(e('<li><a href="#">' + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(a).closest("li").remove(), g.controlNav.set(), i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(a, t) : g.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + r + 'direction-nav"><li class="' + r + 'nav-prev"><a class="' + r + 'prev" href="#">' + i.vars.prevText + '</a></li><li class="' + r + 'nav-next"><a class="' + r + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                    i.customDirectionNav ? i.directionNav = i.customDirectionNav : i.controlsContainer ? (e(i.controlsContainer).append(t), i.directionNav = e("." + r + "direction-nav li a", i.controlsContainer)) : (i.append(t), i.directionNav = e("." + r + "direction-nav li a", i)), g.directionNav.update(), i.directionNav.bind(d, function(t) {
                        t.preventDefault();
                        var a;
                        "" !== c && c !== t.type || (a = e(this).hasClass(r + "next") ? i.getTarget("next") : i.getTarget("prev"), i.flexAnimate(a, i.vars.pauseOnAction)), "" === c && (c = t.type), g.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = r + "disabled";
                    1 === i.pagingCount ? i.directionNav.addClass(e).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(e).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(e).filter("." + r + "prev").addClass(e).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(e).filter("." + r + "next").addClass(e).attr("tabindex", "-1") : i.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + r + 'pauseplay"><a href="#"></a></div>');
                    i.controlsContainer ? (i.controlsContainer.append(t), i.pausePlay = e("." + r + "pauseplay a", i.controlsContainer)) : (i.append(t), i.pausePlay = e("." + r + "pauseplay a", i)), g.pausePlay.update(i.vars.slideshow ? r + "pause" : r + "play"), i.pausePlay.bind(d, function(t) {
                        t.preventDefault(), "" !== c && c !== t.type || (e(this).hasClass(r + "pause") ? (i.manualPause = !0, i.manualPlay = !1, i.pause()) : (i.manualPause = !1, i.manualPlay = !0, i.play())), "" === c && (c = t.type), g.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? i.pausePlay.removeClass(r + "pause").addClass(r + "play").html(i.vars.playText) : i.pausePlay.removeClass(r + "play").addClass(r + "pause").html(i.vars.pauseText)
                }
            },
            touch: function() {
                var e, t, n, s, r, l, d, c, f, g = !1,
                    h = 0,
                    y = 0,
                    S = 0;
                o ? (a.style.msTouchAction = "none", a._gesture = new MSGesture, a._gesture.target = a, a.addEventListener("MSPointerDown", function(e) {
                    e.stopPropagation(), i.animating ? e.preventDefault() : (i.pause(), a._gesture.addPointer(e.pointerId), S = 0, s = u ? i.h : i.w, l = Number(new Date), n = p && v && i.animatingTo === i.last ? 0 : p && v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : v ? (i.last - i.currentSlide + i.cloneOffset) * s : (i.currentSlide + i.cloneOffset) * s)
                }, !1), a._slider = i, a.addEventListener("MSGestureChange", function(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        var i = -e.translationX,
                            o = -e.translationY;
                        r = S += u ? o : i, g = u ? Math.abs(S) < Math.abs(-i) : Math.abs(S) < Math.abs(-o), e.detail !== e.MSGESTURE_FLAG_INERTIA ? (!g || Number(new Date) - l > 500) && (e.preventDefault(), !m && t.transitions && (t.vars.animationLoop || (r = S / (0 === t.currentSlide && S < 0 || t.currentSlide === t.last && S > 0 ? Math.abs(S) / s + 2 : 1)), t.setProps(n + r, "setTouch"))) : setImmediate(function() {
                            a._gesture.stop()
                        })
                    }
                }, !1), a.addEventListener("MSGestureEnd", function(a) {
                    a.stopPropagation();
                    var i = a.target._slider;
                    if (i) {
                        if (i.animatingTo === i.currentSlide && !g && null !== r) {
                            var o = v ? -r : r,
                                d = o > 0 ? i.getTarget("next") : i.getTarget("prev");
                            i.canAdvance(d) && (Number(new Date) - l < 550 && Math.abs(o) > 50 || Math.abs(o) > s / 2) ? i.flexAnimate(d, i.vars.pauseOnAction) : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                        }
                        e = null, t = null, r = null, n = null, S = 0
                    }
                }, !1)) : (d = function(r) {
                    i.animating ? r.preventDefault() : (window.navigator.msPointerEnabled || 1 === r.touches.length) && (i.pause(), s = u ? i.h : i.w, l = Number(new Date), h = r.touches[0].pageX, y = r.touches[0].pageY, n = p && v && i.animatingTo === i.last ? 0 : p && v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : v ? (i.last - i.currentSlide + i.cloneOffset) * s : (i.currentSlide + i.cloneOffset) * s, e = u ? y : h, t = u ? h : y, a.addEventListener("touchmove", c, !1), a.addEventListener("touchend", f, !1))
                }, c = function(a) {
                    h = a.touches[0].pageX, y = a.touches[0].pageY, r = u ? e - y : e - h;
                    (!(g = u ? Math.abs(r) < Math.abs(h - t) : Math.abs(r) < Math.abs(y - t)) || Number(new Date) - l > 500) && (a.preventDefault(), !m && i.transitions && (i.vars.animationLoop || (r /= 0 === i.currentSlide && r < 0 || i.currentSlide === i.last && r > 0 ? Math.abs(r) / s + 2 : 1), i.setProps(n + r, "setTouch")))
                }, f = function(o) {
                    if (a.removeEventListener("touchmove", c, !1), i.animatingTo === i.currentSlide && !g && null !== r) {
                        var d = v ? -r : r,
                            u = d > 0 ? i.getTarget("next") : i.getTarget("prev");
                        i.canAdvance(u) && (Number(new Date) - l < 550 && Math.abs(d) > 50 || Math.abs(d) > s / 2) ? i.flexAnimate(u, i.vars.pauseOnAction) : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                    }
                    a.removeEventListener("touchend", f, !1), e = null, t = null, r = null, n = null
                }, a.addEventListener("touchstart", d, !1))
            },
            resize: function() {
                !i.animating && i.is(":visible") && (p || i.doMath(), m ? g.smoothHeight() : p ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps()) : u ? (i.viewport.height(i.h), i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && g.smoothHeight(), i.newSlides.width(i.computedW), i.setProps(i.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!u || m) {
                    var t = m ? i : i.viewport;
                    e ? t.animate({
                        height: i.slides.eq(i.animatingTo).height()
                    }, e) : t.height(i.slides.eq(i.animatingTo).height())
                }
            },
            sync: function(t) {
                var a = e(i.vars.sync).data("goodlayers_flexslider"),
                    n = i.animatingTo;
                switch (t) {
                    case "animate":
                        a.flexAnimate(n, i.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        a.playing || a.asNav || a.play();
                        break;
                    case "pause":
                        a.pause()
                }
            },
            uniqueID: function(t) {
                return t.filter("[id]").add(t.find("[id]")).each(function() {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = g.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() {
                            g.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play()
                        })
                    }
                },
                isHidden: function() {
                    var e = g.pauseInvisible.getHiddenProp();
                    return !!e && document[e]
                },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(s), s = setTimeout(function() {
                    c = ""
                }, 3e3)
            }
        }, i.flexAnimate = function(t, a, n, s, o) {
            if (i.vars.animationLoop || t === i.currentSlide || (i.direction = t > i.currentSlide ? "next" : "prev"), f && 1 === i.pagingCount && (i.direction = i.currentItem < t ? "next" : "prev"), !i.animating && (i.canAdvance(t, o) || n) && i.is(":visible")) {
                if (f && s) {
                    var d = e(i.vars.asNavFor).data("goodlayers_flexslider");
                    if (i.atEnd = 0 === t || t === i.count - 1, d.flexAnimate(t, !0, !1, !0, o), i.direction = i.currentItem < t ? "next" : "prev", d.direction = i.direction, Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t) return i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), !1;
                    i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), t = Math.floor(t / i.visible)
                }
                if (i.animating = !0, i.animatingTo = t, a && i.pause(), i.vars.before(i), i.syncExists && !o && g.sync("animate"), i.vars.controlNav && g.controlNav.active(), p || i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), i.atEnd = 0 === t || t === i.last, i.vars.directionNav && g.directionNav.update(), t === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()), m) l ? (i.slides.eq(i.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), i.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), i.wrapup(S)) : (i.slides.eq(i.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, i.vars.animationSpeed, i.vars.easing), i.slides.eq(t).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, i.vars.animationSpeed, i.vars.easing, i.wrapup));
                else {
                    var c, h, y, S = u ? i.slides.filter(":first").height() : i.computedW;
                    p ? (c = i.vars.itemMargin, h = (y = (i.itemW + c) * i.move * i.animatingTo) > i.limit && 1 !== i.visible ? i.limit : y) : h = 0 === i.currentSlide && t === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? v ? (i.count + i.cloneOffset) * S : 0 : i.currentSlide === i.last && 0 === t && i.vars.animationLoop && "prev" !== i.direction ? v ? 0 : (i.count + 1) * S : v ? (i.count - 1 - t + i.cloneOffset) * S : (t + i.cloneOffset) * S, i.setProps(h, "", i.vars.animationSpeed), i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1, i.currentSlide = i.animatingTo), i.container.unbind("webkitTransitionEnd transitionend"), i.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(i.ensureAnimationEnd), i.wrapup(S)
                    }), clearTimeout(i.ensureAnimationEnd), i.ensureAnimationEnd = setTimeout(function() {
                        i.wrapup(S)
                    }, i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function() {
                        i.wrapup(S)
                    })
                }
                i.vars.smoothHeight && g.smoothHeight(i.vars.animationSpeed)
            }
        }, i.wrapup = function(e) {
            m || p || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(e, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(e, "jumpStart")), i.animating = !1, i.currentSlide = i.animatingTo, i.vars.after(i)
        }, i.animateSlides = function() {
            !i.animating && t && i.flexAnimate(i.getTarget("next"))
        }, i.pause = function() {
            clearInterval(i.animatedSlides), i.animatedSlides = null, i.playing = !1, i.vars.pausePlay && g.pausePlay.update("play"), i.syncExists && g.sync("pause")
        }, i.play = function() {
            i.playing && clearInterval(i.animatedSlides), i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed), i.started = i.playing = !0, i.vars.pausePlay && g.pausePlay.update("pause"), i.syncExists && g.sync("play")
        }, i.stop = function() {
            i.pause(), i.stopped = !0
        }, i.canAdvance = function(e, t) {
            var a = f ? i.pagingCount - 1 : i.last;
            return !!t || (!(!f || i.currentItem !== i.count - 1 || 0 !== e || "prev" !== i.direction) || (!f || 0 !== i.currentItem || e !== i.pagingCount - 1 || "next" === i.direction) && (!(e === i.currentSlide && !f) && (!!i.vars.animationLoop || (!i.atEnd || 0 !== i.currentSlide || e !== a || "next" === i.direction) && (!i.atEnd || i.currentSlide !== a || 0 !== e || "next" !== i.direction))))
        }, i.getTarget = function(e) {
            return i.direction = e, "next" === e ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last : i.currentSlide - 1
        }, i.setProps = function(e, t, a) {
            var n = function() {
                var a = e || (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo;
                return -1 * function() {
                    if (p) return "setTouch" === t ? e : v && i.animatingTo === i.last ? 0 : v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : i.animatingTo === i.last ? i.limit : a;
                    switch (t) {
                        case "setTotal":
                            return v ? (i.count - 1 - i.currentSlide + i.cloneOffset) * e : (i.currentSlide + i.cloneOffset) * e;
                        case "setTouch":
                            return e;
                        case "jumpEnd":
                            return v ? e : i.count * e;
                        case "jumpStart":
                            return v ? i.count * e : e;
                        default:
                            return e
                    }
                }() + "px"
            }();
            i.transitions && (n = u ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", i.container.css("-" + i.pfx + "-transition-duration", a), i.container.css("transition-duration", a)), i.args[i.prop] = n, (i.transitions || void 0 === a) && i.container.css(i.args), i.container.css("transform", n)
        }, i.setup = function(t) {
            if (m) i.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === t && (l ? i.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(i.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == i.vars.fadeFirstSlide ? i.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(i.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : i.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(i.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, i.vars.animationSpeed, i.vars.easing)), i.vars.smoothHeight && g.smoothHeight();
            else {
                var a, n;
                "init" === t && (i.viewport = e('<div class="' + r + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(i).append(i.container), i.cloneCount = 0, i.cloneOffset = 0, v && (n = e.makeArray(i.slides).reverse(), i.slides = e(n), i.container.empty().append(i.slides))), i.vars.animationLoop && !p && (i.cloneCount = 2, i.cloneOffset = 1, "init" !== t && i.container.find(".clone").remove(), i.container.append(g.uniqueID(i.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(g.uniqueID(i.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), i.newSlides = e(i.vars.selector, i), a = v ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset, u && !p ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    i.newSlides.css({
                        display: "block"
                    }), i.doMath(), i.viewport.height(i.h), i.setProps(a * i.h, "init")
                }, "init" === t ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"), i.setProps(a * i.computedW, "init"), setTimeout(function() {
                    i.doMath(), i.newSlides.css({
                        width: i.computedW,
                        marginRight: i.computedM,
                        float: "left",
                        display: "block"
                    }), i.vars.smoothHeight && g.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            p || i.slides.removeClass(r + "active-slide").eq(i.currentSlide).addClass(r + "active-slide"), i.vars.init(i)
        }, i.doMath = function() {
            var t = i.slides.first(),
                a = i.vars.itemMargin,
                n = i.vars.minItems,
                s = i.vars.maxItems;
            "function" == typeof window.matchMedia ? (window.matchMedia("(max-width: 767px)").matches && (n = 1, s = 1), window.matchMedia("(max-width: 419px)").matches && (n = 1, s = 1)) : (e(window).innerWidth() < 767 && (n = 1, s = 1), e(window).innerWidth() < 419 && (n = 1, s = 1)), i.w = void 0 === i.viewport ? i.width() : i.viewport.width(), i.h = t.height(), i.boxPadding = t.outerWidth() - t.width(), p ? (i.itemT = i.vars.itemWidth + a, i.itemM = a, i.minW = n ? n * i.itemT : i.w, i.maxW = s ? s * i.itemT - a : i.w, i.itemW = i.minW > i.w ? (i.w - a * (n - 1)) / n : i.maxW < i.w ? (i.w - a * (s - 1)) / s : i.vars.itemWidth > i.w ? i.w : i.vars.itemWidth, i.visible = Math.floor((i.w + i.itemM) / (i.itemW + i.itemM)), i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible, i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1), i.last = i.pagingCount - 1, i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + a * (i.count - 1) : (i.itemW + a) * i.count - i.w - a) : (i.itemW = i.w, i.itemM = a, i.pagingCount = i.count, i.last = i.count - 1), i.computedW = i.itemW - i.boxPadding, i.computedM = i.itemM
        }, i.update = function(e, t) {
            i.doMath(), p || (e < i.currentSlide ? i.currentSlide += 1 : e <= i.currentSlide && 0 !== e && (i.currentSlide -= 1), i.animatingTo = i.currentSlide), i.vars.controlNav && !i.manualControls && ("add" === t && !p || i.pagingCount > i.controlNav.length ? g.controlNav.update("add") : ("remove" === t && !p || i.pagingCount < i.controlNav.length) && (p && i.currentSlide > i.last && (i.currentSlide -= 1, i.animatingTo -= 1), g.controlNav.update("remove", i.last))), i.vars.directionNav && g.directionNav.update()
        }, i.addSlide = function(t, a) {
            var n = e(t);
            i.count += 1, i.last = i.count - 1, u && v ? void 0 !== a ? i.slides.eq(i.count - a).after(n) : i.container.prepend(n) : void 0 !== a ? i.slides.eq(a).before(n) : i.container.append(n), i.update(a, "add"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.added(i)
        }, i.removeSlide = function(t) {
            var a = isNaN(t) ? i.slides.index(e(t)) : t;
            i.count -= 1, i.last = i.count - 1, isNaN(t) ? e(t, i.slides).remove() : u && v ? i.slides.eq(i.last).remove() : i.slides.eq(t).remove(), i.doMath(), i.update(a, "remove"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.removed(i)
        }, i.editItemWidth = function(e) {
            i.vars.itemWidth = e, g.resize()
        }, g.init()
    }, e(window).blur(function(e) {
        t = !1
    }).focus(function(e) {
        t = !0
    }), e.goodlayers_flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, e.fn.goodlayers_flexslider = function(t) {
        if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function() {
            var a = e(this),
                n = t.selector ? t.selector : ".slides > li",
                i = a.find(n);
            1 === i.length && !0 === t.allowOneSlide || 0 === i.length ? (i.fadeIn(400), t.start && t.start(a)) : void 0 === a.data("goodlayers_flexslider") && new e.goodlayers_flexslider(this, t)
        });
        var a = e(this).data("goodlayers_flexslider");
        switch (t) {
            case "play":
                a.play();
                break;
            case "pause":
                a.pause();
                break;
            case "stop":
                a.stop();
                break;
            case "next":
                a.flexAnimate(a.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                a.flexAnimate(a.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && a.flexAnimate(t, !0)
        }
    }
}(jQuery);
! function($, window, undefined) {
    function getPixel(e, t) {
        return parseInt(e.css(t), 10) || 0
    }

    function within(e, t, i) {
        return e < t ? t : e > i ? i : e
    }

    function getViewport() {
        var e = window,
            t = "inner";
        return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
            width: e[t + "Width"],
            height: e[t + "Height"]
        }
    }

    function removeHash() {
        var e = getScrollXY();
        window.location.hash = "", window.scrollTo(e.x, e.y)
    }

    function doAjax(e, t) {
        var e = "//ilightbox.net/getSource/jsonp.php?url=" + encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        $.ajax({
            url: e,
            dataType: "jsonp"
        }), iLCallback = function(e) {
            t.call(this, e)
        }
    }

    function findImageInElement(e) {
        var t = $("*", e),
            i = new Array;
        return t.each(function() {
            var e = "",
                t = this;
            if ("none" != $(t).css("background-image") ? e = $(t).css("background-image") : void 0 !== $(t).attr("src") && "img" == t.nodeName.toLowerCase() && (e = $(t).attr("src")), -1 == e.indexOf("gradient"))
                for (var o = (e = (e = (e = (e = e.replace(/url\(\"/g, "")).replace(/url\(/g, "")).replace(/\"\)/g, "")).replace(/\)/g, "")).split(","), n = 0; n < o.length; n++)
                    if (o[n].length > 0 && -1 == $.inArray(o[n], i)) {
                        var a = "";
                        browser.msie && browser.version < 9 && (a = "?" + floor(3e3 * random())), i.push(o[n] + a)
                    }
        }), i
    }

    function getExtension(e) {
        var t = e.split(".").pop().toLowerCase(),
            i = -1 !== t.indexOf("?") ? t.split("?").pop() : "";
        return t.replace(i, "")
    }

    function getTypeByExtension(e) {
        var t = getExtension(e);
        return -1 !== extensions.image.indexOf(t) ? "image" : -1 !== extensions.flash.indexOf(t) ? "flash" : -1 !== extensions.video.indexOf(t) ? "video" : "iframe"
    }

    function percentToValue(e, t) {
        return parseInt(t / 100 * e)
    }

    function parseURI(e) {
        var t = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return t ? {
            href: t[0] || "",
            protocol: t[1] || "",
            authority: t[2] || "",
            host: t[3] || "",
            hostname: t[4] || "",
            port: t[5] || "",
            pathname: t[6] || "",
            search: t[7] || "",
            hash: t[8] || ""
        } : null
    }

    function absolutizeURI(e, t) {
        return t = parseURI(t || ""), e = parseURI(e || ""), t && e ? (t.protocol || e.protocol) + (t.protocol || t.authority ? t.authority : e.authority) + function(e) {
            var t = [];
            return e.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(e) {
                "/.." === e ? t.pop() : t.push(e)
            }), t.join("").replace(/^\//, "/" === e.charAt(0) ? "/" : "")
        }(t.protocol || t.authority || "/" === t.pathname.charAt(0) ? t.pathname : t.pathname ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1) + t.pathname : e.pathname) + (t.protocol || t.authority || t.pathname ? t.search : t.search || e.search) + t.hash : null
    }

    function version_compare(e, t, i) {
        this.php_js = this.php_js || {}, this.php_js.ENV = this.php_js.ENV || {};
        var o = 0,
            n = 0,
            a = 0,
            r = {
                dev: -6,
                alpha: -5,
                a: -5,
                beta: -4,
                b: -4,
                RC: -3,
                rc: -3,
                "#": -2,
                p: 1,
                pl: 1
            },
            s = function(e) {
                return e = ("" + e).replace(/[_\-+]/g, "."), e = e.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), e.length ? e.split(".") : [-8]
            },
            l = function(e) {
                return e ? isNaN(e) ? r[e] || -7 : parseInt(e, 10) : 0
            };
        for (e = s(e), t = s(t), n = max(e.length, t.length), o = 0; o < n; o++)
            if (e[o] != t[o]) {
                if (e[o] = l(e[o]), t[o] = l(t[o]), e[o] < t[o]) {
                    a = -1;
                    break
                }
                if (e[o] > t[o]) {
                    a = 1;
                    break
                }
            }
        if (!i) return a;
        switch (i) {
            case ">":
            case "gt":
                return a > 0;
            case ">=":
            case "ge":
                return a >= 0;
            case "<=":
            case "le":
                return a <= 0;
            case "==":
            case "=":
            case "eq":
                return 0 === a;
            case "<>":
            case "!=":
            case "ne":
                return 0 !== a;
            case "":
            case "<":
            case "lt":
                return a < 0;
            default:
                return null
        }
    }

    function getScrollXY() {
        var e = 0,
            t = 0;
        return "number" == typeof window.pageYOffset ? (t = window.pageYOffset, e = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (t = document.body.scrollTop, e = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (t = document.documentElement.scrollTop, e = document.documentElement.scrollLeft), {
            x: e,
            y: t
        }
    }

    function AC_QuickTimeVersion() {
        return gQTGeneratorVersion
    }

    function _QTComplain(e, t) {
        t = t.replace("%%", e), alert(t)
    }

    function _QTAddAttribute(e, t, i) {
        var o;
        return null == (o = gTagAttrs[e + t]) && (o = gTagAttrs[t]), null != o ? (0 == t.indexOf(e) && null == i && (i = t.substring(e.length)), null == i && (i = t), i + '="' + o + '" ') : ""
    }

    function _QTAddObjectAttr(e, t) {
        return 0 == e.indexOf("emb#") ? "" : (0 == e.indexOf("obj#") && null == t && (t = e.substring(4)), _QTAddAttribute("obj#", e, t))
    }

    function _QTAddEmbedAttr(e, t) {
        return 0 == e.indexOf("obj#") ? "" : (0 == e.indexOf("emb#") && null == t && (t = e.substring(4)), _QTAddAttribute("emb#", e, t))
    }

    function _QTAddObjectParam(e, t) {
        var i, o = "",
            n = t ? " />" : ">";
        return -1 == e.indexOf("emb#") && (null == (i = gTagAttrs["obj#" + e]) && (i = gTagAttrs[e]), 0 == e.indexOf("obj#") && (e = e.substring(4)), null != i && (o = '  <param name="' + e + '" value="' + i + '"' + n + "\n")), o
    }

    function _QTDeleteTagAttrs() {
        for (var e = 0; e < arguments.length; e++) {
            var t = arguments[e];
            delete gTagAttrs[t], delete gTagAttrs["emb#" + t], delete gTagAttrs["obj#" + t]
        }
    }

    function _QTGenerate(e, t, i) {
        if (4 > i.length || 0 != i.length % 2) return _QTComplain(e, gArgCountErr), "";
        (gTagAttrs = []).src = i[0], gTagAttrs.width = i[1], gTagAttrs.height = i[2], gTagAttrs.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", gTagAttrs.pluginspage = "http://www.apple.com/quicktime/download/", null != (e = i[3]) && "" != e || (e = "6,0,2,0"), gTagAttrs.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=" + e;
        for (var o, n = 4; n < i.length; n += 2) o = i[n].toLowerCase(), e = i[n + 1], "name" == o || "id" == o ? gTagAttrs.name = e : gTagAttrs[o] = e;
        i = "<object " + _QTAddObjectAttr("classid") + _QTAddObjectAttr("width") + _QTAddObjectAttr("height") + _QTAddObjectAttr("codebase") + _QTAddObjectAttr("name", "id") + _QTAddObjectAttr("tabindex") + _QTAddObjectAttr("hspace") + _QTAddObjectAttr("vspace") + _QTAddObjectAttr("border") + _QTAddObjectAttr("align") + _QTAddObjectAttr("class") + _QTAddObjectAttr("title") + _QTAddObjectAttr("accesskey") + _QTAddObjectAttr("noexternaldata") + ">\n" + _QTAddObjectParam("src", t), n = "  <embed " + _QTAddEmbedAttr("src") + _QTAddEmbedAttr("width") + _QTAddEmbedAttr("height") + _QTAddEmbedAttr("pluginspage") + _QTAddEmbedAttr("name") + _QTAddEmbedAttr("align") + _QTAddEmbedAttr("tabindex"), _QTDeleteTagAttrs("src", "width", "height", "pluginspage", "classid", "codebase", "name", "tabindex", "hspace", "vspace", "border", "align", "noexternaldata", "class", "title", "accesskey");
        for (o in gTagAttrs) null != (e = gTagAttrs[o]) && (n += _QTAddEmbedAttr(o), i += _QTAddObjectParam(o, t));
        return i + n + "> </embed>\n</object>"
    }

    function QT_GenerateOBJECTText() {
        return _QTGenerate("QT_GenerateOBJECTText", !1, arguments)
    }
    var extensions = {
            flash: ["swf"],
            image: ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe"],
            iframe: ["asp", "aspx", "cgi", "cfm", "htm", "html", "jsp", "php", "pl", "php3", "php4", "php5", "phtml", "rb", "rhtml", "shtml", "txt"],
            video: ["avi", "mov", "mpg", "mpeg", "movie", "mp4", "webm", "ogv", "ogg", "3gp", "m4v"]
        },
        $win = $(window),
        $doc = $(document),
        browser, transform, gpuAcceleration, fullScreenApi = "",
        userAgent = navigator.userAgent || navigator.vendor || window.opera,
        supportTouch = !!("ontouchstart" in window) && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
        isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4)),
        clickEvent = supportTouch ? "itap.iLightBox" : "click.iLightBox",
        touchStartEvent = supportTouch ? "touchstart.iLightBox" : "mousedown.iLightBox",
        touchStopEvent = supportTouch ? "touchend.iLightBox" : "mouseup.iLightBox",
        touchMoveEvent = supportTouch ? "touchmove.iLightBox" : "mousemove.iLightBox",
        abs = Math.abs,
        sqrt = Math.sqrt,
        round = Math.round,
        max = Math.max,
        min = Math.min,
        floor = Math.floor,
        random = Math.random,
        pluginspages = {
            quicktime: "http://www.apple.com/quicktime/download",
            flash: "http://www.adobe.com/go/getflash"
        },
        iLightBox = function(e, t, i, o) {
            var n = this;
            if (n.options = t, n.selector = e.selector || e, n.context = e.context, n.instant = o, i.length < 1 ? n.attachItems() : n.items = i, n.vars = {
                    total: n.items.length,
                    start: 0,
                    current: null,
                    next: null,
                    prev: null,
                    BODY: $("body"),
                    loadRequests: 0,
                    overlay: $('<div class="ilightbox-overlay"></div>'),
                    loader: $('<div class="ilightbox-loader"><div></div></div>'),
                    toolbar: $('<div class="ilightbox-toolbar"></div>'),
                    innerToolbar: $('<div class="ilightbox-inner-toolbar"></div>'),
                    title: $('<div class="ilightbox-title"></div>'),
                    closeButton: $('<a class="ilightbox-close" title="' + n.options.text.close + '"></a>'),
                    fullScreenButton: $('<a class="ilightbox-fullscreen" title="' + n.options.text.enterFullscreen + '"></a>'),
                    innerPlayButton: $('<a class="ilightbox-play" title="' + n.options.text.slideShow + '"></a>'),
                    innerNextButton: $('<a class="ilightbox-next-button" title="' + n.options.text.next + '"></a>'),
                    innerPrevButton: $('<a class="ilightbox-prev-button" title="' + n.options.text.previous + '"></a>'),
                    holder: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + '" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-next" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    prevPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-prev" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextButton: $('<a class="ilightbox-button ilightbox-next-button" ondragstart="return false;" title="' + n.options.text.next + '"><span></span></a>'),
                    prevButton: $('<a class="ilightbox-button ilightbox-prev-button" ondragstart="return false;" title="' + n.options.text.previous + '"><span></span></a>'),
                    thumbnails: $('<div class="ilightbox-thumbnails" ondragstart="return false;"><div class="ilightbox-thumbnails-container"><a class="ilightbox-thumbnails-dragger"></a><div class="ilightbox-thumbnails-grid"></div></div></div>'),
                    thumbs: !1,
                    nextLock: !1,
                    prevLock: !1,
                    hashLock: !1,
                    isMobile: !1,
                    mobileMaxWidth: 980,
                    isInFullScreen: !1,
                    isSwipe: !1,
                    mouseID: 0,
                    cycleID: 0,
                    isPaused: 0
                }, n.vars.hideableElements = n.vars.nextButton.add(n.vars.prevButton), n.normalizeItems(), n.availPlugins(), n.options.startFrom = n.options.startFrom > 0 && n.options.startFrom >= n.vars.total ? n.vars.total - 1 : n.options.startFrom, n.options.startFrom = n.options.randomStart ? floor(random() * n.vars.total) : n.options.startFrom, n.vars.start = n.options.startFrom, o ? n.instantCall() : n.patchItemsEvents(), n.options.linkId && (n.hashChangeHandler(), $win.iLightBoxHashChange(function() {
                    n.hashChangeHandler()
                })), supportTouch) {
                var a = /(click|mouseenter|mouseleave|mouseover|mouseout)/gi;
                n.options.caption.show = n.options.caption.show.replace(a, "itap"), n.options.caption.hide = n.options.caption.hide.replace(a, "itap"), n.options.social.show = n.options.social.show.replace(a, "itap"), n.options.social.hide = n.options.social.hide.replace(a, "itap")
            }
            n.options.controls.arrows && $.extend(n.options.styles, {
                nextOffsetX: 0,
                prevOffsetX: 0,
                nextOpacity: 0,
                prevOpacity: 0
            })
        };
    iLightBox.prototype = {
            showLoader: function() {
                var e = this;
                e.vars.loadRequests += 1, "horizontal" == e.options.path.toLowerCase() ? e.vars.loader.addClass("ilightbox-show").stop().animate({
                    top: "-30px"
                }, e.options.show.speed, "easeOutCirc") : e.vars.loader.addClass("ilightbox-show").stop().animate({
                    left: "-30px"
                }, e.options.show.speed, "easeOutCirc")
            },
            hideLoader: function() {
                var e = this;
                e.vars.loadRequests -= 1, e.vars.loadRequests = e.vars.loadRequests < 0 ? 0 : e.vars.loadRequests, "horizontal" == e.options.path.toLowerCase() ? e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({
                    top: "-192px"
                }, e.options.show.speed, "easeInCirc") : e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({
                    left: "-192px"
                }, e.options.show.speed, "easeInCirc")
            },
            createUI: function() {
                var e = this;
                e.ui = {
                    currentElement: e.vars.holder,
                    nextElement: e.vars.nextPhoto,
                    prevElement: e.vars.prevPhoto,
                    currentItem: e.vars.current,
                    nextItem: e.vars.next,
                    prevItem: e.vars.prev,
                    hide: function() {
                        e.closeAction()
                    },
                    refresh: function() {
                        arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto()
                    },
                    fullscreen: function() {
                        e.fullScreenAction()
                    }
                }
            },
            attachItems: function() {
                var iL = this,
                    itemsObject = new Array,
                    items = new Array;
                $(iL.selector, iL.context).each(function() {
                    var t = $(this),
                        URL = t.attr(iL.options.attr) || null,
                        options = t.data("options") && eval("({" + t.data("options") + "})") || {},
                        caption = t.data("caption"),
                        title = t.data("title"),
                        type = t.data("type") || getTypeByExtension(URL);
                    items.push({
                        URL: URL,
                        caption: caption,
                        title: title,
                        type: type,
                        options: options
                    }), iL.instant || itemsObject.push(t)
                }), iL.items = items, iL.itemsObject = itemsObject
            },
            normalizeItems: function() {
                var e = this,
                    t = new Array;
                $.each(e.items, function(i, o) {
                    "string" == typeof o && (o = {
                        url: o
                    });
                    var n = o.url || o.URL || null,
                        a = o.options || {},
                        r = o.caption || null,
                        s = o.title || null,
                        l = o.type ? o.type.toLowerCase() : getTypeByExtension(n),
                        c = "object" != typeof n ? getExtension(n) : "";
                    a.thumbnail = a.thumbnail || ("image" == l ? n : null), a.videoType = a.videoType || null, a.skin = a.skin || e.options.skin, a.width = a.width || null, a.height = a.height || null, a.mousewheel = void 0 === a.mousewheel || a.mousewheel, a.swipe = void 0 === a.swipe || a.swipe, a.social = void 0 !== a.social ? a.social : e.options.social.buttons && $.extend({}, {}, e.options.social.buttons), "video" == l && (a.html5video = void 0 !== a.html5video ? a.html5video : {}, a.html5video.webm = a.html5video.webm || a.html5video.WEBM || null, a.html5video.controls = void 0 !== a.html5video.controls ? a.html5video.controls : "controls", a.html5video.preload = a.html5video.preload || "metadata", a.html5video.autoplay = void 0 !== a.html5video.autoplay && a.html5video.autoplay), a.width && a.height || ("video" == l ? (a.width = 1280, a.height = 720) : "iframe" == l ? (a.width = "100%", a.height = "90%") : "flash" == l && (a.width = 1280, a.height = 720)), delete o.url, o.index = i, o.URL = n, o.caption = r, o.title = s, o.type = l, o.options = a, o.ext = c, t.push(o)
                }), e.items = t
            },
            instantCall: function() {
                var e = this,
                    t = e.vars.start;
                e.vars.current = t, e.vars.next = e.items[t + 1] ? t + 1 : null, e.vars.prev = e.items[t - 1] ? t - 1 : null, e.addContents(), e.patchEvents()
            },
            addContents: function() {
                var e = this,
                    t = e.vars,
                    i = e.options,
                    o = getViewport(),
                    n = i.path.toLowerCase(),
                    a = t.total > 0 && e.items.filter(function(e, t, o) {
                        return -1 === ["image", "flash", "video"].indexOf(e.type) && void 0 === e.recognized && (i.smartRecognition || e.options.smartRecognition)
                    }),
                    r = a.length > 0;
                i.mobileOptimizer && !i.innerToolbar && (t.isMobile = o.width <= t.mobileMaxWidth), t.overlay.addClass(i.skin).hide().css("opacity", i.overlay.opacity), i.linkId && t.overlay[0].setAttribute("linkid", i.linkId), i.controls.toolbar && (t.toolbar.addClass(i.skin).append(t.closeButton), i.controls.fullscreen && t.toolbar.append(t.fullScreenButton), i.controls.slideshow && t.toolbar.append(t.innerPlayButton), t.total > 1 && t.toolbar.append(t.innerPrevButton).append(t.innerNextButton)), t.BODY.addClass("ilightbox-noscroll").append(t.overlay).append(t.loader).append(t.holder).append(t.nextPhoto).append(t.prevPhoto), i.innerToolbar || t.BODY.append(t.toolbar), i.controls.arrows && t.BODY.append(t.nextButton).append(t.prevButton), i.controls.thumbnail && t.total > 1 && (t.BODY.append(t.thumbnails), t.thumbnails.addClass(i.skin).addClass("ilightbox-" + n), $("div.ilightbox-thumbnails-grid", t.thumbnails).empty(), t.thumbs = !0);
                var s = "horizontal" == i.path.toLowerCase() ? {
                    left: parseInt(o.width / 2 - t.loader.outerWidth() / 2)
                } : {
                    top: parseInt(o.height / 2 - t.loader.outerHeight() / 2)
                };
                t.loader.addClass(i.skin).css(s), t.nextButton.add(t.prevButton).addClass(i.skin), "horizontal" == n && t.loader.add(t.nextButton).add(t.prevButton).addClass("horizontal"), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), i.infinite || (t.prevButton.add(t.prevButton).add(t.innerPrevButton).add(t.innerNextButton).removeClass("disabled"), 0 == t.current && t.prevButton.add(t.innerPrevButton).addClass("disabled"), t.current >= t.total - 1 && t.nextButton.add(t.innerNextButton).addClass("disabled")), i.show.effect ? (t.overlay.stop().fadeIn(i.show.speed), t.toolbar.stop().fadeIn(i.show.speed)) : (t.overlay.show(), t.toolbar.show());
                var l = a.length;
                r ? (e.showLoader(), $.each(a, function(o, n) {
                    e.ogpRecognition(this, function(o) {
                        console.log(o);
                        var n = -1,
                            a = (e.items.filter(function(e, t, i) {
                                return e.URL == o.url && (n = t), e.URL == o.url
                            }), e.items[n]);
                        o && $.extend(!0, a, {
                            URL: o.source,
                            type: o.type,
                            recognized: !0,
                            options: {
                                html5video: o.html5video,
                                width: "image" == o.type ? 0 : o.width || a.width,
                                height: "image" == o.type ? 0 : o.height || a.height,
                                thumbnail: a.options.thumbnail || o.thumbnail
                            }
                        }), 0 == --l && (e.hideLoader(), t.dontGenerateThumbs = !1, e.generateThumbnails(), i.show.effect ? setTimeout(function() {
                            e.generateBoxes()
                        }, i.show.speed) : e.generateBoxes())
                    })
                })) : i.show.effect ? setTimeout(function() {
                    e.generateBoxes()
                }, i.show.speed) : e.generateBoxes(), e.createUI(), window.iLightBox = {
                    close: function() {
                        e.closeAction()
                    },
                    fullscreen: function() {
                        e.fullScreenAction()
                    },
                    moveNext: function() {
                        e.moveTo("next")
                    },
                    movePrev: function() {
                        e.moveTo("prev")
                    },
                    goTo: function(t) {
                        e.goTo(t)
                    },
                    refresh: function() {
                        e.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto()
                    },
                    setOption: function(t) {
                        e.setOption(t)
                    },
                    destroy: function() {
                        e.closeAction(), e.dispatchItemsEvents()
                    }
                }, i.linkId && (t.hashLock = !0, window.location.hash = i.linkId + "/" + t.current, setTimeout(function() {
                    t.hashLock = !1
                }, 55)), i.slideshow.startPaused || (e.resume(), t.innerPlayButton.removeClass("ilightbox-play").addClass("ilightbox-pause")), "function" == typeof e.options.callback.onOpen && e.options.callback.onOpen.call(e)
            },
            loadContent: function(e, t, i) {
                var o, n, a = this;
                switch (a.createUI(), e.speed = i || a.options.effects.loadedFadeSpeed, "current" == t && (e.options.mousewheel ? a.vars.lockWheel = !1 : a.vars.lockWheel = !0, e.options.swipe ? a.vars.lockSwipe = !1 : a.vars.lockSwipe = !0), t) {
                    case "current":
                        o = a.vars.holder, n = a.vars.current;
                        break;
                    case "next":
                        o = a.vars.nextPhoto, n = a.vars.next;
                        break;
                    case "prev":
                        o = a.vars.prevPhoto, n = a.vars.prev
                }
                if (o.removeAttr("style class").addClass("ilightbox-holder" + (supportTouch ? " supportTouch" : "")).addClass(e.options.skin), $("div.ilightbox-inner-toolbar", o).remove(), e.title || a.options.innerToolbar) {
                    var r = a.vars.innerToolbar.clone();
                    if (e.title && a.options.show.title) {
                        var s = a.vars.title.clone();
                        s.empty().html(e.title), r.append(s)
                    }
                    a.options.innerToolbar && r.append(a.vars.total > 1 ? a.vars.toolbar.clone() : a.vars.toolbar), o.prepend(r)
                }
                console.warn("loadContent", arguments), a.loadSwitcher(e, o, n, t)
            },
            loadSwitcher: function(e, t, i, o) {
                var n = this,
                    a = n.options,
                    r = {
                        element: t,
                        position: i
                    };
                switch (e.type) {
                    case "image":
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, i), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(e.URL, function(s) {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r);
                            var l = s ? s.width : 400,
                                c = s ? s.height : 200;
                            t.data({
                                naturalWidth: l,
                                naturalHeight: c
                            }), $("div.ilightbox-container", t).empty().append(s ? '<img src="' + e.URL + '" class="ilightbox-image" />' : '<span class="ilightbox-alert">' + a.errors.loadImage + "</span>"), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, o, t)
                        });
                        break;
                    case "video":
                        t.data({
                            naturalWidth: e.options.width,
                            naturalHeight: e.options.height
                        }), "current" === o ? (n.addContent(t, e), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r)) : $("div.ilightbox-container", t).empty(), n.configureHolder(e, o, t);
                        break;
                    case "iframe":
                        if (t.data({
                                naturalWidth: e.options.width,
                                naturalHeight: e.options.height
                            }), n.configureHolder(e, o, t), "current" === o) {
                            s = n.addContent(t, e);
                            "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, i), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), s.bind("load", function() {
                                "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), s.unbind("load")
                            })
                        } else $("div.ilightbox-container", t).empty();
                        break;
                    case "inline":
                        var s = $(e.URL),
                            l = n.addContent(t, e),
                            c = findImageInElement(t);
                        t.data({
                            naturalWidth: n.items[i].options.width || s.outerWidth(),
                            naturalHeight: n.items[i].options.height || s.outerHeight()
                        }), l.children().eq(0).show(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, i), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(c, function() {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, o, t)
                        });
                        break;
                    case "flash":
                        s = n.addContent(t, e);
                        t.data({
                            naturalWidth: n.items[i].options.width || s.outerWidth(),
                            naturalHeight: n.items[i].options.height || s.outerHeight()
                        }), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, o, t);
                        break;
                    case "ajax":
                        var u = e.options.ajax || {};
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, i), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.showLoader(), $.ajax({
                            url: e.URL || a.ajaxSetup.url,
                            data: u.data || null,
                            dataType: u.dataType || "html",
                            type: u.type || a.ajaxSetup.type,
                            cache: u.cache || a.ajaxSetup.cache,
                            crossDomain: u.crossDomain || a.ajaxSetup.crossDomain,
                            global: u.global || a.ajaxSetup.global,
                            ifModified: u.ifModified || a.ajaxSetup.ifModified,
                            username: u.username || a.ajaxSetup.username,
                            password: u.password || a.ajaxSetup.password,
                            beforeSend: u.beforeSend || a.ajaxSetup.beforeSend,
                            complete: u.complete || a.ajaxSetup.complete,
                            success: function(s, l, c) {
                                n.hideLoader();
                                var h = $(s),
                                    d = $("div.ilightbox-container", t),
                                    p = n.items[i].options.width || parseInt(h[0].getAttribute("width")),
                                    f = n.items[i].options.height || parseInt(h[0].getAttribute("height")),
                                    g = h[0].getAttribute("width") && h[0].getAttribute("height") ? {
                                        overflow: "hidden"
                                    } : {};
                                d.empty().append($('<div class="ilightbox-wrapper"></div>').css(g).html(h)), t.show().data({
                                    naturalWidth: p || d.outerWidth(),
                                    naturalHeight: f || d.outerHeight()
                                }).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                                var m = findImageInElement(t);
                                n.loadImage(m, function() {
                                    "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, o, t)
                                }), a.ajaxSetup.success(s, l, c), "function" == typeof u.success && u.success(s, l, c)
                            },
                            error: function(s, l, c) {
                                "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.hideLoader(), $("div.ilightbox-container", t).empty().append('<span class="ilightbox-alert">' + a.errors.loadContents + "</span>"), n.configureHolder(e, o, t), a.ajaxSetup.error(s, l, c), "function" == typeof u.error && u.error(s, l, c)
                            }
                        });
                        break;
                    case "html":
                        var h = e.URL;
                        if (container = $("div.ilightbox-container", t), h[0].nodeName) s = h.clone();
                        else {
                            var d = $(h);
                            s = d.selector ? $("<div>" + d + "</div>") : d
                        }
                        var p = n.items[i].options.width || parseInt(s.attr("width")),
                            f = n.items[i].options.height || parseInt(s.attr("height"));
                        n.addContent(t, e), s.appendTo(document.documentElement).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, i), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                        c = findImageInElement(t);
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, i), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(c, function() {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, i), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), t.show().data({
                                naturalWidth: p || container.outerWidth(),
                                naturalHeight: f || container.outerHeight()
                            }).hide(), s.remove(), n.configureHolder(e, o, t)
                        })
                }
            },
            configureHolder: function(e, t, i) {
                var o = this,
                    n = o.vars,
                    a = o.options;
                if ("current" != t && ("next" == t ? i.addClass("ilightbox-next") : i.addClass("ilightbox-prev")), "current" == t) s = n.current;
                else if ("next" == t) var r = a.styles.nextOpacity,
                    s = n.next;
                else var r = a.styles.prevOpacity,
                    s = n.prev;
                var l = {
                    element: i,
                    position: s
                };
                o.items[s].options.width = o.items[s].options.width || 0, o.items[s].options.height = o.items[s].options.height || 0, "current" == t ? a.show.effect ? i.css(transform, gpuAcceleration).fadeIn(e.speed, function() {
                    if (i.css(transform, ""), e.caption) {
                        o.setCaption(e, i);
                        var t = $("div.ilightbox-caption", i),
                            n = parseInt(t.outerHeight() / i.outerHeight() * 100);
                        a.caption.start & n <= 50 && t.fadeIn(a.effects.fadeSpeed)
                    }
                    var r = e.options.social;
                    r && (o.setSocial(r, e.URL, i), a.social.start && $("div.ilightbox-social", i).fadeIn(a.effects.fadeSpeed)), o.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(o, o.ui, s), "function" == typeof e.options.onShow && e.options.onShow.call(o, l)
                }) : (i.show(), o.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(o, o.ui, s), "function" == typeof e.options.onShow && e.options.onShow.call(o, l)) : a.show.effect ? i.fadeTo(e.speed, r, function() {
                    "next" == t ? n.nextLock = !1 : n.prevLock = !1, o.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(o, o.ui, s), "function" == typeof e.options.onShow && e.options.onShow.call(o, l)
                }) : (i.css({
                    opacity: r
                }).show(), "next" == t ? n.nextLock = !1 : n.prevLock = !1, o.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(o, o.ui, s), "function" == typeof e.options.onShow && e.options.onShow.call(o, l)), setTimeout(function() {
                    o.repositionPhoto()
                }, 0)
            },
            generateBoxes: function() {
                var e = this,
                    t = e.vars,
                    i = e.options;
                i.infinite && t.total >= 3 ? (t.current == t.total - 1 && (t.next = 0), 0 == t.current && (t.prev = t.total - 1)) : i.infinite = !1, e.loadContent(e.items[t.current], "current", i.show.speed), e.items[t.next] && e.loadContent(e.items[t.next], "next", i.show.speed), e.items[t.prev] && e.loadContent(e.items[t.prev], "prev", i.show.speed)
            },
            generateThumbnails: function() {
                var e = this,
                    t = e.vars,
                    i = e.options,
                    o = null;
                if (t.thumbs && !e.vars.dontGenerateThumbs) {
                    var n = t.thumbnails,
                        a = $("div.ilightbox-thumbnails-container", n),
                        r = $("div.ilightbox-thumbnails-grid", a),
                        s = 0;
                    r.removeAttr("style").empty(), $.each(e.items, function(l, c) {
                        var u = t.current == l ? "ilightbox-active" : "",
                            h = t.current == l ? i.thumbnails.activeOpacity : i.thumbnails.normalOpacity,
                            d = c.options.thumbnail,
                            p = $('<div class="ilightbox-thumbnail"></div>'),
                            f = $('<div class="ilightbox-thumbnail-icon"></div>');
                        p.css({
                            opacity: 0
                        }).addClass(u), "video" != c.type && "flash" != c.type || void 0 !== c.options.icon ? c.options.icon && (f.addClass("ilightbox-thumbnail-" + c.options.icon), p.append(f)) : (f.addClass("ilightbox-thumbnail-video"), p.append(f)), d && e.loadImage(d, function(t) {
                            s++, t ? p.data({
                                naturalWidth: t.width,
                                naturalHeight: t.height
                            }).append('<img src="' + d + '" border="0" />') : p.data({
                                naturalWidth: i.thumbnails.maxWidth,
                                naturalHeight: i.thumbnails.maxHeight
                            }), clearTimeout(o), o = setTimeout(function() {
                                e.positionThumbnails(n, a, r)
                            }, 20), setTimeout(function() {
                                p.fadeTo(i.effects.loadedFadeSpeed, h)
                            }, 20 * s)
                        }), r.append(p)
                    }), e.vars.dontGenerateThumbs = !0
                }
            },
            positionThumbnails: function(e, t, i) {
                var o = this,
                    n = o.vars,
                    a = o.options,
                    r = getViewport(),
                    s = a.path.toLowerCase();
                e || (e = n.thumbnails), t || (t = $("div.ilightbox-thumbnails-container", e)), i || (i = $("div.ilightbox-thumbnails-grid", t));
                var l = $(".ilightbox-thumbnail", i),
                    c = "horizontal" == s ? r.width - a.styles.pageOffsetX : l.eq(0).outerWidth() - a.styles.pageOffsetX,
                    u = "horizontal" == s ? l.eq(0).outerHeight() - a.styles.pageOffsetY : r.height - a.styles.pageOffsetY,
                    h = "horizontal" == s ? 0 : c,
                    d = "horizontal" == s ? u : 0,
                    p = $(".ilightbox-active", i),
                    f = {};
                arguments.length < 3 && (l.css({
                    opacity: a.thumbnails.normalOpacity
                }), p.css({
                    opacity: a.thumbnails.activeOpacity
                })), l.each(function(e) {
                    var t = $(this),
                        i = t.data(),
                        n = "horizontal" == s ? 0 : a.thumbnails.maxWidth;
                    height = "horizontal" == s ? a.thumbnails.maxHeight : 0, dims = o.getNewDimenstions(n, height, i.naturalWidth, i.naturalHeight, !0), t.css({
                        width: dims.width,
                        height: dims.height
                    }), "horizontal" == s && t.css({
                        float: "left"
                    }), "horizontal" == s ? h += t.outerWidth() : d += t.outerHeight()
                }), f = {
                    width: h,
                    height: d
                }, i.css(f), f = {};
                var g = i.offset(),
                    m = p.length ? p.offset() : {
                        top: parseInt(u / 2),
                        left: parseInt(c / 2)
                    };
                g.top = g.top - $doc.scrollTop(), g.left = g.left - $doc.scrollLeft(), m.top = m.top - g.top - $doc.scrollTop(), m.left = m.left - g.left - $doc.scrollLeft(), "horizontal" == s ? (f.top = 0, f.left = parseInt(c / 2 - m.left - p.outerWidth() / 2)) : (f.top = parseInt(u / 2 - m.top - p.outerHeight() / 2), f.left = 0), arguments.length < 3 ? i.stop().animate(f, a.effects.repositionSpeed, "easeOutCirc") : i.css(f)
            },
            loadImage: function(e, t) {
                $.isArray(e) || (e = [e]);
                var i = this,
                    o = e.length;
                o > 0 ? (i.showLoader(), $.each(e, function(n, a) {
                    var r = new Image;
                    r.onload = function() {
                        0 == (o -= 1) && (i.hideLoader(), t(r))
                    }, r.onerror = r.onabort = function() {
                        0 == (o -= 1) && (i.hideLoader(), t(!1))
                    }, r.src = e[n]
                })) : t(!1)
            },
            patchItemsEvents: function() {
                var e = this,
                    t = e.vars,
                    i = supportTouch ? "itap.iL" : "click.iL",
                    o = supportTouch ? "click.iL" : "itap.iL";
                if (e.context && e.selector) {
                    var n = $(e.selector, e.context);
                    $(e.context).on(i, e.selector, function() {
                        var i = $(this),
                            o = n.index(i);
                        return t.current = o, t.next = e.items[o + 1] ? o + 1 : null, t.prev = e.items[o - 1] ? o - 1 : null, e.addContents(), e.patchEvents(), !1
                    }).on(o, e.selector, function() {
                        return !1
                    })
                } else $.each(e.itemsObject, function(n, a) {
                    a.on(i, function() {
                        return t.current = n, t.next = e.items[n + 1] ? n + 1 : null, t.prev = e.items[n - 1] ? n - 1 : null, e.addContents(), e.patchEvents(), !1
                    }).on(o, function() {
                        return !1
                    })
                })
            },
            dispatchItemsEvents: function() {
                var e = this;
                e.vars, e.options;
                e.context && e.selector ? $(e.context).off(".iL", e.selector) : $.each(e.itemsObject, function(e, t) {
                    t.off(".iL")
                })
            },
            refresh: function() {
                var e = this;
                e.dispatchItemsEvents(), e.attachItems(), e.normalizeItems(), e.patchItemsEvents()
            },
            patchEvents: function() {
                var e = this,
                    t = e.vars,
                    i = e.options,
                    o = i.path.toLowerCase(),
                    n = $(".ilightbox-holder"),
                    a = fullScreenApi.fullScreenEventName + ".iLightBox",
                    r = verticalDistanceThreshold = 100,
                    s = [t.nextButton[0], t.prevButton[0], t.nextButton[0].firstChild, t.prevButton[0].firstChild];
                $win.bind("resize.iLightBox", function() {
                    var o = getViewport();
                    i.mobileOptimizer && !i.innerToolbar && (t.isMobile = o.width <= t.mobileMaxWidth), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), e.repositionPhoto(null), supportTouch && (clearTimeout(t.setTime), t.setTime = setTimeout(function() {
                        var e = getScrollXY().y;
                        window.scrollTo(0, e - 30), window.scrollTo(0, e + 30), window.scrollTo(0, e)
                    }, 2e3)), t.thumbs && e.positionThumbnails()
                }).bind("keydown.iLightBox", function(o) {
                    if (i.controls.keyboard) switch (o.keyCode) {
                        case 13:
                            o.shiftKey && i.keyboard.shift_enter && e.fullScreenAction();
                            break;
                        case 27:
                            i.keyboard.esc && e.closeAction();
                            break;
                        case 37:
                            i.keyboard.left && !t.lockKey && e.moveTo("prev");
                            break;
                        case 38:
                            i.keyboard.up && !t.lockKey && e.moveTo("prev");
                            break;
                        case 39:
                            i.keyboard.right && !t.lockKey && e.moveTo("next");
                            break;
                        case 40:
                            i.keyboard.down && !t.lockKey && e.moveTo("next")
                    }
                }), fullScreenApi.supportsFullScreen && $win.bind(a, function() {
                    e.doFullscreen()
                });
                var l = [i.caption.show + ".iLightBox", i.caption.hide + ".iLightBox", i.social.show + ".iLightBox", i.social.hide + ".iLightBox"].filter(function(e, t, i) {
                        return i.lastIndexOf(e) === t
                    }),
                    c = "";
                $.each(l, function(e, t) {
                    0 != e && (c += " "), c += t
                }), $doc.on(clickEvent, ".ilightbox-overlay", function() {
                    i.overlay.blur && e.closeAction()
                }).on(clickEvent, ".ilightbox-next, .ilightbox-next-button", function() {
                    e.moveTo("next")
                }).on(clickEvent, ".ilightbox-prev, .ilightbox-prev-button", function() {
                    e.moveTo("prev")
                }).on(clickEvent, ".ilightbox-thumbnail", function() {
                    var i = $(this),
                        o = $(".ilightbox-thumbnail", t.thumbnails).index(i);
                    o != t.current && e.goTo(o)
                }).on(c, ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(e) {
                    var o = $("div.ilightbox-caption", t.holder),
                        n = $("div.ilightbox-social", t.holder),
                        a = i.effects.fadeSpeed;
                    t.nextLock || t.prevLock ? (e.type != i.caption.show || o.is(":visible") ? e.type == i.caption.hide && o.is(":visible") && o.fadeOut(a) : o.fadeIn(a), e.type != i.social.show || n.is(":visible") ? e.type == i.social.hide && n.is(":visible") && n.fadeOut(a) : n.fadeIn(a)) : (e.type != i.caption.show || o.is(":visible") ? e.type == i.caption.hide && o.is(":visible") && o.stop().fadeOut(a) : o.stop().fadeIn(a), e.type != i.social.show || n.is(":visible") ? e.type == i.social.hide && n.is(":visible") && n.stop().fadeOut(a) : n.stop().fadeIn(a))
                }).on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-wrapper", function(e) {
                    "mouseenter" == e.type ? t.lockWheel = !0 : t.lockWheel = !1
                }).on(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause", function() {
                    var t = $(this);
                    t.hasClass("ilightbox-fullscreen") ? e.fullScreenAction() : t.hasClass("ilightbox-play") ? (e.resume(), t.addClass("ilightbox-pause").removeClass("ilightbox-play")) : t.hasClass("ilightbox-pause") ? (e.pause(), t.addClass("ilightbox-play").removeClass("ilightbox-pause")) : e.closeAction()
                }).on(touchMoveEvent, ".ilightbox-overlay, .ilightbox-thumbnails-container", function(e) {
                    e.preventDefault()
                }), i.controls.arrows && !supportTouch && $doc.on("mousemove.iLightBox", function(e) {
                    t.isMobile || (t.mouseID || t.hideableElements.show(), t.mouseID = clearTimeout(t.mouseID), -1 === s.indexOf(e.target) && (t.mouseID = setTimeout(function() {
                        t.hideableElements.hide(), t.mouseID = clearTimeout(t.mouseID)
                    }, 3e3)))
                }), i.controls.slideshow && i.slideshow.pauseOnHover && $doc.on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(i) {
                    "mouseenter" == i.type && t.cycleID ? e.pause() : "mouseleave" == i.type && t.isPaused && e.resume()
                });
                var u = $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails");
                i.controls.mousewheel && u.on("mousewheel.iLightBox", function(i, o) {
                    t.lockWheel || (i.preventDefault(), o < 0 ? e.moveTo("next") : o > 0 && e.moveTo("prev"))
                }), i.controls.swipe && n.on(touchStartEvent, function(a) {
                    function s(e) {
                        var t = $(this),
                            i = g[e],
                            n = [m.coords[0] - u.coords[0], m.coords[1] - u.coords[1]];
                        t[0].style["horizontal" == o ? "left" : "top"] = ("horizontal" == o ? i.left - n[0] : i.top - n[1]) + "px"
                    }

                    function l(e) {
                        if (m) {
                            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                            u = {
                                time: (new Date).getTime(),
                                coords: [t.pageX - p, t.pageY - d]
                            }, n.each(s), e.preventDefault()
                        }
                    }

                    function c() {
                        n.each(function() {
                            var e = $(this),
                                t = e.data("offset") || {
                                    top: e.offset().top - d,
                                    left: e.offset().left - p
                                },
                                i = t.top,
                                o = t.left;
                            e.css(transform, gpuAcceleration).stop().animate({
                                top: i,
                                left: o
                            }, 500, "easeOutCirc", function() {
                                e.css(transform, "")
                            })
                        })
                    }
                    if (!(t.nextLock || t.prevLock || 1 == t.total || t.lockSwipe)) {
                        t.BODY.addClass("ilightbox-closedhand");
                        var u, h = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                            d = $doc.scrollTop(),
                            p = $doc.scrollLeft(),
                            f = [n.eq(0).offset(), n.eq(1).offset(), n.eq(2).offset()],
                            g = [{
                                top: f[0].top - d,
                                left: f[0].left - p
                            }, {
                                top: f[1].top - d,
                                left: f[1].left - p
                            }, {
                                top: f[2].top - d,
                                left: f[2].left - p
                            }],
                            m = {
                                time: (new Date).getTime(),
                                coords: [h.pageX - p, h.pageY - d]
                            };
                        n.bind(touchMoveEvent, l), $doc.one(touchStopEvent, function(a) {
                            n.unbind(touchMoveEvent, l), t.BODY.removeClass("ilightbox-closedhand"), m && u && ("horizontal" == o && u.time - m.time < 1e3 && abs(m.coords[0] - u.coords[0]) > r && abs(m.coords[1] - u.coords[1]) < verticalDistanceThreshold ? m.coords[0] > u.coords[0] ? t.current != t.total - 1 || i.infinite ? (t.isSwipe = !0, e.moveTo("next")) : c() : 0 != t.current || i.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : c() : "vertical" == o && u.time - m.time < 1e3 && abs(m.coords[1] - u.coords[1]) > r && abs(m.coords[0] - u.coords[0]) < verticalDistanceThreshold ? m.coords[1] > u.coords[1] ? t.current != t.total - 1 || i.infinite ? (t.isSwipe = !0, e.moveTo("next")) : c() : 0 != t.current || i.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : c() : c()), m = u = undefined
                        })
                    }
                })
            },
            goTo: function(e) {
                var t = this,
                    i = t.vars,
                    o = t.options,
                    n = e - i.current;
                if (o.infinite && (e == i.total - 1 && 0 == i.current && (n = -1), i.current == i.total - 1 && 0 == e && (n = 1)), 1 == n) t.moveTo("next");
                else if (-1 == n) t.moveTo("prev");
                else {
                    if (i.nextLock || i.prevLock) return !1;
                    "function" == typeof o.callback.onBeforeChange && o.callback.onBeforeChange.call(t, t.ui), o.linkId && (i.hashLock = !0, window.location.hash = o.linkId + "/" + e), t.items[e] && (t.items[e].options.mousewheel ? t.vars.lockWheel = !1 : i.lockWheel = !0, t.items[e].options.swipe ? i.lockSwipe = !1 : i.lockSwipe = !0), $.each([i.holder, i.nextPhoto, i.prevPhoto], function(e, t) {
                        t.css(transform, gpuAcceleration).fadeOut(o.effects.loadedFadeSpeed)
                    }), i.current = e, i.next = e + 1, i.prev = e - 1, t.createUI(), setTimeout(function() {
                        t.generateBoxes()
                    }, o.effects.loadedFadeSpeed + 50), $(".ilightbox-thumbnail", i.thumbnails).removeClass("ilightbox-active").eq(e).addClass("ilightbox-active"), t.positionThumbnails(), o.linkId && setTimeout(function() {
                        i.hashLock = !1
                    }, 55), o.infinite || (i.nextButton.add(i.prevButton).add(i.innerPrevButton).add(i.innerNextButton).removeClass("disabled"), 0 == i.current && i.prevButton.add(i.innerPrevButton).addClass("disabled"), i.current >= i.total - 1 && i.nextButton.add(i.innerNextButton).addClass("disabled")), t.resetCycle(), "function" == typeof o.callback.onAfterChange && o.callback.onAfterChange.call(t, t.ui)
                }
            },
            moveTo: function(e) {
                var t = this,
                    i = t.vars,
                    o = t.options,
                    n = o.path.toLowerCase(),
                    a = getViewport(),
                    r = o.effects.switchSpeed;
                if (i.nextLock || i.prevLock) return !1;
                var s = "next" == e ? i.next : i.prev;
                if (o.linkId && (i.hashLock = !0, window.location.hash = o.linkId + "/" + s), "next" == e) {
                    if (!t.items[s]) return !1;
                    var l = i.nextPhoto,
                        c = i.holder,
                        u = i.prevPhoto,
                        h = "ilightbox-prev",
                        d = "ilightbox-next"
                } else if ("prev" == e) {
                    if (!t.items[s]) return !1;
                    var l = i.prevPhoto,
                        c = i.holder,
                        u = i.nextPhoto,
                        h = "ilightbox-next",
                        d = "ilightbox-prev"
                }
                "function" == typeof o.callback.onBeforeChange && o.callback.onBeforeChange.call(t, t.ui), "next" == e ? i.nextLock = !0 : i.prevLock = !0;
                var p = $("div.ilightbox-caption", c),
                    f = $("div.ilightbox-social", c);
                if (p.length && p.stop().fadeOut(r, function() {
                        $(this).remove()
                    }), f.length && f.stop().fadeOut(r, function() {
                        $(this).remove()
                    }), t.items[s].caption) {
                    t.setCaption(t.items[s], l);
                    var g = $("div.ilightbox-caption", l),
                        m = parseInt(g.outerHeight() / l.outerHeight() * 100);
                    o.caption.start && m <= 50 && g.fadeIn(r)
                }
                var v = t.items[s].options.social;
                v && (t.setSocial(v, t.items[s].URL, l), o.social.start && $("div.ilightbox-social", l).fadeIn(o.effects.fadeSpeed)), $.each([l, c, u], function(e, t) {
                    t.removeClass("ilightbox-next ilightbox-prev")
                });
                var b = l.data("offset"),
                    x = a.width - o.styles.pageOffsetX,
                    w = a.height - o.styles.pageOffsetY,
                    y = b.newDims.width,
                    k = b.newDims.height,
                    S = b.thumbsOffset,
                    T = b.diff,
                    A = parseInt(w / 2 - k / 2 - T.H - S.H / 2),
                    L = parseInt(x / 2 - y / 2 - T.W - S.W / 2);
                l.css(transform, gpuAcceleration).animate({
                    top: A,
                    left: L,
                    opacity: 1
                }, r, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    l.css(transform, "")
                }), $("div.ilightbox-container", l).animate({
                    width: y,
                    height: k
                }, r, i.isSwipe ? "easeOutCirc" : "easeInOutCirc");
                var I = c.data("offset"),
                    C = I.object;
                T = I.diff, y = I.newDims.width, k = I.newDims.height, y = parseInt(y * o.styles["next" == e ? "prevScale" : "nextScale"]), k = parseInt(k * o.styles["next" == e ? "prevScale" : "nextScale"]), A = "horizontal" == n ? parseInt(w / 2 - C.offsetY - k / 2 - T.H - S.H / 2) : parseInt(w - C.offsetX - T.H - S.H / 2), "prev" == e ? L = "horizontal" == n ? parseInt(x - C.offsetX - T.W - S.W / 2) : parseInt(x / 2 - y / 2 - T.W - C.offsetY - S.W / 2) : (A = "horizontal" == n ? A : parseInt(C.offsetX - T.H - k - S.H / 2), L = "horizontal" == n ? parseInt(C.offsetX - T.W - y - S.W / 2) : parseInt(x / 2 - C.offsetY - y / 2 - T.W - S.W / 2)), $("div.ilightbox-container", c).animate({
                    width: y,
                    height: k
                }, r, i.isSwipe ? "easeOutCirc" : "easeInOutCirc"), c.addClass(h).css(transform, gpuAcceleration).animate({
                    top: A,
                    left: L,
                    opacity: o.styles.prevOpacity
                }, r, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    c.css(transform, ""), $(".ilightbox-thumbnail", i.thumbnails).removeClass("ilightbox-active").eq(s).addClass("ilightbox-active"), t.positionThumbnails(), t.items[s] && (t.items[s].options.mousewheel ? i.lockWheel = !1 : i.lockWheel = !0, t.items[s].options.swipe ? i.lockSwipe = !1 : i.lockSwipe = !0), i.isSwipe = !1, -1 !== ["iframe", "video"].indexOf(t.items[i.current].type) && $("div.ilightbox-container", c).empty(), "next" == e ? (i.nextPhoto = u, i.prevPhoto = c, i.holder = l, i.nextPhoto.hide(), i.next = i.next + 1, i.prev = i.current, i.current = i.current + 1, o.infinite && (i.current > i.total - 1 && (i.current = 0), i.current == i.total - 1 && (i.next = 0), 0 == i.current && (i.prev = i.total - 1)), t.createUI(), t.items[i.next] ? t.loadContent(t.items[i.next], "next") : i.nextLock = !1) : (i.prevPhoto = u, i.nextPhoto = c, i.holder = l, i.prevPhoto.hide(), i.next = i.current, i.current = i.prev, i.prev = i.current - 1, o.infinite && (i.current == i.total - 1 && (i.next = 0), 0 == i.current && (i.prev = i.total - 1)), t.createUI(), t.items[i.prev] ? t.loadContent(t.items[i.prev], "prev") : i.prevLock = !1), -1 !== ["iframe", "video"].indexOf(t.items[i.current].type) && t.loadContent(t.items[i.current], "current"), o.linkId && setTimeout(function() {
                        i.hashLock = !1
                    }, 55), o.infinite || (i.nextButton.add(i.prevButton).add(i.innerPrevButton).add(i.innerNextButton).removeClass("disabled"), 0 == i.current && i.prevButton.add(i.innerPrevButton).addClass("disabled"), i.current >= i.total - 1 && i.nextButton.add(i.innerNextButton).addClass("disabled")), t.repositionPhoto(), t.resetCycle(), "function" == typeof o.callback.onAfterChange && o.callback.onAfterChange.call(t, t.ui)
                }), A = "horizontal" == n ? getPixel(u, "top") : "next" == e ? parseInt(-w / 2 - u.outerHeight()) : parseInt(2 * A), L = "horizontal" == n ? "next" == e ? parseInt(-x / 2 - u.outerWidth()) : parseInt(2 * L) : getPixel(u, "left"), u.css(transform, gpuAcceleration).animate({
                    top: A,
                    left: L,
                    opacity: o.styles.nextOpacity
                }, r, i.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    u.css(transform, "")
                }).addClass(d)
            },
            setCaption: function(e, t) {
                var i = $('<div class="ilightbox-caption"></div>');
                e.caption && (i.html(e.caption), $("div.ilightbox-container", t).append(i))
            },
            normalizeSocial: function(e, t) {
                var i = this,
                    o = (i.vars, i.options),
                    n = window.location.href;
                return $.each(e, function(i, a) {
                    if (!a) return !0;
                    var r, s;
                    switch (i.toLowerCase()) {
                        case "facebook":
                            r = "http://www.facebook.com/share.php?v=4&src=bm&u={URL}", s = "Share on Facebook";
                            break;
                        case "twitter":
                            r = "http://twitter.com/home?status={URL}", s = "Share on Twitter";
                            break;
                        case "googleplus":
                            r = "https://plus.google.com/share?url={URL}", s = "Share on Google+";
                            break;
                        case "delicious":
                            r = "http://delicious.com/post?url={URL}", s = "Share on Delicious";
                            break;
                        case "digg":
                            r = "http://digg.com/submit?phase=2&url={URL}", s = "Share on Digg";
                            break;
                        case "reddit":
                            r = "http://reddit.com/submit?url={URL}", s = "Share on reddit"
                    }
                    e[i] = {
                        URL: a.URL && absolutizeURI(n, a.URL) || o.linkId && window.location.href || "string" != typeof t && n || t && absolutizeURI(n, t) || n,
                        source: a.source || r || a.URL && absolutizeURI(n, a.URL) || t && absolutizeURI(n, t),
                        text: a.text || s || "Share on " + i,
                        width: void 0 === a.width || isNaN(a.width) ? 640 : parseInt(a.width),
                        height: a.height || 360
                    }
                }), e
            },
            setSocial: function(e, t, i) {
                var o = this,
                    n = $('<div class="ilightbox-social"></div>'),
                    a = "<ul>";
                e = o.normalizeSocial(e, t), $.each(e, function(e, t) {
                    e.toLowerCase();
                    var i = t.source.replace(/\{URL\}/g, encodeURIComponent(t.URL).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+"));
                    a += '<li class="' + e + '"><a href="' + i + '" onclick="javascript:window.open(this.href' + (t.width <= 0 || t.height <= 0 ? "" : ", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=" + t.height + ",width=" + t.width + ",left=40,top=40'") + ');return false;" title="' + t.text + '" target="_blank"></a></li>'
                }), a += "</ul>", n.html(a), $("div.ilightbox-container", i).append(n)
            },
            fullScreenAction: function() {
                var e = this;
                e.vars;
                fullScreenApi.supportsFullScreen ? fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen(document.documentElement) : fullScreenApi.requestFullScreen(document.documentElement) : e.doFullscreen()
            },
            doFullscreen: function() {
                var e = this,
                    t = e.vars,
                    i = getViewport(),
                    o = e.options;
                if (o.fullAlone) {
                    var n = t.holder,
                        a = e.items[t.current],
                        r = i.width,
                        s = i.height,
                        l = [n, t.nextPhoto, t.prevPhoto, t.nextButton, t.prevButton, t.overlay, t.toolbar, t.thumbnails, t.loader],
                        c = [t.nextPhoto, t.prevPhoto, t.nextButton, t.prevButton, t.loader, t.thumbnails];
                    if (t.isInFullScreen) t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !1, t.overlay.css({
                        opacity: e.options.overlay.opacity
                    }), $.each(c, function(e, t) {
                        t.show()
                    }), t.fullScreenButton.attr("title", o.text.enterFullscreen), n.data({
                        naturalWidth: n.data("naturalWidthOld"),
                        naturalHeight: n.data("naturalHeightOld"),
                        naturalWidthOld: null,
                        naturalHeightOld: null
                    }), $.each(l, function(e, t) {
                        t.removeClass("ilightbox-fullscreen")
                    }), "function" == typeof o.callback.onExitFullScreen && o.callback.onExitFullScreen.call(e, e.ui);
                    else {
                        if (t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !0, t.overlay.css({
                                opacity: 1
                            }), $.each(c, function(e, t) {
                                t.hide()
                            }), t.fullScreenButton.attr("title", o.text.exitFullscreen), -1 != o.fullStretchTypes.indexOf(a.type)) n.data({
                            naturalWidthOld: n.data("naturalWidth"),
                            naturalHeightOld: n.data("naturalHeight"),
                            naturalWidth: r,
                            naturalHeight: s
                        });
                        else {
                            var i = a.options.fullViewPort || o.fullViewPort || "",
                                u = r,
                                h = s,
                                d = n.data("naturalWidth"),
                                p = n.data("naturalHeight");
                            if ("fill" == i.toLowerCase())(h = u / d * p) < s && (u = s / p * d, h = s);
                            else if ("fit" == i.toLowerCase()) u = (g = e.getNewDimenstions(u, h, d, p, !0)).width, h = g.height;
                            else if ("stretch" == i.toLowerCase()) u = u, h = h;
                            else {
                                var f = d > u || p > h,
                                    g = e.getNewDimenstions(u, h, d, p, f);
                                u = g.width, h = g.height
                            }
                            n.data({
                                naturalWidthOld: n.data("naturalWidth"),
                                naturalHeightOld: n.data("naturalHeight"),
                                naturalWidth: u,
                                naturalHeight: h
                            })
                        }
                        $.each(l, function(e, t) {
                            t.addClass("ilightbox-fullscreen")
                        }), "function" == typeof o.callback.onEnterFullScreen && o.callback.onEnterFullScreen.call(e, e.ui)
                    }
                } else t.isInFullScreen ? t.isInFullScreen = !1 : t.isInFullScreen = !0;
                e.repositionPhoto(!0)
            },
            closeAction: function() {
                var e = this,
                    t = e.vars,
                    i = e.options;
                $win.unbind(".iLightBox"), $doc.off(".iLightBox"), t.isInFullScreen && fullScreenApi.cancelFullScreen(document.documentElement), $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails").off(".iLightBox"), i.hide.effect ? t.overlay.stop().fadeOut(i.hide.speed, function() {
                    t.overlay.remove(), t.BODY.removeClass("ilightbox-noscroll").off(".iLightBox")
                }) : (t.overlay.remove(), t.BODY.removeClass("ilightbox-noscroll").off(".iLightBox"));
                var o = [t.toolbar, t.holder, t.nextPhoto, t.prevPhoto, t.nextButton, t.prevButton, t.loader, t.thumbnails];
                $.each(o, function(e, t) {
                    t.removeAttr("style").remove()
                }), t.dontGenerateThumbs = t.isInFullScreen = !1, window.iLightBox = null, i.linkId && (t.hashLock = !0, removeHash(), setTimeout(function() {
                    t.hashLock = !1
                }, 55)), "function" == typeof i.callback.onHide && i.callback.onHide.call(e, e.ui)
            },
            repositionPhoto: function() {
                var e = this,
                    t = e.vars,
                    i = e.options,
                    o = i.path.toLowerCase(),
                    n = getViewport(),
                    a = n.width,
                    r = n.height,
                    s = t.isInFullScreen && i.fullAlone || t.isMobile ? 0 : "horizontal" == o ? 0 : t.thumbnails.outerWidth(),
                    l = t.isMobile ? t.toolbar.outerHeight() : t.isInFullScreen && i.fullAlone ? 0 : "horizontal" == o ? t.thumbnails.outerHeight() : 0,
                    c = t.isInFullScreen && i.fullAlone ? a : a - i.styles.pageOffsetX,
                    u = t.isInFullScreen && i.fullAlone ? r : r - i.styles.pageOffsetY,
                    h = "horizontal" == o ? parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (i.styles.nextOffsetX + i.styles.prevOffsetX) : c / 10 <= 30 ? 30 : c / 10) : parseInt(c / 10 <= 30 ? 30 : c / 10) + s,
                    d = "horizontal" == o ? parseInt(u / 10 <= 30 ? 30 : u / 10) + l : parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (i.styles.nextOffsetX + i.styles.prevOffsetX) : u / 10 <= 30 ? 30 : u / 10),
                    p = {
                        type: "current",
                        width: c,
                        height: u,
                        item: e.items[t.current],
                        offsetW: h,
                        offsetH: d,
                        thumbsOffsetW: s,
                        thumbsOffsetH: l,
                        animate: arguments.length,
                        holder: t.holder
                    };
                e.repositionEl(p), e.items[t.next] && (p = $.extend(p, {
                    type: "next",
                    item: e.items[t.next],
                    offsetX: i.styles.nextOffsetX,
                    offsetY: i.styles.nextOffsetY,
                    holder: t.nextPhoto
                }), e.repositionEl(p)), e.items[t.prev] && (p = $.extend(p, {
                    type: "prev",
                    item: e.items[t.prev],
                    offsetX: i.styles.prevOffsetX,
                    offsetY: i.styles.prevOffsetY,
                    holder: t.prevPhoto
                }), e.repositionEl(p));
                var f = "horizontal" == o ? {
                    left: parseInt(c / 2 - t.loader.outerWidth() / 2)
                } : {
                    top: parseInt(u / 2 - t.loader.outerHeight() / 2)
                };
                t.loader.css(f)
            },
            repositionEl: function(e) {
                var t = this,
                    i = t.vars,
                    o = t.options,
                    n = o.path.toLowerCase(),
                    a = "current" == e.type && i.isInFullScreen && o.fullAlone ? e.width : e.width - e.offsetW,
                    r = "current" == e.type && i.isInFullScreen && o.fullAlone ? e.height : e.height - e.offsetH,
                    s = e.item,
                    l = e.item.options,
                    c = e.holder,
                    u = e.offsetX || 0,
                    h = e.offsetY || 0,
                    d = e.thumbsOffsetW,
                    p = e.thumbsOffsetH;
                "current" == e.type ? ("number" == typeof l.width && l.width && (a = i.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(s.type) || l.fullViewPort || o.fullViewPort) ? a : l.width > a ? a : l.width), "number" == typeof l.height && l.height && (r = i.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(s.type) || l.fullViewPort || o.fullViewPort) ? r : l.height > r ? r : l.height)) : ("number" == typeof l.width && l.width && (a = l.width > a ? a : l.width), "number" == typeof l.height && l.height && (r = l.height > r ? r : l.height)), o.innerToolbar && (r = parseInt(r - $(".ilightbox-inner-toolbar", c).outerHeight()));
                var f = "string" == typeof l.width && -1 != l.width.indexOf("%") ? percentToValue(parseInt(l.width.replace("%", "")), e.width) : c.data("naturalWidth"),
                    g = "string" == typeof l.height && -1 != l.height.indexOf("%") ? percentToValue(parseInt(l.height.replace("%", "")), e.height) : c.data("naturalHeight"),
                    m = "string" == typeof l.width && -1 != l.width.indexOf("%") || "string" == typeof l.height && -1 != l.height.indexOf("%") ? {
                        width: f,
                        height: g
                    } : t.getNewDimenstions(a, r, f, g),
                    v = $.extend({}, m, {});
                "prev" == e.type || "next" == e.type ? (f = parseInt(m.width * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale)), g = parseInt(m.height * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale))) : (f = m.width, g = m.height);
                var b = parseInt((getPixel(c, "padding-left") + getPixel(c, "padding-right") + getPixel(c, "border-left-width") + getPixel(c, "border-right-width")) / 2),
                    x = parseInt((getPixel(c, "padding-top") + getPixel(c, "padding-bottom") + getPixel(c, "border-top-width") + getPixel(c, "border-bottom-width") + ($(".ilightbox-inner-toolbar", c).outerHeight() || 0)) / 2);
                switch (e.type) {
                    case "current":
                        var w = parseInt(e.height / 2 - g / 2 - x - p / 2),
                            y = parseInt(e.width / 2 - f / 2 - b - d / 2);
                        break;
                    case "next":
                        var w = "horizontal" == n ? parseInt(e.height / 2 - h - g / 2 - x - p / 2) : parseInt(e.height - u - x - p / 2),
                            y = "horizontal" == n ? parseInt(e.width - u - b - d / 2) : parseInt(e.width / 2 - f / 2 - b - h - d / 2);
                        break;
                    case "prev":
                        var w = "horizontal" == n ? parseInt(e.height / 2 - h - g / 2 - x - p / 2) : parseInt(u - x - g - p / 2),
                            y = "horizontal" == n ? parseInt(u - b - f - d / 2) : parseInt(e.width / 2 - h - f / 2 - b - d / 2)
                }
                c.data("offset", {
                    top: w,
                    left: y,
                    newDims: v,
                    diff: {
                        W: b,
                        H: x
                    },
                    thumbsOffset: {
                        W: d,
                        H: p
                    },
                    object: e
                }), e.animate > 0 && o.effects.reposition ? (c.css(transform, gpuAcceleration).stop().animate({
                    top: w,
                    left: y
                }, o.effects.repositionSpeed, "easeOutCirc", function() {
                    c.css(transform, "")
                }), $("div.ilightbox-container", c).stop().animate({
                    width: f,
                    height: g
                }, o.effects.repositionSpeed, "easeOutCirc"), $("div.ilightbox-inner-toolbar", c).stop().animate({
                    width: f
                }, o.effects.repositionSpeed, "easeOutCirc", function() {
                    $(this).css("overflow", "visible")
                })) : (c.css({
                    top: w,
                    left: y
                }), $("div.ilightbox-container", c).css({
                    width: f,
                    height: g
                }), $("div.ilightbox-inner-toolbar", c).css({
                    width: f
                }))
            },
            resume: function(e) {
                var t = this,
                    i = t.vars,
                    o = t.options;
                !o.slideshow.pauseTime || o.controls.slideshow && i.total <= 1 || e < i.isPaused || (i.isPaused = 0, i.cycleID && (i.cycleID = clearTimeout(i.cycleID)), i.cycleID = setTimeout(function() {
                    i.current == i.total - 1 ? t.goTo(0) : t.moveTo("next")
                }, o.slideshow.pauseTime))
            },
            pause: function(e) {
                var t = this,
                    i = t.vars;
                t.options;
                e < i.isPaused || (i.isPaused = e || 100, i.cycleID && (i.cycleID = clearTimeout(i.cycleID)))
            },
            resetCycle: function() {
                var e = this,
                    t = e.vars;
                e.options.controls.slideshow && t.cycleID && !t.isPaused && e.resume()
            },
            getNewDimenstions: function(e, t, i, o, n) {
                var a = this;
                return factor = e ? t ? min(e / i, t / o) : e / i : t / o, n || (factor > a.options.maxScale ? factor = a.options.maxScale : factor < a.options.minScale && (factor = a.options.minScale)), {
                    width: a.options.keepAspectRatio ? round(i * factor) : e,
                    height: a.options.keepAspectRatio ? round(o * factor) : t,
                    ratio: factor
                }
            },
            setOption: function(e) {
                var t = this;
                t.options = $.extend(!0, t.options, e || {}), t.refresh()
            },
            availPlugins: function() {
                var e = this,
                    t = document.createElement("video");
                e.plugins = {
                    flash: !isMobile,
                    quicktime: parseInt(PluginDetect.getVersion("QuickTime")) >= 0,
                    html5H264: !(!t.canPlayType || !t.canPlayType("video/mp4").replace(/no/, "")),
                    html5WebM: !(!t.canPlayType || !t.canPlayType("video/webm").replace(/no/, "")),
                    html5Vorbis: !(!t.canPlayType || !t.canPlayType("video/ogg").replace(/no/, "")),
                    html5QuickTime: !(!t.canPlayType || !t.canPlayType("video/quicktime").replace(/no/, ""))
                }
            },
            addContent: function(e, t) {
                var i = this;
                switch (t.type) {
                    case "video":
                        var o = !1,
                            n = t.videoType,
                            a = t.options.html5video;
                        ("video/mp4" == n || "mp4" == t.ext || "m4v" == t.ext || a.h264) && i.plugins.html5H264 ? (t.ext = "mp4", t.URL = a.h264 || t.URL) : a.webm && i.plugins.html5WebM ? (t.ext = "webm", t.URL = a.webm || t.URL) : a.ogg && i.plugins.html5Vorbis && (t.ext = "ogv", t.URL = a.ogg || t.URL), !i.plugins.html5H264 || "video/mp4" != n && "mp4" != t.ext && "m4v" != t.ext ? !i.plugins.html5WebM || "video/webm" != n && "webm" != t.ext ? !i.plugins.html5Vorbis || "video/ogg" != n && "ogv" != t.ext ? !i.plugins.html5QuickTime || "video/quicktime" != n && "mov" != t.ext && "qt" != t.ext || (o = !0, n = "video/quicktime") : (o = !0, n = "video/ogg") : (o = !0, n = "video/webm") : (o = !0, n = "video/mp4"), o ? l = $("<video />", {
                            width: "100%",
                            height: "100%",
                            preload: a.preload,
                            autoplay: a.autoplay,
                            poster: a.poster,
                            controls: a.controls
                        }).append($("<source />", {
                            src: t.URL,
                            type: n
                        })) : i.plugins.quicktime ? (l = $("<object />", {
                            type: "video/quicktime",
                            pluginspage: pluginspages.quicktime
                        }).attr({
                            data: t.URL,
                            width: "100%",
                            height: "100%"
                        }).append($("<param />", {
                            name: "src",
                            value: t.URL
                        })).append($("<param />", {
                            name: "autoplay",
                            value: "false"
                        })).append($("<param />", {
                            name: "loop",
                            value: "false"
                        })).append($("<param />", {
                            name: "scale",
                            value: "tofit"
                        })), browser.msie && (l = QT_GenerateOBJECTText(t.URL, "100%", "100%", "", "SCALE", "tofit", "AUTOPLAY", "false", "LOOP", "false"))) : l = $("<span />", {
                            class: "ilightbox-alert",
                            html: i.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.quicktime).replace("{type}", "QuickTime")
                        });
                        break;
                    case "flash":
                        if (i.plugins.flash) {
                            var r = "",
                                s = 0;
                            t.options.flashvars ? $.each(t.options.flashvars, function(e, t) {
                                0 != s && (r += "&"), r += e + "=" + encodeURIComponent(t), s++
                            }) : r = null, l = $("<embed />").attr({
                                type: "application/x-shockwave-flash",
                                src: t.URL,
                                width: "number" == typeof t.options.width && t.options.width && "1" == i.options.minScale && "1" == i.options.maxScale ? t.options.width : "100%",
                                height: "number" == typeof t.options.height && t.options.height && "1" == i.options.minScale && "1" == i.options.maxScale ? t.options.height : "100%",
                                quality: "high",
                                bgcolor: "#000000",
                                play: "true",
                                loop: "true",
                                menu: "true",
                                wmode: "transparent",
                                scale: "showall",
                                allowScriptAccess: "always",
                                allowFullScreen: "true",
                                flashvars: r,
                                fullscreen: "yes"
                            })
                        } else l = $("<span />", {
                            class: "ilightbox-alert",
                            html: i.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.flash).replace("{type}", "Adobe Flash player")
                        });
                        break;
                    case "iframe":
                        l = $("<iframe />").attr({
                            width: "number" == typeof t.options.width && t.options.width && "1" == i.options.minScale && "1" == i.options.maxScale ? t.options.width : "100%",
                            height: "number" == typeof t.options.height && t.options.height && "1" == i.options.minScale && "1" == i.options.maxScale ? t.options.height : "100%",
                            src: t.URL,
                            frameborder: 0,
                            hspace: 0,
                            vspace: 0,
                            scrolling: supportTouch ? "auto" : "scroll",
                            webkitAllowFullScreen: "",
                            mozallowfullscreen: "",
                            allowFullScreen: ""
                        });
                        break;
                    case "inline":
                        l = $('<div class="ilightbox-wrapper"></div>').html($(t.URL).clone(!0));
                        break;
                    case "html":
                        var l, c = t.URL;
                        if (c[0].nodeName) l = $('<div class="ilightbox-wrapper"></div>').html(c);
                        else {
                            var u = $(t.URL),
                                h = u.selector ? $("<div>" + u + "</div>") : u;
                            l = $('<div class="ilightbox-wrapper"></div>').html(h)
                        }
                }
                return $("div.ilightbox-container", e).empty().html(l), "video" === l[0].tagName.toLowerCase() && browser.webkit && setTimeout(function() {
                    var e = l[0].currentSrc + "?" + floor(3e4 * random());
                    l[0].currentSrc = e, l[0].src = e
                }), l
            },
            ogpRecognition: function(e, t) {
                var i = this,
                    o = e.URL;
                i.showLoader(), doAjax(o, function(e) {
                    if (i.hideLoader(), e) {
                        var o = new Object;
                        if (o.length = !1, o.url = e.url, 200 == e.status) {
                            var n = e.results,
                                a = n.type,
                                r = n.source;
                            o.source = r.src, o.width = r.width && parseInt(r.width) || 0, o.height = r.height && parseInt(r.height) || 0, o.type = a, o.thumbnail = r.thumbnail || n.images && n.images[0], o.html5video = n.html5video || {}, o.length = !0, "application/x-shockwave-flash" == r.type ? o.type = "flash" : -1 != r.type.indexOf("video/") ? o.type = "video" : -1 != r.type.indexOf("/html") ? o.type = "iframe" : -1 != r.type.indexOf("image/") && (o.type = "image")
                        } else if (void 0 !== e.response) throw e.response;
                        t.call(this, !!o.length && o)
                    }
                })
            },
            hashChangeHandler: function(e) {
                var t = this,
                    i = t.vars,
                    o = t.options,
                    n = parseURI(e || window.location.href).hash,
                    a = n.split("/"),
                    r = a[1];
                if (!(i.hashLock || "#" + o.linkId != a[0] && n.length > 1))
                    if (r) {
                        var s = a[1] || 0;
                        t.items[s] ? (l = $(".ilightbox-overlay")).length && l.attr("linkid") == o.linkId ? t.goTo(s) : t.itemsObject[s].trigger(supportTouch ? "itap" : "click") : (l = $(".ilightbox-overlay")).length && t.closeAction()
                    } else {
                        var l = $(".ilightbox-overlay");
                        l.length && t.closeAction()
                    }
            }
        }, $.fn.iLightBox = function() {
            var e = arguments,
                t = $.isPlainObject(e[0]) ? e[0] : e[1],
                i = $.isArray(e[0]) || "string" == typeof e[0] ? e[0] : e[1];
            t || (t = {});
            var o = $.extend(!0, {
                    attr: "href",
                    path: "vertical",
                    skin: "dark",
                    linkId: !1,
                    infinite: !1,
                    startFrom: 0,
                    randomStart: !1,
                    keepAspectRatio: !0,
                    maxScale: 1,
                    minScale: .2,
                    innerToolbar: !1,
                    smartRecognition: !1,
                    mobileOptimizer: !0,
                    fullAlone: !0,
                    fullViewPort: null,
                    fullStretchTypes: "flash, video",
                    overlay: {
                        blur: !0,
                        opacity: .85
                    },
                    controls: {
                        arrows: !1,
                        slideshow: !1,
                        toolbar: !0,
                        fullscreen: !0,
                        thumbnail: !0,
                        keyboard: !0,
                        mousewheel: !0,
                        swipe: !0
                    },
                    keyboard: {
                        left: !0,
                        right: !0,
                        up: !0,
                        down: !0,
                        esc: !0,
                        shift_enter: !0
                    },
                    show: {
                        effect: !0,
                        speed: 300,
                        title: !0
                    },
                    hide: {
                        effect: !0,
                        speed: 300
                    },
                    caption: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave"
                    },
                    social: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave",
                        buttons: !1
                    },
                    styles: {
                        pageOffsetX: 0,
                        pageOffsetY: 0,
                        nextOffsetX: 45,
                        nextOffsetY: 0,
                        nextOpacity: 1,
                        nextScale: 1,
                        prevOffsetX: 45,
                        prevOffsetY: 0,
                        prevOpacity: 1,
                        prevScale: 1
                    },
                    thumbnails: {
                        maxWidth: 120,
                        maxHeight: 80,
                        normalOpacity: 1,
                        activeOpacity: .6
                    },
                    effects: {
                        reposition: !0,
                        repositionSpeed: 200,
                        switchSpeed: 500,
                        loadedFadeSpeed: 180,
                        fadeSpeed: 200
                    },
                    slideshow: {
                        pauseTime: 5e3,
                        pauseOnHover: !1,
                        startPaused: !0
                    },
                    text: {
                        close: "Press Esc to close",
                        enterFullscreen: "Enter Fullscreen (Shift+Enter)",
                        exitFullscreen: "Exit Fullscreen (Shift+Enter)",
                        slideShow: "Slideshow",
                        next: "Next",
                        previous: "Previous"
                    },
                    errors: {
                        loadImage: "An error occurred when trying to load photo.",
                        loadContents: "An error occurred when trying to load contents.",
                        missingPlugin: "The content your are attempting to view requires the <a href='{pluginspage}' target='_blank'>{type} plugin</a>."
                    },
                    ajaxSetup: {
                        url: "",
                        beforeSend: function(e, t) {},
                        cache: !1,
                        complete: function(e, t) {},
                        crossDomain: !1,
                        error: function(e, t, i) {},
                        success: function(e, t, i) {},
                        global: !0,
                        ifModified: !1,
                        username: null,
                        password: null,
                        type: "GET"
                    },
                    callback: {}
                }, t),
                n = !(!$.isArray(i) && "string" != typeof i);
            if (i = $.isArray(i) ? i : new Array, "string" == typeof e[0] && (i[0] = e[0]), version_compare($.fn.jquery, "1.8", ">=")) {
                var a = new iLightBox($(this), o, i, n);
                return {
                    close: function() {
                        a.closeAction()
                    },
                    fullscreen: function() {
                        a.fullScreenAction()
                    },
                    moveNext: function() {
                        a.moveTo("next")
                    },
                    movePrev: function() {
                        a.moveTo("prev")
                    },
                    goTo: function(e) {
                        a.goTo(e)
                    },
                    refresh: function() {
                        a.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? a.repositionPhoto(!0) : a.repositionPhoto()
                    },
                    setOption: function(e) {
                        a.setOption(e)
                    },
                    destroy: function() {
                        a.closeAction(), a.dispatchItemsEvents()
                    }
                }
            }
            throw "The jQuery version that was loaded is too old. iLightBox requires jQuery 1.8+"
        }, $.iLightBox = function() {
            return $.fn.iLightBox(arguments[0], arguments[1])
        }, $.extend($.easing, {
            easeInCirc: function(e, t, i, o, n) {
                return -o * (sqrt(1 - (t /= n) * t) - 1) + i
            },
            easeOutCirc: function(e, t, i, o, n) {
                return o * sqrt(1 - (t = t / n - 1) * t) + i
            },
            easeInOutCirc: function(e, t, i, o, n) {
                return (t /= n / 2) < 1 ? -o / 2 * (sqrt(1 - t * t) - 1) + i : o / 2 * (sqrt(1 - (t -= 2) * t) + 1) + i
            }
        }),
        function() {
            $.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(e, t) {
                $.fn[t] = function(e) {
                    return e ? this.bind(t, e) : this.trigger(t)
                }, $.attrFn && ($.attrFn[t] = !0)
            });
            var e = {
                startEvent: "touchstart.iTap",
                endEvent: "touchend.iTap"
            };
            $.event.special.itap = {
                setup: function() {
                    var t, i, o = this,
                        n = $(this);
                    n.bind(e.startEvent, function(a) {
                        t = getScrollXY(), n.one(e.endEvent, function(e) {
                            i = getScrollXY();
                            var n = e || window.event;
                            (e = $.event.fix(n)).type = "itap", t && i && t.x == i.x && t.y == i.y && ($.event.dispatch || $.event.handle).call(o, e), t = i = undefined
                        })
                    })
                },
                teardown: function() {
                    $(this).unbind(e.startEvent)
                }
            }
        }(),
        function() {
            if (fullScreenApi = {
                    supportsFullScreen: !1,
                    isFullScreen: function() {
                        return !1
                    },
                    requestFullScreen: function() {},
                    cancelFullScreen: function() {},
                    fullScreenEventName: "",
                    prefix: ""
                }, browserPrefixes = "webkit moz o ms khtml".split(" "), void 0 !== document.cancelFullScreen) fullScreenApi.supportsFullScreen = !0;
            else
                for (var e = 0, t = browserPrefixes.length; e < t; e++)
                    if (fullScreenApi.prefix = browserPrefixes[e], void 0 !== document[fullScreenApi.prefix + "CancelFullScreen"]) {
                        fullScreenApi.supportsFullScreen = !0;
                        break
                    }
            fullScreenApi.supportsFullScreen && (fullScreenApi.fullScreenEventName = fullScreenApi.prefix + "fullscreenchange", fullScreenApi.isFullScreen = function() {
                switch (this.prefix) {
                    case "":
                        return document.fullScreen;
                    case "webkit":
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + "FullScreen"]
                }
            }, fullScreenApi.requestFullScreen = function(e) {
                return "" === this.prefix ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]()
            }, fullScreenApi.cancelFullScreen = function(e) {
                return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
            })
        }(),
        function() {
            var e = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }(navigator.userAgent);
            browser = {}, e.browser && (browser[e.browser] = !0, browser.version = e.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0)
        }(),
        function() {
            function e(e) {
                for (var o = 0, n = t.length; o < n; o++) {
                    var a = t[o] ? t[o] + e.charAt(0).toUpperCase() + e.slice(1) : e;
                    if (i.style[a] !== undefined) return a
                }
            }
            var t = ["", "webkit", "moz", "ms", "o"],
                i = document.createElement("div");
            transform = e("transform") || "", gpuAcceleration = e("perspective") ? "translateZ(0) " : ""
        }();
    var PluginDetect = {
        version: "0.7.9",
        name: "PluginDetect",
        handler: function(e, t, i) {
            return function() {
                e(t, i)
            }
        },
        openTag: "<",
        isDefined: function(e) {
            return void 0 !== e
        },
        isArray: function(e) {
            return /array/i.test(Object.prototype.toString.call(e))
        },
        isFunc: function(e) {
            return "function" == typeof e
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNum: function(e) {
            return "number" == typeof e
        },
        isStrNum: function(e) {
            return "string" == typeof e && /\d/.test(e)
        },
        getNumRegx: /[\d][\d\.\_,-]*/,
        splitNumRegx: /[\.\_,-]/g,
        getNum: function(e, t) {
            var i = this,
                o = i.isStrNum(e) ? (i.isDefined(t) ? new RegExp(t) : i.getNumRegx).exec(e) : null;
            return o ? o[0] : null
        },
        compareNums: function(e, t, i) {
            var o, n, a, r = this,
                s = parseInt;
            if (r.isStrNum(e) && r.isStrNum(t)) {
                if (r.isDefined(i) && i.compareNums) return i.compareNums(e, t);
                for (o = e.split(r.splitNumRegx), n = t.split(r.splitNumRegx), a = 0; a < min(o.length, n.length); a++) {
                    if (s(o[a], 10) > s(n[a], 10)) return 1;
                    if (s(o[a], 10) < s(n[a], 10)) return -1
                }
            }
            return 0
        },
        formatNum: function(e, t) {
            var i, o, n = this;
            if (!n.isStrNum(e)) return null;
            for (n.isNum(t) || (t = 4), t--, o = e.replace(/\s/g, "").split(n.splitNumRegx).concat(["0", "0", "0", "0"]), i = 0; i < 4; i++) /^(0+)(.+)$/.test(o[i]) && (o[i] = RegExp.$2), (i > t || !/\d/.test(o[i])) && (o[i] = "0");
            return o.slice(0, 4).join(",")
        },
        $$hasMimeType: function(e) {
            return function(t) {
                if (!e.isIE && t) {
                    var i, o, n, a = e.isArray(t) ? t : e.isString(t) ? [t] : [];
                    for (n = 0; n < a.length; n++)
                        if (e.isString(a[n]) && /[^\s]/.test(a[n]) && (i = navigator.mimeTypes[a[n]], (o = i ? i.enabledPlugin : 0) && (o.name || o.description))) return i
                }
                return null
            }
        },
        findNavPlugin: function(e, t, i) {
            var o, n, a, r = this,
                s = new RegExp(e, "i"),
                l = !r.isDefined(t) || t ? /\d/ : 0,
                c = i ? new RegExp(i, "i") : 0,
                u = navigator.plugins;
            for (o = 0; o < u.length; o++)
                if (a = u[o].description || "", n = u[o].name || "", (s.test(a) && (!l || l.test(RegExp.leftContext + RegExp.rightContext)) || s.test(n) && (!l || l.test(RegExp.leftContext + RegExp.rightContext))) && (!c || !c.test(a) && !c.test(n))) return u[o];
            return null
        },
        getMimeEnabledPlugin: function(e, t, i) {
            var o, n, a, r, s = this,
                l = new RegExp(t, "i"),
                c = i ? new RegExp(i, "i") : 0,
                u = s.isString(e) ? [e] : e;
            for (r = 0; r < u.length; r++)
                if ((o = s.hasMimeType(u[r])) && (o = o.enabledPlugin) && (a = o.description || "", n = o.name || "", (l.test(a) || l.test(n)) && (!c || !c.test(a) && !c.test(n)))) return o;
            return 0
        },
        getPluginFileVersion: function(e, t) {
            var i, o, n, a, r = this,
                s = -1;
            if (r.OS > 2 || !e || !e.version || !(i = r.getNum(e.version))) return t;
            if (!t) return i;
            for (i = r.formatNum(i), o = (t = r.formatNum(t)).split(r.splitNumRegx), n = i.split(r.splitNumRegx), a = 0; a < o.length; a++) {
                if (s > -1 && a > s && "0" != o[a]) return t;
                if (n[a] != o[a] && (-1 == s && (s = a), "0" != o[a])) return t
            }
            return i
        },
        AXO: window.ActiveXObject,
        getAXO: function(e) {
            var t = null,
                i = this;
            try {
                t = new i.AXO(e)
            } catch (e) {}
            return t
        },
        convertFuncs: function(e) {
            var t, i, o = /^[\$][\$]/;
            for (t in e)
                if (o.test(t)) try {
                    (i = t.slice(2)).length > 0 && !e[i] && (e[i] = e[t](e), delete e[t])
                } catch (e) {}
        },
        initObj: function(e, t, i) {
            var o, n;
            if (e) {
                if (1 == e[t[0]] || i)
                    for (o = 0; o < t.length; o += 2) e[t[o]] = t[o + 1];
                for (o in e)(n = e[o]) && 1 == n[t[0]] && this.initObj(n, t)
            }
        },
        initScript: function() {
            var e = this,
                t = navigator,
                i = document,
                o = t.userAgent || "",
                n = t.vendor || "",
                a = t.platform || "",
                r = t.product || "";
            e.initObj(e, ["$", e]);
            for (u in e.Plugins) e.Plugins[u] && e.initObj(e.Plugins[u], ["$", e, "$$", e.Plugins[u]], 1);
            if (e.convertFuncs(e), e.OS = 100, a) {
                var s = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
                for (u = s.length - 2; u >= 0; u -= 2)
                    if (s[u] && new RegExp(s[u], "i").test(a)) {
                        e.OS = s[u + 1];
                        break
                    }
            }
            if (e.head = i.getElementsByTagName("head")[0] || i.getElementsByTagName("body")[0] || i.body || null, e.isIE = new Function("return/*@cc_on!@*/!1")(), e.verIE = e.isIE && /MSIE\s*(\d+\.?\d*)/i.test(o) ? parseFloat(RegExp.$1, 10) : null, e.verIEfull = null, e.docModeIE = null, e.isIE) {
                var l, c = document.createElement("div");
                try {
                    c.style.behavior = "url(#default#clientcaps)", e.verIEfull = c.getComponentVersion("{89820200-ECBD-11CF-8B85-00AA005B4383}", "componentid").replace(/,/g, ".")
                } catch (e) {}
                l = parseFloat(e.verIEfull || "0", 10), e.docModeIE = i.documentMode || (/back/i.test(i.compatMode || "") ? 5 : l) || e.verIE, e.verIE = l || e.docModeIE
            }
            if (e.ActiveXEnabled = !1, e.isIE) {
                var u, h = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
                for (u = 0; u < h.length; u++)
                    if (e.getAXO(h[u])) {
                        e.ActiveXEnabled = !0;
                        break
                    }
            }
            e.isGecko = /Gecko/i.test(r) && /Gecko\s*\/\s*\d/i.test(o), e.verGecko = e.isGecko ? e.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(o) ? RegExp.$1 : "0.9") : null, e.isChrome = /Chrome\s*\/\s*(\d[\d\.]*)/i.test(o), e.verChrome = e.isChrome ? e.formatNum(RegExp.$1) : null, e.isSafari = (/Apple/i.test(n) || !n && !e.isChrome) && /Safari\s*\/\s*(\d[\d\.]*)/i.test(o), e.verSafari = e.isSafari && /Version\s*\/\s*(\d[\d\.]*)/i.test(o) ? e.formatNum(RegExp.$1) : null, e.isOpera = /Opera\s*[\/]?\s*(\d+\.?\d*)/i.test(o), e.verOpera = e.isOpera && (/Version\s*\/\s*(\d+\.?\d*)/i.test(o), !0) ? parseFloat(RegExp.$1, 10) : null, e.addWinEvent("load", e.handler(e.runWLfuncs, e))
        },
        init: function(e) {
            var t, e, i = this,
                o = {
                    status: -3,
                    plugin: 0
                };
            return i.isString(e) ? 1 == e.length ? (i.getVersionDelimiter = e, o) : (e = e.toLowerCase().replace(/\s/g, ""), (t = i.Plugins[e]) && t.getVersion ? (o.plugin = t, i.isDefined(t.installed) || (t.installed = null, t.version = null, t.version0 = null, t.getVersionDone = null, t.pluginName = e), i.garbage = !1, i.isIE && !i.ActiveXEnabled && "java" !== e ? (o.status = -2, o) : (o.status = 1, o)) : o) : o
        },
        fPush: function(e, t) {
            var i = this;
            i.isArray(t) && (i.isFunc(e) || i.isArray(e) && e.length > 0 && i.isFunc(e[0])) && t.push(e)
        },
        callArray: function(e) {
            var t, i = this;
            if (i.isArray(e))
                for (t = 0; t < e.length; t++) {
                    if (null === e[t]) return;
                    i.call(e[t]), e[t] = null
                }
        },
        call: function(e) {
            var t = this,
                i = t.isArray(e) ? e.length : -1;
            i > 0 && t.isFunc(e[0]) ? e[0](t, i > 1 ? e[1] : 0, i > 2 ? e[2] : 0, i > 3 ? e[3] : 0) : t.isFunc(e) && e(t)
        },
        getVersionDelimiter: ",",
        $$getVersion: function(e) {
            return function(t, i, o) {
                var n, a, r = e.init(t);
                return r.status < 0 ? null : (1 != (n = r.plugin).getVersionDone && (n.getVersion(null, i, o), null === n.getVersionDone && (n.getVersionDone = 1)), e.cleanup(), a = n.version || n.version0, a = a ? a.replace(e.splitNumRegx, e.getVersionDelimiter) : a)
            }
        },
        cleanup: function() {
            var e = this;
            e.garbage && e.isDefined(window.CollectGarbage) && window.CollectGarbage()
        },
        isActiveXObject: function(e, t) {
            var i = this,
                o = !1,
                n = '<object width="1" height="1" style="display:none" ' + e.getCodeBaseVersion(t) + ">" + e.HTML + i.openTag + "/object>";
            if (!i.head) return o;
            i.head.insertBefore(document.createElement("object"), i.head.firstChild), i.head.firstChild.outerHTML = n;
            try {
                i.head.firstChild.classid = e.classID
            } catch (e) {}
            try {
                i.head.firstChild.object && (o = !0)
            } catch (e) {}
            try {
                o && i.head.firstChild.readyState < 4 && (i.garbage = !0)
            } catch (e) {}
            return i.head.removeChild(i.head.firstChild), o
        },
        codebaseSearch: function(e, t) {
            var i = this;
            if (!i.ActiveXEnabled || !e) return null;
            e.BIfuncs && e.BIfuncs.length && null !== e.BIfuncs[e.BIfuncs.length - 1] && i.callArray(e.BIfuncs);
            var o, n = e.SEARCH;
            if (i.isStrNum(t)) return !!(n.match && n.min && i.compareNums(t, n.min) <= 0) || !(n.match && n.max && i.compareNums(t, n.max) >= 0) && ((o = i.isActiveXObject(e, t)) && (!n.min || i.compareNums(t, n.min) > 0) && (n.min = t), o || n.max && !(i.compareNums(t, n.max) < 0) || (n.max = t), o);
            var a, r, s, l, c, u = [0, 0, 0, 0],
                h = [].concat(n.digits),
                d = n.min ? 1 : 0,
                p = function(t, o) {
                    var n = [].concat(u);
                    return n[t] = o, i.isActiveXObject(e, n.join(","))
                };
            if (n.max) {
                for (l = n.max.split(i.splitNumRegx), a = 0; a < l.length; a++) l[a] = parseInt(l[a], 10);
                l[0] < h[0] && (h[0] = l[0])
            }
            if (n.min) {
                for (c = n.min.split(i.splitNumRegx), a = 0; a < c.length; a++) c[a] = parseInt(c[a], 10);
                c[0] > u[0] && (u[0] = c[0])
            }
            if (c && l)
                for (a = 1; a < c.length && c[a - 1] == l[a - 1]; a++) l[a] < h[a] && (h[a] = l[a]), c[a] > u[a] && (u[a] = c[a]);
            if (n.max)
                for (a = 1; a < h.length; a++)
                    if (l[a] > 0 && 0 == h[a] && h[a - 1] < n.digits[a - 1]) {
                        h[a - 1] += 1;
                        break
                    }
            for (a = 0; a < h.length; a++) {
                for (s = {}, r = 0; r < 20 && !(h[a] - u[a] < 1) && (o = round((h[a] + u[a]) / 2), !s["a" + o]); r++) s["a" + o] = 1, p(a, o) ? (u[a] = o, d = 1) : h[a] = o;
                if (h[a] = u[a], !d && p(a, u[a]) && (d = 1), !d) break
            }
            return d ? u.join(",") : null
        },
        addWinEvent: function(e, t) {
            var i, o = this,
                n = window;
            o.isFunc(t) && (n.addEventListener ? n.addEventListener(e, t, !1) : n.attachEvent ? n.attachEvent("on" + e, t) : (i = n["on" + e], n["on" + e] = o.winHandler(t, i)))
        },
        winHandler: function(e, t) {
            return function() {
                e(), "function" == typeof t && t()
            }
        },
        WLfuncs0: [],
        WLfuncs: [],
        runWLfuncs: function(e) {
            e.winLoaded = !0, e.callArray(e.WLfuncs0), e.callArray(e.WLfuncs), e.onDoneEmptyDiv && e.onDoneEmptyDiv()
        },
        winLoaded: !1,
        $$onWindowLoaded: function(e) {
            return function(t) {
                e.winLoaded ? e.call(t) : e.fPush(t, e.WLfuncs)
            }
        },
        div: null,
        divID: "plugindetect",
        divWidth: 50,
        pluginSize: 1,
        emptyDiv: function() {
            var e, t, i, o, n, a = this;
            if (a.div && a.div.childNodes)
                for (e = a.div.childNodes.length - 1; e >= 0; e--) {
                    if ((i = a.div.childNodes[e]) && i.childNodes)
                        for (t = i.childNodes.length - 1; t >= 0; t--) {
                            n = i.childNodes[t];
                            try {
                                i.removeChild(n)
                            } catch (e) {}
                        }
                    if (i) try {
                        a.div.removeChild(i)
                    } catch (e) {}
                }
            if (a.div || (o = document.getElementById(a.divID)) && (a.div = o), a.div && a.div.parentNode) {
                try {
                    a.div.parentNode.removeChild(a.div)
                } catch (e) {}
                a.div = null
            }
        },
        DONEfuncs: [],
        onDoneEmptyDiv: function() {
            var e, t, i = this;
            if (i.winLoaded && (!i.WLfuncs || !i.WLfuncs.length || null === i.WLfuncs[i.WLfuncs.length - 1])) {
                for (e in i)
                    if ((t = i[e]) && t.funcs) {
                        if (3 == t.OTF) return;
                        if (t.funcs.length && null !== t.funcs[t.funcs.length - 1]) return
                    }
                for (e = 0; e < i.DONEfuncs.length; e++) i.callArray(i.DONEfuncs);
                i.emptyDiv()
            }
        },
        getWidth: function(e) {
            if (e) {
                var t = e.scrollWidth || e.offsetWidth;
                if (this.isNum(t)) return t
            }
            return -1
        },
        getTagStatus: function(e, t, i, o) {
            var n = this,
                a = e.span,
                r = n.getWidth(a),
                s = i.span,
                l = n.getWidth(s),
                c = t.span,
                u = n.getWidth(c);
            if (!(a && s && c && n.getDOMobj(e))) return -2;
            if (l < u || r < 0 || l < 0 || u < 0 || u <= n.pluginSize || n.pluginSize < 1) return 0;
            if (r >= u) return -1;
            try {
                if (r == n.pluginSize && (!n.isIE || 4 == n.getDOMobj(e).readyState)) {
                    if (!e.winLoaded && n.winLoaded) return 1;
                    if (e.winLoaded && n.isNum(o) && (n.isNum(e.count) || (e.count = o), o - e.count >= 10)) return 1
                }
            } catch (e) {}
            return 0
        },
        getDOMobj: function(e, t) {
            var i = this,
                o = e ? e.span : 0,
                n = o && o.firstChild ? 1 : 0;
            try {
                n && t && i.div.focus()
            } catch (e) {}
            return n ? o.firstChild : null
        },
        setStyle: function(e, t) {
            var i, o = e.style;
            if (o && t)
                for (i = 0; i < t.length; i += 2) try {
                    o[t[i]] = t[i + 1]
                } catch (e) {}
        },
        insertDivInBody: function(e, t) {
            var i = this,
                o = "pd33993399",
                n = null,
                a = t ? window.top.document : window.document,
                r = a.getElementsByTagName("body")[0] || a.body;
            if (!r) try {
                a.write('<div id="' + o + '">.' + i.openTag + "/div>"), n = a.getElementById(o)
            } catch (e) {}(r = a.getElementsByTagName("body")[0] || a.body) && (r.insertBefore(e, r.firstChild), n && r.removeChild(n))
        },
        insertHTML: function(e, t, i, o, n) {
            var a, r, s, l = document,
                c = this,
                u = l.createElement("span"),
                h = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"];
            if (c.isDefined(o) || (o = ""), c.isString(e) && /[^\s]/.test(e)) {
                for (e = e.toLowerCase().replace(/\s/g, ""), a = c.openTag + e + ' width="' + c.pluginSize + '" height="' + c.pluginSize + '" ', a += 'style="outline-style:none;border-style:none;padding:0px;margin:0px;visibility:visible;display:inline;" ', r = 0; r < t.length; r += 2) /[^\s]/.test(t[r + 1]) && (a += t[r] + '="' + t[r + 1] + '" ');
                for (a += ">", r = 0; r < i.length; r += 2) /[^\s]/.test(i[r + 1]) && (a += c.openTag + 'param name="' + i[r] + '" value="' + i[r + 1] + '" />');
                a += o + c.openTag + "/" + e + ">"
            } else a = o;
            if (c.div || ((s = l.getElementById(c.divID)) ? c.div = s : (c.div = l.createElement("div"), c.div.id = c.divID), c.setStyle(c.div, h.concat(["width", c.divWidth + "px", "height", c.pluginSize + 3 + "px", "fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "block"])), s || (c.setStyle(c.div, ["position", "absolute", "right", "0px", "top", "0px"]), c.insertDivInBody(c.div))), c.div && c.div.parentNode) {
                c.setStyle(u, h.concat(["fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "inline"]));
                try {
                    u.innerHTML = a
                } catch (e) {}
                try {
                    c.div.appendChild(u)
                } catch (e) {}
                return {
                    span: u,
                    winLoaded: c.winLoaded,
                    tagName: e,
                    outerHTML: a
                }
            }
            return {
                span: null,
                winLoaded: c.winLoaded,
                tagName: "",
                outerHTML: a
            }
        },
        Plugins: {
            quicktime: {
                mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"],
                progID: "QuickTimeCheckObject.QuickTimeCheck.1",
                progID0: "QuickTime.QuickTime",
                classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
                minIEver: 7,
                HTML: '<param name="src" value="" /><param name="controller" value="false" />',
                getCodeBaseVersion: function(e) {
                    return 'codebase="#version=' + e + '"'
                },
                SEARCH: {
                    min: 0,
                    max: 0,
                    match: 0,
                    digits: [16, 128, 128, 0]
                },
                getVersion: function(e) {
                    var t, i = this,
                        o = i.$,
                        n = null,
                        a = null;
                    if (o.isIE) {
                        if (o.isStrNum(e) && ((t = e.split(o.splitNumRegx)).length > 3 && parseInt(t[3], 10) > 0 && (t[3] = "9999"), e = t.join(",")), o.isStrNum(e) && o.verIE >= i.minIEver && i.canUseIsMin() > 0) return i.installed = i.isMin(e), void(i.getVersionDone = 0);
                        i.getVersionDone = 1, !n && o.verIE >= i.minIEver && (n = i.CDBASE2VER(o.codebaseSearch(i))), n || (a = o.getAXO(i.progID)) && a.QuickTimeVersion && (n = a.QuickTimeVersion.toString(16), n = parseInt(n.charAt(0), 16) + "." + parseInt(n.charAt(1), 16) + "." + parseInt(n.charAt(2), 16))
                    } else o.hasMimeType(i.mimeType) && (a = 3 != o.OS ? o.findNavPlugin("QuickTime.*Plug-?in", 0) : null) && a.name && (n = o.getNum(a.name));
                    i.installed = n ? 1 : a ? 0 : -1, i.version = o.formatNum(n, 3)
                },
                cdbaseUpper: ["7,60,0,0", "0,0,0,0"],
                cdbaseLower: ["7,50,0,0", null],
                cdbase2ver: [function(e, t) {
                    var i = t.split(e.$.splitNumRegx);
                    return [i[0], i[1].charAt(0), i[1].charAt(1), i[2]].join(",")
                }, null],
                CDBASE2VER: function(e) {
                    var t, i = this,
                        o = i.$,
                        n = i.cdbaseUpper,
                        a = i.cdbaseLower;
                    if (e)
                        for (e = o.formatNum(e), t = 0; t < n.length; t++)
                            if (n[t] && o.compareNums(e, n[t]) < 0 && a[t] && o.compareNums(e, a[t]) >= 0 && i.cdbase2ver[t]) return i.cdbase2ver[t](i, e);
                    return e
                },
                canUseIsMin: function() {
                    var e, t = this,
                        i = t.$,
                        o = t.canUseIsMin,
                        n = t.cdbaseUpper,
                        a = t.cdbaseLower;
                    if (!o.value)
                        for (o.value = -1, e = 0; e < n.length; e++) {
                            if (n[e] && i.codebaseSearch(t, n[e])) {
                                o.value = 1;
                                break
                            }
                            if (a[e] && i.codebaseSearch(t, a[e])) {
                                o.value = -1;
                                break
                            }
                        }
                    return t.SEARCH.match = 1 == o.value ? 1 : 0, o.value
                },
                isMin: function(e) {
                    var t = this;
                    return t.$.codebaseSearch(t, e) ? .7 : -1
                }
            },
            flash: {
                mimeType: "application/x-shockwave-flash",
                progID: "ShockwaveFlash.ShockwaveFlash",
                classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                getVersion: function() {
                    var e, t, i, o, n = function(e) {
                            if (!e) return null;
                            var t = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(e);
                            return t ? t[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null
                        },
                        a = this,
                        r = a.$,
                        s = null,
                        l = null,
                        c = null;
                    if (r.isIE) {
                        for (e = 15; e > 2; e--)
                            if (l = r.getAXO(a.progID + "." + e)) {
                                c = e.toString();
                                break
                            }
                        if (l || (l = r.getAXO(a.progID)), "6" == c) try {
                            l.AllowScriptAccess = "always"
                        } catch (e) {
                            return "6,0,21,0"
                        }
                        try {
                            s = n(l.GetVariable("$version"))
                        } catch (e) {}!s && c && (s = c)
                    } else {
                        if (i = r.hasMimeType(a.mimeType)) {
                            t = r.getDOMobj(r.insertHTML("object", ["type", a.mimeType], [], "", a));
                            try {
                                s = r.getNum(t.GetVariable("$version"))
                            } catch (e) {}
                        }
                        s || ((o = i ? i.enabledPlugin : null) && o.description && (s = n(o.description)), s && (s = r.getPluginFileVersion(o, s)))
                    }
                    return a.installed = s ? 1 : -1, a.version = r.formatNum(s), !0
                }
            },
            shockwave: {
                mimeType: "application/x-director",
                progID: "SWCtl.SWCtl",
                classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000",
                getVersion: function() {
                    var e, t = null,
                        i = null,
                        o = this,
                        n = o.$;
                    if (n.isIE) {
                        try {
                            i = n.getAXO(o.progID).ShockwaveVersion("")
                        } catch (e) {}
                        n.isString(i) && i.length > 0 ? t = n.getNum(i) : n.getAXO(o.progID + ".8") ? t = "8" : n.getAXO(o.progID + ".7") ? t = "7" : n.getAXO(o.progID + ".1") && (t = "6")
                    } else(e = n.findNavPlugin("Shockwave\\s*for\\s*Director")) && e.description && n.hasMimeType(o.mimeType) && (t = n.getNum(e.description)), t && (t = n.getPluginFileVersion(e, t));
                    o.installed = t ? 1 : -1, o.version = n.formatNum(t)
                }
            },
            zz: 0
        }
    };
    PluginDetect.initScript();
    var gArgCountErr = 'The "%%" function requires an even number of arguments.\nArguments should be in the form "atttributeName", "attributeValue", ...',
        gTagAttrs = null,
        gQTGeneratorVersion = 1;
    ! function() {
        function e(e) {
            return "#" + (e = e || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }
        var t, i = document,
            o = $.event.special,
            n = i.documentMode,
            a = "oniLightBoxHashChange" in window && (void 0 === n || 7 < n);
        $.fn.iLightBoxHashChange = function(e) {
            return e ? this.bind("iLightBoxHashChange", e) : this.trigger("iLightBoxHashChange")
        }, $.fn.iLightBoxHashChange.delay = 50, o.iLightBoxHashChange = $.extend(o.iLightBoxHashChange, {
            setup: function() {
                if (a) return !1;
                $(t.start)
            },
            teardown: function() {
                if (a) return !1;
                $(t.stop)
            }
        }), t = function() {
            function t() {
                var i = e(),
                    n = c(r);
                i !== r ? (l(r = i, n), $(window).trigger("iLightBoxHashChange")) : n !== r && (location.href = location.href.replace(/#.*/, "") + n), o = setTimeout(t, $.fn.iLightBoxHashChange.delay)
            }
            var o, n = {},
                r = e(),
                s = function(e) {
                    return e
                },
                l = s,
                c = s;
            return n.start = function() {
                o || t()
            }, n.stop = function() {
                o && clearTimeout(o), o = void 0
            }, browser.msie && !a && function() {
                var o, a;
                n.start = function() {
                    o || (a = (a = $.fn.iLightBoxHashChange.src) && a + e(), o = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        a || l(e()), t()
                    }).attr("src", a || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function() {
                        try {
                            "title" === event.propertyName && (o.document.title = i.title)
                        } catch (e) {}
                    })
                }, n.stop = s, c = function() {
                    return e(o.location.href)
                }, l = function(e, t) {
                    var n = o.document,
                        a = $.fn.iLightBoxHashChange.domain;
                    e !== t && (n.title = i.title, n.open(), a && n.write('<script>document.domain="' + a + '"<\/script>'), n.close(), o.location.hash = e)
                }
            }(), n
        }()
    }(), Array.prototype.filter || (Array.prototype.filter = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            i = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var o = [], n = arguments[1], a = 0; a < i; a++)
            if (a in t) {
                var r = t[a];
                e.call(n, r, a, t) && o.push(r)
            }
        return o
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var i;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
            n = o.length >>> 0;
        if (0 === n) return -1;
        var a = +t || 0;
        if (abs(a) === 1 / 0 && (a = 0), a >= n) return -1;
        for (i = max(a >= 0 ? a : n - abs(a), 0); i < n;) {
            if (i in o && o[i] === e) return i;
            i++
        }
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            i = t.length >>> 0;
        if (0 === i) return -1;
        var o = i;
        arguments.length > 1 && ((o = Number(arguments[1])) != o ? o = 0 : 0 != o && o != 1 / 0 && o != -1 / 0 && (o = (o > 0 || -1) * floor(abs(o))));
        for (var n = o >= 0 ? min(o, i - 1) : i - abs(o); n >= 0; n--)
            if (n in t && t[n] === e) return n;
        return -1
    })
}(jQuery, this);
! function(e) {
    function t(t) {
        var n = t || window.event,
            i = [].slice.call(arguments, 1),
            l = 0,
            s = 0,
            o = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (l = n.wheelDelta / 120), n.detail && (l = -n.detail / 3), o = l, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * l), void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120), i.unshift(t, l, s, o), (e.event.dispatch || e.event.handle).apply(this, i)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
        for (var i = n.length; i;) e.event.fixHooks[n[--i]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
            else this.onmousewheel = t
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery);
! function(e, n, t) {
    for (var i, a = 0, m = function(e) {
            i && (n.requestAnimationFrame(m, e), jQuery.fx.tick())
        }, r = ["ms", "moz", "webkit", "o"], o = 0, u = r.length; o < u && !n.requestAnimationFrame; ++o) n.requestAnimationFrame = n[r[o] + "RequestAnimationFrame"], n.cancelAnimationFrame = n[r[o] + "CancelAnimationFrame"] || n[r[o] + "CancelRequestAnimationFrame"];
    n.requestAnimationFrame || (n.requestAnimationFrame = function(e, t) {
        var i = (new Date).getTime(),
            m = i - a,
            r = Math.max(0, 16 - m),
            o = n.setTimeout(function() {
                e(i + r)
            }, r);
        return a = i + r, o
    }), n.cancelAnimationFrame || (n.cancelAnimationFrame = function(e) {
        clearTimeout(e)
    }), jQuery.fx.timer = function(e) {
        e() && jQuery.timers.push(e) && !i && (i = !0, m(e.elem))
    }, jQuery.fx.stop = function() {
        i = !1
    }
}(jQuery, this);
! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, n) {
            var o, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function h(t, e) {
            t.each(function(t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                var r = s && s[o];
                r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; h > e; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = n(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                o = n + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s])
            }
        }), o
    }, i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[o] = setTimeout(function() {
                n.apply(s, e), delete s[o]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var s = i.toDashed(o),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, o, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var n = h[i] || i;
            e[n] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
            a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[o];
        e[s] = this.getXValue(a), e[r] = "";
        var u = n ? "paddingTop" : "paddingBottom",
            h = n ? "top" : "bottom",
            d = n ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            n = this.position.y,
            o = parseInt(t, 10),
            s = parseInt(e, 10),
            r = o === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - n,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                n = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, n
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, s) {
        return e(t, i, n, o, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, n, o) {
    "use strict";

    function s(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, f[o] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = o, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    n.extend(c, e.prototype), c.option = function(t) {
        n.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var s = e[o],
                r = new i(s, this);
            n.push(r)
        }
        return n
    }, c._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            r++, r == s && i()
        }
        var o = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, n)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), h)
            if (this.$element = this.$element || h(this.element), e) {
                var o = h.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            o = i(t),
            s = {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            };
        return s
    }, c.handleEvent = n.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, n.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = o, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        n = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function() {
        o.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var n = i.prototype,
        o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return o.forEach(function(t) {
        n[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), n.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, n._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, n.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, n.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, n.getSegmentSize = function(t, e) {
        var i = t + e,
            n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e]
        }
    }, n.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, n.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, n.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function o() {
            i.apply(this, arguments)
        }
        return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            s = o / n,
            r = n - o % n,
            a = r && 1 > r ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, i.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            n = e(i);
        this.containerWidth = n && n.innerWidth
    }, i.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
                x: this.columnWidth * r,
                y: s
            }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++) this.colYs[r + d] = u;
        return a
    }, i.prototype._getColGroup = function(t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o)
        }
        return e
    }, i.prototype._manageStamp = function(t) {
        var i = e(t),
            n = this._getElementOffset(t),
            o = this._getOption("originLeft"),
            s = o ? n.left : n.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, i.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, i.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        n = i.prototype,
        o = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
    var r = n.measureColumns;
    n.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = n._getOption;
    return n._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, o, s, r, a) {
        return e(t, i, n, o, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, n, o, s, r) {
    function a(t, e) {
        return function(i, n) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o],
                    r = i.sortData[s],
                    a = n.sortData[s];
                if (r > a || a > r) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var n = t[i];
            n.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
        }
        var e, i, n, o = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            n = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
            }
        }
        return {
            matches: i,
            needReveal: n,
            needHide: o
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return n(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
            var n = t[i];
            n.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                n = i[0],
                o = n.match(/^\[(.+)\]$/),
                s = o && o[1],
                r = e(s, n),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        var t = this.options.sortBy;
        if (t) {
            var e = [].concat.apply(t, this.sortHistory),
                i = a(e, this.options.sortAscending);
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
            var s = this._filter(e).matches;
            for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, n = 0; i && i > n; n++) {
            var s = e[n];
            o.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});
! function(a, b, c) {
    "use strict";

    function d(b, p, q) {
        function K(c) {
            var d = 0,
                e = Gb.length;
            if (yb.old = a.extend({}, yb), wb = tb ? 0 : ub[rb.horizontal ? "width" : "height"](), Bb = zb[rb.horizontal ? "width" : "height"](), xb = tb ? b : vb[rb.horizontal ? "outerWidth" : "outerHeight"](), Gb.length = 0, yb.start = 0, yb.end = H(xb - wb, 0), Rb) {
                d = Ib.length, Hb = vb.children(rb.itemSelector), Ib.length = 0;
                var f, g = j(vb, rb.horizontal ? "paddingLeft" : "paddingTop"),
                    h = j(vb, rb.horizontal ? "paddingRight" : "paddingBottom"),
                    i = "border-box" === a(Hb).css("boxSizing"),
                    l = "none" !== Hb.css("float"),
                    m = 0,
                    n = Hb.length - 1;
                xb = 0, Hb.each(function(b, c) {
                    var d = a(c),
                        e = c.getBoundingClientRect(),
                        i = G(rb.horizontal ? e.width || e.right - e.left : e.height || e.bottom - e.top),
                        k = j(d, rb.horizontal ? "marginLeft" : "marginTop"),
                        o = j(d, rb.horizontal ? "marginRight" : "marginBottom"),
                        p = i + k + o,
                        q = !k || !o,
                        r = {};
                    r.el = c, r.size = q ? i : p, r.half = r.size / 2, r.start = xb + (q ? k : 0), r.center = r.start - G(wb / 2 - r.size / 2), r.end = r.start - wb + r.size, b || (xb += g), xb += p, rb.horizontal || l || o && k && b > 0 && (xb -= I(k, o)), b === n && (r.end += h, xb += h, m = q ? o : 0), Ib.push(r), f = r
                }), vb[0].style[rb.horizontal ? "width" : "height"] = (i ? xb : xb - g - h) + "px", xb -= m, Ib.length ? (yb.start = Ib[0][Pb ? "center" : "start"], yb.end = Pb ? f.center : xb > wb ? f.end : yb.start) : yb.start = yb.end = 0
            }
            if (yb.center = G(yb.end / 2 + yb.start / 2), V(), Ab.length && Bb > 0 && (rb.dynamicHandle ? (Cb = yb.start === yb.end ? Bb : G(Bb * wb / xb), Cb = k(Cb, rb.minHandleSize, Bb), Ab[0].style[rb.horizontal ? "width" : "height"] = Cb + "px") : Cb = Ab[rb.horizontal ? "outerWidth" : "outerHeight"](), Db.end = Bb - Cb, ec || N()), !tb && wb > 0) {
                var o = yb.start,
                    p = "";
                if (Rb) a.each(Ib, function(a, b) {
                    Pb ? Gb.push(b.center) : b.start + b.size > o && o <= yb.end && (o = b.start, Gb.push(o), o += wb, o > yb.end && o < yb.end + wb && Gb.push(yb.end))
                });
                else
                    for (; o - wb < yb.end;) Gb.push(o), o += wb;
                if (Eb[0] && e !== Gb.length) {
                    for (var q = 0; q < Gb.length; q++) p += rb.pageBuilder.call(sb, q);
                    Fb = Eb.html(p).children(), Fb.eq(Jb.activePage).addClass(rb.activeClass)
                }
            }
            if (Jb.slideeSize = xb, Jb.frameSize = wb, Jb.sbSize = Bb, Jb.handleSize = Cb, Rb) {
                c && null != rb.startAt && (T(rb.startAt), sb[Qb ? "toCenter" : "toStart"](rb.startAt));
                var r = Ib[Jb.activeItem];
                L(Qb && r ? r.center : k(yb.dest, yb.start, yb.end))
            } else c ? null != rb.startAt && L(rb.startAt, 1) : L(k(yb.dest, yb.start, yb.end));
            ob("load")
        }

        function L(a, b, c) {
            if (Rb && cc.released && !c) {
                var d = U(a),
                    e = a > yb.start && a < yb.end;
                Qb ? (e && (a = Ib[d.centerItem].center), Pb && rb.activateMiddle && T(d.centerItem)) : e && (a = Ib[d.firstItem].start)
            }
            cc.init && cc.slidee && rb.elasticBounds ? a > yb.end ? a = yb.end + (a - yb.end) / 6 : a < yb.start && (a = yb.start + (a - yb.start) / 6) : a = k(a, yb.start, yb.end), ac.start = +new Date, ac.time = 0, ac.from = yb.cur, ac.to = a, ac.delta = a - yb.cur, ac.tweesing = cc.tweese || cc.init && !cc.slidee, ac.immediate = !ac.tweesing && (b || cc.init && cc.slidee || !rb.speed), cc.tweese = 0, a !== yb.dest && (yb.dest = a, ob("change"), ec || M()), Z(), V(), W(), O()
        }

        function M() {
            if (sb.initialized) {
                if (!ec) return ec = t(M), void(cc.released && ob("moveStart"));
                ac.immediate ? yb.cur = ac.to : ac.tweesing ? (ac.tweeseDelta = ac.to - yb.cur, D(ac.tweeseDelta) < .1 ? yb.cur = ac.to : yb.cur += ac.tweeseDelta * (cc.released ? rb.swingSpeed : rb.syncSpeed)) : (ac.time = I(+new Date - ac.start, rb.speed), yb.cur = ac.from + ac.delta * a.easing[rb.easing](ac.time / rb.speed, ac.time, 0, 1, rb.speed)), ac.to === yb.cur ? (yb.cur = ac.to, cc.tweese = ec = 0) : ec = t(M), ob("move"), tb || (m ? vb[0].style[m] = n + (rb.horizontal ? "translateX" : "translateY") + "(" + -yb.cur + "px)" : vb[0].style[rb.horizontal ? "left" : "top"] = -G(yb.cur) + "px"), !ec && cc.released && ob("moveEnd"), N()
            }
        }

        function N() {
            Ab.length && (Db.cur = yb.start === yb.end ? 0 : ((cc.init && !cc.slidee ? yb.dest : yb.cur) - yb.start) / (yb.end - yb.start) * Db.end, Db.cur = k(G(Db.cur), Db.start, Db.end), _b.hPos !== Db.cur && (_b.hPos = Db.cur, m ? Ab[0].style[m] = n + (rb.horizontal ? "translateX" : "translateY") + "(" + Db.cur + "px)" : Ab[0].style[rb.horizontal ? "left" : "top"] = Db.cur + "px"))
        }

        function O() {
            Fb[0] && _b.page !== Jb.activePage && (_b.page = Jb.activePage, Fb.removeClass(rb.activeClass).eq(Jb.activePage).addClass(rb.activeClass), ob("activePage", _b.page))
        }

        function P() {
            bc.speed && yb.cur !== (bc.speed > 0 ? yb.end : yb.start) || sb.stop(), hc = cc.init ? t(P) : 0, bc.now = +new Date, bc.pos = yb.cur + (bc.now - bc.lastTime) / 1e3 * bc.speed, L(cc.init ? bc.pos : G(bc.pos)), cc.init || yb.cur !== yb.dest || ob("moveEnd"), bc.lastTime = bc.now
        }

        function Q(a, b, d) {
            if ("boolean" === e(b) && (d = b, b = c), b === c) L(yb[a], d);
            else {
                if (Qb && "center" !== a) return;
                var f = sb.getPos(b);
                f && L(f[a], d, !Qb)
            }
        }

        function R(a) {
            return null != a ? i(a) ? a >= 0 && a < Ib.length ? a : -1 : Hb.index(a) : -1
        }

        function S(a) {
            return R(i(a) && 0 > a ? a + Ib.length : a)
        }

        function T(a, b) {
            var c = R(a);
            return !Rb || 0 > c ? !1 : ((_b.active !== c || b) && (Hb.eq(Jb.activeItem).removeClass(rb.activeClass), Hb.eq(c).addClass(rb.activeClass), _b.active = Jb.activeItem = c, W(), ob("active", c)), c)
        }

        function U(a) {
            a = k(i(a) ? a : yb.dest, yb.start, yb.end);
            var b = {},
                c = Pb ? 0 : wb / 2;
            if (!tb)
                for (var d = 0, e = Gb.length; e > d; d++) {
                    if (a >= yb.end || d === Gb.length - 1) {
                        b.activePage = Gb.length - 1;
                        break
                    }
                    if (a <= Gb[d] + c) {
                        b.activePage = d;
                        break
                    }
                }
            if (Rb) {
                for (var f = !1, g = !1, h = !1, j = 0, l = Ib.length; l > j; j++)
                    if (f === !1 && a <= Ib[j].start + Ib[j].half && (f = j), h === !1 && a <= Ib[j].center + Ib[j].half && (h = j), j === l - 1 || a <= Ib[j].end + Ib[j].half) {
                        g = j;
                        break
                    }
                b.firstItem = i(f) ? f : 0, b.centerItem = i(h) ? h : b.firstItem, b.lastItem = i(g) ? g : b.centerItem
            }
            return b
        }

        function V(b) {
            a.extend(Jb, U(b))
        }

        function W() {
            var a = yb.dest <= yb.start,
                b = yb.dest >= yb.end,
                c = (a ? 1 : 0) | (b ? 2 : 0);
            if (_b.slideePosState !== c && (_b.slideePosState = c, Yb.is("button,input") && Yb.prop("disabled", a), Zb.is("button,input") && Zb.prop("disabled", b), Yb.add(Vb)[a ? "addClass" : "removeClass"](rb.disabledClass), Zb.add(Ub)[b ? "addClass" : "removeClass"](rb.disabledClass)), _b.fwdbwdState !== c && cc.released && (_b.fwdbwdState = c, Vb.is("button,input") && Vb.prop("disabled", a), Ub.is("button,input") && Ub.prop("disabled", b)), Rb && null != Jb.activeItem) {
                var d = 0 === Jb.activeItem,
                    e = Jb.activeItem >= Ib.length - 1,
                    f = (d ? 1 : 0) | (e ? 2 : 0);
                _b.itemsButtonState !== f && (_b.itemsButtonState = f, Wb.is("button,input") && Wb.prop("disabled", d), Xb.is("button,input") && Xb.prop("disabled", e), Wb[d ? "addClass" : "removeClass"](rb.disabledClass), Xb[e ? "addClass" : "removeClass"](rb.disabledClass))
            }
        }

        function X(a, b, c) {
            if (a = S(a), b = S(b), a > -1 && b > -1 && a !== b && (!c || b !== a - 1) && (c || b !== a + 1)) {
                Hb.eq(a)[c ? "insertAfter" : "insertBefore"](Ib[b].el);
                var d = b > a ? a : c ? b : b - 1,
                    e = a > b ? a : c ? b + 1 : b,
                    f = a > b;
                null != Jb.activeItem && (a === Jb.activeItem ? _b.active = Jb.activeItem = c ? f ? b + 1 : b : f ? b : b - 1 : Jb.activeItem > d && Jb.activeItem < e && (_b.active = Jb.activeItem += f ? 1 : -1)), K()
            }
        }

        function Y(a, b) {
            for (var c = 0, d = $b[a].length; d > c; c++)
                if ($b[a][c] === b) return c;
            return -1
        }

        function Z() {
            cc.released && !sb.isPaused && sb.resume()
        }

        function $(a) {
            return G(k(a, Db.start, Db.end) / Db.end * (yb.end - yb.start)) + yb.start
        }

        function _() {
            cc.history[0] = cc.history[1], cc.history[1] = cc.history[2], cc.history[2] = cc.history[3], cc.history[3] = cc.delta
        }

        function ab(a) {
            cc.released = 0, cc.source = a, cc.slidee = "slidee" === a
        }

        function bb(b) {
            var c = "touchstart" === b.type,
                d = b.data.source,
                e = "slidee" === d;
            cc.init || !c && eb(b.target) || ("handle" !== d || rb.dragHandle && Db.start !== Db.end) && (!e || (c ? rb.touchDragging : rb.mouseDragging && b.which < 2)) && (c || f(b), ab(d), cc.init = 0, cc.$source = a(b.target), cc.touch = c, cc.pointer = c ? b.originalEvent.touches[0] : b, cc.initX = cc.pointer.pageX, cc.initY = cc.pointer.pageY, cc.initPos = e ? yb.cur : Db.cur, cc.start = +new Date, cc.time = 0, cc.path = 0, cc.delta = 0, cc.locked = 0, cc.history = [0, 0, 0, 0], cc.pathToLock = e ? c ? 30 : 10 : 0, u.on(c ? x : w, cb), sb.pause(1), (e ? vb : Ab).addClass(rb.draggedClass), ob("moveStart"), e && (fc = setInterval(_, 10)))
        }

        function cb(a) {
            if (cc.released = "mouseup" === a.type || "touchend" === a.type, cc.pointer = cc.touch ? a.originalEvent[cc.released ? "changedTouches" : "touches"][0] : a, cc.pathX = cc.pointer.pageX - cc.initX, cc.pathY = cc.pointer.pageY - cc.initY, cc.path = E(F(cc.pathX, 2) + F(cc.pathY, 2)), cc.delta = rb.horizontal ? cc.pathX : cc.pathY, cc.released || !(cc.path < 1)) {
                if (!cc.init) {
                    if (cc.path < rb.dragThreshold) return cc.released ? db() : c;
                    if (!(rb.horizontal ? D(cc.pathX) > D(cc.pathY) : D(cc.pathX) < D(cc.pathY))) return db();
                    cc.init = 1
                }
                f(a), !cc.locked && cc.path > cc.pathToLock && cc.slidee && (cc.locked = 1, cc.$source.on(z, g)), cc.released && (db(), rb.releaseSwing && cc.slidee && (cc.swing = (cc.delta - cc.history[0]) / 40 * 300, cc.delta += cc.swing, cc.tweese = D(cc.swing) > 10)), L(cc.slidee ? G(cc.initPos - cc.delta) : $(cc.initPos + cc.delta))
            }
        }

        function db() {
            clearInterval(fc), cc.released = !0, u.off(cc.touch ? x : w, cb), (cc.slidee ? vb : Ab).removeClass(rb.draggedClass), setTimeout(function() {
                cc.$source.off(z, g)
            }), yb.cur === yb.dest && cc.init && ob("moveEnd"), sb.resume(1), cc.init = 0
        }

        function eb(b) {
            return ~a.inArray(b.nodeName, B) || a(b).is(rb.interactive)
        }

        function fb() {
            sb.stop(), u.off("mouseup", fb)
        }

        function gb(a) {
            switch (f(a), this) {
                case Ub[0]:
                case Vb[0]:
                    sb.moveBy(Ub.is(this) ? rb.moveBy : -rb.moveBy), u.on("mouseup", fb);
                    break;
                case Wb[0]:
                    sb.prev();
                    break;
                case Xb[0]:
                    sb.next();
                    break;
                case Yb[0]:
                    sb.prevPage();
                    break;
                case Zb[0]:
                    sb.nextPage()
            }
        }

        function hb(a) {
            return dc.curDelta = (rb.horizontal ? a.deltaY || a.deltaX : a.deltaY) || -a.wheelDelta, dc.curDelta /= 1 === a.deltaMode ? 3 : 100, Rb ? (o = +new Date, dc.last < o - dc.resetTime && (dc.delta = 0), dc.last = o, dc.delta += dc.curDelta, D(dc.delta) < 1 ? dc.finalDelta = 0 : (dc.finalDelta = G(dc.delta / 1), dc.delta %= 1), dc.finalDelta) : dc.curDelta
        }

        function ib(a) {
            a.originalEvent[r] = sb;
            var b = +new Date;
            if (J + rb.scrollHijack > b && Sb[0] !== document && Sb[0] !== window) return void(J = b);
            if (rb.scrollBy && yb.start !== yb.end) {
                var c = hb(a.originalEvent);
                (rb.scrollTrap || c > 0 && yb.dest < yb.end || 0 > c && yb.dest > yb.start) && f(a, 1), sb.slideBy(rb.scrollBy * c)
            }
        }

        function jb(a) {
            rb.clickBar && a.target === zb[0] && (f(a), L($((rb.horizontal ? a.pageX - zb.offset().left : a.pageY - zb.offset().top) - Cb / 2)))
        }

        function kb(a) {
            if (rb.keyboardNavBy) switch (a.which) {
                case rb.horizontal ? 37:
                    38: f(a), sb["pages" === rb.keyboardNavBy ? "prevPage" : "prev"]();
                    break;
                case rb.horizontal ? 39:
                    40: f(a), sb["pages" === rb.keyboardNavBy ? "nextPage" : "next"]()
            }
        }

        function lb(a) {
            return eb(this) ? void(a.originalEvent[r + "ignore"] = !0) : void(this.parentNode !== vb[0] || a.originalEvent[r + "ignore"] || sb.activate(this))
        }

        function mb() {
            this.parentNode === Eb[0] && sb.activatePage(Fb.index(this))
        }

        function nb(a) {
            rb.pauseOnHover && sb["mouseenter" === a.type ? "pause" : "resume"](2)
        }

        function ob(a, b) {
            if ($b[a]) {
                for (qb = $b[a].length, C.length = 0, pb = 0; qb > pb; pb++) C.push($b[a][pb]);
                for (pb = 0; qb > pb; pb++) C[pb].call(sb, a, b)
            }
        }
        if (!(this instanceof d)) return new d(b, p, q);
        var pb, qb, rb = a.extend({}, d.defaults, p),
            sb = this,
            tb = i(b),
            ub = a(b),
            vb = rb.slidee ? a(rb.slidee).eq(0) : ub.children().eq(0),
            wb = 0,
            xb = 0,
            yb = {
                start: 0,
                center: 0,
                end: 0,
                cur: 0,
                dest: 0
            },
            zb = a(rb.scrollBar).eq(0),
            Ab = zb.children().eq(0),
            Bb = 0,
            Cb = 0,
            Db = {
                start: 0,
                end: 0,
                cur: 0
            },
            Eb = a(rb.pagesBar),
            Fb = 0,
            Gb = [],
            Hb = 0,
            Ib = [],
            Jb = {
                firstItem: 0,
                lastItem: 0,
                centerItem: 0,
                activeItem: null,
                activePage: 0
            },
            Kb = new l(ub[0]),
            Lb = new l(vb[0]),
            Mb = new l(zb[0]),
            Nb = new l(Ab[0]),
            Ob = "basic" === rb.itemNav,
            Pb = "forceCentered" === rb.itemNav,
            Qb = "centered" === rb.itemNav || Pb,
            Rb = !tb && (Ob || Qb || Pb),
            Sb = rb.scrollSource ? a(rb.scrollSource) : ub,
            Tb = rb.dragSource ? a(rb.dragSource) : ub,
            Ub = a(rb.forward),
            Vb = a(rb.backward),
            Wb = a(rb.prev),
            Xb = a(rb.next),
            Yb = a(rb.prevPage),
            Zb = a(rb.nextPage),
            $b = {},
            _b = {},
            ac = {},
            bc = {},
            cc = {
                released: 1
            },
            dc = {
                last: 0,
                delta: 0,
                resetTime: 200
            },
            ec = 0,
            fc = 0,
            gc = 0,
            hc = 0;
        tb || (b = ub[0]), sb.initialized = 0, sb.frame = b, sb.slidee = vb[0], sb.pos = yb, sb.rel = Jb, sb.items = Ib, sb.pages = Gb, sb.isPaused = 0, sb.options = rb, sb.dragging = cc, sb.reload = function() {
            K()
        }, sb.getPos = function(a) {
            if (Rb) {
                var b = R(a);
                return -1 !== b ? Ib[b] : !1
            }
            var c = vb.find(a).eq(0);
            if (c[0]) {
                var d = rb.horizontal ? c.offset().left - vb.offset().left : c.offset().top - vb.offset().top,
                    e = c[rb.horizontal ? "outerWidth" : "outerHeight"]();
                return {
                    start: d,
                    center: d - wb / 2 + e / 2,
                    end: d - wb + e,
                    size: e
                }
            }
            return !1
        }, sb.moveBy = function(a) {
            bc.speed = a, !cc.init && bc.speed && yb.cur !== (bc.speed > 0 ? yb.end : yb.start) && (bc.lastTime = +new Date, bc.startPos = yb.cur, ab("button"), cc.init = 1, ob("moveStart"), s(hc), P())
        }, sb.stop = function() {
            "button" === cc.source && (cc.init = 0, cc.released = 1)
        }, sb.prev = function() {
            sb.activate(null == Jb.activeItem ? 0 : Jb.activeItem - 1)
        }, sb.next = function() {
            sb.activate(null == Jb.activeItem ? 0 : Jb.activeItem + 1)
        }, sb.prevPage = function() {
            sb.activatePage(Jb.activePage - 1)
        }, sb.nextPage = function() {
            sb.activatePage(Jb.activePage + 1)
        }, sb.slideBy = function(a, b) {
            a && (Rb ? sb[Qb ? "toCenter" : "toStart"](k((Qb ? Jb.centerItem : Jb.firstItem) + rb.scrollBy * a, 0, Ib.length)) : L(yb.dest + a, b))
        }, sb.slideTo = function(a, b) {
            L(a, b)
        }, sb.toStart = function(a, b) {
            Q("start", a, b)
        }, sb.toEnd = function(a, b) {
            Q("end", a, b)
        }, sb.toCenter = function(a, b) {
            Q("center", a, b)
        }, sb.getIndex = R, sb.activate = function(a, b) {
            var c = T(a);
            rb.smart && c !== !1 && (Qb ? sb.toCenter(c, b) : c >= Jb.lastItem ? sb.toStart(c, b) : c <= Jb.firstItem ? sb.toEnd(c, b) : Z())
        }, sb.activatePage = function(a, b) {
            i(a) && L(Gb[k(a, 0, Gb.length - 1)], b)
        }, sb.resume = function(a) {
            rb.cycleBy && rb.cycleInterval && ("items" !== rb.cycleBy || Ib[0] && null != Jb.activeItem) && !(a < sb.isPaused) && (sb.isPaused = 0, gc ? gc = clearTimeout(gc) : ob("resume"), gc = setTimeout(function() {
                switch (ob("cycle"), rb.cycleBy) {
                    case "items":
                        sb.activate(Jb.activeItem >= Ib.length - 1 ? 0 : Jb.activeItem + 1);
                        break;
                    case "pages":
                        sb.activatePage(Jb.activePage >= Gb.length - 1 ? 0 : Jb.activePage + 1)
                }
            }, rb.cycleInterval))
        }, sb.pause = function(a) {
            a < sb.isPaused || (sb.isPaused = a || 100, gc && (gc = clearTimeout(gc), ob("pause")))
        }, sb.toggle = function() {
            sb[gc ? "pause" : "resume"]()
        }, sb.set = function(b, c) {
            a.isPlainObject(b) ? a.extend(rb, b) : rb.hasOwnProperty(b) && (rb[b] = c)
        }, sb.add = function(b, c) {
            var d = a(b);
            Rb ? (null == c || !Ib[0] || c >= Ib.length ? d.appendTo(vb) : Ib.length && d.insertBefore(Ib[c].el), null != Jb.activeItem && c <= Jb.activeItem && (_b.active = Jb.activeItem += d.length)) : vb.append(d), K()
        }, sb.remove = function(b) {
            if (Rb) {
                var c = S(b);
                if (c > -1) {
                    Hb.eq(c).remove();
                    var d = c === Jb.activeItem;
                    null != Jb.activeItem && c < Jb.activeItem && (_b.active = --Jb.activeItem), K(), d && (_b.active = null, sb.activate(Jb.activeItem))
                }
            } else a(b).remove(), K()
        }, sb.moveAfter = function(a, b) {
            X(a, b, 1)
        }, sb.moveBefore = function(a, b) {
            X(a, b)
        }, sb.on = function(a, b) {
            if ("object" === e(a))
                for (var c in a) a.hasOwnProperty(c) && sb.on(c, a[c]);
            else if ("function" === e(b))
                for (var d = a.split(" "), f = 0, g = d.length; g > f; f++) $b[d[f]] = $b[d[f]] || [], -1 === Y(d[f], b) && $b[d[f]].push(b);
            else if ("array" === e(b))
                for (var h = 0, i = b.length; i > h; h++) sb.on(a, b[h])
        }, sb.one = function(a, b) {
            function c() {
                b.apply(sb, arguments), sb.off(a, c)
            }
            sb.on(a, c)
        }, sb.off = function(a, b) {
            if (b instanceof Array)
                for (var c = 0, d = b.length; d > c; c++) sb.off(a, b[c]);
            else
                for (var e = a.split(" "), f = 0, g = e.length; g > f; f++)
                    if ($b[e[f]] = $b[e[f]] || [], null == b) $b[e[f]].length = 0;
                    else {
                        var h = Y(e[f], b); - 1 !== h && $b[e[f]].splice(h, 1)
                    }
        }, sb.destroy = function() {
            return d.removeInstance(b), Sb.add(Ab).add(zb).add(Eb).add(Ub).add(Vb).add(Wb).add(Xb).add(Yb).add(Zb).off("." + r), u.off("keydown", kb), Wb.add(Xb).add(Yb).add(Zb).removeClass(rb.disabledClass), Hb && null != Jb.activeItem && Hb.eq(Jb.activeItem).removeClass(rb.activeClass), Eb.empty(), tb || (ub.off("." + r), Kb.restore(), Lb.restore(), Mb.restore(), Nb.restore(), a.removeData(b, r)), Ib.length = Gb.length = 0, _b = {}, sb.initialized = 0, sb
        }, sb.init = function() {
            if (!sb.initialized) {
                if (d.getInstance(b)) throw new Error("There is already a Sly instance on this element");
                d.storeInstance(b, sb), sb.on(q);
                var a = ["overflow", "position"],
                    c = ["position", "webkitTransform", "msTransform", "transform", "left", "top", "width", "height"];
                Kb.save.apply(Kb, a), Mb.save.apply(Mb, a), Lb.save.apply(Lb, c), Nb.save.apply(Nb, c);
                var e = Ab;
                return tb || (e = e.add(vb), ub.css("overflow", "hidden"), m || "static" !== ub.css("position") || ub.css("position", "relative")), m ? n && e.css(m, n) : ("static" === zb.css("position") && zb.css("position", "relative"), e.css({
                    position: "absolute"
                })), rb.forward && Ub.on(A, gb), rb.backward && Vb.on(A, gb), rb.prev && Wb.on(z, gb), rb.next && Xb.on(z, gb), rb.prevPage && Yb.on(z, gb), rb.nextPage && Zb.on(z, gb), Sb.on(y, ib), zb[0] && zb.on(z, jb), Rb && rb.activateOn && ub.on(rb.activateOn + "." + r, "*", lb), Eb[0] && rb.activatePageOn && Eb.on(rb.activatePageOn + "." + r, "*", mb), Tb.on(v, {
                    source: "slidee"
                }, bb), Ab && Ab.on(v, {
                    source: "handle"
                }, bb), u.on("keydown", kb), tb || (ub.on("mouseenter." + r + " mouseleave." + r, nb), ub.on("scroll." + r, h)), sb.initialized = 1, K(!0), rb.cycleBy && !tb && sb[rb.startPaused ? "pause" : "resume"](), sb
            }
        }
    }

    function e(a) {
        return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof a
    }

    function f(a, b) {
        a.preventDefault(), b && a.stopPropagation()
    }

    function g(b) {
        f(b, 1), a(this).off(b.type, g)
    }

    function h() {
        this.scrollLeft = 0, this.scrollTop = 0
    }

    function i(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function j(a, b) {
        return 0 | G(String(a.css(b)).replace(/[^\-0-9.]/g, ""))
    }

    function k(a, b, c) {
        return b > a ? b : a > c ? c : a
    }

    function l(a) {
        var b = {};
        return b.style = {}, b.save = function() {
            if (a && a.nodeType) {
                for (var c = 0; c < arguments.length; c++) b.style[arguments[c]] = a.style[arguments[c]];
                return b
            }
        }, b.restore = function() {
            if (a && a.nodeType) {
                for (var c in b.style) b.style.hasOwnProperty(c) && (a.style[c] = b.style[c]);
                return b
            }
        }, b
    }
    var m, n, o, p = "sly",
        q = "Sly",
        r = p,
        s = b.cancelAnimationFrame || b.cancelRequestAnimationFrame,
        t = b.requestAnimationFrame,
        u = a(document),
        v = "touchstart." + r + " mousedown." + r,
        w = "mousemove." + r + " mouseup." + r,
        x = "touchmove." + r + " touchend." + r,
        y = (document.implementation.hasFeature("Event.wheel", "3.0") ? "wheel." : "mousewheel.") + r,
        z = "click." + r,
        A = "mousedown." + r,
        B = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"],
        C = [],
        D = Math.abs,
        E = Math.sqrt,
        F = Math.pow,
        G = Math.round,
        H = Math.max,
        I = Math.min,
        J = 0;
    u.on(y, function(a) {
            var b = a.originalEvent[r],
                c = +new Date;
            (!b || b.options.scrollHijack < c - J) && (J = c)
        }), d.getInstance = function(b) {
            return a.data(b, r)
        }, d.storeInstance = function(b, c) {
            return a.data(b, r, c)
        }, d.removeInstance = function(b) {
            return a.removeData(b, r)
        },
        function(a) {
            function b(a) {
                var b = (new Date).getTime(),
                    d = Math.max(0, 16 - (b - c)),
                    e = setTimeout(a, d);
                return c = b, e
            }
            t = a.requestAnimationFrame || a.webkitRequestAnimationFrame || b;
            var c = (new Date).getTime(),
                d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.clearTimeout;
            s = function(b) {
                d.call(a, b)
            }
        }(window),
        function() {
            function a(a) {
                for (var d = 0, e = b.length; e > d; d++) {
                    var f = b[d] ? b[d] + a.charAt(0).toUpperCase() + a.slice(1) : a;
                    if (null != c.style[f]) return f
                }
            }
            var b = ["", "Webkit", "Moz", "ms", "O"],
                c = document.createElement("div");
            m = a("transform"), n = a("perspective") ? "translateZ(0) " : ""
        }(), b[q] = d, a.fn[p] = function(b, c) {
            var f, g;
            return a.isPlainObject(b) || (("string" === e(b) || b === !1) && (f = b === !1 ? "destroy" : b, g = Array.prototype.slice.call(arguments, 1)), b = {}), this.each(function(a, e) {
                var h = d.getInstance(e);
                h || f ? h && f && h[f] && h[f].apply(h, g) : h = new d(e, b, c).init()
            })
        }, d.defaults = {
            slidee: null,
            horizontal: !1,
            itemNav: null,
            itemSelector: null,
            smart: !1,
            activateOn: null,
            activateMiddle: !1,
            scrollSource: null,
            scrollBy: 0,
            scrollHijack: 300,
            scrollTrap: !1,
            dragSource: null,
            mouseDragging: !1,
            touchDragging: !1,
            releaseSwing: !1,
            swingSpeed: .2,
            elasticBounds: !1,
            dragThreshold: 3,
            interactive: null,
            scrollBar: null,
            dragHandle: !1,
            dynamicHandle: !1,
            minHandleSize: 50,
            clickBar: !1,
            syncSpeed: .5,
            pagesBar: null,
            activatePageOn: null,
            pageBuilder: function(a) {
                return "<li>" + (a + 1) + "</li>"
            },
            forward: null,
            backward: null,
            prev: null,
            next: null,
            prevPage: null,
            nextPage: null,
            cycleBy: null,
            cycleInterval: 5e3,
            pauseOnHover: !1,
            startPaused: !1,
            moveBy: 300,
            speed: 0,
            easing: "swing",
            startAt: null,
            keyboardNavBy: null,
            draggedClass: "dragged",
            activeClass: "active",
            disabledClass: "disabled"
        }
}(jQuery, window);
! function(t) {
    "use strict";
    var s = function(s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s,
        init: function() {
            var t = this;
            t.timeout = setTimeout(function() {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function() {
            var s = this;
            if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children());
                var e = this.stringsElement.children();
                t.each(e, function(e, i) {
                    s.strings.push(t(i).html())
                })
            }
            this.init()
        },
        typewrite: function(t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.typeSpeed,
                    i = this;
                i.timeout = setTimeout(function() {
                    var e = 0,
                        r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var o = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o)
                    }
                    if ("html" === i.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "",
                                h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)););
                            s++, a += h
                        }
                    }
                    i.timeout = setTimeout(function() {
                        if (s === t.length) {
                            if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                            i.timeout = setTimeout(function() {
                                i.backspace(t, s)
                            }, i.backDelay)
                        } else {
                            0 === s && i.options.preStringTyped(i.arrayPos);
                            var e = t.substr(0, s + 1);
                            i.attr ? i.el.attr(i.attr, e) : i.isInput ? i.el.val(e) : "html" === i.contentType ? i.el.html(e) : i.el.text(e), s++, i.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        },
        backspace: function(t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.backSpeed,
                    i = this;
                i.timeout = setTimeout(function() {
                    if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var e = "";
                            "<" !== t.substr(s - 1).charAt(0) && (e -= t.substr(s).charAt(0), s--, !(0 > s)););
                        s--, e += "<"
                    }
                    var r = t.substr(0, s);
                    i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r), s > i.stopNum ? (s--, i.backspace(t, s)) : s <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], s))
                }, e)
            }
        },
        shuffleArray: function(t) {
            var s, e, i = t.length;
            if (i)
                for (; --i;) e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s;
            return t
        },
        reset: function() {
            var t = this;
            clearInterval(t.timeout);
            this.el.attr("id");
            this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
        }
    }, t.fn.typed = function(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("typed"),
                o = "object" == typeof e && e;
            r && r.reset(), i.data("typed", r = new s(this, o)), "string" == typeof e && r[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery);