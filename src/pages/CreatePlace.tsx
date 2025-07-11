import CreatePlaceForm from '@/components/organism/CreatePlaceForm';

function CreatePlace() {
  return (
    <main className="mx-auto mt-3 max-w-xl xl:mt-5">
      <h1 className="text-center text-lg">Create New Place</h1>
      <p className="text-secondary-foreground text-center text-sm">
        We're excited to know about this new place you want to share with us!
      </p>
      <CreatePlaceForm />
    </main>
  );
}
export default CreatePlace;
