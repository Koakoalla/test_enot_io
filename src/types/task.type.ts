export type Task = {
  id: number;
  date: string;
  title: string;
  description: string;
  level: "light" | "hard" | "extra";
  isDone: boolean;
};
