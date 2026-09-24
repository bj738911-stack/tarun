/**
 * Utility functions for currency formatting in Indian Rupees (₹ / INR).
 */
export const formatPrice = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatPriceWithDecimals = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  if (amount % 1 !== 0) {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
