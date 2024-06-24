const assert = require('assert');
const sinon = require('sinon');
const BillCart = require('../../utils/BillCart');
const Subtotal = require('../../utils/Subtotal');

describe('Subtotal', () => {
  let items;
  let subtotal;
  let mockProjects;

  beforeEach(() => {
    mockProjects = {
      find: sinon.stub().returnsThis(),
      toArray: sinon.stub(),
    };

    items = {
      jacket: { quantity: 2 },
      pants: { quantity: 3 },
      socks: { quantity: 1 },
    };
    subtotal = new Subtotal(mockProjects, items);
  });

  afterEach(() => {
    sinon.restore();
    BillCart.clear();
  });

  it('should calculate subtotals correctly', async () => {
    mockProjects.toArray.onCall(0).resolves([{ Item: 'Jacket', price: 100 }]);
    mockProjects.toArray.onCall(1).resolves([{ Item: 'pants', price: 30 }]);
    mockProjects.toArray.onCall(2).resolves([{ Item: 'socks', price: 10 }]);

    await subtotal.getSubtotal();

    assert.equal(BillCart.subtotal, 300);
    assert.equal(BillCart.total, 300);
  });

  it('should calculate subtotals correctly if get negative quantity', async () => {
    items = {
      jacket: { quantity: -9 },
      pants: { quantity: 3 },
      socks: { quantity: 1 },
    };
    subtotal = new Subtotal(mockProjects, items);

    mockProjects.toArray.onCall(0).resolves([{ Item: 'Jacket', price: 100 }]);
    mockProjects.toArray.onCall(1).resolves([{ Item: 'pants', price: 30 }]);
    mockProjects.toArray.onCall(2).resolves([{ Item: 'socks', price: 10 }]);

    await subtotal.getSubtotal();

    assert.equal(BillCart.subtotal, 100);
    assert.equal(BillCart.total, 100);
  });
});
