import DeviceInfo from 'react-native-device-info';

export const hasNotch = DeviceInfo.hasNotch();

export const deviceVersion = DeviceInfo.getSystemVersion();

export const version = DeviceInfo.getVersion();

const buildNumber = DeviceInfo.getBuildNumber();

export const fullVersion = `${version}.${buildNumber}`;

export function getManufacturer(callback) {
  DeviceInfo.getManufacturer().then(callback);
}

export const deviceBrand = DeviceInfo.getBrand();
export const deviceId = DeviceInfo.getDeviceId();
