// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyBBjVystZ5NskbWkWsuBdtLh6ntZdiAQqg',
    authDomain: 'dataimagemusic.firebaseapp.com',
    databaseURL: 'https://dataimagemusic-default-rtdb.firebaseio.com',
    projectId: 'dataimagemusic',
    storageBucket: 'dataimagemusic.appspot.com',
    messagingSenderId: '1066682814538',
    appId: '1:1066682814538:web:17e10bc6565189b29d56b3',
    measurementId: 'G-VX010H87ZW'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
