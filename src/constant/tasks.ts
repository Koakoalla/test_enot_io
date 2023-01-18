import { Task } from "@/types/task.type";

const LEVEL = ["light", "hard", "extra"] as const;
const TITLE = ["Maks's Dinner", "Call Sara", "Meet Damon", "Write to Olya", "Meet Katya's teacher", "Fix Dad's IPAD"] as const;
const DESCRIPTION = ["Add to Apple Wallet", "Write it in the notebook", "+6577398989"];



const getRandomNumber = (max: number) => Math.floor(Math.random() * max);
const today = new Date();
let day = today.getDate() - 1;
const month = today.getMonth() + 1;


const TASKS : Task[] = Array.from(Array(10).keys()).map((item) => {
  if (item % 3 === 0) {
    day += 1;
  }

  return {
    id: item,
    date: `${month}.${day}.${today.getFullYear()}`,
    title: TITLE[getRandomNumber(6)],
    description: DESCRIPTION[getRandomNumber(3)],
    level: LEVEL[getRandomNumber(3)],
    isDone:getRandomNumber(2) === 0,
  };
});

export default TASKS;
