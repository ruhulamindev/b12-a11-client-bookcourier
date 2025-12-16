import axios from "axios"

// save or update user in db
export const saveOrUpdateUser = async(userData) =>{
    const {data} = await axios.post(`http://localhost:3000/user`,
        userData
    )
    return data
}