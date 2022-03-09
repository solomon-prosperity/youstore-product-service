import mongoose from "mongoose";


export interface Wishlist {
  products: string;
  customerId: string;
  

}

export interface WishlistDocument extends Wishlist, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new mongoose.Schema(
  {
    customerId: {
        type: String
    },
    products: {
      type: Array,
      ref: "Product"


    }
  },
  {
    timestamps: true,
  }
);

const WishlistModel = mongoose.model<WishlistDocument>("Wishlist", wishlistSchema);

export default WishlistModel;