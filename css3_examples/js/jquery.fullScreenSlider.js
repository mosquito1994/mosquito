/*
	全屏适应轮播图插件
	使用方法:直接调用$(window).fullScreenSlider()，也可设置参数；
	作者：mosquito 邮箱：448014661@qq.com
*/
;(function($){
	$.fn.fullScreenSlider=function(options){
		var defaults={
			idName:"slider",//外围容器id
			className:"slider",//含图片的ul列表的class
			spareHeight:0,//如果希望为其他页面元素空出位置(如顶端导航栏)请设置该高度
			imgHander:"hidden",//hidden保持图片长宽比，多余部分隐藏,高度不足则竖直居中||cover将图片进行拉伸铺满屏幕
			delay:3000,//图片滚动的时间间隔
			autoDir:"right"//图片自动滚动方向 left||right
		}
		var options=$.extend(defaults,options);
		return this.each(function(){
			
			var mosId=$("#"+options.idName),
				mosClass=$("."+options.className),
				mosLi=mosClass.children("li"),
				h=$(window).height()-options.spareHeight,
				w=$(window).width(),
				t,
				currentPic=1,
				picNum=mosClass.children("li").last().index(),
				lastPic=1,
				ulLeft="<ul class='mos-focus-dot'>",
				ulRight="</ul>",
				ulMid="";
			//各元素尺寸设定和窗口大小适配
			function resizable(){
				h=$(window).height()-options.spareHeight;
				w=$(window).width();
				mosClass.find("img").width(w);//设置为100%在ie下有问题
				//设置外围容器尺寸
				mosId.height(h);
				//设置图片尺寸
				if(options.imgHander=="cover"){
					$("."+options.className).find("img").height(h);
				}
				//设置左右箭头尺寸
				$(".mos-array-left,.mos-array-right").css({
					height:h+"px",
					width:"100px"
				});
				//设置图片列表ul宽度
				mosClass.css({
					position: "relative",
					left: -w+"px",
					width: (mosClass.children("li").last().index()+1)*w+"px"
				});
			}
			//防止出现水平滚动条
			$("body").css("overflow-x","hidden");
			//设置相关样式
			mosId.css({
				width:"100%",
				overflow:"hidden",
				position:"relative"
			});
			mosLi.css({
				float: "left",
				position: "relative"
			});
			//将第一张和最后一张图片复制一份各加至末尾和开头以配合动画
			mosLi.first().clone().appendTo(mosClass);
			mosClass.children("li").eq(picNum).clone().prependTo(mosClass);
			mosLi=mosClass.children("li");
			//找到每个li中文字描述所在的div并添加样式
			for(var i=0;i<picNum+2;i++){
				findContent(mosLi.eq(i));
			}
			//添加左右滚动箭头
			var arrayLeft="<a class='mos-array-left'><img src='images/array-left.png' /></a>";
			var arrayRight="<a class='mos-array-right'><img src='images/array-right.png' /></a>";
			mosId.append(arrayRight);
			mosId.append(arrayLeft);			
			//添加焦点列表并居中	
			for(i=0;i<=picNum;i++){
				ulMid+="<li></li>";
			}
			var ul=ulLeft+ulMid+ulRight;
			mosId.append(ul);
			var dot=$(".mos-focus-dot");
			var ulWidth=dot.width();
			var ulHeight=dot.height();
			dot.css({
				marginLeft:-ulWidth*0.5,
				marginTop:-ulHeight*0.5
			});
			//第一个焦点设为active
			dot.children("li").eq(0).addClass("mos-dot-active");
			//点击焦点列表
			function dotClick(){
				lastPic=currentPic;
				currentPic=$(this).index()+1;
				$(this).addClass("mos-dot-active").siblings().removeClass("mos-dot-active");
				clearInterval(t);
				animate();
				autoSlider();
			}
			//向右滚动
			function goRight(){
				lastPic=currentPic;
				currentPic++;
				animate(-1);
			}
			//向左滚动
			function goLeft(){
				lastPic=currentPic;
				currentPic--;
				animate(1);
			}
			//切换动画
			function animate(para){
				var step=-currentPic*w,
					dotNum;
				mosClass.stop(true,true).animate({
					left: step,
					easing: "ease-in-out"
				},function(){
					if(currentPic==(picNum+2)&&para==-1){
						mosClass.css({
							left: -w+"px"
						});
						currentPic=1;
					}else if(currentPic==0&&para==1){
						mosClass.css({
							left: -w*(picNum+1)+"px"
						});
						currentPic=picNum+1;
					}
				});
				//焦点跟随
				if(currentPic==picNum+2){
					dotNum=0;
				}else if(currentPic==0){
					dotNum=picNum;
				}else{
					dotNum=currentPic-1;
				}
				dot.children("li").eq(dotNum).addClass("mos-dot-active").siblings().removeClass("mos-dot-active");
			}
			//自动滚动
			function autoSlider(){
				if(options.autoDir=="right"){
					t=setInterval(goRight,options.delay);
				}else{
					t=setInterval(goLeft,options.delay);
				}
			}
			//找到文字描述所在的div并添加样式
			function findContent(obj){
				var content=obj.find("img").next()||"",
					firstChild=(content.length!="")?content.children().eq(0):"";
					console.log(firstChild);
				(content!="")?content.addClass("mos-description"):"";
				if(firstChild!=""){
					console.log(firstChild.get(0).tagName);
					if(firstChild.get(0).tagName.match(/^h\d$/i)){
						firstChild.addClass("mos-description-head");
					}
				}
			}
			//自动滚动以及窗口大小改变自适应
			resizable();
			autoSlider();
			//事件绑定
			$(window).bind("resize",resizable);
			dot.children("li").bind("click",dotClick);
			$(".mos-array-right").bind("click",function(){
				clearInterval(t);
				goRight();
				autoSlider();
			});
			$(".mos-array-left").bind("click",function(){
				clearInterval(t);
				goLeft();
				autoSlider();
			});
		})
	}
})(jQuery)