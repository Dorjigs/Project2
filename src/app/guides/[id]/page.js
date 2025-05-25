'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function GuideDetailPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="container py-5">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const guide = await prisma.guide.findUnique({
    where: { id: params.id },
    include: {
      reviews: {
        include: {
          user: true
        }
      }
    }
  });

  if (!guide) {
    return notFound();
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={guide.photo || '/default-guide.jpg'} 
            alt={guide.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1>{guide.name}</h1>
          <p className="lead">{guide.bio}</p>
          
          <h3 className="mt-4">Reviews</h3>
          {guide.reviews.map((review) => (
            <div key={review.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{review.user.name}</h5>
                <div className="mb-2">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}