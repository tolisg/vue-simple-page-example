import iziToast from 'izitoast';

iziToast.settings({
  id: null,
  class: 'custom-izi',
  title: '',
  titleColor: '',
  titleSize: '',
  titleLineHeight: '',
  message: '',
  messageColor: '',
  messageSize: '',
  messageLineHeight: '',
  backgroundColor: '',
  theme: 'light', // dark
  color: 'blue', // blue, red, green, yellow
  icon: '',
  iconText: '',
  iconColor: '',
  iconUrl: null,
  image: '',
  imageWidth: 50,
  maxWidth: null,
  zindex: null,
  layout: 1,
  balloon: false,
  close: true,
  closeOnEscape: false,
  closeOnClick: false,
  displayMode: 0, // once, replace
  position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
  target: '',
  targetFirst: true,
  timeout: 5000,
  rtl: false,
  animateInside: false,
  drag: true,
  pauseOnHover: true,
  resetOnHover: false,
  progressBar: true,
  progressBarColor: '',
  progressBarEasing: 'linear',
  overlay: false,
  overlayClose: false,
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  transitionIn: 'fadeInUp',
  transitionOut: 'fadeOut',
  transitionInMobile: 'fadeInUp',
  transitionOutMobile: 'fadeOutDown',
  buttons: {},
  inputs: {},
  onOpening() {},
  onOpened() {},
  onClosing() {},
  onClosed() {}
});

function messages(options) {
  const defaults = {
    position: 'topRight',
    class: 'custom-izi'
  };
  const opt = { ...defaults, ...options };
  const color = {
    error: 'red', warning: 'yellow', success: 'green', info: 'blue'
  };
  const icon = {
    error: 'mdi mdi-alert-outline', warning: 'mdi mdi-alert-circle-outline', success: 'mdi mdi-check-circle-outline', info: 'mdi mdi-information-outline'
  };
  // iziToast.destroy();
  iziToast.show({
    class: opt.class,
    message: opt.message,
    color: color[opt.type],
    icon: icon[opt.type],
    position: opt.position
  });
}

export default messages;
