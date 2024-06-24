const BillCart = require('./BillCart');

class ShippingCost extends BillCart {
  constructor(projects, items) {
    super(projects, items);
  }

  async getShippingCost() {
    for (let i = 0; i < Object.keys(this.items).length; i++) {
      const item = await this.projects
        .find({ Item: Object.keys(this.items)[i] })
        .toArray();
      const key = Object.keys(this.items)[i];
      const quantity = this.items[key]['quantity'];
      const country = item[0].Country;
      if (quantity <= 0) {
        continue;
      }
      const shipping =
        (quantity * item[0].Weight * parseInt(process.env[country]) * 1000) /
        100;

      BillCart.shipping += shipping;
      BillCart.total += shipping;
    }
  }
}
module.exports = ShippingCost;
