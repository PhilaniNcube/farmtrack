import { db } from "../db";

export async function getCropActivities(cropId: number) {
  const cropActivities = await db.query.crop_activities.findMany({
    where: (crop_activities, { eq }) => eq(crop_activities.crop_id, cropId),
    orderBy: (crop_activities, { desc }) => [desc(crop_activities.scheduled_date)],
  });
  return cropActivities;
}

export async function getCropActivityById(activityId: number) {
  const cropActivity = await db.query.crop_activities.findFirst({
    where: (crop_activities, { eq }) => eq(crop_activities.id, activityId),
  });
  return cropActivity;
}


// get completed crop activities for a crop
export async function getCompletedCropActivities(cropId: number) {
  const completedActivities = await db.query.crop_activities.findMany({
    where: (crop_activities, { eq, and }) =>
      and(
        eq(crop_activities.crop_id, cropId),
        eq(crop_activities.status, "completed")
      ),
    orderBy: (crop_activities, { desc }) => [desc(crop_activities.completed_date)],
  });
  return completedActivities;
}