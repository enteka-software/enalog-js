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
  const res = await fetch("http://127.0.0.1:3000/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${apiToken}`,
    },
    body: JSON.stringify(data),
  });
  
  return res
}
