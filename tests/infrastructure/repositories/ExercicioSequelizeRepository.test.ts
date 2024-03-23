import { ESupportedDatabaseDrivers } from "@/domain/database/IDatabaseSingletonFactory";
import { IExercicioCommand, IExercicioQuery } from "@/domain/entities/IExercicio";
import ISequelizeRepository from "@/domain/repositories/ISequelizeRepository";
import { ExercicioModel } from "@/infrastructure/database/models/ExercicioModel";
import { SequelizeRepository } from "@/infrastructure/repositories/SequelizeRepository";
import { connectDatabaseHelper } from "@/tests/lib/connectDatabaseHelper";

describe("ExercicioSequelizeRepository", () => {
    let repository: ISequelizeRepository<IExercicioCommand, IExercicioQuery>;

    beforeAll(async () => {
        await connectDatabaseHelper(ESupportedDatabaseDrivers.SQLITE)

        repository = new SequelizeRepository<IExercicioCommand, IExercicioQuery>(ExercicioModel)
    });


    it("Should return an empty list of Exercicios", async () => {
        const sut = await repository.findAll();

        expect(sut).toBeDefined();
        expect(sut).toHaveLength(0);
    });

    it("Should be able to create a new Exercicio", async () => {
        const sut = await repository.create({
            nome: 'Supino reto',
            descanso_recomendado: 60,
            descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
            dificuldade: 3,
            regime_de_execucao_recomendado: '3x10',
            unidade_de_execucao: 'REPETICOES'
        });

        expect(sut).toBeDefined()
        expect(sut).toHaveProperty('id')
        expect(sut).toHaveProperty('nome')
        expect(sut).toHaveProperty('descanso_recomendado')
        expect(sut).toHaveProperty('descricao')
        expect(sut).toHaveProperty('dificuldade')
        expect(sut).toHaveProperty('regime_de_execucao_recomendado')
        expect(sut).toHaveProperty('unidade_de_execucao')
        expect(sut).toHaveProperty('created_at')
        expect(sut).toHaveProperty('updated_at')
    });

    it("Should return a list of Exercicios with at least one entry", async () => {
        const sut = await repository.findAll();

        expect(sut).toBeDefined()
        expect(sut.length).toBeGreaterThan(0)

        expect(sut[0]).toHaveProperty('id')
        expect(sut[0]).toHaveProperty('nome')
        expect(sut[0]).toHaveProperty('descanso_recomendado')
        expect(sut[0]).toHaveProperty('descricao')
        expect(sut[0]).toHaveProperty('dificuldade')
        expect(sut[0]).toHaveProperty('regime_de_execucao_recomendado')
        expect(sut[0]).toHaveProperty('unidade_de_execucao')
        expect(sut[0]).toHaveProperty('created_at')
        expect(sut[0]).toHaveProperty('updated_at')
    });

    it("Should be able to find an Exercicio by its id", async () => {
        const sut = await repository.findAll();

        const found = await repository.findById(sut[0].id);

        expect(found).toBeDefined()
        expect(found).toHaveProperty('id')
        expect(found).toHaveProperty('nome')
        expect(found).toHaveProperty('descanso_recomendado')
        expect(found).toHaveProperty('descricao')
        expect(found).toHaveProperty('dificuldade')
        expect(found).toHaveProperty('regime_de_execucao_recomendado')
        expect(found).toHaveProperty('unidade_de_execucao')
        expect(found).toHaveProperty('created_at')
        expect(found).toHaveProperty('updated_at')
    });

    it("Should be able to update an Exercicio", async () => {
        const sut = await repository.findAll();

        const updated = await repository.update(sut[0].id, {
            ...sut[0],
            nome: 'Supino inclinado'
        });

        expect(updated).toBeDefined()
        expect(updated).toHaveProperty('id')
        expect(updated).toHaveProperty('nome')
        expect(updated).toHaveProperty('descanso_recomendado')
        expect(updated).toHaveProperty('descricao')
        expect(updated).toHaveProperty('dificuldade')
        expect(updated).toHaveProperty('regime_de_execucao_recomendado')
        expect(updated).toHaveProperty('unidade_de_execucao')
        expect(updated).toHaveProperty('created_at')
        expect(updated).toHaveProperty('updated_at')
    });

    it("Should not be able to update an Exercicio that does not exist", async () => {
        const updated = await repository.update("57336908-1472-4077-a9ad-241c710f5db9", {
            nome: 'Supino inclinado',
            descanso_recomendado: 60,
            descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
            dificuldade: 3,
            regime_de_execucao_recomendado: '3x10',
            unidade_de_execucao: 'REPETICOES'
        });

        expect(updated).toBeNull()
    });

    it("Should be able to delete an Exercicio", async () => {
        const sut = await repository.findAll();

        const deleted = await repository.delete(sut[0].id);

        expect(deleted).toBe(1)
    });

    it("Should return null when finding an Exercicio by a non-existing id", async () => {
        const found = await repository.findById("57336908-1472-4077-a9ad-241c710f5db9");
    
        expect(found).toBeNull();
    });
    
    it("Should return null when updating an Exercicio with a non-existing id", async () => {
        const updated = await repository.update("57336908-1472-4077-a9ad-241c710f5db9", {
            nome: 'Supino inclinado',
            descanso_recomendado: 60,
            descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
            dificuldade: 3,
            regime_de_execucao_recomendado: '3x10',
            unidade_de_execucao: 'REPETICOES'
        });
    
        expect(updated).toBeNull();
    });
    
    it("Should return 0 when deleting an Exercicio with a non-existing id", async () => {
        const deleted = await repository.delete("57336908-1472-4077-a9ad-241c710f5db9");
    
        expect(deleted).toBe(0);
    });
    
    it("Should return a list of Exercicios with a specific property value", async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const base = await repository.create({
            nome: 'Supino reto',
            descanso_recomendado: 60,
            descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
            dificuldade: 3,
            regime_de_execucao_recomendado: '3x10',
            unidade_de_execucao: 'REPETICOES'
        });

        const sut = await repository.findAll();
    
        const filteredExercicios = sut.filter(exercise => exercise.dificuldade === 3);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deleted = await repository.delete(sut[0].id);
    
        expect(filteredExercicios).toBeDefined();
        expect(filteredExercicios.length).toBeGreaterThan(0);
        expect(filteredExercicios.every(exercise => exercise.dificuldade === 3)).toBe(true);
    });    
});