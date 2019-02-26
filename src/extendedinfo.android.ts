import * as application from 'application';

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
            (Build.BRAND.startsWith('generic') && Build.DEVICE.startsWith('generic')) ||
            'google_sdk' === Build.PRODUCT;
    }
    return isSimulatorCache;
}

let appContext: android.content.Context;
function getAppContext(): Promise<android.content.Context> {
    if (appContext) {
        return Promise.resolve(appContext);
    }
    return new Promise((resolve, reject) => {
        function _resolve() {
            appContext = application.android.context;
            resolve(appContext);
        }

        try {
            if (application.android.context) {
                _resolve();
            } else {
                // if this is called before application.start() wait for the event to fire
                application.on(application.launchEvent, _resolve);
            }
        } catch (ex) {
            console.log('Error in getAppContext: ' + ex);
            reject(ex);
        }
    });
}

let cachedPackageInfo: android.content.pm.PackageInfo;
function getPackageInfo(): Promise<android.content.pm.PackageInfo> {
    if (cachedPackageInfo) {
        return Promise.resolve(cachedPackageInfo);
    }
    return getAppContext().then(c => {
        const packageManager = c.getPackageManager();
        cachedPackageInfo = packageManager.getPackageInfo(c.getPackageName(), 0);
        return cachedPackageInfo;
    });
}

let AppIdVar: string;
export function getAppId(): Promise<string> {
    if (AppIdVar) {
        return Promise.resolve(AppIdVar);
    }
    return getAppContext().then(c => {
        AppIdVar = c.getPackageName();
        return AppIdVar;
    });
}

export function getAppName(): Promise<string> {
    return new Promise((resolve, reject) => {
        function _resolve() {
            const context: android.content.Context = application.android.context;
            const applicationInfo = context.getApplicationInfo();
            const stringId = applicationInfo.labelRes;
            resolve(stringId === 0 ? applicationInfo.nonLocalizedLabel : context.getString(stringId));
        }

        try {
            if (application.android.context) {
                _resolve();
            } else {
                // if this is called before application.start() wait for the event to fire
                application.on(application.launchEvent, _resolve);
            }
        } catch (ex) {
            console.log('Error in appversion.getAppName: ' + ex);
            reject(ex);
        }
    });
}

let VersionNameVar: string;
export function getVersionName(): Promise<any> {
    if (VersionNameVar) {
        return Promise.resolve(VersionNameVar);
    }
    return getPackageInfo().then(r => {
        VersionNameVar = r.versionName;
        return VersionNameVar;
    });
}

let BuildNumberVar: number;
export function getBuildNumber(): Promise<number> {
    if (BuildNumberVar) {
        return Promise.resolve(BuildNumberVar);
    }
    return getPackageInfo().then(r => {
        BuildNumberVar = r.versionCode;
        return BuildNumberVar;
    });
}
