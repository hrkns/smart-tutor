const mongoConnectionUrl = (databaseConfiguration: any) => {

  return `mongodb+srv://${databaseConfiguration.User}:${databaseConfiguration.Password}@${databaseConfiguration.Host}/${databaseConfiguration.Database}`;
};

const apiUrlPrefix = '/';

const EnviromentsIdentifiers = {
  local : 'local',
  development : 'dev',
  test : 'test',
  stage : 'stg',
  production : 'prod',
}

const LoggingLevels = {
  info:'info', debug:'debug', warning:'warning', error:'error', success:'success'
};

export {

  mongoConnectionUrl,
  apiUrlPrefix,
  EnviromentsIdentifiers,
  LoggingLevels,
}