import React, { useCallback, useRef } from 'react';
import { Todo, todoApi } from '../store';
import classes from './List.module.scss';

const ListComponent: React.FC = () => {
  const { data: list } = todoApi.useGetAllQuery();
  const [addTodo] = todoApi.useAddTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const add = useCallback(() => {
    const val = inputRef.current?.value;
    if (!val) { return; }
    addTodo(inputRef.current.value)
    inputRef.current.value = '';
  }, [addTodo]);

  const toggle = useCallback((todo: Todo) => {
    updateTodo({...todo, done: !todo.done})
  }, [updateTodo]);

  const remove = useCallback((id: string) => {
    deleteTodo(id);
  }, [deleteTodo]);

  return (
    <div className={classes.root}>
      <h1>To Do List</h1>
      <input className={classes.input} type="text" ref={inputRef} />
      <button className={classes.button} onClick={add}>Add</button>
      <ul className={classes.list}>
        {list?.map((el, i) =>
          <li
            key={i}
            className={`${classes.listItem} ${el.done ? classes.itemDone : ''}`}
            onClick={() => toggle(el)}
          >
            <span className={classes.itemIcon}>{el.done && <>&#10004;</>}</span>
            {el.text}
            <button className={classes.removeButton} onClick={event => { remove(el.id); event.stopPropagation() }}>&#10005;</button>
          </li>
        )}
      </ul>
      {!list?.length && <p>List is empty</p>}
    </div>
  )
}

export default ListComponent;