import React, { useState } from 'react';
import { Input } from 'antd';
import { Row, Col } from "antd";
import { Button } from 'antd';
import { ConfigProvider } from 'antd';
import './searchBar.scss'

const { Search } = Input;
interface SearchBarProps {
    onSearch: (value: string) => void;
    onSortAZ: () => void;
    onSortZA: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSortAZ, onSortZA }) => {
    const [isAZ, setIsAZ] = useState(true); // 跟踪排序狀態，默認為 A-Z

    const handleSortToggle = () => {
        if (isAZ) {
            onSortZA();
        } else {
            onSortAZ();
        }
        setIsAZ(!isAZ); // 切換狀態
    };

    return (
        <Row>
            <Col span={10} offset={7} className='searchLine' >
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimaryBorderHover: '808080',
                                colorPrimaryHover: '808080',
                                colorPrimaryActive: '808080',
                            },
                        },
                    }}
                >
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={handleSortToggle}
                        className={isAZ ? 'sort' : 'sort__reverse'}
                    >
                        {isAZ ? 'A-Z' : 'Z-A'}
                    </Button>
                </ConfigProvider>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 400, marginTop: 4 }}
                />
            </Col>
        </Row>
    )
};

export default SearchBar;