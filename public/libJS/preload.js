'use strict';

(function () {
	if (typeof window.CustomEvent === 'undefined') {
		var _CustomEvent = function _CustomEvent(event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('Events');
			var bubbles = true;
			for (var name in params) {
				name === 'bubbles' ? bubbles = !!params[name] : evt[name] = params[name];
			}
			evt.initEvent(event, bubbles, true);
			return evt;
		};

		;
		_CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = _CustomEvent;
	}
})();

var mui = {};
(function ($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [function () {
			//wechat
			var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
			if (wechat) {
				//wechat
				this.os.wechat = {
					version: wechat[2].replace(/_/g, '.')
				};
			}
			return false;
		}, function () {
			//android
			var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);

			if (android) {
				this.os.android = true;
				this.os.version = android[2];

				this.os.isBadAndroid = !/Chrome\/\d/.test(window.navigator.appVersion);
			}
			return this.os.android === true;
		}, function () {
			//ios
			var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
			if (iphone) {
				//iphone
				this.os.ios = this.os.iphone = true;
				this.os.version = iphone[2].replace(/_/g, '.');
			} else {
				var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
				if (ipad) {
					//ipad
					this.os.ios = this.os.ipad = true;
					this.os.version = ipad[2].replace(/_/g, '.');
				}
			}
			return this.os.ios === true;
		}, function () {
			var plus = ua.match(/Html5Plus/i); //TODO 5\+Browser?
			if (plus) {
				this.os.plus = true;
			};
		}];
		[].every.call(funcs, function (func) {

			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(mui, window);
(function ($) {
	$.isWindow = function (obj) {
		return obj != null && obj === obj.window;
	};
	/**
  * mui isObject
  */
	$.type = function (obj) {
		var class2type = {};
		return obj == null ? String(obj) : class2type[({}).toString.call(obj)] || "object";
	};
	$.isObject = function (obj) {
		return $.type(obj) === "object";
	};
	/**
  * mui isPlainObject
  */
	$.isPlainObject = function (obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	$.fire = function (webview, eventType, data) {
		if (webview) {
			if (data !== '') {
				data = data || {};
				if ($.isPlainObject(data)) {
					data = JSON.stringify(data || {}).replace(/\'/g, '\\u0027').replace(/\\/g, '\\u005c');
				}
			}
			webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "','" + data + "')");
		}
	};

	$.receive = function (eventType, data) {
		if (eventType) {
			try {
				if (data) {
					data = JSON.parse(data);
				}
			} catch (e) {}
			$.trigger(document, eventType, data);
		}
	};
	$.trigger = function (element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	$.plusReady = function (fun) {
		if (window.plus) {
			fun();
		} else {
			document.addEventListener('plusready', fun, false);
		}
	};
	return $;
})(mui);
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

Object.assign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
var objDeepCopy = function objDeepCopy(source) {
	var sourceCopy = source instanceof Array ? [] : {};
	for (var item in source) {
		sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
	}
	return sourceCopy;
};

/**
 * 驼峰写法
 * @param  {String} str 要转化的字符串
 * @return {String}     转化后的字符串
 */

function camelCase(str) {
	return str.replace(/-([a-z])/g, function ($0, $1) {
		return $1.toUpperCase();
	}).replace('-', '');
}

/**
 * 格式化css属性对象
 * @param  {Object} props 属性对象
 * @return {Object}       添加前缀的格式化属性对象
 */
function formatCss(props) {
	var prefixs = ['-webkit-', '-moz-', '-ms-'];

	var result = {};

	var regPrefix = /transform|transition|animation/;

	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			var styleValue = props[key];

			// 如果检测是transform或transition属性
			if (regPrefix.test(key)) {
				for (var i = 0; i < prefixs.length; i++) {
					var styleName = camelCase(prefixs[i] + key);
					result[styleName] = styleValue.replace(regPrefix, prefixs[i] + '$&');
				}
			}

			result[key] = styleValue;
		}
	}

	return result;
}

function getWeek(week) {
	switch (week) {
		case 0:
			return '星期天';
		case 1:
			return '星期一';
		case 2:
			return '星期二';
		case 3:
			return '星期三';
		case 4:
			return '星期四';
		case 5:
			return '星期五';
		case 6:
			return '星期六';
	}
}
function getDateInfo(time) {
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	var week = getWeek(time.getDay());
	return { year: year, month: month, day: day, week: week };
}

/*获取时间 至小时值*/
function getDateTime(time) {
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	var week = getWeek(time.getDay());
	var hour = time.getHours();
	hour < 10 ? hour="0"+hour : hour = hour;
	return { year: year, month: month, day: day, week: week,hour:hour};
}

var Preload = {
	url: "http://202.103.199.181:8888/MeteoAPP/",
	pre: {},
	pages: {},

	show: function show(id, animate) {
		var _this = this;
		animate = animate || "slide-in-right";
		//this.pages[id].setVisible(false)
		plus.webview.show(id, animate, 250, function () {}, { acceleration: "auto" });
	},
	//showPage:function(url,id,data,animate){
	showPage: function showPage(id, data, animate) {
		//this.override(id)
		if (data) {
			var detailPage = plus.webview.getWebviewById(id);
			var json = {};
			//	mui.extend(json,data);
			//alert(json.id)
			mui.fire(detailPage, id, data);
		}
		this.show(id, animate);
	},
	preloadPage: function preloadPage(data, name, flag) {
		if (data && data.length > 0 && !this.pre[name]) {
			this.pre[name] = true;
			var _this = this;
			
			data.forEach(function (item, index) {
				_this.pages[item.id] = plus.webview.getWebviewById(item.id) || plus.webview.create(item.url, item.id, Object.assign({}, {statusbar:{background:"#0E7BE0"},popGesture:'hide', softinputMode: "adjustResize", scrollIndicator: 'none', backButtonAutoControl: 'hide' }, item.json));
			});
		}
	},
	ajax: function ajax(json) {
		//console.log(JSON.stringify(json));
		var async = true;
		if (json.async==false) {
			async=json.async;
		}
		$.ajax({
			type: json.type || "get",
			cache: false,
			async:async,
			url: this.url + json.url,
			data: json.data || {},
			timeout: json.timeout || 0,
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			success: function success(data) {
				//console.log(data) 
				json.fun && json.fun(data);
			},
			error: function error() {
				//console.log("操作失败");
				json.err && json.err();
			}
		});
	},
	back: function back() {
		var _this = this;
	},
	hide: function hide() {
		plus.webview.currentWebview().hide("pop-out");
	},
	close:function close(){
		plus.webview.currentWebview().close("pop-out");
	},
	closePage:function closePage(animate){
		plus.webview.currentWebview().close(animate);
	},
	setColor:function setColor(color){
		plus.navigator.setStatusBarBackground(color);
	},
	quit: function quit(flag) {
		var first = null;
		plus.key.addEventListener("backbutton", function () {
			//首次按键，提示‘再按一次退出应用’	 		 
			if (!first) {
				first = new Date().getTime();
				plus.nativeUI.toast('再按一次退出应用');
				setTimeout(function () {
					first = null;
				}, 2000);
			} else {
				if (new Date().getTime() - first < 2000) {
					!flag && Preload.ajax({ url: 'data/loginout.svt', fun: function fun(data) {
							console.log(data);
						} }); //退出登录
					plus.runtime.quit();
				}
			}
			return false;
		});
	},
	eventHide:function(){
		if(mui.os.ios){
			plus.webview.currentWebview().addEventListener('hide', function(){
					Preload.w && Preload.w.close() && (Preload.w = null);
			}, false);
		}
	}
};
var TouchFeed = (function (c) {
	var eventData = {},
	    feedbackClass = 'touch-feed-back';
	var classUtil = {
		hasClass: function hasClass(elem, cls) {
			cls = cls || '';
			if (cls.replace(/\s/g, '').length == 0) return false;
			return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
		},
		addClass: function addClass(elem, cls) {
			if (!this.hasClass(elem, cls)) {
				elem.className += ' ' + cls;
			}
		},
		removeClass: function removeClass(elem, cls) {
			if (this.hasClass(elem, cls)) {
				var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
				while (newClass.indexOf(' ' + cls + ' ') >= 0) {
					newClass = newClass.replace(' ' + cls + ' ', ' ');
				}
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		},
		closest: function closest(elem, attribute) {
			var cur, match;
			for (cur = elem; cur; cur = cur.parentNode) {
				if (cur.nodeType < 11 && cur.nodeType === 1 && cur.getAttribute(attribute) === 'true') {
					break;
				}
			}
			return cur;
		}
	};
	c.componentWillMount = function () {

		//React.initializeTouchEvents(true)
	};
	c.touchStart = function (e) {
		var event = e.changedTouches ? e.changedTouches[0] : e,
		    identifier = eventData[event.identifier] = {};
		identifier.startY = event.pageY;
		identifier.startX = event.pageX;
		identifier.target = classUtil.closest(event.target, 'data-feedback');
		if (identifier.target) {
			classUtil.addClass(identifier.target, feedbackClass);
		}
	};
	/*c.touchMove=function(e){
 	var event = e.changedTouches ? e.changedTouches[0] : e,
               identifier = eventData[event.identifier];
           if (identifier.target && event.target && Math.abs(identifier.startY - event.pageY) > 0) {
               //classUtil.removeClass(identifier.target, feedbackClass);
           }
 }	*/
	c.touchCancel = function (e) {
		var event = e.changedTouches ? e.changedTouches[0] : e,
		    identifier = eventData[event.identifier];
		if (identifier.target) {
			classUtil.removeClass(identifier.target, feedbackClass);
		}
		delete eventData[event.identifier];
	};
	return c;
})({});
var Observe = (function () {
	var subscribe, obj, one, remove, publish, __this;
	obj = {};__this = this;
	subscribe = function (key, eventfn) {
		//订阅
		var stack, _ref; //stack放入订阅函数
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		stack.push(eventfn);
	};
	one = function (key, eventfn) {
		remove(key);
		subscribe(key, eventfn);
	};
	remove = function (key) {
		var _ref;
		if ((_ref = obj[key]) != null) {
			_ref = null;
			delete obj[key];
		}
	};
	publish = function (key, data) {
		//发布
		var fn, stack, _i, _len, _ref;
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		for (_i = 0, _len = stack.length; _i < _len; _i++) {
			fn = stack[_i];
			fn.call(__this, data);
		}
	};
	return {
		subscribe: subscribe,
		one: one,
		remove: remove,
		publish: publish
	};
})();
var cancelUpdate = (function (c) {
	c.shouldComponentUpdate = function (props) {
		return false;
	};
	c.statusHeight=function(number,top){
		var height=window.localStorage.getItem('statusbarHeight')||0;
		    top=top||0;
		return {paddingTop:parseInt(height)+top+'px',height:parseInt(height)+(number||44)+'px'}
	}
	return c;
})({});

document.addEventListener('DOMContentLoaded', function () {
	calculateScale();
}, false);
function calculateScale() {
	var scale = (window.screen.width / 375).toFixed(2);
	var content = 'width=' + 375 + ', initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';
	$('meta[name="viewport"]').attr('content', content);
}
function getBodyTop(number){//获取主体top值
	var height=window.localStorage.getItem('statusbarHeight')||0;
	return {top:parseInt(height)+(number||44)+'px'}
}
/*产品浏览访问统计*/
function productAccess(value) {
	//console.log(value)
	var data={
		type:"visit",
		text:value,
		memo:''
	}
	var w=null;
	Preload.w=w;
	Preload.ajax({
		url:'app/browse.svt',
		data:data,
		fun:function(data){
			//console.log("请求成功")
		},
		err:function(data){
			//console.log('请求失败')
		}
	})
}
//节流函数
 /* var throttle = function (fn, delay, atleast) {
        var timer = null;
        var previous = null;

        return function () {
            var now = +new Date();

            if ( !previous ) previous = now;
            if ( atleast && now - previous > atleast ) {
                fn();
                // 重置上一次开始时间为本次结束时间
                previous = now;
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    };*/

