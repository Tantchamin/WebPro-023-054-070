window.onload = readScore;

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