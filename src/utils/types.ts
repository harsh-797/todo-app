export type TaskType = {
    title: string;
    description: string;
    due?: string;
    status: "inProgress" | "overdue" | "completed";
};

export type Tasks = {
    [k: string]: TaskType;
};

export type Project = {
    projectTitle: string;
    tasks: Tasks;
};

export type TodoList = {
    [k: string]: Project;
};

export type ProjectsList = {
    projectId: string,
    projectTitle: string
}[]

export type NavigationProps = {
    projectsList: ProjectsList,
    activeProjectId: string,
    onSideNavigationChange: (action: string, payload?: string) => void
};

export type EditorPaneProps = {
    activeProjectId: string,
    activeProject: Project,
    onEditorPaneChange: (action: string, payload: string | { taskId: string; task: TaskType }) => void
}

export type EditableHeaderProps = {
    children: React.ReactNode,
    customColor?: string,
    size: string,
    background?: string,
    editable: boolean,
    onChange?: (action: string, payload: string) => void
}

export type ButtonProps = {
    variant: 'primary-button' | 'secondary-button',
    size: 'large' | 'medium' | 'small',
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode,
    type?: "button" | "submit" | "reset" | undefined
}

export type TaskProps = {
    taskId: string,
    taskDetails: TaskType,
    onEditorPaneChange: (action: string, payload: string | { taskId: string; task: TaskType }) => void
}
