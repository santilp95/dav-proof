/* eslint-disable prettier/prettier */
console.log(`============ env-setup Loaded ===========`);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
    path: path.resolve(process.cwd(), 'config', 'env', '.test.env'),
});
