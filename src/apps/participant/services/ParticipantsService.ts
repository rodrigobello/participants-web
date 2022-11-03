import ParticipantDTO from "@participant/dto";

export default class ParticipantService {
  async loadFromAPI(endpoint: string): Promise<ParticipantDTO[]> {
    return fetch(endpoint).then((resp) => resp.json());
  }
}
