// =====================================================
// 🐎 CHH AI SCORING ENGINE v1.0
// Analysmotor
// =====================================================


function calculateCHHScore(horse){

let score = 0;


// FORM
score += (horse.form || 0) * 3;


// KUSK
score += (horse.driver || 0) * 2;


// TRÄNARE
score += (horse.trainer || 0) * 2;


// STARTSPÅR
score += (horse.track || 0) * 1.5;


// DISTANS
score += (horse.distance || 0) * 1.5;


// KLASS
score += (horse.classValue || 0) * 2;


// SPELVÄRDE
score += (horse.value || 0) * 2;



return Number(score.toFixed(1));

}




function rankHorses(horses){


return horses

.map(function(horse){


return {

...horse,

CHHScore:
calculateCHHScore(horse)

};


})


.sort(function(a,b){

return b.CHHScore - a.CHHScore;

});


}





module.exports = {

calculateCHHScore,

rankHorses

};
