import __dirname from "./index.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'img';
        if (file.fieldname && file.fieldname.toLowerCase().includes('document')) {
            folder = 'documents';
        } else if (file.fieldname && file.fieldname.toLowerCase().includes('image')) {
            folder = 'img';
        }

        const dest = path.join(__dirname, '..', 'public', folder);
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({ storage })

export default uploader;