use lib_core::model::task::{
	Task, TaskBmc, TaskFilter, TaskForCreate, TaskForUpdate,
};
use lib_rpc_core::prelude::*;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_task,
		get_task,
		list_tasks,
		update_task,
		delete_task,
	)
}

generate_common_rpc_fns!(
	Bmc: TaskBmc,
	Entity: Task,
	ForCreate: TaskForCreate,
	ForUpdate: TaskForUpdate,
	Filter: TaskFilter,
	Suffix: task
);
