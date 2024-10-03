<script>
	let { data } = $props();

	function autoPopulateFormFields() {
		var forms = document.forms;

		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];
			var elements = form.elements;

			for (var j = 0; j < elements.length; j++) {
				var element = elements[j];
				processFormElement(element);
			}
		}
	}

	function processFormElement(element) {
		var tagName = element.tagName.toLowerCase();

		if (tagName === 'input') {
			processInputElement(element);
		} else if (tagName === 'select') {
			processSelectElement(element);
		} else if (tagName === 'textarea') {
			processTextareaElement(element);
		}
	}

	function processInputElement(element) {
		var type = element.type.toLowerCase();

		switch (type) {
			case 'text':
			case 'search':
			case 'password':
			case 'tel':
			case 'url':
			case 'email':
				generateStringValue(element);
				break;
			case 'number':
			case 'range':
				generateNumberValue(element);
				break;
			case 'date':
			case 'month':
			case 'week':
			case 'time':
			case 'datetime-local':
				generateDateValue(element);
				break;
			case 'checkbox':
				generateCheckboxValue(element);
				break;
			case 'radio':
				generateRadioValue(element);
				break;
			case 'color':
				generateColorValue(element);
				break;
			case 'file':
				// Cannot set file inputs via script for security reasons
				break;
			case 'hidden':
				// Ignore hidden inputs
				break;
			default:
				// Other types
				break;
		}
	}

	function processSelectElement(element) {
		var options = element.options;
		if (options.length > 0) {
			var randomIndex = Math.floor(Math.random() * options.length);
			element.selectedIndex = randomIndex;
		}
	}

	function processTextareaElement(element) {
		generateStringValue(element);
	}

	function generateStringValue(element) {
		var type = element.type.toLowerCase();
		var minlength = element.getAttribute('minlength');
		var maxlength = element.getAttribute('maxlength');
		var pattern = element.getAttribute('pattern');

		minlength = minlength ? parseInt(minlength) : 0;
		maxlength = maxlength ? parseInt(maxlength) : null;

		var value = '';

		switch (type) {
			case 'email':
				value = generateEmailValue(minlength, maxlength, pattern);
				break;
			case 'tel':
				value = generateTelValue(minlength, maxlength, pattern);
				break;
			case 'url':
				value = generateUrlValue(minlength, maxlength, pattern);
				break;
			case 'password':
				value = generatePasswordValue(minlength, maxlength, pattern);
				break;
			default:
				value = generateTextValue(minlength, maxlength, pattern);
				break;
		}

		element.value = value;
	}

	function generateTextValue(minlength, maxlength, pattern) {
		minlength = minlength || 5;
		maxlength = maxlength || minlength + 10;
		var length = Math.max(minlength, Math.min(maxlength || minlength + 10, 10));
		var value = '';

		var maxAttempts = 10;
		var attempts = 0;
		var regex = pattern ? new RegExp(pattern) : null;

		do {
			value = generateRandomString(length);
			attempts++;
		} while (regex && !regex.test(value) && attempts < maxAttempts);

		return value;
	}

	function generateEmailValue(minlength, maxlength, pattern) {
		var email = 'user@example.com';
		var localPart = 'user';
		var domain = 'example.com';

		var emailLength = email.length;
		var desiredLength = Math.max(
			minlength || emailLength,
			Math.min(maxlength || emailLength, emailLength)
		);

		var extraLength = desiredLength - emailLength;
		if (extraLength > 0) {
			localPart += generateRandomString(extraLength);
			email = localPart + '@' + domain;
		} else if (extraLength < 0) {
			localPart = localPart.substring(0, localPart.length + extraLength);
			email = localPart + '@' + domain;
		}

		return email;
	}

	function generateTelValue(minlength, maxlength, pattern) {
		var phoneNumber = '1234567890';

		minlength = minlength || 10;
		maxlength = maxlength || 10;

		var length = Math.max(minlength, Math.min(maxlength, 10));
		phoneNumber = phoneNumber.substring(0, length);

		return phoneNumber;
	}

	function generateUrlValue(minlength, maxlength, pattern) {
		var url = 'https://example.com';

		if (minlength || maxlength) {
			var extraLength = (maxlength || url.length) - url.length;
			if (extraLength > 0) {
				url += '/' + generateRandomString(extraLength);
			} else if (extraLength < 0) {
				url = url.substring(0, url.length + extraLength);
			}
		}
		return url;
	}

	function generatePasswordValue(minlength, maxlength, pattern) {
		return generateTextValue(minlength, maxlength, pattern);
	}

	function generateRandomString(length) {
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var result = '';
		for (var i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	}

	function generateNumberValue(element) {
		var min = element.getAttribute('min');
		var max = element.getAttribute('max');
		var step = element.getAttribute('step');

		min = min !== null ? parseFloat(min) : 0;
		max = max !== null ? parseFloat(max) : min + 100;
		step = step !== null ? parseFloat(step) : 1;

		var value = min + Math.random() * (max - min);
		value = Math.round(value / step) * step;

		element.value = value;
	}

	function generateDateValue(element) {
		var min = element.getAttribute('min');
		var max = element.getAttribute('max');

		var minDate = min ? new Date(min) : new Date(2000, 0, 1);
		var maxDate = max ? new Date(max) : new Date(2030, 11, 31);

		var timeDiff = maxDate.getTime() - minDate.getTime();
		var randomTime = minDate.getTime() + Math.random() * timeDiff;
		var randomDate = new Date(randomTime);

		var value = '';

		switch (element.type) {
			case 'date':
				value = randomDate.toISOString().split('T')[0];
				break;
			case 'datetime-local':
				value = randomDate.toISOString().slice(0, 19);
				break;
			case 'month':
				value = randomDate.toISOString().slice(0, 7);
				break;
			case 'week':
				var weekNumber = getWeekNumber(randomDate);
				value = randomDate.getFullYear() + '-W' + ('0' + weekNumber).slice(-2);
				break;
			case 'time':
				value = randomDate.toTimeString().slice(0, 5);
				break;
			default:
				value = randomDate.toISOString().split('T')[0];
				break;
		}

		element.value = value;
	}

	function getWeekNumber(d) {
		d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
		var dayNum = d.getUTCDay() || 7;
		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
		var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	}

	function generateColorValue(element) {
		var color =
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0');
		element.value = color;
	}

	function generateCheckboxValue(element) {
		element.checked = true;
	}

	function generateRadioValue(element) {
		var name = element.name;
		if (!name) return;

		var radios = document.getElementsByName(name);
		for (var i = 0; i < radios.length; i++) {
			radios[i].checked = false;
		}
		var randomIndex = Math.floor(Math.random() * radios.length);
		radios[randomIndex].checked = true;
	}

	function clearFormFields() {
		var forms = document.forms;

		for (var i = 0; i < forms.length; i++) {
			forms[i].reset();
		}
	}

	let bordersVisible = $state(false);

	function toggleElementBorders() {
		bordersVisible = !bordersVisible;
		let allElements = document.querySelectorAll('*');
		let devBar = document.getElementById('development-bar');

		allElements.forEach(function (element) {
			// Skip the 'development-bar' element and its descendants
			if (devBar && (element === devBar || devBar.contains(element))) {
				return;
			}

			if (bordersVisible) {
				element.style.outline = '1px solid rgba(255, 0, 0, 0.5)';
			} else {
				element.style.outline = '';
			}
		});
	}
</script>

<div
	id="development-bar"
	class="fixed bottom-0 z-40 w-full border-t border-red-300 bg-red-50 px-4 py-2 text-xs font-medium text-red-800"
>
	<div class="flex justify-between">
		<div>
			User:
			{#if data?.user}
				{data?.user.username}
			{:else}
				Unknown
			{/if}
		</div>
		<div class="flex items-center space-x-4 divide-x-2 divide-red-300">
			<div class="space-x-2">
				<button
					class="rounded bg-red-300 px-2 py-0.5 text-xs text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
					onclick={toggleElementBorders}
				>
					{bordersVisible ? 'Hide' : 'Show'} element borders
				</button>

				<button
					class="rounded bg-red-300 px-2 py-0.5 text-xs text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
					onclick={autoPopulateFormFields}
				>
					Populate form(s)
				</button>
				<button
					class="rounded bg-red-300 px-2 py-0.5 text-xs text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
					onclick={clearFormFields}
				>
					Clear form fields
				</button>
			</div>
			<div class="pl-4">
				<p class="xs:block sm:hidden">Screen size: xs</p>
				<p class="hidden sm:block md:hidden">Screen size: sm</p>
				<p class="hidden md:block lg:hidden">Screen size: md</p>
				<p class="hidden lg:block xl:hidden">Screen size: lg</p>
				<p class="hidden xl:block">Screen size: xl</p>
			</div>
		</div>
	</div>
	{#if data?.user}
		<div class="mt-1 space-x-2">
			{#each Object.keys(data.user) as key}
				<span
					class="inline-flex items-center rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/10"
					>{key}={data.user[key]}</span
				>
			{/each}
		</div>
	{/if}
</div>

<!-- <div
	class="fixed bottom-0 z-40 w-full border-t border-red-300 bg-red-50 px-4 py-2 text-xs font-medium text-red-800"
>
	<div class="flex justify-between">
		<div>
			<div>
				User:
				{#if userData.sessionid}
					{userData.username}
				{:else}
					Unknown
				{/if}
			</div>
			{#if userData}
				<div class="mt-1 space-x-2">
					{#each Object.keys(userData) as key}
						<span
							class="inline-flex items-center rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/10"
							>{key}={userData[key]}</span
						>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex">
			<button
				class="rounded-md bg-red-200 px-2 py-0.5 hover:bg-red-300"
				onclick={autoPopulateFormFields}>Populate form(s)</button
			>

			<p class="xs:block sm:hidden">Screen size: xs</p>
			<p class="hidden sm:block md:hidden">Screen size: sm</p>
			<p class="hidden md:block lg:hidden">Screen size: md</p>
			<p class="hidden lg:block xl:hidden">Screen size: lg</p>
			<p class="hidden xl:block">Screen size: xl</p>
		</div>
	</div>
</div> -->
