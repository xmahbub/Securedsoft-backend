import { CollectionConfig } from 'payload/types';
const Customers:CollectionConfig = {
    slug: "customers",
    auth:true,
    admin: {
        useAsTitle: 'fullName',
    },
    access: { 
        //anyone can create user
        create:() => true,
        //admin can read all but user can read himself
        read: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                id:{
                    equals:req.user.id,
                }
            }
        },

        //admin and own user can update his info
        update:({req})=>{
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                id:{
                    equals:req.user.id,
                }
            }
        },

        //admin and own user can delete his info
        delete:({req}) =>{
            if(req.user.collection === 'users'){
                return true
            }
            else{
                return false
            }
        }
    },
    fields: [
        {
            name: "fullName",
            type: "text",
            label: "User Full Name",
            required:true,
            
        },
        
        {
            name: "address",
            type: "textarea",
            label: "User Address",
            required:true,
            
        },
        {
            name: "fcmToken",
            type: "text",
            label: "FCM Token",
        }

        
       
    ]


}

export default Customers;