export const GetProducts = async () => {
    const response = await fetch(`${process.env.API_URL}/products`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    return await response.json();
}