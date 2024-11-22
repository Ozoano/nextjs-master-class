// an instruction about what to do when a page has not been built ahead of time for a specific ID
// when a request comes in for that ID
// Option 1 --> return a 404 page when such reqeust comes ( export const dynamicParams = false)
//  Option 2 -->

// ==============================
// Option 1 --> return a 404 page when such reqeust comes
// export const dynamicParams = true;
// ==============================

// ==============================
// Option 1 -->  (default) Dynamic segments not included in generateStaticParams are generated on demand
export const dynamicParams = true;
// ==============================

// next imports
import { notFound } from "next/navigation";

// to tell next js to statically render pages based on thier IDs
export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");
  const ticketdID = await res.json();

  // returns a mapped obj
  return ticketdID.map((ticket) => ({
    id: ticket.id,
  }));
}

// fetch data and revalidate it after every 60secs
async function getTicket(id) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  // invokes a nextjs function when response is not ok by serving a 404 page
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
