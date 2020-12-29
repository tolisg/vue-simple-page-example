/* eslint-disable func-names */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import Popper from 'popper.js';
import { debounce } from 'lodash';

function Pop(el, options) {
  this.el = el;
  this.trigger = this.el.querySelector('[popper-trigger]');
  this.pop = this.el.querySelector('[popper]');
  this.popper = null;
  this.options = {
    clickToClose: true,
    enableArrows: true,
    popover: false,
    ...options || {}
  };
  // If it's a bootstrap popover we have to take care of the popover class to be inline with the poppers placement
  if (this.options.popover === true) {
    let placement;
    this.options.onCreate = function (data) {
      data.instance.popper.classList.remove(`bs-popover-${ data.originalPlacement.split('-')[0]}`);
      data.instance.popper.classList.add(`bs-popover-${ data.placement.split('-')[0]}`);
    };
    this.options.onUpdate = function (data) {
      if (!placement) {
        placement = data.placement;
      }
      if (placement !== data.placement) {
        // console.log('placement changed');
        data.instance.popper.classList.remove(`bs-popover-${ placement.split('-')[0]}`);
        data.instance.popper.classList.add(`bs-popover-${ data.placement.split('-')[0]}`);
        placement = data.placement;
      }
    };
  }
  this.toggle = this._toggle.bind(this);
  this.click = this._click.bind(this);
  this.keydown = this._keydown.bind(this);
  this.resize = this._resize.bind(this);
  this.trigger.addEventListener('click', this.toggle);
}
Pop.prototype.destroy = function () {
  this.trigger.removeEventListener('click', this.toggle);
  this.close();
};
Pop.prototype._toggle = function (e) {
  e.preventDefault();
  if (this.el.classList.contains('show')) {
    this.close();
  } else {
    this.open();
  }
};
Pop.prototype.open = function () {
  this.el.dispatchEvent(new CustomEvent('popper-before-open'));
  this.el.classList.add('show');
  this.pop.classList.add('show');
  if (!this.popper) {
    this.popper = new Popper(this.trigger, this.pop, this.options);
  }
  document.addEventListener('click', this.click);
  document.addEventListener('keydown', this.keydown);
  window.addEventListener('resize', this.resize);
  this.el.dispatchEvent(new CustomEvent('popper-open'));
};
Pop.prototype.close = function () {
  this.el.dispatchEvent(new CustomEvent('popper-before-close'));
  this.el.classList.remove('show');
  this.pop.classList.remove('show');
  if (this.popper) {
    this.popper.destroy();
  }
  this.popper = null;
  document.removeEventListener('click', this.click);
  document.removeEventListener('keydown', this.keydown);
  window.removeEventListener('resize', this.resize);
  this.el.dispatchEvent(new CustomEvent('popper-close'));
};
Pop.prototype._click = function (e) {
  // console.log('Firing document click');
  if (this.options.clickToClose === true) {
    if (this.trigger.contains(e.target)) {
      // console.log('closing will be handled by toggle');
    } else {
      this.close();
    }
  } else if (this.trigger.contains(e.target) || this.pop.contains(e.target)) {
    // console.log('do nothing, closing will be handled by toggle');
  } else {
    this.close();
  }
};
Pop.prototype._keydown = function (e) {
  // Up (38) and down (40) arrow keys (works only in <li><a href=""></a></li> structures)
  // Note: IE does not focus on disabled elements
  // console.log('Firing document keydown');
  if (this.options.enableArrows && (e.keyCode === 40 || e.keyCode === 38)) {
    e.preventDefault();
    if (document.activeElement === this.trigger || document.activeElement === this.pop) {
      const a = this.pop.querySelector('a.dropdown-item');
      if (a) {
        a.focus();
      }
      return;
    }
    if (this.pop.contains(document.activeElement) && document.activeElement.tagName.toLowerCase() === 'a' && document.activeElement.classList.contains('dropdown-item')) {
      let isList = false;
      // Item might be an a or an li element depending on the dropdown structure
      let item = document.activeElement;
      if (document.activeElement.parentElement.tagName.toLowerCase() === 'li') {
        item = document.activeElement.parentElement;
        isList = true;
      }
      let nextOrPrev = 'nextElementSibling';
      if (e.keyCode === 38) {
        nextOrPrev = 'previousElementSibling';
      }
      // Get the next or prev sibling element
      item = item[nextOrPrev];
      // As long as a sibling exists
      while (item) {
        if (item.offsetHeight === 0) {
          item = item[nextOrPrev];
          continue;
        }
        // If we've reached our match, bail
        // In case item is an li
        if (isList) {
          if (item.querySelector('a')) {
            break;
          }
          // In case item is an a
        } else {
          if (item && item.classList.contains('dropdown-divider') === false && item.classList.contains('dropdown-header') === false) {
            break;
          }
          if (item && item[nextOrPrev].classList.contains('dropdown-header')) {
            item = item[nextOrPrev];
          }
        }
        // Get the next or prev sibling
        item = item[nextOrPrev];
      }
      if (item) {
        if (isList) {
          item.querySelector('a').focus();
        } else {
          item.focus();
        }
      }
    }
  }
  if (e.keyCode === 27) {
    document.removeEventListener('keydown', this.keydown);
    this.close();
  }
};
Pop.prototype._resize = debounce(function () {
  // console.log('Firing window resize');
  if (this.pop.classList.contains('dropdown-menu-rwd') && !window.matchMedia('(max-width: 991px)').matches) {
    window.removeEventListener('resize', this.resize);
    this.close();
  }
}, 350);

const popperDirective = {
  inserted(el, binding) {
    el.Pop = new Pop(el, binding.value);
    // console.log(el.Pop.options);
  },
  unbind(el) {
    el.Pop.destroy();
    delete el.Pop;
  }
};

export default popperDirective;
