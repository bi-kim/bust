var restify = require("restify");
var swagger = require('swagger-restify');
var CK      = require("./lib/ck.js");
var corsMiddleware = require('restify-cors-middleware')
var cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

var server = restify.createServer();
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser());

var env = {
    PORT: 5000,
    CK: {
        LOGIN: "http://bus.ck.ac.kr/index.php/auth/login", // login
        DATA: "http://bus.ck.ac.kr/#/login",  // uuid, sid
        GETSTNTBUSLIST: "http://bus.ck.ac.kr/index.php/bus/GetStntBusList",
        GETSTNTBUSRESERVATION: "http://bus.ck.ac.kr/index.php/bus/GetStntBusReservation",
        GETBUSSEATLIST: "http://bus.ck.ac.kr/index.php/bus/GetBusSeatList",
        GETSTNTBUSDETAILLIST: "http://bus.ck.ac.kr/index.php/bus/GetStntBusDetailList",
        GETSTNTBUSPANALTY: "http://bus.ck.ac.kr/index.php/bus/GetStntBusPanalty",
        GETBUSREMAINSEATLIST: "http://bus.ck.ac.kr/index.php/bus/GetBusRemainSeatList",
        INSERTSTNTBUSRESERVATION: "http://bus.ck.ac.kr/index.php/bus/InsertStntBusReservation",
        CANCELSTNTBUSRESERVATION: "http://bus.ck.ac.kr/index.php/bus/CancelStntBusReservation",
    }
};

swagger.init(server, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public',
    basePath: 'http://localhost:5000',
    info: {
      title: 'swagger-restify sample app',
      description: 'Swagger + Restify = {swagger-restify}'
    },
    apis: ['./index.js'],
    middleware: function(req, res){}
});

server.listen(env.PORT, () => {
    console.log("ready on %s", server.url);
});

/**
 * @swagger
 * resourcePath: /api
 * description: API Description.
 */


/**
 * @swagger
 * path: /api/login
 * operations:
 *   -  httpMethod: POST
 *      summary: 로그인, 학번과 비밀번호를 통해서.
 *      notes: 학번과 비밀번호를 암호화 시켜서 보내면 학생의 정보를 보여줍니다.
 *      responseClass: Users
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. id, pw를 객체로 만들고 uuid, sid를 갖고 암호화 해야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   Users:
   *     id: Users
   *     properties:
   *       DEPT_CODE:
   *         type: String
   *         description: 전공 번호
   *       DEPT_NAME:
   *         type: String
   *         description: 전공 이름
   *       EMAL_ADDR:
   *         type: String
   *         description: 이메일
   *       HAND_NUMB:
   *         type: String
   *         description: 알수없음
   *       LOGN_FLAG:
   *         type: String
   *         description: 알수없음
   *       MAJR_CODE:
   *         type: String
   *         description: 알수없음
   *       PASS_DATE:
   *         type: String
   *         description: 휴대폰 번호
   *       PASS_WORD:
   *         type: String
   *         description: 비밀번호
   *       SCHL_CODE:
   *         type: String
   *         description: 스쿨 코드
   *       SCHL_NAME:
   *         type: String
   *         description: 스쿨 이름
   *       STAT_CODE:
   *         type: String
   *         description: 상태 코드
   *       STAT_NAME:
   *         type: String
   *         description: 학생 상태 (재학생/휴학생/복학생 등등...)
   *       STNT_CLSS:
   *         type: String
   *         description: A/B 분반
   *       STNT_EDSY:
   *         type: String
   *         description: 년제
   *       STNT_SHYR:
   *         type: String
   *         description: 재학 년도
   *       SURV_ID:
   *         type: String
   *         description: 알수없음
   *       USER_NAME:
   *         type: String
   *         description: 이름
   *       USER_NUMB:
   *         type: String
   *         description: 학번
   */
