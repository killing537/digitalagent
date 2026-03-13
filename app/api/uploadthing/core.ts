import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  productUploader: f({
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "128MB" }, // Sesuaikan ukuran video kamu
  })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;