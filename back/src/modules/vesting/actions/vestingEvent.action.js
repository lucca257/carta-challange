const CsvParserUtil = require("../../../utils/csvParser.util");
const CalculateVestingAction = require("./calculateVesting.action");
const VestingEventEntity = require("../../vesting/entities/vestingEvent.entity");

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
     * @returns {VestingEventEntity}
     */
    #_mapToVestingEvent(parts) {
        if (parts.length < 6) return null;

        return new VestingEventEntity(
            parts[0],
            parts[1],
            parts[2],
            parts[3],
            parts[4],
            parseFloat(parts[5]) || 0
        );
    }
}

module.exports = new VestingEventAction();
