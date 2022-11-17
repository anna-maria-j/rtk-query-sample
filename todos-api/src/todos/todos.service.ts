import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private _todos: Todo[] = [];
  create(createTodoDto: CreateTodoDto) {
    return this._todos.push({
      ...createTodoDto,
      id: `id${new Date().valueOf()}`,
    });
  }

  findAll() {
    return this._todos;
  }

  findOne(id: string) {
    return this._todos.find((el) => el.id === id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const index = this._todos.findIndex((el) => el.id === id);
    if (index < 0) {
      return;
    }
    this._todos[index] = { ...this._todos[index], ...updateTodoDto };
    return this._todos[index];
  }

  remove(id: string) {
    this._todos = this._todos.filter((el) => el.id !== id);
    return true;
  }
}
