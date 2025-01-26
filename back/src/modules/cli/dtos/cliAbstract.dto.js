class CliAbstractDto {
    validate() {
        throw new Error("Method 'validate()' must be implemented.");
    }
}

module.exports = CliAbstractDto;