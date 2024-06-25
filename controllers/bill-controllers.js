const projectsCollection = require('../db/projects-db');
const BillCart = require('../utils/BillCart');
const Discounts = require('../utils/Discounts');
const ShoseOffer = require('../utils/ShoseOffer');
const JacketOffer = require('../utils/JacketOffer');
const TwoItemsOffer = require('../utils/TwoItemsOffer');
const ShippingCost = require('../utils/ShippingCost');
const VAT = require('../utils/VAT');
const Subtotal = require('../utils/Subtotal');
const getCrrencyRate = require('../utils/currency');
const exchangeCurrency = require('../utils/exchangeCurrency');

const createBill = async (req, res) => {
  const { items, currency } = req.body;
  const projects = await projectsCollection(req.app.locals.db);
  let card = {};
  let currencyValue = 1;

  const subtotal = new Subtotal(projects, items);
  const shippingCost = new ShippingCost(projects, items);
  const vat = new VAT(projects, items);

  await subtotal.getSubtotal();
  await shippingCost.getShippingCost();
  await vat.getVAT();

  card.Subtotal = BillCart.subtotal.toFixed(2);
  card.Shipping = BillCart.shipping.toFixed(2);
  card.VAT = BillCart.VAT.toFixed(2);

  const shoseOffer = new ShoseOffer(projects, items);
  const jacketOffer = new JacketOffer(projects, items);
  const twoItemsOffer = new TwoItemsOffer(projects, items);

  await jacketOffer.getAllDiscounts();
  await shoseOffer.getAllDiscounts();
  await twoItemsOffer.getAllDiscounts(BillCart.shipping);

  if (Discounts.discounts_format.length >= 1) {
    card.Discounts = Discounts.discounts_format;
  }

  const total = BillCart.total - Discounts.discount;
  card.Total = total.toFixed(2);

  BillCart.clear();
  Discounts.clear();

  if (currency) {
    currencyValue = await getCrrencyRate(currency);
    card = exchangeCurrency(card, currencyValue);
    card.Currency = currency;
  }
  res.send({ card });
};

module.exports = { createBill };
