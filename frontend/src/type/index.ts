export interface ImageData {
    public_id: string
    url: string
}

export interface CreateArgs {
    authtoken: string
    name: string
    image: string
    owner: string
}
export interface Album {
    _id: string
    name: string
    image: {
        public_id: string
        url: string
    }
    owner: string
    createdAt: string
    updatedAt: string
}
export interface Error {
    response: string
    message: string
}
