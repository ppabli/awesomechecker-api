import { Request, Response } from "express";
import { In } from "typeorm";
import { Category } from '../entities/category';
import { Page } from "../entities/page";
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { Rol } from "../entities/rol";
import { Team } from "../entities/team";
import { User } from "../entities/user";
import { comparePassword, hashPassword } from "../libs/passwordFunctions";
import { encodeSession } from "../libs/sessionsFunctions";
import { CategoryModel } from "../models/category.model";
import { PageModel } from "../models/page.model";
import { ProductModel } from "../models/product.model";
import { ProductPageModel } from "../models/productPage.model";
import { ReviewModel } from "../models/review.model";
import { ReviewAttributeModel } from "../models/reviewAttribute.model";
import { RolModel } from "../models/rol.model";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";

async function postNewCategory(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let existingProducts = await Product.find({
		where: {
			id: In(req.body.products)
		}
	});

	if (existingProducts.length != req.body.products.length) {

		let missingProducts = req.body.products.filter(x => !existingProducts.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: "Products not found.", missingProducts });

	}

	if (!res.locals.session.user.globalAdmin) {

		existingProducts = existingProducts.filter((product: Product) => res.locals.session.user.teams.find((team: TeamModel) => team.getId() == product.teamId));

	}

	if (existingProducts.length != req.body.products.length) {

		let missingProducts = req.body.products.filter(x => !existingProducts.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: `This products do not belong to your team: ${missingProducts}` });

	}

	let newCategory = new Category();
	newCategory.name = req.body.name;
	newCategory.description = req.body.description;
	newCategory.team = req.body.teamId;
	newCategory.products = existingProducts;

	newCategory.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Category created", data: new CategoryModel(newCategory) });

}

async function postNewPage(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let existingReviewAttributes = await ReviewAttribute.find({
		where: {
			id: In(req.body.reviewAttributes)
		}
	});

	if (existingReviewAttributes.length != req.body.reviewAttributes.length) {

		let missingReviewAttributes = req.body.reviewAttributes.filter(x => !existingReviewAttributes.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: "Review attributes not found.", missingReviewAttributes });

	}

	if (!res.locals.session.user.globalAdmin) {

		existingReviewAttributes = existingReviewAttributes.filter((reviewAttribute: ReviewAttribute) => res.locals.session.user.teams.find((team: TeamModel) => team.getId() == reviewAttribute.teamId));

	}

	if (existingReviewAttributes.length != req.body.reviewAttributes.length) {

		let missingReviewAttributes = req.body.reviewAttributes.filter(x => !existingReviewAttributes.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: `This review attributes do not belong to your team: ${missingReviewAttributes}` });

	}

	let existingProductPages = await ProductPage.find({
		where: {
			id: In(req.body.productPages)
		}
	});

	if (existingProductPages.length != req.body.productPages.length) {

		let missingProductPages = req.body.productPages.filter(x => !existingProductPages.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: "Product pages not found.", missingProductPages });

	}

	if (!res.locals.session.user.globalAdmin) {

		existingProductPages = existingProductPages.filter((productPage: ProductPage) => res.locals.session.user.teams.find((team: TeamModel) => team.getId() == productPage.teamId));

	}

	if (existingProductPages.length != req.body.productPages.length) {

		let missingProductPages = req.body.productPages.filter(x => !existingProductPages.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: `This product pages do not belong to your team: ${missingProductPages}` });

	}

	let newPage = new Page();
	newPage.name = req.body.name;
	newPage.description = req.body.description;
	newPage.team = req.body.teamId;
	newPage.reviewAttributes = existingReviewAttributes;
	newPage.productPages = existingProductPages;

	newPage.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Page created.", data: new PageModel(newPage) });

}

async function postNewProduct(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let category = await Category.findOne(req.body.categoryId);

	if (!category) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Category not found." });

	}

	let existingProductPages = await ProductPage.find({
		where: {
			id: In(req.body.productPages)
		}
	});

	if (existingProductPages.length != req.body.productPages.length) {

		let missingProductPages = req.body.productPages.filter(x => !existingProductPages.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: "Product pages not found.", missingProductPages });

	}

	if (!res.locals.session.user.globalAdmin) {

		existingProductPages = existingProductPages.filter((productPage: ProductPage) => res.locals.session.user.teams.find((team: TeamModel) => team.getId() == productPage.teamId));

	}

	if (existingProductPages.length != req.body.productPages.length) {

		let missingProductPages = req.body.productPages.filter(x => !existingProductPages.find(y => y.id == x));

		return res.status(400).json({ status: "error", statusCode: 400, message: `This product pages do not belong to your team: ${missingProductPages}` });

	}

	let newProduct = new Product();
	newProduct.name = req.body.name;
	newProduct.description = req.body.description;
	newProduct.team = req.body.teamId;
	newProduct.category = req.body.categoryId;
	newProduct.productPages = existingProductPages;

	newProduct.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Product created.", data: new ProductModel(newProduct) });

}

