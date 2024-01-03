import faker from "faker"
import * as http from "http"
import { createServer } from "../../common/testServer"
import { createAlbum, readAlbum, updateAlbum, removeAlbum } from "../blog.service"

let server: http.Server
let id: string

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const info = {
    name: "test name",
    image: {
        public_id: Date.now().toLocaleString(),
        url: 'https://loremflickr.com/cache/resized/65535_52551195881_287edc4796_b_640_360_nofilter.jpg'
    },
    owner: faker.internet.email()
}

const updateInfo = {
    name: "updated name",
    image: info.image,
    owner: info.owner
}


describe("create Album", () => {
    it("should return true with valid info", async () => {
        const newAlbum = await createAlbum(info, 1, 5);
        expect(newAlbum).not.toBeNull();
        id = newAlbum ? newAlbum[0]._id.toString() : ""
    }, 100_000)
})

describe("read Album", () => {
    it("should return true with valid info", async () => {
        const newAlbum = await readAlbum(1, 5);
        expect(newAlbum).not.toBeNull()
    }, 100_000)
})

describe("update Album", () => {
    it("should return true with valid info", async () => {
        const updatedAlbum = await updateAlbum("true", id, updateInfo);
        expect(updatedAlbum).not.toBeNull()
    }, 100_000)
})

describe("remove Album", () => {
    it("should return true with valid info", async () => {
        const deletedAlbum = await removeAlbum(id);
        expect(deletedAlbum).not.toBeNull()
    }, 100_000)
})

