import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

mongoosePaginate.paginate.options = {
  limit: 20,
  useEstimatedCount: false,
  customLabels: {
    totalDocs: "totalDocs",
    docs: "docs",
    limit: "perPage",
    page: "currentPage",
    nextPage: "nextPage",
    prevPage: "prevPage",
    totalPages: "totalPages",
    pagingCounter: "serialNo",
    meta: "pagination",
  },
};

export interface Review {
  comment: string;
  rating: number;
  customerAvatar: string;
  customerName: string;

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
    customerAvatar: {
        type: String
    },
    customerName: {
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
reviewSchema.plugin(mongoosePaginate);

const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);

export default ReviewModel;