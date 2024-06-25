function exchangeCurrency(card, currencyValue) {
  const exchangedCard = { ...card };

  Object.keys(exchangedCard).forEach((key) => {
    if (typeof exchangedCard[key] === 'string') {
      exchangedCard[key] = (
        parseFloat(exchangedCard[key]) * currencyValue
      ).toFixed(2);
    } else if (Array.isArray(exchangedCard[key])) {
      exchangedCard[key] = exchangedCard[key].map((discount) => {
        const [description, value] = discount.split(': ');
        const exchangedValue = (parseFloat(value) * currencyValue).toFixed(2);
        return `${description}: ${exchangedValue}`;
      });
    }
  });

  return exchangedCard;
}

module.exports = exchangeCurrency;
