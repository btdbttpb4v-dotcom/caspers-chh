function runAnalysis(){


let ranking = [];


horses.forEach(function(horse){


let score = 0;


// Form
score += horse.form * 3;


// Klass
score += horse.class * 2;


// Distans
score += horse.distanceScore * 1.5;


// Bana
score += horse.track * 1.5;


// Kuskeffekt
score += horse.driver * 2;



let grade;


if(score >= 80){

grade = "A ⭐";

}

else if(score >= 60){

grade = "B";

}

else{

grade = "C";

}



ranking.push({

name:horse.name,

score:score,

grade:grade

});



});



// sortera bästa först

ranking.sort(function(a,b){

return b.score-a.score;

});



let output="";


ranking.forEach(function(horse,index){


output +=


"<div class='horse'>"+

"<h3>"+

(index+1)+". "+

horse.name+

"</h3>"+


"CHH Poäng: ⭐ "+

horse.score.toFixed(1)+

"<br>"+


"Ranking: "+

horse.grade+


"</div>";



});



document.getElementById(
"ranking"
).innerHTML=output;


}
