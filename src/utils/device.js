var device = {};
var ua = navigator.userAgent;

var android = ua.match(/(Android);?[\s]+([\d.]+)?/);
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
var version = ua.match(/Version/);

device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

// Android
if (android) {
	device.os = 'android';
	device.osVersion = android[2];
	device.android = true;
	device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
}
if (ipad || iphone || ipod) {
	device.os = 'ios';
	device.ios = true;
}
// iOS
if (iphone && !ipod) {
	device.osVersion = iphone[2].replace(/_/g, '.');
	device.iphone = true;
}
if (ipad) {
	device.osVersion = ipad[2].replace(/_/g, '.');
	device.ipad = true;
}
if (ipod) {
	device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
	device.iphone = true;
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
	if (device.osVersion.split('.')[0] === '10') {
		device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
	}
}

// Webview
var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
device.webView = (android && version) || ((iphone || ipad || ipod) && !version);
// device.webView = (android && version) || ((iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i));
// device.webView = (iphone || ipad || ipod || android) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

// OS classes
// if (device.os) {
//   /* global classNames:true */
//   /* eslint no-undef: "error" */
//   classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
//   if (device.os === 'ios') {
//     var major = parseInt(device.osVersion.split('.')[0], 10);
//     for (var i = major - 1; i >= 6; i--) {
//       classNames.push('ios-gt-' + i);
//     }
//   }
// }
// keng..
device.isWeixin = /MicroMessenger/i.test(ua);

export default device;
