import { createCategorySchema } from "../../interface/http/validations/categoryValidations"
import CategoryModel from "../../infra/database/models/mongoose/category"
import CategoryRepository from "../../infra/repository/categoryRepository"
import log from "../../interface/http/utils/logger"
import { CategoryDocument } from "../../infra/database/models/mongoose/category"

 class CreateCategory{
    categoryRepository: CategoryRepository
    logger: typeof log
    categoryModel: typeof CategoryModel
    constructor({categoryRepository, logger, categoryModel}: {categoryRepository: CategoryRepository, categoryModel: typeof CategoryModel, logger: typeof log}) {
        this.categoryRepository = categoryRepository
        this.logger = logger
        this.categoryModel = categoryModel
    }

     async execute(payload: CategoryDocument) {
         try {
             const { error } = createCategorySchema(payload)
             if (error) throw new Error(` ${error.details[0].message}`)
             const category = await this.categoryRepository.create(payload)
             return category
         } catch (error) {
             throw error
         }
     }
}

export default CreateCategory