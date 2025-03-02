// components/Table.js
import styles from "../../styles/CryptoDashboard.module.css";

const Table = ({ data, search, openModal }) => {
  return (
    <div className="table">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(0, 5) // Limit to first 5 coins
            .filter((coin) => coin.name.toLowerCase().includes(search))
            .map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-700 cursor-pointer">
                <td>{coin.name}</td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>{parseFloat(coin.priceUsd).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => openModal(coin)}
                    className={styles.button}
                  >
                    View Trend
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
