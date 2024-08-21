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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
var song_model_1 = __importDefault(require("../../models/song.model"));
var topic_model_1 = __importDefault(require("../../models/topic.model"));
var singer_model_1 = __importDefault(require("../../models/singer.model"));
var system_1 = require("../../config/system");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, song_model_1.default.find({
                    deleted: false
                })];
            case 1:
                songs = _a.sent();
                res.render("admin/pages/songs/index", {
                    pageTitle: "Quản lý bài hát",
                    songs: songs
                });
                return [2];
        }
    });
}); };
exports.index = index;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, topic_model_1.default.find({
                    deleted: false
                }).select("title")];
            case 1:
                topics = _a.sent();
                return [4, singer_model_1.default.find({
                        deleted: false
                    }).select("fullName")];
            case 2:
                singers = _a.sent();
                res.render("admin/pages/songs/create", {
                    pageTitle: "Thêm mới bài hát",
                    topics: topics,
                    singers: singers
                });
                return [2];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var avatar, audio, dataSong, song;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                avatar = '';
                audio = '';
                if (req.body.avatar) {
                    avatar = req.body.avatar[0];
                }
                if (req.body.audio) {
                    audio = req.body.audio[0];
                }
                dataSong = {
                    title: req.body.title,
                    topicId: req.body.topicId,
                    singerId: req.body.singerId,
                    description: req.body.description,
                    status: req.body.status,
                    lyrics: req.body.lyrics,
                    avatar: avatar,
                    audio: audio
                };
                song = new song_model_1.default(dataSong);
                return [4, song.save()];
            case 1:
                _a.sent();
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/songs"));
                return [2];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var song, topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, song_model_1.default.findById(req.params.songId)];
            case 1:
                song = _a.sent();
                if (!song) {
                    return [2, res.status(404).render("error/404")];
                }
                return [4, topic_model_1.default.find({
                        deleted: false
                    }).select("title")];
            case 2:
                topics = _a.sent();
                return [4, singer_model_1.default.find({
                        deleted: false
                    }).select("fullName")];
            case 3:
                singers = _a.sent();
                res.render("admin/pages/songs/edit", {
                    pageTitle: "Chỉnh sửa bài hát",
                    song: song,
                    topics: topics,
                    singers: singers
                });
                return [2];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var song, avatar, audio, dataSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, song_model_1.default.findById(req.params.songId)];
            case 1:
                song = _a.sent();
                if (!song) {
                    return [2, res.status(404).render("error/404")];
                }
                avatar = '';
                audio = '';
                if (req.body.avatar) {
                    avatar = req.body.avatar[0];
                }
                if (req.body.audio) {
                    audio = req.body.audio[0];
                }
                if (avatar === '') {
                    avatar = song.avatar;
                }
                if (audio === '') {
                    audio = song.audio;
                }
                dataSong = {
                    title: req.body.title,
                    topicId: req.body.topicId,
                    singerId: req.body.singerId,
                    description: req.body.description,
                    status: req.body.status,
                    lyrics: req.body.lyrics,
                    avatar: avatar,
                    audio: audio
                };
                return [4, song_model_1.default.findByIdAndUpdate(req.params.songId, dataSong)];
            case 2:
                _a.sent();
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/songs"));
                return [2];
        }
    });
}); };
exports.editPatch = editPatch;
