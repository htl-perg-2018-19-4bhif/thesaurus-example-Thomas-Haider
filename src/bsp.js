var text = new Array();
var args = process.argv;
var words = new Array();
var wordIsFound = new Array();
if (args.length <= 2) {
    console.log("Eingabe von Wörter erforderlich!");
    process.exit(0);
}
for (var i = 2; i < args.length; i++) {
    words.push(args[i]);
    wordIsFound.push(false);
}
var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("openthesaurus.txt")
});
lineReader.on("line", function (line) {
    text.push(line);
});
lineReader.on("close", function (line) {
    var array = new Array();
    for (var i = 0; i < text.length; i++) {
        var curarray = text[i].split(";");
        array.push(curarray);
    }
    for (var w = 0; w < words.length; w++) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                var curString = array[i][j];
                if (words[w] === curString || curString.indexOf(words[w]) != -1) {
                    wordIsFound[w] = true;
                    console.log(curString + ":");
                    for (var k = 0; k < array[i].length; k++) {
                        if (k != j) {
                            console.log("\t" + array[i][k]);
                        }
                    }
                    break;
                }
            }
        }
        if (wordIsFound[w] === false) {
            console.log(words[w] + ":");
            console.log("\tNo matches found!");
        }
    }
});
