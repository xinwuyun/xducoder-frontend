export const quitjupyter ={ 
	quitbutton:function(){
		var xmlhttp;
		var apiurl="http://47.100.185.208:8000/hub/api/shutdown";
		var apitoken="token 066ae343cb4e4f8ca5be0001d2b955b6";
		if (window.XMLHttpRequest)
		{
				//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
				xmlhttp=new XMLHttpRequest();
		//  			
		}
		xmlhttp.open("POST",apiurl,true);
		xmlhttp.setRequestHeader("Authorization",apitoken);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function()
		{
			console.log(xmlhttp.readyState);
			console.log(xmlhttp.status);
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				document.getElementById("myDiv").innerHTML="Great successful";
			}
		}
		alert("已退出jupyterhub");
	},
	resetbutton:function(){ 
		var xmlhttp;
		var username="zly2020"
		var apiurl="http://47.100.185.208:8000/hub/api/users/"+username+"/server";
		var apitoken="token 9a1208206d194cc49a34ec85e267f053"
		//172.96.240.67:8000 d8d4b18ad58e489f8e304266e8ee56ec
		//www.raincur.com:8800 066ae343cb4e4f8ca5be0001d2b955b6
		if (window.XMLHttpRequest)
		{
			//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp=new XMLHttpRequest();
		}
		//重置实训
		xmlhttp.open("DELETE",apiurl,true);
		xmlhttp.setRequestHeader("Authorization",apitoken);
		xmlhttp.send();
		xmlhttp.open("POST",apiurl,true);
		xmlhttp.setRequestHeader("Authorization",apitoken);
		xmlhttp.send();
		//保存成绩待定
		xmlhttp.onreadystatechange=function()
		{
			console.log(xmlhttp.readyState);
			console.log(xmlhttp.status);
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
			}
		}
		alert("已重置");
	}
};
