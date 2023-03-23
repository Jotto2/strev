export type Activity = {
    id: string;
    title: string;
    category: string;
    description: string;
    createdBy: string;
    imageURL: string;
    madeByName: string;
    followedBy: string[];
    isPublic: boolean;
}

export type Post = {
    id: string;
    activityID: string;
    comments: {
        commentedByImage: string;
        commentedByName: string;
        text: string;
    }[];
    createdByEmail: string;
    createdByImage: string;
    createdByName: string;
    createdById: string;
    date: Date;
    groupID: string;
    likedBy: string[];
    text: string;
}