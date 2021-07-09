const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname,'..','..','uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,path.resolve(__dirname,'..','..','uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(8,(err, hash) => {

                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,fileName);

            })
        }
    }),
    limits: {
        fileSize: 3*1024*1024
    },
    fileFilter: (req, file, cb) => {

        const allowedMimes =  [
            'image/jpeg',
            'image/png'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error('Tipo de imagem não aceita.'))
        }
    }
}