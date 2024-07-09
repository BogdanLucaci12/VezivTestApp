import { Button } from "../buttons/button.styles"
import { Input, InputLabelContainer, Label } from "./input.styles"

const InputForm = ({ description, text, onClick, disabled }) => {
    
    return (
        <InputLabelContainer>
                <Label>{description}</Label>
                <Input
                    onChange={text}
                />
                <Button 
                onClick={onClick}
                disabled={disabled}
                >
                    Submit
                </Button>
        </InputLabelContainer>
    )
}
export default InputForm