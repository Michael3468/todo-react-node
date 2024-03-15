import { makeAutoObservable, toJS } from 'mobx';

import { getAllTODOS } from '../http/todoAPI';
import { ITodo } from '../types';

class TODOStore {
  private _todos: ITodo[];
  isLoading: boolean;

  constructor() {
    this._todos = [];
    this.isLoading = false;

    makeAutoObservable(this);
  }

  setTodos(todos: ITodo[]) {
    this._todos = todos;
  }

  fetchAllTodos = async () => {
    try {
      this.isLoading = true;
      const todos = await getAllTODOS();
      this.setTodos(todos);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 200); // for test long loading
    }
  };

  get todos(): ITodo[] {
    return toJS(this._todos);
  }

  getTodoById(id: number): ITodo | undefined {
    return toJS(this._todos.find((todo) => todo.id === id));
  }
}

export default TODOStore;
