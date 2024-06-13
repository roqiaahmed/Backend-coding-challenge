const projectsCollection = require('../db/projects-db');
const BillCart = require('../utils/billcart');
const Discounts = require('../utils/discounts');

const createBill = async (req, res) => {
  const body = req.body;
  const projects = await projectsCollection(req.app.locals.db);
  const card = {};
  const discounts = [];
  const tops = ['T-shirt', 'Blouse'];
  const jacket = {};
  let n_tops = 0;

  const promises = body.map(async (element) => {
    const item = await projects.find({ Item: element.item }).toArray();
    const quantity = element.quantity;
    const calculatItem = new BillCart(item, quantity);

    card.Subtotal = card.Subtotal
      ? card.Subtotal + calculatItem.getSubtotal()
      : calculatItem.getSubtotal();

    card.Shipping = card.Shipping
      ? card.Shipping + calculatItem.getShippingCost()
      : calculatItem.getShippingCost();

    card.VAT = card.VAT
      ? card.VAT + calculatItem.getVAT()
      : calculatItem.getVAT();

    if (item[0].Item === 'Shoes') {
      const ShoesDiscount = new Discounts(item, quantity);
      discounts.push(ShoesDiscount.getShoseOffer());
    }
    if (item[0].Item === 'Jacket') {
      jacket.item = item;
      jacket.quantity = quantity;
    }

    if (tops.includes(item[0].Item)) {
      n_tops += quantity;
    }
  });

  await Promise.all(promises)
    .then(async () => {
      if (Object.keys(jacket).length >= 1 && n_tops >= 2) {
        const jacketDiscount = new Discounts(jacket.item, jacket.quantity);
        discounts.push(jacketDiscount.getJacketsOffer(n_tops));
      }

      if (body.length >= 2 || body[0].quantity >= 2) {
        const discount = new Discounts(body[0].item, body[0].quantity);
        discounts.push(discount.getTwoItemsOffer(card.Shipping));
      }

      if (discounts.length >= 1) {
        card.Discounts = discounts;
      }
      if (Discounts.getAllDiscounts() > 0) {
        card.Total =
          Discounts.getAllDiscounts() > 0
            ? BillCart.getTotal() - Discounts.getAllDiscounts()
            : BillCart.getTotal();
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });

  res.send({ card });
};

module.exports = { createBill };
