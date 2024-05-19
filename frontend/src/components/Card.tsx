import { FC } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

interface CardProps {
    image: string;
    name: string;
    points: number;
    userPoints: number;
    address: string;
}

const Card: FC<CardProps> = ({ image, name, points, userPoints, address }) => {
    const router = useRouter(); // Initialize useRouter
    const canRedeem = userPoints >= points;

    const handleRedeem = async () => {
        if (canRedeem) {
            try {
                const response = await fetch(`http://localhost:8000/user/${address}/remove/${points}`, {
                    method: 'PUT',
                });
                const data = await response.json();
                // Handle response data...

                // Navigate to the "redeemed" page with query parameters
                router.push({
                    pathname: '/redeemed',
                    query: { image, name, points },
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    return (
        <div className='p-4 bg-white rounded-lg shadow-md'>
            {canRedeem ? (
                <button onClick={handleRedeem} className='flex flex-col items-center text-center'>
                    <img src={image} alt={name} className='w-full h-48 object-cover rounded-lg' />
                    <h2 className='mt-2 text-xl font-bold'>{name}</h2>
                    <p className='mt-1 text-gray-600'>{points} points</p>
                </button>
            ) : (
                <div className='flex flex-col items-center text-center'>
                    <img src={image} alt={name} className='w-full h-48 object-cover rounded-lg' />
                    <h2 className='mt-2 text-xl font-bold'>{name}</h2>
                    <p className='mt-1 text-gray-600'>{points} points</p>
                    <button className='mt-2 px-4 py-2 bg-red-500 text-white rounded'>Insufficient points</button>
                </div>
            )}
        </div>
    );
};

export default Card;