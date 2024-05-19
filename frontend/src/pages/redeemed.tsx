import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextPage } from 'next';
import NavBar from '@/components/NavBar';

const Redeemed: NextPage = () => {
  const router = useRouter();
  const { image, name, points } = router.query;

  if (!image || !name || !points) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#93E9BE] text-black'>
      <NavBar />
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div className='bg-white rounded-md p-10'>
          <Image src={image as string} alt={name as string} width={200} height={200} className='rounded-lg shadow-md' />
          <h1 className='mt-4 text-2xl font-bold'>{name}</h1>
          <p className='mt-2 text-lg'>Successful Claim!</p>
          <p className='mt-1 text-lg'>Redeemed {points} points</p>
        </div>
      </div>
    </div>
  );
};

export default Redeemed;
