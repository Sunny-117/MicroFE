import React from "react";
import { Button } from "@baidu/one-ui";
import "./index.less";
import "@baidu/one-ui/lib/index.css";

export default function App() {
  return (
    <div className="container">
      <p className="demo">App</p>
      <Button onClick={() => console.log(1)}>点击</Button>
    </div>
  );
}
