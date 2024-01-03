import request from "supertest"
import faker from "faker"
import * as http from "http"
import { createServer } from "../../common/testServer"

let server: http.Server

beforeAll(async () => {
    server = (await createServer()).listen()
})

afterAll(async () => {
    await server.close()
})

const info = {
    user: faker.internet.email(),
    name: "business man",
    image: faker.internet.url(),
    owner: faker.internet.email()
}

describe("add", () => {
    it("should return 401 without authorization header", async () => {
        await request(server).post(`/api/create-blog/1/5`).send(info).expect(401)
    }, 30000)
})
