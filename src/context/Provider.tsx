import { useState } from "react";
import { Data } from "@/types/data.type";

import MyContext from "./Context";
import { Task } from "@/types/task.type";

type ProviderType = {
  children: React.ReactNode;
};

export let actions: {
  toggleTask: (id: number) => void;
  setNews: (title: string) => void;
  toggleNews: (isChecked?: boolean) => void;
  addTasks: (tasks: Task[]) => void;
} | null = null;

function Provider({ children }: ProviderType) {
  const [data, setData] = useState<Data | null>(null);

  actions = {
    toggleTask: (id: number) => {
      const selectedTaskIndex = data?.tasks.findIndex((task) => task.id === id);
      if (selectedTaskIndex === undefined || !data?.tasks) return;
      const selectedTask = data?.tasks[selectedTaskIndex];

      const newTasks = [...data.tasks];
      newTasks.splice(selectedTaskIndex, 1, {
        ...selectedTask,
        isDone: !selectedTask.isDone,
      });
      setData((prev) => {
        if (!prev) return null;

        return { ...prev, tasks: newTasks };
      });
    },
    setNews: (title: string) => {
      setData((prev) => {
        if (!prev) return null;

        return { ...prev, news: { ...prev?.news, title } };
      });
    },
    toggleNews: (isChecked) => {
      setData((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          news: {
            ...prev?.news,
            isShow: isChecked || !prev.news.isShow,
          },
        };
      });
    },
    addTasks: (tasks: Task[]) => {
      setData((prev) => ({
        tasks,
        news: prev ? prev.news : { isShow: false },
      }));
    },
  };
return (
    <MyContext.Provider value={{ data }}>{children}</MyContext.Provider>
  );
}

export default Provider;
