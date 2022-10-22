const formatNumber = (q) => {
  return q.toLocaleString('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
export const columns = [
  {
    title: 'Loại Phòng',
    dataKey: 'roomType',
    width: 200,
  },
  {
    title: 'Mức Giá Theo 1 Tháng',
    dataKey: 'price1Month',
    width: 200,
  },
  {
    title: 'Mức Giá Theo 6 Tháng',
    dataKey: 'price6Months',
    width: 200,
  },
  {
    title: 'Mức Giá Theo 12 Tháng',
    dataKey: 'price12Months',
    width: 200,
  },
];
export const rows = [
  {
    id: 1,
    roomType: 'Phòng 8',
    price1Month: formatNumber(100000),
    price6Months: formatNumber(600000),
    price12Months: formatNumber(1200000),
  },
  {
    id: 2,
    roomType: 'Phòng 6',
    price1Month: formatNumber(150000),
    price6Months: formatNumber(900000),
    price12Months: formatNumber(1800000),
  },
  {
    id: 3,
    roomType: 'Phòng 4',
    price1Month: formatNumber(200000),
    price6Months: formatNumber(1200000),
    price12Months: formatNumber(2400000),
  },
  {
    id: 4,
    roomType: 'Phòng Dịch Vụ',
    price1Month: formatNumber(400000),
    price6Months: formatNumber(2400000),
    price12Months: formatNumber(4800000),
  },
];
