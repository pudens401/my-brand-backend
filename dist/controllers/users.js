"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, users_1.deleteUserById)(id);
        return res.status(201).json({ success: true, message: "user deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const { id } = req.params;
        if (!username) {
            return res.status(400).json({ success: false, message: "Empty fields" });
        }
        const user = yield (0, users_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "No user is existent" });
        }
        user.username = username;
        yield user.save();
        return res.status(200).json({ success: true, message: "user updated successfully" }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error });
    }
});
exports.updateUser = updateUser;
const updateUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAdmin } = req.body;
        const { id } = req.params;
        if (isAdmin === undefined || isAdmin === null) {
            return res.status(400).json({ success: false, message: "Value is empty" });
        }
        const user = yield (0, users_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "No user is existent" });
        }
        user.isAdmin = isAdmin;
        yield user.save();
        return res.status(200).json({ success: true, message: "user status updated successfully" }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error });
    }
});
exports.updateUserStatus = updateUserStatus;
//# sourceMappingURL=users.js.map