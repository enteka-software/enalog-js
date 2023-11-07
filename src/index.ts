import { initAutotrack as autotrack } from "./autotrack";

export type Event = {
    project: string;
    name: string;
    description?: string;
    push: boolean;
    icon?: string;
    tags?: string[];
    meta?: object;
    channels?: object;
    user_id?: string;
    user_attributes?: object;
};

export async function pushEvent(
    apiToken: String,
    data: Event
): Promise<Object> {
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
    } catch (error) {
        return {
            status: error.status,
            message: "Error saving to Enalog",
        };
    }
}

export class EnaLog {
    apiToken: string;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
    }

    initAutotrack(project: string): void {
        autotrack(this.apiToken, project);
    }

    async pushEvent(data: Event): Promise<Object> {
        try {
            const res = await fetch("https://api.enalog.app/v1/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiToken}`,
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
        } catch (error) {
            return {
                status: error.status,
                message: "Error saving to Enalog",
            };
        }
    }

    async checkFeature(feature: String, userId: String): Promise<Boolean> {
        try {
            const res = await fetch("https://api.enalog.app/v1/feature-flags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiToken}`,
                },
                body: JSON.stringify({ name: feature, user_id: userId }),
            });

            if (res.status !== 200) {
                console.log("Error getting evaluation from API. Returning false");
                return false;
            }

            const json = await res.json();

            if (json.flag_type == "Boolean") {
                if (json.variant == "a-variant") {
                    return true;
                } else {
                    return false;
                }
            }

            return false;
        } catch (error) {
            console.log(error);
            console.log("Error getting evaluation from API. Returning false");
            return false;
        }
    }
}
