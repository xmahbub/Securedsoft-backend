//const myBucketUrl = 'https://securedsoft.s3.ap-south-1.amazonaws.com/'
import { S3UploadCollectionConfig } from 'payload-s3-upload';
const Media:S3UploadCollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Uploads',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: true,
    s3: {
      bucket: 'securedsoft',
      prefix: 'images', 
      commandInput: {
        ACL: 'public-read',  
      },  
    },
    adminThumbnail: ({ doc }) =>`https://securedsoft.s3.ap-south-1.amazonaws.com/images/${doc.filename}`,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        doc.url = `https://securedsoft.s3.ap-south-1.amazonaws.com/images/${doc.filename}`
      }
    ]
  },
  
};

export default Media;