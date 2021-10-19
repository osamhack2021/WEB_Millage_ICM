<br>
<p align="center">
	<img src="https://user-images.githubusercontent.com/31975515/137825431-3792a01c-ece9-4125-9a63-d27355a04c24.png">
</p>
<br><br>
<p align="center">
	<img src="https://user-images.githubusercontent.com/31975515/137825577-02640a1e-8172-4ed9-806e-b030a1017bd9.png">
</p>
<p align="center">
	<img alt="메시지" src="https://user-images.githubusercontent.com/31975515/137825783-96c4fd52-04d3-4208-bf7f-7f42b355835f.png">
</p>
<br><br>

<p align="center">
	<a href="https://millage.ml/">
		<img width="250" alt="demo" src="https://user-images.githubusercontent.com/31975515/137824930-65a09411-bc6b-49f0-8a3a-996dc5a726df.png">
	</a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/tree/main/docs">
		<img width="250" alt="docs" src="https://user-images.githubusercontent.com/31975515/137825076-c7b06c2e-6ce8-4c12-97b5-f27e1b633fb2.png">
	</a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/issues">
		<img width="250" alt="issues" src="https://user-images.githubusercontent.com/31975515/137825091-75a70fd4-47f8-4b95-ad22-67699ccb1fa6.png">
	</a>
</p>
<p align="center">
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/search?l=TSX&type=code"><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/osamhack2021/WEB_Millage_ICM"></a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/osamhack2021/WEB_Millage_ICM?color=success"></a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/osamhack2021/WEB_Millage_ICM"></a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/osamhack2021/WEB_Millage_ICM"></a>
	<a href="https://github.com/osamhack2021/WEB_Millage_ICM/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/osamhack2021/WEB_Millage_ICM"></a>
</p>

