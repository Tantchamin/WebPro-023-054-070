window.onload = pageLoad;

function pageLoad(){
    createButton();
    document.getElementById('lovebutton').onclick = loveclick;
    document.getElementById('likebutton').onclick = likeclick;
    document.getElementById('dislikebutton').onclick = dislikeclick;
}

function loveclick(){
    readButton();
    updateLove(2);
}

function likeclick(){
    readButton();
    //updateLike(3);
}

function dislikeclick(){
    readButton();
    //updateDislike(4);
}

async function createButton(){
    let response = await fetch("/createButton", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id:1
        })
    })
    
    const content = await response.json();
	//console.log(playerscore);
    console.log(content);

}

async function readButton(){
    const response = await fetch("/readButton");
    const content = await response.json();

}

// async function updateButton(buttonMethod, buttonName, buttonCount){
// 	let response = await fetch(buttonMethod, {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         buttonName:buttonCount
//         })
//     })
    
//     const content = await response.json();
// 	//console.log(playerscore);
//     console.log(content);
// }

async function updateLove(buttonCount){
	let response = await fetch("/updateLove", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        lovecount:buttonCount
        })
    })
    
    const content = await response.json();
	//console.log(playerscore);
    console.log(content);
}

async function updateLike(buttonCount){
	let response = await fetch("/updateLike", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        likecount:buttonCount
        })
    })
    
    const content = await response.json();
	//console.log(playerscore);
    console.log(content);
}

async function updateDislike(buttonCount){
	let response = await fetch("/updateDislike", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        dislikecount:buttonCount
        })
    })
    
    const content = await response.json();
	//console.log(playerscore);
    console.log(content);
}

// function showCount(data){
// 	var keys = Object.keys(data);
// 	var divTag = document.getElementById("feed-container");
// 	divTag.innerHTML = "";
	
// 	for (var i = keys.length-1; i >=0 ; i--) {

// 		var temp = document.createElement("div");
// 		temp.className = "newsfeed";
// 		divTag.appendChild(temp);
// 		var temp1 = document.createElement("div");
// 		temp1.className = "postmsg";
// 		temp1.innerHTML = data[keys[i]]["post"];
// 		temp.appendChild(temp1);
// 		var temp1 = document.createElement("div");
// 		temp1.className = "postuser";
		
// 		temp1.innerHTML = "Posted by: "+data[keys[i]]["username"];
// 		temp.appendChild(temp1);
		
// 	}
// }