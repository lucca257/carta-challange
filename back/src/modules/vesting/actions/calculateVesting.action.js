class CalculateVestingAction {
    static run(events) {
        const groupedEvents = events.reduce((acc, event) => {
            const key = `${event.employeeId}-${event.awardId}`;
            if (!acc[key]) {
                acc[key] = { ...event };
            } else {
                acc[key].quantity += event.quantity;
            }
            return acc;
        }, {});

        return Object.values(groupedEvents).sort((a, b) => {
            if (a.employeeId < b.employeeId) return -1;
            if (a.employeeId > b.employeeId) return 1;
            if (a.awardId < b.awardId) return -1;
            if (a.awardId > b.awardId) return 1;
            return 0;
        });
    }
}

module.exports = CalculateVestingAction;