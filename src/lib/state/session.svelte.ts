export type Session = {
	name: string;
	email: string;
};

class SessionState {
	name = $state('');
	email = $state('');

	clearSession = () => {
		this.name = '';
		this.email = '';
	};
}

export const session = new SessionState();
