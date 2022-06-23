import { Request, Response } from 'express';
import { In } from 'typeorm';
import { Category } from '../entities/category';
import { Page } from '../entities/page';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { Rol } from '../entities/rol';
import { Team } from '../entities/team';
import { User } from '../entities/user';
import { CategoryModel } from '../models/category.model';
import { Info } from '../models/info.model';
import { PageModel } from '../models/page.model';
import { ProductModel } from '../models/product.model';
import { ProductPageModel } from '../models/productPage.model';
import { ReviewModel } from '../models/review.model';
import { ReviewAttributeModel } from '../models/reviewAttribute.model';
import { RolModel } from '../models/rol.model';
import { TeamModel } from '../models/team.model';
import { UserModel } from '../models/user.model';

async function getAPIInfo(req: Request, res: Response): Promise<Response<any>> {

	let info = new Info();
	let data = await info.getAllInfo()
	return res.json(data);

}

async function getAllCategories(req: Request, res: Response): Promise<Response<any>> {

	let categories = await Category.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		}
	});


	if (req.query) {

		categories = categories.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Categories fetched", data: categories.map(cat => new CategoryModel(cat)) });

}

async function getAllPages(req: Request, res: Response): Promise<Response<any>> {

	let pages = await Page.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		}, relations: ['reviewAttributes']
	});

	if (req.query) {

		pages = pages.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Pages fetched", data: pages.map(page => new PageModel(page)) });

}

async function getAllProducts(req: Request, res: Response): Promise<Response<any>> {

	let products = await Product.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		}
	});

	if (req.query) {

		products = products.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Products fetched", data: products.map(product => new ProductModel(product)) });

}

async function getAllProductsPages(req: Request, res: Response): Promise<Response<any>> {

	let productPages = await ProductPage.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		},
		relations: ['product', 'page']
	});

	if (req.query) {

		productPages = productPages.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "ProductPages fetched", data: productPages.map(productPage => new ProductPageModel(productPage)) });

}

async function getAllReviews(req: Request, res: Response): Promise<Response<any>> {

	let reviews = await Review.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		},
		relations: ['product']
	});

	if (req.query) {

		reviews = reviews.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Reviews fetched", data: reviews.map(review => new ReviewModel(review)) });

}

async function getAllReviewsAttributes(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttributes = await ReviewAttribute.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		}, relations: ['pages']
	});

	if (req.query) {

		reviewAttributes = reviewAttributes.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "ReviewAttributes fetched", data: reviewAttributes.map(reviewAttribute => new ReviewAttributeModel(reviewAttribute)) });

}

async function getAllTeams(req: Request, res: Response): Promise<Response<any>> {

	let teams = await Team.find({
		where: {
			id: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		}
	});

	if (req.query) {

		teams = teams.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Teams fetched", data: teams.map(team => new TeamModel(team)) });

}

async function getAllUsers(req: Request, res: Response): Promise<Response<any>> {

	let users = await User.find({

		where: {
			isDeleted: false
		},
		relations: ['teams']

	});

	users = users.filter(user => user.teams.some(team => res.locals.session.user.teams.some(sessionTeam => sessionTeam.id === team.id)));

	if (req.query) {

		if (req.query.teamId) {

			users = users.filter(user => user.teams.some(team => team.id === Number(req.query.teamId)));
			delete req.query.teamId;

		}

		users = users.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Users fetched", data: users.map(user => new UserModel(user)) });

}

async function getAllRoles(req: Request, res: Response): Promise<Response<any>> {

	let roles = await Rol.find({
		where: {
			teamId: In(res.locals.session.user.teams.map(team => team.id)),
			isDeleted: false
		},
		relations: ['teams']

	});

	if (req.query) {

		roles = roles.filter(item => {
			let isValid = true;
			for (let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.status(200).json({ status: "success", statusCode: 200, message: "Roles fetched", data: roles.map(rol => new RolModel(rol)) });

}

export { getAPIInfo, getAllCategories, getAllPages, getAllProducts, getAllProductsPages, getAllReviews, getAllReviewsAttributes, getAllTeams, getAllUsers, getAllRoles };

