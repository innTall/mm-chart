export const fetchKlines = async (symbol, interval, limit) => {
  const baseUrl = 'https://api.bybit.com/v5/market/kline';
  const url = `${baseUrl}?category=linear&symbol=${symbol}&interval=${interval}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.retCode !== 0) {
      throw new Error(data.retMsg || 'Failed to fetch data');
    }

    return data.result.list.map((kline) => ({
      time: kline[0] / 1000,
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
    }))
    .sort((a, b) => a.time - b.time);
  } catch (error) {
    console.error('Error fetching kline data:', error);
    return [];
  }
};