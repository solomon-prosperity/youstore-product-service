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

export interface Product {
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  category: string;
  images: object;
  reviews: object;
  quantity:number;
  sold:number;
  isOutOfStock: Boolean;
  merchantId: mongoose.Schema.Types.ObjectId
  
}

export interface ProductDocument extends Product, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: Array,
    },
    category: {
      type: String,
      //required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    isOutOfStock: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId
    },
    size: {
      type: String,
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"

    }]
  
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
