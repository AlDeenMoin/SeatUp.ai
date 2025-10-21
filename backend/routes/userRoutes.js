import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { findUserById } from '../models/userModel.js';

const router = express.Router();

router.get('/me', authenticateJWT, async (req, res) => {
  const user = await findUserById(req.user.id);
  res.json({ id: user.id, email: user.email, role: user.role, name: user.name });
});

router.get('/:id', authenticateJWT, authorizeRoles('admin', 'hr'), async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, email: user.email, role: user.role, name: user.name });
});

export default router;
