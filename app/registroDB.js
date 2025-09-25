var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var bcrypt = require('bcryptjs');
var mysql = require('mysql2/promise');
var connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'nEVERLETTHISG0',
    database: 'okaa',
};
// Função para registrar o usuário
var registrarUsuario = function (nome, sobrenome, emailCorp, telefone, senha) { return __awaiter(_this, void 0, void 0, function () {
    var hashedPassword, connection, rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, bcrypt.hash(senha, 10)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, mysql.createConnection(connectionConfig)];
            case 2:
                connection = _a.sent();
                return [4 /*yield*/, connection.execute('SELECT * FROM usuarios WHERE email_corporativo = ?', [emailCorp])];
            case 3:
                rows = (_a.sent())[0];
                if (rows.length > 0) {
                    console.log('Este e-mail corporativo já está cadastrado.');
                    return [2 /*return*/];
                }
                // Caso o e-mail não exista
                return [4 /*yield*/, connection.execute('INSERT INTO usuarios (nome, sobrenome, email, email_corporativo, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)', [nome, sobrenome, emailCorp, emailCorp, telefone, hashedPassword])];
            case 4:
                // Caso o e-mail não 
                _a.sent();
                console.log('Usuário registrado com sucesso!');
                return [4 /*yield*/, connection.end()];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.error('Erro ao registrar usuário:', err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };

// Exemplo de uso
registrarUsuario('João', 'Silva', 'joao.silva@empresa.com', '(11) 98765-4321', 'senhaSegura123');
export default registrarUsuario;