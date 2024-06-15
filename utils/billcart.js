class BillCart {
  static total = 0.0;
  static shipping = 0.0;
  static subtotal = 0.0;
  static VAT = 0.0;

  constructor(projects, items) {
    this.projects = projects;
    this.items = items;
  }

  static clear() {
    BillCart.total = 0.0;
    BillCart.shipping = 0.0;
    BillCart.subtotal = 0.0;
    BillCart.VAT = 0.0;
  }
}

module.exports = BillCart;
