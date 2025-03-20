// filepath: c:\Users\User\Documents\Development\farmtrack\lib\schema\index.ts

import { users } from "./users";
import { tasks } from "./tasks";
import { livestock } from "./livestock";
import { inventory } from "./inventory";
import { finances } from "./finances";
import { crops } from "./crops";
import { activities } from "./activities";

export const schema = {
  users,
  tasks,
  livestock,
  inventory,
  finances,
  crops,
  activities,
};

export * from "./users";
export * from "./tasks";
export * from "./livestock";
export * from "./inventory";
export * from "./finances";
export * from "./crops";
export * from "./activities";