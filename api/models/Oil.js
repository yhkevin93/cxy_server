module.exports = {
	attributes: {
		//收油编号
		oil_id: {
			type: 'integer'
		},
		//收油来源（以后统计所有油走向用
		oil_origin: {
			type: 'string',
			enum: ['餐厅', '油'],
			defaultsTo: '餐厅'
		},
		//设备号(如果是餐厅收油需要填写收油设备号)
		oil_device: {
			type: 'integer'
		},
		//油来源(如果来源是油，填写上级油的编码)
		oil: {
			type: 'array'
		},
		//拉油车车牌
		car: {
			type: 'string',
		},
		//拉油人员
		oil_operator: {
			model: 'operator'
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
			type: 'float'
		}
	}
}