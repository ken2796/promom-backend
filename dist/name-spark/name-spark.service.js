"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameSparkService = void 0;
const common_1 = require("@nestjs/common");
const name_seed_1 = require("./data/name-seed");
function cloneSeedNames() {
    return name_seed_1.nameSeed.map((item) => ({
        ...item,
        styles: [...item.styles],
    }));
}
let NameSparkService = class NameSparkService {
    constructor() {
        this.names = cloneSeedNames();
    }
    search(input) {
        void input;
        throw new common_1.NotImplementedException('TODO: implement NameSpark search for the assignment.');
    }
    getNameDetail(id) {
        const name = this.findNameOrThrow(id);
        throw new common_1.NotImplementedException(`TODO: implement NameSpark detail retrieval for ${name.id}.`);
    }
    updateFavorite(id, input) {
        const name = this.findNameOrThrow(id);
        void input;
        void name;
        throw new common_1.NotImplementedException('TODO: implement NameSpark favorite mutation for the assignment.');
    }
    findNameOrThrow(id) {
        const name = this.names.find((entry) => entry.id === id);
        if (!name) {
            throw new common_1.NotFoundException(`Name ${id} was not found.`);
        }
        return name;
    }
    toSearchResult(name, matchScore) {
        return {
            id: name.id,
            name: name.name,
            meaning: name.meaning,
            gender: name.gender,
            origin: name.origin,
            matchScore,
            isFavorite: name.isFavorite,
        };
    }
    toDetail(name) {
        return {
            ...name,
            styles: [...name.styles],
        };
    }
};
exports.NameSparkService = NameSparkService;
exports.NameSparkService = NameSparkService = __decorate([
    (0, common_1.Injectable)()
], NameSparkService);
//# sourceMappingURL=name-spark.service.js.map