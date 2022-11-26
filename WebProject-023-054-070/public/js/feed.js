function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function pageLoad(){
	createPost();
	readPost("/readPost2");
	document.getElementById('postbutton').onclick = getData;
}

function getData(){
	var msg = document.getElementById("textmsg").value;
	document.getElementById("textmsg").value = "";
	writePost(msg,"post2db");
}

async function createPost(){
    const response = await fetch("/createPost",);
    const content = await response.json();

}

async function readPost(readPostname){
    const response = await fetch(readPostname);
    const content = await response.json();
    showPost(content);

}

async function writePost(msg, tablename){
    let username = getCookie('username');
	let response = await fetch("/writePost", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
		table: tablename,
        user:username,
        message:msg
        })
    })
    
    const content = await response.json();
    showPost(content);
}


function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("feed-container");
	divTag.innerHTML = "";
	
	for (var i = keys.length-1; i >=0 ; i--) {

		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);
		var temp1 = document.createElement("div");
		temp1.className = "postmsg";
		temp1.innerHTML = data[keys[i]]["post"];
		temp.appendChild(temp1);
		var temp1 = document.createElement("div");
		temp1.className = "postuser";
		
		temp1.innerHTML = "Posted by: "+data[keys[i]]["username"];
		temp.appendChild(temp1);
		
	}
}