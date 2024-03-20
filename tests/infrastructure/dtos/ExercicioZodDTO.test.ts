import ExercicioZodDTO from "@/infrastructure/dtos/ExercicioZodDTO";

describe("ExercicioZodDTO", () => {
    it("Should be able to validate a valid ExercicioZodDTO", () => {
        const validExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            descanso_recomendado: 60,
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(validExercicioZodDTO);

        expect(result.success).toBe(true);
    });

    it("Should not validate an ExercicioZodDTO that does not have required fields", () => {
        const invalidExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(false);
    });

    it("Should not validate an ExercicioZodDTO that does not have required fields", () => {
        const invalidExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(false);
    });

    it("Should not validate an ExercicioZodDTO with invalid data types", () => {
        const invalidExercicioZodDTO = {
            id: 123,
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: "easy",
            regime_de_execucao_recomendado: "3x10",
            descanso_recomendado: "60",
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(false);
    });

    it("Should validate ExercicioZodDTO with additional optional fields", () => {
        const validExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            descanso_recomendado: 60,
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null,
            additional_field: "Additional Field"
        };

        const result = ExercicioZodDTO.safeParse(validExercicioZodDTO);

        expect(result.success).toBe(true);
    });

    it("Should not validate ExercicioZodDTO with invalid regime_de_execucao_recomendado format", () => {
        const invalidExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x",
            descanso_recomendado: 60,
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(false);
    });

    it("Should not validate ExercicioZodDTO with descanso_recomendado out of range", () => {
        const invalidExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            descanso_recomendado: 10000,
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: null
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(false);
    });

    it("Should validate ExercicioZodDTO with deleted_at field being a non-null value", () => {
        const invalidExercicioZodDTO = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            nome: "Supino",
            descricao: "Supino reto",
            unidade_de_execucao: "CARGA",
            dificuldade: 0,
            regime_de_execucao_recomendado: "3x10",
            descanso_recomendado: 60,
            created_at: "2021-08-10T00:00:00.000Z",
            updated_at: "2021-08-10T00:00:00.000Z",
            deleted_at: "2021-08-11T00:00:00.000Z"
        };

        const result = ExercicioZodDTO.safeParse(invalidExercicioZodDTO);

        expect(result.success).toBe(true);
    });

});