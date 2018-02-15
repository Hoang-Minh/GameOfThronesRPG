$(document).ready(function() {

    var chosenHero;
    var chosenEnemy;
    var isHeroChosen;
    var isEnemyChosen;
    var isHeroAlive;
    var isEnemyAlive;
    var heroThing;      

    // get an character object from jquery
    function GetCharObject(object) {
        return charArr[object.attr("value")]; 
    }

    // init game
    function initGame() {
        isHeroChosen = false;
        isEnemyChosen = false;

        for(var i = 0; i < charArr.length; i++) {
            //var num = 6
            //debugger
            //var num = Math.floor(12 / charArr.length)
            // To make rounded image:
            // Bootstrap 3.0: class = img-circle
            // Bootstrap 4.0: class = rounded-circle
            // in mobile: xs
            // in tablet: sm
            // in desktop: md
            //var charThing = $("<div class='myChar' col-xs-2 col-sm-2 col-md-" + num + " value=" + i + "><img class='character' src='" + charArr[i].image + "' /></div>")
            //var charThing = $("<div class='myChar col-6 col-md-'" + num + " value="+ i +"'><img class ='character' src='"+ charArr[i].image +"'/></div>");
            //var charThing = $("<div class='myChar col-6' value="+ i +"'><img class ='character' src='"+ charArr[i].image +"'/><h4 class='description'>" + charArr[i].name + "</h4><p><h5>Attack: <span>" +charArr[i].attack + "</span></h5></p></div>");
            var charThing = $("<div class='myChar col-6' value="+ i +"><img class ='character' src='"+ charArr[i].image +"'/><div class='name'>" + charArr[i].name + "</div><div>Attack: <span>" +charArr[i].attack + "</span></div><div>Defense: <span>" +charArr[i].defense + "</span></div></div>");
            // console.log(charThing)
            $('#characters').append(charThing)
        }
    }

    function TakeDamge(attacker, defender) {
        var damageToOpponent = (attacker.attack / 10) - (defender.defense / 10);
        console.log(damageToOpponent);
        defender.hp -= damageToOpponent;
        console.log(defender.hp);
        
        
        var health = $("#health" + defender.name)[0];            
        health.value = defender.hp;                    
        $(".remainingHp" + defender.name).text(defender.hp);        
    }

    $(document).on("click", ".myChar", function() {
        
        if (isHeroChosen === false) {
            // console.log(this);
            $(this).addClass("fader");
            var index = $(this).attr("value");
            //debugger
            chosenHero = charArr[index];
            isHeroChosen = true;
            charArr.splice(index, 1); // remove element from array
            var yourChar = $("<div>");
            yourChar.html("Your selection: <strong>"  + chosenHero.name + "</strong>");
            $("#logo").append(yourChar);
        }
        
        var random = Math.floor(Math.random() * charArr.length);

        if (isEnemyChosen === false) {                        
            chosenEnemy = charArr[random];
            var computerObject = $(".myChar")[random]
            $(computerObject).addClass("fader");            
            isEnemyChosen = true;
            charArr.splice(random, 1); // remove element from array
            var compChar = $("<div>");
            compChar.html("Computer' selection: <strong>"  + chosenEnemy.name + "</strong>");
            $("#logo").append(compChar);
        }

        var playBtn = $("<button>");
        playBtn.addClass("playBtn");
        playBtn.text("Fight");
        $("#logo").append(playBtn);
    })

    $(document).on("click", ".playBtn", function() {
        
        $(".myChar").empty();
        var fightingCharArr = [chosenHero, chosenEnemy];       

        for(var i = 0; i < fightingCharArr.length; i++) {            
            var charThing = $("<div class='myChar col-6' value="+ i +"><img class ='character' src='"+ fightingCharArr[i].image +"'/><div class='name'>" + fightingCharArr[i].name + "</div><div>Attack: <span>" + fightingCharArr[i].attack + "</span></div><div>Defense: <span>" + fightingCharArr[i].defense + "</span></div></div>");
            // console.log(charThing)
            $('#characters').append(charThing)
            //<progress id="health" value="100" max="100"></progress>
            var progressBar = $("<progress id='health" + fightingCharArr[i].description + "' value='100' max='100'></progress><div class='remainingHp" + fightingCharArr[i].description + "'>" + fightingCharArr[i].hp + "</div>");
            // var progressBar = $("<progress id='health' value='100' max='100'></progress><div class='remainingHp" + fightingCharArr[i].name + "'>" + fightingCharArr[i].hp + "</div>");
            $('#characters').append(progressBar)
        }

        //debugger
        var attackBtn = $("<button id='attack'>");
        attackBtn.text("Attack");
        $("#gamePlay").append(attackBtn)
        $(".playBtn").hide();
    })

    $(document).on("click", "#gamePlay", function() {

        $("#attack").attr("disabled", true) // disable button
        $("#attack").text("Your attack");       
        
        // Your attack
        //debugger;
        TakeDamge(chosenHero, chosenEnemy);
        if(isGameOver(chosenEnemy.hp)) {
            // user is winner
            // pop up and ask if he wants to continue
            alert("you win")
        }
        else {
            // counter - attack
            TakeDamge(chosenEnemy, chosenHero);
            if(isGameOver(chosenHero.hp)) {
                alert("you lose");
                // user lose
                // restart the game
                initGame();
            }
            else {
                $("#attack").attr("disabled", false) // enable button
            }
        }
    })

    function isGameOver(hp) {
        return hp <= 0; 
    }

    var charArr = [
        // Brienne
        {
            name : "Brienne",
            hp : 100,
            attack : 70,
            defense : 10,
            image : "assets/images/Brienne.jpg",
            description : "Brienne"
        },
        // Bronn
        {
            name : "Bronn",
            hp : 100,
            attack : 75,
            defense : 50,
            image : "assets/images/Bronn.jpg",
            description : "Bronn"
        },
        // The Hound
        {
            name : "The Hound",
            hp : 100,
            attack : 80,
            defense : 20,
            image : "assets/images/TheHound.jpg",
            description : "TheHound"
        },
        // Tyrion
        {
            name : "Tyrion",
            hp : 100,
            attack : 60,
            defense : 40,
            image : "assets/images/Tyrion.jpg",
            description : "Tyrion"
        }        
    ]

    // start game here !!!!
    //debugger
    initGame()    
})