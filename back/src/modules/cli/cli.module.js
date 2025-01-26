const path = require("path");

class CliModule {
    static run(command, args = []) {
        if (!command) {
            throw new Error("No command provided.");
        }

        const fs = require("fs");
        const commandPath = path.join(__dirname, "commands", `${command}.command.js`);

        if (fs.existsSync(commandPath)) {
            try {
                const CommandModule = require(commandPath);
                CommandModule.run(args);
            } catch (error) {
                throw new Error(`Error executing command ${command}: ${error.message}`);
            }
        } else {
            throw new Error(`Command ${command} does not exist.`);
        }
    }
}

module.exports = CliModule;