"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsDeterioration = void 0;
const typeorm_1 = require("typeorm");
const medical_center_entity_1 = __importDefault(require("./medical_center.entity"));
let PointsDeterioration = class PointsDeterioration {
};
exports.PointsDeterioration = PointsDeterioration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PointsDeterioration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointsDeterioration.prototype, "percents", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointsDeterioration.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PointsDeterioration.prototype, "mc_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_center_entity_1.default, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mc_id' }),
    __metadata("design:type", medical_center_entity_1.default)
], PointsDeterioration.prototype, "medical_center", void 0);
exports.PointsDeterioration = PointsDeterioration = __decorate([
    (0, typeorm_1.Entity)('points_deterioration'),
    (0, typeorm_1.Unique)(['mc_id']) // This ensures that the `mc_id` column is unique
], PointsDeterioration);
//# sourceMappingURL=points_deterioration.entity.js.map