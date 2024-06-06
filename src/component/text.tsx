import { useState } from "react";
import { Filter, Todo } from "../type/todoType";

export const InputText = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [...todos, newTodo]);
    setText(""); //入力フォーム内を空文字に初期化
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: value }; //スプレット構文でコピー展開した上で入れ子のプロパティ値を更新する
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todo) => {
      const newTodos = todo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };
  const filterTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return !todo.removed && todo.checked;
      case "unchecked":
        return !todo.removed && !todo.checked;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">全タスク</option>
        <option value="checked">完了タスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
          disabled={filter === "checked" || filter === "removed"}
        />
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <>
        {filterTodos.map((todo) => {
          return (
            <div key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleCheck(todo.id, !todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(todo.id, !todo.removed)}>
                {todo.removed ? "復元" : "削除"}
              </button>
            </div>
          );
        })}
      </>
    </div>
  );
};
