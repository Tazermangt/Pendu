var word;
var remaining;
var guess;

var error;
const dictionnary = ["BONJOUR", "TELEVISION", "COMMODE", "PUZZLE", "MAISON", "PANTALON", "AVION", "GARAGE", "CASSER", "PORTE", "RETARD", "JOUER", "FERMER", "FERME", "SAUTER"];
var alphabet;

newGame();

function newGame(){
    document.getElementById('input').innerHTML = "";
    document.getElementById('guess').innerHTML = "";

    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    initializeWord();

    error = -1;

    for(const letter of alphabet){
        var button = document.createElement("button");
        button.textContent = letter;
        button.id = letter;

        document.getElementById('input').appendChild(button);

        button.onclick = function(){clickLetter(document.getElementById(letter).id);};
    }

    reloadGuess();
    setErrorImage();
}

function clickLetter(letter){
    var button = document.getElementById(letter);
    button.disabled = true;
    if(letterIsIn(letter)){
        button.className = "correctLetter";
        if(guess == word){
            end(true);
        }
    }else{
        button.className = "wrongLetter";
        setErrorImage();
    }
}

function letterIsIn(letter){
    if(remaining.indexOf(letter) != -1){
        var char = 0;
        for(var part of word.split(letter)){
            char += part.length;

            if(char != word.length){
                guess = guess.substring(0, char) + letter + guess.substring(char + 1, word.length);
            }
            char++;
        }
        reloadGuess();

        var temp = "";
        for(var part of remaining.split(letter)){
            temp = temp.concat(part);
        }

        remaining = temp;
        return true;
    }else{
        return false;
    }
}

function reloadGuess(){
    var temp = "";
    for(var i = 0; i < guess.length; i++){
        temp += guess.charAt(i);
        if(i < guess.length - 1)
            temp += " ";
    }
    document.getElementById('guess').textContent = temp;
}

function setErrorImage(){
    error++;

    var img = document.createElement("img");
    switch (error){
        case 0:
            img.src = "img/empty.png";
            break;
        case 1:
            img.src = "img/error1.png";
            break;
        case 2:
            img.src = "img/error2.png";
            break;
        case 3:
            img.src = "img/error3.png";
            break;
        case 4:
            img.src = "img/error4.png";
            break;
        case 5:
            img.src = "img/error5.png";
            break;
        case 6:
            img.src = "img/error6.png";
            end(false);
            break;
        default:
            console.log("error");
    }
    document.getElementById('pendu').innerHTML = "";
    document.getElementById('pendu').appendChild(img);
}

function end(win){
    document.getElementById('input').innerHTML = "";
    document.getElementById('guess').innerHTML = "";

    var text = document.createElement("h3");

    if(win){
        text.textContent = "Felicitation vous avez gagner le mot etait : " + word + "\nVoulez-vous recommencer?";
    }else{
        text.textContent = "Vous avez perdu le mot etait : " + word + "\nVoulez-vous recommencer?";
    }

    var button = document.createElement("button");
    button.textContent = "Recommencer";
    button.id = "retry";
    button.addEventListener("click", newGame);


    document.getElementById('guess').appendChild(text);
    document.getElementById('input').appendChild(button);
}

function initializeWord(){
    var position = Math.floor(Math.random() * dictionnary.length);

    word = dictionnary[position];
    remaining = word;
    guess = "";

    for(var i = 0; i < word.length; i++){
        if(alphabet.indexOf(word.charAt(i)) != -1){
            guess += "_";
        }else{
            guess += word.charAt(i);
        }

    }
}

document.addEventListener('keydown', function(event) {
    var letterPressed = event.key.toUpperCase();
    if(alphabet.indexOf(letterPressed) != -1 && document.getElementById(letterPressed).disabled == false) {
        clickLetter(letterPressed);
    }
});

