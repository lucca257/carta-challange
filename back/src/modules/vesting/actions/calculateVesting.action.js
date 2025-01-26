class CalculateVestingAction {
    /**
     * Processes vesting and cancellation events.
     * @param {Array} events
     * @returns {Array}
     */
    static run(events) {
        const vestingMap = new Map();

        for (const event of events) {
            const key = `${event.employeeId}-${event.awardId}`;
            const eventQuantity = parseFloat(event.quantity) || 0;

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

        return Array.from(vestingMap.values()).sort((a, b) => {
            if (a.employeeId < b.employeeId) return -1;
            if (a.employeeId > b.employeeId) return 1;
            if (a.awardId < b.awardId) return -1;
            if (a.awardId > b.awardId) return 1;
            return 0;
        });
    }
}

module.exports = CalculateVestingAction;
