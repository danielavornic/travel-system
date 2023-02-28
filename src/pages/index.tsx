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
          "bg-gray-500 border-gray-500": !isActive,
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
    <Layout>
      <div className="flex flex-col items-center h-full pt-32">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold mb-8">TopTrip</h1>
          <p className="text-xl max-w-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a iure placeat officiis
            vitae!
          </p>
        </div>
        <div className="max-w-screen-xl w-full bg-gray-300 p-4 rounded-lg mt-8">
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
    </Layout>
  );
}
