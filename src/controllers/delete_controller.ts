import { Request, Response } from "express";
import { Category } from "../entity/category";
import { Page } from "../entity/page";
import { Product } from "../entity/product";
import { ProductPage } from "../entity/productPage";
import { ReviewAttribute } from "../entity/reviewAttribute";
import { Review } from './../entity/review';

async function deleteCategory(req: Request, res: Response): Promise<Response<any>> {

	let deleteCategory = await Category.findOne(req.params.id);
	await deleteCategory.remove();
	return res.json(deleteCategory);

}

async function deletePage(req: Request, res: Response): Promise<Response<any>> {

	let deletePage = await Page.findOne(req.params.id);
	await deletePage.remove();
	return res.json(deletePage);

}

async function deleteProduct(req: Request, res: Response): Promise<Response<any>> {

	let deleteProduct = await Product.findOne(req.params.id);
	await deleteProduct.remove();
	return res.json(deleteProduct);

}

async function deleteProductPage(req: Request, res: Response): Promise<Response<any>> {

	let deleteProductPage = await ProductPage.findOne(req.params.id);
	await deleteProductPage.remove();
	return res.json(deleteProductPage);

}

async function deleteReview(req: Request, res: Response): Promise<Response<any>> {

	let deleteReview = await Review.findOne(req.params.id);
	await deleteReview.remove();
	return res.json(deleteReview);

}

async function deleteReviewAttribute(req: Request, res: Response): Promise<Response<any>> {

	let deleteReviewAttribute = await ReviewAttribute.findOne(req.params.id);
	await deleteReviewAttribute.remove();
	return res.json(deleteReviewAttribute);

}

export { deleteCategory, deletePage, deleteProduct, deleteProductPage, deleteReview, deleteReviewAttribute };
