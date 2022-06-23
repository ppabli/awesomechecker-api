import { Rol } from "../entities/rol";
import { BaseModel } from "./base.model";

class RolModel extends BaseModel {

	private name: string;
	private description: string;
	private token: string;
	private teamId: number;
	private staffRol: boolean;
	// Permissions
	private teamAdmin: boolean;
	private canGetUsers: boolean;
	private canAddUser: boolean;
	private canRemoveUser: boolean;
	private canEditUser: boolean;
	private canGetTeams: boolean;
	private canCreateTeam: boolean;
	private canRemoveTeam: boolean;
	private canEditTeam: boolean;
	private canGetRoles: boolean;
	private canCreateRol: boolean;
	private canRemoveRol: boolean;
	private canEditRol: boolean;
	private canGetCategories: boolean;
	private canCreateCategory: boolean;
	private canRemoveCategory: boolean;
	private canEditCategory: boolean;
	private canGetPages: boolean;
	private canCreatePage: boolean;
	private canRemovePage: boolean;
	private canEditPage: boolean;
	private canGetProducts: boolean;
	private canCreateProduct: boolean;
	private canRemoveProduct: boolean;
	private canEditProduct: boolean;
	private canGetProductPages: boolean;
	private canCreateProductPage: boolean;
	private canRemoveProductPage: boolean;
	private canEditProductPage: boolean;
	private canGetReviews: boolean;
	private canCreateReview: boolean;
	private canRemoveReview: boolean;
	private canEditReview: boolean;
	private canGetReviewAttributes: boolean;
	private canCreateReviewAttribute: boolean;
	private canRemoveReviewAttribute: boolean;
	private canEditReviewAttribute: boolean;

	constructor(rol: Rol) {

		super(rol);

		this.name = rol.name;
		this.description = rol.description;
		this.token = rol.token;
		this.teamId = rol.teamId;
		this.staffRol = rol.staffRol;

		this.teamAdmin = rol.teamAdmin;
		this.canGetUsers = rol.canGetUsers;
		this.canEditUser = rol.canEditUser;
		this.canGetTeams = rol.canGetTeams;
		this.canCreateTeam = rol.canCreateTeam;
		this.canRemoveTeam = rol.canRemoveTeam;
		this.canEditTeam = rol.canEditTeam;
		this.canGetRoles = rol.canGetRoles;
		this.canCreateRol = rol.canCreateRol;
		this.canRemoveRol = rol.canRemoveRol;
		this.canEditRol = rol.canEditRol;
		this.canGetCategories = rol.canGetCategories;
		this.canCreateCategory = rol.canCreateCategory;
		this.canRemoveCategory = rol.canRemoveCategory;
		this.canEditCategory = rol.canEditCategory;
		this.canGetPages = rol.canGetPages;
		this.canCreatePage = rol.canCreatePage;
		this.canRemovePage = rol.canRemovePage;
		this.canEditPage = rol.canEditPage;
		this.canGetProducts = rol.canGetProducts;
		this.canCreateProduct = rol.canCreateProduct;
		this.canRemoveProduct = rol.canRemoveProduct;
		this.canEditProduct = rol.canEditProduct;
		this.canGetProductPages = rol.canGetProductPages;
		this.canCreateProductPage = rol.canCreateProductPage;
		this.canRemoveProductPage = rol.canRemoveProductPage;
		this.canEditProductPage = rol.canEditProductPage;
		this.canGetReviews = rol.canGetReviews;
		this.canCreateReview = rol.canCreateReview;
		this.canRemoveReview = rol.canRemoveReview;
		this.canEditReview = rol.canEditReview;
		this.canGetReviewAttributes = rol.canGetReviewAttributes;
		this.canCreateReviewAttribute = rol.canCreateReviewAttribute;
		this.canRemoveReviewAttribute = rol.canRemoveReviewAttribute;
		this.canEditReviewAttribute = rol.canEditReviewAttribute;

	}

	public getPutPermissions() {

		return {

			'user': this.canEditUser,
			'team': this.canEditTeam,
			'rol': this.canEditRol,
			'category': this.canEditCategory,
			'page': this.canEditPage,
			'product': this.canEditProduct,
			'productPage': this.canEditProductPage,
			'review': this.canEditReview,
			'reviewAttribute': this.canEditReviewAttribute,

		};

	}

