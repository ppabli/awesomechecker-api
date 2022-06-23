import { Request, Response } from "express";
import { Category } from "../entities/category";
import { Page } from "../entities/page";
import { Product } from "../entities/product";
import { ProductPage } from "../entities/productPage";
import { ReviewAttribute } from "../entities/reviewAttribute";
import { Review } from '../entities/review';
import { In } from "typeorm";
import { CategoryModel } from "../models/category.model";
import { PageModel } from "../models/page.model";
import { ProductModel } from "../models/product.model";
import { ProductPageModel } from "../models/productPage.model";
import { ReviewModel } from "../models/review.model";
import { ReviewAttributeModel } from "../models/reviewAttribute.model";
import { Rol } from "../entities/rol";
import { RolModel } from "../models/rol.model";
import { Team } from "../entities/team";
import { TeamModel } from "../models/team.model";
import { User } from "../entities/user";
import { UserModel } from "../models/user.model";

async function deleteCategory(req: Request, res: Response): Promise<Response<any>> {

	let category = await Category.findOne(req.params.id);

	if (!category) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	category.lastUpdateTimestamp = new Date();
	category.isDeleted = true;

	await category.save();

	return res.json(new CategoryModel(category));

}

async function deletePage(req: Request, res: Response): Promise<Response<any>> {

	let page = await Page.findOne(req.params.id);

	if (!page) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	page.lastUpdateTimestamp = new Date();
	page.isDeleted = true;

	await page.save();

	return res.json(new PageModel(page));

}

async function deleteProduct(req: Request, res: Response): Promise<Response<any>> {

	let product = await Product.findOne(req.params.id);

	if (!product) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	product.lastUpdateTimestamp = new Date();
	product.isDeleted = true;

	await product.save();

	return res.json(new ProductModel(product));

}

async function deleteProductPage(req: Request, res: Response): Promise<Response<any>> {

	let productPage = await ProductPage.findOne(req.params.id);

	if (!productPage) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	productPage.lastUpdateTimestamp = new Date();
	productPage.isDeleted = true;

	await productPage.save();

	return res.json(new ProductPageModel(productPage));


}

async function deleteReview(req: Request, res: Response): Promise<Response<any>> {

	let review = await Review.findOne(req.params.id);

	if (!review) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	review.lastUpdateTimestamp = new Date();
	review.isDeleted = true;

	await review.save();

	return res.json(new ReviewModel(review));


}

async function deleteReviewAttribute(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttribute = await ReviewAttribute.findOne(req.params.id);

	if (!reviewAttribute) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	reviewAttribute.lastUpdateTimestamp = new Date();
	reviewAttribute.isDeleted = true;

	await reviewAttribute.save();

	return res.json(new ReviewAttributeModel(reviewAttribute));

}

async function deleteRol(req: Request, res: Response): Promise<Response<any>> {

	let rol = await Rol.findOne(req.params.id);

	if (!rol) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	rol.lastUpdateTimestamp = new Date();
	rol.isDeleted = true;

	await rol.save();

	return res.json(new RolModel(rol));

}

async function deleteTeam(req: Request, res: Response): Promise<Response<any>> {

	let team = await Team.findOne(req.params.id);

	if (!team) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	team.lastUpdateTimestamp = new Date();
	team.isDeleted = true;

	await team.save();

	return res.json(new TeamModel(team));

}

async function deleteUser(req: Request, res: Response): Promise<Response<any>> {

	let user = await User.findOne(req.params.id);

	if (!user) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	user.lastUpdateTimestamp = new Date();
	user.isDeleted = true;

	await user.save();

	return res.json(new UserModel(user));

}

export { deleteCategory, deletePage, deleteProduct, deleteProductPage, deleteReview, deleteReviewAttribute, deleteRol, deleteTeam, deleteUser };
