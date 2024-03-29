import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';
import afrostream from '../src/js/afrostream';

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.test('registers itself with video.js', function (assert) {
  assert.expect(1);
  assert.strictEqual(
    videojs.getComponent('Player').prototype.afrostream,
    afrostream,
    'afrostream plugin was registered'
  );
});
