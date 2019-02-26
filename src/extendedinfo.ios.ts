import { ios as iosUtils } from 'tns-core-modules/utils/utils';
import * as platform from 'tns-core-modules/platform';

let isSimulatorCache: boolean;
export function isSimulator() {
    if (isSimulatorCache === undefined) {
        const osMajorVersion = +platform.device.osVersion.charAt(0);
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
export function getMainBundle(): Promise<NSBundle> {
    if (mainBundle) {
        return Promise.resolve(mainBundle);
    }
    return new Promise((resolve, reject) => {
        try {
            mainBundle = iosUtils.getter(NSBundle, NSBundle.mainBundle);
            resolve(mainBundle);
        } catch (ex) {
            console.log('Error in appversion.getBuildNumber: ' + ex);
            reject(ex);
        }
    });
}
let infoDict: NSDictionary<string, any>;
export function getInfoDict(): Promise<NSDictionary<string, any>> {
    if (infoDict) {
        return Promise.resolve(infoDict);
    }
    return getMainBundle().then(b => {
        infoDict = b.infoDictionary;
        return infoDict;
    });
}

let AppIdVar: string;
export function getAppId(): Promise<string> {
    if (AppIdVar) {
        return Promise.resolve(AppIdVar);
    }
    return getMainBundle().then(b => {
        AppIdVar = mainBundle.bundleIdentifier;
        return AppIdVar;
    });
}

let AppNameVar: string;
export function getAppName(): Promise<string> {
    if (AppNameVar) {
        return Promise.resolve(AppNameVar);
    }
    return getInfoDict().then(d => {
        AppNameVar = d.objectForKey('CFBundleDisplayName');
        return AppNameVar;
    });
}

let VersionNameVar: string;
export function getVersionName(): Promise<string> {
    if (VersionNameVar) {
        return Promise.resolve(VersionNameVar);
    }
    return getInfoDict().then(d => {
        VersionNameVar = d.objectForKey('CFBundleShortVersionString');
        return VersionNameVar;
    });
}

let BuildNumberVar: number;
export function getBuildNumber(): Promise<number> {
    if (BuildNumberVar) {
        return Promise.resolve(BuildNumberVar);
    }
    return getInfoDict().then(d => {
        BuildNumberVar = d.objectForKey('CFBundleVersion');
        return BuildNumberVar;
    });
}