	public getGetPermissions() {

		return {

			'users': this.canGetUsers,
			'teams': this.canGetTeams,
			'roles': this.canGetRoles,
			'categories': this.canGetCategories,
			'pages': this.canGetPages,
			'products': this.canGetProducts,
			'productPages': this.canGetProductPages,
			'reviews': this.canGetReviews,
			'reviewAttributes': this.canGetReviewAttributes
		};

	}

	public getPostPermissions() {

		return {

			'user': this.canAddUser,
			'teams': this.canCreateTeam,
			'roles': this.canCreateRol,
			'categories': this.canCreateCategory,
			'pages': this.canCreatePage,
			'products': this.canCreateProduct,
			'productPages': this.canCreateProductPage,
			'reviews': this.canCreateReview,
			'reviewAttributes': this.canCreateReviewAttribute,
		};

	}

	public getDeletePermissions() {

		return {

			'users': this.canRemoveUser,
			'teams': this.canRemoveTeam,
			'roles': this.canRemoveRol,
			'categories': this.canRemoveCategory,
			'pages': this.canRemovePage,
			'products': this.canRemoveProduct,
			'productPages': this.canRemoveProductPage,
			'reviews': this.canRemoveReview,
			'reviewAttributes': this.canRemoveReviewAttribute,

		};

	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getToken(): string {
		return this.token;
	}

	public getTeamId(): number {
		return this.teamId;
	}

	public getStaffRol(): boolean {
		return this.staffRol;
	}

	public getTeamAdmin(): boolean {

		return this.teamAdmin;

	}

	public getCanGetUsers(): boolean {

		return this.canGetUsers;

	}

	public getCanAddUser(): boolean {

		return this.canAddUser;

	}

	public getCanRemoveUser(): boolean {

		return this.canRemoveUser;

	}

	public getCanEditUser(): boolean {

		return this.canEditUser;

	}

	public getCanGetTeams(): boolean {

		return this.canGetTeams;

	}

	public getCanCreateTeam(): boolean {

		return this.canCreateTeam;

	}

	public getCanRemoveTeam(): boolean {

		return this.canRemoveTeam;

	}

	public getCanEditTeam(): boolean {

		return this.canEditTeam;

	}

	public getCanGetRoles(): boolean {

		return this.canGetRoles;

	}

	public getCanCreateRol(): boolean {

		return this.canCreateRol;

	}

	public getCanRemoveRol(): boolean {

		return this.canRemoveRol;

	}

	public getCanEditRol(): boolean {

		return this.canEditRol;

	}

	public getCanGetCategories(): boolean {

		return this.canGetCategories;

	}

	public getCanCreateCategory(): boolean {

		return this.canCreateCategory;

	}

	public getCanRemoveCategory(): boolean {

		return this.canRemoveCategory;

	}

	public getCanEditCategory(): boolean {

		return this.canEditCategory;

	}

	public getCanGetPages(): boolean {

		return this.canGetPages;

	}

	public getCanCreatePage(): boolean {

		return this.canCreatePage;

	}

	public getCanRemovePage(): boolean {

		return this.canRemovePage;

	}

	public getCanEditPage(): boolean {

		return this.canEditPage;

	}

	public getCanGetProducts(): boolean {

		return this.canGetProducts;

	}

	public getCanCreateProduct(): boolean {

		return this.canCreateProduct;

	}

	public getCanRemoveProduct(): boolean {

		return this.canRemoveProduct;

	}

	public getCanEditProduct(): boolean {

		return this.canEditProduct;

	}

	public getCanGetProductPages(): boolean {

		return this.canGetProductPages;

	}

	public getCanCreateProductPage(): boolean {

		return this.canCreateProductPage;

	}

	public getCanRemoveProductPage(): boolean {

		return this.canRemoveProductPage;

	}

	public getCanEditProductPage(): boolean {

		return this.canEditProductPage;

	}

	public getCanGetReviews(): boolean {

		return this.canGetReviews;

	}

	public getCanCreateReview(): boolean {

		return this.canCreateReview;

	}

	public getCanRemoveReview(): boolean {

		return this.canRemoveReview;

	}

	public getCanEditReview(): boolean {

		return this.canEditReview;

	}

	public getCanGetReviewAttributes(): boolean {

		return this.canGetReviewAttributes;

	}

	public getCanCreateReviewAttribute(): boolean {

		return this.canCreateReviewAttribute;

	}

	public getCanRemoveReviewAttribute(): boolean {

		return this.canRemoveReviewAttribute;

	}

	public getCanEditReviewAttribute(): boolean {

		return this.canEditReviewAttribute;

	}

}

export { RolModel };
