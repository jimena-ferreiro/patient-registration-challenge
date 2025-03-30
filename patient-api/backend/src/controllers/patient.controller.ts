import { Request, Response } from 'express';
import Patient from '../models/Patient';
import { sendConfirmationEmail } from '../services/emailService';

export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phoneCode, phoneNumber } = req.body;
    const documentPhoto = req.file?.filename;

    if (!fullName || !email || !phoneCode || !phoneNumber || !documentPhoto) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      res.status(400).json({ message: 'Full name must contain only letters' });
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      res.status(400).json({ message: 'Email must be @gmail.com' });
      return;
    }

    const existingPatient = await Patient.findOne({ where: { email } });
    if (existingPatient) {
      res.status(400).json({ message: 'Email is already registered' });
      return;
    }

    const newPatient = await Patient.create({
      fullName,
      email,
      phoneCode,
      phoneNumber,
      documentPhoto,
    });

    sendConfirmationEmail(email, fullName);

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error });
  }
};

export const getPatients = async (_req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients', error });
  }
};
