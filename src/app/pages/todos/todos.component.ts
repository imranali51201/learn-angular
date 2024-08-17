import { Component, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos/todos.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { AddTodo } from './components/add-todo.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'todos-page',
  standalone: true,
  imports: [CommonModule, NzTableModule, AddTodo, NzButtonModule, NzTypographyModule],
  templateUrl: './todos.component.html',
})
export class TodosPage {
  @ViewChild(AddTodo) addTodo!: AddTodo;

  limit = 10;
  page = 1;

  constructor(
    public todoService: TodosService
  ) {
    this.fetchTodos()
  }

  fetchTodos() {
    console.log(this.page)
    this.todoService.getTodos({
      limit: this.limit,
      skip: (this.page - 1) * this.limit
    })
  }

  onAddTodo() {
    this.page = 1;
    this.fetchTodos()
  }

  onPageIndexChange(_page: number) {
    console.log("🚀 ~ TodosPage ~ onPageIndexChange ~ _page:", _page)
    this.page = _page
    this.fetchTodos()
  }

  onPageSizeChange(_limit: number) {
    this.limit = _limit
    this.fetchTodos()
  }

}
