export type Event = {
  project: string;
  name: string;
  description?: string;
  push: boolean;
  icon?: string;
  tags?: string[];
  meta?: object;
};

export async function pushEvent(apiToken: String, data: Event): Promise<Object> {

  try {

    const res = await fetch("https://api.enalog.app/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
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
