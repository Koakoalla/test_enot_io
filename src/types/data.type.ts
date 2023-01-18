import { Task } from "./task.type";

export type Data = {
  tasks: Task[];
  news: {
    title?: string;
    isShow: boolean;
  };
};
