moment = require('moment')

module.exports = {
	attributes: {
		//收油编号
		oil_id: {
			type: 'integer',
			defaultsTo: 0
		},
		//收油来源（以后统计所有油走向用
		oil_origin: {
			type: 'string',
			enum: ['餐厅', '油'],
			defaultsTo: '餐厅'
		},
		//设备号(如果是餐厅收油需要填写收油设备号)
		restaurant_id: {
			type: 'integer',
			required: true
		},
		//油来源(如果来源是油，填写上级油的编码)
		oil: {
			type: 'array'
		},
		//拉油车车牌
		car: {
			type: 'string',
			defaultsTo: '川A88888'
		},
		//拉油人员
		oil_employee: {
			model: 'employee'
		},
		//所属餐厅的用户（如果来源是餐厅需要填写
		oil_user: {
			model: 'user'
		},
		//拉油时间
		oil_time: {
			type: 'date'
		},
		//完成时间
		oil_over: {
			type: 'date'
		},
		//油量
		oil_mass: {
			type: 'float',
			defaultsTo: 0
		},
		oil_date: {
			type: 'string'
		}
	},
	beforeCreate: function(oil, cb) {
		var date = new Date();

		var time = date.getTime();

		var o = date.getTimezoneOffset() * 60 * 1000;

		var o = time - o;

		var now = new Date(o);
//		console.log(now)

		oil.oil_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		cb();
	}
}