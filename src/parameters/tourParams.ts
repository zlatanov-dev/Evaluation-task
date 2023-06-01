export const tourParams = {
    apiKey: 'IgSjubq3amMafYhP6EL18KAexCqTnZWQ',
    tourId: '4dFt1rmYFqRI7AxtN8q1SD',
  };
  

export function endpoint(id?: string) {
  const tourId = tourParams.tourId;
  const apiKey = tourParams.apiKey;

    const endpoints = {
      tour: `/v1/tours/viewer/${tourId}?key=${apiKey}`,
      hotspot: `/v1/tours/viewer/${tourId}/hotspots/${id}?key=${apiKey}`,
      tourView: `/v1/tours/viewer/${tourId}`,
      hotspotView: `/v1/tours/viewer/${tourId}/hotspots/${id}`,
      floorView: `/${tourId}/${id}`
    }

    return endpoints;
    }