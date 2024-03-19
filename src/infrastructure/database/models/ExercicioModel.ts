import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';

import { ExercicioCommand } from '@/domain/entities/IExercicio';

export class ExercicioModel extends Model<InferAttributes<ExercicioModel>, InferCreationAttributes<ExercicioModel>> implements ExercicioCommand {
    @Attribute(DataTypes.UUIDV4)
    @PrimaryKey
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING(64))
    @NotNull
    declare nome: string;

    @Attribute(DataTypes.STRING(512))
    @NotNull
    declare descricao: string;

    @Attribute(DataTypes.ENUM('CARGA', 'REPETICOES', 'METROS', 'SEGUNDOS', 'MINUTOS'))
    @NotNull
    declare unidade_de_execucao: 'CARGA' | 'REPETICOES' | 'METROS' | 'SEGUNDOS' | 'MINUTOS';

    @Attribute(DataTypes.TINYINT(1))
    @NotNull
    declare dificuldade: number;

    @Attribute(DataTypes.STRING(32))
    @NotNull
    declare regime_de_execucao_recomendado: string;

    @Attribute(DataTypes.TINYINT(3))
    @NotNull
    declare descanso_recomendado: number;
}