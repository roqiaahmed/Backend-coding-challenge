const assert = require('assert');
const sinon = require('sinon');
const TwoItemsOffer = require('../../utils/TwoItemsOffer');
const Discounts = require('../../utils/Discounts');

describe('TwoItemsOffer', () => {
  let projects;
  let items;
  let twoItemsOffer;
  let discounts;

  beforeEach(() => {
    items = {
      Shoes: {
        quantity: 1,
      },
      Blouse: {
        quantity: 1,
      },
    };
    twoItemsOffer = new TwoItemsOffer(projects, items);
    discounts = new Discounts(projects, items);
  });

  afterEach(() => {
    Discounts.clear();
  });

  it('should return 0 discount if no items', async () => {
    items = {};
    twoItemsOffer = new TwoItemsOffer(projects, items);
    await twoItemsOffer.getAllDiscounts(100);
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if there 1 item', async () => {
    items = {
      Blouse: {
        quantity: 1,
      },
    };
    twoItemsOffer = new TwoItemsOffer(projects, items);
    await twoItemsOffer.getAllDiscounts(100);
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 10 discount if there 2  items', async () => {
    items = {
      Blouse: {
        quantity: 1,
      },
      Jacket: {
        quantity: 1,
      },
    };
    twoItemsOffer = new TwoItemsOffer(projects, items);
    await twoItemsOffer.getAllDiscounts(100);
    assert.strictEqual(discounts.getAllDiscounts(), 10);
  });

  it('should return 10 discount if there 1 items and quantity = 2', async () => {
    items = {
      Blouse: {
        quantity: 3,
      },
    };
    twoItemsOffer = new TwoItemsOffer(projects, items);
    await twoItemsOffer.getAllDiscounts(100);
    assert.strictEqual(discounts.getAllDiscounts(), 10);
  });
});
