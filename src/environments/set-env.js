const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetDefaultPath = "./src/environments/environment.default.ts";
  const targetDevPath = "./src/environments/environment.dev.ts";
  const targetProdPath = "./src/environments/environment.prod.ts";

  // Load node modules
  const appVersion = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });

  // `environment.default.ts` file structure
  const envDefaultConfigFile = `export const environment = {
    firebase: {
      apiKey: "${process.env.API_KEY}",
      authDomain: "${process.env.AUTH_DOMAIN}",
      projectId: "${process.env.PROJECT_ID}",
      storageBucket: "${process.env.STORAGE_BUCKET}",
      messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
      appId: "${process.env.APP_ID}"
    },
    apiURL: "${process.env.API_URL_DEV}",
    mapsApiKey: "${process.env.MAPS_API_KEY}",
    production: false,
  };`;

  // `environment.dev.ts` file structure
  const envDevConfigFile = `export const environment = {
    firebase: {
      apiKey: "${process.env.API_KEY}",
      authDomain: "${process.env.AUTH_DOMAIN}",
      projectId: "${process.env.PROJECT_ID}",
      storageBucket: "${process.env.STORAGE_BUCKET}",
      messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
      appId: "${process.env.APP_ID}"
    },
    apiURL: "${process.env.API_URL_DEV}",
    mapsApiKey: "${process.env.MAPS_API_KEY}",
    production: false,
  };`;

  // `environment.prod.ts` file structure
  const envProdConfigFile = `export const environment = {
      firebase: {
        apiKey: "${process.env.API_KEY}",
        authDomain: "${process.env.AUTH_DOMAIN}",
        projectId: "${process.env.PROJECT_ID}",
        storageBucket: "${process.env.STORAGE_BUCKET}",
        messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
        appId: "${process.env.APP_ID}"
      },
      apiURL: "${process.env.API_URL_PROD}",
      mapsApiKey: "${process.env.MAPS_API_KEY}",
      production: true,
    };`;

  writeFile(targetDefaultPath, envDefaultConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.default.ts file generated correctly at ${targetDefaultPath} \n`
      );
    }
  });

  writeFile(targetDevPath, envDevConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.dev.ts file generated correctly at ${targetDevPath} \n`
      );
    }
  });

  writeFile(targetProdPath, envProdConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.prod.ts file generated correctly at ${targetProdPath} \n`
      );
    }
  });
};

setEnv();
