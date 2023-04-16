import { Layout, TicketForm } from "@/components";

const Tickets = () => {
  return (
    <Layout title="Tickets" hideFooter>
      <div className="container mx-auto justify-between m-10">
        <h1 className="text-4xl font-bold mb-6">Tickets</h1>
        <div className="sticky top-0 z-40 p-6 pb-2">
          <TicketForm />
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;
