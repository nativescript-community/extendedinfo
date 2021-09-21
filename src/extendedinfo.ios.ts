import { Device } from '@nativescript/core/platform';

let isSimulatorCache: boolean;
export function isSimulator() {
    if (isSimulatorCache === undefined) {
        const osMajorVersion = +Device.osVersion;
        const processInfo = NSProcessInfo.processInfo;
        const isMinIOS9 = osMajorVersion > 9;
        if (isMinIOS9) {
            const simDeviceName = processInfo.environment.objectForKey('SIMULATOR_DEVICE_NAME');
            isSimulatorCache = simDeviceName !== null;
        } else {
            const currentDevice = UIDevice.currentDevice;
            isSimulatorCache = currentDevice.name.toLowerCase().indexOf('simulator') > -1;
        }
    }
    return isSimulatorCache;
}

let mainBundle: NSBundle;
function getMainBundleSync() {
    if (!mainBundle) {
        mainBundle = NSBundle.mainBundle;
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
        if (!BuildNumberVar) {
            const version = getInfoDictSync().objectForKey('CFBundleVersion');
            if (isNaN(version)) {
                BuildNumberVar = version;
            } else {
                BuildNumberVar = parseInt(version, 10);
            }
        }
    }
    return BuildNumberVar;
}
export function getBuildNumber(): Promise<number> {
    return Promise.resolve().then(() => getBuildNumberSync());
}