async function postNewProductPage(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let product = await Product.findOne(req.body.productId);

	if (!product) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Product not found." });

	}

	let page = await Page.findOne(req.body.pageId);

	if (!page) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Page not found." });

	}

	let newProductPage = new ProductPage();
	newProductPage.url = req.body.url;
	newProductPage.team = req.body.teamId;
	newProductPage.product = req.body.productId;
	newProductPage.page = req.body.pageId;

	newProductPage.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Product page created.", data: new ProductPageModel(newProductPage) });

}

async function postNewReview(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let productPage = await ProductPage.findOne(req.body.productPageId);

	if (!productPage) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Product page not found." });

	}

	let newReview = new Review();
	newReview.value = req.body.value;
	newReview.team = req.body.teamId;
	newReview.productPage = req.body.productPageId;

	newReview.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Review created.", data: new ReviewModel(newReview) });

}

async function postNewReviewAttribute(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let team = await Team.findOne(req.body.teamId);

	if (!team) {

		return res.status(404).json({ status: "error", statusCode: 404, message: "Team not found." });

	}

	let pages = await Page.find({

		where: {
			id: In(req.body.pages)
		}

	});

	if (!pages) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "Pages not found." });

	} else if (!res.locals.session.user.globalAdmin) {

		pages = pages.filter((page: Page) => res.locals.session.user.teams.find((team: TeamModel) => team.getId() == page.teamId));

		if (pages.length != req.body.pages.length) {

			return res.status(403).json({ status: "error", statusCode: 403, message: "Pages not found." });

		}

	}

	let newReviewAttribute = new ReviewAttribute();
	newReviewAttribute.key = req.body.key;
	newReviewAttribute.value = req.body.value;
	newReviewAttribute.team = req.body.teamId;
	newReviewAttribute.pages = pages;

	newReviewAttribute.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Review attribute created.", data: new ReviewAttributeModel(newReviewAttribute) });

}

async function postNewUser(req: Request, res: Response): Promise<Response<any>> {

	let existingUser = await User.find({
		where: {
			email: req.body.email,
			user: req.body.user
		}
	});

	if (existingUser.length) {

		return res.status(400).json({ status: "error", statusCode: 400, message: "User already exists." });

	}

	let newUser = new User();
	newUser.user = req.body.user;
	newUser.email = req.body.email;
	newUser.password = await hashPassword(req.body.password);

	let defaultTeam = await Team.findOne({ token: process.env.DEFAULT_TEAM_TOKEN });
	let defaultRole = await Rol.findOne({ token: process.env.DEFAULT_ROL_TOKEN });

	newUser.teams = [defaultTeam];
	newUser.roles = [defaultRole];

	newUser.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "User created.", data: new UserModel(newUser) });

}

async function postNewTeam(req: Request, res: Response): Promise<Response<any>> {

	let newTeam = new Team();
	newTeam.name = req.body.name;
	newTeam.description = req.body.description;
	newTeam.token = await hashPassword(new Date().toString());

	newTeam.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Team created.", data: new TeamModel(newTeam) });

}

