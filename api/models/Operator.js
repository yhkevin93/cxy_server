module.exports = {
	attributes: {
		//电话(用于登录)
		phone: {
			type: 'integer'
		},
		password: {
			type: 'string'
		},
		//身份(管理员：高级操作，员工：低级操作)
		operator_identity: {
			type: 'string',
			enum: ['管理员', '员工'],
			defaultsTo: '员工'
		},
		//拉油记录
		oil: {
			collection: 'oil',
			via: 'oil_operator'
		}
	}
}