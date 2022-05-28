import { Request, Response } from "express";
import { Category } from "../entities/category";
import { Page } from "../entities/page";
import { Product } from "../entities/product";
import { ProductPage } from "../entities/productPage";
import { ReviewAttribute } from "../entities/reviewAttribute";
import { Review } from '../entities/review';

async function deleteCategory(req: Request, res: Response): Promise<Response<any>> {

	let deleteCategory = await Category.findOne(req.params.id);

	if (deleteCategory) {

		if (res.locals.session.user.teams.find(team => team.id == deleteCategory.team.id)) {

			await Category.remove(deleteCategory);
			return res.json(deleteCategory);

		} else {

			return res.status(403).json({ message: "Forbidden" });

		}

	} else {

		return res.status(404).json({ message: "Category not found" });

	}

}

async function deletePage(req: Request, res: Response): Promise<Response<any>> {

	let deletePage = await Page.findOne(req.params.id);

	if (deletePage) {

		if (res.locals.session.user.teams.find(team => team.id == deletePage.team.id)) {

			await Page.remove(deletePage);
			return res.json(deletePage);

		} else {

			return res.status(403).json({ message: "Forbidden" });

		}

	} else {

		return res.status(404).json({ message: "Page not found" });

	}

}

async function deleteProduct(req: Request, res: Response): Promise<Response<any>> {

	let deleteProduct = await Product.findOne(req.params.id);

	if (deleteProduct) {

		if (res.locals.session.user.teams.find(team => team.id == deleteProduct.team.id)) {

			await Product.remove(deleteProduct);
			return res.json(deleteProduct);

		} else {

			return res.status(403).json({ message: "Forbidden" });

		}

	} else {

		return res.status(404).json({ message: "Product not found" });

	}

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
