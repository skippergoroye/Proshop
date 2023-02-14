import axios from 'axios';


const Base_URL = process.env.REACT_APP_BASE_URL


const getAllProducts = async(token) => {
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



const getSingleProducts = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${Base_URL}/api/products/${id}`, config)
    console.log(response)
    console.log(response.data.products)
    return response.data;
} 



const productService = {
    getAllProducts,
    getSingleProducts
}

export default productService;