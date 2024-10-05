import React from 'react'
import { Star } from 'lucide-react'
import { Review } from '../types'

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Відгуки покупців</h3>
      {reviews.length === 0 ? (
        <p>Поки що немає відгуків для цього товару.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      fill={star <= review.rating ? 'currentColor' : 'none'}
                      className="text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.userName}</span>
              </div>
              <p className="text-gray-600 mb-1">{review.comment}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewList