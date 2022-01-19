import useStorage from "../hooks/useStorage";
import { TodoDataManager, TodoItemData } from "../types/todo";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Modal from "react-modal";
import { ChangeEvent, useState } from "react";
import { PlusLg, XLg } from "react-bootstrap-icons";
import { Tabs, TabList, TabPanel, Tab, resetIdCounter } from "react-tabs";

const customStyles = {
  overlay: {
    inset: "none",
    padding: "none",
  },
  content: {
    marginLeft: "auto",
    marginRight: "auto",
    // width: "50%",
    // height: "fit-content",
    // display: "grid",
    // placeContent: "center",
    backgroundColor: "transparent",
    inset: "none",
  },
};

export default function TodoList() {
  // This is done according to https://github.com/reactjs/react-tabs#resetidcounter-void
  resetIdCounter();

  const { getItem, setItem } = useStorage();

  const maybeManager = getItem<TodoDataManager>("manager", "local");
  const manager =
    maybeManager && typeof maybeManager !== "string"
      ? maybeManager
      : {
          deleted: [],
          tags: new Set([]),
          todos: [],
        };

  const [todos, setTodos] = useState(manager.todos);

  const updateTodos = (todos: TodoItemData[]) => {
    manager.todos = todos;
    setItem("manager", manager);
    setTodos([...todos]);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);
  const activeTabCSS = "border-b-2 border-black text-black";

  const [customFilter, setCustomFilter] = useState("");

  const [prefill, setPrefill] = useState<TodoItemData | null>(null);

  const openModal = (prefill: TodoItemData | null = null) => {
    setPrefill(prefill);
    setIsOpen(true);
  };

  const closeModal = () => {
    setPrefill(null);
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        className="p-0"
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Add Todo modal"
      >
        <TodoForm
          prefill={prefill}
          todos={todos}
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          updateTodos={updateTodos}
        />
      </Modal>

      <Tabs
        defaultFocus={true}
        selectedIndex={currentTab}
        onSelect={(i) => setCurrentTab(i)}
      >
        <TabList
          className="flex text-gray-500 mx-auto md:max-w-md lg:max-w-lg justify-center border-b border-gray-200 "
          aria-label="Tabs"
        >
          <Tab
            className={`mr-6 cursor-pointer ${
              currentTab === 0 ? activeTabCSS : ""
            }`}
          >
            Active
          </Tab>
          <Tab
            className={`cursor-pointer ${currentTab === 1 ? activeTabCSS : ""}`}
          >
            Completed
          </Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-flow-row sm:grid-flow-col sm:justify-between mt-2  mx-auto md:max-w-md lg:max-w-lg py-4 rounded-lg my-6 ">
            <div className="relative text-lg bg-transparent text-gray-800 flex items-center h-full">
              <input
                value={customFilter}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCustomFilter(e.target.value)
                }
                className="w-full appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Filter by tag"
              />
              <button
                onClick={() => setCustomFilter("")}
                title="Clear tag filter"
                aria-label="Clear tag filter"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <XLg className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setPrefill(null);
                setIsOpen(true);
              }}
              className="mt-4 sm:mt-0 w-full bg-black text-white hover:text-black hover:bg-white transition border border-transparent hover:border-black px-3 py-2 font-semibold  inline-flex items-center space-x-2 rounded"
            >
              <PlusLg className="w-5 h-5 mr-1 fill-current" />
              Add Todo
            </button>
          </div>
          {todos.filter(({ completed }) => !completed).length === 0 ? (
            <div className="text-center">
              <span className="text-6xl">🎉</span>
              <h4 className="text-xl font-semibold mt-2">Congrats!</h4>
              <h4 className="text-xl font-semibold mt-2">
                You are all caught up.
              </h4>
            </div>
          ) : (
            todos
              .filter(({ completed }) => !completed)
              .filter((t) => t.tags.find((t) => t.includes(customFilter)))
              .map((todoItem, i) => (
                <TodoItem
                  todos={todos}
                  closeModal={closeModal}
                  openModal={openModal}
                  todoItem={todoItem}
                  updateTodos={updateTodos}
                  setCustomFilter={setCustomFilter}
                  key={i}
                />
              ))
          )}
        </TabPanel>

        <TabPanel>
          {todos
            .filter(({ completed }) => completed)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((todoItem, i) => (
              <TodoItem
                todos={todos}
                closeModal={closeModal}
                openModal={openModal}
                todoItem={todoItem}
                updateTodos={updateTodos}
                setCustomFilter={setCustomFilter}
                key={i}
              />
            ))}
        </TabPanel>
      </Tabs>
    </div>
  );
}
