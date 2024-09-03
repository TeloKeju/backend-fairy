import express from "express"
import { deleteUser, updateUser, createUser, getUser, getUserByID, profile } from "../controller/UserController.js"
import { register, login, isAvailableUsername, isAvailableEmail, checkEmail, forgotPasswordSend, forgotPasswordForm, logout, testAuthToken, authenticationToken, refreshNewToken, validJWT, verify, updateProfile } from "../controller/AuthController.js"
import { getDongeng, getDongengById, createDongeng, updateDongeng, deleteDongeng, sumView, popularView, countDongeng, countAllView } from "../controller/DongengController.js"
import accessValidation from "../middleware/authorization.js"
import { createSoalPilgan, createSoalUraianPanjang, createSoalUraianSingkat, deleteSoalPilgan, deleteSoalUraianPanjang, deleteSoalUraianSingkat, getSoalPilgan, getSoalUraianPanjang, getSoalUraianSingkat, updateSoalPilgan, updateSoalUraianPanjang, updateSoalUraianSingkat } from "../controller/soalController.js"
import { createQuiz, deleteQuiz, getAllQuiz, getQuizById, updateQuiz } from "../controller/quizController.js"
import { getRekapByForumId } from "../controller/forumController.js"

const router = express.Router();

router.get("/api/profile/:token", profile)
router.post("/api/profile/update/:token", updateProfile)
router.get("/api/users/:id", accessValidation, getUserByID);
router.get("/api/users", accessValidation, getUser);
router.post("/api/users", accessValidation, createUser);
router.patch("/api/users/:id", updateUser);
router.delete("/api/users/:id", accessValidation, deleteUser);

router.post("/api/dongeng", createDongeng);
router.get("/api/count/view", countAllView);
router.get("/api/count/dongeng", countDongeng);
router.delete("/api/dongeng/:id", accessValidation, deleteDongeng);
router.get("/api/dongeng", accessValidation, getDongeng);
router.patch("/api/dongeng/:id", accessValidation, updateDongeng);
router.get("/api/dongeng/:id", getDongengById);
router.get("/api/dongengview/:id", sumView);
router.get("/api/popular", popularView);

router.post("/api/login", login);
router.post("/api/logout", logout);
router.post("/api/register", register);
router.get("/api/auth/alreadyexist/email", isAvailableEmail);
router.get("/api/auth/alreadyexist/username", isAvailableUsername);
router.get("/api/auth/email", checkEmail);
router.post("/api/forgot-password", forgotPasswordSend);
router.post("/api/forgot-password/:token", forgotPasswordForm);
router.post("/api/refresh-token", refreshNewToken);
router.get("/api/isvalidtoken/:token", validJWT);
router.get("/api/verify", verify);

router.post("/api/set-soal-pilgan", accessValidation, createSoalPilgan);
router.get("/api/get-soal-pilgan", accessValidation, getSoalPilgan);
router.delete(
  "/api/delete-soal-pilgan/:id",
  accessValidation,
  deleteSoalPilgan
);
router.patch("/api/update-soal-pilgan/:id", accessValidation, updateSoalPilgan);

router.get(
  "/api/get-soal-uraian-singkat",
  accessValidation,
  getSoalUraianSingkat
);
router.post(
  "/api/set-soal-uraian-singkat",
  accessValidation,
  createSoalUraianSingkat
);
router.delete(
  "/api/delete-soal-uraian-singkat/:id",
  accessValidation,
  deleteSoalUraianSingkat
);
router.patch(
  "/api/update-soal-uraian-singkat/:id",
  accessValidation,
  updateSoalUraianSingkat
);

router.get(
  "/api/get-soal-uraian-panjang",
  accessValidation,
  getSoalUraianPanjang
);
router.post(
  "/api/set-soal-uraian-panjang",
  accessValidation,
  createSoalUraianPanjang
);
router.delete(
  "/api/delete-soal-uraian-panjang/:id",
  accessValidation,
  deleteSoalUraianPanjang
);
router.patch(
  "/api/update-soal-uraian-panjang/:id",
  accessValidation,
  updateSoalUraianPanjang
);

router.get("/api/get-all-quiz", accessValidation, getAllQuiz);
router.post("/api/create-quiz", accessValidation, createQuiz);
router.delete("/api/delete-quiz/:id", accessValidation, deleteQuiz);
router.patch("/api/update-quiz/:id", accessValidation, updateQuiz);
router.get("/api/get-quiz/:id", accessValidation, getQuizById);

router.get("/api/get-rekap/:id_forum", getRekapByForumId)

router.get("/api/test", authenticationToken, testAuthToken);

export default router;
