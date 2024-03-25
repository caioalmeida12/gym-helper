import request from "supertest"

const API_URL = "http://localhost:3000"

describe("GetExerciciosHonoController", () => {
    it("Should return 400 on empty response data", async () => {
        await request(API_URL)
            .get("/exercicios")
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })

    it("Should return 404 on not found at findById", async () => {
        await request(API_URL)
            .get("/exercicios/4376fe9b-63c8-40a3-809e-3c7990ff0b01")
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })

    it("Should return 200 on success", async () => {
        await request(API_URL)
            .get("/exercicios")
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "success")
                expect(res.body).toHaveProperty("data")
            })
    })
})