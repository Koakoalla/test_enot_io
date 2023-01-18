import { memo } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import classNames from "classnames";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Task } from "@/types/task.type";
import styles from "./DayTasks.module.scss";
import DayTask from "../Task";
import useToggle from "../../../../hooks/useToggle";

type DayTasksType = {
  data: string;
  tasks: Task[];
  isOpenDay: boolean;
};

function DayTasks({ data, tasks, isOpenDay = false }: DayTasksType) {
  const [isOpen, setIsOpen] = useToggle(isOpenDay);

  return (
    <div>
      {isOpen ? (
        <section>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
            marginBottom={2}
            marginLeft={2}
          >
            <CheckBoxIcon />
            <Typography variant="h6">{`${data} Tasks:`}</Typography>
            <Box marginLeft="auto" marginRight={2}>
              <IconButton onClick={setIsOpen}>
                <span className="visually-hidden">Скрыть </span>
                <ArrowCircleUpIcon className={styles.dayTasks__toggleIcon} />
              </IconButton>
            </Box>
          </Box>
          <div className={styles.dayTasks__item}>
            {tasks.map((task) => (
              <DayTask
                key={task.id}
                id={task.id}
                description={task.description}
                title={task.title}
                level={task.level}
                isDone={task.isDone}
                date={task.date}
              />
            ))}
          </div>
        </section>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={styles.dayTasks__item}
        >
          <Typography
            className={classNames(
              styles.dayTasks__itemTitle,
              styles.dayTasks__itemTitle_closed,
            )}
            variant="h6"
          >{`${data} Tasks`}</Typography>
          <IconButton onClick={setIsOpen}>
            <span className="visually-hidden">Раскрыть список</span>
            <ArrowDropDownCircleRoundedIcon
              className={styles.dayTasks__toggleIcon}
            />
          </IconButton>
        </Box>
      )}
    </div>
  );
}

export default memo(DayTasks);
