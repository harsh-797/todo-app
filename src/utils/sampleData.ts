import { TodoList } from "./types";

const sample: TodoList = {
  1: {
    projectTitle: "Discovery",
    tasks: {
      1: {
        title: "Setup Github Repository",
        description:
          "Need to setup a new github repo to ensure an microservice architecture",
        due: "12/04/2023",
        status: "inProgress",
      },
      2: {
        title: "Setup server on Heroku",
        description:
          "It's my first time setting up an Heroku Server, may take some time and extra help",
        due: "12/04/2023",
        status: "completed",
      },
      3: {
        title: "Write basic server that authenticates user",
        description: "Have done this many times, should be quick and easy",
        due: "12/04/2023",
        status: "completed",
      },
    },
  },
  2: {
    projectTitle: "Problems",
    tasks: {
      1: {
        title: "Fix Issue #11221",
        description: "No idea yet - need to read code",
        status: "completed",
      },
    },
  },
};

export { sample };
