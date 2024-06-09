import { Router } from "express";
import { UserController } from "./app/controllers/user/userController";
import { UserService } from "./app/services/user/userService";
import { UserRepository } from "./app/repository/user/userRepository";
import { isAuthenticated } from "./infra/middlewares/isAuthenticated";
import { HairCutRepository } from "./app/repository/haircut/hairCutRepository";
import { HairCutService } from "./app/services/haircut/hairCutService";
import { HairCutController } from "./app/controllers/haircut/hairCutController";

const router = Router();

// Instanciando os serviços e o controlador de usuário
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
// Instanciando os serviços e o controlador de corte de cabelo
const hairCutRepository = new HairCutRepository();
const hairCutService = new HairCutService(hairCutRepository);
const hairCutController = new HairCutController(hairCutService);

// Rotas de usuário
router.post('/user', userController.create.bind(userController));
router.post('/session', userController.login.bind(userController));
router.use(isAuthenticated);
router.get('/me', userController.userDetail.bind(userController));
router.put('/user', userController.userUpdate.bind(userController));

//rotas de corte de cabelo
router.post('/haircut', hairCutController.createHairCut.bind(hairCutController));
router.get('/haircut', hairCutController.allHaircuts.bind(hairCutController));
router.put('/haircut', hairCutController.updateHairCut.bind(hairCutController));
router.get('/haircut/detail', hairCutController.hairCutDetail.bind(hairCutController));

export { router };