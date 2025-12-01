import fs from "fs";
import path from "path";

export const removeFile = async (filename: string) => {
  try {
    if (!filename) return;
    const filePath = path.join(__dirname, "../public/files", filename);
    if (fs.existsSync(filePath)) {
      await fs.unlinkSync(filePath);
    } else {
      console.log(`File not found: ${filename}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
};

export const removeFiles = async (filenames: string[]) => {
  if (!Array.isArray(filenames)) return;
  for (const filename of filenames) {
    try {
      if (!filename) continue;
      const filePath = path.join(__dirname, "../public/files", filename);
      if (fs.existsSync(filePath)) {
        await fs.unlinkSync(filePath);
      } else {
        console.log(`File not found: ${filename}`);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error}`);
    }
  }
};
