use lib_core::model::tasktime::{
	TaskTime, TaskTimeBmc, TaskTimeFilter, TaskTimeForCreate, TaskTimeForUpdate,
};
use lib_rpc_core::prelude::*;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_tasktime,
		get_tasktime,
		list_tasktimes,
		update_tasktime,
		delete_tasktime,
	)
}

generate_common_rpc_fns!(
	Bmc: TaskTimeBmc,
	Entity: TaskTime,
	ForCreate: TaskTimeForCreate,
	ForUpdate: TaskTimeForUpdate,
	Filter: TaskTimeFilter,
	Suffix: tasktime
);
