import mongoose from "mongoose";


export interface Review {
  comment: string;
  rating: number;
  customer_avatar: string;
  customer_name: string;

}

export interface ReviewDocument extends Review, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    comment: {
        type: String,
        required: [true, 'Review cannot be empty!']
    },
    customer_avatar: {
        type: String
    },
    customer_name: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);

export default ReviewModel;