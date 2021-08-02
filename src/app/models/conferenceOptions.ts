export interface ConferenceDefaults {
  alias: string,
  pinCode: string,
  dolbyVoice: boolean,
  liveRecording: boolean,
  rtcpMode: string,
  videoCodec: string
}

export interface ConferenceOptions {
  id: string,
  options: ConferenceDefaults
}
