# OP-SEV

## 2025-04-25
``` bash
docker build -t joehe/op-sev:1.0.27 .
docker compose up -d

# user
docker exec -it op-db mongo -u opDbAdmin -p FfdslaewqQQ2 --authenticationDatabase "admin"
show dbs
use octopus
show collections
db.users.find().pretty()
db.users.insert({ "userName": "admin", "password": "fdc0cfa51519730a130046e4264b1636dcae7c3c3ed02c11d3571b2565ad7eeddbccfa543dc485051a0a5af24b4ab071ea2d837086233cc7216913472f627e0938254bae79c76a3f05a73289f717f41cf30b5009da73fc0326cc61f8a8525708665c8765a5220519a264ec985f956ed9b13d2945518a9cd6154371e80055efb3" })
```

- [] 数据导出 Excel
- [] 数据库副本集
- [] 数据备份和还原

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



docker run --restart=always -d -v /"$PWD"/src:/server/src -v /"$PWD"/public:/server/public -v /"$PWD"/logs:/server/logs --log-opt max-size=100m --log-opt max-file=1 --network host --name op-sev joehe/op-sev:1.0.0

47.242.32.120:4003
```

``` bash
docker build -t joehe/op-sev:1.0.27 .

# publish
docker push joehe/op-sev:1.0.27

# product
mkdir -p op-sev/logs
docker run -d -p 4003:4003 -p 41234:41234 -v /"$PWD"/logs:/server/logs --log-opt max-size=100m --log-opt max-file=1 --network op-net --name op-sev joehe/op-sev:1.0.27


netsh interface portproxy show all
netsh interface portproxy add v4tov4 listenport=4003 connectaddress=172.29.130.71 connectport=4003 listenaddress=0.0.0.0 protocol=tcp
```

``` bash
# redis_master 192.168.1.237
mkdir -p redis_master/data
docker run -d -p 6379:6379 -v /"$PWD"/data:/data --network op-net --name redis_master redis --appendonly yes

# redis_slave_0 192.168.10.111
mkdir -p redis_slave_0/data
docker run -d -p 6379:6379 -v /"$PWD"/data:/data --network op-net --name redis_slave_0 redis --appendonly yes
docker exec -it redis_slave_0 bash
redis-cli

mkdir -p redis_local/data
docker run -d -p 6380:6379 -v /"$PWD"/data:/data --network op-net --name redis_local redis --appendonly yes
```