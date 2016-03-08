import window from 'global/window';
import QUnit from 'qunit';
import afrostreamMaker from '../src/afrostream';
import playerProxy from './player-proxy';

QUnit.module('afrostream', {

  beforeEach() {
    this.oldTimeout = window.setTimeout;
    window.setTimeout = Function.prototype;
  },

  afterEach() {
    window.setTimeout = this.oldTimeout;
  }
});

QUnit.test(
  'afrostreamMaker takes a player and returns a metrics',
  function (assert) {
    let metrics = afrostreamMaker(playerProxy(), {});

    assert.equal(typeof afrostream, 'object', 'metrics is an object');
  }
);
