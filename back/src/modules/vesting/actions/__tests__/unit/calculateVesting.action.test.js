const CalculateVestingAction = require("../../calculateVesting.action");

describe("CalculateVestingAction", () => {
    test("should correctly process vesting events", () => {
        const events = [
            { type: "VEST", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2020-01-01", quantity: 1000.5 },
            { type: "VEST", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2020-02-01", quantity: 200.25 }
        ];

        const result = CalculateVestingAction.run(events, 1);

        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1200.7" }
        ]);
    });

    test("should correctly process vesting and cancellation events", () => {
        const events = [
            { type: "VEST", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2020-01-01", quantity: 1000.5 },
            { type: "CANCEL", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2021-02-01", quantity: 700.75 }
        ];

        const result = CalculateVestingAction.run(events, 1);

        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "299.8" }
        ]);
    });

    test("should not allow cancellation beyond vested amount", () => {
        const events = [
            { type: "VEST", employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", date: "2020-01-01", quantity: 500 },
            { type: "CANCEL", employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", date: "2021-02-01", quantity: 600 }
        ];

        const result = CalculateVestingAction.run(events, 1);

        expect(result).toEqual([
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", quantity: "0.0" }
        ]);
    });

    test("should handle multiple employees and awards correctly", () => {
        const events = [
            { type: "VEST", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2020-01-01", quantity: 1000 },
            { type: "VEST", employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", date: "2020-02-01", quantity: 500 },
            { type: "CANCEL", employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", date: "2021-02-01", quantity: 200 }
        ];

        const result = CalculateVestingAction.run(events, 0);

        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000" },
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", quantity: "300" }
        ]);
    });

    test("should apply correct precision", () => {
        const events = [
            { type: "VEST", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2020-01-01", quantity: 1000.5678 },
            { type: "CANCEL", employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", date: "2021-02-01", quantity: 700.7543 }
        ];

        const result = CalculateVestingAction.run(events, 2);

        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "299.81" }
        ]);
    });
});