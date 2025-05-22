use axum::routing::post;
use axum::Router;
use lib_core::model::ModelManager;
use lib_web::handlers::handlers_signin;

pub fn routes(mm: ModelManager) -> Router {
	Router::new()
		.route("/api/signin", post(handlers_signin::api_sign_in_handler))
		.route("/api/signout", post(handlers_signin::api_sign_out_handler))
		.with_state(mm)
}
