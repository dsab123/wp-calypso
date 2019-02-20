/**
 * External dependencies
 */
import { forEach } from 'lodash';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Internal dependencies
 */
import createSwiper from './create-swiper';
import { swiperApplyAria, swiperInit, swiperResize } from './swiper-callbacks';

typeof window !== 'undefined' &&
	window.addEventListener( 'load', function() {
		const slideshowBlocks = document.getElementsByClassName( 'wp-block-jetpack-slideshow' );
		forEach( slideshowBlocks, slideshowBlock => {
			const { autoplay, delay, effect } = slideshowBlock.dataset;
			const slideshowContainer = slideshowBlock.getElementsByClassName( 'swiper-container' )[ 0 ];
			let pendingRequestAnimationFrame = null;
			createSwiper(
				slideshowContainer,
				{
					autoplay: autoplay ? { delay: delay * 1000 } : false,
					effect,
					init: true,
					initialSlide: 0,
					loop: true,
					keyboard: {
						enabled: true,
						onlyInViewport: true,
					},
				},
				{
					init: swiperInit,
					imagesReady: swiperResize,
					transitionEnd: swiperApplyAria,
				}
			).then( swiper => {
				new ResizeObserver( () => {
					if ( pendingRequestAnimationFrame ) {
						cancelAnimationFrame( pendingRequestAnimationFrame );
						pendingRequestAnimationFrame = null;
					}
					pendingRequestAnimationFrame = requestAnimationFrame( () => {
						swiperResize( swiper );
						swiper.update();
					} );
				} ).observe( swiper.el );
			} );
		} );
	} );
