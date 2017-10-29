![ΙΧΘΥΣ](https://github.com/bi-kim/bust/blob/develop/github_logo.png?raw=true)

## Bust 
Chungkang College of Cultural Industries bus reservation service.

## 실행
- 저장소를 복제하세요. `git clone https://github.com/bi-kim/bust.git`
- 프로젝트를 실행 하려면 `npm start`


```javascript
            let confirmBool = confirm("이 버스로 에약을 진행할까요?");
            if (confirmBool == true) {
                let get = LoginStore.getState();
                let security = new Security();
                let encryptData = security.encryptByUUID({
                    BUSS_INDX: d.BUSS_INDX,
                    BUSS_STTE: d.BUSS_STTE,
                    BUSS_TIME: d.BUSS_TIME, 
                    USER_NUMB: LoginStore.getState().USER_NUMB,
                    STNT_NUMB: LoginStore.getState().USER_NUMB  //getStntBusDetailList에 필요한 데이터
                }, get.uuid, get.sid);
    
                axios.post(Config.host + "/getBusSeatList", {
                    datas: encryptData,
                    sid: LoginStore.getState().sid
                }).then((response) => {
                    let d = JSON.parse(JSON.parse(security.decryptByUUID(JSON.parse(response.data).data, get.uuid)));
                    this.setState({ seatData: d });
                });

                alert("예약을 진행합니다.");
            } else {
                alert("예약하지 않았습니다.");
            }

```