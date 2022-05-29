import { Request, Response } from "express";
import { In } from "typeorm";
import { Category } from "../entities/category";
import { Page } from "../entities/page";
import { Product } from "../entities/product";
import { ProductPage } from "../entities/productPage";
import { Review } from "../entities/review";
import { ReviewAttribute } from "../entities/reviewAttribute";
import { Rol } from "../entities/rol";
import { Team } from "../entities/team";
import { User } from "../entities/user";
import { hashPassword } from "../libs/passwordFunctions";
import { CategoryModel } from "../models/category.model";
import { PageModel } from "../models/page.model";
import { ProductModel } from "../models/product.model";
import { ProductPageModel } from "../models/productPage.model";
import { ReviewModel } from "../models/review.model";
import { ReviewAttributeModel } from "../models/reviewAttribute.model";
import { RolModel } from "../models/rol.model";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";

async function updateCategory(req: Request, res: Response): Promise<Response<any>> {

	let category = await Category.findOne(req.params.id);

	if (!category) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Category not found." });

	}

	category.name = req.body.name || category.name;
	category.description = req.body.description || category.description;

	category.lastUpdateTimestamp = new Date();

	await category.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Category updated.", data: new CategoryModel(category) });

}

async function updatePage(req: Request, res: Response): Promise<Response<any>> {

	let page = await Page.findOne(req.params.id);

	if (!page) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Page not found." });

	}

	if (req.body.reviewAttributes) {

		let existingReviewAttributes = await ReviewAttribute.find({
			where: {
				teamId: page.teamId,
				id: In(req.body.reviewAttributes)
			}
		});

		if (existingReviewAttributes.length != req.body.reviewAttributes.length) {

			let missingReviewAttributes = req.body.products.filter(x => !existingReviewAttributes.find(y => y.id == x));

			return res.status(400).json({ status: "error", statusCode: 400, message: "Products not found.", "data": missingReviewAttributes });

		}

		page.reviewAttributes = req.body.existingReviewAttributes;

	}

	page.name = req.body.name || page.name;
	page.description = req.body.description || page.description;
	page.reviewTag = req.body.reviewTag || page.reviewTag;
	page.reviewInside = req.body.reviewInside || page.reviewInside;
	page.reviewInsideTag = req.body.reviewInsideTag || page.reviewInsideTag;

	page.lastUpdateTimestamp = new Date();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Page updated.", data: new PageModel(page) });

}

async function updateProduct(req: Request, res: Response): Promise<Response<any>> {

	let product = await Product.findOne(req.params.id);

	if (!product) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Product not found." });

	}

	if (req.body.categoryId) {

		let existingCategory = await Category.findOne({
			where: {
				teamId: product.teamId,
				id: req.body.categoryId
			}
		});

		if (!existingCategory) {

			return res.status(404).json({ status: "error", statusCode: 404, message: "Category not found." });

		}

		product.category = req.body.categoryId;

	}

	product.name = req.body.name || product.name;
	product.description = req.body.description || product.description;

	product.lastUpdateTimestamp = new Date();

	await product.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Product updated.", data: new ProductModel(product) });

}

async function updateProductPage(req: Request, res: Response): Promise<Response<any>> {

	let productPage = await ProductPage.findOne(req.params.id);

	if (!productPage) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Product page not found." });

	}

	if (req.body.productId) {

		let existingProduct = await Product.findOne({
			where: {
				teamId: productPage.teamId,
				id: req.body.productId
			}
		});

		if (!existingProduct) {

			return res.status(404).json({ status: "error", statusCode: 404, message: "Product not found." });

		}

		productPage.product = req.body.productId;

	}

	if (req.body.pageId) {

		let existingPage = await Page.findOne({
			where: {
				teamId: productPage.teamId,
				id: req.body.pageId
			}
		});

		if (!existingPage) {

			return res.status(404).json({ status: "error", statusCode: 404, message: "Page not found." });

		}

		productPage.page = req.body.pageId;

	}

	productPage.url = req.body.url || productPage.url;

	productPage.lastUpdateTimestamp = new Date();

	await productPage.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Product page updated.", data: new ProductPageModel(productPage) });

}

async function updateReview(req: Request, res: Response): Promise<Response<any>> {

	let review = await Review.findOne(req.params.id);

	if (!review) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Review not found." });

	}

	if (req.body.productPageId) {

		let existingProductPage = await ProductPage.findOne({
			where: {
				teamId: review.teamId,
				id: req.body.productPageId
			}
		});

		if (!existingProductPage) {

			return res.status(404).json({ status: "error", statusCode: 404, message: "Product page not found." });

		}

		review.productPage = req.body.productPageId;

	}

	review.value = req.body.value || review.value;

	review.lastUpdateTimestamp = new Date();

	await review.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Review updated.", data: new ReviewModel(review) });

}

async function updateReviewAttribute(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttribute = await ReviewAttribute.findOne(req.params.id);

	if (!reviewAttribute) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Review attribute not found." });

	}

	if (req.body.pages) {

		let existingPages = await Page.find({
			where: {
				teamId: reviewAttribute.teamId,
				id: In(req.body.pages)
			}
		});

		if (existingPages.length != req.body.pages.length) {

			let missingPages = req.body.pages.filter(x => !existingPages.find(y => y.id == x));

			return res.status(400).json({ status: "error", statusCode: 400, message: "Products not found.", "data": missingPages });

		}

		reviewAttribute.pages = req.body.existingPages;

	}

	reviewAttribute.key = req.body.key || reviewAttribute.key;
	reviewAttribute.value = req.body.value || reviewAttribute.value;

	reviewAttribute.lastUpdateTimestamp = new Date();

	await reviewAttribute.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Review attribute updated.", data: new ReviewAttributeModel(reviewAttribute) });

}

