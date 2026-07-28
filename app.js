// =====================================
// CHH AI TRAVSYSTEM v1.0
// =====================================


let selectedGame = "";





// TESTDATABAS
// Senare ersätts denna av riktig loppdata


let horses = [


{
name:"Francesco",
form:9,
driver:9,
trainer:8,
distance:9,
track:8
},


{
name:"Bold Eagle",
form:8,
driver:10,
trainer:9,
distance:8,
track:7
},


{
name:"Speed King",
form:7,
driver:8,
trainer:8,
distance:9,
track:9
},


{
name:"Thunder Road",
form:6,
driver:7,
trainer:8,
distance:8,
track:7
},


{
name:"Northern Star",
form:7,
driver:7,
trainer:7,
distance:7,
track:8
}


];







// VÄLJA SPEL


function chooseGame(game){


selectedGame = game;


alert(
"CHH analyserar " + game
);


}









// STARTA AI ANALYS


function runCHHAnalysis(){



let budget =
Number(
document.getElementById("budget").value
);



if(selectedGame===""){


alert(
"Välj spelform först"
);


return;

}




if(!budget){


alert(
"Skriv in budget först"
);


return;


}






let analysed =
analyseHorses();




let system =
buildSystem(
analysed,
budget
);





showSystem(
system,
budget
);



}









// CHH POÄNGSYSTEM


function analyseHorses(){



let result=[];



horses.forEach(function(horse){



let score = 0;



score += horse.form * 3;

score += horse.driver * 2;

score += horse.trainer * 2;

score += horse.distance * 2;

score += horse.track;



horse.score = score;



result.push(horse);



});





result.sort(function(a,b){


return b.score-a.score;


});



return result;



}









// SYSTEMBYGGARE


function buildSystem(
ranking,
budget
){



let system = {



game:selectedGame,


spikes:[],


guards:[]


};






// bästa hästen blir spik


system.spikes.push(
ranking[0]
);





// resten blir garderingar


ranking.slice(1,4)
.forEach(function(horse){


system.guards.push(horse);


});






system.rows =
Math.max(
1,
Math.floor(
budget / 2
)
);




return system;



}









// VISA RESULTAT


function showSystem(
system,
budget
){



let output = "";



output += `

<div class="system-box">


<h2>
🏆 CHH ${system.game}
SYSTEM
</h2>


<p>
💰 Budget:
${budget} kr
</p>


<p>
📊 Beräknade rader:
${system.rows}
</p>


<hr>


<h3>
🔒 Spik
</h3>


`;




system.spikes.forEach(function(horse){


output += `

<p>

⭐ ${horse.name}

<br>

CHH Score:
${horse.score}

</p>

`;

});





output += `


<h3>
🎯 Garderingar
</h3>

`;





system.guards.forEach(function(horse){


output += `

<p>

${horse.name}

<br>

Score:
${horse.score}

</p>

`;

});






output += `


<hr>


<p>

🧠 CHH bedömning:

Systemet är byggt för bästa balans mellan säkerhet och värde.

</p>


</div>

`;





document.getElementById(
"result"
).innerHTML = output;



}
