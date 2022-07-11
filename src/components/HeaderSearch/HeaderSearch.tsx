import React from "react";
import "./headerSearch.scss";
import { Tabs } from "antd";

const { TabPane } = Tabs;
// const onChange = (key: string) => {
//   console.log(key);
// };

const HeaderSearch = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      // onChange={onChange}
      centered={true}
      tabBarGutter={20}
    >
      <TabPane tab="Search" key="1"></TabPane>
      <TabPane tab="Rated" key="2"></TabPane>
    </Tabs>
  );
};
export default HeaderSearch;
