use lib_core::model::taskprogress::{
	TaskProgress, TaskProgressBmc, TaskProgressFilter, TaskProgressForCreate,
	TaskProgressForUpdate,
};
use lib_rpc_core::prelude::*;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_taskprogress,
		get_taskprogress,
		list_taskprogresss,
		update_taskprogress,
		delete_taskprogress,
	)
}

generate_common_rpc_fns!(
	Bmc: TaskProgressBmc,
	Entity: TaskProgress,
	ForCreate: TaskProgressForCreate,
	ForUpdate: TaskProgressForUpdate,
	Filter: TaskProgressFilter,
	Suffix: taskprogress
);
