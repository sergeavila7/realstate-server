import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js';

const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar sesion',
  });
};

const formSignup = (req, res) => {
  res.render('auth/signup', {
    page: 'Crear cuenta',
  });
};

const signup = async (req, res) => {
  await Promise.all([
    check('name').notEmpty().withMessage('El nombre es obligatorio!').run(req),
    check('email').isEmail().withMessage('Email no válido!').run(req),
    check('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe contener al menos 6 caracteres!')
      .run(req),
    check('repeat_password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden!');
        }
        return true;
      })
      .run(req),
  ]);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({
      errors: [
        {
          msg: 'El usuario ya existe!',
        },
      ],
    });
  }
  await User.create({ name, email, password, token: generateId() });
};

const formRecovery = (req, res) => {
  res.render('auth/recovery', {
    page: 'Recupera tu acceso a bienes raices',
  });
};

export { formLogin, formSignup, signup, formRecovery };
