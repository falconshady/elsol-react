export const GetProducts = async () => {
    const response = await fetch(`${process.env.API_URL}/products`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}

export const CreateProduct = async (values) => {
    const response = await fetch(`${process.env.API_URL}/product`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}