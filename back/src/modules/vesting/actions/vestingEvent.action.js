const path = require("path");
const fs = require("fs");
const readline = require("readline");
const DATA_DIR = '../../../../data';

class VestingEventAction {
    /**
     * @param {Object} vestingEventsDto
     * @returns {Promise<Array>}
     */
    async run(vestingEventsDto) {
        const { fileName, date } = vestingEventsDto;
        return this.#_processFile(fileName, date);
    }

    async #_processFile(fileName, date) {
        const dataDir = path.join(__dirname, DATA_DIR);
        const filePath = path.join(dataDir, fileName.trim());

        if (!fs.existsSync(filePath)) {
            console.error(`file not found: ${filePath}`);
            process.exit(1);
        }

        const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

        let vestingEvents = [];

        for await (const line of rl) {
            const event = this.#_parseLine(line);

            if (!event) continue;

            if (event.date <= date) {
                vestingEvents.push(event);
            }
        }

        return vestingEvents;
    }

    /**
     *
     * @param line
     * @returns {{date: string, employeeName: string, awardId: string, quantity: (number|number), employeeId: string, type: string}|null}
     */
    #_parseLine(line) {
        const parts = line.split(",");
        if (parts.length < 5) return null;

        return {
            type: parts[0].trim(),
            employeeId: parts[1].trim(),
            employeeName: parts[2].trim(),
            awardId: parts[3].trim(),
            date: parts[4].trim(),
            quantity: parseFloat(parts[5]) || 0
        };
    }
}

module.exports = new VestingEventAction();