module.exports = function(req, res, next) {
	if(req.session.admin) {
//		console.log(req.session.admin)
		return next();
	} else {
		return res.json({
			result: '禁止管理员访问'
		});
	}
};