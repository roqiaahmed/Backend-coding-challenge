const BillCart = require('./BillCart');

class VAT extends BillCart {
  constructor(projects, items) {
    super(projects, items);
  }

  async getVAT() {
    for (let i = 0; i < Object.keys(this.items).length; i++) {
      const item = await this.projects
        .find({ Item: Object.keys(this.items)[i] })
        .toArray();
      const key = Object.keys(this.items)[i];
      const quantity = this.items[key]['quantity'];
      if (quantity <= 0) {
        continue;
      }
      const VAT = (quantity * process.env.VAT * item[0].price) / 100;

      BillCart.VAT += VAT;
      BillCart.total += VAT;
    }
  }
}
module.exports = VAT;
