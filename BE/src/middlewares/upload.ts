import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { NextFunction, Response, Request } from 'express';

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to compress and save images
const compressAndSaveImage = async (req: any, res: Response, next: NextFunction) => {
  if (!req.file) {
    console.log('No file uploaded');
    return next(); // No file uploaded, proceed to the next middleware
  }

  try {
    const uploadsDir = path.join(__dirname, '../../uploads');

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const compressedImagePath = path.join(
      uploadsDir,
      `${Date.now()}-${req.file.originalname}`
    );

    // Compress the image using sharp
    await sharp(req.file.buffer)
      .resize(800) // Resize to a width of 800px (adjust as needed)
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(compressedImagePath);

    // Replace the file buffer with the path to the compressed image
    req.file.path = compressedImagePath;

    // Preserve the buffer for further processing
    req.file.buffer = await sharp(req.file.buffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();

    // Schedule the deletion of the temporary file after the response is sent
    res.on('finish', () => {
      fs.unlink(compressedImagePath, (err) => {
        if (err) {
          console.error('Error deleting temporary image:', err);
        }
      });
    });

    next();
  } catch (error) {
    console.error('Error compressing image:', error);
    res.status(500).send('Error processing image');
  }
};

export { upload, compressAndSaveImage };