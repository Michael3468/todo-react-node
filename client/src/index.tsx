import { spy } from 'mobx';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { CreateTODOStore, UserStore, TODOStore } from './shared/store';

interface IStoreContext {
  createTodoStore: CreateTODOStore;
  userStore: UserStore;
  todoStore: TODOStore;
}
// eslint-disable-next-line import/prefer-default-export
export const StoreContext = createContext<IStoreContext>({
  createTodoStore: new CreateTODOStore(),
  userStore: new UserStore(),
  todoStore: new TODOStore(),
});

// mobx debug
spy((event) => {
  if (event.type === 'action') {
    // eslint-disable-next-line no-console
    console.debug(event);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreContext.Provider
      value={{
        createTodoStore: new CreateTODOStore(),
        userStore: new UserStore(),
        todoStore: new TODOStore(),
      }}
    >
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
