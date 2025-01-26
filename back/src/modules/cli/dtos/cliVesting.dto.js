const CliAbstractDto = require('./cliAbstract.dto');

class CliVestingDto extends CliAbstractDto {

    /**
     * @param fileName
     * @param date
     * @param precision
     */
    constructor(fileName, date, precision = 0) {
        super();
        this.fileName = fileName;
        this.date = date;
        this.precision = precision;
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

        if (this.precision < 0) {
            throw new Error("The precision can not be lower than 0.");
        }

        if (this.precision > 6) {
            throw new Error("The precision can not be greater than 6.");
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
