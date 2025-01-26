const path = require("path");
const fs = require("fs");
jest.mock("fs");

describe("CliModule", () => {
    let CliModule;
    const mockCommand = "testCommand";
    const mockArgs = ["arg1", "arg2"];
    const mockCommandPath = path.join(__dirname, "../../../../modules/cli/commands", `${mockCommand}.command.js`);

    beforeEach(() => {
        jest.clearAllMocks();
        jest.isolateModules(() => {
            CliModule = require("../../cli.module"); // Re-import inside isolateModules
        });
    });

    test("should throw an error if no command is provided", () => {
        expect(() => CliModule.run()).toThrow("No command provided.");
    });

    test("should throw an error if the command file does not exist", () => {
        fs.existsSync.mockReturnValue(false);

        expect(() => CliModule.run(mockCommand, mockArgs)).toThrow(`Command ${mockCommand} does not exist.`);
        expect(fs.existsSync).toHaveBeenCalledWith(mockCommandPath);
    });

    test("should execute a command if the file exists", () => {
        fs.existsSync.mockReturnValue(true);

        const mockCommandModule = { run: jest.fn() };
        jest.mock(mockCommandPath, () => mockCommandModule, { virtual: true });

        CliModule.run(mockCommand, mockArgs);

        expect(fs.existsSync).toHaveBeenCalledWith(mockCommandPath);
        expect(mockCommandModule.run).toHaveBeenCalledWith(mockArgs);
    });
});