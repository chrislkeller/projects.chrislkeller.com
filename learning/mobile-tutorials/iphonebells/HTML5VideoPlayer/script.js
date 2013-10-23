/*
 
 File: script.js
 
 Abstract: Script logic for the HTML5VideoPlayer sample.
 
 Version: 1.0
 
 Disclaimer: IMPORTANT:  This Apple software is supplied to you by 
 Apple Inc. ("Apple") in consideration of your agreement to the
 following terms, and your use, installation, modification or
 redistribution of this Apple software constitutes acceptance of these
 terms.  If you do not agree with these terms, please do not use,
 install, modify or redistribute this Apple software.
 
 In consideration of your agreement to abide by the following terms, and
 subject to these terms, Apple grants you a personal, non-exclusive
 license, under Apple's copyrights in this original Apple software (the
 "Apple Software"), to use, reproduce, modify and redistribute the Apple
 Software, with or without modifications, in source and/or binary forms;
 provided that if you redistribute the Apple Software in its entirety and
 without modifications, you must retain this notice and the following
 text and disclaimers in all such redistributions of the Apple Software. 
 Neither the name, trademarks, service marks or logos of Apple Inc. 
 may be used to endorse or promote products derived from the Apple
 Software without specific prior written permission from Apple.  Except
 as expressly stated in this notice, no other rights or licenses, express
 or implied, are granted by Apple herein, including but not limited to
 any patent rights that may be infringed by your derivative works or by
 other works in which the Apple Software may be incorporated.
 
 The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
 MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
 OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.
 
 IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
 OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
 MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
 AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
 STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 
 Copyright (C) 2009 Apple Inc. All Rights Reserved.
 
*/

/* ==================== VideoPlayer Constructor ==================== */

function VideoPlayer (container) {
  // remember where our container is
  this.container = container;
  // the media duration
  this.duration = 0;
  // whether we're muted
  this.muted = false;
  // dragging interaction states
  this.changingVolume = false;
  this.scrubbing = false;
  // get pointers to individual DOM elements within the player
  this.video = this.container.querySelector('video');
  this.playButton = this.container.querySelector('.play');
  this.progressBar = this.container.querySelector('.progress-bar');
  this.loadedBar = this.container.querySelector('.loaded');
  this.playedBar = this.container.querySelector('.played');
  this.scrubber = this.container.querySelector('.scrubber');
  this.elapsedTimeDisplay = this.container.querySelector('.scrubber .time');
  this.durationDisplay = this.container.querySelector('.duration');
  this.volumeButton = this.container.querySelector('.volume .button');
  this.volumeBar = this.container.querySelector('.volume .slider');
  this.volumeFill = this.container.querySelector('.slider .fill');
  this.volumeThumb = this.container.querySelector('.slider .thumb > div');
  this.dimmer = document.body.querySelector('.dimmer');
  // video event listeners
  this.video.addEventListener('durationchange', this, false);
  this.video.addEventListener('canplaythrough', this, false);
  this.video.addEventListener('play', this, false);
  this.video.addEventListener('pause', this, false);
  this.video.addEventListener('volumechange', this, false);
  this.video.addEventListener('timeupdate', this, false);
  this.video.addEventListener('progress', this, false);
  this.video.addEventListener('load', this, false);
  this.video.addEventListener('click', this, false);
  // button click event handlers
  this.playButton.addEventListener('click', this, false);
  this.volumeButton.addEventListener('click', this, false);
  // slider drag event handler
  this.volumeThumb.addEventListener('mousedown', this, false);
  this.scrubber.addEventListener('mousedown', this, false);
  // bar click event handler
  this.volumeBar.addEventListener('click', this, false);
  this.loadedBar.addEventListener('click', this, false);
  // dimmer click event handler
  this.dimmer.addEventListener('click', this, false);
  // sync the volume display with the actual volume
  this.volumeChanged();
  // and ensure the CSS is reflecting the player's state
  this.reflectStateInCSS();
};

/* ==================== Event Routing ==================== */

