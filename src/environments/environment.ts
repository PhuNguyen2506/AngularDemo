// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyCVJNDArQZW9LrZ9qKl-fibWLWAAC5y_tY',
    authDomain: 'example-with-angular.firebaseapp.com',
    databaseURL: 'https://example-with-angular.firebaseio.com',
    projectId: 'example-with-angular',
    storageBucket: 'example-with-angular.appspot.com',
    messagingSenderId: '973815104644'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
