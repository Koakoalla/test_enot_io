import { useContext, useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ModalWindow from "./components/ModalWindow";
import styles from "./Todo.module.scss";

import MyContext from "../../context/Context";
import TASKS from "../../constant/tasks";
import DayTasks from "./components/DayTasks";
import { Task } from "@/types/task.type";
import processData from "../../packages/date/processDate";
import Portal from "../../ui/Portal";
import useToggle from "../../hooks/useToggle";
import { actions } from "../../context/Provider";

const callbackSort = ([a]: [string, unknown], [b]: [string, unknown]) =>
  a.split(".")[1] > b.split(".")[1] ? 1 : -1;

const transformTasks = (tasksFn?: Task[]) => {
  if (!tasksFn) return {};

  return tasksFn.reduce((acc, item): { [key: string]: Task[] } => {
    if (acc[item.date]) {
      return { ...acc, [item.date]: [...acc[item.date], item] };
    }
    return { ...acc, [item.date]: [item] };
  }, {} as { [key: string]: Task[] });
};

function Todo() {
  const value = useContext(MyContext);
  const [isOpen, setIsOpen] = useToggle(false);
  const [days, setDays] = useState<[string, Task[]][]>([]);

  const { status } = useQuery(["tasks"], () => {
    actions?.addTasks(TASKS);
    return () => {};
  });

  useEffect(() => {
    const today = new Date();

    const transformedDays = transformTasks(value?.data?.tasks);
    const processedDays = Object.entries(transformedDays)
      .filter(([dateTask]) => {
        const isBeforeToday =
          today.getDate() - new Date(dateTask).getDate() <= 0;
        return isBeforeToday;
      })
      .sort(callbackSort)
      .map(([unprocessedDate, dayTasks]) => {
        const dayDate = new Date(unprocessedDate);
        const formateDate = processData(dayDate, today);
        const processedDay: [string, Task[]] = [formateDate, dayTasks];
        return processedDay;
      });

    setDays(processedDays);
  }, [status, value]);

  return (
    <>
      <header className={styles.todo__header}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">To Do</Typography>
          <IconButton onClick={setIsOpen}>
            <SettingsIcon className={styles.todo__setting} fontSize="medium"/>
          </IconButton>
        </Box>
      </header>

      <main className={styles.todo__main}>
        {status === "loading" && <CircularProgress />}

        {status === "success" && (
          <ul className={styles.todo__tasks}>
            {days.map(([dateTask, itemTasks], index) => (
              <li key={dateTask}>
                <Box marginBottom={4}>
                  <DayTasks
                    data={dateTask}
                    tasks={itemTasks}
                    isOpenDay={index === 0}
                  />
                </Box>
              </li>
            ))}
          </ul>
        )}

        {status === "error" && <span>Error</span>}

        {value && value.data && value?.data.news.isShow && (
          <div className={styles.todo__newsWrapper}>
            <p className={styles.todo__news}>{value?.data?.news.title}</p>
          </div>
        )}

        {isOpen && (
          <Portal>
            <ModalWindow isOpen={isOpen} toggleModal={setIsOpen} />
          </Portal>
        )}
      </main>
    </>
  );
}

export default Todo;
