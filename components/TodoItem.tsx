import { Dispatch, SetStateAction, useEffect } from "react";
import { PencilSquare, CheckCircleFill, Trash } from "react-bootstrap-icons";
import useStorage from "../hooks/useStorage";
import { TodoDataManager, TodoItemData } from "../types/todo";

// CARD
// text
// tags
// complete, edit, delete

type Color = "green" | "red" | "yellow";

interface TodoItemProps {
  todoItem: TodoItemData;
  todos: TodoItemData[];
  openModal: (prefill: TodoItemData | null) => void;
  closeModal: () => void;
  updateTodos: (todos: TodoItemData[]) => void;
  setCustomFilter: Dispatch<SetStateAction<string>>;
}

export default function TodoItem({
  todoItem,
  todos,
  updateTodos,
  setCustomFilter,
  openModal,
}: TodoItemProps) {
  const { text, tags, completed, createdAt } = todoItem;

  const setComplete = () => {
    const tempArray = todos;
    let todoIndex = tempArray.findIndex(
      (t) => t.text === text && t.createdAt === createdAt
    );
    const todo = tempArray[todoIndex];
    todo.completed = true;

    updateTodos([...tempArray]);
  };

  const setDeleted = () => {
    // TODO: move into deleted[]
    const tempArray = todos;
    let todoIndex = tempArray.findIndex(
      (t) => t.text === text && t.createdAt === createdAt
    );
    delete tempArray[todoIndex];

    updateTodos([...tempArray.filter(Boolean)]);
  };

  const editTodo = () => {
    const tempArray = todos;
    let todoIndex = tempArray.findIndex(
      (t) => t.text === text && t.createdAt === createdAt
    );
    const todo = tempArray[todoIndex];
    openModal(todo);
  };

  const baseButtonCSS =
    "w-full justify-center text-base bg-transparent rounded-md flex items-center py-2 border border-gray-700 mx-1 outline-none hover:shadow-lg transition";

  const green = "green";

  const buttonHighlight = (color: Color) =>
    `focus:bg-${color}-50 focus:text-${color}-500 focus:border-${color}-500 hover:bg-${color}-50 hover:text-${color}-500 hover:border-${color}-500`;

  return (
    <div className="w-full">
      <div
        className={`${
          completed ? "opacity-50 transition-opacity hover:opacity-100" : ""
        } mx-auto md:max-w-md lg:max-w-lg py-4 px-8 bg-white shadow-md hover:shadow-lg transition rounded-lg my-6 border border-gray-300`}
      >
        <p className="ml-1 my-2 text-gray-600">{text}</p>
        <div className="w-full flex items-start flex-wrap min-h-3 ml-1">
          <ul className="flex flex-wrap p-0" aria-label="tags">
            {tags.map((tag, index) => (
              <li
                onClick={() => !completed && setCustomFilter(tag)}
                key={index}
                title={`Filter by ${tag}`}
                className={`${
                  !completed ? "hover:bg-gray-200 cursor-pointer" : ""
                } mt-2 w-auto h-5 flex items-center text-black border border-black  p-2 list-none rounded mr-2`}
              >
                <span className="text-xs text-center p-2">{tag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTE: I extracted these to buttons. they sometime render properly cant determine if its bad next cache */}

        {completed ? null : (
          <div className="flex justify-end mt-4">
            <button
              onClick={setComplete}
              aria-label="Mark Todo Complete"
              title="Complete"
              className={`${baseButtonCSS} ${buttonHighlight("green")}`}
            >
              <CheckCircleFill />
            </button>
            <button
              onClick={editTodo}
              aria-label="Edit Todo"
              title="Edit"
              className={`${baseButtonCSS} ${buttonHighlight("yellow")}`}
            >
              <PencilSquare />
            </button>
            <button
              onClick={setDeleted}
              aria-label="Delete Todo"
              title="Delete"
              className={`${baseButtonCSS} ${buttonHighlight("red")}`}
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
