const Discounts = require('./Discounts');

class TwoItemsOffer extends Discounts {
  constructor(projects, items) {
    super(projects, items);
  }
  async getAllDiscounts(shipping) {
    const item = Object.keys(this.items);
    const keys = item.length;
    if (keys != 0) {
      const quantity = 0 || Object.values(this.items)[0]['quantity'];
      if (keys >= 2 || quantity >= 2) {
        const offer = (shipping * 10) / 100;
        Discounts.discount += offer;
        Discounts.discounts_format.push(`10% off shipping: -${offer}`);
      }
    }
  }
}

module.exports = TwoItemsOffer;
