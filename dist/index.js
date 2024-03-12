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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./utils/server");
require("dotenv").config();
// export const app = express();
// app.use(cors({
//     credentials:true,
// }));
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));
const app = (0, server_1.createServer)();
const PORT = process.env.DEV_PORT ? Number(process.env.DEV_PORT) : 5000;
mongoose_1.default.Promise = Promise;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connected to Mongo DB successfully");
    }
    catch (error) {
        console.log("Connection failed" + error.message);
    }
});
exports.connectDB = connectDB;
// mongoose.connect('mongodb://localhost:27017/mybrand');
//  connectDB();
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
    (0, exports.connectDB)();
});
// app.use('/',routers());
//# sourceMappingURL=index.js.map