let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const receiveMessage = (event: MessageEvent<any>) => {
	if (event.origin !== process.env.NEXT_PUBLIC_CLIENT_URL) {
		return;
	}
	const { data } = event;
	if (data.source === "google-login-popup" && data.login) {
		window.location.reload();
	}
};

export const useSignInGoogleWindow = (url: string, name: string) => {
	window.removeEventListener("message", receiveMessage);

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

	window.addEventListener("message", event => receiveMessage(event), false);
	previousUrl = url;
};
