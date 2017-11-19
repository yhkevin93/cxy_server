/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	 *                                                                          *
	 * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	 * etc. depending on your default view engine) your home page.              *
	 *                                                                          *
	 * (Alternatively, remove this and add an `index.html` file in your         *
	 * `assets` directory)                                                      *
	 *                                                                          *
	 ***************************************************************************/

	/***************
	 *  管理员行为   *
	 ***************/
	'GET /oil': 'adminCOntroller.oil',
	//管理员登录
	'POST /admin/login': 'loginController.adminLogin',
	//批量注册设备账号
	'POST /admin/signup': 'adminController.signup',
	//搜索用户
	'POST /admin/searchUser': 'adminController.searchUser',
	//注册员工
	'POST /admin/signupEmployee': 'adminController.signupEmployee',
	//搜索员工
	'POST /admin/searchEmployee': 'adminContorller.searchEmployee',
	//查询用户信息
	'POST /admin/userInfo': 'adminController.userInfo',
	//修改用户信息
	'POST /admin/updateUserInfo': 'adminController.updateUserInfo',
	//重置用户密码
	'POST /admin/resetUserPassword': 'adminController.resetUserPassword',
	//根据条件查询餐厅信息
	'POST /admin/userList': 'adminController.userList',
	//根据设备号查询餐厅信息
	'POST /admin/checkUserData': 'adminController.checkUserData',
	//根据餐厅名查询餐厅信息
	'POST /admin/searchUserName': "adminController.searchUserByName",
	//根据区域查询餐厅信息
	'POST /admin/userAreaList': 'adminController.userAreaList',
	//修改密码
	'POST /admin/updatePassword': 'adminController.updatePassword',
	//首页<-每月拉油量->
	'GET /admin/totaloilmass': 'adminController.totaloilmass',
	//首页<-每月拉次数->
	'GET /admin/totaloiltime': 'adminController.totaloiltime',
	/***************
	 *   员工行为     *
	 ***************/
	//员工登录
	'POST /employee/login': 'loginController.employeeLogin',
	//拉油
	'POST /employee/collectionOil': 'employeeController.collectionOil',
	//修改密码
	'POST /employee/updatePassword': 'employeeController.updatePassword',

	/***************
	 *   用户行为     *
	 ***************/
	//用户登录
	'POST /user/login': 'loginController.login',
	//绑定用户信息
	'POST /user/binding': 'userController.binding',
	//修改用户信息
	'POST /user/update': 'userController.update',
	//修改密码
	'POST /user/updatePassword': 'userController.updatePassword',
	//读取收油信息
	'POST /user/oilRecord': 'userController.oilRecord',
	//登出
	'GET /user/logout': 'userController.logout',
	//查询设备油量信息
	'GET /user/oilData': 'userController.oilData',
	//查询自己收油信息
	'POST /user/dealData': 'userController.dealData',
	//用户首页收油数据信息
	'GET /user/dealCount': 'userController.dealCount',
	//详细收油订单数据
	'POST /user/oilDetail': 'userController.oilDetail',

	/***************
	 *   对外行为     *
	 ***************/
	//油量变化修改设备油量
	'POST /api/oilChange': 'apiController.oilChange',

	/***************************************************************************
	 *                                                                          *
	 * Custom routes here...                                                    *
	 *                                                                          *
	 * If a request to a URL doesn't match any of the custom routes above, it   *
	 * is matched against Sails route blueprints. See `config/blueprints.js`    *
	 * for configuration options and examples.                                  *
	 *                                                                          *
	 ***************************************************************************/

};