import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// import app from "./app";
// import mongoose from "mongoose";
// import config from "./app/config";

// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);

//     app.listen(config.port, () => {
//       console.log(` app listening on port ${config.port}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to the database", error);
//   }
// }

// main();
