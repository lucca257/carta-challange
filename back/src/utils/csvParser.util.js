const path = require("path");
const fs = require("fs");
const readline = require("readline");

const DATA_DIR = '../../data';

class CsvParserUtil {
    /**
     * Reads a CSV file and returns an array of raw lines split into parts.
     * @param {string} fileName
     * @returns {Promise<Array<Array<string>>>}
     */
    static async run(fileName) {
        const dataDir = path.join(__dirname, DATA_DIR);
        const filePath = path.join(dataDir, fileName.trim());

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

        let parsedLines = [];

        for await (const line of rl) {
            const parts = CsvParserUtil.#_splitLine(line);
            if (parts.length > 0) {
                parsedLines.push(parts);
            }
        }

        return parsedLines;
    }

    /**
     * @param {string} line
     * @returns {Array<string>}
     */
    static #_splitLine(line) {
        return line.split(",").map(value => value.trim());
    }
}

module.exports = CsvParserUtil;