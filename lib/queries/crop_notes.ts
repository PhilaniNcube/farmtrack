import { db } from "../db"

export async function getCropNotesByCropId(cropId: number) {
  const cropNotes = await db.query.crop_notes.findMany({
    where: (crop_notes, { eq }) => eq(crop_notes.crop_id, cropId),
    orderBy: (crop_notes, { desc }) => [desc(crop_notes.created_date)],
  })
  return cropNotes
}

export async function getCropNoteById(id: number) {
  const cropNote = await db.query.crop_notes.findFirst({
    where: (crop_notes, { eq }) => eq(crop_notes.id, id),
  })
  return cropNote
}