import { body, param, query, validationResult } from 'express-validator';

export const validateProduct = [
 body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('categories').isArray().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('isActive').optional().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];

export const validateProductUpdate = [
  body('name').optional().isString().notEmpty(),
  body('description').optional().isString().notEmpty(),
  body('categories').optional().isArray(),
  body('price').optional().isFloat({ min: 0 }),
  body('isActive').optional().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];

export const validateStock = [
  body('productId').isMongoId(),
  body('code').isString().notEmpty(),
  body('stock').isInt({ min: 0 }),
  body('price').isFloat({ min: 0 }),
  body('isActive').optional().isBoolean(),
  body('attributes').optional().isObject(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];
