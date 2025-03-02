# Project Setup Guide

To run both the web and mobile apps, follow the instructions below:

## Running the Web App

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pr4neeth/crypto-price-tracker.git
   cd web-app

2. **Install dependencies:**
   ```bash
   npm install

3. **Start the development server:**
   ```bash
   npm run dev



---

## **API Integration Details:**

### API Integration

The project integrates with the CoinCap API to fetch real-time cryptocurrency prices and historical data.

### Fetching Crypto Prices

The `fetchCryptoPrices` function is used to fetch the current prices of all cryptocurrencies.

```js 
export const fetchCryptoPrices = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets");
  if (!response.ok) throw new Error("Failed to fetch crypto prices");
  const data = await response.json();
  return data.data;
};

```

This data is fetched every 30 seconds using React Query's refetchInterval.

### Fetching Crypto History
Historical data for a selected cryptocurrency is fetched using the `fetchCryptoHistory` function:

```js
export const fetchCryptoHistory = async (coin, interval) => {
  const response = await fetch(
    `https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}`
  );
  if (!response.ok) throw new Error("Failed to fetch price history");
  const data = await response.json();
  return data.data;
};
```


## **State Management Explanation (React Query):**

### State Management with React Query

In this project, **React Query** is used to manage both server-side data fetching and local state management.

### Why React Query?

React Query simplifies the management of server-side state by handling the fetching, caching, synchronization, and updating of data. It reduces the need for complex state management libraries and provides several key benefits:

- **Data Fetching**: React Query helps fetch data asynchronously from the API without writing additional code for data fetching logic.
- **Caching**: Data fetched from APIs is cached and doesn’t need to be fetched again until it expires or the data is refetched at regular intervals.
- **Background Syncing**: React Query ensures that data is refetched periodically, keeping the app up to date without requiring the user to refresh the page.
- **Error Handling**: It provides built-in methods to handle errors if the API fails.
- **Automatic Re-fetching**: Using `refetchInterval`, React Query automatically re-fetches data at a set interval (30 seconds in this case) to keep the information current.

For example, the following `useQuery` hook fetches the crypto prices and handles the refetching:

```js
const { data, refetch, isLoading, error } = useQuery({
  queryKey: ["cryptoPrices"],
  queryFn: fetchCryptoPrices,
  refetchInterval: 30000, // Refetch every 30 seconds
});
```
---

## **Challenges & Solutions:**


### 1. Handling Real-Time Data Updates

#### Challenge:
We needed to ensure that the cryptocurrency prices were updated in real-time without reloading the page.

#### Solution:
We used **React Query** to automatically refetch the crypto prices every 30 seconds using the `refetchInterval` option. This allowed us to display up-to-date information without any manual intervention.

### 2. Dealing with Server-Side Rendering (SSR) Issues

#### Challenge:
The project includes components that depend on the `window` object (e.g., charts), which caused issues during SSR.

#### Solution:
We used **dynamic imports** with `{ ssr: false }` to ensure these components are only rendered client-side:

```js
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
```


