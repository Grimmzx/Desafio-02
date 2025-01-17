const Todo = ({ todo, removeTodo, updateTodo }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex">
        <h5 className={todo.done ? "text-decoration-line-through me-auto" : "me-auto"}>
          {todo.title} - {todo.artist}
        </h5>
        <button
          className="btn btn-sm btn-warning me-1"
          onClick={() => updateTodo(todo.id)} 
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => removeTodo(todo.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Todo;
