window.onload = readPost;

async function readPost(){
    const response = await fetch("/readScore");
    const content = await response.json();
    showPost(content);

}

function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("main2");
	divTag.innerHTML = "";
	
	for (var i = keys.length-1; i >=0 ; i--) {

		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);
		var temp1 = document.createElement("div");
		temp1.className = "postmsg";
		temp1.innerHTML = data[keys[i]]["score"];
		temp.appendChild(temp1);
		var temp1 = document.createElement("div");
		temp1.className = "postuser";
		
		temp1.innerHTML = "Played by: "+data[keys[i]]["username"];
		temp.appendChild(temp1);
		
	}
}