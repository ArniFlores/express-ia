import { Router } from 'express';
import { chatHandler } from '../controllers/chat-handler.controller';

const router = Router();

router.post('/chat', chatHandler);

export default router;
