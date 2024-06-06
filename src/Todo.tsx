import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { InputText } from "./component/text";

function Todo() {
  return (
    <div className="App">
      <h1 className="text">勉強アプリ</h1>
      {/* <p>勉強した内容を追加</p> */}
      <InputText />
    </div>
  );
}

export default Todo;
