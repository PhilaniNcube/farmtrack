import { db } from "@/lib/db";
import { crops } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getCachedFieldLocations } from "@/lib/queries/field-locations";
import { EditCrop } from "../../_components/edit-crop";
import { notFound } from "next/navigation";

interface EditCropPageProps {
  params: Promise<{
    team_id: string;
    crop_id: string;
  }>
}

export default async function EditCropPage({ params }: EditCropPageProps) {
  const { team_id, crop_id } = await params;
  
  // Get the crop data
  const cropResult = await db.select().from(crops).where(eq(crops.id, parseInt(crop_id))).limit(1);
  
  if (cropResult.length === 0) {
    return notFound();
  }
  
  const crop = cropResult[0];
  
  // Get field locations
  const fieldLocations = await getCachedFieldLocations(team_id);
  
  return (
    <div className="container p-6 max-w-4xl">
      <EditCrop crop={crop} fields={fieldLocations} />
    </div>
  );
}