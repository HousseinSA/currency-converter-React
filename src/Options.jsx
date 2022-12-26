import React from "react"

export default function Options({
  currency,
  selecetedCorrency,
  handelChange,
  amount,
  handelAmount,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input">
        <input type="number" onChange={handelAmount} value={amount} />
        <select value={selecetedCorrency} onChange={handelChange}>
          {currency.map((curr, index) => {
            return (
              <option key={index} value={curr.code}>
                {curr.description}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}
