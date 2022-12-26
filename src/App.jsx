import "./index.css"
import { useEffect, useState } from "react"
import Options from "./Options"
import axios from "axios"
// home function and and making and the making of all the componenets.
function App() {
  const [currency, setCurrency] = useState([])
  const [fromcurrency, setFromCurrency] = useState()
  const [toCurrency, setTocurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState()
  const [fromAmountChange, setFromAmountchange] = useState(true)
  // calculate the amount if the input amount changes
  let fromAmount, toAmount
  if (fromAmountChange) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = exchangeRate / amount
  }
  // first render fetch the api and changing states
  useEffect(() => {
    axios("https://api.exchangerate.host/latest").then((res) => {
      // set exchangerates value on default
      setExchangeRate(res.data.rates[toCurrency])
    })
  })
  useEffect(() => {
    axios("https://api.exchangerate.host/symbols").then((res) => {
      setCurrency(Object.values(res.data.symbols))
      setFromCurrency(Object.values(res.data.symbols)[0].code)
      setTocurrency(Object.values(res.data.symbols)[1].code)
    })
  }, [])
  // function for changing the amount and the changed input
  function handelFromAmountChange(e) {
    setAmount(e.target.value)
    setFromAmountchange(true)
  }
  function handelToAmountChange(e) {
    setAmount(e.target.value)
    setFromAmountchange(false)
  }
  // the to and from currency are changed and not null
  useEffect(() => {
    if (fromcurrency !== null && toCurrency !== null) {
      // changinig the exchange rate value
      axios(
        `https://api.exchangerate.host/latest?base=${fromcurrency}&symbols=${toCurrency}`
      ).then((res) => {
        setExchangeRate(res.data.rates[toCurrency])
      })
    }
  }, [toCurrency, fromcurrency])
  return (
    <div className="converter">
      <h1>corrency converter</h1>
      <Options
        currency={currency}
        selecetedCorrency={fromcurrency}
        handelChange={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handelAmount={handelFromAmountChange}
      />
      <div id="equal">=</div>
      <Options
        currency={currency}
        selecetedCorrency={toCurrency}
        handelChange={(e) => setTocurrency(e.target.value)}
        amount={toAmount}
        // handel to amount when changes 
        handelAmount={handelToAmountChange}
      />
    </div>
  )
}
export default App
