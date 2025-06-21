import { NativeScriptConfig } from '@nativescript/core';

export default {
  projectName : "Absensi App",
  id: 'com.dadandev.absensiapp',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
} as NativeScriptConfig;