## 프로젝트 소개
큰 규모의 부대같은 경우 인트라넷을 통한 커뮤니티가 어느정도 활성화 되어있지만, 그렇지 못한 소규모 부대들의 경우 [육군훈련소 대신 전해드립니다](https://www.facebook.com/katckr/) 같은 개인적으로 운영되는 커뮤니티를 사용하는 것이 현실입니다.

<b>모두를 위한 국방 커뮤니티, Millage</b>는 병사와 간부들, 또 병 상호간 소통할 수 있는 커뮤니티를 제공합니다. 부대별로 독립적인 다양한 게시판 및 일정 캘린더를 제공하여 정보 공유를 원활하게 하고, 설문/모집 기능을 이용해 활동에 필요한 인원들을 모을 수도 있습니다. 또, 사용자들간 1대1 채팅을 통해 서로 소통을 가능하게 하며, 시설 예약 시스템을 통하여 시설 관리를 편리하게 할 수 있도록 도와줍니다.

## 기능 설명
 - To be Added

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Server(back-end)
 - NodeJS v14 + Typescript
 - Express, NestJS, TypeORM 
 - MySQL
 - Ubuntu, Ngnix, SSL, pm2
 
### Front-end
 -  React JS + TypeScript
     - Redux, Redux-saga,
 -  Material UI

## 프로젝트 사용법 (Getting Started) / 개발 시작하기

개발을 시작하기 전에 [CONTRIBUTING.md](CONTRIBUTING.md) 를 꼭 참고해주세요.

1. Millage Project 클론 - ```git clone https://github.com/osamhack2021/WEB_Millage_ICM.git```  
2. 프로젝트 디렉토리로 이동후 ```yarn install```
3. ```yarn client-start```로 React Application 실행
4. WEB(BE) 디렉토리에 ormconfig.json 추가, db 정보 입력.
5. ```yarn server-start```로 Nodejs 서버 실행
6. Codespace 에서 작업 시 ```npx localtunnel --port 4000 --subdomain millage```로 proxy 서버 설정,<br>
  [Constants](https://github.com/osamhack2021/WEB_Millage_ICM/blob/main/WEB(FE)/src/constants/APIs.ts)의 서버를 해당 도메인으로 변경  

## 서비스 이용 방법 (평일 17:00 ~ 23:00, 주말 09:00 ~ 23:00 운영) 
<b>1. 데스크탑 / WEB</b><br>
https://millage.ml/ 웹사이트 접속 후 서비스 이용

<b>2. 스마트폰 / APP</b><br>
안드로이드/IOS 기반 스마트폰에서 웹사이트 접속 후 [홈 화면에 사이트 추가 설정] 후 어플리케이션으로 이용<br>
또는 브라우저 어플리케이션에서 https://millage.ml/ 웹사이트 접속
 
## 서비스 플로우 
<img src="docs/Flow Diagram.drawio.svg">

## 밀리터리 빌리지 기대 효과
  - 규모에 상관없는 독립적 부대 커뮤니티 생성 / 운영 →  '육군훈련소 대신 전해드립니다' 같은 개인 운영 커뮤니티 의존성 필요 x
  - 부대 내 공지사항, 일정, 인수인계 등 정보 공유의 원활화
  - 설문 / 모집을 통한 부대 내 스터디, 운동 등 소규모 활동 장려
  - 시설예약 시스템을 통한 체계적인 시설관리, 관리 소요 간소화
  - 부대인원들 간 1대1 채팅을 통한 소통 가능화   


## 팀 정보 (Team Information)
<br>
<table align="center" width="788">
<thead>
<tr>
<th width="100" align="center">사진</th>
<th width="100" align="center">성명</th>
<th width="150" align="center">역할</th>
<th width="100" align="center">깃허브</th>
<th width="175" align="center">이메일</th>
</tr> 
</thead>
<tbody>
<tr>
<td width="100" align="center"></td>
<td width="100" align="center">박은찬</td>
<td width="150">풀스택 개발<br>DM/사용자 기능<br>서버 환경 구축<br></td>
<td width="100" align="center">
	<a href="https://github.com/pec9399">
		<img src="http://img.shields.io/badge/pec9399-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="175" align="center">
	<a href="mailto:pec9399@naver.com">pec9399@naver.com</a>
</td>
</tr>
<tr>
<td width="100" align="center"></td>
<td width="100" align="center">박수근</td>
<td width="150">프론트엔드 개발<br>게시판 기능<br></td>
<td width="100" align="center">
	<a href="https://github.com/bwmelon97">
		<img src="http://img.shields.io/badge/bwmelon97-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="175" align="center">
	<a href="mailto:bwmelon97@naver.com">bwmelon97@naver.com</a>
</td>
</tr>
<tr>
<td width="100" align="center"></td>
<td width="100" align="center">황인규</td>
<td width="150">프론트엔드 개발<br>캘린더/시설예약<br></td>
<td width="100" align="center">
	<a href="https://github.com/hig4342">
		<img src="http://img.shields.io/badge/hig4342-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="175" align="center">
	
</td>
</tr>
<tr>
<td width="100" align="center"></td>
<td width="100" align="center">최성흠</td>
<td width="150">백엔드 개발<br>REST API 구현<br>DB 구조 설계<br></td>
<td width="100" align="center">
	<a href="https://github.com/nailerHeum">
		<img src="http://img.shields.io/badge/nailerHeum-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="175" align="center">
	
</td>
</tr>
<tr>
<td width="100" align="center"></td>
<td width="100" align="center">김동현</td>
<td width="150">디자이너<br>시연,발표자료<br></td>
<td width="100" align="center">
	<a href="https://github.com/thn02046">
		<img src="http://img.shields.io/badge/thn02046-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="175" align="center">
	
</td>
</tr>
</tbody>
</table>
<br>

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * This project is licensed under the terms of the [MIT license](https://github.com/osamhack2021/WEB_Millage_ICM/blob/main/LICENSE).
