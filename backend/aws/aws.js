'use strict';

const AWS = require('aws-sdk');


// START AWS SETUP 
const myConfig = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3'
});

const s3 = new AWS.S3();

s3.listBuckets((err, data ) => {
  if (err) {
    console.log('aws s3 error', err);
  } else {
    console.log('Buckets:', data.Buckets);
  }
})
// END AWS SETUP

module.exports = { AWS, s3 };