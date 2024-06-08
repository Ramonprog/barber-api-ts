import { Router } from "express";
import { UserController } from "./app/controllers/user/userController";
import { UserService } from "./app/services/user/userService";
import { UserRepository } from "./app/repository/user/userRepository";

const router = Router();

// Instanciando os serviços e o controlador
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Rotas de usuário
router.post('/user', userController.create.bind(userController));
router.post('/session', userController.login.bind(userController));
router.get('/user/:id', userController.userDetail.bind(userController));

export { router };