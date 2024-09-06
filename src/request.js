export const getAllMeals = async() => {
    
    const getAllMealsURL = 'http://localhost:3000/meals';
    const res = await fetch(getAllMealsURL)
    const data = await res.json()
    if (!res.ok) {
        throw new Error('Something went wrong')
    }
    return data
}

export const getGeoInfo = async() => {
    try {
        const response =  await fetch('https://ipapi.co/json/')
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err);
    }
};

export const placeOrder = async(order) => {
    const placeOrderURL = 'http://localhost:3000/orders';
    const res = await fetch(placeOrderURL, {
        method: 'POST',
        body: JSON.stringify({order}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error('Something went wrong')
    }
    return data

}