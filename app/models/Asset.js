class Asset {
    constructor(id, symbol, quantity, amount, transaction) {
        this.id = id;
        this.symbol = symbol;
        this.quantity = quantity;
        this.amount = amount;
        this.transaction = transaction;
    }
}

export default Asset;