async function postNewRol(req: Request, res: Response): Promise<Response<any>> {

	if (!res.locals.session.user.globalAdmin && !res.locals.session.user.teams.find((team: TeamModel) => team.getId() == req.body.teamId)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

	let dbTeam = await Team.findOne(req.body.teamId);

	if (!dbTeam) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "Team not found." });

	}

	let filteredUsers: User[] = [];
	let usersArray = req.body.users;

	if (usersArray) {

		let dbUsers = await User.find({
			relations: ["teams"],
			where: {
				id: In(usersArray),
			}
		});

		if (dbUsers.length != usersArray.length) {

			let notFoundUsers = usersArray.filter(x => !dbUsers.find(y => y.id == x));

			return res.status(403).json({ status: "error", statusCode: 403, message: `Users with IDs: ${notFoundUsers} not found.` });

		}

		for (let user of dbUsers) {

			if (user.teams.filter(team => team.id == req.body.teamId)) {

				filteredUsers.push(user);

			}

		}

		if (filteredUsers.length != req.body.users.length) {

			let invalidUsers = req.body.users.filter(x => !filteredUsers.find(y => y.id == x));
			return res.status(403).json({ status: "error", statusCode: 403, message: `You are not authorized to perform this action with this users: ${invalidUsers}` });

		}

	}

	let newRol = new Rol();
	newRol.name = req.body.name;
	newRol.description = req.body.description;
	newRol.teamId = req.body.teamId;
	newRol.token = await hashPassword(new Date().toString());
	newRol.users = filteredUsers;

	// Optional fields
	newRol.teamAdmin = req.body.teamAdmin;
	newRol.canGetUsers = req.body.canGetUsers;
	newRol.canGetTeams = req.body.canGetTeams;
	newRol.canCreateTeam = req.body.canCreateTeam;
	newRol.canRemoveTeam = req.body.canRemoveTeam;
	newRol.canEditTeam = req.body.canEditTeam;
	newRol.canGetRoles = req.body.canGetRoles;
	newRol.canCreateRol = req.body.canCreateRol;
	newRol.canRemoveRol = req.body.canRemoveRol;
	newRol.canEditRol = req.body.canEditRol;
	newRol.canGetCategories = req.body.canGetCategories;
	newRol.canCreateCategory = req.body.canCreateCategory;
	newRol.canRemoveCategory = req.body.canRemoveCategory;
	newRol.canEditCategory = req.body.canEditCategory;
	newRol.canGetPages = req.body.canGetPages;
	newRol.canCreatePage = req.body.canCreatePage;
	newRol.canRemovePage = req.body.canRemovePage;
	newRol.canEditPage = req.body.canEditPage;
	newRol.canGetProducts = req.body.canGetProducts;
	newRol.canCreateProduct = req.body.canCreateProduct;
	newRol.canRemoveProduct = req.body.canRemoveProduct;
	newRol.canEditProduct = req.body.canEditProduct;
	newRol.canGetProductPages = req.body.canGetProductPages;
	newRol.canCreateProductPage = req.body.canCreateProductPage;
	newRol.canRemoveProductPage = req.body.canRemoveProductPage;
	newRol.canEditProductPage = req.body.canEditProductPage;
	newRol.canGetReviews = req.body.canGetReviews;
	newRol.canCreateReview = req.body.canCreateReview;
	newRol.canRemoveReview = req.body.canRemoveReview;
	newRol.canEditReview = req.body.canEditReview;
	newRol.canGetReviewAttributes = req.body.canGetReviewAttributes;
	newRol.canCreateReviewAttribute = req.body.canCreateReviewAttribute;
	newRol.canRemoveReviewAttribute = req.body.canRemoveReviewAttribute;
	newRol.canEditReviewAttribute = req.body.canEditReviewAttribute;

	newRol.save();

	return res.status(200).json({ status: "success", statusCode: 200, message: "Rol created.", data: new RolModel(newRol) });

}

async function login(req: Request, res: Response): Promise<Response<any>> {

	let user = req.body.user; // May be username or email
	let password = req.body.password;

	if (!user || !password) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "User or password missing." });

	}

	let dbUser: User = await User.findOne({
		where: [
			{ user: req.body.user },
			{ email: req.body.user }
		],
		relations: ['teams', 'roles']
	});

	if (!dbUser) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "User does not exist." });

	}

	if (!comparePassword(password, dbUser.password)) {

		return res.status(403).json({ status: "error", statusCode: 403, message: "Password is incorrect." });

	}

	let isGlobalAdmin = false;

	if (dbUser.teams && dbUser.roles) {

		let adminTeam = dbUser.teams.find(team => team.token == process.env.ADMIN_TEAM_TOKEN);

		if (adminTeam) {

			isGlobalAdmin = dbUser.roles.filter(rol => rol.teamId == adminTeam.id && rol.teamAdmin == true).length != 0;

		}

	}

	let returnedUser = new UserModel(dbUser);
	returnedUser.setGlobalAdmin(isGlobalAdmin);

	let session = encodeSession({
		user: returnedUser,
		id: await hashPassword(new Date().toString()),
		dateCreated: Date.now()
	});

	res.status(200).json(session);

}

export { postNewCategory, postNewPage, postNewProduct, postNewProductPage, postNewReview, postNewReviewAttribute, postNewUser, postNewTeam, postNewRol, login };

