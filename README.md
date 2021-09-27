# OP-SEV

47.242.32.120:4003

``` bash
ssh -i /Users/hemiao/pem/m21.cer root@47.242.32.120

scp -i /Users/hemiao/pem/m21.cer root@47.242.32.120:/root/op-sev/Dockerfile /Users/hemiao/joe/v3/op/op-sev
scp -i /Users/hemiao/pem/m21.cer root@47.242.32.120:/root/op-sev/package.json /Users/hemiao/joe/v3/op/op-sev
scp -i /Users/hemiao/pem/m21.cer -r root@47.242.32.120:/root/op-sev/src /Users/hemiao/joe/v3/op/op-sev
scp -i /Users/hemiao/pem/m21.cer -r root@47.242.32.120:/root/op-sev/public /Users/hemiao/joe/v3/op/op-sev
```

## windows
``` bash
scp -i C:\Users\HM\op\pem\m21.cer C:\Users\HM\op\op-sev/Dockerfile root@47.242.32.120:/root/op-sev
scp -i C:\Users\HM\op\pem\m21.cer C:\Users\HM\op\op-sev/package.json root@47.242.32.120:/root/op-sev
scp -i C:\Users\HM\op\pem\m21.cer -r C:\Users\HM\op\op-sev/src root@47.242.32.120:/root/op-sev
scp -i C:\Users\HM\op\pem\m21.cer -r C:\Users\HM\op\op-sev/public root@47.242.32.120:/root/op-sev

ssh -i C:\Users\HM\op\pem\m21.cer root@47.242.32.120

cd op-sev

docker build -t joe/op-sev:1.0.0 .
-p 4003:4003 -p 41234:41234 -p 41235:41235
docker run --restart=always -d -v /"$PWD"/src:/server/src -v /"$PWD"/public:/server/public -v /"$PWD"/t:/server/t -v /"$PWD"/logs:/server/logs --log-opt max-size=100m --log-opt max-file=1 --network host --name op-sev joe/op-sev:1.0.0

47.242.32.120:4003
```

ssh -i C:\Users\HM\op\pem\id_rsa.pem -oPort=6000 root@47.242.32.120

## frp
47.242.32.120:7001
41235 7001 7000 6000
``` bash
ssh -i /Users/hemiao/pem/m21.cer root@47.242.32.120
# frps.ini
[common]
token = 98692467-37de-409a-9fac-bb2585826f1
bind_port = 7000

dashboard_port = 7001
dashboard_user = megaAdmin
dashboard_pwd = mega0240

#####################################################

ssh -i /Users/hemiao/pem/id_rsa.pem -oPort=6000 root@47.242.32.120
# ssh frpc.ini
[common]
token = 98692467-37de-409a-9fac-bb2585826f1
server_addr = 47.242.32.120
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000

# udp frpc.ini
[common]
token = 98692467-37de-409a-9fac-bb2585826f1
server_addr = 47.242.32.120
server_port = 7000

[udp]
type = udp
local_ip = 127.0.0.1
local_port = 41235
remote_port = 41235

```

``` bash
scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/Dockerfile root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/package.json root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer -r /Users/hemiao/joe/v3/op/op-sev/src root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer -r /Users/hemiao/joe/v3/op/op-sev/public root@47.242.32.120:/root/op-sev

scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/public/iife.t.html root@47.242.32.120:/root/op-sev/public
scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/public/es.t.html root@47.242.32.120:/root/op-sev/public

ssh v3

cd op-sev

docker build -t joe/op-sev:1.0.0 .
-p 4003:4003 -p 41234:41234 -p 41235:41235
docker run --restart=always -d -v /"$PWD"/src:/server/src -v /"$PWD"/public:/server/public -v /"$PWD"/logs:/server/logs --log-opt max-size=100m --log-opt max-file=1 --network host --name op-sev joe/op-sev:1.0.0

47.242.32.120:4003
```

private function getArr(dx As string)
    dim args() as string
    args() = split(dx, "&")

    dim methods() as string
    methods = split(args(0), "=")

    dim method as string
    method = methods(1)

end function