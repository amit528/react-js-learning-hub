import FormComponent from "./commonComponents/Form";
import inputDetails from "../data/FormFields.json"

function Village() {
    return(
        <FormComponent 
            inputDetails={inputDetails.village}
        />
    )
}

export default Village;