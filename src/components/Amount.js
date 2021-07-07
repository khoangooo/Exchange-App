import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function Amount(props) {
  const { setResult, rate, fromCode, toCode, amount, setAmount } = props;

  useEffect(() => {
    let fromValueBaseEUR = Object.keys(rate).length ? +rate[fromCode] : 0;
    let toValueBaseEUR = Object.keys(rate).length ? +rate[toCode] : 0;
    setResult(((amount ? +amount : 0) * (toValueBaseEUR / fromValueBaseEUR)).toFixed(5));
  }, [fromCode, amount, toCode]);

  return (
    <div>
      <Form.Group controlId="formBasicAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
    </div>
  );
}

export default Amount;
