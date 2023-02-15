import axios from 'axios';

const Base_URL = process.env.REACT_APP_BASE_URL


const addToCart = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${Base_URL}/api/products/${id}`, config)
    // console.log(response)
    // console.log(response.data)
    return response.data;
} 



const cartService = {
    addToCart,
}

export default cartService;