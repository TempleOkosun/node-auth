import mongo from "mongodb"


const { MongoClient } = mongo
const url = process.env.MONGO_URL

export const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectDb(){
    try{
        await client.connect()
        await client.db("admin").command({ping:1})
        console.log(": Connection to DB successful")
    }catch(e){
        console.error(e)
        // If there is an error, close the connection to db
        await client.close()
    }
}