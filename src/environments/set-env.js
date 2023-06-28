const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "./src/environments/environment.default.ts";

  // Load node modules
  const appVersion = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });

  // `environment.ts` file structure
  const envConfigFile = `export const defaultEnvironment = {
    firebase: {
      apiKey: "${process.env.API_KEY}",
      authDomain: "${process.env.AUTH_DOMAIN}",
      projectId: "${process.env.PROJECT_ID}",
      storageBucket: "${process.env.STORAGE_BUCKET}",
      messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
      appId: "${process.env.APP_ID}"
    },
    production: false,
  };
  
`;
  console.log(
    "The file `environment.default.ts` will be written with the following content: \n"
  );
  console.log(envConfigFile);
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.default.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
