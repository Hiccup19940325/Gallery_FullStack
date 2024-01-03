import faker from "faker"
import * as http from "http"
import { createServer } from "../../common/testServer"
import { createOrUpdateHandler, currentUserHandler } from "../auth.service"

let server: http.Server

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const info = {
    email: faker.internet.email(),
}

describe("Create or Update", () => {
    it("should return true with valid user info", async () => {
        const newUser = await createOrUpdateHandler(info.email)

        expect(newUser).not.toBeNull()
    }, 100_000)
})

describe("Current User", () => {
    it("should return true with valid user info", async () => {
        const currentUser = await currentUserHandler(info.email)

        expect(currentUser).not.toBeNull()
    }, 100_000)
})