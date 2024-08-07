import React, { useState } from 'react';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { Row, Col } from "antd";
import { Button } from 'antd';
import type { ConfigProviderProps } from 'antd';
import './searchBar.scss'


type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const SearchBar: React.FC = () => (
    <Row>
        <Col span={10} offset={7} className='searchLine'>
            <Button type="primary" shape="round" size='large'>
                A-Z
            </Button>
            <Button type="primary" shape="round" size='large'>
                Z-A
            </Button>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 400 ,marginTop: 4 }} />
        </Col>
    </Row>
);

export default SearchBar;