import { ios as iosUtils } from 'tns-core-modules/utils/utils';
import * as platform from 'tns-core-modules/platform';

let isSimulatorCache: boolean;
export function isSimulator() {
    if (isSimulatorCache === undefined) {
        const osMajorVersion = +platform.device.osVersion;
        const processInfo = iosUtils.getter(NSProcessInfo, NSProcessInfo.processInfo);
        const isMinIOS9 = osMajorVersion > 9;
        if (isMinIOS9) {
            const simDeviceName = processInfo.environment.objectForKey('SIMULATOR_DEVICE_NAME');
            isSimulatorCache = simDeviceName !== null;
        } else {
            const currentDevice = iosUtils.getter(UIDevice, UIDevice.currentDevice);
            isSimulatorCache = currentDevice.name.toLowerCase().indexOf('simulator') > -1;
        }
    }
    return isSimulatorCache;
}

let mainBundle: NSBundle;
function getMainBundleSync() {
    if (!mainBundle) {
        mainBundle = iosUtils.getter(NSBundle, NSBundle.mainBundle);
    }
    return mainBundle;
}

function getMainBundle(): Promise<NSBundle> {
    return Promise.resolve().then(() => getMainBundleSync());
}
let infoDict: NSDictionary<string, any>;
function getInfoDictSync() {
    if (!infoDict) {
        infoDict = getMainBundleSync().infoDictionary;
    }
    return infoDict;
}
function getInfoDict(): Promise<NSDictionary<string, any>> {
    return Promise.resolve().then(() => getInfoDictSync());
}

let AppIdVar: string;
export function getAppIdSync(): string {
    if (!AppIdVar) {
        AppIdVar = getMainBundleSync().bundleIdentifier;
    }
    return AppIdVar;
}
export function getAppId(): Promise<string> {
    return Promise.resolve().then(() => getAppIdSync());
}

let AppNameVar: string;
export function getAppNameSync(): string {
    if (!AppNameVar) {
        AppNameVar = getInfoDictSync().objectForKey('CFBundleDisplayName');
    }
    return AppIdVar;
}
export function getAppName(): Promise<string> {
    return Promise.resolve().then(() => getAppNameSync());
}

let VersionNameVar: string;
export function getVersionNameSync(): string {
    if (!VersionNameVar) {
        VersionNameVar = getInfoDictSync().objectForKey('CFBundleShortVersionString');
    }
    return VersionNameVar;
}
export function getVersionName(): Promise<string> {
    return Promise.resolve().then(() => getVersionNameSync());
}

let BuildNumberVar: number;
export function getBuildNumberSync(): number {
    if (!BuildNumberVar) {
        BuildNumberVar = parseInt(getInfoDictSync().objectForKey('CFBundleVersion'), 10);
    }
    return BuildNumberVar;
}
export function getBuildNumber(): Promise<number> {
    return Promise.resolve().then(() => getBuildNumberSync());
}
