import { android as androidApp, launchEvent, off, on } from '@nativescript/core/application';

let isSimulatorCache: boolean;
export function isSimulator() {
    if (isSimulatorCache === undefined) {
        const Build = android.os.Build;
        isSimulatorCache =
            Build.FINGERPRINT.startsWith('generic') ||
            Build.FINGERPRINT.startsWith('unknown') ||
            Build.MODEL.indexOf('google_sdk') !== -1 ||
            Build.MODEL.indexOf('Emulator') !== -1 ||
            Build.MODEL.indexOf('Android SDK built for x86') !== -1 ||
            Build.MANUFACTURER.indexOf('Genymotion') !== -1 ||
            Build.MANUFACTURER.indexOf('Genymotion') !== -1 ||
            (Build.BRAND.startsWith('generic') && Build.DEVICE.startsWith('generic')) ||
            Build.PRODUCT.indexOf('sdk') !== -1;
    }
    return isSimulatorCache;
}

let appContext: android.content.Context;
function getAppContextSync(): android.content.Context {
    if (!appContext) {
        appContext = androidApp.context;
    }
    return appContext;
}
function getAppContext(): Promise<android.content.Context> {
    return new Promise((resolve) => {
        getAppContextSync();
        if (appContext) {
            return resolve(appContext);
        }
        // if this is called before application.start() wait for the event to fire
        on(launchEvent, () => resolve(getAppContextSync()));
    });
}

let cachedPackageInfo: android.content.pm.PackageInfo;
function getPackageInfoSync(): android.content.pm.PackageInfo {
    if (!cachedPackageInfo) {
        const context = getAppContextSync();
        if (context) {
            const packageManager = context.getPackageManager();
            cachedPackageInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
        }
    }
    return cachedPackageInfo;
}

function getPackageInfo(): Promise<android.content.pm.PackageInfo> {
    if (cachedPackageInfo) {
        return Promise.resolve(cachedPackageInfo);
    }
    return getAppContext().then((c) => {
        const packageManager = c.getPackageManager();
        cachedPackageInfo = packageManager.getPackageInfo(c.getPackageName(), 0);
        return cachedPackageInfo;
    });
}

let AppIdVar: string;
export function getAppIdSync(): string {
    if (!AppIdVar) {
        const context = getAppContextSync();
        if (context) {
            AppIdVar = context.getPackageName();
        }
    }
    return AppIdVar;
}
export function getAppId(): Promise<string> {
    if (AppIdVar) {
        return Promise.resolve(AppIdVar);
    }
    return getAppContext().then((c) => getAppIdSync());
}

export function getAppNameSync(): string {
    const context = getAppContextSync();
    const applicationInfo = context.getApplicationInfo();
    const stringId = applicationInfo.labelRes;
    return stringId === 0 ? applicationInfo.nonLocalizedLabel : context.getString(stringId);
}

export function getAppName(): Promise<string> {
    return getAppContext().then((c) => getAppNameSync());
}

let VersionNameVar: string;
export function getVersionNameSync(): string {
    if (!VersionNameVar) {
        const p = getPackageInfoSync();
        if (p) {
            VersionNameVar = p.versionName;
        }
    }
    return VersionNameVar;
}
export function getVersionName(): Promise<string> {
    if (VersionNameVar) {
        return Promise.resolve(VersionNameVar);
    }
    return getPackageInfo().then(() => getVersionNameSync());
}

let BuildNumberVar: number;
export function getBuildNumberSync(): number {
    if (!BuildNumberVar) {
        const p = getPackageInfoSync();
        if (p) {
            BuildNumberVar = p.versionCode;
        }
    }
    return BuildNumberVar;
}
export function getBuildNumber(): Promise<number> {
    if (BuildNumberVar) {
        return Promise.resolve(BuildNumberVar);
    }
    return getPackageInfo().then(() => getBuildNumberSync());
}
