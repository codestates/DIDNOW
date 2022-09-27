# Proxy

### default.conf 생성법

```shell
echo url=$IP | cat - githubaction > githubaction.sh
chmod 777 githubaction.sh
./githubaction.sh
rm ./githubaction.sh
```
