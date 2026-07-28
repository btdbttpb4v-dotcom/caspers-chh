// =====================================================
// 🐎 CASPERS HÄST HJÄLP AI
// CHH AI RACING PLATFORM v1.0
// FRONTEND ENGINE
// =====================================================



let selectedGame = "";

let selectedBudget = 0;



// -----------------------------------------------------
// SPELFORMAT
// -----------------------------------------------------


const gameSettings = {


V85:{
legs:8,
name:"V85"
},


V86:{
legs:8,
name:"V86"
},


V75:{
legs:7,
name:"V75"
},


V64:{
legs:6,
name:"V64"
},


V65:{
legs:6,
name:"V65"
},


DD:{
legs:2,
name:"Dagens Dubbel"
}


};





// -----------------------------------------------------
// VÄLJ SPEL
// -----------------------------------------------------


function selectGame(game){


selectedGame = game;



document.getElementById(
"selectedGame"
).innerHTML =


"🏇 Valt spel: <b>"
+
game
+
"</b>";



}







// -----------------------------------------------------
// STARTA ANALYS
// -----------------------------------------------------


async function startAnalysis(){



if(selectedGame===""){


alert(
"Välj spelform först"
);


return;


}



selectedBudget = Number(

document.getElementById(
"budget"
).value

);



if(selectedBudget<=0){


alert(
"Skriv in budget"
);


return;


}




updateStatus(
"🔎 Hämtar dagens lopp..."
);



/*

Här kopplas framtida backend in:

const raceData =
await fetch('/api/races')

*/




let raceData = await getRaceData();





updateStatus(
"🤖 AI analyserar lopp..."
);





let analysis =
analyzeRaces(raceData);





let system =
buildSystem(
analysis
);





displaySystem(
system
);



}








// -----------------------------------------------------
// DATAKÄLLA
// FÖRBEREDD FÖR BACKEND/API
// -----------------------------------------------------


async function getRaceData(){



/*

Framtida funktion:

return await fetch(
"/api/today"
)
.then(r=>r.json());


*/


// Tillfällig tom struktur

return {


races:[]


};



}








// -----------------------------------------------------
// AI ANALYSMOTOR
// -----------------------------------------------------


function analyzeRaces(data){



/*

Här kommer framtida AI-modell:

- Form
- Kusk
- Tränare
- Spår
- Distans
- Klass
- Odds
- Streckvärde
- Historik


*/


return {


confidence:0,


races:[],


comment:

"Inväntar riktig loppdata"



};


}







// -----------------------------------------------------
// SYSTEMBYGGARE
// -----------------------------------------------------


function buildSystem(analysis){



let legs =
gameSettings[selectedGame].legs;



let system = {


game:selectedGame,


budget:selectedBudget,


legs:legs,


rows:0,


cost:0,


confidence:analysis.confidence,


comment:analysis.comment,


races:[]


};





return system;


}







// -----------------------------------------------------
// VISA RESULTAT
// -----------------------------------------------------


function displaySystem(system){



let html = "";



html += `


<div>


<h2>
🏆 CHH AI SYSTEMFÖRSLAG
</h2>


<p>
🏇 Spel:
<b>${system.game}</b>
</p>


<p>
💰 Budget:
<b>${system.budget} kr</b>
</p>



<hr>


<h3>
📋 System
</h3>


<p>
AI-systemet väntar på dagens loppdata.
</p>


<hr>


<h3>
⭐ Confidence
</h3>


<p>
${system.confidence} %
</p>


<h3>
🧠 AI kommentar
</h3>


<p>
${system.comment}
</p>



</div>


`;




document.getElementById(
"systemResult"
).innerHTML = html;




document.getElementById(
"confidence"
).innerHTML =

system.confidence + "%";




document.getElementById(
"aiComment"
).innerHTML =

system.comment;



}





// -----------------------------------------------------
// STATUS
// -----------------------------------------------------


function updateStatus(text){



document.getElementById(
"aiStatus"
).innerHTML = text;



}







// -----------------------------------------------------
// START
// -----------------------------------------------------


window.onload=function(){


updateStatus(
"🟢 CHH AI redo"
);


};
