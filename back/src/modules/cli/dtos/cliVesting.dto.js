class CliVestingDto {

    /**
     * @param fileName
     * @param date
     */
    constructor(fileName, date) {
        this.fileName = fileName;
        this.date = date;
    }

    /**
     * @throws {Error}
     */
    validate() {
        if (!this.fileName) {
            throw new Error("The file name is required.");
        }

        if (!this.fileName || !this.fileName.endsWith(".csv")) {
            throw new Error("The file type should be a CSV.");
        }

        if (!this.date) {
            throw new Error("The param Date is required YYYY-MM-DD.");
        }

        if (this.date && !this.isValidDate(this.date)) {
            throw new Error("The date field should be in format YYYY-MM-DD.");
        }
    }

    /**
     * @param date
     * @returns {boolean}
     */
    isValidDate(date) {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }
}

module.exports = CliVestingDto;
