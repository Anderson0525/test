================================================================================
                    GUÍA DE PIVOTING Y ESCANEO EN METASPLOIT
================================================================================

1. Establecer el enrutamiento interno (AutoRoute):
--------------------------------------------------------------------------------
Cuando estás en la sesión de Meterpreter, tu Kali no sabe que existe la red 
192.168.21.0/24. Debes indicarle a Metasploit que todo el tráfico dirigido 
a esa red pase a través de tu sesión activa.

En tu Meterpreter, envía la sesión a segundo plano:
meterpreter > background

Revisa el número de tu sesión activa:
msf6 > sessions -l

Añade la ruta automática de la subred interna:
msf6 > use multi/manage/autoroute
msf6 post(multi/manage/autoroute) > set SESSION 1
msf6 post(multi/manage/autoroute) > run


2. Levantar el Servidor Proxy SOCKS5 (Metasploit):
--------------------------------------------------------------------------------
Permite redirigir las herramientas externas de Kali (como Nmap) por dentro 
del túnel de Meterpreter.

msf6 > use auxiliary/server/socks_proxy
msf6 auxiliary(server/socks_proxy) > set SRVPORT 1080
msf6 auxiliary(server/socks_proxy) > set VERSION 5
msf6 auxiliary(server/socks_proxy) > run -j


3. Configurar Proxychains en Kali Linux:
--------------------------------------------------------------------------------
Asegúrate de que el archivo /etc/proxychains4.conf apunte al puerto 1080.

Abre el archivo con Nano:
sudo nano /etc/proxychains4.conf

Al final del archivo, debe quedar así:
[ProxyList]
socks5 127.0.0.1 1080


4. Escaneo de Hosts en la Red Interna con Nmap (Desde Kali):
--------------------------------------------------------------------------------
Ejecuta Nmap usando proxychains con los parámetros obligatorios (-Pn y -sT):

proxychains nmap -Pn -sT -p 80,135,139,445,3389 --open 192.168.21.0/24


5. Escaneo de Hosts desde Metasploit (Alternativa sin Proxychains):
--------------------------------------------------------------------------------
Si prefieres escanear directamente usando los módulos internos de Metasploit:

msf6 > use auxiliary/scanner/smb/smb_version
msf6 auxiliary(scanner/smb/smb_version) > set RHOSTS 192.168.21.0/24
msf6 auxiliary(scanner/smb/smb_version) > set THREADS 10
msf6 auxiliary(scanner/smb/smb_version) > run


6. Gestión de Sesiones en Metasploit:
--------------------------------------------------------------------------------
Listar todas las sesiones activas:
msf6 > sessions -l

Volver a interactuar con una sesión específica (ejemplo: sesión 1):
msf6 > sessions -i 1

Enviar la sesión interactiva al segundo plano:
meterpreter > background
================================================================================