// =====================================================
// 🐎 CHH AI SYSTEM GENERATOR v1.0
// Skapar färdiga travsystem efter budget
// =====================================================


function generateSystem(horses, budget){


let ranked =
horses.sort(function(a,b){

return b.CHHScore - a.CHHScore;

});



let system = [];



let maxRows = Math.floor(
budget / 0.50
);



let selected =
ranked.slice(0,3);



system.push({

avdelning:1,

hästar:selected.map(function(h){

return h.name;

})

});




return {

budget:budget,

maxRows:maxRows,

system:system

};


}




module.exports = {

generateSystem

};
