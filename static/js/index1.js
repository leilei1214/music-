document.getElementById('login').addEventListener('submit',(e)=>{
	e.preventDefault();
	const account = document.getElementById('account').value;
	const password = document.getElementById('password').value;



var peopleworld = '[{ "ID": 1 , "name": "aaa", "account": "111","password": "111"},\
            	    { "ID": 2 , "name": "bbb", "account": "222","password": "222"},\
            	    { "ID": 3 , "name": "ccc", "account": "333","password": "333"}]';
var member = JSON.parse(peopleworld);


if(account === "" || password === ""){
	alert("請勿留空")
}
else{
	var SD1 = false;
	for (var i = 0; i < member.length; i++) {
		if(account === member[i].account && password === member[i].password){
			alert(member[i].name + "先生歡迎");
			window.location.assign("/face");
			SD1 = True;
			return;
		}
	}
	if ( SD1 == false ) {
		alert("帳密錯誤")
	}
}


	//document.getElementById('login').submit();
	//or
	//fetch()
})