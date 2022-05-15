import { Request, Response } from "express";
import { Page } from "../entities/page";
import { Category } from '../entities/category';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { User } from "../entities/user";
import { comparePassword, hashPassword } from "../libs/passwordFunctions";
import { encodeSession } from "../libs/sessionsFunctions";
import { UserModel } from "../models/user.model";
import { Team } from "../entities/team";
import { Rol } from "../entities/rol";

function postNewCategory(req: Request, res: Response): Response<any> {

	let newCategory = new Category();
	newCategory.name = req.body.name;

	newCategory.save();

	return res.json(newCategory);

}

function postNewPage(req: Request, res: Response): Response<any> {

	let newPage = new Page();
	newPage.name = req.body.name;
	newPage.reviewTag = req.body.reviewTag;
	newPage.reviewInside = req.body.reviewInside;
	newPage.reviewInsideTag = req.body.reviewInsideTag;
	newPage.team = req.body.team;

	newPage.save();

	return res.json(newPage);

}

function postNewProduct(req: Request, res: Response): Response<any> {

	let newProduct = new Product();
	newProduct.category = req.body.categoryId;
	newProduct.name = req.body.name;
	newProduct.description = req.body.description;
	newProduct.team = req.body.team;

	newProduct.save();

	return res.json(newProduct);

}

function postNewProductPage(req: Request, res: Response): Response<any> {

	let newProductPage = new ProductPage();
	newProductPage.product = req.body.product;
	newProductPage.page = req.body.page;
	newProductPage.url = req.body.url;

	newProductPage.save();

	return res.json(newProductPage);

}

function postNewReview(req: Request, res: Response): Response<any> {

	let newReview = new Review();
	newReview.productPage = req.body.productPage;
	newReview.value = req.body.value;
	newReview.currency = req.body.currency;

	newReview.save();

	return res.json(newReview);

}

function postNewReviewAttribute(req: Request, res: Response): Response<any> {

	let newReviewAttribute = new ReviewAttribute();
	newReviewAttribute.page = req.body.page;
	newReviewAttribute.key = req.body.key;
	newReviewAttribute.value = req.body.value;

	newReviewAttribute.save();

	return res.json(newReviewAttribute);

}

function postNewUser(req: Request, res: Response): Response<any> {

	let newUser = new User();
	newUser.user = req.body.user;
	newUser.email = req.body.email;
	newUser.password = hashPassword(req.body.password);

	newUser.save();

	return res.json(new UserModel(newUser));

}

function postNewTeam(req: Request, res: Response): Response<any> {

	let newTeam = new Team();
	newTeam.name = req.body.name;
	newTeam.description = req.body.description;
	newTeam.token = hashPassword(new Date().toString());

	newTeam.save();

	return res.json(newTeam);

}

function postNewRol(req: Request, res: Response): Response<any> {

	let newRol = new Rol();
	newRol.name = req.body.name;
	newRol.description = req.body.description;
	newRol.token = hashPassword(new Date().toString());

	newRol.save();

	return res.json(newRol);

}

async function login(req: Request, res: Response): Promise<Response<any>> {

	let user = req.body.user; // May be username or email
	let password = req.body.password;

	if (!user || !password) {

		return res.status(400).json({ "error": "User or password is missing" });

	}

	let dbUser: User = await User.findOne({
		where: [
			{ user: req.body.user },
			{ email: req.body.user }
		]
	})

	if (!dbUser) {

		return res.status(400).json({ "error": "User does not exist" });

	}

	if (!comparePassword(password, dbUser.password)) {

		return res.status(400).json({ "error": "Password is incorrect" });

	}

	let session = encodeSession({
		user: new UserModel(dbUser),
		id: hashPassword(new Date().toString()),
		dateCreated: Date.now()
	});

	res.status(201).json(session);

}

export { postNewCategory, postNewPage, postNewProduct, postNewProductPage, postNewReview, postNewReviewAttribute, postNewUser, postNewTeam, postNewRol, login };

