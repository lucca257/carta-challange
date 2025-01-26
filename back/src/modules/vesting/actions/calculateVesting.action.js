class CalculateVestingAction {
    /**
     * Processes vesting and cancellation events.
     * @param {Array} events
     * @param {number} precision
     * @returns {Array}
     */
    static run(events, precision) {
        const factor = Math.pow(10, precision);
        const vestingMap = new Map();

        for (const event of events) {
            const key = `${event.employeeId}-${event.awardId}`;
            const eventQuantity = this.#_applyPrecision(event.quantity, factor);

            if (!vestingMap.has(key)) {
                vestingMap.set(key, {
                    employeeId: event.employeeId,
                    employeeName: event.employeeName,
                    awardId: event.awardId,
                    quantity: 0
                });
            }

            const record = vestingMap.get(key);

            if (event.type === "VEST") {
                record.quantity += eventQuantity;
            } else if (event.type === "CANCEL") {
                if (eventQuantity <= record.quantity) {
                    record.quantity -= eventQuantity;
                } else {
                    record.quantity = 0;
                }
            }

            vestingMap.set(key, record);
        }

        return Array.from(vestingMap.values())
            .map(record => ({
                ...record,
                quantity: (record.quantity / factor).toFixed(precision)
            }))
            .sort((a, b) => {
                if (a.employeeId < b.employeeId) return -1;
                if (a.employeeId > b.employeeId) return 1;
                if (a.awardId < b.awardId) return -1;
                if (a.awardId > b.awardId) return 1;
                return 0;
            });
    }

    /**
     * - Converts to an integer space before processing.
     * - Truncates extra decimal places without rounding up.
     * @param {number} quantity
     * @param {number} factor
     * @returns {number} Integer representation of the number
     */
    static #_applyPrecision(quantity, factor) {
        return Math.floor(quantity * factor);
    }
}

module.exports = CalculateVestingAction;
