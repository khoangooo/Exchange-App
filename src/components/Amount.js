import { useState } from "react";
import { Form } from "react-bootstrap";

function Amount(props) {
    const [amount, setAmount] = useState(props.amount);
    const handleChangeAmount = (e) => {
        setAmount(e.target.value);
        props.handleChangeAmount(e.target.value);
    };
    return (
        <div>
            <Form.Group controlId="formBasicAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" placeholder="Enter amount" value={amount} onChange={handleChangeAmount} />
            </Form.Group>
        </div>
    );
}

export default Amount;
