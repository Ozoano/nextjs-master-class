import CreateForm from "./CreateForm";

const CreateTicket = () => {
  return (
    <main>
      <h2 className="text-primary text-center">Add A New Ticket</h2>

      {/* import form component */}
      <CreateForm />
    </main>
  );
};

export default CreateTicket;
