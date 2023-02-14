import axios from 'axios';

const addToCart = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${Base_URL}/api/products`, config)
    // console.log(response)
    // console.log(response.data.products)
    return response.data.products;
} 