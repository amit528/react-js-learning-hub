import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"

function Product() {
    return(
        <FormComponent 
            inputDetails={inputDetails.product}
        />
    )
}

export default Product;