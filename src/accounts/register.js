// import {genSalt, hash} from "bcryptjs"
import bcrypt from 'bcryptjs'
const {genSalt, hash} = bcrypt



export async function registerUser (email, password){
const {user} = await import("../user/user.js")

// Generate salt
const salt = await genSalt(10) // 10 is how long we want the salt to be


// Hash with salt
const hashedPassword = await hash(password, salt)


// Store in database
const result = await user.insertOne({
    email:{
        address: email,
        verified: false
    },
    password: hashedPassword
})



// Return user from database
    return result.insertedId

}