// =====================================================
// 🐎 CASPERS HÄST HJÄLP AI
// CHH AI SYSTEMMOTOR v2.0
// =====================================================


// -------------------------------
// GLOBALA VARIABLER
// -------------------------------

let selectedGame = "";
let budget = 0;


// -------------------------------
// TESTDATA
// (ersätts senare med riktig loppdata)
// -------------------------------

let horses = [

{
name:"Bold Eagle",
form:9,
driver:9,
trainer:8,
track:8,
distance:9,
classValue:9
},

{
name:"Francesco",
form:8,
driver:8,
trainer:9,
track:7,
distance:8,
classValue:8
},

{
name:"Speed King",
form:7,
driver:10,
trainer:8,
track:9,
distance:7,
classValue:7
},

{
name:"Thunder Star",
form:8,
driver:7,
trainer:8,
track:8,
distance:9,
classValue:8
}

];


// -------------------------------
// VÄLJ SPEL
// -------------------------------

function chooseGame(game){

selectedGame = game;

let box=document.getElementById("selectedGame");

if(box){

box.innerHTML =
"Valt spel: ⭐ " + game;

}

}



// -------------------------------
// BUDGET
// -------------------------------

function setBudget(){

let input=document.getElementById("budget");

budget = Number(input.value);


if(budget<=0){

alert("Skriv in en budget först");

return;

}


document.getElementById("budgetResult").innerHTML=

"Budget: " + budget + " kr";


}



// -------------------------------
// ANALYSMOTOR
// -------------------------------


function startAnalysis(){


if(selectedGame===""){

alert("Välj spel först");

return;

}


if(budget===0){

alert("Ange budget först");

return;

}



let ranking=[];



horses.forEach(function(horse){


let score =

(horse.form*3)+
(horse.driver*2)+
(horse.trainer*2)+
(horse.track*1.5)+
(horse.distance*2)+
(horse.classValue*2);



ranking.push({

name:horse.name,

score:score


});


});



// sortera bästa först


ranking.sort(function(a,b){

return b.score-a.score;

});



// skapa system


createSystem(ranking);



}



// -------------------------------
// SYSTEMGENERATOR
// -------------------------------


function createSystem(ranking){


let system="";



system +=
"<h2>🏆 CHH AI SYSTEMFÖRSLAG</h2>";

system +=
"<p>Spel: "+selectedGame+"</p>";

system +=
"<p>Budget: "+budget+" kr</p>";



system += "<hr>";



system +=
"<h3>⭐ Bästa hästar enligt AI</h3>";



ranking.forEach(function(horse,index){


system +=

"<p>"+
(index+1)+
". "+
horse.name+
" ⭐ "+
horse.score.toFixed(1)+
"</p>";


});



system += "<hr>";



system +=

"<h3>🎯 Rekommenderad rad</h3>";



let antal=3;



if(budget>=500){

antal=4;

}

if(budget>=1000){

antal=5;

}



system +=

"Avdelning 1: ";


for(let i=0;i<antal;i++){


system +=

ranking[i].name;



if(i<antal-1){

system+=", ";

}


}



system +=

"<br><br>CHH AI har valt raden efter samlad analys av form, kusk, tränare, spår och distans.";



document.getElementById("systemResult").innerHTML=

system;



}



// -------------------------------
// START
// -------------------------------


window.onload=function(){


let status=document.getElementById("status");


if(status){

status.innerHTML=
"🐎 CHH AI analysmotor aktiv";

}


};
