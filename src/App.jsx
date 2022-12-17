import "./index.css"
import { useEffect, useState } from "react"
import Options from "./Options"
import axios from "axios"

function App() {
  function handelSumbit(e) {
    e.preventDefault()
  }
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
      // getting the default the fist curruncy on array
      const toCurr = Object.keys(res.data.rates)[0]
      // set from to the base curruncy
      setFromCurrency(res.data.base)
      // the currency array list
      setCurrency([res.data.base, ...Object.keys(res.data.rates)])
      // the second currency input
      setTocurrency(toCurr)
      // the exchange rates amount
      setExchangeRate(res.data.rates[toCurrency])
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
        handelSumbit={handelSumbit}
        currency={currency}
        selecetedCorrency={fromcurrency}
        handelChange={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handelAmount={handelFromAmountChange}
      />
      <div id="equal">=</div>
      <Options
        handelSumbit={handelSumbit}
        currency={currency}
        selecetedCorrency={toCurrency}
        handelChange={(e) => setTocurrency(e.target.value)}
        amount={toAmount}
        handelAmount={handelToAmountChange}
      />
    </div>
  )
}
export default App
