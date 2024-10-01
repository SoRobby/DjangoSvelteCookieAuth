export const actions = {
	default: async ({ request, fetch, cookies }) => {
		console.log('[SETTINGS.NOTIFICATIONS] Updating notification settings');

		// Get the form data directly from the request
		const formData = await request.formData();

		function convertSwitchValueToBoolean(value: string | null) {
			if (value === 'on') {
				return true;
			}
			else {
				return false;
			}
		}

		// Emails
		let receiveMarketingEmails = convertSwitchValueToBoolean(formData.get('receive-marketing-emails') as string);
		let receiveWeeklyDigestEmails = convertSwitchValueToBoolean(formData.get('receive-weekly-digest-emails') as string);
		let receiveDiscoveryEmails = convertSwitchValueToBoolean(formData.get('receive-discovery-emails') as string);
		let receiveSiteUpdateEmails = convertSwitchValueToBoolean(formData.get('receive-site-update-emails') as string);

		// Notifications
		let receiveInboxMessageNotifications = convertSwitchValueToBoolean(formData.get('receive-inbox-message-notifications') as string);
		let receiveAnnouncementNotifications = convertSwitchValueToBoolean(formData.get('receive-announcement-notifications') as string);

		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		// Prepare the fetch request without manually setting 'Content-Type'
		const url = 'http://localhost:8000/api/v1/auth/edit/user-notifications';
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({
				receive_marketing_emails: receiveMarketingEmails,
                receive_weekly_digest_emails: receiveWeeklyDigestEmails,
                receive_discovery_emails: receiveDiscoveryEmails,
                receive_site_update_emails: receiveSiteUpdateEmails,
                receive_inbox_message_notifications: receiveInboxMessageNotifications,
                receive_announcement_notifications: receiveAnnouncementNotifications,
			})
		});

		// Check for any errors
		if (!response.ok) {
			console.error('[SETTINGS.NOTIFICATIONS] Request failed', response.statusText);
			throw new Error(`[SETTINGS.NOTIFICATIONS] Failed to upload file: ${response.statusText}`);
		}

		// Handle the response if needed
		// Get response status
		const status = response.status;
		const data = await response.json();

		console.log('[SETTINGS.NOTIFICATIONS] Response status:', status);
		console.log('[SETTINGS.NOTIFICATIONS] JSON data:', data);

		return data
	}
};
