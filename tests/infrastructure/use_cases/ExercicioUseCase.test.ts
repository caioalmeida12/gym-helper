import { ExercicioUseCase } from "@/infrastructure/use_cases/ExercicioUseCase";
import { IExercicioCommand, IExercicioQuery } from "@/domain/entities/IExercicio";
import ISequelizeRepository from "@/domain/repositories/ISequelizeRepository";
import { SequelizeRepository } from "@/infrastructure/repositories/SequelizeRepository";
import { ExercicioModel } from "@/infrastructure/database/models/ExercicioModel";
import { ApplicationProblemJsonError } from "@/infrastructure/libs/ApplicationProblemJson";
import { connectDatabaseHelper } from "@/tests/lib/connectDatabaseHelper";
import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory";
import Sequelize from "@sequelize/core";

describe("ExercicioUseCase", () => {
    let useCase: ExercicioUseCase;
    let repository: ISequelizeRepository<IExercicioCommand, IExercicioQuery>;
    let database: Sequelize;

    beforeAll(async () => {
        database = await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE)

        repository = new SequelizeRepository<IExercicioCommand, IExercicioQuery>(ExercicioModel);
        useCase = new ExercicioUseCase(repository);
    });

    it("Should be able to instantiate a new ExercicioUseCase", () => {
        expect(useCase).toBeInstanceOf(ExercicioUseCase);
    });

    it("Should be able to call findAll method and get an empty response", async () => {
        const sut = await useCase.findAll();

        expect(sut).toBeDefined();
        expect(sut).toHaveLength(0);
    });

    it("Should be able to create a new Exercicio", async () => {
        const sut = await useCase.create({
            nome: "Puxada frontal alta",
            descricao: "Puxada frontal alta é um exercício para costas e bíceps",
            descanso_recomendado: 60,
            dificuldade: 3,
            regime_de_execucao_recomendado: "3x10",
            unidade_de_execucao: "REPETICOES"
        });

        expect(sut).toBeInstanceOf(Object);
        expect(sut.id).toBeDefined();
        expect(sut.nome).toBe("Puxada frontal alta");
        expect(sut.descricao).toBe("Puxada frontal alta é um exercício para costas e bíceps");
        expect(sut.descanso_recomendado).toBe(60);
        expect(sut.dificuldade).toBe(3);
        expect(sut.regime_de_execucao_recomendado).toBe("3x10");
        expect(sut.unidade_de_execucao).toBe("REPETICOES");
    });

    it("Should be able to call findAll method and get an array with one Exercicio as response", async () => {
        const sut = await useCase.findAll();

        expect(sut).toBeDefined();
        expect(sut).toHaveLength(1);
        expect(sut[0]).toBeInstanceOf(Object);
        expect(sut[0].id).toBeDefined();
        expect(sut[0].nome).toBe("Puxada frontal alta");
        expect(sut[0].descricao).toBe("Puxada frontal alta é um exercício para costas e bíceps");
        expect(sut[0].descanso_recomendado).toBe(60);
        expect(sut[0].dificuldade).toBe(3);
        expect(sut[0].regime_de_execucao_recomendado).toBe("3x10");
        expect(sut[0].unidade_de_execucao).toBe("REPETICOES");
    });

    it("Should be able to call findById method and get an Exercicio as response", async () => {
        const base = await useCase.create({
            nome: "Puxada frontal com pegada baixa",
            descricao: "Puxada frontal com pegada baixa é um exercício para costas e bíceps",
            descanso_recomendado: 60,
            dificuldade: 3,
            regime_de_execucao_recomendado: "3x10",
            unidade_de_execucao: "REPETICOES"
        });

        const sut = await useCase.findById(base.id);

        expect(sut).toBeInstanceOf(Object);
        expect(sut.id).toBe(sut.id);
        expect(sut.nome).toBe("Puxada frontal com pegada baixa");
        expect(sut.descricao).toBe("Puxada frontal com pegada baixa é um exercício para costas e bíceps");
        expect(sut.descanso_recomendado).toBe(60);
        expect(sut.dificuldade).toBe(3);
        expect(sut.regime_de_execucao_recomendado).toBe("3x10");
        expect(sut.unidade_de_execucao).toBe("REPETICOES");
    });

    it("Should be able to call findById method and get an error as response", async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sut = await useCase.findById("069461da-564d-4503-b8e0-80ea6b92ec19");
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(Object);

            if (!(error instanceof ApplicationProblemJsonError)) throw error;

            expect(error.type).toBeDefined();
            expect(error.title).toBeDefined();
            expect(error.detail).toBeDefined();
            expect(error.instance).toBeDefined();
            expect(error.status).toBe(404);
        }
    });

    it("Should be able to call update method and get an Exercicio as response", async () => {
        const sut = await useCase.create({
            nome: "Puxada frontal alta com pegada supinada",
            descricao: "Puxada frontal alta com pegada supinada é um exercício para costas e bíceps",
            descanso_recomendado: 60,
            dificuldade: 3,
            regime_de_execucao_recomendado: "3x10",
            unidade_de_execucao: "REPETICOES"
        });

        const updated = await useCase.update(sut.id, {
            nome: "Puxada frontal alta com pegada neutra",
            descricao: "Puxada frontal alta com pegada neutra é um exercício para costas e bíceps",
            descanso_recomendado: 60,
            dificuldade: 3,
            regime_de_execucao_recomendado: "3x10",
            unidade_de_execucao: "REPETICOES"
        });

        expect(updated).toBeInstanceOf(Object);
        expect(updated.id).toBe(sut.id);
        expect(updated.nome).toBe("Puxada frontal alta com pegada neutra");
        expect(updated.descricao).toBe("Puxada frontal alta com pegada neutra é um exercício para costas e bíceps");
        expect(updated.descanso_recomendado).toBe(60);
        expect(updated.dificuldade).toBe(3);
        expect(updated.regime_de_execucao_recomendado).toBe("3x10");
        expect(updated.unidade_de_execucao).toBe("REPETICOES");
    });

    it("Should be able to call update method and get an error as response", async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sut = await useCase.update("069461da-564d-4503-b8e0-80ea6b92ec19", {
                nome: "Puxada frontal alta com pegada neutra",
                descricao: "Puxada frontal alta com pegada neutra é um exercício para costas e bíceps",
                descanso_recomendado: 60,
                dificuldade: 3,
                regime_de_execucao_recomendado: "3x10",
                unidade_de_execucao: "REPETICOES"
            });
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(Object);

            if (!(error instanceof ApplicationProblemJsonError)) throw error;

            expect(error.type).toBeDefined();
            expect(error.title).toBeDefined();
            expect(error.detail).toBeDefined();
            expect(error.instance).toBeDefined();
            expect(error.status).toBe(404);
        }
    });

    it("Should be able to call delete method and get a positive number as response", async () => {
        const sut = await useCase.create({
            nome: "Puxada frontal alta com pegada supinada",
            descricao: "Puxada frontal alta com pegada supinada é um exercício para costas e bíceps",
            descanso_recomendado: 60,
            dificuldade: 3,
            regime_de_execucao_recomendado: "3x10",
            unidade_de_execucao: "REPETICOES"
        });

        const deleted = await useCase.delete(sut.id);

        expect(deleted).toBeGreaterThan(0);
    });

    it("Should be able to call delete method and get zero as response", async () => {
        const deleted = await useCase.delete("069461da-564d-4503-b8e0-80ea6b92ec19");

        expect(deleted).toBe(0);
    });

    afterAll(async () => {
        await database.close();
    });
});
