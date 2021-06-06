import { request, Request, Response } from "express";
import { Review } from './../entity/review';

async function deleteReview(req: Request, res: Response): Promise<Response<any>> {

	let deleteReview = await Review.findOne(req.body.id);
	await deleteReview.remove();
	return res.json(deleteReview);

}

export { deleteReview };