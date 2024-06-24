const assert = require('assert');
const sinon = require('sinon');
const BillCart = require('../../utils/BillCart');
const VAT = require('../../utils/VAT');

describe('VAT', () => {
  let items;
  let vat;
  let mockProjects;
  let mockenv;

  beforeEach(() => {
    mockenv = sinon.stub(process, 'env').value({ VAT: 14 });
    mockProjects = {
      find: sinon.stub().returnsThis(),
      toArray: sinon.stub(),
    };

    items = {
      jacket: { quantity: 2 },
      pants: { quantity: 3 },
    };
    vat = new VAT(mockProjects, items);
  });

  afterEach(() => {
    sinon.restore();
    BillCart.clear();
  });

  it('should calculate VAT correctly', async () => {
    mockProjects.toArray.onCall(0).resolves([{ Item: 'Jacket', price: 100 }]);
    mockProjects.toArray.onCall(1).resolves([{ Item: 'pants', price: 30 }]);

    await vat.getVAT();

    assert.equal(BillCart.VAT, 40.6);
    assert.equal(BillCart.total, 40.6);
  });

  it('should calculate VAT correctly if get negative quantity', async () => {
    items = {
      jacket: { quantity: -9 },
      pants: { quantity: 3 },
    };
    vat = new VAT(mockProjects, items);

    mockProjects.toArray.onCall(0).resolves([{ Item: 'Jacket', price: 100 }]);
    mockProjects.toArray.onCall(1).resolves([{ Item: 'pants', price: 30 }]);

    await vat.getVAT();

    assert.equal(BillCart.VAT, 12.6);
    assert.equal(BillCart.total, 12.6);
  });
});
