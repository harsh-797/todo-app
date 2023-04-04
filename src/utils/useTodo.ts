import React from "react";
import update from "immutability-helper";

import { TodoList, Project, TaskType } from "./types";
import { sample } from "./sampleData";

function useTodo() {
  const [todoList, setTodoList] =
    React.useState<
      TodoList>
      (() => {
        const cache = JSON.parse(localStorage.getItem("todoList") ?? "{}")
        if (Object.keys(cache).length)
          return cache
        else
          return sample
      });
  const [currentProjectId, setCurrentProjectId] = React.useState<string>("1");

  const todoAppState = React.useMemo(() => ({
    currentProjectId,
    todoList
  }), [currentProjectId, todoList])


  const handleClick = React.useCallback(
    (action: string, payload?: string) => {
      switch (action) {
        case "add-new-project":
          const newProjectId = Object.keys(todoList).length + 1;
          const newProject: Project = {
            projectTitle: `New Project ${newProjectId}`,
            tasks: {},
          };
          const newTodoList = update(todoList, {
            $merge: { [newProjectId]: newProject },
          });
          setTodoList(newTodoList);
          setCurrentProjectId(String(newProjectId));
          return;
        case "set-current-project":
          if (payload !== undefined) {
            setCurrentProjectId(payload);
          }
          return;
      }
    },
    [todoList]
  );

  const handleChange = React.useCallback(
    (action: string, payload: string | { taskId: string; task: TaskType }) => {
      let newTodoList;
      switch (action) {
        case "edit-title":
          if (typeof payload === "string") {
            newTodoList = update(todoList, {
              [currentProjectId]: { projectTitle: { $set: payload } },
            });
            setTodoList(newTodoList);
          }
          return;
        case "change-status":
          if (typeof payload === "string") {
            const currentStatus =
              todoList[currentProjectId].tasks[payload].status;
            const newStatus =
              currentStatus === "inProgress" || currentStatus === "overdue"
                ? "completed"
                : "inProgress";

            newTodoList = update(todoList, {
              [currentProjectId]: {
                tasks: {
                  [payload]: { status: { $set: newStatus } },
                },
              },
            });
            setTodoList(newTodoList);
          }
          return;
        case "add-task":
          if (typeof payload === "string") {
            const newTask = {
              [Object.keys(todoList[currentProjectId].tasks).length + 1]: {
                title: payload,
                description: "Add description",
                due: new Date(),
                status: "inProgress",
              },
            };
            newTodoList = update(todoList, {
              [currentProjectId]: {
                tasks: {
                  $merge: { ...newTask },
                },
              },
            });
            setTodoList(newTodoList);
          }
          return;
        case "edit-task-details":
          if (typeof payload !== "string") {
            newTodoList = update(todoList, {
              [currentProjectId]: {
                tasks: {
                  [payload.taskId]: { $apply: (arg) => payload.task },
                },
              },
            });
            setTodoList(newTodoList);
          }
          return;
      }
    },
    [currentProjectId, todoList]
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

export { useTodo }
