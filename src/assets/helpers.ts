export const getPriceWithDiscount = (fullPrice: number, discount: number) => {
  return discount 
    ? Math.ceil(fullPrice * (100 - discount)) / 100
    : fullPrice;
};
