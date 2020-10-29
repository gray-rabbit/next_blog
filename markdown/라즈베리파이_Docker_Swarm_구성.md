라즈베리파이 5대를 구성해서 클러스터를 만든다.

swarm을 쓰자. k8s는.... 음... 어렵다. 그냥 스웜 쓸래..

먼저 매니저를 만들어야 한다. 

```
docker swarm init --advertise-addr 192.168.1.241
```

뒤에 아이피는 적당히들 변경해서 쓰면 되겠다..

이후에 이렇게 나타난다. 

```
Swarm initialized: current node (jz066367zfnx2xw3g5aw1hp6b) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-1eapxk45gfqidlje12zygnzb3w25wijw3sqyxxijiuwgjau0om-3nomvl62cry11ulquao1jrdun 192.168.1.241:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

핵심은 중간에 나오는 docker swarm join 부분이다. 조인할 곳에서 저 토큰을 이용하여 워커들을 구성하도록 한다. 


라고 거창하게 쓴 후


**복붙한다.**

이후 docker node를 확인하기 위해서 다음 명령어를 사용한다. 


```
docker node ls
```

이후에는 아름답게 노예들과 매니저가 보이게 된다. 

```
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
b4ev0c9wqhcgj4t0h32idiq5u     ubuntu2             Ready               Active                                  19.03.13
vmotuttadt3060kqmppioke8g     ubuntu3             Ready               Active                                  19.03.13
m0d1h5cbqnaoh0gougvta3mep     ubuntu4             Ready               Active                                  19.03.13
jz066367zfnx2xw3g5aw1hp6b *   ubuntumaster        Ready               Active              Leader              19.03.13
```



