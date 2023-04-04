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
            onSubmit={(event: React.SyntheticEvent) => {
              event.preventDefault();
              let updatedTaskDetails: TaskType = { ...taskDetails };

              const arrElements = Object.entries(
                (event.target as HTMLFormElement).elements
              );
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
            <label htmlFor="title">Title: </label>
            <br></br>
            <input id="title" name="title" defaultValue={taskDetails.title} />
            <br></br>
            <br></br>
            <label htmlFor="description">Description: </label>
            <br></br>
            <input
              id="description"
              name="description"
              defaultValue={taskDetails.description}
            />
            <br></br>
            <br></br>
            <label htmlFor="due">Due: </label>
            <br></br>
            <input id="due" name="due" defaultValue={String(taskDetails.due)} />
            <br></br>
            <br></br>
            <label htmlFor="status">Status: </label>
            <br></br>
            <input
              id="status"
              name="status"
              value={taskDetails.status}
              disabled
            />
            <br></br>
            <span>
              <Button size="large" variant="secondary-button" type="submit">
                submit
                {/* <Save fontSize="large" /> */}
              </Button>
            </span>
            <br></br>
          </form>
        </section>
      )}

      {/* {open && <section className="each-task-pane"></section>} */}
    </div>
  );
}
