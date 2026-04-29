import { apiMain } from '~/lib/api';
import type { CreateZoneResponse, GetZonesResponse, UpdateZoneResponse } from '~/types/zone';
import type { ZoneFormValues } from '~/validations/zone.validation';

const ZONE_ENDPOINT = '/zones';

const zoneServices = {
  getAllZones: async () => {
    const response = await apiMain.get<GetZonesResponse>(ZONE_ENDPOINT);
    return response.data;
  },
  createZone: async (data: ZoneFormValues) => {
    const response = await apiMain.post<CreateZoneResponse>(ZONE_ENDPOINT, data);
    return response;
  },
  updateZone: async (data: ZoneFormValues) => {
    const response = await apiMain.put<UpdateZoneResponse>(`${ZONE_ENDPOINT}/${data.code}`, data);
    return response;
  },
  deleteZone: async (code: string) => {
    const response = await apiMain.delete<void>(`${ZONE_ENDPOINT}/${code}`);
    return response;
  },
};

export default zoneServices;
