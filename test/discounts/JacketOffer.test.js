const assert = require('assert');
const sinon = require('sinon');
const JacketOffer = require('../../utils/JacketOffer');
const Discounts = require('../../utils/Discounts');

describe('JacketOffer', () => {
  let projects;
  let items;
  let jacketOffer;
  let discounts;

  beforeEach(() => {
    projects = {
      find: sinon.stub().returns({
        toArray: sinon.stub().resolves([
          {
            Item: 'Jacket',
            price: 100,
          },
        ]),
      }),
    };
    items = {
      Jacket: {
        quantity: 1,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    discounts = new Discounts(projects, items);
  });

  afterEach(() => {
    sinon.restore();
    Discounts.clear();
  });

  it('should return 0 discount if no tops', async () => {
    await jacketOffer.getAllDiscounts();
    assert.equal(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if no jacket', async () => {
    items = {
      Blouse: {
        quantity: 1,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if no jacket and no tops', async () => {
    items = {
      Blouse: {
        quantity: 0,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if jacket quantity is 0', async () => {
    items = {
      Jacket: {
        quantity: 0,
      },
      Blouse: {
        quantity: 3,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if jacket quantity is 0 and no tops', async () => {
    items = {
      Jacket: {
        quantity: 0,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 0 discount if jacket quantity is 0 and no jacket', async () => {
    items = {
      Blouse: {
        quantity: 1,
      },
      jacket: {
        quantity: 0,
      },
    };
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 0);
  });

  it('should return 50 discount if jacket quantity is 1 and 2 top', async () => {
    items = {
      Jacket: {
        quantity: 1,
      },
      Blouse: {
        quantity: 2,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 50);
  });

  it('should return 50 discount if jacket quantity is 1 and 3 top', async () => {
    items = {
      Jacket: {
        quantity: 1,
      },
      Blouse: {
        quantity: 3,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 50);
  });

  it('should return 100 discount if jacket quantity is 1 and 4 top', async () => {
    items = {
      Jacket: {
        quantity: 1,
      },
      Blouse: {
        quantity: 4,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 100);
  });

  it('should return 50 discount if jacket quantity is 4 and 3 top', async () => {
    items = {
      Jacket: {
        quantity: 4,
      },
      Blouse: {
        quantity: 3,
      },
    };
    jacketOffer = new JacketOffer(projects, items);
    await jacketOffer.getAllDiscounts();
    assert.strictEqual(discounts.getAllDiscounts(), 50);
  });
});
