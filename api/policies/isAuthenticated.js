module.exports = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		return res.json({
			result: '禁止用户访问'
		});
	}
};