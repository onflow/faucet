const host = "https://metrics.staging.onflow.org"

export type MetricAccountCreated = (
  userUid: string,
  address: string
) => Promise<{
  errors?: string[]
  status?: string
}>

export const accountCreated: MetricAccountCreated = async (
  userUid,
  address
) => {
  try {
    return await fetch(`${host}/accounts`, {
      body: JSON.stringify({
        uid: userUid,
        address: address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json())
  } catch {
    return {errors: ["error publishing to metrics"]}
  }
}
