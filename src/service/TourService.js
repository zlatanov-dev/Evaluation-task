import { get } from "./api.js";
import { tourParams } from "../parameters/tourParams";

export async function getTourConfigurations() {
  const url = `/v1/tours/viewer/${tourParams.tourId}?key=${tourParams.apiKey}`;
  try {
    const response = await get(url);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getHotspot(hotspotId) {
  const url =
    `/v1/tours/viewer/${tourParams.tourId}/hotspots/${hotspotId}` +
    `?key=${tourParams.apiKey}`;

  try {
    const response = await get(url);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}
