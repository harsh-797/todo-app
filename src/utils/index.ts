import { TodoList, ProjectsList } from "./types"

function getProjectsList(data: TodoList) {
  const projectList: ProjectsList = []
  for (let key in data) {
    projectList.push({
      projectId: key,
      projectTitle: data[key].projectTitle
    })
  }
  return projectList
}

function getCurrentProject(data: TodoList, currentItem: string) {
  return data[currentItem]
}

export { getProjectsList, getCurrentProject }