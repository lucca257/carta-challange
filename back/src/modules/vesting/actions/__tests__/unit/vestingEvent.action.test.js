const CsvParserUtil = require("../../../../../utils/csvParser.util");
const CalculateVestingAction = require("../../calculateVesting.action");
const VestingEventAction = require("../../vestingEvent.action");
const VestingEventEntity = require("../../../entities/vestingEvent.entity");

jest.mock("../../../../../utils/csvParser.util");
jest.mock("../../calculateVesting.action");
jest.mock("../../../entities/vestingEvent.entity");

describe("VestingEventAction", () => {
    const mockDto = {
        fileName: "example.csv",
        date: "2024-01-01",
        precision: 1
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should correctly process vesting events", async () => {
        CsvParserUtil.run.mockResolvedValue([
            ["VEST", "E001", "Alice Smith", "ISO-001", "2020-01-01", "1000"],
            ["CANCEL", "E001", "Alice Smith", "ISO-001", "2021-02-01", "700"]
        ]);

        VestingEventEntity.mockImplementation((type, employeeId, employeeName, awardId, date, quantity) => ({
            type,
            employeeId,
            employeeName,
            awardId,
            date,
            quantity: parseFloat(quantity) || 0
        }));

        CalculateVestingAction.run.mockReturnValue([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "300.0" }
        ]);

        const result = await VestingEventAction.run(mockDto);

        expect(CsvParserUtil.run).toHaveBeenCalledWith("example.csv");
        expect(VestingEventEntity).toHaveBeenCalledTimes(2);
        expect(CalculateVestingAction.run).toHaveBeenCalledWith(expect.any(Array), 1);
        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "300.0" }
        ]);
    });

    test("should ignore invalid CSV lines", async () => {
        CsvParserUtil.run.mockResolvedValue([
            ["VEST", "E001", "Alice Smith", "ISO-001", "2020-01-01", "1000"],
            ["INVALID_DATA"]
        ]);

        VestingEventEntity.mockImplementation((type, employeeId, employeeName, awardId, date, quantity) => ({
            type,
            employeeId,
            employeeName,
            awardId,
            date,
            quantity: parseFloat(quantity) || 0
        }));

        CalculateVestingAction.run.mockReturnValue([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000.0" }
        ]);

        const result = await VestingEventAction.run(mockDto);

        expect(VestingEventEntity).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000.0" }
        ]);
    });

    test("should set quantity to 0 if event date is after target date", async () => {
        CsvParserUtil.run.mockResolvedValue([
            ["VEST", "E002", "Bob Jones", "NSO-002", "2025-01-01", "500"]
        ]);

        VestingEventEntity.mockImplementation((type, employeeId, employeeName, awardId, date, quantity) => ({
            type,
            employeeId,
            employeeName,
            awardId,
            date,
            quantity: parseFloat(quantity) || 0
        }));

        CalculateVestingAction.run.mockReturnValue([
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "NSO-002", quantity: "0.0" }
        ]);

        const result = await VestingEventAction.run(mockDto);

        expect(VestingEventEntity).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "NSO-002", quantity: "0.0" }
        ]);
    });

    test("should handle multiple employees and awards correctly", async () => {
        CsvParserUtil.run.mockResolvedValue([
            ["VEST", "E001", "Alice Smith", "ISO-001", "2020-01-01", "1000"],
            ["VEST", "E002", "Bob Jones", "ISO-002", "2020-02-01", "500"],
            ["CANCEL", "E002", "Bob Jones", "ISO-002", "2021-02-01", "200"]
        ]);

        VestingEventEntity.mockImplementation((type, employeeId, employeeName, awardId, date, quantity) => ({
            type,
            employeeId,
            employeeName,
            awardId,
            date,
            quantity: parseFloat(quantity) || 0
        }));

        CalculateVestingAction.run.mockReturnValue([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000.0" },
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", quantity: "300.0" }
        ]);

        const result = await VestingEventAction.run(mockDto);

        expect(VestingEventEntity).toHaveBeenCalledTimes(3);
        expect(result).toEqual([
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000.0" },
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", quantity: "300.0" }
        ]);
    });
});
