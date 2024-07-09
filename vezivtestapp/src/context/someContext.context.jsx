import { createContext, useState } from "react";

export const SomeContext=createContext({
    inputValue:"",
    loading:false,
    offer:"",
})

export const SomeContextProvider=({children})=>{
const [inputValue, setInputValue] = useState("")
    const [loading, setLoading]=useState(false)
const [offer, setOffer] = useState("")
const value={inputValue, setInputValue, setLoading, loading, setOffer, offer}
return(
    < SomeContext.Provider value = { value }>{children}</SomeContext.Provider>
)
}