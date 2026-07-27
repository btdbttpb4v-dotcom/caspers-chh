let horses = JSON.parse(localStorage.getItem("chhHorses")) || [];





function saveHorses(){

localStorage.setItem(
"chhHorses",
JSON.stringify(horses)
);

}







function addHorse(){


let name =
document.getElementById("horseName").value;


let age =
document.getElementById("horseAge").value;


let distance =
document.getElementById("horseDistance").value;



if(name===""){

alert("Skriv hästens namn");

return;

}




let horse = {
driver:
document.getElementById("horseDriver").value,


trainer:
document.getElementById("horseTrainer").value,


track:
document.getElementById("horseTrack").value,

name:name,

age:Number(age),

distance:distance,



// Grundvärden 1-10

form:7,

classValue:7,

distanceScore:7,

trackScore:7,

driverScore:7,



score:0,

grade:"",

analysis:""



};




horses.push(horse);


saveHorses();


displayHorses();


}









function displayHorses(){



let list =
document.getElementById("horseList");


list.innerHTML="";



horses.forEach(function(horse){


list.innerHTML += `


<div class="horse-card">


<h4>
🐎 ${horse.name}
</h4>


<p>
Ålder: ${horse.age}
</p>


<p>
Distans: ${horse.distance}
</p>


</div>


`;


});


}









function runAnalysis(){



document.getElementById("status").innerHTML =

"🧠 CHH AI analyserar loppbild...";



calculateAI();



}









function calculateAI(){



let ranking=[];



horses.forEach(function(horse){



let score = 0;



// Form 30%

score += horse.form * 3;



// Klass 20%

score += horse.classValue * 2;



// Distans 15%

score += horse.distanceScore * 1.5;



// Bana 15%

score += horse.trackScore * 1.5;



// Kusk 20%

score += horse.driverScore * 2;





horse.score = score;



if(score >=80){


horse.grade="A - Stark kandidat";


}


else if(score >=60){


horse.grade="B - Intressant";


}


else{


horse.grade="C - Försiktig";


}






horse.analysis = createComment(horse);




ranking.push(horse);



});





ranking.sort(function(a,b){

return b.score-a.score;

});




showAIResult(ranking);



}









function createComment(horse){



let text="";



if(horse.form>=7){

text += "Bra form. ";

}


else{


text += "Osäker form. ";


}




if(horse.distanceScore>=7){

text += "Passande distans. ";


}


else{


text += "Frågetecken distans. ";


}




if(horse.driverScore>=7){

text += "Stark kuskprofil.";


}


else{


text += "Kuskfaktor behöver bevakas.";


}



return text;


}









function showAIResult(ranking){



let output="";



ranking.forEach(function(horse,index){



output += `


<div class="horse-card">


<h3>

${index+1}. ${horse.name}

</h3>
<p>
🏇 Kusk:
${horse.driver || "Ej angiven"}
</p>


<p>
👨‍🏫 Tränare:
${horse.trainer || "Ej angiven"}
</p>


<p>
🚦 Startspår:
${horse.track || "Ej angivet"}
</p>

<p>

⭐ CHH Score:
${horse.score.toFixed(1)}

</p>


<p>

${horse.grade}

</p>


<p>

🧠 ${horse.analysis}

</p>


</div>


`;



});



document.getElementById("ranking").innerHTML=output;



}








displayHorses();
let currentRace = [];





function addHorseToRace(){


let select =
document.getElementById("raceHorseSelect");


let horseName =
select.value;



let horse =
horses.find(function(h){

return h.name === horseName;

});



if(horse){


currentRace.push(horse);


displayRace();


}



}







function displayRace(){


let output="";


currentRace.forEach(function(horse,index){


output += `

<div class="horse-card">

<h3>
${index+1}. ${horse.name}
</h3>

<p>
CHH Score:
${horse.score.toFixed(1)}
</p>

</div>

`;


});



document.getElementById("raceList").innerHTML =
output;



}








