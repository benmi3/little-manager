use lib_core::model::timerecord::{
	TimeRecord, TimeRecordBmc, TimeRecordFilter, TimeRecordForCreate,
	TimeRecordForUpdate,
};
use lib_rpc_core::prelude::*;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_timerecord,
		get_timerecord,
		list_timerecords,
		update_timerecord,
		delete_timerecord,
	)
}

generate_common_rpc_fns!(
	Bmc: TimeRecordBmc,
	Entity: TimeRecord,
	ForCreate: TimeRecordForCreate,
	ForUpdate: TimeRecordForUpdate,
	Filter: TimeRecordFilter,
	Suffix: timerecord
);
