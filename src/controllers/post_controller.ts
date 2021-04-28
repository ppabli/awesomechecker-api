import { Review } from './../entity/review';
import { Request, Response } from "express";

function postNewReview(req: Request, res: Response) {

	let newReview = new Review();
	newReview.productPageId = req.body.productPageId
	newReview.value = req.body.value
	newReview.currency = req.body.currency

	newReview.save();

	return res.json(newReview)

}

export { postNewReview }