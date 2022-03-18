import { FC } from "react";

export interface ILogin {
    accessToken: string;
    tokenType: string;
    startedTime: string;
    expiredTime: string;
}

export interface IRoute {
    key: string;
    path: string;
    component: FC;
    name: string;
    exact: boolean;
    icon?: string;
    authen?: "required";
}

export interface INavigation {
    _tag?: string;
    name?: string;
    to?: string;
    icon?: IIcon | any;
    route?: string;
    _children?: ISubMenu[] | string[];
    badge?: IBadge;
    addLinkClass?: string;
    label?: string | boolean;
    className?: string;
    disabled?: boolean
}

export interface IBadge {
    color: string;
    text: string;
}

export interface ISubMenu {
    _tag: string;
    name: string;
    to: string;
    badge?: IBadge;
}

export interface IIcon {
    name?: string;
    className?: string | boolean;
}