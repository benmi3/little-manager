use crate::error::{Error, Result};
use crate::utils::token;
use axum::extract::State;
use axum::Json;
use lib_auth::pwd::{self, ContentToHash, SchemeStatus};
use lib_core::ctx::Ctx;
use lib_core::model::user::{UserBmc, UserForLogin};
use lib_core::model::ModelManager;
use serde::Deserialize;
use serde_json::{json, Value};
use tower_cookies::Cookies;
use tracing::debug;

// region:    --- Sign in
pub async fn api_sign_in_handler(
	State(mm): State<ModelManager>,
	cookies: Cookies,
	Json(payload): Json<LoginPayload>,
) -> Result<Json<Value>> {
	debug!("{:<12} - api_sign_in_handler", "HANDLER");

	let LoginPayload {
		username,
		pwd: pwd_clear,
	} = payload;
	let root_ctx = Ctx::root_ctx();

	// -- Get the user.
	let user: UserForLogin = UserBmc::first_by_username(&root_ctx, &mm, &username)
		.await?
		.ok_or(Error::LoginFailUsernameNotFound)?;
	let user_id = user.id;

	// -- Validate the password.
	let Some(pwd) = user.pwd else {
		return Err(Error::LoginFailUserHasNoPwd { user_id });
	};

	let scheme_status = pwd::validate_pwd(
		ContentToHash {
			salt: user.pwd_salt,
			content: pwd_clear.clone(),
		},
		pwd,
	)
	.await
	.map_err(|_| Error::LoginFailPwdNotMatching { user_id })?;

	// -- Update password scheme if needed
	if let SchemeStatus::Outdated = scheme_status {
		debug!("pwd encrypt scheme outdated, upgrading.");
		UserBmc::update_pwd(&root_ctx, &mm, user.id, &pwd_clear).await?;
	}

	// -- Set web token.
	token::set_token_cookie(&cookies, &user.username, user.token_salt)?;

	// Create the success body.
	let body = Json(json!({
		"result": {
			"success": true
		}
	}));

	Ok(body)
}

#[derive(Debug, Deserialize)]
pub struct LoginPayload {
	username: String,
	pwd: String,
}
// endregion: --- Sign in

// region:    --- Sign out
pub async fn api_sign_out_handler(
	cookies: Cookies,
	Json(payload): Json<LogoffPayload>,
) -> Result<Json<Value>> {
	debug!("{:<12} - api_sign_out_handler", "HANDLER");
	let should_signout = payload.signout;

	if should_signout {
		token::remove_token_cookie(&cookies)?;
	}

	// Create the success body.
	let body = Json(json!({
		"result": {
			"sign_out": should_signout
		}
	}));

	Ok(body)
}

#[derive(Debug, Deserialize)]
pub struct LogoffPayload {
	signout: bool,
}
// endregion: --- Sign out
