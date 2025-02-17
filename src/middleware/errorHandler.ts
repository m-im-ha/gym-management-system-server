import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils/types';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const error: ErrorResponse = {
        success: false,
        message: err.message || 'Internal Server Error',
        errorDetails: err.errorDetails
    };

    res.status(err.statusCode || 500).json(error);
};
