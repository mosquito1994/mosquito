/*
	本插件用于实现全屏滚动效果(请使用ie9+)
	使用说明：
	  1.将每一屏用一个容器包裹并设置合适的className，默认为section
	  2.引入jquery库文件
	  3.引入该文件
	  4.在你的js中调用$(window).fullScreenScroll()
	  5.也可设置参数className、delay和easing效果，非基本过渡效果则需要jquery.easing.js的支持
	欢迎反馈bug
	作者：mosquito 邮箱:448014661@qq.com
*/
;(function($){
	$.fn.fullScreenScroll=function(options){
		var defaults={
			className:"section",//容器名
			easing:"ease",//过渡方式
			delay:1000//滚动时间
		}
		var options=$.extend(defaults,options);
		return this.each(function(){
			
			var h;//滚轮每次滚动也用到，不能作为局部变量
			//按是否火狐添加事件处理程序
			window.addEventListener("mousewheel",scrollHander,false);
			window.addEventListener("DOMMouseScroll",scrollHander,false);//火狐
			//防止出现水平滚动条
			$("body").css("overflow-x","hidden");
			function resizable(){
				//获取窗口尺寸
				var w=$(window).width();
				h=$(window).height();
				//设置每一块全屏大小
				$("."+options.className).height(h);
				$(window).resize(function(){
					$("."+options.className).height(h);
				});
			}
			//判断滚动方向，仍按是否火狐处理
			function scrollDir(e){
				e=arguments.callee.caller.arguments[0]||window.event;//郁闷 这里用e火狐死活不识别
				var dir=e.wheelDelta||-e.detail;//分别对应火狐以外和火狐
				return dir;
			}
			//主事件处理程序
			var flag=0;
			function scrollHander(e){
				var dir=(scrollDir()>0)?-1:1;	
				var top=Math.round($(window).scrollTop()/h)*h;//即时停留在某一屏中部也可滚动到另一屏顶部
				var totalHeight=$(document).height();
				var scrollHeight=dir*h+top;
				//阻止滚轮事件
				e=e||window.event;
				e.preventDefault();
				//全屏滚动效果
				if(scrollHeight<0||scrollHeight>totalHeight||flag==1){//到顶或到底或一眼没看
					return false;
				}else{
					$("body,html").stop().animate({//window就没法用scrollTop,不同浏览器支持body/html
						scrollTop:scrollHeight,
						easing:options.easing
					},options.delay);
					flag=1;
				}
				//看了一眼
				setTimeout(function(){flag=0},1500);
			}

			//设置尺寸及窗口大小改变时更改尺寸
			resizable();
			$(window).resize(function(){
				resizable();
			})

		});
	}
})(jQuery)