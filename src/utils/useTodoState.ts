import React from "react";
import update from "immutability-helper";

import { TodoList, Project, TaskType } from "./types";
import { sample } from "./sampleData";

function useTodoState() {
  const [todoList, setTodoList] =
    React.useState<TodoList>
      (() => {
        const cache = JSON.parse(localStorage.getItem("todoList") ?? "{}")
        if (Object.keys(cache).length)
          return cache
        else
          return sample
      });
  const [activeProjectId, setActiveProjectId] = React.useState<string>("1");

  const todoListLength = React.useRef(0)
  todoListLength.current = Object.keys(todoList).length

  // const activeProjectIdClone = React.useRef(null)
  // activeProjectIdClone.current = activeProjectId

  const todoAppState = React.useMemo(() => ({
    activeProjectId,
    todoList
  }), [activeProjectId, todoList])


  const handleClick = React.useCallback(
    (action: string, payload?: string) => {
      switch (action) {
        case "add-new-project":
          const mutateTodoList = (list: TodoList) => {
            const newProjectId = Object.keys(list).length + 1;
            const newProject: Project = {
              projectTitle: `New Project ${newProjectId}`,
              tasks: {},
            };
            const newTodoList = update(list, {
              $merge: { [newProjectId]: newProject },
            });
            return newTodoList
          }
          setTodoList(mutateTodoList);

          setActiveProjectId(String(todoListLength.current + 1));
          return;
        case "set-current-project":
          if (payload !== undefined) {
            setActiveProjectId(payload);
          }
          return;
      }
    },
    []
  );

  const handleChange = React.useCallback(
    (action: string, payload: string | { taskId: string; task: TaskType }) => {

      switch (action) {
        case "edit-title":
          if (typeof payload === "string") {
            const mutateTodoList = (list: TodoList) => {
              const newTodoList = update(list, {
                [activeProjectId]: { projectTitle: { $set: payload } },
              });
              return newTodoList
            }
            setTodoList(mutateTodoList);
          }
          return;
        case "change-status":
          if (typeof payload === "string") {
            const mutateTodoList = (list: TodoList) => {
              const currentStatus =
                list[activeProjectId].tasks[payload].status;
              const newStatus =
                currentStatus === "inProgress" || currentStatus === "overdue"
                  ? "completed"
                  : "inProgress";

              const newTodoList = update(list, {
                [activeProjectId]: {
                  tasks: {
                    [payload]: { status: { $set: newStatus } },
                  },
                },
              });
              return newTodoList
            }
            setTodoList(mutateTodoList);
          }
          return;
        case "add-task":
          if (typeof payload === "string") {
            const mutateTodoList = (list: TodoList) => {
              const newTask = {
                [Object.keys(list[activeProjectId].tasks).length + 1]: {
                  title: payload,
                  description: "Add description",
                  due: new Date(),
                  status: "inProgress",
                },
              };
              const newTodoList = update(list, {
                [activeProjectId]: {
                  tasks: {
                    $merge: { ...newTask },
                  },
                },
              });
              return newTodoList
            }
            setTodoList(mutateTodoList);
          }
          return;
        case "edit-task-details":
          if (typeof payload !== "string") {
            const mutateTodoList = (list: TodoList) => {
              const newTodoList = update(list, {
                [activeProjectId]: {
                  tasks: {
                    [payload.taskId]: { $apply: (arg) => payload.task },
                  },
                },
              });
              return newTodoList
            }
            setTodoList(mutateTodoList);
          }
          return;
      }
    },
    [activeProjectId]
  );

  React.useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }, 2000);
    return () => {
      clearTimeout(id)
    };
  }, [todoList]);


  return { todoAppState, handleChange, handleClick }
}

export { useTodoState }
