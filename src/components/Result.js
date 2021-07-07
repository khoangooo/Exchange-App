import {useState, useEffect} from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function Result(props) {

    const { fromCode, toCode, amount, result } = props;
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(+result !== 0 ? `${amount || 0} ${fromCode} = ${result} ${toCode}` : "")
    }, [fromCode, toCode, amount, result])

    return (
        <InputGroup size="sm" className="mb-3">
            <FormControl
                placeholder="Display Result"
                readOnly
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={value}
            />
        </InputGroup>
    );
}

export default Result;
