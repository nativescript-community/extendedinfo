export function isSimulator(): boolean;
export function getAppId(): Promise<string>;
export function getVersionName(): Promise<string>;
export function getAppName(): Promise<string>;
export function getBuildNumber(): Promise<number>;
