import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"
import { useState } from "react";
import { initial } from "../data/InitialValues";

function Product() {
    const [entity, setEntity] = useState(initial("product"))
    return(
        <>
            <FormComponent 
                inputDetails={inputDetails.product}
                entity = {entity}
            />
        </>
    )
}

export default Product;