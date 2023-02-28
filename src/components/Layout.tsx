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
  title,
  description = "Application for planning your trips",
  keywords = "travel, planner, trips",
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | TopTrip` : "TopTrip"}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main className="flex-grow h-[calc(100vh-100px)]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
