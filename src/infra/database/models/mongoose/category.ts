import mongoose from "mongoose";


export interface Category {
  name: string;
  description: string;
  

}

export interface CategoryDocument extends Category, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;