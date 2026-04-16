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
const name_gender_enum_1 = require("../shared/enums/name-gender.enum");
const POPULARITY_BONUS = {
    Popular: 2,
    Steady: 1,
    Emerging: 0,
};
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
        const { gender, origins, startingLetter, limit = 10 } = input;
        const filtered = this.names.filter((name) => {
            if (gender && name.gender !== gender && name.gender !== name_gender_enum_1.NameGender.Unisex) {
                return false;
            }
            if (origins && origins.length > 0 && !origins.includes(name.origin)) {
                return false;
            }
            if (startingLetter && !name.name.startsWith(startingLetter)) {
                return false;
            }
            return true;
        });
        const scored = filtered.map((name) => {
            let score = 0;
            if (gender) {
                score += name.gender === gender ? 3 : 1;
            }
            if (origins && origins.length > 0) {
                score += 2;
            }
            if (startingLetter) {
                score += 2;
            }
            score += POPULARITY_BONUS[name.popularity] ?? 0;
            return this.toSearchResult(name, score);
        });
        scored.sort((a, b) => b.matchScore - a.matchScore || a.name.localeCompare(b.name));
        return scored.slice(0, limit);
    }
    getNameDetail(id) {
        return this.toDetail(this.findNameOrThrow(id));
    }
    updateFavorite(id, input) {
        const name = this.findNameOrThrow(id);
        name.isFavorite = input.isFavorite;
        return this.toDetail(name);
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