import { Button } from "react-bootstrap";
import axios from "axios";

function SubmitButton(props) {
    const { fromCode, toCode, amount, handleExChange, setLoading } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const url = "https://api.frankfurter.app";
        axios
            .get(`${url}/latest?amount=${amount}&from=${fromCode}&to=${toCode}`)
            .then((res) => {
                handleExChange(res.data.rates[toCode]);
                setLoading(false);
            })
            .catch(() => {
                handleExChange("");
                setLoading(false);
            });
    };

    return (
        <Button variant="primary" type="submit" className="btn-block" onClick={handleSubmit}>
            Convert
        </Button>
    );
}

export default SubmitButton;
