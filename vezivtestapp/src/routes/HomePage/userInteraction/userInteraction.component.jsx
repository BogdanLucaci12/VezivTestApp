import { Container } from "../../../component/containers/container.styles"
import InputForm from "../../../component/input/input.component";
import { SomeContext } from "../../../context/someContext.context";
import { useContext, useState } from "react"; 

const UserInteraction=()=>{
    const {  setLoading, loading, setOffer, offer }=useContext(SomeContext)
    const [inputValue, setInputValue]=useState("")
    const textInput = (e)=>{
        setInputValue(e.target.value)
    }
    const genereateOffer=async(e)=>{
        e.preventDefault()
        setLoading(true)
        setOffer("")
        const getOffer = async () => {
            try {
                const response = await fetch(`http://localhost:3000/generateOffer`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: inputValue }) // Uncomment and use if sending via request body for POST requests
                });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                var result = '';
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value, { stream: true });
                }
            } catch (err) {
                console.log( err);
            }
            finally {
                setOffer(result); 
                setLoading(false)
            }
        };
        await getOffer();
    }
    return(
        <div className="text-center">
        <Container>
            <div>Introduceti solicitarea dorita pentru a putea genera oferta </div>
            <InputForm
            text={textInput}
            onClick={genereateOffer}
            disabled={loading}
            />
        </Container>
        </div>
    )
}
export default UserInteraction;