// Fetch current crypto prices
export const fetchCryptoPrices = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets");
  if (!response.ok) throw new Error("Failed to fetch crypto prices");
  const data = await response.json();
  return data.data;
};

// Fetch historical data for a selected coin
export const fetchCryptoHistory = async (coin, interval) => {
  const response = await fetch(
    `https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}`
  );
  if (!response.ok) throw new Error("Failed to fetch price history");
  const data = await response.json();
  return data.data;
};
