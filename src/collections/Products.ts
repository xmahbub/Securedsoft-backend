import { CollectionConfig } from 'payload/types';
import {Usages} from '../utilities/usages';
const Products:CollectionConfig = {
    slug: "projects",
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Project Name",
            
        },
        {
          name: "sid",
          type: "text",
          required: true,
          label: "Server ID",
          
        },
        {
          name: 'image',
          label: 'Image Upload',
          type: 'upload',
          relationTo: 'logo',
          required: false,
          admin: {
            description: 'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
          },
        },

        {
            name: "estimate",
            type: "text",
            label: "Estimated Bill",
            admin:{
              readOnly:true,
            },
            hooks: {
              afterRead: [async ({ data: doc })  => {
                //console.log(doc.sid)
                const info = await fetch('https://backboard.railway.app/graphql/v2',{
                  method: "POST",
                  
                  headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.RAILWAY_API_KEY}`
                  },
                  
                  body:JSON.stringify({
                    query: `query cpu {  estimatedUsage(projectId:\"${doc.sid}\"  measurements:MEMORY_USAGE_GB ){ projectId   measurement   projectId  estimatedValue    }}`,
                    operationName: "cpu"
                })
                
                })
                const json2 = await info.json();
                //console.log(json2)
                //console.log(json2.data.estimatedUsage[0].estimatedValue)
                if(json2?.data?.estimatedUsage??false){
                   
                   const est = json2.data.estimatedUsage[0].estimatedValue * 0.000400
                   return `$ ${est} USD`

                }
                else{
                  return `$ Service not active`
                }
                

              }],
            },
            
        },
        {
            name: 'categories',
            label: 'Categories',
            type: 'relationship',
            relationTo: 'catagory',
            hasMany: false,
            admin: {
              position: 'sidebar',
            },
        },
        
        {
          name: 'usage', 
          type: 'json',
          label: "Usage Json",
          admin:{
            readOnly:true,
          }, 
          hooks: {
            afterRead: [async ({ data: doc })  => {
              const measurements = ['MEMORY_USAGE_GB', 'CPU_USAGE', 'NETWORK_TX_GB','NETWORK_RX_GB'];
              
              const numOfDays = 2;

              const data = await Usages(measurements, doc.sid, numOfDays).then(result => {
                    
                    return result;
              }).catch(error => {
                
                return error
              });

              return data
              

            }],
          },
          admin:{
            readOnly:true,
          },
        },

        {
          name: 'description',
          type: 'richText',
          label: 'Product Description',


        },
        
        

       
    ],
    
    admin: {
        useAsTitle: 'name',
    },


}

export default Products;