import React from "react"

export default function Options({
  handelSumbit,
  currency,
  selecetedCorrency,
  handelChange,
  amount,
  handelAmount,
}) {
  return (
    <form onSubmit={(e) => handelSumbit(e)}>
      <div className="input">
        <input type="number" onChange={handelAmount} value={amount} />
        <select value={selecetedCorrency} onChange={handelChange}>
          {currency.map((currency, index) => {
            return (
              <option key={index} value={currency}>
                {currency}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}
