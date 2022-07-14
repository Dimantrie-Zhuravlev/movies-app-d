import React from "react";
import "./headerSearch.scss";
import { Tabs } from "antd";

const { TabPane } = Tabs;
// const onChange = (key: string) => {
//   console.log(key);
// };

const HeaderSearch = (props: { updatePage: (rated: boolean) => void }) => {
  const onChange = (key: string) => {
    if (key === "Search") {
      props.updatePage(false);
    } else {
      props.updatePage(true);
    }
  };
  return (
    <Tabs
      defaultActiveKey="1"
      // onChange={onChange}
      centered={true}
      tabBarGutter={20}
      onChange={onChange}
    >
      <TabPane tab="Search" key="Search"></TabPane>
      <TabPane tab="Rated" key="Rated"></TabPane>
    </Tabs>
  );
};
export default HeaderSearch;
