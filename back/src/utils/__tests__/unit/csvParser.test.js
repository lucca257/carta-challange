const path = require("path");
const fs = require("fs");
const readline = require("readline");
const CsvParserUtil = require("../../csvParser.util");

jest.mock("fs");
jest.mock("readline");

describe("CsvParserUtil", () => {
    const mockFilePath = path.join(__dirname, "../../../../data/example.csv");

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should parse CSV file correctly", async () => {
        const mockData = [
            "VEST,E001,Alice Smith,ISO-001,2020-01-01,1000",
            "CANCEL,E001,Alice Smith,ISO-001,2021-02-01,700"
        ];

        fs.existsSync.mockReturnValue(true);

        const mockReadlineInterface = {
            [Symbol.asyncIterator]: async function* () {
                for (const line of mockData) {
                    yield line;
                }
            },
            close: jest.fn()
        };

        readline.createInterface.mockReturnValue(mockReadlineInterface);

        const result = await CsvParserUtil.run("example.csv");

        expect(result).toEqual([
            ["VEST", "E001", "Alice Smith", "ISO-001", "2020-01-01", "1000"],
            ["CANCEL", "E001", "Alice Smith", "ISO-001", "2021-02-01", "700"]
        ]);

        expect(fs.existsSync).toHaveBeenCalledWith(mockFilePath);
        expect(readline.createInterface).toHaveBeenCalled();
    });

    test("should return an empty array if the CSV file is empty", async () => {
        fs.existsSync.mockReturnValue(true);

        const mockReadlineInterface = {
            [Symbol.asyncIterator]: async function* () {},
            close: jest.fn()
        };

        readline.createInterface.mockReturnValue(mockReadlineInterface);

        const result = await CsvParserUtil.run("empty.csv");

        expect(result).toEqual([]);
        expect(fs.existsSync).toHaveBeenCalled();
        expect(readline.createInterface).toHaveBeenCalled();
    });

    test("should throw an error if the file does not exist", async () => {
        fs.existsSync.mockReturnValue(false);

        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
        await expect(CsvParserUtil.run("missing.csv")).rejects.toThrow(/File not found/);

        consoleErrorMock.mockRestore();
    });


});
