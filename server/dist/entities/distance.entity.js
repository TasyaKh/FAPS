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
const locality_entity_1 = __importDefault(require("./locality.entity"));
const medical_center_entity_1 = __importDefault(require("./medical_center.entity"));
const medical_facility_entity_1 = require("./medical_facility.entity");
let Distance = class Distance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Distance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Distance.prototype, "distance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Distance.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Distance.prototype, "locality_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Distance.prototype, "mc_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Distance.prototype, "mc_facility_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => locality_entity_1.default, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'locality_id' }),
    __metadata("design:type", locality_entity_1.default)
], Distance.prototype, "locality", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_center_entity_1.default, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mc_id' }),
    __metadata("design:type", medical_center_entity_1.default)
], Distance.prototype, "medical_center", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_facility_entity_1.MedicalFacility, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mc_facility_id' }),
    __metadata("design:type", medical_facility_entity_1.MedicalFacility)
], Distance.prototype, "medical_facility", void 0);
Distance = __decorate([
    (0, typeorm_1.Entity)('distance')
], Distance);
exports.default = Distance;
//# sourceMappingURL=distance.entity.js.map