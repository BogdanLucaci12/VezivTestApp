import { useContext } from "react"
import { Container } from "../../../component/containers/container.styles"
import { SomeContext } from "../../../context/someContext.context"

const OutputOffer=()=>{
    const {offer}=useContext(SomeContext)
    return (
        <Container>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {offer}
            </pre>
        </Container>
    )
}
export default OutputOffer