function analyzeRace(){



if(currentRace.length===0){

alert("Lägg till hästar i loppet först");

return;

}



currentRace.sort(function(a,b){

return b.score-a.score;

});



let best =
currentRace[0];



let result = `


<h2>
🏆 CHH Loppanalys
</h2>


<p>

🥇 Spikförslag:

${best.name}

</p>


<p>

⭐ CHH Score:

${best.score.toFixed(1)}

</p>


<p>

Rekommendation:

Starkaste kandidaten i loppet.

</p>


`;



document.getElementById("raceResult").innerHTML =
result;


}
function createStrategy(){


if(currentRace.length===0){

alert("Analysera ett lopp först");

return;

}



let sorted =
currentRace.sort(function(a,b){

return b.score-a.score;

});



let top =
sorted[0];


let second =
sorted[1];



let difference =
top.score - second.score;



let recommendation;

let risk;



if(difference >=20){


recommendation =
"🔒 SPIK";


risk =
"Låg risk";


}


else if(difference >=10){


recommendation =
"⭐ SPIK / LITEN GARDERING";


risk =
"Medel risk";


}


else{


recommendation =
"🛡 GARDERING";


risk =
"Högre risk";


}






let value;



if(top.score >=80){


value =
"Mycket intressant";


}

else if(top.score >=65){


value =
"Spelbar";


}

else{


value =
"Avvakta";


}





document.getElementById(
"strategyResult"
).innerHTML = `



<div class="horse-card">


<h3>
CHH Strategirapport
</h3>


<p>

Förslag:
${recommendation}

</p>


<p>

Huvudval:
${top.name}

</p>


<p>

CHH Score:
${top.score.toFixed(1)}

</p>


<p>

Risk:
${risk}

</p>


<p>

Värde:
${value}

</p>



</div>



`;



}
let decisions =
JSON.parse(localStorage.getItem("chhDecisions")) || [];





function generateCoach(){


if(currentRace.length===0){


alert("Analysera ett lopp först");


return;


}



let sorted =
currentRace.sort(function(a,b){

return b.score-a.score;

});



let horse =
sorted[0];




let confidence;



if(horse.score >=85){


confidence =
"Hög säkerhet";


}

else if(horse.score >=70){


confidence =
"Bra möjlighet";


}

else{


confidence =
"Osäkert läge";


}





let decision = {


date:new Date().toLocaleDateString("sv-SE"),


horse:horse.name,


score:horse.score,


confidence:confidence


};





decisions.push(decision);



localStorage.setItem(

"chhDecisions",

JSON.stringify(decisions)

);





document.getElementById(
"coachResult"
).innerHTML = `


<div class="horse-card">


<h3>

🧠 CHH Bedömning

</h3>


<p>

Val:
${horse.name}

</p>


<p>

Poäng:
${horse.score.toFixed(1)}

</p>


<p>

Säkerhet:
${confidence}

</p>


<p>

Kommentar:
Hästen har just nu bäst sammanvägd CHH-profil.

</p>


</div>


`;



}
function showHistory(){


let history =
JSON.parse(
localStorage.getItem("chhDecisions")
) || [];



let output = "";



if(history.length === 0){


output =
"Inga tidigare beslut sparade.";


}

else{


output +=

"<div class='horse-card'>";


output +=

"<h3>CHH Statistik</h3>";



output +=

"Antal analyser: " +
history.length;



output +=

"</div>";





history.forEach(function(item,index){



output += `


<div class="horse-card">


<h3>

${index+1}. ${item.horse}

</h3>


<p>

Datum:
${item.date}

</p>


<p>

CHH Score:
${item.score.toFixed(1)}

</p>


<p>

Säkerhet:
${item.confidence}

</p>


</div>


`;



});



}




document.getElementById(
"historyResult"
).innerHTML = output;



}
function runPrediction(){


if(horses.length===0){

alert("Lägg till hästar först");

return;

}



let prediction=[];



horses.forEach(function(horse){



let winChance = Math.min(
95,
Math.round(horse.score)
);



let placeChance = Math.min(
98,
winChance + 15
);



let value;



if(winChance >=80){

value="🔥 Het kandidat";

}

else if(winChance >=65){

value="⭐ Intressant spelvärde";

}

else if(winChance >=50){

value="💡 Skrällmöjlighet";

}

else{

value="⚠ Svag kandidat";

}





let rank;



if(winChance>=80){

rank="A";

}

else if(winChance>=65){

rank="B";

}

else if(winChance>=50){

rank="C";

}

else{

rank="D";

}





prediction.push({


name:horse.name,


winChance:winChance,


placeChance:placeChance,


value:value,


rank:rank



});



});





prediction.sort(function(a,b){

return b.winChance-a.winChance;

});





showPrediction(prediction);


}









