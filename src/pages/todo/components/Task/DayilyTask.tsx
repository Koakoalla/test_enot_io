import { memo } from "react";
import { Typography, Box } from "@mui/material";
import classNames from "classnames";
import Toggler from "../../../../ui/Custom/Toggler/CustomToggler";
import { actions } from "../../../../context/Provider";
import styles from "./DayilyTask.module.scss";
import { Task } from "@/types/task.type";

type DayilyTasksType = Task;

function DayilyTask({
  id,
  title,
  description,
  level,
  isDone,
}: DayilyTasksType) {
  const handleToggleTask = () => {
    actions?.toggleTask(id);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap={1}>
        <button
          aria-label="Change status"
          type="button"
          className={classNames(styles.dayilyTask__level, {
            [styles.dayilyTask__level_extra]: level === "extra",
            [styles.dayilyTask__level_hard]: level === "hard",
            [styles.dayilyTask__level_light]: level === "light",
          })}
        />
        <div>
          <Typography
            className={classNames(styles.dayilyTask__title, {
              [styles.dayilyTask__title_completed]: isDone,
            })}
            variant="h5"
            title={title}
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            className={styles.dayilyTask__description}
            variant="subtitle2"
            title={description}
            fontWeight={600}
          >
            {description}
          </Typography>
        </div>
      </Box>
      <Toggler checked={isDone} onChange={handleToggleTask} />
    </Box>
  );
}

export default memo(DayilyTask);
