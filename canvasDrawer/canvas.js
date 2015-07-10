

window.onload = function () {
    init();

}
    
function init() {
    var theCanvas = document.getElementById("canvas");
    var cc = theCanvas.getContext("2d");
    theCanvas.width = 1000;
    theCanvas.height=400;
    //背景
    cc.fillStyle = "#eaeaea";
    cc.fillRect(0, 0, 1000, 400);
    //边框
    //cc.strokeStyle = "blue";
    //cc.strokeRect(0,0,1000,400);
    //建立网格
   /* cc.strokeStyle="#808080"
    cc.beginPath();
    for(i=1;i<10;i++){
        cc.moveTo(100*i,0);
        cc.lineTo(100*i,400);
    }
    for(i=1;i<4;i++){
        cc.moveTo(0,100*i);
        cc.lineTo(1000,100*i);
    }
    cc.stroke();
    cc.closePath();
    */
    /*
    //方形
    cc.strokeStyle = "red";//线条颜色
    cc.lineWidth = 2;//线宽
    cc.beginPath();
    cc.moveTo(100,10);
    cc.lineTo(100,110);
    cc.lineTo(200,110);
    cc.lineTo(200,10);
    cc.lineTo(100,10);
    cc.stroke();//无该语句无法绘图
    cc.closePath();//结束路径避免错误
    //圆弧
    cc.strokeStyle = "yellow";
    cc.beginPath();
    cc.arc(300,300,100,0,Math.PI/180*300,false)//最后一个参数设为false则超过180自动取补角(x,y,r,start,end,true/false)
    cc.stroke();
    cc.closePath();
    //贝塞尔曲线
    cc.strokeStyle = "black";
    cc.beginPath();
    cc.bezierCurveTo(100,100,200,200,320,220);//立方贝塞尔曲线(x1,y1,x2,y2,x,y)
    cc.stroke();
    cc.closePath();
    cc.beginPath();
    cc.quadraticCurveTo(200,100,300,400);//平方贝塞尔曲线(x1,y1,x2,y2)
    cc.stroke();
    cc.closePath();
    //渐变填充
        //线性
    var gr = cc.createLinearGradient(100,100,200,200);//渐变路径
         //添加颜色断点
    gr.addColorStop(0,"yellow");
    gr.addColorStop(1,"green");
    cc.fillStyle = gr;
    cc.fillRect(100,100,100,100);
    cc.arc(300,300,100,0,Math.PI/180*360,false)
    cc.fill();
        //径向
    var gr2 = cc.createRadialGradient(400,100,100,600,200,100);//(圆心坐标,半径,圆心坐标,半径)
    gr2.addColorStop(0,"orange");
    gr2.addColorStop(0.8,"green");
    gr2.addColorStop(1,"blue");
    cc.fillStyle = gr2;
    cc.fillRect(300,100,300,400);
    cc.fill();
    //文字
    cc.font="40px Arial";
    cc.fillText("Hello World",100,50);
    
    //图像
    var image = new Image();
    image.src="001.jpg";
    image.onload = function () { //图片只有加载完之后才能绘制 否则什么也不会发生
        cc.drawImage(image,500,200,100,100);
        cc.drawImage(image,100,100,200,100,200,200,100,100)//图像从源位置被裁切出一块复制到目标位置(源坐标,大小,目标坐标,大小)；
    };
    //简单帧动画
    var i = 1;
    cc.setTransform(1,0,0,1,0,0);//变换的必须条件
    cc.translate(200,200);//将变换基点移动至200,200
    function animate() {
        //cc.fillStyle="#FF2726"
        //cc.fillRect(0,0,100,100);//左上顶点,长宽
        //var gr3 = cc.createRadialGradient(200, 200+i*100, 50, 200, 200, 100);
        //gr3.addColorStop(0, "#eaeaea");
        //gr3.addColorStop(0.5, "#ccc");
        //gr3.addColorStop(1, "#888");
        //cc.fillStyle = gr3;
        cc.fillStyle = "#eaeaea";
        cc.beginPath();
        cc.arc(0, 0, 50, 0, Math.PI/180*360, false);
        //cc.fill();
        cc.fill();
        cc.closePath();
        cc.strokeStyle = "#FFD426";
        cc.scale(1+0.2*i,1+0.2*i);//大小变换
        cc.rotate(60*Math.PI/180);//旋转
        cc.beginPath();
        cc.arc(0, 0, 50, 0, Math.PI/180*300, false);
        //cc.fill();
        cc.stroke();
        cc.closePath();
        i++;
        if (i >= 2) { i=-1;};
        //alert(i);
        
    };
    
    setInterval(animate,1000);
    */
 
    var i;
    var j;
    var speed = 5;
    var y = 15;
    var x = 15; 
    var px;
    var py;
    var flag = 0;
    //var keyPress = 0;
    var clUsing="#000";
    var penUsing="15";
    var pickers=document.getElementById("colorPicker");
    var pens=document.getElementById("penPicker");
    //绑定鼠标绘图事件
    theCanvas.addEventListener("mousedown",mouseDown,false);
    theCanvas.addEventListener("mousemove",mouseDraw,false);
       
    document.onmouseup = function (e) {
        flag = 0;
    }
    //绑定键盘绘图事件
    document.addEventListener("keydown",keyDraw,false);
    //绑定调色板点击事件
    for(i=0;i<11;i++){
        pickers.children[i].addEventListener("click",colorChange,false);
           
    };
    //绑定笔刷大小选择点击事件
    for(i=0;i<4;i++){
        pens.querySelectorAll("a")[i].addEventListener("click",penChange,false);
           
    };
    pickers.children[0].style.border="2px solid #eaeaea";//默认颜色为黑色 加高亮
    pens.querySelectorAll("a")[1].style.border="2px solid #eaeaea";//默认笔刷大小为30px
    document.getElementById("colorCtr").onchange=colorChange;//拾色器
    function colorChange() {
        //先处理高亮提示
        for(i=0;i<11;i++){
            pickers.children[i].style.border="2px solid #ccc";
        };
        this.style.border="2px solid #eeeeee";         
        if (this.value == undefined) {
            var clChosing = this.getAttribute("class").substr(2); //截取class的数值部分
            var clSelection = new Array("#000", "#808080", "#fff", "#f00", "#ffd800", "#00ff21", "#0094ff", "#4800ff", "#b200ff", "#ff00dc","#eaeaea");
            clChosing = parseInt(clChosing); //没有这个他不认识字符串过来的……
            switch (clChosing) {
                case 1: clUsing = clSelection[0]; break;
                case 2: clUsing = clSelection[1]; break;
                case 3: clUsing = clSelection[2]; break;
                case 4: clUsing = clSelection[3]; break;
                case 5: clUsing = clSelection[4]; break;
                case 6: clUsing = clSelection[5]; break;
                case 7: clUsing = clSelection[6]; break;
                case 8: clUsing = clSelection[7]; break;
                case 9: clUsing = clSelection[8]; break;
                case 10: clUsing = clSelection[9]; break;
                case 11: clUsing = clSelection[10]; break;
            }
        } else {
            clUsing = this.value;
        }
       
        return clUsing;
       
    }
    function penChange() {
        //先处理高亮提示
        for(i=0;i<4;i++){
            pens.querySelectorAll("a")[i].style.border="2px solid #ccc";
        };
        this.style.border="2px solid #eeeeee";
        var penChosing = this.getAttribute("class").substr(3); //截取class的数值部分
        penUsing = (5 - penChosing) * 5;
        return penUsing;
    }

    function drawScreen() { //键盘控制画图
        x += speed*i;
        y += speed*j;
        dotDrawing(clUsing, penUsing, x, y);
        if (y <= 0) { y = 400; }
        else  if (y >= 400) { y = 0; }
        if (x <= 0) { x = 1000; }
        else if (x >= 1000) { x = 0; }
    }

    function dotDrawing(clUsing,penUsing,opx,opy) {//画图基础函数
        cc.fillStyle = clUsing;
        cc.beginPath();
        cc.arc(opx, opy, penUsing, 0, Math.PI * 2);
        cc.closePath();
        cc.fill();
    }
    function keyDraw(e) {//键盘控制移动
        var e = e||window.event;
        switch (e.keyCode) {
            case 38: //上
                {

                    i = 0;
                    j = -1;
                    drawScreen();

                }
                break;
            case 40: //下
                {
                    i = 0;
                    j = 1;
                    drawScreen();

                }
                break;
            case 37: //左
                {
                    i = -1;
                    j = 0;
                    drawScreen();

                }
                break;
            case 39: //右
                {
                    i = 1;
                    j = 0;
                    drawScreen();

                }


        }
    }
    function mouseDraw(e) {//鼠标绘图
        var e = e||window.event;
        if (flag == 1) {//鼠标左键已经按下
            px = e.pageX;
            py = e.pageY;
            dotDrawing(clUsing,penUsing,px,py)
            x>=1000?x=1000:x=px;
            y>=400?y=400:y=py;
        }
        else {
            return false;

        }
        
    }
    function mouseDown(e) {//按下鼠标左键开始绘图
        var e = e||window.event;
        if (e.button == 0) {//点击左键
            flag = 1;
            px = e.pageX;
            py = e.pageY;
            // alert(px, py);
           dotDrawing(clUsing,penUsing,px,py)
        }
    }
    
}