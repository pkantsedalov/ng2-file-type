import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = Function.prototype;

(async () => {
  try {
    const testing        = await System.import('@angular/core/testing');
    const testingBrowser = await System.import('@angular/platform-browser-dynamic/testing');

    // First, initialize the Angular testing environment.
    await testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );

    // Then we find all the tests.
    const context = await require.context('../src/spec', true, /\.spec\.ts/);

    // And load the modules.
    context.keys().map(context);

    // Finally, start Karma to run the tests.
    __karma__.start();
  } catch (err) {
    __karma__.error(err);
  }

})();
