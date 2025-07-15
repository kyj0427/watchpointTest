export const calculateDiscount = (originalPrice: number, discount: number, isPercentage: boolean = true) => {
    if (isPercentage) {
        return (originalPrice - (originalPrice * discount) / 100).toFixed(2);
    } else {
        return originalPrice - discount;
    }
};
