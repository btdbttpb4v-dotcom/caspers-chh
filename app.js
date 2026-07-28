// =====================================================
// 🐎 CASPERS HÄST HJÄLP AI
// CHH AI SYSTEMMOTOR v3.0
// =====================================================


// -------------------------------
// SYSTEMVARIABLER
// -------------------------------

let selectedGame = "";

let budget = 0;



// -------------------------------
// SPELFORMAT
// -------------------------------

const games = {

V85: {
legs:8,
name:"V85"
},

V86:{
legs:8,
name:"V86"
},

GS75:{
legs:7,
name:"Grand Slam 75"
},

V64:{
legs:6,
name:"V64"
},

V65:{
legs:6,
name:"V65"
},

V4:{
legs:4,
name:"V4"
},

V5:{
legs:5,
name:"V5"
}

};




// -------------------------------
// TESTDATA
// KOMMER SENARE BYTAS MOT RIKTIGA LOPP
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
name:"Thunder Star",
form:8,
driver:7,
trainer:8,
track:8,
distance:9,
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
name:"Night Runner",
form:8,
driver:8,
trainer:7,
track:8,
distance:8,
classValue:7
}


];




// -------------------------------
// VÄLJ SPEL
// -------------------------------


function chooseGame(game){


selectedGame = game;



let output = document.getElementById(
"selectedGame"
);



if(output){

output.innerHTML =
"🏇 Valt spel: <b>"
+
game
+
"</b>";

}


}
// -------------------------------
// BUDGET
// -------------------------------


function setBudget(){


let input = document.getElementById("budget");


budget = Number(input.value);



if(budget <= 0){


alert("Ange en giltig budget");


return;


}



let result =
document.getElementById("budgetResult");



if(result){


result.innerHTML =

"💰 Budget satt: <b>"
+
budget
+
" kr</b>";


}


}





// -------------------------------
// AI ANALYSMOTOR
// -------------------------------


function startAnalysis(){



if(selectedGame === ""){


alert("Välj spel först");


return;


}



if(budget <= 0){


alert("Sätt budget först");


return;


}



let ranking = analyzeHorses();



generateSystem(ranking);



}





// -------------------------------
// HÄSTANALYS
// -------------------------------


function analyzeHorses(){


let ranking = [];



horses.forEach(function(horse){



let score = 0;



// Form väger tungt

score += horse.form * 3;



// Kusk

score += horse.driver * 2;



// Tränare

score += horse.trainer * 2;



// Spår

score += horse.track * 1.5;



// Distans

score += horse.distance * 2;



// Klass

score += horse.classValue * 2;




ranking.push({


name:horse.name,

score:score,

horse:horse


});



});





ranking.sort(function(a,b){


return b.score-a.score;


});



return ranking;



}





// -------------------------------
// SPELSTORLEK
// -------------------------------


function getGameSize(){


if(!games[selectedGame]){


return 7;


}



return games[selectedGame].legs;


}
// -------------------------------
// CHH SYSTEMGENERATOR
// -------------------------------


function generateSystem(ranking){



let legs = getGameSize();



let system = [];



// budgetstyrning


let maxHorses = 2;



if(budget >= 300){

maxHorses = 3;

}


if(budget >= 600){

maxHorses = 4;

}



if(budget >= 1000){

maxHorses = 5;

}





// skapa avdelningar


for(let i=1;i<=legs;i++){



let choices=[];



for(let x=0;x<maxHorses;x++){



let index =

(x+i-1)

%

ranking.length;



choices.push(ranking[index].name);



}



system.push({


avd:i,

horses:choices


});



}





// räkna rader


let rows = 1;



system.forEach(function(avd){


rows *= avd.horses.length;


});





let cost = rows * 0.25;





// om budget överskrids

while(cost > budget && rows > 1){


let last = system[system.length-1];


if(last.horses.length > 1){


last.horses.pop();


}


rows = 1;



system.forEach(function(avd){


rows *= avd.horses.length;


});



cost = rows * 0.25;



}






displaySystem(

ranking,

system,

rows,

cost

);



}
// -------------------------------
// VISA FÄRDIGT SYSTEM
// -------------------------------


function displaySystem(
ranking,
system,
rows,
cost
){



let output = "";



output += `

<div class="system-box">


<h2>
🏆 CHH AI SYSTEMFÖRSLAG
</h2>



<p>
🏇 Spel:
<b>${selectedGame}</b>
</p>


<p>
💰 Budget:
<b>${budget} kr</b>
</p>


<p>
📋 Rader:
<b>${rows}</b>
</p>


<p>
💵 Kostnad:
<b>${cost.toFixed(0)} kr</b>
</p>


<hr>


<h3>
⭐ CHH Ranking
</h3>

`;




// Visa topphästar


ranking.slice(0,5).forEach(function(horse,index){



output += `

<p>

${index+1}.
<b>${horse.name}</b>

<br>

CHH Score:
${horse.score.toFixed(1)}

</p>


`;

});




output += `

<hr>


<h3>
🎯 Systemrad
</h3>

`;





system.forEach(function(avd){



output += `

<div class="system-line">


<b>
Avdelning ${avd.avd}
</b>


<br>


${avd.horses.join(", ")}



</div>


`;



});






output += `


<hr>


<h3>
🧠 CHH AI Bedömning
</h3>


<p>

Systemet är byggt efter vald budget och CHH:s sammanvägda analys.

</p>


<p>

⭐ Högst prioritet:
Form + kusk + tränare + loppmatchning

</p>



</div>


`;





document.getElementById(
"systemResult"
).innerHTML = output;



}





// -------------------------------
// STARTSTATUS
// -------------------------------


window.onload=function(){



let status =
document.getElementById("status");



if(status){


status.innerHTML =
"🟢 CHH AI redo för analys";


}


};
