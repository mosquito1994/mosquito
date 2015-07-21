var page, //定义当前添加导航内容的页面，在某一页面点击“更多”之后赋值
	addBtn = getElementByAttr('href', '#add'); 


function getElementByAttr(attr, value) { // 通过属性获取元素，主要用于获取href="#add"的a标签
	var all = document.all,
		result = new Array();

	for (var i = 0, al = all.length; i < al; i++) {
		if (all[i].getAttribute(attr) != null) {
			if (all[i].getAttribute(attr).indexOf(value) != -1) {
				result.push(all[i]);
			}
		}
	}

	return result.length == 1 ? result[0] : result; // 单个元素只返回元素不返回数组
}

function setCookie(name, loc, page, expiresYears) { // 设置cookie
	var cookieString = 'name=' + escape(name) + '&loc=' + escape(loc) + '&page=' + page + ';',
		date = new Date();

	if (expiresYears > 0) {
		date.setTime(date.getTime() + expiresYears * 365 * 24 * 3600 * 1000);
		cookieString += 'expires=' + date.toGMTString() + ';';
	}
}

function getCookie(name) { // 获取cookie
	var cookieArr = document.cookie.split(';'),
		result = new Array();

	for (var i = 0, al =cookieArr.length; i < al; i++) {
		if (cookieArr[i].indexOf(name) != -1) {
			result = cookieArr[i].split('&');
			return result;
		}
	}

}

function deleteCookie(name) { // 删除cookie
	
}

function addSite() { //点击
	var siteName = document.getElementById('site-name'),
		siteLoc = document.getElementById('site-loc');

	setCookie(siteName, siteLoc, page);	
}