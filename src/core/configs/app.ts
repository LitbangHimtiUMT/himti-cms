export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
};

export const API_ENDPOINT = {
  login: `${CONFIG_APP.BASE_URL}/auth/admin/login`,
  users: `${CONFIG_APP.BASE_URL}/user`,
  acara: `${CONFIG_APP.BASE_URL}/acara`,
  anggota: `${CONFIG_APP.BASE_URL}/anggota`,
  dosen: `${CONFIG_APP.BASE_URL}/dosen`,
  struktural: `${CONFIG_APP.BASE_URL}/struktural`,
}