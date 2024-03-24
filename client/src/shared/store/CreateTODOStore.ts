import { makeAutoObservable } from 'mobx';

import { TTodoText } from '../types';

class CreateTODOStore {
  private _visible: boolean;
  private _todoId: number | null;
  private _text: TTodoText;

  constructor() {
    this._visible = false;
    this._todoId = null;
    this._text = 'Create';

    makeAutoObservable(this);
  }

  showCreateTodo() {
    this._visible = true;
  }

  hideCreateTodo() {
    this._visible = false;
  }

  get visible(): boolean {
    return this._visible;
  }

  setTodoId(todoId: number | null) {
    this._todoId = todoId;
  }

  get todoId(): number | null {
    return this._todoId;
  }

  setText(text: TTodoText) {
    this._text = text;
  }

  get text(): TTodoText {
    return this._text;
  }
}

export default CreateTODOStore;
