import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";

function CurrencyUnit(props) {
    const { countries, title, code, handleChangeCode } = props;
    const [countryCode, setCountryCode] = useState(code);

    const handleChangeCurrency = (e) => {
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
