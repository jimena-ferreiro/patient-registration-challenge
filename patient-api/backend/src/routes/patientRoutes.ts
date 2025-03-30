import { Router } from "express";
import { createPatient, getPatients } from '../controllers/patient.controller';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/patients', upload.single('documentPhoto'), createPatient);
router.get('/patients', getPatients);


export default router;

