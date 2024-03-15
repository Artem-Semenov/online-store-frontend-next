let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

type Props = {
	url: string;
	name: string;
	onSuccessfulLogin: () => void;
};
export const useSignInGoogleWindow = ({
	name,
	url,
	onSuccessfulLogin,
}: Props) => {
	const receiveMessage = (event: MessageEvent<any>) => {
		if (event.origin !== process.env.NEXT_PUBLIC_CLIENT_URL) {
			return;
		}
		const { data } = event;
		if (data.source === "google-login-popup" && data.login) {
			onSuccessfulLogin();
		}
	};

	const strWindowFeatures =
		"toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

	if (windowObjectReference === null || windowObjectReference.closed) {
		windowObjectReference = window.open(url, name, strWindowFeatures);
	} else if (previousUrl !== url) {
		windowObjectReference = window.open(url, name, strWindowFeatures);
		windowObjectReference && windowObjectReference.focus();
	} else {
		windowObjectReference.focus();
	}

	window.onmessage = receiveMessage;
	previousUrl = url;
};