server.post("/api/login", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.LOGIN,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/data
 * operations:
 *   -  httpMethod: GET
 *      summary: SID, UUID를 가져옵니다.
 *      notes: SID는 세션 값이고 UUID는 페이지를 한번 방문할 때마다 복호화할 대칭 키 값입니다.
 *      nickname: data
 *      consumes:
 *        - application/json
 */
server.get("/api/data", (req, res) => {
    var ck = new CK();
    ck.getUUIDandSID({
        url: env.CK.DATA
    }, res)
});

/**
 * @swagger
 * path: /api/getStntBusList
 * operations:
 *   -  httpMethod: POST
 *      summary: USER_NUMB를 통한 버스 종류.
 *      notes: 운행하는 모든 스쿨버스의 종류를 얻어옵니다.
 *      responseClass: BusList
 *      nickname: BusList
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. USER_NUMB를 객체로 만들고 암호화 해야합니다. (USER_NUMB만 있으면 됩니다.)
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   BusList:
   *     id: BusList
   *     properties:
   *        ARGN_NAME:
   *            type: String
   *            description: 지역권 (서울권)
   *        BURE_FLAG:
   *            type: String
   *            description: 알수없음
   *        BUSS_ARGN:
   *            type: String
   *            description: 알수없음
   *        BUSS_DESC:
   *            type: String
   *            description: 알수없음
   *        BUSS_GUBN:
   *            type: String
   *            description: 알수없음
   *        BUSS_IMGE:
   *            type: String
   *            description: 버스 타는 위치 이미지
   *        BUSS_KRNM:
   *            type: String
   *            description: 버스 회사
   *        BUSS_MONY:
   *            type: String
   *            description: 버스 타는 금액
   *        BUSS_NAME:
   *            type: String
   *            description: 버스 이름, 고유번호
   *        BUSS_STTE:
   *            type: String
   *            description: 운행 지역
   *        BUSS_TELE:
   *            type: String
   *            description: 버스 운전기사 휴대폰 번호
   *        GUBN_NAME:
   *            type: String
   *            description: 버스 종류
   *        INPT_DATE:
   *            type: String
   *            description: 등록일
   *        INPT_USID:
   *            type: String
   *            description: 알수없음
   *        PCIP_ADDR:
   *            type: String
   *            description: 컴퓨터 아이피
   *        REMK_TEXT:
   *            type: String
   *            description: 알수없음
   *        UPDT_DATE:
   *            type: String
   *            description: 마지막 수정된 날짜 (이 정보가)
   *        UPDT_USID:
   *            type: String
   *            description: 알수없음
   */
server.post("/api/getStntBusList", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETSTNTBUSLIST,
        sid: req.body.sid
    }, res);
});


/**
 * @swagger
 * path: /api/getStntBusReservation
 * operations:
 *   -  httpMethod: POST
 *      summary: USER_NUM를 통한 버스 예약 정보.
 *      notes: 예약한 버스 리스트를 불러옵니다.
 *      responseClass: BusListReservation
 *      nickname: BusListReservation
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. USER_NUMB를 객체로 만들고 암호화 해야합니다. (USER_NUMB만 있으면 됩니다.)
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   BusListReservation:
   *     id: BusListReservation
   *     properties:
   *        BURE_DATE:
   *            type: String
   *            description: 예약한 날짜
   *        BURE_HASH:
   *            type: String
   *            description: 버스 QR 변환 해시 값
   *        BURE_INDX:
   *            type: String
   *            description: 버스 인덱스
   *        BURE_SEAT:
   *            type: String
   *            description: 예약한 자리 번호
   *        BURE_STAT:
   *            type: String
   *            description: 알수없음
   *        BURE_TEXT:
   *            type: String
   *            description: 예약 상태
   *        BUSS_INDX:
   *            type: String
   *            description: 알수없음
   *        BUSS_STTE:
   *            type: String
   *            description: 지역
   *        BUSS_TIME:
   *            type: String
   *            description: 예약한 시간
   *        INPT_DATE:
   *            type: String
   *            description: 예약한 년, 월
   *        UPDT_DATE:
   *            type: String
   *            description: 수정한 년, 월
   *        USER_NUMB:
   *            type: String
   *            description: 학번
   */
