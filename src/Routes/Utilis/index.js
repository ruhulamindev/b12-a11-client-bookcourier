import axios from "axios"

// save or update user in db
export const saveOrUpdateUser = async(userData) =>{
    const {data} = await axios.post(`https://b12-a11-server-bookcourier.vercel.app//user`,
        userData
    )
    return data
}