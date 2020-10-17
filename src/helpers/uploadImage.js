const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospitlal');
const Medic = require('../models/medic');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

exports.uploadImage = async (id, type, filename) => {

    let oldPath = '';

    switch (type) {
        case 'medics':
            const medic = await Medic.findById(id);
            //Verify if the medic whit this id exist
            if (!medic) {
                console.log('Medico con ese id no existe');
                return false
            }
            //If exist, check if he has and old image
            oldPath = `src/uploads/medics/${medic.img}`

            //If he has an image, we remove this and update the image
            deleteImage(oldPath);

            medic.img = filename;
            await medic.save();
            return true

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            //Verify if the hospital whit this id exist
            if (!hospital) {
                console.log('Hospital con ese id no existe');
                return false
            }
            //If exist, check if he has and old image
            oldPath = `src/uploads/hospitals/${hospital.img}`

            //If he has an image, we remove this and update the image
            deleteImage(oldPath);

            hospital.img = filename;
            await hospital.save();
            return true


        case 'users':
            const user = await User.findById(id);
            //Verify if the user whit this id exist
            if (!user) {
                console.log('User con ese id no existe');
                return false
            }
            //If exist, check if he has and old image
            oldPath = `src/uploads/users/${user.img}`

            //If he has an image, we remove this and update the image
            deleteImage(oldPath);

            user.img = filename;
            await user.save();
            return true


        default:
            break;
    }

}