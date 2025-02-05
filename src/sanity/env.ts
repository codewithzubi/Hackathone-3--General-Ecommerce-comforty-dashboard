export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-05'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)


export const token = assertValue(
  "sksc99FyStsJxdCfvLKKcROduxgWmPc6gCzIzEejur2AMEHOYvcEBLW7RYVFyAZmcrtAfGWC6spYIoEN2fZltIDD1jpxdWPO44IJm7ifOki3TSaDSm16rW2gIq3Wx0lTWI58CGU8mspXqvN2P6ijzwikYpPAqjANeDb7rRPSkPEsqKnWoqS8",
  'Missing environment variable: NEXT_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
