import { IRoute } from "@entities/global-model";
import Login from "./pages/login";
import MainLayout from "./pages/main-layout";
import Dashboard from "./pages/main-layout/dashboard";
import { FC } from "react";
import { KEY_PAGE } from "@utils/constant-data";

export class Pages {
    public readonly key: string;
    public readonly path: string;
    public readonly namePage: string;
    public readonly page: FC;

    private constructor(key: string, path: string, namePage: string, page: FC, parent: Pages = null) {
        this.key = key;
        this.path = `${(parent?.path) ?? ""}${path}`;
        this.namePage = namePage;
        this.page = page;
    }

    public static Login = new Pages(KEY_PAGE.LOGIN, "/login", "Login", Login);
    public static MainLayout = new Pages(KEY_PAGE.LAYOUT, "/auth", "Main", MainLayout);

    public static Dashboard = new Pages(KEY_PAGE.DASHBOARD, "/dashboard", "dashboard", Dashboard, Pages.MainLayout);
}

export const routes: IRoute[] = [
    {
        key: Pages.Login.key,
        path: Pages.Login.path,
        component: Pages.Login.page,
        name: Pages.Login.namePage,
        exact: true
    },
    {
        key: Pages.MainLayout.key,
        path: Pages.MainLayout.path,
        component: Pages.MainLayout.page,
        name: Pages.MainLayout.namePage,
        exact: false,
        authen: "required"
    }
];

export const routesMainLayout: IRoute[] = [
    {
        key: Pages.Dashboard.key,
        path: Pages.Dashboard.path,
        component: Pages.Dashboard.page,
        name: Pages.Dashboard.namePage,
        exact: false,
        icon: "nc-icon nc-chart-pie-35",
    }
];
