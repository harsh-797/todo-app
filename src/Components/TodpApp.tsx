import React from "react";

import Navigation from "./Navigation";
import EditorPane from "./EditorPane";

import { useTodo } from "../utils/useTodo";
import { getProjectsList, getCurrentProject } from "../utils";

export default function TodoApp() {
  const {
    todoAppState,
    handleChange: onSideNavigationChange,
    handleClick: onEditorPaneChange,
  } = useTodo();

  const projectsList = getProjectsList(todoAppState.todoList);
  const project = getCurrentProject(
    todoAppState.todoList,
    todoAppState.currentProjectId
  );

  return (
    <div className="todo-app">
      <Navigation
        projectsList={projectsList}
        currentProjectId={todoAppState.currentProjectId}
        onSideNavigationChange={onSideNavigationChange}
      />
      <EditorPane
        activeProjectId={todoAppState.currentProjectId}
        activeProject={project}
        onEditorPaneChange={onEditorPaneChange}
      />
    </div>
  );
}
