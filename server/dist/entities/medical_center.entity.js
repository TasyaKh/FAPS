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
const medical_facility_entity_1 = require("./medical_facility.entity");
const types_entity_1 = require("./types.entity");
const building_condition_entity_1 = __importDefault(require("./building_condition.entity"));
let MedicalCenter = class MedicalCenter {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "locality_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "medical_facility_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalCenter.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalCenter.prototype, "number_of_house", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalCenter.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'tinyint' }),
    __metadata("design:type", Boolean)
], MedicalCenter.prototype, "pharmacy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'smallint' }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "founding_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'tinyint' }),
    __metadata("design:type", Boolean)
], MedicalCenter.prototype, "availability_of_emergency_mediical_care", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'tinyint' }),
    __metadata("design:type", Boolean)
], MedicalCenter.prototype, "access_to_primary_health_care", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], MedicalCenter.prototype, "staffing", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => locality_entity_1.default, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'locality_id' }),
    __metadata("design:type", locality_entity_1.default)
], MedicalCenter.prototype, "locality", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => building_condition_entity_1.default),
    (0, typeorm_1.JoinColumn)([{ name: 'building_condition_id' }]),
    __metadata("design:type", building_condition_entity_1.default)
], MedicalCenter.prototype, "building_condition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_facility_entity_1.MedicalFacility, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medical_facility_id' }),
    __metadata("design:type", medical_facility_entity_1.MedicalFacility)
], MedicalCenter.prototype, "medical_facility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => types_entity_1.Type, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", types_entity_1.Type)
], MedicalCenter.prototype, "type", void 0);
MedicalCenter = __decorate([
    (0, typeorm_1.Entity)('medical_center')
], MedicalCenter);
exports.default = MedicalCenter;
//# sourceMappingURL=medical_center.entity.js.map