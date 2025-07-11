import { createPlaceSchema, imageFilesListSchema } from '@/schemas/Place';
import { z } from 'zod';
import { db, storage } from './firebase-services';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

type PlaceData = z.infer<typeof createPlaceSchema>;
type ImageFilesList = z.infer<typeof imageFilesListSchema>;

export const uploadImages = async (
  placeID: string,
  imageFiles: ImageFilesList,
): Promise<void> => {
  const storageRef = ref(storage, placeID);
  for (const file of imageFiles) {
    try {
      const imageFileRef = ref(storageRef, file.name);
      await uploadBytes(imageFileRef, file);
    } catch (e) {
      console.error(`Failed to upload file ${file.name}. Reason: ${e}`);
    }
  }
};

export const createPlace = async (place: PlaceData) => {
  const doc = await addDoc(collection(db, 'places'), {
    title: place.title,
    description: place.description,
    location: place.location,
  });
  await uploadImages(doc.id, place.images);
};
