const userAgent = navigator.userAgent;

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}
function redirectMobile() {
  if (isMobileDevice() || window.innerWidth <= 768) {
    window.location.href = 'directories/mobile.html';
  }
}

