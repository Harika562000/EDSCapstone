import { decorateButtons } from "../../scripts/aem.js";

export default function decorate() {
    const wrapper = document.querySelector('.register-button div');
    const buttonWrapper = document.querySelector('.register-button div div');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.textContent = "Register";
    a.href = "https://main--edscapstone--harika562000.hlx.live/registration"
    p.append(a);
    buttonWrapper.append(p);
    decorateButtons(wrapper);
}