import { APIResponse } from "../libs/APIResponse";

export interface IGetController<Query> {
    findAll(query: Query): APIResponse<Query[]>
    findById(id: string): APIResponse<Query>
}
