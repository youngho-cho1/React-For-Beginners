import { useEffect, useState } from "react";

function App() {
  // Todo 1. : USD -> BTC
  // TOdo 2. : input 값으로 얼만큼 BTC로 줄 수 있는지 알려주기.
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState("Please Enter Your Money");
  const [curCoin, setCurCoin] = useState([]);
  const [curBTC, setCurBTC] = useState();
  const onChange = (event) => {
    // input onChange 함수
    setMyMoney(event.target.value);
  };
  const onSelect = (event) => {
    const coinName = coins[event.target.selectedIndex -1].name;
    const price = coins[event.target.selectedIndex -1].quotes.USD.price;
    const symbol = coins[event.target.selectedIndex -1].symbol;
    setCurCoin((currentArray) => [coinName, price, symbol]);
  };
  useEffect(() =>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
      setCurBTC(json[0].quotes.USD.price);
    });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length}개)`}</h1>
      <div>
        {loading ? null : (
          <input
            value={myMoney}
            onChange={onChange}
            type="number"
            placeholder="금액 입력 $(달러)"
          />
        )}
      </div>
      <div> 
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <form>
            <select onChange={onSelect}>
              <option>Select Coin!</option>
              {coins.map((coin) => (
                <option key={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
            <li key="coinName">Coin : {curCoin[0]}</li>
            <li key="myMoney">
              My Budget :{" "}
              {myMoney === "Please Enter Your Money" ? myMoney : `$${myMoney}`}
            </li>
            <li key="usd">
              USD PRICE(1{curCoin[2]}) : ${curCoin[1]}
            </li>
            <li key="btc">
              BTC PRICE(1{curCoin[2]}) : {curCoin[1] / curBTC}BTC
            </li>
            <li key="BTCAmount">My BTC Budget : {myMoney / curBTC}BTC</li>
            <li key="selectCoinAmount">
              I Can Buy : {myMoney / curCoin[1]} {curCoin[0]}
            </li>
          </form>
        )}   
      </div>
    </div>
  );
}

export default App;
  
