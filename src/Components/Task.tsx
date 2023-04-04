import React from "react";
import {
  ArrowDropUp,
  ArrowDropDown,
  PanoramaFishEye,
  CheckCircle,
} from "@mui/icons-material";

import Button from "./Button";

import { TaskProps, TaskType } from "../utils/types";

export default function Task({
  taskId,
  taskDetails,
  onEditorPaneChange,
}: TaskProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="content-parent">
      <section className="each-task-pane">
        <Button
          variant="primary-button"
          size="large"
          onClick={() => {
            onEditorPaneChange("change-status", taskId);
          }}
        >
          {taskDetails.status === "completed" ? (
            <CheckCircle fontSize="large" />
          ) : (
            <PanoramaFishEye fontSize="large" />
          )}
        </Button>
        <p>{taskDetails.title}</p>
        <span className="task-toggle-button">
          <Button
            variant="primary-button"
            size="small"
            onClick={(e) => setOpen(!open)}
          >
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
          </Button>
        </span>
      </section>
      {open && (
        <section className="each-task-details">
          <form
            className="task-details-form"
            onSubmit={(event: React.SyntheticEvent) => {
              event.preventDefault();
              let updatedTaskDetails: TaskType = { ...taskDetails };

              const arrElements = Object.entries(
                (event.target as HTMLFormElement).elements
              );
              console.log(arrElements);
              arrElements.forEach((e) => {
                if (Number(e[0]) >= 0) {
                  const key: keyof TaskType = (e[1] as HTMLInputElement)
                    .name as keyof TaskType;
                  if (key === "status")
                    updatedTaskDetails[key] = (e[1] as HTMLInputElement)
                      .value as TaskType["status"];
                  else
                    updatedTaskDetails[key] = (e[1] as HTMLInputElement).value;
                }
              });
              const payload: { taskId: string; task: TaskType } = {
                taskId: taskId,
                task: updatedTaskDetails,
              };
              onEditorPaneChange("edit-task-details", payload);
              setOpen(!open);
            }}
          >
            <span style={{ gridArea: "title" }}>
              <label htmlFor="title">Title: </label>
              <input id="title" name="title" defaultValue={taskDetails.title} />
            </span>

            <span style={{ gridArea: "description" }}>
              <label htmlFor="description">Description: </label>
              <textarea
                id="description"
                name="description"
                style={{ height: "80%", width: "90%" }}
                defaultValue={taskDetails.description}
              />
            </span>

            <span style={{ gridArea: "due" }}>
              <label htmlFor="due">Due: </label>
              <input
                id="due"
                name="due"
                type="date"
                defaultValue={String(taskDetails.due)}
              />
            </span>

            <span style={{ gridArea: "status" }}>
              <label htmlFor="status">Status: </label>
              <input
                id="status"
                name="status"
                value={taskDetails.status}
                disabled
              />
            </span>
            <span style={{ gridArea: "submit", margin: "auto" }}>
              <Button size="large" variant="secondary-button" type="submit">
                submit
              </Button>
              <br></br>
            </span>
          </form>
        </section>
      )}

      {/* {open && <section className="each-task-pane"></section>} */}
    </div>
  );
}
