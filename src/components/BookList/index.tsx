import React from "react";
import { Row, Col, Flex } from "antd";
import BookCard from "../BookCard";
import { bookDataType } from "../../assets/data";

interface BookListProps {
    bookList: bookDataType[];
}

const BookList = ({ bookList }: BookListProps) => {

    console.log(bookList)
    return (
        <Row>
            {bookList.map((book) => (
                <Col span={6} key={book.id} style={{display:"flex",justifyContent:"center",marginBottom:60}}>
                    <BookCard book={book}/>
                </Col>
            ))}
        </Row>
    );
}

export default BookList;