// We implement this DOM Events EventListener method as we passed
// "this" as the event listener argument to all .addEventListener()
// calls to track events in the video and UI elements. This ensures
// we can do event handling within the scope of our VideoPlayer
// instance without having to use JavaScript closures.
VideoPlayer.prototype.handleEvent = function (event) {
  switch (event.type) {
    // the .duration property changed
    case 'durationchange' :
      this.gotDuration();
      break;
    // we have enough data to play, so play right away
    case 'canplaythrough':
      this.video.play();
      break;
    // the media has started playing
    case 'play':
      this.reflectStateInCSS();
      break;
    // the media has paused
    case 'pause':
      this.reflectStateInCSS();
      break;
    // the volume just changed
    case 'volumechange':
      this.volumeChanged();
      break;
    // the .currentTime property has changed
    case 'timeupdate':
      this.timeChanged();
      break;
    // we got more data buffered
    case 'progress':
      this.gotMoreData();
      break;
    // the entire media has finished loaded
    case 'load':
      this.gotMoreData();
      break;
    // we got a mouse click, filter on what UI element was hit
    case 'click' :
      // the user has clicked the play/pause button, so toggle the play state
      if (event.currentTarget === this.playButton) {
        this.togglePlayState();
      }
      // the user has clicked the volume button, so toggle the mute state
      else if (event.currentTarget === this.volumeButton) {
        this.toggleMute();
      }
      // the user has clicked the progress bar, so seek to that point
      // making sure we did not hit the scrubber instead
      else if (event.currentTarget === this.volumeBar) {
        this.setVolumeFromClickInVolumeSlider(event);
      }
      // the user has clicked the progress bar, so seek to that point
      // making sure we did not hit the scrubber instead
      else if (event.currentTarget === this.loadedBar) {
        this.setVideoTimeFromClickInProgressBar(event);
      }
      // the user has clicked the video, so enter enhanced mode
      else if (event.currentTarget === this.video) {
        this.setEnhancedPlayback(true);
      }
      // the user has clicked the dimmer, so exit enhanced mode
      else if (event.currentTarget === this.dimmer) {
        this.setEnhancedPlayback(false);
      }
      break;
    // we got a mousedown, filter on which slider was hit
    case 'mousedown' :
      // the user has hit the volume slider, so engage volume change
      if (event.currentTarget === this.volumeThumb) {
        this.startVolumeChange(event);
      }
      // the user has hit the scrubber, so engage scrubbing
      else if (event.currentTarget === this.scrubber) {
        this.startScrubbing(event);
      }
      break;
    // we continued dragging a slider, find out which
    case 'mousemove' :
      if (this.changingVolume) {
        this.updateVolumeChange(event);
      }
      else if (this.scrubbing) {
        this.updateScrub(event);
      }
      break;
    // we stopped dragging a slider, find out which
    case 'mouseup' :
      if (this.changingVolume) {
        this.endVolumeChange(event);
      }
      else if (this.scrubbing) {
        this.endScrubbing(event);
      }
      break;
  }
};

/* ==================== Time Tracking ==================== */

// called in response to the "durationchange" event
VideoPlayer.prototype.gotDuration = function () {
  // cache duration because we use it every time we draw the elapsed time display
  // and scrubber position, so we avoid overhead of querying the media every time
  this.duration = this.video.duration;
  // update the duration display with a nicely pretty-printed time
  this.durationDisplay.innerText = this.prettyPrintTime(this.duration);
};

// called in response to the "timeupdate" event
VideoPlayer.prototype.timeChanged = function () {
  // figure out at what fraction of the total time we currently are
  // so that we can update the CSS metrics for the played bar and scrubber
  var percentage = (this.video.currentTime / this.duration) * 100 + '%';
  this.playedBar.style.width = percentage;
  this.scrubber.style.left = percentage;
  // update the elapsed time display with a nicely pretty-printed time
  this.elapsedTimeDisplay.innerText = this.prettyPrintTime(this.video.currentTime);
};