function showPrediction(prediction){


let output="";



prediction.forEach(function(horse,index){



output += `


<div class="horse-card">


<h3>

${index+1}. ${horse.name}

</h3>



<p>

🏆 Vinstchans:
${horse.winChance}%

</p>



<p>

🥈 Platschans:
${horse.placeChance}%

</p>



<p>

Ranking:
${horse.rank}

</p>



<p>

${horse.value}

</p>


</div>


`;



});



document.getElementById(
"predictionResult"
).innerHTML=output;



}
// ===============================
// CHH SPELGENERATOR
// ===============================


let selectedGame = "V85";


// Välj spelform

function selectGame(game){

selectedGame = game;

alert(
"CHH valt spel: " + game
);

}



// Skapa system

function createSystem(){


let budget =
Number(
document.getElementById("budget").value
);



let risk =
document.getElementById("risk").value;



if(!budget){

alert(
"Skriv in spelbudget först"
);

return;

}



// Hästar från analysmotorn

let sortedHorses = [];


if(typeof ranking !== "undefined"){

sortedHorses = ranking;

}




let output = "";


output += `
<h2>
🏆 CHH ${selectedGame}-SYSTEM
</h2>

<p>
Budget: ${budget} kr
</p>

<p>
Risknivå: ${risk}
</p>

<hr>

`;



if(sortedHorses.length > 0){


output += `
<h3>
⭐ CHH Förslag
</h3>
`;



sortedHorses
.slice(0,5)
.forEach(function(horse,index){


output += `

<p>

${index+1}.
<b>
${horse.name}
</b>

<br>

CHH Poäng ⭐ 
${horse.score.toFixed(1)}

</p>

`;

});


}

else{


output += `

<p>
⚠️ Ingen färdig analys hittades ännu.
Kör analys först.

</p>

`;

}




document.getElementById(
"systemResult"
).innerHTML = output;



}
// =================================
// BLOCK 14 - CHH SPELGENERATOR MOTOR
// =================================


let selectedGame = "V85";


// Välja spelform

function selectGame(game){

selectedGame = game;


document.getElementById("systemResult").innerHTML =

`
<h2>
🎯 CHH valt spel: ${game}
</h2>

<p>
Välj budget och tryck skapa system.
</p>

`;

}



// Skapa systemförslag

function createSystem(){


let budget =
Number(
document.getElementById("budget").value
);


let risk =
document.getElementById("risk").value;



if(!budget){

alert(
"Skriv in din spelbudget först"
);

return;

}



let output = "";



output += `

<h2>
🏆 CHH ${selectedGame}-SYSTEM
</h2>

<p>
💰 Budget: ${budget} kr
</p>

<p>
⚖️ Risk:
${risk}
</p>

<hr>

`;



// Hämtar analysranking

let horsesForSystem = [];



if(typeof ranking !== "undefined"){

horsesForSystem = ranking;

}




if(horsesForSystem.length > 0){


output += `

<h3>
⭐ Rekommenderade hästar
</h3>

`;



horsesForSystem
.slice(0,7)
.forEach(function(horse,index){


output +=

`

<div class="system-horse">

<h3>

${index + 1}. ${horse.name}

</h3>


<p>

CHH Poäng ⭐ 
${horse.score.toFixed(1)}

</p>


</div>


`;

});


}

else{


output += `

<h3>
⚠️ Ingen färdig analys ännu
</h3>


<p>
Starta analysmotorn först så bygger CHH systemet.
</p>

`;

}



output += `

<hr>


<h3>
🚧 Nästa steg
</h3>


<p>

CHH kommer optimera:
<br>
⭐ Spikar
<br>
⭐ Garderingar
<br>
⭐ Skrällar
<br>
⭐ Rader efter budget

</p>

`;




document.getElementById(
"systemResult"
).innerHTML = output;



}
