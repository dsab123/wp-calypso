/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import React from 'react';
import { shallow } from 'enzyme';
import nock from 'nock';

/**
 * Internal dependencies
 */
import { AuthCodeButton } from '../auth-code-button';
import Notice from 'components/notice';

describe( 'AuthCodeButton', () => {
	test( 'button renders in ready state', () => {
		const button = shallow( <AuthCodeButton username="usr" password="pwd" /> );
		const notice = button.find( Notice );
		expect( notice ).toHaveLength( 1 );
		expect( notice.props().status ).toBe( 'is-info' );
		expect( notice.contains( 'Send code via text message.' ) ).toBe( true );
	} );

	test( 'button transitions into requesting and complete states on request', async () => {
		nock( 'http://localhost' )
			.post( '/sms', { username: 'usr', password: 'pwd' } )
			.reply( 400, { error: 'needs_2fa' } );

		const button = shallow( <AuthCodeButton username="usr" password="pwd" /> );
		const request = button.instance().requestSMSCode();

		// synchronous check immediately after firing the request should see status as 'requesting'
		expect( button.state( 'status' ) ).toEqual( 'requesting' );

		// wait for the request to finish and check that the status is 'complete'
		await request;
		expect( button.state( 'status' ) ).toBe( 'complete' );
		expect( button.state( 'errorLevel' ) ).toBe( false );
		expect( button.state( 'errorMessage' ) ).toBe( false );
	} );

	test( 'button transitions into failed state when server responds without needs_2fa', async () => {
		nock( 'http://localhost' )
			.post( '/sms', { username: 'usr', password: 'pwd' } )
			.reply( 400, { error: 'other', error_description: 'Failed' } );

		const button = shallow( <AuthCodeButton username="usr" password="pwd" /> );
		const request = button.instance().requestSMSCode();

		// wait for the request to finish and then check the error status
		await request;
		expect( button.state( 'status' ) ).toBe( 'complete' );
		expect( button.state( 'errorLevel' ) ).toBe( 'is-error' );
		expect( button.state( 'errorMessage' ) ).toBe( 'Failed' );
	} );

	test( 'button transitions into failed state when server api request fails', async () => {
		nock( 'http://localhost' )
			.post( '/sms', { username: 'usr', password: 'pwd' } )
			.replyWithError( 'Failed' );

		const button = shallow( <AuthCodeButton username="usr" password="pwd" /> );
		const request = button.instance().requestSMSCode();

		// wait for the request to finish and then check the error status
		await request;
		expect( button.state( 'status' ) ).toBe( 'complete' );
		expect( button.state( 'errorLevel' ) ).toBe( 'is-error' );
		expect( button.state( 'errorMessage' ) ).toBe( 'Failed' );
	} );
} );
