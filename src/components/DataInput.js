import { useState, useEffect, useRef } from "react";
import { Form, Card } from "react-bootstrap";
import Amount from "./Amount";
import CurrencyUnit from "./CurrencyUnit";
import Result from "./Result";
import axios from "axios";

const URL = "https://api.frankfurter.app";

function DataInput() {
  const [amount, setAmount] = useState("");
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("GBP");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState({});
  const [countries, setCountries] = useState([]);
  const mounted = useRef(false);

  useEffect(() => {
    setLoading(true);
    mounted.current = false;
    async function FirstRender() {
      let response = await Promise.all([getCountries(), getRates()]);
      setCountries(response[0]);
      setRate(response[1]);
      setLoading(false);
    }
    FirstRender();
    return () => (mounted.current = true);
  }, []);

  useEffect(() => {
    const getAnotherRate = async () => {
      let response = await getRates();
      setRate(response);
    };
    let intervalFunc = setInterval(() => getAnotherRate(), 1000 * 5 * 60);
    return () => clearInterval(intervalFunc);
  }, []);

  const getCountries = async () => {
    try {
      let response = await axios.get(`${URL}/currencies`);
      if (response.status) {
        let newCountries = [];
        for (let item in response.data) {
          newCountries.push({
            name: response.data[item],
            code: item,
          });
        }
        return newCountries;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  };

  const getRates = async () => {
    try {
      let response = await axios.get(`${URL}/latest`);
      if (response.status) {
        return response.data.rates;
      } else {
        return {};
      }
    } catch (err) {
      return {};
    }
  };

  const handleChangeCode = (type) => (value) => {
    type === "from_code" ? setFromCode(value) : setToCode(value);
  };

  return loading ? (
    <div className="classic-4 center-xy"></div>
  ) : (
    <Form className="form">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Amount
            fromCode={fromCode}
            toCode={toCode}
            amount={amount}
            setAmount={setAmount}
            setResult={setResult}
            rate={rate}
          />
          <CurrencyUnit
            countries={countries}
            title="From"
            code={fromCode}
            handleChangeCode={handleChangeCode("from_code")}
          />
          <CurrencyUnit countries={countries} title="To" code={toCode} handleChangeCode={handleChangeCode("to_code")} />
          <Result fromCode={fromCode} toCode={toCode} amount={amount} result={result} />
        </Card.Body>
      </Card>
    </Form>
  );
}

export default DataInput;
