"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.createMessage = exports.getMessagesById = exports.getMessages = exports.messageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: false },
    messageBody: { type: String, required: true },
    read: { type: Boolean, default: false }
});
exports.messageModel = mongoose_1.default.model('messages', MessageSchema); //Creating a class of messages
const getMessages = () => exports.messageModel.find(); //Find all items that respect the message model class
exports.getMessages = getMessages;
const getMessagesById = (id) => exports.messageModel.findById(id);
exports.getMessagesById = getMessagesById;
const createMessage = (values) => new exports.messageModel(values)
    .save().then((message) => message.toObject());
exports.createMessage = createMessage;
const deleteMessage = (id) => exports.messageModel.findByIdAndDelete(id);
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messages.js.map