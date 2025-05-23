module.exports.photoAllowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

module.exports.pdfAllowedMimeTypes = ['application/pdf'];

module.exports.region = {
	UPLOAD: 'eu-west-2',
};

module.exports.buckets = {
	PROJECT: 'project',
	PROJECT_DEV: 'project-dev',
	PROJECT_TEST: 'project-test',
};

module.exports.types = {
	IMAGE: 'IMAGE',
	PDF: 'PDF',
};

module.exports.magicBytes = {
	'.jpeg': 'ffd8',
	'.jpg': 'ffd8',
	'.png': '8950',
	'.pdf': '2550',
};
