import React from "react";
import "./index.less";

export default function App() {
  return (
    <div className="container">
      <p className="demo">App</p>
      <Button onClick={() => console.log(1)}>点击</Button>
    </div>
  );
}
