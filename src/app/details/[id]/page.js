
import CoffeeDetailsPage from '@/components/CoffeeDetailsPage/CoffeeDetailsPage';
import Loader from '@/util/Loader';

export default function page({ params }) {

  const { id } = params; 

  if (!id) {
    return <p>Error: ID not found</p>; 
  }
  if (!id) {
    return <Loader />;
  }

  return (
    <div>
      <CoffeeDetailsPage id={id} />
    </div>
  );
}
