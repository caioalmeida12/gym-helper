import request from "supertest"
import { connectDatabaseHelper } from "../lib/connectDatabaseHelper"
import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory"
import { ExercicioModel } from "@/infrastructure/database/models/ExercicioModel"
import { envLogger } from "@/infrastructure/libs/EnvFile"

envLogger('.env', {
    logging: false
})

describe("GetExerciciosHonoController", () => {
    let exercicio: ExercicioModel;

    beforeAll(async () => {
        await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE)
    });

    it("Should return 400 on empty response data", async () => {
        await request(`${process.env.API_URL}`)
            .get("/exercicios")
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })

    it("Should return 404 on not found at findById", async () => {
        await request(`${process.env.API_URL}`)
            .get("/exercicios/4376fe9b-63c8-40a3-809e-3c7990ff0b01")
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })

    it("Should return 200 on success", async () => {
        exercicio = await ExercicioModel.create({
            nome: "Abdominal supra",
            descanso_recomendado: 30,
            descricao: "Deite-se de barriga para cima, com as pernas flexionadas e os pés apoiados no chão. Coloque as mãos atrás da cabeça, com os cotovelos apontados para fora. Contraia o abdômen e suba o tronco, levando o peito em direção aos joelhos. Volte à posição inicial, sem relaxar a musculatura. Mantenha o abdômen contraído durante todo o movimento.",
            dificuldade: 1,
            regime_de_execucao_recomendado: "3x15",
            unidade_de_execucao: "REPETICOES",
        })

        const sut = await request(`${process.env.API_URL}`)
            .get("/exercicios")
            
        if (sut.ok) {
            expect(sut.body).toHaveProperty("status", "success")
            expect(sut.body).toHaveProperty("data")
            expect(sut.body.data.length).toBeGreaterThan(0)
        }
    })

    it("Should return 200 on findById success", async () => {
        const sut = await request(`${process.env.API_URL}`)
            .get(`/exercicios/${exercicio.id}`)

        if (sut.ok) {
            expect(sut.body).toHaveProperty("status", "success")
            expect(sut.body).toHaveProperty("data")
            expect(sut.body.data).toHaveProperty("id", exercicio.id)
            expect(sut.body.data).toHaveProperty("nome", exercicio.nome)
            expect(sut.body.data).toHaveProperty("descanso_recomendado", exercicio.descanso_recomendado)
            expect(sut.body.data).toHaveProperty("descricao", exercicio.descricao)
            expect(sut.body.data).toHaveProperty("dificuldade", exercicio.dificuldade)
            expect(sut.body.data).toHaveProperty("regime_de_execucao_recomendado", exercicio.regime_de_execucao_recomendado)
            expect(sut.body.data).toHaveProperty("unidade_de_execucao", exercicio.unidade_de_execucao)
            expect(sut.body.data).toHaveProperty("created_at", exercicio.created_at)
            expect(sut.body.data).toHaveProperty("updated_at", exercicio.updated_at)
        }
    })
})