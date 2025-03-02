import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles/CryptoDashboard.module.css";
import { fetchCryptoHistory, fetchCryptoPrices } from "./api/api";
import Table from "./components/table";
import Modal from "./components/modal";


export default function CryptoDashboard() {
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [interval, setInterval] = useState("d1"); // Default interval is 'd1' (1 day)
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000,
    staleTime: 60000,
  });

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["cryptoHistory", selectedCoin, interval],
    queryFn: () => (selectedCoin ? fetchCryptoHistory(selectedCoin, interval) : null),
    enabled: !!selectedCoin,
  });

  const chartData = historyData
  ? {
      options: {
        chart: {
          type: "line",
          toolbar: { show: false },
          background: "#1f2937",
        },
        theme: {
          mode: "dark",
        },
        xaxis: {
          categories: historyData.map((entry) => new Date(entry.time).toLocaleDateString()),
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff", 
            },
          },
        },
        grid: {
          borderColor: "#374151",
        },
        colors: ["#00E396"], 
      },
      series: [
        {
          name: "Price (USD)",
          data: historyData.map((entry) => entry.priceUsd),
        },
      ],
    }
  : null;


  const openModal = (coin) => {
    setSelectedCoin(coin.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crypto Price Tracker</h1>
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          className={styles.input}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button
          onClick={refetch}
          className={styles.button}
        >
          Refresh Prices
        </button>
        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">Failed to load data. Try again.</p>
        ) : (
          <div className="table">
            {/* Table */}
            <Table data={data} search={search} openModal={openModal} />
          </div>
        )}
      </div>
    </div>
    {/* Modal */}
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      selectedCoin={selectedCoin}
      interval={interval}
      setInterval={setInterval}
      isHistoryLoading={isHistoryLoading}
      chartData={chartData}
    />
    </>
  );
}