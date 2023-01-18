import processDate from "./processDate";

let today: Date;
let tomorrow: Date;
let randomDay: Date;

beforeAll(() => {
  today = new Date();
  tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  randomDay = new Date("8.9.1998");
});

test("processDate", () => {
  expect(processDate(today, today)).toMatch("Today");
  expect(processDate(tomorrow, today)).toMatch("Tomorrow");
  expect(processDate(randomDay, today)).toMatch("9/08");
});
