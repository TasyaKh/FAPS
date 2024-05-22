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
exports.MedicalFacility = void 0;
const typeorm_1 = require("typeorm");
const locality_entity_1 = __importDefault(require("./locality.entity"));
const types_entity_1 = require("./types.entity");
const district_entity_1 = __importDefault(require("./district.entity"));
let MedicalFacility = class MedicalFacility {
};
exports.MedicalFacility = MedicalFacility;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MedicalFacility.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MedicalFacility.prototype, "binding_key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalFacility.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], MedicalFacility.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], MedicalFacility.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "number_of_house", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 12, nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 13, nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "ogrn", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 9, nullable: true }),
    __metadata("design:type", String)
], MedicalFacility.prototype, "kpp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.default, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.default)
], MedicalFacility.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => locality_entity_1.default, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'locality_id' }),
    __metadata("design:type", locality_entity_1.default)
], MedicalFacility.prototype, "locality", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => types_entity_1.Type, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", types_entity_1.Type)
], MedicalFacility.prototype, "type", void 0);
exports.MedicalFacility = MedicalFacility = __decorate([
    (0, typeorm_1.Entity)('medical_facility')
], MedicalFacility);
//# sourceMappingURL=medical_facility.entity.js.map