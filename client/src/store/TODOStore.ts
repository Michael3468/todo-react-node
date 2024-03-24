import { makeAutoObservable, toJS } from 'mobx';

import { getAllTODOS } from '../shared/api';
import { ITodo } from '../types';

class TODOStore {
  private _todos: ITodo[];
  private _isLoading: boolean;

  constructor() {
    this._todos = [];
    this._isLoading = false;

    makeAutoObservable(this);
  }

  setTodos(todos: ITodo[]) {
    this._todos = todos;
  }

  get todos(): ITodo[] {
    return toJS(this._todos);
  }

  clearTodos() {
    this._todos = [];
  }

  setIsLoading(status: boolean) {
    this._isLoading = status;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  fetchAllTodos = async () => {
    try {
      this.setIsLoading(true);
      const todos = await getAllTODOS();
      this.setTodos(todos);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setIsLoading(false);
      }, 200); // for test long loading
    }
  };

  getTodoById(id: number): ITodo | undefined {
    return toJS(this._todos.find((todo) => todo.id === id));
  }
}

export default TODOStore;
