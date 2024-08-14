import { useParams } from "react-router-dom";
import useAxios from "../../hooks/CustomHook";
import { useEffect } from "react";
import { Row, Col, Image, Button } from "antd";
import './detail.scss'

const Detail = () => {

    const { data, loading, error, getData } = useAxios('https://jsonplaceholder.typicode.com/posts');
    const { dataId } = useParams();

    useEffect(() => {
        if (data === null || data.length === 0) {
            getData();
        }
    }, [data, getData]);//避免重複請求，確保在必要時才請求，減少重複渲染、副作用
    

    const parsedDataId = parseInt(dataId ?? "", 10);//轉成整數

    const bookId = data.find(
        (y) => y.id === parsedDataId
    );//命名從dataId改為bookId

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p>Error: {error.message}</p>;
    // }

    return (
        <Row className="layout">
            <Col xxl={12} xl={12} offset={6} className="image">
                <Image
                    width={400}
                    src="https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg"
                />
            </Col>
            <Col xxl={6} xl={12} offset={9} className="title">
                <h2>{bookId?.title}</h2>
            </Col>
            <Col xxl={10} xl={12} offset={7} className="content">
                <p>{bookId?.body}</p>
            </Col>
            <Col xxl={10} xl={12} offset={7} className="buttonContainer">
                <Button type="link" href="https://ant.design/index-cn">
                    更新
                </Button>
                <Button type="link" danger>
                    刪除
                </Button>
            </Col>
        </Row>

    );
};

export default Detail;