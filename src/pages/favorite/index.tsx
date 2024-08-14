import Layout from "../../Layout";
import { Row, Col } from "antd";

const Favorite = () => {
  return (
      <Layout>
        <Row>
          <Col span={24} className="title">
            <h1>Favorite</h1>
          </Col>
          <Col span={16} offset={4}>
            {/* <>
              {search && <h1>找到{searchList.length}筆與{search}有關</h1>}
              <BookList bookList={searchList} />
            </> */}
          </Col>
        </Row>
      </Layout>
  );
};

export default Favorite;
