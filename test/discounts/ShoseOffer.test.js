const assert = require('assert');
const sinon = require('sinon');
const ShoseOffer = require('../../utils/ShoseOffer');
const Discounts = require('../../utils/Discounts');

describe('ShoseOffer', () => {
  let projects;
  let items;
  let shoseOffer;
  let discounts;

  beforeEach(() => {
    projects = {
      find: sinon.stub().returns({
        toArray: sinon.stub().returns([
          {
            Item: 'Shoes',
            price: 100,
          },
        ]),
      }),
    };

    items = {
      Shoes: {
        quantity: 1,
      },
    };

    shoseOffer = new ShoseOffer(projects, items);
    discounts = new Discounts(projects, items);
  });

  afterEach(() => {
    sinon.restore;
    Discounts.clear();
  });

  it('should return 0 discount if quantity 0 ', async () => {
    items = {
      Shoes: {
        quantity: 0,
      },
    };

    shoseOffer = new ShoseOffer(projects, items);
    await shoseOffer.getAllDiscounts();
    assert.equal(discounts.getAllDiscounts(), 0);
  });

  it('should return 10 discount if quantity 1', async () => {
    items = {
      Shoes: {
        quantity: 1,
      },
    };

    shoseOffer = new ShoseOffer(projects, items);
    await shoseOffer.getAllDiscounts();
    assert.equal(discounts.getAllDiscounts(), 10);
  });

  it('should return 100 discount if quantity 10', async () => {
    items = {
      Shoes: {
        quantity: 10,
      },
    };

    shoseOffer = new ShoseOffer(projects, items);
    await shoseOffer.getAllDiscounts();
    assert.equal(discounts.getAllDiscounts(), 100);
  });
  it('should return 0 discount if quantity -1', async () => {
    items = {
      Shoes: {
        quantity: -1,
      },
    };

    shoseOffer = new ShoseOffer(projects, items);
    await shoseOffer.getAllDiscounts();
    assert.equal(discounts.getAllDiscounts(), 0);
  });
});
