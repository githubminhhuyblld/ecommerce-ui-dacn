export const convertCurrency = (currency) => {
    return currency?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
