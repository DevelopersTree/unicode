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

function renderInstructions(os) {

    var systems = [{
            id: "iOS",
            title: "ئایفۆن و ئایپاد",
            youtube: "yDlJ_NHgav4",
            text: "<a target='_blank' href='https://itunes.apple.com/us/app/kurdish-keyboard/id928647744?mt=8'>لینکی دابەزاندنی کیبۆڕدی کوردی</a>"
        },
        {
            id: "Windows 10",
            title: "ویندۆز ١٠",
            youtube: "yJTjKCdfIe4",
            text: ""
        },
        {
            id: "Mac",
            title: "ماک",
            youtube: "-5h921IKzFw",
            text: ""
        },
        {
            id: "Windows",
            title: "ویندۆز ئێکسپی، ڤێستا، ٧ و ٨",
            youtube: "EghP0s4hzww",
            text: "<a target='_blank' href='http://unicode.ekrg.org/download.html'>لینکی دابەزاندنی کیبۆڕدی کوردی</a>"
        },
        {
            id: "Android",
            title: "ئەندرۆید",
            youtube: "cjbkXDWPl4o",
            text: "<a target='_blank' href='https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin&hl=en'>لینکی دابەزاندنی کیبۆڕدی کوردی</a>"
        }
    ];

    console.log(os);
    var currentSys = systems.find(function (s) {
        return s.id === os
    });

    // this one is for windows versions prior to windows 10
    if (currentSys == undefined)
    {
        currentSys = systems.find(function (s) {
                return os.includes(s.id);
        });
    }

    var instructions = '';
    if (currentSys == undefined)
    {
        instructions = '<h4>کیبۆڕدی ستاندارد دابەزێنە:</h4><ul>';
    }
    else
    {
        instructions = `<h4>چۆنییەتی دانانی کیبۆڕدی ستاندارد بۆ ${currentSys.title}</h4>
        <p>${currentSys.text}</p>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/${currentSys.youtube}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <hr/>
        <h4>بۆ سیستەمەکانی دیکە</h4>
        <ul>`;
    }

    for (var i in systems) {
        var sys = systems[i];

        if (sys.id == currentSys.id)
            continue;
            
        instructions += `<li><a target='_blank' href='https://www.youtube.com/watch?v=${sys.youtube}'>${sys.title}</li>`;
    }

    instructions += '</ul>';

    return instructions;
}

function getTestReady(window) {
    $("#instructions").removeClass("jumbotron");
    $("#instructions").html("");

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
            $("#result").load('good.html', function () {
                $("#again").click(function () {
                    $("#result").load("test.html", getTestReady);
                })
            });
        } else {
            $("#result").load('bad.html', function () {
                var colorCoded = colorizeSentence(userInput, characterResults);
                $("#colorized").html(colorCoded);

                var os = getOperatingSystem(window);

                var instructions = renderInstructions(os);
                $("#instructions").html(instructions);
                $("#instructions").addClass("jumbotron");
                $("#again").click(function () {
                    $("#result").load("test.html", getTestReady);
                })
            });
        }
    });
}