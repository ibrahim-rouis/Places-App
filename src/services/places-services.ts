import { createPlaceSchema, imageFilesListSchema } from '@/schemas/Place';
import { z } from 'zod';
import { db, storage } from './firebase-services';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type PlaceFormData = z.infer<typeof createPlaceSchema>;
type ImageFilesList = z.infer<typeof imageFilesListSchema>;

export const uploadImages = async (
  placeID: string,
  imageFiles: ImageFilesList,
): Promise<void> => {
  const storageRef = ref(storage, placeID);
  const urls: Array<string> = [];
  for (const file of imageFiles) {
    try {
      const imageFileRef = ref(storageRef, file.name);
      await uploadBytes(imageFileRef, file);
      const url = await getDownloadURL(imageFileRef);
      urls.push(url);
    } catch (e) {
      console.error(`Failed to upload file ${file.name}. Reason: ${e}`);
    }
  }

  // Add urls to images field of doc with PlaceID id
  await updateDoc(doc(collection(db, 'places'), placeID), { images: urls });
};

export const createPlace = async (place: PlaceFormData) => {
  const doc = await addDoc(collection(db, 'places'), {
    title: place.title,
    description: place.description,
    location: place.location,
    createdAt: serverTimestamp(),
    updatedAt: null,
  });
  await uploadImages(doc.id, place.images);
};
