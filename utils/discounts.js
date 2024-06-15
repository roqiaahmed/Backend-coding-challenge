class Discounts {
  static discount = 0;
  static discounts_format = [];

  constructor(projects, items) {
    this.items = items;
    this.projects = projects;
  }

  getAllDiscounts() {
    return Discounts.discount;
  }

  getDiscountsFormat() {
    return Discounts.discounts_format;
  }

  static clear() {
    Discounts.discount = 0;
    Discounts.discounts_format = [];
  }
}

module.exports = Discounts;
