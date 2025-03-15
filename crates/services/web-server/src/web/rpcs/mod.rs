// region:    --- Modules

pub mod project_rpc;
pub mod task_rpc;
pub mod taskprogress_rpc;
pub mod tasktime_rpc;
pub mod timerecord_rpc;

use rpc_router::{Router, RouterBuilder};

// endregion: --- Modules

pub fn all_rpc_router_builder() -> RouterBuilder {
	Router::builder()
		.extend(project_rpc::rpc_router_builder())
		.extend(task_rpc::rpc_router_builder())
		.extend(taskprogress_rpc::rpc_router_builder())
		.extend(tasktime_rpc::rpc_router_builder())
		.extend(timerecord_rpc::rpc_router_builder())
}
