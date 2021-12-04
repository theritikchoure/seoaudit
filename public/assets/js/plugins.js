/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2017 Metafizzy
 */

! function(e) {
    "use strict";
    var t = "desktop";
    "function" == typeof window.matchMedia ? (e(window).on("resize seocrawler-set-display", function() {
        t = window.matchMedia("(max-width: 419px)").matches ? "mobile-portrait" : window.matchMedia("(max-width: 767px)").matches ? "mobile-landscape" : window.matchMedia("(max-width: 959px)").matches ? "tablet" : "desktop"
    }), e(window).trigger("seocrawler-set-display")) : (e(window).on("resize seocrawler-set-display", function() {
        t = e(window).innerWidth() <= 419 ? "mobile-portrait" : e(window).innerWidth() <= 767 ? "mobile-landscape" : e(window).innerWidth() <= 959 ? "tablet" : "desktop"
    }), e(window).trigger("seocrawler-set-display"));
    var n = function(e) {
        0 != e.length && (this.main_menu = e, this.current_menu = this.main_menu.children(".sf-menu").children(".current-menu-item, .current-menu-ancestor").children("a"), this.init())
    };
    n.prototype = {
        init: function() {
            var t, n, s, i, a = this;
            a.sf_menu_mod(), "function" == typeof e.fn.superfish && (a.main_menu.superfish({
                delay: 400,
                speed: "fast"
            }), a.sf_menu_position(), e(window).resize((t = function() {
                a.sf_menu_position()
            }, n = 300, function() {
                var e = this,
                    a = arguments;
                i ? clearTimeout(i) : s && t.apply(e, a), i = setTimeout(function() {
                    s || t.apply(e, a), i = null
                }, n)
            })))
        },
        sf_menu_mod: function() {
            this.main_menu.find(".sf-mega > ul").each(function() {
                var t = e("<div></div>"),
                    n = e('<div class="sf-mega-section-wrap" ></div>'),
                    s = 0;
                e(this).children("li").each(function() {
                    var i = parseInt(e(this).attr("data-size"));
                    s + i <= 60 ? s += i : (s = i, t.append(n), n = e('<div class="sf-mega-section-wrap" ></div>')), n.append(e('<div class="sf-mega-section" ></div>').addClass("seocrawler-column-" + i).html(e('<div class="sf-mega-section-inner" ></div>').addClass(e(this).attr("class")).attr("id", e(this).attr("id")).html(e(this).html())))
                }), t.append(n), e(this).replaceWith(t.html())
            })
        },
        sf_menu_position: function() {
            if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                var n = e(".seocrawler-body-wrapper"),
                    s = this.main_menu.find(".sf-menu > li.seocrawler-normal-menu .sub-menu");
                s.css({
                    display: "block"
                }).removeClass("sub-menu-right"), s.each(function() {
                    e(this).offset().left + e(this).width() > n.outerWidth() && e(this).addClass("sub-menu-right")
                }), s.css({
                    display: "none"
                }), this.main_menu.find(".sf-menu > li.seocrawler-mega-menu .sf-mega").each(function() {
                    e(this).hasClass("sf-mega-full") || (e(this).css({
                        display: "block"
                    }), e(this).css({
                        right: "",
                        "margin-left": -(e(this).width() - e(this).parent().outerWidth()) / 2
                    }), e(this).offset().left + e(this).width() > e(window).width() && e(this).css({
                        right: 0,
                        "margin-left": ""
                    }), e(this).css({
                        display: "none"
                    }))
                })
            }
        }
    }, e.fn.seocrawler_mobile_menu = function(t) {
        var n = e(this).siblings(".seocrawler-mm-menu-button"),
            s = {
                navbar: {
                    title: '<span class="mmenu-custom-close" ></span>'
                },
                extensions: ["pagedim-black"]
            };
        if (e(this).find('a[href="#"]').each(function() {
                var t = e(this).html();
                e('<span class="seocrawler-mm-menu-blank" ></span>').html(t).insertBefore(e(this)), e(this).remove()
            }), e(this).attr("data-slide")) {
            var i = "seocrawler-mmenu-" + e(this).attr("data-slide");
            e("html").addClass(i), s.offCanvas = {
                position: e(this).attr("data-slide")
            }
        }
        e(this).mmenu(s, {
            offCanvas: {
                pageNodetype: ".seocrawler-body-outer-wrapper"
            }
        });
        var a = e(this).data("mmenu");
        e(this).find("a").not(".mm-next, .mm-prev").on("click", function() {
            a.close()
        }), e(this).find(".mmenu-custom-close").on("click", function() {
            a.close()
        }), a.bind("open", function(e) {
            n.addClass("seocrawler-active")
        }), a.bind("close", function(e) {
            n.removeClass("seocrawler-active")
        })
    };
    var s = function(e) {
        this.menu = e, this.menu_button = e.children(".seocrawler-overlay-menu-icon"), this.menu_content = e.children(".seocrawler-overlay-menu-content"), this.menu_close = this.menu_content.children(".seocrawler-overlay-menu-close"), this.init()
    };
    s.prototype = {
        init: function() {
            var t = this,
                n = 0;
            t.menu_content.appendTo("body"), t.menu_content.find("ul.menu > li").each(function() {
                e(this).css("transition-delay", 150 * n + "ms"), n++
            }), t.menu_button.on("click", function() {
                return e(this).addClass("seocrawler-active"), t.menu_content.fadeIn(200, function() {
                    e(this).addClass("seocrawler-active")
                }), !1
            }), t.menu_close.on("click", function() {
                return t.menu_button.removeClass("seocrawler-active"), t.menu_content.fadeOut(400, function() {
                    e(this).removeClass("seocrawler-active")
                }), t.menu_content.find(".sub-menu").slideUp(200).removeClass("seocrawler-active"), !1
            }), t.menu_content.find("a").on("click", function(n) {
                var s = e(this).siblings(".sub-menu");
                if (s.length > 0) {
                    if (!s.hasClass("seocrawler-active")) {
                        var i = s.closest("li").siblings().find(".sub-menu.seocrawler-active");
                        return i.length > 0 ? (i.removeClass("seocrawler-active").slideUp(150), s.delay(150).slideDown(400, "easeOutQuart").addClass("seocrawler-active")) : s.slideDown(400, "easeOutQuart").addClass("seocrawler-active"), e(this).addClass("seocrawler-no-preload"), !1
                    }
                    e(this).removeClass("seocrawler-no-preload")
                } else t.menu_close.trigger("click")
            })
        }
    };
    var i = function(e) {
        0 != e.length && (this.prev_scroll = 0, this.side_nav = e, this.side_nav_content = e.children(), this.init())
    };
    i.prototype = {
        init: function() {
            var n = this;
            n.init_nav_bar_element(), e(window).resize(function() {
                n.init_nav_bar_element()
            }), e(window).scroll(function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t && n.side_nav.hasClass("seocrawler-allow-slide")) {
                    var s = parseInt(e("html").css("margin-top")),
                        i = e(window).scrollTop() > n.prev_scroll;
                    if (n.prev_scroll = e(window).scrollTop(), i) n.side_nav.hasClass("seocrawler-fix-bottom") || (n.side_nav.hasClass("seocrawler-fix-top") ? (n.side_nav.css("top", n.side_nav.offset().top), n.side_nav.removeClass("seocrawler-fix-top")) : e(window).height() + e(window).scrollTop() > n.side_nav_content.offset().top + n.side_nav_content.outerHeight() && (n.side_nav.hasClass("seocrawler-fix-bottom") || (n.side_nav.addClass("seocrawler-fix-bottom"), n.side_nav.css("top", ""))));
                    else if (!n.side_nav.hasClass("seocrawler-fix-top"))
                        if (n.side_nav.hasClass("seocrawler-fix-bottom")) {
                            var a = e(window).scrollTop() + (e(window).height() - s) - n.side_nav_content.outerHeight();
                            n.side_nav.css("top", a), n.side_nav.removeClass("seocrawler-fix-bottom")
                        } else e(window).scrollTop() + s < n.side_nav_content.offset().top && (n.side_nav.hasClass("seocrawler-fix-top") || (n.side_nav.addClass("seocrawler-fix-top"), n.side_nav.css("top", "")))
                }
            })
        },
        init_nav_bar_element: function() {
            if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                var n = this,
                    s = n.side_nav_content.children(".seocrawler-pos-middle").addClass("seocrawler-active"),
                    i = n.side_nav_content.children(".seocrawler-pos-bottom").addClass("seocrawler-active");
                n.side_nav_content.children(".seocrawler-pre-spaces").remove(), e(window).height() < n.side_nav_content.height() ? n.side_nav.addClass("seocrawler-allow-slide") : (n.side_nav.removeClass("seocrawler-allow-slide seocrawler-fix-top seocrawler-fix-bottom").css("top", ""), n.side_nav.hasClass("seocrawler-style-middle") && s.each(function() {
                    var t = parseInt(e(this).css("padding-top")),
                        s = (n.side_nav.height() - (n.side_nav_content.height() - t)) / 2 - t;
                    s > 0 && e('<div class="seocrawler-pre-spaces" ></div>').css("height", s).insertBefore(e(this))
                }), i.each(function() {
                    var t = n.side_nav.height() - n.side_nav_content.height();
                    t > 0 && e('<div class="seocrawler-pre-spaces" ></div>').css("height", t).insertBefore(e(this))
                }))
            }
        }
    };
    var a = function() {
        this.anchor_link = e('a[href*="#"]').not('[href="#"]').filter(function() {
            return !(e(this).is(".seocrawler-mm-menu-button, .mm-next, .mm-prev, .mm-title") || e(this).is(".fbx-btn-transition") || e(this).parent(".description_tab, .reviews_tab").length || e(this).closest(".woocommerce").length)
        }), this.anchor_link.length && (this.menu_anchor = e("#seocrawler-main-menu, #seocrawler-bullet-anchor"), this.home_anchor = this.menu_anchor.find("ul.sf-menu > li.current-menu-item > a, ul.sf-menu > li.current-menu-ancestor > a, .seocrawler-bullet-anchor-link.current-menu-item"), this.init())
    };
    a.prototype = {
        init: function() {
            var t = this;
            t.animate_anchor(), t.scroll_section(), t.menu_anchor.filter("#seocrawler-bullet-anchor").each(function() {
                e(this).css("margin-top", -t.menu_anchor.height() / 2).addClass("seocrawler-init")
            });
            var n = window.location.hash;
            n && setTimeout(function() {
                t.menu_anchor.find('a[href*="' + n + '"]'), t.scroll_to(n, !1, 300)
            }, 500)
        },
        animate_anchor: function() {
            var t = this;
            t.home_anchor.on("click", function() {
                if (window.location.href == this.href) return e("html, body").animate({
                    scrollTop: 0
                }, {
                    duration: 1500,
                    easing: "easeOutQuart"
                }), !1
            }), t.anchor_link.on("click", function() {
                if (location.hostname == this.hostname && location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "")) return t.scroll_to(this.hash, !0)
            })
        },
        scroll_to: function(t, n, s) {
            if ("#seocrawler-top-anchor" == t) a = 0;
            else {
                var i = e(t);
                if (i.length) var a = i.offset().top
            }
            return void 0 !== a ? (a -= parseInt(e("html").css("margin-top")), void 0 !== window.seocrawler_anchor_offset && (a -= parseInt(window.seocrawler_anchor_offset)), a < 0 && (a = 0), e("html, body").animate({
                scrollTop: a
            }, {
                duration: 1500,
                easing: "easeOutQuart",
                queue: !1
            }), !1) : n ? (window.location.href = seocrawler_script_core.home_url + t, !1) : void 0
        },
        scroll_section: function() {
            var n = this,
                s = this.menu_anchor.find('a[href*="#"]').not('[href="#"]');
            if (s.length) {
                var i = e("#seocrawler-page-wrapper"),
                    a = i.find("div[id], section[id]");
                a.length && (s.each(function() {
                    0 == e(this).closest(".sub-menu").length && e(this.hash).length && e(this).attr("data-anchor", this.hash)
                }), e(window).scroll(function() {
                    if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t)
                        if (n.home_anchor.length && e(window).scrollTop() < i.offset().top) n.home_anchor.each(function() {
                            e(this).hasClass("seocrawler-bullet-anchor-link") ? (e(this).addClass("current-menu-item").siblings().removeClass("current-menu-item"), e(this).parent(".seocrawler-bullet-anchor").attr("data-anchor-section", "seocrawler-home")) : e(this).parent(".current-menu-item, .current-menu-ancestor").length || e(this).parent().addClass("current-menu-item").siblings().removeClass("current-menu-item current-menu-ancestor")
                        });
                        else {
                            var o = e(window).scrollTop() + e(window).height() / 2;
                            a.each(function() {
                                if ("none" != e(this).css("display")) {
                                    var t = e(this).offset().top;
                                    if (o > t && o < t + e(this).outerHeight()) {
                                        var n = e(this).attr("id");
                                        return s.filter('[data-anchor="#' + n + '"]').each(function() {
                                            e(this).hasClass("seocrawler-bullet-anchor-link") ? (e(this).addClass("current-menu-item").siblings().removeClass("current-menu-item"), e(this).parent(".seocrawler-bullet-anchor").attr("data-anchor-section", n)) : e(this).parent("li.menu-item").length && !e(this).parent("li.menu-item").is(".current-menu-item, .current-menu-ancestor") && e(this).parent("li.menu-item").addClass("current-menu-item").siblings().removeClass("current-menu-item current-menu-ancestor")
                                        }), !1
                                    }
                                }
                            })
                        }
                }))
            }
        }
    };
    var o = function() {
        this.sticky_nav = e(".seocrawler-with-sticky-navigation .seocrawler-sticky-navigation"), this.mobile_menu = e("#seocrawler-mobile-header"), this.sticky_nav.length ? this.init() : (this.style_mobile_slide(), e(window).trigger("seocrawler-set-sticky-mobile-navigation"))
    };
    o.prototype = {
        init: function() {
            var t = this;
            t.sticky_nav.hasClass("seocrawler-style-fixed") ? t.style_fixed() : t.sticky_nav.hasClass("seocrawler-style-slide") && t.style_slide(), t.style_mobile_slide(), t.sticky_nav.hasClass("seocrawler-sticky-navigation-height") ? (window.seocrawler_anchor_offset = t.sticky_nav.outerHeight(), e(window).resize(function() {
                window.seocrawler_anchor_offset = t.sticky_nav.outerHeight()
            })) : t.sticky_nav.attr("data-navigation-offset") ? window.seocrawler_anchor_offset = parseInt(t.sticky_nav.attr("data-navigation-offset")) : window.seocrawler_anchor_offset = 75, e(window).trigger("seocrawler-set-sticky-navigation"), e(window).trigger("seocrawler-set-sticky-mobile-navigation")
        },
        style_fixed: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-menu-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-navigation", function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                    var i = parseInt(e("html").css("margin-top"));
                    n.sticky_nav.hasClass("seocrawler-fixed-navigation") ? e(window).scrollTop() + i <= s.offset().top && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || n.sticky_nav.height(s.height()), n.sticky_nav.insertBefore(s), n.sticky_nav.removeClass("seocrawler-fixed-navigation"), s.remove(), setTimeout(function() {
                        n.sticky_nav.removeClass("seocrawler-animate-fixed-navigation")
                    }, 10), setTimeout(function() {
                        n.sticky_nav.css("height", ""), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                    }, 200)) : e(window).scrollTop() + i > n.sticky_nav.offset().top && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || s.height(n.sticky_nav.outerHeight()), s.insertAfter(n.sticky_nav), e("body").append(n.sticky_nav), n.sticky_nav.addClass("seocrawler-fixed-navigation"), setTimeout(function() {
                        n.sticky_nav.addClass("seocrawler-animate-fixed-navigation")
                    }, 10), setTimeout(function() {
                        n.sticky_nav.css("height", ""), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                    }, 200))
                }
            })
        },
        style_slide: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-menu-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-navigation", function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                    var i = parseInt(e("html").css("margin-top"));
                    if (n.sticky_nav.hasClass("seocrawler-fixed-navigation")) {
                        if (e(window).scrollTop() + i <= s.offset().top + s.height() + 200) {
                            var a = n.sticky_nav.clone();
                            a.insertAfter(n.sticky_nav), a.slideUp(200, function() {
                                e(this).remove()
                            }), n.sticky_nav.insertBefore(s), s.remove(), n.sticky_nav.removeClass("seocrawler-fixed-navigation seocrawler-animate-fixed-navigation"), n.sticky_nav.css("display", "block"), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                        }
                    } else e(window).scrollTop() + i > n.sticky_nav.offset().top + n.sticky_nav.outerHeight() + 200 && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || s.height(n.sticky_nav.outerHeight()), s.insertAfter(n.sticky_nav), n.sticky_nav.css("display", "none"), e("body").append(n.sticky_nav), n.sticky_nav.addClass("seocrawler-fixed-navigation seocrawler-animate-fixed-navigation"), n.sticky_nav.slideDown(200), e(window).trigger("seocrawler-navigation-slider-bar-animate"))
                }
            })
        },
        style_mobile_slide: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-mobile-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-mobile-navigation", function() {
                if ("mobile-landscape" == t || "mobile-portrait" == t || "tablet" == t) {
                    var i = parseInt(e("html").css("margin-top"));
                    if (n.mobile_menu.hasClass("seocrawler-fixed-navigation")) {
                        if (e(window).scrollTop() + i <= s.offset().top + s.height() + 200) {
                            var a = n.mobile_menu.clone();
                            a.insertAfter(n.mobile_menu), a.slideUp(200, function() {
                                e(this).remove()
                            }), n.mobile_menu.insertBefore(s), s.remove(), n.mobile_menu.removeClass("seocrawler-fixed-navigation"), n.mobile_menu.css("display", "block")
                        }
                    } else e(window).scrollTop() + i > n.mobile_menu.offset().top + n.mobile_menu.outerHeight() + 200 && (s.height(n.mobile_menu.outerHeight()).insertAfter(n.mobile_menu), e("body").append(n.mobile_menu), n.mobile_menu.addClass("seocrawler-fixed-navigation"), n.mobile_menu.css("display", "none").slideDown(200))
                }
            })
        }
    };
    var r = function() {
        this.heading_font = e("h1, h2, h3, h4, h5, h6"), this.init()
    };
    r.prototype = {
        init: function() {
            var t, n, s, i = this;
            i.resize(), e(window).on("resize", (t = function() {
                i.resize()
            }, n = 100, function() {
                var e = this,
                    i = arguments;
                s || (s = setTimeout(function() {
                    t.apply(e, i), s = null
                }, n))
            }))
        },
        resize: function() {
            "mobile-landscape" == t || "mobile-portrait" == t ? this.heading_font.each(function() {
                parseInt(e(this).css("font-size")) > 40 && (e(this).attr("data-orig-font") || e(this).attr("data-orig-font", e(this).css("font-size")), e(this).css("font-size", "40px"))
            }) : this.heading_font.filter("[data-orig-font]").each(function() {
                e(this).css("font-size", e(this).attr("data-orig-font"))
            })
        }
    }, e(document).ready(function() {
        new r, e("#seocrawler-main-menu, #seocrawler-right-menu, #seocrawler-mobile-menu").each(function() {
            e(this).hasClass("seocrawler-overlay-menu") ? new s(e(this)) : e(this).hasClass("seocrawler-mm-menu-wrap") ? e(this).seocrawler_mobile_menu() : new n(e(this))
        }), e("#seocrawler-top-search, #seocrawler-mobile-top-search").each(function() {
            var t = e(this).siblings(".seocrawler-top-search-wrap");
            t.appendTo("body"), e(this).on("click", function() {
                t.fadeIn(200, function() {
                    e(this).addClass("seocrawler-active")
                })
            }), t.find(".seocrawler-top-search-close").on("click", function() {
                t.fadeOut(200, function() {
                    e(this).addClass("seocrawler-active")
                })
            }), t.find(".search-submit").on("click", function() {
                if (0 == t.find(".search-field").val().length) return !1
            })
        }), e("#seocrawler-main-menu-cart, #seocrawler-mobile-menu-cart").each(function() {
            e(this).hover(function() {
                e(this).addClass("seocrawler-active seocrawler-animating")
            }, function() {
                var t = e(this);
                t.removeClass("seocrawler-active"), setTimeout(function() {
                    t.removeClass("seocrawler-animating")
                }, 400)
            })
        }), e(".seocrawler-header-boxed-wrap, .seocrawler-header-background-transparent, .seocrawler-navigation-bar-wrap.seocrawler-style-transparent").each(function() {
            var t = e(this),
                n = e(".seocrawler-header-transparent-substitute");
            n.height(t.outerHeight()), e(window).on("load resize", function() {
                n.height(t.outerHeight())
            })
        }), e("body.error404, body.search-no-results").each(function() {
            var t = e(this).find("#seocrawler-full-no-header-wrap"),
                n = parseInt(e(this).children(".seocrawler-body-outer-wrapper").children(".seocrawler-body-wrapper").css("margin-bottom")),
                s = (e(window).height() - t.offset().top - t.outerHeight() - n) / 2;
            s > 0 && t.css({
                "padding-top": s,
                "padding-bottom": s
            }), e(window).on("load resize", function() {
                t.css({
                    "padding-top": 0,
                    "padding-bottom": 0
                }), (s = (e(window).height() - t.offset().top - t.outerHeight() - n) / 2) > 0 && t.css({
                    "padding-top": s,
                    "padding-bottom": s
                })
            })
        });
        var t = e("#seocrawler-footer-back-to-top-button");
        t.length && e(window).on("scroll", function() {
            e(window).scrollTop() > 300 ? t.addClass("seocrawler-scrolled") : t.removeClass("seocrawler-scrolled")
        }), e("body").children("#seocrawler-page-preload").each(function() {
            var t = e(this),
                n = parseInt(t.attr("data-animation-time"));
            e("a[href]").not('[href^="#"], [target="_blank"], .gdlr-core-js, .strip').on("click", function(s) {
                1 != s.which || e(this).hasClass("seocrawler-no-preload") || window.location.href != this.href && t.addClass("seocrawler-out").fadeIn(n)
            }), e(window).load(function() {
                t.fadeOut(n)
            })
        })
    }), e(window).bind("pageshow", function(t) {
        t.originalEvent.persisted && e("body").children("#seocrawler-page-preload").each(function() {
            e(this).fadeOut(400)
        })
    }), e(window).on("beforeunload", function() {
        e("body").children("#seocrawler-page-preload").each(function() {
            e(this).fadeOut(400)
        })
    }), e(window).load(function() {
        e("#seocrawler-fixed-footer").each(function() {
            var t = e(this),
                n = e('<div class="seocrawler-fixed-footer-placeholder" ></div>');
            n.insertBefore(t), n.height(t.outerHeight()), e("body").css("min-height", e(window).height() - parseInt(e("html").css("margin-top"))), e(window).resize(function() {
                n.height(t.outerHeight()), e("body").css("min-height", e(window).height() - parseInt(e("html").css("margin-top")))
            })
        }), new i(e("#seocrawler-header-side-nav")), new o, new a
    })
}(jQuery),
function(e) {
    var t, n, s, i, a = "mmenu";
    e[a] && e[a].version > "5.6.1" || (e[a] = function(e, t, n) {
        this.$menu = e, this._api = ["bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
        var s = this.$pnls.children();
        return this._initAddons(), this.init(s), "function" == typeof this.___debug && this.___debug(), this
    }, e[a].version = "5.6.1", e[a].addons = {}, e[a].uniqueId = 0, e[a].defaults = {
        extensions: [],
        navbar: {
            add: !0,
            title: "Menu",
            titleLink: "panel"
        },
        onClick: {
            setSelected: !0
        },
        slidingSubmenus: !0
    }, e[a].configuration = {
        classNames: {
            divider: "Divider",
            inset: "Inset",
            panel: "Panel",
            selected: "Selected",
            spacer: "Spacer",
            vertical: "Vertical"
        },
        clone: !1,
        openingInterval: 25,
        panelNodetype: "ul, ol, div",
        transitionDuration: 400
    }, e[a].prototype = {
        init: function(e) {
            e = e.not("." + t.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update")
        },
        update: function() {
            this.trigger("update")
        },
        setSelected: function(e) {
            this.$menu.find("." + t.listview).children().removeClass(t.selected), e.addClass(t.selected), this.trigger("setSelected", e)
        },
        openPanel: function(n) {
            var s = n.parent(),
                i = this;
            if (s.hasClass(t.vertical)) {
                var o = s.parents("." + t.subopened);
                if (o.length) return void this.openPanel(o.first());
                s.addClass(t.opened), this.trigger("openPanel", n), this.trigger("openingPanel", n), this.trigger("openedPanel", n)
            } else {
                if (n.hasClass(t.current)) return;
                var r = this.$pnls.children("." + t.panel),
                    l = r.filter("." + t.current);
                r.removeClass(t.highest).removeClass(t.current).not(n).not(l).not("." + t.vertical).addClass(t.hidden), e[a].support.csstransitions || l.addClass(t.hidden), n.hasClass(t.opened) ? n.nextAll("." + t.opened).addClass(t.highest).removeClass(t.opened).removeClass(t.subopened) : (n.addClass(t.highest), l.addClass(t.subopened)), n.removeClass(t.hidden).addClass(t.current), i.trigger("openPanel", n), setTimeout(function() {
                    n.removeClass(t.subopened).addClass(t.opened), i.trigger("openingPanel", n), i.__transitionend(n, function() {
                        i.trigger("openedPanel", n)
                    }, i.conf.transitionDuration)
                }, this.conf.openingInterval)
            }
        },
        closePanel: function(e) {
            var n = e.parent();
            n.hasClass(t.vertical) && (n.removeClass(t.opened), this.trigger("closePanel", e), this.trigger("closingPanel", e), this.trigger("closedPanel", e))
        },
        closeAllPanels: function() {
            this.$menu.find("." + t.listview).children().removeClass(t.selected).filter("." + t.vertical).removeClass(t.opened);
            var e = this.$pnls.children("." + t.panel).first();
            this.$pnls.children("." + t.panel).not(e).removeClass(t.subopened).removeClass(t.opened).removeClass(t.current).removeClass(t.highest).addClass(t.hidden), this.openPanel(e)
        },
        togglePanel: function(e) {
            var n = e.parent();
            n.hasClass(t.vertical) && this[n.hasClass(t.opened) ? "closePanel" : "openPanel"](e)
        },
        getInstance: function() {
            return this
        },
        bind: function(e, t) {
            this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
        },
        trigger: function() {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (this.cbck[t])
                for (var n = 0, s = this.cbck[t].length; s > n; n++) this.cbck[t][n].apply(this, e)
        },
        _initMenu: function() {
            this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                e(this).attr("id", t.mm(e(this).attr("id")))
            })), this.$menu.contents().each(function() {
                3 == e(this)[0].nodeType && e(this).remove()
            }), this.$pnls = e('<div class="' + t.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(t.wrapper);
            var n = [t.menu];
            this.opts.slidingSubmenus || n.push(t.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && n.push(this.opts.extensions), this.$menu.addClass(n.join(" "))
        },
        _initPanels: function(s) {
            var i = this,
                a = this.__findAddBack(s, "ul, ol");
            this.__refactorClass(a, this.conf.classNames.inset, "inset").addClass(t.nolistview + " " + t.nopanel), a.not("." + t.nolistview).addClass(t.listview);
            var o = this.__findAddBack(s, "." + t.listview).children();
            this.__refactorClass(o, this.conf.classNames.selected, "selected"), this.__refactorClass(o, this.conf.classNames.divider, "divider"), this.__refactorClass(o, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(s, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
            var r = e(),
                l = s.add(s.find("." + t.panel)).add(this.__findAddBack(s, "." + t.listview).children().children(this.conf.panelNodetype)).not("." + t.nopanel);
            this.__refactorClass(l, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || l.addClass(t.vertical), l.each(function() {
                var n = e(this),
                    s = n;
                n.is("ul, ol") ? (n.wrap('<div class="' + t.panel + '" />'), s = n.parent()) : s.addClass(t.panel);
                var a = n.attr("id");
                n.removeAttr("id"), s.attr("id", a || i.__getUniqueId()), n.hasClass(t.vertical) && (n.removeClass(i.conf.classNames.vertical), s.add(s.parent()).addClass(t.vertical)), r = r.add(s)
            });
            var c = e("." + t.panel, this.$menu);
            r.each(function(s) {
                var a, o, r = e(this),
                    l = r.parent(),
                    c = l.children("a, span").first();
                if (l.is("." + t.panels) || (l.data(n.sub, r), r.data(n.parent, l)), l.children("." + t.next).length || l.parent().is("." + t.listview) && (a = r.attr("id"), o = e('<a class="' + t.next + '" href="#' + a + '" data-target="#' + a + '" />').insertBefore(c), c.is("span") && o.addClass(t.fullsubopen)), !r.children("." + t.navbar).length && !l.hasClass(t.vertical)) {
                    l.parent().is("." + t.listview) ? l = l.closest("." + t.panel) : l = (c = l.closest("." + t.panel).find('a[href="#' + r.attr("id") + '"]').first()).closest("." + t.panel);
                    var d = e('<div class="' + t.navbar + '" />');
                    if (l.length) {
                        switch (a = l.attr("id"), i.opts.navbar.titleLink) {
                            case "anchor":
                                _url = c.attr("href");
                                break;
                            case "panel":
                            case "parent":
                                _url = "#" + a;
                                break;
                            default:
                                _url = !1
                        }
                        d.append('<a class="' + t.btn + " " + t.prev + '" href="#' + a + '" data-target="#' + a + '" />').append(e('<a class="' + t.title + '"' + (_url ? ' href="' + _url + '"' : "") + " />").text(c.text())).prependTo(r), i.opts.navbar.add && r.addClass(t.hasnavbar)
                    } else i.opts.navbar.title && (d.append('<a class="' + t.title + '">' + i.opts.navbar.title + "</a>").prependTo(r), i.opts.navbar.add && r.addClass(t.hasnavbar))
                }
            });
            var d = this.__findAddBack(s, "." + t.listview).children("." + t.selected).removeClass(t.selected).last().addClass(t.selected);
            d.add(d.parentsUntil("." + t.menu, "li")).filter("." + t.vertical).addClass(t.opened).end().each(function() {
                e(this).parentsUntil("." + t.menu, "." + t.panel).not("." + t.vertical).first().addClass(t.opened).parentsUntil("." + t.menu, "." + t.panel).not("." + t.vertical).first().addClass(t.opened).addClass(t.subopened)
            }), d.children("." + t.panel).not("." + t.vertical).addClass(t.opened).parentsUntil("." + t.menu, "." + t.panel).not("." + t.vertical).first().addClass(t.opened).addClass(t.subopened);
            var h = c.filter("." + t.opened);
            return h.length || (h = r.first()), h.addClass(t.opened).last().addClass(t.current), r.not("." + t.vertical).not(h.last()).addClass(t.hidden).end().filter(function() {
                return !e(this).parent().hasClass(t.panels)
            }).appendTo(this.$pnls), r
        },
        _initAnchors: function() {
            var n = this;
            i.$body.on(s.click + "-oncanvas", "a[href]", function(s) {
                var i = e(this),
                    o = !1,
                    r = n.$menu.find(i).length;
                for (var l in e[a].addons)
                    if (e[a].addons[l].clickAnchor.call(n, i, r)) {
                        o = !0;
                        break
                    }
                var c = i.attr("href");
                if (!o && r && c.length > 1 && "#" == c.slice(0, 1)) try {
                    var d = e(c, n.$menu);
                    d.is("." + t.panel) && (o = !0, n[i.parent().hasClass(t.vertical) ? "togglePanel" : "openPanel"](d))
                } catch (e) {}
                if (o && s.preventDefault(), !o && r && i.is("." + t.listview + " > li > a") && !i.is('[rel="external"]') && !i.is('[target="_blank"]')) {
                    n.__valueOrFn(n.opts.onClick.setSelected, i) && n.setSelected(e(s.target).parent());
                    var h = n.__valueOrFn(n.opts.onClick.preventDefault, i, "#" == c.slice(0, 1));
                    h && s.preventDefault(), n.__valueOrFn(n.opts.onClick.close, i, h) && n.close()
                }
            })
        },
        _initAddons: function() {
            var t;
            for (t in e[a].addons) e[a].addons[t].add.call(this), e[a].addons[t].add = function() {};
            for (t in e[a].addons) e[a].addons[t].setup.call(this)
        },
        _getOriginalMenuId: function() {
            var e = this.$menu.attr("id");
            return e && e.length && this.conf.clone && (e = t.umm(e)), e
        },
        __api: function() {
            var t = this,
                n = {};
            return e.each(this._api, function(e) {
                var s = this;
                n[s] = function() {
                    var e = t[s].apply(t, arguments);
                    return void 0 === e ? n : e
                }
            }), n
        },
        __valueOrFn: function(e, t, n) {
            return "function" == typeof e ? e.call(t[0]) : void 0 === e && void 0 !== n ? n : e
        },
        __refactorClass: function(e, n, s) {
            return e.filter("." + n).removeClass(n).addClass(t[s])
        },
        __findAddBack: function(e, t) {
            return e.find(t).add(e.filter(t))
        },
        __filterListItems: function(e) {
            return e.not("." + t.divider).not("." + t.hidden)
        },
        __transitionend: function(e, t, n) {
            var i = !1,
                a = function() {
                    i || t.call(e[0]), i = !0
                };
            e.one(s.transitionend, a), e.one(s.webkitTransitionEnd, a), setTimeout(a, 1.1 * n)
        },
        __getUniqueId: function() {
            return t.mm(e[a].uniqueId++)
        }
    }, e.fn[a] = function(o, r) {
        return e[a].glbl || (i = {
            $wndw: e(window),
            $docu: e(document),
            $html: e("html"),
            $body: e("body")
        }, t = {}, n = {}, s = {}, e.each([t, n, s], function(e, t) {
            t.add = function(e) {
                for (var n = 0, s = (e = e.split(" ")).length; s > n; n++) t[e[n]] = t.mm(e[n])
            }
        }), t.mm = function(e) {
            return "mm-" + e
        }, t.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), t.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, n.mm = function(e) {
            return "mm-" + e
        }, n.add("parent sub"), s.mm = function(e) {
            return e + ".mm"
        }, s.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"), e[a]._c = t, e[a]._d = n, e[a]._e = s, e[a].glbl = i), o = e.extend(!0, {}, e[a].defaults, o), r = e.extend(!0, {}, e[a].configuration, r), this.each(function() {
            var t = e(this);
            if (!t.data(a)) {
                var n = new e[a](t, o, r);
                n.$menu.data(a, n.__api())
            }
        })
    }, e[a].support = {
        touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
        csstransitions: function() {
            if ("undefined" != typeof Modernizr && void 0 !== Modernizr.csstransitions) return Modernizr.csstransitions;
            var e = (document.body || document.documentElement).style,
                t = "transition";
            if ("string" == typeof e[t]) return !0;
            var n = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
            t = t.charAt(0).toUpperCase() + t.substr(1);
            for (var s = 0; s < n.length; s++)
                if ("string" == typeof e[n[s] + t]) return !0;
            return !1
        }()
    })
}(jQuery),
function(e) {
    var t, n, s, i, a = "mmenu",
        o = "offCanvas";
    e[a].addons[o] = {
        setup: function() {
            if (this.opts[o]) {
                var n = this.opts[o],
                    s = this.conf[o];
                i = e[a].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), ("top" == n.position || "bottom" == n.position) && (n.zposition = "front"), "string" != typeof s.pageSelector && (s.pageSelector = "> " + s.pageNodetype), i.$allMenus = (i.$allMenus || e()).add(this.$menu), this.vars.opened = !1;
                var r = [t.offcanvas];
                "left" != n.position && r.push(t.mm(n.position)), "back" != n.zposition && r.push(t.mm(n.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(t.wrapper), this.setPage(i.$page), this._initBlocker(), this["_initWindow_" + o](), this.$menu[s.menuInjectMethod + "To"](s.menuWrapperSelector);
                var l = window.location.hash;
                if (l) {
                    var c = this._getOriginalMenuId();
                    c && c == l.slice(1) && this.open()
                }
            }
        },
        add: function() {
            t = e[a]._c, n = e[a]._d, s = e[a]._e, t.add("offcanvas slideout blocking modal background opening blocker page"), n.add("style"), s.add("resize")
        },
        clickAnchor: function(e, t) {
            if (!this.opts[o]) return !1;
            var n = this._getOriginalMenuId();
            return n && e.is('[href="#' + n + '"]') ? (this.open(), !0) : i.$page ? !(!(n = i.$page.first().attr("id")) || !e.is('[href="#' + n + '"]') || (this.close(), 0)) : void 0
        }
    }, e[a].defaults[o] = {
        position: "left",
        zposition: "back",
        blockUI: !0,
        moveBackground: !0
    }, e[a].configuration[o] = {
        pageNodetype: "div",
        pageSelector: null,
        noPageSelector: [],
        wrapPageIfNeeded: !0,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[a].prototype.open = function() {
        if (!this.vars.opened) {
            var e = this;
            this._openSetup(), setTimeout(function() {
                e._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, e[a].prototype._openSetup = function() {
        var a = this,
            r = this.opts[o];
        this.closeAllOthers(), i.$page.each(function() {
            e(this).data(n.style, e(this).attr("style") || "")
        }), i.$wndw.trigger(s.resize + "-" + o, [!0]);
        var l = [t.opened];
        r.blockUI && l.push(t.blocking), "modal" == r.blockUI && l.push(t.modal), r.moveBackground && l.push(t.background), "left" != r.position && l.push(t.mm(this.opts[o].position)), "back" != r.zposition && l.push(t.mm(this.opts[o].zposition)), this.opts.extensions && l.push(this.opts.extensions), i.$html.addClass(l.join(" ")), setTimeout(function() {
            a.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(t.current + " " + t.opened)
    }, e[a].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(i.$page.first(), function() {
            e.trigger("opened")
        }, this.conf.transitionDuration), i.$html.addClass(t.opening), this.trigger("opening")
    }, e[a].prototype.close = function() {
        if (this.vars.opened) {
            var s = this;
            this.__transitionend(i.$page.first(), function() {
                s.$menu.removeClass(t.current).removeClass(t.opened), i.$html.removeClass(t.opened).removeClass(t.blocking).removeClass(t.modal).removeClass(t.background).removeClass(t.mm(s.opts[o].position)).removeClass(t.mm(s.opts[o].zposition)), s.opts.extensions && i.$html.removeClass(s.opts.extensions), i.$page.each(function() {
                    e(this).attr("style", e(this).data(n.style))
                }), s.vars.opened = !1, s.trigger("closed")
            }, this.conf.transitionDuration), i.$html.removeClass(t.opening), this.trigger("close"), this.trigger("closing")
        }
    }, e[a].prototype.closeAllOthers = function() {
        i.$allMenus.not(this.$menu).each(function() {
            var t = e(this).data(a);
            t && t.close && t.close()
        })
    }, e[a].prototype.setPage = function(n) {
        var s = this,
            a = this.conf[o];
        n && n.length || (n = i.$body.find(a.pageSelector), a.noPageSelector.length && (n = n.not(a.noPageSelector.join(", "))), n.length > 1 && a.wrapPageIfNeeded && (n = n.wrapAll("<" + this.conf[o].pageNodetype + " />").parent())), n.each(function() {
            e(this).attr("id", e(this).attr("id") || s.__getUniqueId())
        }), n.addClass(t.page + " " + t.slideout), i.$page = n, this.trigger("setPage", n)
    }, e[a].prototype["_initWindow_" + o] = function() {
        i.$wndw.off(s.keydown + "-" + o).on(s.keydown + "-" + o, function(e) {
            return i.$html.hasClass(t.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var e = 0;
        i.$wndw.off(s.resize + "-" + o).on(s.resize + "-" + o, function(n, s) {
            if (1 == i.$page.length && (s || i.$html.hasClass(t.opened))) {
                var a = i.$wndw.height();
                (s || a != e) && (e = a, i.$page.css("minHeight", a))
            }
        })
    }, e[a].prototype._initBlocker = function() {
        var n = this;
        this.opts[o].blockUI && (i.$blck || (i.$blck = e('<div id="' + t.blocker + '" class="' + t.slideout + '" />')), i.$blck.appendTo(i.$body).off(s.touchstart + "-" + o + " " + s.touchmove + "-" + o).on(s.touchstart + "-" + o + " " + s.touchmove + "-" + o, function(e) {
            e.preventDefault(), e.stopPropagation(), i.$blck.trigger(s.mousedown + "-" + o)
        }).off(s.mousedown + "-" + o).on(s.mousedown + "-" + o, function(e) {
            e.preventDefault(), i.$html.hasClass(t.modal) || (n.closeAllOthers(), n.close())
        }))
    }
}(jQuery),
function(e) {
    var t, n, s, i = "mmenu",
        a = "scrollBugFix";
    e[i].addons[a] = {
        setup: function() {
            var o = this,
                r = this.opts[a];
            if (this.conf[a], s = e[i].glbl, e[i].support.touch && this.opts.offCanvas && this.opts.offCanvas.modal && ("boolean" == typeof r && (r = {
                    fix: r
                }), "object" != typeof r && (r = {}), (r = this.opts[a] = e.extend(!0, {}, e[i].defaults[a], r)).fix)) {
                var l = this.$menu.attr("id"),
                    c = !1;
                this.bind("opening", function() {
                    this.$pnls.children("." + t.current).scrollTop(0)
                }), s.$docu.on(n.touchmove, function(e) {
                    o.vars.opened && e.preventDefault()
                }), s.$body.on(n.touchstart, "#" + l + "> ." + t.panels + "> ." + t.current, function(e) {
                    o.vars.opened && (c || (c = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), c = !1))
                }).on(n.touchmove, "#" + l + "> ." + t.panels + "> ." + t.current, function(t) {
                    o.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && t.stopPropagation()
                }), s.$wndw.on(n.orientationchange, function() {
                    o.$pnls.children("." + t.current).scrollTop(0).css({
                        "-webkit-overflow-scrolling": "auto"
                    }).css({
                        "-webkit-overflow-scrolling": "touch"
                    })
                })
            }
        },
        add: function() {
            t = e[i]._c, e[i]._d, n = e[i]._e
        },
        clickAnchor: function(e, t) {}
    }, e[i].defaults[a] = {
        fix: !0
    }
}(jQuery),
function(e, t) {
    "use strict";
    var n, s, i, a, o, r, l, c, d, h, u, p, f, m, v, w, g, _, b = (i = "sf-breadcrumb", a = "sf-js-enabled", o = "sf-with-ul", r = "sf-arrows", (s = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent)) && e("html").css("cursor", "pointer").on("click", e.noop), l = s, c = "behavior" in (n = document.documentElement.style) && "fill" in n && /iemobile/i.test(navigator.userAgent), d = !!t.PointerEvent, h = function(e, t) {
        var n = a;
        t.cssArrows && (n += " " + r), e.toggleClass(n)
    }, u = function(e) {
        e.children("a").toggleClass(o)
    }, p = function(e) {
        var t = e.css("ms-touch-action"),
            n = e.css("touch-action");
        n = "pan-y" === (n = n || t) ? "auto" : "pan-y", e.css({
            "ms-touch-action": n,
            "touch-action": n
        })
    }, f = function(t) {
        var n = e(this),
            s = _(n),
            i = n.siblings(t.data.popUpSelector);
        return !1 === s.onHandleTouch.call(i) ? this : void(i.length > 0 && i.is(":hidden") && (n.one("click.superfish", !1), "MSPointerDown" === t.type || "pointerdown" === t.type ? n.trigger("focus") : e.proxy(m, n.parent("li"))()))
    }, m = function() {
        var t = e(this),
            n = _(t);
        clearTimeout(n.sfTimer), t.siblings().superfish("hide").end().superfish("show")
    }, v = function() {
        var t = e(this),
            n = _(t);
        l ? e.proxy(w, t, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(e.proxy(w, t, n), n.delay))
    }, w = function(t) {
        t.retainPath = e.inArray(this[0], t.$path) > -1, this.superfish("hide"), this.parents("." + t.hoverClass).length || (t.onIdle.call(g(this)), t.$path.length && e.proxy(m, t.$path)())
    }, g = function(e) {
        return e.closest("." + a)
    }, _ = function(e) {
        return g(e).data("sf-options")
    }, {
        hide: function(t) {
            if (this.length) {
                var n = _(this);
                if (!n) return this;
                var s = !0 === n.retainPath ? n.$path : "",
                    i = this.find("li." + n.hoverClass).add(this).not(s).removeClass(n.hoverClass).children(n.popUpSelector),
                    a = n.speedOut;
                if (t && (i.show(), a = 0), n.retainPath = !1, !1 === n.onBeforeHide.call(i)) return this;
                i.stop(!0, !0).animate(n.animationOut, a, "easeOutQuad", function() {
                    var t = e(this);
                    n.onHide.call(t)
                })
            }
            return this
        },
        show: function() {
            var e = _(this);
            if (!e) return this;
            var t = this.addClass(e.hoverClass).children(e.popUpSelector);
            return !1 === e.onBeforeShow.call(t) ? this : (t.stop(!0, !0).animate(e.animation, e.speed, "easeOutQuad", function() {
                e.onShow.call(t)
            }), this)
        },
        destroy: function() {
            return this.each(function() {
                var t, n = e(this),
                    s = n.data("sf-options");
                return !!s && (t = n.find(s.popUpSelector).parent("li"), clearTimeout(s.sfTimer), h(n, s), u(t), p(n), n.off(".superfish").off(".hoverIntent"), t.children(s.popUpSelector).attr("style", function(e, t) {
                    return t.replace(/display[^;]+;?/g, "")
                }), s.$path.removeClass(s.hoverClass + " " + i).addClass(s.pathClass), n.find("." + s.hoverClass).removeClass(s.hoverClass), s.onDestroy.call(n), void n.removeData("sf-options"))
            })
        },
        init: function(t) {
            return this.each(function() {
                var n = e(this);
                if (n.data("sf-options")) return !1;
                var s, a = e.extend({}, e.fn.superfish.defaults, t),
                    o = n.find(a.popUpSelector).parent("li");
                a.$path = (s = a, n.find("li." + s.pathClass).slice(0, s.pathLevels).addClass(s.hoverClass + " " + i).filter(function() {
                        return e(this).children(s.popUpSelector).hide().show().length
                    }).removeClass(s.pathClass)), n.data("sf-options", a), h(n, a), u(o), p(n),
                    function(t, n) {
                        var s = "li:has(" + n.popUpSelector + ")";
                        e.fn.hoverIntent && !n.disableHI ? t.hoverIntent(m, v, s) : t.on("mouseenter.superfish", s, m).on("mouseleave.superfish", s, v);
                        var i = "MSPointerDown.superfish";
                        d && (i = "pointerdown.superfish"), l || (i += " touchend.superfish"), c && (i += " mousedown.superfish"), t.on("focusin.superfish", "li", m).on("focusout.superfish", "li", v).on(i, "a", n, f)
                    }(n, a), o.not("." + i).superfish("hide", !0), a.onInit.call(this)
            })
        }
    });
    e.fn.superfish = function(t, n) {
        return b[t] ? b[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.superfish") : b.init.apply(this, arguments)
    }, e.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop,
        onHandleTouch: e.noop
    }
}(jQuery, window);