class VestingEventEntity {
    /**
     * @param {string} type
     * @param {string} employeeId
     * @param {string} employeeName
     * @param {string} awardId
     * @param {string} date
     * @param {number} quantity
     */
    constructor(type, employeeId, employeeName, awardId, date, quantity) {
        if (!["VEST", "CANCEL"].includes(type)) {
            throw new Error(`Tipo inválido: ${type}`);
        }

        if (!employeeId || !employeeName || !awardId || !date) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        this.type = type.trim();
        this.employeeId = employeeId.trim();
        this.employeeName = employeeName.trim();
        this.awardId = awardId.trim();
        this.date = new Date(date.trim());
        this.quantity = parseFloat(quantity) || 0;

        if (isNaN(this.date.getTime())) {
            throw new Error(`Data inválida: ${date}`);
        }
    }
}

module.exports = VestingEventEntity;