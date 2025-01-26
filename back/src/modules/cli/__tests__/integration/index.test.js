const { execSync } = require("child_process");
const path = require("path");

describe("CLI Integration Test", () => {
    const cliScript = path.resolve(__dirname, "../../../cli/index.js");

    test("should execute vesting command successfully", () => {
        const command = `npm_lifecycle_event=vesting node ${cliScript} example.csv 2020-04-01`;
        const output = execSync(command, { encoding: "utf8" });

        expect(output).toMatch(/E001,Alice Smith,ISO-001,\d+/);
        expect(output).toMatch(/E002,Bobby Jones,NSO-001,\d+/);
    });

    test("should handle missing arguments", () => {
        const command = `npm_lifecycle_event=vesting node ${cliScript} example.csv`;
        try {
            execSync(command, { encoding: "utf8", stdio: "pipe" });
        } catch (error) {
            expect(error.message).toContain("Missing arguments. Use: vesting <fileName> <date>");
            expect(error.status).toBe(1);
        }
    });

    test("should handle invalid command", () => {
        const command = `npm_lifecycle_event=invalidCommand node ${cliScript}`;

        try {
            execSync(command, { encoding: "utf8", stdio: "pipe" });
        } catch (error) {
            expect(error.message).toContain("Command invalidCommand does not exist.");
            expect(error.status).toBe(1);
        }
    });

    test("should handle execution failure in command", () => {
        const command = `npm_lifecycle_event=vesting node ${cliScript} invalid.csv 2020-04-01`;

        try {
            execSync(command, { encoding: "utf8", stdio: "pipe" });
        } catch (error) {
            expect(error.message).toContain("File not found:");
            expect(error.status).toBe(1);
        }
    });
});