import { Outlet } from "react-router-dom";

function RootLayout() {
    return <>
        <Outlet/>
        <h1>Root Layout</h1>
    </>;

}

export default RootLayout;