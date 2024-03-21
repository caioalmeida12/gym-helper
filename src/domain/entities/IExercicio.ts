interface IExercicioCommand {
    nome: string;
    descricao: string;
    unidade_de_execucao: 'CARGA' | 'SEGUNDOS' | 'MINUTOS' | 'REPETICOES' | 'METROS';
    dificuldade: number;
    regime_de_execucao_recomendado: string;
    descanso_recomendado: number;
}

interface IExercicioQuery extends IExercicioCommand {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export type { IExercicioCommand }
export type { IExercicioQuery }