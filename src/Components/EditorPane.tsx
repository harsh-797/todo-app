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
      {/* <EditableHeader
        key={activeProjectId}
        background="light"
        size="large"
        editable={true}
        onChange={onEditorPaneChange}
      >
        {activeProject.projectTitle}
      </EditableHeader> */}

      <input
        style={{ cursor: "pointer", width: "80%", textOverflow: "ellipsis" }}
        className={`large-heading light-background-heading`}
        onChange={(event) =>
          onEditorPaneChange("edit-title", event.target.value)
        }
        value={activeProject.projectTitle}
      ></input>

      <section className="tasks-wrapper">
        <div className="add-item-of-type">
          {/* <EditableHeader background="light" size="small" editable={false}>
            Tasks
          </EditableHeader> */}
          <h3 className={`small-heading light-background-heading`}>Tasks</h3>
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
          {Object.keys(activeProject.tasks).map((taskId) => {
            if (Number(taskId) !== Object.keys(activeProject.tasks).length) {
              return (
                // <div>
                <li key={taskId}>
                  <Task
                    taskId={taskId}
                    taskDetails={activeProject.tasks[taskId]}
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
                  taskDetails={activeProject.tasks[taskId]}
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
