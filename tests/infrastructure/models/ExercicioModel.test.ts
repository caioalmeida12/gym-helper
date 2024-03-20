import Sequelize, { sql, UniqueConstraintError, ValidationError } from "@sequelize/core";
import { connectDatabaseHelper, chosenDatabase } from "@/tests/lib/connectDatabaseHelper";
import { ExercicioModel } from "@/infrastructure/database/models/ExercicioModel";
import { IExercicioQuery } from "@/domain/entities/IExercicio";

describe("ExercicioModel", () => {
    let database: Sequelize;

    beforeAll(async () => {
        database = await connectDatabaseHelper(chosenDatabase).then((res) => {
            if (!(res instanceof Sequelize)) throw new Error('The database is not an instance of Sequelize')

            return res
        })
    });

    it("Should be able to query the ExercicioModel", async () => {
        const result = (await database.query(sql`SELECT 1 + 1 AS result;`))[0] as { result: number }[];

        expect(result).toBeDefined();
        expect(result[0]).toHaveProperty('result');
        expect(result[0].result).toBe(2);
    })

    it("Should be able to create a new ExercicioModel", async () => {
        const sut = (await ExercicioModel.create({
            nome: 'Supino reto',
            descanso_recomendado: 60,
            descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
            dificuldade: 3,
            regime_de_execucao_recomendado: '3x10',
            unidade_de_execucao: 'REPETICOES'
        })).toJSON() as IExercicioQuery

        expect(sut).toHaveProperty('id')
        expect(sut.id).toBeTruthy()
        expect(sut.id.length).toBe(36)
        expect(sut).toHaveProperty('created_at')
        expect(sut).toHaveProperty('updated_at')
        expect(sut.created_at).toBeTruthy()
        expect(sut.updated_at).toBeTruthy()
        expect(sut.deleted_at).toBeFalsy()
    })

    it("Should throw ValidationError when creating a new ExercicioModel without a name (or other required fields)", async () => {
        try {
            // @ts-expect-error Testing if the model throws a validation error
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sut = await ExercicioModel.create({
                descanso_recomendado: 60,
                descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
                dificuldade: 3,
                regime_de_execucao_recomendado: '3x10',
                unidade_de_execucao: 'REPETICOES'
            })
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError)
        }
    })

    it("Should throw UniqueConstraintError when creating a new ExercicioModel with the same name", async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sut = await ExercicioModel.create({
                nome: 'Supino reto',
                descanso_recomendado: 60,
                descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
                dificuldade: 3,
                regime_de_execucao_recomendado: '3x10',
                unidade_de_execucao: 'REPETICOES'
            })
        } catch (error) {
            expect(error).toBeInstanceOf(UniqueConstraintError)
        }
    })

    it("Should be able to find an ExercicioModel", async () => {
        const sut = (await ExercicioModel.findOne({
            where: {
                nome: 'Supino reto'
            }
        }))?.toJSON()

        expect(sut).toHaveProperty('id')
        expect(sut).toBeDefined()
    })

    it("Should not find an ExercicioModel that does not exist", async () => {
        const sut = await ExercicioModel.findOne({
            where: {
                nome: 'Exercício que não existe'
            }
        })

        expect(sut).toBeNull()
    })


    it("Should be able to update an ExercicioModel", async () => {
        const sut = await ExercicioModel.findOne({
            where: {
                nome: 'Supino reto'
            }
        }) as ExercicioModel

        const updated = (await sut.update({
            nome: 'Supino inclinado'
        })).toJSON() as IExercicioQuery

        expect(updated).toHaveProperty('id')
        expect(updated).toHaveProperty('created_at')
        expect(updated).toHaveProperty('updated_at')
        expect(updated.created_at).not.toBe(updated.updated_at)
    })

    it("Should not be able to update an ExercicioModel that does not exist", async () => {
        const sut = await ExercicioModel.findOne({
            where: {
                nome: 'Supino reto'
            }
        })

        const updated = await sut?.update({
            nome: 'Supino inclinado'
        })

        expect(updated).toBeUndefined()
    })

    it("Should not be able to update an ExercicioModel to a name that already exists", async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const base = await ExercicioModel.create({
                nome: 'Supino reto',
                descanso_recomendado: 60,
                descricao: 'O supino reto é um exercício que trabalha o peitoral, ombros e tríceps',
                dificuldade: 3,
                regime_de_execucao_recomendado: '3x10',
                unidade_de_execucao: 'REPETICOES'
            })

            const sut = await ExercicioModel.findOne({
                where: {
                    nome: 'Supino reto'
                }
            })

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updated = await sut?.update({
                nome: 'Supino inclinado'
            });
        } catch (error) {
            expect(error).toBeInstanceOf(UniqueConstraintError)
        }
    })

    it("Should not be able to update an ExercicioModel with an empty name (or any other required fields)", async () => {
        try {
            const sut = await ExercicioModel.findOne({
                where: {
                    nome: 'Supino inclinado'
                }
            })

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updated = await sut?.update({
                nome: ''
            });
        } catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
        }
    });

    it("Should be able to delete an ExercicioModel", async () => {
        const sut = await ExercicioModel.findOne({
            where: {
                nome: 'Supino inclinado'
            }
        })

        const deleted = await sut?.destroy()

        expect(deleted).toBe(1)
    })

    it("Should not be able to delete an ExercicioModel that does not exist", async () => {
        const sut = await ExercicioModel.findOne({
            where: {
                nome: 'Supino inclinado'
            }
        })

        const deleted = await sut?.destroy()

        expect(deleted).toBeFalsy()
    })

    afterAll(async () => {
        await database.close();
    });
});