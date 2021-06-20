import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";

function CurrencyUnit(props) {
    const { title, code, handleChangeCode, setResult } = props;
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState(code);

    useEffect(() => {
        axios
            .get("https://api.frankfurter.app/currencies")
            .then((res) => {
                let newCountries = [];
                if (res.data.length !== 0) {
                    for (let item in res.data) {
                        newCountries.push({
                            name: res.data[item],
                            code: item,
                        });
                    }
                } else {
                    newCountries = [];
                }
                setCountries(newCountries);
            })
            .catch((err) => {
                setCountries([]);
            });
    }, []);

    const handleChangeCurrency = (e) => {
        setResult("");
        handleChangeCode(e.target.value);
        setCountryCode(e.target.value);
    };

    return (
        <Form.Group controlId="formBasicCurrencyUnit">
            <Row>
                <Form.Label style={{ marginLeft: 15 }}>{title}</Form.Label>
            </Row>
            <Row>
                <Col xs="2" md="2">
                    <ReactCountryFlag
                        style={{
                            width: "2.5em",
                            height: "2.5em",
                        }}
                        svg
                        countryCode={countryCode?.slice(0, 2) || ""}
                    />
                </Col>
                <Col>
                    <Form.Control as="select" onChange={handleChangeCurrency}>
                        {countries.map((item) => (
                            <option key={item.code} value={item.code} selected={item.code === countryCode}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Row>
        </Form.Group>
    );
}

export default CurrencyUnit;
