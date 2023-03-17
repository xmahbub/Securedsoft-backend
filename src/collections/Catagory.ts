import { CollectionConfig } from 'payload/types';
const Catagory:CollectionConfig = {
    slug: "catagory",
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        
       
    ],
    admin: {
        useAsTitle: 'title',
    },


}

export default Catagory;