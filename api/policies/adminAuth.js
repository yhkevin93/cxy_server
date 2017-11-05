module.exports = function(req, res, next) {
	if(req.session.admin) {
		return next();
	} else {
		return res.json({
			result: '禁止访问'
		});
	}
};