/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { localize } from 'i18n-calypso';
import moment from 'moment-timezone';

/**
 * Internal dependencies
 */
import Card from 'components/card/compact';

const DATE_FORMAT = 'MMMM D h:mma z';

const ClosureNotice = ( { closesAt, displayAt, holidayName, reopensAt, translate } ) => {
	const currentDate = moment();
	const guessedTimezone = moment.tz.guess();

	if ( ! currentDate.isBetween( moment( displayAt ), moment( reopensAt ) ) ) {
		return null;
	}

	let message;

	if ( currentDate.isBefore( moment.utc( closesAt ) ) ) {
		message = translate(
			'{{strong}}Note:{{/strong}} Support sessions will be closed for %(holidayName)s from %(closesAt)s until %(reopensAt)s. ' +
				'If you need to get in touch with us, you’ll be able to {{link}}submit a support request{{/link}} and we’ll ' +
				'get to it as fast as we can. Thank you!',
			{
				args: {
					closesAt: moment.tz( closesAt, guessedTimezone ).format( DATE_FORMAT ),
					reopensAt: moment.tz( reopensAt, guessedTimezone ).format( DATE_FORMAT ),
					holidayName,
				},
				components: {
					link: <a href="/help/contact" />,
					strong: <strong />,
				},
			}
		);
	} else {
		message = translate(
			'{{strong}}Note:{{/strong}} Support sessions are closed for %(holidayName)s and will reopen %(reopensAt)s. ' +
				'If you need to get in touch with us, you’ll be able to {{link}}submit a support request{{/link}} and we’ll ' +
				'get back to you as fast as we can. Thank you!',
			{
				args: {
					reopensAt: moment.tz( reopensAt, guessedTimezone ).format( DATE_FORMAT ),
					holidayName,
				},
				components: {
					link: <a href="/help/contact" />,
					strong: <strong />,
				},
			}
		);
	}
	return <Card>{ message }</Card>;
};

export default localize( ClosureNotice );
