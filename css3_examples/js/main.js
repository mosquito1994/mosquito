//插件调用
$(function(){
	$(window).fullScreenScroll({
		easing:"easeOutBack"
	});
	$(window).fullScreenSlider({
		spareHeight:40
	});

})
$(window).scroll(function(){
	var offTop=$(this).scrollTop();
	var wh=$(this).height();
	var screenNum=Math.floor(offTop/wh);
	switch(screenNum){
		case 1:goIn("rotate-title");break;
		case 2:goIn("rotate-example");break;
		case 3:goIn("scale-title");break;
	}
});
$(".bg1").click(function(){goIn("rotate-title")});
$(".bg2").click(function(){goIn("rotate-example")});
$(".bg3").click(function(){goIn("scale-title")});
function goIn(className){
	$("."+className).show();
}

