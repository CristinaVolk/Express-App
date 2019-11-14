  const express = require('express');
  const router = express.Router();

  import { checkIfAuthenticated } from '../auth/authenticated';
  import { colors } from '../colors.json';
  import { all, get, patch, remove, login, createNewUser } from "../controllers/user_controller";


  router.use((req, res, next) => {
      next();
  });

  router.get('/', (req, res) => {
      res.json({ "message": "Karl" });
  })

  router.post('/signup', createNewUser);

  router.post('/login', login);

  router.get('/users', checkIfAuthenticated, all);

  router.get('/users/:id', get);

  router.patch('/users/:id', checkIfAuthenticated, patch);

  router.delete('/users/:id', checkIfAuthenticated, remove);


  router.get('/colors', checkIfAuthenticated, async(_, res) => {
      return res.send(colors);
  });

  module.exports = router;