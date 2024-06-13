class Discounts {
  static discounts = 0;
  constructor(item, quantity) {
    this.item = item;
    this.quantity = quantity;
  }

  getShoseOffer() {
    const offer = (this.item[0].price * this.quantity * 10) / 100;
    Discounts.discounts += offer;
    const percent = (offer * 100) / (this.item[0].price * this.quantity);
    return `${percent}% off ${this.quantity} of ${this.item[0].Item}: -${offer}`;
  }

  getJacketsOffer(tops) {
    let offer = (((tops / 2) * 50) / 100) * this.item[0].price;
    let percent = (offer * 100) / (this.item[0].price * this.quantity);
    if (percent >= 100) {
      percent = 100;
      offer = this.item[0].price * this.quantity;
    }
    Discounts.discounts += offer;
    return `${percent}% off ${this.quantity} of ${this.item[0].Item}: -${offer}`;
  }

  getTwoItemsOffer(shipping) {
    const offer = (shipping * 10) / 100;
    Discounts.discounts += offer;
    return `10% off shipping: -${offer}`;
  }

  static getAllDiscounts() {
    return Discounts.discounts;
  }
}

module.exports = Discounts;
