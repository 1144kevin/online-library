// import axios from 'axios';
import { bookDataType } from '../assets/data';
import { supabase } from '../supabaseClient';

export async function getBookData(user_id: string) {
	try {
		const { data, error } = await supabase
			.from('books')
			.select('*')
			.eq('user_id', user_id);

		if (error) {
			throw error;
		}

		return data || [];
	} catch (error: any) {
		console.error('Error fetching books from Supabase:', error.message);
		throw error;
	}
}

export async function deleteBookData(bookId: string) {
	try {
		const { data, error } = await supabase
			.from('books')
			.delete()
			.eq('id', bookId);

		if (error) {
			throw error;
		}

		return data || [];
	} catch (error: any) {
		console.log('Error delete book from supabase', error.message);
		throw error;
	}
}

export async function addBookData(book: bookDataType) {
	try {
		const { data, error } = await supabase.from('books').insert([book]);

		if (error) {
			throw error;
		}

		return data || [];
	} catch (error: any) {
		console.log('Error add book from supabase', error.message);
		throw error;
	}
}

export async function updateBookData(book: bookDataType) {
	try {
		const { data, error } = await supabase
			.from('books')
			.update(book)
			.eq('id', book.id);

		if (error) {
			throw error;
		}
		return data || [];
	} catch (error: any) {
		console.log('Error update book from supabase', error.message);
		throw error;
	}
}

// export async function getBookData() {
//   try {
//     const response = await axios.get("http://localhost:3006/book");
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching book data:", error);
//     throw error; // 你可以選擇拋出異常或返回一些錯誤資訊
//   }
// }

// export async function deleteBookData(id: string) {
// 	try {
// 		const response = await axios.delete(`http://localhost:3006/book/${id}`);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error deleting book data:', error);
// 		throw error;
// 	}
// }

// export async function addBookData(book: bookDataType) {
// 	try {
// 		const response = await axios.post(`http://localhost:3006/book`, book);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error adding book data:', error);
// 		throw error;
// 	}
// }

// export async function updateBookData(book: bookDataType) {
// 	try {
// 		const response = await axios.put(
// 			`http://localhost:3006/book/${book.id}`,
// 			book
// 		);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error updating book data:', error);
// 		throw error;
// 	}
// }
