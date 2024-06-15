const BillCart = require('./BillCart');

class Subtotal extends BillCart {
  constructor(projects, items) {
    super(projects, items);
  }

  async getSubtotal() {
    for (let i = 0; i < Object.keys(this.items).length; i++) {
      const key = Object.keys(this.items)[i];
      const item = await this.projects.find({ Item: key }).toArray();
      const quantity = this.items[key]['quantity'];
      const subtotal = item[0].price * quantity;
      BillCart.subtotal += subtotal;
      BillCart.total += subtotal;
    }
  }
}
module.exports = Subtotal;
