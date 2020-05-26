/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=index.map
*/

require = function() {
    function e(r, t, n) {
        function o(i, f) {
            if (!t[i]) {
                if (!r[i]) {
                    var a = "function" == typeof require && require;
                    if (!f && a) return a(i, !0);
                    if (u) return u(i, !0);
                    var c = new Error("Cannot find module '" + i + "'");
                    throw c.code = "MODULE_NOT_FOUND",
                    c
                }
                var s = t[i] = {
                    exports: {}
                };
                r[i][0].call(s.exports,
                function(e) {
                    return o(r[i][1][e] || e)
                },
                s, s.exports, e, r, t, n)
            }
            return t[i].exports
        }
        for (var u = "function" == typeof require && require,
        i = 0; i < n.length; i++) o(n[i]);
        return o
    }
    return e
} ()({
    49 : [function(e, r, t) {
        var n = $("#csrf").text();
        $.ajaxSettings.beforeSend = function(e, r) {
            e.setRequestHeader("X-Client", "javascript"),
            e.setRequestHeader("X-CSRF-Token", n)
        }
    },
    {}]
},
{},
[49]);;
require = function t(e, n, r) {
    function i(s, a) {
        if (!n[s]) {
            if (!e[s]) {
                var c = "function" == typeof require && require;
                if (!a && c) return c(s, !0);
                if (o) return o(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND",
                u
            }
            var l = n[s] = {
                exports: {}
            };
            e[s][0].call(l.exports,
            function(t) {
                var n = e[s][1][t];
                return i(n || t)
            },
            l, l.exports, t, e, n, r)
        }
        return n[s].exports
    }
    for (var o = "function" == typeof require && require,
    s = 0; s < r.length; s++) i(r[s]);
    return i
} ({
    42 : [function(t, e, n) {
        function r() {
            window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: "")),
            this.$container = $(".J-unitive-signup-form"),
            this.bindEvents()
        }
        var i = t("lodash.trim"),
        o = t("@sso/scripts/formchecker"),
        s = t("@sso/scripts/passwordstrength"),
        a = t("@sso/scripts/util"),
        c = t("@sso/scripts/constant"),
        u = t("@sso/scripts/email"),
        l = t("@sso/scripts/capture"),
        f = t("@sso/scripts/captcha");
        e.exports = r,
        r.prototype.bindEvents = function() {
            var t = this,
            e = t.$container;
            e.find(".sheet form").each(function() {
                var e = $(this),
                n = !!e.find(".J-mobile").length,
                r = e.find(".form-field").first();
                r.delegate(".f-text", "focus",
                function() {
                    r.find(".J-unitive-tip").hide()
                });
                var i = f("#" + (n ? "captcha-mobile": "captcha"), {
                    update: !1
                });
                l(e, ".J-fingerprint"),
                s(e.find(".J-pwd"), e.find(".pw-strength__bar"));
                var o = t.createFormChecker(e, i);
                if (n) t.bindMobileVerify(e, o, i);
                else {
                    u(e.find(".J-email"), "#signup-email-auto");
                    var a = $('[name="province"]'),
                    c = $('[name="city"]'),
                    d = $(".province-city-select").data("params");
                    a.on("change",
                    function(t) {
                        c.find("option").slice(1).remove();
                        var e = d.link[t.target.value],
                        n = 1 === e.length ? 'selected="selected"': "";
                        c.append($.map(e,
                        function(t) {
                            var e = d.def[t];
                            return '<option value="' + t + '"' + n + ">" + e + "</option>"
                        })),
                        window.setTimeout(function() {
                            var t = o.fields.city;
                            "-1" === c.val() && o.resetField(t),
                            o.checkField(t)
                        },
                        200)
                    })
                }
            }),
            e.delegate(".J-trigger", "click",
            function() {
                var t = e.find(".J-trigger"),
                n = e.find(".sheet"),
                r = $(this),
                i = n.eq(t.index(r));
                t.removeClass("current"),
                r.addClass("current"),
                n.hide(),
                i.show()
            })
        },
        r.prototype.bindMobileVerify = function(t, e, n) {
            function r(t) {
                return "" === t && "请输入验证码"
            }
            function s() {
                if (d = i(k.val()), !y) return void c();
                var t = r(d);
                t ? (T.addClass("form-field--error"), k.focus(), _.html('<i class="tip-status tip-status-opinfo"></i>' + t)) : c()
            }
            function c() {
                if (!f || 4 === f.readyState) {
                    var t = i(b.val()),
                    e = {
                        mobile: t,
                        _token: h.getFingerPrint(window.location.origin + "/account/mobilesignupcode")
                    };
                    y && (e.captcha = d),
                    f = $.ajax("/account/mobilesignupcode", {
                        type: "POST",
                        data: e,
                        success: function(e) {
                            e.error ? l(e, t) : u(e)
                        },
                        error: function() {
                            a.toggleButtonDisabled(w, !1)
                        },
                        complete: function() {
                            d = undefined
                        }
                    })
                }
            }
            function u() {
                var t, e = 60;
                y && (T.hide(), y = !1),
                w.val("重新获取(" + e + ")"),
                a.toggleButtonDisabled(w),
                x.html("已发送，1分钟后可重新获取。").removeClass(m),
                t = window.setInterval(function() {
                    e -= 1,
                    e ? w.val("重新获取(" + e + ")") : (window.clearInterval(t), w.val("重新获取"), a.toggleButtonDisabled(w, !1), x.html(""))
                },
                1e3)
            }
            function l(t, e) {
                if (x.addClass("error"), x.html(t.error.message), t.error.type) switch (t.error.type) {
                case "user_err_denied_1m":
                case "user_err_denied_24h":
                    g = e,
                    T.hide(),
                    a.toggleButtonDisabled(w);
                    break;
                case "user_err_need_captcha":
                    y = !0,
                    n.update(),
                    T.show(),
                    k.focus()
                }
            }
            var f, d, h = this,
            p = e.fields.mobile,
            m = "error",
            v = !1,
            g = "",
            y = !1,
            b = t.find('[name="mobile"]'),
            w = t.find(".J-verify-btn"),
            x = t.find("#J-verify-tip"),
            T = t.find(".J-captcha"),
            k = t.find("#captcha-mobile"),
            _ = t.find(".J-captcha-tip");
            b.on("keyup",
            function() {
                var t = i(b.val());
                "" !== g && 11 === t.length && g !== t && (y = !1, T.hide(), w.val("免费获取手机动态码"), a.toggleButtonDisabled(w, !0))
            }),
            t.on("success",
            function(t, e) {
                "mobile" === e.$node.get("name") && v && (v = !1, s())
            }),
            w.on("click",
            function() {
                p.status === o.STATUS_OK ? s() : (v = !0, p.status === o.STATUS_INIT && e.checkField(p))
            })
        },
        r.prototype.createFormChecker = function(t, e) {
            function n(t) {
                return "" === t ? _.email: !c.reg.email.test(t) && "邮箱格式错误，请重新输入"
            }
            function r(t) {
                var e = a.getLength(t);
                return "" === t ? _.username: e < 4 ? "用户名太短，至少4个字符": e > 16 ? "用户名太长，最多16个字符": !/^[a-zA-Z\u4e00-\u9fa5]/.test(t) && "用户名必须以中文或英文字母开头"
            }
            function i(t) {
                var e, n = m.val();
                return "" === t ? _.password: t.length < 6 ? "密码太短，至少6个字符": t.length > 32 ? "密码太长，最多32个字符": c.reg.password.test(t) ? ("" !== n && (e = S.fields.pwd2, S.checkField(e)), !1) : "请输入正确的密码"
            }
            function s(t) {
                var e = p.val();
                return "" === t ? _.password2: e !== t && "两次输入的密码不一致，请重新输入"
            }
            function u(t) {
                return "" === t ? _.mobile: !/^\d{11}$/.test(t) && "请输入正确的11位手机号码"
            }
            function l(t) {
                return "" === t && "请输入验证码"
            }
            function f(t) {
                return "" === t ? "请输入短信动态码": 4 !== t.length && "输入错误，请重新输入"
            }
            function d() {
                return "-1" === b.val() ? "请选择省份": "-1" === w.val() && "请选择城市"
            }
            var h, p, m, v, g, y, b, w, x, T = this,
            k = {},
            _ = {
                email: "请填写邮箱地址",
                mobile: "请输入您的手机号码",
                username: "请填写用户名",
                password: "请填写密码",
                password2: "请再次输入密码",
                province: "请选择省份",
                city: "请选择城市",
                captcha: "请填写验证码"
            };
            t.find(".form-field").each(function() {
                var t = $(this);
                t.hasClass("form-field--email") && (y = t.find(".f-text"), k.email = {
                    node: y,
                    checkFn: n,
                    ajax: {
                        action: "/account/signupcheck"
                    }
                }),
                t.hasClass("form-field--mobile") && (h = t.find(".f-text"), k.mobile = {
                    node: h,
                    checkFn: u
                }),
                t.hasClass("form-field--city") && (b = t.find("[name=province]"), w = t.find("[name=city]"), k.city = {
                    node: w,
                    checkFn: d
                }),
                t.hasClass("form-field--uname") && (x = t.find(".f-text"), k.username = {
                    node: x,
                    checkFn: r,
                    ajax: {
                        action: "/account/signupcheck"
                    },
                    tip: {
                        info: "4-16字符，不能以数字开头, 一个汉字为两个字符"
                    }
                }),
                t.hasClass("form-field--pwd") && (p = t.find(".f-text"), k.pwd = {
                    node: p,
                    checkFn: i
                }),
                t.hasClass("form-field--pwd2") && (m = t.find(".f-text"), k.pwd2 = {
                    node: m,
                    checkFn: s
                }),
                t.hasClass("form-field--sms") && (v = t.find(".f-text"), k.sms = {
                    node: v,
                    checkFn: f
                }),
                t.hasClass("form-field--vcode") && (g = t.find(".f-text"), k.captcha = {
                    node: g,
                    checkFn: l
                })
            });
            var S = new o(t, {
                listen: {
                    focus: !0,
                    blur: !0,
                    keyup: !1,
                    submit: !0
                },
                fields: k,
                classname: {
                    tipOk: "tip-status--success",
                    tipError: "tip-status--opinfo"
                },
                handler: {
                    submitSuccess: function() {
                        var n = t.find("[name=commit]");
                        a.toggleButtonDisabled(n, !0),
                        T.handleSubmitSuccess(t, e)
                    }
                }
            });
            return S
        },
        r.prototype.createAutoLoginForm = function(t) {
            var e = this,
            n = '<form method="POST" class="J-form" action="' + t["continue"] + '" style="display:none">    <input class="J-token" name="token" value="' + t.token + '" />    <input class="J-expire" name="expire" value="' + t.expire + '"/>    <input class="J-autologin" name="autologin" value="' + t.autologin + '" /></form>';
            e.$container.append(n),
            setTimeout(function() {
                e.$container.find(".J-form").submit()
            },
            0)
        },
        r.prototype.handleSubmitSuccess = function(t, e) {
            function n(e) {
                var n = t.find("[name=commit]");
                a.toggleButtonDisabled(n, !1),
                $(".sysmsgw").length || $("header").append('<div class="common-tip sysmsgw" id="sysmsg-error"><div class="sysmsg"><p><span class="tip-status tip-status--error"></span><span class="content"></span></p></div></div>'),
                $(".sysmsgw .sysmsg .content").show().text(e.message)
            }
            var r = this,
            i = t.attr("action"),
            o = r.getFingerPrint(window.location.origin + i);
            t.append('<input type="hidden" name="_token" value=' + o + "/>"),
            $.ajax({
                url:"doReg",
                type: "POST",
                data: t.serialize()
            })
            .success(function(result) {
                if (result=="no") {
                	window.location.href = "reg?msg=该手机号已经注册"
                }else if(result=="nono"){
                	window.location.href = "reg?msg=动态码错误"
                }else t["continue"] ? r.createAutoLoginForm(t) : window.location.href = "/index"
            })
            .fail(function() {
                n({
                    msg: "网络故障，请稍后重试"
                })
            }),
            t.find("[name=_token]").remove()
        },
        r.prototype.getFingerPrint = function(t) {
            return Rohr_Opt.reload(t)
        },
        new r
    },
    {
        "@sso/scripts/captcha": 47,
        "@sso/scripts/capture": 48,
        "@sso/scripts/constant": 51,
        "@sso/scripts/email": 52,
        "@sso/scripts/formchecker": 53,
        "@sso/scripts/passwordstrength": 54,
        "@sso/scripts/util": 55,
        "lodash.trim": 30
    }],
    52 : [function(t, e, n) {
        function r(t, e) {
            this.$input = t,
            this.$prompt = e,
            this.$prompt.html('<p class="email-title">请选择您的邮箱类型...</p><ul class="email-list"></ul>'),
            this.$list = this.$prompt.find("ul"),
            this.selectItemIndex = 0,
            this.selectItemNum = 0,
            this.timer = null,
            a && (this.$frame = $('<iframe frameborder=0 class="iframe"></iframe>'), this.$prompt.prepend(this.$frame)),
            this.bindEvent()
        }
        var i = t("./constant"),
        o = t("./browser"),
        s = t("lodash.foreach"),
        a = 6 === o.version,
        c = ["qq.com", "163.com", "126.com", "sina.com", "139.com", "hotmail.com", "sohu.com", "gmail.com"];
        r.prototype.bindEvent = function() {
            var t = this;
            $(document.body).on("click",
            function(e) {
                var n = $(e.target);
                n.get(0) === t.$input.get(0) || $.contains(t.$prompt.get(0), n.get(0)) || t.leave()
            }),
            t.$input.on("keydown",
            function(e) {
                var n = e.which;
                if (n === i.key.TAB) t.leave();
                else if (n === i.key.ENTER)"block" === t.$prompt.css("display") && (e.preventDefault(), e.stopPropagation(), t.select());
                else if (n === i.key.UP || n === i.key.DOWN) {
                    if (1 === e.shiftKey) return;
                    e.preventDefault(),
                    e.stopPropagation(),
                    n === i.key.UP ? (t.selectItemIndex <= 0 && (t.selectItemIndex = t.selectItemNum), t.selectItemIndex--) : n === i.key.DOWN && (t.selectItemIndex > t.selectItemNum - 2 && (t.selectItemIndex = -1), t.selectItemIndex++),
                    t.activeItem(t.selectItemIndex)
                } else t.timer && (window.clearTimeout(t.timer), t.timer = null),
                t.timer = window.setTimeout(function() {
                    t.displayList()
                },
                50)
            }),
            t.$list.delegate("li", "mouseover",
            function() {
                var e = t.$list.find("li"),
                n = e.index(this);
                t.activeItem(n)
            }),
            t.$list.delegate("li", "click",
            function() {
                t.select($(this))
            })
        },
        r.prototype.displayList = function() {
            var t = this.$input.val(),
            e = t.indexOf("@"),
            n = "",
            r = "",
            i = [],
            o = !1;
            t === window.escape(t) && (e < 0 ? r = t: (r = t.substr(0, e), e !== t.length - 1 && (n = t.substr(e + 1))), s(c,
            function(t) {
                var e, s = t.substr(0, n.length);
                "" !== n && n !== s || (e = r + "@" + t, i.push('<li title="' + e + '">' + e + "</li>"), o = !0)
            }), this.$list.html(i.join("")), o ? this.$prompt.show() : this.$prompt.hide(), this.activeItem(0), this.selectItemNum = this.$prompt.find("li").size(), this.$frame && this.$frame.css({
                width: this.$prompt.css("width"),
                height: this.$prompt.css("height"),
                visibility: "visible"
            }))
        },
        r.prototype.activeItem = function(t) {
            var e = this.$list.find("li"),
            n = e.eq(t);
            n && (e.removeClass("current"), n.addClass("current"), this.selectItemIndex = t)
        },
        r.prototype.select = function(t) {
            var e;
            void 0 !== t ? e = t.html() : this.$list.find("li").size() > 0 && (e = this.$list.find("li").eq(this.selectItemIndex).html()),
            void 0 !== e && this.$input.val(e),
            this.leave()
        },
        r.prototype.leave = function() {
            this.timer && (window.clearTimeout(this.timer), this.timer = null),
            this.$prompt.hide()
        },
        e.exports = function(t, e) {
            new r($(t), $(e))
        }
    },
    {
        "./browser": 46,
        "./constant": 51,
        "lodash.foreach": 21
    }],
    48 : [function(t, e, n) {
        function r(t, e) {
            this.$container = t,
            this.$input = e,
            this.$lastMove = null,
            this.$document = $(document),
            this.keyTime = new Date,
            this.keyTimes = [],
            this.flags = [0, 0, 0, ""],
            this.detectDomDifference = $.proxy(this.detectDomDifference, this),
            this.bindEvents(),
            this.updateField()
        }
        r.prototype.getDeltaTime = function() {
            var t = this.keyTime;
            return this.keyTime = new Date,
            this.keyTime - t
        },
        r.prototype.updateField = function() {
            var t = "";
            this.flags[3] = this.keyTimes.join("|"),
            t += this.flags.join("-"),
            this.$input.val(t)
        },
        r.prototype.bindEvents = function() {
            var t = this;
            t.$container.on("keyup",
            function(e) {
                var n = t.getDeltaTime();
                t.keyTimes.push(n.toString(36)),
                9 === e.keyCode && (t.flags[0] += 1),
                t.updateField()
            }),
            t.$document.on("mouseup",
            function(e) {
                e.clientX && e.clientY && (t.flags[1] += 1),
                t.updateField()
            }),
            t.$document.on("mousemove", t.detectDomDifference)
        },
        r.prototype.detectDomDifference = function(t) {
            var e = $(t.target);
            this.$lastMove && e !== this.$lastMove && this.$lastMove.prop("tagName") !== e.prop("tagName") && (this.flags[2] = 1, this.updateField(), this.$document.unbind("mousemove", this.detectDomDifference)),
            this.$lastMove = e
        },
        e.exports = function(t, e) {
            var n = $(t);
            new r(n, n.find(e))
        }
    },
    {}],
    46 : [function(t, e, n) {
        function r(t) {
            t = t.toLowerCase();
            var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
            return {
                browser: e[1] || "",
                version: e[2] || "0"
            }
        }
        var i = e.exports = {},
        o = r(navigator.userAgent);
        o.browser && (i[o.browser] = !0, i.version = parseInt(o.version)),
        i.chrome ? i.webkit = !0 : i.webkit && (i.safari = !0)
    },
    {}],
    54 : [function(t, e, n) {
        function r(t, e) {
            this.$input = t,
            this.$indicator = e,
            this.bindEvent()
        }
        r.prototype.bindEvent = function() {
            this.$input.on("keyup", $.proxy(this.check, this))
        },
        r.prototype.strReverse = function(t) {
            for (var e = "",
            n = t.length; n--;) e += t.charAt(n);
            return e
        },
        r.prototype.check = function() {
            var t = this,
            e = this.$input.val(),
            n = this.$indicator,
            r = e.length,
            i = 4 * r,
            o = 0,
            s = 0,
            a = 0,
            c = 0,
            u = 0,
            l = 0,
            f = 0,
            d = 0,
            h = 0,
            p = 0,
            m = 0,
            v = 0,
            g = 0;
            this.reset(),
            e && (!
            function() {
                for (var t = e.replace(/\s+/g, "").split(/\s*/), n = t.length, r = n, i = 0, m = 0, v = 0, g = 0; g < n; g++) {
                    t[g].match(/[A-Z]/g) ? (i + 1 === g && d++, i = g, o++) : t[g].match(/[a-z]/g) ? ("" !== m && m + 1 === g && h++, m = g, s++) : t[g].match(/[0-9]/g) ? (g > 0 && g < n - 1 && u++, "" !== v && v + 1 === g && p++, v = g, a++) : t[g].match(/[^a-zA-Z0-9_]/g) && (g > 0 && g < n - 1 && u++, c++);
                    for (var y = 0; y < n; y++) t[g] === t[y] && g !== y && (f += Math.abs(n / (y - g)), l++, r--, f = r ? Math.ceil(f / r) : Math.ceil(f))
                }
            } (),
            function() {
                var n, r, i, o = "01234567890",
                s = ")!@#$%^&*()";
                for (n = 0; n < 23; n++) r = "abcdefghijklmnopqrstuvwxyz".substring(n, n + 3),
                i = t.strReverse(r),
                -1 === e.toLowerCase().indexOf(r) && -1 === e.toLowerCase().indexOf(i) || m++;
                for (n = 0; n < 8; n++) r = o.substring(n, n + 3),
                i = t.strReverse(r),
                -1 === e.toLowerCase().indexOf(r) && -1 === e.toLowerCase().indexOf(i) || v++;
                for (n = 0; n < 8; n++) r = s.substring(n, n + 3),
                i = t.strReverse(r),
                -1 === e.toLowerCase().indexOf(r) && -1 === e.toLowerCase().indexOf(i) || g++
            } (),
            function() {
                var t, n, y = 0,
                b = 6;
                o > 0 && o < r && (i += 2 * (r - o)),
                s > 0 && s < r && (i += 2 * (r - s)),
                a > 0 && a < r && (i += 4 * a),
                i += 6 * c,
                i += 2 * u,
                (s > 0 || o > 0) && 0 === c && 0 === a && (i -= r),
                0 === s && 0 === o && 0 === c && a > 0 && (i -= r),
                l > 0 && (i -= f),
                i -= 2 * d,
                i -= 2 * h,
                i -= 2 * p,
                i -= 3 * m,
                i -= 3 * v,
                i -= 3 * g;
                for (var $ = [r, o, s, a, c], w = ["pwdLen", "alphaUCLen", "alphaLCLen", "digitLen", "symbolLen"], x = $.length, T = 0; T < x; T++) t = "pwdLen" === w[T] ? b - 1 : 0,
                $[T] >= t + 1 && y++;
                n = e.length >= b ? 3 : 4,
                y > n && (i += 2 * y)
            } (), i < 35 ? n.addClass("pw-strength__bar--weak") : i >= 35 && i < 70 ? n.addClass("pw-strength__bar--normal") : i >= 70 && n.addClass("pw-strength__bar--strong"))
        },
        r.prototype.reset = function() {
            var t = this.$indicator;
            t && (t.removeClass("pw-strength__bar--weak"), t.removeClass("pw-strength__bar--normal"), t.removeClass("pw-strength__bar--strong"))
        },
        e.exports = function(t, e) {
            new r($(t), $(e))
        }
    },
    {}],
    51 : [function(t, e, n) {
        e.exports = {
            key: {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                PAGEUP: 33,
                PAGEDOWN: 34,
                ESC: 27,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40
            },
            reg: {
                email: /^[\w\.\-\+]+@([\w\-]+\.)+[a-z]{2,8}$/i,
                username: /^[\.\w\u4e00-\u9fa5\uF900-\uFA2D]{2,16}$/i,
                password: /^[\x21-\x7e]{6,32}$/i,
                mobile: /^1\d{10}$/
            }
        }
    },
    {}],
    53 : [function(t, e, n) {
        var r = t("lodash.defaults"),
        i = t("lodash.foreach"),
        o = t("lodash.some"),
        s = t("lodash.debounce"),
        a = t("lodash.keys"),
        c = function(t, e) {
            if (this.$form = $(t), !this.$form[0] || "FORM" !== this.$form[0].tagName || !e.fields) return null;
            this.fields = e.fields,
            this.listen = r(e.listen, c.EVENTS),
            this.classname = r(e.classname || {},
            c.CLASS_NAME),
            this.handler = e.handler || {};
            var n = 0,
            o = a(this.fields).length;
            i(this.fields,
            function(t) {
                t.status = c.STATUS_INIT,
                t.$node = $(t.node),
                t.$field = t.$node.parents("." + this.classname.field),
                t.tip = t.tip || {},
                t.last = n === o - 1,
                n += 1
            },
            this),
            e.setTip && (this.setTip = e.setTip),
            this.bindEvents()
        };
        c.STATUS_INIT = 0,
        c.STATUS_CHECKING = 1,
        c.STATUS_OK = 2,
        c.STATUS_ERROR = 3,
        c.EVENTS = {
            focus: !0,
            blur: !0,
            keyup: !0,
            submit: !0
        },
        c.CLASS_NAME = {
            field: "form-field",
            fieldError: "form-field--error",
            fieldOk: "form-field--ok",
            tip: "inline-tip",
            tipError: "tip-status--error",
            tipOk: "tip-status--ok"
        },
        c.prototype.bindEvents = function() {
            var t = "input, textarea, select";
            this.listen.focus && this.$form.delegate(t, "focus", $.proxy(this.handleFocus, this)),
            this.listen.blur && this.$form.delegate(t, "blur", $.proxy(this.handleBlur, this)),
            this.listen.keyup && this.$form.delegate(t, "keyup", $.proxy(this.handleKeyup, this)),
            this.listen.submit && this.$form.on("submit", $.proxy(this.handleSubmit, this))
        },
        c.prototype.handleFocus = function(t) {
            var e = this.getFieldByNode(t.currentTarget);
            e && this.resetField(e)
        },
        c.prototype.handleBlur = function(t) {
            var e = this;
            setTimeout(function() {
                var n = e.getFieldByNode(t.currentTarget);
                n && e.checkField(n)
            },
            200)
        },
        c.prototype.handleKeyup = function(t) {
            var e = this;
            s(function() {
                var n = e.getFieldByNode(t.currentTarget);
                n && e.checkField(n)
            })
        },
        c.prototype.handleSubmit = function(t) {
            this.listen.submit && !this.listen.blur && i(this.fields,
            function(t) {
                this.resetField(t)
            },
            this),
            t.preventDefault(),
            this.checkAllField() && (this.$form.trigger("submitSuccess", t), this.handler.submitSuccess && this.handler.submitSuccess(t))
        },
        c.prototype.checkField = function(t) {
            var e = this,
            n = t.$node,
            r = n.val();
            if (n) {
                var i = t.checkFn(r);
                if (e.setField(t, i ? c.STATUS_ERROR: c.STATUS_OK), e.setTip(t, i), !i) if (t.ajax) {
                    e.setField(t, c.STATUS_CHECKING),
                    e.setTip(t, "检查中...");
                    var o = {};
                    o[t.$node.attr("name")] = t.$node.val(),
                    $.ajax({
                        url: t.ajax.action,
                        type: "POST",
                        data: o,
                        success: function(n) {
                            n.error || e.$form.trigger("success", t),
                            e.setField(t, n.error ? c.STATUS_ERROR: c.STATUS_OK),
                            e.setTip(t, n.error ? n.error.message: null)
                        },
                        error: function(n, r) {
                            "abort" !== r && (e.setField(t, c.STATUS_ERROR), e.setTip(t, "网络有问题，请稍后重试"))
                        }
                    })
                } else e.$form.trigger("success", t);
                return t.status
            }
        },
        c.prototype.checkAllField = function() {
            var t = !0;
            return i(this.fields,
            function(e) {
                switch (e.status) {
                case c.STATUS_INIT:
                    var n = this.checkField(e);
                    n !== c.STATUS_ERROR && n !== c.STATUS_CHECKING || (t = !1);
                    break;
                case c.STATUS_ERROR:
                    t = !1
                }
            },
            this),
            t
        },
        c.prototype.setField = function(t, e) {
            var n = t.$field;
            switch (t.status = e, t.status) {
            case c.STATUS_INIT:
            case c.STATUS_OK:
                n.addClass(this.classname.fieldOk).removeClass(this.classname.fieldError);
                break;
            case c.STATUS_ERROR:
                n.addClass(this.classname.fieldError).removeClass(this.classname.fieldOk)
            }
        },
        c.prototype.setTip = function(t, e) {
            var n = "tip-status",
            r = t.$field;
            switch (t.status) {
            case c.STATUS_ERROR:
                n = n + " " + this.classname.tipError,
                e = t.tip.error = e || t.tip.error || "";
                break;
            case c.STATUS_OK:
                n = n + " " + this.classname.tipOk,
                e = e || t.tip.ok || "";
                break;
            case c.STATUS_INIT:
                e = e || t.tip.info || ""
            }
            0 === r.find("." + this.classname.tip).length && r.append('<span class="' + this.classname.tip + '"></span>');
            var i = r.find("." + this.classname.tip);
            i.show(),
            (t.status !== c.STATUS_INIT || e) && (e = '<i class="' + n + '"></i>' + e),
            i.html(e)
        },
        c.prototype.resetField = function(t) {
            this.setField(t, c.STATUS_INIT),
            this.setTip(t)
        },
        c.prototype.getFieldByNode = function(t) {
            var e;
            return o(this.fields,
            function(n) {
                if (n.$node.get(0) === t) return e = n,
                !0
            }),
            e
        },
        e.exports = c
    },
    {
        "lodash.debounce": 19,
        "lodash.defaults": 20,
        "lodash.foreach": 21,
        "lodash.keys": 26,
        "lodash.some": 29
    }],
    47 : [function(t, e, n) {
        function r(t, e) {
            this.$captcha = t,
            this.$trigger = this.$captcha.siblings("a"),
            this.$image = this.$captcha.siblings("img"),
            e.update && this.update(),
            this.bindEvent()
        }
        r.prototype.bindEvent = function() {
            this.$trigger.on("click", $.proxy(this.handleTriggerClick, this)),
            this.$image.on("click", $.proxy(this.handleImageClick, this))
        },
        r.prototype.handleTriggerClick = function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            this.update()
        },
        r.prototype.handleImageClick = function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            this.update()
        },
        r.prototype.update = function() {
            this.$image.attr("src",
            function(t, e) {
                return e = e.replace(/((\?|&)rnd=0\.\d+)?$/, ""),
                -1 === e.indexOf("?") ? e += "?rnd=": e += "&rnd=",
                e + Math.random()
            }),
            this.$captcha.length > 0 && (this.$captcha.val(""), this.$captcha.focus())
        },
        e.exports = function(t, e) {
            return new r($(t), e || {})
        }
    },
    {}],
    55 : [function(t, e, n) {
        var r = t("lodash.isstring"),
        i = e.exports = {};
        i.getLength = function(t) {
            if (!t || !r(t)) return 0;
            for (var e = 0,
            n = 0,
            i = t.length; e < i; e++) n = t.charCodeAt(e) > 255 ? n + 2 : n + 1;
            return n
        },
        i.autoSubmit = function(t, e, n) {
            function r() {
                t > 0 ? (t -= 1, n.html(t), setTimeout(r, 1e3)) : e.submit()
            }
            e = $(e),
            n = $(n),
            r()
        },
        i.toggleButtonDisabled = function(t, e) {
            t = $(t),
            t.prop("disabled", e),
            t.toggleClass("btn-disabled", e)
        },
        i.repeatVerifyMail = function(t) {
            var e = $(t),
            n = e.next(),
            r = e.data("email"),
            i = "disabled",
            o = "color",
            s = "red";
            e.on("click",
            function(t) {
                t.preventDefault(),
                e.attr(i) || (e.attr(i, i), n.css(o, "green").text("发送中..."), $.ajax({
                    url: "/account/resendSignupMail",
                    type: "POST",
                    data: {
                        email: r
                    },
                    success: function(t) {
                        t.error ? (n.css(o, s).text("邮件发送失败，请稍后重试。"), e.removeAttr(i)) : (n.text("发送成功。"), e.removeAttr(i))
                    },
                    error: function() {
                        n.css(o, s).text("网络繁忙请稍后重试！"),
                        e.removeAttr(i)
                    }
                }))
            })
        },
        i.checkPhone = function(t, e) {
            return e || (e = "86"),
            "86" === e ? /^1[0-9]\d{9}$/.test(t) : /^\d+$/.test(t)
        },
        i.isMobile = function() {
            try {
                return document.createEvent("TouchEvent"),
                !0
            } catch(t) {
                return ! 1
            }
        },
        i.urlParamsToObj = function(t) {
            for (var e, n = /\+/g,
            r = /([^&=]+)=?([^&]*)/g,
            i = function(t) {
                return decodeURIComponent(t.replace(n, " "))
            },
            o = {}; e = r.exec(t);) o[i(e[1])] = i(e[2]);
            return o
        },
        i.getH5fingerprint = function(t) {
            t = t || "";
            try {
                return Rohr_Opt.reload(t) || rohr.reload(t)
            } catch(e) {
                return console.error("getFingerprintFail"),
                ""
            }
        };
        var o = function() {
            var t = "cookie",
            e = document;
            return {
                get: function(n, r) {
                    return (r = e[t].match("(?:;|^)\\s*" + n + "\\s*=\\s*([^;]+)\\s*(?:;|$)")) && r[1]
                },
                set: function(n, r, i, o) { - 1 == location.host.indexOf("meituan.com") || o || (o = "meituan.com"),
                    r = e[t] = n + "=" + r + (i ? "; expires=" + new Date((new Date).getTime() + 1e3 * i).toGMTString() : "") + (o ? "; domain=" + o: "") + "; path=/"
                }
            }
        } ();
        i.cookieUtil = o
    },
    {
        "lodash.isstring": 24
    }],
    30 : [function(t, e, n) {
        function r(t, e, n) {
            var r = t;
            return (t = i(t)) ? (n ? a(r, e, n) : null == e) ? t.slice(c(t), u(t) + 1) : (e += "", t.slice(o(t, e), s(t, e) + 1)) : t
        }
        var i = t("lodash._basetostring"),
        o = t("lodash._charsleftindex"),
        s = t("lodash._charsrightindex"),
        a = t("lodash._isiterateecall"),
        c = t("lodash._trimmedleftindex"),
        u = t("lodash._trimmedrightindex");
        e.exports = r
    },
    {
        "lodash._basetostring": 9,
        "lodash._charsleftindex": 11,
        "lodash._charsrightindex": 12,
        "lodash._isiterateecall": 15,
        "lodash._trimmedleftindex": 16,
        "lodash._trimmedrightindex": 17
    }],
    29 : [function(t, e, n) {
        function r(t, e) {
            for (var n = -1,
            r = t.length; ++n < r;) if (e(t[n], n, t)) return ! 0;
            return ! 1
        }
        function i(t, e) {
            var n;
            return a(t,
            function(t, r, i) {
                return ! (n = e(t, r, i))
            }),
            !!n
        }
        function o(t, e, n) {
            var o = u(t) ? r: i;
            return n && c(t, e, n) && (e = undefined),
            "function" == typeof e && n === undefined || (e = s(e, n, 3)),
            o(t, e)
        }
        var s = t("lodash._basecallback"),
        a = t("lodash._baseeach"),
        c = t("lodash._isiterateecall"),
        u = t("lodash.isarray");
        e.exports = o
    },
    {
        "lodash._basecallback": 5,
        "lodash._baseeach": 7,
        "lodash._isiterateecall": 15,
        "lodash.isarray": 23
    }],
    24 : [function(t, e, n) {
        function r(t) {
            return !! t && "object" == typeof t
        }
        function i(t) {
            return "string" == typeof t || r(t) && a.call(t) == o
        }
        var o = "[object String]",
        s = Object.prototype,
        a = s.toString;
        e.exports = i
    },
    {}],
    21 : [function(t, e, n) {
        function r(t, e) {
            return function(n, r, i) {
                return "function" == typeof r && i === undefined && a(n) ? t(n, r) : e(n, s(r, i, 3))
            }
        }
        var i = t("lodash._arrayeach"),
        o = t("lodash._baseeach"),
        s = t("lodash._bindcallback"),
        a = t("lodash.isarray"),
        c = r(i, o);
        e.exports = c
    },
    {
        "lodash._arrayeach": 3,
        "lodash._baseeach": 7,
        "lodash._bindcallback": 10,
        "lodash.isarray": 23
    }],
    20 : [function(t, e, n) {
        function r(t, e) {
            return t === undefined ? e: t
        }
        function i(t, e) {
            return s(function(n) {
                var r = n[0];
                return null == r ? r: (n.push(e), t.apply(undefined, n))
            })
        }
        var o = t("lodash.assign"),
        s = t("lodash.restparam"),
        a = i(o, r);
        e.exports = a
    },
    {
        "lodash.assign": 18,
        "lodash.restparam": 28
    }],
    19 : [function(t, e, n) {
        function r(t, e, n) {
            function r() {
                g && clearTimeout(g),
                h && clearTimeout(h),
                b = 0,
                h = g = y = undefined
            }
            function o(e, n) {
                n && clearTimeout(n),
                h = g = y = undefined,
                e && (b = u(), p = t.apply(v, d), g || h || (d = v = undefined))
            }
            function c() {
                var t = e - (u() - m);
                t <= 0 || t > e ? o(y, h) : g = setTimeout(c, t)
            }
            function l() {
                o(w, g)
            }
            function f() {
                if (d = arguments, m = u(), v = this, y = w && (g || !x), !1 === $) var n = x && !g;
                else {
                    h || x || (b = m);
                    var r = $ - (m - b),
                    i = r <= 0 || r > $;
                    i ? (h && (h = clearTimeout(h)), b = m, p = t.apply(v, d)) : h || (h = setTimeout(l, r))
                }
                return i && g ? g = clearTimeout(g) : g || e === $ || (g = setTimeout(c, e)),
                n && (i = !0, p = t.apply(v, d)),
                !i || g || h || (d = v = undefined),
                p
            }
            var d, h, p, m, v, g, y, b = 0,
            $ = !1,
            w = !0;
            if ("function" != typeof t) throw new TypeError(s);
            if (e = e < 0 ? 0 : +e || 0, !0 === n) {
                var x = !0;
                w = !1
            } else i(n) && (x = !!n.leading, $ = "maxWait" in n && a( + n.maxWait || 0, e), w = "trailing" in n ? !!n.trailing: w);
            return f.cancel = r,
            f
        }
        function i(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        var o = t("lodash._getnative"),
        s = "Expected a function",
        a = Math.max,
        c = o(Date, "now"),
        u = c ||
        function() {
            return (new Date).getTime()
        };
        e.exports = r
    },
    {
        "lodash._getnative": 14
    }],
    18 : [function(t, e, n) {
        function r(t, e, n) {
            for (var r = -1,
            i = s(e), o = i.length; ++r < o;) {
                var a = i[r],
                c = t[a],
                u = n(c, e[a], a, t, e); (u === u ? u === c: c !== c) && (c !== undefined || a in t) || (t[a] = u)
            }
            return t
        }
        var i = t("lodash._baseassign"),
        o = t("lodash._createassigner"),
        s = t("lodash.keys"),
        a = o(function(t, e, n) {
            return n ? r(t, e, n) : i(t, e)
        });
        e.exports = a
    },
    {
        "lodash._baseassign": 4,
        "lodash._createassigner": 13,
        "lodash.keys": 26
    }],
    17 : [function(t, e, n) {
        function r(t) {
            return t <= 160 && t >= 9 && t <= 13 || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (t <= 8202 || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
        }
        function i(t) {
            for (var e = t.length; e--&&r(t.charCodeAt(e)););
            return e
        }
        e.exports = i
    },
    {}],
    16 : [function(t, e, n) {
        function r(t) {
            return t <= 160 && t >= 9 && t <= 13 || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (t <= 8202 || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
        }
        function i(t) {
            for (var e = -1,
            n = t.length; ++e < n && r(t.charCodeAt(e)););
            return e
        }
        e.exports = i
    },
    {}],
    13 : [function(t, e, n) {
        function r(t) {
            return s(function(e, n) {
                var r = -1,
                s = null == e ? 0 : n.length,
                a = s > 2 ? n[s - 2] : undefined,
                c = s > 2 ? n[2] : undefined,
                u = s > 1 ? n[s - 1] : undefined;
                for ("function" == typeof a ? (a = i(a, u, 5), s -= 2) : (a = "function" == typeof u ? u: undefined, s -= a ? 1 : 0), c && o(n[0], n[1], c) && (a = s < 3 ? undefined: a, s = 1); ++r < s;) {
                    var l = n[r];
                    l && t(e, l, a)
                }
                return e
            })
        }
        var i = t("lodash._bindcallback"),
        o = t("lodash._isiterateecall"),
        s = t("lodash.restparam");
        e.exports = r
    },
    {
        "lodash._bindcallback": 10,
        "lodash._isiterateecall": 15,
        "lodash.restparam": 28
    }],
    28 : [function(t, e, n) {
        function r(t, e) {
            if ("function" != typeof t) throw new TypeError(i);
            return e = o(e === undefined ? t.length - 1 : +e || 0, 0),
            function() {
                for (var n = arguments,
                r = -1,
                i = o(n.length - e, 0), s = Array(i); ++r < i;) s[r] = n[e + r];
                switch (e) {
                case 0:
                    return t.call(this, s);
                case 1:
                    return t.call(this, n[0], s);
                case 2:
                    return t.call(this, n[0], n[1], s)
                }
                var a = Array(e + 1);
                for (r = -1; ++r < e;) a[r] = n[r];
                return a[e] = s,
                t.apply(this, a)
            }
        }
        var i = "Expected a function",
        o = Math.max;
        e.exports = r
    },
    {}],
    15 : [function(t, e, n) {
        function r(t) {
            return function(e) {
                return null == e ? undefined: e[t]
            }
        }
        function i(t) {
            return null != t && a(f(t))
        }
        function o(t, e) {
            return t = "number" == typeof t || u.test(t) ? +t: -1,
            e = null == e ? l: e,
            t > -1 && t % 1 == 0 && t < e
        }
        function s(t, e, n) {
            if (!c(n)) return ! 1;
            var r = typeof e;
            if ("number" == r ? i(n) && o(e, n.length) : "string" == r && e in n) {
                var s = n[e];
                return t === t ? t === s: s !== s
            }
            return ! 1
        }
        function a(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= l
        }
        function c(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        var u = /^\d+$/,
        l = 9007199254740991,
        f = r("length");
        e.exports = s
    },
    {}],
    12 : [function(t, e, n) {
        function r(t, e) {
            for (var n = t.length; n--&&e.indexOf(t.charAt(n)) > -1;);
            return n
        }
        e.exports = r
    },
    {}],
    11 : [function(t, e, n) {
        function r(t, e) {
            for (var n = -1,
            r = t.length; ++n < r && e.indexOf(t.charAt(n)) > -1;);
            return n
        }
        e.exports = r
    },
    {}],
    9 : [function(t, e, n) {
        function r(t) {
            return null == t ? "": t + ""
        }
        e.exports = r
    },
    {}],
    7 : [function(t, e, n) {
        function r(t, e) {
            return h(t, e, l)
        }
        function i(t) {
            return function(e) {
                return null == e ? undefined: e[t]
            }
        }
        function o(t, e) {
            return function(n, r) {
                var i = n ? p(n) : 0;
                if (!a(i)) return t(n, r);
                for (var o = e ? i: -1, s = c(n); (e ? o--:++o < i) && !1 !== r(s[o], o, s););
                return n
            }
        }
        function s(t) {
            return function(e, n, r) {
                for (var i = c(e), o = r(e), s = o.length, a = t ? s: -1; t ? a--:++a < s;) {
                    var u = o[a];
                    if (!1 === n(i[u], u, i)) break
                }
                return e
            }
        }
        function a(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= f
        }
        function c(t) {
            return u(t) ? t: Object(t)
        }
        function u(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        var l = t("lodash.keys"),
        f = 9007199254740991,
        d = o(r),
        h = s(),
        p = i("length");
        e.exports = d
    },
    {
        "lodash.keys": 26
    }],
    5 : [function(t, e, n) {
        function r(t) {
            return null == t ? "": t + ""
        }
        function i(t, e, n) {
            var r = typeof t;
            return "function" == r ? e === undefined ? t: x(t, e, n) : null == t ? b: "object" == r ? a(t) : e === undefined ? $(t) : c(t, e)
        }
        function o(t, e, n) {
            if (null != t) {
                n !== undefined && n in m(t) && (e = [n]);
                for (var r = 0,
                i = e.length; null != t && r < i;) t = t[e[r++]];
                return r && r == i ? t: undefined
            }
        }
        function s(t, e, n) {
            var r = e.length,
            i = r,
            o = !n;
            if (null == t) return ! i;
            for (t = m(t); r--;) {
                var s = e[r];
                if (o && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return ! 1
            }
            for (; ++r < i;) {
                s = e[r];
                var a = s[0],
                c = t[a],
                u = s[1];
                if (o && s[2]) {
                    if (c === undefined && !(a in t)) return ! 1
                } else {
                    var l = n ? n(c, u, a) : undefined;
                    if (! (l === undefined ? w(u, c, n, !0) : l)) return ! 1
                }
            }
            return ! 0
        }
        function a(t) {
            var e = d(t);
            if (1 == e.length && e[0][2]) {
                var n = e[0][0],
                r = e[0][1];
                return function(t) {
                    return null != t && (t[n] === r && (r !== undefined || n in m(t)))
                }
            }
            return function(t) {
                return s(t, e)
            }
        }
        function c(t, e) {
            var n = T(t),
            r = h(t) && p(e),
            i = t + "";
            return t = v(t),
            function(s) {
                if (null == s) return ! 1;
                var a = i;
                if (s = m(s), (n || !r) && !(a in s)) {
                    if (null == (s = 1 == t.length ? s: o(s, f(t, 0, -1)))) return ! 1;
                    a = g(t),
                    s = m(s)
                }
                return s[a] === e ? e !== undefined || a in s: w(e, s[a], undefined, !0)
            }
        }
        function u(t) {
            return function(e) {
                return null == e ? undefined: e[t]
            }
        }
        function l(t) {
            var e = t + "";
            return t = v(t),
            function(n) {
                return o(n, t, e)
            }
        }
        function f(t, e, n) {
            var r = -1,
            i = t.length;
            e = null == e ? 0 : +e || 0,
            e < 0 && (e = -e > i ? 0 : i + e),
            n = n === undefined || n > i ? i: +n || 0,
            n < 0 && (n += i),
            i = e > n ? 0 : n - e >>> 0,
            e >>>= 0;
            for (var o = Array(i); ++r < i;) o[r] = t[r + e];
            return o
        }
        function d(t) {
            for (var e = k(t), n = e.length; n--;) e[n][2] = p(e[n][1]);
            return e
        }
        function h(t, e) {
            var n = typeof t;
            return !! ("string" == n && S.test(t) || "number" == n) || !T(t) && (!_.test(t) || null != e && t in m(e))
        }
        function p(t) {
            return t === t && !y(t)
        }
        function m(t) {
            return y(t) ? t: Object(t)
        }
        function v(t) {
            if (T(t)) return t;
            var e = [];
            return r(t).replace(j,
            function(t, n, r, i) {
                e.push(r ? i.replace(A, "$1") : n || t)
            }),
            e
        }
        function g(t) {
            var e = t ? t.length: 0;
            return e ? t[e - 1] : undefined
        }
        function y(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function b(t) {
            return t
        }
        function $(t) {
            return h(t) ? u(t) : l(t)
        }
        var w = t("lodash._baseisequal"),
        x = t("lodash._bindcallback"),
        T = t("lodash.isarray"),
        k = t("lodash.pairs"),
        _ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
        S = /^\w*$/,
        j = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
        A = /\\(\\)?/g;
        e.exports = i
    },
    {
        "lodash._baseisequal": 8,
        "lodash._bindcallback": 10,
        "lodash.isarray": 23,
        "lodash.pairs": 27
    }],
    27 : [function(t, e, n) {
        function r(t) {
            return i(t) ? t: Object(t)
        }
        function i(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function o(t) {
            t = r(t);
            for (var e = -1,
            n = s(t), i = n.length, o = Array(i); ++e < i;) {
                var a = n[e];
                o[e] = [a, t[a]]
            }
            return o
        }
        var s = t("lodash.keys");
        e.exports = o
    },
    {
        "lodash.keys": 26
    }],
    10 : [function(t, e, n) {
        function r(t, e, n) {
            if ("function" != typeof t) return i;
            if (e === undefined) return t;
            switch (n) {
            case 1:
                return function(n) {
                    return t.call(e, n)
                };
            case 3:
                return function(n, r, i) {
                    return t.call(e, n, r, i)
                };
            case 4:
                return function(n, r, i, o) {
                    return t.call(e, n, r, i, o)
                };
            case 5:
                return function(n, r, i, o, s) {
                    return t.call(e, n, r, i, o, s)
                }
            }
            return function() {
                return t.apply(e, arguments)
            }
        }
        function i(t) {
            return t
        }
        e.exports = r
    },
    {}],
    8 : [function(t, e, n) {
        function r(t) {
            return !! t && "object" == typeof t
        }
        function i(t, e) {
            for (var n = -1,
            r = t.length; ++n < r;) if (e(t[n], n, t)) return ! 0;
            return ! 1
        }
        function o(t, e, n, i, a, c) {
            return t === e || (null == t || null == e || !l(t) && !r(e) ? t !== t && e !== e: s(t, e, o, n, i, a, c))
        }
        function s(t, e, n, r, i, o, s) {
            var l = f(t),
            h = f(e),
            v = m,
            g = m;
            l || (v = _.call(t), v == p ? v = $: v != $ && (l = d(t))),
            h || (g = _.call(e), g == p ? g = $: g != $ && (h = d(e)));
            var y = v == $,
            b = g == $,
            w = v == g;
            if (w && !l && !y) return c(t, e, v);
            if (!i) {
                var x = y && k.call(t, "__wrapped__"),
                T = b && k.call(e, "__wrapped__");
                if (x || T) return n(x ? t.value() : t, T ? e.value() : e, r, i, o, s)
            }
            if (!w) return ! 1;
            o || (o = []),
            s || (s = []);
            for (var S = o.length; S--;) if (o[S] == t) return s[S] == e;
            o.push(t),
            s.push(e);
            var j = (l ? a: u)(t, e, n, r, i, o, s);
            return o.pop(),
            s.pop(),
            j
        }
        function a(t, e, n, r, o, s, a) {
            var c = -1,
            u = t.length,
            l = e.length;
            if (u != l && !(o && l > u)) return ! 1;
            for (; ++c < u;) {
                var f = t[c],
                d = e[c],
                h = r ? r(o ? d: f, o ? f: d, c) : undefined;
                if (h !== undefined) {
                    if (h) continue;
                    return ! 1
                }
                if (o) {
                    if (!i(e,
                    function(t) {
                        return f === t || n(f, t, r, o, s, a)
                    })) return ! 1
                } else if (f !== d && !n(f, d, r, o, s, a)) return ! 1
            }
            return ! 0
        }
        function c(t, e, n) {
            switch (n) {
            case v:
            case g:
                return + t == +e;
            case y:
                return t.name == e.name && t.message == e.message;
            case b:
                return t != +t ? e != +e: t == +e;
            case w:
            case x:
                return t == e + ""
            }
            return ! 1
        }
        function u(t, e, n, r, i, o, s) {
            var a = h(t),
            c = a.length;
            if (c != h(e).length && !i) return ! 1;
            for (var u = c; u--;) {
                var l = a[u];
                if (! (i ? l in e: k.call(e, l))) return ! 1
            }
            for (var f = i; ++u < c;) {
                l = a[u];
                var d = t[l],
                p = e[l],
                m = r ? r(i ? p: d, i ? d: p, l) : undefined;
                if (! (m === undefined ? n(d, p, r, i, o, s) : m)) return ! 1;
                f || (f = "constructor" == l)
            }
            if (!f) {
                var v = t.constructor,
                g = e.constructor;
                if (v != g && "constructor" in t && "constructor" in e && !("function" == typeof v && v instanceof v && "function" == typeof g && g instanceof g)) return ! 1
            }
            return ! 0
        }
        function l(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        var f = t("lodash.isarray"),
        d = t("lodash.istypedarray"),
        h = t("lodash.keys"),
        p = "[object Arguments]",
        m = "[object Array]",
        v = "[object Boolean]",
        g = "[object Date]",
        y = "[object Error]",
        b = "[object Number]",
        $ = "[object Object]",
        w = "[object RegExp]",
        x = "[object String]",
        T = Object.prototype,
        k = T.hasOwnProperty,
        _ = T.toString;
        e.exports = o
    },
    {
        "lodash.isarray": 23,
        "lodash.istypedarray": 25,
        "lodash.keys": 26
    }],
    25 : [function(t, e, n) {
        function r(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= s
        }
        function i(t) {
            return !! t && "object" == typeof t
        }
        function o(t) {
            return i(t) && r(t.length) && !!a[u.call(t)]
        }
        var s = 9007199254740991,
        a = {};
        a["[object Float32Array]"] = a["[object Float64Array]"] = a["[object Int8Array]"] = a["[object Int16Array]"] = a["[object Int32Array]"] = a["[object Uint8Array]"] = a["[object Uint8ClampedArray]"] = a["[object Uint16Array]"] = a["[object Uint32Array]"] = !0,
        a["[object Arguments]"] = a["[object Array]"] = a["[object ArrayBuffer]"] = a["[object Boolean]"] = a["[object DataView]"] = a["[object Date]"] = a["[object Error]"] = a["[object Function]"] = a["[object Map]"] = a["[object Number]"] = a["[object Object]"] = a["[object RegExp]"] = a["[object Set]"] = a["[object String]"] = a["[object WeakMap]"] = !1;
        var c = Object.prototype,
        u = c.toString;
        e.exports = o
    },
    {}],
    4 : [function(t, e, n) {
        function r(t, e) {
            return null == e ? t: i(e, o(e), t)
        }
        var i = t("lodash._basecopy"),
        o = t("lodash.keys");
        e.exports = r
    },
    {
        "lodash._basecopy": 6,
        "lodash.keys": 26
    }],
    26 : [function(t, e, n) {
        function r(t) {
            return function(e) {
                return null == e ? undefined: e[t]
            }
        }
        function i(t) {
            return null != t && s(y(t))
        }
        function o(t, e) {
            return t = "number" == typeof t || h.test(t) ? +t: -1,
            e = null == e ? g: e,
            t > -1 && t % 1 == 0 && t < e
        }
        function s(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= g
        }
        function a(t) {
            for (var e = u(t), n = e.length, r = n && t.length, i = !!r && s(r) && (d(t) || f(t)), a = -1, c = []; ++a < n;) {
                var l = e[a]; (i && o(l, r) || m.call(t, l)) && c.push(l)
            }
            return c
        }
        function c(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function u(t) {
            if (null == t) return [];
            c(t) || (t = Object(t));
            var e = t.length;
            e = e && s(e) && (d(t) || f(t)) && e || 0;
            for (var n = t.constructor,
            r = -1,
            i = "function" == typeof n && n.prototype === t,
            a = Array(e), u = e > 0; ++r < e;) a[r] = r + "";
            for (var l in t) u && o(l, e) || "constructor" == l && (i || !m.call(t, l)) || a.push(l);
            return a
        }
        var l = t("lodash._getnative"),
        f = t("lodash.isarguments"),
        d = t("lodash.isarray"),
        h = /^\d+$/,
        p = Object.prototype,
        m = p.hasOwnProperty,
        v = l(Object, "keys"),
        g = 9007199254740991,
        y = r("length"),
        b = v ?
        function(t) {
            var e = null == t ? undefined: t.constructor;
            return "function" == typeof e && e.prototype === t || "function" != typeof t && i(t) ? a(t) : c(t) ? v(t) : []
        }: a;
        e.exports = b
    },
    {
        "lodash._getnative": 14,
        "lodash.isarguments": 22,
        "lodash.isarray": 23
    }],
    23 : [function(t, e, n) {
        function r(t) {
            return !! t && "object" == typeof t
        }
        function i(t, e) {
            var n = null == t ? undefined: t[e];
            return c(n) ? n: undefined
        }
        function o(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= y
        }
        function s(t) {
            return a(t) && m.call(t) == l
        }
        function a(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function c(t) {
            return null != t && (s(t) ? v.test(h.call(t)) : r(t) && f.test(t))
        }
        var u = "[object Array]",
        l = "[object Function]",
        f = /^\[object .+?Constructor\]$/,
        d = Object.prototype,
        h = Function.prototype.toString,
        p = d.hasOwnProperty,
        m = d.toString,
        v = RegExp("^" + h.call(p).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        g = i(Array, "isArray"),
        y = 9007199254740991,
        b = g ||
        function(t) {
            return r(t) && o(t.length) && m.call(t) == u
        };
        e.exports = b
    },
    {}],
    22 : [function(t, e, n) {
        function r(t) {
            return o(t) && m.call(t, "callee") && (!g.call(t, "callee") || v.call(t) == f)
        }
        function i(t) {
            return null != t && a(t.length) && !s(t)
        }
        function o(t) {
            return u(t) && i(t)
        }
        function s(t) {
            var e = c(t) ? v.call(t) : "";
            return e == d || e == h
        }
        function a(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= l
        }
        function c(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function u(t) {
            return !! t && "object" == typeof t
        }
        var l = 9007199254740991,
        f = "[object Arguments]",
        d = "[object Function]",
        h = "[object GeneratorFunction]",
        p = Object.prototype,
        m = p.hasOwnProperty,
        v = p.toString,
        g = p.propertyIsEnumerable;
        e.exports = r
    },
    {}],
    14 : [function(t, e, n) {
        function r(t) {
            return !! t && "object" == typeof t
        }
        function i(t, e) {
            var n = null == t ? undefined: t[e];
            return a(n) ? n: undefined
        }
        function o(t) {
            return s(t) && h.call(t) == c
        }
        function s(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        }
        function a(t) {
            return null != t && (o(t) ? p.test(f.call(t)) : r(t) && u.test(t))
        }
        var c = "[object Function]",
        u = /^\[object .+?Constructor\]$/,
        l = Object.prototype,
        f = Function.prototype.toString,
        d = l.hasOwnProperty,
        h = l.toString,
        p = RegExp("^" + f.call(d).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = i
    },
    {}],
    6 : [function(t, e, n) {
        function r(t, e, n) {
            n || (n = {});
            for (var r = -1,
            i = e.length; ++r < i;) {
                var o = e[r];
                n[o] = t[o]
            }
            return n
        }
        e.exports = r
    },
    {}],
    3 : [function(t, e, n) {
        function r(t, e) {
            for (var n = -1,
            r = t.length; ++n < r && !1 !== e(t[n], n, t););
            return t
        }
        e.exports = r
    },
    {}]
},
{},
[42]);