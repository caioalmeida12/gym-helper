import { IExercicioQuery } from '@/domain/entities/IExercicio';
import z from 'zod';
import { DidCorrectlyImplementDTO } from '../libs/DidCorreclyImplementDTOHelper';

const ExercicioZodDTO = z.object({
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid(),
    ),
    nome: z.preprocess(
        (val) => String(val),
        z.string().min(3).max(64),
    ),
    descricao: z.preprocess(
        (val) => String(val),
        z.string().min(3).max(512),
    ),
    unidade_de_execucao: z.preprocess(
        (val) => String(val),
        z.enum(['CARGA', 'REPETICOES', 'METROS', 'SEGUNDOS', 'MINUTOS']),
    ),
    dificuldade: z.preprocess(
        (val) => Number(val),
        z.number().int().min(0).max(1),
    ),
    regime_de_execucao_recomendado: z.preprocess(
        (val) => String(val),
        z.string().min(3).max(32).regex(/^[0-9]+x[0-9]+$/),
    ),
    descanso_recomendado: z.preprocess(
        (val) => Number(val),
        z.number().int().min(0).max(9999),
    ),
    created_at: z.preprocess(
        (val) => new Date(String(val)),
        z.date(),
    ),
    updated_at: z.preprocess(
        (val) => new Date(String(val)),
        z.date(),
    ),
    deleted_at: z.preprocess(
        (val) => val ? new Date(String(val)) : val,
        z.date().nullable(),
    ),
});

type ExercicioZodCommand = z.infer<typeof ExercicioZodDTO>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DidCorrectlyImplementDTO: DidCorrectlyImplementDTO<IExercicioQuery, ExercicioZodCommand> = true;

export default ExercicioZodDTO;
export type { ExercicioZodCommand };