// pretty prints a time in seconds to a hh:mm:ss display
VideoPlayer.prototype.prettyPrintTime = function (time) {
  var components = [];
  components[0] = this.prettyPrintNumber(Math.floor(time / 3600));
  components[1] = this.prettyPrintNumber(Math.floor((time % 3600) / 60));
  components[2] = this.prettyPrintNumber(Math.floor(time % 60));
  return components.join(':');
};

// adds a trailing 0 to any number below 10
VideoPlayer.prototype.prettyPrintNumber = function (number) {
  return ((number < 10) ? '0' : '') + number;
};

/* ==================== Progress Tracking ==================== */

// called in response to the "progress" and "load" events
VideoPlayer.prototype.gotMoreData = function () {
  // update the loaded bar width based on how much of the media is buffered
  var percentage = (this.video.buffered.end(0) / this.duration) * 100 + '%';
  this.loadedBar.style.width = percentage;
};

/* ==================== Playback Control ==================== */

// called in response to a "click" event on the play/pause button
VideoPlayer.prototype.togglePlayState = function () {
  this.video.paused ? this.video.play() : this.video.pause();
};

/* ==================== Mute ==================== */

// called in response to a "click" event on the "vol" button
VideoPlayer.prototype.toggleMute = function () {
  this.video.muted = !this.video.muted;
};

/* ==================== Volume Tracking ==================== */

// called in response to the "volumechange" event
VideoPlayer.prototype.volumeChanged = function () {
  // check if we just changed the muted state
  // in which case we only want to update the CSS states
  if (this.video.muted != this.muted) {
    this.muted = this.video.muted;
    this.reflectStateInCSS();
    return;
  }
  // otherwise, update the thumb's position
  var percentage = this.video.volume * 100 + '%';
  this.volumeFill.style.width = percentage;
  this.volumeThumb.style.left = percentage;
};

/* ==================== Volume Interaction ==================== */

// called when we start a volume change interaction in order to make sure
// we have cached the current bounds for the volume slider
VideoPlayer.prototype.updateVolumeSliderBounds = function () {
  this.volumeSliderBounds = this.volumeThumb.parentNode.getBoundingClientRect();
};

// called in response to the "mousedown" event on the volume thumb
VideoPlayer.prototype.startVolumeChange = function (event) {
  // track that we're interacting with the volume slider
  this.changingVolume = true;
  // update bar position and metrics
  this.updateVolumeSliderBounds();
  // get the current volume at interaction start
  this.volumeChangeStartVolume = this.video.volume;
  this.volumeChangeStartX = event.pageX;
  // and capture all mouse events from now on
  window.addEventListener('mousemove', this, true);
  window.addEventListener('mouseup', this, true);
};

// called in response to the "mousemove" event on the entire window
// once we began changing volume
VideoPlayer.prototype.updateVolumeChange = function (event) {
  // figure out the amount of pixels we dragged since we started scrubbing
  var px_delta = event.pageX - this.volumeChangeStartX;
  // and update volume based on the volume when we started scrubbing
  this.setVolume(this.volumeChangeStartVolume + px_delta / this.volumeSliderBounds.width);
};

// called in response to the "mouseup" event on the entire window
// once we began changing volume
VideoPlayer.prototype.endVolumeChange = function (event) {
  this.changingVolume = false;
  // stop capturing all mouse events
  window.removeEventListener('mousemove', this, true);
  window.removeEventListener('mouseup', this, true);
};

// called in response to the "click" event on the volume bar
VideoPlayer.prototype.setVolumeFromClickInVolumeSlider = function (event) {
  // update the volume slider bounds
  this.updateVolumeSliderBounds();
  // get the time based on the x position in the volume slider
  var x = Math.max(Math.min(event.pageX - this.volumeSliderBounds.left - 7, this.volumeSliderBounds.width), 0);
  this.setVolume(x / this.volumeSliderBounds.width);
};

// sets the .volume property on the video and ensures it's clipped
VideoPlayer.prototype.setVolume = function (volume) {
  this.video.volume = Math.min(Math.max(volume, 0), 1)
};

