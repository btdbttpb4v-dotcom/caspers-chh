// =====================================================
// 🐎 CHH AI RACING PLATFORM
// BACKEND SERVER v1.0
// =====================================================

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// TEST

app.get("/", function(req,res){

res.json({

status:"CHH AI backend aktiv",

version:"1.0"

});

});



// HÄMTA LOPP

app.get("/api/races/:game", function(req,res){

const game = req.params.game;


res.json({

game: game,

message:"Redo för riktig travdata",

races: []

});


});




// AI ANALYS

app.post("/api/analyze", function(req,res){


const raceData = req.body;



res.json({

success:true,

message:"CHH AI analys genomförd",

system:null,

confidence:0,

data:raceData


});


});




// START SERVER

const PORT = process.env.PORT || 3000;


app.listen(PORT,function(){

console.log(
"🐎 CHH AI server startad på port " + PORT
);

});
