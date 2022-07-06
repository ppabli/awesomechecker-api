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
import { Team } from "../entities/team";
import { TeamModel } from "../models/team.model";
import { User } from "../entities/user";
import { UserModel } from "../models/user.model";
import { Tag } from "aws-sdk/clients/swf";
import { Rol } from "../entities/rol";
import { RolModel } from "../models/rol.model";

async function deleteCategory(req: Request, res: Response): Promise<Response<any>> {

	let category = await Category.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!category) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	category.lastUpdateTimestamp = new Date();
	category.isDeleted = true;

	await category.save();

	return res.json(new CategoryModel(category));

}

async function deletePage(req: Request, res: Response): Promise<Response<any>> {

	let page = await Page.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!page) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	page.lastUpdateTimestamp = new Date();
	page.isDeleted = true;

	await page.save();

	return res.json(new PageModel(page));

}

async function deleteProduct(req: Request, res: Response): Promise<Response<any>> {

	let product = await Product.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!product) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	for (let image of product.images.filter(img => img != process.env.DEFAULT_IMAGE_ID)) {

		globalThis.S3.putObjectTagging({

			Bucket: process.env.BUCKET_NAME,
			Key: image,
			Tagging: {
				TagSet: [
					{
						Key: 'deleted',
						Value: '1'
					}
				]
			}

		}, () => { })

	}

	product.lastUpdateTimestamp = new Date();
	product.isDeleted = true;

	await product.save();

	return res.json(new ProductModel(product));

}

async function deleteProductPage(req: Request, res: Response): Promise<Response<any>> {

	let productPage = await ProductPage.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!productPage) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	productPage.lastUpdateTimestamp = new Date();
	productPage.isDeleted = true;

	await productPage.save();

	return res.json(new ProductPageModel(productPage));


}

async function deleteReview(req: Request, res: Response): Promise<Response<any>> {

	let review = await Review.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!review) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	review.lastUpdateTimestamp = new Date();
	review.isDeleted = true;

	await review.save();

	return res.json(new ReviewModel(review));


}

async function deleteReviewAttribute(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttribute = await ReviewAttribute.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!reviewAttribute) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	reviewAttribute.lastUpdateTimestamp = new Date();
	reviewAttribute.isDeleted = true;

	await reviewAttribute.save();

	return res.json(new ReviewAttributeModel(reviewAttribute));

}

async function deleteRol(req: Request, res: Response): Promise<Response<any>> {

	let rol = await Rol.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!rol) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	rol.lastUpdateTimestamp = new Date();
	rol.isDeleted = true;

	await rol.save();

	return res.json(new RolModel(rol));

}

async function deleteTeam(req: Request, res: Response): Promise<Response<any>> {

	let team = await Team.findOne({
		where: {
			id: req.params.id && In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!team) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	for (let image of team.images.filter(img => img != process.env.DEFAULT_IMAGE_ID)) {

		globalThis.S3.putObjectTagging({

			Bucket: process.env.BUCKET_NAME,
			Key: image,
			Tagging: {
				TagSet: [
					{
						Key: 'deleted',
						Value: '1'
					}
				]
			}

		}, () => { })

	}

	team.lastUpdateTimestamp = new Date();
	team.isDeleted = true;

	await team.save();

	return res.json(new TeamModel(team));

}

async function deleteUser(req: Request, res: Response): Promise<Response<any>> {

	let user = await User.findOne({
		where: {
			id: req.params.id,
			teamId: In(res.locals.session.user.teams.map(team => team.id))
		}
	})

	if (!user && res.locals.session.user.id != req.params.id) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action or the entity do not exist." });

	}

	for (let image of user.images.filter(img => img != process.env.DEFAULT_IMAGE_ID)) {

		globalThis.S3.putObjectTagging({

			Bucket: process.env.BUCKET_NAME,
			Key: image,
			Tagging: {
				TagSet: [
					{
						Key: 'deleted',
						Value: '1'
					}
				]
			}

		}, () => { })

	}

	user.lastUpdateTimestamp = new Date();
	user.isDeleted = true;

	await user.save();

	return res.json(new UserModel(user));

}

export { deleteCategory, deletePage, deleteProduct, deleteProductPage, deleteReview, deleteReviewAttribute, deleteRol, deleteTeam, deleteUser };
