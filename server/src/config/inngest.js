import { Inngest } from "inngest";
import { connect } from "mongoose";
import { UserModel } from "../models/Usermodel";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "link-up" });  

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) => {
        await connect();

        const {id , email_addresses, first_name, profile_image_url} = event.data;

        const newUser = {
            clerkId: id,
            email_addresses: email_addresses[0].email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: profile_image_url,

        };

        await User.create(newUser);
    }

);

const DeleteUser = inngest.createFunction(
    {id: "delete-user"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connect();    
        const {id} = event.data;

        await User.deleteOne({clerkID: id});
        await deleteStreamUser(id.toString());
    }   
);


// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser , DeleteUser];
    