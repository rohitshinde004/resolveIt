import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
    next();
};

export default logger;