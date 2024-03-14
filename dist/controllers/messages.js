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
exports.sendMessage = exports.deleteOneMessage = exports.getOneMessage = exports.getAllMessages = void 0;
const messages_1 = require("../db/messages");
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMessages = yield (0, messages_1.getMessages)();
        return res.status(200).json(allMessages);
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.getAllMessages = getAllMessages;
const getOneMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const retrievedMessage = yield (0, messages_1.getMessagesById)(id);
        if (!retrievedMessage) {
            return res.status(404).json({ success: false, message: "message non-existent" });
        }
        retrievedMessage.read = true;
        retrievedMessage.save();
        return res.status(200).json({ success: true, data: retrievedMessage });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.getOneMessage = getOneMessage;
const deleteOneMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMessage = yield (0, messages_1.deleteMessage)(id);
        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "message non-existent" });
        }
        return res.status(200).json({ success: true, message: "Message deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.deleteOneMessage = deleteOneMessage;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderName, senderEmail, messageBody, read } = req.body;
        if (!senderName || !messageBody) {
            return res.status(400).json({ success: false, message: "Empty fields" });
        }
        const newMessage = yield (0, messages_1.createMessage)({
            senderName,
            senderEmail,
            messageBody,
            read,
        });
        return res.status(201).json({ success: true, message: "Message sent succesfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=messages.js.map