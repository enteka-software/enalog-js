export type Event = {
  project: string;
  name: string;
  description: string;
  push: boolean;
  icon?: string;
  tags?: string[];
  meta?: object;
};

export async function pushEvent(apiToken: String, data: Event): Promise<Object> {

  try {

    if (!apiToken) {

      return new Error("No api key provided.")
    }

    if (!data) {
      return new Error('No data provided')
    }

    const res = await fetch("http://127.0.0.1:3000/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${apiToken}`,
      },
      body: JSON.stringify(data),

    })

    if (res.status !== 200) {
      return {
        status: res.status,
        message: "Error saving to Enalog",
      }
    }
    return {
      status: 200,
      message: "Event succesfully sent to EnaLog"
    }

  } catch (error) {
    return {
      status: error.status,
      message: "Error saving to Enalog"
    }
  }

}
