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
const district_entity_1 = __importDefault(require("./district.entity"));
const population_entity_1 = require("./population.entity");
const distance_entity_1 = __importDefault(require("./distance.entity"));
let Locality = class Locality {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Locality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Locality.prototype, "district_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Locality.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Locality.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Locality.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.default, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.default)
], Locality.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => population_entity_1.Population, (population) => population.locality),
    __metadata("design:type", population_entity_1.Population)
], Locality.prototype, "population", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => distance_entity_1.default, (dist) => dist.locality, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Locality.prototype, "distances_mc", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => distance_entity_1.default, (dist) => dist.locality, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Locality.prototype, "distances_mf", void 0);
Locality = __decorate([
    (0, typeorm_1.Entity)('locality')
], Locality);
exports.default = Locality;
//# sourceMappingURL=locality.entity.js.map