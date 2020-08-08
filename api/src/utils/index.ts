const mongoConnectionUrl = (databaseConfiguration: any) => {

  return `mongodb+srv://${databaseConfiguration.User}:${databaseConfiguration.Password}@${databaseConfiguration.Host}/${databaseConfiguration.Database}`;
};

const apiUrlPrefix = '/';

export {

  mongoConnectionUrl,
  apiUrlPrefix,
}