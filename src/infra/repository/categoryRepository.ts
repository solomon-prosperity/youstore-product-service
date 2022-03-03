import CategoryModel from "../database/models/mongoose/category";
import { CategoryDocument } from "../database/models/mongoose/category";
import log from "../../interface/http/utils/logger";
import NotFoundError from "../../interface/http/errors/notFound"
import ProductModel from "../database/models/mongoose/product";

class CategoryRepository {
    categoryModel: typeof CategoryModel
    logger: typeof log 
    constructor({categoryModel, logger}: {categoryModel: typeof CategoryModel, logger: typeof log}){
        this.categoryModel = categoryModel
        
        this.logger = logger
    }

    async create(payload: CategoryDocument) {
        try {
            const { name, description } = payload
            const alreadyExist = await this.categoryModel.find({name: name})
            if (alreadyExist) throw new Error('category already exist')
            const Category = await this.categoryModel.create(payload);
            const saveCategory = await Category.save()
            return saveCategory

        } catch (error) {
            throw error
        }
    }

async get (categoryId: String) {
        try {
            const category = await this.categoryModel.findById(categoryId)
            if(!category) {
                throw new NotFoundError('Category does not exist' , 404, `error`)
            }
            return category
        } catch (error) {
            this.logger.error(error);
            
        }
}


async getAll (payload: Object) {
    try {
        
        const categories = await this.categoryModel.find(payload)
        return categories
    } catch (error) {
        this.logger.error(error);
        
    }
}


async update (categoryId: string, payload: CategoryDocument) {
    try {
        const category = await this.categoryModel.findOneAndUpdate({_id: categoryId}, payload, {
            new: true
        } )
        return category
    } catch (error) {
        this.logger.error(error);
    }
}


async delete (categoryId: string) {
        try {
            const category = await this.categoryModel.findByIdAndDelete(categoryId)
            return category
        } catch (error) {
            this.logger.error(error);
            
        }
}
}
    

export default CategoryRepository