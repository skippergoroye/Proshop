import axios from 'axios'

const Base_URL = process.env.REACT_APP_BASE_URL


// Login User
const login = async(userData) => {
    const response = await axios.post(`${Base_URL}/api/users/login`, userData)
    if(response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data))
    }
    return response.data
}




const authService = {
    login,
}


export default authService