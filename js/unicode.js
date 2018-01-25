// Standard Kurdish characters
const standardChars = [
    '\u0626', '\u0627', '\u0628', '\u067E', '\u062A', '\u062C', '\u0686', '\u062D', '\u062E',
    '\u062F', '\u0631', '\u0695', '\u0632', '\u0698', '\u0633', '\u0634', '\u0639', '\u063A',
    '\u0641', '\u06A4', '\u0642', '\u06A9', '\u06AF', '\u0644', '\u06B5', '\u0645', '\u0646',
    '\u0648', '\u06C6', '\u0647', '\u06D5', '\u06CC', '\u06CE', '\u0020'
];

// Returns a random proverb
function getRandomProverb() {
    var proverbs = [
        "ئیشی بە پینە و پەڕۆ هەر دەگاتە نیوەڕۆ",
        "لە هەموو هەورێک باران نابارێت",
        "ساڵی خۆش لە بەهارەکەیدا دیارە",
        "بار بە لاباران قەت ناگاتە هەواران",
        "دەنگی دەهۆڵ لە دوورەوە خۆشە"
    ];

    var index = Math.floor((Math.random() * proverbs.length));
    return proverbs[index];
}

// Returns an array that contains the result (whether it's standard or not)
// of each character in the user input
function getCharacterResults(userInput) {
    var characterResults = [];

    // Check if the user input contains any illigal characters
    for (i = 0; i < userInput.length; i++) {
        if (standardChars.indexOf(userInput[i]) == -1)
            characterResults.push(false);
        else
            characterResults.push(true);
    }

    console.log(characterResults);
    return characterResults;
}

// Checks whether the users is using a standard keyboard
function checkStandardKeyboard(characterResults) {
    for (i = 0; i < characterResults.length; i++) {
        if (characterResults[i] == false) {
            console.log("Not using standard keyboard");
            return false;
        }
    }

    console.log("Is using standard keyboard");
    return true;
}

// Colorizes the user input to show the illigal characters
function colorizeSentence(userInput, characterResults) {
    if (userInput.length != characterResults.length) {
        alert('هەڵەیەک ڕوویدا لە کاتی پشکنینەکە');
        return "";
    }

    var colorized = "";

    for (i = 0; i < userInput.length; i++) {
        if (i == 0 || (characterResults[i - 1] != characterResults[i])) {
            if (characterResults[i])
                colorized += "<span class='good'>";
            else
                colorized += "<span class='bad'>";
        }

        colorized += userInput[i];

        if (i == userInput.length - 1 || (characterResults[i + 1] != characterResults[i]))
            colorized += "</span>";
    }

    console.log(colorized);
    return colorized;
}

function getTestReady(){
    // Invoke check button when pressing enter inside textbox
    $('#input').keypress(function (e) {
      if (e.keyCode == 13)
        $('#check').click();
    });
  
    // Show a random proverb
    $("#proverb").text(getRandomProverb());
  
    // Check keyboard
    $("#check").click(function () {
  
      var userInput = $("#input").val();
  
      if (userInput.length == 0) {
        alert('تکایە پەندەکە لە بۆکسەکە بنووسە');
        return;
      }
  
      if (userInput.length > 50) {
        alert('پێویست ناکات زیاتر لە ٥٠ پیت بنووسیت');
        return;
      }
  
      var characterResults = getCharacterResults(userInput);
      var isUsingStandardKeyboard = checkStandardKeyboard(characterResults);
  
      if (isUsingStandardKeyboard) {
        $("#result").load('good.html', function() {
          $("#again").click(function (){
            $("#result").load("test.html", getTestReady);
          })
        });
      } else {
        $("#result").load('bad.html', function () {
          var colorCoded = colorizeSentence(userInput, characterResults);
          $("#colorized").html(colorCoded);
          $("#again").click(function (){
            $("#result").load("test.html", getTestReady);
          })
        });
      }
    });
  }