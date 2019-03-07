[![npm](https://img.shields.io/npm/v/nativescript-extendedinfo.svg)](https://www.npmjs.com/package/nativescript-extendedinfo)
[![npm](https://img.shields.io/npm/dt/nativescript-extendedinfo.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-extendedinfo)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-extendedinfo.svg)](https://github.com/Akylas/nativescript-extendedinfo/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-extendedinfo.svg)](https://github.com/Akylas/nativescript-extendedinfo/stargazers)

[![NPM](https://nodei.co/npm/nativescript-extendedinfo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-extendedinfo/)

## Installation

* `tns plugin add nativescript-extendedinfo`

Be sure to run a new build after adding plugins to avoid any issues.

---

Plugin to get diverse device infos. This plugin caches results to make it faster.
```typescript
function isSimulator(): boolean;
function getAppId(): Promise<string>;
function getAppIdSync(): string;
function getVersionName(): Promise<string>;
function getVersionNameSync(): string;
function getAppName(): Promise<string>;
function getAppNameSync(): string;
function getBuildNumber(): Promise<number>;
function getBuildNumberSync(): number;
```