import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Saves files to 'uploads/' folder

export default upload;