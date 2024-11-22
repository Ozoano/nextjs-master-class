import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We hit a Brick Wall</h2>
      <p>We could not find the ticket you requested</p>
      <p>
        Go back to all <Link href="/tickets"> Tickets</Link> Page
      </p>
    </main>
  );
}
