const projectsCollection = require('../db/projects-db');
const BillCart = require('../utils/BillCart');
const Discounts = require('../utils/Discounts');
const ShoseOffer = require('../utils/ShoseOffer');
const JacketOffer = require('../utils/JacketOffer');
const TwoItemsOffer = require('../utils/TwoItemsOffer');
const ShippingCost = require('../utils/ShippingCost');
const VAT = require('../utils/VAT');
const Subtotal = require('../utils/Subtotal');

const createBill = async (req, res) => {
  const body = req.body;
  const projects = await projectsCollection(req.app.locals.db);
  const card = {};

  const subtotal = new Subtotal(projects, body);
  const shippingCost = new ShippingCost(projects, body);
  const vat = new VAT(projects, body);

  await subtotal.getSubtotal();
  await shippingCost.getShippingCost();
  await vat.getVAT();

  card.Subtotal = BillCart.subtotal.toFixed(2);
  card.Shipping = BillCart.shipping.toFixed(2);
  card.VAT = BillCart.VAT.toFixed(2);

  const shoseOffer = new ShoseOffer(projects, body);
  const jacketOffer = new JacketOffer(projects, body);
  const twoItemsOffer = new TwoItemsOffer(projects, body);

  await jacketOffer.getAllDiscounts();
  await shoseOffer.getAllDiscounts();
  await twoItemsOffer.getAllDiscounts(BillCart.shipping);

  if (Discounts.discounts_format.length >= 1) {
    card.Discounts = Discounts.discounts_format;
  }
  card.Total = BillCart.total - Discounts.discount;
  BillCart.clear();
  Discounts.clear();
  res.send({ card });
};

module.exports = { createBill };
