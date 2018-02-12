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
        // alert()
        $(".myChar").empty();
        var fightingCharArr = [chosenHero, chosenEnemy];
        console.log(fightingCharArr);

        for(var i = 0; i < fightingCharArr.length; i++) {            
            var charThing = $("<div class='myChar col-6' value="+ i +"><img class ='character' src='"+ fightingCharArr[i].image +"'/><div class='name'>" + fightingCharArr[i].name + "</div><div>Attack: <span>" + fightingCharArr[i].attack + "</span></div><div>Defense: <span>" + fightingCharArr[i].defense + "</span></div></div>");
            // console.log(charThing)
            $('#characters').append(charThing)
        }

    })

    var charArr = [
        // Brienne
        {
            name : "Brienne",
            hp : 100,
            attack : 70,
            defense : 10,
            image : "assets/images/Brienne.jpg",
            description : "Brienne is the daughter and only surviving child of Lord Selwyn Tarth, Lord of Evenfall Hall on the island of Tarth"
        },
        // Bronn
        {
            name : "Bronn",
            hp : 100,
            attack : 75,
            defense : 5,
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
            description : "The Hound"
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