import Cookies from 'js-cookie';
import API_CONFIG from "./api/API_CONFIG";

const loginUser = () => {
    return Cookies.get("user");
};
 
const isLogin = () => {

    const accessToken = Cookies.get("token");
    const account = Cookies.get("user");
    
    var millisecond = new Date().getTime();
    var expiresTime = new Date(millisecond + 60 * 1000 * 120);

    if (accessToken === undefined){
         
	return false;
    }   

    fetch(API_CONFIG.login, {
        method: "POST",
        body: JSON.stringify({
            accessToken
        }),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.msg === "success") {
            Cookies.set("token", res.token,{
                expires: expiresTime,
                });
            Cookies.set("user", res.account,{
                expires: expiresTime,
                });
            Cookies.set("flag", "success",{
                expires: expiresTime,
                });
            Cookies.set("userID", res.userID,{
                  expires: expiresTime,
                });
            Cookies.set("STDNum", res.STDNum,{
		                      expires: expiresTime,
		                    });
            console.log("---------------");
            console.log(res.msg);
            console.log(res.token);
          } 
          else {   
            jupyterlogout();      
            Cookies.remove("token");
            Cookies.remove("user");
            Cookies.remove("flag");
            console.log(res.msg);
          }
        })
        .catch((err) => console.log(err));

        if (Cookies.get("flag") === "success")  return true;
        else                                    return false;

};
 
const logout = () => {   
    jupyterlogout();
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("userID");
    Cookies.remove("flag");
};
 
const jupyterlogin = () => {
  
      const userID = Cookies.get("userID");;
      const form = "userID=" + userID;
     
      fetch(API_CONFIG.jupyterlogin, {
        method: "POST",
        body: form,
        credentials: 'include',
      
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((data) => console.log(data)) 
      .catch((err) => console.log(err));
  
}

const jupyterlogout = () => {
  
      fetch(API_CONFIG.jupyterlogout, {

        method: "GET",
        credentials: 'include',      
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        
      })
      .then((data) => console.log(data)) 
      .catch((err) => console.log(err));

  
}

const getSTDNum = () => {
    const userID = Cookies.get("userID");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"userID":userID});
    var requestOptions = {
	    method: 'POST',
            headers: myHeaders,
	    body: raw,
	    redirect: 'follow'
    };
    fetch("http://47.100.185.208:8384/getSTDNum", requestOptions)
		.then(response => response.text())
	        .then(response => {
			Cookies.set("STDNum",response);
		});
}

export {loginUser, isLogin, logout, jupyterlogin, getSTDNum, jupyterlogout};
