import mongoose from "mongoose";


export interface Product {
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  images: string;
  reviews: object;
  quantity:number;
  sold:number;
  isOutOfStock: Boolean
  
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
      type: String,
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
    quatity: {
      type: Number,
      required: true
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

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;