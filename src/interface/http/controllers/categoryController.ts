import { Request, Response } from "express";
import _pick from "lodash/pick";
import HTTP_STATUS from "http-status-codes"
import CategoryRepository from "../../../infra/repository/categoryRepository";
import CreateCategory from "../../../usecases/categories/createCategory";
import DeleteCategory from "../../../usecases/categories/deleteCategory";
import GetCategories from "../../../usecases/categories/getCategories";
import GetCategory from "../../../usecases/categories/getCategory";
import UpdateCategory from "../../../usecases/categories/updateCategory";


class CategoryController {
    createCategory: CreateCategory
    getCategory: GetCategory
    getCategories: GetCategories
    deleteCategory: DeleteCategory
    updateCategory: UpdateCategory
    categoryRepository: CategoryRepository
    constructor({createCategory, categoryRepository, getCategory , getCategories, updateCategory, deleteCategory}: {createCategory: CreateCategory, getCategory: GetCategory, updateCategory: UpdateCategory, deleteCategory: DeleteCategory
        getCategories: GetCategories, categoryRepository: CategoryRepository}) {
        this.createCategory = createCategory
        this.getCategory = getCategory
        this.getCategories = getCategories
        this.updateCategory = updateCategory
        this.deleteCategory = deleteCategory
        this.categoryRepository = categoryRepository

    } 


    async create(req: Request, res: Response) {
        try {
            const payload = req.body
            const category = await this.createCategory.execute(payload)
            res.status(HTTP_STATUS.CREATED).json({ success: true, msg: `Category successfully created`, data: category })
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`)
            }
            throw error
        }
    }
    

    async get(req: Request, res: Response) {
        try {
            const { categoryId } = req.params
            const category = await this.getCategory.execute(categoryId)
            if (!category) return res.status(400).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully retrieved`, data: category })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const payload = req.query
            const categories = await this.getCategories.execute(payload)
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Products successfully retrieved`, data: categories })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async update(req: Request, res: Response) {
        try {
            const { categoryId } = req.params
            const payload = req.body
            const category = await this.updateCategory.execute(categoryId, payload)
            if (!category) return res.status(400).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully updated`, data: category })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const { categoryId } = req.params
            const category = await this.deleteCategory.execute(categoryId)
            if (!category) return res.status(404).json({ success: false, msg: `Product with this ID not found` })
            res.status(HTTP_STATUS.OK).json({ success: true, msg: `Product details successfully deleted`, data: category })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, data: error })
        }
    }

    
}



export default CategoryController