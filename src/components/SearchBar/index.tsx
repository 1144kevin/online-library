import React, { useState } from "react";
import { Input, Switch, Row, Col, Button } from "antd";
import "./searchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { RootState } from "../../redux/store";

const { Search } = Input;
interface SearchBarProps {
  onSearch: (value: string) => void;
  onSortAZ: () => void;
  onSortZA: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSortAZ,
  onSortZA,
}) => {
  const [isAZ, setIsAZ] = useState(true); // 跟踪排序狀態，默認為 A-Z

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state

  const handleSortToggle = () => {
    if (isAZ) {
      onSortZA();
    } else {
      onSortAZ();
    }
    setIsAZ(!isAZ); // 切換狀態
  };
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };

  return (
    <Row>
      <Col span={10} offset={7} className="searchLine">
        <Switch
          checked={isDarkMode}
          onChange={handleThemeToggle}
          className="themeSwitch"
          style={{ transform: "scale(1.3)" }}
        />
       
          <Button
            type="primary"
            shape="round"
            size="middle"
            onClick={handleSortToggle}
            className={isAZ ? "sort" : "sort__reverse"}
          >
            {isAZ ? "A-Z" : "Z-A"}
          </Button>
       
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 400}}
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
