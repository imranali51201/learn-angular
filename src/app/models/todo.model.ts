export interface ITodo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export interface IPaginationResponse {
    total: number;
    skip: number;
    limit: number;
}

export type PaginationInput = Omit<IPaginationResponse, "total">
export type UpdateTodoInput = Partial<Omit<ITodo, "userId">>
export type AddTodoInput = Partial<Omit<ITodo, "userId" | "id">>

export interface GetTodosResponse extends IPaginationResponse {
    todos: ITodo[];

}