import axios from "axios";
import { bookDataType } from "../assets/data";

export async function getBookData() {
  try {
    const response = await axios.get("http://localhost:3006/book");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error; // 你可以選擇拋出異常或返回一些錯誤資訊
  }
}

export async function deleteBookData(id: string) {
  try {
    const response = await axios.delete(`http://localhost:3006/book/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting book data:", error);
    throw error;
  }
}

export async function addBookData(book: bookDataType) {
  try {
    const response = await axios.post(`http://localhost:3006/book`, book);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding book data:", error);
    throw error;
  }
}

export async function updateBookData(book: bookDataType) {
  try {
    const response = await axios.put(`http://localhost:3006/book/${book.id}`, book);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating book data:", error);
    throw error;
  }
}