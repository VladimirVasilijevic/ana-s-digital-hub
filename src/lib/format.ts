export function formatPrice(price: { amount: number; currency: string }) {
  return `${new Intl.NumberFormat("sr-RS").format(price.amount)} ${price.currency}`;
}
