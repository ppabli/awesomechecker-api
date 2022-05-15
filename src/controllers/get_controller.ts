import { Request, Response } from 'express';
import { Category } from '../entities/category';
import { Page } from '../entities/page';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { Info } from '../models/info.model';

async function getAPIInfo(req: Request, res: Response): Promise<Response<any>> {

	let info = new Info();
	let data = await info.getAllInfo()
	return res.json(data);

}

async function getAllCategories(req: Request, res: Response): Promise<Response<any>> {

	let categories = await Category.find();

	return res.json(categories);

}

async function getAllPages(req: Request, res: Response): Promise<Response<any>> {

	let pages = await Page.find();

	return res.json(pages);

}

async function getAllProducts(req: Request, res: Response): Promise<Response<any>> {

	let products = await Product.find();

	return res.json(products);

}

async function getAllProductsPages(req: Request, res: Response): Promise<Response<any>> {

	let productsPages = await ProductPage.find({ relations: ['product', 'page'] });

	return res.json(productsPages);

}

async function getAllReviews(req: Request, res: Response): Promise<Response<any>> {

	let reviews = await Review.find({ relations: ['productPage'] });

	return res.json(reviews);

}

async function getAllReviewsAttributes(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttributes = await ReviewAttribute.find({ relations: ['page'] });

	return res.json(reviewAttributes);

}

export { getAPIInfo, getAllCategories, getAllPages, getAllProducts, getAllProductsPages, getAllReviews, getAllReviewsAttributes };

