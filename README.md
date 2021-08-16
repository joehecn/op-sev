# OP-SEV

``` bash
scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/Dockerfile root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer /Users/hemiao/joe/v3/op/op-sev/package.json root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer -r /Users/hemiao/joe/v3/op/op-sev/src root@47.242.32.120:/root/op-sev
scp -i /Users/hemiao/pem/m21.cer -r /Users/hemiao/joe/v3/op/op-sev/public root@47.242.32.120:/root/op-sev

ssh v3

cd op-sev

docker build -t joe/op-sev:1.0.0 .
-p 4003:4003 -p 41234:41234 -p 41235:41235
docker run --restart=always -d -v /"$PWD"/src:/server/src -v /"$PWD"/public:/server/public -v /"$PWD"/logs:/server/logs --log-opt max-size=100m --log-opt max-file=1 --network host --name op-sev joe/op-sev:1.0.0

47.242.32.120:4003
```