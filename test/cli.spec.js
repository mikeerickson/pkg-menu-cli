var chai        = require('chai');
var expect      = chai.expect;
var assert      = chai.assert;
var packageMenu = require('../src/packageMenu.js');

describe('==> Package Name CLI', () => {

  let pkgInfo;
  let menuData;

  it('should fail when unable to locate `package.json`', function () {
    pkgInfo = packageMenu.getPackageInfo('badFilename');
    expect(pkgInfo).to.include.keys('error');
  });

  it('should return package information for supplied filename', function () {
    pkgInfo = {'scripts': {}};
    expect(pkgInfo).to.include.keys('scripts');
  });

  it('should return table of scripts', function () {
    menuData = packageMenu.build(packageMenu.getPackageInfo());
    expect(menuData).to.be.instanceof(Array);
  });

  it('should properly sort result [uses --sort flag]', function () {
    menuData = packageMenu.build(packageMenu.getPackageInfo(),{sort: true});
    // console.log(menuData);
    expect(menuData[0][0]).to.equal('all');  // first element from this project is `all`
  });

  it('gracefully handle missing `package.json`', function () {
    menuData = packageMenu.build(packageMenu.getPackageInfo('table1.json'));
    expect(menuData).to.include.keys('error','message');
  });

});
