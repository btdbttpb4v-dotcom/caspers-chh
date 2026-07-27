function analyse(){

document.getElementById("status").innerHTML =
"🐎 CHH analysmotor aktiv!<br><br>" +
"Analysmodul startad.<br>" +
"Redo att ta emot hästdata.";

}



let horses = JSON.parse(localStorage.getItem("horses")) || [];



function addHorse(){


let name =
document.getElementById("horseName").value;


let age =
document.getElementById("horseAge").value;


let distance =
document.getElementById("horseDistance").value;



let horse = {

name:name,

age:age,

distance:distance,

score:0

};



horses.push(horse);



localStorage.setItem(
"horses",
JSON.stringify(horses)
);



displayHorses();



document.getElementById("horseName").value="";

document.getElementById("horseAge").value="";

document.getElementById("horseDistance").value="";

}



function displayHorses(){


let output="";


horses.forEach(function(horse,index){


output +=

"<div class='horse'>"+

"<b>"+horse.name+"</b><br>"+

"Ålder: "+horse.age+"<br>"+

"Distans: "+horse.distance+

"</div><br>";



});



document.getElementById("horseList").innerHTML=output;


}



displayHorses();
