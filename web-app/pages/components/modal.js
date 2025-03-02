// components/Modal.js
import styles from "../../styles/CryptoDashboard.module.css";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Modal = ({ isModalOpen, closeModal, selectedCoin, interval, setInterval, isHistoryLoading, chartData }) => {
  return (
    isModalOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>{selectedCoin.toUpperCase()}</h2>
            <button onClick={closeModal} className={styles.buttonClose}>
              Close
            </button>
          </div>
          <select
            className={styles.select}
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <option value="m1">Last 1 Minute</option>
            <option value="m5">Last 5 Minutes</option>
            <option value="m15">Last 15 Minutes</option>
            <option value="m30">Last 30 Minutes</option>
            <option value="h1">Last 1 Hour</option>
            <option value="h2">Last 2 Hours</option>
            <option value="h6">Last 6 Hours</option>
            <option value="h12">Last 12 Hours</option>
            <option value="d1">Last 24 Hours</option>
          </select>
          {isHistoryLoading ? (
            <p className="text-center text-gray-400">Loading chart...</p>
          ) : (
            <div className={styles.chartContainer}>
              <Chart
                className={styles.chart}
                options={chartData.options}
                series={chartData.series}
                type="line"
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
