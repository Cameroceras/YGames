var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var check = require('../middlewares/check');

var checkLogin = check.checkLogin;
var isAdmin = check.isAdmin;

// GET /adminuserlist 进入管理用户页
router.get('/', checkLogin, isAdmin, function(req, res, next) {
	User.fetch(function(err, users) {
		if(err) {console.log(err);}

		res.render('adminuserlist', {
			title: '欢迎来到用户管理的地盘！！',
			users: users
		});
	});
});
// DELETE 用户删除交互
router.delete('/', function(req, res, next) {
	var id = req.query.id;
	if(id) {
		User.remove({_id: id}, function(err, user) {
			if(err) {
				console.log(err);
				res.json({success: 0});
			}else{
				res.json({success: 1});
			}
		});
	}
});
module.exports = router;