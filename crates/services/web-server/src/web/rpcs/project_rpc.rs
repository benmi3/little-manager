use lib_core::model::project::{
	Project, ProjectBmc, ProjectFilter, ProjectForCreate, ProjectForUpdate,
};
use lib_rpc_core::prelude::*;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_project,
		get_project,
		list_projects,
		update_project,
		delete_project,
	)
}

generate_common_rpc_fns!(
	Bmc: ProjectBmc,
	Entity: Project,
	ForCreate: ProjectForCreate,
	ForUpdate: ProjectForUpdate,
	Filter: ProjectFilter,
	Suffix: project
);
