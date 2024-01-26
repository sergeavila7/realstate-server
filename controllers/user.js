import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js';
import { emailSignup } from '../helpers/email.js';

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

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        errors: [{ msg: 'El usuario ya existe!' }],
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      token: generateId(),
    });

    emailSignup({ name: user.name, email: user.email, token: user.token });

    return res.status(200).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const confirm = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true,
          },
        ],
      });
    }

    user.token = null;
    user.confirmed = true;
    await user.save();

    return res.status(200).json({ msg: 'La cuenta se confirmó correctamente' });
  } catch (error) {
    console.error('Error al confirmar la cuenta:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { signup, confirm };
