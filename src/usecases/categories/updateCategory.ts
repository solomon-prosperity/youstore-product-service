import { CategoryDocument } from "../../infra/database/models/mongoose/category"
import CategoryRepository from "../../infra/repository/categoryRepository"
import log from "../../interface/http/utils/logger"


class UpdateCategory{
    categoryRepository: CategoryRepository
    logger: typeof log
    constructor({categoryRepository, logger}: {categoryRepository: CategoryRepository, logger: typeof log}) {
        this.categoryRepository = categoryRepository
        this.logger = logger
    }

    async execute(categoryId: string, payload: CategoryDocument) {
        try {
            const category = await this.categoryRepository.update(categoryId, payload)
            return category
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default UpdateCategory