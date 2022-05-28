import { info } from 'console';
import { Request, Response } from 'express';
import { Any, In } from 'typeorm';
import { Category } from '../entities/category';
import { Page } from '../entities/page';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { Rol } from '../entities/rol';
import { Team } from '../entities/team';
import { User } from '../entities/user';
import { Info } from '../models/info.model';

async function getAPIInfo(req: Request, res: Response): Promise<Response<any>> {

	let info = new Info();
	let data = await info.getAllInfo()
	return res.json(data);

}

async function getAllCategories(req: Request, res: Response): Promise<Response<any>> {

	let categories;

	if (res.locals.session.user.globalAdmin) {

		categories = await Category.find();

	} else {

		categories = await Category.find({ where: { teamId: In(res.locals.session.user.teams.map(team => team.id)) } });

	}

	if (req.query) {

		categories.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(categories);

}

async function getAllPages(req: Request, res: Response): Promise<Response<any>> {

	let pages;

	if (res.locals.session.user.globalAdmin) {

		pages = await Page.find();

	} else {

		pages = await Page.find({ where: { teamId: In(res.locals.session.user.teams.map(team => team.id)) } });

	}

	if (req.query) {

		pages.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(pages);

}

async function getAllProducts(req: Request, res: Response): Promise<Response<any>> {

	let products;

	if (res.locals.session.user.globalAdmin) {

		products = await Product.find();

	} else {

		products = await Product.find({ where: { teamId: In(res.locals.session.user.teams.map(team => team.id)) } });

	}

	if (req.query) {

		products.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(products);

}

async function getAllProductsPages(req: Request, res: Response): Promise<Response<any>> {

	let productPages;

	if (res.locals.session.user.globalAdmin) {

		productPages = await ProductPage.find();

	} else {

		productPages = await ProductPage.find({
			relations: ['product', 'page']
		});

		for (let team of res.locals.session.user.teams) {

			productPages = productPages.filter(productPage => productPage.product.teamId === team.id && productPage.page.teamId === team.id);

		}

	}

	if (req.query) {

		productPages.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(productPages);

}

async function getAllReviews(req: Request, res: Response): Promise<Response<any>> {

	let reviews;

	if (res.locals.session.user.globalAdmin) {

		reviews = await Review.find();

	} else {

		reviews = await Review.find({
			relations: ['product', 'user']
		});

		for (let team of res.locals.session.user.teams) {

			reviews = reviews.filter(review => review.product.teamId === team.id && review.user.teamId === team.id);

		}

	}

	if (req.query) {

		reviews.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(reviews);

}

async function getAllReviewsAttributes(req: Request, res: Response): Promise<Response<any>> {

	let reviewAttributes;

	if (res.locals.session.user.globalAdmin) {

		reviewAttributes = await ReviewAttribute.find();

	} else {

		reviewAttributes = await ReviewAttribute.find({
			relations: ['review', 'user']
		});

		for (let team of res.locals.session.user.teams) {

			reviewAttributes = reviewAttributes.filter(reviewAttribute => reviewAttribute.review.product.teamId === team.id && reviewAttribute.review.user.teamId === team.id);

		}

	}

	if (req.query) {

		reviewAttributes.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(reviewAttributes);

}

async function getAllTeams(req: Request, res: Response): Promise<Response<any>> {

	let teams;

	if (res.locals.session.user.globalAdmin) {

		teams = await Team.find();

	} else {

		teams = await Team.find({ where: { id: In(res.locals.session.user.teams.map(team => team.id)) } });

	}

	if (req.query) {

		teams.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(teams);

}

async function getAllUsers(req: Request, res: Response): Promise<Response<any>> {

	let users;

	if (res.locals.session.user.globalAdmin) {

		users = await User.find();

	} else {

		users = await User.find({

			relations: ['teams']

		});

		for (let team of res.locals.session.user.teams) {

			users = users.filter(user => user.teams.map(team => team.id).includes(team.id));

		}


	}

	if (req.query) {

		users.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(users);

}

async function getAllRoles(req: Request, res: Response): Promise<Response<any>> {

	let roles;

	if (res.locals.session.user.globalAdmin) {

		roles = await Rol.find();

	} else {

		roles = await Rol.find({

			relations: ['teams']

		});

		for (let team of res.locals.session.user.teams) {

			roles = roles.filter(rol => rol.teams.map(team => team.id).includes(team.id));

		}

	}

	if (req.query) {

		roles.filter(item => {
			let isValid = true;
			for(let key in req.query) {
				isValid = isValid && item[key] && item[key] === req.query[key];
			}
			return isValid;
		})

	}

	return res.json(roles);

}

export { getAPIInfo, getAllCategories, getAllPages, getAllProducts, getAllProductsPages, getAllReviews, getAllReviewsAttributes, getAllTeams, getAllUsers, getAllRoles };

