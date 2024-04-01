import request from "supertest"
import { connectDatabaseHelper } from "../lib/connectDatabaseHelper"
import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory"
import { envLogger } from "@/infrastructure/libs/EnvFile";

envLogger('.env', {
    logging: false
})

describe("PostExerciciosHonoController", () => {
    beforeAll(async () => {
        await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE)
    });

    it("Should return 400 on empty request body", async () => {
        await request(`${process.env.API_URL}`)
            .post(`${process.env.ROUTE_EXERCICIOS}`)
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })

    it("Should return 201 on success", async () => {
        const exercicioData = {
            nome: "Abdominal supra",
            descanso_recomendado: 30,
            descricao: "Deite-se de barriga para cima, com as pernas flexionadas e os pés apoiados no chão. Coloque as mãos atrás da cabeça, com os cotovelos apontados para fora. Contraia o abdômen e suba o tronco, levando o peito em direção aos joelhos. Volte à posição inicial, sem relaxar a musculatura. Mantenha o abdômen contraído durante todo o movimento.",
            dificuldade: 1,
            regime_de_execucao_recomendado: "3x15",
            unidade_de_execucao: "REPETICOES",
        }

        const sut = await request(`${process.env.API_URL}`)
            .post(`${process.env.ROUTE_EXERCICIOS}`)
            .send(exercicioData)
            
        if (sut.ok) {
            expect(sut.body).toHaveProperty("status", "success")
            expect(sut.body).toHaveProperty("data")
            expect(sut.body.data).toHaveProperty("nome", exercicioData.nome)
            expect(sut.body.data).toHaveProperty("descanso_recomendado", exercicioData.descanso_recomendado)
            expect(sut.body.data).toHaveProperty("descricao", exercicioData.descricao)
            expect(sut.body.data).toHaveProperty("dificuldade", exercicioData.dificuldade)
            expect(sut.body.data).toHaveProperty("regime_de_execucao_recomendado", exercicioData.regime_de_execucao_recomendado)
            expect(sut.body.data).toHaveProperty("unidade_de_execucao", exercicioData.unidade_de_execucao)
        }
    })

    it("Should return 409 on conflict", async () => {
        const exercicioData = {
            nome: "Abdominal supra",
            descanso_recomendado: 30,
            descricao: "Deite-se de barriga para cima, com as pernas flexionadas e os pés apoiados no chão. Coloque as mãos atrás da cabeça, com os cotovelos apontados para fora. Contraia o abdômen e suba o tronco, levando o peito em direção aos joelhos. Volte à posição inicial, sem relaxar a musculatura. Mantenha o abdômen contraído durante todo o movimento.",
            dificuldade: 1,
            regime_de_execucao_recomendado: "3x15",
            unidade_de_execucao: "REPETICOES",
        }

        await request(`${process.env.API_URL}`)
            .post(`${process.env.ROUTE_EXERCICIOS}`)
            .send(exercicioData)
            .expect(409)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail")
                expect(res.body).toHaveProperty("data", null)
                expect(res.body).toHaveProperty("message")
            })
    })
})