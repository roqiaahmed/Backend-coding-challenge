const Discounts = require('./Discounts');

class TwoItemsOffer extends Discounts {
  constructor(projects, items) {
    super(projects, items);
  }
  async getAllDiscounts(shipping) {
    const keys = Object.keys(this.items).length;
    if (
      keys != 0 &&
      (keys >= 2 || Object.keys(this.items)[0]['quantity'] >= 2)
    ) {
      const offer = (shipping * 10) / 100;
      Discounts.discount += offer;
      Discounts.discounts_format.push(`10% off shipping: -${offer}`);
    }
  }
}

module.exports = TwoItemsOffer;
