require('dotenv')
  .config();

const _ = process.env;

const MongoConfiguration = {
  Host: _.SMARTTUTOR_MONGO_HOST,
  Database: _.SMARTTUTOR_MONGO_DATABASE,
  User: _.SMARTTUTOR_MONGO_USER,
  Password: _.SMARTTUTOR_MONGO_PASSWORD,
};

const HostConfiguration = {
  Port: _.SMARTTUTOR_PORT,
};

const Environment = _.SMARTTUTOR_ENVIRONMENT;

const Configuration = {
  Mongo: MongoConfiguration,
  Host: HostConfiguration,
  Environment,
};

export {
  MongoConfiguration,
  HostConfiguration,
  Environment,
  Configuration,
};
