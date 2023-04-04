import React from "react";

import Navigation from "./Navigation";
import EditorPane from "./EditorPane";

import { useTodoState } from "../utils/useTodoState";
import { getProjectsList, getCurrentProject } from "../utils";

export default function TodoApp() {
  const {
    todoAppState,
    handleClick: onSideNavigationChange,
    handleChange: onEditorPaneChange,
  } = useTodoState();

  const projectsList = getProjectsList(todoAppState.todoList);
  const activeProject = getCurrentProject(
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
        activeProject={activeProject}
        onEditorPaneChange={onEditorPaneChange}
      />
    </div>
  );
}
