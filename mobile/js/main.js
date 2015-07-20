function setCookie(name, value, expiresYears) { // 设置cookie
	var cookieString = name + '=' + escape(value) + ';',
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
		if (name == cookieArr[i].split('=')[0]) {
			result = cookieArr[i].split('=')；
			return result;
		}
	}

}

function deleteCookie(name) { // 删除cookie
	
}