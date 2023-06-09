import React from "react";
import { BuildCircle, Add } from "@mui/icons-material";

import Button from "./Button";
import EditableHeader from "./EditableHeader";

import { NavigationProps } from "../utils/types";

export default function Navigation({
  projectsList,
  activeProjectId,
  onSideNavigationChange,
}: NavigationProps) {
  const lastElement = React.useRef(null);

  React.useEffect(() => {
    document.querySelector(`.selected`)?.classList.remove("selected");
    document
      .querySelector(`.project-${activeProjectId}`)
      ?.classList.add("selected");
  }, [activeProjectId]);

  return (
    <div className="navigation">
      <h1 className={`large-heading dark-background-heading`}>Todo</h1>
      {/* <EditableHeader background="dark" size="large" editable={false}>
        Todo
      </EditableHeader> */}
      <section className="projects">
        <div className="wrapper">
          <div className="add-item-of-type">
            {/* <EditableHeader customColor="#717ecc" size="small" editable={false}>
              Projects
            </EditableHeader> */}
            <h3
              style={{
                color: "#717ecc",
              }}
              className={`small-heading`}
            >
              Projects
            </h3>
            <Button
              variant="primary-button"
              size="medium"
              onClick={() => {
                onSideNavigationChange("add-new-project");
                const currentSelected = document.querySelector(
                  `.project-${activeProjectId}`
                );
                currentSelected?.scrollIntoView({
                  behavior: "smooth",
                });
                if (lastElement.current)
                  (lastElement.current as HTMLDivElement).scrollIntoView();
              }}
            >
              <Add fontSize="small" />
            </Button>
          </div>
        </div>
        <ul className="projects-list">
          {projectsList.map((each) => {
            return (
              <li
                tabIndex={1}
                className={`each-project project-${each.projectId}`}
                key={each.projectId}
                onClick={(event) => {
                  onSideNavigationChange("set-current-project", each.projectId);
                }}
              >
                {/* <span className="project-icon"> */}
                <BuildCircle />
                {/* </span> */}
                <span className="project-text">{each.projectTitle}</span>
              </li>
            );
          })}
          <div></div>
          <div ref={lastElement}></div>
        </ul>
      </section>
    </div>
  );
}
