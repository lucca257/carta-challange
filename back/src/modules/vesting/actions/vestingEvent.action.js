const CsvParserUtil = require("../../../utils/csvParser.util");
const CalculateVestingAction = require("./calculateVesting.action");

class VestingEventAction {
    /**
     * Processes vesting events from a CSV file.
     * @param {Object} vestingEventsDto - The DTO containing `fileName`, `date`, and `precision`.
     * @returns {Promise<Array>}
     */
    async run(vestingEventsDto) {
        const { fileName, date, precision } = vestingEventsDto;

        const rawData = await CsvParserUtil.run(fileName);

        const vestingEvents = rawData
            .map(parts => this.#_mapToVestingEvent(parts))
            .filter(event => event !== null);  // Ignore invalid lines

        const filteredEvents = vestingEvents.map(event => ({
            ...event,
            quantity: event.date > date ? 0 : event.quantity
        }));

        return CalculateVestingAction.run(filteredEvents, precision);
    }

    /**
     * Converts raw CSV parts into a structured Vesting Event object.
     * @param {Array<string>} parts - Raw CSV values.
     * @returns {{type: string, employeeId: string, employeeName: string, awardId: string, date: string, quantity: number} | null}
     */
    #_mapToVestingEvent(parts) {
        if (parts.length < 6) return null; // Ensure minimum required fields exist

        return {
            type: parts[0],
            employeeId: parts[1],
            employeeName: parts[2],
            awardId: parts[3],
            date: parts[4],
            quantity: parseFloat(parts[5]) || 0  // Ensure quantity is a number
        };
    }
}

module.exports = new VestingEventAction();
