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
