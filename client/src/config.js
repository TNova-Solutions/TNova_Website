
const currentUrl = window.location.href;
console.log("current", currentUrl)

const backendUrl = currentUrl.replace("-5173", "-5000")

const prodUrl = `https://t-nova-website-hzyx.vercel.app/`


export const API_BASE_URL = import.meta.env.PROD ? prodUrl : backendUrl;