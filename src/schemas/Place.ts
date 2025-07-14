import { Timestamp } from 'firebase/firestore';
import z from 'zod';

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const titleSchema = z
  .string()
  .min(2, 'Title must be at least 2 characters long')
  .max(45, 'Title must not exceed 45 characters long');

const descriptionSchema = z
  .string()
  .min(10, 'Description must be at least 10 characters long')
  .max(1024, 'Description must not exceed 1024 characters long');

const locationSchema = z
  .string()
  .min(2, 'Location must be at least 2 characters long')
  .max(35, 'Location must not exceed 35 characters long');

export const imageFilesListSchema = z
  .any()
  .transform((val) =>
    val ? (Array.isArray(val) ? val : Array.from(val as FileList)) : [],
  )
  .pipe(
    z
      .array(
        z
          .instanceof(File)
          .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            `Max image size is 5MB.`,
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.',
          )
          // https://firebase.google.com/docs/storage/web/create-reference#limitations_on_references
          .refine(
            (file) => file?.name.length < 1024,
            'File name must not exceed 1024 characters',
          ),
      )
      .min(1, 'You have to upload at least one image')
      .max(5, 'You can upload up to 5 images only'),
  );

const imagesUrlsSchema = z.array(z.string());
const timeStampSchema = z.instanceof(Timestamp);
const createdAtSchema = timeStampSchema;
const updatedAtSchema = timeStampSchema.nullable();
const createdBySchema = z.string();
const placeIdSchema = z.string();

export const createPlaceSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  location: locationSchema,
  images: imageFilesListSchema,
});

export const placeDataSchema = z.object({
  id: placeIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  location: locationSchema,
  images: imagesUrlsSchema,
  createdBy: createdBySchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  avgRating: z.number().nullable().optional(),
  uniqueVisits: z.number().int().nullable().optional(),
});

export type Place = z.infer<typeof placeDataSchema>;
export type SortType = 'NEW' | 'TOP' | 'POPULAR';
