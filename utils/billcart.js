class BillCart {
  static total = 0;
  constructor(item, quantity) {
    this.item = item;
    this.quantity = quantity;
  }

  getSubtotal() {
    const subtotal = this.item[0].price * this.quantity;
    BillCart.total += subtotal;
    return subtotal;
  }

  getShippingCost() {
    const country = this.item[0].Country;
    const shipping =
      (this.quantity * this.item[0].Weight * process.env[country] * 1000) / 100;
    BillCart.total += shipping;
    return shipping;
  }

  getVAT() {
    const VAT = (this.quantity * process.env.VAT * this.item[0].price) / 100;
    BillCart.total += VAT;
    return VAT;
  }

  static getTotal() {
    return BillCart.total;
  }
}

module.exports = BillCart;
