import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzModalModule } from "ng-zorro-antd/modal";
import { TodosService } from "../../../services/todos/todos.service";

@Component({
    selector: "add-todo",
    standalone: true,
    imports: [NzModalModule, NzFormModule, NzInputModule, ReactiveFormsModule],
    templateUrl: "./add-todo.component.html"
})
export class AddTodo {
    @Output() onAdd = new EventEmitter<void>();
    visible = false;
    isLoading = false;
    todoService = inject(TodosService)

    todoForm = new FormGroup({
        todo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    open() {
        this.visible = true
    }

    async submitForm() {
        this.isLoading = true;
        const values = this.todoForm.getRawValue();
        await this.todoService.addTodo({ todo: values.todo, completed: false })
        this.onAdd.emit();
        this.handleCancel()
    }

    handleOk() {
        this.submitForm()
    }

    handleCancel() {
        this.todoForm.reset()
        this.isLoading = false;
        this.visible = false
    }
}