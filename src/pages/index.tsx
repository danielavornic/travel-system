import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import { HotelForm, Layout, RouteForm, TicketForm } from "@/components";

enum Tabs {
  Routes = "routes",
  Tickets = "tickets",
  Hotels = "hotels",
}

const tabs = [
  {
    name: "Routes",
    tab: Tabs.Routes,
  },
  {
    name: "Tickets",
    tab: Tabs.Tickets,
  },
  {
    name: "Hotels",
    tab: Tabs.Hotels,
  },
];

const TabItem = ({ tab, name, activeTab }: { tab: Tabs; name: string; activeTab: Tabs }) => {
  const isActive = activeTab === tab;

  return (
    <Link href={{ pathname: "/", query: { tab } }}>
      <span
        className={cn("badge badge-lg", {
          "bg-primary border-primary": isActive,
          "bg-white border-primary text-primary": !isActive,
          "mr-4": tab !== Tabs.Hotels,
        })}
      >
        {name}
      </span>
    </Link>
  );
};

export default function Home() {
  const router = useRouter();
  const tab = router.query?.tab || Tabs.Routes;

  return (
    <Layout hideFooter>
      <div
        className="flex flex-col items-center h-full pt-40 bg-opacity-50 bg-cover bg-bottom"
        style={{ backgroundImage: 'url("/images/home-bg.png")' }}
      >
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold mb-10">TopTrip</h1>
          <p className="text-xl max-w-2xl">
            Discover how you can save money on your next trip by using TopTrip - your ultimate
            travel companion for seamless trip planning and booking.
          </p>
        </div>
        <div className="max-w-screen-xl w-full  mt-8 bg-gray-50 p-7 rounded-xl bg-opacity-50">
          <div className="bg-white py-5 px-6 rounded-xl shadow-md shadow-gray-100 bg-opacity-40">
            <div className="flex items-center">
              {tabs.map((item, index) => (
                <TabItem key={index} {...item} activeTab={tab as Tabs} />
              ))}
            </div>
            <div className="mt-6">
              {tab === Tabs.Routes && <RouteForm />}
              {tab === Tabs.Tickets && <TicketForm />}
              {tab === Tabs.Hotels && <HotelForm />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
