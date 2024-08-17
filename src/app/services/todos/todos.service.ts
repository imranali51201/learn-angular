import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AddTodoInput, GetTodosResponse, IPaginationResponse, ITodo, PaginationInput, UpdateTodoInput } from '../../models/todo.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    loading = false;
    todos: ITodo[] = [];
    pagination: IPaginationResponse | null = null;

    private apiService = inject(ApiService)

    constructor(
        private authService: AuthService
    ) { }

    async getTodos(props?: PaginationInput) {
        this.loading = true;
        const { data } = await this.apiService.api.get<GetTodosResponse>(`/todos/user/${this.authService.user?.id}`, {
            params: props
        })
        const { todos: _data, ...rest } = data
        this.todos = _data
        this.pagination = rest
        this.loading = false;
    }

    async updateTodo({ id, ...props }: UpdateTodoInput) {
        await this.apiService.api.put(`/todos/${id}`, props)
    }

    async addTodo(props: AddTodoInput) {
        await this.apiService.api.post(`/todos/add`, { ...props, userId: this.authService.user?.id })
    }


}
