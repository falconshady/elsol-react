export const AssignProductToStore = async (productId, storeId) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/association/products/${productId}/stores/${storeId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    const result = await response.json();
    console.log(result)
    return result
}