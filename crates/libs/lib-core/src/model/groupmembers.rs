use crate::ctx::Ctx;
use crate::generate_common_bmc_fns;
use crate::model::base::{self, DbBmc};
use crate::model::modql_utils::time_to_sea_value;
use crate::model::ModelManager;
use crate::model::Result;
use lib_utils::time::Rfc3339;
use modql::field::Fields;
use modql::filter::{FilterNodes, OpValsValue};
use modql::filter::{ListOptions, OpValsInt32, OpValsInt64};
use serde::{Deserialize, Serialize};
use serde_with::serde_as;
use sqlx::types::time::OffsetDateTime;
use sqlx::FromRow;

// region:    --- Project Types
#[serde_as]
#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct GroupMember {
	pub id: i64,
	pub usergroup_id: i64,
	pub user_id: i64,
	pub user_role: i32,

	// -- Timestamps
	//    (creator and last modified user_id/time)
	pub cid: i64,
	#[serde_as(as = "Rfc3339")]
	pub ctime: OffsetDateTime,
	pub mid: i64,
	#[serde_as(as = "Rfc3339")]
	pub mtime: OffsetDateTime,
}

#[derive(Fields, Deserialize)]
pub struct GroupMemberForCreate {
	pub usergroup_id: i64,
	pub user_id: i64,
	pub user_role: i32,
}

#[derive(Fields, Deserialize)]
pub struct GroupMemberForUpdate {
	pub usergroup_id: Option<i64>,
	pub user_id: Option<i64>,
	pub user_role: Option<i32>,
}

#[derive(FilterNodes, Default, Deserialize)]
pub struct GroupMemberFilter {
	id: Option<OpValsInt64>,
	usergroup_id: Option<OpValsInt64>,
	user_id: Option<OpValsInt64>,
	user_role: Option<OpValsInt32>,

	cid: Option<OpValsInt64>,
	#[modql(to_sea_value_fn = "time_to_sea_value")]
	ctime: Option<OpValsValue>,
	mid: Option<OpValsInt64>,
	#[modql(to_sea_value_fn = "time_to_sea_value")]
	mtime: Option<OpValsValue>,
}
// endregion: --- Project Types

// region:    --- ProjectBmc
pub struct GroupMemberBmc;

impl DbBmc for GroupMemberBmc {
	const TABLE: &'static str = "groupmember";
}
generate_common_bmc_fns!(
	Bmc: GroupMemberBmc,
	Entity: GroupMember,
	ForCreate: GroupMemberForCreate,
	ForUpdate: GroupMemberForUpdate,
	Filter: GroupMemberFilter,
);
// endregion: --- ProjectBmc
