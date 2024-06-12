/** @type { import("drizzle-kit").Config } */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://aiprepdb_owner:jpiPwE0rm9eZ@ep-bold-brook-a5lvpgb7.us-east-2.aws.neon.tech/aiprepdb?sslmode=require',
  }
};
