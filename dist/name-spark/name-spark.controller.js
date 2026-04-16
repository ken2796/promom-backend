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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameSparkController = void 0;
const common_1 = require("@nestjs/common");
const search_name_spark_dto_1 = require("./dto/search-name-spark.dto");
const update_name_favorite_dto_1 = require("./dto/update-name-favorite.dto");
const name_spark_service_1 = require("./name-spark.service");
let NameSparkController = class NameSparkController {
    constructor(nameSparkService) {
        this.nameSparkService = nameSparkService;
    }
    search(body) {
        return this.nameSparkService.search(body);
    }
    getNameDetail(id) {
        return this.nameSparkService.getNameDetail(id);
    }
    updateFavorite(id, body) {
        return this.nameSparkService.updateFavorite(id, body);
    }
};
exports.NameSparkController = NameSparkController;
__decorate([
    (0, common_1.Post)('name-spark/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_name_spark_dto_1.SearchNameSparkDto]),
    __metadata("design:returntype", void 0)
], NameSparkController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('names/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NameSparkController.prototype, "getNameDetail", null);
__decorate([
    (0, common_1.Patch)('names/:id/favorite'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_name_favorite_dto_1.UpdateNameFavoriteDto]),
    __metadata("design:returntype", void 0)
], NameSparkController.prototype, "updateFavorite", null);
exports.NameSparkController = NameSparkController = __decorate([
    (0, common_1.Controller)('v1'),
    __metadata("design:paramtypes", [name_spark_service_1.NameSparkService])
], NameSparkController);
//# sourceMappingURL=name-spark.controller.js.map