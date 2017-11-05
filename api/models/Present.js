module.exports = {
	attributes: {
		//提现编号
		present_id: {
			type: 'integer'
		},
		//提现金额
		present_money: {
			type: 'float'
		},
		//提现用户
		present_user: {
			model: 'user'
		},
		//提现时间
		present_time: {
			type: 'date'
		},
		//提现状态
		present_state: {
			type: 'string',
			enum: ['提交中', '处理中', '成功'],
			defaultsTo: '提交中'
		}
	}
}