server.post("/api/getStntBusReservation", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETSTNTBUSRESERVATION,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/getBusSeatList
 * operations:
 *   -  httpMethod: POST
 *      summary: 버스에 앉을 수 있는 자리와 앉아 있는 사람들 탑승 키 어떤 사람들인지 알아오기.
 *      notes: 예약한 버스 리스트를 불러옵니다.
 *      responseClass: BusSeatList
 *      nickname: BusSeatList
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. BUSS_INDX, BUSS_STTE, BUSS_TIME, USER_NUMB 한 객체로 묶고 암호화 해야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   BusSeatList:
   *     id: BusSeatList
   *     properties:
   *        BURE_DATE:
   *            type: String
   *            description: 예약한 날짜
   *        BURE_HASH:
   *            type: String
   *            description: 버스 QR 변환 해시 값
   *        BURE_INDX:
   *            type: String
   *            description: 버스 인덱스
   *        BURE_SEAT:
   *            type: String
   *            description: 예약한 자리 번호
   *        BURE_STAT:
   *            type: String
   *            description: 알수없음
   *        BUSS_INDX:
   *            type: String
   *            description: 알수없음
   *        BUSS_STTE:
   *            type: String
   *            description: 지역
   *        BUSS_TIME:
   *            type: String
   *            description: 예약한 시간
   *        INPT_DATE:
   *            type: String
   *            description: 예약한 년, 월
   *        UPDT_DATE:
   *            type: String
   *            description: 수정한 년, 월
   *        USER_NUMB:
   *            type: String
   *            description: 학번
   */
server.post("/api/getBusSeatList", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETBUSSEATLIST,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/getStntBusDetailList
 * operations:
 *   -  httpMethod: POST
 *      summary: 예약할 수 있는 버스 리스트들을 불러옵니다. (시간 정보 디테일하게)
 *      notes: 예약할 수 있는 시간에 가능한 리스트들을 불러옵니다.
 *      responseClass: BusDetailList
 *      nickname: BusDetailList
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. STNT_NUMB 학번 객체를 암호화 시켜서 보내야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   BusDetailList:
   *     id: BusDetailList
   *     properties:
   *        BURE_BSNB:
   *            type: String
   *            description: 알수없음
   *        BURE_SENB:
   *            type: String
   *            description: 알수없음
   *        BUSS_CRNB:
   *            type: String
   *            description: 알수없음
   *        BUSS_DGHG:
   *            type: String
   *            description: 알수없음
   *        BUSS_GUBN:
   *            type: String
   *            description: 알수없음
   *        BUSS_LICK:
   *            type: String
   *            description: 알수없음
   *        BUSS_SEQN:
   *            type: String
   *            description: 알수없음
   *        BUSS_STTE:
   *            type: String
   *            description: 버스가 가는 지역
   *        BUSS_TIME:
   *            type: String
   *            description: 버스 운행 시간
   *        BUSS_WDHD:
   *            type: String
   *            description: 알수없음
   *        DGHG_NAME:
   *            type: String
   *            description: 버스 상태 (하교|등교)
   *        INPT_DATE:
   *            type: String
   *            description: 버스가 등록된 시간 (운영자가 등록한 시간 일지도.)
   *        INPT_USID:
   *            type: String
   *            description: 알수없음
   *        PCIP_ADDR:
   *            type: String
   *            description: IP 주소
   *        REMK_TEXT:
   *            type: String
   *            description: 알수없음
   *        TIME_TIME:
   *            type: String
   *            description: HTML로 표기하기 쉽도록 만들어둔 시간 (왜 이런걸...)
   *        UPDT_DATE:
   *            type: String
   *            description: 마지막으로 수정된 시간 (운영자가 등록한 시간 일지도.)
   *        UPDT_USID:
   *            type: String
   *            description: 알수없음
   *        WDHD_NAME:
   *            type: String
   *            description: 운행 분류 (평일, 주말)
   */
server.post("/api/getStntBusDetailList", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETSTNTBUSDETAILLIST,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/getStntBusPanalty
 * operations:
 *   -  httpMethod: POST
 *      summary: 버스 패널티
 *      notes: 버스 패널티 여부를 받아옵니다.
 *      responseClass: BusPanalty
 *      nickname: BusPanalty
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. USER_NUMB 객체를 암호화 시켜서 보내야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
/**
   * @swagger
   * models:
   *   BusPanalty:
   *     id: BusPanalty
   *     properties:
   *        data:
   *            type: Number
   *            description: 알수없음
   *        panalty:
   *            type: Boolean
   *            description: 패널이 여부 (true | false)
   */
server.post("/api/getStntBusPanalty", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETSTNTBUSPANALTY,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/getBusRemainSeatList
 * operations:
 *   -  httpMethod: POST
 *      summary: 버스 잔여 좌석
 *      notes: 버스의 잔여 좌석을 알아옵니다.
 *      responseClass: BusRemainSeatList
 *      nickname: BusRemainSeatList
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. Detail List로 받은 Object를 암호화 시켜야함.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
server.post("/api/getBusRemainSeatList", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.GETBUSREMAINSEATLIST,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/insertStntBusReservation
 * operations:
 *   -  httpMethod: POST
 *      summary: 버스 예약.
 *      notes: 버스 좌석을 예약합니다.
 *      responseClass: InsertBusReservation
 *      nickname: InsertBusReservation
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. BURE_SEAT, BUSS_INDEX, BUSS_STTE, BUSS_TIME, USER_NUMB를 암호화 객체로 보내야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
server.post("/api/insertStntBusReservation", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.INSERTSTNTBUSRESERVATION,
        sid: req.body.sid
    }, res);
});

/**
 * @swagger
 * path: /api/cancelStntBusReservation
 * operations:
 *   -  httpMethod: POST
 *      summary: 버스 예약을 취소합니다.
 *      notes: 예약한 버스 좌석을 취소합니다.
 *      responseClass: CancelBusReservation
 *      nickname: CancelBusReservation
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: datas
 *          description: AES로 암호화 시킨 데이터를 전송해야합니다. USER_NUMB 객체를 암호화 시켜서 보내야합니다.
 *          paramType: query
 *          required: true
 *          dataType: string
 */
server.post("/api/cancelStntBusReservation", (req, res) => {
    var ck = new CK();
    ck.sendData({
        req: req,
        url: env.CK.CANCELSTNTBUSRESERVATION,
        sid: req.body.sid
    }, res);
});