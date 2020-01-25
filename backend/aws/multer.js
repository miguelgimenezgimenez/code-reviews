'use strict';

const multer = require('@koa/multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid');

const { s3 } = require('./aws');

const awsProfilePics = multerS3({
  s3: s3,
  bucket: 'roomi-images',
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, {fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1]; // gets the extension
    const destinationFolder = 'profile_pics';
    const fileName = `${destinationFolder}/${uuid.v4()}.${extension}`;
    cb(null, fileName);
  }
});

const multerProfilePicUpload = multer({ storage: awsProfilePics });

module.exports = { multerProfilePicUpload };