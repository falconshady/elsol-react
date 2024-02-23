export const GetStores = async () => {
    const response = await fetch(`${process.env.API_URL}/stores`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}

export const CreateStore = async (values) => {
    const response = await fetch(`${process.env.API_URL}/store`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const GetStoreById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/store/${id}`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}

export const UpdateStore = async (id, values) => {
    const response = await fetch(`${process.env.API_URL}/store/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const DeleteStore = async (id, values) => {
    const response = await fetch(`${process.env.API_URL}/store/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    return await response.json();
}

export const GetStoreProducts = async (id) => {
    const response = await fetch(`${process.env.API_URL}/find/store/${id}/products`, {
        headers: {'Accept': 'application/json'}
    })
    return await response.json();
}