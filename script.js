const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('.volume');
const speedSlider = player.querySelector('.playbackSpeed');
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update the play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Handle volume and speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar as video plays
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub through the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleRangeUpdate);
speedSlider.addEventListener('input', handleRangeUpdate);
skipButtons.forEach(btn => btn.addEventListener('click', skip));

let isMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