async function updateRol(req: Request, res: Response): Promise<Response<any>> {

	let rol = await Rol.findOne(req.params.id);

	if (!rol) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Rol not found." });

	}

	rol.name = req.body.name || rol.name;
	rol.description = req.body.description || rol.description;

	rol.teamAdmin = req.body.teamAdmin || rol.teamAdmin;
	rol.canGetUsers = req.body.canGetUsers || rol.canGetUsers;
	rol.canRemoveUser = req.body.canRemoveUser || rol.canRemoveUser;
	rol.canEditUser = req.body.canEditUser || rol.canEditUser;
	rol.canGetTeams = req.body.canGetTeams || rol.canGetTeams;
	rol.canCreateTeam = req.body.canCreateTeam || rol.canCreateTeam;
	rol.canRemoveTeam = req.body.canRemoveTeam || rol.canRemoveTeam;
	rol.canEditTeam = req.body.canEditTeam || rol.canEditTeam;
	rol.canGetRoles = req.body.canGetRoles || rol.canGetRoles;
	rol.canCreateRol = req.body.canCreateRol || rol.canCreateRol;
	rol.canRemoveRol = req.body.canRemoveRol || rol.canRemoveRol;
	rol.canEditRol = req.body.canEditRol || rol.canEditRol;
	rol.canGetCategories = req.body.canGetCategories || rol.canGetCategories;
	rol.canCreateCategory = req.body.canCreateCategory || rol.canCreateCategory;
	rol.canRemoveCategory = req.body.canRemoveCategory || rol.canRemoveCategory;
	rol.canEditCategory = req.body.canEditCategory || rol.canEditCategory;
	rol.canGetPages = req.body.canGetPages || rol.canGetPages;
	rol.canCreatePage = req.body.canCreatePage || rol.canCreatePage;
	rol.canRemovePage = req.body.canRemovePage || rol.canRemovePage;
	rol.canEditPage = req.body.canEditPage || rol.canEditPage;
	rol.canGetProducts = req.body.canGetProducts || rol.canGetProducts;
	rol.canCreateProduct = req.body.canCreateProduct || rol.canCreateProduct;
	rol.canRemoveProduct = req.body.canRemoveProduct || rol.canRemoveProduct;
	rol.canEditProduct = req.body.canEditProduct || rol.canEditProduct;
	rol.canGetProductPages = req.body.canGetProductPages || rol.canGetProductPages;
	rol.canCreateProductPage = req.body.canCreateProductPage || rol.canCreateProductPage;
	rol.canRemoveProductPage = req.body.canRemoveProductPage || rol.canRemoveProductPage;
	rol.canEditProductPage = req.body.canEditProductPage || rol.canEditProductPage;
	rol.canGetReviews = req.body.canGetReviews || rol.canGetReviews;
	rol.canCreateReview = req.body.canCreateReview || rol.canCreateReview;
	rol.canRemoveReview = req.body.canRemoveReview || rol.canRemoveReview;
	rol.canEditReview = req.body.canEditReview || rol.canEditReview;
	rol.canGetReviewAttributes = req.body.canGetReviewAttributes || rol.canGetReviewAttributes;
	rol.canCreateReviewAttribute = req.body.canCreateReviewAttribute || rol.canCreateReviewAttribute;
	rol.canRemoveReviewAttribute = req.body.canRemoveReviewAttribute || rol.canRemoveReviewAttribute;
	rol.canEditReviewAttribute = req.body.canEditReviewAttribute || rol.canEditReviewAttribute;

	rol.lastUpdateTimestamp = new Date();

	await rol.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Rol updated.", data: new RolModel(rol) });

}

async function updateTeam(req: Request, res: Response): Promise<Response<any>> {

	let team = await Team.findOne(req.params.id);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	team.name = req.body.name || team.name;
	team.description = req.body.description || team.description;

	team.lastUpdateTimestamp = new Date();

	await team.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Team updated.", data: new TeamModel(team) });

}

async function updateUser(req: Request, res: Response): Promise<Response<any>> {
	
	let user = await User.findOne({
		where: {
			id: req.params.id
		},
		relations: ["roles"]
	});

	if (!user) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "User not found." });

	}

	if (req.body.roles) {

		let existingRoles = await Rol.find({
			where: {
				id: In(req.body.roles)
			}
		});

		if (existingRoles.length != req.body.roles.length) {

			let missingRoles = req.body.roles.filter(x => !existingRoles.find(y => y.id == x));

			return res.status(400).json({ status: "error", statusCode: 400, message: "Roles not found.", "data": missingRoles });

		}

		existingRoles = existingRoles.filter(rol => user.teams.map(team => team.id).includes(rol.teamId));

		if (existingRoles.length != req.body.roles.length) {

			let missingRoles = req.body.roles.filter(x => !existingRoles.find(y => y.id == x));

			return res.status(400).json({ status: "error", statusCode: 400, message: "Roles not found.", "data": missingRoles });

		}

		user.roles = req.body.existingRoles;

	}

	user.user = req.body.user || user.user;
	user.email = req.body.email || user.email;
	user.password = await hashPassword(req.body.password) || user.password;

	user.lastUpdateTimestamp = new Date();

	await user.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "User updated.", data: new UserModel(user) });

}

export {updateCategory, updatePage, updateProduct, updateProductPage, updateReview, updateReviewAttribute, updateRol, updateTeam, updateUser};