import CategoryRepository from "../../infra/repository/categoryRepository"
import log from "../../interface/http/utils/logger"

class GetCategories{
    categoryRepository: CategoryRepository
    logger: typeof log
    constructor({categoryRepository, logger}: {categoryRepository: CategoryRepository, logger: typeof log}) {
        this.categoryRepository = categoryRepository
        this.logger = logger
    }

    async execute(payload: object) {
        try {
           const Categories =  await this.categoryRepository.getAll(payload)
           return Categories
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default GetCategories