//create objects for each character 
var darthvader = {
    name: "Darth Vader",
    attackPower: 8,
    healthPoints: 120,
    attack: function (enemy_ap) {
        this.attackPower += 8;
        // make sure that dv's attack power won't exceed 180
        this.attackPower = Math.min(this.attackPower, 180)
        this.healthPoints -= enemy_ap;
    },
    beingAttacked: function (enemy_ap){
        this.attackPower = 8; 
        this.healthPoints -= enemy_ap;
    },
    reset: function () {
        attackPower = 8;
        healthPoints = 120;
    }
}

var lukeskywalker = {
    name: "Luke Skywalker",
    //generate a random attack power for luke (10 - 15)
    attackPower: Math.floor(Math.random() * 6) + 10,
    healthPoints: 100,
    attack: function (enemy_ap) {
        this.healthPoints -= enemy_ap;
        this.attackPower += this.attackPower; 
    },
    beingAttacked: function (enemy_ap){
        this.healthPoints -= enemy_ap;
    },
    reset: function () {
        healthPoints = 100;
    }
}

var darthsidious = {
    name: "Darth Sidious",
    attackPower: 10,
    healthPoints: 120,
    attack: function (enemy_ap) {
        this.attackPower += this.attackPower; 
        this.healthPoints -= enemy_ap;
    },
    beingAttacked: function (enemy_ap){
        this.healthPoints -= enemy_ap;
    },
    reset: function () {
        healthPoints = 120;
    }
}

var darthmaul = {
    name: "Darth Maul",
    attackPower: 15,
    healthPoints: 130,
    attack: function (enemy_ap) {
        // Darth Maul has 0.3 chance to receive double attack damage
        if (Math.random() < 0.7) {
            this.healthPoints -= enemy_ap
        }
        else {
            alert("Darth Maul is receiving double attack damage!")
            this.healthPoints -= 2 * enemy_ap;
        }
    },
    reset: function () {
        healthPoints = 130;
        attackPower = 15;
    }
}

// connect character's name to its object 
var map = {
    "Darth Vader": darthvader,
    "Luke Skywalker": lukeskywalker,
    "Darth Sidious": darthsidious,
    "Darth Maul": darthmaul
}

//create a function that resets the whole game 
function resetGame() {
    $(".all_char").append($(".char_container"));
    darthvader.reset();
    lukeskywalker.reset();
    darthsidious.reset();
    darthmaul.reset();

    $(".hp1").text("HP: " + darthvader.healthPoints);
    $(".hp2").text("HP: " + lukeskywalker.healthPoints);
    $(".hp3").text("HP: " + darthsidious.healthPoints);
    $(".hp4").text("HP: " + darthmaul.healthPoints);

    isClicked = false;
}

// global variable 
var isClicked = false;
var defender_name;
var your_name;
var defenderChange = "";

// game starts 
$(document).ready(function () {
    resetGame();
    // reset the game when clicking the reset button 
    $(".reset").on("click", function () {
        location.reload(); 
    });
    //onclick event -- character choice 
    $(".all_char .char_container").on("click", function () {
        if (!isClicked) {
            $("#userChoice").append($(this));
            your_name = $(this).find($(".char_name")).text();
            console.log(your_name);
            $("#enemy").append($(".all_char").children());
            $("#enemy").children().css("background-color", "red");
            isClicked = true;
        }
        else {
            $("#defender").append($(this));
            defender_name = $(this).find($(".char_name")).text();
            console.log(defender_name);
        }
    });

    //onclick event -- attack
    $(".attack").on("click", function () {
        $("#explain_para").text("You attacked " + defender_name + "for " + map[your_name].attackPower + " damage.")
        map[your_name].attack(map[defender_name].attackPower);
        map[defender_name].attack(map[your_name].attackPower);
        $(".hp1").text("HP: " + darthvader.healthPoints);
        $(".hp2").text("HP: " + lukeskywalker.healthPoints);
        $(".hp3").text("HP: " + darthsidious.healthPoints);
        $(".hp4").text("HP: " + darthmaul.healthPoints);
        $("#explain_para").append("<div>" + defender_name + " attacked you back for " + map[defender_name].attackPower + " damage." + "<br/>" + "<br/>")
        // rules of the game 
        console.log(map[defender_name].healthPoints);
        //the condition of win 
        if (map[defender_name].healthPoints <= 0 && map[your_name].healthPoints >= 0) {
            $("#explain_para").text("You have defeated " + defender_name + ", you can choose to fight another enemy.")
            $("#defender").text(defenderChange);

            // user click on another character to begin another round of fight
            $(".all_char").on("click", function () {
                $("#defender").append($(this));
                defender_name = $(this).find($(".char_name")).text();
                console.log(defender_name);
            });
            // the condition of final win -- no enemies available to attack and no defenders left 
            if ($("#enemy").text() === $("#defender").text()){
                $("#explain_para").text("You have won the game! Click restart to play another round!")
            }
            
        }
        // the condition of lose 
        else if (map[your_name].healthPoints < 0) {
            $("#explain_para").text("You have been defeated. Game is Over. Click restart to play again!")
        }

    })
});



