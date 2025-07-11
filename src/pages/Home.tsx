import ButtonLink from '@/components/molecules/ButtonLink';
import GoToCreate from '@/components/molecules/GoToCreate';

function Home() {
  return (
    <main className="relative">
      <GoToCreate />
      <div className="mt-15">
        <section>
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">New Places</h2>
            <ButtonLink to="/explore" title="Show more" />
          </div>
          <div className="h-64 border"></div>
        </section>
        <section className="mt-4">
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">Top Rated</h2>
            <ButtonLink to="/" title="Show more" />
          </div>
          <div className="h-64 border"></div>
        </section>
        <section className="mt-4">
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">Most Popular</h2>
            <ButtonLink to="/" title="Show more" />
          </div>
          <div className="h-64 border"></div>
        </section>
      </div>
    </main>
  );
}
export default Home;
