import dynamic from "next/dynamic";
import Head from "next/head";

const Navbar = dynamic(() => import("./Navbar"));
const Footer = dynamic(() => import("./Footer"));

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const Layout = ({
  title = "Travel Planner",
  description = "Application for planning your trips",
  keywords = "travel, planner, trips",
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Travel Planner` : "Travel Planner"}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
