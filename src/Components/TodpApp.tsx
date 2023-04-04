import React from "react";

import Navigation from "./Navigation";
import EditorPane from "./EditorPane";

import { useTodo } from "../utils/useTodo";
import { getProjectsList, getCurrentProject } from "../utils";

export default function TodoApp() {
  const {
    todoAppState,
    handleClick: onSideNavigationChange,
    handleChange: onEditorPaneChange,
  } = useTodo();

  const projectsList = getProjectsList(todoAppState.todoList);
  const project = getCurrentProject(
    todoAppState.todoList,
    todoAppState.activeProjectId
  );

  return (
    <div className="todo-app">
      <Navigation
        projectsList={projectsList}
        activeProjectId={todoAppState.activeProjectId}
        onSideNavigationChange={onSideNavigationChange}
      />
      <EditorPane
        activeProjectId={todoAppState.activeProjectId}
        activeProject={project}
        onEditorPaneChange={onEditorPaneChange}
      />
    </div>
  );
}
