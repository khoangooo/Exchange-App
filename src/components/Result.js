import { InputGroup, FormControl } from "react-bootstrap";

function Result(props) {
    const { fromCode, toCode, amount, result } = props;
    const str = result ? `${amount} ${fromCode} = ${result} ${toCode}` : "";
    return (
        <InputGroup size="sm" className="mb-3">
            <FormControl
                placeholder="Display Result"
                readOnly
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={str}
            />
        </InputGroup>
    );
}

export default Result;
