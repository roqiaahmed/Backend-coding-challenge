const Discounts = require('./Discounts');

class ShoseOffer extends Discounts {
  constructor(projects, items) {
    super(projects, items);
  }
  async getAllDiscounts() {
    const shoesItem = this.items['Shoes'];
    if (shoesItem) {
      const quantity = shoesItem['quantity'];
      const shoes = await this.projects.find({ Item: 'Shoes' }).toArray();
      const offer = (shoes[0].price * quantity * 10) / 100;
      Discounts.discount += offer;
      const percent = (offer * 100) / (shoes[0].price * quantity);
      Discounts.discounts_format.push(
        `${percent}% off ${quantity} of ${shoes[0].Item}: -${offer}`
      );
    }
  }
}

module.exports = ShoseOffer;
