import { CollectionConfig } from 'payload/types';

const Order:CollectionConfig = {
    slug: "order",
    access: { 
        read: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },

        update:({req})=>{
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },
        delete:({req}) =>{
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },
        
        create:() => true,
    },


    fields: [
        
        {
            name: 'owner',
            type: 'relationship',
            relationTo: 'customers',
            hasMany: false,
            defaultValue: ({ user, locale }) => {
                
                return (`${user.id}`)
            },
            validate: (val, {user,args}) => {
                if(user.collection === 'users'){
                    return true
                }

                if(val === user.id){
                    return true
                }

                
                return "Your cand create order as provided User"
            },

            // admin:{
            //     readOnly: true,
            // }
        },
        {
            name: 'products',
            type: 'array',
            required: true,
            label: 'Product Detai',
            minRows: 1,
            maxRows: 100,
        
            fields:[
                {
                    name: 'name',
                    label: 'Product Name',
                    type: 'relationship',
                    relationTo: 'projects',
                    
                },
            ]


        },
        

       
    ],

    


}

export default Order;