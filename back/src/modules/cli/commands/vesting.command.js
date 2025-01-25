const Dto = require("../dtos/cliVesting.dto");
const Action = require("../../vesting/actions/vestingEvent.action");

class VestingCommand {
    /**
     * @param {string[]} args
     */
    static async run(args) {
        if (args.length < 2) {
            console.error("Missing arguments. Use: vesting <fileName> <date>");
            process.exit(1);
        }

        const [fileName, date] = args;

        try {
            const dto = new Dto(fileName, date);
            dto.validate();

            await Action.run(dto);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }
}

module.exports = VestingCommand;
