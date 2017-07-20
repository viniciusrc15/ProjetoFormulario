module.exports = function(app){
	var multer  = require('multer');
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './app/public/uploads')
		},
		filename: function (req, file, cb) {
			var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1);
			cb(null, file.fieldname + '.' + ext);
		}
	})

	var upload = multer({ storage: storage })
	app.post('/salvarAssinatura', upload.single('assinatura'), function (req, res, next) {
	});
}