import Plugin from 'src/plugin-system/plugin.class';

export default class IdentifyPlugin extends Plugin {
    init() {
        const emailInputs = document.querySelectorAll('input#personalMail, input#form-email, input#loginMail');

        if (emailInputs.length === 0) {
            return;
        }

        emailInputs.forEach(el => {
            el.addEventListener('blur', () => {
                window.ddg.identify({ email: el.value });
            });
        });
    }
}
