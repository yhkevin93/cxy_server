module.exports = function(req, res, next) {
	if(req.session.employee) {
//		console.log(req.session.)
		return next();
	} else {
		return res.json({
			result: '禁止员工访问'
		});
	}
};