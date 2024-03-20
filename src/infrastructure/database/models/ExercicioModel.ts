import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, sql } from '@sequelize/core';
import { Attribute, PrimaryKey, NotNull, Table, Unique, Default } from '@sequelize/core/decorators-legacy';
import { Len, Min, Max } from '@sequelize/validator.js';

import { IExercicioCommand } from '@/domain/entities/IExercicio';

@Table({
    tableName: 'exercicios',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class ExercicioModel extends Model<InferAttributes<ExercicioModel>, InferCreationAttributes<ExercicioModel>> implements IExercicioCommand {
    @Attribute(DataTypes.UUIDV4)
    @PrimaryKey
    @Default(sql.uuidV4)
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING(64))
    @NotNull
    @Unique
    @Len({
        args: [3, 64],
        msg: 'O nome do exercício deve ter entre 3 e 64 caracteres'
    })
    declare nome: string;

    @Attribute(DataTypes.STRING(512))
    @NotNull
    @Len({
        args: [3, 512],
        msg: 'A descrição do exercício deve ter entre 3 e 512 caracteres'
    })
    declare descricao: string;

    @Attribute(DataTypes.ENUM('CARGA', 'REPETICOES', 'METROS', 'SEGUNDOS', 'MINUTOS'))
    @NotNull
    declare unidade_de_execucao: 'CARGA' | 'REPETICOES' | 'METROS' | 'SEGUNDOS' | 'MINUTOS';

    @Attribute(DataTypes.TINYINT(1))
    @NotNull
    @Min(0)
    @Max(9)
    declare dificuldade: number;

    @Attribute(DataTypes.STRING(32))
    @NotNull
    @Len({
        args: [3, 32],
        msg: 'O regime de execução recomendado deve ter entre 3 e 32 caracteres'
    })
    declare regime_de_execucao_recomendado: string;

    @Attribute(DataTypes.TINYINT(3))
    @NotNull
    declare descanso_recomendado: number;
}