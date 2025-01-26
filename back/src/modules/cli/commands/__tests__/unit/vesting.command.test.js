const VestingCommand = require("../../vesting.command");
const Dto = require("../../../dtos/cliVesting.dto");
const Action = require("../../../../vesting/actions/vestingEvent.action");

jest.mock("../../../dtos/cliVesting.dto");
jest.mock("../../../../vesting/actions/vestingEvent.action");

describe("VestingCommand", () => {
    let consoleErrorMock;
    let consoleLogMock;
    let processExitMock;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
        consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
        processExitMock = jest.spyOn(process, "exit").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
        consoleLogMock.mockRestore();
        processExitMock.mockRestore();
    });

    test("should exit with error if arguments are missing", async () => {
        await VestingCommand.run(["example.csv"]); // Only 1 argument instead of 2

        expect(consoleErrorMock).toHaveBeenCalledWith("Missing arguments. Use: vesting <fileName> <date>");
        expect(processExitMock).toHaveBeenCalledWith(1);
    });

    test("should exit with error if DTO validation fails", async () => {
        const mockError = new Error("Invalid DTO data");
        Dto.mockImplementation(() => ({
            validate: jest.fn(() => { throw mockError; })
        }));

        await VestingCommand.run(["example.csv", "2024-01-01"]);

        expect(consoleErrorMock).toHaveBeenCalledWith("Invalid DTO data");
        expect(processExitMock).toHaveBeenCalledWith(1);
    });

    test("should execute action and print results", async () => {
        const mockDtoInstance = { validate: jest.fn() };
        Dto.mockImplementation(() => mockDtoInstance);

        const mockData = [
            { employeeId: "E001", employeeName: "Alice Smith", awardId: "ISO-001", quantity: "1000.5" },
            { employeeId: "E002", employeeName: "Bob Jones", awardId: "ISO-002", quantity: "234.0" }
        ];
        Action.run.mockResolvedValue(mockData);

        await VestingCommand.run(["example.csv", "2024-01-01"]);

        expect(mockDtoInstance.validate).toHaveBeenCalled();
        expect(Action.run).toHaveBeenCalledWith(mockDtoInstance);
        expect(consoleLogMock).toHaveBeenCalledWith("E001,Alice Smith,ISO-001,1000.5");
        expect(consoleLogMock).toHaveBeenCalledWith("E002,Bob Jones,ISO-002,234.0");
    });

    test("should exit with error if action throws an exception", async () => {
        const mockDtoInstance = { validate: jest.fn() };
        Dto.mockImplementation(() => mockDtoInstance);

        const mockError = new Error("Action execution failed");
        Action.run.mockRejectedValue(mockError);

        await VestingCommand.run(["example.csv", "2024-01-01"]);

        expect(consoleErrorMock).toHaveBeenCalledWith("Action execution failed");
        expect(processExitMock).toHaveBeenCalledWith(1);
    });
});
