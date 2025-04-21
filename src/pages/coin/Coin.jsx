import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

const {coinId} = useParams();
const [coinData, setCoinData] = useState();
const [historicalData, setHistoricalData] = useState();
const [loading, setLoading] = useState(true);
const{currency} = useContext(CoinContext)


useEffect(() => {
  const fetchCoinData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error('Failed to fetch coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  

const fetchHistoricalData = async () => {
  setLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to fetch coin data:', error);
    } finally {
      setLoading(false);
    }
  };

fetchCoinData();
  // fetchHistoricalData();
}, [coinId, currency]);


if (loading) {
  return (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  );
}


return (
  <div className="coin">
    <img className="coin-img" src={coinData?.image?.large} alt={coinData?.name} />
    <div className="coin-name">
      <p><b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b></p>
    </div>
    <div className="coin-chart">
      <LineChart historicalData = {historicalData}/>
    </div>
  </div>
);

};

export default Coin