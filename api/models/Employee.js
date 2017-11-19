var bcrypt = require('bcryptjs');

module.exports = {
	attributes: {
		//电话(用于登录)
		phone: {
			type: 'integer',
			required: true,
			unique: true
		},
		name: {
			type: 'string',
			defaultsTo: '员工'
		},
		password: {
			type: 'string',
			minLength: 6,
			required: true,
			defaultsTo: '123456'
		},
		area: {
			type: 'string',
			defaultsTo: '全部'
		},
		//身份(管理员：高级操作，员工：低级操作，区域管理员：只能查看片区数据)
		employee_identity: {
			type: 'string',
			enum: ['管理员', '员工','区域管理员'],
			defaultsTo: '员工'
		},
		//拉油记录
		oil: {
			collection: 'oil',
			via: 'oil_employee'
		}
	},
	beforeCreate: function(employee, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(employee.password, salt, function(err, hash) {
				if(err) {
//					console.log(err);
					cb(err);
				} else {
					employee.password = hash;
					cb();
				}
			});
		});
	}
}