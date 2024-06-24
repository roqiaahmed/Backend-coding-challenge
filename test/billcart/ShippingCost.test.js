const assert = require('assert');
const sinon = require('sinon');
const BillCart = require('../../utils/BillCart');
const ShippingCost = require('../../utils/ShippingCost');

describe('ShippingCost', () => {
  let items;
  let shippingCost;
  let mockProjects;
  let mocenv;

  beforeEach(() => {
    mockProjects = {
      find: sinon.stub().returnsThis(),
      toArray: sinon.stub(),
    };

    mocenv = sinon.stub(process, 'env').value({
      CN: 2,
      UK: 3,
      US: 2,
    });

    items = {
      jacket: { quantity: 2 },
      pants: { quantity: 3 },
    };
    shippingCost = new ShippingCost(mockProjects, items);
  });

  afterEach(() => {
    sinon.restore();
    BillCart.clear();
  });

  it('should calculate shipping cost correctly', async () => {
    mockProjects.toArray
      .onCall(0)
      .resolves([{ Item: 'Jacket', Country: 'CN', Weight: 0.5 }]);
    mockProjects.toArray
      .onCall(1)
      .resolves([{ Item: 'pants', Country: 'UK', Weight: 0.3 }]);

    await shippingCost.getShippingCost();

    assert.equal(BillCart.shipping, 47);
    assert.equal(BillCart.total, 47);
  });
  it('should calculate shipping cost correctly if get negative quantity', async () => {
    items = {
      jacket: { quantity: 2 },
      pants: { quantity: -3 },
    };
    shippingCost = new ShippingCost(mockProjects, items);
    mockProjects.toArray
      .onCall(0)
      .resolves([{ Item: 'Jacket', Country: 'CN', Weight: 0.5 }]);

    mockProjects.toArray
      .onCall(1)
      .resolves([{ Item: 'pants', Country: 'UK', Weight: 0.3 }]);

    await shippingCost.getShippingCost();

    assert.equal(BillCart.shipping, 20);
    assert.equal(BillCart.total, 20);
  });
});
