"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const create_profile_listener_1 = require("./listeners/create-profile.listener");
const welcome_notification_listener_1 = require("./listeners/welcome-notification.listener");
const award_starter_coins_listener_1 = require("./listeners/award-starter-coins.listener");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        providers: [create_profile_listener_1.CreateProfileListener, welcome_notification_listener_1.WelcomeNotificationListener, award_starter_coins_listener_1.AwardStarterCoinsListener],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map