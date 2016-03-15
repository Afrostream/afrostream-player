import window from 'global/window';
import QUnit from 'qunit';
import afrostreamMaker from '../src/js/afrostream';
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
    let afrostream = afrostreamMaker(playerProxy(), {});

    assert.equal(typeof afrostream, 'function', 'afrostream is an object');
  }
);
