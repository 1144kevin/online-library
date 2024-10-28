export interface commentDataType{
    userImage: string;
    commentId:string;
    userName:string;
    description:string;
}

export interface bookDataType{
    userId:number;
    id:string;
    image:string;
    title:string;
    body:string;
    comments?:commentDataType[];
}
