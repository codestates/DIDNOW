# Artillery Stress Test

## **Test 방법**

<hr />

### **1. 테스트 진행**

```
npx artillery run -o StressTest/01_RequestVC_Report.json  StressTest/01_RequestVC_Test.json
npx artillery run -o StressTest/02_CloseVerifyRequestTest.json  StressTest/02_CloseVerifyRequestTest.json
```

### **2. Summary Log**
```
--------------------------------
Summary report @ 22:48:11(+0900)
--------------------------------

errors.ETIMEDOUT: .............................................................. 149
http.codes.200: ................................................................ 1143
http.request_rate: ............................................................. 14/sec
http.requests: ................................................................. 1292
http.response_time:
  min: ......................................................................... 94
  max: ......................................................................... 9965
  median: ...................................................................... 3134.5
  p95: ......................................................................... 8868.4
  p99: ......................................................................... 9801.2
http.responses: ................................................................ 1143
vusers.completed: .............................................................. 331
vusers.created: ................................................................ 480
vusers.created_by_name.Holder Login+Request VC+Create Verify Request: .......... 480
vusers.failed: ................................................................. 149
vusers.session_length:
  min: ......................................................................... 19390
  max: ......................................................................... 34222.1
  median: ...................................................................... 27181.5
  p95: ......................................................................... 31897.9
  p99: ......................................................................... 32542.3
Log file: StressTest/01_RequestVC_Report.json
```


### 03. Report 출력
```
npx artillery report StressTest/01_RequestVC_Report.json
npx artillery report StressTest/02_CloseVerifyRequestTest.json
```

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPNr7R%2FbtrMlj0IxDn%2FA6di0oZd045WlWtdzYMKek%2Fimg.png)  

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcXC6ep%2FbtrMqr4ym8h%2Fe6HcKkPUE9Saay8dNp9e01%2Fimg.png) 


## **Reference**
1. [YAML to JSON](https://onlineyamltools.com/convert-yaml-to-json)  
2. [Artillery 공식 홈페이지](https://www.artillery.io/)  