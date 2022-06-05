import axios from 'axios';
import { AxiosRequestHeaders } from 'axios'


function getFingerprint(): string {
   let fingerprint;

   axios.get('https://discord.com/api/v9/experiments')
      .then(res => fingerprint = res.data.fingerprint)
   return String(fingerprint);
}

function commonHeaders(fingerprint: string): AxiosRequestHeaders {
   return {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
      'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
      'Content-Type': 'application/json',
      'X-Track': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJwdC1CUiIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEwMi4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEwMi4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTAyLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6OTk5OSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=',
      'X-Fingerprint': fingerprint,
      'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJmciIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEwMC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEwMC4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTAwLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTI3MTM1LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
      'Cookie': '__dcfduid=a6c4e070e51f11eca9438be8c16489bc; __sdcfduid=a6c4e071e51f11eca9438be8c16489bc8c496197adb57b46375e6ede857bd5427d93341402e34920f6f386d90a5a70a1; locale=pt-BR; OptanonConsent=isIABGlobal=false&datestamp=Sun+Jun+05+2022+19%3A34%3A24+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1'
   }
}

export {
   getFingerprint,
   commonHeaders
}