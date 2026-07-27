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



    if(name === ""){

        alert("Skriv hästens namn");

        return;

    }



    let horse = {


        name:name,


        age:Number(age),


        distance:distance,


        form:Math.floor(Math.random()*10)+1,


        class:Math.floor(Math.random()*10)+1,


        distanceScore:Math.floor(Math.random()*10)+1,


        score:0,


        grade:""



    };




    horses.push(horse);



    saveHorses();



    displayHorses();



    document.getElementById("horseName").value="";

    document.getElementById("horseAge").value="";

    document.getElementById("horseDistance").value="";



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


    "🐎 CHH analysmotor aktiv!<br><br>" +

    "Analyserar hästar...<br>" +

    "Beräknar prestationspoäng...";





    calculateRanking();



}









function calculateRanking(){



    let ranking = [];





    horses.forEach(function(horse){



        let score = 0;




        // Form

        score += horse.form * 3;




        // Klass

        score += horse.class * 2;




        // Distans

        score += horse.distanceScore * 1.5;




        // Ålder

        if(horse.age >=4 && horse.age <=7){

            score += 10;

        }




        horse.score = score;




        if(score >=80){

            horse.grade="⭐ Toppkandidat";

        }

        else if(score >=60){

            horse.grade="👍 Intressant";

        }

        else{

            horse.grade="⚠ Behöver mer data";

        }




        ranking.push(horse);



    });





    ranking.sort(function(a,b){

        return b.score-a.score;

    });





    showRanking(ranking);



}









function showRanking(ranking){



    let output="";




    ranking.forEach(function(horse,index){



        output += `



        <div class="horse-card">


        <h4>

        ${index+1}. ${horse.name}

        </h4>



        <p>

        CHH Poäng ⭐ ${horse.score.toFixed(1)}

        </p>



        <p>

        Ranking:
        ${horse.grade}

        </p>



        </div>


        `;



    });




    document.getElementById("ranking").innerHTML = output;



}







displayHorses();
