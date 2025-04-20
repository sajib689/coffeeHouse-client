'use client';

import CoffeeDetailsPage from '@/components/CoffeeDetailsPage/CoffeeDetailsPage';
import Loader from '@/util/Loader';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;  

  if (!id) {
    return <Loader/>
  }

  return (
    <div>
      {id}
      <CoffeeDetailsPage id={id} />
    </div>
  );
}
