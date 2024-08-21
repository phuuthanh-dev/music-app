import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req['file']) {
        const result = await uploadToCloudinary(req['file'].buffer);

        req.body[req['file'].fieldname] = result;
    }
    next();
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const key in req["files"]) {
        const links = [];
        for (const item of req["files"][key]) {
            try {
                const link = await uploadToCloudinary(item.buffer);
                links.push(link);
            } catch (error) {
                console.log(error);
            }
        }
        req.body[key] = links;
    }
    next();
}