import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
  },

  fields: [
      {
         name: "fullName",
         type: "text",
         label: "User Full Name",
         required:true,
      },
  ],
};

export default Users;