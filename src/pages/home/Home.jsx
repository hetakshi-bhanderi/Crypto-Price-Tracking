import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from 'react-router-dom'


const Home = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data to use if context isn't working
    const sampleCoins = [
      {
        id: "bitcoin",
        market_cap_rank: 1,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        name: "Bitcoin",
        symbol: "btc",
        current_price: 84518,
        price_change_percentage_24h: 0.21,
        market_cap: 1677883813225
      },
      {
        id: "ethereum",
        market_cap_rank: 2,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        name: "Ethereum",
        symbol: "eth",
        current_price: 1588.17,
        price_change_percentage_24h: -0.28,
        market_cap: 191685498096
      },
      {
        id: "tether",
        market_cap_rank: 3,
        image: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        name: "Tether",
        symbol: "usdt",
        current_price: 1,
        price_change_percentage_24h: 0.01,
        market_cap: 144778434796
      },
      {
        id: "ripple",
        market_cap_rank: 4,
        image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
        name: "XRP",
        symbol: "xrp",
        current_price: 2.08,
        price_change_percentage_24h: -0.89,
        market_cap: 121113401302 
      },
      {
        id: "binancecoin",
        market_cap_rank: 5,
        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
        name: "BNB",
        symbol: "bnb",
        current_price: 589.53,
        price_change_percentage_24h: 0.63,
        market_cap: 86004968502
      },
      {
        id: "solana",
        market_cap_rank: 6,
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504747",
        name: "Solana",
        symbol: "sol",
        current_price: 134.56,
        price_change_percentage_24h: 1.02,
        market_cap: 69466554173
      },
      {
        id: "usd-coin",
        market_cap_rank: 7,
        image: "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        name: "USDC",
        symbol: "usdc",
        current_price: 1,
        price_change_percentage_24h: 0,
        market_cap: 60872395687
      },
      {
        id: "tron",
        market_cap_rank: 8,
        image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
        name: "TRON",
        symbol: "trx",
        current_price: 0.246,
        price_change_percentage_24h: 0.35,
        market_cap: 23335296583
      }
    ];

    setAllCoins(sampleCoins);
    setDisplayCoin(sampleCoins);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // if (!searchTerm.trim()) {
    //   // Reset to original sample data
    //   setDisplayCoin(displayCoin);
    //   return;
    // }
    
    const filtered = displayCoin.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayCoin(filtered);
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search crypto.." 
            value={searchTerm}
            list="coinlist"
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              if (value.trim() === "") {
                setDisplayCoin(allCoins);
              }
            }}
          />

            <datalist id="coinlist">
              {allCoins.map((item, index) => (<option key={index} value={item.name} />))}
            </datalist>


          <button className="submit" type="submit">Search</button>
        </form>
      </div>
      
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          displayCoin.map((coin) => (
            <Link to={`/coin/${coin.id}`} className="table-layout" key={coin.id}>
              <p>{coin.market_cap_rank}</p>
              <div className="coin-name">
                <img src={coin.image} alt={coin.name} style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                <p>{coin.name} - {coin.symbol}</p>
              </div>
              <p>${coin.current_price?.toLocaleString()}</p>
              <p className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
              {coin.price_change_percentage_24h?.toFixed(2)}
              </p>
              <p className="market-cap">${coin.market_cap?.toLocaleString()}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;