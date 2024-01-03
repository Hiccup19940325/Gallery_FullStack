import Server from "./server"
import helmet from "helmet"
import cors from "cors"

const server = Server
const app = server.app

app.use(helmet())
app.use(cors())

server.run()
