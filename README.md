# woo-ah-hana-web
우아하나의 프론트엔드 레포지토리입니다.
<br>
<img src="https://github.com/user-attachments/assets/d7a93111-badd-4733-a15b-bd602386f453" width="500">

## :triangular_flag_on_post: 프로젝트 소개 : 우아하나
### 서비스 소개
우아하나는 경제적 기반이 탄탄하고, 여가 및 취미에 관심있는 **액티브 시니어**들을 위한 모임 통장 플랫폼입니다.
### 주요 기능

- **모임 통장 관리** : 모임 자금 관리의 투명성 확보
- **모임 일정 관리** : 일정 조율 편리성 증가
- **AI 플래너** : AI 기반 플랜 생성, 쉽고 직관적
- **추억 앨범** : 추억을 기록 및 공유
- **모임 결산** : 분기별 모임 회비 사용 내역 정리
<br>


## :scroll: 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [팀원 구성](#팀원-구성)
3. [개발 기간](#개발-기간)
4. [기술 스택](#기술-스택)
5. [개발 환경](#개발-환경)
6. [ERD](#erd)
7. [API 명세](#api-명세)
8. [시스템 아키텍처](#시스템-아키텍처)
9. [기능 소개](#기능-소개)
    - [예시1](#예시1)
    - [예시2](#예시2)
<br>

## :orange_book: 프로젝트 개요
### 베이비 붐 세대
한국전쟁 이후 **1955년 ~ 1974년** 사이 한 해 신생아 수가 90만명이 넘던 시대에 태어난 사람들을 뜻합니다.

이 세대의 사람들이 은퇴하기 시작하는 2020년대를 기점으로 중장년층의 소비 규모와 트렌드가 급격히 변화하며

베이비 붐 세대가 강력한 소비 주체로 떠오르고 있습니다.

더불어 가장 많은 자산을 축적한 세대로서 **상당한 구매력**을 지닌 만큼 많은 기업들도

이들을 주 대상으로 하는 제품이나 서비스를 출시하며 이들의 소비 성향에 맞춘 마케팅 전략을 강화하고 있습니다.


:newspaper: : [“돈 많은 5060 세대” 시니어 소비 증가세 뚜렷 (한경비즈니스)](https://magazine.hankyung.com/business/article/202501095243b),

[보다 젊게 사는 시니어, “욜드족 파급력 점점 더 커질 것” (헤럴드경제)](https://bravo.etoday.co.kr/view/atc_view/15839)

<br>

### 액티브 시니어
시간적 + 경제적 여유를 가진 활발한 5060세대를 뜻합니다.

이 세대는 여유로운 삶을 추구하며 건강, 여행, 여가 활동에 많은 관심을 두고 있습니다.
> 능동적인 소비, 도전하는 젊은 노인층(**YOLD**, Young Old)
<br>

### 시니어 모임
여가 및 취미, 사교활동에 관심이 높은 장년층(시니어)들은
주로 지인들과 함께 **계**를 이루어 주기적으로 만남을 가집니다.

- 여행
- 동호회(취미, 관심사, 종교 등)
- 가족 / 친척

### 목적


### 기대 효과
| **은행** | **고객** |
|----------|----------|
| 액티브 시니어 고객 확보 가능 <br> 기존 은행 상품에 대한 접근성 향상 <br> 시니어 고객들의 소비성향 등 중요 데이터 확보 | 편리한 모임 계좌 관리 <br> AI를 활용한 모임 일정 생성 및 관리 자동화 <br> 시니어 맞춤 UI 및 음성 인식 기능 |


<br>
<br>

## :four_leaf_clover: 팀원 구성

<div align="center">

| **김미강** | **김채운** | **김상현** |👑 **윤영헌** | **최선정** | **함형주** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/113813881?v=4" height=150 width=150> <br/> @mkngkm](https://github.com/mkngkm) | [<img src="https://avatars.githubusercontent.com/u/181096953?v=4" height=150 width=150> <br/> @codnscodns](https://github.com/codnscodns) | [<img src="https://avatars.githubusercontent.com/u/114604135?v=4" height=150 width=150> <br/> @ddingorang](https://github.com/ddingorang)| [<img src="https://avatars.githubusercontent.com/u/107925716?v=4" height=150 width=150> <br/> @yoounyoungheon](https://github.com/yoounyoungheon)| [<img src="https://avatars.githubusercontent.com/u/128480236?v=4" height=150 width=150> <br/> @Choeseonjeong](https://github.com/Choeseonjeong)| [<img src="https://avatars.githubusercontent.com/u/108785508?v=4" height=150 width=150> <br/> @xzhhj01](https://github.com/xzhhj01)
| BE / FE |FE 리더|BE 리더|**팀장**|BE / FE |BE | 
| ERD, API 명세 <br>네이버 검색 연동|UI/UX, 기획|ERD, API 명세 <br>CI/CD, Cloud/Infra|CI/CD<br> AI 엔지니어링<br>네이버 지도 연동<br> MockAccount Server |ERD, API 명세 <br>UI/UX, STT <br> Mobile|ERD, API 명세 <br> BE 프로젝트 세팅 <br> Infra|
</div>

<br>
<br>
<br>

## 개발 기간
- FE : 2025년 01월 08일 ~ 2025년 02월 04일
- BE : 2025년 01월 08일 ~ 2025년 02월 04일
- Deploy : 2025년 02월 04일
- Presentation / Evaluation : 2025년 02월 06일
<br>
<br>

## :hammer_and_pick: 기술 스택 
| **분류**       | **스택**                                                                                   |
|----------------|-------------------------------------------------------------------------------------------|
| **Language**   | ![Java](https://img.shields.io/badge/Java-17-007396?style=flat&logo=openjdk&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-4.5-3178C6?style=flat&logo=typescript&logoColor=white) |
| **Framework**  | ![SpringBoot](https://img.shields.io/badge/SpringBoot-3.1.1-6DB33F?style=flat&logo=springboot&logoColor=white) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black) ![next.js](https://img.shields.io/badge/next.js-14.2.15-000000?style=flat&logo=nextdotjs&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-0.68.0-009688?style=flat&logo=fastapi&logoColor=white)|
| **Build**      | ![Gradle](https://img.shields.io/badge/Gradle-7.0-02303A?style=flat&logo=gradle&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?style=flat&logo=vite&logoColor=white) |
| **Front-end**  | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2-06B6D4?style=flat&logo=tailwindcss&logoColor=white)  ![Axios](https://img.shields.io/badge/Axios-0.21.1-5A29E4?style=flat) ![Ant Design](https://img.shields.io/badge/Ant_Design-5.23.0-0170FE?style=flat&logo=antdesign&locoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-Test-FF4785?style=flat&logo=storybook&locoColor=white)|
| **Back-end**   | ![Spring Security](https://img.shields.io/badge/Spring%20Security-5.6.1-6DB33F?style=flat&logo=springsecurity&logoColor=white) ![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-2.5.6-6DB33F?style=flat&logo=spring&logoColor=white) ![JUnit5](https://img.shields.io/badge/JUnit5-Test-25A162?style=flat&logo=junit5&logoColor=white)|
| **Data**       | ![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=flat&logo=python&logoColor=white) ![BeautifulSoup4](https://img.shields.io/badge/BeautifulSoup4-WebScraping-4B8BBE?style=flat) |
| **Database**   | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-6.2-DC382D?style=flat&logo=redis&logoColor=white) ![H2](https://img.shields.io/badge/H2-Test-332f47?style=flat&logo=h2&logoColor=white)|
| **Tool**       | ![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=flat&logo=postman&logoColor=white) ![IntelliJ](https://img.shields.io/badge/IntelliJ%20IDEA-2023-000000?style=flat&logo=intellijidea&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-Design-FF7262?style=flat&logo=figma&logoColor=white) ![VSCode](https://img.shields.io/badge/VSCode-1.77-007ACC?style=flat&logo=visualstudiocode&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?style=flat&logo=swagger&logoColor=white) ![Github](https://img.shields.io/badge/Github-Code%20Hosting-181717?style=flat&logo=github&logoColor=white) |
| **Deploy**     |![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat&logo=docker&logoColor=white) ![Jenkins](https://img.shields.io/badge/Jenkins-CI/CD-D24939?style=flat&logo=nginx&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-FE_Deploy-000000?style=flat&logo=vercel&logoColor=white) |
| **Cloud/Infra** | ![EC2](https://img.shields.io/badge/AWS%20EC2-Server-FF9900?style=flat&logo=amazonec2&logoColor=white) ![Route53](https://img.shields.io/badge/Route_53-Hosting-8C4FFF?style=flat&logo=amazonroute53&logoColor=white) ![S3](https://img.shields.io/badge/S3-Storage-569A31?style=flat&logo=amazons3&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-Cloud_Messaging-DD2C00?style=flat&logo=firebase&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-Web_Server-009639?style=flat&logo=nginx&logoColor=white) ![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-HTTPS/SSL-003A70?style=flat&logo=letsencrypt&logoColor=white) |
| **Communication** | ![Notion](https://img.shields.io/badge/Notion-Wiki-000000?style=flat&logo=notion&logoColor=white) ![Slack](https://img.shields.io/badge/Slack-Chat-4A154B?style=flat&logo=slack&logoColor=white) ![Jira](https://img.shields.io/badge/Jira-Project%20Management-0052CC?style=flat&logo=jira&logoColor=white) |
| **Open API** |![ChatGPT](https://img.shields.io/badge/ChatGPT-AI-412991?style=flat&logo=openai&logoColor=white) ![Naver API](https://img.shields.io/badge/Naver_API-Maps,_Location-03C75A?style=flat&logo=naver&logoColor=white) ![coolSMS](https://img.shields.io/badge/coolSMS-SMS_Verification-1A73E8?style=flat&logo=googlemessages&logoColor=white)|
<br>

## :keyboard: 개발 환경

| 분류 | 환경 | 
| --- | --- |
| **Backend** | <img src="https://github.com/user-attachments/assets/0065cf26-498e-43c5-a34f-9f1893b0f502" width="25">  IntelliJ IDEA 2024.2.3 Ultimate Edition |
| **Frontend** | <img src="https://github.com/user-attachments/assets/8a0325cf-0129-4741-a5f6-d1a7f3e538c1" width="25">  Visual Studio Code |
| **MockAccount Server** | <img src="https://github.com/user-attachments/assets/04d9f2db-2798-4188-873b-e5c0b9bf7a5e" width="25">  PyCharm 2024.3 Professional Edition|
<br>

## :page_facing_up: ERD
![image](https://github.com/user-attachments/assets/4efc541b-8a7c-4c16-9097-c1a89f3cd1d5)

<br>

## :page_facing_up: API 명세 


<br>
<br>
<br>

## :wrench: 시스템 아키텍처
![image](https://github.com/user-attachments/assets/c10303e0-e7e8-4295-8122-5e9d524e9492)

<br>


## :memo: 기능 소개 
<br>

### 기능 소개 여러개
- 🏠 **예시1**  
  - 예시1
    






---

### 예시2
- 💳 **예시2**  
  - 예시2



