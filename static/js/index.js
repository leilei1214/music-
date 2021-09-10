function draw() {

    var xmlhttp = new XMLHttpRequest(),
    method = 'POST',
    url = '/index/location';
    //////////////////////////////////////////取資料與三點定位//////////////////////////////////////////
    xmlhttp.open(method, url, true);
    xmlhttp.onload = function () {
        data = JSON.parse(xmlhttp.responseText);
        console.log(data);//rssi1(i,j) rssi2(d,0) rssi3(0,0)
        //data.rssi1 = 1.4;
        //data.rssi2 = 3.68408740396;
        //data.rssi3 = 0;
        //console.log(data.rssi1,data.rssi2,data.rssi3);
        SD1 = -1.4; //座標(0,0)到座標(d,0)的距離
        SD2 = 1.15; //座標(0,0)到座標(i,0)的距離
        SD3 = 3.5; //座標(0,0)到座標(0,j)的距離
        x5 = (Math.pow(data.rssi3, 2) - Math.pow(data.rssi1, 2) + Math.pow(SD1, 2)) / (2*SD1);
        y5 = (Math.pow(data.rssi3, 2) - Math.pow(data.rssi2, 2) - Math.pow(x5, 2) + Math.pow((x5 - SD2), 2) + Math.pow(SD3, 2)) / (2*SD3);
        z5 = Math.pow((Math.pow(data.rssi3, 2) - (Math.pow(x5, 2) + Math.pow(y5, 2))),0.5);
        x5 = x5.toFixed(2);
        y5 = y5.toFixed(2);
        z5 = z5.toFixed(2);
        console.log("x=", x5,"  y=", y5,"  z=",z5);
        // Do something with the retrieved data ( found in xmlhttp.response )
    /////////////////////////////////////////繪製追蹤紅點///////////////////////////////////////////////
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清除畫布
        SD4 = 868; //辦公室X軸距離/分
        SD5 = 540; //辦公室Y軸距離/分
        SD6 = 660; //追蹤點初始X軸座標點/分
        SD7 = 450; //追蹤點初始Y軸座標點/分
        SD8 = canvas.width; //畫布X總長度
        SD9 = canvas.height; //畫布Y總長度



        ctx.fillStyle="#C07AB8";//追蹤點顏色(紫)
        ctx.fillRect(0,0,1,SD9*125/SD5); //門位置
        ctx.fillRect(0          ,SD9*125/SD5,SD8*90/SD4,SD9*415/SD5); //左側牆壁雜物
        ctx.fillRect(SD8*180/SD4,SD9*150/SD5,SD8*180/SD4,SD9*90/SD5); //門口會議桌1
        ctx.fillRect(SD8*360/SD4,SD9*150/SD5,SD8*180/SD4,SD9*90/SD5); //門口會議桌2
        ctx.fillRect(SD8*540/SD4,SD9*150/SD5,SD8*180/SD4,SD9*90/SD5); //門口會議桌3
        ctx.fillRect(SD8*776/SD4,0          ,SD8*70/SD4,SD9*140/SD5); //印表機桌子1
        ctx.fillRect(SD8*776/SD4,SD9*140/SD5,SD8*70/SD4,SD9*140/SD5); //印表機桌子2
        ctx.fillRect(SD8*846/SD4,0          ,SD8*22/SD4,SD9*280/SD5); //右上分隔
        ctx.fillRect(SD8*820/SD4,SD9*365/SD5,SD8*48/SD4,SD9*175/SD5); //右下分隔
        ctx.fillRect(SD8*150/SD4,SD9*450/SD5,SD8*45/SD4,SD9*90/SD5); //左下走道小櫃子
        ctx.fillRect(SD8*195/SD4,SD9*450/SD5,SD8*125/SD4,SD9*90/SD5); //電腦桌1
        ctx.fillRect(SD8*320/SD4,SD9*450/SD5,SD8*125/SD4,SD9*90/SD5); //電腦桌2
        ctx.fillRect(SD8*445/SD4,SD9*450/SD5,SD8*125/SD4,SD9*90/SD5); //電腦桌3
        ctx.fillRect(SD8*570/SD4,SD9*450/SD5,SD8*125/SD4,SD9*90/SD5); //電腦桌4
        ctx.fillRect(SD8*695/SD4,SD9*450/SD5,SD8*125/SD4,SD9*90/SD5); //電腦桌5


        ctx.fillStyle="#007500";//RSSI顏色(綠)
        SD10 = Math.round( SD8 / SD4 * SD6 );//RSSI3位於畫布相對X位置
        SD11 = Math.round( SD9 / SD5 * SD7 );//RSSI3位於畫布相對Y位置
        ctx.fillRect(SD10,SD11,parseInt(SD9/60),parseInt(SD9/60));
        SD10 = Math.round( SD8 / SD4 * ( SD6 + SD1 * 100 ));//RSSI1位於畫布相對X位置
        SD11 = Math.round( SD9 / SD5 * SD7 );//RSSI1位於畫布相對Y位置
        ctx.fillRect(SD10,SD11,parseInt(SD9/60),parseInt(SD9/60));
        SD10 = Math.round( SD8 / SD4 * ( SD6 + SD2 * 100 ));//RSSI2位於畫布相對X位置
        SD11 = Math.round( SD9 / SD5 * ( SD7 - SD3 * 100 ));//RSSI2位於畫布相對Y位置
        ctx.fillRect(SD10,SD11,parseInt(SD9/60),parseInt(SD9/60));


        ctx.fillStyle="#ff0000";//追蹤點顏色(紅)
        SD10 = Math.round( SD8 / SD4 * ( SD6 + x5 * 100 ));//追蹤點位於畫布相對X位置
        SD11 = Math.round( SD9 / SD5 * ( SD7 - y5 * 100 ));//追蹤點位於畫布相對Y位置
        ctx.fillRect(SD10,SD11,parseInt(SD9/60),parseInt(SD9/60)); //追蹤點位置

 
        //for (i=0;i<=500;i++){
        //    ctx.fillRect(SD10,i,1,1); //追蹤點位置
        //}
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    };
    xmlhttp.send();
    
} 
setInterval(draw, 500);