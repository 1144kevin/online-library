export interface commentDataType{
    userImage: string;
    commentId:string;
    userName:string;
    description:string;
    rating:number;
}

export interface bookDataType{
    userId:number;
    id:string;
    image:string;
    title:string;
    body:string;
    comments?:commentDataType[];
    totalRating?:number;
    isFavorite?:boolean;
}
