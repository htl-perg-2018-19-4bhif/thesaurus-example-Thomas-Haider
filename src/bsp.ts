let text: string[] = new Array();
const args = process.argv;
const words: string[] = new Array();
const wordIsFound: boolean[] = new Array();
 if (args.length <= 2) {
    console.log("Eingabe von Wörter erforderlich!");
    process.exit(0);
}
for (let i = 2; i < args.length; i++) {
    words.push(args[i]);
    wordIsFound.push(false);
}
 let lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("openthesaurus.txt")
});
lineReader.on("line", function (line) {
    text.push(line);
});
lineReader.on("close", function (line) {
    let array = new Array();
    for (let i = 0; i < text.length; i++) {
        let temparray: string[] = text[i].split(";");
        array.push(temparray);
    }
     for (let w = 0; w < words.length; w++) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                let curString: string = array[i][j];
                if (words[w] === curString || curString.indexOf(words[w]) != -1) {
                    wordIsFound[w] = true;
                    console.log(curString + ":");
                    for (let k = 0; k < array[i].length; k++) {
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



