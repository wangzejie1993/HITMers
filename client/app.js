/* global wx App */

import './utils/wxPromise.min.js';
import locales from './utils/locales';
import T from './utils/i18n';
require('./prototypes');
// const update = require('./utils/update');

T.registerLocale(locales);
let savedGlobalData = wx.getStorageSync('globalData');
let langIndex = savedGlobalData.langIndex || 0;
T.setLocaleByIndex(langIndex);
wx.T = T;

App({

  globalData: { },

  onLaunch: function () {
    this.globalData = savedGlobalData || 
      {
        // Language settings
        langIndex: 0,
        languages: locales,
        language: locales['zh-Hans'],
        // Login status
        logged: false,
        // Student ID, name
        stuId: null,
        stuName: null,
        stuPassword: null,
        // Check in/out status
        checkedIn: false
      };
    
    // load all update in locales.js
    this.globalData.language = wx.T.getLanguage();

    // update(this.globalData.language);

    // Wake up Heroku server.
    wx.pro.request({
      url: require('./config').service.host
    });
    wx.pro.request({
      url: require('./config').service.url2pdf
    });
  },

  onHide: function() {
    wx.setStorage({
      key: 'globalData',
      data: this.globalData
    });
  }
});