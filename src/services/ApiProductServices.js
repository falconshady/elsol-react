export const GetProducts = async () => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/products`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}

export const CreateProduct = async (values) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/product`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const GetProductById = async (id) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/product/${id}`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}

export const UpdateProduct = async (id, values) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/product/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const DeleteProduct = async (id, values) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/product/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const GetProductsInStores = async (id) => {
    const response = await fetch(`${process.env.GATSBY_API_URL}/find/product/${id}/stores`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}