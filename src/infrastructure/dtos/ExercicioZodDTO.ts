import { IExercicioQuery } from '@/domain/entities/IExercicio';
import z from 'zod';
import { DidCorrectlyImplementDTO } from '../lib/DidCorreclyImplementDTOHelper';

const ExercicioZodDTO = z.object({
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid(),
    ),
    nome: z.preprocess(
        (val) => String(val),
        z.string(),
    ),
    descanso_recomendado: z.preprocess(
        (val) => Number(val),
        z.number(),
    ),
    descricao: z.preprocess(
        (val) => String(val),
        z.string(),
    ),
    dificuldade: z.preprocess(
        (val) => Number(val),
        z.number(),
    ),
    regime_de_execucao_recomendado: z.preprocess(
        (val) => String(val),
        z.string(),
    ),
    unidade_de_execucao: z.preprocess(
        (val) => String(val),
        z.string(),
    ),
    created_at: z.preprocess(
        (val) => new String(val),
        z.date(),
    ),
    updated_at: z.preprocess(
        (val) => new String(val),
        z.date(),
    ),
    deleted_at: z.preprocess(
        (val) => val ? new String(val) : val,
        z.date().optional(),
    ),
});

type ExercicioZodCommand = z.infer<typeof ExercicioZodDTO>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DidCorrectlyImplementDTO: DidCorrectlyImplementDTO<IExercicioQuery, ExercicioZodCommand> = true;

export default ExercicioZodDTO;
export type { ExercicioZodCommand };