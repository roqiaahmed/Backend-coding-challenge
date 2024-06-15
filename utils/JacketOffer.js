const Discounts = require('./Discounts');

class JacketOffer extends Discounts {
  tops = ['T-shirt', 'Blouse'];
  n_tops = 0;
  constructor(projects, items) {
    super(projects, items);
  }
  async getAllDiscounts() {
    const jacketItem = this.items['Jacket'];
    if (jacketItem) {
      for (let i = 0; i < this.tops.length; i++) {
        const top = this.tops[i];
        const topItem = this.items[top];
        if (topItem) {
          this.n_tops += topItem['quantity'];
        }
      }
      const quantity = jacketItem['quantity'];
      const jacket = await this.projects.find({ Item: 'Jacket' }).toArray();
      let offer = (((this.n_tops / 2) * 50) / 100) * jacket[0].price;
      let percent = (offer * 100) / (jacket[0].price * quantity);
      if (percent >= 100) {
        percent = 100;
        offer = jacket[0].price * quantity;
      }
      Discounts.discount += offer;
      Discounts.discounts_format.push(
        `${percent}% off ${quantity} of ${jacket[0].Item}: -${offer}`
      );
    }
  }
}

module.exports = JacketOffer;
