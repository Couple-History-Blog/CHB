import {ADMIN, COUPLE, USER} from "./Roles";
import {UserInfoType} from "../types/auth";

export const ROUTE_MAP = new Map<string, boolean>();

export const setRouteMap = (userInfo: UserInfoType | null) => {
    ROUTE_MAP.set(ADMIN, userInfo?.isAdmin as boolean);
    ROUTE_MAP.set(COUPLE, userInfo?.isCouple as boolean);
    ROUTE_MAP.set(USER, userInfo?.isUser as boolean);
}