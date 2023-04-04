import React from "react";
import { ModeEdit, Save } from "@mui/icons-material";
import Button from "./Button";

import { EditableHeaderProps } from "../utils/types";

export default function EditableHeader({
  children,
  customColor,
  size,
  background,
  editable,
  onChange,
}: EditableHeaderProps) {
  const [textInputActive, setTextInputActive] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const header = children?.toString();

  return (
    <div className="header">
      <input
        ref={inputRef}
        style={{ color: customColor }}
        className={`${size}-heading ${background}-background-heading`}
        size={header?.length}
        value={header}
        onChange={(event) =>
          onChange && onChange("edit-title", event.target.value)
        }
        disabled={textInputActive}
      />
      {editable && (
        <Button
          variant={
            background === "dark" ? "primary-button" : "secondary-button"
          }
          size="large"
          onClick={() => {
            if (inputRef.current !== null) {
              inputRef.current.focus();
            }
            setTextInputActive(!textInputActive);
          }}
        >
          {textInputActive ? <ModeEdit /> : <Save />}
        </Button>
      )}
    </div>
  );
}
