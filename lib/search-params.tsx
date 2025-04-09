import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'
 
// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const dateSearchParams = {
  start_date: parseAsString.withDefault(""),
  end_date: parseAsString.withDefault(""),
}
 
export const loadSearchParams = createLoader(dateSearchParams)