import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import axios from "axios";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AnimatedCard = ({ review }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    triggerOnce: false,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Card className="shadow-md h-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>
          <p className="text-gray-700 italic">
            "
            {review.comment.length > 100
              ? review.comment.slice(0, 100) + "..."
              : review.comment}
            "
          </p>
          <p className="text-sm font-semibold text-gray-900 mt-4">
            — {review.name}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/review/get-review"
        );
        setReviews(res.data.data || []); // 👈 CORRECTED LINE
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Guests Say
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <AnimatedCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
