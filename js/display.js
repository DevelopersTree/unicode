$(document).ready(function () {

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
        $("#result").load('good.html');
      } else {
        $("#result").load('bad.html', function () {
          var colorCoded = colorizeSentence(userInput, characterResults);
          $("#colorized").html(colorCoded);
        });
      }
    });
  });