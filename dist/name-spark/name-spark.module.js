"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameSparkModule = void 0;
const common_1 = require("@nestjs/common");
const name_spark_controller_1 = require("./name-spark.controller");
const name_spark_service_1 = require("./name-spark.service");
let NameSparkModule = class NameSparkModule {
};
exports.NameSparkModule = NameSparkModule;
exports.NameSparkModule = NameSparkModule = __decorate([
    (0, common_1.Module)({
        controllers: [name_spark_controller_1.NameSparkController],
        providers: [name_spark_service_1.NameSparkService],
    })
], NameSparkModule);
//# sourceMappingURL=name-spark.module.js.map