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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrucksModule = exports.TRUCK_REPOSITORY_TOKEN = void 0;
const common_1 = require("@nestjs/common");
const trucks_controller_1 = require("./trucks.controller");
const use_cases_1 = require("../../application/use-cases");
const truck_service_1 = require("../../domain/services/truck.service");
const prisma_truck_repository_1 = require("../../infrastructure/repositories/prisma-truck.repository");
const prisma_module_1 = require("../../infrastructure/database/prisma.module");
exports.TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';
let TrucksModule = class TrucksModule {
    constructor() {
        console.log('🚛 Trucks Module initialized');
        console.log('📦 Components loaded: Controller, Use Cases, Domain Service, Repository');
    }
};
exports.TrucksModule = TrucksModule;
exports.TrucksModule = TrucksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
        ],
        controllers: [
            trucks_controller_1.TrucksController,
        ],
        providers: [
            use_cases_1.CreateTruckUseCase,
            use_cases_1.GetAllTrucksUseCase,
            truck_service_1.TruckDomainService,
            {
                provide: exports.TRUCK_REPOSITORY_TOKEN,
                useClass: prisma_truck_repository_1.PrismaTruckRepository,
            },
        ],
        exports: [
            use_cases_1.CreateTruckUseCase,
            use_cases_1.GetAllTrucksUseCase,
        ],
    }),
    __metadata("design:paramtypes", [])
], TrucksModule);
//# sourceMappingURL=trucks.module.js.map