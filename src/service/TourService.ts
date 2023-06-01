import { get } from "./api";
import { endpoint } from "../parameters/tourParams";

export async function getTourConfigurations() {
  const url = endpoint().tour;
  try {
    const response = await get(url);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      // Type guard to arrow down the type to Error
      console.log(err.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
}

export async function getHotspot(hotspotId: string) {
  const url = endpoint(hotspotId).hotspot;;

  try {
    const response = await get(url);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
}
