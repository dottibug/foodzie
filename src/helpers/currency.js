const currencyOptions = {
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 2,
};

export function formatPrice(price) {
  return price.toLocaleString('en-CA', currencyOptions);
}
