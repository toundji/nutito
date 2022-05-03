/* eslint-disable prettier/prettier */
import { extname } from "path";
import { diskStorage } from 'multer';
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const getMulterOptions = () => {
    const options: MulterOptions = {
        storage: diskStorage({
            destination: "public/uploads",
            filename: editFileName
        }),
        fileFilter: fileFilter
    }
    return options;
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString())
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
}

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|docx)$/)) {
        req.fileValidationError = 'Mimetype not allowed';
        return callback(null, false, new Error("The extension of the file you uploaded is not allowed ! Double check your file"));
    }
    callback(null, true);
}
