import React, { useState } from 'react'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Будь ласка, виберіть рейтинг')
      return
    }
    onSubmit({ rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block mb-2">Рейтинг:</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star fill={star <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-2">Коментар:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="btn-primary">Додати відгук</button>
    </form>
  )
}

export default ReviewForm