/* ==================== CSS States Management ==================== */

// called in response to the "play" and "pause" events, as well as
// when we detect the muted status has changed in .volumeChanged()
VideoPlayer.prototype.reflectStateInCSS = function () {
  // compile a list of classes and apply them to the container element
  // letting the style sheet declaratively update the style with CSS
  var classes = ['video-player'];
  if (this.video.muted) {
    classes.push('muted');
  }
  classes.push(this.video.paused ? 'paused' : 'playing');
  this.container.className = classes.join(' ');
};

/* ==================== Scrubbing Interaction ==================== */

// called when we start a scrubbing interaction in order to make sure
// we have cached the current bounds for the progress bar
VideoPlayer.prototype.updateProgressBarBounds = function () {
  this.progressBarBounds = this.progressBar.getBoundingClientRect();
};

// called in response to the "mousedown" event on the scrubber
VideoPlayer.prototype.startScrubbing = function (event) {
  this.scrubbing = true;
  // update bar position and metrics
  this.updateProgressBarBounds();
  // figure out the amount of seconds per pixel
  this.sPerPx = this.duration / (this.progressBarBounds.width - 20);
  // track if we were paused at the beginning of the interaction
  this.wasPlayingWhenScrubbingBegan = !this.video.paused;
  // and always pase during the scrubbing interaction
  this.video.pause();
  // get the current time at interaction start
  this.scrubbingStartTime = this.video.currentTime;
  this.scrubbingStartX = event.pageX;
  // and capture all mouse events from now on
  window.addEventListener('mousemove', this, true);
  window.addEventListener('mouseup', this, true);
};

// called in response to the "mousemove" event on the entire window
// once we began scrubbing
VideoPlayer.prototype.updateScrub = function (event) {
  // and the amount of pixels we dragged since we started scrubbing
  var px_delta = event.pageX - this.scrubbingStartX;
  // finally updating .currentTime based on the time when we started scrubbing
  this.video.currentTime = this.scrubbingStartTime + px_delta * this.sPerPx;
};

// called in response to the "mouseup" event on the entire window
// once we began scrubbing
VideoPlayer.prototype.endScrubbing = function (event) {
  // restore playback state from when we started scrubbing
  if (this.wasPlayingWhenScrubbingBegan) {
    this.video.play();
  }
  this.scrubbing = false;
  // stop capturing all mouse events
  window.removeEventListener('mousemove', this, true);
  window.removeEventListener('mouseup', this, true);
};

// called in response to the "click" event on the loaded bar
VideoPlayer.prototype.setVideoTimeFromClickInProgressBar = function (event) {
  // update the progress bar bounds
  this.updateProgressBarBounds();
  // get the time based on the x position in the progress bar
  var x = event.pageX - this.progressBarBounds.left - 10;
  var max_x = this.progressBarBounds.width - 20;
  // clip x to be within the bounds of the progress bar
  x = Math.max(Math.min(x, max_x), 0);
  // update current time based on x ratio in progress bar bounds
  this.video.currentTime = (x / max_x) * this.duration;
};

/* ==================== Enhanced Playback ==================== */

// called upon a "click" on either the video or the dimmer
VideoPlayer.prototype.setEnhancedPlayback = function (isEnhanced) {
  document.body.className = isEnhanced ? 'enhanced-playback' : '';
};

/* ==================== Main initialization routine ==================== */

// resizes the window to the given metrics taking into account chrome
window.setInnerSize = function (width, height) {
  var chrome_width = width + window.outerWidth - window.innerWidth;
  var chrome_height = height + window.outerHeight - window.innerHeight;
  window.resizeTo(chrome_width, chrome_height);
};

// called in response to the "init" event on the window
function init () {
  // size the screen to match the backdrop size
  window.setInnerSize(1170, 780);
  // get a pointer to the container element in the DOM
  var container = document.querySelector('.video-player');
  // create our video controller
  var player = new VideoPlayer(container);
};

// wire up the callback to init() for when we're done loading the document
window.addEventListener('load', init, false);
