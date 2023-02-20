import { useState} from "react";
import ExternalProfileCard from "@/components/ExternalProfileCard";
import ActivityFeed from "@/components/ActivityFeed";


const UserProfilePage = ({ user, posts}) => {
    return (
        <main>
            <ExternalProfileCard user={user}/>
            <ActivityFeed posts={posts}/>
        </main>
    )
};

export default UserProfilePage;
