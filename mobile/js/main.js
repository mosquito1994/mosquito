(function(){
	var page, //定义当前添加导航内容的页面，在某一页面点击“更多”之后赋值
		addBtn = getElementByAttr('href', '#add')
		addSite = document.getElementById('site-submit'); 

	addSite.addEventListener('touch', addSite, false);
	for(var i = 0, alength = addBtn.length; i < alength; i++) {
		addBtn[i].addEventListener('touch', setPage, false);
	}

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

		return (result.length == 1) ? result[0] : result; // 单个元素只返回元素不返回数组
	}

	function setPage(){ // 控制cookie添加到哪个页面
		page = this.getAttribute('name');
	}

	function setCookie(name, loc, page, expiresYears) { // 设置cookie
		var cookieString = 'name=' + escape(name) + '&loc=' + escape(loc) + ';path=' + page + ';',
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

	function addSite() { //点击添加按钮
		var siteName = document.getElementById('site-name'),
			siteLoc = document.getElementById('site-loc');
 
		setCookie(siteName, siteLoc, page);	
		console.log(document.cookie + ' ' + page);
	}
}())