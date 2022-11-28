window.onload = pageLoad;

function pageLoad(){
	readScore();
	document.getElementById('like1').onclick = likeclick1;
	document.getElementById('like2').onclick = likeclick2;
	document.getElementById('like3').onclick = likeclick3;
	document.getElementById('like4').onclick = likeclick4;
	document.getElementById('like5').onclick = likeclick5;
	likechange("likenumber1",0);
	likechange("likenumber2",1);
	likechange("likenumber3",2);
	likechange("likenumber4",3);
	likechange("likenumber5",4);
}

async function readScore() {
	const response = await fetch("/readScore");
	const content = await response.json();
	showPost(content);

}

function showPost(data) {
	var scoreNumber = "Score";
	var keys = Object.keys(data);
	var divTag = document.getElementById("Score1");
	divTag.innerHTML = "";

	for (var i = 0; i < 5; i++) {
		scoreNumber = "Score"+(i+1);
		divTag = document.getElementById(scoreNumber);
		divTag.innerHTML = "";
		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);
		var temp1 = document.createElement("div");
		temp1.className = "postmsg";
		temp1.innerHTML = "Score: " + data[keys[i]]["score"];
		temp.appendChild(temp1);
		var temp1 = document.createElement("div");
		temp1.className = "postuser";

		temp1.innerHTML = "Player: " + data[keys[i]]["username"];
		temp.appendChild(temp1);
	}

}

async function likeclick1(){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	let idplayer = content[keys[0]]["id"];
	let likes = content[keys[0]]["likes"];
	likes += 1;
	writeLikes(idplayer,likes)
	likechange("likenumber1",0);
}

async function likeclick2(){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	let idplayer = content[keys[1]]["id"];
	let likes = content[keys[1]]["likes"];
	likes += 1;
	writeLikes(idplayer,likes)
	likechange("likenumber2",1);
}

async function likeclick3(){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	let idplayer = content[keys[2]]["id"];
	let likes = content[keys[2]]["likes"];
	likes += 1;
	writeLikes(idplayer,likes)
	likechange("likenumber3",2);
}

async function likeclick4(){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	let idplayer = content[keys[3]]["id"];
	let likes = content[keys[3]]["likes"];
	likes += 1;
	writeLikes(idplayer,likes)
	likechange("likenumber4",3);
}

async function likeclick5(){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	let idplayer = content[keys[4]]["id"];
	let likes = content[keys[4]]["likes"];
	likes += 1;
	writeLikes(idplayer,likes);
	likechange("likenumber5",4);
}

async function writeLikes(idplayer,likes){
	let response = await fetch("/writeLikes",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id:idplayer,
			like:likes})
		});
}

async function likechange(likenumber,number){
	const response = await fetch("/readScore");
	const content = await response.json();
	let keys = Object.keys(content);
	var likediv = document.getElementById(likenumber);
	likediv.innerHTML = "Like: " + content[keys[number]]["likes"];;
}