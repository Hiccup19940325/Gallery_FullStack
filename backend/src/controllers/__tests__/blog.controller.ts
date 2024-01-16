import request from "supertest"
import faker from "faker"
import * as http from "http"
import { createServer } from "../../common/testServer"
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

let server: http.Server
let token: string
let id: string

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const info = {
    name: "test name",
    image: 'https://loremflickr.com/cache/resized/65535_52551195881_287edc4796_b_640_360_nofilter.jpg',
    owner: faker.internet.email()
}

const updateInfo = {
    name: "updated name",
    image: info.image,
    owner: info.owner
}

const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164"),
}


describe("read", () => {
    it("should return 200 without authorization header", async () => {
        await request(server).get(`/api/blogs/1/5`).expect(200)
    }, 100_000)
})

describe("add", () => {
    it("should return 401 without authorization header", async () => {
        await request(server).post(`/api/create-blog/1/5`).send(info).expect(401)
    }, 100_000)

    it("should return 200 with authorization header ", async () => {
        const userInfo = await createUserWithEmailAndPassword(auth, fakeUser.email, fakeUser.password);
        const { user } = userInfo;
        const idTokenResult = await user.getIdTokenResult();
        token = idTokenResult.token
        const result = await request(server).post("/api/create-blog/1/5").set("authtoken", token).send(info)
        id = result.body[0]._id;
    }, 100_000)
})

describe("update", () => {
    it("should return 401 without authorization header", async () => {
        await request(server).put(`/api/blog/${id}/true`).send(updateInfo).expect(401)
    }, 100_000)

    it("should return 200 with authorization header", async () => {
        await request(server).put(`/api/blog/${id}/true`).set("authtoken", token).send(updateInfo).expect(200)
    }, 100_000)
})

describe("remove", () => {
    it("should return 401 without authorization header", async () => {
        await request(server).post(`/api/blog/${id}`).expect(401)
    }, 100_000)

    it("should return 200 with authorization header", async () => {
        await request(server).post(`/api/blog/${id}`).set("authtoken", token).expect(200)
    }, 100_000)
})