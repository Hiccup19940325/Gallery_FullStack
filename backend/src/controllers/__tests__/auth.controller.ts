import request from "supertest"
import faker from "faker"
import * as http from "http"
import { createServer } from "../../common/testServer"
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

let server: http.Server

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const info = {
    email: faker.internet.email(),
    password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164"),
}

describe("Create or Update", () => {
    it("should return 200 with valid user info", async () => {
        const userInfo = await createUserWithEmailAndPassword(auth, info.email, info.password);
        const { user } = userInfo;
        const idTokenResult = await user.getIdTokenResult();
        await request(server).post("/api/create-or-update-user").set("authtoken", idTokenResult.token).expect(200)
    }, 100_000)

    it("should return 401 with Invalid user info", async () => {
        await request(server).post("/api/create-or-update-user").set("authtoken", "qazxswedcvfr").expect(401)
    }, 100_000)
})
