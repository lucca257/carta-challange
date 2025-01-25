const path = require("path");
const fs = require("fs");
const DATA_DIR = '../../../../data';

class VestingEventAction {
    /**
     * @param vestingEventsDto
     * @returns {Promise<void>}
     */
    async run(vestingEventsDto) {
        const { fileName, date } = vestingEventsDto;
        this.#_processFile(fileName, date);
    }

    #_processFile(fileName, date) {
        const dataDir = path.join(__dirname, DATA_DIR);
        const filePath = path.join(dataDir, fileName.trim());

        if (!fs.existsSync(filePath)) {
            console.error(`file not found: ${filePath}`);
            process.exit(1);
        }

        console.log(`processing file: ${filePath}`);
    }
}

module.exports = new VestingEventAction();