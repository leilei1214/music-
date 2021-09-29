function sure(){
    song = window.localStorage.getItem('song');
    singer = window.localStorage.getItem('singer');
    song_name = window.localStorage.getItem('song_name');
    web = window.localStorage.getItem('web');
    var foemData = new FormData();
    var search = singer+" "+song 
    foemData.append("search",search)
    foemData.append("count",1)
    fetch("/song",{
        method: 'post',
        body: foemData

    }).then(response => {
        //ok 代表狀態碼在範圍 200-299             
        return response.json(); 

    }).then((jsonData) => {
        let content="" 
        content+= (`<div  id="content">${jsonData.song}
        <lable onclick="sure1()">確認</lable>
        <lable onclick="next()">下一個</lable></div>
        `)
        console.log(jsonData)
        window.localStorage.setItem('id',1);
        window.localStorage.setItem('end2',jsonData["song"]);

        document.getElementById("body").innerHTML = content;

    })
    .catch(function(err) {
        console.error('Error:', error)
    })
}
//歌詞確認後
function sure1(){
$.getJSON('./file',(file) => {
    jsonArray = file
    if(JSON.stringify(jsonArray)=="{}"){
        console.log("111")
    }else{
        jsonArray = JSON.parse(jsonArray)

    }
    // console.log(jsonArray)

    var foemData = new FormData();
    song = window.localStorage.getItem('song');
    singer = window.localStorage.getItem('singer');
    song_name = window.localStorage.getItem('song_name');
    web = window.localStorage.getItem('web');
    end2 = window.localStorage.getItem('end2');
    // console.log(jsonArray[singer])
    if(typeof jsonArray[singer] == "undefined"){
        jsonArray[singer]=[]
        jsonArray[singer].push([ song,web,end2])
    }else{
        var b = 0
        for(var i = 0;i<jsonArray[singer].length;i++){
            if(song ==jsonArray[singer][i][0]){
                b +=1
            }     
        }
        if(b ==0){
                jsonArray[singer].push([ song,web,end2])
        }
    }
    // console.log(jsonArray)
    jsonArray = JSON.stringify(jsonArray)
    foemData.append("file",jsonArray)
    fetch("./file1",{
            method: 'post',
            body:foemData

        }).then(res=>res.clone().json())
    });
    window.location.assign("/listen");


}
//next
function next(){
id = window.localStorage.getItem('id');
id +=1
song = window.localStorage.getItem('song');
singer = window.localStorage.getItem('singer');
song_name = window.localStorage.getItem('song_name');
web = window.localStorage.getItem('web');
var foemData = new FormData();
var search = singer+" "+song 
foemData.append("search",search)
foemData.append("count",id)

fetch("/song",{
    method: 'post',
    body: foemData

}).then(response => {
    //ok 代表狀態碼在範圍 200-299             
    return response.json(); 

}).then((jsonData) => {
    let content="" 
    content+= (`<div  id="content">${jsonData.song}
    <lable onclick="sure1()">確認</lable>
    <lable onclick="next()">下一個</lable></div>
    `)
    console.log(jsonData)
    window.localStorage.setItem('id',id);
    window.localStorage.setItem('end2',jsonData["song"]);

    document.getElementById("body").innerHTML = content;

})
.catch(function(err) {
    console.error('Error:', error)
})


}
$("#search").submit(function(event) {
let content = "";
var foemData = new FormData();
var search = document.getElementById("search-input").value;
foemData.append("search",search)
fetch("/search",{
    method: 'post',
    body: foemData

}).then(response => {
    return response.json(); 
}).then((jsonData) => {
    console.log(jsonData.web)
    content += (
        `<div id="content">${jsonData.song_name}
            <div class="embed-container">
                <iframe  width="853" height="480"   frameborder="0" allow="autoplay; encrypted-media" allowfullscreen  src="${jsonData.web}"></iframe>
            </div>
            <lable onclick="sure()">確認</lable>
            <lable onclick="next()">無法顯示</lable>
            <lable onclick="clear()">取消</lable>
        </div></div>
        `
        )
    console.log(content)
    document.getElementById("body").innerHTML = content;
    window.localStorage.setItem('song',jsonData["song"]);
    window.localStorage.setItem('singer',jsonData["singer"]);
    window.localStorage.setItem('song_name',jsonData["song_name"]);
    window.localStorage.setItem('web',jsonData["web"]);

})
.catch(function(err) {
    console.error('Error:', error)
    })

event.preventDefault();
})