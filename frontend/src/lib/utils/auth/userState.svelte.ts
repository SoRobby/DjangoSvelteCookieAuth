// export class UserState {
//     username = $state('');
//     email = $state('');
// }

export default function userState(initial: { username: string | null, email: string | null; }) {
	let username = $state(initial.username);
	let email = $state(initial.email);
	return {
		...initial,
		get username() {
			return username;
		},
		set username(value) {
			username = value;
		},
		get email() {
			return email;
		},
		set email(value) {
			email = value;
		}
	};
}
