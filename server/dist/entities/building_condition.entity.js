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
const typeorm_1 = require("typeorm");
const medical_center_entity_1 = __importDefault(require("./medical_center.entity"));
let BuildingCondition = class BuildingCondition {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BuildingCondition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['строится', 'реконструкция',
            'действующее'],
        default: null,
        nullable: true
    }),
    __metadata("design:type", String)
], BuildingCondition.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BuildingCondition.prototype, "deteroation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medical_center_entity_1.default),
    __metadata("design:type", medical_center_entity_1.default)
], BuildingCondition.prototype, "medical_center", void 0);
BuildingCondition = __decorate([
    (0, typeorm_1.Entity)("building_condition")
], BuildingCondition);
exports.default = BuildingCondition;
//# sourceMappingURL=building_condition.entity.js.map