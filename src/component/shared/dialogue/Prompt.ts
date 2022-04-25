import { DomNode, el, msg, Popup } from "skydapp-browser";

export default class Prompt extends Popup {

    public content: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: (value: string) => void,
        placeholder?: string,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.prompt",
                el(".title-container",
                    el("h6", title),
                    el("a", {
                        click: () => {
                            this.delete()
                        }
                    }, el("img", { src: "/images/shared/icn/close.svg", alt: "close" })),
                ),
                el("p", message),
                el(".input-container",
                    this.input = el("input", { placeholder: placeholder }),
                ),
                el(".button-container",
                    el("button.cancel", msg("CANCEL_BUTTON"), {
                        click: () => this.delete(),
                    }),
                    el("button", confirmTitle, {
                        click: () => {
                            confirm(this.input.domElement.value);
                            this.delete();
                        },
                    }),
                ),
            ),
        );
    }
}
