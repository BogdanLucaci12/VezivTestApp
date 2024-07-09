import { Fragment, useContext } from "react";
import { HomePageContainer } from "./homepage.styles";
import UserInteraction from "./userInteraction/userInteraction.component";
import OutputOffer from "./backEndInteraction/backEndInteraction.component";
import { SomeContext } from "../../context/someContext.context";
import Spinner from 'react-bootstrap/Spinner';
const HomePage=()=>{
    const {loading, offer}=useContext(SomeContext)
    return(
        <Fragment>
            <HomePageContainer>
            <UserInteraction/>
            {
                    loading && <Spinner animation="grow" variant="dark" />
            }
            {
                offer.length>0 && <OutputOffer/>
            }
            </HomePageContainer>
        </Fragment>
    )
}
export default HomePage;