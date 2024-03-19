interface ExercicioCommandEntity {
    nome: string;
    descricao: string;
    unidade_de_execucao: 'CARGA' | 'SEGUNDOS' | 'MINUTOS' | 'REPETICOES' | 'METROS';
    dificuldade: number;
    regime_de_execucao_recomendado: string;
    descanso_recomendado: number;
}

interface ExercicioQueryEntity extends ExercicioCommandEntity{
    id: string;
}

export type ExercicioCommand = ExercicioCommandEntity;
export type ExercicioQuery = ExercicioQueryEntity;