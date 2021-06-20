import { useState } from "react";
import { Form, Card } from "react-bootstrap";
import Amount from "./Amount";
import CurrencyUnit from "./CurrencyUnit";
import Result from "./Result";
import SubmitButton from "./SubmitButton";

function DataInput() {
    const [amount, setAmount] = useState("");
    const [fromCode, setFromCode] = useState("USD");
    const [toCode, setToCode] = useState("GBP");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangeCode = (type) => (value) => {
        type === "from_code" ? setFromCode(value) : setToCode(value);
    };

    return loading ? (
        <div className="classic-4 center-xy"></div>
    ) : (
        <Form className="form">
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Amount amount={amount} handleChangeAmount={setAmount} />
                    <CurrencyUnit
                        title="From"
                        code={fromCode}
                        handleChangeCode={handleChangeCode("from_code")}
                        setResult={setResult}
                    />
                    <CurrencyUnit
                        title="To"
                        code={toCode}
                        handleChangeCode={handleChangeCode("to_code")}
                        setResult={setResult}
                    />
                    <Result fromCode={fromCode} toCode={toCode} amount={amount} result={result} />
                    <SubmitButton
                        fromCode={fromCode}
                        toCode={toCode}
                        amount={amount}
                        handleExChange={setResult}
                        setLoading={setLoading}
                    />
                </Card.Body>
            </Card>
        </Form>
    );
}

export default DataInput;
