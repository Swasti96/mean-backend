const { v4: uuidv4 } = require('uuid');
const { uploadImage } = require('../helpers/uploadImage');
const path = require('path');
const fs = require('fs');

exports.fileUploader = (req, res) => {

    const { type, id } = req.params;

    const validTypes = ['users', 'hospitals', 'medics'];

    //Validate existing type
    if (!validTypes.includes(type)) {
        res.status(400).json({
            msg: 'Sorry,only works with this tables medics/hospitals/users'
        })
    }
    // Validate existing file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

    // Process image
    const { image } = req.files;
    const separetedName = image.name.split('.'); //Generates an array, whit this i cant take the extname in the last position 
    const extname = separetedName[separetedName.length - 1];
    const validExtname = ['jpg', 'jepg', 'png', 'gif'];

    if (!validExtname.includes(extname)) {
        return res.status(400).json({
            msg: 'Only support jpg, jepg, png and gif. Try again!'
        });
    }

    // Creates a unique id + extname
    const fileName = `${uuidv4()}.${extname}`;

    // Path
    const path = `src/uploads/${type}/${fileName}`;

    //Documentacion
    // Use the mv() method to place the file somewhere on your server
    image.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error trying to move image'
            });
        }

        uploadImage(id, type, fileName)

        res.json({
            msg: 'File uploaded!!',
            fileName
        })
    });


}

exports.getFiles = (req, res) => {
    const { type, filename } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${type}/${filename}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    } else { 
        const pathImg = path.join(__dirname, `../uploads/noImage.png`);
        res.sendFile(pathImg)
    }

}