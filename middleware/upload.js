import multer from 'multer';
// Saves files to 'uploads/' folder
const upload = multer({ dest: 'uploads/' }); 

export default upload;