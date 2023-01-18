import { createContext } from "react";
import { Data } from "@/types/data.type";

const MyContext = createContext<{ data: Data | null } | null>(null);

export default MyContext;
