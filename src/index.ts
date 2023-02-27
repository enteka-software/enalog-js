export type Event = {
  project: string;
  name: string;
  description: string;
  push: boolean;
  icon?: string;
  tags?: string[];
  meta?: object;
};

export async function pushEvent(apiToken: String, data: Event) {

  try {

    if (!apiToken) {
      throw new Error('No api token provided')
    }

    if (!data) {
      throw new Error('No data provided')
    }

    const res = await fetch("http://127.0.0.1:3000/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${apiToken}`,
      },
      body: JSON.stringify(data),

    })

    if (res.status === 200) {
      return res
    }

    if (res.status !== 200) {
      return Promise.reject(res)
    }

  } catch (error) {
    return new Error("error:" + error);
  }

}
