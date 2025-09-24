import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Add video streaming route with HTTP range request support for iOS Safari
  app.get('/video/:filename', (req, res) => {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, '../client/public', filename);
    
    // Security check - only allow video files
    if (!filename.match(/\.(mp4|webm|mov)$/i)) {
      return res.status(404).send('File not found');
    }
    
    // Check if file exists
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video not found');
    }
    
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Handle range requests (required for iOS Safari)
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': filename.endsWith('.webm') ? 'video/webm' : 'video/mp4',
        'Cache-Control': 'public, max-age=31536000',
      };
      
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // No range request - serve full file
      const head = {
        'Content-Length': fileSize,
        'Content-Type': filename.endsWith('.webm') ? 'video/webm' : 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000',
      };
      
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
