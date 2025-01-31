import * as React from 'react';
import axios from "axios";
import {
    toast,
} from 'amis';
import {RouteComponentProps} from "react-router-dom";
import {IMainStore} from "@/stores";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

interface LoginProps extends RouteComponentProps<any> {
    store: IMainStore;
}

@inject("store")
// @ts-ignore
@withRouter
@observer
export default class LoginRoute extends React.Component<LoginProps, any> {

    state = {
        inputUsername: 'admin',
        inputPassword: 'admin'
    }

    handleFormSaved = (value: any) => {
        const history = this.props.history;
        const store = this.props.store;
        console.log("inputUsername:", this.state.inputUsername)
        console.log("inputPassword:", this.state.inputPassword)
        // 这里可以进行登陆密码验证
        axios.request({
            method: "post",
            url: "/api/login"
        }).then(res => {
            console.log("login res", res);
            if (res.data != null && res.data.status === 0) {
                store.user.login(this.state.inputUsername);
                toast['info']('登陆成功', '消息')
                // 跳转到dashboard页面
                console.log("replace history to dashboard, value:", value)
                history.replace(`/dashboard`)
            } else {
                toast['error']('登陆失败', '消息')
            }
        })
    }

    handleChangeForPassword = (e: any) => {
        this.setState({
            inputPassword: e.target.value
        })
    }

    componentDidMount() {
        const store = this.props.store;
        console.log("store.user.name", store.user.name)
        console.log("store.user.isAuthenticated", store.user.isAuthenticated)
    }

    handleChangeForUsername = (e: any) => {
        this.setState({
            inputUsername: e.target.value
        })
    }

    render() {
        return (
            <div className="app app-header-fixed ">
                <div className="container w-xxl w-auto-xs">
                    <a className="block m-t-xxl m-b-xl text-center text-2x">XXX 系统登录</a>
                    <div className="list-group list-group-sm">
                        <div className="list-group-item">
                            <input
                                placeholder="用户名"
                                type="text"
                                className="form-control no-shadow no-border"
                                onChange={this.handleChangeForUsername}
                                defaultValue={this.state.inputUsername}
                            />
                        </div>

                        <div className="list-group-item">
                            <input
                                placeholder="密码"
                                type="password"
                                className="form-control no-shadow no-border"
                                onChange={this.handleChangeForPassword}
                                defaultValue={this.state.inputPassword}
                            />
                        </div>
                    </div>

                    <button type="button" className="btn btn-info" onClick={this.handleFormSaved}>登陆</button>
                </div>
            </div>
        );
    }
}