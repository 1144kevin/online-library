export interface commentDataType {
	userImage: string;
	commentId: string;
	userName: string;
	description: string;
	rating: number;
}

export interface bookDataType {
	user_id: string;
	id: string;
	image: string;
	title: string;
	body: string;
	comments?: commentDataType[];
	total_rating?: number;
	isFavorite?: boolean;
}
