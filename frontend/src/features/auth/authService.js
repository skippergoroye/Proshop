import axios from 'axios'

const Base_URL = process.env.REACT_APP_BASE_URL


// Register User
const register = async(userData) => {
    const response = await axios.post(`${Base_URL}/api/users`, userData)
    if(response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data))
    }
    return response.data
}


// Login User
const login = async(userData) => {
    const response = await axios.post(`${Base_URL}/api/users/login`, userData)
    if(response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data))
    }
    return response.data
}


// Logout
const logout = async() => {
    localStorage.removeItem('userInfo')
}


// Logout user
// const logout = () => localStorage.removeItem('userInfo')




const authService = {
    login,
    logout,
    register
}


export default authService