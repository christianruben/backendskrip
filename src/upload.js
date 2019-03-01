const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});
function fileFilter(req, file, cb){
	let type = file.mimetype;
	let typeArr = type.split('/');

	if(typeArr[0] === "image"){
		cb(null, true);
	}else{
		cb(null, false);
	}
}
let upload = multer({
		storage: storage,
		limits: {
			fileSize: 10000000
		},
		fileFilter: fileFilter
	});

module.exports = upload;