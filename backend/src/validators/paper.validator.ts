import Joi from 'joi';
import { Paper } from '../types';

const paperSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  filePath: Joi.string().required(),
  year: Joi.string().required(),
  courseId: Joi.string().required(),
  trimesterId: Joi.string().required(),
  lecturerName: Joi.string().required(),
  upploadDate: Joi.string().required(),
  uploaderId: Joi.string().required(),
});

export const validatePaper = (paper: Paper): Joi.ValidationResult => {
  return paperSchema.validate(paper, { abortEarly: false });
};
