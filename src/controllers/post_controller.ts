import { Request, Response } from "express";
import { Page } from "../entity/page";
import { Category } from './../entity/category';
import { Product } from './../entity/product';
import { ProductPage } from './../entity/productPage';
import { Review } from './../entity/review';
import { ReviewAttribute } from './../entity/reviewAttribute';

function postNewCategory(req: Request, res: Response): Response<any> {

	let newCategory = new Category();
	newCategory.name = req.body.name

	newCategory.save();

	return res.json(newCategory)

}

function postNewPage(req: Request, res: Response): Response<any> {

	let newPage = new Page();
	newPage.name = req.body.name;
	newPage.reviewTag = req.body.reviewTag;
	newPage.reviewInside = req.body.reviewInside;
	newPage.reviewInsideTag = req.body.reviewInsideTag;

	newPage.save();

	return res.json(newPage)

}

function postNewProduct(req: Request, res: Response): Response<any> {

	let newProduct = new Product();
	newProduct.category = req.body.categoryId
	newProduct.name = req.body.name

	newProduct.save();

	return res.json(newProduct)

}

function postNewProductPage(req: Request, res: Response): Response<any> {

	let newProductPage = new ProductPage();
	newProductPage.product = req.body.product;
	newProductPage.page = req.body.page;
	newProductPage.url = req.body.url;

	newProductPage.save();

	return res.json(newProductPage)

}

function postNewReview(req: Request, res: Response): Response<any> {

	let newReview = new Review();
	newReview.productPage = req.body.productPage
	newReview.value = req.body.value
	newReview.currency = req.body.currency

	newReview.save();

	return res.json(newReview)

}

function postNewReviewAttribute(req: Request, res: Response): Response<any> {

	let newReviewAttribute = new ReviewAttribute();
	newReviewAttribute.page = req.body.page;
	newReviewAttribute.key = req.body.key;
	newReviewAttribute.value = req.body.value;

	newReviewAttribute.save();

	return res.json(newReviewAttribute)

}

export { postNewCategory, postNewPage, postNewProduct, postNewProductPage, postNewReview, postNewReviewAttribute };

