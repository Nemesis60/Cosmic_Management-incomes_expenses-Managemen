import SideBar from "@/app/dashboard/sideBar";
import Head from "next/head";


export default function Layout({ children, title }) {
    return (
        <div className="layout">
            <Head>
                <title>{title} - Cosmic Company</title>
                <meta name="web application to manage incomes and expenses"/>
            </Head>
            <SideBar />
            <div className="layout-children">
                {children}
            </div>
        </div>
    )
}
