/**
 * External Dependencies
 */
import { DOWN } from '@wordpress/keycodes';
import { Circle, Dropdown, IconButton, Path, Rect, SVG, Toolbar } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { __, _x } from 'gutenberg/extensions/presets/jetpack/utils/i18n';

const availableFilters = [
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path fill="none" d="M0 0h24v24H0V0z" />
				<Path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z" />
			</SVG>
		),
		title: _x( 'Original', 'image style' ),
		value: undefined,
	},
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path d="M0 0h24v24H0z" fill="none" />
				<Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16l-7-8v8H5l7-8V5h7v14z" />
			</SVG>
		),
		title: _x( 'Black and white', 'image style' ),
		value: 'black-and-white',
	},
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path fill="none" d="M0 0h24v24H0V0z" />
				<Path d="M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24l2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z" />
			</SVG>
		),
		title: _x( 'Sepia', 'image style' ),
		value: 'sepia',
	},
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path fill="none" d="M0 0h24v24H0V0z" />
				<Path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
				<Circle cx="12" cy="12" r="2" />
			</SVG>
		),
		title: '1977',
		value: '1977',
	},
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path fill="none" d="M0 0h24v24H0V0z" />
				<Path d="M10 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07C10.9 17.77 12 14.95 12 12s-1.1-5.77-3.01-7.93C9.32 4.02 9.66 4 10 4m0-2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />
			</SVG>
		),
		title: _x( 'Clarendon', 'image style' ),
		value: 'clarendon',
	},
	{
		icon: (
			<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<Path fill="none" d="M0 0h24v24H0V0z" />
				<Path d="M18.7 12.4c-.28-.16-.57-.29-.86-.4.29-.11.58-.24.86-.4 1.92-1.11 2.99-3.12 3-5.19-.91-.52-1.95-.8-3.01-.8-1.02 0-2.05.26-2.99.8-.28.16-.54.35-.78.54.05-.31.08-.63.08-.95 0-2.22-1.21-4.15-3-5.19C10.21 1.85 9 3.78 9 6c0 .32.03.64.08.95-.24-.2-.5-.39-.78-.55-.94-.54-1.97-.8-2.99-.8-1.05 0-2.1.28-3.01.8 0 2.07 1.07 4.08 3 5.19.28.16.57.29.86.4-.29.11-.58.24-.86.4-1.92 1.11-2.99 3.12-3 5.19.91.52 1.95.8 3.01.8 1.02 0 2.05-.26 2.99-.8.28-.16.54-.35.78-.54-.05.32-.08.64-.08.96 0 2.22 1.21 4.15 3 5.19 1.79-1.04 3-2.97 3-5.19 0-.32-.03-.64-.08-.95.24.2.5.38.78.54.94.54 1.97.8 2.99.8 1.05 0 2.1-.28 3.01-.8-.01-2.07-1.08-4.08-3-5.19zm-2.54-3.88c.21-.17.38-.29.54-.37.61-.35 1.3-.54 2-.54.27 0 .53.03.79.08-.31.91-.94 1.69-1.78 2.18-.17.1-.36.18-.58.27l-1.38.52c-.17-.46-.41-.87-.72-1.24l1.13-.9zM12 3.37c.63.72 1 1.66 1 2.63 0 .19-.02.41-.05.63l-.23 1.44C12.48 8.03 12.24 8 12 8s-.48.03-.71.07l-.23-1.44C11.02 6.41 11 6.19 11 6c0-.98.37-1.91 1-2.63zM4.51 7.68c.26-.06.53-.08.8-.08.69 0 1.38.18 1.99.54.15.09.32.2.49.35l1.15.96c-.3.36-.53.76-.7 1.2l-1.38-.52c-.21-.09-.4-.18-.56-.27-.87-.5-1.49-1.27-1.79-2.18zm3.33 7.79c-.21.17-.38.29-.54.37-.61.35-1.3.54-2 .54-.27 0-.53-.03-.79-.08.31-.91.94-1.69 1.78-2.18.17-.1.36-.18.58-.27l1.38-.52c.16.46.41.88.72 1.24l-1.13.9zM12 20.63c-.63-.72-1-1.66-1-2.63 0-.2.02-.41.06-.65l.22-1.42c.23.04.47.07.72.07.24 0 .48-.03.71-.07l.23 1.44c.04.22.06.44.06.63 0 .98-.37 1.91-1 2.63zm6.69-4.24c-.69 0-1.38-.18-1.99-.54-.18-.1-.34-.22-.49-.34l-1.15-.96c.3-.36.54-.76.7-1.21l1.38.52c.22.08.41.17.57.26.85.49 1.47 1.27 1.78 2.18-.27.07-.54.09-.8.09z" />
			</SVG>
		),
		title: _x( 'Gingham', 'image style' ),
		value: 'gingham',
	},
];

export default function FilterToolbar( { value, onChange } ) {
	return (
		<Dropdown
			position="bottom right"
			className="editor-block-switcher"
			contentClassName="editor-block-switcher__popover"
			renderToggle={ ( { onToggle, isOpen } ) => {
				const openOnArrowDown = event => {
					if ( ! isOpen && event.keyCode === DOWN ) {
						event.preventDefault();
						event.stopPropagation();
						onToggle();
					}
				};
				const label = __( 'Pick an image filter' );

				return (
					<Toolbar>
						<IconButton
							onClick={ onToggle }
							aria-haspopup="true"
							aria-expanded={ isOpen }
							label={ label }
							tooltip={ label }
							onKeyDown={ openOnArrowDown }
							icon={
								<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<Path fill="none" d="M0 0h24v24H0V0z" />
									<Path d="M19 10v9H4.98V5h9V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-2.94-2.06L17 10l.94-2.06L20 7l-2.06-.94L17 4l-.94 2.06L14 7zM12 8l-1.25 2.75L8 12l2.75 1.25L12 16l1.25-2.75L16 12l-2.75-1.25z" />
								</SVG>
							}
						/>
					</Toolbar>
				);
			} }
			renderContent={ ( { onClose } ) => {
				const applyOrUnset = nextValue => () => {
					onChange( value === nextValue ? undefined : nextValue );
					onClose();
				};
				return (
					<Toolbar
						icon={
							<SVG width="24" height="24" viewBox="0 0 24 24">
								<Rect fill="#f00" x="0" y="0" width="24" height="24" />
							</SVG>
						}
						label={ __( 'Change Text Alignment' ) }
						controls={ availableFilters.map( control => {
							const { value: filterValue } = control;
							const isActive = value === filterValue;

							return {
								...control,
								isActive,
								onClick: applyOrUnset( filterValue ),
							};
						} ) }
					/>
				);
			} }
		/>
	);
}
