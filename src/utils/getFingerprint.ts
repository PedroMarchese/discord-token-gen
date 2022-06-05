import axios from 'axios';

async function getFingerprint(): Promise<string> {
   let res = await axios.get('https://discord.com/api/v9/experiments', { validateStatus: s => true })
   
   return `${res.data.fingerprint}`
}

export default getFingerprint;