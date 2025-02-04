import express from 'express'
import { getProfiles, createProfile, updateProfile, deleteProfile, getProfile, getProfilesByUser ,uploadFile,getImage} from '../controllers/profile.js'
import multer from "multer";
const router = express.Router()
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage }).single("file");

router.get('/:id', getProfile)
// router.get('/', getProfiles)
router.get('/', getProfilesByUser)
router.post('/', createProfile)
router.patch('/:id', updateProfile)
router.delete('/:id', deleteProfile)
router.get('/image/:id', getImage);
router.post("/upload", uploadMiddleware, uploadFile);
export default router