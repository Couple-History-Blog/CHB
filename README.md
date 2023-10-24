# CHB Branch
- `Master`       : 대표 브랜치
- `dev`          : 개발 브랜치
- `release`      : 운영 브랜치
- `dev-???`      : 각자 개발 브랜치
- `release-???`  : 각자 운영 브랜치

# Banner
- `SITE`         : https://devops.datenkollektiv.de/banner.txt/index.html
- `FONT`         : alpha

# Version
- `NODE`         : 16.1.0
- `NPM`          : 7.11.2

# 실행
- `FE`           : npm run start:custom
- `BE`           : server
- `REDIS` [ HomeBrew로 설치시 ]\
--> 실행 : brew services start redis\
--> 재실행 : brew services restart redis\
--> 중지 : brew services stop redis\
--> 상태 : redis-cli ping\
--> 기본 port : 6379
