import "./env.js" // Loads and run the file immediately
import {fastify} from "fastify"
import fastifyStatic from "fastify-static";
import path from 'path'
import {fileURLToPath} from 'url'
import {connectDb} from "./db.js";
import {registerUser} from "./accounts/register.js"

// ESM specific features
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = fastify()


async function startApp() {
    try {
        app.register(fastifyStatic, {
            root: path.join(__dirname, "public")
        })

        app.get("/", {}, (request, reply) => {
            reply.send({
                data: "Hello world"
            })
        })


        app.post("/api/register", {}, async (request, reply) => {
            try{
                await registerUser(request.body.email, request.body.password)
            } catch (e) {
                console.error(e)
            }
        })

        await app.listen(3000)
        console.log("Server running on port 3000")
    } catch (e) {
        console.error(e)
    }
}

connectDb().then(()=>{
    startApp()
})
