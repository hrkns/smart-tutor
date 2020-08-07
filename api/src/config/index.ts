import dotenv = require('dotenv');
dotenv.config();

const _ = process.env;

const Configuration = {
  Mongo : {
    Host : _.SMARTTUTOR_MONGO_HOST,
    Database : _.SMARTTUTOR_MONGO_DATABASE,
    User : _.SMARTTUTOR_MONGO_USER,
    Password : _.SMARTTUTOR_MONGO_PASSWORD,
  },
  Host : {
    Port : _.SMARTTUTOR_PORT,
  },
};

export default Configuration;
