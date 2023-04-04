import React from "react";
import { Add } from "@mui/icons-material";

import EditableHeader from "./EditableHeader";
import Button from "./Button";
import Task from "./Task";

import { EditorPaneProps } from "../utils/types";

export default function EditorPane({
  activeProjectId,
  activeProject,
  onEditorPaneChange,
}: EditorPaneProps) {
  const lastElement = React.useRef(null);

  return (
    <div className="main">
      <EditableHeader
        key={projectId}
        background="light"
        size="large"
        editable={true}
        onChange={onEditorPaneChange}
      >
        {project.projectTitle}
      </EditableHeader>

      <section className="tasks-wrapper">
        <div className="add-item-of-type">
          <EditableHeader background="light" size="small" editable={false}>
            Tasks
          </EditableHeader>
          <Button
            variant="secondary-button"
            size="medium"
            onClick={(e) => {
              onEditorPaneChange("add-task", "new task");
              if (lastElement.current)
                (lastElement.current as HTMLDivElement).scrollIntoView();
            }}
          >
            <Add fontSize="small" />
          </Button>
        </div>
        <ul className="tasks-list">
          {Object.keys(project.tasks).map((taskId) => {
            if (Number(taskId) !== Object.keys(project.tasks).length) {
              return (
                // <div>
                <li key={taskId}>
                  <Task
                    taskId={taskId}
                    taskDetails={project.tasks[taskId]}
                    onEditorPaneChange={onEditorPaneChange}
                  />
                  <div className="line-to-separate"></div>
                </li>
                // </div>
              );
            }
            return (
              <li key={taskId}>
                <Task
                  taskId={taskId}
                  taskDetails={project.tasks[taskId]}
                  onEditorPaneChange={onEditorPaneChange}
                />
              </li>
            );
          })}
          <div style={{ height: "60px" }}></div>
          <div ref={lastElement}></div>
        </ul>
      </section>
    </div>
  );
}
