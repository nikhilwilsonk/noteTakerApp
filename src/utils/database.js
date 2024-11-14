const { Connection, Request } = require('tedious');

const config = {
  authentication: {
    options: {
      userName: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD
    },
    type: 'default'
  },
  server: process.env.REACT_APP_SERVER,
  options: {
    database: process.env.REACT_APP_DATABASE,
    encrypt: true
  }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

connection.connect();

export const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        reject(err);
      } else {
        resolve(rowCount);
      }
    });

    params.forEach((param) => {
      request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
  });
};