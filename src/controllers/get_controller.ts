import { Request, Response } from 'express';
import { Category } from '../entity/category';
import { Page } from '../entity/page';
import { Product } from '../entity/product';
import { ProductPage } from '../entity/productPage';
import { Review } from '../entity/review';
import { ReviewAttribute } from '../entity/reviewAttribute';

// ! All data routes
function getAPIInfo(req: Request, res: Response) {

	return res.json("Info!");

}

async function getAllCategories(req: Request, res: Response) {

	let categories = await Category.find();

	return res.json(categories);

}

async function getAllPages(req: Request, res: Response) {

	let pages = await Page.find();

	return res.json(pages);

}

async function getAllProducts(req: Request, res: Response) {

	let products = await Product.find(req.query);

	return res.json(products);

}

async function getAllProductsPages(req: Request, res: Response) {

	let productsPages = await ProductPage.find();

	return res.json(productsPages);

}

async function getAllReviews(req: Request, res: Response) {

	let reviews = await Review.find();

	return res.json(reviews);

}

async function getAllReviewsAttributes(req: Request, res: Response) {

	let reviewAttributes = await ReviewAttribute.find();

	return res.json(reviewAttributes);

}

export { getAPIInfo, getAllCategories, getAllPages, getAllProducts, getAllProductsPages, getAllReviews, getAllReviewsAttributes };

