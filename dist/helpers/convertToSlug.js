"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = void 0;
var unidecode_1 = __importDefault(require("unidecode"));
var convertToSlug = function (text) {
    var unidecodeText = (0, unidecode_1.default)(text.trim());
    return unidecodeText.replace(/\s+/g, "-");
};
exports.convertToSlug = convertToSlug;
