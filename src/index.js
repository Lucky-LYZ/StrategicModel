import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Validator from "./validator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @method 运用策略模式写的新验证方法
   * @description 此种方法，避免出现很多if-else语句，富有弹性，可复用性，易扩展。
   */
  newValidataFunc = function() {
    let formObj = document.getElementById("formid");
    let validator = new Validator();
    validator.add(formObj.userName, [
      {
        strategy: "isNotEmpty",
        errMsg: "用户名不能为空"
      },
      {
        strategy: "minLength:6",
        errMsg: "用户名长度不能小于6位"
      }
    ]);
    validator.add(formObj.mobile, [
      {
        strategy: "isMobile",
        errMsg: "手机号格式不正确"
      }
    ]);
    let errMsg = validator.start();
    return errMsg;
  };

  /**
   * @method 常规使用的验证方法
   * @description 此种方法，包含很多if-else语句，缺乏弹性，复用性差，不易扩展，不易修改。
   */
  oldValidataFunc = function() {
    let formObj = document.getElementById("formid");
    let errMsg = [];
    if (formObj.userName.value === "") {
      errMsg.push("用户名不能为空");
    }
    if (formObj.userName.value.length < 6) {
      errMsg.push("用户名长度不能小于6位");
    }
    if (!/(^1[3|5|8][0-9]{9}$)/.test(formObj.mobile.value)) {
      errMsg.push("手机号格式不正确");
    }
    return errMsg;
  };
  /**
   * @method 处理提交事件
   */
  submit = event => {
    //let errMsg = this.oldValidataFunc();
    let errMsg = this.newValidataFunc();
    debugger;
    if (errMsg) {
      console.error(errMsg);
      event.preventDefault();
    }
  };

  render() {
    return (
      <div className="App">
        <h2>策略模式</h2>
        <h5>有效避免多重条件选择语句，算法复用，避免复制粘贴。</h5>
        <form id="formid" action="" method="post" onSubmit={this.submit}>
          请输入用户名：
          <input type="text" name="userName" />
          <br />
          请输入手机号：
          <input type="text" name="mobile" />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
