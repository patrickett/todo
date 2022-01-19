import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { XLg, X } from "react-bootstrap-icons";
import { TodoItemData } from "../types/todo";
import TagsInput from "./TodoTagsInput";

interface TodoFormProps {
  modalIsOpen: boolean;
  todos: TodoItemData[];
  updateTodos: (todos: TodoItemData[]) => void;

  setIsOpen: Dispatch<SetStateAction<boolean>>;
  prefill: TodoItemData | null;
}

export default function TodoForm({
  setIsOpen,
  updateTodos,
  todos,
  prefill,
}: TodoFormProps) {
  const [tagList, setTags] = useState<string[]>(prefill ? prefill.tags : []);
  const [todoText, setTodoText] = useState(prefill ? prefill.text : "");
  const [tagError, setTagError] = useState<null | string>(null);

  const createTodo = () => {
    if (tagList.length === 0) {
      setTagError("Requires at least one tag");
      return;
    }

    const todo: TodoItemData = {
      completed: false,
      createdAt: new Date(),
      index: 0,
      tags: tagList,
      text: todoText,
    };
    const newTodos = [...todos, todo];
    // this triggers a re-render
    updateTodos(newTodos);

    setTags([]);
    setTodoText("");
    setIsOpen(false);
  };

  const editTodo = () => {
    if (!prefill) return;
    const tempArray = todos;
    let todoIndex = tempArray.findIndex(
      (t) => t.text === prefill.text && t.createdAt === prefill.createdAt
    );
    tempArray[todoIndex] = {
      completed: false,
      createdAt: new Date(),
      index: 0,
      tags: tagList,
      text: todoText,
    };

    updateTodos([...tempArray]);
    setTags([]);
    setTodoText("");
    setIsOpen(false);
  };

  return (
    <div className="mx-auto w-full sm:w-2/3 md:w-2/4 lg:w-1/3 py-4 px-2 sm:px-8 bg-white shadow-lg rounded-lg my-6 border border-gray-300">
      <div className="flex justify-between">
        <h2 className="text-center font-bold mb-2">Add Todo</h2>
        <XLg className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
      <textarea
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter some text"
      />

      <div className="my-6">
        <TagsInput
          tagError={tagError}
          setTagError={setTagError}
          tagList={tagList}
          setTags={setTags}
        />
      </div>

      <div>
        <div className="flex justify-between">
          <div></div>
          <button
            onClick={prefill ? editTodo : createTodo}
            className="bg-black text-white hover:text-black hover:bg-white transition border border-transparent hover:border-black px-4 py-2 text-center font-semibold justify-center space-x-2 rounded"
          >
            <span>{`${prefill ? "Update" : "Create"}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
