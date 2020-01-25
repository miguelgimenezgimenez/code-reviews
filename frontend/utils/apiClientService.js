import axios from 'axios';
import FormData from 'form-data';

const API_URL = 'https://roomi-end.herokuapp.com';

const fetchListings = () => axios.get(API_URL+'/test');

const addListingToServer = (listing) => axios.post(API_URL+'/add', listing);

const createUser = (login) => axios.post(API_URL+'/add_user', login);

const loginUser = (login) => axios.post(API_URL+'/login', login);

const postPhoto = (photo) => {
  console.log('triggered', photo);
  const image = {
    type: photo.mime,
    name: 'user_profile_pic',
    uri: photo.path
  };
  const form = new FormData();
  
  form.append('file', image);
  return axios.post(API_URL+'/image/user_profile', form, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
  });
}

module.exports = { fetchListings, addListingToServer, createUser, loginUser, postPhoto };