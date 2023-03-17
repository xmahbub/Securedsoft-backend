import { buildConfig } from 'payload/config';
import path from 'path';
import s3Upload from 'payload-s3-upload';
import Users from './collections/Users';
import Products from './collections/Products';
import Media from './collections/Media';
import Logoupload from './collections/Logoupload';
import Catagory from './collections/Catagory';
import Customers from './collections/Customers';
import Order from './collections/Order';
export default buildConfig({
  serverURL: process.env.SITE_URI,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Products,
    Media,
    Logoupload,
    Catagory,
    Customers,
    Order,
    
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins:[
    s3Upload({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,

        
      },
    }),

  ]
});
