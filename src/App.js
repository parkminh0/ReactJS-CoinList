import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [usd, setUsd] = useState(1);
  const moneyFn = (event) => setUsd(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then(json => {
      setCoins(json)
      setLoading(false);
    });
  }, []);
  return(
    <div>
      <h1>{loading ? "" : `${coins.length} Coins Price List`}</h1>
      {loading ? <strong>Loading...</strong> 
        : 
          <select>
            {coins.map((items) => (
              <option>
                {items.name} // {items.symbol} // {items.quotes.USD.price.toFixed(2)} USD
              </option>
            ))}
          </select>}
      <hr/>
      <h1>{loading ? "": "Coins with my money"}</h1>
      <label htmlFor="money">
        <input value = {usd} onChange={moneyFn} id="money" type="number" placeholder="How much do you have?"/> USD
      </label>
      {loading ? <strong>Loading...</strong> 
        : 
          <select>
            {coins.map((items) => (
              <option>
                {items.name} // {items.symbol} // {(usd/items.quotes.USD.price).toFixed(2)} coins
              </option>
            ))}
          </select>}
    </div>
  );
}

export default App;
