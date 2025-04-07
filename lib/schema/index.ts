// filepath: c:\Users\User\Documents\Development\farmtrack\lib\schema\index.ts

import { users } from "./users";
import { priorityEnum, statusEnum, tasks } from "./tasks";
import { livestock } from "./livestock";
import { inventory } from "./inventory";
import { finances } from "./finances";
import { crops } from "./crops";
import { activities } from "./activities";
import { farms } from "./farms";
import { farmMembers } from "./farm-members";
import { fieldLocations } from "./field-location";
import { teams } from "./teams";
import { activityTypeEnum, crop_activities } from "./crop_activities";
import { crop_notes } from "./crop_notes";

export const schema = {
  users,
  tasks,
  livestock,
  inventory,
  finances,
  crops,
  activities,
  farms,
  farmMembers,
  fieldLocations,
  teams,
  crop_activities,
  crop_notes,
  activityTypeEnum: activityTypeEnum,
  statusEnum: statusEnum,
  priorityEnum: priorityEnum,
};

export * from "./users";
export * from "./tasks";
export * from "./livestock";
export * from "./inventory";
export * from "./finances";
export * from "./crops";
export * from "./activities";
export * from "./crop_activities";
export * from "./farms";
export * from "./farm-members";
export * from "./field-location";
export * from "./teams";
export * from "./crop_notes";
