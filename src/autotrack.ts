type EnaLogEvent = {
    project: string;
    name: string;
    description?: string;
    push: boolean;
    icon?: string;
    tags?: string[];
    meta?: object;
};

const listenToAllButtons = (apiToken: string, project: string) => {
    const btns = document.getElementsByTagName("button");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", (e) => {
            const event = e?.target as HTMLElement;

            pushEvent(apiToken, {
                project: project,
                name: "Button Click",
                description: `${event.innerText} button clicked`,
                push: false,
                icon: "⏺️",
                meta: {
                    currentUrl: `${window.location.href}`,
                    outerHtml: `${event.parentElement?.outerHTML}`,
                },
            });
        });
    }
};

const listenToAllLinks = (apiToken: string, project: string) => {
    const links = document.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", (e) => {
            const event = e?.target as HTMLAnchorElement;

            pushEvent(apiToken, {
                project: project,
                name: "Link Click",
                description: `${event.href} link clicked`,
                push: false,
                icon: "🔗",
                meta: {
                    currentUrl: `${window.location.href}`,
                    linkUrl: `${event.href}`,
                    linkText: `${event.innerText}`,
                    outerHtml: `${event.parentElement?.outerHTML}`,
                },
            });
        });
    }
};

const listenToAllForms = (apiToken: string, project: string) => {
    const forms = document.getElementsByTagName("form");


    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", (e) => {
            const event = e?.target as HTMLFormElement;

            pushEvent(apiToken, {
                project: project,
                name: "Link Click",
                description: `${event.id} form submitted`,
                push: false,
                meta: {
                    currentUrl: `${window.location.href}`,
                    formAction: `${event.action}`,
                    formMethod: `${event.method}`,
                },
            });
        });
    }
};

const pageViewed = (apiToken: string, project: string) => {
    pushEvent(apiToken!, {
        project: project,
        name: "Page View",
        description: `${document.title} page viewed`,
        push: false,
        icon: "🔍",
        meta: {
            currentUrl: `${window.location.href}`,
        },
    });
};

const pushEvent = async (apiToken: String, data: EnaLogEvent) => {
    try {
        const res = await fetch("https://api.enalog.app/v1/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            return {
                status: res.status,
                message: "Error saving to Enalog",
            };
        }
        return {
            status: 200,
            message: "Event succesfully sent to EnaLog",
        };
    } catch (error: any) {
        return {
            status: error.status,
            message: "Error saving to Enalog",
        };
    }
};


export const initAutotrack = (apiToken: string, project: string) => {
    window.addEventListener("load", () => {
        pageViewed(apiToken, project);
        listenToAllButtons(apiToken, project);
        listenToAllLinks(apiToken, project);
        //   listenToAllForms();
    });
};