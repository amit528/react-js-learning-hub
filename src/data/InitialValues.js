export function initial(value) {
    const initialFunction = (value) => {
        switch (value) {
            case 'village':
                {
                    const village =
                    {
                        division : "",
                        district : "",
                        village : "",
                        description : ""
                    }
                    return village;
                }
            case 'product':
                {
                    const product =
                    {
                        productId : "",
                        component : "",
                        product : ""
                    }
                    return product;
                }
            default:
                return
        }
    }
    return initialFunction(value)
}